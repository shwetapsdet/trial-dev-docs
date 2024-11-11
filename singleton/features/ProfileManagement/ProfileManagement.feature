Feature: Profile Management tasks

  Background: Login to SG
    Given ui: I opened SG Login Page
    And ui: I attempt to login with valid credentails for user "1"
    And ui: I validate for successful login

  @testId=ST-1532
  @issue=SG-11466
  Scenario: Support additional languages
    Given setup: Test Data "SoftAssert"
    When ui: Click on username and select Profile
    And ui: Click on Language dropdown in Profile
    And ui: Validate that there are different supported languages present
    And ui: Select "Japanese" from the language dropdown in Profile
    And ui: Validate changes done in "Profile" for "Japanese" language
    And ui: Click on Language dropdown in Profile
    And ui: Select "English" from the language dropdown in Profile
    And ui: Validate changes done in "Profile" for "English" language
    Then ui: Softassert all