Feature: Fiscal Period Management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1414
  @owner=Pranit
  Scenario: Create and delete Fiscal period management
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "next" year in fiscal period management
    And ui: I delete first fiscal calendar in fiscal period management
    And ui: Click on "Yes" button in confirmation modal
    And ui: I click on save button in fiscal period management
    Then ui: I verify specific fiscal period is not displayed in fiscal period management

  @testId=ST-1336
  @issue=SG-10689
  @owner=Pranit
  Scenario: SG-10689 Portfolio Planner - Add Fiscal Month and Fiscal Quarter
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "previous" year in fiscal period management
    And ui: Quick navigate to "Report Management"
    When ui: Click on "portfolio planner" tile in Report Management
    Then ui: I verify specific time unit "Fiscal Year,Fiscal Quarter,Fiscal Month" is displayed in portfolio planner
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Yes" button in confirmation modal
    And ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I delete first fiscal calendar in fiscal period management
    And ui: Click on "Yes" button in confirmation modal
    And ui: I click on save button in fiscal period management
    Then ui: I verify specific fiscal period is not displayed in fiscal period management
    And ui: Quick navigate to "Report Management"
    When ui: Click on "portfolio planner" tile in Report Management
    Then ui: I verify specific time unit "Fiscal Year,Fiscal Quarter,Fiscal Month" is not displayed in portfolio planner

  @testId=ST-1637
  @issue=SG-10689
  @owner=Pranit
  Scenario: SG-10689 Portfolio Planner - Must be able to switch between these tabs
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "current" year in fiscal period management
    And ui: Quick navigate to "Report Management"
    When ui: Click on "portfolio planner" tile in Report Management
    And ui: I enter report name in portfolio planner
    And ui: I enter "current" year start and end date in portfolio planner
    And ui: I click on specific time unit "Fiscal Year" in portfolio planner
    And ui: I click on specific tab "Data series" in portfolio planner
    And ui: I click on new series button in portfolio planner
    And ui: I click on data series save button in portfolio planner
    And ui: I click on save button in portfolio planner
    Then ui: I verify client or server error warning is not displayed
    Then ui: I verify no data to show message is not displayed in portfolio planner
    And ui: I click on settings icon in portfolio planner
    And ui: I click on specific tab "Config" in portfolio planner
    And ui: I click on specific time unit "Fiscal Quarter" in portfolio planner
    And ui: I click on save button in portfolio planner
    Then ui: I verify no data to show message is not displayed in portfolio planner
    And ui: I click on specific tab "Config" in portfolio planner
    And ui: I click on specific time unit "Fiscal Month" in portfolio planner
    And ui: I click on save button in portfolio planner
    Then ui: I verify no data to show message is not displayed in portfolio planner
    And ui: I click on specific tab "Config" in portfolio planner
    And ui: I click on specific time unit "Year" in portfolio planner
    And ui: I click on save button in portfolio planner
    Then ui: I verify client or server error warning is not displayed
    Then ui: I verify no data to show message is not displayed in portfolio planner
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I delete first fiscal calendar in fiscal period management
    And ui: Click on "Yes" button in confirmation modal
    And ui: I click on save button in fiscal period management
    Then ui: I verify specific fiscal period is not displayed in fiscal period management

  @testId=ST-1638
  @issue=SG-10689
  @owner=Pranit
  Scenario: SG-10689 If the user selects the Fiscal option, entering Start and end dates out of the fiscal period must not be allowed.
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "current" year in fiscal period management
    And ui: Quick navigate to "Report Management"
    When ui: Click on "portfolio planner" tile in Report Management
    And ui: I enter report name in portfolio planner
    And ui: I enter "current" year start and end date in portfolio planner
    And ui: I click on specific time unit "Fiscal Year" in portfolio planner
    And ui: I click on specific tab "Data series" in portfolio planner
    And ui: I click on new series button in portfolio planner
    And ui: I click on data series save button in portfolio planner
    And ui: I click on save button in portfolio planner
    And ui: I click on settings icon in portfolio planner
    And ui: I click on specific chart type "Tabular" in portfolio planner
    Then ui: I verify export option is displayed in portfolio planner
    And ui: I click on specific chart type "Chart" in portfolio planner
    Then ui: I verify export option is not displayed in portfolio planner
    And ui: I click on specific tab "Config" in portfolio planner
    And ui: I enter "previous" year start and end date in portfolio planner
    And ui: I click on save button in portfolio planner
    Then ui: I verify "previous" year start and end date is not displayed in portfolio planner
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Yes" button in confirmation modal
    And ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I delete first fiscal calendar in fiscal period management
    And ui: Click on "Yes" button in confirmation modal
    And ui: I click on save button in fiscal period management
    Then ui: I verify specific fiscal period is not displayed in fiscal period management