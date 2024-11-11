Feature: Report Management - RARGrid

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-2057
  @issue=SG-12591
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Create RAR grid report for 7 working days.
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: I navigate to "Dashboard"
    And setup: Test Data "Resource List Attribute"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to "Attribute" "Management"
    And ui: Create "1" attributes in "Resource" tab of type "Selection" with default values
    And ui: I navigate to "Dashboard"
    And ui: Click on "Report Management" tile in homepage
    And ui: Click on "RAR Grid" tile in Report Management
    Then ui: I verify client or server error warning is not displayed
    And ui: I enter report name in RARchart
    And ui: I click on config page
    And ui: I select "Allocation" as Plan Type
    And ui: I select "Planned" as Allocation Type
    And ui: I select "Time" in Values
    And ui: Enter start date as "first" of the month "Jan" of current year in Grid options of Report Management
    And ui: Enter end date as "last" of the month "Dec" of current year in Grid options of Report Management
    And ui: I select created attribute in Group by list
    And ui: I select Group By "Resource"
    And ui: Remove a directory as:"ST-2057_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-2057_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-2057_Downloads" in projects's root directory
    And ui: I export the created report
    Then ui: Softassert if exported pdf file got downloaded in directory:"ST-2064_Downloads" under project's root directory with extension "pdf" for "Resource Allocation Report Grid" tab
    And ui: Remove a directory as:"ST-2057_Downloads" in projects's root directory
    