# Storyboard: how exhibit keeps a page in brand

An eight-act storyboard for the second fixture. The topic is exhibit itself: how a brand's rules travel from a prose skill into a profile, a shell, and a set of named checks. This fixture renders in the `openai` variant of ai-branding, so the two fixtures together cover both variants. The text below is the fixture's own.

```yaml
storyboard:
  title: How exhibit keeps a page in brand
  question: When an agent writes a page in a brand it has only read about, what stops the page from drifting off brand?
  thesis: A brand rule the script can check is a rule the page keeps; the rules no script can check are the ones the report has to name.
  audience: people who maintain a brand skill and want to know what exhibit does with it
  mode: explorer
  register: cinematic
  acts:
    - type: hook
      claim: Every rule the profile carries is a rule the page cannot break unnoticed
      figure: a grid of rule squares, filled when a script checks the rule and outlined when only a reader does
      interaction: a slider sets how many of the brand's rules the profile carries and the model shows how many breaks reach readers unchecked across a run of pages
      export: the chosen count and the resulting number of unchecked breaks
      motion: [reveal, count, draw, highlight]
    - type: map
      claim: A brand rule moves through six stages between the brand skill and the finished page
      figure: the pipeline from brand skill to page, with the human and agent steps marked
      interaction: select a stage to see what it reads, what it writes, and who does it
      export: the selected stage
      motion: [spotlight]
      frame: browser
    - type: mechanism
      claim: A contrast check is four arithmetic steps the page can run on itself
      figure: two swatches and the number each step produces
      interaction: step through the computation for a chosen text and background pair
      export: the pair, the ratio, and the step shown
      motion: [count]
    - type: compare
      claim: Scaffold, author, verify leads a renderer and free-hand HTML at equal weights
      figure: a criteria matrix with three approaches
      interaction: weight sliders per criterion; the ranking follows
      export: the ranking at the reader's weights
    - type: evidence
      claim: Twenty-two of 28 checks run without a browser, while six inspect rendered or printed output
      figure: a bar chart of checks by family, split by whether they run without a browser
      interaction: hide or isolate checks by browser requirement
      export: the counts shown
      motion: [focus, draw]
    - type: timeline
      claim: The profile came first because every later check depends on it
      figure: the three build phases on a line with the forcing dependency marked
      interaction: select a phase to see what it made possible
      export: the selected phase
      motion: [morph]
    - type: decision
      claim: The profile belongs beside the brand skill it was derived from, not inside exhibit
      figure: two options with the trade-off of each and the recommended one marked
      interaction: the reader marks agreement or an objection on each option
      export: each mark and note
    - type: glossary
      claim: Eight terms this page uses, defined where they first appear
      figure: a definition list with a link from each term to its first use
      interaction: none
      export: none
```
