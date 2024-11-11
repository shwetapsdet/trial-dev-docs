import { Given, Then, When } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, elementParseAndClick, formFill, isElementDisplayed, locatorParse, slowInputFilling, } from '../../../../../core/func';
import { context } from '../../../../../utils/context';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

/* eslint-disable no-unused-vars */
Given(/^ui: I create a new rule add "([^"]*)" to "([^"]*)" at "([^"]*)" level$/, async (toAssign: string, level: string, accessRole: string) => {
  await clickToElement(Selectors.adminSettings.projectAccess.btnNewRule);
  const { name: roleName } = context().globalRole;
  await clickToElement(Selectors.adminSettings.projectAccess.ddResourceList)

  if (toAssign.toLowerCase() == "all resources" || toAssign.toLowerCase() == "all") {
    await clickToElement(Selectors.adminSettings.allColumnsCheckbox);
  } else if (toAssign.toLowerCase() == "role") {
    await browser.pause(SHORT_PAUSE); //Required to display values
    await formFill([
      { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: roleName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE); //Required to display values
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, roleName);
  } else if (toAssign.toLowerCase() == "resource") {
    const { name: resourceName } = context().resourceSetup;
    await browser.pause(SHORT_PAUSE); //Required to display values
    await formFill([
      { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE); //Required to display values
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, resourceName);
  }

  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectList);
  await browser.pause(SHORT_PAUSE); //Required to display values
  if (level.toLowerCase() == "all projects" || level.toLowerCase() == "all") {
    await clickToElement(Selectors.adminSettings.allColumnsCheckbox);
  } else {
    const { name: projectName } = context().projectSetup;
    await browser.pause(SHORT_PAUSE); //Required to display values
    await formFill([
      { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: projectName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE); //Required to display values
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, projectName);
  }

  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectRole);
  await browser.pause(SHORT_PAUSE);
  if (accessRole.toLowerCase() == "manager" || accessRole.toLowerCase() == "editor" || accessRole.toLowerCase() == "viewer" || accessRole.toLowerCase() == "no access") {
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, accessRole);
  } else {
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, roleName);
  }
  await clickToElement(Selectors.adminSettings.projectAccess.btnSaveAccess);
});

When(/^ui: Create a rule for recently created resource, project and "([^"]*)" role$/, async (roleType: string) => {
  await clickToElement(Selectors.adminSettings.projectAccess.btnNewRule);
  // const { name: roleName } = roleType === 'global' ? context().globalRole : context().projectRole;
  const { name: resourceName } = context().resourceSetup;
  const { name: projectName } = context().projectSetup;

  await clickToElement(Selectors.adminSettings.projectAccess.ddResourceList);
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: resourceName, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, resourceName);


  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectList);
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: projectName, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, projectName);

  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectRole);

  if (roleType === 'Viewer' || roleType === 'Manager') {
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, roleType);
  }
  else if (roleType === 'global' || roleType === 'project') {
    const { name: roleName } = roleType === 'global' ? context().globalRole : context().projectRole;
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, roleName);
  }

  await clickToElement(Selectors.adminSettings.projectAccess.btnSaveAccess);
});

Given(/^ui: Create a new rule for Users:"([^"]*)" Projects:"([^"]*)" Role:"([^"]*)" level and Allow override as "([^"]*)"$/, async (users: string, projects: string, roleName: string,
  allowOverride: string) => {
  await clickToElement(Selectors.adminSettings.projectAccess.btnNewRule);

  await clickToElement(Selectors.adminSettings.projectAccess.ddResourceList)
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: users, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, users);

  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectList);
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: projects, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, projects);

  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectRole);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, roleName);

  const allowOverrideInput = await $(Selectors.adminSettings.projectAccess.allowOverrideInput);
  const allowOverrideInputSelectionState = await allowOverrideInput.isSelected();
  switch (allowOverride.trim().toLowerCase()) {
    case "on":
      if (!allowOverrideInputSelectionState) {
        await clickToElement(Selectors.adminSettings.projectAccess.allowOverrideToggleButton);
      }
      break;
    case "off":
      if (allowOverrideInputSelectionState) {
        await clickToElement(Selectors.adminSettings.projectAccess.allowOverrideToggleButton);
      }
      break;
    default:
      throw new Error("Unsupported value for allowOverride:" + allowOverride + "\nSupported values are On or Off");
  }
  await clickToElement(Selectors.adminSettings.projectAccess.btnSaveAccess);
});

Then('ui: I validate that the Rule has been removed from the list',async () => {
  const ele = await isElementDisplayed(await locatorParse(`//span[text()="{{projectName}}"]`, context().projectSetup.name));
  await context().softAssert.isFalse(ele, `The Rule is still displayed and not removed`);
})