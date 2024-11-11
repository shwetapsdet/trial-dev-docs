Feature: Project Management Core Test

    Background: Login to SG
        Given ui: I opened SG Login Page
        And ui: I attempt to login with valid credentails
        Then ui: I validate for successful login
        And ui: Click on username and select Profile
        And ui: Create a token for "1" "Hours"

        #working weekend
        And ui: Quick navigate to "Admin Settings"
        And ui: Click on General Settings tile
        And ui: Click on "Global" tab in General Settings
        And ui: I toggle Working Weekends to "On" in General settings global tab
        And ui: Click on Save button in General Settings and wait for Save button to be clickable again
        And ui: I navigate to "Dashboard"

    Scenario: Project Core Test
        Given setup: Test Data "Project"
        And setup: Test Data "Resource"
        And setup: Test Data "Kanban"
        And setup: Test Data "SoftAssert"
        And setup: Test Data "View"

        When ui: Click on "Admin Settings" tile in homepage
        And ui: Click on "Attribute Management" tile in Admin settings
        And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section

        Given ui: Quick navigate to "Resource Management"
        And api: I create a default resource for automation with default rate as "100"
        And ui: I search for resource in global search and click on it
        And ui: Click on "Capacity tab"
        # And ui: Click on Resource navigation button and select "Capacity"
        And ui: turn on has capacity toggle "On"

        #PM
        And ui: Quick navigate to "Project Management"
        And api: I create a default project for automation with date range as "current" year
        And ui: Search for Project in global search and click on it
        And ui: Click on Checkout button in SPA and wait for Release button
        And ui: I click on specific unit "Cost" in SPA
        And ui: I click on specific unit "FTE" in SPA
        And ui: I click on specific unit "FTE %" in SPA
        And ui: I click on specific unit "Manday" in SPA
        And ui: I click on specific unit "Gantt" in SPA
        And ui: I click on specific unit "Time" in SPA
        And ui: I select specific date mode "Month" in SPA
        And ui: I select specific date mode "Day" in SPA
        And ui: I select specific date mode "Week" in SPA
        And ui: I select specific date mode "Quarter" in SPA
        And ui: I select specific date mode "Year" in SPA
        And ui: I select specific date mode "Project" in SPA
        And ui: I select specific date mode "Month" in SPA
        And ui: I select dataset "Demand" and assignment type "Planned"
        And ui: I select dataset "Demand" and assignment type "Actual"
        And ui: I select dataset "Allocation" and assignment type "Actual"
        And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
        And ui: Click on Save and Check In button in SPA and wait for Checkout button
        And ui: Select attributes created earlier in SPA

        #Export
        And ui: Remove a directory as:"ST-1540_Downloads" in projects's root directory
        And ui: Create a new directory as:"ST-1540_Downloads" in projects's root directory
        And ui: Set downloads directory as:"ST-1540_Downloads" in projects's root directory
        And ui: Click on export icon in PM Grid
        Then ui: Softassert if PM Grid exported file got downloaded in directory:"ST-1540_Downloads" under project's root directory

        #CPA
        And ui: I click on edit button of specific resource in "Allocation" Tab
        And ui: I click on cross project allocation
        Then ui: I verify current year start and end date in PM CPA section
        Then ui: I verify quick filter icon is displayed
        Then ui: I verify all quick filter options are displayed in CPA section
        And ui: I click on quick filter icon in PM CPA section
        Then ui: I click on individual quick filter options and validate projectName, start date and end date in PM CPA section
        And ui: Click on Close button in CPA

        #Resource replace
        And ui: Click on Checkout button in SPA and wait for Release button
        And ui: I click on edit button of specific resource in "Allocation" Tab
        And ui: I click on Resource Replace Button
        And ui: I select Administrator resource
        And ui: I click on Replace Resource and verify resource is replaced
        And ui: Click on Release button in SPA and wait for Checkout button

        #Group by
        And ui: Click on Checkout button in SPA and wait for Release button
        Then ui: I verify quick search option is displayed
        And ui: I click on group by dropdown and select "Resource" in SPA
        And ui: I click on group by dropdown and select "Task" in SPA
        And ui: I click on group by dropdown and select "Resource" in SPA
        And ui: I click on options dropdown in SPA
        And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
        Then ui: I verify overlay heatmap for rows option is displayed in SPA grid options dialog
        Then ui: I verify overlay heatmap for groups option is displayed in SPA grid options dialog
        And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
        Then ui: I verify overlay heatmap for rows option is displayed in SPA grid options dialog
        Then ui: I verify overlay heatmap for groups option is displayed in SPA grid options dialog
        And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
        Then ui: I verify overlay heatmap for rows option is not displayed in SPA grid options dialog
        Then ui: I verify overlay heatmap for groups option is not displayed in SPA grid options dialog
        And ui: I close options overlay in SPA

        #Bulk Assignment
        And ui: I click on Add Assignment
        And ui: I validate Bulk Assignment Dialog Open
        And ui: I click on select all resource checkbox
        And ui: I add all the selected resources to Project
        And ui: I rearrange resources by sorting them in ascending and descending order
        And ui: Click on Release button in SPA and wait for Checkout button

        #Filters
        And ui: Quick navigate to "Project Management"
        And ui: Clear filters if any in PM Grid
        And ui: Ungroup groups if any in PM Grid
        And ui: I click on filters
        And ui: I click on Choose filters
        And ui: I select filter "Created On"
        Then ui: I validate project is built within today

        #View
        And ui: Quick navigate to "Project Management"
        And ui: Click on "gantt" tab in Project Management
        Then ui: Create new view in PM grid and select it
        And ui: Search for recently created project in PM Grid
        Then ui: Verify if recently created project is displayed in PM Gantt Tab

        #Kanban
        And ui: Quick navigate to "Project Management"
        And ui: Click on "kanban" tab in Project Management
        And ui: Create a new Kanban board with Column attribute as:"Dataset Preference" and Swimlanes as:"Allocation"
        And ui: Quick navigate to "Project Management"
        And ui: Click on "kanban" tab in Project Management
        And ui: I click on board settings and select newly created board in kanban tab
        And ui: Search for recently created project in Kanban section of PM
        And ui: Double click on recently created project in Kanban section of PM
        And ui: I click on open folder icon in custom modal container in kanban tab
        Then ui: I verify specific project name created using model is displayed

        #Build Team
        And ui: Search for Project in global search and click on it
        And ui: Click on Project navigation dropdown and select "Build Team"
        And ui: Click on Options button in NA
        And ui: Clear dates of Date Range Filter in Grid options of NA
        Then ui: Verify dates of Date Range Filter in Grid options of NA are empty
        And ui: Enter start date as "first" of the month "Jan" of current year in Grid options of NA
        And ui: Enter end date as "last" of the month "Dec" of current year in Grid options of NA
        And ui: Close Options section in SPA

        And ui: Add recently created "resource" to build team
        And ui: Click on save button in Build Team and wait for it to be clickable

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

        #Financials
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
        Then ui: Softassert if Financials exported file got downloaded in directory:"ST-1970_Downloads" under project's root directory
        And ui: Click on Save and Check In button in SPA and wait for Checkout button

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

        #Sheet
        And setup: Test Data "Sheet Template1"
        And setup: Test Data "Sheet Template2"
        And ui: Quick navigate to "Admin Settings"
        And ui: Click on "Sheet Templates" tile in Admin settings
        And ui: I create 2 sheet template with column type as "Bool" for "Project"
        And ui: I pin newly created sheet in the tab
        Then ui: I verify that the newly created sheet is "Pinned" in the grid

        And ui: Search for Project in global search and click on it
        And ui: Click on Project navigation dropdown and select "Sheets"

        And ui: I add "2" new sheet through add button
        And ui: Click on the edit in list view button
        And ui: I select sheet template 1 from the select sheet template dropdown
        And ui: I click on view button
        And ui: I Click on Create View
        And ui: I rename the new view with the model name
        And ui: I search the view created by model
        And ui: I select the "Created" view
        And ui: I validate that the created view is displayed

        And ui: I navigate to "Dashboard"
        And ui: Search for Project in global search and click on it
        And ui: Click on Project navigation dropdown and select "Sheets"
        And ui: Click on the edit in list view button
        And ui: I select sheet template 1 from the select sheet template dropdown
        And ui: I click on view button
        And ui: I search the view created by model
        And ui: I validate that the selected view is still locked
        And ui: I create a clone of the view created by model
        And ui: I verify that "cloned view" is arranged above "original view"
        And ui: I verify the created view has been "cloned" successfully

        And ui: I "Clone" the reordered clone view
        And ui: I verify the clone view has been "cloned" successfully
        And ui: I "Rename" the reordered clone view
        And ui: I verify the clone view has been "renamed" successfully
        And ui: I create a clone of the view created by model
        And ui: I "Delete" the reordered clone view
        And ui: I verify the clone view has been "deleted" successfully
        Then ui: Softassert all

        #Snapshot
        Given ui: I switch to Project Option "Snapshots"
        When ui: I create project snapshot from project option
        Then ui: I validate snapshot is created
        Then ui: I validate restore icon showing in Snapshot Grid
        Then ui: I click on snapshot from snapshot table
        Then ui: I click on snapshot preview list
        And ui: I validate resotre icon showing on preview list
        Then ui: I click on restore button from preview list
        And ui: I validate snapshot name and timestamp
        Then ui: I select "RestoreOptions" from restore popup
        And ui: I validate all options toggle is enabled
        Then ui: I select "RestoreOptions" from restore popup
        And ui: I validate all option toggle is disabled

