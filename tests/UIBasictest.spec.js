const { test, expect } = require("@playwright/test");
// import { test, expect } from "@playwright/test";

test("First Playwright Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("input#username").fill("rahulshettyacademy");
  await page.locator("input#password").fill("learning");
  await page.locator("#signInBtn").click();
  await console.log(
    await page.locator("[style*='display: block;']").textContent(),
  );

  // const errorMessage = page.locator("[style*='display: block;']");
  // await expect(errorMessage).toBeVisible();
  // await expect(errorMessage).toHaveText("Incorrect username/password.");
});

test("Second Playwright Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com");
  console.log(await page.title());
  await expect(page).toHaveTitle(
    "Rahul Shetty Academy | QA Automation, Playwright, AI Testing & Online Training",
  );
});
