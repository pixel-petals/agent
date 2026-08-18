# Pixel Petals — Agent Plugins

A plugin monorepo for AI coding agents. Each package is an installable plugin that contributes rules or agent definitions at session start.

## Packages

| Plugin | Description |
| --- | --- |
| [`rules-code`](packages/rules-code/) | Code formatting, legibility, principles, planning, documentation, and testing rules |
| [`rules-git`](packages/rules-git/) | Git commit and pull request conventions |
| [`agents`](packages/agents/) | Subagent definitions: code-reviewer, test-writer, planner, docs-writer |

## Installation

### Claude Code

Add this repo as a marketplace source, then install individual plugins:

```bash
/plugin marketplace add git@github.com:pixel-petals/agent.git
/plugin install rules-code@pixel-petals
/plugin install rules-git@pixel-petals
/plugin install agents@pixel-petals
```

Or install directly from a local clone:

```bash
claude plugin install ./packages/rules-code
claude plugin install ./packages/rules-git
claude plugin install ./packages/agents
```

## Structure

```
.claude-plugin/marketplace.json   ← marketplace catalog
packages/
  <plugin>/
    .claude-plugin/plugin.json    ← installable manifest
    hooks/hooks.json              ← SessionStart hook (emits rules to context)
    rules/                        ← rule content
```

Each plugin's `SessionStart` hook cats its rules into context, injecting them at the beginning of every session.
