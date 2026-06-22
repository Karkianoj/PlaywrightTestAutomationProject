const { createBdd } = require("playwright-bdd");
const { expect } = require("@playwright/test");
const { test } = require("../fixtures");

const { Given, When, Then } = createBdd(test);

Given("the user is on the login page", async ({ poManager }) => {
  await poManager.getLoginPage().goTo();
});

When(
  "the user logs in with username {string} and password {string}",
  async ({ poManager }, username, password) => {
    await poManager.getLoginPage().validLogin(username, password);
  },
);

Then("the dashboard products should be displayed", async ({ poManager }) => {
  const products = poManager.getDashboardPage().products;
  await products.first().waitFor();
  expect(await products.count()).toBeGreaterThan(0);
});

When(
  "the user adds product {string} to the cart",
  async ({ poManager }, productName) => {
    await poManager.getDashboardPage().searchProductAddCart(productName);
    await poManager.getDashboardPage().navigateToCart();
    await poManager.getCartPage().VerifyProductIsDisplayed(productName);
  },
);

When("the user proceeds to checkout", async ({ poManager }) => {
  await poManager.getCartPage().Checkout();
});

When(
  "the user selects country {string} as {string}",
  async ({ poManager }, countryCode, countryName) => {
    await poManager
      .getOrdersReviewPage()
      .searchCountryAndSelect(countryCode, countryName);
  },
);

When("the user submits the order", async ({ poManager, ctx }) => {
  ctx.orderId = await poManager.getOrdersReviewPage().SubmitAndGetOrderId();
});

Then("the order confirmation should be displayed", async ({ ctx }) => {
  expect(ctx.orderId).toBeTruthy();
  console.log("Order placed with id:", ctx.orderId);
});
