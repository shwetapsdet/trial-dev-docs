Feature: MA for SPA

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @9.1.5
  Scenario: SG - Add allocation value to multi assignment in SPA
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
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I save project Id from the attribute page

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
  Scenario: SG - Check Clone Project for Multi assignment
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
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I save project Id from the attribute page
    And ui: I click on clone button in project attributes
    And ui: I click on open on clone toggle in clone project name container in PM
    And ui: I click on save button in edit form container in project attributes
    Then ui: I verify client or server error warning is not displayed

    # Validate allocation on cloned project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Verify if resource has "100" allocation value in cell number:"1" in SPA when dataset is "Allocation" and Multi Assignment is On
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: I verify url containing value "Attributes"
    And ui: I save project Id from the attribute page

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
  Scenario: SG - Ensure user can import template created template and also verify that allocation are correct after importing template for Multi assignment
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
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
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I save project Id from the attribute page
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: I click on open on create toggle in create project template modal
    And ui: Click on Create button of template creation model in PM Grid
    And ui: I verify client or server error warning is not displayed

    # Import template to the project
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And ui: I create another new Regular Project
    And ui: Click on Import from Template button
    And ui: Toggle "On" "Select all" restore option in Import from Template modal
    And ui: Click on Choose Template dropdown in Import from template modal
    And ui: Search and select template in Import from Template modal
    And ui: Verify if template is present in Choose Template dropdown of Import from Template modal
    And ui: Click on Apply button in Import from Template modal
    And ui: Click on "Apply" button in confirmation modal
    And ui: Wait for 4 seconds

    # Validate allocation for imported tempate project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Verify if resource has "100" allocation value in cell number:"1" in SPA when dataset is "Allocation" and Multi Assignment is On
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: I verify url containing value "Attributes"
    And ui: I save project Id from the attribute page

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
  Scenario: SG - Check Resource Replace on multi assignment in SPA
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
    And ui: I click on meat ball icon for "resource" on index "1" and select "Resource Replace" option
    And ui: I select the newly created "2" resource
    And ui: I click on Replace Resource with redistribute and verify resource is replaced
    Then ui: I verify client or server error warning is not displayed
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I save project Id from the attribute page

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