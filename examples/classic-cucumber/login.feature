Feature: Client App login (classic Cucumber example)
  This feature is identical in spirit to features/placeOrder.feature,
  but it is run by Cucumber.js (npx cucumber-js) instead of Playwright.

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user logs in with username "ankarki9@gmail.com" and password "J0hn@123!"
    Then the dashboard products should be displayed

  Scenario: Login again to show hooks firing per scenario
    Given the user is on the login page
    When the user logs in with username "ankarki9@gmail.com" and password "J0hn@123!"
    Then the dashboard products should be displayed
