Feature: Schedule

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1643
  @issue=SG-9784
  @owner=Vivek
  Scenario: When default hour per capacity value is not a whole number, schedule task durations are decimals
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: I change "Hours_Per_Manday" value as "7.5"
    And ui: I change "Hours_Per_dayCapacity" value as "4.5"
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And ui: I create a new Regular Project
    And ui: I switch to Project Option "Schedule"
    And ui: I create a Schedule
    And ui: I change the duration of day to "3"
    And ui: I validate the duration of days remain in integer format as "3" rather than in decimal form
