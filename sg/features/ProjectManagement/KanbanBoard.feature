Feature: Kanban Board

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage

  @testId=ST-1465
  @issue=SG-10075
  Scenario: SG-10075 Kanban - Deleting a Kanban board is displaying a warning that project doesn't exist
    Given ui: Quick navigate to "Project Management"
    And setup: Test Data "Kanban"
    And ui: Click on "kanban" tab in Project Management
    And ui: Create a new Kanban board with Column attribute as:"Dataset Preference" and Swimlanes as:"Allocation,Demand"
    And ui: Quick navigate to "Project Management"
    And ui: Click on "kanban" tab in Project Management
    And ui: I click on board settings and select newly created board in kanban tab
    And ui: I delete kanban board in kanban list page
    Then ui: I verify specific warning "The specified project board does not exist." is not displayed

  @testId=ST-1470
  @issue=SG-11683
  Scenario: SG-11683: Kanban - Client error when scrolling down a project view
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "Kanban"
    And ui: I create a new Resource
    And ui: I click on logo to navigate to homepage
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Project Management"
    And ui: Click on "kanban" tab in Project Management
    And ui: Create a new Kanban board with Column attribute as:"Dataset Preference" and Swimlanes as:"Allocation"
    And ui: Quick navigate to "Project Management"
    And ui: Click on "kanban" tab in Project Management
    And ui: I click on board settings and select newly created board in kanban tab
    And ui: Search for recently created project in Kanban section of PM
    And ui: Double click on recently created project in Kanban section of PM
    And ui: I click on open folder icon in custom modal container in kanban tab
    Then ui: I verify specific project name created using model is displayed
    And ui: I navigate to previous window by clicking on browser back button
    And ui: Double click on recently created project in Kanban section of PM
    And ui: I scroll forward and backward inside custom modal container in kanban tab
    Then ui: I verify client or server error warning is not displayed
    And ui: Click on Cancel button in Project Attributes of Kanban section in PM
    And ui: I delete kanban board in kanban list page
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-1493
  @issue=SG-11744
  Scenario: SG-11683: Kanban Board - Client error is displayed when deleting project from kanban custom modal container.
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "Kanban"
    And ui: I create a new Resource
    And ui: I click on logo to navigate to homepage
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Project Management"
    And ui: Click on "kanban" tab in Project Management
    And ui: Create a new Kanban board with Column attribute as:"Dataset Preference" and Swimlanes as:"Allocation"
    And ui: Quick navigate to "Project Management"
    And ui: Click on "kanban" tab in Project Management
    And ui: I click on board settings and select newly created board in kanban tab
    And ui: Search for recently created project in Kanban section of PM
    And ui: Double click on recently created project in Kanban section of PM
    And ui: Delete project in custom modal container in kanban tab
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-1496
  @issue=SG-11743
  Scenario: Kanban Board - Client error should not be displayed when same column attribute is selected in kanban grid filter
    Given setup: Test Data "Kanban"
    When ui: Click on "Project Management" tile in homepage
    And ui: Click on "kanban" tab in Project Management
    And ui: Create a new Kanban board with Column attribute as:"Dataset Preference" and Swimlanes as:"Allocation,Demand"
    And ui: I navigate to previous window
    And ui: I click on board settings and select newly created board in kanban tab
    And ui: Open filters section in PM Kanban if it isn't open already
    And ui: Click on first choose filter dropdwon on PM Kanban section
    And ui: Enter filter name as:"Dataset Preference" and select it in kanban tab
    And ui: I verify client or server error warning is not displayed

  @testId=ST-1502
  @issue=SG-11716
  Scenario: Project Management - Client error should not be displayed when switching to Kanban
    Given setup: Test Data "Project"
    And setup: Test Data setup for Attribute of type:"String" with "0" number of selection values, "0" number of default values and create default values:"true"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Enter Attribute name in Attribute create section of Attribute Management
    And ui: Select Attribute type in create section of Attribute Management
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Click on Default value text are in create section of Attribute Management
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Underline" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    And ui: Enter "2" number of words in Rich Text default value textbox of attribute creation section
    And ui: Click on Create attribute button in Attribute Management
    And ui: Search for recently created attribute in Attribute Management
    And ui: Verify recently created attribute is displayed in Attribute Management
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Quick navigate to "Project Management"
    And ui: Click on "kanban" tab in Project Management
    And ui: I verify client or server error warning is not displayed