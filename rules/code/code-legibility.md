# Code Legibility Conventions

---

## Summary

| Situation | Convention |
| --- | --- |
| [Between any two functions](#between-functions--always-one-blank-line) | One blank line |
| [Guard clause vs. main body](#inside-functions--blank-lines-separate-logical-phases) | One blank line |
| [Logical phases inside a function](#inside-functions--blank-lines-separate-logical-phases) | One blank line |
| [Semantic groups inside an object literal](#inside-object-literals--blank-lines-group-semantic-keys) | One blank line |
| [Import groups](#imports--blank-lines-separate-import-groups-by-layer) | One blank line between groups |
| [Last line before a closing keyword](#no-trailing-blank-inside-a-block) | No blank |
| [Named file sections](#section-headers--ascii-underline) | Label + `■■■` underline |
| [Inline why/disambiguation](#inline-explanatory-comments--rare) | Same-line comment, rare |
| [Debug prints](#commented-out-debug-prints) | Commented out, not deleted |
| [Dead code](#dead-code--block-comment) | Block comment |
| [TODOs](#todo-markers--lowercase-inline) | `todo ...` inline, lowercase |
| [Doc blocks](#no-doc-block-comments) | None |
| [Index-tracking loops](#compact-loop-syntax) | Counter on loop boundary line |

---

## Blank Lines

### Between functions — always one blank line

Every function boundary gets exactly one blank line above it. No double-blanks, no exceptions.

```text
end

function nextThing()
```

### Inside functions — blank lines separate logical phases

A blank line inside a function marks a shift in what the code is doing, not just a visual rest. The phases that earn a separator:

1. **Guard clauses / early returns** — followed by a blank before the main body begins.
2. **Setup / reads** — followed by a blank before mutations or output.
3. **Logical sub-steps** — each distinct operation gets its own paragraph.

```text
function onContent(content)
  reset()
  if childCount(content) == 0: return    // guard

  reformat(content)                      // ← blank separates guard from work

  numGroups = childCount(nodes.groups)   // reads together
  numVisible = top.numGroupsVisible
  numBuffered = top.numGroupsBuffered

  for i = numGroups to numVisible + numBuffered   // ← blank before loop
    createGroup()
  end

  drawContent()                          // ← blank before output phase

  getFocusedGroup().isFocused = true
  ...
end
```

### Inside object literals — blank lines group semantic keys

Related keys sit together; unrelated ones get a blank between them.

```text
event = formatEventData(EventType.PAGE_VIEW, {
  events: { view: true }

  app: getAppInfo()
  user: getUser()
  view: getPageInfo(event)
})
```

### Imports — blank lines separate import groups by layer

```text
import "grid.get"
import "grid.set"
import "grid.utils"

import "grid.animate"
import "grid.keypress"
```

No hard rule on what constitutes a group, but the groupings track concern (data vs. behaviour vs. event handling).

### No trailing blank inside a block

The last line before a closing keyword (`end`, `}`, etc.) is never blank.

---

## Comments

### Section headers — ASCII underline

Used to divide a file into named regions, always two lines: a label then a filled underline of `■` matching the label's length exactly (no padding, not full-width).

```text
// Focus Group
// ■■■■■■■■■■■

function moveFocusedGroup(...)
```

Used sparingly — only when a file contains multiple distinct named concepts that would otherwise blur together.

### Inline explanatory comments — rare

A short note on a line that would otherwise be cryptic. Not a narration of what the code does — only the *why* or a disambiguation.

```text
runner = singleton("runner", "Worker.Runner")
// get or create from global scope
```

```text
title.text = content.title // "On Now: "
```

The second form is used when the comment annotates intent or a label that was considered but rejected.

### Commented-out debug prints

Debug print statements are left commented out rather than deleted during development. This signals "intentionally off" vs. "never existed."

```text
// ? `${functionName}() returns ${promise.id}`
```

### Dead code — block comment

Large bodies of removed or superseded code are kept as block comments rather than deleted. The dead code is treated as reference while the replacement is being validated. Use whatever block comment syntax the language provides (`/* */`, `#= =#`, etc.); in languages without block comments, prefix each line individually.

### TODO markers — lowercase, inline

```text
// todo call unobserveField
```

Lowercase, no ticket number, placed at the callsite.

### No doc-block comments

There are no docstrings or function header comments. The function name and parameter names carry all the documentation.

---

## Compact loop syntax

Short loops that need an index counter keep the counter init and increment on the same line as the loop boundary, so the body remains uncluttered:

```text
r = 0; for row in grid:
  i = 0; for node in row:
    ...
  i += 1; end
r += 1; end
```

The body remains indented normally — only the boundary lines are compacted.
