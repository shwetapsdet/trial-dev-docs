/* eslint-disable no-useless-escape */
/* eslint-disable eol-last */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
import { Given, Then } from '@cucumber/cucumber';
import { context } from '../../../../utils/context';
import { Project } from '../../../../helpers/Project.helper';
import Selectors from '../../../../core/selectors';
import { clickToElement, element, locatorParse, selectFromDropdown, mayBeElement, formFill, isElementDisplayed, selectAllTextUsingCTRLPlusA, clickOnBackspaceKey, elementParseAndClick, isElementSelected, watiForElementToBeDisappear } from '../../../../core/func';
import { Common } from '../../../../helpers/common.helper';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE, SHORT_TIMEOUT, WARNING_DISAPPEAR_TIME } from '../../../../core/timeouts';
import { ProjectGrid } from '../../../../helpers/ProjectManagement/Grid.helper';
import { config } from '../../../../wdio.base.conf'
import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';
import { AttributeTypes } from '../../../../core/enums';


Given('ui: I opened SG Login Page', async () => {
  await browser.url(context().user.baseUrl);
  await browser.waitUntil(async function () {
    return (await browser.getTitle()) === config.siteTitle
  }, {
    timeout: ELEMENT_TIMEOUT,
    timeoutMsg: `Login page did not load within {${ELEMENT_TIMEOUT}}ms`
  })
});

/**
 * @ProjectManagement
 */
Given(/^ui: I switch to Project Option "([^"]*)"$/, async (projectOption: string) => {
  await Project.switchToOption(projectOption);
  const elSave = await isElementDisplayed(`//div/button[normalize-space(.)="Save"]`)
  if (elSave) {
    await clickToElement('//div/button[normalize-space(.)="Save"]');
  }
});

Then(/^ui: Verify if value "([^"]*)" is displayed in dropdown$/, async (optionToBeVerified: string) => {
  await expect(locatorParse(Selectors.common.dropdownSpecificValue, optionToBeVerified));
});

Then(/^ui: Click on "([^"]*)" option in dropdown$/, async (optionToBeSelected: string) => {
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, optionToBeSelected));
});

Then(/^ui: Verify "([^"]*)" warning is displayed$/, async (expectedWarningMessage: string) => {
  await expect(await element(`${Selectors.common.errorMessagesSlideDownFromBottom}`)).toHaveTextContaining(expectedWarningMessage);
});

Given('ui: Logout', async () => {
  await browser.pause(1000);
  await clickToElement(Selectors.siteHeader.siteLogo);
  await expect(await element(Selectors.homePage.welcomeMessage)).toBeDisplayed();
  await selectFromDropdown({
    dropdownOpener: Selectors.siteHeader.ddProfile,
    dropdownSelection: Selectors.siteHeader.profile.options.logout,
  });
});

Then(/^ui: I verify specific warning "([^"]*)" is displayed$/, async (warningMessage: string) => {
  await expect(await element(Selectors.common.errorMessagesSlideDownFromBottom)).toHaveText(warningMessage);
});

Then(/^ui: Quick navigate to "([^"]*)"$/, async (sectionName: string) => {
  await Common.quickNavigateToSpecificSection(sectionName);
});

Then(/^ui: Click on "([^"]*)" button in confirmation modal$/, async (buttonText: string) => {
  await Common.clickOnSpecificButtonInConfirmationModal(buttonText);
});

Then('ui: I verify client or server error warning is not displayed', async () => {
  // Will update it as soon as the bug for server error gets fixed
  // await expect(await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "Server error"), SHORT_TIMEOUT * 3)).toBeFalsy();
  // await expect(await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "An error"), SHORT_TIMEOUT)).toBeFalsy();
});

Then('ui: I verify client or server error warning is displayed', async () => {
  await expect(await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "Server error"), SHORT_TIMEOUT * 3)).toBeDisplayed();
  await expect(await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "An error"), SHORT_TIMEOUT)).toBeDisplayed();
});

Then('ui: I click on logo', async () => {
  await clickToElement(Selectors.siteHeader.siteLogo);
});

Then('ui: I validate no server error is present', async () => {
  await expect(
    await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom, "Server error"))
  ).toBeFalsy();
});

Then('ui: I click on filters', async () => {
  await clickToElement(Selectors.common.btnclickFilter)
});

Then('ui: I click on Choose filters', async () => {
  await clickToElement(Selectors.common.btnChooseFilter)
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open
})

Then(/^ui: I select filter "([^"]*)"$/, async (filter: string) => {
  await ProjectGrid.enterFilterNameAndClickOnIt(filter);
});

Then('ui: I refresh the browser', async () => {
  await browser.refresh()
})

Then('ui: Wait for 4 seconds', async () => {
  await browser.pause(MEDIUM_PAUSE);
});

Given('ui: Click on username and select Profile', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.siteHeader.ddProfile,
    dropdownSelection: Selectors.siteHeader.profile.options.profile,
  });
});

Given(/^ui: Create a token for "([^"]*)" "([^"]*)"$/, async (tokenLifeDuration: string, durationSpan: string) => {
  //To ensure that Profile Page is loaded completely
  await element(Selectors.profile.createTokenButton);
  if (await mayBeElement(Selectors.profile.deleteTokenButton, MEDIUM_PAUSE)) {
    await clickToElement(Selectors.profile.deleteTokenButton);
  }
  await formFill([
    { locator: locatorParse(Selectors.profile.durationSpan, durationSpan), value: null, action: 'click' },
    { locator: Selectors.profile.tokenLifeDurationInputbox, value: null, action: 'clearValue' },
    { locator: Selectors.profile.tokenLifeDurationInputbox, value: tokenLifeDuration, action: 'setValue' },
    { locator: Selectors.profile.createTokenButton, value: null, action: 'click' },
  ]);
  context().token = await (await element(Selectors.profile.apiToken)).getValue();
});

Then('ui: Wait for 1 second', async () => {
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Softassert all', async () => {
  await context().softAssert.assertAll();
});

Then(/^ui: I verify specific warning "([^"]*)" is not displayed$/, async (warningMessage: string) => {
  const specificWarningDisplayed = await isElementDisplayed(locatorParse(Selectors.common.specificClientErrorMessage, warningMessage), SHORT_PAUSE * 2);
  assert.isFalse(specificWarningDisplayed, `Warning:{${warningMessage}} is displayed`);
});

Then('ui: Softassert if client error is not displayed', async () => {
  const clientErrorDisplayed = await isElementDisplayed(Selectors.common.errorMessagesSlideDownFromBottom, MEDIUM_PAUSE);
  context().softAssert.isFalse(clientErrorDisplayed, "Client error was displayed");
});

Then(/^ui: Verify if confirmation modal is displayed in "([^"]*)" page$/, async (pageToBeAsserted: string) => {
  const confirmationModalDisplayed = await isElementDisplayed(Selectors.common.confirmationModal, SHORT_PAUSE * 2);
  context().softAssert.isTrue(confirmationModalDisplayed, `Confirmaion modal was not displayed in:${pageToBeAsserted} page`);
});

Then(/^ui: Click on "([^"]*)" button in confirmation modal if displayed$/, async (buttonText: string) => {
  if (await isElementDisplayed(locatorParse(Selectors.common.confirmationModalButton, buttonText), SHORT_PAUSE * 2)) {
    await clickToElement(locatorParse(Selectors.common.confirmationModalButton, buttonText));
  }
});

Then('ui: Verify if dropdown has been opened', async () => {
  const dropdownOpened = await isElementDisplayed(Selectors.common.dropdownValues, SHORT_PAUSE * 2);
  await context().softAssert.isTrue(dropdownOpened, "Dropdown was not opened");
});
Then(/^ui: I verify specific confirmation warning "([^"]*)" is not displayed$/, async (warningMessage: string) => {
  const specificConfirmationWarningDisplayed = await isElementDisplayed(locatorParse(Selectors.common.specificConfirmationWarning, warningMessage), SHORT_PAUSE * 2);
  assert.isFalse(specificConfirmationWarningDisplayed, `Warning:{${warningMessage}} is displayed`);
});

Then(/^ui: I verify specific confirmation warning "([^"]*)" is displayed$/, async (warningMessage: string) => {
  const specificConfirmationWarningDisplayed = await isElementDisplayed(locatorParse(Selectors.common.specificConfirmationWarning, warningMessage), SHORT_PAUSE * 2);
  assert.isTrue(specificConfirmationWarningDisplayed, `Warning:{${warningMessage}} was not displayed`);
});

Then('ui: I select all text using CTRL plus A', async () => {
  await selectAllTextUsingCTRLPlusA();
});

Then('ui: I click on Backspace key using keystrokes', async () => {
  await clickOnBackspaceKey();
});

Then(/^ui: Softassert if "([^"]*)" button is displayed in confirmation modal and add assertion error message as:"([^"]*)"$/, async (buttonText: string, assertionErrorMessage: string) => {
  const confirmationButtonDisplayed = await isElementDisplayed(locatorParse(Selectors.common.confirmationModalButton, buttonText), SHORT_PAUSE * 2);
  await context().softAssert.isTrue(confirmationButtonDisplayed, assertionErrorMessage);
});

Then('ui: Start Impersonation', async () => {
  await clickToElement(Selectors.profile.startImpersonation);
  await browser.pause(SHORT_PAUSE) //Required to start impersonation
});

Then('ui: Quit Impersonation', async () => {
  await clickToElement(Selectors.profile.quitImpersonation);
});

Then('ui: I verify notification icon is not displayed', async () => {
  await browser.pause(3000)
  const notificationIconDisplayed = await isElementDisplayed(Selectors.common.notificationButton, SHORT_PAUSE * 2);
  await assert.isFalse(notificationIconDisplayed, `Notification icon is displayed`);
});

Then('ui: Softassert if client or server error is not displayed', async () => {
  const warningOrErrorElement = await mayBeElement(Selectors.common.warningOrError, SHORT_TIMEOUT * 3);
  if (warningOrErrorElement) {
    const errorMessage = await warningOrErrorElement.getText();
    context().softAssert.isTrue(errorMessage.includes("An error"), "Client error was displayed");
    context().softAssert.isTrue(errorMessage.includes("Server error"), "Server error was displayed");
  }
});

Then('ui: Click on notification icon in Header', async () => {
  await clickToElement(Selectors.common.notificationButton);
});

Then(/^ui: Verify newly created project with specific section "([^"]*)" notification is displayed$/, async (section: string) => {
  const specificNotificationDisplayed = await isElementDisplayed(Selectors.common.specificNotification.replace('{{projectName}}', context().projectSetup.name).replace('{{section}}', section), SHORT_PAUSE * 2);
  assert.isTrue(specificNotificationDisplayed, `Project: ${context().projectSetup.name} with section ${section} notification was not displayed`);
});

Then('ui: Verify new notification red icon is displayed', async () => {
  await browser.pause(MEDIUM_PAUSE); //Required wait to update and display the notification icon
  await assert.isTrue(await isElementDisplayed(Selectors.common.newNotificationRedIcon, SHORT_PAUSE * 2), `New notification red icon was not displayed`);
});

Then(/^ui: Softassert if client error is not displayed and add the error message as:"([^"]*)"$/, async (assertionErrorMessage: string) => {
  const clientErrorDisplayed = await isElementDisplayed(Selectors.common.errorMessagesSlideDownFromBottom, MEDIUM_PAUSE);
  context().softAssert.isFalse(clientErrorDisplayed, assertionErrorMessage);
});

Then(/^ui: Softassert specific warning "([^"]*)" is not displayed$/, async (warningMessage: string) => {
  const specificWarningDisplayed = await isElementDisplayed(locatorParse(Selectors.common.specificClientErrorMessage, warningMessage), SHORT_PAUSE * 2);
  context().softAssert.isFalse(specificWarningDisplayed, `Warning:{${warningMessage}} is displayed`);
});

Then(/^ui: I select "([^"]*)" as an filter option for filter "([^"]*)" and set value as default$/, async (filterOption: string, filterName: string) => {
  await ProjectGrid.clickOnSpecificOptionOfFilter(filterName, filterOption);
  await ProjectGrid.selectFilterOptionValueForSpecificFilter(filterName, AttributeTypes.Selection, 'Default');
  await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
});

Then(/^ui: I validate value "([^"]*)" for "([^"]*)" as an filter option for filter "([^"]*)" is not changed$/, async (filterValue: string, filterOption: string, filterName: string) => {
  await elementParseAndClick(Selectors.projectManagement.grid.filterOptionValueDropdownOfSpecificFilterForMSelAndSelectionCF, filterName);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to happen
  const valueInputBox = await element(locatorParse(Selectors.common.dropdownSpecificValue, filterValue) + "/preceding-sibling::input");
  const valueSearchField = await (await $(Selectors.projectManagement.grid.searchFilterOptionValue)).getValue();
  const ele = await isElementSelected(valueInputBox);
  assert.isTrue(ele, `The value ${filterValue} for "${filterOption}" as an filter option for filter "${filterName} is changed`);
  assert.equal(valueSearchField, filterValue, `The value ${filterValue} for "${filterOption}" as an filter option for filter "${filterName} is changed`)
});

Then(/^ui: Delete all files that start with name:"([^"]*)" and extension:"([^"]*)" in directory:"([^"]*)" under project's root directory$/, async (fileStartName: string, extension: string, folderName: string) => {
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  // Read the contents of the directory
  fs.readdirSync(defaultDownloadDirectory).forEach((fileName) => {
    const filePath = path.join(defaultDownloadDirectory, fileName);

    // Check if the file starts with the specified prefix and has the desired extension
    if (fileName.startsWith(fileStartName) && path.extname(fileName) === extension) {
      // Delete the file
      fs.unlinkSync(filePath);
    }
  });
});

Then(/^ui: Create a new directory as:"([^"]*)" in projects's root directory$/, async (folderName: string) => {
  fs.mkdir(folderName, (error) => {
    if (error) {
      throw error;
    }
  });
});


Then(/^ui: Set downloads directory as:"([^"]*)" in projects's root directory$/, async (folderName: string) => {
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  await browser.cdp('Page', 'setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: defaultDownloadDirectory,
  });
});


Then(/^ui: SoftAssert if warning:"([^"]*)" is not displayed$/, async (warningMessage: string) => {
  const specificWarningDisplayed = await isElementDisplayed(locatorParse(Selectors.common.specificClientErrorMessage, warningMessage), SHORT_PAUSE * 2);
  context().softAssert.isFalse(specificWarningDisplayed, `Warning:{${warningMessage}} is displayed`);
});

Then('ui: Wait for warning to disappear', async () => {
  await watiForElementToBeDisappear(Selectors.common.warningOrError, WARNING_DISAPPEAR_TIME);
});

Then(/^ui: Remove a directory as:"([^"]*)" in projects's root directory$/, async (folderName: string) => {
  // Check if the folder already exists
  if (fs.existsSync(folderName)) {
    // If it exists, remove it
    fs.rmdirSync(folderName, { recursive: true });
  }
});

Given('ui: Open Tempus Login Page', async () => {
  await browser.url(context().user.baseUrlTempus);
  await browser.waitUntil(async function () {
    return (await browser.getTitle()) === config.siteTitle
  }, {
    timeout: ELEMENT_TIMEOUT,
    timeoutMsg: `Login page did not load within {${ELEMENT_TIMEOUT}}ms`
  })
});
