Feature: Sheets Management

  Background: Login to the application
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-2000
  @issue=SG-12347
  @issue=SG-12063
  @8.2
  Scenario: Import Sheet from Data Sync
    Given setup: Test Data "SoftAssert"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create new template for import sheet
    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Click on Create Project button in PM grid and select Regular Project if required
    And ui: Enter Project named as "AutomationSheetImport" in project creation page
    And ui: Click on Create button in project creation page
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Data Sync" tile in Admin settings
    When ui: I import sheet from sync
    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I navigate to imported project in the PM Grid
    And ui: I switch to Project Option "Sheets"
    And ui: Click on the edit in list view button
    And ui: Click on the sheet list dropdown
    Then ui: I search and validate that the "Imported Template" sheet names are "present"
    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I delete the imported project in the PM Grid if present
    And ui: Softassert all