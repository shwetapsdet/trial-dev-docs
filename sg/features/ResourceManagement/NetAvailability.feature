Feature: Resource Management - Net Availability

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage

  @testId=ST-1530
  @issue=SG-11825
  Scenario: RMNA - Excel export should be possible after page refresh
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Resource Management" tile in homepage
    And ui: Click on Net Availability tab in RM grid

    And ui: Remove a directory as:"ST-1530_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1530_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1530_Downloads" in projects's root directory

    And ui: Click on export icon in Net Availability section of RM
    Then ui: Softassert if Net Availability file got downloaded in directory:"ST-1530_Downloads" under project's root directory
    And ui: Delete all files that start with name:"Net Availability" and extension:".csv" in directory:"ST-1530_Downloads" under project's root directory

    And ui: I refresh the browser
    And ui: Click on export icon in Net Availability section of RM
    Then ui: Softassert if Net Availability file got downloaded in directory:"ST-1530_Downloads" under project's root directory

    Then ui: Softassert all

  @testId=ST-2049
  @9.0
  Scenario: Net availability grid for 7 days work week
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And setup: Test Data "Resource"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for resource to project in SPA in Month mode for "current" quarter when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Resource Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I clear filters in RM netavailability tab
    And ui: Un-select all attributes in Columns dropdown of Net Availability section of RM Grid
    And ui: I search for resource created using model in RM netavailability tab
    And ui: I select plan type "Allocation" in RM netavailability tab
    And ui: I select assignment type "Planned" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: I enter current year start and end date in RM netavailability tab
    And ui: I select specific date mode "Day" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Week" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Month" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Quarter" in RM netavailability tab
    Then ui: I verify weekends are not grayed out

    And ui: Remove a directory as:"ST-2049_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-2049_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-2049_Downloads" in projects's root directory

    And ui: Click on export icon in Net Availability section of RM
    Then ui: Softassert if Net Availability file got downloaded in directory:"ST-2049_Downloads" under project's root directory
    And ui: Delete all files that start with name:"Net Availability" and extension:".csv" in directory:"ST-2049_Downloads" under project's root directory

    And ui: I refresh the browser
    And ui: Click on export icon in Net Availability section of RM
    Then ui: Softassert if Net Availability file got downloaded in directory:"ST-2049_Downloads" under project's root directory

    Then ui: Softassert all

  @issue=SG-12529
  @9.0
  Scenario: Incorrect Net Availability displayed DU is set to FTE
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And setup: Test Data "Resource"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for resource to project in SPA in Month mode for "current" quarter when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Resource Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I clear filters in RM netavailability tab
    And ui: Un-select all attributes in Columns dropdown of Net Availability section of RM Grid
    And ui: I search for resource created using model in RM netavailability tab
    And ui: I select plan type "Allocation" in RM netavailability tab
    And ui: I select assignment type "Planned" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: I enter current year start and end date in RM netavailability tab
    And ui: I select specific date mode "Day" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Week" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Month" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Quarter" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I click on specific unit "fte" in RM netavailability tab
    And ui: I select specific date mode "Day" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Week" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Month" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    And ui: I select specific date mode "Quarter" in RM netavailability tab
    Then ui: I verify weekends are not grayed out
    Then ui: Softassert all