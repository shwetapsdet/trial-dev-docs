Feature: Bulk Project Allocation Flatgrid

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login
    And ui: Click on username and select Profile
    And ui: Create a token for "1" "Hours"
    And ui: I click on logo to navigate to homepage

  @testId=ST-1356
  @testId=ST-1408
    # Updated according to 8.1.0 change - SG-10758
  Scenario: SG-10803 - BPA FG: total FTE must be calculated based on displayed values instead of daily values
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it

    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
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
    And ui: I click on specific unit "FTE" in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Click on expand icon in BPAFG grid
    And ui: I select specific date mode "Day,Week,Month,Quarter" and verify assignment total "150,30.34,6.88,2.29" for task "Generic" in BPAFG

  @testId=ST-1373
  @owner=Pranit
  Scenario: SG-11003 - BPAFG - add pressing enter in grid moves down the column
    Given setup: Test Data "Resource"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Allocate "50" hours for existing resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Actual"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned Actual" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Enter:"20" for cells of months:"Jan" of current year for recently created "project" in BPAFG Grid
    Then ui: I verify specific cell "1" of task "Generic" is highlighted with assignment type "Actual" in BPAFG

  @testId=ST-1404
  @issue=SG-11292
  @owner=Ram
  Scenario: SG-11292 -E2E- Highlight non zero values in BPAFG allocations area
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And ui: Click on "Resource Attributes and Identity"
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "2" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button

    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"

    And ui: Select Assignment Type as:"Actual" in SPA if not already selected
    And ui: Update "100" hours for recently added resource in SPA for months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year when dataset is "Allocation"

    And ui: Click on dataset dropdown and select "Demand" in SPA
    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Add recently created resource in SPA when dataset is "Demand"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Demand"

    And ui: Select Assignment Type as:"Actual" in SPA if not already selected
    And ui: Update "100" hours for recently added resource in SPA for months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year when dataset is "Demand"

    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And ui: Unselect Columns if any in BPAFG
    And ui: I click on options in BPAFG
    And ui: Select Overlay Heatmap as:"Non Zero" in Grid options of BPAFG
    And ui: Select Tasks to show as:"All" in Grid options of BPAFG
    And ui: Close Options section in BPAFG
    #Planned Allocation assertion
    Then ui: Verify if cells of months:"Jan,Mar,May,Jul,Sep,Nov" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid
    #Actual Allocation assertion
    And ui: Select Assignment Type as:"Actual" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells of months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Acutal Demand assertion
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells of months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid
    #Planned Demand assertion
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells of months:"Jan,Mar,May,Jul,Sep,Nov" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Planned Actual Allocation assertion
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned Actual" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells of months:"Jan,Mar,May,Jul,Sep,Nov" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid for:"Planned" Assignment type when both Planned and Actual are selected
    Then ui: Verify if cells of months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid for:"Actual" Assignment type when both Planned and Actual are selected

    #Planned Actual Allocation assertion
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells of months:"Jan,Mar,May,Jul,Sep,Nov" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid for:"Planned" Assignment type when both Planned and Actual are selected
    Then ui: Verify if cells of months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year for recently created "project" is highlighted with non-zero color in BPAFG Grid for:"Actual" Assignment type when both Planned and Actual are selected

    #Day Mode
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Select Date mode as:"Day" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells by indices:"2,3,4,5,11" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Week Mode
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells by indices:"2,3,4,5,10,11" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Quarter Mode
    And ui: Select Date mode as:"Quarter" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    Then ui: Verify if cells by indices:"1,2,3,4" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Cost Mode
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific unit "Cost" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #FTE Mode
    And ui: I click on specific unit "FTE" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #FTE% Mode
    And ui: I click on specific unit "FTEP" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Manday Mode
    And ui: I click on specific unit "Manday" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with non-zero color in BPAFG Grid

    #Entering values and check highlight changes
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Wait for 1 second
    And ui: Enter:"50" for cells of months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year for recently created "project" in BPAFG Grid
    And ui: Click on Save button in BPAFG wait until it disappears
    Then ui: Verify if cells by indices:"2,4,8,10,12" for recently created "project" is highlighted with non-zero color in BPAFG Grid
    And ui: Enter:"0" for cells of months:"Jan,Mar,May,Jul,Sep,Nov" of current year for recently created "project" in BPAFG Grid
    And ui: Click on Save button in BPAFG wait until it disappears
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with zero color in BPAFG Grid

    And ui: I click on specific unit "Cost" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"2,4,8,10,12" for recently created "project" is highlighted with non-zero color in BPAFG Grid
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with zero color in BPAFG Grid

    And ui: I click on specific unit "FTE" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"2,4,8,10,12" for recently created "project" is highlighted with non-zero color in BPAFG Grid
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with zero color in BPAFG Grid

    And ui: I click on specific unit "FTEP" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"2,4,8,10,12" for recently created "project" is highlighted with non-zero color in BPAFG Grid
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with zero color in BPAFG Grid

    And ui: I click on specific unit "Manday" in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if cells by indices:"2,4,8,10,12" for recently created "project" is highlighted with non-zero color in BPAFG Grid
    Then ui: Verify if cells by indices:"1,3,5,7,11" for recently created "project" is highlighted with zero color in BPAFG Grid
    Then ui: Softassert all

  @testId=ST-1420
  @issue=SG-11292
  @owner=Ram
  Scenario: SG-11292 -E2E- Highlight non-zero values in the BPAFG allocations area (Case3)
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"

    Given ui: Click on "Resource Management" tile in homepage
    And ui: I create a new Resource with email, username, password

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Wait for 1 second
    And ui: Close entity selection section in BPAFG

    And ui: I click on options in BPAFG
    And ui: Select Overlay Heatmap as:"Off" in Grid options of BPAFG
    And ui: Close Options section in BPAFG
    And ui: Logout

    And ui: I login with "resource" account
    Then ui: Verify if welcome message is displayed
    And ui: Click on "Bulk Project Allocation Flatgrid" tile in homepage
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Wait for 1 second
    And ui: Close entity selection section in BPAFG

    And ui: I click on options in BPAFG
    And ui: Select Overlay Heatmap as:"Non Zero" in Grid options of BPAFG
    And ui: Close Options section in BPAFG
    And ui: Logout

    And ui: I attempt to login with valid credentails
    Then ui: Verify if welcome message is displayed
    And ui: Click on "Bulk Project Allocation Flatgrid" tile in homepage
    And ui: I click on options in BPAFG
    And ui: Wait for 1 second
    Then ui: Verify if Overlay Heatmap option:"Off" is selected in BPAFG Options
    And ui: Select Overlay Heatmap as:"Resource" in Grid options of BPAFG
    And ui: Close Options section in BPAFG
    And ui: Logout

    And ui: I login with "resource" account
    Then ui: Verify if welcome message is displayed
    And ui: Click on "Bulk Project Allocation Flatgrid" tile in homepage
    And ui: I click on options in BPAFG
    Then ui: Verify if Overlay Heatmap option:"Non Zero" is selected in BPAFG Options
    Then ui: Softassert all

  @testId=ST-1437
  @issue=SG-11475
  @owner=Pranit
  Scenario: SG-11475 - Add Legend to BPAFG
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
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
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
    Then ui: I verify legend modal content - "Non-Zero Background,Milestones,Resource Heatmap,Resource Request Heatmap,Pending,Approved,Partially Approved,Delegated,Rejected" in BPAFG
    Then ui: I verify legend modal milestone shape - "circle,square,diamond,multiple" in BPAFG

  @testId=ST-1433
  @issue=SG-11384
  @owner=Ram
  Scenario: SG-11384 - BPAFG/BPA: Provide a way for users to define week formatting
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And ui: Click on "Resource Attributes and Identity"
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "2" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button

    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Allocation"
    And ui: Select Assignment Type as:"Actual" in SPA if not already selected
    And ui: Update "100" hours for recently added resource in SPA for months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year when dataset is "Allocation"

    And ui: Click on dataset dropdown and select "Demand" in SPA
    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    And ui: Add recently created resource in SPA when dataset is "Demand"
    And ui: Update "100" hours for recently added resource in SPA for months:"Jan,Mar,May,Jul,Sep,Nov" of current year when dataset is "Demand"
    And ui: Select Assignment Type as:"Actual" in SPA if not already selected
    And ui: Update "100" hours for recently added resource in SPA for months:"Feb,Apr,Jun,Aug,Oct,Dec" of current year when dataset is "Demand"

    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And ui: Unselect Columns if any in BPAFG
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Number" in Grid options of BPAFG
    And ui: Select Tasks to show as:"All" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    #AssignmentType=Planned,Dataset=Allocation,WeekFormat=Number
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    #AssignmentType=Planned,Dataset=Allocation,WeekFormat=Start date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Start date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    #AssignmentType=Planned,Dataset=Allocation,WeekFormat=End date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"End date" in Grid options of BPAFG
    # And ui: I click on options in BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    #AssignmentType=Actual,Dataset=Allocation,WeekFormat=Number
    And ui: Select Assignment Type as:"Actual" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Number" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    #AssignmentType=Actual,Dataset=Allocation,WeekFormat=Start date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Start date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    #AssignmentType=Actual,Dataset=Allocation,WeekFormat=End date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"End date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    #AssignmentType=Planned,Dataset=Demand,WeekFormat=Number
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Number" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    #AssignmentType=Planned,Dataset=Demand,WeekFormat=Start date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Start date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    #AssignmentType=Planned,Dataset=Demand,WeekFormat=End date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"End date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    #AssignmentType=Actual,Dataset=Demand,WeekFormat=Number
    And ui: Select Assignment Type as:"Actual" in BPAFG if not already selected
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Number" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    #AssignmentType=Actual,Dataset=Demand,WeekFormat=Start date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Start date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    #AssignmentType=Actual,Dataset=Demand,WeekFormat=End date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"End date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    #AssignmentType=Planned Actual,Dataset=Allocation,WeekFormat=Number
    And ui: Select Assignment Type as:"Planned Actual" in BPAFG if not already selected
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Number" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    #AssignmentType=Planned Actual,Dataset=Allocation,WeekFormat=Start date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Start date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    #AssignmentType=Planned Actual,Dataset=Allocation,WeekFormat=End date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"End date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    #AssignmentType=Planned Actual,Dataset=Demand,WeekFormat=Number
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Number" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Number" in BPAFG

    #AssignmentType=Planned Actual,Dataset=Demand,WeekFormat=Start date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"Start date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"Start date" in BPAFG

    #AssignmentType=Planned Actual,Dataset=Demand,WeekFormat=End date
    And ui: I click on options in BPAFG
    And ui: Select Week Display Format as:"End date" in Grid options of BPAFG
    And ui: Close Options section in BPAFG

    And ui: I click on specific unit "Time" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: Verify 10 column headings when Week Display Format is selected as:"End date" in BPAFG

    Then ui: Softassert all

  @testId=ST-1603
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 - Validate Must be able to manually shift the date of planned allocations by clicking on the Gantt bar by selecting a date on the date picker or by manually typing.
    #Must not be able to shift actual allocation.
    #Must be able to shift assignments that are within the BPAFG period. For example, the assignment end date is May 2023, and the defined BPAFG end date is July 2023, must not allow users to shift beyond July 2023.
    #Must only save the changes when the save button is clicked.
    #When the release button is clicked, it changes must not be saved.
    #Gantt view must work on the following options
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And ui: Click on "Resource Attributes and Identity"

    Given api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate specific "0,0,100,100,100,100,100,100,100,100,100,0,0" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Allocate specific "0,0,50,50,50,50,50,50,50,50,50,0,0" hours for resource to project in SPA in Month mode for current year when dataset is "Demand" and assignment type "Actual"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    Given ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I create new view using model and select it
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

    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "current" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab

    And ui: I click on release button in BPAFG
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Actual" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    Then ui: I verify shift date is not displayed in BPAFG gantt tab
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "next" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "9,10" in BPAFG gantt tab

    And ui: Click on Save button in BPAFG wait until it disappears
    Then ui: I verify value is displayed in specific cell "9,10" in BPAFG gantt tab
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    Then ui: I verify value is displayed in specific cell "9,10" in BPAFG gantt tab
    And ui: Select Date mode as:"Quarter" in BPAFG if not already selected
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    Then ui: I verify value is displayed in specific cell "9,10" in BPAFG gantt tab

  @testId=ST-1604
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 - Shift changes made must also reflect on SPA, CPA.
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
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
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Unselect Columns if any in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "current" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    And ui: Click on Save button in BPAFG wait until it disappears
    And ui: Search for Project in global search and click on it
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: Click on dataset dropdown and select "Allocation" in SPA
    And ui: Select Assignment Type as:"Planned" in SPA if not already selected
    Then ui: Verify if resource hours greater than zero in specific cell "1" in SPA when dataset is "Allocation"
    And ui: I click on edit button of specific resource in "Allocation" Tab
    And ui: I click on cross project allocation
    And ui: I select specific plan type "Allocation" in CPA
    And ui: I select specific date mode "Month" in CPA
    And ui: I select specific unit "Time" in CPA
    Then ui: Verify project hours greater than zero in specific cell "1" in CPA
    Then ui: Softassert all

  @testId=ST-1605
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 - Milestones must be displayed in Gantt (and) Must display the custom fields columns until the pinned attribute only.
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Milestone"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Milestones"
    And ui: Add Milestone by entered name, description and current year start date
    And ui: Click on save button in Project edit and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
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
    Then ui: I click on specific unit "Time,Cost,FTE,FTEP,Manday,Gantt" and verify milestone is displayed in BPAFG
    And ui: I click on specific cell "3" in BPAFG gantt tab
    And ui: I enter "current" year start date as shift date and click on save in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    Then ui: I click on specific unit "Gantt,Manday,FTEP,FTE,Cost,Time" and verify milestone is displayed in BPAFG
    #Must display the custom fields columns until the pinned attribute only.
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    Then ui: I verify specific column header "Assignment Total" is not displayed in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I search specific column attribute "Assignment Total" and "pin" in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    Then ui: I verify specific column header "Assignment Total" is displayed in BPAFG
    Then ui: Softassert all

  @testId=ST-1606
  @issue=SG-10869
  @owner=Pranit
  Scenario: SG-10869 - Must only be able to drag the Gantt bar within the start date and end date range period (and) Shift changes made must also reflect on BPA.
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Gantt" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I dragdrop from cell "3" to cell "1" in BPAFG gantt tab
    Then ui: I verify value is displayed in specific cell "1,2" in BPAFG gantt tab
    Then ui: Softassert all

  @testId=ST-1477
  @issue=SG-11516
  Scenario: BPAFG - Add a new task and verify if the task is displayed in the grid
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    Given ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and next year start date as End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected

    And ui: Click on Add Assignment button in BPAFG
    And ui: Click on Choose Project dropdown in Add Assignment modal of BPAFG
    And ui: Search and Select recently created Project in Add Assignment modal of BPAFG
    Then ui: Verify if dropdown has been opened

    And ui: Click on Choose Resource dropdown in Add Assignment modal of BPAFG
    And ui: Search and Select recently created Resource in Add Assignment modal of BPAFG
    Then ui: Verify if dropdown has been opened
    And ui: Click on Choose Task dropdown in Add Assignment modal of BPAFG
    And ui: Search and add the task from Project model in Add Assignment modal of BPAFG
    Then ui: Verify if dropdown has been opened

    And ui: Click on Add new assignment button in add assignment modal of BPAFG

    Then ui: Verify if recently added task is displayed in BPAFG Grid

    Then ui: Softassert all

  @testId=ST-1519
  @issue=SG-11755
  Scenario: BPAFG - Validate Error donot occurs when click on column headers
    Given ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total,Dataset Preference,Security Group,Project Owner" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    Then ui: I click on select attribute "Assignment Total,Dataset Preference,Security Group,Project Owner" and validate no error message is displayed

  @testId=ST-1483
  @issue=SG-10758
  Scenario:BPAFG: Verify that Assignment total is only present in insert column and not in Options list
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on options in BPAFG
    Then ui: I verify that the Assignment total option is not present in the Options list
    And ui: Close Options section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    Then ui: I verify that the "Assignment Total" option is displayed in the grid
    Then ui: Softassert all

  @testId=ST-1609
  @issue=SG-10758
  @owner=Vivek
  Scenario:BPAFG: Verify that the Pinned attribute stays on top of the grid
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total" in insert columns dropdown in BPAFG
    And ui: I pin the "Assignment Total" option in insert columns
    And ui: I verify if "Assignment Total" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "Assignment Total" option is displayed in the grid
    And ui: I verify that the "Assignment Total" option is "Pinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "Assignment Total" option in insert columns
    And ui: I verify if "Assignment Total" is "unpinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify that the "Assignment Total" option is "UnPinned" in the grid
    And ui: Softassert all

  @testId=ST-1610
  @issue=SG-10758
  @owner=Vivek
  Scenario:BPAFG: Verify that the Pin is assignable from the insert column
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total" in insert columns dropdown in BPAFG
    And ui: I pin the "Assignment Total" option in insert columns
    And ui: I verify if "Assignment Total" is "pinned"
    And ui: I pin the "Assignment Total" option in insert columns
    And ui: I verify if "Assignment Total" is "unpinned"
    And ui: Softassert all

  @testId=ST-1611
  @issue=SG-10758
  @owner=Vivek
  Scenario:BPAFG: Verify that the Pin is assignable to only 1 option from the insert column
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Dataset Preference,Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "Assignment Total" option in insert columns
    And ui: I verify if "Assignment Total" is "pinned"
    And ui: I pin the "Dataset Preference" option in insert columns
    And ui: I verify if "Assignment Total" is "unpinned"
    And ui: I verify if "Dataset Preference" is "pinned"
    And ui: Softassert all

  @testId=ST-1612
  @issue=SG-10758
  @owner=Vivek
  Scenario:BPAFG: Verify that the pinned attribute must be the basis where the freeze ends
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Dataset Preference,Security Group,Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "Security Group" option in insert columns
    And ui: I verify if "Security Group" is "pinned"
    And ui: I verify if "Assignment Total" is "unpinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "Dataset Preference" option is "Pinned" in the grid
    And ui: I verify that the "Security Group" option is "Pinned" in the grid
    And ui: I verify that the "Assignment Total" option is "UnPinned" in the grid
    And ui: Softassert all

  @testId=ST-1613
  @issue=SG-10758
  @owner=Vivek
  Scenario:BPAFG: Verify that the first 3 attribute columns must still automatically freeze even if none is pinned
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "Resource name" option is "Pinned" in the grid
    And ui: I verify that the "Project name" option is "Pinned" in the grid
    And ui: I verify that the "Task name" option is "Pinned" in the grid
    And ui: I verify that the "Assignment Total" option is "UnPinned" in the grid
    And ui: Softassert all

  @testId=ST-1482
  @issue=SG-11388
  Scenario: Validate that Net Availability and Allocation% present on different condition
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And setup: Test Data "Resource"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And ui: Click on "Resource Attributes and Identity"
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "100" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG

    # Validate that Net Availability and Allocation% are present when toggeld ON from the options in the BPAFG
    And I select "Resource Name" from the groupby dropdown in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Allocation %" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "present" when "resource option" is selected in groupby dropdown in the grid

    # Validate that Net Availability and Allocation% are not present when toggled OFF from the options in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "Off" in BPAFG Options
    And ui: I toggle "net avaliability" to "Off" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Allocation %" row is "not present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "not present" when "resource option" is selected in groupby dropdown in the grid

    # Validate that Net Availability and Allocation% are not present by default when BPAFG view is set to demand
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: Wait for 4 seconds
    And ui: I validate that the "Allocation %" row is "not present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "not present" when "resource option" is selected in groupby dropdown in the grid

    # Validate that Net Availability and Allocation% are present when BPAFG view is set to Allocation
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Allocation %" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "present" when "resource option" is selected in groupby dropdown in the grid

    # Validate that Net Availability and Allocation% are not present when groupby is set to Project related option in BPAFG
    And ui: Ungroup groups if any in BPAFG
    And I select "Project Name" from the groupby dropdown in BPAFG
    And ui: Wait for 1 second
    And ui: I validate that the "Allocation %" row is "not present" when "project option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "not present" when "project option" is selected in groupby dropdown in the grid

    # Validate that Net Availability and Allocation% are present when groupby is set to Resource related option in BPAFG
    And ui: Ungroup groups if any in BPAFG
    And I select "Resource Name" from the groupby dropdown in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Allocation %" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "present" when "resource option" is selected in groupby dropdown in the grid
    Then ui: Softassert all

  @testId=ST-1686
  @issue=SG-11388
  Scenario: Validate that Net Avaliability and Allocation% is recalculated
    Given setup: Test Data "SoftAssert"
    And setup: Test Data "Resource"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And ui: Click on "Resource Attributes and Identity"
    And ui: Click on User Identity section in Resource Attributes and Identity
    And ui: Enter default rate as "100" in Resource Attributes and Identity
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as start date and next year start as end date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Cost" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And I select "Resource Name" from the groupby dropdown in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG

    # Validate that Net Availability field value are automatically changed once time related to resource has been changed in BPAFG
    And ui: I validate that the "Allocation %" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I validate that the "Net Availability" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I check for the value of "Net Availability" "before" cost changed in the grid
    And ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: I click on the resource created in RM Grid
    And ui: I change the cost for the resource to "50" per hours
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Cost" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And I select "Resource Name" from the groupby dropdown in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Net Availability" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I check for the value of "Net Availability" "after" cost changed in the grid
    And I validate the value of "Net Availability" to be not same

    # Validate that Allocation% value are recalculated automatically once cost is changed from SPA
    And ui: I check for the value of "Allocation %" "before" cost changed in the grid
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Project" "Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: I navigate to Project
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Update hours to "50" for resource in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Default" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for resource created using model in entity selection section in BPAFG
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: I click on select all resource checkbox
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Cost" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Ungroup groups if any in BPAFG
    And I select "Resource Name" from the groupby dropdown in BPAFG
    And ui: I click on options in BPAFG
    And ui: I toggle "allocation" to "On" in BPAFG Options
    And ui: I toggle "net avaliability" to "On" in BPAFG Options
    And ui: Close Options section in BPAFG
    And ui: I validate that the "Allocation %" row is "present" when "resource option" is selected in groupby dropdown in the grid
    And ui: I check for the value of "Allocation %" "after" cost changed in the grid
    And I validate the value of "Allocation %" to be not same
    Then ui: Softassert all

  @testId=ST-1982
  @issue=SG-11386
  @owner=Devanshi
  @8.2
  Scenario:Show the assignment start/end date columns for BPAFG
    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG

    #3.Select the insert column-> search the start & end data column
    #4. Select the insert column-> add/remove the start & end date columns
    #5.Select the insert column-> pin the start or end date column
    And ui: I click on specific unit "Time" in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I pin the "Start Date" option in insert columns
    And ui: I verify if "Start Date" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "Start Date" option is displayed in the grid
    And ui: I verify that the "Start Date" option is "Pinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "Start Date" option in insert columns
    And ui: I verify if "Start Date" is "unpinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify that the "Start Date" option is "UnPinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I pin the "End Date" option in insert columns
    And ui: I verify if "End Date" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "End Date" option is displayed in the grid
    And ui: I verify that the "End Date" option is "Pinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "End Date" option in insert columns
    And ui: I verify if "End Date" is "unpinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify that the "End Date" option is "UnPinned" in the grid
    And ui: Softassert all

    #sorting-selector issue
    # # 6.Sort the start date and end date column with ascending or descending order(it will show only if Actual or Planned data set is defined)
    # And ui: I click on insert columns dropdown in BPAFG
    # And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    # And ui: I pin the "Start Date" option in insert columns
    # And ui: I verify if "Start Date" is "pinned"
    # And ui: I click on insert columns dropdown in BPAFG
    # And ui: I hover on "Start" Date header
    # And ui: I sort "Start" Date in "descending" order
    # And ui: I validate "Start" Date is sorted in "descending" order
    # And ui: I click on insert columns dropdown in BPAFG
    # And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    # And ui: I pin the "End Date" option in insert columns
    # And ui: I verify if "End Date" is "pinned"
    # And ui: I click on insert columns dropdown in BPAFG
    # And ui: I hover on "End" Date header
    # And ui: I sort "End" Date in "descending" order
    # And ui: I validate "End" Date is sorted in "descending" order

    #  7. Validate export excel button of BPAFG grid
    And ui: Remove a directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Click on export icon in the BPAFG grid section
    And ui: Softassert if exported csv file got downloaded in directory:"ST-1982_Downloads" under project's root directory with extension "csv" for "BPAFG" tab

    # 9. Validate column filters are added
    # 10. Validate column filters are removed
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on column filter of "Start" Date
    And ui: I click on "within" column filter
    And ui: I select "this year" as filter and validate applied filter
    And ui: I clear selected column filters of "Start" date
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on column filter of "End" Date
    And ui: I click on "within" column filter
    And ui: I select "this year" as filter and validate applied filter
    And ui: I clear selected column filters of "End" date

    #11. Validate user can group data on BPAFG grid by start/end date
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: Wait for 4 seconds
    And ui: I validate data is grouped by "Start Date" attribute
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: Wait for 4 seconds
    And ui: I validate data is grouped by "End Date" attribute
    And ui: Ungroup groups if any in BPAFG
    And ui: Logout

    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

    Given setup: Test Data "SoftAssert"
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG

    #13. Gantt View
    And ui: I click on specific unit "Gantt" in BPAFG

    #14.Select the insert column-> search the start & end data column
    #15. Select the insert column-> add/remove the start & end date columns
    #20. Select the period options
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I pin the "Start Date" option in insert columns
    And ui: I verify if "Start Date" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "Start Date" option is displayed in the grid
    And ui: I verify that the "Start Date" option is "Pinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "Start Date" option in insert columns
    And ui: I verify if "Start Date" is "unpinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify that the "Start Date" option is "UnPinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I pin the "End Date" option in insert columns
    And ui: I verify if "End Date" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I verify that the "End Date" option is displayed in the grid
    And ui: I verify that the "End Date" option is "Pinned" in the grid
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I pin the "End Date" option in insert columns
    And ui: I verify if "End Date" is "unpinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I verify that the "End Date" option is "UnPinned" in the grid
    And ui: Softassert all

    #  16. Validate export excel button of Gantt BPAFG grid
    And ui: Remove a directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Click on export icon in the BPAFG grid section
    And ui: Softassert if exported csv file got downloaded in directory:"ST-1982_Downloads" under project's root directory with extension "csv" for "BPAFG" tab

    # 17. Validate column filters are added
    # 18. Validate column filters are removed
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I pin the "Start Date" option in insert columns
    And ui: I verify if "Start Date" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on column filter of "Start" Date
    And ui: I click on "within" column filter
    And ui: I select "this year" as filter and validate applied filter
    And ui: I clear selected column filters of "Start" date
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I pin the "End Date" option in insert columns
    And ui: I verify if "End Date" is "pinned"
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on column filter of "End" Date
    And ui: I click on "within" column filter
    And ui: I select "this year" as filter and validate applied filter
    And ui: I clear selected column filters of "End" date

    #19. Validate user can group data on BPAFG grid by start/end date
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in insert columns dropdown in BPAFG
    And ui: I pin the "Start Date" option in insert columns
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: Wait for 4 seconds
    And ui: I validate data is grouped by "Start Date" attribute
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in insert columns dropdown in BPAFG
    And ui: I pin the "End Date" option in insert columns
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "End Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: Wait for 4 seconds
    And ui: I validate data is grouped by "End Date" attribute


  @issue=SG-12218
  @owner=Devanshi
  @8.2
  Scenario: BPAFG when grouping by default rate, error occurs
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Wait for 1 second
    And ui: Close entity selection section in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "Default rate" in group by dropdown in BPAFG
    And ui: Click on expand icon in BPAFG grid
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12244
  @8.2
  Scenario: BPAFG - scroll and then click on project causes error
    Given setup: Test Data "SoftAssert"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    # The below test case wont work due to project list being created dynamically while scrolling on BPAFG
    # And ui: I scroll to the recently created project and click on it
    Then ui: Softassert all

  @issue=SG-12325
  @8.2
  Scenario: BPAFG - when insert/remove columns, cannot update bpafg date range, dataset or projects/resources
    Given ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    When ui: I create new view using model and select it
    And ui: I enter current year in start and End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I click on select all projects checkbox in entity selection section in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: I uncheck and select attributes "Assignment Total,Dataset Preference,Security Group,Project Owner" in insert columns dropdown in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    Then ui: I click on select attribute "Assignment Total,Dataset Preference,Security Group,Project Owner" and validate no error message is displayed
    And ui: Select Dataset as "Demand" in BPAFG if not already selected
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Actual" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: I click on Group by dropdown in BPAFG
    And ui: I uncheck and select attributes "Start Date" in group by dropdown in BPAFG
    And ui: I click on Group by dropdown in BPAFG
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12097
  @owner=Devanshi
  @8.2
  Scenario: PM/RM - automatically creates 'default' view after visiting BPAFG and approving resource request
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"

    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section

    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Change value of CF "Require Resource Manager Approval" of type "Bool" to "Yes" in Resource Attributes and Identity
    And ui: Update resource manager in resource edit page
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable

    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown

    And ui: Allocate "100" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Logout

    When ui: I login with "resourceManager" account
    And ui: I navigate to "Bulk Project" "Allocation Flatgrid"
    And ui: I validate new view is not created

  @issue=SG-12619
  @owner=Rinkesh
  @9.0.1
  Scenario: BPAFG - Generic task should not be case-sensitive in add new assignment
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    When ui: I enter current year in start and next year start date as End date in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected

    And ui: Click on Add Assignment button in BPAFG
    And ui: Click on Choose Project dropdown in Add Assignment modal of BPAFG
    And ui: Search and Select recently created Project in Add Assignment modal of BPAFG
    Then ui: Verify if dropdown has been opened

    And ui: Click on Choose Resource dropdown in Add Assignment modal of BPAFG
    And ui: Search and Select recently created Resource in Add Assignment modal of BPAFG
    And ui: Verify if dropdown has been opened
    And ui: Click on Choose Task dropdown in Add Assignment modal of BPAFG
    And ui: Search and add the task from Project model in Add Assignment modal of BPAFG
    And ui: Verify if dropdown has been opened
    And ui: Click on Choose Resource dropdown in Add Assignment modal of BPAFG
    And ui: Click on Allow new resources checkbox in Add Assignment modal of BPAFG
    And ui: Select random resource in Add Assignment modal of BPAFG

    And ui: Verify Generic task should not be case sensitive in add new assignment
    And ui: Softassert all

  @testId=ST-2075
  @9.0
  Scenario: SG-12118 - BPAFG - Validate allocation for seven days work week
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And ui: Click on "Resource Attributes and Identity"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter Start date as "01.03.2024" and End date as "31.03.2024" in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "126" hour for resource to project in SPA in Month mode for the dates between "01.03.2024" and "31.03.2024" when dataset is "Allocation" and assignment type "Planned"
    And ui: I select specific date mode "Day" in SPA
    And ui: I enter allocation value as "6" for weekends between date range from "01.03.2024" to "10.03.2024" in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button


    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Enter Start date as "01.03.2024" and End date as "31.03.2024" in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG

    And ui: I click on specific unit "Cost" in BPAFG
    And ui: Select Date mode as:"Day" in BPAFG if not already selected
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: I click on specific unit "FTE" in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: I click on specific unit "FTEP" in BPAFG
    And ui: Select Date mode as:"Day" in BPAFG if not already selected
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    And ui: Softassert all

  @issue=SG-12755
  @owner=Devanshi
  @9.0.2
  Scenario: BPAFG - When in Allocation + Demand, and turn on heatmap, error occurs
    Given setup: Test Data "Resource"
    And setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    When ui: I enter current year in start and next year start date as End date in BPAFG
    And ui: Select Dataset as "Allocation + Demand" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned Actual" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on options in BPAFG
    And ui: Select Overlay Heatmap as:"Resource" in Grid options of BPAFG
    And ui: Select Tasks to show as:"All" in Grid options of BPAFG
    And ui: Close Options section in BPAFG
    Then ui: Verify if cells by indices:"1,2" for recently created "resource" is highlighted with resource color in BPAFG Grid
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12725
  @9.0.2
  Scenario: BPAFG fails in weekend mode
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And setup: Test Data "Project"
    And ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I toggle Working Weekends to "On" in General settings global tab
    And ui: Click on Save button in General Settings and wait for Save button to be clickable again
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter Start date as "01.03.2024" and End date as "31.03.2024" in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "126" hour for resource to project in SPA in Month mode for the dates between "01.03.2024" and "31.03.2024" when dataset is "Allocation" and assignment type "Planned"
    And ui: I select specific date mode "Day" in SPA
    And ui: I enter allocation value as "6" for weekends between date range from "01.03.2024" to "10.03.2024" in SPA
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Enter Start date as "24.07.2023" and End date as "31.12.2024" in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    Then ui: I verify client or server error warning is not displayed

  @issue=SG-12731
  @owner=Devanshi
  @9.1
  Scenario: BPA FG: value changed after entering in non dominant unit
    Given setup: Test Data "Project"
    When setup: Test Data "Resource"
    When setup: Test Data "SoftAssert"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter current year as date for the project in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Enter Start date as "01.01.2024" and End date as "31.12.2024" in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I enter allocation value as "10" for date "01.01.2024" in BPAFG if start date is "01.01.2024"
    Then ui: I verify client or server error warning is not displayed

  @testId=ST-2120
  @issue=SG-12496
  @owner=Devanshi
  @9.1
  Scenario: Check Exceeded capacity warning in BPAFG.
    Given setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"

    Given ui: Quick navigate to "Admin Settings"
    And ui: Click on General Settings tile
    And ui: Check fiscal month and fiscal quarter
    And ui: Click on Save button in General Settings and click on Save Settings button if displayed

    Given ui: Quick navigate to "Admin Settings"
    When ui: I navigate to specific tile "Fiscal Period Management" in admin settings
    And ui: I create fiscal period for "current" year in fiscal period management
    And ui: I click on save button in fiscal period management
    And ui: Wait for 4 seconds

    Given ui: I navigate to "Dashboard"
    When ui: Click on "Admin Settings" tile in homepage
    When ui: I navigate to "Financial" "Categories"
    And ui: I click on create new financial category
    And ui: I enter a name for Financial Category with "Positve" and type as "Default"
    And ui: I click on Save button in the financial category create model

    And setup: Test Data "Project"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Project navigation dropdown and select "Financials"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I select recently created financial category
    And ui: Select Date mode as:"Month" in Financials if not already selected
    And ui: I allocate "100" hours to the financial category for each months
    And ui: Select Date mode as:"Quarter" in Financials if not already selected
    And ui: Click on Include labor costs toggle
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Click on Project navigation dropdown and select "Allocations"
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Quick navigate to "Resource Management"
    And ui: Clear filters if any in RM Grid
    And ui: Ungroup groups if any in RM Grid
    And ui: Search for recently created "resource" in RM Grid
    And ui: I click on the resource created in RM Grid
    And ui: Click on Resource navigation button and select "Capacity"
    And ui: Enter start date as "04/04/2024" of current year
    And ui: I click on save button
    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Enter Start date as "01.01.2024" and End date as "31.12.2024" in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on options in BPAFG
    And ui: Switch Exceeded capacity toggle "On" in BPAFG
    And ui: Press Escape Key
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: I click on specific unit "Cost" in BPAFG
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: I click on specific unit "FTE" in BPAFG
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: I click on specific unit "FTEP" in BPAFG
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: I click on specific unit "Manday" in BPAFG
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Day" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: Select Date mode as:"Week" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: Select Date mode as:"Month" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: Select Date mode as:"Quarter" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: Select Date mode as:"Year" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: Select Date mode as:"Fiscal Month" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: Select Date mode as:"Fiscal Quarter" in BPAFG if not already selected
    Then ui: I verify Warning icon must be displayed beside the resource name in BPAFG
    And ui: I click on warning icon showing beside Resource in BPAFG
    Then ui: Verify that warning alert has the exceeded capacity Time and FTE Values in BPAFG
    And ui: Softassert all

  @testId=ST-2140
  @issue=SG-12498
  @issue=SG-12888
  @9.1
  Scenario: Check Year mode in BPAFG
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    When ui: I navigate to "Admin" "Settings"
    And ui: Click on General Settings tile
    And ui: Click on "Global" tab in General Settings
    And ui: I validate if mode of entry "Year" is "enabled"
    And api: I create a default resource for automation with default rate as "100"
    And ui: I search for resource in global search and click on it
    And ui: turn on has capacity toggle "On"
    And api: I create a default project for automation with date range as "current" year
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Enter Start date as "01.01.2024" and End date as "31.12.2024" in SPA
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Year" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Year mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button

    And ui: Quick navigate to "Bulk Project Allocation Flatgrid"
    And ui: Enter Start date as "01.01.2024" and End date as "31.12.2024" in BPAFG
    And ui: Select Dataset as "Allocation" in BPAFG if not already selected
    And ui: Select Assignment Type as:"Planned" in BPAFG if not already selected
    And ui: Click on entity selection dropdown and click on "Project" tab in BPAFG
    And ui: I clear filters in both projects and resources section
    And ui: I search for project created using model in entity selection section in BPAFG
    And ui: Select the select all projects checkbox if not already selected in BPAFG
    And ui: Close entity selection section in BPAFG
    And ui: I click on specific unit "Time" in BPAFG
    And ui: Select Date mode as:"Year" in BPAFG if not already selected
    And ui: I click on options in BPAFG
    And ui: Switch Exceeded capacity toggle "On" in BPAFG
    And ui: I toggle show total row to "On" in BPAFG Options
    And ui: Press Escape Key
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Unselect Columns if any in BPAFG
    And ui: I click on insert columns dropdown in BPAFG
    And ui: Allocate "1200" hours for resource to project in BPAFG in "Year" mode for current year
    Then ui: I verify client or server error warning is not displayed

    And ui: Remove a directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Create a new directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Set downloads directory as:"ST-1982_Downloads" in projects's root directory
    And ui: Click on export icon in the BPAFG grid section
    And ui: Softassert if exported csv file got downloaded in directory:"ST-1982_Downloads" under project's root directory with extension "csv" for "BPAFG" tab
    And ui: Softassert all