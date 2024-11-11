Feature: My Timesheets

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    And ui: I validate for successful login

  @testId=ST-1392
  Scenario: Timesheet End to End scenario - New Assignment Request
    Given setup: Test Data "Resource"
    When ui: Click on "Resource Management" tile in homepage
    Then ui: Create a new Timesheet Approver and Timesheet user

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
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Click on New assignment request button in My Timesheets
    And ui: Click on Add assignment button during New Assignment Request in My Timesheets
    And ui: Search recently created project and select the recently added task during New Assignment Request in My Timesheets
    And ui: Click on Apply button in Add Assignment modal in My Timesheets
    And ui: Enter "7" hours in "5" number of cells for recently created project's recent task in New assignment request section of My Timesheets
    And ui: Click on Submit button during New assignment request in My Timesheets and click on "Yes" button in confirmation modal
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Click on New assignment request button in My Timesheets
    Then ui: Verify "7" hours is entered in "5" number of cells for recently created project's recent task during New assignment request section of My Timesheets
    And ui: Click on Close button in New assignment request section of My Timesheets
    And ui: Logout

    Given ui: I login with "timesheetApprover" account
    When ui: Click on "Timesheet Management" tile in homepage
    And ui: Click on Assignment Requests tab in Timesheet Management
    And ui: Click on Timesheet of week number "1" in the month "Jan" of current year in Assignment Requests section
    And ui: Select checkbox of recently created project's recently task in Edit Assignment Request page in Timesheet Management
    And ui: Click on Approve button in edit Assignment Request page and wait for Timesheet Management title to appear
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Enter "3" hours in "5" number of cells for recently created project's recent task in By Period section of My Timesheets
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section
    And ui: Logout


    Given ui: I login with "timesheetApprover" account
    When ui: Click on "Timesheet Management" tile in homepage
    And ui: Click on Timesheet of week number "1" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    Then ui: Verify timesheet status is:"Archived" in By Period section


  @testId=ST-1403
  Scenario: Validation of Timesheet Self Service Attribute feature
    Given setup: Test Data "Resource"
    Given setup: Test Data setup for Attribute of type:"Bool" with "0" number of selection values, "0" number of default values and create default values:"false"
    And setup: Test Data "Project"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an attribute in "Project" tab with test data that was setup earlier and add to "Required Fields" section of Attribute Management

    And ui: Quick navigate to "Resource Management"
    Then ui: Create a new Timesheet Approver and Timesheet user

    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Click on Group By dropdown in SPA and select "Task"
    And ui: Add a new task in SPA when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Add recently created "resource" to build team
    And ui: Click on save button in Build Team and wait for it to be clickable

    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Change the value of recently created CF to:"Yes" in Project Attributes and save

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Timesheet Settings" tile in Admin settings
    And ui: Select recently created CF in Self service timesheet flag dropdown of Timesheet Settings
    And ui: Click on Save button in Timesheet Settings and wait for loading to complete
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Click on Add assignment button in By Period section of My Timesheets
    And ui: Search recently created project and select the recently added task in By Period section of My Timesheets
    And ui: Click on Apply button in Add Assignment modal in My Timesheets
    And ui: Enter "7" hours in "5" number of cells for recently created project's recent task in By Period section of My Timesheets
    And ui: Click on Submit button in My Timesheets and click on "Yes" button in confirmation modal
    Then ui: Verify timesheet status is:"Submitted" in By Period section
    And ui: Logout

    Given ui: I login with "timesheetApprover" account
    When ui: Click on "Timesheet Management" tile in homepage
    And ui: Click on Timesheet of week number "1" in the month "Jan" of current year in Timesheet Manager Approval section
    And ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear
    Then ui: Verify No records element is displayed in Timesheet Management
    When ui: Click on Archived tab in Timesheet Management
    Then ui: Verify Timesheet of week number "1" in the month "Jan" of current year is present in archived section
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    Then ui: Verify timesheet status is:"Archived" in By Period section

  @testId=ST-1641
  @issue=SG-9937
  @issue=SG-11675
  @issue=SG-11606
  @owner=Ram
  Scenario: SG-9937 - Allow Rich Text for Text attributes [My Timesheets]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section

    And ui: Quick navigate to "Resource Management"
    When ui: Create a new Timesheet Approver and Timesheet user

    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Timesheet Settings" tile in Admin settings
    And ui: Select recently created project CFs in Available project attributes dropdown of Timesheet Settings
    And ui: Select recently created assignment CFs in Available assignment attributes dropdown of Timesheet Settings
    And ui: Click on Save button in Timesheet Settings and wait for loading to complete
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "My Timesheets" tile in homepage
    And ui: Navigate to week number "1" in the month "Jan" of current year in My Timesheets
    And ui: Turn of all options if any in By Period section of My Timesheets

    # Project Attributes assertion
    And ui: Click on meatballs icon of recently created project and select option "Project attributes" in My Timesheets
    Then ui: Verify Rich text in Project Attributes modal of My Timesheets for recently created Project Cfs
    And ui: Close Project attributes overlay in My Timesheets
    And ui: Wait for 1 second

    # Assignment Attributes assertion
    And ui: Select Assignment attributes created earlier in My Timesheets
    Then ui: Verify Rich text in My Timesheets for recently created Assignment Cfs
    Then ui: Softassert all