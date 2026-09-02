---
name: teach
description: User-invoked teaching of a skill or concept across several sessions, which uses the working directory as a stateful workspace so the level established, the exercises set, and the sticking points survive between sessions — use it when the goal is for the learner to hold the knowledge afterward rather than to receive a finished artifact.
---

# Teach (user-invoked)

Teach one concept per session, check it by application, and leave a workspace the next session resumes from.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  trace: lesson
```

## When to invoke

- The learner wants to understand a topic over time rather than receive one answer
- A workspace from an earlier session exists and the learner is returning to it
- The learner asks to be taught, coached, or quizzed on a topic in the repository
- The learner will do the work unaided later, so the knowledge has to stay with them
- An explanation has failed twice, which points at a missing prerequisite rather than wording

## Procedure

1. Read the workspace before teaching anything: the progress record, the last exercise set, and the note on where the learner struggled. A session that restarts the course loses the ground the last one gained. When no workspace exists, say so plainly and create one.
2. Keep the workspace in the scope directory that already holds the trace, rather than opening a second state directory. Two partial records of the same course will disagree, and a later reader cannot tell which one is current.
3. Establish what the learner already knows before teaching. Ask them to do something small with the topic rather than to describe their experience, because self-reported level is unreliable in both directions. State the level you concluded so the learner can correct it. A lesson pitched at the wrong level costs both parties the session.
4. Pick one concept for the session, and one only. Two concepts taught together tend to be learned as one blurred thing, and neither can then be checked on its own.
5. Build on what the learner already holds. Restarting from first principles every session is a convenience for the teacher: it re-covers settled ground and pushes the new material into the last few minutes.
6. Teach the concept, then stop teaching and hand over the work. Check understanding by asking the learner to apply the concept to a case they have not seen. Restating a definition is recall, and recall proves little, because a learner can repeat a rule accurately and still not recognize where it applies.
7. Write the exercise into the workspace (`EXERCISES.md`) and record its real answer at the same time (`SOLUTIONS.md`). An answer written afterward drifts toward whatever the learner produced, which turns the check into a formality.
8. Resist solving the exercise. A learner who is handed the answer learns less than one who is allowed to be stuck productively. Offer a smaller step, a hint, or a worked case that is close but not the same. Say plainly that the answer is being withheld and why, so the withholding reads as method rather than evasion.
9. Record the session in the progress file (`PROGRESS.md`) before it ends: the level established, the concept covered, the exercise set, what the learner got wrong and how it went wrong, and where the next session starts. Write it while the evidence is in front of you, not from memory at the close.
10. Append the trace entry under the `lesson` kind: the level established, the concept taught, the applied check and its result, and what the session left open.

## Stop conditions

- The learner cannot do anything with the topic at the chosen level → drop one level and teach the prerequisite; a lesson above the floor spends the session for nothing
- The check produces a correct restatement but no correct application → treat the concept as untaught and reteach it from a different example rather than moving on
- The learner asks for the answer while still producing attempts → withhold it, say that you are withholding it and why, and offer a smaller step
- Attempts have stopped and being stuck is producing nothing → give the answer and walk through it, because unproductive stuckness teaches discouragement rather than the concept
- The workspace and the learner disagree about what was covered → trust neither record, re-establish the level with one applied question, and correct the file

## Output contract

```yaml
topic: <the skill or concept being taught>
session: <n>
level: <what the learner demonstrated at the start, and how it was checked>
concept: <the one concept taught this session>
check:
  applied_to: <a case the learner had not seen>
  result: correct | partial | incorrect
exercises:
  - id: EXERCISES.md#<id>
    answer_recorded: yes
    withheld: yes | no
struggled: <where the learner struggled, and what the misunderstanding was>
next: <the concept the next session starts with>
open: <what this session left unfinished, or none>
```

## Sibling skills

- `wait-what` — use instead when a single explanation failed and the gap is wording rather than a missing prerequisite
- `brief` — where the knowledge belongs to a team rather than one learner, write it once where the team's agents read it
- `core/VERIFICATION.md` — open the workspace files and read them against the session before reporting a lesson done
- `core/TRACE.md` — defines the `lesson` kind this skill appends
