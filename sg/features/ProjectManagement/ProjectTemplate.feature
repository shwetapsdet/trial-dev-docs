Feature: Project Template
  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it

  @testId=ST-1318
  @owner=Ram
  Scenario: #1 Ensure that Create Template button is visible only with those with permission "Create Template"
    When ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: Verify if Create Template button is clickable in Project Attributes
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Global" Role and assign "Create Template" permission to "Deny"
    And ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And ui: I create a new Resource with previous Role
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Project" Role and assign "Access Project Attribute Values" permission to "Edit"
    And ui: I navigate to previous window
    And ui: I navigate to Project Access
    And ui: Create a rule for recently created resource, project and "global" role
    And ui: Logout
    And ui: I login with "resource" account
    And ui: Search for Project in global search and click on it
    When ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: Verify if Create Template button is not displayed in Project Attributes
    And ui: Logout

  @testId=ST-1320
  @owner=Ram
  Scenario: #2 Ensure creation of template from Project Attributes
    When ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: Click on Import from Template button
    When ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search for template in Choose Template dropdown of Import from Template modal
    Then ui: Verify if template is present in Choose Template dropdown of Import from Template modal
    # And ui: Logout

  @testId=ST-1316
  @testId=ST-1321
  @owner=Ram
  Scenario: #6, #4 Ensure user can import template created template and also verify that attributes and allocation screens are correct after importing template
    Given ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Select date mode as: "Month" in SPA if not already selected
    And ui: Click on Options button in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Close Options section in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: Change value of CF "Dataset Preference" of type "Selection" to "Demand" in Project Attributes
    And ui: Click on save button in Project edit and wait for it to be clickable

    And ui: Click on Project navigation dropdown and select "Allocations"
    And ui: Click on dataset dropdown and select "Allocation" in SPA
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Update hours to "50" for resource in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Click on Save and Check In button in SPA and wait for Checkout button

    When ui: Click on Import from Template button
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search and select template in Import from Template modal
    And ui: Toggle "On" "Attributes" restore option in Import from Template modal
    And ui: Toggle "On" "Planned Allocation" restore option in Import from Template modal
    When ui: Click on Apply button in Import from Template modal
    And ui: Click on "Apply" button in confirmation modal
    And ui: Click on dataset dropdown and select "Allocation" in SPA
    Then ui: Verify if resource has "100" hours for every month of current year in SPA when dataset is "Allocation"
    And ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: Softassert all
    # And ui: Logout

  @testId=ST-1322
  @owner=Ram
  Scenario: #3 when a user has access to project role, apply template, the user can see the import from template option within a project (This is just checking Permission denial as "Grant" is already checked in ST-1316)
    And ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And ui: I create a new Resource and assign role "No Global Role"

    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I create a new "Project" Role and assign "Access Project Attribute Values" permission to "Edit"
    And ui: I update a "Project" Role and assign "Apply Template" permission to "Deny"

    And ui: I navigate to previous window
    And ui: I navigate to Project Access
    And ui: Create a rule for recently created resource, project and "global" role
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Attributes"
    # And ui: Verify if Import from Template button is not displayed in Project Attributes   // commented due to a bug
    And ui: Logout

  @testId=ST-11182
  Scenario: When applying a template more than once to the same project, no server error occurs
    When ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: Click on Import from Template button
    And ui: Toggle "On" "Select all" restore option in Import from Template modal
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search and select template in Import from Template modal
    When ui: Click on Apply button in Import from Template modal
    And ui: Click on "Apply" button in confirmation modal
    And ui: Click on Import from Template button
    And ui: Toggle "On" "Select all" restore option in Import from Template modal
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search and select template in Import from Template modal
    When ui: Click on Apply button in Import from Template modal
    And ui: Click on "Apply" button in confirmation modal
    Then ui: I validate no server error is present

  @testId=ST-1593
  @issue=SG-11049
  Scenario: Ensure Templates are not visible on BPA/BPAFG, PM(Kanban/Gantt), Net Avalibility Grid, RoadMap Management
    And ui: I switch to Project Option "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable

    And ui: Quick navigate to "Project Management"
    # Rinkesh : commented due to kanban board issue
    # And ui: I select "kanban" view in PM
    # And ui: I validate that the template is not present
    And ui: I select "gantt" view in PM
    And ui: I validate that the template is not present

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Enter Start date as "01.01.2023" and End date as "01.06.2023" in BPAFG
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Search for template in entity selection section in BPAFG
    And ui: I validate that template is not present
    And ui: Close entity selection section in BPAFG

    And ui: Quick navigate to "Resource Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I validate that the template is not present

    And ui: Quick navigate to "Roadmap Management"
    And ui: I navigate to the roadmap creation page
    And ui: Enter current year as date for the project in Roadmap Management
    And ui: I validate that template is not present

    And ui: Quick navigate to "Resource Management"
    And ui: Click on "Yes" button in confirmation modal
    And setup: Test Data "Resource"
    And ui: I create a new Resource and assign role "Administrator"
    And ui: Logout

    And ui: I attempt to login with previous resource credentails
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter another template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: I switch to Project Option "Allocations"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Add new resource to the SPA
    Then ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout

    And ui: I login with "administrator" account
    And ui: I validate for successful login
    And ui: Click on "Resource Management" tile in homepage
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I validate that template is not present

  @testId=ST-1279
  Scenario: PM Quick search for project template deselect other options
    When ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I click on filter order in  project management grid
    And ui: I uncheck filter orders "Regular,Workflow,Template" in project management grid
    And ui: I close filter order overlay in project management grid
    And ui: I search for project template created using model in project list page
    Then ui: I verify project template is not displayed in project management grid
    And ui: I click on filter order in  project management grid
    And ui: I select filter orders "Template" in project management grid
    And ui: I close filter order overlay in project management grid
    And ui: I search for project template created using model in project list page
    Then ui: I verify project template is displayed in project management grid
    And ui: Search for recently created project in PM Grid
    Then ui: I verify project created using model is not displayed in project management grid
    And ui: I click on filter order in  project management grid
    And ui: I select filter orders "Regular" in project management grid
    And ui: I close filter order overlay in project management grid
    And ui: I search for project template created using model in project list page
    Then ui: I verify project template is not displayed in project management grid
    And ui: Search for recently created project in PM Grid
    Then ui: Verify if recently created project is displayed in PM Grid
    And ui: I click on filter order in  project management grid
    And ui: I uncheck filter orders "Regular,Workflow,Template" in project management grid
    And ui: I close filter order overlay in project management grid

  @testId=ST-1279
  Scenario: Must automatically deselect regular and workflow project-type options when the template option is selected.
    And setup: Test Data "SoftAssert"
    When ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I click on filter order in  project management grid
    And ui: I select filter orders "Regular,Workflow" in project management grid
    And ui: I close filter order overlay in project management grid
    And ui: I search for project template created using model in project list page
    Then ui: I verify project template is not displayed in project management grid
    And ui: Search for recently created project in PM Grid
    Then ui: Verify if recently created project is displayed in PM Grid
    And ui: I click on filter order in  project management grid
    And ui: I select filter orders "Template" in project management grid
    Then ui: I verify specific filter order "Template" is checked in project management grid
    Then ui: I verify specific filter order "Regular" is not checked in project management grid
    Then ui: I verify specific filter order "Workflow" is not checked in project management grid
    And ui: I select filter orders "Regular" in project management grid
    Then ui: I verify specific filter order "Template" is not checked in project management grid
    Then ui: I verify specific filter order "Regular" is checked in project management grid
    And ui: I uncheck filter orders "Regular,Workflow,Template" in project management grid
    And ui: I close filter order overlay in project management grid

  @owner=Pranit
  @testId=ST-1432
  Scenario: SG-11298 Project Template - Clone and open
    When ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: I click on open on create toggle in create project template modal
    And ui: Click on Create button of template creation modal in Project Attributes
    Then ui: I verify url containing value "Allocations"

  @issue=SG-11545
  @testId=ST-1474
  Scenario: Project Edit - Template creation modal should disappear when user clicks on Create Template button
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation modal in Project Attributes
    And ui: Wait for 1 second
    And ui: Wait for 1 second
    And ui: Verify if Create button in Template Creation modal is not displayed

  @testId=ST-1476
  @issue=SG-11535
  Scenario: Project Template - Clicking on Search textbox of Import Template section should not close the entire Import section
    Given ui: Click on Import from Template button
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Click on search textbox in Choose Template dropdown of Import from Template modal
    And ui: Wait for 1 second
    And ui: Wait for 1 second
    Then ui: Verify if search textbox in Choose Template dropdown of Import from Template modal is displayed

  @9.1
  @issue=SG-12463
  @owner=Devanshi
  Scenario: PM Import template from context menu
    Given setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password

    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Project Management"
    And ui: Search for recently created project in PM Grid
    And ui: I click on meat ball icon by index "1" and select specific option "Create Template" in project attributes
    And ui: I click on open on create toggle in template project name container in PM
    And ui: Enter template name in template creation modal
    And ui: Click on Create button of template creation model in PM Grid
    And ui: Quick navigate to "Project Management"
    And ui: Search for recently created project in PM Grid
    And ui: I click on the project
    And ui: Click on Import from Template button
    And ui: Toggle "On" "Select all" restore option in Import from Template modal
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search and select template in Import from Template modal
    When ui: Click on Apply button in Import from Template modal
    And ui: Click on "Apply" button in confirmation modal
