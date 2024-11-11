Feature: Tempus Model Lower Tabs

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1793
  @testId=ST-1696
  @testId=ST-1844
  @Level-1
  Scenario: Tempus - Validate impact assessment view is populated with data, Priority attribute in impact assesment view
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
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model
    And ui: I expand the resource type section
    And ui: I open impact assesment view for newly created resource type
    Then ui: I validate impact assesment view is filled with data
    And ui: I validate Priority attribute in impact assesment view in the lower tab
    And ui: Softassert all

  @testId=ST-1788
  @testId=ST-1843
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
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Select recently created CF in Priority attribute of Tempus model create or edit page
    Then ui: I validate "Net Capacity" in the model creation
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list

    And ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page
    And ui: I click on filter button in "upper" section of model
    And ui: I uncheck all the projects
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model

    # # Validate Allocation Value and Percentage for Heatmap view
    And ui: I click on Setting button in resource grid
    And ui: I toggle On the Limited Assigned Resource option from setting in resource Grid
    And ui: I click on Setting button in resource grid
    And ui: I expand the resource type and open impact assesment view for newly created resource
    And ui: I validate that the allocation value and % in the impact assessment view
    And ui: Softassert all

  @testId=ST-1842
  @Level-1
  Scenario: Tempus - Validate Allocation Percentage and value for Base Capacity
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
    And ui: Select "Base Capacity" in the model creation
    Then ui: I validate "Base Capacity" in the model creation
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

    # # Validate Allocation Value and Percentage for Heatmap view
    And ui: I click on Setting button in resource grid
    And ui: I toggle On the Limited Assigned Resource option from setting in resource Grid
    And ui: I click on Setting button in resource grid
    And ui: I expand the resource type and open impact assesment view for newly created resource
    And ui: I validate that the allocation value and % in the impact assessment view
    And ui: Softassert all

  @testId=ST-1781
  @testId=ST-1793
  @testId=ST-1802
  @testId=ST-1821
  @testId=ST-1710
  @testId=ST-1866
  @Level-1
  @Level-2
  Scenario: Tempus - Validate Exclude/Include functionality for Gantt tab and lower tab views
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
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model
    And ui: I expand the resource type section

    # Exclude Project for Heatmap view
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    Then ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Heat map" view
    And ui: I include the searched project from the gantt tab

    # Exclude Project for Coldmap view
    And ui: I navigate to "Cool map" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    And ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Cool map" view
    And ui: I include the searched project from the gantt tab

    # Exclude Project for Grid view
    And ui: I navigate to "Grid" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    And ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Grid" view
    And ui: I include the searched project from the gantt tab

    # Exclude Project for Delta view
    And ui: I navigate to "Delta" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I exclude the project from the impact assesment view
    And ui: I open impact assesment view for newly created resource type
    And ui: I validate the project has been excluded from the Gantt tab
    And ui: I validate the resource allocation value has been removed for "Delta" view
    And ui: I include the searched project from the gantt tab
    And ui: Softassert all

  @testId=ST-1867
  @testId=ST-1860
  @Level-2
  Scenario: Tempus - Validate Opportunity Map functionality for Gantt tab and lower tab views
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

    # Opportunity Map from Heatmap view
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    Then ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Opportunity Map from Coldmap view
    And ui: I navigate to "Cool map" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    And ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Opportunity Map from Grid view
    And ui: I navigate to "Grid" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    And ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Opportunity Map from Delta view
    And ui: I navigate to "Delta" tab in "lower" section of model
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    And ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus

    # Opportunity Map from Gantt tab
    And ui: I open the Opportunity map for the searched project from the gantt tab
    And ui: I validate that the opportunity map is displayed
    And ui: Softassert all

  @testId=ST-1939
  @Level-2
  Scenario: Tempus - Dynamic View - Grid check all options
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
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
    And ui: Create a new Regular Project using model: "Project" with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project using model: "Project2" with current year as date for allocations
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Dataset as:"Allocation" in SPA if not already selected
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Change value of CF "Dataset Preference" of type "Selection" to "Demand" in Project Attributes
    And ui: Click on save button in Project edit and wait for it to be clickable

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Select recently created CF in Priority attribute of Tempus model create or edit page

    And ui: Click on Filters button in Projects section of Tempus model create or edit page
    And ui: Enter recently CF in search input box of Filters in Projects section of Tempus model create or edit page
    And ui: Enter and select operator as: "In" in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Value dropdown and select Select All checkbox in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Add button in Filters in Projects section of Tempus model create or edit page

    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page

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

    Then ui: Softassert all

  @issue=SG-11915
  @8.2
  @Level-1
  @Level-2
  Scenario: Tempus: screen freezed after switching to delta view from cost mode in grid
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

    And ui: I navigate to "Grid" tab in "lower" section of model
    And ui: Click on Time unit dropdown and select: "Cost" if not selected already in Resource Grid area of a Tempus model
    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    And ui: I validate that the opportunity map is displayed
    And ui: I navigate to previous page using back button in tempus
    And ui: I navigate to "Delta" tab in "lower" section of model

    And ui: I open impact assesment view for newly created resource type
    And ui: I click on Opportunity Map in the lower tabs
    And ui: I validate that the opportunity map is displayed

    Then ui: Softassert all

  @issue=TH-1082
  @8.2
  @Level-1
  @Level-2
  Scenario: Tempus - Model Details grid - updating values causes server error when grouped by resource
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
    Then ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page

    And ui: I navigate to "Grid" tab in "upper" section of model
    And I select "Resource" from the groupby dropdown in view model
    And ui: I click on filter button in "upper" section of model
    And ui: I search for the recently created "resource" in grid tab
    And ui: I click on filter button in "upper" section of model
    And ui: I validate the search is visible in viewpoint in the view model
    And ui: I expand the view in the grid tab using expand button
    And ui: I update the allocation for the recently created project or resource to "200" for "1" months
    Then ui: I verify client or server error warning is not displayed
    Then ui: Softassert all

  @issue=TH-1083
  @issue=TH-1085
  @8.2
  @Level-1
  @Level-2
  Scenario: Tempus - Model Details grid - Shift task bar in grouped project cause error
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
    Then ui: Verify if recently created Tempus model is displayed in Model list page
    And ui: Click on recently created Tempus model in Model list page
    And ui: I click on filter button in "upper" section of model
    And ui: I uncheck all the projects
    And ui: I search and select the recently created project in gantt tab
    And ui: I click on filter button in "upper" section of model

    # Move the groupBy bar and validate client error is not present
    And ui: Click on Group by dropdown in Project Gantt section of a Tempus model
    And ui: Click on option: "Dataset Preference" in Group by dropdown of Project Gantt area in Tempus model view page
    And ui: Click on Group by dropdown in Project Gantt section of a Tempus model
    And ui: I fetch the month on which the "Project" bar is present for validation "before" moving
    And ui: I move the Project bar forward to "6" months
    And ui: I fetch the month on which the "Project" bar is present for validation "after" moving
    And ui: I verify client or server error warning is not displayed

    # Move the task bar and validate client error is not present
    And ui: I expand the groupBy bar to show Project in model view
    And ui: I verify client or server error warning is not displayed
    And ui: Softassert all