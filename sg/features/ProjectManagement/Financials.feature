Feature: Financials

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @issue=SG-12182
  @8.2
  Scenario: Unable to view the Financial page; also unable to checkout Financial
    Given setup: Test Data "Project"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And setup: Test Data "Resource List Attribute"
    When ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And ui: Create "1" attributes in "Project" tab of type "Selection" with default values
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Financial" "Categories"
    And ui: I click on create new financial category
    And ui: I enter a name for Financial Category with "Positve" and type as "Default"
    And ui: I click on Save button in the financial category create model
    And ui: I navigate to "Dashboard"
    Given ui: I navigate to "Budget" "Management"
    And ui: I click on create Budget button
    And ui: Enter start date as "Jan" of current year
    And ui: Enter end date as "Oct" of current year
    And ui: I create a budget with using created attribute as project custom field
    Given ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    Given ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: I verify client or server error warning is not displayed
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: I select recently created financial category
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I verify client or server error warning is not displayed
    Then ui: Softassert all

  @testId=ST-1970
  @testId=ST-1972
  @issue=SG-12000
  @owner=Rinkesh
  @8.2
  Scenario: Validate fiscal month and quarter
    Given setup: Test Data "SoftAssert"
    When ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Uncheck fiscal month and fiscal quarter
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    When ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And ui: Create a new Regular Project and set year as:"2025" for allocations
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    Then ui: I verify Fiscal Month option is not displayed in mode of entry dropdown
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Check fiscal month and fiscal quarter
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed

    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "next" year in fiscal period management
    And ui: I click on save button in fiscal period management
    And ui: Wait for 4 seconds
    Given ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    When ui: I navigate to "Financial" "Categories"
    And ui: I click on create new financial category
    And ui: I enter a name for Financial Category with "Positve" and type as "Default"
    And ui: I click on Save button in the financial category create model
    And ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And ui: Create a new Regular Project and set year as:"2025" for allocations
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select recently created financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Select Date mode as:"Fiscal Month" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Select Date mode as:"Fiscal Quarter" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: Remove a directory as:"ST-1970_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1970_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1970_Downloads" in projects's root directory
    And ui: Click on export icon in Financials
    # Validation wont work due to existing minor bug-SG-12487
    # Then ui: Softassert if client error is not displayed
    Then ui: Softassert if Financials exported file got downloaded in directory:"ST-1970_Downloads" under project's root directory
    Then ui: Softassert all

  @testId=ST-1971
  @testId=ST-1979
  @issue=SG-12000
  @owner=Rinkesh
  @8.2
  Scenario: Validate fiscal month and quarter in snapshot and snapshot restore
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "next" year in fiscal period management
    And ui: I click on save button in fiscal period management
    And ui: Wait for 4 seconds
    Given ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    When ui: I navigate to "Financial" "Categories"
    And ui: I click on create new financial category
    And ui: I enter a name for Financial Category with "Positve" and type as "Default"
    And ui: I click on Save button in the financial category create model
    And ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And ui: Create a new Regular Project and set year as:"2025" for allocations
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select recently created financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Select Date mode as:"Fiscal Month" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Select Date mode as:"Fiscal Quarter" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created

    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Select Date mode as:"Fiscal Month" in Financials if not already selected
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    Given ui: I switch to Project Option "Snapshots"
    And ui: I click on snapshot from snapshot table
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Select Date mode as:"Fiscal Month" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I validate that the allocated hour is "100" to the financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on quit snapshot view from the snapshot
    Given ui: I switch to Project Option "Snapshots"
    Then ui: I click on restore button from preview list
    Then ui: I select "RestoreOptions" from restore popup
    And ui: I restore the latest created snapshot and conform it
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I validate that the allocated hour is "100" to the financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    Then ui: Softassert all

  @testId=ST-1980
  @issue=SG-12000
  @owner=Rinkesh
  @8.2
  Scenario: Validate fiscal month and quarter in Project Template
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "next" year in fiscal period management
    And ui: I click on save button in fiscal period management
    And ui: Wait for 4 seconds
    Given ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    When ui: I navigate to "Financial" "Categories"
    And ui: I click on create new financial category
    And ui: I enter a name for Financial Category with "Positve" and type as "Default"
    And ui: I click on Save button in the financial category create model
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "next" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select recently created financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Select Date mode as:"Fiscal Month" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Select Date mode as:"Fiscal Quarter" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable

    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Select Date mode as:"Fiscal Month" in Financials if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I allocate "1005" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Attributes"
    When ui: Click on Import from Template button
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search and select template in Import from Template modal
    And ui: Toggle "On" "Financials" restore option in Import from Template modal
    When ui: Click on Apply button in Import from Template modal
    And ui: Click on "Apply" button in confirmation modal
    And ui: Wait for 4 seconds
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I validate that the allocated hour is "100" to the financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    Then ui: Softassert all

  @testId=ST-2038
  @9.0
  Scenario: Labor Costs calculation with 7-days work week from Project Financial page.
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    When ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "10" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button

    And ui: Enter Start date as "01.01.2024" and End date as "7.01.2024" in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "40" hour for resource to project in SPA in Month mode for the dates between "01.01.2024" and "7.01.2024" when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    And ui: Quick navigate to "Project Management"
    And ui: I navigate to Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select specific date mode "Day" in SPA
    And ui: I enter allocation value as "8" for weekends between date range from "01.01.2024" to "7.01.2024" in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: I verify client or server error warning is not displayed
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: I validate Allocation value for range between "01.01.2024" to "7.01.2024"

    Then ui: Softassert all