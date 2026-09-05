# The journey: how an exhibit page argues

An exhibit page is not a document with charts in it. It is a sequence of acts, each of which asks the reader to do one thing and then shows what that did. This file states the rules the storyboard follows. Load it before writing a storyboard, and read the storyboard against it before showing the storyboard to the user.

The rules come from three sources: the explorable-explanation tradition that `PLAN.md` surveys, the house voice's demand that every claim sit next to its evidence and its limit, and the one-figure-one-claim rule this repository already applies to visuals. They are stated as rules because a storyboard is checked against them; the reasoning follows each one so an author can tell a real exception from a shortcut.

## The eight rules

1. **Open with the question and a first experience, not a definition.** The reader should see or move something on the first screen. A definition asks for trust before it has earned any; a working model earns it. The `hook` act exists for this. A page whose first act is a glossary or a map has started in the wrong place.

2. **State the point of view early, in one sentence, and attribute it to evidence.** The storyboard's `thesis` is that sentence. It appears in the masthead, so the reader knows what the page will argue before the argument begins. The thesis names what supports it, a test, a source, or an observed behavior, and the limit that comes with it. "Four gates catch most of the rework" is a thesis; "four gates are essential" is a slogan.

3. **One act, one claim, one figure.** Each act's `claim` is one sentence the act shows to be true at the reader's chosen settings. A figure that carries two arguments is two acts that have not been separated yet. The test is simple: can the takeaway be one sentence? If it needs "and", split the act.

4. **Climb in order.** Each act depends on the one before it and sets up the one after. `map` before `mechanism`, because the reader needs to know where a part sits before seeing how it works. `evidence` after the claim it supports. `decision` after the reader has enough to judge it. The reader can scroll back at any time, so an act may refer to an earlier one but never to a later one.

5. **Interaction must teach.** A control the reader moves has to change something the claim depends on, and the takeaway has to change with it. A slider that changes only a color, or a button that only reveals text, is decoration. The stop condition in `SKILL.md` follows from this rule: a storyboard with no act whose control changes a model is a document, and `press` renders documents.

6. **Diagrams argue by shape.** A one-to-many relationship is a fan-out; a sequence is a line; an aggregation converges on one node. The reader should be able to name the relationship before reading a label. Every arrow carries a verb in `data-label`, because an unlabeled arrow asserts a relationship without saying which one. Each kind of node takes one series color (`x-series-1` for the first kind, `x-series-2` for the second) and keeps it for the whole page, so the reader learns the mapping once; the legend names it.

7. **End in a sandbox.** The last act that carries a model hands the reader every parameter the earlier acts held fixed, with presets that reproduce each earlier act's settings and a reset. The reader can then ask a question the author did not. A `glossary` may follow the sandbox; a new claim may not.

8. **Export the reader's state.** The page ends with one button that emits what the reader chose, the settings, the ranking, the marks on a decision, as markdown. The export is the reason the page's state lives in one object: what the reader sees and what the reader copies out are the same values. An act that holds state the export cannot name has hidden something from the reader.

## Applying the rules to a storyboard

A storyboard usually has five to eight acts. Fewer than four means the topic has no mechanism to show, and the page will be a hook and a sandbox around one model; that is a valid page, but check whether the topic is a document. More than nine means two topics share a page; split them.

The order that most topics fit:

```diagram
┌──────┐   ┌─────┐   ┌───────────┐   ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌─────────┐   ┌──────────┐
│ hook │──▶│ map │──▶│ mechanism │──▶│ compare │──▶│ evidence │──▶│ decision │──▶│ sandbox │──▶│ glossary │
└──────┘   └─────┘   └───────────┘   └─────────┘   └──────────┘   └──────────┘   └─────────┘   └──────────┘
 question   territory  how one part    options       the data       the view       the model    the terms
                       works           weighed       behind it      to judge       opened up
```

A `timeline` act sits wherever the topic's history or sequence of decisions matters, most often between `map` and `mechanism` or just before `decision`. Not every page uses every type. A page may repeat `mechanism` for two parts that both need showing, as long as each carries one claim.

Write the `claim` for each act as the sentence the takeaway will state at the default settings. If the claim cannot be checked by moving the act's control, the act is missing its control or its claim.

## What the rules do not decide

The rules decide structure. They do not decide the topic's content, the figure's design beyond its shape, or the page's voice, which comes from the brand skill. They also do not settle a conflict between what the evidence shows and what the user wants the page to argue; when that happens, the page argues what the evidence shows, and the report to the user says so.
