Feature: Project Workflow

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1642
  @issue=SG-9937
  @issue=SG-11590
  @owner=Ram
  Scenario: SG-9937 - Allow Rich Text for Text attributes [Project Forms and Project Workflow]
    Given setup: Test Data "Project"
    And setup: Test Data for a Project Workflow with "3" number of state fields
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section

    When ui: Quick navigate to "Admin Settings"
    And ui: Click on "Workflow Management" tile in Admin settings
    # Assertion of adding Rich text CFs to Project form
    And ui: Click on "Project Forms" tab in Workflow Management
    And ui: Click on Create Form button in Project Forms tab of Workflow Management
    And ui: Enter form name in Project Form creation page
    And ui: Search and select recently created project cfs in Project Form
    And ui: Click on Add selected button in Project Form
    And ui: Click on Create Form button in Project Form creation page
    And ui: Wait for Save form button to be clickable in Project Form

    And ui: I navigate to previous window
    And ui: Click on "States" tab in Workflow Management
    And ui: Click on State type as:"Project" in States tab of Workflow Management
    And ui: Enter new State Field name in States tab of Workflow Management
    And ui: Enter new State names in States tab of Workflow Management
    And ui: Click on Create button in States tab of Workflow Management
    And ui: Wait for State to be present in States tab of Workflow Management


    And ui: Click on "Workflows" tab in Workflow Management
    And ui: Click on Create Workflow button and select Project option in Workflows tab of Workflow Management
    And ui: Enter Workflow name in Create Workflow page of Workflow Management
    And ui: Enter Workflow description in Create Workflow page of Workflow Management
    And ui: Click on workflow access to users dropdown and select All in Create Workflow page of Workflow Management
    And ui: Select recently created State in Create Workflow page of Workflow Management
    And ui: Select recently created form for all states in Create Workflow page of Workflow Management
    And ui: Click Create button in Create Workflow page of Workflow Management
    And ui: Wait for Save button in Create or edit Workflow page of Workflow Management to be clickable

    # #12 - Project Management Workflow page
    When ui: Quick navigate to "Project Management"
    When ui: Create a workflow project using recently created Project workflow
    Then ui: Verify Rich text of recently created project Cfs in workflow section of Project
    Then ui: Softassert all

  @testId=ST-2060
  @issue=SG-12483
  @9.0
  Scenario: Import new workflow user
    Given setup: Test Data "SoftAssert"
    Given setup: Test Data "Resource"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportResources" tab from the Import list

    And ui: Remove a directory as:"ST-2060_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-2060_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-2060_Downloads" in projects's root directory
    And ui: I download the demo Resource template
    And ui: Softassert if resource template file got downloaded in directory:"ST-2060_Downloads" under project's root directory

    And ui: Upload the Workflow User csv file
    And ui: I click on Synchronize button
    And ui: I validate that the sync process has been completed

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Workflow Management" tile in Admin settings
    And I navigate to Project WorkFlow User tab
    And ui: I validate that all of the users are imported in the Workflow
    And ui: I select one of the resource to edit
    And ui: I toggle "On" the "Custom Login and Password" button
    And ui: I add Username and Password to the Resource
    And ui: Logout

    And ui: I login with "resource" account
    Then ui: Verify if welcome message is displayed
    Then ui: Softassert all

  @testId=ST-2061
  @issue=SG-12483
  @9.0
  Scenario: Overwrite, merge, donot overwrite workflow user import
    Given setup: Test Data "SoftAssert"
    Given setup: Test Data "Resource"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportResources" tab from the Import list
    And ui: Upload the Workflow User csv file
    And ui: I click on Synchronize button
    And ui: I validate that the sync process has been completed

    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportResources" tab from the Import list
    And ui: Upload the Updated Workflow User csv file
    And ui: I click on Synchronize button
    And ui: I select the method "Do Not Overwrite" for the conflicts
    And ui: I validate that the sync process has been completed

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Workflow Management" tile in Admin settings
    And I navigate to Project WorkFlow User tab
    And ui: I validate that the data is as per "Do Not Overwrite" conflict process

    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportResources" tab from the Import list
    And ui: Upload the Updated Workflow User csv file
    And ui: I click on Synchronize button
    And ui: I select the method "Merge" for the conflicts
    And ui: I validate that the sync process has been completed

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Workflow Management" tile in Admin settings
    And I navigate to Project WorkFlow User tab
    And ui: I validate that the data is as per "Merge" conflict process

    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on "Data Sync" tile in Admin settings
    And ui: I Select "Excel" from the Sync list
    And ui: I select "ImportResources" tab from the Import list
    And ui: Upload the Updated Workflow User csv file
    And ui: I click on Synchronize button
    And ui: I select the method "Overwrite" for the conflicts
    And ui: I validate that the sync process has been completed

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Workflow Management" tile in Admin settings
    And I navigate to Project WorkFlow User tab
    And ui: I validate that the data is as per "Overwrite" conflict process

    Then ui: Softassert all