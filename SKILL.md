**Skill Name**: Refactor According to Requirements

**Summary**: A workspace-scoped skill that analyzes the `requirements/` folder, maps requirements to code areas, and generates a prioritized, testable refactor plan with concrete tasks and completion checks.

**When to run**
- **Purpose**: Use before major refactors to ensure changes align with documented requirements.
- **Scope**: Workspace-scoped; default `requirements/` folder at project root.

**Inputs**
- `requirements_path`: path to requirements folder (default: `requirements/`).
- `target_dirs`: optional list of source directories to consider (default: `src/`).
- `strategy`: `conservative` (small, isolated changes) or `aggressive` (broad refactor).

**Outputs**
- A mapping of requirement → affected files/components/pages.
- A prioritized list of refactor tasks with estimated effort and tests to add/update.
- A checklist of quality criteria and completion checks.

**Step-by-step process**
1. Read all Markdown files in `requirements_path` and extract requirement headings and acceptance criteria.
2. Classify each requirement by type (UI, backend, data, tests, docs, performance, accessibility).
3. Search `target_dirs` for symbols, components, pages, and tests that match requirement keywords.
4. For each requirement, produce a recommended change set: files to edit, tests to add/update, and non-functional tasks (linting, accessibility, performance).
5. Group related change sets into small, reviewable tasks (PR-sized), prioritized by user impact and risk.
6. Generate a verification checklist for each task: unit/integration tests, UI regression steps, performance checks, and documentation updates.
7. Present the plan and prompt the user to confirm or refine priorities and strategy.

**Decision points & branching logic**
- If a requirement maps to no code: mark as "design gap" and suggest an implementation stub with acceptance criteria.
- If multiple files match a requirement: propose either a local change (conservative) or an extraction/abstraction (aggressive).
- If tests are missing: require at least one unit or integration test before merging.

**Quality criteria / completion checks**
- Every requirement has a mapped owner (file/component) or a documented gap.
- Unit/integration tests added or updated for functional changes; test run passes locally.
- Linter and type checks pass (if applicable).
- UI regressions verified via snapshot tests or manual steps documented.
- No critical accessibility regressions (basic checklist: keyboard navigation, color contrast for changed UI).

**Ambiguities to flag**
- Vague acceptance criteria (e.g., "improve performance") — ask for target metrics.
- Conflicting requirements — highlight conflicts and ask the product owner.

**Example prompts to run this skill**
- "Refactor according to requirements using `requirements/`, target `src/components`, strategy conservative."
- "Map requirements to code and produce PR-sized tasks for the Teacher and Student pages."

**Suggested next customizations**
- Add automated test generation templates for common requirement types.
- Integrate with issue tracker: auto-create issues/PR templates from generated tasks.
- Add CI checks that enforce the skill's completion checklist before merging.

**Notes for maintainers**
- Keep the skill workspace-scoped so it uses the repo's `requirements/` docs.
- Prefer small, reversible changes and require tests for behavioral changes.

**Where saved**
- This file: [SKILL.md](SKILL.md#L1)
