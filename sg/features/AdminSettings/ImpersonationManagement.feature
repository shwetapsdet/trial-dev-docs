Feature: Impersonation management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    And ui: I validate for successful login
    
  @testId=ST-1443
  @owner=Vivek
  Scenario: Validate Impersonation to be added in the Impersonator Profile
    Given setup: Test Data "Resource"
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Impersonation Management" tile in Admin settings
    And ui: Click on Create button in Impersonation Management
    And ui: I add Impersonation for newly created resource
    And ui: I enter current year in start and End date in Impersonation management
    And ui: Click on "resourceRequestsApprove" tile in Impersonation Permissions
    And ui: Click on "timesheetsApprove" tile in Impersonation Permissions
    And ui: Click on "timesheetsSubmit" tile in Impersonation Permissions
    And ui: Click on "bulkGenerate" tile in Impersonation Permissions
    And ui: Click on Create button in Impersonation Management
    And ui: Logout
    And ui: Login with username as "Admin" and password as "Admin123!@#"
    Then ui: I validate impersonation in Administrator account

  @testId=ST-1486
  @issue=SG-11721
  Scenario: Unsaved changes modal should be displayed at first click after rejecting closing it for the first time
    Given setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Impersonation Management" tile in Admin settings
    And ui: Click on Create button in Impersonation Management
    And ui: Wait for Choose Resource dropdown in Impersonation Create or edit page to be clickable
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "Impersonation Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "Pivot Grid" tile in Report Management
    And ui: Wait for dimensions tab to be clickable in Pivot Grid section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "Pivot Grid Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "Pivot Chart" tile in Report Management
    And ui: Wait for dimensions tab to be clickable in Pivot Chart section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "Pivot Chart Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "RAR Grid" tile in Report Management
    And ui: Wait for Config tab to be clickable in RAR Grid section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "RAR Grid Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "RAR Chart" tile in Report Management
    And ui: Wait for Config tab to be clickable in RAR Chart section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "RAR Chart Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "RAR2 Chart" tile in Report Management
    And ui: Wait for Config tab to be clickable in RAR2 Chart section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "RAR2 Chart Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "Portfolio Planner" tile in Report Management
    And ui: Wait for Config tab to be clickable in Portfolio Planner section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "Portfolio Planner Create" page

    Given ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "Dashboards" tile in Report Management
    And ui: Wait for Config tab to be clickable in Dashboards section
    And ui: I click on logo
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    And ui: I navigate to previous window
    Then ui: Verify if confirmation modal is displayed in "Dashboards Create" page

    Then ui: Softassert all

  @testId=ST-1468
  @issue=SG-11617
  Scenario: SG-11617 - Getting server error when impersonator user click on timesheet approved notification.
    Given ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage
    Then ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And setup: Test Data "Project"

    # Create one TS user and 3 TA Approver and link each other
    Then ui: Create one Timesheet user and three new Timesheet Approver and link each other as Approver
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    Then ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    # Create Impersonator
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Impersonation Management" tile in Admin settings
    And ui: Click on Create button in Impersonation Management
    And ui: Add Timesheet user as Impersonator and TimesheetApprover as User to be Impersonated
    And ui: I enter current year in start and End date in Impersonation management
    And ui: Click on "timesheetsApprove" tile in Impersonation Permissions
    And ui: Click on "bulkGenerate" tile in Impersonation Permissions
    And ui: Click on Create button in Impersonation Management
    And ui: Logout

    # Submit Timesheet
    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Turn of all options if any in By Period section of My Timesheets
    And ui: Enter "8" hours in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on Show Comments link and enter comments as:"Submitted by TS" in By Period section of My Timesheets
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section

    # Set subscription for TS user:
    And ui: Click on login user header and click on Subscriptions
    And ui: Click on specific tab "Timesheet" in Subscriptions
    And ui: Set value "Yes" for Timesheet status "ApprovedOrSubmitted" in specific section "My timesheet" in Subscriptions timesheet tab
    And ui: Logout

    # Set subscription for another timesheet Approver and start Impersonator
    And ui: Login with second timesheetApprover account
    And ui: Click on login user header and click on Subscriptions
    And ui: Click on specific tab "Timesheet" in Subscriptions
    And ui: Set value "Yes" for Timesheet status "ApprovedOrSubmitted" in specific section "My timesheet" in Subscriptions timesheet tab
    And ui: Click on username and select Profile
    And ui: Start Impersonation
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Timesheet Management" tile in homepage
    And ui: Click on Timesheet of week number "1" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Enter comments as:"Approved by TA" in a pending timesheet
    And ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear
    And ui: Quit Impersonation
    And ui: Logout

    # Verify notification is not displayed for impersonator user
    And ui: I login with "resource" account
    And ui: Click on username and select Profile
    And ui: Start Impersonation
    And ui: I click on logo to navigate to homepage
    Then ui: I verify notification icon is not displayed
    And ui: Click on "Timesheet Management" tile in homepage
    Then ui: Verify No records element is displayed in Timesheet Management