Feature: Resource Requests core test suite

    Background: Login to SG
        Given ui: I opened SG Login Page
        And ui: I attempt to login with valid credentails
        Then ui: I validate for successful login
        And ui: Click on username and select Profile
        And ui: Create a token for "1" "Hours"
        And ui: I navigate to "Dashboard"
    
    @core
    Scenario: RR e2e test scenario
        Given ui: Quick navigate to "Resource Management"
        When setup: Test Data "Resource"
        And setup: Test Data "SoftAssert"
        And setup: Test Data "Project"
        And ui: I create a new resource manager with username, password, global role
        And ui: Quick navigate to "Resource Management"
        And ui: I create a new resource by adding resource manager, username, password, global role
        And ui: Wait for 4 seconds
        And api: I create a default project for automation with date range as "current" year
        And ui: Search for Project in global search and click on it
        And ui: Click on Checkout button in SPA and wait for Release button
        And ui: I click on specific unit "Time" in SPA
        And ui: I select specific date mode "Month" in SPA
        And ui: Unselect any attributes selected in SPA and close the dropdown
        And ui: I click on group by dropdown and select "Resource" in SPA
        And ui: Allocate "100" hours for resource to project in SPA in Month mode for current year when dataset is "Allocation"
        And ui: Click on Save and Check In button in SPA and wait for Checkout button
        And ui: Logout
        
        # Reject the Resource Request 
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
        And ui: I select specific date mode "Month" in SPA
        And ui: I click on group by dropdown and select "Resource" in SPA
        And ui: Update "200" hours for recently added resource in SPA for months:"Jan,Feb,Mar" of current year when dataset is "Allocation"
        And ui: Click on Save and Check In button in SPA and wait for Checkout button
        And ui: Logout

        # Approve the Resource Request 
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
        Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify specific cell "1" heatmap color "#E7F8E6" in SPA for current year when dataset is "Allocation"
        And ui: I click on group by dropdown and select "Resource" in SPA
        And ui: I click on expand all icon in SPA
        Then ui: I select specific unit "FTE,FTE %,Manday,Time" and verify specific cell "1" heatmap color "#E7F8E6" in SPA for current year when dataset is "Allocation"
        Then ui: Softassert all