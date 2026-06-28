---
name: review-and-pr
description: Review the current branch against project conventions, run affected tests, and raise a pull request
---

You are orchestrating branch review and PR submission.

## Steps

1. Invoke the `pr-reviewer` agent for the current branch against the repo's default branch
2. If the agent reports correctness issues that are not trivial, stop and present them to the user — ask whether to fix now, raise as a draft PR, or proceed anyway
3. Before any `git push` or `gh pr create` runs, present the planned action (branch, base branch, draft PR title/body) to the user and wait for explicit confirmation — this is a visible, hard-to-reverse action
4. Once confirmed, let the agent push and raise the PR
5. Report the PR URL and a summary of what was reviewed

## Output Format
```
## Review Summary
- Convention issues: X (fixed: X)
- Correctness issues: X
- Tests run: [tags/files] — Pass/Fail

## Pull Request
- URL: [pr url]
- Suggested Jira link: [issue key, if branch name contains one — link it yourself, this skill does not post to Jira]
```
