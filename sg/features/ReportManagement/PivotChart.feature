Feature: Report Management - Pivot Chart

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1250
  @issue=SG-10759
  @owner=Pranit
  Scenario: PivotChart - Verify search icon and when clicked the search bar must be displayed
    Given ui: I navigate to "Report" "Management"
    When ui: Click on "Pivot Chart" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab

  @issue=SG-12082
  @owner=Devanshi
  @8.2
  Scenario: Unable to create Pivot Grid and Pivot Chart report got error.
    Given ui: I navigate to "Report" "Management"
    When ui: Click on "Pivot Chart" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab
    And ui: I drag and drop "Financial Dimensions" into "Rows"
    And ui: I drag and drop "Date" into "Columns"
    And ui: I click on "Measures" element
    And ui: I drag and drop "Resource Default Rate" into "Measures"
    And ui: I save the created Pivot Grid and validate it is saved
    Then ui: I verify client or server error warning is not displayed
    Given ui: Quick navigate to "Report Management"
    When ui: Click on "Pivot Grid" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab
    And ui: I drag and drop "Financial Dimensions" into "Rows"
    And ui: I drag and drop "Date" into "Columns"
    And ui: I click on "Measures" element
    And ui: I drag and drop "Resource Default Rate" into "Measures"
    And ui: I save the created Pivot Grid and validate it is saved
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2055
  @issue=SG-12118
  @9.0
  Scenario:Create pivot chart for 7 working days.
    Given ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Given ui: Quick navigate to "Report Management"
    When ui: Click on "Pivot Chart" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab
    And ui: I drag and drop "Financial Dimensions" into "Rows"
    And ui: I drag and drop "Date" into "Columns"
    And ui: I click on "Measures" element
    And ui: I drag and drop "Resource Default Rate" into "Measures"
    And ui: I save the created Pivot Grid and validate it is saved
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again