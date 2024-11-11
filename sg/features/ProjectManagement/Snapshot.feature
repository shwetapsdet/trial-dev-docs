Feature: Project Snapshot and Restore Feature

  Background: Login, Resource Create, Project Create
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    Given ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it


  @testId=ST-1281
  Scenario: Validate restore icon showing in Snapshot Grid
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    And ui: I validate restore icon showing in Snapshot Grid

  @testId=ST-1282
  @issue=SG-12878
  @9.1
  Scenario: Validate restore icon showing in Snapshot preview top panel
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I validate restore icon showing in Snapshot Grid
    Then ui: I click on snapshot from snapshot table
    Then ui: I verify client or server error warning is not displayed
    And ui: I validate restore icon showing on preview panel

  @testId=ST-1283
  @issue=SG-12828
  @9.1
  Scenario: Validate restore icon showing in the Snapshot preview list modal
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I verify client or server error warning is not displayed
    Then ui: I validate snapshot is created
    Then ui: I validate restore icon showing in Snapshot Grid
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on snapshot preview list
    And ui: I validate resotre icon showing on preview list

  @testId=ST-1284
  Scenario: Validate Must display timestamp on restore modal title based on the snapshot creation date
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on restore button from preview list
    And ui: I validate snapshot name and timestamp

  @testId=ST-1285
  Scenario: Validate Must select all options if the restore options toggle is enabled
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on restore button from preview list
    Then ui: I validate snapshot name and timestamp
    Then ui: I select "RestoreOptions" from restore popup
    And ui: I validate all options toggle is enabled

  @testId=ST-1290
  Scenario: Validate deselect all options if the restore options toggle is disabled.
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on restore button from preview list
    Then ui: I select "RestoreOptions" from restore popup
    And ui: I validate all options toggle is enabled
    Then ui: I select "RestoreOptions" from restore popup
    And ui: I validate all option toggle is disabled

  @testId=ST-1291
  Scenario: Validate user have to select atleast 1 option when restoring snapshot.
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on restore button from preview list
    Then ui: I Validate the popup error by restore button
    Then ui: I select "Attributes" from restore popup
    Then ui: I Validate restore button is selected properly

  @testId=ST-1292
  Scenario: Validate By default, the option must not be enabled in restore snapshot.
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on restore button from preview list
    And ui: I validate all option toggle is disabled

  @testId=ST-1293
  Scenario: Validate user have to select atleast 1 option when restoring snapshot.
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I click on restore button from preview list
    Then ui: I "select" all option from restore popup one by one and validate all option toggle
    Then ui: I "deselect" all option from restore popup one by one and validate all option toggle

  @testId=ST-1294
  Scenario: Validate By default, the option must not be enabled in restore snapshot.
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I Validate the tooltip on restore icon

  @issue=SG-13301
  Scenario: Getting error when open any saved snapshot.
    Given ui: I switch to Project Option "Snapshots"
    When ui: I create project snapshot from project option
    Then ui: I validate snapshot is created
    Then ui: I click on snapshot from snapshot table
    Then ui: I verify client or server error warning is not displayed
