Feature: Audit Log

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1565
  @issue=SG-9937
  @owner=Ram
  Scenario: SG-9937 - Allow Rich Text for Text attributes [Audit Logs]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section

    # #18 - Audit Logs
    And ui: I click on logo
    And ui: Navigate to Audit Log from homepage
    And ui: I click on filters
    #This assertion will fail till we fix SG-11632 - Attribute Management - Rich Text CF's default value is incorrect in Audit Logs
    # And ui: Filter by recently created CFs and verify logs have Rich Text in Audit Log page
    Then ui: Softassert all

  @testId=ST-1533
  @issue=SG-11635
  Scenario: Audit Log - Entity List dropdown is shown undefined text instead of entity type
    Given setup: Test Data "SoftAssert"
    When ui: Navigate to Audit Log from homepage
    And ui: Clear filter if any in Audit log
    And ui: I click on filters
    And ui: I select "Custom Field" filter from the Choose Entity dropdown
    And ui: I validate that the attribute field contain option "Any Custom Field" is "displayed"
    And ui: I validate that the attribute field contain option "Any undefined" is "not displayed"
    And ui: I select "Admin Time Type" filter from the Choose Entity dropdown
    And ui: I validate that the attribute field contain option "Any Admin Time Type" is "displayed"
    And ui: I validate that the attribute field contain option "Any undefined" is "not displayed"
    And ui: I select "Custom Field" filter from the Choose Entity dropdown
    And ui: I validate that the attribute field contain option "Any Custom Field" is "displayed"
    And ui: I validate that the attribute field contain option "Any undefined" is "not displayed"
    Then ui: Softassert all

  @tesId=ST-2062
  @issue=SG-12118
  @9.0
  Scenario: Project Management > Check Project Audit log for week and weekend
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "20" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter Start date as "04.03.2024" and End date as "10.03.2024" in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "30" hour for resource to project in SPA in Month mode for the dates between "04.03.2024" and "10.03.2024" when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select specific date mode "Day" in SPA
    And ui: I enter allocation value as "6" for weekends between date range from "04.03.2024" to "10.03.2024" in SPA
    And ui: I enter allocation value as "2" for date "04.03.2024" in SPA if start date is "04.03.2024"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: I click on logo
    And ui: Navigate to Audit Log from homepage
    And ui: Clear filter if any in Audit log
    And ui: I click on filters
    And ui: I select "Project" filter from the Choose Entity dropdown
    And ui: I filter by recently created project with method as "Null"
    And ui: I select the updated project from audit log
    And ui: I select date mode as "Days" in audit log
    And ui: I validate allocation value as "2" for date mode as "Days" for method as "Updated"
    And ui: I select date mode as "Weeks" in audit log
    And ui: I validate allocation value as "38" for date mode as "Weeks" for method as "Updated"
    And ui: I select date mode as "Months" in audit log
    And ui: I validate allocation value as "38" for date mode as "Months" for method as "Updated"

    # Remove weekend value
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select specific date mode "Day" in SPA
    And ui: I enter allocation value as "0" for date "09.03.2024" in SPA if start date is "04.03.2024"
    And ui: I enter allocation value as "0" for date "10.03.2024" in SPA if start date is "04.03.2024"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: I click on logo
    And ui: Navigate to Audit Log from homepage
    And ui: Clear filter if any in Audit log
    And ui: I click on filters
    And ui: I select "Project" filter from the Choose Entity dropdown
    And ui: I filter by recently created project with method as "Null"
    And ui: I select the updated project from audit log
    And ui: I select date mode as "Weeks" in audit log
    And ui: I validate allocation value as "26" for date mode as "Weeks" for method as "Updated"
    And ui: I select date mode as "Months" in audit log
    And ui: I validate allocation value as "26" for date mode as "Months" for method as "Updated"
    # Then ui: Softassert all


  @tesId=ST-2063
  @issue=SG-12118
  @9.0
  Scenario: Check Audit Log for Working weekend toggle button
    # Validation wont work due to bug ticket SG-12624
    Given setup: Test Data "SoftAssert"

    When ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    And ui: I click on logo
    And ui: Navigate to Audit Log from homepage
    And ui: Clear filter if any in Audit log
    # And ui: I validate that log has been added for working weekend toggle as "On"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    And ui: I click on logo
    And ui: Navigate to Audit Log from homepage
    And ui: Clear filter if any in Audit log
    # And ui: I validate that log has been added for working weekend toggle as "Off"
    Then ui: Softassert all

  @testId=ST-2069
  @issue=SG-12118
  @9.0
  Scenario: Audit log for capacity with 7 day work week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    When ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: Enter Base Capacity "8" in "10" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "10" number of cells specifically for weekends in Resource Capacity
    And ui: I click on save button
    And ui: Click on Resource navigation button and select "Audit Log"
    And ui: I select the View all Field option
    And ui: I select date mode as "Days" in audit log
    And ui: I validate allocation value as "8" for date mode as "Days" for method as "Updated"
    And ui: I select date mode as "Weeks" in audit log
    And ui: I validate allocation value as "56" for date mode as "Weeks" for method as "Updated"
    And ui: I select date mode as "Months" in audit log
    And ui: I validate allocation value as "200" for date mode as "Months" for method as "Updated"

    # And ui: Softassert all
