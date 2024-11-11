Feature: Excel Import

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-2067
  @issue=SG-12635
  @issue=SG-12118
  @9.0
  @9.0.1
  Scenario: Import admin time type for 7 days weekends
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Resource"
    When ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with name as "Imported Resource"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Admin Time" tile in Admin settings
    And ui: I create Admin time type as "AutomationAdminType"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportAdminTime" tab from the Import list
    And ui: Upload the "importAdminTime" csv file
    And ui: I click on Synchronize button
    And ui: I validate that the sync process has been completed

    And ui: Quick navigate to "Resource Management"
    And ui: Ungroup groups if any in RM Grid
    And ui: Clear filters if any in RM Grid
    And ui: I search and open for resource "Imported Resource" in resource list page
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I select start date as "01-04-2024" and end date as "07-04-2024" in capacity tab
    And ui: Wait for 4 seconds
    And ui: Select Date mode as:"Week" in Capacity if not already selected
    And ui: I validate that the allocation in "Resource Capacity" is as per imported sheet
    # Then ui: Softassert all

  @testId=ST-2068
  @testId=ST-2072
  @issue=SG-12118
  @9.0
  Scenario: Import resource for 7 days weekends
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Resource"
    When ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with name as "Imported Resource"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportResources" tab from the Import list
    And ui: Upload the "importResource" csv file
    And ui: I click on Synchronize button
    And ui: I validate that the sync process has been completed

    And ui: Quick navigate to "Resource Management"
    And ui: Ungroup groups if any in RM Grid
    And ui: Clear filters if any in RM Grid
    And ui: I search and open for resource "Imported Resource" in resource list page
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I select start date as "01-04-2024" and end date as "07-04-2024" in capacity tab
    And ui: Wait for 4 seconds
    And ui: Select Date mode as:"Week" in Capacity if not already selected
    And ui: I validate that the allocation in "Base Capacity" is as per imported sheet
    # Then ui: Softassert all