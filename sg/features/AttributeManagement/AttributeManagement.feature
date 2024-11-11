Feature: Attribute Management

  Background: Authentication with admin account
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage

  @testId=ST-1311
  @issue=SG-11027
  @owner=Pranit
    #SG-11129: RM: Resource list attribute linked with boolean attribute in “Allow resources who are” section displays empty value in RM list page.
  Scenario: SG-11027 - Attribute Management - when update resource list bool attribute when resources have values assigned, server error occurs
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    Then ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    Then ui: create and verify "Resource" attribute using model with type "Resources List" and select model attribute in allow resources
    And ui: I click on logo to navigate to homepage
    And setup: Test Data "Resource"
    And ui: I navigate to "Resource" "Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to previous window
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select attribute created using model in columns dropdown in resource list page
    And ui: I click on columns dropdown in resource list page
    And ui: Search for attribute created using model in global search and click on it
    And ui: I click on edit "Resource" attribute created using model in attributes page
    And ui: I select attribute "Is Resource Manager" in only allow resource who are dropdown in attributes page
    And ui: I click on save button in edit attribute section
    Then ui: I verify client or server error warning is not displayed
    And ui: I click on edit "Resource" attribute created using model in attributes page
    And ui: I select attribute created using model in only allow resource who are dropdown in attributes page
    And ui: I click on save button in edit attribute section
    Then ui: I verify client or server error warning is not displayed

    # @testId=ST-1441
  @issue=SG-9937
  @owner=Ram
  Scenario: SG-9937 - Allow Rich Text for Text attributes [Resource & Project Edit,RM & PM Grid, SPA, Build Team, RM Net Availibility, BPAFG, Advanced RR in BPAFG, User Management]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    #Rich text to regular text
    Then ui: Verify if Rich Text is converted to regular text in attribute creation

    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    #Edit CF default value
    Then ui: Verify if default Rich Text value of CF in tab "Project" can be edited in Attribute Management
    #Delete CF
    Then ui: Delete recently created "Project" CFs and verify they are not visible after page refresh

    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    #Edit CF default value
    Then ui: Verify if default Rich Text value of CF in tab "Resource" can be edited in Attribute Management
    #Delete CF
    Then ui: Delete recently created "Resource" CFs and verify they are not visible after page refresh

    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    #Edit CF default value
    Then ui: Verify if default Rich Text value of CF in tab "Assignment" can be edited in Attribute Management
    #Delete CF
    Then ui: Delete recently created "Assignment" CFs and verify they are not visible after page refresh

    Then ui: Softassert all

  @testId=ST-1469
  @issue=SG-11586
  Scenario: SG-11586 - Attribute Management - Tooltips are not disappearing and Font name, color, and size values keep getting reset after a few changes
    Given setup: Test Data setup for Attribute of type:"String" with "0" number of selection values, "0" number of default values and create default values:"true"
    And setup: Test Data "SoftAssert"

    Given ui: Click on "Admin Settings" tile in homepage
    When ui: Click on "Attribute Management" tile in Admin settings
    And ui: Click on attribute type dropdown and select "String" in Attribute creation section
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Enter "5" number of words in Rich Text default value textbox of attribute creation section
    And ui: Press Left arrow key "2" number of times
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    And ui: Double click on last word in Rich Text default value textbox in attribute creation section
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Underline" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Strikethrough" formatting icon in Rich text editor of attribute creation section
    And ui: Select "Font name" as:"serif" in Rich text editor of attribute creation section
    And ui: Select "Font size" as:"18px" in Rich text editor of attribute creation section
    And ui: Select "Font Color" as:"#e60000" in Rich text editor of attribute creation section
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Underline" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Strikethrough" formatting icon in Rich text editor of attribute creation section
    And ui: Select "Font name" as:"monospace" in Rich text editor of attribute creation section
    And ui: Select "Font size" as:"24px" in Rich text editor of attribute creation section
    And ui: Select "Font Color" as:"#0066cc" in Rich text editor of attribute creation section
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Underline" formatting icon in Rich text editor of attribute creation section
    And ui: Click on "Strikethrough" formatting icon in Rich text editor of attribute creation section
    And ui: Select "Font name" as:"serif" in Rich text editor of attribute creation section
    And ui: Select "Font Color" as:"#9933ff" in Rich text editor of attribute creation section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Wait for 4 seconds
    And ui: Click on Rich Text default value textbox in attribute creation section
    And ui: Double click on last word in Rich Text default value textbox in attribute creation section
    And ui: Wait for 1 second
    Then ui: Verify if Tooltip is not displayed in Attribute Management
    And ui: I navigate to previous window
    Then ui: Verify if Tooltip from Attribute Management is not displayed in Admin Settings
    Then ui: Softassert all

  @testId=ST-1441
  @issue=SG-9937
  @issue=SG-11590
  @owner=Ram
  Scenario: SG-9937, SG-11590 - Allow Rich Text for Text attributes [Resource & Project Edit,RM & PM Grid, SPA, Build Team, RM Net Availibility, BPAFG, Advanced RR in BPAFG, User Management]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "Kanban"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section

    # #13 - Resource Attributes
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    Then ui: Verify Rich text in Resource edit for recently created Cfs

    # # #13 - Resource Management - Grid
    And ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Select attributes created earlier in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    Then ui: Verify Rich text in RM Grid for recently created Cfs

    # #13 - Resource Management Net Availability Tab
    When ui: Click on Net Availability tab in RM grid
    #Needed for Net availability to load
    And ui: Wait for 4 seconds
    And ui: Clear filters if any in Net Availability section of RM Grid
    And ui: Ungroup groups if any in Net Availability section of RM Grid
    And ui: Select attributes created earlier in Net Availability section of RM Grid
    And ui: Search for recently created "resource" in Net Availability section of RM Grid
    Then ui: Verify Rich text in Net Availability section of RM Grid for recently created Cfs

    # #17 - User Management
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "User Management" tile in Admin settings
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Select attributes created earlier in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    Then ui: Verify Rich text in User Management Grid for recently created Cfs

    # #12 - Project Management
    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: Click on Options button in SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: Close Options section in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Select attributes created earlier in SPA

    #SG-11590 is tested in this step
    # #12 - Project Management Allocation page
    Then ui: Verify Rich text in SPA for recently created Cfs when dataset is:"Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    # #12 - Project Attributes
    And ui: Click on Project navigation dropdown and select "Attributes"
    Then ui: Verify Rich text in Project edit for recently created Cfs

    # #12 - Project Management Build Team
    And ui: Click on Project navigation dropdown and select "Build Team"
    And ui: Clear filters if any and search recently created "resource" in Build Team
    And ui: Select resource attributes created earlier in Build Team
    Then ui: Verify Rich text in Build Team for recently created resource Cfs

    # #12 - Project Management - Grid
    When ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Search for recently created project in PM Grid
    And ui: Select attributes created earlier in PM Grid
    Then ui: Verify Rich text in PM Grid for recently created Cfs

    # #12 - Project Management Kanban>Attribute page
    And ui: Click on "kanban" tab in Project Management
    And ui: Create a new Kanban board with Column attribute as:"Dataset Preference" and Swimlanes as:"Allocation,Demand"
    And ui: I navigate to previous window by clicking on browser back button
    And ui: Search for recently created project in Kanban section of PM
    And ui: Double click on recently created project in Kanban section of PM
    Then ui: Verify Rich text in Project attributes Edit of Kanban for recently created Cfs
    And ui: Click on Cancel button in Project Attributes of Kanban section in PM

    # #13 - Bulk Project Allocation Flatgrid
    When ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: Select attributes created earlier in BPAFG
    And ui: I click on options in BPAFG
    And ui: Select Tasks to show as:"All" in Grid options of BPAFG
    #Wait is required without which assertion is failing
    And ui: Close Options section in BPAFG
    And ui: Wait for 4 seconds
    # #13 - Bulk Project Allocation Flatgrid - Proect, Resource View, Assignemnt CF View and edit
    Then ui: Verify Rich text in BPAFG for recently created Cfs
    # #13 - BPAFG Advanced Resource Replace
    And ui: Click on meatballs icon of recently created project and resource and select option "Resource replace advanced" in BPAFG
    And ui: Clear filters if any in Advanced resource replace of BPAFG
    And ui: Search for recently created resource in Advanced resource replace of BPAFG
    And ui: Select resource attributes created earlier Advanced resource replace of BPAFG
    Then ui: Verify Rich text in Advanced resource replace of BPAFG for recently created resource Cfs
    Then ui: Softassert all

  @testId=ST-1564
  @issue=SG-9937
  @owner=Ram
  Scenario: SG-9937 - Allow Rich Text for Text attributes [Edit CF, Rich text to regular text, Delete Rich text CF]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    #Rich text to regular text
    Then ui: Verify if Rich Text is converted to regular text in attribute creation

    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    #Edit CF default value
    Then ui: Verify if default Rich Text value of CF in tab "Project" can be edited in Attribute Management
    #Delete CF
    Then ui: Delete recently created "Project" CFs and verify they are not visible after page refresh

    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    #Edit CF default value
    Then ui: Verify if default Rich Text value of CF in tab "Resource" can be edited in Attribute Management
    #Delete CF
    Then ui: Delete recently created "Resource" CFs and verify they are not visible after page refresh

    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    #Edit CF default value
    Then ui: Verify if default Rich Text value of CF in tab "Assignment" can be edited in Attribute Management
    #Delete CF
    Then ui: Delete recently created "Assignment" CFs and verify they are not visible after page refresh

    Then ui: Softassert all

  @testId=ST-1485
  @issue=SG-11587
  Scenario: SG-11587 - Attribute Management - Client when using Bold, Italic, Underline and Strikethrough features
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    # Rich Text - Bold
    And ui: Click on attribute type dropdown and select "String" in Attribute creation section
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Enter "1" number of words in Rich Text default value textbox of attribute creation section
    And ui: I select all text using CTRL plus A
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    And ui: I click on default value Rich text field and select all text using CTRL plus A in attribute list tab
    And ui: I click on Backspace key using keystrokes
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    Then ui: I verify client or server error warning is not displayed
    # Rich Text - Italic
    And ui: I refresh the browser
    And ui: Click on attribute type dropdown and select "String" in Attribute creation section
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Enter "1" number of words in Rich Text default value textbox of attribute creation section
    And ui: I select all text using CTRL plus A
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    And ui: I click on default value Rich text field and select all text using CTRL plus A in attribute list tab
    And ui: I click on Backspace key using keystrokes
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    Then ui: I verify client or server error warning is not displayed
    # Rich Text - Underline
    And ui: I refresh the browser
    And ui: Click on attribute type dropdown and select "String" in Attribute creation section
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Enter "1" number of words in Rich Text default value textbox of attribute creation section
    And ui: I select all text using CTRL plus A
    And ui: Click on "Underline" formatting icon in Rich text editor of attribute creation section
    And ui: I click on default value Rich text field and select all text using CTRL plus A in attribute list tab
    And ui: I click on Backspace key using keystrokes
    And ui: Click on "Underline" formatting icon in Rich text editor of attribute creation section
    Then ui: I verify client or server error warning is not displayed
    # Rich Text - StrikeThrough
    And ui: I refresh the browser
    And ui: Click on attribute type dropdown and select "String" in Attribute creation section
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Enter "1" number of words in Rich Text default value textbox of attribute creation section
    And ui: I select all text using CTRL plus A
    And ui: Click on "Strikethrough" formatting icon in Rich text editor of attribute creation section
    And ui: I click on default value Rich text field and select all text using CTRL plus A in attribute list tab
    And ui: I click on Backspace key using keystrokes
    And ui: Click on "Strikethrough" formatting icon in Rich text editor of attribute creation section
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-11807
  Scenario: Attribute Management Rich text - double tooltip not displayed
    Given setup: Test Data "Project"
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an attributes in "Project" tab with Rich text default of text types
    And ui: Click on "Bold" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: Click on "Underline" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: Click on "Strike" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: Click on "Italic" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: I click on create attribute and validate attribute is created
    And ui: I search for the created attribute and click on edit button
    And ui: Click on "Bold" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: Click on "Underline" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: Click on "Strike" formatting icon in Rich text editor and validate only single tooltip is present
    And ui: Click on "Italic" formatting icon in Rich text editor and validate only single tooltip is present

  @testId=ST-1528
  @issue=SG-11651
  Scenario: Attribute Management - Rich Text CF's default value is removed when switched to regular text
    Given ui: Click on "Admin Settings" tile in homepage
    When ui: Click on "Attribute Management" tile in Admin settings
    And ui: Click on attribute type dropdown and select "String" in Attribute creation section
    And ui: Turn "On" Rich Text toggle button in attribute creation section
    And ui: Enter "5" number of words in Rich Text default value textbox of attribute creation section
    And ui: Press Left arrow key "2" number of times
    And ui: Click on "Bold" formatting icon in Rich text editor of attribute creation section
    And ui: Double click on last word in Rich Text default value textbox in attribute creation section
    And ui: Click on "Italic" formatting icon in Rich text editor of attribute creation section
    And ui: Turn "Off" Rich Text toggle button in attribute creation section
    Then ui: I validate that the default value is still present inside textbox

  @testId=ST-1957
  @issue=SG-11525
  @8.2
  Scenario: Validate Unify Attribute layout section and Workflow forms for Project
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Project" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    Then ui: I verify client or server error warning is not displayed
    And ui: I select the newly created attribute if not already selected

    # Validate toggle button functionalities for attributes
    And ui: I toggle "Show hint" to "On"
    And ui: I toggle "Show hint" to "Off"
    And ui: I toggle "Is Hidden" to "On"
    And ui: I toggle "Is Hidden" to "Off"
    And ui: I toggle "Add logic" to "On"
    And ui: I toggle "Add logic" to "Off"

    # Validate toggle button functionalities for section
    And ui: I "Collapse" the Required Fields section
    And ui: I select "Required Fields" section if not already selected
    And ui: I toggle "Expanded by default" to "On"
    And ui: I toggle "Expanded by default" to "Off"
    And ui: I toggle "Is Hidden" to "On"
    And ui: I toggle "Is Hidden" to "Off"

    # Validate sectional elements buttons
    And ui: I add "New" section below the Required Field section
    Then ui: I add and validate "solidLine" sub-section inside the newly created section
    And ui: I add and validate "dotLine" sub-section inside the newly created section
    And ui: I add and validate "dashLine" sub-section inside the newly created section
    And ui: I add and validate "Title" sub-section inside the newly created section
    And ui: I add and validate "Body" sub-section inside the newly created section
    And ui: I add and validate "Small" sub-section inside the newly created section
    And ui: I "Hide" the attribute selection section
    And ui: I "Un-Hide" the attribute selection section

    # Validate export attribute functioanlity
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I export the attribute layout
    And ui: Softassert if Attribute layout file got downloaded in directory:"ST-1957_Downloads" under project's root directory
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    # Validate File Upload and download functionalitty
    And ui: I navigate to Attribute Layout tab
    And ui: I select "Required Fields" section if not already selected
    And ui: I add "Upload File" section below the Required Field section
    And ui: I click on save button in attribute layout tab
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I validate that the "File" section is present on the attribute page
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv"
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

  @testId=ST-1975
  @testId=ST-1963
  @issue=SG-11525
  @8.2
  Scenario: Validate Unify Attribute layout section and Workflow forms for Resource
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: I select the newly created attribute if not already selected

    # Validate toggle button functionalities for attributes
    And ui: I toggle "Show hint" to "On"
    And ui: I toggle "Show hint" to "Off"
    And ui: I toggle "Is Hidden" to "On"
    And ui: I toggle "Is Hidden" to "Off"
    And ui: I toggle "Add logic" to "On"
    And ui: I toggle "Add logic" to "Off"

    # Validate toggle button functionalities for section
    And ui: I "Collapse" the Required Fields section
    And ui: I select "Required Fields" section if not already selected
    And ui: I toggle "Expanded by default" to "On"
    And ui: I toggle "Expanded by default" to "Off"
    And ui: I toggle "Is Hidden" to "On"
    And ui: I toggle "Is Hidden" to "Off"

    # Validate sectional elements buttons
    And ui: I add "New" section below the Required Field section
    Then ui: I add and validate "solidLine" sub-section inside the newly created section
    And ui: I add and validate "dotLine" sub-section inside the newly created section
    And ui: I add and validate "dashLine" sub-section inside the newly created section
    And ui: I add and validate "Title" sub-section inside the newly created section
    And ui: I add and validate "Body" sub-section inside the newly created section
    And ui: I add and validate "Small" sub-section inside the newly created section
    And ui: I "Hide" the attribute selection section
    And ui: I "Un-Hide" the attribute selection section

    # Validate export attribute functioanlity
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1957_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I export the attribute layout
    And ui: Softassert if Attribute layout file got downloaded in directory:"ST-1957_Downloads" under project's root directory
    And ui: Remove a directory as:"ST-1957_Downloads" in projects's root directory
    And ui: I navigate to "Dashboard"
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    # Validate File Upload and download functionalitty
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: I select "Required Fields" section if not already selected
    And ui: I add "Upload File" section below the Required Field section
    And ui: I click on save button in attribute layout tab
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: I validate that the "File" section is present on the attribute page
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv"
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
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: I "Collapse" the Required Fields section
    And ui: I delete the Files section included in the attribute layout
    And ui: I validate the Files section is removed from the attribute layout
    And ui: Softassert all

  @issue=SG-11249
  @8.2
  Scenario: Make Is Enabled attribute available to filter on for resource type attributes
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    Then ui: create and verify "Resource" attribute with type "Resource" has filter Is Enabled attribute present
    And ui: Softassert all

  @issue=SG-11249
  @8.2
  Scenario: Make Is Enabled attribute available to filter on for resource list type attributes
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    Then ui: create and verify "Resource" attribute with type "Resources List" has filter Is Enabled attribute present
    And ui: Softassert all

  @issue=SG-12232
  @owner=Devanshi
  @8.2
  Scenario: Resource Hierarchy and Project Hierarchy- cannot set field in Resource and Project attribute page
    Given setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    When setup: Test Data "Resource Hierarchy"
    And ui: I create a new Resource with email, username, password
    And ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Resource Hierarchy" tile in Admin settings
    And ui: I search for Resource Hierarchy and create a new node
    Given ui: Quick navigate to "Resource Management"
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select attributes "Resource Hierarchy" in insert columns dropdown in BPAFG
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12331
  @8.2
  Scenario: SG-12331 SPA - Error occurs when click on Ellipses and then Assignment Attributes option
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an attribute in "Assignment" tab with test data that was setup earlier and add to "Required Fields" section of Attribute Management
    And ui: I click on save button in attribute layout tab
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I click on assignment attribute
    And ui: I verify client or server error warning is not displayed
    And ui: Softassert all

  @issue=SG-12290
  @8.2
  Scenario: BPAFG project attributes files are not working right
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    # Validate File Upload and download functionalitty -  Resource
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: I select "Required Fields" section if not already selected
    And ui: I add "Upload File" section below the Required Field section
    And ui: I click on save button in attribute layout tab
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: I validate that the "File" section is present on the attribute page
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv"
    And ui: Validate that all the files are uploaded with correct extensions in Attribute Tab

    # Validate File Upload and download functionalitty -  Resource
    Given ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to Attribute Layout tab
    And ui: I select "Required Fields" section if not already selected
    And ui: I add "Upload File" section below the Required Field section
    And ui: I click on save button in attribute layout tab
    And ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I validate that the "File" section is present on the attribute page
    And ui: Upload file with extensions "doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv"
    And ui: Validate that all the files are uploaded with correct extensions in Attribute Tab

    Given ui: I navigate to "Dashboard"
    Given ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    When ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: I click on attribute entity of project
    And ui: I validate that the "File" section is present on the attribute page
    And ui: I verify client or server error warning is not displayed

  @testId=ST-2104
  @issue=SG-11971
  @owner=Rinkesh
  @9.1
  Scenario: Validate sorting for selection attribute for project
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for "3" Attributes of type:"Selection,Multi-Selection,Tags" with "5" number of selection values, "1" number of default values and create default values:"false"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    And ui: Create an Attribute of type:"Selection" using model data in "Project" tab of Attribute Management with "ascending" order and validate created order
    And ui: Create an Attribute of type:"Multi-Selection" using model data in "Project" tab of Attribute Management with "descending" order and validate created order
    And ui: Create an Attribute of type:"Tags" using model data in "Project" tab of Attribute Management with "displayed" order and validate created order

    # SPA
    When ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password

    # PM Grid
    When ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I click on columns dropdown in project list page
    And ui: I select recently created attribute of type:"Selection" from columns dropdown
    And ui: I click on columns dropdown in project list page
    And ui: I validate the attribute of type:"Selection" is displaying with "ascending" order on project list page

  @testId=ST-2104
  @issue=SG-11971
  @owner=Rinkesh
  @9.1
  Scenario: Validate sorting for selection attribute for resource
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for "3" Attributes of type:"Selection,Multi-Selection,Tags" with "5" number of selection values, "1" number of default values and create default values:"false"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    And ui: Create an Attribute of type:"Selection" using model data in "Resource" tab of Attribute Management with "descending" order and validate created order
    And ui: Create an Attribute of type:"Multi-Selection" using model data in "Resource" tab of Attribute Management with "ascending" order and validate created order
    And ui: Create an Attribute of type:"Tags" using model data in "Resource" tab of Attribute Management with "displayed" order and validate created order

    # RM Grid
    When ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on columns dropdown in project list page
    And ui: I select recently created attribute of type:"Selection" from columns dropdown
    And ui: I click on columns dropdown in project list page
    And ui: I validate the attribute of type:"Selection" is displaying with "descending" order on resource list page

  @testId=ST-2104
  @issue=SG-11971
  @owner=Rinkesh
  @9.1
  Scenario: Validate sorting for selection attribute for assignment
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for "3" Attributes of type:"Selection,Multi-Selection,Tags" with "5" number of selection values, "1" number of default values and create default values:"false"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    And ui: Create an Attribute of type:"Selection" using model data in "Assignment" tab of Attribute Management with "descending" order and validate created order
    And ui: Create an Attribute of type:"Multi-Selection" using model data in "Assignment" tab of Attribute Management with "ascending" order and validate created order
    And ui: Create an Attribute of type:"Tags" using model data in "Assignment" tab of Attribute Management with "displayed" order and validate created order

    # SPA
    When ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    When ui: Quick navigate to "Project Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Unselect all and Select specific assignment attribute of type:"Selection" in SPA
    And ui: I validate the attribute of type:"Selection" is displaying with "descending" order in SPA

    # BPAFG
    When ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Click on "Leave without saving" button in confirmation modal
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select recently created attribute of type:"Selection" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I validate the attribute of type:"Selection" is displaying with "descending" order in BPAFG

  @issue=SG-12837
  @9.1
  Scenario: Attributes - Improvement on archived fields
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "4" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Project" tab of Attribute Management
    And ui: I search for the newly created attribute and click on edit button
    And ui: I "disable" number "1" option from the list of options for the newly created attribute
    And ui: Verify if the disabled option number "1" went to last place and got StrikeThrough
    And ui: I click on save button in edit attribute section
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Project" section in Attribute Layout tab
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: I click on save button in attribute layout tab
    And ui: I navigate to "Dashboard"
    When ui: Click on "Project Management" tile in homepage
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I validate that the newly created attribute has option "1" as "disabled"
    Then ui: Softassert all

  @testId=ST-2160
  @testId=ST-2162
  @testId=ST-2165
  @issue=SG-12718
  @9.1
  Scenario: Attributes - Enable/disable the "Selection" resource attribute for Resource attribute page, RM grid, User Management
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "4" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: I search for the newly created attribute and click on edit button
    And ui: I "disable" number "1" option from the list of options for the newly created attribute
    And ui: Verify if the disabled option number "1" went to last place and got StrikeThrough
    And ui: I click on save button in edit attribute section
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: I click on save button in attribute layout tab

    # Validate disabled option on RM attribute page
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: I create a new Resource
    And ui: I validate that the newly created attribute has option "1" as "disabled"

    # Validate disabled option on RM Grid
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "disabled" on RM grid

    # Validate disabled option on User Management Grid
    And ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "User Management" tile in Admin settings
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "disabled" on RM grid

    And ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: I search for the newly created attribute and click on edit button
    And ui: I "enable" number "last" option from the list of options for the newly created attribute
    And ui: I click on save button in edit attribute section

    # Validate enabled option on RM attribute page
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Search for recently created "resource" in RM Grid and click on it
    And ui: I validate that the newly created attribute has option "1" as "enabled"

    # Validate enabled option on RM Grid
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "enabled" on RM grid

    # Validate enabled option on USer Management
    And ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "User Management" tile in Admin settings
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "enabled" on RM grid
    Then ui: Softassert all

  @testId=ST-2161
  @testId=ST-2163
  @testId=ST-2166
  @issue=SG-12718
  @9.1
  Scenario: Attributes - Enable/disable the "Multi-Selection" resource attribute for Resource attribute page, RM grid, User Management
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Multi-Selection" with "4" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: I search for the newly created attribute and click on edit button
    And ui: I "disable" number "1" option from the list of options for the newly created attribute
    And ui: Verify if the disabled option number "1" went to last place and got StrikeThrough
    And ui: I click on save button in edit attribute section
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: I click on save button in attribute layout tab

    # Validate disabled option on RM attribute page
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: I create a new Resource
    And ui: I validate that the newly created attribute has option "1" as "disabled"

    # Validate disabled option on RM Grid
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "disabled" on RM grid

    # Validate disabled option on User Management Grid
    And ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "User Management" tile in Admin settings
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "disabled" on RM grid

    And ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: I search for the newly created attribute and click on edit button
    And ui: I "enable" number "last" option from the list of options for the newly created attribute
    And ui: I click on save button in edit attribute section

    # Validate enabled option on RM attribute page
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Search for recently created "resource" in RM Grid and click on it
    And ui: I validate that the newly created attribute has option "1" as "enabled"

    # Validate enabled option on RM Grid
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Resource" "Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "enabled" on RM grid

    # Validate enabled option on USer Management
    And ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "User Management" tile in Admin settings
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: Select single attribute created earlier in RM Grid
    And ui: I validate that the newly created attribute has option "1" as "enabled" on RM grid
    Then ui: Softassert all

  @issue=SG-12823
  @owner=Devanshi
  @9.1
  Scenario: Attribute Management - Server error occur when saving changes to layout
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "Section Name"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "2" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: I search for the newly created attribute and click on edit button
    And ui: I "disable" number "1" option from the list of options for the newly created attribute
    And ui: Verify if the disabled option number "1" went to last place and got StrikeThrough
    And ui: I click on save button in edit attribute section
    And ui: I navigate to Attribute Layout tab
    And ui: I navigate to "Resource" section in Attribute Layout tab
    And ui: I add a new section to Attribute Layout tab
    Then ui: I verify client or server error warning is not displayed
    And ui: Add recently created CF to recently created section of Attribute Layout
    And ui: I click on save button in attribute layout tab
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-13065
  @9.1
  Scenario: Attribute List - when you set a default value, cannot remove it if set as required
    Given setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "4" number of selection values, "1" number of default values and create default values:"true"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Project" tab of Attribute Management
    And ui: I search for the newly created attribute and click on edit button
    And ui: I toggle the Required button as "On"
    And ui: I edit the Default value to option "2"
    And ui: I verify if the default value is updated to option "2"
    Then ui: Softassert all

  @issue=SG-13117
  @9.1
  Scenario: Progress Bar type attribute - shows as number within project or resource attribute page or workflow form instead of slider
    Given setup: Test Data "Project"
    And setup: Test Data setup for Attribute of type:"Progress Bar" with "0" number of selection values, "0" number of default values and create default values:"true"
    And setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Project" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: I verify client or server error warning is not displayed
    And ui: I select the newly created attribute if not already selected
    And ui: I verify Progress bar is default set to slider
    And ui: I click on save button in attribute layout tab

    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I verify if the Progress bar attribute shows slider
    Then ui: Softassert all

  @issue=SG-12992
  @9.1
  Scenario: Precision Numbers - cannot add decimal in attribute pages, resource or project
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Precision Number" with "0" number of selection values, "0" number of default values and create default values:"true"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an Attribute using model data in "Project" tab of Attribute Management
    And ui: I navigate to Attribute Layout tab
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout
    And ui: I click on save button in attribute layout tab
    And ui: I navigate to "Dashboard"
    When ui: Click on "Project Management" tile in homepage
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I update the recently created attribute value to "1.11111"
    And ui: I verify if the current value of CF is similar to the updated value
    Then ui: Softassert all