Feature: Calendar Management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage

  @testId=ST-2024
  @issue=SG-12592
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Disable working weekend setting and check impact
    Given setup: Test Data "Resource"
    Given setup: Test Data "Calendar"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I verify client or server error warning is not displayed
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: I delete any existing calendar
    And ui: Enter calendar name in Calendar Management
    And ui: Enter start date as "first" of the month "Feb" of current year in Grid options of Calendar Management
    And ui: Enter end date as "last" of the month "Apr" of current year in Grid options of Calendar Management
    And ui: I select specific date mode "Day" in Calendar
    And ui: I verify weekends are grayed out
    And ui: I save the calendar
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I add recently created calendar to resource capacity
    Then ui: I verify weekends are grayed out

  @testId=ST-2025
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Enter value into Weekend days in calendar management if Working Weekend is enable.
    Given setup: Test Data "Resource"
    Given setup: Test Data "Calendar"
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: I delete any existing calendar
    And ui: Enter calendar name in Calendar Management
    And ui: Enter start date as "first" of the month "Feb" of current year in Grid options of Calendar Management
    And ui: Enter end date as "last" of the month "Apr" of current year in Grid options of Calendar Management
    And ui: I save the calendar
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I add recently created calendar to resource capacity
    Then ui: I verify weekends are not grayed out
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity

  @testId=ST-2027
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Delete calendar from calendar management with 7 working days (working weekend)
    Given setup: Test Data "Resource"
    Given setup: Test Data "Calendar"
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: I delete any existing calendar
    And ui: Enter calendar name in Calendar Management
    And ui: Enter start date as "first" of the month "Feb" of current year in Grid options of Calendar Management
    And ui: Enter end date as "last" of the month "Apr" of current year in Grid options of Calendar Management
    And ui: I save the calendar
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I add recently created calendar to resource capacity
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: I delete any existing calendar
    And ui: Quick navigate to "Resource Management"
    And ui: Search for recently created "resource" in RM Grid and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I select specific date mode "Day" in Resource capacity
    Then ui: I verify if the created calendar is deleted

  @testId=ST-2028
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Add time to weekend and view different granularities (Day / Month / Week) mode on calendar management
    Given setup: Test Data "Resource"
    Given setup: Test Data "Calendar"
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: I delete any existing calendar
    And ui: Enter calendar name in Calendar Management
    And ui: Enter start date as "first" of the month "Feb" of current year in Grid options of Calendar Management
    And ui: Enter end date as "last" of the month "Apr" of current year in Grid options of Calendar Management
    And ui: I select specific date mode "Day" in Calendar
    And ui: I select specific date mode "Week" in Calendar
    And ui: I select specific date mode "Month" in Calendar
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I add recently created calendar to resource capacity
    Then ui: I verify weekends are not grayed out
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: I select specific date mode "Week" in Resource capacity
    And ui: Enter Base Capacity "8" in "4" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "4" number of cells specifically for weekends in Resource Capacity
    And ui: I select specific date mode "Month" in Resource capacity
    And ui: Enter Base Capacity "8" in "3" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "3" number of cells specifically for weekends in Resource Capacity

  @testId=ST-2026
  @issue=SG-12118
  @issue=SG-12577
  @issue=SG-12590
  @issue=SG-12502
  @owner=Devanshi
  @owner=Rinkesh
  @9.0
  Scenario: SG-12118 - Validate calendar edit and update with seven day work week
    Given setup: Test Data "Resource"
    Given setup: Test Data "Calendar"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: I delete any existing calendar
    And ui: Enter calendar name in Calendar Management
    And ui: Enter start date as "first" of the month "Feb" of current year in Grid options of Calendar Management
    And ui: Enter end date as "last" of the month "Apr" of current year in Grid options of Calendar Management
    And ui: I save the calendar
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    Then ui: I verify client or server error warning is not displayed
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I verify that loading resource is not displayed
    And ui: I add recently created calendar to resource capacity
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Calendar" "Management"
    And ui: Edit calendar name in Calendar Management
    And ui: I save the calendar
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Resource Management"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    Then ui: Verify updated calendar name is displayed