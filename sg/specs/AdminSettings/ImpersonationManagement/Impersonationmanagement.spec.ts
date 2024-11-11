import { Then, When } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, element, elementParseAndClick, hitEnter, locatorParse, selectFromDropdown, slowInputFilling, } from '../../../../../core/func';
import { context } from '../../../../../utils/context';
import { ImpersonationPermissionTiles } from '../../../../../core/enums';
import DateTime from '../../../../../core/datetime';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

/* eslint-disable no-unused-vars */
When('ui: Click on Create button in Impersonation Management', async () => {
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.adminSettings.impersonationManagement.createBtn)
  await browser.pause(SHORT_PAUSE);

})

When('ui: I add Impersonation for newly created resource', async () => {
  const { name } = context().resourceSetup;
  await browser.refresh();
  await clickToElement(Selectors.adminSettings.impersonationManagement.chooseResourceField);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open up
  await slowInputFilling(Selectors.adminSettings.impersonationManagement.impersonatorInputbox, "Administrator")
  await clickToElement(Selectors.adminSettings.impersonationManagement.selectImpersonator)
  await hitEnter()
  await clickToElement(Selectors.adminSettings.impersonationManagement.userToBeImpersonatedDropdown);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open up
  await slowInputFilling(Selectors.adminSettings.impersonationManagement.userToBeImpersonatedSearchInputbox, name)
  await hitEnter();
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
})

Then(/^ui: Click on "([^"]*)" tile in Impersonation Permissions$/, async (tileToBeClicked: string) => {
  switch (tileToBeClicked.trim().toLowerCase()) {
    case ImpersonationPermissionTiles.ResourceRequest.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.impersonationManagement.togglePermissionBtn, ImpersonationPermissionTiles.ResourceRequest);
      break;
    case ImpersonationPermissionTiles.ApproveTimesheets.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.impersonationManagement.togglePermissionBtn, ImpersonationPermissionTiles.ApproveTimesheets);
      break;
    case ImpersonationPermissionTiles.SubmitTimesheets.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.impersonationManagement.togglePermissionBtn, ImpersonationPermissionTiles.SubmitTimesheets);
      break;
    case ImpersonationPermissionTiles.BulkGenerateTimesheet.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.impersonationManagement.togglePermissionBtn, ImpersonationPermissionTiles.BulkGenerateTimesheet);
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add correct\n
      Supported values (Case sensitive):\n1.${Object.values(ImpersonationPermissionTiles)}`);
  }
});

Then('ui: I enter current year in start and End date in Impersonation management', async () => {

  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);

  await slowInputFilling(Selectors.bulkProjectAllocation.startDateInputBox, startDate);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await slowInputFilling(Selectors.bulkProjectAllocation.endDateInputBox, endDate);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
})

Then('ui: I validate impersonation in Administrator account', async () => {
  const { name } = context().resourceSetup;
  await selectFromDropdown({
    dropdownOpener: Selectors.siteHeader.ddProfile,
    dropdownSelection: Selectors.siteHeader.profile.options.profile,
  });
  await expect(await element(locatorParse(Selectors.adminSettings.impersonationManagement.validateresourceNameInImpersonatorProfile, name))).toBeDisplayed()
})

Then('ui: Wait for Choose Resource dropdown in Impersonation Create or edit page to be clickable', async () => {
  const chooseResourceField = await element(Selectors.adminSettings.impersonationManagement.chooseResourceField);
  await chooseResourceField.waitForClickable();
});

When('ui: Add Timesheet user as Impersonator and TimesheetApprover as User to be Impersonated', async () => {
  await clickToElement(Selectors.adminSettings.impersonationManagement.chooseResourceField);
  await browser.pause(SHORT_PAUSE / 2);
  await slowInputFilling(Selectors.adminSettings.impersonationManagement.impersonatorInputbox, context().resourceSetup.name);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(locatorParse(Selectors.adminSettings.impersonationManagement.specificImpersonatorInDropdown, context().resourceSetup.name));
  await browser.pause(SHORT_PAUSE / 2);

  await clickToElement(Selectors.adminSettings.impersonationManagement.userToBeImpersonatedDropdown);
  await browser.pause(SHORT_PAUSE / 2);
  await slowInputFilling(Selectors.adminSettings.impersonationManagement.userToBeImpersonatedSearchInputbox, context().TSApprover1);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, context().TSApprover1));
})