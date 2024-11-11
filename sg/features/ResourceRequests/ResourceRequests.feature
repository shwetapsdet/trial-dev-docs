Feature: Resource Requests

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1441
  @issue=SG-9937
  @owner=Ram
  Scenario: SG-9937 - Allow Rich Text for Text attributes [All RR, RR, Edit RR (Resource and Assignment CFs)]
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    When ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create Rich text type attributes in "Project" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Resource" tab with default values and add them to "Required Fields" section
    And ui: Click on Attribute List tab in Attribute Management
    And ui: Create Rich text type attributes in "Assignment" tab with default values and add them to "Required Fields" section
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new Resource
    And ui: Change value of CF "Is Resource Manager" of type "Bool" to "No" in Resource Attributes and Identity
    And ui: Change value of CF "Require Resource Manager Approval" of type "Bool" to "Yes" in Resource Attributes and Identity
    And ui: Update resource manager in resource edit page
    And ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable
    When ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project with current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: Allocate "1000" hours for resource to project in SPA in Project mode when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    When ui: I login with "resourceManager" account
    # #16 - Resource Requests - View
    And ui: Click on "Resource Requests" tile in homepage
    And ui: I click on choose columns dropdown in Resource Request
    And ui: Search and Select recently created Project and Resource CFs in Choose columns of RR page
    And ui: I click on choose columns dropdown in Resource Request
    Then ui: Verify Rich text in "Resource Requests" section for recently created Cfs
    And ui: Click on pending RR of recently created project and resource in RR page
    And ui: Search and Select resource attributes created earlier in edit Resource request page
    # #15 - All Resource Requests - View
    When ui: Quick navigate to "All Resource Requests"
    And ui: I click on choose columns dropdown in Resource Request
    And ui: Search and Select recently created Project and Resource CFs in Choose columns of RR page
    And ui: I click on choose columns dropdown in Resource Request
    Then ui: Verify Rich text in "All Resource Requests" section for recently created Cfs

    Then ui: Softassert all
  
  @testId=ST-1374
  Scenario: SG-11071 Add Additional filters to RR approval screen
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
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
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I uncheck select all checkbox in choose columns dropdown in Resource Request
    And ui: I search and select columns "Project Name,Resource Name,Resource Request Status" in Resource Request
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I click on pending resource request in Resource Request tab
    And ui: I click on options button in Resource Request
    And ui: I verify overlay heatmap is displayed in Resource Request
    And ui: I verify show resources is displayed in Resource Request

  @testId=ST-1615
  Scenario: Overlay Heatmap - Must highlight the cells depending on the resource availability:
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
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
    And ui: Allocate specific "176,160,-184,100,200,300,400,500,600,700,800,900" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I uncheck select all checkbox in choose columns dropdown in Resource Request
    And ui: I search and select columns "Project Name,Resource Name,Resource Request Status" in Resource Request
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I click on pending resource request in Resource Request tab
    And ui: I click on options button in Resource Request
    And ui: I toggle overlay heatmap to "ON" in Resource Request Options
    And ui: I close options overlay in Resource Request
    Then ui: I verify color "White1" of specific cell "1" in netavailability section in Resource Request
    Then ui: I verify color "Green1" of specific cell "2" in netavailability section in Resource Request
    Then ui: I verify color "Red1" of specific cell "5" in netavailability section in Resource Request

  @testId=ST-1616
  Scenario: Show resources - Must have All, Available, Current project, and Current Task options.
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Resource2"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create two resource with username, password, global role and add same resource manager
    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate random hours for two resource task in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I uncheck select all checkbox in choose columns dropdown in Resource Request
    And ui: I search and select columns "Project Name,Resource Name,Task Name,Resource Request Status" in Resource Request
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I click on specific resource request status "Pending" of task created using model in Resource Request tab
    And ui: I click on options button in Resource Request
    And ui: I toggle overlay heatmap to "ON" in Resource Request Options
    And ui: I close options overlay in Resource Request
    Then ui: I click on specific show resources options and verify resources under net availability section in Resource Request tab

  @testId=ST-1406
  Scenario: SG-10710 Project > Resource requests page > Unable to open pending resource request if project is in checkout status.
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
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
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Project navigation dropdown and select "Resource Requests"
    And ui: Click on "Leave without saving" button in confirmation modal
    And ui: I click on pending resource request in Resource Request tab
    Then ui: I verify specific status "Approve" button is displayed in Resource Request view
    And ui: I click on specific project in Resource Request view
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Project navigation dropdown and select "Resource Requests"
    And ui: Click on "Save and Check In" button in confirmation modal
    And ui: I click on pending resource request in Resource Request tab
    Then ui: I verify specific status "Approve" button is displayed in Resource Request view
    And ui: I click on specific project in Resource Request view
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: Click on Project navigation dropdown and select "Resource Requests"
    And ui: Click on "No. Don't leave this page" button in confirmation modal
    Then ui: I verify release button is displayed in SPA
    And ui: Click on Project navigation dropdown and select "Resource Requests"
    And ui: Click on "Save" button in confirmation modal
    Then ui: I specific project lock icon is displayed in Resource Request

  @testId=ST-1617
  @issue=SG-11293
  Scenario: Must highlight the task the name and cells in SPA with the same color depending on its status, Pending status must be blue, Approved status must be green.
    Given setup: Test Data "Resource"
    When setup: Test Data "Project"
    And setup: Test Data "SoftAssert"

    Given ui: Quick navigate to "Resource Management"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource by adding resource manager, username, password, global role
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I close options overlay in SPA
    And ui: Clear quick search in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#0386FF" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on expand all icon in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#0386FF" in SPA for current year when dataset is "Allocation"
    And ui: Logout

    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I uncheck select all checkbox in choose columns dropdown in Resource Request
    And ui: I search and select columns "Project Name,Resource Name,Task Name,Resource Request Status" in Resource Request
    And ui: I click on choose columns dropdown in Resource Request
    And ui: Click on pending RR of recently created project and resource in RR page
    And ui: I click on specific RR status "Approve" in Resource Request
    And ui: I click on apply changes button in Resource Request
    And ui: Search for Project in global search and click on it
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I close options overlay in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#E7F8E6" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on expand all icon in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify heatmap color "#E7F8E6" in SPA for current year when dataset is "Allocation"
    Then ui: Softassert all

  @testId=ST-1618
  @issue=SG-11293
  Scenario: Must highlight the task the name and cells in SPA with the same color depending on its status, Rejected status must be red
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource by adding resource manager, username, password, global role
    And setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create a new Regular Project and set current year jan month start and end date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Week" in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: Add recently created resource in SPA when dataset is "Allocation"
    And ui: Unselect any attributes selected in SPA and close the dropdown
    And ui: Update "50" hours for resource in specific cell "2" in SPA when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout

    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    And ui: Click on pending RR of recently created project and resource in RR page
    And ui: I click on specific RR status "Reject" in Resource Request
    And ui: I click on apply changes button in Resource Request
    And ui: Search for Project in global search and click on it
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
    And ui: Click on option: "All" in Tasks to Show in Grid Options of SPA
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I close options overlay in SPA
    And ui: Clear quick search in SPA
    And ui: I select specific date mode "Month" in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify specific cell "1" heatmap color "#FFB9B9" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on expand all icon in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify specific cell "1" heatmap color "#FFB9B9" in SPA for current year when dataset is "Allocation"
    And ui: Logout

    And ui: I attempt to login with valid credentails
    And ui: Search for Project in global search and click on it
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Week" in SPA
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: Update "50" hours for resource in specific cell "3" in SPA when dataset is "Allocation"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    And ui: Click on pending RR of recently created project and resource in RR page
    And ui: I click on specific RR status "Approve" in Resource Request
    And ui: I click on apply changes button in Resource Request
    #Must highlight the task the name and cells in SPA with the same color depending on its status, Partially Approved status must be yellow
    And ui: Search for Project in global search and click on it
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on options dropdown in SPA
    And ui: I click on specific heatmap toggle "Resource request" in SPA grid options dialog
    And ui: I toggle overlay heatmap for rows option to "On" in SPA grid options dialogs
    And ui: I toggle overlay heatmap for groups option to "On" in SPA grid options dialogs
    And ui: I close options overlay in SPA
    And ui: I select specific date mode "Month" in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify specific cell "1" heatmap color "#FFF3B0" in SPA for current year when dataset is "Allocation"
    And ui: I click on group by dropdown and select "Resource" in SPA
    And ui: I click on expand all icon in SPA
    Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify specific cell "1" heatmap color "#FFF3B0" in SPA for current year when dataset is "Allocation"
    Then ui: Softassert all

  @testId=ST-1488
  @issue=SG-11585
  Scenario: RR List is failing with unexpected Server Error during page visit
    Given ui: Quick navigate to "Resource Management"
    When setup: Test Data "Resource"
    And setup: Test Data "Project"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource by adding resource manager, username, password, global role
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    And ui: I navigate to "Resource" "Requests"
    Then ui: I verify client or server error warning is not displayed
    And ui: I click on choose columns dropdown in Resource Request
    And ui: I uncheck select all checkbox in choose columns dropdown in Resource Request
    And ui: I search and select columns "Project Name,Resource Name,Task Name,Resource Request Status" in Resource Request
    And ui: I click on choose columns dropdown in Resource Request
    And ui: Click on pending RR of recently created project and resource in RR page
    And ui: I click on specific RR status "Approve" in Resource Request
    And ui: I click on apply changes button in Resource Request
    Then ui: I verify client or server error warning is not displayed
    And ui: I click on logo to navigate to homepage
    And ui: Quick navigate to "All Resource Requests"
    Then ui: I verify client or server error warning is not displayed
    Then ui: I verify specific resource request status "Approved" is displayed in All Resource Requests tab

  @testId=ST-1966
  @testId=ST-1967
  @issue=SG-11939
  @owner=Devanshi
  @8.2
  Scenario: Timeframe filter for NA grid on Resource Request View
    Given setup: Test Data "Project"
    And setup: Test Data "Resource"
    And setup: Test Data "SoftAssert"
    Given ui: Quick navigate to "Resource Management"
    And ui: I create a new resource manager with username, password, global role
    And ui: Quick navigate to "Resource Management"
    And ui: I create a new resource by adding resource manager, username, password, global role
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: Click on Checkout button in SPA and wait for Release button
    And ui: I click on specific unit "Time" in SPA
    And ui: I select specific date mode "Month" in SPA
    And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation" and assignment type "Planned"
    And ui: Click on Save and Check In button in SPA and wait for Checkout button
    And ui: Logout
    And ui: I login with "resourceManager" account
    # #16 - Resource Requests - View
    And ui: Click on "Resource Requests" tile in homepage
    And ui: I click on choose columns dropdown in Resource Request
    And ui: Search and Select recently created Project and Resource CFs in Choose columns of RR page
    And ui: I click on choose columns dropdown in Resource Request
    Then ui: Verify Rich text in "Resource Requests" section for recently created Cfs

    And ui: Click on pending RR of recently created project and resource in RR page
    And ui: Search and Select resource attributes created earlier in edit Resource request page

    # 3. Must be possible to leave the start date or end date blank.
    And ui: Click on Options button in NA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    Then ui: Verify dates of Date Range Filter in Grid options of NA are empty
    #1. Must not be possible to set a start date later than the end date.
    And ui: Enter start date as "last" of the month "Aug" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA
    Then ui: Verify end date is "last" of the month "Aug" of current year in Grid options of NA
    #2. Must not be possible to set the end date earlier than the start date.
    And ui: Clear dates of Date Range Filter in Grid options of NA
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA
    And ui: Enter end date as "last" of the month "Jan" of current year in Grid options of NA
    Then ui: Verify end date is "first" of the month "Mar" of current year in Grid options of NA
    #4. Must limit the user to enter dates in the new date filter within the date range of the project
    And ui: Clear dates of Date Range Filter in Grid options of NA
    And ui: Enter start date as "first" of the month "Mar" of previous year in Grid options of NA
    Then ui: Verify start date is "first" of the month "Jan" of current year in Grid options of NA in RR
    And ui: Enter end date as "first" of the month "Mar" of next year in Grid options of NA
    Then ui: Verify end date is "last" of the month "Dec" of current year in Grid options of NA in RR
    #7. Check Net availability grid after enter start and end date.
    And ui: Enter start date as "first" of the month "Mar" of current year in Grid options of NA
    And ui: Enter end date as "first" of the month "Aug" of current year in Grid options of NA
    And ui: Close Options section in SPA
    And ui: Clear dates of Date Range Filter in Grid options of NA
    # Then ui: Verify start date is month "Mar" of current year in Grid options of NA
    # Then ui: Verify end date is month "Aug" of current year in Grid options of NA
    And ui: Close Options section in SPA
    And ui: Enter end date as "last" of the month "Dec" of current year in Grid options of NA
    And ui: Select option "Current Qtr" and check net availability grid
    And ui: Close Options section in SPA
    And ui: I validate date is set automatically to current qtr of the month
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Next Qtr" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next qtr of the month
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Current Year" and check net availability grid
    And ui: Close Options section in SPA
    And ui: I validate date is set automatically to end of the year
    And ui: Click on Options button in NA
    And ui: I click on dynamic date options
    And ui: Select option "Next Year" and check net availability grid
    # And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to end of the year
    And ui: Select option "YTD" and check net availability grid
    And ui: Select option "+3 Months" and check net availability grid
    # And ui: Verify option "+3 Months" and check net availability grid
    And ui: Select option "+6 Months" and check net availability grid
    # And ui: Verify option "+6 Months" and check net availability grid
    # And ui: Click on Options button in NA
    # And ui: I click on dynamic date options
    And ui: Select option "3 Years" and check net availability grid
    And ui: Close Options section in SPA
    # And ui: I validate date is set automatically to next three year end of the year
