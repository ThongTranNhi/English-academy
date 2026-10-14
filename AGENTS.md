# English Academy — AI Agent Development Rules

Version: 1.0  
Project: English Academy  
Project Path: `C:\Project\Academy-web`  
Stack: React 19, Vite, TypeScript, Tailwind CSS v4  
Scope: Frontend Only

---

# 1. General Principles

All AI coding agents, including Claude Code, Codex and other coding assistants, MUST follow these rules when working on this repository.

Core principles:

- Safety first.
- Preserve existing source code and user data.
- Prefer simple and maintainable solutions.
- Minimize unnecessary tool calls and token consumption.
- Never perform destructive operations without explicit authorization.
- Do not modify unrelated files.
- Do not claim a command, test, commit or deployment succeeded unless its result has been verified.
- Never bypass repository security or branch protection rules.

Priority order:

1. Protect source code, credentials and Git history.
2. Respect explicit user instructions and permissions.
3. Preserve existing architecture and functionality.
4. Maintain code quality and compatibility.
5. Minimize complexity, execution time and unnecessary operations.

---

# 2. Git and GitHub Tool Priority

## 2.1 Local Git Operations

Use Git CLI for local repository operations.

Preferred commands:

```bash
git status
git diff
git diff --check
git log --oneline -10
git branch
git switch
git add
git commit
git fetch
git pull
git push
```

Use the minimum number of commands necessary to complete the authorized task.

Do not repeatedly check the same information unless repository state has changed.

## 2.2 GitHub Operations

Prefer GitHub CLI (`gh`) for:

- Pull Requests.
- GitHub Issues.
- GitHub Actions.
- CI/CD status.
- Repository information.
- PR reviews.
- Branch comparison.

Example commands:

```bash
gh auth status
gh repo view
gh pr list
gh pr status
gh pr checks
gh run list
```

Only create, edit, merge or close GitHub resources when authorized.

## 2.3 GitHub MCP

Use GitHub MCP only when:

- Direct GitHub integration is required.
- GitHub CLI cannot perform the necessary operation.
- The user explicitly requests an MCP-based workflow.

Do not repeat completed operations through another tool.

## 2.4 SSH

If the existing Git remote uses SSH, continue using SSH.

Example:

```bash
git@github.com:OWNER/REPOSITORY.git
```

Do not change SSH remotes to HTTPS without authorization.

Do not print, copy, expose or modify private SSH keys.

---

# 3. Authorization Rules

AI agents must distinguish between reading, editing, committing, pushing and deploying.

## Allowed Without Additional Authorization

Within the scope of a requested development task:

- Inspect repository files.
- Read Git status and history.
- Review source code.
- Edit authorized project files.
- Run relevant local checks.
- Inspect differences.
- Report findings.

## Explicit Authorization Required

- Create a Git commit.
- Push to a remote repository.
- Create or update a Pull Request.
- Merge a Pull Request.
- Delete branches.
- Rewrite Git history.
- Modify Git remote configuration.
- Deploy to production.
- Change repository settings or permissions.

Authorization must cover the specific action.

A request to fix code does not automatically authorize committing or pushing.

A request to commit does not automatically authorize pushing.

A request to push does not automatically authorize merging.

Never assume authorization based solely on previous activity.

---

# 4. Branch Management

The `main` branch is considered protected.

AI agents should perform development work on feature or fix branches.

Naming conventions:

```text
feature/feature-name
fix/bug-description
refactor/module-name
docs/documentation-name
chore/maintenance-name
```

Examples:

```text
feature/vocabulary-flashcards
feature/ielts-course-page
fix/mobile-header
refactor/course-components
docs/learning-platform-guide
```

Rules:

- Never push directly to `main` without explicit approval.
- Never merge into `main` without explicit approval.
- Never delete `main`.
- Never bypass branch protection.
- Never overwrite another developer's work.
- Keep changes focused on one task where practical.

Do not automatically switch branches when that could interrupt existing work.

---

# 5. Multi-Agent Git Worktree Rules

When multiple AI agents are working concurrently, use separate Git Worktrees.

Each agent must have:

- Its own working directory.
- Its own working branch.
- A clearly defined task scope.
- No overlapping file modifications unless coordinated.

Example:

```bash
git worktree add ../academy-agent-ui -b feature/ui-improvements
git worktree add ../academy-agent-learning -b feature/learning-system
git worktree add ../academy-agent-tests -b test/learning-tests
```

Rules:

1. Never assign the same branch to multiple active worktrees.
2. Never modify files inside another agent's worktree without authorization.
3. Avoid concurrent modification of shared configuration files.
4. Review integration conflicts before merging changes.
5. Do not delete another agent's worktree.
6. Do not remove worktrees containing uncommitted work.
7. Worktree cleanup requires authorization if it could discard changes.

If a task only requires one agent, do not create unnecessary worktrees.

---

# 6. Mandatory Checks Before Commit

Before every authorized commit, perform appropriate checks.

## Step 1: Check Repository Status

```bash
git status --short
```

Identify:

- Modified files.
- Untracked files.
- Deleted files.
- Unrelated changes.
- Potentially sensitive files.

Never stage unrelated changes.

## Step 2: Review Changes

```bash
git diff
git diff --check
```

Review staged changes separately:

```bash
git diff --cached
git diff --cached --check
```

Confirm that the staged changes match the requested task.

## Step 3: Security Review

Check for:

- API keys.
- Access tokens.
- Passwords.
- Private keys.
- Session cookies.
- Authentication secrets.
- Personal information.
- Production configuration.
- Accidentally included environment files.

Never commit:

```text
.env
.env.local
.env.production
*.pem
*.key
node_modules/
dist/
```

Exceptions require clear project-specific justification and approval.

Use `.env.example` for documentation of environment variable names without real secrets.

Never expose secrets in command output, logs, screenshots or AI responses.

If a secret is accidentally exposed, report it and recommend credential rotation.

## Step 4: TypeScript Check

Run the project's existing type-check script where available.

For a compatible TypeScript configuration, use:

```bash
npx tsc --noEmit
```

If the project uses TypeScript project references, use the appropriate project build check instead.

Do not change TypeScript configuration merely to hide errors.

## Step 5: Lint

If configured:

```bash
npm run lint
```

Do not silently disable lint rules to pass validation.

## Step 6: Tests

Run relevant tests.

Examples:

```bash
npm run test
```

or a targeted test command supported by the repository.

Do not assume a test script exists.

If tests are unavailable, report the missing coverage.

## Step 7: Production Build

For changes affecting application behavior, dependencies or build configuration:

```bash
npm run build
```

Verify successful completion and output in:

```text
dist/
```

## Step 8: Commit Only Authorized Files

Prefer explicit file paths:

```bash
git add src/components/layout/Header.tsx
```

Avoid using:

```bash
git add .
```

when unrelated or untracked changes are present.

Review staged files before committing.

Do not commit when required checks fail unless the user explicitly authorizes proceeding with documented failures.

---

# 7. Commit Message Convention

Use Conventional Commits.

Format:

```text
type(scope): description
```

Supported types:

| Type | Purpose |
|---|---|
| feat | New feature |
| fix | Bug fix |
| refactor | Internal code improvement |
| style | Formatting or visual styling |
| docs | Documentation |
| test | Tests |
| chore | Maintenance |
| perf | Performance improvement |
| build | Build configuration |
| ci | CI/CD changes |

Examples:

```text
feat(courses): add course filtering
fix(header): resolve mobile navigation issue
feat(vocabulary): implement flashcard quiz
refactor(learning): extract reusable lesson player
style(home): improve responsive spacing
docs(readme): update deployment instructions
ci(github): add frontend validation workflow
```

Use concise and descriptive commit messages.

Do not create meaningless messages such as:

```text
update
fix
changes
final
```

Never automatically amend a previous commit unless explicitly instructed.

---

# 8. Push Rules

A push requires explicit authorization.

Before pushing:

1. Confirm the current branch.
2. Confirm the destination remote.
3. Review commits to be pushed.
4. Verify required checks.
5. Confirm that the push does not contain secrets.
6. Ensure the destination branch is correct.

Preferred workflow:

```bash
git status
git branch --show-current
git remote -v
git log --oneline -5
```

For an authorized feature-branch push:

```bash
git push -u origin feature/feature-name
```

Never execute automatically:

```bash
git push --force
git push --force-with-lease
git push --mirror
```

Force pushing and history rewriting require explicit approval and a clear explanation of the risks.

Never use a force push to resolve a routine synchronization problem.

If a push is rejected, investigate the cause before taking further action.

Do not overwrite remote changes.

---

# 9. Pull Request Rules

Use Pull Requests as the preferred integration workflow.

Prefer GitHub CLI:

```bash
gh pr create
gh pr view
gh pr checks
```

PR descriptions should contain:

```text
## Summary
What changed?

## Motivation
Why was this necessary?

## Changes
Which features or files were modified?

## Testing
What checks were run?

## Screenshots
UI screenshots when relevant.

## Risks
Known issues or limitations.

## Checklist
- [ ] TypeScript passed
- [ ] Lint passed
- [ ] Relevant tests passed
- [ ] Production build passed
- [ ] No secrets included
- [ ] Responsive checked
```

Creating a PR requires authorization.

Never self-approve or merge a PR without authorization.

Do not bypass failed CI checks.

---

# 10. GitHub Actions and CI/CD

Use GitHub Actions for automated validation when configured.

Recommended checks:

- Dependency installation.
- TypeScript validation.
- ESLint.
- Relevant automated tests.
- Production build.
- Security scanning.

For the English Academy frontend:

```text
Push to feature branch
        |
        v
GitHub Actions
        |
        v
TypeScript Check
        |
        v
ESLint
        |
        v
Tests
        |
        v
Vite Production Build
        |
        v
Ready for PR Review
```

Rules:

- CI must not be bypassed to merge unverified changes.
- Do not modify GitHub Actions secrets without permission.
- Do not expose secrets in workflow logs.
- Do not disable security checks to make workflows pass.
- Preserve the existing deployment strategy.
- Production deployment requires an authorized release or an explicitly approved automatic deployment policy.

Once the user approves an automatic deployment policy, normal deployments under that policy do not require a separate approval each time.

---

# 11. Dependency Management

Before adding dependencies:

1. Check whether existing dependencies solve the problem.
2. Prefer maintained, compatible packages.
3. Avoid unnecessary packages.
4. Consider bundle-size impact.
5. Review relevant security advisories.

Use npm consistently if the repository uses npm.

Do not mix npm, pnpm and Yarn without a justified migration.

Commit the appropriate lockfile when dependency changes are authorized.

Do not delete or regenerate the lockfile unnecessarily.

Do not execute destructive dependency changes without approval.

---

# 12. English Academy Project Rules

The project uses:

```text
React 19
Vite
TypeScript
Tailwind CSS v4
React Router
Zustand
React Hook Form
Zod
Lucide React
```

Frontend source code must:

- Use TypeScript.
- Prefer functional React components.
- Reuse existing components.
- Keep UI separate from mock data.
- Follow existing project conventions.
- Preserve React Router paths.
- Support desktop, tablet and mobile.
- Maintain accessible UI interactions.
- Avoid unnecessary global state.
- Avoid exposing sensitive information in browser code.
- Preserve the frontend-only architecture unless a backend is explicitly requested.

Do not introduce a new framework without approval.

Do not migrate from Vite to Next.js without approval.

Do not introduce a backend, database or authentication server without approval.

Do not replace the established UI design system unnecessarily.

---

# 13. File Modification and Deletion Rules

Before modifying files:

- Read the relevant existing implementation.
- Identify dependencies.
- Understand the component's responsibilities.
- Minimize the scope of changes.

Do not:

- Delete unrelated files.
- Overwrite user changes.
- Remove working features to simplify implementation.
- Delete configuration files without checking usage.
- Rewrite the entire architecture for a small issue.

Potentially destructive commands require explicit authorization, including:

```bash
git reset --hard
git clean -fd
git branch -D
git worktree remove --force
```

Do not use such commands as routine fixes.

Avoid broad cleanup operations unless the user requests them and the affected files have been reviewed.

---

# 14. Efficient Tool Usage

Tool priority:

1. Git CLI for local Git operations.
2. GitHub CLI for GitHub workflows.
3. GitHub MCP only when necessary.

Rules:

- Do not run redundant commands.
- Do not repeatedly inspect unchanged files.
- Do not perform the same operation through multiple tools.
- Do not create unnecessary branches or worktrees.
- Use targeted searches.
- Use targeted tests when appropriate.
- Avoid large, unrelated refactors.
- Prefer safe, reversible changes.
- Minimize tool calls without sacrificing verification.

Efficiency must never override security or correctness.

---

# 15. Failure Handling

When a command fails:

1. Read the error.
2. Identify the probable cause.
3. Inspect relevant state.
4. Apply a targeted fix.
5. Retry only when justified.

Do not repeatedly rerun failing commands without investigating.

If an operation risks data loss, stop and request approval.

If merge conflicts occur, inspect the conflicting changes.

Do not automatically discard either side of a conflict.

If a Git push is rejected, do not use force push as an automatic solution.

Report unresolved problems clearly.

---

# 16. Mandatory AI Agent Reporting

After completing a development task, report:

## Summary
Describe the completed work.

## Files Changed
List relevant modified files.

## Validation
Report actual results for:

- TypeScript.
- ESLint.
- Tests.
- Build.
- Other relevant checks.

Distinguish passed, failed and not-run checks.

## Git Status
Report:

- Current branch.
- Whether changes are uncommitted.
- Whether a commit was created.
- Whether code was pushed.
- Whether a PR was created.

## Remaining Issues
List outstanding concerns.

Never report successful tests, commits or deployments without verifying them.

---

# 17. Default Workflow

For normal development tasks:

```text
Receive User Request
        |
        v
Understand Requirements
        |
        v
Inspect Relevant Files
        |
        v
Check Git Status
        |
        v
Implement Scoped Changes
        |
        v
Review Diff
        |
        v
Security Review
        |
        v
Run Relevant Checks
        |
        v
Report Results
        |
        v
STOP
```

Do not automatically commit or push.

For an explicitly authorized commit:

```text
Review Changes
        |
        v
Validate Changes
        |
        v
Stage Relevant Files
        |
        v
Review Staged Diff
        |
        v
Create Commit
        |
        v
Report Commit
        |
        v
STOP
```

For an explicitly authorized push:

```text
Confirm Branch and Remote
        |
        v
Review Outgoing Commits
        |
        v
Verify Required Checks
        |
        v
Push Authorized Branch
        |
        v
Verify Push Result
        |
        v
Report Result
        |
        v
STOP
```

Do not automatically create a PR, merge or deploy unless separately authorized.

---

# 18. Absolute Restrictions

AI agents MUST NOT:

1. Commit without authorization.
2. Push without authorization.
3. Force push without explicit approval.
4. Merge into main without explicit approval.
5. Delete Git history without explicit approval.
6. Delete another agent's worktree without permission.
7. Commit secrets or credentials.
8. Bypass branch protection.
9. Disable security checks to make CI pass.
10. Claim tests passed when they were not executed.
11. Modify unrelated code without justification.
12. Replace existing architecture unnecessarily.
13. Repeat completed operations through different tools.
14. Deploy production without authorization or an approved automated deployment policy.
15. Sacrifice repository safety for speed.

---

# 19. Final Operating Principle

**Inspect → Plan → Implement → Review → Validate → Report.**

Commit, push, PR, merge and deploy are separate actions with separate authorization boundaries.

When uncertain about a potentially destructive operation, stop before performing it.

Keep development safe, maintainable, efficient and auditable.
