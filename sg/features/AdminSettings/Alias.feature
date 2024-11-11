Feature: Alias

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @testId=ST-2085
  @9.0.1
  Scenario: File Management Alias
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Alias" tab in General Settings
    And ui: I validate that File Management Alias tab is displayed
    And ui: I update the Alias of File Management to ""
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I validate that the warning message is displayed
    And ui: I update the Alias of File Management to "Files"
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Files"
    And ui: Click on Scribe button to open in PM
    And ui: Send scribe message and mention newly created resource in PM
    Then ui: I validate that Alias of File Management is updated to "Files" in "Scribe Modal"
    And ui: I click on Filter button in scribe modal
    Then ui: I validate that Alias of File Management is updated to "Files" in "Filter under scribe modal"
    And ui: Click on close Scribe button in PM
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: Click on Import from Template button
    Then ui: I validate that Alias of File Management is updated to "Files" in "Import from Template modal"
    And ui: Wait for 4 seconds
    And ui: Press Escape Key

    And ui: Quick navigate to "Project Management"
    And ui: Click on Create Project button in PM grid and select created Template if required
    Then ui: I validate that Alias of File Management is updated to "Files" in "Create Project from template modal"
    And ui: Wait for 4 seconds
    And ui: Press Escape Key

    And ui: Logout

    And ui: I login with "resource" account
    And ui: Click on "Scribe Rollup" tile in homepage
    And ui: I validate that Alias of File Management is updated to "Files" in "Scribe Rollup"
    And ui: I click on Filter button in scribe rollup
    And ui: I select "Filter by section" in the filter
    And ui: I validate that Alias of File Management is updated to "Files" in "Filter by section under scribe rollup"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Alias" tab in General Settings
    And ui: I validate that File Management Alias tab is displayed
    And ui: I update the Alias of File Management to "File Management"
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert all