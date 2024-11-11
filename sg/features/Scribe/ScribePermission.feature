Feature: Scribe Permission Validation E2E

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And ui: I create a new Regular Project
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Global" Role and assign "Access Scribe" permission to "Grant"
    And ui: I navigate to previous window
    # todo : notiffy FE buggy behaviour noticed on tiles
    And ui: I navigate to Project Access
    And ui: I create a new rule add "Role" to "Project" at "Manager" level
    And ui: I navigate to "Dashboard"
    And setup: Test Data "Resource"
    And ui: I navigate to "Resource" "Management"
    And ui: I create a new Resource with previous Role
    And ui: I navigate to "Dashboard"
    And ui: Logout


  @testId=ST-1624
  Scenario: Enable and Validating Scribe Permission and User Access
    Given ui: I login with "resource" account
    And ui: I navigate to "Project" "Management"
    When ui: I navigate to Project
    And ui: I varifty scribe option is avaialble for all project options and verify messaging
    And ui: Logout
    And ui: I navigate to "Dashboard"
    And ui: I login with "administrator" account
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I update a "Global" Role and assign "Access Scribe" permission to "Deny"
    And ui: Logout
    And ui: I navigate to "Dashboard"
    And ui: I login with "resource" account
    And ui: I navigate to "Project" "Management"
    Then ui: I verify scribe option is not avaialble