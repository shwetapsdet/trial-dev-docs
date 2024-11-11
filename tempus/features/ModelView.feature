Feature: Tempus Model View

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1706
  @issue=TH-1059
  @8.2
  @Level-1
  Scenario: Tempus - Gantt: Insert columns
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I select attributes "Dataset Preference" in insert columns dropdown in Model
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify specific column header "Dataset Preference" is "displayed" in Model
    And ui: I "Hide" the insert column with the eye icon
    And ui: I verify specific column header "Dataset Preference" is "not displayed" in Model
    And ui: I "Un-Hide" the insert column with the eye icon
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I select attributes "Dataset Preference" in insert columns dropdown in Model
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify specific column header "Dataset Preference" is "not displayed" in Model

    # Clone the Project
    And ui: I click on filter button in "upper" section of model
    And ui: I uncheck all the projects
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I select attributes "Dataset Preference" in insert columns dropdown in Model
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify specific column header "Dataset Preference" is "displayed" in Model
    And ui: Click ellipsis icon against recently created project in Tempus model and select option: "Clone"
    And ui: Enter project name in Clone popup of a Tempus model
    And ui: Click on "Save" button in confirmation modal in Tempus
    Then ui: Verify if cloned project is displayed in Project Gantt area of a Tempus model
    And ui: I validate that the attribute "Dataset Preference" has same value for both Cloned Project and Original project

    And ui: Softassert all

  @testId=ST-1760
  @testId=ST-1857
  @Level-1
  Scenario: Tempus - Validate Go to supergrid functionality
    Given ui: Switch to Tempus in same tab
    When ui: Click on username and select Go to supergrid
    Then ui: I validate user is on supergrid

  @testId=ST-1726
  @testId=ST-1707
  @Level-1
  Scenario: Tempus - Validate filters on Gantt and Grid tab in upper section of view model
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Select recently created CF in Priority attribute of Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page

    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    And ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page
    And ui: I click on filter button in "upper" section of model
    And ui: I uncheck all the projects
    And ui: I click on filter button in "upper" section of model
    Then ui: I validate the search is not visible in viewpoint in the view model
    And ui: I click on filter button in "upper" section of model
    And ui: I uncheck all the projects
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model
    And ui: I validate the search is visible in viewpoint in the view model
    And ui: I navigate to "Grid" tab in "upper" section of model
    And ui: I click on filter button in "upper" section of model
    And ui: I search for the recently created "project" in grid tab
    And ui: I click on filter button in "upper" section of model
    And ui: I validate the search is visible in viewpoint in the view model
    And I select "Resource" from the groupby dropdown in view model
    And ui: I click on filter button in "upper" section of model
    And ui: I search for the recently created "resource" in grid tab
    And ui: I click on filter button in "upper" section of model
    And ui: I validate the search is visible in viewpoint in the view model
    And ui: Softassert all


  @testId=ST-1856
  @bugTest=TH-1074
  @8.2
  @Level-1
  Scenario: Tempus - Validate Update allocation for the Grid tab
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Select recently created CF in Priority attribute of Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    And ui: Click on recently created Tempus model in Model list page
    And ui: I navigate to "Grid" tab in "upper" section of model
    And ui: I click on filter button in "upper" section of model
    And ui: I search for the recently created "project" in grid tab
    And ui: I click on filter button in "upper" section of model
    Then ui: I validate the search is visible in viewpoint in the view model
    And ui: I expand the view in the grid tab using expand button
    And ui: I update the allocation for the recently created project or resource to "200" for "1" months
    And ui: I validate the updated allocation values and total allocation value
    And ui: I navigate to "Gantt" tab in "upper" section of model
    And ui: I navigate to "Grid" tab in "lower" section of model
    And ui: I fetch the month on which the "Project" bar is present for validation "before" moving
    And ui: I drag the "start" point of project bar to "3" months "Forward"
    And ui: I drag the "end" point of project bar to "8" months "Backward"
    And ui: I fetch the month on which the "Project" bar is present for validation "after" moving
    And ui: I validate that the bar has "Collapsed" from "end" point
    And ui: I validate that the Allocation value has been updated for dragging the "start" point of project bar to "Forward"

    And I select "Resource" from the groupby dropdown in view model
    And ui: I click on filter button in "upper" section of model
    And ui: I search for the recently created "resource" in grid tab
    And ui: I click on filter button in "upper" section of model
    And ui: I update the allocation for the recently created project or resource to "200" for "1" months
    And ui: I validate the updated allocation values and total allocation value
    Then ui: I verify client or server error warning is not displayed
    And ui: Softassert all

  @testId=ST-1706
  @Level-3
  Scenario: Level-3: Tempus - Gantt: Insert columns
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page

  @issue=TH-1067
  @8.2
  @Level-1
  @Level-2
  Scenario: Tempus - Sorting on grid header and then headcount shows incorrect aggregate
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for "3" Attributes of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"false"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    And ui: Create an Attributes using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CFs to "Required Fields" section of Attribute Layout

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Select first CF value for recently created selection CFs in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project with current year as date for allocations

    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Select Dataset as:"Allocation" in SPA if not already selected

    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CFs in All 3 Levels of Tempus model create or edit page
    And ui: Select Select All in All 3 Levels of Tempus model create or edit page

    And ui: Click on Filters button in Projects section of Tempus model create or edit page
    And ui: Enter recently CF number: "1" in search input box of Filters in Projects section of Tempus model create or edit page
    And ui: Enter and select operator as: "In" in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Value dropdown and select Select All checkbox in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Add button in Filters in Projects section of Tempus model create or edit page

    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page

    And ui: Click on recently created Tempus model in Model list page
    And ui: Click on Expand all in Resource Grid area of a Tempus model
    Then ui: Softassert if all 3 CF values are displayed in Resource Grid area of a Tempus model

    And ui: I sort the "Jan 24" column head in the lower resource grid in "Ascending" order
    And ui: I select the first CF under the Resource Grid area of tempus model
    Then ui: I validate the name of the opened CF
    Then ui: Softassert all

  @issue=TH-1057
  @8.2
  @Level-1
  Scenario: Tempus - Validate Allocation Percentage and value for Net Capacity
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Select recently created CF in Priority attribute of Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list

    And ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page

    And ui: I click on Setting button in resource grid
    And ui: I toggle On the Limited Assigned Resource option from setting in resource Grid
    And ui: I click on Setting button in resource grid
    Then ui: I validate that the resource data is not displayed due to no data being found
    And ui: Softassert all
