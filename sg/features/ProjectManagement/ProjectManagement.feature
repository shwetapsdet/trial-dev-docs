Feature: Project Management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"

  @testId=ST-1582
  @owner=Pranit
  Scenario: Verify Advance dates options (and) Verify Default capacity date range based from SPA page if CPA is form Project Allocation page (and) Verify Must be implemented to CPA- Resource Capacity & CPA-SPA
    And setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password

    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I click on cross project allocation
    Then ui: I verify current year start and end date in PM CPA section
    Then ui: I verify quick filter icon is displayed
    Then ui: I verify all quick filter options are displayed in CPA section
    And ui: I click on quick filter icon in PM CPA section
    Then ui: I click on individual quick filter options and validate projectName, start date and end date in PM CPA section
    # And ui: Softassert all

  @testId=ST-1583
  @owner=Pranit
    # Need to find solution to hit TAB button in WebDriver io to validate warning message - Reference : https://yvtkouagu0.vmaker.com/record/Mj5t9OcgY82MBIvo
  Scenario: Verify User should be able Manually enter or select start date and end date from the date picker (and) Verify End date should not be earlier than Start date - Project Management
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Demand" and assignment type "Actual"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on edit button of specific resource in "Demand" Tab
    And ui: I click on cross project allocation
    And ui: I enter current quarter start and end date in PM CPA section
    Then ui: I verify start date and end date in PM CPA section
    And ui: enter previous year end date in PM CPA section
    Then ui: I verify specific warning "Duration of date interval must be at least one day" is displayed

  @testId=ST-1576
  @issue=SG-11237
  @issue=SG-11552
  @owner=ram
  Scenario: SG-11237 - PM - When updating values directly in the grid, hitting enter and updating the below cell updates both cells
    Given setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create "2" attributes in "Project" tab of type "String,Number" without default values
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Select attributes created earlier in PM Grid
    And ui: Click on cell in row no. "1", column no. "0" in PM grid and enter value "String value 1st"
    And ui: Enter "String value 2nd" in column no. "0" in current row in PM grid
    And ui: Click on cell in row no. "1", column no. "1" in PM grid and enter value "497"
    And ui: Enter "9182" in column no. "1" in current row in PM grid
    And ui: Click on cell in row no. "1", column no. "0" in PM grid and verify its value is "String value 1st"
    And ui: Click on cell in row no. "2", column no. "0" in PM grid and verify its value is "String value 2nd"
    And ui: Click on cell in row no. "1", column no. "1" in PM grid and verify its value is "497"
    And ui: Click on cell in row no. "2", column no. "1" in PM grid and verify its value is "9,182"
    # And ui: Softassert all

    #  Test case commented due to cheerio
    # @testId=ST-1584
    # @issue=SG-11204
    # Scenario: SG-11204 - PM - Multi Selection Values are saving incorretly when updating multiple projects
    #   Given ui: I navigate to "Admin" "Settings"
    #   And ui: Click on "Attribute Management" tile in Admin settings
    #   And ui: Create "1" attributes in "Project" tab of type "Multi-Selection" with default values
    #   And ui: Create a Bool attribute and a resources list attribute in "Project" tab
    #   And ui: Create "1" regular projects with suffix in name as "_SG-11204"
    #   And ui: Quick navigate to "Project Management"
    #   And ui: Clear filters if any in PM Grid
    #   And ui: Ungroup groups if any in PM Grid
    #   And ui: I search for project "_SG-11204" in project list page
    #   And ui: Select Multi-Selection and resources lits attributes created earlier in PM Grid
    #   And ui: Select new values for Multi-Selection attributes for all projects with suffix "_SG-11204" and verify
    #   And ui: Select new values for Resources List attribute for all projects with suffix "_SG-11204" and verify

  @testId=ST-1585
  @issue=SG-10781
  Scenario: When view access to default security group is overridden, administrator can edit dates of new project
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: I navigate to "Dashboard"
    And setup: Test Data "Resource"
    And ui: I navigate to "Resource" "Management"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Admin" "Settings"
    And ui: I navigate to Project Access
    And ui: Create a rule for recently created resource, project and "Viewer" role
    And ui: I navigate to "Dashboard"
    And ui: I navigate to "Project" "Management"
    And ui: I navigate to Project
    And ui: I switch to Project Option "Allocations"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button


  @testId=ST-1586
  @issue=SG-12433
  @issue=SG-11286
  @8.2
  Scenario: SG-11286 PM/RM grid's filters are getting broken after upgrade from 7.2 to 8.0
    Given setup: Test Data "Project"

    When api: I create a default project for automation with date range as "current" year
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Created On"
    Then ui: I validate project is built within today
    Then ui: I verify client or server error warning is not displayed

    And ui: I refresh the browser
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Name"
    And ui: I enter project name
    Then ui: I validate project is displayed
    Then ui: I verify client or server error warning is not displayed

    And ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And ui: I create a new Resource
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Created On"
    Then ui: I validate resource is built within today

    And ui: I refresh the browser
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Name"
    And ui: I enter resource name
    Then ui: I validate resource is displayed

  @testId=ST-1385
  Scenario: View Management in PM grid
    Given setup: Test Data "View"
    When setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    And api: I create a default project for automation with date range as "current" year
    And ui: Quick navigate to "Project Management"
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: I click on columns dropdown in project list page
    And ui: Search for attribute "" in Columns
    And ui: Uncheck select all checkbox in Columns or Group By dropdown
    Then ui: Create new view in PM grid and select it
    And ui: I click on columns dropdown in project list page
    And ui: Search for attribute "" in Columns
    And ui: Uncheck select all checkbox in Columns or Group By dropdown
    And ui: Select "3" CF checkboxes in Columns or Group By dropdown
    And ui: Search for recently created project in PM Grid
    And ui: I click on columns dropdown in project list page
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: Click on view dropdown and select recently created view in PM Grid
    Then ui: Verify if "3" earlier selected columns are displayed in PM Grid
    Then ui: Verify if recently created project is displayed in PM Grid
    #Lock asertion
    And ui: Click on view dropdown and Lock the recently created view in PM Grid
    And ui: I search for project "Random pro1093i23" in project list page
    And ui: I click on columns dropdown in project list page
    And ui: Select "5" CF checkboxes in Columns or Group By dropdown
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: Click on view dropdown and select recently created view in PM Grid
    Then ui: Verify if recently created project is displayed in PM Grid
    Then ui: Verify if "3" earlier selected columns are displayed in PM Grid
    Then ui: Verify if last "2" earlier selected columns are not displayed in PM Grid
    #Clone assertion
    And ui: Click on view dropdown and Clone the recently created view in PM Grid
    And ui: Click on recently cloned view in PM Grid
    Then ui: Verify if "3" earlier selected columns are displayed in PM Grid
    Then ui: Verify if recently created project is displayed in PM Grid
    #Deletion assertion
    And ui: Click on view dropdown and Delete the recently cloned view in PM Grid
    And ui: Wait for 4 seconds
    And ui: Verify deletion of recently cloned view in PM Grid
    #Favourite assertion
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Logout
    And ui: I attempt to login with previous resource credentails
    And ui: I navigate to "Project" "Management"
    Then ui: Create new view in PM grid and select it
    And ui: I click on columns dropdown in project list page
    And ui: Select "3" CF checkboxes in Columns or Group By dropdown
    And ui: Search for recently created project in PM Grid
    And ui: I click on columns dropdown in project list page
    And ui: Click on view dropdown and Favourite the recently created view in PM Grid
    And ui: Click on view dropdown in PM Grid
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: I refresh the browser
    Then ui: Verify if recently created view is selected in PM Grid

    # TO-DO: Commented out as it is taking 30 mins for execution
    #   @testId=ST-1370
    # Scenario: SG-2451 - Verify Filtering in PM grid [Attribute types verified: Bool,Currency,Date,Multi-Selection,Number,Precision Number,Progress Bar,Selection,String,Tags,Text,Url]
    #     #TODO: verify for the remaining attribute types
    #     Given ui: Click on "Admin Settings" tile in homepage
    #     And ui: Click on "Attribute Management" tile in Admin settings
    #     And ui: Create all types of attributes in "Project" tab without defaults and add to "Required Fields" section of Attribute Management
    #     And ui: Create "1" projects and assign values to attributes created earlier
    #     And ui: Quick navigate to "Project Management"
    #     And ui: Ungroup groups if any in PM Grid
    #     When ui: Open filters section in PM Grid if it isn't open already
    #     Then ui: Verify Filtering in PM Grid
    # # Examples:
    #   | AttributeType |
    #   | Bool          |
    #   | Currency      |
    #   | Number        |
    #   | Progress Bar  |
    #   | Precision Number |
    #   | Date          |
    #   | String        |
    #   | Url           |
    #   | Text          |
    #   | Selection     |
    #   | Multi-Selection     |
    #   | Tags     |

  @testId=ST-1587
  @testId=ST-2030
  @issue=SG-12745
  @issue=SG-11298
  @9.0
  @9.1
  Scenario: SG-11298 Project Management - Clone and open
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I click on clone button in project attributes
    And ui: I click on save button in edit form container in project attributes
    Then ui: I verify client or server error warning is not displayed
    Then ui: I verify url containing value "Attributes"
    And ui: Quick navigate to "Project Management"
    And ui: Search for recently created project in PM Grid
    And ui: I click on meat ball icon by index "1" and select specific option "Clone" in project attributes
    And ui: I click on open on clone toggle in clone project name container in PM
    And ui: I enter cloned project name "Cloned1" in edit form container in project attributes
    And ui: I click on save button in edit form container in project attributes
    Then ui: I verify client or server error warning is not displayed
    Then ui: I verify url containing value "Allocations"

  @testId=ST-1411
  @issue=SG-11288
  @owner=Pranit
  Scenario: SG-11288 SPA: allow multilevel search for SPA
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create two resource with username, password and Administrator global role
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for two resource task in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    Then ui: I verify quick search option is displayed
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I expand "Resource" and quick search two resources and verify search results in SPA
    And ui: I click on group by dropdown and select "Task" in SPA
    Then ui: I expand "Task" and quick search two resources and verify search results in SPA
    Then ui: Softassert all


  @testId=ST-1588
  @issue=SG-12360
  @issue=SG-11288
  @issue=SG-11553
  @owner=Pranit
  @8.2
  Scenario: SG-11288 SPA: allow multilevel search for both resource and task (and) SG-11553: PM: Resource name is displayed when Task to show is set to “GENERIC” and user search for Non-generic task
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create two resource with username, password and Administrator global role
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for two resource task in SPA in Month mode for current year when dataset is "Demand" and assignment type "Actual"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on options dropdown in SPA
    And ui: Click on option: "Non-Generic" in Tasks to Show in Grid Options of SPA
    Then ui: I verify client or server error warning is not displayed
    And ui: I close options overlay in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I expand "Resource" and quick search two resources and verify search results in SPA
    And ui: I click on group by dropdown and select "Task" in SPA
    Then ui: I expand "Task" and quick search two resources and verify search results in SPA
    And ui: I click on options dropdown in SPA
    And ui: Click on option: "Generic" in Tasks to Show in Grid Options of SPA
    Then ui: I verify client or server error warning is not displayed
    And ui: I close options overlay in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I quick search two non generic task and verify resource is not displayed in SPA
    And ui: I click on group by dropdown and select "Task" in SPA
    Then ui: I quick search two non generic task and verify resource is not displayed in SPA
    And ui: I click on options dropdown in SPA
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I close options overlay in SPA
    Then ui: Softassert all

  @testId=ST-1310
  @issue=SG-11039
  @owner=Pranit
  Scenario: SG-11039 - PM/RM: attributes disappear after navigate to project update and back without any updates
    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    And ui: Create "1" attributes in "Project" tab of type "Selection" with default values
    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: Create "2" regular projects with suffix in name as "_1310"
    And ui: Quick navigate to "Project Management"
    When ui: I click on clear filter in project list page
    And ui: I click on columns dropdown in project list page
    And ui: I uncheck and select newly created attribute index "0" in columns dropdown
    And ui: I click on columns dropdown in project list page
    And ui: Search for recently created project index "0" with suffix "_1310" in PM Grid
    And ui: I edit specific attribute index "0" of specific project index "0" with suffix "_1310"
    And ui: I click on specific attribute name index "0" and selects its value index "1" in project list page edit attribute popup
    And ui: I click on save button on attribute popup that available on project list page
    And ui: Search for recently created project index "1" with suffix "_1310" in PM Grid
    And ui: I edit specific attribute index "0" of specific project index "1" with suffix "_1310"
    And ui: I click on specific attribute name index "0" and selects its value index "2" in project list page edit attribute popup
    And ui: I click on save button on attribute popup that available on project list page
    And ui: Search for recently created project index "0" with suffix "_1310" and click on it in PM Grid
    And ui: I navigate to previous window
    Then ui: I verify specific attribute name index "0" having value index "1" for specific project index "0" with suffix "_1310" in project list page
    And ui: Search for recently created project index "1" with suffix "_1310" in PM Grid
    Then ui: I verify specific attribute name index "0" having value index "2" for specific project index "1" with suffix "_1310" in project list page

  @testId=ST-1435
  @issue=SG-11293
  @owner=Pranit
  Scenario: SG-11293 Add Heatmap to Task view (leaf level in SPA )
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
    Then ui: I verify overlay heatmap for rows option is displayed in SPA grid options dialog
    Then ui: I verify overlay heatmap for groups option is displayed in SPA grid options dialog
    And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
    Then ui: I verify overlay heatmap for rows option is displayed in SPA grid options dialog
    Then ui: I verify overlay heatmap for groups option is displayed in SPA grid options dialog
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    Then ui: I verify overlay heatmap for rows option is not displayed in SPA grid options dialog
    Then ui: I verify overlay heatmap for groups option is not displayed in SPA grid options dialog
    And ui: I close options overlay in SPA
    Then ui: Softassert all

  @testId=ST-1589
  @issue=SG-11293
  @owner=Pranit
  Scenario: SG-11293 Must not be able to disable both heatmaps at the same time (and) Must be able to use both heatmaps at the same time.
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for rows option to "Off" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "Off" in SPA grid options dialogs
    Then ui: I verify overlay heatmap for rows option is toggled ON in SPA grid options dialog
    And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "Off" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for rows option to "Off" in SPA grid options dialogs
    Then ui: I verify overlay heatmap for groups option is toggled ON in SPA grid options dialog
    And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
    And ui: I toggle overlay heatmap for rows option to "Off" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I close options overlay in SPA
    #Must work to different Modes of Entry. (Time, cost, FTE, FTE%, Manday)
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: Click on resource expand icon
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#FFAD91" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Task" in SPA
    And ui: Click on resource or task "Generic" expand icon
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#E3E6EB" in SPA for current year when dataset is "Allocation"
    #The colors of the overlay heatmap must change depending on the granularities selected. (Day, Week, Month, Quarter, Fiscal Month, Fiscal Quarter)
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I select specific date mode "Day" and verify specific cell "2" heatmap color "#FFAD91" in SPA for current year when dataset is "Allocation"
    Then ui: I select specific date mode "Week,Month,Quarter,Project" and verify specific cell "1" heatmap color "#FFAD91" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Task" in SPA
    Then ui: I select specific date mode "Day" and verify specific cell "2" heatmap color "#E3E6EB" in SPA for current year when dataset is "Allocation"
    Then ui: I select specific date mode "Week,Month,Quarter,Project" and verify specific cell "1" heatmap color "#E3E6EB" in SPA for current year when dataset is "Allocation"
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: I close options overlay in SPA
    # Then ui: Softassert all

  @testId=ST-1590
  @issue=SG-11293
  @owner=Pranit
  Scenario: SG-11293 It Must work both groupings by resource and task (and) Must apply the overlay heatmap to rows only when the 'Overlay Heatmap for rows' is enabled
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "Off" in SPA grid options dialogs
    And ui: I close options overlay in SPA
    #Must work to different Modes of Entry. (Time, cost, FTE, FTE%, Manday)
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: Click on resource expand icon
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#F4F4F4" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Task" in SPA
    And ui: Click on resource or task "Generic" expand icon
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#FFAD91" in SPA for current year when dataset is "Allocation"
    #The colors of the overlay heatmap must change depending on the granularities selected. (Day, Week, Month, Quarter, Fiscal Month, Fiscal Quarter)
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I select specific date mode "Day" and verify specific cell "2" heatmap color "#F4F4F4" in SPA for current year when dataset is "Allocation"
    Then ui: I select specific date mode "Week,Month,Quarter,Project" and verify specific cell "1" heatmap color "#F4F4F4" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Task" in SPA
    Then ui: I select specific date mode "Day" and verify specific cell "2" heatmap color "#FFAD91" in SPA for current year when dataset is "Allocation"
    Then ui: I select specific date mode "Week,Month,Quarter,Project" and verify specific cell "1" heatmap color "#FFAD91" in SPA for current year when dataset is "Allocation"
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Off" in SPA grid options dialog
    And ui: I close options overlay in SPA
    # Then ui: Softassert all

  @testId=ST-1591
  @issue=SG-11610
  @issue=SG-11608
  Scenario: SG-11610 PM - Client error is displayed when new project is created with date mode “Day or Week” and then user click on Gantt tab in SPA
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"

    When ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: I select specific date mode "Day" in SPA
    And ui: I click on specific unit "Gantt" in SPA
    Then ui: I verify client or server error warning is not displayed
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Week" in SPA
    And ui: I click on specific unit "Gantt" in SPA
    Then ui: I verify client or server error warning is not displayed
    #SG-11608: BPAFG - Server error is displayed when task line is moved in Gantt tab
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate specific "0,100,100,100,100,100,100,100,100,100,100,100,100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and next year start date as End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I dragdrop from cell "3" to cell "1" in BPAFG gantt tab
    # Then ui: I verify client or server error warning is not displayed

  @testId=ST-1503
  @issue=SG-11724
  Scenario: SG-11724 - User should be able to update start and end dates in PM grid for projects that don't have dates defined
    Given setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Quick navigate to "Project Management"
    And ui: I click on columns dropdown in project list page
    And ui: Search for attribute "" in Columns
    And ui: I uncheck and select attributes "Start Date,End Date" in columns dropdown
    And ui: I click on columns dropdown in project list page
    And ui: Search for recently create project in PM grid
    And ui: Double-click on cell of column:"Start Date" of recently created project in PM grid
    And ui: Enter or select value as:"01.01.2024" for column type:"Date" while editing attribute in PM grid and save it
    And ui: Softassert specific warning "Start date has to be before end date. Please select a different date." is not displayed
    And ui: Double-click on cell of column:"End Date" of recently created project in PM grid
    And ui: Enter or select value as:"25.01.2024" for column type:"Date" while editing attribute in PM grid and save it
    And ui: SoftAssert if attribute:"Start Date" has value:"01.01.2024" for recently create project in PM grid
    And ui: SoftAssert if attribute:"End Date" has value:"25.01.2024" for recently create project in PM grid

    Then ui: Softassert all

  @testId=ST-1526
  @issue=SG-11758
  Scenario:  Project Management Filters - Validate when switching name filter to selection field, error donot occur
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    When ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Name"
    And ui: I enter project name
    And ui: I change filter from "Name" to "Is Proposal"
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-1581
  @issue=SG-11636
  Scenario: PM/RM Filtering - Validate when searching on a value, and close dropdown, search is retained
    Given ui: Quick navigate to "Project Management"
    When ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Security Group"
    And ui: I select "belongs to" as an filter option for filter "Security Group" and set value as default
    Then ui: I validate value "Default" for "belongs to" as an filter option for filter "Security Group" is not changed

  @testId=ST-1534
  @issue=SG-11462
  Scenario: Got an error when releasing a new project that doesn't have allocation dates.
    Given setup: Test Data "Project"
    When ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Release button in SPA and wait for Checkout button
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-1540
  @issue=SG-11511
  Scenario: No client error should be displayed when exporting from PM grid
    Given setup: Test Data "SoftAssert"

    When ui: Quick navigate to "Project Management"
    And ui: Remove a directory as:"ST-1540_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1540_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1540_Downloads" in projects's root directory
    And ui: Click on export icon in PM Grid

    Then ui: Softassert if client error is not displayed
    Then ui: Softassert if PM Grid exported file got downloaded in directory:"ST-1540_Downloads" under project's root directory

    Then ui: Softassert all


  @testId=ST-1537
  @issue=SG-11325
  Scenario: PM/RM Grid - "No Value" should get deselected with other boolean values when trying to change boolean values
    Given ui: Quick navigate to "Admin Settings"
    When ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create "1" attributes in "Project" tab of type "Bool" with default values
    And ui: Create "1" regular projects with suffix in name as "_SG-11325"
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I search for project "_SG-11325" in project list page
    And ui: Select attributes created earlier in PM Grid
    And ui: Update value for bool selection as "Yes,No,Yes,No,Not set,Yes,Not set" for latest projects with suffix "_SG-11325"
    And ui: I click on save button on attribute popup that available on project list page
    And ui: I verify the updated value for bool selection as "Not set" for latest projects with suffix "_SG-11325"

  @issue=SG-12427
  @owner=Devanshi
  @8.2
  Scenario: SPA - error occurs when replacing a resource
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I click on Resource Replace Button
    And ui: I select Administrator resource
    And ui: I click on Replace Resource and verify resource is replaced
    Then ui: I verify client or server error warning is not displayed

  @tesId=ST-2029
  @issue=SG-12118
  @owner=Devanshi
  @9.0
  Scenario: Clone Project with 7 working days week without clear allocation
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Management"
    When ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Day" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for resource to project in SPA in Month mode for "current" quarter when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Attributes"
    And ui: I click on clone button in project attributes
    And ui: I click on save button in edit form container in project attributes
    Then ui: I verify url containing value "Attributes"
    And ui: Quick navigate to "Project Management"
    And ui: Search for recently created project in PM Grid
    And ui: I click on meat ball icon by index "1" and select specific option "Clone" in project attributes
    And ui: I click on open on clone toggle in clone project name container in PM
    And ui: I enter cloned project name "Cloned1" in edit form container in project attributes
    And ui: I click on save button in edit form container in project attributes
    Then ui: I verify url containing value "Allocations"

  @testId=ST-2046
  @testId=ST-2048
  @testId=ST-2053
  @issue=SG-12623
  @9.0
  @9.0.1
  Scenario: Add/Update Allocation in Different granularities and modes of entry for 5/7 days work week allocation project, validate with respect to Timesheet approver
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "20" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    # Add Allocation for 5 working days
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter Start date as "01.03.2025" and End date as "31.03.2025" in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: Allocate "126" hour for resource to project in SPA in Month mode for the dates between "01.03.2025" and "31.03.2025" when dataset is "Allocation" and assignment type "Planned"

    # Validate Cost/FTE/FTE% in Date mode as Day/Week/Month for 5 working days
    And ui: I click on specific unit "Cost" in SPA
    And ui: I select specific date mode "Day" in SPA
    Then ui: I click on specific unit as "Cost", specific date mode as "Day" and verify correct value is displayed for allocation for weekend as "Off"
    And ui: I select specific date mode "Week" in SPA
    Then ui: I click on specific unit as "Cost", specific date mode as "Week" and verify correct value is displayed for allocation for weekend as "Off"
    And ui: I click on specific unit "FTE" in SPA
    And ui: I select specific date mode "Week" in SPA
    Then ui: I click on specific unit as "FTE", specific date mode as "Week" and verify correct value is displayed for allocation for weekend as "Off"
    And ui: I select specific date mode "Month" in SPA
    Then ui: I click on specific unit as "FTE", specific date mode as "Month" and verify correct value is displayed for allocation for weekend as "Off"
    And ui: I click on specific unit "FTE %" in SPA
    And ui: I select specific date mode "Week" in SPA
    Then ui: I click on specific unit as "FTE %", specific date mode as "Week" and verify correct value is displayed for allocation for weekend as "Off"
    And ui: I select specific date mode "Month" in SPA
    Then ui: I click on specific unit as "FTE %", specific date mode as "Month" and verify correct value is displayed for allocation for weekend as "Off"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    # Update working weekend toggle as On
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    # Update Allocation for 7 working days
    And ui: Quick navigate to "Project Management"
    And ui: I navigate to Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select specific date mode "Day" in SPA
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: I enter allocation value as "6" for weekends between date range from "01.03.2025" to "10.03.2025" in SPA

    # Validate Cost/FTE/FTE% in Date mode as Day/Week/Month for 7 working days
    And ui: I click on specific unit "Cost" in SPA
    And ui: I select specific date mode "Week" in SPA
    Then ui: I click on specific unit as "Cost", specific date mode as "Week" and verify correct value is displayed for allocation for weekend as "On"
    And ui: I click on specific unit "FTE" in SPA
    And ui: I select specific date mode "Week" in SPA
    Then ui: I click on specific unit as "FTE", specific date mode as "Week" and verify correct value is displayed for allocation for weekend as "On"
    And ui: I select specific date mode "Month" in SPA
    Then ui: I click on specific unit as "FTE", specific date mode as "Month" and verify correct value is displayed for allocation for weekend as "On"
    And ui: I click on specific unit "FTE %" in SPA
    And ui: I select specific date mode "Week" in SPA
    Then ui: I click on specific unit as "FTE %", specific date mode as "Week" and verify correct value is displayed for allocation for weekend as "On"
    And ui: I select specific date mode "Month" in SPA
    Then ui: I click on specific unit as "FTE %", specific date mode as "Month" and verify correct value is displayed for allocation for weekend as "On"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    Then ui: Softassert all

  @issue=SG-12476
  @9.0
  Scenario: Multiple clicks on context menu in SPA leads to errors
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I select specific date mode "Day" in SPA
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I select specific date mode "Month" in SPA
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I select specific date mode "Day" in SPA
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I select specific date mode "Month" in SPA
    # Validation wont work due to existing minor bug-SG-12487
    # Then ui: I verify client or server error warning is not displayed
    Then ui: Softassert all

  @issue=SG-12435
  @9.0
  Scenario: SPA - error when deleting in bulk
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: I select specific date mode "Day" in SPA
    And ui: I select all allocation and delete them
    # Validation wont work due to existing minor bug-SG-12487
    # Then ui: I verify client or server error warning is not displayed
    Then ui: Softassert all

  @9.0
  @issue=SG-12571
  @owner=Devanshi
  Scenario: SPA - cannot update Assignment attributes
    Given setup: Test Data "Project"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    When setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"true"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create an attribute in "Assignment" tab with test data that was setup earlier and add to "Required Fields" section of Attribute Management

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Unselect all and Select specific assignment attributes in SPA
    And ui: I update dominant unit value to non dominant unit value in assignment
    # Validation wont work due to existing minor bug-SG-12487
    # Then ui: I verify client or server error warning is not displayed

  @issue=SG-12586
  @owner=Devanshi
  @9.0
  Scenario: SPA - rearranging resources or task causes client side error
    Given setup: Test Data "Project"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: I click on Add Assignment
    And ui: I validate Bulk Assignment Dialog Open
    And ui: I click on select all resource checkbox
    And ui: I add all the selected resources to Project
    And ui: I rearrange resources by sorting them in ascending and descending order
    # Validation wont work due to existing minor bug-SG-12487
    # Then ui: I verify client or server error warning is not displayed

  @testId=SG-12499
  @issue=SG-12779
  @owner=Devanshi
  @9.1
  Scenario: PM Gantt: Grouping & Views
    Given setup: Test Data "View"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Quick navigate to "Project Management"
    And ui: Click on "gantt" tab in Project Management
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: I click on columns dropdown in Project Gantt Tab
    And ui: Search for attribute "" in Columns
    And ui: Uncheck select all checkbox in Columns or Group By dropdown

    And ui: Click on "gantt" tab in Project Management
    Then ui: Create new view in PM grid and select it
    And ui: Search for recently created project in PM Grid
    Then ui: Verify if recently created project is displayed in PM Gantt Tab
    And ui: I click on columns dropdown in Project Gantt Tab
    # And ui: Search for attribute "" in Columns
    # And ui: Uncheck select all checkbox in Columns or Group By dropdown  ##commented due to bugTicket SG-12821
    And ui: Select "1" CF checkboxes in Columns or Group By dropdown in Gantt
    And ui: I click on columns dropdown in Project Gantt Tab
    And ui: I verify client or server error warning is not displayed
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: Click on view dropdown and select recently created view in PM Grid
    Then ui: Verify if "1" earlier selected columns are displayed in PM Gantt Tab

    #Lock asertion
    And ui: Click on view dropdown and Lock the recently created view in PM Grid
    And ui: I click on columns dropdown in Project Gantt Tab
    And ui: Select "1" CF checkboxes in Columns or Group By dropdown in Gantt
    Then ui: Verify if "1" earlier selected columns are displayed in PM Gantt Tab
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: Click on view dropdown and select recently created view in PM Grid
    And ui: I verify client or server error warning is not displayed
    Then ui: Verify if last "1" earlier selected columns are not displayed in PM Grid

    #Clone assertion
    And ui: Click on view dropdown and Clone the recently created view in PM Grid
    And ui: Click on recently cloned view in PM Grid
    Then ui: Verify if "1" earlier selected columns are displayed in PM Gantt Tab

    #Deletion assertion
    And ui: Click on view dropdown and Delete the recently cloned view in PM Grid
    And ui: Wait for 4 seconds
    And ui: Verify deletion of recently cloned view in PM Grid

    #Favourite assertion
    And setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Logout
    And ui: I attempt to login with previous resource credentails
    And ui: I navigate to "Project" "Management"
    And ui: Click on "gantt" tab in Project Management
    Then ui: Create new view in PM grid and select it
    And ui: I click on columns dropdown in Project Gantt Tab
    And ui: Select "3" CF checkboxes in Columns or Group By dropdown in Gantt
    And ui: Search for recently created project in PM Grid
    Then ui: Verify if recently created view is selected in PM Grid
    And ui: I click on columns dropdown in Project Gantt Tab
    And ui: Click on view dropdown and Favourite the recently created view in PM Grid
    And ui: Click on view dropdown in PM Grid
    And ui: Click on view dropdown and select "Default" view in PM Grid
    And ui: I refresh the browser

  @issue=SG-12730
  @owner=Devanshi
  @9.1
  Scenario: Client error when click on Attribute , Filemanagement either from tooltip from PM or from project pages dropdown.
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Miscellaneous" tab in General Settings
    And ui: I toggle Advanced Tooltips to "On" in General Settings in Miscellaneous Tab
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    Then ui: Wait for Save button in GS to be clickable again
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Project Management"
    And ui: Search for recently created project in PM Grid
    And ui: I hover on recently created project and click on "Attributes"
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Project Management"
    And ui: Search for recently created project in PM Grid
    And ui: I hover on recently created project and click on "File Management"
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2130
  @issue=SG-12812
  @issue=SG-12509
  @owner=Devanshi
  @9.1
  Scenario: Check enable and disable Advanced tooltip option.
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Miscellaneous" tab in General Settings
    And ui: I toggle Advanced Tooltips to "On" in General Settings in Miscellaneous Tab
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    Then ui: Wait for Save button in GS to be clickable again
    Given setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Search for recently created project in PM Grid
    And ui: I hover on recently created project and click on "Attributes"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Allocations"
    Then ui: I verify client or server error warning is not displayed
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Audit Log"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Build Team"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Financials"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "File Management"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Milestones"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Schedule"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Sheets"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and click on "Snapshots"
    And ui: I navigate to previous window
    And ui: I hover on recently created project and copy the project link
    And ui: I hover on recently created project and click on the project
    Then ui: I verify specific project name created using model is displayed
    When setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: I navigate to previous window
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I search for resource in resource list page
    And ui: I hover on recently created resource and click on "Attributes & Identity"
    And ui: I navigate to previous window
    And ui: I hover on recently created resource and click on "Audit Log"
    And ui: I navigate to previous window
    And ui: I hover on recently created resource and click on "Capacity"
    And ui: I navigate to previous window
    And ui: I hover on recently created resource and click on "Sheets"
    And ui: I navigate to previous window
    And ui: I hover on recently created resource and click on "Skill Matrix"
    And ui: I navigate to previous window
    And ui: I hover on recently created resource and click on "File Management"
    And ui: I navigate to previous window
    And ui: I hover on recently created resource and copy the resource link
    And ui: I hover on recently created resource and click on the resource
    Then ui: I verify specific resource name created using model is displayed

  @testId=SG-12691
  @9.1
  Scenario: Allocation tab is failing with direct navigation to project
    And ui: Quick navigate to "Project Management"
    Given setup: Test Data "Project"
    Then ui: I create a new Regular Project
    And ui: I get the URL of the recently created project
    And ui: I click on logo to navigate to homepage
    And ui: I navigate directly to allocation tab using the link
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12830
  @9.1
  Scenario: SG-12830: Allow to choose based on what we show Heatmap (Base or Net capacity)
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Heatmap" tab in General Settings
    And ui: I toggle "On" the Net capacity button
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    And ui: Wait for Save button in GS to be clickable again
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Admin Time" tile in Admin settings
    And ui: I enter Admin Time Type and create
    And ui: Quick navigate to "Resource Management"
    When ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Month" in Resource capacity
    And ui: I select Admin Time Type
    And ui: Enter Base Capacity as:"168" in "Mar 24" for month mode in Resource Capacity
    And ui: Enter Admin Time Type as:"100" in "Mar 24" for month mode in Resource Capacity
    And ui: I click on save button
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "10" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
    And ui: I close options overlay in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I select specific date mode "Month" and verify specific cell "4" heatmap color "#F4F4F4" in SPA for current year when dataset is "Allocation"

    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Heatmap" tab in General Settings
    And ui: I toggle "Off" the Net capacity button
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    And ui: Wait for Save button in GS to be clickable again

    And ui: Search for Project in global search and click on it
    Then ui: I select specific date mode "Month" and verify specific cell "4" heatmap color "#F4F4F4" in SPA for current year when dataset is "Allocation"

  @issue=SG-13074
  @9.1
  Scenario: SPA Heatmap - calculate heatmap using base capacity is incorrect when resource has 0 net capacity
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Heatmap" tab in General Settings
    And ui: I toggle "Off" the Net capacity button
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    And ui: Wait for Save button in GS to be clickable again
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Admin Time" tile in Admin settings
    And ui: I enter Admin Time Type and create
    And ui: Quick navigate to "Resource Management"
    When ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Month" in Resource capacity
    And ui: I select Admin Time Type
    And ui: Enter Base Capacity as:"168" in "Mar 24" for month mode in Resource Capacity
    And ui: Enter Admin Time Type as:"168" in "Mar 24" for month mode in Resource Capacity
    And ui: I click on save button
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "10" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource" in SPA grid options dialog
    And ui: I close options overlay in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    Then ui: I select specific date mode "Month" and verify specific cell "4" heatmap color "#F4F4F4" in SPA for current year when dataset is "Allocation"
