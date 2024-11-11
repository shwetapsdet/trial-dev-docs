Feature: Core - Tempus Model

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @core
  Scenario: Tempus - Validate Exclude/Include functionality, Opportunity Map for Gantt tab and lower tab views
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

    # Create Tempus modal
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
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model
    And ui: I expand the resource type section

    # Exclude Project and Opportinuty Map for Heatmap view
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    Then ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Heat map" view
    And ui: I include the searched project from the gantt tab
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    Then ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Exclude Project and Opportinuty Map for Coldmap view
    And ui: I navigate to "Cool map" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    And ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Cool map" view
    And ui: I include the searched project from the gantt tab
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    Then ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Exclude Project and Opportinuty Map for Grid view
    And ui: I navigate to "Grid" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    And ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Grid" view
    And ui: I include the searched project from the gantt tab
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    Then ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Exclude Project and Opportinuty Map for Delta view
    And ui: I navigate to "Delta" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    And ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Delta" view
    And ui: I include the searched project from the gantt tab
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    Then ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    And ui: Click on option: "grid" in Group by dropdown of Project Grid area in Tempus model view page
    And ui: Wait for 4 seconds
    Then ui: Softassert if Entity created using model: "Project" is displayed at level: "1" in Project Grid area in Tempus model view page
    And ui: Click on Entity created using model: "Project" in Project Grid area in Tempus model view page
    And ui: Wait for 4 seconds
    Then ui: Softassert if Entity created using model: "Resource" is displayed at level: "2" in Project Grid area in Tempus model view page

    And ui: Click on Group by dropdown in Project Grid section of a Tempus model
    And ui: Click on option: "Resource" in Group by dropdown of Project Grid area in Tempus model view page
    And ui: Click on Group by dropdown in Project Grid section of a Tempus model
    And ui: Wait for 4 seconds

    Then ui: Softassert if Entity created using model: "Resource" is displayed at level: "1" in Project Grid area in Tempus model view page
    And ui: Click on Entity created using model: "Resource" in Project Grid area in Tempus model view page
    And ui: Wait for 4 seconds
    Then ui: Softassert if Entity created using model: "Project" is displayed at level: "2" in Project Grid area in Tempus model view page


    And ui: Click on Group by dropdown in Project Grid section of a Tempus model
    And ui: Click on option: "Project" in Group by dropdown of Project Grid area in Tempus model view page
    And ui: Click on Group by dropdown in Project Grid section of a Tempus model

    And ui: Click on Insert columns dropdown in Project Grid section of a Tempus model
    And ui: Search and select CF: "Dataset Preference" in Insert Columns of Project Grid area in Tempus model view page
    And ui: Click on Insert columns dropdown in Project Grid section of a Tempus model

    Then ui: Softassert if CF: "Dataset Preference" is "displayed" in Project Grid area in Tempus model view page

    And ui: Click on Eye icon in Project section of a Tempus model
    And ui: Wait for 4 seconds
    Then ui: Softassert if CF: "Dataset Preference" is "not displayed" in Project Grid area in Tempus model view page

    And ui: Softassert all

  @core
  Scenario: Validate Budget view and Grid view in the lower view for Financial Tab in the model view
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Financial" "Categories"
    And ui: I click on create new financial category
    And ui: I enter a name for Financial Category with "Positive" and type as "Default"
    And ui: I click on Save button in the financial category create model
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Budget" "Management"
    And ui: I click on create Budget button
    And ui: Enter start date as "Jan" of current year
    And ui: Enter end date as "Dec" of current year
    And ui: I create a budget with using created attribute as project custom field
    And ui: I update the budget allocation value to "500" for months:"Jan,Mar,May" of current year
    And ui: Click on Save Changes button in Budget
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "100" in Resource Attributes and Identity
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: I select recently created financial category
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Project Management"
    And ui: Create 2nd new Regular Project with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Include labor costs toggle
    And ui: I select recently created financial category
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Select Financial Category from the latest created one
    And ui: Select Budget from the latest created one
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page
    And ui: I navigate to "Financials" tab in "upper" section of model
    And ui: I validate Financial catagory data in the financial tab for any month

    # Validate Budget tab in the lower grid
    And ui: I navigate to "Budget" tab in "lower" section of model
    And ui: I validate Budget data in the lower tab for any month

    # Valdiate all option of Budget tab in the lower grid
    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Total" option as "On" from the setting options from the "budget" tab in lower grid section
    And ui: I click on Setting button in lower grid
    And ui: I validate "Show Total" option in the "budget" tab in lower grid section to show effect

    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Total" option as "Off" from the setting options from the "budget" tab in lower grid section
    And ui: I toggle "Show Heatmap" option as "On" from the setting options from the "budget" tab in lower grid section
    And ui: I click on Setting button in lower grid
    And ui: I validate "Show Heatmap" option in the "budget" tab in lower grid section to show effect

    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Heatmap" option as "Off" from the setting options from the "budget" tab in lower grid section
    And ui: I toggle "Show Labor Costs" option as "On" from the setting options from the "budget" tab in lower grid section
    And ui: I click on Setting button in lower grid
    And ui: I validate "Show Labor Costs" option in the "budget" tab in lower grid section to show effect
    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Labor Costs" option as "Off" from the setting options from the "budget" tab in lower grid section

    # Validate export excel button of Budget tab in the lower grid
    And ui: Remove a directory as:"ST-1863_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1863_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1863_Downloads" in projects's root directory
    And ui: Click on export icon in the lower grid section and select extension as "excel"
    And ui: Softassert if exported file got downloaded in directory:"ST-1863_Downloads" under project's root directory with extension "xlsx" for "budget" tab
    And ui: Remove a directory as:"ST-1863_Downloads" in projects's root directory

    # Validate Grid tab in the lower grid for Financial tab
    And ui: I navigate to "Grid" tab in "lower" section of model
    And ui: I validate Grid data in the lower tab for financial tab for any month

    # Valdiate all option of Grid tab in the lower grid for Financial tab
    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Total" option as "On" from the setting options from the "Financial lower Grid" tab in lower grid section
    And ui: I click on Setting button in lower grid
    And ui: I validate "Show Total" option in the "Financial lower Grid" tab in lower grid section to show effect

    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Total" option as "Off" from the setting options from the "Financial lower Grid" tab in lower grid section
    And ui: I toggle "Show Total Column" option as "On" from the setting options from the "Financial lower Grid" tab in lower grid section
    And ui: I click on Setting button in lower grid
    And ui: I validate "Show Total Column" option in the "Financial lower Grid" tab in lower grid section to show effect

    And ui: I click on Setting button in lower grid
    And ui: I toggle "Show Total Column" option as "Off" from the setting options from the "Financial lower Grid" tab in lower grid section
    And ui: I toggle "Show Labor Costs" option as "On" from the setting options from the "Financial lower Grid" tab in lower grid section
    And ui: I click on Setting button in lower grid
    And ui: I validate "Show Labor Costs" option in the "Financial lower Grid" tab in lower grid section to show effect

    # Validate Search functionality
    And ui: I search for the "project" in the financial lower tab
    And ui: I validate the search is visible in viewpoint in the view model

    # Validate Group by option
    And ui: I click on groupby dropdown in lower tab view in tempus model view
    And ui: I uncheck and select attributes "Dataset Preference" in groupby dropdown in lower tab view in tempus model view
    And ui: I click on groupby dropdown in lower tab view in tempus model view
    And ui: I expand the project view in the financial lower grid tab using expand button
    And ui: I validate that the Grid gets rearranged as per "Dataset Preference" groupby dropdown

    # Validate Granularity options (Month, Quarter, Year)
    And ui: Click on Timeframe dropdown and select: "Month" if not selected already in Financial's Grid tab of a Tempus model
    And ui: I validate if the Timeframe dropdown is selected as "Month" and the grid values have been updated
    And ui: Click on Timeframe dropdown and select: "Quarter" if not selected already in Financial's Grid tab of a Tempus model
    And ui: I validate if the Timeframe dropdown is selected as "Quarter" and the grid values have been updated
    And ui: Click on Timeframe dropdown and select: "Year" if not selected already in Financial's Grid tab of a Tempus model
    And ui: I validate if the Timeframe dropdown is selected as "Year" and the grid values have been updated

    # Validate export excel button of Budget tab in the lower grid
    And ui: Remove a directory as:"ST-1862_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1862_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1862_Downloads" in projects's root directory
    And ui: Click on export icon in the lower grid section and select extension as "excel"
    And ui: Softassert if exported file got downloaded in directory:"ST-1862_Downloads" under project's root directory with extension "xlsx" for "financials" tab
    And ui: Remove a directory as:"ST-1862_Downloads" in projects's root directory

    And ui: Softassert all
