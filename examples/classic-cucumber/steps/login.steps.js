// ---------------------------------------------------------------------------
// CLASSIC CUCUMBER step definitions (the "lecture" style).
//
// Compare this file with features/steps/placeOrder.steps.js (playwright-bdd):
//   - Here, Given/When/Then come from the @cucumber/cucumber package itself,
//     because Cucumber.js is the test runner.
//   - There is NO fixture system. We manage the browser ourselves via hooks
//     and reach it through `this` (the "World") inside each step.
//   - Steps MUST use `function () {}` (not arrow functions) so that `this`
//     points at the World. Arrow functions would capture the wrong `this`.
//
// This version also demonstrates the full hook lifecycle:
//   BeforeAll  -> once for the whole run   (launch ONE browser, reuse it)
//   Before     -> once per scenario        (fresh context+page = isolation)
//   AfterStep  -> after every single step  (screenshot attached to report)
//   After      -> once per scenario        (close that scenario's context)
//   AfterAll   -> once for the whole run   (close the shared browser)
// ---------------------------------------------------------------------------

const {
  Given,
  When,
  Then,
  Before,
  After,
  BeforeAll,
  AfterAll,
  AfterStep,
} = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const { POManager } = require("../../../pageobjects/POManager");

// A module-level variable, NOT on `this`: BeforeAll/AfterAll run once and have
// no World, so shared resources like the browser live here instead.
let browser;

// Runs ONCE before any scenario. Launching a browser is expensive, so we do it
// a single time and reuse it for every scenario.
BeforeAll(async function () {
  console.log("[BeforeAll] launching the shared browser");
  browser = await chromium.launch({ headless: false });
});

// Runs before EACH scenario. A fresh browser context per scenario keeps them
// isolated (separate cookies/storage) without paying to relaunch the browser.
Before(async function () {
  console.log("[Before] new context + page for this scenario");
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
});

// Runs after EVERY step. Classic use: capture a screenshot and attach it to the
// report so you get a visual trail of each step.
AfterStep(async function () {
  const image = await this.page.screenshot();
  this.attach(image, "image/png");
});

// Runs after EACH scenario. Close just this scenario's context (cheap), leaving
// the shared browser running for the next scenario.
After(async function () {
  console.log("[After] closing this scenario's context");
  await this.context.close();
});

// Runs ONCE after all scenarios. Tear down the shared browser.
AfterAll(async function () {
  console.log("[AfterAll] closing the shared browser");
  await browser.close();
});

Given("the user is on the login page", async function () {
  await this.poManager.getLoginPage().goTo();
});

When(
  "the user logs in with username {string} and password {string}",
  async function (username, password) {
    await this.poManager.getLoginPage().validLogin(username, password);
  },
);

Then("the dashboard products should be displayed", async function () {
  const products = this.poManager.getDashboardPage().products;
  await products.first().waitFor();
  expect(await products.count()).toBeGreaterThan(0);
});
