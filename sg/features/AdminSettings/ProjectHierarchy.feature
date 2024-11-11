Feature: Hierarchy

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @issue=SG-12318
  @issue=SG-12267
  @8.2
  @9.0.0
  Scenario: Project Hierarchy - hidden and read only fields not working correctly
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Project Hierarchy" tile in Admin settings
    And ui: I create new node with adding newly created project
    And ui: I navigate to "Attributes" tab
    And ui: I click on choose column dropdown
    And ui: I select "Project Owner" if not already selected
    And ui: I update "Project Owner" attribute as "Enabled"
    And ui: I click on Save button in Project Hierarchy
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Attributes"
    And ui: I collapse "System Fields" section in Project Attributes if expanded
    And ui: I collapse "Dependency Section" section in Project Attributes if expanded
    And ui: I collapse "Required Fields" section in Project Attributes if expanded
    And ui: I expand "Optional Fields" section in Project Attribute
    And ui: I validate that "Project Owner" attribute is "Enabled"
    And ui: Click on save button in Project edit and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Project Hierarchy" tile in Admin settings
    And ui: I navigate to "Attributes" tab
    And ui: I update "Project Owner" attribute as "Read Only"
    And ui: I click on Save button in Project Hierarchy
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Attributes"
    And ui: I expand "Optional Fields" section in Project Attribute
    And ui: I collapse "System Fields" section in Project Attributes if expanded
    And ui: I collapse "Dependency Section" section in Project Attributes if expanded
    And ui: I collapse "Required Fields" section in Project Attributes if expanded
    And ui: I validate that "Project Owner" attribute is "Read Only"
    And ui: Click on save button in Project edit and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Project Hierarchy" tile in Admin settings
    And ui: I navigate to "Attributes" tab
    And ui: I update "Project Owner" attribute as "Hidden"
    And ui: I click on Save button in Project Hierarchy
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Attributes"
    And ui: I expand "Optional Fields" section in Project Attribute
    And ui: I validate that "Project Owner" attribute is "Hidden"
    Then ui: Softassert all

  @issue=SG-12394
  @owner=Devanshi
  @8.2
  Scenario: Project and Resource Hierarchy - when value is read only, should not be able to click edit icon in grid
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Resource Hierarchy" tile in Admin settings
    And ui: I create new node with adding newly created resource
    And ui: I navigate to "Attributes" tab
    And ui: I click on choose column dropdown
    And ui: I select "Resource Managers" if not already selected
    And ui: I update "Resource Managers" attribute as "Enabled"
    And ui: I click on Save button in Project Hierarchy
    And ui: I search for resource in global search and click on it
    And ui: I expand "Required Fields" section in Project Attribute
    And ui: I validate that "Resource Managers" attribute is "Enabled" for Resource Attribute
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Resource Hierarchy" tile in Admin settings
    And ui: I navigate to "Attributes" tab
    And ui: I update "Resource Managers" attribute as "Read Only"
    And ui: I click on Save button in Project Hierarchy
    And ui: I search for resource in global search and click on it
    And ui: I expand "Required Fields" section in Project Attribute
    And ui: I validate that "Resource Managers" attribute is "Read Only" for Resource Attribute
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Resource Management"
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select attributes "Resource Managers" in insert columns dropdown in BPAFG
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Resource Hierarchy" tile in Admin settings
    And ui: I navigate to "Attributes" tab
    And ui: I update "Resource Managers" attribute as "Hidden"
    And ui: I click on Save button in Project Hierarchy
    And ui: I search for resource in global search and click on it
    And ui: I expand "Required Fields" section in Project Attribute
    And ui: I validate that "Resource Managers" attribute is "Hidden" for Resource Attribute
    Then ui: Softassert all
