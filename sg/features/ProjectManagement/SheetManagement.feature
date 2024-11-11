Feature: Project - Sheets Management

  Background: Login to the application
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  @testId=ST-1599
  Scenario: Validate sheet is cloned to another project
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project1" name in the input cell
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button
    And ui: I navigate to "Dashboard"
    And setup: Test Data "Project2"
    And ui: I navigate to "Project" "Management"
    And ui: I create another new Regular Project
    And ui: I switch to Project Option "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project2" name in the input cell
    Then ui: I clone sheet from previously created project with Open to clone button "Disabled"

  @testId=ST-1600
  Scenario: Validate the existing data of sheet gets changed by the data of cloned sheet
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project1" name in the input cell
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button
    And ui: I navigate to "Dashboard"
    And setup: Test Data "Project2"
    And ui: I navigate to "Project" "Management"
    And ui: I create another new Regular Project
    And ui: I switch to Project Option "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project2" name in the input cell
    Then ui: I clone sheet from previously created project with Open to clone button "Disabled"
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button
    And ui: I select the cloned sheet
    And ui: I validate that the existing data has been changed

  @testId=ST-1601
  Scenario: Validate the Open to clone button
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I switch to Project Option "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project1" name in the input cell
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button
    And ui: I navigate to "Dashboard"
    And setup: Test Data "Project2"
    And ui: I navigate to "Project" "Management"
    And ui: I create another new Regular Project
    And ui: I switch to Project Option "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project2" name in the input cell
    Then ui: I clone sheet from previously created project with Open to clone button "Enabled"
    And ui: I validate that the existing data has been changed

  @testId=ST-1479
  @issue=SG-11596
  Scenario: Sheets - Other sheets should not get hidden after cloning
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "SoftAssert"

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"
    And ui: I add "1" new sheet through add button
    And ui: I select recently created new sheet
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I enter "Project1" name in the input cell
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button

    And ui: Quick navigate to "Project Management"
    And ui: I create another new Regular Project
    And ui: Click on Project navigation dropdown and select "Sheets"
    And ui: I clone sheet from previously created project with Open to clone button "Disabled"
    Then ui: Verify cloned sheet is present
    Then ui: Softassert all


  @testId=ST-1960
  @issue=SG-12066
  @8.2
  Scenario: Sheets - List view for project
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    # Validate add sheet
    And ui: I add "2" new sheet through add button

    # Validate sheet list dropdown functionalities
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: Click on the sheet list dropdown
    And ui: I search and validate that the "Template" sheet names are "present"

    # Validate Export sheet
    And ui: Remove a directory as:"SG-11973_Downloads" in projects's root directory
    And ui: Create a new directory as:"SG-11973_Downloads" in projects's root directory
    And ui: Set downloads directory as:"SG-11973_Downloads" in projects's root directory
    And ui: Click on the sheet export as "Excel"
    And ui: Softassert if sheet exported file got downloaded in directory:"SG-11973_Downloads" under project's root directory
    And ui: Remove a directory as:"SG-11973_Downloads" in projects's root directory

    # Validate Filter
    And ui: Click on the filter
    And ui: I select column name for template "1" from the choose filter option
    And ui: I delete filter and validate for the newly created filter

    # Validate Group By
    And ui: I select the Groupby dropdown
    And ui: I select and vaidate column name for template "1" from the Groupby dropdown
    And ui: I select the Groupby dropdown
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button

    Then ui: Softassert all

  @9.0
  @issue=SG-12077
  @owner=Devanshi
  Scenario: Sheet template deletion: show entities where template is assigned to
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    # # Validate add sheet
    # Validate sheet list dropdown functionalities
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: Click on the sheet list dropdown
    And ui: I search and validate that the "Template" sheet names are "present"
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "Yes"
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "Yes"
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "No"
    And ui: Click on Save and Check In button in Sheet Management and wait for Checkout button

    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I delete the created sheet
    And ui: I validate a popup denying the deletion is shown
    And ui: I validate entities show where template is assigned to

  @testId=ST-2077
  @issue=SG-12637
  @owner=Devanshi
  @9.0.1
  Scenario: Sort Project Sheet as part of the project menu (e2e)
    Given setup: Test Data "Project"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create a sheet template with column type as "Bool" for "Project"
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I pin newly created sheet in the tab
    Then ui: I verify that the newly created sheet is "Pinned" in the grid
    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    Then ui: I verify created project sheet is present and is in sorted order
    And ui: I refresh the browser
    And ui: I click on pinned project sheet
    Then ui: I verify client or server error warning is not displayed
    And ui: Click on Project navigation dropdown and select "Allocations"
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2107
  @issue=SG-12456
  @9.1
  Scenario: Sheets - Apply filters and grouping within the locked view
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"
    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    # Validate add sheet
    And ui: I add "2" new sheet through add button

    # Create new view and lock the view
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: I click on view button
    And ui: I Click on Create View
    And ui: I rename the new view with the model name
    And ui: I select the "Created" view

    # Validate Filter
    And ui: Click on the filter
    And ui: I select column name for template "1" from the choose filter option

    # Validate Group By
    And ui: I select the Groupby dropdown
    And ui: I select and vaidate column name for template "1" from the Groupby dropdown
    And ui: I select the Groupby dropdown
    And ui: I click on view button
    And ui: I lock the created view
    And ui: I click on view button
    And ui: I click on view button
    And ui: I select the "Default" view
    And ui: I click on view button
    And ui: I select the "Created" view
    And ui: I delete filter and validate for the newly created filter
    Then ui: Softassert all

  @testId=ST-2111
  @testId=ST-2105
  @testId=ST-2106
  @testId=ST-2110
  @testId=ST-2109
  @issue=SG-12456
  @9.1
  Scenario: Sheets - Create, rename, lock, clone, delete the view
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    And ui: I add "2" new sheet through add button
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
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
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: I click on view button
    And ui: I search the view created by model
    And ui: I validate that the selected view is still locked
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    And ui: I verify the created view has been "cloned" successfully
    And ui: I "Delete" the created view
    And ui: I verify the created view has been "deleted" successfully
    Then ui: Softassert all

  @9.1
  @issue=SG-12456
  Scenario: Sheets - Create, rename, lock, clone, delete the cloned view from the original view
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    And ui: I add "2" new sheet through add button
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: I click on view button
    And ui: I Click on Create View
    And ui: I rename the new view with the model name
    And ui: I search the view created by model
    And ui: I select the "Created" view
    And ui: I click on view button
    And ui: I create a clone of the view created by model
    And ui: I verify that "cloned view" is arranged above "original view"
    And ui: I "Clone" the reordered clone view
    And ui: I verify the clone view has been "cloned" successfully
    And ui: I "Rename" the reordered clone view
    And ui: I verify the clone view has been "renamed" successfully
    And ui: I create a clone of the view created by model
    And ui: I "Delete" the reordered clone view
    And ui: I verify the clone view has been "deleted" successfully
    Then ui: Softassert all

  @testId=ST-2112
  @testId=ST-2113
  @testId=ST-2131
  @issue=SG-12461
  @9.1
  Scenario: Project - Sheet list file attachment
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    And ui: I add "2" new sheet through add button
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: Click on Checkout button in Sheets and wait for Release button

    # Upload files to the column
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "Yes"
    And ui: I click on edit button for the newly created row
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    And ui: I click on save button for add new item
    And ui: Validate that all the files are uploaded with correct extensions in Sheet

    And ui: I click on add new button in list sheet view
    And ui: Upload file with extensions "js"
    And ui: Validate that file with extension "js" is not uploaded and error message is found
    And ui: I click on cancel button in add new row modal in list sheet view

    And ui: Remove a directory as:"SG-12461_Downloads" in projects's root directory
    And ui: Create a new directory as:"SG-12461_Downloads" in projects's root directory
    And ui: Set downloads directory as:"SG-12461_Downloads" in projects's root directory

    And ui: I download file with extension "xls"
    And ui: Remove a directory as:"SG-12461_Downloads" in projects's root directory

    And ui: I delete the file with extension "xls"
    And ui: Softassert if file with extension "xls" got deleted
    Then ui: Softassert all


  @testId=ST-2095
  @issue=SG-12449
  @owner=Devanshi
  @9.1
  Scenario: Insert new row between formulas in project sheets
    Given setup: Test Data "Project"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create a sheet template with "3" columns and column type as "Currency" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Sheets"
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: Click on the edit in grid view button
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I add "SUM" formula of 2 cells "B" and "C" to row "2"
    And ui: I insert "1" new row in grid view
    And ui: I add "SUM" formula of 2 cells "B" and "C" to row "4"
    And ui: I insert "5" new row in grid view
    And ui: I add "SUM" formula of 2 cells "B" and "C" to row "9"
    And ui: I delete the row "8"

    Then ui: Softassert all

  @testId=ST-2096
  @issue=SG-12449
  @owner=Devanshi
  @9.1
  Scenario: Insert new row between formulas in resource sheets
    Given setup: Test Data "Resource"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create a sheet template with "3" columns and column type as "Currency" for "Resource"
    And ui: I navigate to "Dashboard"
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Sheets"
    And ui: I select recently created sheet template 1 in RM
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: I add "SUM" formula of 2 cells "B" and "C" to row "2"
    And ui: I insert "1" new row in grid view
    And ui: I add "SUM" formula of 2 cells "B" and "C" to row "4"
    And ui: I insert "5" new row in grid view
    And ui: I add "SUM" formula of 2 cells "B" and "C" to row "9"
    And ui: I delete the row "8"
    And ui: Click on Save and Check In button in Sheets and wait for Checkout button
    Then ui: Softassert all

  @issue=SG-13097
  @9.1
  Scenario: Sheets List views - new views are being auto-defaulted
    Given setup: Test Data "Project"
    And setup: Test Data "Project2"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Project"

    And ui: I navigate to "Dashboard"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Sheets"

    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: I click on view button
    And ui: I Click on Create View
    And ui: I rename the new view with the model name
    And ui: I validate that the newly created view is not the default view
    Then ui: Softassert all