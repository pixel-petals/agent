
# Formatting

## Code

### Function Length

- A function is too long if it performs more than one distinct task. If you can split its purpose using the word "and," it needs to be refactored into smaller sub-functions.
  - Typically, a good length is less than 50 lines (this is not a firm number).

## Files

### Length

- **Sweet spot: 150-400 lines.** This range keeps modules highly focused on a single responsibility.
- **Soft limit: 500 lines.** Exceeding 500 lines is a strong signal that a file should be refactored or split.
- **Hard Limit: 1000 lines.** Files larger than 1,000 lines significantly hurt readability, slow down git diff reviews, and increase merge conflicts

### Collocation

- Group files into clusters by scope/purpose.
  - A cluster of files should be isolated in their own subfolder.
  - Standard naming convention for this pattern is `<cluster>.<scope>.<ext>` where `<cluster>` matches a folder
    - e.g. `graph.routes.js`, `graph.db.js`
- When a cluster grows too large, or has more than one responsibility, it should be broken-down into sub-clusters.
  - Once a directory's files split into clearly distinct groups (e.g. db-graph's editor side vs its viewer side), each group gets its own subdirectory (`db-graph/editor/`, `db-graph/viewer/`), not files dangling at the parent cluster's root next to each other.
