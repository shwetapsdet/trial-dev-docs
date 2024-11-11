Feature: Milestones

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @testId=ST-1507
  @issue=SG-11695
  Scenario: SG-11695 - Unsaved changes modal should be displayed on second click on logo in Milestones and SPA
    Given setup: Test Data "Project"
    And setup: Test Data "Milestone"
    And setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
   
    And ui: I click on logo
    And ui: Softassert if "No. Don't leave this page" button is displayed in confirmation modal and add assertion error message as:"Unsaved changes modal was not displayed on 1st click to logo in SPA of a checked out project"
    And ui: Click on "No. Don't leave this page" button in confirmation modal if displayed

    And ui: I click on logo
    And ui: Softassert if "No. Don't leave this page" button is displayed in confirmation modal and add assertion error message as:"Unsaved changes modal was not displayed on 2nd click to logo in SPA of a checked out project"
    And ui: Click on "No. Don't leave this page" button in confirmation modal if displayed
    And ui: Click on Release button if displayed in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Milestones"
    And ui: Add Milestone by entered name, description and current year start date

    And ui: I click on logo
    And ui: Softassert if "No. Don't leave this page" button is displayed in confirmation modal and add assertion error message as:"Unsaved changes modal was not displayed on 1st click to logo in Project Milestones when there were unsaved changes"
    And ui: Click on "No. Don't leave this page" button in confirmation modal if displayed

    And ui: I click on logo
    And ui: Softassert if "No. Don't leave this page" button is displayed in confirmation modal and add assertion error message as:"Unsaved changes modal was not displayed on 2nd click to logo in Project Milestones when there were unsaved changes"
    And ui: Click on "No. Don't leave this page" button in confirmation modal if displayed

    Then ui: Softassert all

