Feature: Project Schedule

  Background: Login to the application
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @testId=ST-1492
  @issue=SG-11826
  Scenario: Project Schedule - Should be able to select Start and End dates using the date picker in the edit schedule dialog
    Given setup: Test Data "Project"
    When setup: Test Data "SoftAssert"

    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Double click on task icon in gantt area for task called as Task
    And ui: Wait for 1 second
    And ui: Click on Finish date picker icon in edit task dialog
    And ui: Select date as "last" of the month "Oct" of current year in edit task dialog of a Project Schedule using date picker
    And ui: Click on Start date picker icon in edit task dialog
    And ui: Select date as "first" of the month "Feb" of current year in edit task dialog of a Project Schedule using date picker

    And ui: Verify Start date is:"first" of the month "Feb" of current year in edit task dialog of a Project Schedule
    And ui: Verify Finish date is:"last" of the month "Oct" of current year in edit task dialog of a Project Schedule

    Then ui: Softassert all

  @testId=ST-1511
  @issue=SG-11765
  Scenario: Schedule - User should be able to change Task type in edit task popup
    Given setup: Test Data "Project"
    When setup: Test Data "SoftAssert"


    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Click on edit icon of task with ID:"1" in Project Schedule

    And ui: Click on Task Type dropdown and select value as:"Fixed Units" in edit task modal of Project Schedule
    Then ui: Softassert if Task Type is selected as:"Fixed Units" in edit task modal of Project Schedule
    And ui: Click on "Save" button in confirmation modal
    And ui: Wait for 1 second

    And ui: Click on Choose columns dropdown in Project Schedule
    And ui: Select column:"Task Type" in Choose columns dropdown in Project Schedule
    And ui: Click on Choose columns dropdown in Project Schedule

    Then ui: Softassert if column:"Task Type" of task:"Task" has value as:"Fixed Units" in Project Schedule

    And ui: Click on edit icon of task with ID:"1" in Project Schedule
    And ui: Click on Task Type dropdown and select value as:"Fixed Work" in edit task modal of Project Schedule
    Then ui: Softassert if Task Type is selected as:"Fixed Work" in edit task modal of Project Schedule
    And ui: Click on "Save" button in confirmation modal
    Then ui: Softassert if column:"Task Type" of task:"Task" has value as:"Fixed Work" in Project Schedule

    And ui: Click on edit icon of task with ID:"1" in Project Schedule
    And ui: Click on Task Type dropdown and select value as:"Fixed Duration" in edit task modal of Project Schedule
    Then ui: Softassert if Task Type is selected as:"Fixed Duration" in edit task modal of Project Schedule
    And ui: Click on "Save" button in confirmation modal
    And ui: Wait for 1 second
    Then ui: Softassert if column:"Task Type" of task:"Task" has value as:"Fixed Duration" in Project Schedule

    Then ui: Softassert all

  @issue=SG-11823
  @testId=ST-1509
  Scenario: SG-11823: Project Schedule - Newly updated task name in the edit schedule dialog doesn’t get saved
    Given setup: Test Data "Project"
    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Double click on task icon in gantt area for task called as Task
    And ui: Enter task name in schedule edit task dialog
    And ui: Click on Save and CheckIn button in schedule and wait for Checkout Schedule button
    Then ui: Verify newly created task is displayed in schedule

  @testId=ST-1513
  @issue=SG-11765
  Scenario: Schedule - Resources tab should only be displayed when a task's work is more than zero
    Given setup: Test Data "Project"
    When setup: Test Data "SoftAssert"

    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Click on edit icon of task with ID:"1" in Project Schedule
    And ui: I decrement work days to 0 in edit task dialog in Project Schedule
    And ui: Softassert if Resoruces tab is not displayed in edit task dialog in Project Schedule
    And ui: I increment work days to 1 in edit task dialog in Project Schedule
    And ui: Click on Increment Work icon in edit task dialog in Project Schedule
    And ui: Wait for 1 second
    And ui: Softassert if Resoruces tab is displayed in edit task dialog in Project Schedule

    Then ui: Softassert all

  @testId=ST-1516
  @issue=SG-11765
  Scenario: Schedule - No client error should be shown when adding adding a new resource for task of type Fixed Work
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource

    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Click on edit icon of task with ID:"1" in Project Schedule

    And ui: Click on Increment Work icon in edit task dialog in Project Schedule
    And ui: Wait for 1 second
    And ui: Click on Task Type dropdown and select value as:"Fixed Work" in edit task modal of Project Schedule
    And ui: Wait for 1 second
    And ui: Click on:"Resources" tab in edit task modal of Project Schedule

    And ui: Click on Add Assignment button in Resources tab of edit task dialog in Project Schedule
    And ui: Click on Resource dropdown number:"1" in Resources tab of edit task dialog in Project Schedule
    And ui: Search and select recently created resource in Resources tab of edit task dialog in Project Schedule
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12083
  @owner=Devanshi
  Scenario: Schedule - when no resources are assigned, resources tab is hidden in options
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource

    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Click on edit icon of task with ID:"1" in Project Schedule
    And ui: Click on Increment Work icon in edit task dialog in Project Schedule
    And ui: Wait for 1 second
    And ui: Click on Task Type dropdown and select value as:"Fixed Work" in edit task modal of Project Schedule
    And ui: Wait for 1 second
    And ui: I click on Save Button in dialog box
    Then ui: I verify client or server error warning is not displayed

  @8.2
  @issue=SG-12084
  @owner=Devanshi
  Scenario: Schedule - clicking on resource field does not always open
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource

    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Click on edit icon of task with ID:"1" in Project Schedule

    And ui: Click on Increment Work icon in edit task dialog in Project Schedule
    And ui: Wait for 1 second
    And ui: Click on Task Type dropdown and select value as:"Fixed Work" in edit task modal of Project Schedule
    And ui: Wait for 1 second
    And ui: Click on:"Resources" tab in edit task modal of Project Schedule

    And ui: Click on Add Assignment button in Resources tab of edit task dialog in Project Schedule
    And ui: Click on Resource dropdown number:"1" in Resources tab of edit task dialog in Project Schedule
    And ui: Search and select recently created resource in Resources tab of edit task dialog in Project Schedule
    And ui: Click on Choose columns dropdown in Project Schedule
    And ui: Select column:"Resources" in Choose columns dropdown in Project Schedule
    And ui: Click on Choose columns dropdown in Project Schedule
    And ui: I click on created resources in grid view and validate resource field is opened
    Then ui: I verify client or server error warning is not displayed

  @8.2
  @issue=SG-12089
  @issue=SG-12322
  Scenario: Schedule - Validate Scribe and Undo button functionality
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    Given setup: Test Data "Project"
    Given ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    And ui: Click on Scribe button to open in PM
    Then ui: Send scribe message and mention newly created resource in PM
    Then ui: I verify client or server error warning is not displayed
    And ui: Click on close Scribe button in PM
    And ui: Click on Checkout Schedule button in and wait for Revert button
    And ui: Click on add task icon in Project Schedule page
    And ui: Double click on task icon in gantt area for task called as Task
    And ui: Enter task name in schedule edit task dialog
    And ui: I click on undo button in schedule and wait for redo button to get enabled
    And ui: I validate that the undo functionality worked
