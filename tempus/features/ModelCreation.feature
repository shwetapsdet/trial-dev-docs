Feature: Tempus Model Creation

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1695
  @Level-1
  Scenario: Tempus - Configuration Options - Model Access assertion [Private, Shared and Shared with data]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"false"

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
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page

    And ui: Click on Filters button in Projects section of Tempus model create or edit page
    And ui: Enter recently CF in search input box of Filters in Projects section of Tempus model create or edit page
    And ui: Enter and select operator as: "In" in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Value dropdown and select Select All checkbox in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Add button in Filters in Projects section of Tempus model create or edit page

    And ui: Click on Save button in Tempus model create or edit page

    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page

    And ui: Logout from Tempus

    Given ui: Open Tempus Login Page
    And ui: I login with "resource" account
    And ui: Wait for tempus search input box to be displayed

    #Private Assertion
    Then ui: Softassert if recently created Tempus model is not displayed in Model list page

    And ui: Logout from Tempus
    Given ui: Open Tempus Login Page
    And ui: I attempt to login with valid credentails
    And ui: Wait for tempus search input box to be displayed
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    When ui: Click on edit icon of recently created Tempus model in Model list page
    And ui: Click on "Shared" Model access button in Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page


    And ui: Logout from Tempus
    Given ui: Open Tempus Login Page
    And ui: I login with "resource" account
    And ui: Wait for tempus search input box to be displayed

    #Shared assertion
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    And ui: Click on recently created Tempus model in Model list page
    Then ui: Softassert if Gantt Chart area is displayed after opening a model

    And ui: Logout from Tempus
    Given ui: Open Tempus Login Page
    And ui: I attempt to login with valid credentails
    And ui: Wait for tempus search input box to be displayed
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list

    When ui: Click on edit icon of recently created Tempus model in Model list page
    And ui: Click on "Shared with data" Model access button in Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page

    #Shared with data assertion
    And ui: Logout from Tempus
    Given ui: Open Tempus Login Page
    And ui: I login with "resource" account
    And ui: Wait for tempus search input box to be displayed
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    And ui: Click on recently created Tempus model in Model list page

    And ui: Click ellipsis icon against recently created project in Tempus model and select option: "Clone"
    And ui: Enter project name in Clone popup of a Tempus model
    And ui: Click on "Save" button in confirmation modal in Tempus
    Then ui: Verify if cloned project is displayed in Project Gantt area of a Tempus model

    And ui: Click on Tempus logo in Tempus
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Softassert if Lock icon is displayed against recently created Tempus model in Model list page

    And ui: Logout from Tempus
    Given ui: Open Tempus Login Page
    And ui: I attempt to login with valid credentails
    And ui: Wait for tempus search input box to be displayed
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Softassert if Lock icon is displayed against recently created Tempus model in Model list page

    And ui: Logout from Tempus
    Given ui: Open Tempus Login Page
    And ui: I login with "resource" account
    And ui: Wait for tempus search input box to be displayed
    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list

    And ui: Click on Lock icon against recently created Tempus model in Model list page
    And ui: Softassert Lock icon against recently created Tempus model in Model list page disappears

    Then ui: Softassert all

  @testId=ST-1829
  @Level-1
  Scenario: Tempus - Configuration Options - Selecting all 3 aggregation levels in a tempus model
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

    Then ui: Softassert all
