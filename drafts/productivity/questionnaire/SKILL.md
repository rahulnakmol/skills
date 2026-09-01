---
name: questionnaire
description: User-invoked construction of a written questionnaire for the one person who can settle a decision the run cannot settle alone. Use when work is blocked on knowledge a named individual holds, and the answers will be filled in asynchronously or worked through together in a meeting.
---

# Questionnaire (user-invoked)

Turn a decision you cannot answer alone into a written set of questions for the person who can.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo]
  trace: questionnaire
```

## When to invoke

- A run is blocked on a fact that only one named person holds
- A decision needs a stakeholder's input and the stakeholder is not in the session
- A meeting is on the calendar and the time will be spent poorly without written questions
- The user asks for a questionnaire, an intake form, a list of questions, or a stakeholder interview
- Questioning the user about the topic has stalled, because the answers sit outside what they know

## Procedure

1. Interrogate the send, not the subject. The questions that shape a questionnaire are about the recipient, the decision, and the deadline. Questioning the user about the topic itself is the one thing that cannot work here, because not knowing the topic is why the questionnaire exists.
2. Name the recipient before writing a single question: one person, with a role. "The team" is an address no one answers.
3. Ask the user what that person knows that they do not. The answer sets the boundary of the questionnaire; anything outside it belongs in the user's own analysis.
4. Ask what decision the answers unblock, and record it in one sentence. A question that changes no decision is a question you are asking out of curiosity, at someone else's cost.
5. Ask what happens if no reply arrives: the date the decision must be made anyway, and the default that will be taken. This becomes the closing line of the questionnaire, and it usually raises the reply rate more than the questions do.
6. Choose the channel. An asynchronous questionnaire has to survive without you in the room, so every question carries its own context. A meeting version can lean on discussion, but still gets sent ahead so the recipient can prepare.
7. Write each question so it stands alone, asks one thing, and states plainly why it is being asked and what turns on the answer. A recipient who understands the stake gives a usable answer instead of a polite one.
8. Offer concrete options where the space is genuinely closed, so the recipient can tick rather than compose. Leave a question open where it is open; a forced choice over an open space returns a wrong answer wearing the appearance of a decision.
9. Order the questions by cost to answer, cheapest first. Early momentum on easy questions carries a recipient into the expensive ones.
10. Mark each question blocking or nice to have. A busy recipient answers the first three and stops, so the marking decides whether those three are the right three.
11. Append the trace entry: the recipient, the decision blocked, the count of blocking questions, and the reply deadline.
12. Write the questionnaire to the scope directory and give the user the path. Sending it is the user's act, not the skill's.

## Stop conditions

- The user can answer a question themselves → cut it; asking what the sender already knows spends the recipient's attention and lowers the odds the rest gets answered
- No single recipient can be named → stop and resolve that first; a questionnaire addressed to nobody is never returned
- Every question is marked blocking → re-rank them; when everything blocks, nothing is triaged and the recipient guesses
- The decision does not actually depend on the answers → do not send it; make the decision and record the reasoning in the trace
- The answers cannot arrive before the decision is due → state the default in the questionnaire and ask the recipient to object rather than to answer

## Output contract

```yaml
recipient: <name and role>
channel: async | meeting
decision: <what the answers unblock, one sentence>
deadline: <date the answers are needed>
default: <what will be decided if no reply arrives>
questions:
  - id: Q1
    ask: <one question, readable without the conversation>
    why: <what turns on the answer>
    options: [<closed choice>]   # omit where the space is genuinely open
    blocking: true
    cost: low | high
blocking_count: <number>
document: .grit/<scope>/QUESTIONS.md
```

## Sibling skills

- `handoff` — when the gap is a missing record of the run rather than a decision only another person can settle
- `grit` — holds the gate these answers unblock, and where a returned answer lands as evidence
- `core/GRILL.md` — questioning the user about their own idea, which runs in the opposite direction to this skill
- `core/TRACE.md` — the record this skill appends its entry to
