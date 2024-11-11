Feature: Report Management Core Test

    Background: Login to SG
        Given ui: I opened SG Login Page
        And ui: I attempt to login with valid credentails
        Then ui: I validate for successful login
        And ui: Click on username and select Profile
        And ui: Create a token for "1" "Hours"

    @core
    Scenario: Report Management Core Test
        And setup: Test Data "SoftAssert"
        Given ui: Quick navigate to "Report Management"
        When ui: Click on "Pivot Grid" tile in Report Management
        And ui: I enter report name in pivot grid
        And ui: I click on specific tab "Dimensions" in pivot chart
        Then ui: I verify search icon is displayed in pivot chart dimensions tab
        And ui: I click on search icon in pivot chart dimensions tab
        Then ui: I verify search field is displayed in pivot chart dimensions tab
        And ui: I drag and drop "Date" into "Rows"
        And ui: I click on "Project Dimensions" element
        And ui: I drag and drop "Project Is Proposal" into "Columns"
        And ui: I click on "Project Dimensions" element
        And ui: I click on "Measures" element
        And ui: I click on "Planned Allocation" element
        And ui: I drag and drop "Planned Allocation Time" into "Measures"
        And ui: Remove a directory as:"ST-2056_Downloads" in projects's root directory
        And ui: Create a new directory as:"ST-2056_Downloads" in projects's root directory
        And ui: Set downloads directory as:"ST-2056_Downloads" in projects's root directory
        And ui: I export the created report
        Then ui: Softassert if exported pdf file got downloaded in directory:"ST-2056_Downloads" under project's root directory with extension "pdf" for "PivotGrid" tab
