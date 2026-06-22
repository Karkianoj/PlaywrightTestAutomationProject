const { test: base } = require("playwright-bdd");
const { POManager } = require("../pageobjects/POManager");

/**
 * Extend the playwright-bdd test with project-specific fixtures so step
 * definitions can reuse the existing Page Object Model.
 *
 *  - poManager: a fresh POManager bound to the scenario's page.
 *  - ctx:       a plain object to share state (e.g. orderId) between steps
 *               within a single scenario.
 */
exports.test = base.extend({
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },
  ctx: async ({}, use) => {
    await use({});
  },
});
