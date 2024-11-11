Feature: Financials

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1499
  @issue=SG-11812
  Scenario: Actual realted assignment type options should not be displayed when Planned is selectetd as available assignment type in General Settings
    Given setup: Test Data "Project"
    When setup: Test Data "SoftAssert"
   
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on assignment type:"Planned" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year in start and End date in Financials
    And ui: Click on Assignment Type dropdown in Financials
    Then ui: Verify if "Planned,Forecast,Budget,Planned Budget" options are displayed in Assignment type dropdown of financials
    Then ui: Verify if "Actual,Planned Actual,Planned Actual Remaining,Planned Actual Budget Remaining" options are not displayed in Assignment type dropdown of financials

    Then ui: Softassert all
