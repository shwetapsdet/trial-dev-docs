Feature: Email Management

  Background: Login to site with valid credentails
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1501
  @issue=SG-11777
  Scenario: Client error should not be displayed when we add variables to Email Description
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Email Management" tile in Admin settings

    And ui: Click on Event:"Approved" of "Timesheet User" in Email Management
    And ui: Click on Event Description text area in Edit Event section
    And ui: Click on all variables in Edit Event section
    And ui: Softassert if client error is not displayed and add the error message as:"Client error was seen when adding email variables for the event Timesheet User: Approved"

    And ui: I navigate to "Email Management"
    And ui: Click on Event:"Not Submitted" of "Timesheet User" in Email Management
    And ui: Click on Event Description text area in Edit Event section
    And ui: Click on all variables in Edit Event section
    And ui: Softassert if client error is not displayed and add the error message as:"Client error was seen when adding email variables for the event Timesheet User: Not Submitted"

    And ui: I navigate to "Email Management"
    And ui: Click on Event:"Rejected" of "Timesheet User" in Email Management
    And ui: Click on Event Description text area in Edit Event section
    And ui: Click on all variables in Edit Event section
    And ui: Softassert if client error is not displayed and add the error message as:"Client error was seen when adding email variables for the event Timesheet User: Rejected"

    And ui: I navigate to "Email Management"
    And ui: Click on Event:"Submitted" of "Timesheet Approver" in Email Management
    And ui: Click on Event Description text area in Edit Event section
    And ui: Click on all variables in Edit Event section
    And ui: Softassert if client error is not displayed and add the error message as:"Client error was seen when adding email variables for the event Timesheet Approver: Submitted"

    And ui: I navigate to "Email Management"
    And ui: Click on Event:"Not Submitted" of "Timesheet Approver" in Email Management
    And ui: Click on Event Description text area in Edit Event section
    And ui: Click on all variables in Edit Event section
    And ui: Softassert if client error is not displayed and add the error message as:"Client error was seen when adding email variables for the event Timesheet Approver: Not Submitted"

    And ui: I navigate to "Email Management"
    And ui: Click on Event:"Retracted" of "Timesheet Approver" in Email Management
    And ui: Click on Event Description text area in Edit Event section
    And ui: Click on all variables in Edit Event section
    And ui: Softassert if client error is not displayed and add the error message as:"Client error was seen when adding email variables for the event Timesheet Approver: Retracted"

    Then ui: Softassert all