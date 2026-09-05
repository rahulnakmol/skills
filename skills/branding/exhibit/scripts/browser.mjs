// browser.mjs : find a Chromium-family browser and drive it over the DevTools
// protocol through --remote-debugging-pipe. Zero dependencies. Node 20+.
//
// verify.mjs uses this for the render pass: it loads the finished page,
// measures it, and captures every act at two widths and in each color scheme.
// The pipe is used rather than a WebSocket because Node 20 has no WebSocket
// client of its own, and rather than Chromium's one-shot --screenshot flag
// because that flag renders one viewport per launch and cannot emulate a color
// scheme or clip to one act.
//
// Discovery follows skills/branding/press/scripts/render.mjs: the environment
// variables first, then names on PATH, then a short list of install paths. The
// first executable found wins and its source is reported.

import { spawn } from "node:child_process";
import { accessSync, constants, existsSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { delimiter, join } from "node:path";

export const BROWSER_ENV = ["PUPPETEER_EXECUTABLE_PATH", "CHROME_PATH"];
export const BROWSER_NAMES = ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome", "brave-browser", "microsoft-edge"];
const INSTALL_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];
const COMMAND_TIMEOUT_MS = 20000;
const LAUNCH_TIMEOUT_MS = 30000;

function isExecutableFile(path) {
  try {
    if (!statSync(path).isFile()) return false;
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

// Browsers that agent-browser or Puppeteer downloaded for their own use live
// under the home directory in a versioned folder; the newest is taken.
function cachedBrowsers() {
  const found = [];
  const roots = [join(homedir(), ".agent-browser", "browsers"), join(homedir(), ".cache", "puppeteer", "chrome")];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const entry of readdirSync(root).sort().reverse()) {
      for (const candidate of [join(root, entry, "chrome"), join(root, entry, "chrome-linux64", "chrome")]) {
        if (isExecutableFile(candidate)) found.push(candidate);
      }
    }
  }
  return found;
}

export function findBrowser(env = process.env) {
  for (const variable of BROWSER_ENV) {
    const value = env[variable];
    if (value && isExecutableFile(value)) return { path: value, source: variable };
  }
  const pathEntries = (env.PATH ?? "").split(delimiter).filter(Boolean);
  for (const name of BROWSER_NAMES) {
    for (const entry of pathEntries) {
      const candidate = join(entry, name);
      if (isExecutableFile(candidate)) return { path: candidate, source: "PATH" };
    }
  }
  for (const candidate of INSTALL_PATHS) {
    if (isExecutableFile(candidate)) return { path: candidate, source: "install path" };
  }
  for (const candidate of cachedBrowsers()) return { path: candidate, source: "browser cache" };
  return null;
}

// Percent-encode each path segment so a page in a directory containing a
// space, a hash, or a question mark still loads.
export function fileUrl(path) {
  return "file://" + path.split("/").map(encodeURIComponent).join("/");
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(label + " timed out after " + ms + " ms")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// One browser process, one protocol connection. `send` addresses the browser
// when no sessionId is given and a page when one is. `waitFor` resolves on the
// next event of a name, so a navigation can wait for its load event.
export class Browser {
  constructor(child) {
    this.child = child;
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = [];
    this.listeners = [];
    this.buffer = "";
    this.stderr = "";
    this.closed = false;
    child.stderr.on("data", (chunk) => {
      this.stderr = (this.stderr + chunk.toString("utf8")).slice(-4000);
    });
    child.stdio[4].on("data", (chunk) => this.receive(chunk));
    child.on("exit", () => {
      this.closed = true;
      for (const { reject } of this.pending.values()) reject(new Error("the browser exited"));
      this.pending.clear();
      for (const { reject } of this.waiters) reject(new Error("the browser exited"));
      this.waiters = [];
    });
  }

  static async launch(executable, { profileDir }) {
    const args = [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-sync",
      "--hide-scrollbars",
      "--user-data-dir=" + profileDir,
      "--remote-debugging-pipe",
      "about:blank",
    ];
    const child = spawn(executable, args, { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] });
    const browser = new Browser(child);
    const spawned = new Promise((resolve, reject) => {
      child.once("spawn", resolve);
      child.once("error", reject);
    });
    await withTimeout(spawned, LAUNCH_TIMEOUT_MS, "launching the browser");
    await withTimeout(browser.send("Browser.getVersion"), LAUNCH_TIMEOUT_MS, "the browser's first reply");
    return browser;
  }

  receive(chunk) {
    this.buffer += chunk.toString("utf8");
    let index;
    while ((index = this.buffer.indexOf("\0")) !== -1) {
      const text = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + 1);
      let message;
      try {
        message = JSON.parse(text);
      } catch {
        continue;
      }
      if (message.id !== undefined && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message + (message.error.data ? ": " + message.error.data : "")));
        else resolve(message.result ?? {});
        continue;
      }
      if (message.method) {
        for (const listener of this.listeners) {
          if (listener.method === message.method && (!listener.sessionId || listener.sessionId === message.sessionId)) listener.fn(message.params ?? {});
        }
        this.waiters = this.waiters.filter((waiter) => {
          if (waiter.method !== message.method || (waiter.sessionId && waiter.sessionId !== message.sessionId)) return true;
          waiter.resolve(message.params ?? {});
          return false;
        });
      }
    }
  }

  send(method, params = {}, sessionId) {
    if (this.closed) return Promise.reject(new Error("the browser has exited"));
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    const reply = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
    this.child.stdio[3].write(JSON.stringify(payload) + "\0");
    return withTimeout(reply, COMMAND_TIMEOUT_MS, method);
  }

  // Call fn for every event of this method, for as long as the browser runs.
  on(method, fn, sessionId) {
    this.listeners.push({ method, fn, sessionId });
  }

  waitFor(method, sessionId, ms = COMMAND_TIMEOUT_MS) {
    const event = new Promise((resolve, reject) => this.waiters.push({ method, sessionId, resolve, reject }));
    return withTimeout(event, ms, "waiting for " + method);
  }

  async openPage() {
    const { targetId } = await this.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await this.send("Target.attachToTarget", { targetId, flatten: true });
    await this.send("Page.enable", {}, sessionId);
    await this.send("Runtime.enable", {}, sessionId);
    return new Page(this, sessionId, targetId);
  }

  async close() {
    if (this.closed) return;
    try {
      await withTimeout(this.send("Browser.close"), 3000, "Browser.close");
    } catch {
      // The process is killed below either way.
    }
    if (!this.closed) this.child.kill();
  }
}

export class Page {
  constructor(browser, sessionId, targetId) {
    this.browser = browser;
    this.sessionId = sessionId;
    this.targetId = targetId;
  }

  send(method, params) {
    return this.browser.send(method, params, this.sessionId);
  }

  // Width and height of the viewport. Height only matters for what is on
  // screen before scrolling; captures are clipped to elements beyond it.
  async setViewport(width, height) {
    await this.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 640 });
  }

  async setColorScheme(scheme) {
    await this.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: scheme }] });
  }

  // Apply the print stylesheet on screen, or "screen" to return to it.
  async setMedia(media) {
    await this.send("Emulation.setEmulatedMedia", { media });
  }

  // Exceptions and console.error calls from the page, collected from the
  // moment this is called; the render pass reports them.
  collectErrors() {
    const errors = [];
    this.browser.on("Runtime.exceptionThrown", (params) => {
      const detail = params.exceptionDetails ?? {};
      errors.push(detail.exception?.description ?? detail.text ?? "exception");
    }, this.sessionId);
    this.browser.on("Runtime.consoleAPICalled", (params) => {
      if (params.type === "error") errors.push((params.args ?? []).map((arg) => arg.description ?? arg.value).join(" "));
    }, this.sessionId);
    return errors;
  }

  // The page as a PDF through the browser's own print path, so what verify
  // checks is what a reader's "Save as PDF" produces. Page size and margins
  // come from the page's own @page rule.
  async printToPDF() {
    const { data } = await this.send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true, transferMode: "ReturnAsBase64" });
    return Buffer.from(data, "base64");
  }

  async navigate(url) {
    const loaded = this.browser.waitFor("Page.loadEventFired", this.sessionId);
    await this.send("Page.navigate", { url });
    await loaded;
    // Let the runtime's first render and any font swap settle.
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  async evaluate(expression) {
    const { result, exceptionDetails } = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (exceptionDetails) throw new Error("page script failed: " + (exceptionDetails.exception?.description ?? exceptionDetails.text));
    return result.value;
  }

  // A PNG of one region in page coordinates, whether or not it is on screen.
  async capture(clip) {
    const { data } = await this.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: clip.x, y: clip.y, width: clip.width, height: clip.height, scale: 1 },
    });
    return Buffer.from(data, "base64");
  }

  async close() {
    await this.browser.send("Target.closeTarget", { targetId: this.targetId });
  }
}
