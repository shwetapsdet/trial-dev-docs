Feature: MA for Snapshot

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @9.1.5
  Scenario: SG- - Add allocation value to multi assignment in SPA
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

    And ui: I switch to Project Option "Snapshots"
    And ui: I create project snapshot from project option
    And ui: I validate snapshot is created
    And ui: I validate restore icon showing in Snapshot Grid
    And ui: I click on snapshot from snapshot table
    And ui: I validate snapshot is created
    And ui: Click on Project navigation dropdown and select "Allocations"
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: I click on expand all icon in SPA
    And ui: I validate that the user "cannot" add input on resoruce row when Multi Assignemnt toggle is "On"

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