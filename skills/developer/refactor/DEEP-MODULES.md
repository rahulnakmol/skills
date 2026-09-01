# Deep modules

The vocabulary `refactor` uses to name what is wrong with a candidate. It follows John Ousterhout's *A Philosophy of Software Design*, which argues that the main cost of software is not writing it but understanding it well enough to change it.

**Load when** ranking candidates, naming a failure mode, or explaining a proposed seam to a human.

## The one measure: interface over implementation

A module is anything other code depends on through a stated interface — a class, a file, a package, a service. It has two sizes:

- **Interface width.** What a caller must understand to use it correctly. That includes the signatures, and also the rules the signatures do not state: call order, units, error cases, which fields may be null, what must be cleaned up afterward.
- **Implementation depth.** How much work and how many decisions sit behind that interface.

A **deep** module has a small interface over a lot of functionality. A Unix file has five main operations — open, read, write, close, seek — over disk scheduling, block allocation, caching, and permissions. Almost none of that reaches the caller.

A **shallow** module has an interface nearly as complicated as its implementation. It costs the reader as much to learn as it saves them in work, so it earns nothing. Shallowness is not about size: a one-line function can be deep if it hides a rule nobody wants to remember, and a thousand-line class can be shallow if using it correctly requires knowing what is inside.

Every candidate is judged on one question, stated the same way each time: name what a caller no longer has to know.

## Information leakage

Information leaks when one design decision is written into two or more modules. The symptom is that a change to one forces a matching change in another, and nothing in either module says so.

Leakage is usually easier to spot from the change history than from the code. Two files that keep appearing in the same commit, for unrelated-looking reasons, share a decision that has no single home.

Common forms:

- A file format or wire format parsed in one module and written in another.
- A default that appears as a literal in three places.
- A caller that must call `validate()` before `save()` because `save()` assumes it. The order is a decision, and it lives in the caller's head.

The fix is not to add a comment. It is to move the decision behind one interface so only one module knows it.

## Temporal decomposition

Temporal decomposition splits a system by **when** things happen instead of by **what knowledge each part hides**: read, then transform, then write; or validate, then enrich, then persist.

The split feels natural because it matches the order of execution, and it is the most common way information leakage gets designed in. If reading and writing a format are separate modules, both must know that format, and every change to it touches both.

Order of operations is a property of a run. It is a poor basis for a boundary, because a boundary should hold a body of knowledge. Sequence belongs inside a module; knowledge decides where the module ends.

The check when a split looks temporal is to state what each side hides from the other. If both sides know the same fact, the boundary is in the wrong place.

## Pass-through methods

A pass-through method does little except call another method with roughly the same signature. A chain of them means two layers hold the same abstraction, so the reader learns the interface twice and gains nothing.

Pass-through methods usually appear after a layer is added to satisfy a rule rather than to hide a decision. They are not always wrong — a genuine adapter between two vocabularies earns its place, and a stable interface in front of a volatile one earns its place. The test is whether the method changes the abstraction. If it only changes the name, remove the layer, or give it enough responsibility to be worth crossing.

A related smell is the **pass-through variable**, threaded through several call sites so a deep function can reach it. Each function on the path learns about a value it does not use.

## Where a seam belongs

A seam is a place where behavior can be changed without editing the code on either side of it. A good seam has three properties:

1. **It hides a decision.** Something on one side is unknown on the other, and the human can state what that something is in one sentence.
2. **It is narrower than what it hides.** Callers give up knowledge at the boundary. If the interface restates the implementation, moving the boundary changed nothing.
3. **It follows a fault line the change history already shows.** Seams placed where changes actually arrive pay off; seams placed where a diagram looks tidy do not.

Two checks before proposing one:

- **The caller test.** Write the new interface first, as a caller would use it. If the sentence describing correct use needs a clause about internals, the seam is in the wrong place.
- **The change test.** Name a change the codebase is likely to receive next. Count the modules it would touch before and after. If the count does not fall, the seam is decorative.

## The honest limit

This vocabulary identifies candidates and gives a human the words to judge them. It does not rank the business value of a change, it cannot see constraints outside the repository, and it does not make a tangled codebase separable. On a codebase where every module knows every other module, the survey will return real findings and no safe first step. Report that rather than starting a rewrite nobody approved.
