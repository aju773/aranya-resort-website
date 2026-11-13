# Issue tracker: Local Markdown

Specs and tickets live locally under `.scratch/`. Do not create GitHub Issues.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Aranya website spec: `.scratch/aranya-website/spec.md`.
- Individual tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order. Never combine tickets into one file.
- Each ticket records what to build, acceptance criteria, `Blocked by`, and `Status` near the top.
- Use the status vocabulary in `triage-labels.md`.
- Append discussion under a `## Comments` heading.
- Fetch a ticket by reading its local file. Publishing means writing local Markdown, not contacting an external tracker.

## Workflow

Finish grilling, approve the spec, approve the ticket breakdown, write tickets, implement unblocked tickets, then verify.

Only begin a ticket when all its blockers are complete. Record completion and verification evidence in the ticket. Triage labels describe readiness; they do not establish completion.
