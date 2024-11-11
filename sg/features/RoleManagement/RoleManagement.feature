Feature: Role Management

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  @testId=ST-1274
  Scenario: SG-10740: Scribe - add scribe permission to project role
    Given ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Global" Role and assign "Create Resource" permission to "Grant"
    And ui: I multi select permissions using shiftkey in "Global Roles" tab, first column "Manage All Access Rights", last column "Manage Fiscal Calendar", permission "Grant"
    And ui: I update a "Global" Role and assign "Access Scribe Rollup" permission to "Deny"
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with previous Role
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to Project Access
    And ui: I create a new rule add "Role" to "All Projects" at "Manager" level
    And ui: I navigate to previous window
    And ui: I navigate to "Resource" "Access"
    And ui: I create a new resource access rule add "Role" to "Resource" at "Manager" level
    And ui: I click on logo to navigate to homepage
    And ui: Logout

    And ui: I login with "resource" account
    Then ui: I verify specific tile "Scribe" "Rollup" is not displayed
    And ui: Logout

    And ui: I attempt to login with valid credentails
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I update a "Global" Role and assign "Access Scribe Rollup" permission to "Grant"
    And ui: Logout

    And ui: I login with "resource" account
    Then ui: I verify specific tile "Scribe" "Rollup" is displayed

  @testId=ST-1623
  Scenario: SG-10740: Project Role Access Scribe
    Given ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    Given ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Project" Role and assign "Access Scribe" permission to "Deny"
    And ui: I multi select permissions using shiftkey in "Project Roles" tab, first column "Edit Name", last column "Manage Lock", permission "Grant"
    And ui: I multi select permissions using shiftkey in "Project Roles" tab, first column "Access Project Attribute Values", last column "Access Sheets", permission "Edit"
    And ui: I navigate to previous window
    And ui: I navigate to Project Access
    And ui: I create a new rule add "Resource" to "All Projects" at "Role" level
    And ui: I click on logo to navigate to homepage
    And ui: Logout
    And ui: I login with "resource" account
    And ui: Search for Project in global search and click on it
    Then ui: I verify scribe option is not avaialble
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I update a "Project" Role and assign "Access Scribe" permission to "Grant"
    And ui: Search for Project in global search and click on it
    Then ui: I verify scribe option is displayed

  @issue=SG-12098
  @8.2
  Scenario: Project Role deletion
    Given setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Project Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Project" Role and assign "Access Scribe" permission to "Deny"
    And ui: I navigate to previous window
    And ui: I navigate to Project Access
    And ui: I create a new rule add "Resource" to "Project" at "Role" level
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Search for recently created project in PM Grid
    And ui: I click on meat ball icon by index "1" and select specific option "Delete" in project attributes
    And ui: I conform the delete functionality in PM Grid
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: I click on meat ball icon by index "1" and select specific option "Delete" in resource list page
    And ui: I conform the delete functionality in RM Grid
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to Project Access
    And ui: I validate that the Rule has been removed from the list
    And ui: I navigate to previous window
    And ui: I navigate to "Role" "Management"
    And ui: I delete the newly created role from "Project" tab
    And ui: I refresh the browser
    And ui: I navigate to the "Project" tab
    And ui: I validate that the role has been removed from the list
    Then ui: Softassert all

  @issue=SG-12085
  @8.2
  Scenario: Global Role deletion - link does not work
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Global" Role and assign "Create Resource" permission to "Grant"
    And ui: I navigate to previous window
    And ui: I navigate to Project Access
    And ui: I create a new rule add "Role" to "All Projects" at "Manager" level
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I delete the newly created role from "Global" tab
    And ui: I expand the Dependent entities modal and click on Project Access Redirect link
    And ui: I validate that the link for Project Access gets redirect perfectly
    Then ui: Softassert all

  @issue=SG-12277
  @owner=Devanshi
  @8.2
  Scenario: "Unsaved Changes" popup appears without any modifications on the resource sheet.
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    Given ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I navigate to the "Resource" tab
    And ui: I create a new "Resource" Role and assign "Access Sheets" permission to "Edit"
    Given ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Resource" "Access"
    And ui: I create a new resource access rule add "Role" to "Resource" at "Manager" level
    And ui: I click on logo to navigate to homepage
    Then ui: I verify client or server error warning is not displayed
    Then ui: Softassert all

  @issue=SG-12696
  @owner=Devanshi
  @9.1
  Scenario: Access Schedule Dataset - when view only schedule, checkout is available on screen
    Given ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    Given ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Project" Role and assign "Access Schedule Dataset" permission to "View"
    And ui: I navigate to previous window
    And ui: I navigate to Project Access
    And ui: I create a new rule add "Resource" to "All Projects" at "Role" level
    And ui: I click on logo to navigate to homepage
    And ui: Logout
    And ui: I login with "resource" account
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Schedule"
    Then ui: I verify Checkout Schedule button is not displayed

  @issue=SG-12662
  @owner=Devanshi
  @9.1
  Scenario: When no access to attribute values resource role permission, users can still see the values in the layout
    Given ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Resource" Role and assign "Access Attribute Values" permission to "Deny"
    And ui: I update a "Resource" Role and assign "View In Lists" permission to "Grant"
    And ui: I update a "Resource" Role and assign "View Global Role" permission to "Grant"
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Resource" "Access"
    And ui: I create a new resource access rule add "Role" to "All Resource" at "NewlyCreated" level
    And ui: Quick navigate to "Resource Management"
    And ui: Search for recently created "resource" in RM Grid and click on it
    And ui: I click on logo to navigate to homepage
    And ui: Logout
    And ui: I login with "resource" account
    And ui: Wait for 4 seconds
    And ui: Quick navigate to "Resource Management"
    And ui: Search for recently created "resource" in RM Grid and click on it
    Then ui: I verify that Attributes values are hidden
