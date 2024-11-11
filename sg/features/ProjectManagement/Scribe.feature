Feature: Scribe

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
        
  @testId=ST-1506
  @issue=SG-11702
  Scenario: SG-11702: Scribe - client side error occur when using mention via keyboard
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And ui: I create a new Resource with email, username, password
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Scribe button to open in PM
    Then ui: Send scribe message and mention newly created resource in PM
    Then ui: I verify client or server error warning is not displayed
    And ui: Click on close Scribe button in PM
    And ui: Logout
    And ui: I login with "resource" account
    Then ui: Verify new notification red icon is displayed
    And ui: Click on notification icon in Header
    Then ui: Verify newly created project with specific section "Allocations" notification is displayed