Feature: Tempus Task bar Drag and Drop

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1840
  @testId=ST-1852
  @issue=TH-1061
  @issue=TH-1075
  @8.2
  @Level-1
  Scenario: Tempus - Validate Move/Expand/Collapse functionality of Task bar in Gantt tab
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

    #  Validate the compress of Task bar in Gantt tab
    And ui: I expand the project to show task in model view
    And ui: I fetch the month on which the "Task" bar is present for validation "before" moving
    And ui: I drag the "end" point of task bar to "8" months "Backward"
    And ui: I drag the "start" point of task bar to "2" months "Forward"
    And ui: I fetch the month on which the "Task" bar is present for validation "after" moving
    And ui: I validate that the bar has "Collapsed" from "end" point
    And ui: I validate that the Allocation value has been updated for dragging the "start" point of project bar to "Forward"

    #  Validate the expand of Task bar in Gantt tab
    And ui: I fetch the month on which the "Task" bar is present for validation "before" moving
    And ui: I drag the "end" point of task bar to "3" months "Forward"
    And ui: I fetch the month on which the "Task" bar is present for validation "after" moving
    And ui: I validate that the Allocation value has been updated for dragging the "end" point of project bar to "Forward"

    # Validate the move of Task bar in gantt tab
    And ui: I fetch the month on which the "Task" bar is present for validation "before" moving
    And ui: I move the Task bar forward to "2" months
    And ui: I fetch the month on which the "Task" bar is present for validation "after" moving

    # Validate Revert Functionality
    And ui: I Click on Revert option beside Profile section
    And ui: I revert the "last" changes for the list
    And ui: Softassert all
