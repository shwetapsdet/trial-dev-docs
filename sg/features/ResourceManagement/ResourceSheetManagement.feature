Feature: Resource - Sheets Management
  
  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  @testId=ST-1961
  @issue=SG-12066
  @8.2
  Scenario: Sheets - List view for resource
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"

    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Resource"

    Given setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Sheets"

    # Validate add sheet
    And ui: I add "2" new sheet through add button

    # Validate sheet list dropdown functionalities
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: Click on Checkout button in Sheets and wait for Release button
    And ui: Click on the sheet list dropdown
    And ui: I search and validate that the "Template" sheet names are "present"

    # Validate add new row Funcationality
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "Yes"
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "Yes"
    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "No"

    # Validate Delete row
    And ui: I delete the first row with column option set as "Yes"
    And ui: I verify client or server error warning is not displayed

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
    And ui: I verify client or server error warning is not displayed

    Then ui: Softassert all

  @testId=ST-2079
  @issue=SG-12637
  @owner=Devanshi
  @9.0.1
  Scenario: Sort Resource Sheet as part of the project menu (e2e)
    Given setup: Test Data "Project"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "SoftAssert"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create a sheet template with column type as "Bool" for "Resource"
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I pin newly created sheet in the tab
    Then ui: I verify that the newly created sheet is "Pinned" in the grid
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    Then ui: I verify created resource sheet is present and is in sorted order
    And ui: I refresh the browser
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2123
  @issue=SG-12456
  @9.1
  Scenario: Resource Sheets - Apply filters and grouping within the locked view
    Given setup: Test Data "Resource"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Resource"
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource2"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Sheets"

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

  @testId=ST-2124
  @testId=ST-2125
  @testId=ST-2126
  @testId=ST-2127
  @testId=ST-2128
  @issue=SG-12456
  @9.1
  Scenario: Resource Sheets - Create, rename, lock, clone, delete the view
    Given setup: Test Data "Resource"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Resource"

    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource2"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Sheets"

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
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Sheets"
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

  @issue=SG-12456
  @9.1
  Scenario: Resource Sheets - Create, rename, lock, clone, delete the cloned view from the original view
    Given setup: Test Data "Resource"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Resource"

    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource2"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Sheets"

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

  @testId=ST-2133
  @testId=ST-2137
  @testId=ST-2136
  @issue=SG-12461
  @9.1
  Scenario: Resource - Sheet list file attachment
    Given setup: Test Data "Resource"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    And setup: Test Data "SoftAssert"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Resource"

    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource2"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Sheets"

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

  @testId=ST-2135
  @issue=SG-12461
  @9.1
  Scenario: Resource - Sheet permission deny to attach/upload documents
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Sheet Template1"
    And setup: Test Data "Sheet Template2"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Sheet Templates" tile in Admin settings
    And ui: I create 2 sheet template with column type as "Bool" for "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Role" "Management"
    And ui: I navigate to the "Resource" tab
    And ui: I create a new "Resource" Role and assign "Access Files" permission to "None"
    And ui: I update a "Resource" Role and assign "View In Lists" permission to "Grant"
    And ui: I update a "Resource" Role and assign "View Global Role" permission to "Grant"
    And ui: I update a "Resource" Role and assign "Access Sheets" permission to "Edit"
    And ui: Quick navigate to "Admin Settings"
    And ui: I navigate to "Resource" "Access"
    And ui: I create a new resource access rule add "Role" to "Resource" at "NewlyCreated" level
    And ui: Logout

    And ui: I login with "resource" account
    And ui: Wait for 4 seconds
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Sheets"

    And ui: I add "2" new sheet through add button
    And ui: Click on the edit in list view button
    And ui: I select sheet template 1 from the select sheet template dropdown
    And ui: Click on Checkout button in Sheets and wait for Release button

    And ui: I click on add new button in list sheet view
    And ui: I create new row with column option set as "Yes"
    And ui: I click on edit button for the newly created row
    Then ui: Validate that user is not able to upload files due to restricted permissions
    Then ui: Softassert all