Feature: RM - Core Test Suite

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  @core
  Scenario: RM e2e core test scenario
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "View"

    # Admin Time creation
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Admin Time" tile in Admin settings
    And ui: I enter Admin Time Type and create

    # Auto Calculate On
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Auto Calculate Capacity "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I verify client or server error warning is not displayed
    Then ui: I validate toggle Auto Calculate Capacity is "On" in General settings global tab

    # Create Rich text attribute for Resource
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section

    # Create Resource
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource

    # Bulk Capacity Tab 
    And ui: I navigate to "Dashboard"
    And ui: Wait for 4 seconds
    And ui: Quick navigate to "Bulk Resource Capacities"
    And ui: Enter Start date as "01/04/2024" and End date as "30/04/2024" in SPA
    And ui: Click on Clear button in Bulk Resource Capacities
    And ui: Click on "Yes" button in confirmation modal if displayed
    And ui: Add newly created resource in Bulk Resource Capacities
    And ui: Click on unit "FTE" in Bulk Resource Capacities
    And ui: I toggle Auto Calculate Capacity for "Time" as "On" in Bulk Resource Capacities
    And ui: Enter "0" capacity for resource for month or date as "Apr 24" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "0" in Bulk Resource Capacities
    And ui: Click on unit "Time" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "0" in Bulk Resource Capacities
    And ui: Click on unit "FTE" in Bulk Resource Capacities
    And ui: Enter "1" capacity for resource for month or date as "Apr 24" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "1" in Bulk Resource Capacities
    And ui: Click on unit "Time" in Bulk Resource Capacities
    And ui: Wait for 4 seconds
    And ui: Verify if resource for month or date as "Apr 24" has value "176" in Bulk Resource Capacities


    # Resource Attributes and Capacity
    And ui: Wait for 4 seconds
    And ui: I navigate to "Dashboard"
    And ui: I search for resource in global search and click on it
    And ui: Verify Rich text in Resource edit for recently created Cfs
    And ui: Change value of CF "Is Resource Manager" of type "Bool" to "No" in Resource Attributes and Identity
    And ui: Change value of CF "Require Resource Manager Approval" of type "Bool" to "No" in Resource Attributes and Identity
    And ui: Enter default rate as "20" in Resource Attributes and Identity
    # And ui: Click on Resource navigation button and select "Capacity"
    And ui: Click on "Capacity tab"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: Click on dataset dropdown and select "allocation" in CPA
    And ui: I select specific assignment Type "planned" in CPA
    And ui: I verify all quick filter options are displayed in CPA section
    And ui: I click on quick filter icon in CPA section
    And ui: I click on individual quick filter options and validate "", "", start date and end date in CPA
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I select Admin Time Type
    # Then ui: Verify Admin Time Type "14" number of cells specifically for weekends status OFF in Resource Capacity are disabled
    And ui: Turn "On" Is demand planning resource toggle button in Resource Capacity tab
    And ui: Wait for 1 second
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    # RM Grid
    And ui: I navigate to "Dashboard"
    And ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Select attributes created earlier in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    
    # View Management on RM Grid
    And ui: I click on view button
    And ui: I Click on Create View
    And ui: I rename the new view with the model name
    And ui: I search the view created by model
    And ui: I select the "Created" view
    And ui: I click on view button
    And ui: I lock the created view
    And ui: I click on view button
    And ui: I validate that the created view is displayed
    And ui: I navigate to "Dashboard"
    And ui: Quick navigate to "Resource Management"
    And ui: I click on view button
    And ui: I search the view created by model
    And ui: I validate that the selected view is still locked
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    And ui: I verify the created view has been "cloned" successfully
    And ui: I "Delete" the created view
    And ui: I verify the created view has been "deleted" successfully

    # Resource Management Net Availability Tab
    And ui: I navigate to "Dashboard"
    And ui: Quick navigate to "Resource Management"
    When ui: Click on Net Availability tab in RM grid
    #Needed for Net availability to load
    And ui: Wait for 4 seconds
    And ui: Clear filters if any in Net Availability section of RM Grid
    And ui: Ungroup groups if any in Net Availability section of RM Grid
    And ui: Select attributes created earlier in Net Availability section of RM Grid
    And ui: Search for recently created "resource" in Net Availability section of RM Grid
    Then ui: Softassert all