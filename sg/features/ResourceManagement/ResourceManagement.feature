Feature: Resource Management

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage

  @testId=ST-1570
  @owner=Pranit
  Scenario: Verify Advance dates options (and) Verify Default capacity date range if CPA is from Resource Capacity page (and) Verify start date and end date field on CPA section to be used as filter of Advance Date option
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for resource to project in SPA in Month mode for "current" quarter when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Resource Management"
    And ui: Search for recently created "resource" in RM Grid
    And ui: I click on the resource created in RM Grid
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: Click on dataset dropdown and select "allocation" in CPA
    And ui: I select specific assignment Type "planned" in CPA
    Then ui: I verify all quick filter options are displayed in CPA section
    And ui: I click on quick filter icon in CPA section
    Then ui: I click on individual quick filter options and validate projectName, start date and end date in CPA
    Then ui: Softassert all

  @testId=ST-1583
  @issue=SG-10974
  Scenario: Verify User should be able Manually enter or select start date and end date from the date picker (and) Verify End date should not be earlier than Start date in Resource Management
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Resource Management"
    And ui: I search for resource in global search and click on it
    When ui: Click on "Capacity tab"
    And ui: turn on has capacity toggle "On"
    And ui: Click on dataset dropdown and select "Allocation" in CPA
    And ui: I select specific assignment Type "Planned" in CPA
    And ui: I enter specific "Next" year start and end date in CPA
    Then ui: I verify "Next" year start and end date in CPA
    And ui: I click on save button
    And ui: Enter "Previous" year end date in CPA
    Then ui: I verify specific warning "Duration of date interval must be at least one day" is displayed

  @testId=ST-1280
  Scenario: SG-10462 Add an option to display NUMBER of concurrent projects in the grid (and) Validate Must have a new dropdown option for grid mode that includes options Net Availability, Capacity, Allocations, and Project Count at Net Availability page. (and) Validate When Project Count is clicked, the Options button must be hidden at Net availability page.
    Given ui: I navigate to "Resource" "Management"
    When ui: Click on Net Availability tab in RM grid
    And ui: I click on availability dropdown in netavailability tab
    Then ui: I verify specific option "Net Availability,Capacity,Allocations,Project Count" is displayed in availability dropdown in netavailability tab
    And ui: I click on availability dropdown in netavailability tab
    And ui: I select specific option "Project Count" in availability dropdown in netavailability tab
    Then ui: I verify options is not displayed in netavailability tab
    And ui: I select specific option "Net Availability" in availability dropdown in netavailability tab
    Then ui: I verify options is displayed in netavailability tab

  @testId=ST-1572
  Scenario: Validate When Net Availability is clicked, overlay heatmap and show only fields must be displayed on the Options modal at Net availability page (and) Validate When Capacity is clicked, the show only field must be displayed on the Options modal at Net availability page (and) Validate When Allocation is clicked, Show only fields must be displayed on Options modal at Net availability page.
    Given ui: I navigate to "Resource" "Management"
    When ui: Click on Net Availability tab in RM grid
    And ui: I select specific option "Capacity" in availability dropdown in netavailability tab
    And ui: I click on options button in netavailability tab
    Then ui: I verify overlay heatmap is not displayed in netavailability tab
    Then ui: I verify show only is displayed in netavailability tab
    And ui: I close options overlay in netavailability tab
    And ui: I select specific option "Allocations" in availability dropdown in netavailability tab
    And ui: I click on options button in netavailability tab
    Then ui: I verify overlay heatmap is not displayed in netavailability tab
    Then ui: I verify show only is displayed in netavailability tab
    And ui: I close options overlay in netavailability tab
    And ui: I select specific option "Net Availability" in availability dropdown in netavailability tab
    And ui: I click on options button in netavailability tab
    Then ui: I verify overlay heatmap is displayed in netavailability tab
    Then ui: I verify show only is displayed in netavailability tab

  @testId=ST-1573
  Scenario: Validate Must display the correct project count to different combinations at Net Availability page
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Resource" "Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I select specific option "Project Count" in availability dropdown in netavailability tab
    And ui: I clear filters in RM netavailability tab
    And ui: Un-select all attributes in Columns dropdown of Net Availability section of RM Grid
    And ui: I search for resource created using model in RM netavailability tab
    And ui: I select plan type "Allocation" in RM netavailability tab
    And ui: I select assignment type "Planned" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: I enter current year start and end date in RM netavailability tab
    Then ui: I click on specific unit "time,cost,fte,fte-percent,manday" and verify column index "1" value "1" is displayed in RM netavailability tab
    Then ui: I select specific date mode "Day,Week,Month,Quarter,Year" and verify column index "0" value "1,1,1,1,1" is displayed in RM netavailability tab

  @testId=ST-1345
  @issue=SG-11237
  @issue=SG-11552
  @owner=ram
  Scenario: SG-11237 - RM - When updating values directly in the grid, hitting enter and updating the below cell updates both cells
    Given setup: Test Data "SoftAssert"
    Given ui: I navigate to "Admin" "Settings"
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create "2" attributes in "Resource" tab of type "String,Number" without default values
    And ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Select attributes created earlier in RM Grid
    And ui: Click on cell in row no. "1", column no. "0" in RM grid and enter value "String value 1st"
    And ui: Enter "String value 2nd" in column no. "0" in current row in RM grid
    And ui: Click on cell in row no. "1", column no. "1" in RM grid and enter value "497"
    And ui: Enter "9182" in column no. "1" in current row in RM grid
    And ui: Click on cell in row no. "1", column no. "0" in RM grid and verify its value is "String value 1st"
    And ui: Click on cell in row no. "2", column no. "0" in RM grid and verify its value is "String value 2nd"
    And ui: Click on cell in row no. "1", column no. "1" in RM grid and verify its value is "497"
    And ui: Click on cell in row no. "2", column no. "1" in RM grid and verify its value is "9,182"
    # And ui: Softassert all

  @testId=ST-1272
  Scenario: Validate advance date picker added at Resource Net Availability page (and) Validate options Current Qtr, Next Qtr, Current Year, Next Year, YTD, 3 years showing when click on advanced date picker at resource net availability page.
    Given setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Resource Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I select specific option "Net Availability" in availability dropdown in netavailability tab
    And ui: I select plan type "Allocation" in RM netavailability tab
    And ui: I select assignment type "Planned" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: I click on quick filter icon in RM netavailability tab
    Then ui: I verify all quick filter options are displayed in RM netavailability tab
    Then ui: Softassert all

  @testId=ST-1272
  Scenario: SG-10957 Add advance date picker for Resource NA
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Resource" "Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I select specific option "Net Availability" in availability dropdown in netavailability tab
    And ui: I search for resource created using model in RM netavailability tab
    And ui: I select plan type "Allocation" in RM netavailability tab
    And ui: I select assignment type "Planned" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: I click on quick filter icon in RM netavailability tab
    Then ui: I verify all quick filter options are displayed in RM netavailability tab
    And ui: I click on quick filter icon in RM netavailability tab
    Then ui: I click on individual quick filter options and validate resource created using model, start date and end date in RM netavailability tab
    Then ui: Softassert all

  @testId=ST-1574
  Scenario: SG-10462 Validate When a cell with project count is clicked, projects connected to the resource and allocation details, and percentage must be displayed at Net availability page (and) Validate user redirected to project page on click on the project name under project count at Net availability page
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Demand" and assignment type "Actual"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Resource" "Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I select specific option "Project Count" in availability dropdown in netavailability tab
    And ui: I clear filters in RM netavailability tab
    And ui: Wait for 1 second

    And ui: I search for resource created using model in RM netavailability tab
    And ui: I select plan type "Demand" in RM netavailability tab
    And ui: I select assignment type "Actual" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: Ungroup groups if any in Net Availability section of RM Grid
    And ui: I enter current year start and end date in RM netavailability tab
    And ui: I click on specific column index "1" in RM netavailability tab
    Then ui: I verify specific project name created using model is displayed in allocation popup in RM netavailability tab
    And ui: I click on specific project name created using model in allocation popup in RM netavailability tab
    Then ui: I verify specific project name created using model is displayed
    And ui: I navigate to previous window by clicking on browser back button
    And ui: I search for resource created using model in RM netavailability tab
    Then ui: I verify specific resource created using model is displayed in netavailability tab
    And ui: I click on specific column index "1" in RM netavailability tab
    Then ui: I verify allocation hours "100.00" is displayed in allocation popup in RM netavailability tab
    Then ui: I verify utilization "100.00" is displayed in allocation popup in RM netavailability tab

  @testId=ST-1575
  Scenario: Validate Must display a hyperlink tooltip when hovering over the project name under project count at Net availability page (and) Validate Must be able to use copy link function under project count at Net availability page.
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Resource" "Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I select specific option "Project Count" in availability dropdown in netavailability tab
    And ui: I clear filters in RM netavailability tab
    And ui: I search for resource created using model in RM netavailability tab
    And ui: I select plan type "Allocation" in RM netavailability tab
    And ui: I select assignment type "Planned" in RM netavailability tab
    And ui: I select specific date mode "Month" in RM netavailability tab
    And ui: I click on specific unit "time" in RM netavailability tab
    And ui: Ungroup groups if any in Net Availability section of RM Grid
    And ui: I enter current year start and end date in RM netavailability tab
    And ui: I click on specific column index "1" in RM netavailability tab
    Then ui: I mouse hower project name created using model in allocation popup and verify hyperlink tooltip in RM netavailability tab
    Then ui: I mouse hower project name created using model in allocation popup and verify copy link in RM netavailability tab
    #Then ui: I click and verify copied tooltip in allocation popup in RM netavailability tab
    Then ui: I click and verify export in RM netavailability tab

    # Test case commented due to cheerio
    # @testId=ST-1578
    # @issue=SG-11204
    # Scenario: SG-11204 - PM - Multi Selection Values are saving incorretly when updating multiple resources
    #   Given setup: Test Data "SoftAssert"
    #   When ui: Click on "Admin Settings" tile in homepage
    #   And ui: Click on "Attribute Management" tile in Admin settings
    #   And ui: Create "1" attributes in "Resource" tab of type "Multi-Selection" with default values
    #   And ui: Create a Bool attribute and a resources list attribute in "Resource" tab
    #   And ui: Create "2" resources with suffix in name as "_SG-11204"
    #   And ui: Quick navigate to "Resource Management"
    #   And ui: Clear filters if any in RM Grid
    #   And ui: Ungroup groups if any in RM Grid
    #   And ui: I search for resource "_SG-11204" in resource list page
    #   #Needed for search results to appear
    #   And ui: Wait for 4 seconds
    #   And ui: Select Multi-Selection and resources lits attributes created earlier in RM Grid
    #   And ui: Select new values for Multi-Selection attributes for all resources with suffix "_SG-11204" and verify
    #   And ui: Select new values for Resources List attribute for all resources with suffix "_SG-11204" and verify
    #   Then ui: Softassert all


  @testId=ST-1579
  @issue=SG-10748
  Scenario: CPA (RM and SPA) - add a dates inputs to show only current projects
    Given setup: Test Data "SoftAssert"
    When ui: I navigate to "Resource" "Management"
    And setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: Logout
    And ui: I login with "resource" account
    And ui: I navigate to "Project" "Management"
    And setup: Test Data "Project"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "administrator" account
    And ui: I navigate to "Resource" "Management"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: Click on dataset dropdown and select "allocation" in CPA
    And ui: I select specific assignment Type "planned" in CPA
    And ui: Enter current year as date for the project in CPA
    And ui: I verify all quick filter options are displayed in CPA section
    And ui: I click on quick filter icon in CPA section
    And ui: I click on individual quick filter options and validate "", "", start date and end date in CPA
    And ui: I select specific assignment Type "actual" in CPA
    And ui: Enter current year as date for the project in CPA
    And ui: I verify all quick filter options are displayed in CPA section
    And ui: I click on quick filter icon in CPA section
    And ui: I click on individual quick filter options and validate "", "", start date and end date in CPA
    And ui: Softassert all

    # DISABLED UNTIL getTextFromAllChildElements METHOD WORKS PROPERLY
    # @testId=ST-1384
    # Scenario: SG-2451 - Verify Grouping in RM grid [Attribute types verified: Bool,Currency,Date,Multi-Selection,Number,Precision Number,Progress Bar,Selection,String,Tags,Text,Url]
    #   #TODO: verify for the remaining attribute types
    #   Given setup: Test Data "SoftAssert"
    #   Given ui: Click on "Admin Settings" tile in homepage
    #   And ui: Click on "Attribute Management" tile in Admin settings
    #   And ui: Create all types of attributes in "Resource" tab without defaults and add to "Required Fields" section of Attribute Management
    #   And ui: Create "1" resources and assign values to attributes created earlier
    #   And ui: Quick navigate to "Resource Management"
    #   And ui: Ungroup groups if any in RM Grid
    #   And ui: Clear filters if any in RM Grid
    #   Then ui: SoftAssert Grouping in RM Grid
    #   And ui: Softassert all

  @testId=ST-1580
  @issue=SG-12321
  @issue=SG-12765
  @owner=Pranit
  @9.1
  @8.2
  Scenario: SG-11298 Resource Management - Clone and open
    Given setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: I click on clone button in resource attributes
    And ui: I click on save button in edit form container in resource attributes
    Then ui: I verify client or server error warning is not displayed
    Then ui: I verify url containing value "resource/update"
    And ui: Quick navigate to "Resource Management"
    And ui: I search for resource in resource list page
    And ui: I click on meat ball icon by index "1" and select specific option "Clone" in resource list page
    And ui: I click on open on clone toggle in clone resource name container in RM
    And ui: I enter cloned resource name "Cloned1" in edit form container in resource list page
    Then ui: I verify client or server error warning is not displayed
    And ui: I click on save button in edit form container in resource attributes
    # Then ui: I verify url containing value "resource/update"

  @testId=ST-1489
  @issue=SG-11691
  Scenario: RMNA - Demand Planning Resources should have 0 capacity in grid and an icon against the name depicting that the resource is a Demand Planning one
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data setup for Attribute of type:"Selection" with "3" number of selection values, "1" number of default values and create default values:"false"

    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings

    And ui: Create an Attribute using model data in "Resource" tab of Attribute Management
    And ui: Add recently created CF to "Required Fields" section of Attribute Layout

    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: Turn "On" Is demand planning resource toggle button in Resource Capacity tab
    And ui: I enter and save resource current year start and end date in capacity tab

    And ui: Quick navigate to "Resource Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I enter current year start and end date in RM netavailability tab
    And ui: I clear filters in RM netavailability tab
    And ui: Click on Group By dropdown in Net Availability section of RM Grid
    And ui: Unselect select all checkbox in Group By dropdown in Net Availability section of RM Grid
    And ui: Select recently created resource CF in Net Availability section of RM Grid
    And ui: Click on Group By dropdown in Net Availability section of RM Grid
    And ui: I search for resource created using model in RM netavailability tab
    And ui: Wait for 1 second
    And ui: Click on expand icon of resource CF in Net Availability section of RM Grid

    Then ui: Verify if Demand planning icon is displayed in Net Availability of RM Grid
    Then ui: Verify if "0" columns have value:"12" in Net Availability of RM Grid

    And ui: Click on specific unit "Cost" in Net Availability of RM Grid
    Then ui: Verify if "" columns have value:"12" in Net Availability of RM Grid

    And ui: Click on specific unit "FTE" in Net Availability of RM Grid
    Then ui: Verify if "0" columns have value:"12" in Net Availability of RM Grid

    And ui: Click on specific unit "FTE %" in Net Availability of RM Grid
    Then ui: Verify if "0" columns have value:"12" in Net Availability of RM Grid

    And ui: Click on specific unit "Manday" in Net Availability of RM Grid
    Then ui: Verify if "0" columns have value:"12" in Net Availability of RM Grid

    Then ui: Softassert all

  @testId=ST-1521
  @issue=SG-11776
  @owner=Vivek
  Scenario: Resource Create - Server error when trying to create a resource with username that already exists
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And ui: I create a new Resource with email, username, password
    And ui: Quick navigate to "Resource Management"
    And ui: I try creating resource with same email, username, password
    And ui: I validate error message for duplicate resource created

  @testId=ST-1520
  @issue=SG-11460
  Scenario: RM Net Availability - Navigating back to RM Net availability from a different page should not clear the search results
    Given setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Quick navigate to "Resource Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I clear filters in RM netavailability tab
    And ui: I enter current year start and end date in RM netavailability tab
    And ui: I search for resource created using model in RM netavailability tab
    And ui: I navigate to previous window by clicking on browser back button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Resource" "Management"
    And ui: Click on Net Availability tab in RM grid
    And ui: I validate that I am on RM netavailability tab with search tab containing previously searched resource

  @testId=ST-1527
  @issue=SG-11636
  Scenario: PM/RM Filtering - Validate when searching on a value, and close dropdown, search is retained
    Given ui: I navigate to "Resource" "Management"
    When ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: I click on filters
    And ui: I click on Choose filters
    And ui: I select filter "Security Group"
    And ui: I select "belongs to" as an filter option for filter "Security Group" and set value as default
    Then ui: I validate value "Default" for "belongs to" as an filter option for filter "Security Group" is not changed

  @issue=SG-12146
  @8.2
  Scenario: Unable to open any resource getting server error.
    When setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Project Management"
    And ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Resource Management"
    And ui: I search for resource in resource list page
    And ui: I verify client or server error warning is not displayed

  @testId=SG-2040
  @issue=SG-12118
  @9.0
  Scenario: Create a resource with capacity under 5 working days week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity

  @testId=ST-2041
  @issue=SG-12118
  @owner=Rinkesh
  @9.0
  Scenario: SG-12118 - Create resource capacity under seven working days a week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Softassert all

  @testId=ST-2042
  @issue=SG-12118
  @owner=Rinkesh
  @9.0
  Scenario: SG-12118 - Add admin type with seven working days a week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Admin Time" tile in Admin settings
    And ui: I enter Admin Time Type and create
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    And ui: I select Admin Time Type
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Enter Admin Time Type as: "4" in "14" number of cells specifically for weekends in Resource Capacity
    And ui: Verify Admin Time Type as: "4" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Verify Net Capacity as: "4" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: I select specific date mode "Month" in Resource capacity
    And ui: Enter Base Capacity as:"168" in "Mar 24" for month mode in Resource Capacity
    And ui: Enter Admin Time Type as:"0" in "Mar 24" for month mode in Resource Capacity
    And ui: I select specific date mode "Day" in Resource capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Verify Admin Time Type as: "4" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Softassert all

  @issue=SG-12584
  @owner=Devanshi
  @9.0.1
  Scenario: Resource Management - update login names in bulk gives error
    Given setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Quick navigate to "Resource Management"
    And ui: I clear the earlier searched resource in RM Grid
    And ui: I click on Columns dropdown and select "Login"
    And ui: I select all resources in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: I change recently created resource login name to AutomationUpdate
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12583
  @owner=Devanshi
  @9.0.1
  Scenario: Resource Management Grid - Pressing Tab closes password window
    Given setup: Test Data "Resource"
    And ui: Quick navigate to "Resource Management"
    When ui: I create a new Resource with email, username, password
    And ui: I navigate to previous window
    And ui: I clear the earlier searched resource in RM Grid
    And ui: I click on Columns dropdown and select "Password"
    And ui: Search for recently created "resource" in RM Grid
    And ui: I change recently created resource password
    And ui: I click on Tab key
    Then ui: I verify password window is not closed
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2043
  @issue=SG-12118
  @owner=Rinkesh
  @9.0
  Scenario: SG-12118 - Add admin type with five working days a week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Admin Time" tile in Admin settings
    And ui: I enter Admin Time Type and create
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I enter and save resource current year start and end date in capacity tab
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: I select Admin Time Type
    Then ui: Verify Admin Time Type "14" number of cells specifically for weekends in Resource Capacity are disabled
    And ui: Softassert all

  @testId=ST-2037
  @issue=SG-12118
  @9.0
  Scenario: SG-12118 - Validate project shift with seven days work week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set start date as today and End date as "31.12.2024" for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Day" in SPA
    And ui: Allocate "4" hours for resource to project in SPA in Day mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    When ui: Click on Project navigation dropdown and select "Attributes"
    And ui: Click on Shift option and shift project on next weekend
    And ui: Click on Project navigation dropdown and select "Allocations"
    Then ui: Verify Base Capacity "4" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Softassert all

  @issue=SG-12528
  @9.0
  Scenario: Resource Capacity - Incorrect Net Capacity/FTE displayed DU is set to FTE
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: Enter start date as "04/01/2024" of current year
    And ui: Enter end date as "04/30/2024" of current year
    And ui: I enter start date "04/01/2024" and end date "04/30/2024" in CPA
    And ui: Click on unit "Time" in Resource capacity
    And ui: I select specific date mode "Day" in Resource capacity
    And ui: Enter Base Capacity "8" in "14" number of cells specifically for weekends in Resource Capacity
    Then ui: Verify Base Capacity "8" for "14" number of cells specifically for weekends in Resource Capacity
    And ui: Click on unit "FTE" in Resource capacity
    And ui: Softassert all

  @issue=SG-12728
  @owner=Devanshi
  @9.1
  Scenario: Advanced Tooltip - RM clicking on resource sections results to server error
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Miscellaneous" tab in General Settings
    And ui: I toggle Advanced Tooltips to "On" in General Settings in Miscellaneous Tab
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed
    Then ui: Wait for Save button in GS to be clickable again
    When setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    Then ui: I verify client or server error warning is not displayed
    And ui: Quick navigate to "Resource Management"
    And ui: I search for resource in resource list page
    And ui: I hover on recently created resource and click on "Attributes & Identity"
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-13131
  @owner=Rinkesh
  @9.1
  Scenario: Validated saved information after resource created
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I click on "Crete Resource" button on resource management
    Then ui: I verify "Is Resource Manager", "Is Timesheet Approver" and "Require Resource Manager Approval" are "No"
    And ui: I create a new Resource while on resource create page
    And ui: I verify "Is Resource Manager", "Is Timesheet Approver" and "Require Resource Manager Approval" are "No"
    And ui: Softassert all

  @issue=SG-12893
  @9.1
  Scenario: Cannot enter in costs for demand planning resources when FTE = Dominant Unit
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"

    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "20" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: Turn "On" Is demand planning resource toggle button in Resource Capacity tab
    And ui: Wait for 1 second
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter Start date as "01.03.2025" and End date as "31.12.2025" in SPA
    And ui: I click on specific unit "FTE" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: Allocate "1" hour for resource to project in SPA in Month mode for the dates between "01.03.2025" and "31.03.2025" when dataset is "Allocation" and assignment type "Planned"
    And ui: I click on specific unit "Cost" in SPA
    And ui: I select specific date mode "Day" in SPA
    And ui: Wait for 1 second
    Then ui: I verify value on specific unit as Cost, specific date mode as "Day"
    And ui: I select specific date mode "Month" in SPA
    And ui: Wait for 1 second
    Then ui: I verify value on specific unit as Cost, specific date mode as "Month"
    And ui: Softassert all
    
  @issue=SG-12890
  @9.1
  Scenario: Resource - When creating new user and first update capacity, create resource, then try to update resource managers field, nothing shows
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Auto Calculate Capacity "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I verify client or server error warning is not displayed
    Then ui: I validate toggle Auto Calculate Capacity is "On" in General settings global tab
    When setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: turn on has capacity toggle "On"
    And ui: I toggle Auto Calculate Capacity for "FTE" as "On" in Resource Capacity
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Change value of CF "Require Resource Manager Approval" of type "Bool" to "Yes" in Resource Attributes and Identity
    And ui: Update resource manager in resource edit page
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-13011
  @owner=Devanshi
  @9.1
  Scenario: Required fields without default value- changing a required field in bulk without and without a required value causes error in RM/PM Grids
    Given ui: I navigate to "Admin" "Settings"
    When ui: I navigate to "Attribute" "Management"
    And setup: Test Data "Resource List Attribute"
    Then ui: create and verify "Resource" attribute using model with type "Bool" default value "No" and required "ON"
    And ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And ui: I create a new Resource with Global Role as "Administrator"
    And ui: Quick navigate to "Resource Management"
    And ui: I select All Reources present in RM Grid
    And ui: I click on columns dropdown in resource list page
    And ui: I uncheck and select attribute created using model in columns dropdown in resource list page
    And ui: I edit attribute and resource created using model in resource list page
    And ui: I set Attribute Value to Yes
    And ui: I click on save button on attribute popup that available on resource list page
    Then ui: I verify client or server error warning is not displayed
