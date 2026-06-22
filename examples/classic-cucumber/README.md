# Classic Cucumber example

A tiny, standalone example of **classic `@cucumber/cucumber`** (the style shown
in most lectures), kept separate from the main **playwright-bdd** setup so the
two can be compared side by side.

## Run it

From the project root:

```bash
npx cucumber-js --config examples/classic-cucumber/cucumber.js
```

(This does **not** use `playwright.config.js` or `npx playwright test` at all —
Cucumber.js is the runner here.)

## How this differs from the main setup

| | Main setup (`features/`) | This example (`examples/classic-cucumber/`) |
|---|---|---|
| Runner | Playwright (`npx playwright test`) | Cucumber.js (`npx cucumber-js`) |
| `Given/When/Then` from | `createBdd(test)` (playwright-bdd) | `require('@cucumber/cucumber')` |
| Browser/page | Injected as a fixture: `({ page, poManager }) =>` | Launched by hand in a `Before` hook, read via `this` |
| Step function | Arrow function `async ({ poManager }) => {}` | `async function () {}` (needs `this`) |
| Cleanup | Automatic (fixture tears down the page) | Manual `After` hook closing the browser |
| Reports / trace / parallel | Built in from Playwright | Configure separately |

Both reuse the same Page Object Model in `pageobjects/`, which is the point:
BDD style is independent of which runner drives the browser.
