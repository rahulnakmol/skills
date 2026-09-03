# What separates a test that holds from one that only passes

**Load when** writing the failing test in step 2, or when a suite is green and nobody trusts it.

A passing suite is not evidence of a working system. It is evidence that a set of assertions ran without raising. Whether those assertions could ever have failed is a separate question, and it is the one that decides whether the suite is worth the time it costs.

## Test the behavior, through the interface

A test drives the seam a caller would use and asserts on what a caller would observe. A test that reaches past the interface — into a private method, an internal field, a module the caller never touches — is coupled to the implementation rather than the requirement. It then fails during a refactor that changed nothing a user could see, which teaches the team that a red suite means "something moved" rather than "something broke". That lesson is expensive, because it is how a team learns to ignore its own tests.

The practical test: if the implementation were rewritten from scratch against the same interface, would this test still be meaningful? If not, it is testing the shape of the code rather than the behavior of the system.

## Name the behavior, not the function

`rejects an expired session` states a requirement. `test refresh` states a location. When the first fails, the report names what the system got wrong; when the second fails, someone has to open the file to find out what was even being claimed. A failure message is read far more often under time pressure than the test body is, so the name carries most of the value.

## One reason to fail

A test asserting five things fails on the first, hides the other four, and forces a second run to learn the next fact. Worse, when it goes red, the cause is ambiguous until someone reads it. Prefer several tests each pinning one outcome. Setup can be shared; assertions should not be crowded.

## Assertions that can actually fail

These are the shapes to distrust, and each one passes on a system that does not work:

- **Asserting on a mock.** Configuring a stub to return a value and then asserting the value came back tests the stub. The system under test is not exercised at all.
- **Asserting a call happened.** Verifying that a method was called says the code took a path, not that the path produced a correct result. Behavior is what a caller observes, not the sequence of internal calls that produced it.
- **Tautologies.** Computing the expected value with the same expression the implementation uses means the two agree by construction and will keep agreeing when both are wrong.
- **Assertions no input can reach.** A branch guarded by a condition the fixtures never produce is a line of test code that will never run.

This is why the red step is not optional. Watching a test fail for the reason it exists is the only direct evidence that its assertion is connected to the behavior at all.

## Fixtures near the test

A shared fixture that twenty tests read becomes a fixture nobody may change, because the blast radius is unknown. Each test should make the state it depends on visible at the point of use, so a reader can see why the expected value is expected without opening another file. Some duplication in test setup is worth the readability; test code is read under pressure and should not require a lookup.

## Determinism

A test that depends on the clock, on network reachability, on the ordering of a hash map, or on another test having run first will fail eventually for reasons unrelated to the code. The team's response to an intermittent failure is to re-run it, and once re-running becomes the habit, a real regression gets re-run too. Inject the clock, control the boundary, and let each test build its own state.

## What not to test

Coverage is not the goal, and chasing it produces tests that assert whatever is convenient. Skip the framework's own behavior, generated code, and pure configuration. Spend the effort on the branches where the requirement is subtle: the boundary values, the error paths, and the case the original bug report described.

## The check before the test is kept

Change the implementation to something wrong and confirm the test goes red. If it stays green, the test is not testing what its name claims, and keeping it is worse than having no test — an untested behavior is a known gap, while a test that cannot fail is a false assurance someone will rely on.
