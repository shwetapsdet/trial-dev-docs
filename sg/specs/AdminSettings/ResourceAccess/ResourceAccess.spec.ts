import { Given } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, elementParseAndClick, formFill, } from '../../../../../core/func';
import { context } from '../../../../../utils/context';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

Given(/^ui: Create a rule for recently created resource with administrator resource added and "([^"]*)" role$/, async (roleType: string) => {
  await browser.pause(3000);
  await clickToElement(Selectors.adminSettings.projectAccess.btnNewRule);
  const roleName = roleType;
  const { name: resourceName } = context().resourceSetup;

  await clickToElement(Selectors.adminSettings.projectAccess.ddResourceList);
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: resourceName, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, resourceName);


  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectList);
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: null, action: 'click' },
    { locator: Selectors.adminSettings.projectAccess.ddSelectAdministrator, value: null, action: 'click' },
  ]);


  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectRole);
  await elementParseAndClick(Selectors.adminSettings.projectAccess.ddProjectSelectWithName, roleName);
  await clickToElement('//span[text()="Off"]/..');
  await clickToElement(Selectors.adminSettings.projectAccess.btnSaveAccess);

});

Given(/^ui: I create a new resource access rule add "([^"]*)" to "([^"]*)" at "([^"]*)" level$/, async (toAssign: string, level: string, accessRole: string) => {
  const { name: roleName } = context().globalRole;
  if (accessRole == 'NewlyCreated') {
    accessRole = roleName;
  }
  await browser.pause(3000);
  await clickToElement(Selectors.adminSettings.projectAccess.btnNewRule);
  const { name: resourceName } = context().resourceSetup;
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.adminSettings.projectAccess.ddResourceList)
  await browser.pause(SHORT_PAUSE);
  await formFill([
    { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: resourceName, action: 'setValue' },
  ]);
  await browser.pause(SHORT_PAUSE);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, resourceName);

  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectList);
  if (level.toLowerCase() == "all resources" || level.toLowerCase() == "all") {
    await clickToElement(Selectors.adminSettings.allColumnsCheckbox);
  } else {
    const { name: resourceName } = context().resourceSetup;
    await browser.pause(SHORT_PAUSE);
    await formFill([
      { locator: `(${Selectors.common.dropdownSearchInputBox})[2]`, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await elementParseAndClick(Selectors.common.dropdownSpecificValue, resourceName);
  }
  await clickToElement(Selectors.adminSettings.projectAccess.ddProjectRole);
  await browser.pause(SHORT_PAUSE);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, accessRole);
  await clickToElement(Selectors.adminSettings.projectAccess.btnSaveAccess);
});