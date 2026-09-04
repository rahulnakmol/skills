# Choosing the view

Load this guide after the question and source are established. The format follows the claim. It does not lead it.

## The selection rule

Choose the least expressive form that still shows the relationship the human must understand. A richer format creates more room for unsupported detail and more surface to verify.

| The question | Start with | What it should expose |
|---|---|---|
| What rule does this logic follow? | Pseudocode | Branches, conditions, and outcomes |
| What calls what at runtime? | Call tree | Order, fan-out, retries, and return path |
| What contains or owns this state? | Component tree | Composition and state ownership |
| Which file owns each responsibility? | File tree | Boundaries and the smallest relevant neighborhood |
| How do parts or actors interact? | Diagram | Direction, transfer, and named boundaries |
| What changes from an established shape? | Diff | Additions, removals, and preserved context |
| Does ordering or copyability matter? | Full block | The complete local shape with no hidden middle |
| Is the subject visual, dense, or interactive? | Focused HTML | Layout, state comparison, or controlled interaction |

If two rows appear to fit, begin with the one higher in the table. Escalate only when that form hides a relationship that changes the answer.

## Pseudocode

Use pseudocode for policy and logic. Keep names from the source when they carry domain meaning. Remove syntax that does not affect the branch being explained. Mark inferred behavior on the line where it appears.

Pseudocode is not executable evidence. When the question is whether the implementation actually behaves this way, cite the implementation and pair the view with the observed check instead of presenting the sketch as a test.

## Trees

A call tree shows runtime order. A component tree shows composition and state ownership. A file tree shows repository ownership. They look similar and answer different questions, so label the tree type.

Keep trees shallow. Include a sibling only when the relationship between siblings matters. Use short edge annotations for calls, events, or state transfer rather than explaining those relationships in a paragraph below the tree.

## Diagrams

Use a plain-text box diagram when it can carry the claim. It renders in terminals, review comments, and chat surfaces without another tool. Use Mermaid only when the user requests it or the host is known to render it. Keep editable source beside any rendered image.

Every arrow gets a meaning. Every boundary gets a name. Color may reinforce a distinction but may not be the only way to read it. A current-state and proposed-state diagram labels both states in the figure.

## Diffs and full blocks

Use a diff when the reader already knows the surrounding shape and the claim is the change. Retain enough context to show ownership and order. A diff that omits the boundary where behavior moves can make a large change look local.

Use a full block when most of the content is new, when omitted lines would hide ordering, or when the reader needs a copyable target. Highlight the lines carrying the claim in the explanation rather than adding decorative syntax to the block.

## Focused HTML

HTML is the last step on the ladder. It is justified when the subject itself is visual, when two layouts or states must be compared at realistic dimensions, or when interaction is part of the explanation. Read `ARTIFACTS.md` before writing it.

Do not use HTML to make a simple flow look more authoritative. A polished view built on an inference is still an inference.

## Combining views

Combine no more than two forms unless the user asks for a broader walkthrough. A common valid pair is a shallow file tree followed by one call tree. The first locates ownership; the second shows behavior. Give each its own claim and source list.

When the second form merely repeats the first, remove it. Progressive disclosure means the reader can ask for the next layer. It does not mean every layer appears in the first answer.
