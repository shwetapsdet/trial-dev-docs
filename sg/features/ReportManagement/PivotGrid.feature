Feature: Report Management - Pivot Grid

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1250
  @issue=SG-10759
  @owner=Pranit
  Scenario: PivotGrid - Verify search icon and when clicked the search bar must be displayed
    Given ui: I navigate to "Report" "Management"
    When ui: Click on "Pivot Grid" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot grid
    Then ui: I verify search icon is displayed in pivot grid dimensions tab
    And ui: I click on search icon in pivot grid dimensions tab
    Then ui: I verify search field is displayed in pivot grid dimensions tab

  @issue=SG-12434
  @owner=Devanshi
  @8.2
  Scenario:Cannot save Pivot Grid report with (Empty) filter option for Date attribute
    Given ui: Quick navigate to "Report Management"
    When ui: Click on "Pivot Grid" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab
    And ui: I drag and drop "Date" into "Columns"
    And ui: I click on "Project Dimensions" element
    And ui: I drag and drop "Project/Task Names" into "Columns"
    And ui: I click on "Project Dimensions" element
    And ui: I click on "Measures" element
    And ui: I click on "Planned Allocation" element
    And ui: I drag and drop "Planned Allocation Time" into "Measures"
    And ui: I click on filters icon in Pivot Grid
    And ui: I click on "Date" filters
    And ui: I unselect all and click on apply button after verifying it is empty
    And ui: I save the created Pivot Grid and validate it is saved
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12428
  @owner=Devanshi
  @8.2
  Scenario:Documents - server error when using file dimensions
    Given ui: Quick navigate to "Report Management"
    When ui: Click on "Pivot Grid" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab
    And ui: I click on "Project Dimensions" element
    And ui: I drag and drop "Project File Dimensions" into "Columns"
    And ui: I click on "Project Dimensions" element
    Then ui: I verify client or server error warning is not displayed
    And ui: I click on "Measures" element
    And ui: I click on "Planned Allocation" element
    And ui: I drag and drop "Planned Allocation Time" into "Measures"
    And ui: I save the created Pivot Grid and validate it is saved
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2056
  @issue=SG-12118
  @9.0
  Scenario:Create pivot grid for 7 working days
    Given setup: Test Data "SoftAssert"
    Given ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Given ui: Quick navigate to "Report Management"
    When ui: Click on "Pivot Grid" tile in Report Management
    And ui: I enter report name in pivot grid
    And ui: I click on specific tab "Dimensions" in pivot chart
    Then ui: I verify search icon is displayed in pivot chart dimensions tab
    And ui: I click on search icon in pivot chart dimensions tab
    Then ui: I verify search field is displayed in pivot chart dimensions tab
    And ui: I drag and drop "Date" into "Rows"
    And ui: I click on "Project Dimensions" element
    And ui: I drag and drop "Project Is Proposal" into "Columns"
    And ui: I click on "Project Dimensions" element
    And ui: I click on "Measures" element
    And ui: I click on "Actual Allocation" element
    And ui: I drag and drop "Actual Allocation Cost" into "Measures"
    And ui: Remove a directory as:"ST-2056_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-2056_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-2056_Downloads" in projects's root directory
    And ui: I export the created report
    Then ui: Softassert if exported pdf file got downloaded in directory:"ST-2056_Downloads" under project's root directory with extension "pdf" for "PivotGrid" tab
