# Writing rules an agent follows

Instructions written for people and instructions written for agents fail in different ways. A person who reads a vague rule asks what it means. An agent does not: it picks the reading that best matches the task in front of it, and it picks a different one next time. Most of what follows is aimed at that single problem — making the same instruction produce the same behavior on every run.

## The three layers

A brief has three kinds of content, and mixing them is the most common reason a brief stops working.

- **Definitions** state what the team's words mean. They are short, they rarely change, and they remove a large share of ambiguity for what they cost. When a team says "done," "ready," "the pipeline," or "the customer," an agent will supply a plausible general meaning unless the team supplies its own.
- **Rules** state what to do. They apply on every task or on a stated trigger, and they are the part that has to be always loaded.
- **References** are the deep material a rule points at: the runbook, the checklist, the worked example. They belong in separate files, reached only when the rule that names them applies.

The reason for the split is cost. Always-loaded text is read on every turn of every session, by every agent, whether or not it is relevant. Referenced material costs only the line that names it until something actually needs it. Push too much down and agents miss what they needed; keep too much up and the file grows past the point where any of it is reliably attended to.

## Anatomy of a rule

A rule that fires reliably has three parts:

1. **A trigger**: the condition under which it applies. "When adding a dependency," "before opening a pull request," "on any customer-facing copy." An untriggered rule ("we value clean code") applies to nothing in particular and is followed accordingly.
2. **An instruction**: what to do. One action, stated plainly.
3. **An observable result**: what a reader can check to see whether the rule was followed. "The changelog entry exists," "the test name matches the behavior it asserts," "no direct commit on the default branch."

The observable result is what separates a rule from an aspiration, and it is what makes a rule testable later. It also disciplines the writing: a rule whose result cannot be described is usually two rules, or a preference, or a value.

## Say what to do

State the target behavior rather than the banned one. Attention lands on whatever the instruction describes, so a rule written as a prohibition puts the unwanted behavior in front of the agent on every turn, and the negation carrying it is a weak modifier by comparison. "Write comments that explain why, in one line" outperforms "don't write long comments."

Some rules are genuinely prohibitions — a hard boundary around production data, credentials, or an irreversible action. Write those as prohibitions, because the boundary matters more than the phrasing, and give each one a positive twin that says what to do instead: never write to the production database; work against the seeded local copy.

## One meaning, one place

Each rule should exist in exactly one file. Duplication looks harmless and costs three ways: it doubles the maintenance, it inflates the rule's apparent importance relative to its neighbors, and when the two copies drift, no reader can tell which one is current. Where two tools need the same rule, one file holds it and the other names that file (`SURFACES.md`).

The environment is a source of truth too. Script names in `package.json`, the directory layout, a linter's configuration, a command's help output — an agent can read all of these. A brief that restates them is a copy that goes stale, and the staleness is invisible until someone follows the copy. Write down what an agent cannot discover by looking: the convention nobody encoded, the reason behind an unusual choice, the failure that a config file does not explain.

## What not to write down

A rule that describes what an agent already does by default spends attention to change nothing. "Be thorough," "write clean code," "consider edge cases" — competent models already lean this way, and adding them dilutes the rules that do change behavior. The test is whether the instruction changes the output against the same task without it, and the way to settle a disagreement about that is to run both versions rather than to argue about it.

The same test applies to strength. If a rule is meant to override a default the agent keeps returning to, it needs to be specific enough to win: name the case, name the action, name the check.

## Definitions earn their place

A glossary is the cheapest part of a brief and often the most effective. Three kinds of term belong in it: words the team uses differently from the industry, states in the team's own process ("ready," "in review," "shipped"), and names of internal systems that would otherwise be guessed at. Keep each definition to a sentence or two. A glossary that becomes an encyclopedia has turned into a reference and should be moved behind a pointer.

## Testing a rule

Rules are tested by running work, not by rereading them. Take a real task the rule governs, run it on the surface where the rule is installed, and look at the output for the observable result. Three outcomes and what each one means:

- **The rule fired.** Record the task as the rule's evidence, so a later reader knows it once worked.
- **The rule did not fire and the task was clearly in scope.** The trigger wording is the usual cause: it did not match the situation the agent believed it was in. Sharpen the trigger before lengthening the explanation.
- **The rule fired when it should not have.** The trigger is too broad. Narrow it, rather than adding a second rule that carves out the exception.

## Keeping the brief alive

Give the brief an owner and a review date, and treat a removal as an ordinary edit rather than an admission. Old rules settle in layers, because adding one feels safe and deleting one feels risky, and a file where half the rules are dead teaches an agent — and every new person on the team — that the other half is negotiable. Reviewing on a cadence and deleting on sight is what keeps the rest credible.
