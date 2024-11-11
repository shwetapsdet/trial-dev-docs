Feature: BuildTeam management

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  @testId=ST-1598
  @issue=SG-10713
  @owner=Vivek
  Scenario: All Resource names are displayed within Build Team, even if you don't have access through "View in Lists"
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource and assign role "Administrator"
    And ui: I navigate to "Dashboard"
    And ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to Project Access
    And ui: Create a rule for recently created resource, project and "Manager" role
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Resource" "Access"
    And ui: Create a rule for recently created resource with administrator resource added and "Viewer" role
    And ui: Logout
    And ui: I attempt to login with previous resource credentails
    And ui: I navigate to "Project" "Management"
    And ui: I navigate to Project
    And ui: Click on Project navigation dropdown and select "Build Team"
    # step commented due to not obtaining expected result
    # And ui: I validate all resource are visible but only "View in List" resource are editable
    # And ui: Logout

  @testId=ST-1382
  @owner=Vivek
  Scenario: Validate Auto add resource to Build Team
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    And ui: I click on logo to navigate to homepage
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select first attribute created using model in columns dropdown in resource list page
    And ui: I click on columns dropdown in resource list page
    And ui: I search for resource in resource list page
    And ui: I edit attribute and resource created using model in resource list page
    And ui: I set Attribute Value to Yes
    And ui: I click on save button on attribute popup that available on resource list page
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Add attribute and its value as "Yes" to Automatic Team Fields
    And ui: Observe that the resource is "added" successfully into the BuildTeam

  @testId=ST-1595
  @owner=Vivek
  Scenario: Validate that the Auto add resource to Build Team also works if another is already added
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    And ui: I click on logo to navigate to homepage
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select first attribute created using model in columns dropdown in resource list page
    And ui: I click on columns dropdown in resource list page
    And ui: I search for resource in resource list page
    And ui: I edit attribute and resource created using model in resource list page
    And ui: I set Attribute Value to Yes
    And ui: I click on save button on attribute popup that available on resource list page
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: I add Administrator resource to the BuildTeam
    And ui: Add attribute and its value as "Yes" to Automatic Team Fields
    Then ui: Observe that the resource is "added" successfully into the BuildTeam

  @testId=ST-1596
  @owner=Vivek
  Scenario: Validate that the Auto added resource to Build Team can be deleted
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    And ui: I click on logo to navigate to homepage
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select first attribute created using model in columns dropdown in resource list page
    And ui: I click on columns dropdown in resource list page
    And ui: I search for resource in resource list page
    And ui: I edit attribute and resource created using model in resource list page
    And ui: I set Attribute Value to Yes
    And ui: I click on save button on attribute popup that available on resource list page
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Add attribute and its value as "Yes" to Automatic Team Fields
    And ui: Observe that the resource is "added" successfully into the BuildTeam
    And ui: I remove the newly added resource from the buildteam
    And ui: Observe that the resource is "removed" successfully into the BuildTeam

  @testId=ST-1597
  @owner=Vivek
  Scenario: Validate that the Auto added resource to Build Team is also added in NA
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    And ui: I click on logo to navigate to homepage
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select first attribute created using model in columns dropdown in resource list page
    And ui: I click on columns dropdown in resource list page
    And ui: I search for resource in resource list page
    And ui: I edit attribute and resource created using model in resource list page
    And ui: I set Attribute Value to Yes
    And ui: I click on save button on attribute popup that available on resource list page
    And ui: I click on logo to navigate to homepage
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Add attribute and its value as "Yes" to Automatic Team Fields
    And ui: Observe that the resource is "added" successfully into the BuildTeam
    And ui: I switch to Project Option "Allocations"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I open Bulk assignment popup
    And ui: I validate that the added resource is in Bulk assignment

  @testId=ST-1525
  @issue=SG-11810
  Scenario: Build Team - Is Timesheet Approver, Is Resource Manager, Requires Resource Manager Approval, Resource Managers, Timesheet Approver filter should show correct options
    Given ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Clear filters if any in PM Grid
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Is Timesheet Approver"
    Then ui: I validate filter "Is Timesheet Approver" has correct filter options
    And ui: I click on Choose filters
    And ui: I select filter "Is Resource Manager"
    And ui: I validate filter "Is Resource Manager" has correct filter options
    And ui: I click on Choose filters
    And ui: I select filter "Resource Managers"
    And ui: I validate filter "Resource Managers" has correct filter options
    And ui: I click on Choose filters
    And ui: I select filter "Require Resource Manager Approval"
    And ui: I validate filter "Require Resource Manager Approval" has correct filter options
    And ui: I click on Choose filters
    And ui: I select filter "Timesheet Approver"
    And ui: I validate filter "Timesheet Approver" has correct filter options

  @testId=ST-1531
  @issue=SG-11579
  Scenario: Resource not added automatically after select correct custom field value at Build team page.
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "Resource List Attribute"
    And ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select first attribute created using model in columns dropdown in resource list page
    And ui: I click on columns dropdown in resource list page
    And ui: I search for resource in resource list page
    And ui: I edit attribute and resource created using model in resource list page
    And ui: I set Attribute Value to Yes
    And ui: I click on save button on attribute popup that available on resource list page
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Add attribute and its value as "Yes" to Automatic Team Fields
    And ui: Click on Auto-Add to Team button in Build Team section
    Then ui: I validate recently created resource name is present inside resource merge list in Build Team
    And ui: I click on merge button
    And ui: Observe that the resource is "added" successfully into the BuildTeam

  @testId=ST-1949
  @testId=ST-1950
  @testId=ST-1953
  @testId=ST-1954
  @testId=ST-1955
  @testId=ST-1956
  @issue=SG-12048
  @owner=Devanshi
  @8.2
  Scenario: Validate Start and End date field functionality for date range filter under "Grid options" at Build team page.
    Given setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Build Team"

    # 3. Must be possible to leave the start date or end date blank.
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty

    #1. Must not be possible to set a start date later than the end date.
    And ui: Enter start date as "last" of the month "Aug" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA
    Then ui: Verify end date is "last" of the month "Aug" of current year in Grid options of NA

    #2. Must not be possible to set the end date earlier than the start date.
    And ui: Clear dates of Date Range Filter in Grid options of NA
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA
    And ui: Enter end date as "last" of the month "Jan" of current year in Grid options of NA
    Then ui: Verify end date is "first" of the month "Mar" of current year in Grid options of NA

    #4. Must limit the user to enter dates in the new date filter within the date range of the project
    And ui: Clear dates of Date Range Filter in Grid options of NA
    And ui: Enter start date as "first" of the month "Mar" of previous year in Grid options of NA
    Then ui: Verify start date is "first" of the month "Jan" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Mar" of next year in Grid options of NA
    Then ui: Verify end date is "last" of the month "Dec" of current year in Grid options of NA

    #7. Check Net availability grid after enter start and end date.
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA
    And ui: Close Options section in SPA

    # 6. Check Net availability grid if start and end date not setup.
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty
    # Then ui: Verify start date is month "Mar" of current year in Grid options of NA
    # Then ui: Verify end date is month "Aug" of current year in Grid options of NA
    And ui: Close Options section in SPA

    And ui: Click on Options button in NA
    And ui: Enter start date as "first" of the month "Jan" of current year in Grid options of NA
    And ui: Enter end date as "last" of the month "Dec" of current year in Grid options of NA
    And ui: I click on dynamic date options
    And ui: Select option "Current Qtr" and check net availability grid
    And ui: Close Options section in SPA
    And ui: I validate date is set automatically to current qtr of the month
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Next Qtr" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next qtr of the month
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Current Year" and check net availability grid
    And ui: Close Options section in SPA
    And ui: I validate date is set automatically to end of the year
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Next Year" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to end of the year
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "YTD" and check net availability grid
    And ui: I click on dynamic date options
    And ui: Select option "+3 Months" and check net availability grid
    # And ui: Verify option "+3 Months" and check net availability grid
    And ui: I click on dynamic date options
    And ui: Select option "+6 Months" and check net availability grid
    # And ui: Verify option "+6 Months" and check net availability grid
    # And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "3 Years" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next three year end of the year

    When ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Search for recently created project in PM Grid
    And ui: I click on the project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select Administrator resource and click on edit button
    And ui: I click on Resource Replace Button

    # 3. Must be possible to leave the start date or end date blank.
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty

    #1. Must not be possible to set a start date later than the end date.
    And ui: Enter start date as "last" of the month "Aug" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA
    Then ui: Verify end date is "last" of the month "Aug" of current year in Grid options of NA

    #2. Must not be possible to set the end date earlier than the start date.
    And ui: Clear dates of Date Range Filter in Grid options of NA
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA
    And ui: Enter end date as "last" of the month "Jan" of current year in Grid options of NA
    Then ui: Verify end date is "first" of the month "Mar" of current year in Grid options of NA

    #4. Must limit the user to enter dates in the new date filter within the date range of the project
    And ui: Clear dates of Date Range Filter in Grid options of NA
    And ui: Enter start date as "first" of the month "Mar" of previous year in Grid options of NA
    Then ui: Verify start date is "first" of the month "Jan" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Mar" of next year in Grid options of NA
    Then ui: Verify end date is "last" of the month "Dec" of current year in Grid options of NA

    #7. Check Net availability grid after enter start and end date.
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA
    And ui: Close Options section in SPA

    # 6. Check Net availability grid if start and end date not setup.
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty
    # Then ui: Verify start date is month "Mar" of current year in Grid options of NA
    # Then ui: Verify end date is month "Aug" of current year in Grid options of NA
    And ui: Close Options section in SPA

    And ui: Click on Options button in NA
    And ui: Enter start date as "first" of the month "Jan" of current year in Grid options of NA
    And ui: Enter end date as "last" of the month "Dec" of current year in Grid options of NA
    And ui: I click on dynamic date options
    And ui: Select option "Current Qtr" and check net availability grid
    And ui: Close Options section in SPA
    And ui: I validate date is set automatically to current qtr of the month
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Next Qtr" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next qtr of the month
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Current Year" and check net availability grid
    And ui: Close Options section in SPA
    And ui: I validate date is set automatically to end of the year
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Next Year" and check net availability grid
    # And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to end of the year
    And ui: I click on dynamic date options
    And ui: Select option "YTD" and check net availability grid
    And ui: I click on dynamic date options
    And ui: Select option "+3 Months" and check net availability grid
    # And ui: Verify option "+3 Months" and check net availability grid
    And ui: I click on dynamic date options
    And ui: Select option "+6 Months" and check net availability grid
    # And ui: Verify option "+6 Months" and check net availability grid
    # And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "3 Years" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next three year end of the year
    And ui: I cancel the resource replace
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I navigate to "Dashboard"
    And ui: Logout

    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"

    Given ui: Click on "Resource Management" tile in homepage
    And ui: I create a new Resource with email, username, password

    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on edit button of specific resource in BPAFG
    And ui: I click on Resource Replace Advanced

    # # 3. Must be possible to leave the start date or end date blank.
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA in BPAFG
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty in BPAFG

    #1. Must not be possible to set a start date later than the end date.
    And ui: Enter start date as "last" of the month "Aug" of current year in Grid options of NA in BPAFG
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA in BPAFG
    Then ui: Verify end date is "last" of the month "Aug" of current year in Grid options of NA in BPAFG

    #2. Must not be possible to set the end date earlier than the start date.
    And ui: Clear dates of Date Range Filter in Grid options of NA in BPAFG
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA in BPAFG
    And ui: Enter end date as "last" of the month "Jan" of current year in Grid options of NA in BPAFG
    Then ui: Verify end date is "first" of the month "Mar" of current year in Grid options of NA in BPAFG

    #4. Must limit the user to enter dates in the new date filter within the date range of the project
    And ui: Clear dates of Date Range Filter in Grid options of NA in BPAFG
    And ui: Enter start date as "first" of the month "Mar" of previous year in Grid options of NA in BPAFG
    And ui: Enter end date as "last" of the month "Aug" of next year in Grid options of NA in BPAFG
    Then ui: Verify start date is "first" of the month "Jan" of current year in Grid options of NA in BPAFG
    Then ui: Verify end date is "last" of the month "Dec" of current year in Grid options of NA in BPAFG

    # 6. Check Net availability grid if start and end date not setup.
    #7. Check Net availability grid after enter start and end date.
    # And ui: Click on Options button in NA
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA in BPAFG
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA in BPAFG
    # And ui: Close Options section in SPA
    # Then ui: Verify start date is month "Mar" of current year in Grid options of NA
    # Then ui: Verify end date is month "Aug" of current year in Grid options of NA

    # And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA in BPAFG
    And ui: Enter start date as "first" of the month "Jan" of current year in Grid options of NA in BPAFG
    And ui: Enter end date as "first" of the month "Dec" of current year in Grid options of NA in BPAFG
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "Current Qtr" and check net availability grid in BPAFG
    And ui: I validate date is set automatically to current qtr of the month in BPAFG
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "Next Qtr" and check net availability grid in BPAFG
    # And ui: I validate date is set automatically to next qtr of the month in BPAFG
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "Current Year" and check net availability grid in BPAFG
    And ui: I validate date is set automatically to end of the year in BPAFG
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "Next Year" and check net availability grid in BPAFG
    # And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next year end of the year
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "YTD" and check net availability grid in BPAFG
    # And ui: Verify option "YTD" and check net availability grid
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "+3 Months" and check net availability grid in BPAFG
    # And ui: Verify option "+3 Months" and check net availability grid
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "+6 Months" and check net availability grid in BPAFG
    # And ui: Verify option "+6 Months" and check net availability grid
    # And ui: Click on Options button in NA
    And ui: I click on dynamic date options in BPAFG
    And ui: Select option "3 Years" and check net availability grid in BPAFG
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next three year end of the year

  @testId=ST-2066
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Build Team Net availability grid for 7 days work week
    And setup: Test Data "Project"
    And setup: Test Data "Resource"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Management"
    When ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for resource to project in SPA in Month mode for "current" quarter when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty
    And ui: Enter start date as "first" of the month "Jan" of current year in Grid options of NA
    And ui: Enter end date as "last" of the month "Dec" of current year in Grid options of NA
    And ui: Close Options section in SPA
    And ui: I select specific date mode "Month" in NA
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Day" in NA
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Week" in NA
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Quarter" in NA
    Then ui: I verify weekends are not grayed out