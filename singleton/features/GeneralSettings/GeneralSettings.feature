Feature: General Settings

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails for user "1"
    And ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I navigate to "Dashboard"

  @testId=ST-1639
  Scenario: Validate 1. FTE% added in the default unit dropdown at Unit Settings page, 2. able to select FTE% , and 3. FTE% is selected as the default unit persists after the save button is clicked.
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: Click Default unit dropdown in General Settings
    And ui: Verify if value "FTE %" is displayed in dropdown
    And ui: Click on "FTE %" option in dropdown
    When ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Click on "Unit Settings" tab in General Settings
    Then ui: Verify if "FTE %" is selected as default unit in Unit settings tab of General Settings
    # And ui: Logout

  @testId=ST-1640
  Scenario: 4. Validate Must not allow the user to set FTE% as the default unit if it is not enabled/selected on active units.
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: Unselect checkbox of "FTE %" from Active units in Unit settings tab of General Settings
    When ui: Click Default unit dropdown in General Settings and select "FTE %"
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Verify "The default unit can't be disabled." warning is displayed
    # And ui: Logout

    # Scenario: 5. Validate If FTE% is set as the default unit, It be loaded as the default entry mode in the following areas: SPA, CPA from SPA, Resource replace from SPA, Build Team net availability, Snapshots->Allocations, Resource Request view from Project pages, CPA from Resource Management
    #   Given ui: Click on "Admin Settings" tile in homepage
    #   And ui: Click on General Settings tile
    #   And ui: Click on "Unit Settings" tab in General Settings
    #   And ui: Select checkbox of "FTE %" from Active units in Unit settings tab of General Settings
    #   And ui: Click Default unit dropdown in General Settings and select "FTE %"
    #   And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    #   When ui: Search for "TestAUTResrc_ST-1263_Manager" in global search and click on it
    #   And ui: Expand on User Identity section and enter username as "TestAUTResrc_ST-1263_Manager", password as "admin123!!" and confirm password as "admin123!!"
    #   And ui: Logout
    #   And ui: Login with username as "TestAUTResrc_ST-1263_Manager" and password as "admin123!!"
    #   When ui: Search for "TestAUTProj_ST-1263" in global search and click on it
    #   And ui: Click on Project navigation dropdown and select "Allocations"
    #   Then ui: Verify if "FTE %" unit is selected in SPA
    #   And ui: Click on Checkout button in SPA and wait for Release button
    #   And ui: Click on meatballs icon against resource "TestAUTResrc_ST-1263_Resource" in "Allocation" section and select "CPA"
    #   Then ui: Verify if "FTE %" unit is selected in CPA from SPA
    #   When ui: Click on Close button in CPA
    #   And ui: Click on meatballs icon against resource "TestAUTResrc_ST-1263_Resource" in "Allocation" section and select "Resource Replace"
    #   Then ui: Verify if "FTE %" unit is selected in Resource Replace from SPA
    #   When ui: Click on Cancel button in Resource Replace
    #   And ui: Click on Release button in SPA and wait for Checkout button
    #   And ui: Click on Project navigation dropdown and select "Build Team"
    #   Then ui: Verify if "FTE %" unit is selected in Build Team
    #   When ui: Click on Project navigation dropdown and select "Resource Requests"
    #   And ui: Click on "Pending" RR of resource "TestAUTResrc_ST-1263_Resource" for project "TestAUTProj_ST-1263"
    #   Then ui: Verify if "FTE %" unit is selected in Resource Request Edit
    #   And ui: I navigate to previous window
    #   When ui: Click on Project navigation dropdown and select "Snapshots"
    #   And ui: Click on Create Snapshot button in Snapshots section of Project edit
    #   And ui: Click on Create Snapshot button in snapshot creation modal
    #   And ui: Click on snapshot "Snapshot 1"
    #   And ui: Click on Project navigation dropdown and select "Allocations"
    #   Then ui: Verify if "FTE %" unit is selected in SPA
    #   When ui: Search for "TestAUTResrc_ST-1263_Resource" in global search and click on it
    #   And ui: Click on Resource navigation button and select "Capacity"
    #   Then ui: Verify if "FTE %" unit is selected in CPA of Resource capacity
    #   # And ui: Logout

    # @testId=ST-1325
    # When ui: Quick navigate to "BPAFG"
    # And ui: Enter Start date as "01.01.2023" and End date as "31.12.2023" in BPAFG
    # And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    # And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    # And ui: Search for project "TestAUTProj_ST-1263" in entity selection section in BPAFG
    # And ui: Select project "TestAUTProj_ST-1263" in entity selection section in BPAFG
    # And ui: Close entity selection section in BPAFG
    # And ui: Click on meatballs icon of project "TestAUTProj_ST-1263" and resource "TestAUTResrc_ST-1263_Resource" and select option "Resource replace advanced" in BPAFG
    # Then ui: Verify if "FTE %" unit is selected in Advanced resource replace of BPAFG

  @testId=ST-1602
  @issue=SG-11475
  @owner=Pranit
  Scenario: SG-11475 - Verify Legend Resource heatmap in BPAFG
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Heatmap" tab in General Settings
    And ui: Delete all existing heatmaps in Heatmap tab of GS
    And ui: Add specific thrsholds color "blue1,green1,grey1" and value "7,12" in Heatmap tab of GS
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And setup: Test Data "SoftAssert"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned Actual" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on legend button in BPAFG
    Then ui: I verify legend modal content - "7,120,120 +" in BPAFG
    Then ui: I verify legend resource heatmap color - "blue1,green1,grey1" of value - "7,120,120 +" in BPAFG
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Heatmap" tab in General Settings
    And ui: Delete all existing heatmaps in Heatmap tab of GS
    And ui: Add all automation default thrsholds in Heatmap tab of GS
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert all

  @testId=ST-1439
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 BPAFG: Gantt
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: Unselect checkbox of "Gantt" from Active units in Unit settings tab of General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And setup: Test Data "SoftAssert"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned Actual" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    Then ui: I verify specific unit "Time,Cost,FTE,FTEP,Manday" is displayed
    Then ui: I verify specific unit "Gantt" is not displayed
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: Select checkbox of "Gantt" from Active units in Unit settings tab of General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button
    And ui: I verify and click on view created using model
    Then ui: I verify specific unit "Time,Cost,FTE,FTEP,Manday,Gantt" is displayed
    Then ui: Softassert all

  @testId=ST-1607
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 Must disable shift functionality if there are pending and exclude unapproved assignments is set to true.
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle exclude unapproved assignment to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource by adding resource manager, username, password, global role
    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate specific "0,0,100,100,100,100,100,100,100,100,100,0,0" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    #Must disable shift functionality if there are pending and exclude unapproved assignments is set to true.
    And ui: I login with "resourceManager" account
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    Then ui: I verify shift date is not displayed in BPAFG gantt tab
    #Must enable shift functionality if there are pending and exclude unapproved assignments is set to false.
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle exclude unapproved assignment to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button
    And ui: I verify and click on view created using model
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "current" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    And ui: I click on release button in BPAFG
    #Must enable shift functionality if there are no pending and exclude unapproved assignments is set to true.
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle exclude unapproved assignment to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Requests"
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I uncheck select all checkbox in choose columns dropdown in Resource Request
    And ui: I search and select columns "Project Name,Resource Name,Resource Request Status" in Resource Request
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I click on pending resource request in Resource Request tab
    And ui: I click on specific RR status "Approve" in Resource Request
    And ui: I click on apply changes button in Resource Request
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button
    And ui: I verify and click on view created using model
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "current" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    And ui: I click on release button in BPAFG
    #Must enable shift functionality if there are no pending and exclude unapproved assignments is set to false.
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle exclude unapproved assignment to "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button
    And ui: I verify and click on view created using model
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "current" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    And ui: I click on release button in BPAFG
    Then ui: Softassert all

  @testId=ST-1608
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 Values displayed in the Gantt bar must be based on the defined dominant unit in General Settings | Unit Tab | dominant unit (Time or FTE)
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: I select current dominant unit "FTE" in general settings unit settings tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Resource Management"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new Resource with email, username, password
    And setup: Test Data "Project"
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    Then ui: I compare and verify values between FTE and gantt tab of specific task "Generic" in specific cell "1" in BPAFG
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: I select current dominant unit "Time" in general settings unit settings tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I click on view button
    And ui: I verify and click on view created using model
    And ui: I click on specific unit "Gantt" in BPAFG
    Then ui: I verify specific value "100,100" is displayed in specific cell "1,2" in BPAFG gantt tab
    Then ui: Softassert all

  @testId=ST-1471
  @issue=SG-11619
  Scenario: SG-11619 - Decimals separator is not working consistently
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "Calendar"
    And setup: Test Data setup for Attribute of type:"Number" with "0" number of selection values, "0" number of default values and create default values:"false"
    And setup: Test Data "SoftAssert"

    Given ui: I click on logo to navigate to homepage
    And ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    When ui: Click on Number format dropdown in Global tab of General Settings and select format as:"International"
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again

    When ui: Quick navigate to "Resource Management"
    And ui: Create a new Manager with username, password and assign role as:"Administrator"

    And ui: Click on Resource navigation button and select "Capacity"

    #1 - Resource Capacity in Time
    And ui: Enter current year as capacity date for the resource in resource capacity section
    And ui: Enter Base Capacity as:"7918,96" in "10" number of cells in Resource Capacity
    Then ui: Verify Base Capacity is:"7.918,96" for "10" number of cells in Resource Capacity

    #2 - Resource Capacity in FTE
    And ui: Click on unit "FTE" in Resource capacity
    And ui: Enter Base Capacity as:"1252,37" in "10" number of cells in Resource Capacity
    Then ui: Verify Base Capacity is:"1.252,37" for "10" number of cells in Resource Capacity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    When ui: Quick navigate to "Resource Management"
    And ui: I create a new resource by adding resource manager, username, password, global role
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "12" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And ui: Quick navigate to "Project Management"
    And ui: I create a new Regular Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown

    #2 - SPA - Time
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "6410,85" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Verify if resource has "6.410,85" hours for every month of current year in SPA when dataset is "Allocation"

    #3- SPA - Cost
    And ui: I click on specific unit "Cost" in SPA
    And ui: Update hours to "2984,20" for resource in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Verify if resource has "2.984,2" hours for every month of current year in SPA when dataset is "Allocation"

    #4 - SPA - FTE
    And ui: I click on specific unit "FTE" in SPA
    And ui: Update hours to "1236,93" for resource in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Verify if resource has "1.236,93" hours for every month of current year in SPA when dataset is "Allocation"

    #5 - SPA - Manday
    And ui: I click on specific unit "Manday" in SPA
    And ui: Update hours to "4841,92" for resource in SPA in Month mode for current year when dataset is "Allocation"
    Then ui: Verify if resource has "4.841,92" hours for every month of current year in SPA when dataset is "Allocation"

    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And ui: Unselect Columns if any in BPAFG
    And ui: I click on options in BPAFG
    And ui: Select Tasks to show as:"All" in Grid options of BPAFG
    And ui: Select Overlay Heatmap as:"Off" in Grid options of BPAFG
    And ui: Un-select all options of Filter by Resource Request Status in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    #6 - BPAFG - Time
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Enter "7116,48" hours for resource to project in Month mode for current year in BPAFG
    And ui: Verify if all cells for resource in Month mode for current year has value "7.116,48" in BPAFG

    #7 - BPAFG - FTE
    And ui: I click on specific unit "FTE" in BPAFG
    And ui: Enter "2391,85" hours for resource to project in Month mode for current year in BPAFG
    And ui: Verify if all cells for resource in Month mode for current year has value "2.391,85" in BPAFG

    #8 - BPAFG - Cost
    And ui: I click on specific unit "FTE" in BPAFG
    And ui: Enter "9537,12" hours for resource to project in Month mode for current year in BPAFG
    And ui: Verify if all cells for resource in Month mode for current year has value "9.537,12" in BPAFG

    #9 - BPAFG - Manday
    And ui: I click on specific unit "Manday" in BPAFG
    And ui: Enter "9381,49" hours for resource to project in Month mode for current year in BPAFG
    And ui: Verify if all cells for resource in Month mode for current year has value "9.381,49" in BPAFG

    #10 - BRC - Time
    And ui: Quick navigate to "Bulk Resource Capacities"
    And ui: Click on "Leave anyway" button in confirmation modal
    And ui: Click on Clear button in Bulk Resource Capacities
    And ui: Click on "Yes" button in confirmation modal if displayed
    And ui: Enter current year in start and End date in Bulk Resource Capacities
    And ui: Add resource in Bulk Resource Capacities
    And ui: Enter "9423,35" capacity for resource in Month mode for current year in Bulk Resource Capacities
    And ui: Verify if all cells for resource in Month mode for current year has value "9.423,35" in Bulk Resource Capacities

    #11 - BRC - FTE
    And ui: Click on unit "FTE" in Bulk Resource Capacities
    And ui: Enter "4281,35" capacity for resource in Month mode for current year in Bulk Resource Capacities
    And ui: Verify if all cells for resource in Month mode for current year has value "4.281,35" in Bulk Resource Capacities

    #12 - Calendar Management
    And ui: Quick navigate to "Admin Settings"
    And ui: Click on "Calendar Management" tile in Admin settings
    And ui: Enter current year in start and End date in Calendar Management
    And ui: Enter calendar name in Calendar Management
    And ui: Enter "8216,35" value for calendar in Month mode for current year in Calendar Management
    And ui: Verify if all cells for calendar in Month mode for current year has value "8.216,35" in Calendar Management

    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: Click on "Resource Requests" tile in homepage
    And ui: I click on pending resource request in Resource Request tab

    #13 - Resource Requests - Time
    And ui: Enter "5219,65" hours for resource in Month mode for current year in Edit RR page
    And ui: Verify if all cells for resource in Month mode for current year has value "5.219,65" in Edit RR page

    #13 - Resource Requests - Cost
    And ui: Cick on unit "Cost" in Edit RR page
    And ui: Enter "2264,74" hours for resource in Month mode for current year in Edit RR page
    And ui: Verify if all cells for resource in Month mode for current year has value "2.264,74" in Edit RR page

    #13 - Resource Requests - FTE
    And ui: Cick on unit "FTE" in Edit RR page
    And ui: Enter "194,24" hours for resource in Month mode for current year in Edit RR page
    And ui: Verify if all cells for resource in Month mode for current year has value "194,24" in Edit RR page

    #13 - Resource Requests - Manday
    And ui: Cick on unit "Manday" in Edit RR page
    And ui: Enter "3781,24" hours for resource in Month mode for current year in Edit RR page
    And ui: Verify if all cells for resource in Month mode for current year has value "3.781,24" in Edit RR page

    Then ui: Softassert all

  @testId=ST-1478
  @issue=SG-11348
  Scenario: General Settings - Client error should not occur when changing Font color formatting in Generic Error Text of Alias tab and Custom homepage message of Miscellaneous
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    When ui: Click on General Settings tile
    And ui: Click on "Alias" tab in General Settings
    And ui: Click on Font Color icon in Generic Error Text textbox of Alias tab in General Settings
    And ui: Select Font Color as:"green1" icon in Generic Error Text textbox of "alias" tab in General Settings
    And ui: Click on Font Color icon in Generic Error Text textbox of Alias tab in General Settings
    And ui: Select Font Color as:"red4" icon in Generic Error Text textbox of "alias" tab in General Settings
    And ui: Softassert if client error is not displayed

    And ui: Click on "Miscellaneous" tab in General Settings
    And ui: Click on Font Color icon in Custom home page message textbox of Miscellaneous tab in General Settings
    And ui: Select Font Color as:"green1" icon in Generic Error Text textbox of "miscellaneous" tab in General Settings
    And ui: Click on Font Color icon in Custom home page message textbox of Miscellaneous tab in General Settings
    And ui: Select Font Color as:"red4" icon in Generic Error Text textbox of "miscellaneous" tab in General Settings
    And ui: Softassert if client error is not displayed

    Then ui: Softassert all

  @testId=ST-1504
  @issue=SG-11736
  Scenario: SG-11736: General Settings - Server error when trying to Save
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    When ui: Click on General Settings tile
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Unit Settings" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Resource Request" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Data Sync" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "BPA" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Alias" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Miscellaneous" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Heatmap" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    And ui: Click on "Recommendations" tab in General Settings
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: Softassert if client or server error is not displayed
    Then ui: Softassert all

  @testId=ST-1532
  @issue=SG-11466
  Scenario: Support additional languages
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: Click on Language dropdown in General Settings
    And ui: Validate that there are different supported languages present
    And ui: Select "Japanese" from the language dropdown
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Validate changes done in "General Settings" for "Japanese" language
    And ui: Click on Language dropdown in General Settings
    And ui: Select "English" from the language dropdown
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And ui: Validate changes done in "General Settings" for "English" language
    Then ui: Softassert all

  @testId=ST-2097
  @issue=SG-12495
  @owner=Devanshi
  @9.1
  Scenario: General settings, there should be a toggle button named "Auto Calculate Capacity"
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Auto Calculate Capacity "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I validate toggle Auto Calculate Capacity is "On" in General settings global tab
    And ui: I toggle Auto Calculate Capacity "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I validate toggle Auto Calculate Capacity is "Off" in General settings global tab
    Then ui: Softassert all

  @testId=ST-2098
  @issue=SG-12495
  @owner=Devanshi
  @9.1
  Scenario: General settings: Enabled the "Auto-calculate capacity" toggle
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Auto Calculate Capacity "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I validate toggle Auto Calculate Capacity is "On" in General settings global tab
    When setup: Test Data "Resource"
    Given ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I enter and save resource current year start and end date in capacity tab
    Then ui: I validate toggle Auto Calculate FTE is "On" in Resource Management
    And ui: Click on unit "FTE" in Resource capacity
    Then ui: I validate toggle Auto Calculate Time is "On" in Resource Management
    Then ui: Softassert all

  @testId=ST-2099
  @issue=SG-12495
  @owner=Devanshi
  @9.1
  Scenario: General settings: Disabled the "Auto-calculate capacity" toggle
    Given setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on General Settings tile
    And ui: I toggle Auto Calculate Capacity "Off" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Then ui: I validate toggle Auto Calculate Capacity is "Off" in General settings global tab
    When setup: Test Data "Resource"
    Given ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource with email, username, password
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: I enter and save resource current year start and end date in capacity tab
    Then ui: I validate toggle Auto Calculate FTE is "Off" in Resource Management
    And ui: Click on unit "FTE" in Resource capacity
    Then ui: I validate toggle Auto Calculate Time is "Off" in Resource Management
    Then ui: Softassert all