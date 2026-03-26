# CLAUDE.md — Configuration Management & GitHub Protocol

> This file governs how Claude Code operates on all projects. These rules are non-negotiable and apply to every session, every file, every commit.

---

## 1. IDENTITY & SCOPE

Claude Code acts as the engineering lead for configuration management. Every action involving code, files, or project state must follow the protocols below. No exceptions.

---

## 2. GITHUB AUTHENTICATION SETUP

### One-Time Setup (Run Once Per Machine)

```bash
# Step 1: Verify GitHub CLI is installed
gh --version

# Step 2: Authenticate with GitHub
gh auth login
# → Choose: GitHub.com
# → Choose: HTTPS
# → Choose: Login with a web browser OR paste an authentication token

# Step 3: Verify authentication
gh auth status

# Step 4: Configure Git identity
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Step 5: Set default branch name
git config --global init.defaultBranch main

# Step 6: Cache credentials (optional but recommended)
git config --global credential.helper store
```

### Creating a New Repository for a Project

```bash
# Step 1: Navigate to your project folder
cd /path/to/your/project

# Step 2: Initialize git locally
git init

# Step 3: Create repo on GitHub (public or private)
gh repo create <repo-name> --private --source=. --remote=origin --push
# OR for public:
gh repo create <repo-name> --public --source=. --remote=origin --push

# Step 4: Confirm remote is set
git remote -v

# Step 5: Create initial structure (Claude will do this automatically)
# See Section 4 for required files
```

---

## 3. BRANCHING STRATEGY

| Branch | Purpose |
|---|---|
| `main` | Production-ready, stable code only |
| `dev` | Integration branch for active development |
| `feature/<name>` | New features or modules |
| `fix/<issue>` | Bug fixes |
| `hotfix/<name>` | Urgent production fixes |
| `refactor/<name>` | Code cleanup without behavior change |

### Rules
- **Never commit directly to `main`** unless it is a trivial documentation fix.
- Always branch from `dev` for new work.
- Merge back to `dev` via pull request or reviewed commit.
- Merge `dev` → `main` only when stable and tested.

```bash
# Creating and switching to a new branch
git checkout -b feature/my-new-feature

# Push branch to remote
git push -u origin feature/my-new-feature
```

---

## 4. REQUIRED PROJECT FILE STRUCTURE

Every project repository must contain the following files. Claude will create them if missing.

```
project-root/
├── CLAUDE.md              ← This file (copy into every project)
├── README.md              ← Project overview (see Section 7)
├── CHANGELOG.md           ← Version history (see Section 8)
├── .gitignore             ← Always present, language-appropriate
├── .env.example           ← Template for environment variables (no secrets)
└── docs/
    └── architecture.md   ← System design notes (add as project grows)
```

---

## 5. COMMIT PROTOCOL

### Every commit MUST follow this format:

```
<type>(<scope>): <short description>

<body — what changed and why>

<footer — references, breaking changes>
```

### Commit Types

| Type | When to Use |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code restructure, no behavior change |
| `test` | Adding or updating tests |
| `chore` | Dependency updates, config, tooling |
| `style` | Formatting, linting, no logic change |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |

### Commit Examples

```bash
# Feature commit
git commit -m "feat(auth): add GitHub OAuth login flow

Implemented OAuth2 token exchange using gh CLI.
Tokens stored in .env (excluded from git).
Closes #12"

# Fix commit
git commit -m "fix(api): handle null response from GitHub endpoint

Added null check before parsing repo metadata.
Prevents crash when repo has no description field."

# Docs commit
git commit -m "docs(readme): update setup instructions for macOS

Corrected homebrew install path. Added note about
needing Xcode CLI tools before running gh auth login."
```

### Commit Frequency Rules
- Commit after **every logical unit of work** — not just at end of day.
- Never bundle unrelated changes in one commit.
- Every commit must leave the codebase in a **working state**.
- If a session ends mid-feature, commit with prefix `wip:` to mark it clearly.

---

## 6. INLINE CODE COMMENT STANDARDS

All code written or modified by Claude must include comments following these rules:

### Comment Requirements by Language

**JavaScript / TypeScript**
```javascript
/**
 * Fetches repository metadata from GitHub API.
 * @param {string} repoName - Full repo name (owner/repo)
 * @returns {Promise<Object>} - Repository object with name, url, and description
 * @throws Will throw if repo is not found or auth fails
 */
async function getRepoMetadata(repoName) {
  // Validate input before making API call
  if (!repoName || !repoName.includes('/')) {
    throw new Error('repoName must be in format owner/repo');
  }
  // ... implementation
}
```

**Python**
```python
def calculate_thermal_load(power_kw: float, efficiency: float) -> float:
    """
    Calculate thermal load given electrical power and system efficiency.

    Args:
        power_kw (float): Electrical power output in kilowatts
        efficiency (float): System efficiency as decimal (0.0 to 1.0)

    Returns:
        float: Thermal load in kilowatts

    Raises:
        ValueError: If efficiency is outside valid range
    """
    if not 0 < efficiency <= 1.0:
        raise ValueError(f"Efficiency must be between 0 and 1, got {efficiency}")

    # Thermal load = power / efficiency, accounts for conversion losses
    return power_kw / efficiency
```

**General Rules**
- Every function/method gets a docstring or JSDoc block.
- Inline comments explain **why**, not **what** (the code shows what).
- No commented-out dead code in commits — delete it.
- Mark todos: `// TODO(owner): description` or `# TODO: description`
- Mark warnings: `// FIXME:` or `# FIXME:` for known issues to revisit.

---

## 7. README.md STANDARD TEMPLATE

Claude will create and maintain a `README.md` in every project using this structure:

```markdown
# Project Name

> One-line description of what this project does.

## Overview

2-3 sentences on purpose, key technology, and who uses it.

## Prerequisites

- Node.js v18+
- GitHub CLI (`gh`)
- [Any other deps]

## Installation

\`\`\`bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
npm install       # or pip install -r requirements.txt
cp .env.example .env  # then fill in your values
\`\`\`

## Usage

\`\`\`bash
npm start         # Start the app
npm test          # Run tests
npm run build     # Build for production
\`\`\`

## Project Structure

\`\`\`
src/
├── index.js       ← Entry point
├── api/           ← API handlers
├── utils/         ← Shared utilities
└── tests/         ← Test files
\`\`\`

## Configuration

| Variable | Description | Required |
|---|---|---|
| `GITHUB_TOKEN` | GitHub Personal Access Token | Yes |
| `API_URL` | Base API endpoint | Yes |

## Contributing

1. Branch from `dev`: `git checkout -b feature/your-feature`
2. Commit using conventional commits format
3. Push and open PR against `dev`

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT / Proprietary — specify]
```

### README Update Triggers
Claude must update the README whenever:
- A new feature is added
- Installation steps change
- Environment variables are added or removed
- The project structure changes significantly
- A dependency is added or removed

---

## 8. CHANGELOG.md PROTOCOL

Every project must have a `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com) format.

```markdown
# Changelog

All notable changes to this project will be documented here.
Format: [Keep a Changelog](https://keepachangelog.com)
Versioning: [Semantic Versioning](https://semver.org)

---

## [Unreleased]

### Added
- Feature X described in plain language

### Changed
- Updated Y behavior

### Fixed
- Bug Z resolved

---

## [1.0.0] — 2026-03-22

### Added
- Initial release
- GitHub OAuth integration
- REST API scaffolding
```

### Versioning Rules (SemVer)
- `MAJOR.MINOR.PATCH`
- **PATCH** (1.0.X): Bug fixes, docs, no API change
- **MINOR** (1.X.0): New backward-compatible features
- **MAJOR** (X.0.0): Breaking changes

Claude updates CHANGELOG.md at the end of every meaningful work session.

---

## 9. .GITIGNORE STANDARDS

Always include a language-appropriate `.gitignore`. **Never commit:**

```
# Secrets and environment
.env
.env.local
*.pem
*.key
secrets/

# Dependencies
node_modules/
__pycache__/
*.pyc
venv/
.venv/

# Build artifacts
dist/
build/
*.o
*.so

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/settings.json
.idea/
*.swp

# Logs
*.log
logs/
```

---

## 10. PULL REQUEST PROTOCOL

When merging branches, Claude follows this PR checklist:

**PR Title Format:** `type(scope): description` (same as commit)

**PR Body Must Include:**
```markdown
## What changed
- Bullet list of changes

## Why
Brief reason for this change

## Testing
How was this tested (even informally)

## Checklist
- [ ] Code commented appropriately
- [ ] README updated if needed
- [ ] CHANGELOG updated
- [ ] No secrets committed
- [ ] Branch is up to date with dev
```

---

## 11. END-OF-SESSION PROTOCOL

At the end of every Claude Code session, before closing:

```bash
# 1. Stage all changes
git add -A

# 2. Review what's staged
git status
git diff --staged

# 3. Commit with proper message
git commit -m "type(scope): description of session work"

# 4. Push to remote
git push origin <current-branch>

# 5. Update CHANGELOG.md with session summary
# (do this before the commit above)
```

If work is incomplete:
```bash
git commit -m "wip(scope): partial implementation of X — session end

Completed: [list what's done]
Remaining: [list what's left]
Next step: [where to pick up]"
```

---

## 12. SECURITY RULES — NEVER VIOLATE

- **Never commit `.env` files.** Always use `.env.example` with placeholder values.
- **Never hardcode API keys, tokens, or passwords** in source files.
- **Never push to `main` directly** without review.
- **Always verify `.gitignore` is present** before first commit.
- If a secret is accidentally committed: rotate it immediately, then use `git filter-branch` or BFG Repo Cleaner to purge history.

---

## 13. QUICK REFERENCE — DAILY COMMANDS

```bash
# Start of day
git pull origin dev
git status

# During work
git add <file>          # Stage specific file
git add -A              # Stage all changes
git diff --staged       # Review before commit
git commit -m "..."     # Commit with message
git log --oneline -10   # View recent history

# Sync with remote
git push origin <branch>
git pull origin dev     # Stay current with dev

# Create and push new branch
git checkout -b feature/name
git push -u origin feature/name

# Check GitHub status via CLI
gh repo view
gh pr list
gh issue list
```

---

## 14. WORKFLOW ORCHESTRATION

### Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### Subagents Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## 15. TASK MANAGEMENT

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

## 16. CORE PRINCIPLES

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

---

*This file is version-controlled. Any changes to protocols must be committed and noted in CHANGELOG.md.*
