Feature: Singleton - Attribute Management

  Background: Login to site with valid credentails
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @issue=SG-12656
  @9.1
  Scenario: Required attribute with no Default values for Project/Resource
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: create and verify "Project, Resource" attribute using model with type "Bool" default value as Null and required "ON"
    And ui: I add recently created CFs to "Required Fields" section of Attribute Layout for "Resource"
    And ui: I click on save button in attribute layout tab

    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Click on Create Project button in PM grid and select Regular Project if required
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I validate that the recently created "Project" CF has default value as "Null"
    And ui: I click on logo
    And ui: Click on "Yes" button in confirmation modal

    And ui: Click on "Resource Management" tile in homepage
    And ui: I click on Create Resource Button
    And ui: I validate that the recently created "Resource" CF has default value as "Null"

    # Reset the Attribute layout
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to Attribute Layout tab
    And ui: I remove the newly added CFs from the "Project" layout
    And ui: I remove the newly added CFs from the "Resource" layout
    And ui: I click on save button in attribute layout tab
    Then ui: Softassert all

  @issue=SG-12656
  @9.1
  Scenario: Required attribute with no Default values for Assignment
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: create and verify "Assignment" attribute using model with type "Bool" default value as Null and required "ON"
    And ui: I add recently created CFs to "Required Fields" section of Attribute Layout for "Assignment"
    And ui: I click on save button in attribute layout tab

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Unselect all and Select recently created assignment attributes in SPA
    And ui: I validate that the recently created "Assignment" CF has default value as "Null"

    # Reset the Attribute layout
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to Attribute Layout tab
    And ui: I remove the newly added CFs from the "Assignment" layout
    And ui: I click on save button in attribute layout tab
    Then ui: Softassert all

  @issue=SG-12656
  @9.1
  Scenario: Validate Required attribute with no Default values for all type of attributes
    Given ui: Click on "Admin Settings" tile in homepage
    When ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create all types of attributes in "Project" tab without defaults and required status On
    Then ui: I verify if the list of attributes are created or not