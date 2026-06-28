# Playwright UI Test Framework

## Project Purpose
End-to-end test automation framework for Playwright. Covers UI (Playwright browser)
and API (Playwright request) testing with a layered Page Object Model.

## Architecture
- **Page Objects**: `src/pages/` — extend `BasePage`, expose only public methods to tests
- **Fixtures**: `src/fixtures/base.fixture.ts` — single entry point for all test fixtures
- **Services**: `src/services/` — API layer; extend `ApiService` for each domain
- **Data Builders**: `src/data/builders/` — builder pattern with faker, always call `.build()`
- **Factories**: `src/data/factories/` — create + track data for cleanup in `afterAll`
- **Tests**: `tests/e2e/` for UI, `tests/api/` for API

## Conventions
- Import fixtures only from `@fixtures/base.fixture` — never from `@playwright/test` directly
- Page locators are always `private get` — never expose raw Locators in public API
- `loadedIndicator` must be set in every page class — used by `navigate()` to confirm load
- Tag tests with `@smoke`, `@regression`, `@sanity`, `@api`
- Use `expect.soft()` for multi-assertion component checks (see `verifyPageHasAllComponents`)
- Factories auto-cleanup via fixture teardown — never manually delete in test body

## Running Tests
- All tests: `npx playwright test`
- Smoke only: `npx playwright test --grep @smoke`
- API only: `npx playwright test --grep @api`
- UI only: `npx playwright test tests/e2e/`
- Allure report: `npm run report:allure`

## Agents Available
- **playwright-test-planner**: explores app, writes plan.md
- **playwright-test-generator**: takes plan.md, generates spec files
- **playwright-test-healer**: runs tests, debugs failures, fixes selectors
- **pr-reviewer**: reviews the current branch against these conventions, runs affected tests, and raises a PR via `gh`

## Skills Available
- `/run-suite`: runs the full test suite, auto-heals failures via `playwright-test-healer`
- `/create-xray-test-plan-from-jira`: fetches a Jira EPIC and its sub-tickets directly via the `atlassian` MCP, drafts scenarios per ticket for user review, generates non-duplicate e2e specs via `playwright-test-generator`, and creates Xray Test issues — approval required before any Jira issue is created
- `/create-jira-ticket-bug`: files a Jira bug directly via the `atlassian` MCP from a failing test or description — drafts summary/priority/repro steps and asks for approval before creating
- `/review-and-pr`: reviews the branch and opens a PR via `pr-reviewer`

## MCP Servers
- `playwright-test`: browser automation + test runner (`.mcp.json`)
- `atlassian`: official Atlassian Remote MCP server, OAuth-based — required for `/create-xray-test-plan-from-jira` and `/create-jira-ticket-bug`. Run `claude mcp list` and complete the browser login on first use; once connected, use `/agents` to grant only read/search/create/comment tools, never transition/delete/admin ones.

## Adding a New Skill
Skills must be a directory containing `SKILL.md` — `.claude/skills/<name>/SKILL.md` — not a flat `.claude/skills/<name>.md` file. The flat form is silently ignored by the skill scanner.

## Adding a New Page
1. Create `src/pages/[name].page.ts` extending `BasePage`
2. Set `pageUrl` and `loadedIndicator`
3. Add private locators, public action methods
4. Register fixture in `base.fixture.ts`

## Adding a New API Service
1. Create `src/services/[name].service.ts` extending `ApiService`
2. Register in `base.fixture.ts`
