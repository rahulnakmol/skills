# Storyboard: the four gates

A two-act storyboard about the four human decisions that carry a product initiative from a raw problem to a measured benefit. The fixture uses the ai-branding theme and the exhibit runtime's current Alpine.js model.

```yaml
storyboard:
  title: Four gates between a problem and a benefit
  question: Why does an initiative need four human sign-offs when an agent fleet can produce every artifact in between?
  thesis: A gate is where a human decides on evidence; the review before each gate is what keeps the evidence honest.
  audience: product managers who are new to working with an agent fleet
  mode: scroll
  register: cinematic
  acts:
    - type: hook
      claim: Every gate opens with a review the human runs and never delegates
      figure: four gates on a line from problem to benefit, with the review step marked before each
      interaction: a slider sets how many gates are skipped and the model shows how many unreviewed claims reach delivery
      export: the chosen number of gates and the resulting count of unreviewed claims
      motion: [reveal, count, draw, highlight]
    - type: sandbox
      claim: Change the assumptions and see which gate the initiative fails at
      figure: the hook's model with every parameter exposed
      interaction: claims per gate, review catch rate, and the number of correlated reviewers
      export: every parameter and the gate where the model predicts failure
      motion: [focus, count, morph]
```
