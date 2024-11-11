Feature: Upload Files

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"


  @issue=SG-12315
  @issue=SG-12180
  @issue=SG-12197
  @8.2
  @9.0
  Scenario: Multi-Upload Files and validate Limit upload files to formats provided in the task only and validate upload files to be added in Audit log
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "File Management"
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    Then ui: Validate that all the files are uploaded with correct extensions in Files Tab

    And ui: Upload file with extensions "js"
    And ui: Validate that file with extension "js" is not uploaded and error message is found

    And ui: Remove a directory as:"SG-11973_Downloads" in projects's root directory
    And ui: Create a new directory as:"SG-11973_Downloads" in projects's root directory
    And ui: Set downloads directory as:"SG-11973_Downloads" in projects's root directory

    And ui: I download file with extension "pdf"
    And ui: Softassert if file with extension "pdf" got downloaded in directory:"SG-11973_Downloads" under project's root directory
    And ui: Remove a directory as:"SG-11973_Downloads" in projects's root directory
    And ui: Click on Project navigation dropdown and select "Audit Log"
    And ui: Validate that the file with extension "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls" are updated as uploaded in the Audit log
    And ui: Softassert all


  @testId=ST-1962
  @testId=ST-1964
  @issue=SG-11973
  @8.2
  Scenario: Validate File upload section on Project/Workflow
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And api: I create a default project for automation with date range as "current" year
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Attribute Management" tile in Admin settings

    # Validate File Upload and download functionalitty
    And ui: I navigate to Attribute Layout tab
    And ui: I select "Required Fields" section if not already selected
    And ui: I add "Upload File" section below the Required Field section
    And ui: I click on save button in attribute layout tab
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: I validate that the "File" section is present on the attribute page
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    And ui: Validate that all the files are uploaded with correct extensions in Attribute Tab
    And ui: Upload file with extensions "js"
    And ui: Validate that file with extension "js" is not uploaded and error message is found on attribute page
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I download file with extension "pdf" on the Attribute or My Timesheets page
    And ui: Softassert if file with extension "pdf" got downloaded in directory:"ST-1957_Downloads" under project's root directory
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory

    # Reset the Attribute layout
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to Attribute Layout tab
    And ui: I "Collapse" the Required Fields section
    And ui: I delete the Files section included in the attribute layout
    And ui: I validate the Files section is removed from the attribute layout
    And ui: Softassert all

  @issue=SG-12200
  @8.2
  Scenario: Files Management improvements
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "File Management"
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    Then ui: Validate that all the files are uploaded with correct extensions in Files Tab

    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Create Template button in Project Attributes
    And ui: Enter template name in template creation modal
    And ui: I click on open on create toggle in create project template modal
    And ui: Click on Create button of template creation modal in Project Attributes

    And ui: Click on Project navigation dropdown and select "File Management"
    And ui: Validate that all the files are uploaded with correct extensions in Files Tab

    And ui: I navigate to "Dashboard"
    And ui: Click on "Project Management" tile in homepage
    And ui: Search for recently created project in PM Grid
    And ui: I click on meat ball icon by index "1" and select specific option "Clone" in project attributes
    And ui: I click on open on clone toggle in clone project name container in PM
    And ui: I enter cloned project name "Cloned1" in edit form container in project attributes
    And ui: I click on save button in edit form container in project attributes
    And ui: Click on Project navigation dropdown and select "File Management"
    And ui: Softassert all

  @issue=SG-12183
  @8.2
  Scenario: Files - Clicking on Files in snapshot results to error
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "File Management"
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    Then ui: Validate that all the files are uploaded with correct extensions in Files Tab

    And ui: I switch to Project Option "Snapshots"
    And ui: I create project snapshot from project option
    And ui: I validate snapshot is created
    And ui: I click on snapshot from snapshot table
    And ui: I verify if "File Management" option is not avaialble in Project navigation dropdown
    And ui: Softassert all

  @issue=SG-12443
  @issue=SG-12237
  @9.0
  Scenario: Support folder on files page
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "File Management"
    And ui: Upload file with extensions "vcf,csv,eml,msg,ics,mpp,xlsx,xls"
    Then ui: Validate that all the files are uploaded with correct extensions in Files Tab
    And ui: I create new folder name "SubFolder-1"
    And ui: I validate that the Subfolder has been created successfully
    And ui: I select the newly created SubFolder
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt"
    And ui: I move the "doc,docx,gif" from the "SubFolder-1" to the "Primary Files Folder"
    And ui: Softassert all