Feature: Tempus Model Creation

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1883
  @Level-2
  Scenario: Automation - Tempus - Configuration - Edits are saved
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Resource"
    And setup: Test Data "Resource2"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Tempus Model"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout

    And ui: Quick navigate to "Resource Management"
    And ui: Create a new Resource with email, username, password with model: "Resource"
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: I navigate to previous window by clicking on browser back button
    And ui: Create a new Resource with email, username, password with model: "Resource2"
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: Quick navigate to "Project Management"
    When ui: Create a new Regular Project using model: "Project" with current year as date for allocations

    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Select Dataset as:"Allocation" in SPA if not already selected

    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource using model: "Resource" in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource using model: "Resource" in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: I navigate to previous window by clicking on browser back button
    When ui: Create a new Regular Project using model: "Project2" with current year as date for allocations

    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Select Dataset as:"Demand" in SPA if not already selected

    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Add recently created resource using model: "Resource2" in SPA when dataset is "Demand"
    And ui: Update "50" hours for recently added resource using model: "Resource2" in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Demand"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Switch to Tempus in same tab
    And ui: Click on Create model button on Model list page
    And ui: Enter Model name in Tempus model create or edit page
    And ui: Select Start date as "1" of the month "Jan" of current year in Tempus model create or edit page
    And ui: Select recently created CF in Level 1 of Tempus model create or edit page
    And ui: Select Select All in Level 1 of Tempus model create or edit page
    And ui: Turn "Off" Dynamic Project Inclusion toggle button in Advanced Model Settings of Tempus model create or edit page

    And ui: Click on Filters button in Projects section of Tempus model create or edit page
    And ui: Enter recently CF in search input box of Filters in Projects section of Tempus model create or edit page
    And ui: Enter and select operator as: "In" in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Value dropdown and select Select All checkbox in Filters in Projects section of Tempus model create or edit page
    And ui: Click on Add button in Filters in Projects section of Tempus model create or edit page
    And ui: Select Select All checkbox of Project list in Tempus model create or edit page

    And ui: Click on Save button in Tempus model create or edit page

    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    Then ui: Verify if recently created Tempus model is displayed in Model list page

    And ui: Click on edit icon of recently created Tempus model in Model list page
    And ui: Turn "On" Dynamic Project Inclusion toggle button in Advanced Model Settings of Tempus model create or edit page
    And ui: Click on option "Use Dataset Preference" under Dynamic Project Inclusion toggle button in Advanced Model Settings of Tempus model create or edit page
    And ui: Click on Save button in Tempus model create or edit page

    And ui: I refresh the browser
    And ui: I switch the view to "List" in modal list
    And ui: Click on recently created Tempus model in Model list page
    And ui: Click on Expand all in Resource Grid area of a Tempus model

    Then ui: SoftAssert if both resources have values as expected in Heatmap tab of Resource section in model view page
    Then ui: Softassert all
