Feature: Login To Tempus Ressources Site

  @testId=ST-1569
  Scenario: Login to site with valid credentails
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login