Feature: Skill management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I login with "administrator" account
    And ui: I validate for successful login

  @testId=ST-1561
  @owner=Vivek
  Scenario: Validate skills to be selected or deselected from the BPAFG attribute column
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Skill Management" tile in Admin settings
    And ui: Create new Skill with skill type as "Range"
    And setup: Test Data "Project"
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select newly created skill in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck all attribute in insert columns dropdown in BPAFG
    And ui: I validate that the skill is "not included" in grid

  @testId=ST-1562
  @owner=Vivek
  Scenario: Validate skills not to appear in the insert column if deleted from Skill Management
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Skill Management" tile in Admin settings
    And ui: Create new Skill with skill type as "Range"
    And ui: I validate that the skill is "included" in SkillManagement
    And setup: Test Data "Project"
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Select the select all resources checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select newly created skill in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Skill Management" tile in Admin settings
    And ui: I delete the previous created skill
    And ui: I validate that the skill is "not included" in SkillManagement
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Select the select all resources checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify previous created attribute is "not included" in the insert column

  @testId=ST-1563
  @owner=Vivek
  Scenario: Validate user can apply filter to the skill column
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Skill Management" tile in Admin settings
    And ui: Create new Skill with skill type as "Range"
    And ui: I validate that the skill is "included" in SkillManagement
    And setup: Test Data "Project"
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Select the select all resources checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select newly created skill in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    # And ui: I remove filter if present any
    # And ui: I Click on Filter button of Skill column and set filter as "is set"
