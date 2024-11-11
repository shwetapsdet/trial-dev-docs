Feature: View Management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1265
  Scenario: Validate Group by dropdown showing at BPAFG view management page (and) Validate Group by dropdown Must display project, resource, and assignment attributes on the list of options at BPAFG view management page
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    Then ui: I verify groupby dropdown is displayed
    And ui: I click on groupby dropdown
    And ui: I uncheck and select attributes "Dataset Preference,Security Group,Project Owner" in groupby dropdown
    Then ui: I verify attribute "Dataset Preference,Security Group,Project Owner" is selected in groupby dropdown

  @testId=ST-1625
  Scenario: Validate user Must only be able to select a maximum of 3 attributes from Group by dropdown at BPAFG view management page
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on groupby dropdown
    And ui: I uncheck and select attributes "Project Owner,Resource Managers,Project Hierarchy" in groupby dropdown
    Then ui: I verify attribute "Dataset Preference,Security Group" is disabled in groupby dropdown
    Then ui: I verify attribute "Project Owner,Resource Managers,Project Hierarchy" is selected in groupby dropdown

  @testId=ST-1445
  Scenario: Dynamic Date (Current Month) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Current Month" form the end date
    And ui: I validate date is set automatically end of the Month
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1631
  Scenario: Dynamic Date (Next Month) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Next Month" form the end date
    And ui: I validate date is set automatically next end of the Month
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1632
  Scenario: Dynamic Date (Current Qtr) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Current Qtr" form the end date
    And ui: I validate date is set automatically current qtr end of the month
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1633
  Scenario: Dynamic Date (Next Qtr) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Next Qtr" form the end date
    And ui: I validate date is set automatically next qtr end of the month
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1634
  Scenario: Dynamic Date (Current Year) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Current Year" form the end date
    And ui: I validate date is set automatically end of the year
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1635
  Scenario: Dynamic Date (Next Year) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Next Year" form the end date
    And ui: I validate date is set automatically next year end of the year
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1636
  Scenario: Dynamic Date (Three Year) Inputs In View Management -> BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "3 Years" form the end date
    And ui: I validate date is set automatically next three year end of the year
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section

  @testId=ST-1458
  @owner=VIvek
  Scenario: Validate Reorder of View in BPA Flatgrid
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I enter date range for current year
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button
    Then ui: I search the view created by model
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    # And ui: I reorder "original view" above "cloned view"
    # And ui: I verify that "original view" is arranged above "cloned view"

  @testId=ST-1626
  @owner=VIvek
  Scenario: Validate Reorder of View in Project Management
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "project management" tab in view management
    And ui: I click on add new view button in "Project Management" tab
    And ui: I enter view name using model
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "Project Management" section
    And ui: Quick navigate to "Project Management"
    And ui: I click on view button
    Then ui: I search the view created by model
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    # And ui: I reorder "original view" above "cloned view"
    # And ui: I verify that "original view" is arranged above "cloned view"

  @testId=ST-1627
  @owner=VIvek
  Scenario: Validate Reorder of View in Resource Management
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "resource management" tab in view management
    And ui: I click on add new view button in "Resource Management" tab
    And ui: I enter view name using model
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "Resource Management" section
    And ui: Quick navigate to "Resource Management"
    And ui: I click on view button
    Then ui: I search the view created by model
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    # And ui: I reorder "original view" above "cloned view"
    # And ui: I verify that "original view" is arranged above "cloned view"

    # @testId=ST-1628
    # @owner=VIvek
    # Scenario: Validate Reorder of View in BPA
    #   Given ui: I navigate to "Bulk Project" "Allocation"
    #   And ui: I click on view button
    #   And ui: I Click on Create View
    #   And ui: I rename the new view with the model name
    #   Then ui: I search the view created by model
    #   And ui: I create a clone of the view created inside view block
    # # And ui: I reorder "original view" above "cloned view" in the BPA

  @testId=ST-1629
  @owner=VIvek
  Scenario: Validate one can edit the reordered views
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "resource management" tab in view management
    And ui: I click on add new view button in "Resource Management" tab
    And ui: I enter view name using model
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "Resource Management" section
    And ui: Quick navigate to "Resource Management"
    And ui: I click on view button
    Then ui: I search the view created by model
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    # And ui: I reorder "original view" above "cloned view"
    # And ui: I verify that "original view" is arranged above "cloned view"
    And ui: I "Clone" the reordered clone view
    And ui: I verify the clone view has been "cloned" successfully
    And ui: I "Rename" the reordered clone view
    And ui: I verify the clone view has been "renamed" successfully
    And ui: I create a clone of the view created by model
    And ui: I "Delete" the reordered clone view
    And ui: I verify the clone view has been "deleted" successfully

  @testId=ST-1517
  @issue=SG-11581
  Scenario: RM Views - when clicking on a resource and then the back button, user is taken back to last view not default view
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "View"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Create new view in PM grid and select it
    And setup: Test Data "Resource"
    And ui: I create a new Resource
    And ui: I navigate to previous window
    Then ui: I validate that the view is same as selected before

  @testId=ST-1630
  @issue=SG-11581
  Scenario: PM Views - when clicking on a project and then the back button, user is taken back to last view not default view
    Given ui: Quick navigate to "Project Management"
    When setup: Test Data "View"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create new view in PM grid and select it
    And setup: Test Data "Project"
    And ui: I create a new Regular Project
    And ui: I navigate to previous window
    Then ui: I validate that the view is same as selected before

  @issue=SG-12042
  @owner=Devanshi
  @8.2
  Scenario: View Management - group by task name is not available in BPAFG views
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Current Year" form the end date
    And ui: I validate date is set automatically end of the year
    Then ui: I verify groupby dropdown is displayed
    And ui: I click on groupby dropdown
    And ui: I uncheck and select attributes "Task name" in groupby dropdown
    Then ui: I verify attribute "Task name" is selected in groupby dropdown
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button and change it to newly created view
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    # And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I validate data is grouped by "Task name"
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-13107
  @owner=Devanshi
  @9.1
  Scenario: Public Views/View Management - remove Name and Name from Choose Columns in View Management
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "View" "Management"
    And ui: I click on "BPA Flatgrid" tab in view management
    And ui: I click on add new view button
    And ui: I enter view name using model
    And ui: I toggle is default view button to "OFF"
    And ui: I enabled Dynamic Date Inputs
    And ui: I validate start date filled automatically
    And ui: I select "Current Year" form the end date
    And ui: I validate date is set automatically end of the year
    Then ui: I verify groupby dropdown is displayed
    And ui: I click on groupby dropdown
    And ui: I uncheck and select attributes "Name" in groupby dropdown
    Then ui: I verify attribute "Name" is selected in groupby dropdown
    And ui: I click on save button in view management
    Then ui: I verify if specific view created using model is displayed in "BPA Flatgrid" section
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button and change it to newly created view
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    # And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I validate data is grouped by "Resource name"
    And ui: I validate data is grouped by "Project name"
    Then ui: I verify client or server error warning is not displayed