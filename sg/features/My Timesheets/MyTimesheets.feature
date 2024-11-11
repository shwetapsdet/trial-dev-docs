Feature: My Timesheets

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1388
  @testId=ST-1389
  @testId=ST-1390
  @testId=ST-1391
  Scenario: Timesheet End to End scenario
    Given setup: Test Data "Resource"
    When ui: Click on "Resource Management" tile in homepage
    Then ui: Create a new Timesheet Approver and Timesheet user
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource manager with username, password, global role
    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    Then ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Assign resource manager as Project Owner
    And ui: Click on save button in Project edit and wait for it to be clickable
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Turn of all options if any in By Period section of My Timesheets
    And ui: Enter "8" hours in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on Show Comments link and enter comments as:"Submitted by TS" in By Period section of My Timesheets
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section
    And ui: Click on next period icon in My Timesheets
    And ui: Wait for 4 seconds
    And ui: Enter "8" hours in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on Show Comments link and enter comments as:"Submitted by TS" in By Period section of My Timesheets
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section
    And ui: Click on next period icon in My Timesheets
    And ui: Wait for 4 seconds
    And ui: Enter "8" hours in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on Show Comments link and enter comments as:"Submitted by TS" in By Period section of My Timesheets
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section
    And ui: Logout

    And ui: I login with "timesheetApprover" account
    And ui: Click on "Timesheet Management" tile in homepage
    And ui: Click on Timesheet of week number "1" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Enter comments as:"Approved by TA" in a pending timesheet
    And ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear
    And ui: Click on Timesheet of week number "2" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Enter comments as:"Rejected by TA" in a pending timesheet
    And ui: Click on Reject button and wait for Timesheet Management title to appear
    And ui: Click on Timesheet of week number "3" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Enter comments as:"Approved by TA" in a pending timesheet
    And ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear
    Then ui: Verify No records element is displayed in Timesheet Management
    And ui: Logout

    And ui: I login with "resourceManager" account
    And ui: Click on "Timesheet Management" tile in homepage
    And ui: Click on Timesheet of week number "1" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Enter comments as:"Approved by PO" in a pending timesheet
    And ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear
    And ui: Click on Timesheet of week number "3" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Enter comments as:"Rejected by PO" in a pending timesheet
    And ui: Click on Reject button and wait for Timesheet Management title to appear
    Then ui: Verify No records element is displayed in Timesheet Management
    And ui: Click on Archived tab in Timesheet Management
    Then ui: Verify Timesheet of week number "1" in the month "Jan" of current year is present in archived section
    Then ui: Verify Timesheet of week number "3" in the month "Jan" of current year is present in archived section
    And ui: Logout


    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    Then ui: Verify timesheet status is:"Archived" in By Period section
    And ui: Click on Show Comments link in My Timesheets
    Then ui: Verify comments:"Submitted by TS" have been added by "timesheetUser" in By Period section of My Timesheets
    Then ui: Verify comments:"Approved by TA" have been added by "timesheetApprover" in By Period section of My Timesheets
    Then ui: Verify comments:"Approved by PO" have been added by "projectOwner" in By Period section of My Timesheets

    And ui: Click on next period icon in My Timesheets
    And ui: Wait for Timesheet Period of week number:"2" in the month of:"Jan" of current year to appear in My Timesheets
    And ui: Click on Show Comments link in My Timesheets
    Then ui: Verify timesheet status is:"Rejected" in By Period section
    Then ui: Verify comments:"Submitted by TS" have been added by "timesheetUser" in By Period section of My Timesheets
    Then ui: Verify comments:"Rejected by TA" have been added by "timesheetApprover" in By Period section of My Timesheets

    And ui: Enter "4" hours in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on Save Draft button in My Timesheets
    Then ui: Verify timesheet status is:"Draft" in By Period section
    And ui: I navigate to previous window
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "2" in the month "Jan" of current year in My Timesheets
    Then ui: Verify "4" hours is entered in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on next period icon in My Timesheets
    And ui: Click on Show Comments link in My Timesheets
    Then ui: Verify comments:"Submitted by TS" have been added by "timesheetUser" in By Period section of My Timesheets
    Then ui: Verify comments:"Approved by TA" have been added by "timesheetApprover" in By Period section of My Timesheets
    Then ui: Verify comments:"Rejected by PO" have been added by "projectOwner" in By Period section of My Timesheets

    And ui: Click on next period icon in My Timesheets
    And ui: Wait for Timesheet Period of week number:"4" in the month of:"Jan" of current year to appear in My Timesheets
    And ui: Enter "8" hours in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets
    And ui: Click on Save Draft button in My Timesheets
    Then ui: Verify timesheet status is:"Draft" in By Period section
    And ui: Click on Delete button in By Period of My Timesheets
    And ui: Click on "Yes" button in confirmation modal
    And ui: Verify timesheet status is:"New" in By Period section
    Then ui: Verify "-" hours is entered in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets

    And ui: I navigate to previous window
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "4" in the month "Jan" of current year in My Timesheets
    Then ui: Verify "-" hours is entered in "5" number of cells for recently created project's Generic task in By Period section of My Timesheets

  @testId=ST-1487
  @issue=SG-12385
  @issue=SG-11674
  @owner=Devanshi
  @8.2
  Scenario: My Timesheets - Validate notes modal is not showing the text "Confirm delete" message
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    When ui: Click on "Resource Management" tile in homepage
    And ui: Create a new Timesheet Approver and Timesheet user
    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: I click on dot button to select "Notes" option
    Then ui: I validate that the Confirm Delete message has been removed
    And ui: I click on Save button before submitting the timesheet
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12429
  @owner=Devanshi
  @8.2
  Scenario: My Timesheet : Unable to see project preview getting error.
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage
    When ui: Click on "Resource Management" tile in homepage
    And ui: Create a new Timesheet Approver and Timesheet user
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: I click on dot button to select "Project preview" option
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12702
  @issue=SG-13034
  @9.1
  Scenario: Timesheet - Attach document
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    When ui: Click on "Resource Management" tile in homepage
    And ui: Create a new Timesheet Approver and Timesheet user

    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Group By dropdown in SPA and select "Task"
    And ui: Add a new task in SPA when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Add recently created "resource" to build team
    And ui: Click on save button in Build Team and wait for it to be clickable

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Timesheet Settings" tile in Admin settings
    And ui: Select recently created project in Allow assignment requests for projects dropdown of Timesheet Settings
    And ui: Click on Save button in Timesheet Settings and wait for loading to complete
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Click on files button in My Timesheets
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    And ui: Validate that all the files are uploaded with correct extensions in My Timesheets Tab

    And ui: Upload file with extensions "js"
    And ui: Validate that file with extension "js" is not uploaded and error message is found on My Timesheets page

    And ui: Remove a directory as:"SG-12702_Downloads" in projects's root directory
    And ui: Create a new directory as:"SG-12702_Downloads" in projects's root directory
    And ui: Set downloads directory as:"SG-12702_Downloads" in projects's root directory
    And ui: I download file with extension "pdf" on the Attribute or My Timesheets page
    And ui: Softassert if file with extension "pdf" got downloaded in directory:"SG-12702_Downloads" under project's root directory
    And ui: Remove a directory as:"SG-12702_Downloads" in projects's root directory
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    And ui: Verify timesheet status is:"Submitted" in By Period section
    And ui: Click on files button in My Timesheets
    And ui: Validate that all the files are uploaded with correct extensions in My Timesheets Tab
    And ui: Logout

    And ui: I login with "timesheetApprover" account
    And ui: Click on "Timesheet Management" tile in homepage
    And ui: Open the newly added Timesheet from the available timesheets in the Timesheet Manager Approval section
    And ui: Click on files button in My Timesheets
    And ui: Validate that all the files are uploaded with correct extensions in My Timesheets Tab
    Then ui: Softassert all
