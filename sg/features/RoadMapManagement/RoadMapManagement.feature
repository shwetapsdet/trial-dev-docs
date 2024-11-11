Feature: Roadmap Management

  Background: Login to SG
    Given ui: I opened SG Login Page
    When ui: I login with "administrator" account

  @testId=ST-1619
  @owner=Vivek
  Scenario: Validate that a new clone Roadmap is created from another roadmap
    Given ui: I navigate to "Roadmap" "Management"
    When ui: I Create a new Roadmap
    And ui: I navigate to previous window
    And ui: I clone new Roadmap from previously created one
    And ui: I click on Save button
    Then ui: I validate newly cloned roadmap details

  @testId=ST-1620
  @owner=Vivek
  Scenario: Validate that after deleting cloned roadmap the original roadmap remains unchanged
    Given ui: I navigate to "Roadmap" "Management"
    When ui: I Create a new Roadmap
    And ui: I navigate to previous window
    And ui: I clone new Roadmap from previously created one
    And ui: I click on Save button
    And ui: I validate newly cloned roadmap details
    And ui: I delete the cloned roadmap
    Then ui: I validate that the cloned roadmap is deleted but the original roadmap wont be deleted

  @testId=ST-1621
  @owner=Vivek
  Scenario: Validate 'Open on Clone' Toggle button and user gets redirected to the cloned roadmap landing page
    Given ui: I navigate to "Roadmap" "Management"
    When ui: I Create a new Roadmap
    And ui: I navigate to previous window
    And ui: I clone new Roadmap from previously created one
    And ui: I select toggle button to open on clone as "Yes"
    And ui: I click on Save button
    Then ui: I validate newly cloned roadmap details
    And ui: I Validate that the cloned roadmap is directly open

  @testId=ST-1622
  @owner=Vivek
  Scenario: Validate that the cloned roadmap is edited
    Given setup: Test Data "Project"
    And ui: Quick navigate to "Project Management"
    And ui: Create a new Regular Project and set current year as date for allocations
    And ui: I click on logo to navigate to homepage
    And ui: I navigate to "Roadmap" "Management"
    When ui: I Create a new Roadmap
    And ui: I navigate to previous window
    And ui: I clone new Roadmap from previously created one
    And ui: I select toggle button to open on clone as "Yes"
    And ui: I click on Save button
    And ui: I Validate that the cloned roadmap is directly open
    And ui: I open Roadmap Options in landing page of roadmap
    Then ui: I edit the Roadmap Options for Toggle "Project Milestones" as "Yes" in the roadmap
    And ui: I validate that the toggle options "Project Milestones" is updated as "Yes"
    And ui: I edit the Roadmap Options for Toggle "Overallocation risk" as "Yes" in the roadmap
    And ui: I validate that the toggle options "Overallocation risk" is updated as "Yes"