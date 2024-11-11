Feature: SG-2451 - Sorting in PM and RM Grid

  Background: Login to the application
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails
    Then ui: I validate for successful login

  @testId=ST-1323
  @issue=SG-11577
  @owner=Ram
  Scenario: Verify Sorting (both ascending and descending) in PM Grid [Attribute types verified: Bool,Currency,Date,Multi-Selection,Number,Precision Number,Progress Bar,Selection,String,Tags,Text,Url]
    #TODO: verify for the remaining attribute types
    Given setup: Test Data "SoftAssert"
    Given ui: Click on "Admin Settings" tile in homepage
    And ui: Click on "Attribute Management" tile in Admin settings
    And ui: Create all types of attributes in "Project" tab and add to "Required Fields" section of Attribute Management
    And ui: Create "1" projects and assign values to attributes created earlier
    And ui: Quick navigate to "Project Management"
    And ui: Clear filters if any in PM Grid
    And ui: Ungroup groups if any in PM Grid
    Then ui: Softassert all
