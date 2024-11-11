Feature: Bulk Resource Capacities

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @testId=ST-1491
  @issue=SG-11827
  Scenario: Bulk Resource Capacities: Server error is displayed when save button is clicked after selecting resource
    Given setup: Test Data "Resource"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Quick navigate to "Bulk Resource Capacities"
    And ui: Enter "Next" year start and end date in Bulk Resource Capacities
    And ui: Add newly created resource in Bulk Resource Capacities
    And ui: Click on Save button in Bulk Resource Capacities
    Then ui: I verify client or server error warning is not displayed
    And ui: Delete newly added resource in Bulk Resource Capacities
    And ui: Click on Save button in Bulk Resource Capacities
    And ui: Enter "Current" year start and end date in Bulk Resource Capacities
    And ui: Add newly created resource in Bulk Resource Capacities
    And ui: Click on Save button in Bulk Resource Capacities
    Then ui: I verify client or server error warning is not displayed
    And ui: Delete newly added resource in Bulk Resource Capacities
    And ui: Click on Save button in Bulk Resource Capacities
    And ui: Enter "Previous" year start and end date in Bulk Resource Capacities
    And ui: Add newly created resource in Bulk Resource Capacities
    And ui: Click on Save button in Bulk Resource Capacities
    Then ui: I verify client or server error warning is not displayed
    And ui: Delete newly added resource in Bulk Resource Capacities
    And ui: Click on Save button in Bulk Resource Capacities

  @issue=SG-13129
  @9.1
  Scenario: Bulk Capacities - when put 1 FTE at monthly level, adds more hours with auto calculate option on
    Given setup: Test Data "SoftAssert"
    Given ui: I click on logo to navigate to homepage
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Auto Calculate Capacity "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I verify client or server error warning is not displayed
    Then ui: I validate toggle Auto Calculate Capacity is "On" in General settings global tab
    When setup: Test Data "Resource"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Quick navigate to "Bulk Resource Capacities"
    And ui: Enter Start date as "01/04/2024" and End date as "30/04/2024" in SPA
    And ui: Click on Clear button in Bulk Resource Capacities
    And ui: Click on "Yes" button in confirmation modal if displayed
    And ui: Add newly created resource in Bulk Resource Capacities

    And ui: Click on unit "FTE" in Bulk Resource Capacities
    And ui: I toggle Auto Calculate Capacity for "Time" as "On" in Bulk Resource Capacities
    And ui: Enter "0" capacity for resource for month or date as "Apr 24" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "0" in Bulk Resource Capacities

    And ui: Click on unit "Time" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "0" in Bulk Resource Capacities

    And ui: Click on unit "FTE" in Bulk Resource Capacities
    And ui: Enter "1" capacity for resource for month or date as "Apr 24" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "1" in Bulk Resource Capacities

    And ui: Click on unit "Time" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "176" in Bulk Resource Capacities
    Then ui: Softassert all