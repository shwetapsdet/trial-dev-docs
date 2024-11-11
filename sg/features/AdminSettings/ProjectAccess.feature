Feature: Project Access

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @testId=ST-1347
  Scenario: SG-10781 - Project Rules - when view access to default security group is overridden, administrator cannot edit dates of new projects
    Given setup: Test Data "SoftAssert"
    Given ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Project Access" tile in Admin settings
    And ui: Create a new rule for Users:"Default" Projects:"Default" Role:"Viewer" level and Allow override as "On"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    Then ui: Verify project allocation dates are set to current year
    Then ui: Softassert all
