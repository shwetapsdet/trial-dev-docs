import { Given, When, Then } from '@cucumber/cucumber';
import {
  checkIfInputDisplayedAndResetInput,
  clickToElement,
  element, elementParse, formFill, getElementBackgroundColor, isElementDisplayed, locatorParse, selectFromDropdown, slowInputFilling,
} from '../../../../core/func';
import { context } from '../../../../utils/context';
import Selectors from '../../../../core/selectors';
import { ResourceAttributesAndIdentity } from '../../../../helpers/ResourceManagement/ResourceEdit/Attributes.helper';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../core/timeouts';
import { Common } from '../../../../helpers/common.helper';
import { resourceModel } from '../../../../models/resource.model';
import { DateFormats, NavigationOptions } from '../../../../core/enums';
import { assert } from 'chai';
const moment = require('moment-timezone');

When('ui: I attempt to login with valid credentails', async () => {
  // site logo should be displayed on login page
  await expect(await element(Selectors.loginPage.siteLogo)).toBeDisplayed();

  // validate dynamic year with footer
  await expect(await elementParse({ locatorString: Selectors.loginPage.footer, parsing: moment().format(DateFormats.YearFormat1) })).toBeDisplayed();

  // get username, password from global context
  const { username, password } = context().user;

  await formFill(
    [
      { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: username },
      { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: password },
      { locator: Selectors.common.btnSubmit, action: 'click', value: null },
    ],
  );
});

When(/^ui: I attempt to login with valid credentails for user "([0-9]+)"$/, async (userNumber: any) => {
  const userIndex = parseInt(userNumber, 10) - 1;
  const user = context().envData.users[userIndex];
  context().envData.currentUser = user;

  // site logo should be displayed on login page
  await expect(await element(Selectors.loginPage.siteLogo)).toBeDisplayed();

  // validate dynamic year with footer
  await expect(await elementParse({ locatorString: Selectors.loginPage.footer, parsing: moment().format(DateFormats.YearFormat1) })).toBeDisplayed();

  // get username, password from global context
  const { username, password } = user;

  await formFill(
    [
      { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: username },
      { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: password },
      { locator: Selectors.common.btnSubmit, action: 'click', value: null },
    ],
  );
});

Then('ui: I validate for successful login', async () => {
  const { name } = context().user;
  await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.homePage.lblUsername, name), ELEMENT_TIMEOUT), `Login was not successful as user: {${name}}`);
});

Given(/^ui: I login with "(administrator|resource|resourceManager|timesheetApprover)" account$/, async (role: string) => {
  let user = null;

  if (role == "administrator") {
    user = context().user;
    const { username, password } = user;
    await formFill(
      [
        { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: username },
        { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: password },
        { locator: Selectors.common.btnSubmit, action: 'click', value: null },
      ],
    );

  } else {
    switch (role) {
      case 'resource':
        user = context().resourceSetup.username;
        break;
      case 'resourceManager':
        user = context().resourceSetup.resourceManager;
        break;
      case 'timesheetApprover':
        user = context().resourceSetup.timesheetApprover;
        break;
      default:
        console.error('Account role not supported');
        process.exit(1);
    }

    // fill login form and submit it
    await formFill(
      [
        { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: user },
        { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: context().resourceSetup.password },
        { locator: Selectors.common.btnSubmit, action: 'click', value: null },
      ],
    );
  }
  /* uncomment this code, name representation behaviour is random, in some accout it's capitalized and in some small
  await browser.waitUntil(async () => {
    const el = await elementParse({ locatorString: Selectors.homePage.lblUsername, parsing: name });
    return (await el.isDisplayed()) === true;
  }, {
    timeout: ELEMENT_TIMEOUT,
    timeoutMsg: `element is not found after waiting for ${ELEMENT_TIMEOUT} ms`,
  });
  */
});

Then(/^ui: Login with username as "([^"]*)" and password as "([^"]*)"$/, async (username: string, password: string) => {
  // validate dynamic year with footer
  await expect(await elementParse({ locatorString: Selectors.loginPage.footer, parsing: moment().format(DateFormats.YearFormat1) })).toBeDisplayed();

  await formFill(
    [
      { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: username },
      { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: password },
      { locator: Selectors.common.btnSubmit, action: 'click', value: null },
    ],
  );
  if (username === "Admin") {
    username = "Administrator"
  }
  await expect(await elementParse({ locatorString: Selectors.homePage.lblUsername, parsing: username })).toBeDisplayed();
});

When('ui: I attempt to login with previous resource credentails', async () => {
  // site logo should be displayed on login page
  await expect(await element(Selectors.loginPage.siteLogo)).toBeDisplayed();

  // validate dynamic year with footer
  await expect(await elementParse({ locatorString: Selectors.loginPage.footer, parsing: moment().format(DateFormats.YearFormat1) })).toBeDisplayed();

  // get username, password from global context
  const { username, password } = context().resourceSetup;

  await formFill(
    [
      { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: username },
      { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: password },
      { locator: Selectors.common.btnSubmit, action: 'click', value: null },
    ],
  );
});

Given('ui: I create two resource with username, password, global role and add same resource manager', async () => {
  const {
    password, resourceManager,
  } = context().resourceSetup;

  context().resource1 = resourceModel().name;
  context().resource2 = resourceModel().name;

  const resources: string[] = [context().resource1, context().resource2];
  for (let i = 0; i < 2; i++) {
    await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
    await clickToElement(Selectors.resourceManagement.btnCreateResource);

    await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, resources[i]);
    await clickToElement(Selectors.common.btnCreate);
    await checkIfInputDisplayedAndResetInput(Selectors.resourceManagement.specificResourceNameInputBox, Selectors.resourceManagement.resourceEdit.inputResourceName, resources[i])
    if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
      await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
    }
    await selectFromDropdown({
      dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Administrator"),
    });
    const color = (await getElementBackgroundColor(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin)).toString();
    if (color == '#efefef') {
      await (await element(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin)).click();
    }
    await formFill([
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: resources[i], action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    ]);
    if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Resource Managers")))) {
      await clickToElement(`//*[normalize-space(.)="Optional Fields"]`);
      await browser.pause(MEDIUM_PAUSE/2)
    };
    await browser.pause(SHORT_PAUSE);
    await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Resource Managers", "Multi-Selection", resourceManager);
    await browser.pause(SHORT_PAUSE);
    
    if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Require Resource Manager Approval")))) {
      await clickToElement(`//*[normalize-space(.)="Required Fields"]`);
      await browser.pause(MEDIUM_PAUSE/2)
    };

    await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Require Resource Manager Approval", "Selection", "Yes");

    await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
    await clickToElement(Selectors.common.btnSave)
    await expect(await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, resources[i]))).toBeDisplayed();
  }
});

Given('ui: Login with second timesheetApprover account', async () => {
  await formFill(
    [
      { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: context().TSApprover2 },
      { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: context().resourceSetup.password },
      { locator: Selectors.common.btnSubmit, action: 'click', value: null },
    ],
  );
});

Given(/^ui: Verify if login was successful as: "(administrator|resource|resourceManager|timesheetApprover)"$/, async (role: string) => {
  let user;

  if (role == "administrator") {
    user = context().user;
    const { username, password } = user;
    await formFill(
      [
        { locator: Selectors.loginPage.txtUsername, action: 'setValue', value: username },
        { locator: Selectors.loginPage.txtPassword, action: 'setValue', value: password },
        { locator: Selectors.common.btnSubmit, action: 'click', value: null },
      ],
    );

  } else {
    switch (role) {
      case 'resource':
        user = context().resourceSetup.name;
        break;
      case 'resourceManager':
        user = context().resourceSetup.resourceManager;
        break;
      case 'timesheetApprover':
        user = context().resourceSetup.timesheetApprover;
        break;
      default:
        console.error('Account role not supported');
        process.exit(1);
    }

    await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.homePage.lblUsername, user), ELEMENT_TIMEOUT), `Username: {${user}} was not displayed in homepage`);
  }
});