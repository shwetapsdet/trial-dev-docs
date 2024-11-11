Feature: Isolated- Bulk Project Allocation Flatgrid

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login


  @testId=ST-1687
  @issue=SG-11388
  Scenario: Validate that Net Availability and Allocation% field are empty when cost calculation is set to custom field from General Settings
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "Resource List Attribute"
    And ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And ui: create and verify "Assignment" attribute using model with type "Currency" default value "50" and required "ON"
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I select calulation cost field as "custom field"
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    And ui: Wait for Save button in GS to be clickable again
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Enter default rate as "100" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And I select "Resource Name" from the groupby dropdown in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Allocation %" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the fields in "Net Availability" row are empty
    And ui: I validate that the fields in "Allocation %" row are empty
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I select calulation cost field as "default field"
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    And ui: Wait for Save button in GS to be clickable again
    Then ui: Softassert all

  @9.1.5
  @testId=ST-2183
  @testId=ST-2198
  Scenario: Add allocation value to multi assignment in BPAFG
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
   
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Multi Assignment to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Wait for 1 second

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource

    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and Multi Assignemnt toggle is "On"
    And ui: I validate that the user "cannot" add input on resoruce row when Multi Assignemnt toggle is "On"
    And ui: Verify if resource has "100" allocation value in cell number:"1" in SPA when dataset is "Allocation" and Multi Assignment is On
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on expand all icon in SPA
    And ui: I save the assignment id value
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I save project Id from the attribute page

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Id" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Click on expand icon in BPAFG grid
    And ui: I verify if the assignment id associated with project is same as the one on SPA

    And ui: I navigate to "Dashboard"
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I delete all created projects using id

    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Multi Assignment to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert all

  @9.1.5
  @issue=SG-12895
  Scenario: Check Resource Replace to multi assignment in BPAFG
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
   
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Multi Assignment to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Wait for 1 second

    And ui: Quick navigate to "Resource Management"
    And ui: I create two resource with username, password and Administrator global role

    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for two resource task in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned" when Multi assignment is On
    And ui: I validate that the user "cannot" add input on resoruce row when Multi Assignemnt toggle is "On"
    And ui: Verify if resource has "100" allocation value in cell number:"1" in SPA when dataset is "Allocation" and Multi Assignment is On
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on expand all icon in SPA
    And ui: I save the assignment id value
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I save project Id from the attribute page

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Id" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Click on expand icon in BPAFG grid
    And ui: I verify if the assignment id associated with project is same as the one on SPA

    And ui: Click on meatballs icon of recently created project and resource and select option "Resource replace advanced" in BPAFG for multiple resources
    And ui: Clear filters if any in Advanced resource replace of BPAFG
    And ui: I select the newly created "2" resource
    And ui: I click on Replace Resource with redistribute and verify resource is replaced

    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Id,Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify if the new assignment id is associated with the 2nd resource replaced with the old assignment id of 1st resource

    And ui: I navigate to "Dashboard"
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I delete all created projects using id

    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Multi Assignment to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert all