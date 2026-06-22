Feature: Client App e-commerce flow
  As a registered customer
  I want to log in and place an order
  So that I can buy products from the client app

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    When the user logs in with username "ankarki9@gmail.com" and password "J0hn@123!"
    Then the dashboard products should be displayed

  Scenario: Place an order successfully
    When the user logs in with username "ankarki9@gmail.com" and password "J0hn@123!"
    And the user adds product "ZARA COAT 3" to the cart
    And the user proceeds to checkout
    And the user selects country "ind" as "India"
    And the user submits the order
    Then the order confirmation should be displayed
