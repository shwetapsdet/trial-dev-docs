Feature: Revert

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1850
  @Level-1
  Scenario: Tempus - Validate Revert functionality for Single and all transactions
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

    # Revert for the single latest transaction
    And ui: I validate the total allocation value "before" revert
    And ui: I Click on Revert option beside Profile section
    And ui: I revert the "last" changes for the list
    And ui: I validate the total allocation value "after" revert

    # Revert for all the transaction
    And ui: I update the allocation for the recently created project or resource to "200" for "3" months
    And ui: I validate the total allocation value "before" revert
    And ui: I Click on Revert option beside Profile section
    And ui: I revert the "all" changes for the list
    And ui: I validate the total allocation value "after" revert
    And ui: Softassert all