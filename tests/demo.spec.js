 const { expect} = require('@playwright/test');
 const { test } = require('./my-test');
 const {POManager} = require('../pageobjects/POManager');
 const dataset =  JSON.parse(JSON.stringify(require("./utils/data.json")));

 test.beforeAll( () => {
  console.log("i am the first");
  // mydata = await JSON.parse(JSON.stringify(require("./utils/data.json")));
  

 })
 for (const data of dataset) {

 test(`testing with ${data.email}`, async ({page,person})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const username = "anshika@gmail.com";
     const password = "Iamking@000"
     const productName = 'Zara Coat 4';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.email,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();















 });
}

 

// const base = require('@playwright/test');

// exports.test = base.test.extend({
//   // Define an option and provide a default value.
//   // We can later override it in the config.
//   person: [{email : "anshika@gmail.com", password:"Iamking@000"},
//   {email : "rahulshetty@gmail.com", password:"Iamking@00"}],
// });



 

