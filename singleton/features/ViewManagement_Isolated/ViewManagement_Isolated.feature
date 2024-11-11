
Feature: View Management - Isolated

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1644
  @issue=SG-10166
  Scenario: Validate Group by dropdown Must not be mandatory at BPAFG view management page
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "ON"
    And ui: I enter date range for current year
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section
    Then ui: I verify if default view icon is displayed for specific view created using model in "BPA Flatgrid" section
    And ui: I delete specific view created using model in "BPA Flatgrid" section
    Then ui: I verify if specific view created using model is not displayed in "BPA Flatgrid" section

  @testId=ST-1490
  @issue=SG-11813
  Scenario: PM - When make update in BPAFG in public view, public view disappears in PM
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And ui: I create a new Resource
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button in "BPA Flatgrid" tab
    And ui: I enter view name using model
    And ui: I toggle is default view button to "ON"
    And ui: I enter date range for current year
    And ui: I click on save button in view management
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on "Project Management" tab in view management
    And ui: I click on add new view button in "Project Management" tab
    And ui: Reenter same view name again in View Management
    And ui: I click on save button in view management
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Enter:"50" for cells of months:"Jan,Feb" of current year for recently created "project" in BPAFG Grid
    And ui: Click on Save button in BPAFG wait until it disappears
    And ui: Quick navigate to "Project Management"
    And ui: Click on view dropdown in PM Grid
    Then ui: Verify if recently created public view is displayed in PM Grid
    And ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I delete specific view created using model in "BPA Flatgrid" section
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on "Project Management" tab in view management
    And ui: I delete specific view created using model in "Project Management" section
    Then ui: Softassert all