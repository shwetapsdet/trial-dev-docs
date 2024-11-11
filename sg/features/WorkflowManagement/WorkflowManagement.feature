Feature: Workflow Management

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1566
  @issue=SG-12206
  @issue=SG-12193
  @issue=SG-12389
  @issue=SG-10916
  @8.2
  Scenario: When selecting multiple selection values, and save form, no server error occurs. Also apply project workflow from attribute
    Given setup: Test Data "Project"
    Given setup: Test Data "WorkflowManagement"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    When ui: Click on "Workflow Management" tile in Admin settings
    And ui: I navigate to States tab
    And ui: I create a State
    And ui: I verify client or server error warning is not displayed
    And ui: I navigate to Project Forms tab
    And ui: I create a project form
    And ui: I verify client or server error warning is not displayed
    And ui: I navigate to Workflow tab
    And ui: I create a workflow
    Then ui: I verify client or server error warning is not displayed
    And ui: I navigate to "Project" "Management"
    And ui: I create a workflow project
    And ui: I verify client or server error warning is not displayed

    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And ui: I create a new Regular Project
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Workflow button in Project Attributes
    And ui: Enter workflow name in workflow modal in Project Attribute
    And ui: Click on Apply button of workflow modal in Project Attributes and wait for save button to be clickable
    Then ui: I validate that the "File" section is present on the attribute page
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv"
    And ui: Validate that all the files are uploaded with correct extensions in Attribute Tab
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I download file with extension "pdf" on the Attribute or My Timesheets page
    And ui: Softassert if file with extension "pdf" got downloaded in directory:"ST-1957_Downloads" under project's root directory
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I verify client or server error warning is not displayed
    And ui: I click on save button in Workflow tab

    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    And ui: I click on snapshot from snapshot table
    And ui: I verify if "Workflow" option is not avaialble in Project navigation dropdown
    And ui: Softassert all

  @testId=ST-1567
  @issue=SG-8249
  Scenario: Workflow user can be selected as value for custom field or in Global Replace
    And setup: Test Data "WorkflowUser"
    Given setup: Test Data "WorkflowManagement"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Workflow" "Management"
    And ui: I create new Workflow User
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Ungroup groups if any in RM Grid
    And ui: Clear filters if any in RM Grid
    And ui: I search for resource "Administrator" in resource list page
    And ui: I reassign task to the workflow user from any existing resource
    And ui: I validate the user is not present
    And ui: I click on cancel button
    And ui: I search for workflow user in resource list page
    And ui: I validate the user is not present

  @testId=ST-1475
  @issue=SG-11536
  Scenario: Project Workflow - Access dropdown should open on single click after closing
    Given setup: Test Data "SoftAssert"
    And setup: Test Data for a Project Workflow with "1" number of state fields
    Given setup: Test Data "WorkflowManagement"
    And ui: Click on "Admin Settings" tile in homepage
    When ui: Click on "Workflow Management" tile in Admin settings
    And ui: Click on "States" tab in Workflow Management
    And ui: Click on State type as:"Project" in States tab of Workflow Management
    And ui: Enter new State Field name in States tab of Workflow Management
    And ui: Enter new State names in States tab of Workflow Management
    And ui: Click on Create button in States tab of Workflow Management
    And ui: Wait for State to be present in States tab of Workflow Management
    And ui: Click on "Workflows" tab in Workflow Management
    And ui: Click on Create Workflow button and select Project option in Workflows tab of Workflow Management
    And ui: Press Escape Key
    And ui: Click on workflow access to users dropdown in Create Workflow page of Workflow Management
    Then ui: Verify if dropdown has been opened
    Then ui: Softassert all

  @issue=SG-12242
  @9.0
  Scenario:Workflow Projects - cannot save a form when a read-only field was previously updated by another user
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Resource"
    Given setup: Test Data "WorkflowManagement"
    And setup: Test Data for a Project Workflow with "1" number of state fields
    And ui: I navigate to "Resource" "Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    Given setup: Test Data "SoftAssert"
    And setup: Test Data for a Project Workflow with "1" number of state fields

    And ui: Click on "Admin Settings" tile in homepage
    When ui: Click on "Workflow Management" tile in Admin settings
    And ui: I navigate to States tab
    And ui: I create a State
    And ui: I navigate to Project Forms tab
    And ui: I create a project form
    And ui: I navigate to Workflow tab
    And ui: I create a workflow
    Then ui: I verify client or server error warning is not displayed
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And ui: I create a workflow project
    And ui: I verify client or server error warning is not displayed

  @issue=SG-12756
  @owner=Devanshi
  @9.1
  Scenario: PM- Server error when creating workflow project
    Given setup: Test Data "WorkflowManagement"
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    When ui: Click on "Workflow Management" tile in Admin settings
    And ui: I navigate to States tab
    And ui: I create a State
    And ui: I navigate to Project Forms tab
    And ui: I create a project form
    And ui: I navigate to Workflow tab
    And ui: I create a workflow

    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And ui: Click on "gantt" tab in Project Management
    And ui: I create a workflow project
    And ui: I verify client or server error warning is not displayed