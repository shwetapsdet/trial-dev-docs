Feature: General Settings Pre-requisites

  Background: UI Login
    Given ui: I opened SG Login Page
    And ui: I login with "administrator" account
    Then ui: I validate for successful login

  @prerequisite-4
  Scenario: Set all the general settings, timesheet settings and create timesheet periods required for automation tests suite 4
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Alias" tab in General Settings
    And ui: Set all to automation defaults in Alias tab of GS
    Then ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Set all to automation defaults in Global tab of GS
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: Set all to automation defaults in Unit Settings tab of GS
    And ui: Click on "Resource Request" tab in General Settings
    And ui: Set all to automation defaults in Resource Request tab of GS
    And ui: Click on "BPA" tab in General Settings
    And ui: Set all to automation defaults in BPA tab of GS
    And ui: Click on "Miscellaneous" tab in General Settings
    And ui: Set all to automation defaults in Miscellaneous tab of GS
    And ui: Click on "Heatmap" tab in General Settings
    And ui: Delete all existing heatmaps in Heatmap tab of GS
    And ui: Add all automation default thrsholds in Heatmap tab of GS
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    Then ui: Wait for Save button in GS to be clickable again

    Given ui: Quick navigate to "Admin Settings"
    When ui: Click on "Timesheet Settings" tile in Admin settings
    Then ui: Set all to automation defaults in Timesheet Settings
    And ui: Click on Save button in Timesheet Settings and wait for loading to complete

    Given ui: Click on username and select Profile
    When ui: Create a token for "2" "Hours"
    Then api: Create default Timesheet periods for automation
    And ui: Logout

