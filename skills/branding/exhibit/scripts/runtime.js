// exhibit runtime : the script scaffold.mjs inlines into every page, after
// GSAP, ScrollTrigger, any motion plugin the storyboard asked for, and htmx,
// and before Alpine. No network, no build step.
//
// Alpine owns state and binding: an act is an `x-data` scope, controls use
// `x-model`, text uses `x-text`, figures redraw in `x-effect`. This file adds
// what a journey page needs on top of that and nothing else:
//
//   components   stepper, compare, legend, decision, exhibitPage
//   directives   x-reveal, x-parallax, x-count, x-draw, x-morph,
//                x-highlight, x-spotlight, x-scene
//   page         act tracking, the progress bar, deck keys, figure copy
//                buttons, the markdown export, and Exhibit.finish() for print
//
// Motion is governed, not decorated. The brand's grade (data-grade on <html>)
// and forbid list decide which effects exist; prefers-reduced-motion removes
// all of them; durations and curves are the brand's tokens. An author names an
// effect and never writes one by hand (see PRIMITIVES.md).
(function () {
  "use strict";

  var root = document.documentElement;
  var Exhibit = window.Exhibit;
  var queues = Exhibit._queues;
  var reduced = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var grade = root.getAttribute("data-grade") || "expressive";
  var register = root.getAttribute("data-register") || "document";
  var mode = root.getAttribute("data-mode") || "scroll";
  var forbid = (root.getAttribute("data-motion-forbid") || "").split(/\s+/).filter(Boolean);
  var hasGsap = typeof window.gsap !== "undefined";
  var hasScroll = hasGsap && typeof window.ScrollTrigger !== "undefined";
  var motionOn = hasGsap && !reduced.matches;
  root.setAttribute("data-motion", motionOn ? "on" : "off");

  // The effects each grade permits. The same table lives in scaffold.mjs,
  // which refuses a storyboard that asks for more; this copy governs the page
  // when an author names an effect the storyboard did not.
  var GRADE = {
    calm: ["reveal", "focus", "count", "highlight"],
    fluid: ["reveal", "focus", "count", "highlight", "morph", "draw", "spotlight"],
    expressive: ["reveal", "focus", "morph", "count", "draw", "spotlight", "highlight", "parallax"],
  };

  function allows(effect) {
    return motionOn && (GRADE[grade] || GRADE.calm).indexOf(effect) !== -1 && forbid.indexOf(effect) === -1;
  }

  // ------------------------------------------------------------------ tokens

  function token(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  function seconds(name, fallback) {
    var value = parseFloat(token(name));
    return isNaN(value) ? fallback : value / 1000;
  }

  var duration = {
    micro: seconds("--brand-motion-micro", 0.16),
    reveal: seconds("--brand-motion-reveal", 0.64),
    scene: seconds("--brand-motion-scene", 1.2),
  };
  var parallaxDepth = parseFloat(token("--brand-parallax")) || 0;

  // A CSS cubic-bezier() becomes a GSAP ease, so the one curve the brand states
  // drives CSS transitions and scripted motion alike. Newton-Raphson on the
  // unit bezier, as browsers do it.
  function unitBezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    function sampleX(t) { return ((ax * t + bx) * t + cx) * t; }
    function sampleY(t) { return ((ay * t + by) * t + cy) * t; }
    function derivativeX(t) { return (3 * ax * t + 2 * bx) * t + cx; }
    function solveX(x) {
      var t = x, i, d, s;
      for (i = 0; i < 8; i += 1) {
        s = sampleX(t) - x;
        if (Math.abs(s) < 1e-6) return t;
        d = derivativeX(t);
        if (Math.abs(d) < 1e-6) break;
        t -= s / d;
      }
      var lo = 0, hi = 1;
      t = x;
      while (lo < hi) {
        s = sampleX(t);
        if (Math.abs(s - x) < 1e-6) return t;
        if (x > s) lo = t; else hi = t;
        t = (hi - lo) / 2 + lo;
      }
      return t;
    }
    return function (x) { return x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveX(x)); };
  }

  var KEYWORDS = { linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], "ease-in": [0.42, 0, 1, 1], "ease-out": [0, 0, 0.58, 1], "ease-in-out": [0.42, 0, 0.58, 1] };

  function registerEase(name, css) {
    if (!hasGsap) return;
    var points = KEYWORDS[css];
    var match = css.match(/cubic-bezier\(([^)]+)\)/);
    if (match) points = match[1].split(",").map(parseFloat);
    if (!points || points.length !== 4 || points.some(isNaN)) points = KEYWORDS["ease-out"];
    window.gsap.registerEase(name, unitBezier(points[0], points[1], points[2], points[3]));
  }

  registerEase("brand-standard", token("--brand-ease-standard"));
  registerEase("brand-enter", token("--brand-ease-enter"));
  registerEase("brand-exit", token("--brand-ease-exit"));
  if (hasScroll) window.gsap.registerPlugin(window.ScrollTrigger);
  if (hasGsap && window.DrawSVGPlugin) window.gsap.registerPlugin(window.DrawSVGPlugin);
  if (hasGsap && window.MorphSVGPlugin) window.gsap.registerPlugin(window.MorphSVGPlugin);
  if (hasGsap && window.Flip) window.gsap.registerPlugin(window.Flip);
  if (hasGsap && window.SplitText) window.gsap.registerPlugin(window.SplitText);

  // Run fn once when el first scrolls near the viewport. ScrollTrigger when it
  // is present, IntersectionObserver otherwise, at once when neither exists.
  function onEnter(el, fn, start) {
    if (hasScroll) {
      window.ScrollTrigger.create({ trigger: el, start: start || "top 85%", once: true, onEnter: fn });
    } else if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) { observer.disconnect(); fn(); }
      }, { rootMargin: "0px 0px -15% 0px" });
      observer.observe(el);
    } else {
      fn();
    }
  }

  function decimalsOf(value) {
    var text = String(value);
    var dot = text.indexOf(".");
    return dot === -1 ? 0 : Math.min(text.length - dot - 1, 6);
  }

  function format(value, decimals) {
    return Number(value).toFixed(decimals);
  }

  // ------------------------------------------------------------- components

  function stepper(count) {
    return {
      step: 1,
      count: Number(count) || 1,
      init: function () {
        var self = this;
        this.$el.setAttribute("data-step-count", String(this.count));
        this.$el.setAttribute("data-steps", "");
        if (!this.$el.hasAttribute("tabindex")) this.$el.setAttribute("tabindex", "0");
        this.$el.addEventListener("keydown", function (event) {
          if (event.target !== self.$el && /^(input|select|textarea)$/i.test(event.target.tagName)) return;
          if (event.key === "ArrowRight") { self.next(); event.preventDefault(); }
          if (event.key === "ArrowLeft") { self.prev(); event.preventDefault(); }
        });
        this.$watch("step", function () { self.apply(); });
        this.apply();
      },
      apply: function () {
        var step = this.step;
        Array.prototype.forEach.call(this.$el.querySelectorAll("[data-step]"), function (panel) {
          var active = Number(panel.getAttribute("data-step")) === step;
          if (active) { panel.setAttribute("data-active", ""); panel.setAttribute("aria-current", "step"); }
          else { panel.removeAttribute("data-active"); panel.removeAttribute("aria-current"); }
        });
        this.$el.dispatchEvent(new CustomEvent("step:change", { bubbles: true, detail: { step: step, count: this.count } }));
      },
      next: function () { if (this.step < this.count) this.step += 1; },
      prev: function () { if (this.step > 1) this.step -= 1; },
      go: function (n) { n = Number(n); if (n >= 1 && n <= this.count) this.step = n; },
      get atStart() { return this.step <= 1; },
      get atEnd() { return this.step >= this.count; },
      get title() {
        var panel = this.$el.querySelector('[data-step="' + this.step + '"] .x-step-title, [data-step="' + this.step + '"] h3');
        return panel ? panel.textContent.replace(/\s+/g, " ").trim() : "";
      },
    };
  }

  // compare({ weights: { cost: 3 }, scores: { a: { cost: 2 }, b: { cost: 4 } }, labels: { a: "Option A" } })
  function compare(config) {
    config = config || {};
    return {
      weights: config.weights || {},
      scores: config.scores || {},
      labels: config.labels || {},
      init: function () {
        var self = this;
        this.$el.setAttribute("data-compare", "");
        Alpine.effect(function () { self.apply(); });
      },
      get options() { return Object.keys(this.scores); },
      get totals() {
        var self = this;
        var out = {};
        this.options.forEach(function (option) {
          var total = 0;
          Object.keys(self.weights).forEach(function (criterion) {
            total += Number(self.weights[criterion] || 0) * Number((self.scores[option] || {})[criterion] || 0);
          });
          out[option] = total;
        });
        return out;
      },
      label: function (option) { return this.labels[option] || option; },
      get ranked() {
        var totals = this.totals;
        return this.options.slice().sort(function (a, b) { return totals[b] - totals[a]; });
      },
      get leader() {
        var ranked = this.ranked;
        var totals = this.totals;
        if (ranked.length > 1 && totals[ranked[0]] === totals[ranked[1]]) return "a tie";
        return ranked.length ? this.label(ranked[0]) : "";
      },
      get ranking() {
        var self = this;
        var totals = this.totals;
        return this.ranked.map(function (option, index, list) {
          var next = list[index + 1];
          return self.label(option) + (next ? (totals[option] === totals[next] ? " = " : " > ") : "");
        }).join("");
      },
      apply: function () {
        var ranked = this.ranked;
        var totals = this.totals;
        var leader = ranked.length > 1 && totals[ranked[0]] === totals[ranked[1]] ? null : ranked[0];
        var table = this.$el.tagName === "TABLE" ? this.$el : this.$el.querySelector("table");
        if (!table) return;
        var heads = Array.prototype.slice.call(table.querySelectorAll("thead th[data-option]"));
        var index = -1;
        heads.forEach(function (th) {
          var isLeader = th.getAttribute("data-option") === leader;
          if (isLeader) { th.setAttribute("data-leader", ""); index = Array.prototype.indexOf.call(th.parentNode.children, th); }
          else th.removeAttribute("data-leader");
        });
        Array.prototype.forEach.call(table.querySelectorAll("tbody tr, tfoot tr"), function (row) {
          Array.prototype.forEach.call(row.children, function (cell, i) {
            if (i === index && index !== -1) cell.setAttribute("data-leader", ""); else cell.removeAttribute("data-leader");
          });
        });
      },
    };
  }

  // legend("#figure"): checkboxes with data-series="n" hide a series in the
  // target; hover or focus on a legend item puts that series in focus.
  function legend(target) {
    return {
      shown: {},
      focus: null,
      init: function () {
        var self = this;
        var boxes = this.$el.querySelectorAll("input[data-series]");
        Array.prototype.forEach.call(boxes, function (box) {
          var n = box.getAttribute("data-series");
          self.shown[n] = box.checked;
          box.addEventListener("change", function () { self.shown[n] = box.checked; });
          var item = box.closest("label") || box;
          item.addEventListener("pointerenter", function () { self.focus = n; });
          item.addEventListener("pointerleave", function () { self.focus = null; });
          box.addEventListener("focus", function () { self.focus = n; });
          box.addEventListener("blur", function () { self.focus = null; });
        });
        this.$el.setAttribute("data-series-toggle", "");
        Alpine.effect(function () { self.apply(); });
      },
      apply: function () {
        var figure = typeof target === "string" ? document.querySelector(target) : target;
        if (!figure) return;
        var self = this;
        Object.keys(this.shown).forEach(function (n) {
          Array.prototype.forEach.call(figure.querySelectorAll(".x-series-" + n), function (el) {
            if (self.shown[n]) el.removeAttribute("data-hidden"); else el.setAttribute("data-hidden", "");
          });
        });
        if (this.focus !== null && allowsFocus()) figure.setAttribute("data-focus", String(this.focus));
        else figure.removeAttribute("data-focus");
      },
      get visible() {
        var self = this;
        return Object.keys(this.shown).filter(function (n) { return self.shown[n]; });
      },
    };
  }

  function allowsFocus() {
    return forbid.indexOf("focus") === -1;
  }

  // decision(["profile", "exhibit"]): a view and a note per option, counted.
  function decision(options) {
    var view = {}, note = {};
    (options || []).forEach(function (id) { view[id] = ""; note[id] = ""; });
    return {
      view: view,
      note: note,
      init: function () {
        var self = this;
        this.$el.setAttribute("data-decision", "");
        Alpine.effect(function () {
          Array.prototype.forEach.call(self.$el.querySelectorAll("[data-option]"), function (option) {
            var value = self.view[option.getAttribute("data-option")];
            if (value) option.setAttribute("data-view", value); else option.removeAttribute("data-view");
          });
        });
      },
      count: function (value) {
        var self = this;
        return Object.keys(this.view).filter(function (id) { return self.view[id] === value; }).length;
      },
      get agree() { return this.count("agree"); },
      get object() { return this.count("object"); },
      get other() { return this.count("other"); },
      get open() { return this.count(""); },
    };
  }

  function exhibitPage() {
    return { act: null, progress: 0 };
  }

  // -------------------------------------------------------------- directives

  function defineDirectives(Alpine) {
    // x-reveal[.stagger]: opacity and a short rise when the element scrolls in.
    Alpine.directive("reveal", function (el, directive) {
      var targets = directive.modifiers.indexOf("stagger") !== -1 ? Array.prototype.slice.call(el.children) : [el];
      if (!allows("reveal")) { el.setAttribute("data-revealed", ""); return; }
      var rise = grade === "calm" ? 0 : register === "cinematic" ? 32 : 20;
      onEnter(el, function () {
        el.setAttribute("data-revealed", "");
        window.gsap.fromTo(targets, { opacity: 0, y: rise }, {
          opacity: 1, y: 0, duration: duration.reveal, ease: "brand-enter", stagger: targets.length > 1 ? 0.09 : 0, overwrite: true,
          onComplete: function () { window.gsap.set(targets, { clearProps: "opacity,transform" }); },
        });
      });
    });

    // x-parallax="factor": the element travels factor × the brand's parallax
    // depth × the viewport height while its container scrolls past.
    Alpine.directive("parallax", function (el, directive) {
      if (!allows("parallax") || !hasScroll || !parallaxDepth) return;
      var factor = parseFloat(directive.expression) || 1;
      var container = el.closest(".exhibit-masthead, .act, .x-figure") || el;
      window.gsap.to(el, {
        y: function () { return -factor * parallaxDepth * window.innerHeight; },
        ease: "none",
        scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 0.4, invalidateOnRefresh: true },
      });
    });

    // x-count="expression": the number runs to its new value; data-decimals
    // fixes the precision, otherwise the target's own precision is kept.
    Alpine.directive("count", function (el, directive, utilities) {
      var read = utilities.evaluateLater(directive.expression);
      var current = null;
      utilities.effect(function () {
        read(function (value) {
          var target = Number(value);
          if (isNaN(target)) { el.textContent = String(value); return; }
          var decimals = el.hasAttribute("data-decimals") ? Number(el.getAttribute("data-decimals")) : decimalsOf(target);
          if (current === null || !allows("count")) {
            current = target;
            el.textContent = format(target, decimals);
            return;
          }
          var state = { value: current };
          current = target;
          window.gsap.to(state, {
            value: target, duration: grade === "calm" ? Math.min(duration.micro, 0.2) : duration.reveal, ease: "brand-standard", overwrite: true,
            onUpdate: function () { el.textContent = format(state.value, decimals); },
          });
        });
      });
    });

    // x-draw[="expression"]: every path, line, and polyline inside is stroked
    // in when the figure enters; with an expression, again on each change.
    Alpine.directive("draw", function (el, directive, utilities) {
      var strokes = function () { return Array.prototype.slice.call(el.querySelectorAll("path, line, polyline, circle, ellipse, rect")).filter(function (s) { return getComputedStyle(s).stroke !== "none"; }); };
      function draw() {
        if (!allows("draw")) return;
        var targets = strokes();
        if (!targets.length) return;
        if (window.DrawSVGPlugin) {
          window.gsap.fromTo(targets, { drawSVG: "0%" }, { drawSVG: "100%", duration: duration.scene, ease: "brand-standard", stagger: 0.08, overwrite: true });
        } else {
          targets.forEach(function (s) {
            if (typeof s.getTotalLength !== "function") return;
            var length = s.getTotalLength();
            window.gsap.fromTo(s, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: duration.scene, ease: "brand-standard", overwrite: true });
          });
        }
      }
      if (directive.expression) {
        var read = utilities.evaluateLater(directive.expression);
        var first = true;
        utilities.effect(function () { read(function () { if (first) { first = false; onEnter(el, draw); } else draw(); }); });
      } else {
        onEnter(el, draw);
      }
    });

    // x-morph="expression": an SVG path morphs to the d in data-morph-<value>;
    // any other element takes data-state="<value>" and its children move to
    // their new places with Flip when the plugin is present.
    Alpine.directive("morph", function (el, directive, utilities) {
      var read = utilities.evaluateLater(directive.expression);
      var first = true;
      utilities.effect(function () {
        read(function (value) {
          var state = String(value);
          if (el.tagName.toLowerCase() === "path") {
            var d = el.getAttribute("data-morph-" + state);
            if (!d) return;
            if (!first && allows("morph") && window.MorphSVGPlugin) window.gsap.to(el, { morphSVG: d, duration: duration.reveal, ease: "brand-standard", overwrite: true });
            else el.setAttribute("d", d);
          } else {
            var snapshot = !first && allows("morph") && window.Flip ? window.Flip.getState(el.children) : null;
            el.setAttribute("data-state", state);
            if (snapshot) window.Flip.from(snapshot, { duration: duration.reveal, ease: "brand-standard", absolute: true, nested: true });
          }
          first = false;
        });
      });
    });

    // x-highlight[="expression"]: a marker sweeps under the text, on enter or
    // whenever the expression is truthy.
    Alpine.directive("highlight", function (el, directive, utilities) {
      el.classList.add("x-highlight-mark");
      function sweep(on) {
        var to = on ? "100%" : "0%";
        if (!allows("highlight")) { el.style.setProperty("--x-highlight", to); return; }
        window.gsap.to(el, { "--x-highlight": to, duration: duration.reveal, ease: "brand-standard", overwrite: true });
      }
      if (directive.expression) {
        var read = utilities.evaluateLater(directive.expression);
        utilities.effect(function () { read(function (value) { sweep(Boolean(value)); }); });
      } else {
        onEnter(el, function () { sweep(true); });
      }
    });

    // x-spotlight="expression": while truthy, the page dims except this element.
    Alpine.directive("spotlight", function (el, directive, utilities) {
      var read = utilities.evaluateLater(directive.expression);
      var mask = document.querySelector(".exhibit-spotlight-mask");
      var on = false;
      function place() {
        if (!on || !mask) return;
        var r = el.getBoundingClientRect();
        var pad = 12;
        var x1 = Math.max(0, r.left - pad), y1 = Math.max(0, r.top - pad), x2 = r.right + pad, y2 = r.bottom + pad;
        mask.style.setProperty("--x-spotlight-clip", "polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, " +
          x1 + "px " + y1 + "px, " + x2 + "px " + y1 + "px, " + x2 + "px " + y2 + "px, " + x1 + "px " + y2 + "px, " + x1 + "px " + y1 + "px)");
      }
      window.addEventListener("scroll", place, { passive: true });
      window.addEventListener("resize", place);
      utilities.effect(function () {
        read(function (value) {
          on = Boolean(value) && allows("spotlight") && mask;
          if (on) { place(); mask.setAttribute("data-on", ""); el.setAttribute("data-spotlit", ""); }
          else { if (mask) mask.removeAttribute("data-on"); el.removeAttribute("data-spotlit"); }
        });
      });
      utilities.cleanup(function () { window.removeEventListener("scroll", place); window.removeEventListener("resize", place); });
    });

    // x-scene on an act: each [data-scene] child appears in turn as the reader
    // scrolls through the act, tied to scroll position, in the cinematic
    // register at the expressive grade. Elsewhere the children simply reveal.
    Alpine.directive("scene", function (el) {
      var beats = Array.prototype.slice.call(el.querySelectorAll("[data-scene]"));
      if (!beats.length) return;
      if (!(motionOn && grade === "expressive" && register === "cinematic" && hasScroll)) {
        beats.forEach(function (beat) { beat.setAttribute("data-revealed", ""); });
        if (allows("reveal")) onEnter(el, function () {
          window.gsap.fromTo(beats, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: duration.reveal, ease: "brand-enter", stagger: 0.12, clearProps: "opacity,transform" });
        });
        return;
      }
      beats.forEach(function (beat) { beat.setAttribute("data-revealed", ""); });
      var timeline = window.gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
      beats.forEach(function (beat, index) {
        timeline.fromTo(beat, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "brand-enter" }, index * 0.8);
      });
    });
  }

  // -------------------------------------------------------------------- page

  function actList() {
    return Array.prototype.slice.call(document.querySelectorAll("section.act[data-act]"));
  }

  function setCurrent(act) {
    var id = act ? act.getAttribute("data-act") : null;
    Array.prototype.forEach.call(document.querySelectorAll(".exhibit-nav a"), function (link) {
      var mine = link.getAttribute("href") === "#act-" + id;
      if (mine) link.setAttribute("aria-current", "true"); else link.removeAttribute("aria-current");
    });
    var page = document.body._x_dataStack && Alpine.$data(document.body);
    if (page) page.act = id;
  }

  function trackActs() {
    var acts = actList();
    var current = null;
    function enter(act, direction) {
      if (current === act) return;
      if (current) current.dispatchEvent(new CustomEvent("act:exit", { bubbles: true, detail: { id: current.getAttribute("data-act"), direction: direction } }));
      current = act;
      setCurrent(act);
      act.dispatchEvent(new CustomEvent("act:enter", { bubbles: true, detail: { id: act.getAttribute("data-act"), direction: direction } }));
    }
    if (hasScroll) {
      acts.forEach(function (act) {
        window.ScrollTrigger.create({
          trigger: act, start: "top 50%", end: "bottom 50%",
          onEnter: function () { enter(act, "forward"); },
          onEnterBack: function () { enter(act, "back"); },
        });
      });
    } else if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) enter(entry.target, "forward"); });
      }, { rootMargin: "-45% 0px -45% 0px" });
      acts.forEach(function (act) { observer.observe(act); });
    }
    if (acts.length && !current) setCurrent(acts[0]);
  }

  function trackProgress() {
    var bar = document.querySelector(".exhibit-progress");
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
      root.style.setProperty("--exhibit-progress", value.toFixed(4));
      if (bar) bar.setAttribute("aria-valuenow", String(Math.round(value * 100)));
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // In deck mode one act fills the screen, so the arrow keys move between
  // acts. Keys typed into a control are left alone.
  function deckKeys() {
    if (mode !== "deck") return;
    document.addEventListener("keydown", function (event) {
      if (/^(input|select|textarea|button)$/i.test(event.target.tagName) || event.target.isContentEditable) return;
      var forward = event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ";
      var back = event.key === "ArrowUp" || event.key === "PageUp";
      if (!forward && !back) return;
      var acts = actList();
      var middle = window.scrollY + window.innerHeight / 2;
      var index = acts.findIndex(function (act) { return act.offsetTop + act.offsetHeight > middle; });
      if (index === -1) index = acts.length - 1;
      var next = acts[Math.min(acts.length - 1, Math.max(0, index + (forward ? 1 : -1)))];
      if (next) { event.preventDefault(); next.scrollIntoView({ behavior: motionOn ? "smooth" : "auto", block: "start" }); }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
      document.body.removeChild(area);
      if (ok) resolve(); else reject(new Error("copy failed"));
    });
  }

  // Every figure with an inline SVG gets a copy control, added here so it is
  // the same on every page.
  function figureCopyButtons() {
    Array.prototype.forEach.call(document.querySelectorAll(".x-figure"), function (figure) {
      var svg = figure.querySelector("svg");
      if (!svg || figure.querySelector(".x-figure-copy")) return;
      var button = document.createElement("button");
      button.type = "button";
      button.className = "x-figure-copy";
      button.textContent = "Copy figure as SVG";
      button.addEventListener("click", function () {
        var clone = svg.cloneNode(true);
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        copyText(clone.outerHTML).then(function () {
          button.textContent = "Copied";
          setTimeout(function () { button.textContent = "Copy figure as SVG"; }, 1500);
        }, function () { button.textContent = "Copy failed; select the figure"; });
      });
      var caption = figure.querySelector("figcaption");
      if (caption) caption.insertAdjacentElement("afterend", button); else figure.appendChild(button);
    });
  }

  // ------------------------------------------------------------------ export

  var exporters = {};

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function labelFor(control) {
    var label = null;
    if (control.id) label = document.querySelector('label[for="' + control.id + '"]');
    if (!label) label = control.closest("label");
    if (label) return clean(label.textContent);
    return control.getAttribute("aria-label") || control.getAttribute("x-model") || control.name || "";
  }

  function scope(control) {
    var option = control.closest("[data-option]");
    if (!option) return "";
    var heading = option.querySelector("h3, h4, .x-option-title");
    return heading ? clean(heading.textContent) + " / " : "";
  }

  // The values a reader set, read from the controls themselves: Alpine keeps
  // the DOM and the model in step, so the page and the export are one thing.
  function settings(container) {
    var lines = [];
    var seenGroups = {};
    Array.prototype.forEach.call(container.querySelectorAll("input, select, textarea"), function (control) {
      if (control.type === "hidden" || control.closest(".exhibit-export") || control.hasAttribute("data-series")) return;
      if (control.type === "radio") {
        var group = (control.closest("fieldset") || container).outerHTML.length + ":" + control.name;
        if (seenGroups[group]) return;
        seenGroups[group] = true;
        var fieldset = control.closest("fieldset");
        var chosen = fieldset ? fieldset.querySelector('input[type="radio"]:checked') : (control.name ? container.querySelector('input[type="radio"][name="' + control.name + '"]:checked') : null);
        var legend = fieldset ? fieldset.querySelector("legend") : null;
        var key = legend ? clean(legend.textContent) : control.name;
        lines.push({ key: scope(control) + key, value: chosen ? labelFor(chosen) : "no choice" });
        return;
      }
      if (control.type === "checkbox") { lines.push({ key: scope(control) + labelFor(control), value: control.checked ? "yes" : "no" }); return; }
      var value = control.value;
      if (typeof value === "string" && value.trim() === "") return;
      lines.push({ key: scope(control) + labelFor(control), value: value });
    });
    return lines;
  }

  function defaultExport(act) {
    var lines = [];
    var claim = act.querySelector("h2");
    if (claim) lines.push("## " + clean(claim.textContent));
    settings(act).forEach(function (entry) { lines.push("- " + entry.key + ": " + entry.value); });
    Array.prototype.forEach.call(act.querySelectorAll("[data-steps]"), function (wrapper) {
      var data = Alpine.$data(wrapper);
      if (data && data.step) lines.push("- Step shown: " + data.step + " of " + data.count + (data.title ? ", " + data.title : ""));
    });
    Array.prototype.forEach.call(act.querySelectorAll("[data-compare]"), function (table) {
      var data = Alpine.$data(table);
      if (data && data.ranking) lines.push("- Ranking at these weights: " + data.ranking);
    });
    Array.prototype.forEach.call(act.querySelectorAll("[data-series-toggle]"), function (legendEl) {
      var data = Alpine.$data(legendEl);
      if (data && data.visible) lines.push("- Series shown: " + data.visible.join(", "));
    });
    var takeaway = act.querySelector(".x-takeaway");
    if (takeaway) lines.push("", "> " + clean(takeaway.textContent));
    return lines.join("\n");
  }

  function toMarkdown() {
    var title = document.querySelector(".exhibit-masthead h1");
    var parts = [];
    if (title) parts.push("# " + clean(title.textContent), "");
    actList().forEach(function (act) {
      var id = act.getAttribute("data-act");
      var text = typeof exporters[id] === "function" ? exporters[id](act, Alpine) : defaultExport(act);
      if (text) parts.push(text, "");
    });
    return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  function wireExport() {
    var button = document.getElementById("exhibit-export");
    var output = document.getElementById("exhibit-export-output");
    if (!button) return;
    button.addEventListener("click", function () {
      var markdown = toMarkdown();
      if (output) { output.value = markdown; output.hidden = false; }
      copyText(markdown).then(function () {
        button.textContent = "Copied as markdown";
        setTimeout(function () { button.textContent = "Export as markdown"; }, 1500);
      }, function () { button.textContent = "Copy from the box below"; });
    });
  }

  // ------------------------------------------------------------------- print

  // Bring every animation to its resting state and write each act's settings
  // as a line the print stylesheet shows in place of the controls. Called
  // before print and by verify.mjs --pdf.
  function finish() {
    if (hasScroll) window.ScrollTrigger.getAll().forEach(function (trigger) { trigger.kill(); });
    if (hasGsap) {
      window.gsap.globalTimeline.getChildren(true, true, true).forEach(function (tween) { tween.progress(1); });
      window.gsap.set("[x-reveal], [x-reveal\\.stagger], [x-reveal\\.stagger] > *, [data-scene], [x-parallax]", { clearProps: "opacity,transform" });
    }
    // The attribute selector [x-reveal] does not match x-reveal.stagger, so
    // both spellings are named; a missed one leaves a block at opacity 0.
    Array.prototype.forEach.call(document.querySelectorAll("[x-reveal], [x-reveal\\.stagger], [data-scene]"), function (el) { el.setAttribute("data-revealed", ""); });
    Array.prototype.forEach.call(document.querySelectorAll(".x-highlight-mark"), function (el) { el.style.setProperty("--x-highlight", "100%"); });
    var mask = document.querySelector(".exhibit-spotlight-mask");
    if (mask) mask.removeAttribute("data-on");
    Array.prototype.forEach.call(document.querySelectorAll(".x-controls, .x-compare-wrap, .x-decision"), function (block) {
      var line = block.querySelector(":scope > .x-print-settings") || document.createElement("p");
      line.className = "x-print-settings";
      var entries = settings(block);
      line.textContent = entries.length ? "Settings: " + entries.map(function (entry) { return entry.key + " " + entry.value; }).join("; ") : "";
      if (!line.parentNode) block.appendChild(line);
    });
    root.setAttribute("data-finished", "");
    return true;
  }

  // -------------------------------------------------------------------- boot

  document.addEventListener("alpine:init", function () {
    Alpine.data("stepper", stepper);
    Alpine.data("compare", compare);
    Alpine.data("legend", legend);
    Alpine.data("decision", decision);
    Alpine.data("exhibitPage", exhibitPage);
    queues.data.forEach(function (entry) { Alpine.data(entry[0], entry[1]); });
    queues.export.forEach(function (entry) { exporters[entry[0]] = entry[1]; });
    defineDirectives(Alpine);
    if (!document.body.hasAttribute("x-data")) document.body.setAttribute("x-data", "exhibitPage");
  });

  document.addEventListener("alpine:initialized", function () {
    figureCopyButtons();
    trackActs();
    trackProgress();
    deckKeys();
    wireExport();
    window.addEventListener("beforeprint", finish);
    var ready = queues.ready.slice();
    queues.ready.length = 0;
    ready.forEach(function (fn) { fn(Alpine); });
    if (hasScroll) window.ScrollTrigger.refresh();
    root.setAttribute("data-ready", "");
  });

  Exhibit.data = function (name, factory) {
    if (window.Alpine && root.hasAttribute("data-ready")) window.Alpine.data(name, factory); else queues.data.push([name, factory]);
  };
  Exhibit.ready = function (fn) {
    if (root.hasAttribute("data-ready")) fn(window.Alpine); else queues.ready.push(fn);
  };
  Exhibit.export = function (actId, fn) { exporters[actId] = fn; };
  Exhibit.finish = finish;
  Exhibit.toMarkdown = toMarkdown;
  Exhibit.allows = allows;
  Exhibit.grade = grade;
  Exhibit.register = register;
  Exhibit.duration = duration;
})();
