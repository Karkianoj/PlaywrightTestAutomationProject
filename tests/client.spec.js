const { test, expect } = require("@playwright/test");

test("Client App Login", async ({ page }) => {
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await page.locator("input#userEmail").fill("ankarki9@gmail.com");
  await page.locator("input#userPassword").fill("J0hn@123!");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

  await page.locator("text=Checkout").click();
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 100 });
  await page.locator(".ta-results").waitFor();
  await page.getByText("India", { exact: true }).click();
  // await page.locator("input[placeholder*='CVV']").fill("123");
  await page.locator("a.btnn.action__submit.ng-star-inserted:visible").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    "Thankyou for the order.",
  );
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
