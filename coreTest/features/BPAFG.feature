Feature: Core Test Suite

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  Scenario: BPAFG Core Test
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section


    Given ui: Quick navigate to "Resource Management"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    # And ui: Click on Resource navigation button and select "Capacity"
    And ui: Click on "Capacity tab"
    And ui: turn on has capacity toggle "On"

    #PM
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: I select dataset "Allocation" and assignment type "Planned"
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    #BPAFG
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: Enter:"20" for cells of months:"Jan" of current year for recently created "project" in BPAFG Grid
    Then ui: I verify specific cell "1" of task "Generic" is highlighted with assignment type "Planned" in BPAFG

    # #filters in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on column filter of "Start" Date
    And ui: I click on "within" column filter
    And ui: I select "this year" as filter and validate applied filter
    And ui: I clear selected column filters of "Start" date
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on column filter of "End" Date
    And ui: I click on "within" column filter
    And ui: I select "this year" as filter and validate applied filter
    And ui: I clear selected column filters of "End" date

    #11. Validate user can group data on BPAFG grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: Wait for 4 seconds
    And ui: I validate data is grouped by "Start Date" attribute
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: Wait for 4 seconds
    And ui: I validate data is grouped by "End Date" attribute
    And ui: Ungroup groups if any in BPAFG

    And ui: Select attributes created earlier in BPAFG
    And ui: I click on options in BPAFG
    And ui: Select Tasks to show as:"All" in Grid options of BPAFG
    #Wait is required without which assertion is failing
    And ui: Close Options section in BPAFG
    And ui: Wait for 4 seconds
    # #13 - Bulk Project Allocation Flatgrid - Proect, Resource View, Assignemnt CF View and edit
    # Then ui: Verify Rich text in BPAFG for recently created Cfs
    # #13 - BPAFG Advanced Resource Replace
    And ui: Click on meatballs icon of recently created project and resource and select option "Resource replace advanced" in BPAFG
    And ui: Clear filters if any in Advanced resource replace of BPAFG
    And ui: Search for recently created resource in Advanced resource replace of BPAFG
    And ui: Select resource attributes created earlier Advanced resource replace of BPAFG
    Then ui: Softassert all
