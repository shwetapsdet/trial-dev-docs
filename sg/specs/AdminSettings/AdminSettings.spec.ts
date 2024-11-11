import { Given, Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import { clickToElement, elementParseAndClick, formFill } from '../../../../core/func';
import { AdminSettingsTiles } from '../../../../core/enums';

Then('ui: Click on General Settings tile', async () => {
  await clickToElement(Selectors.adminSettings.generalSettingsTile);
});

Then(/^ui: Click on "([^"]*)" tile in Admin settings$/, async (tileToBeClicked: string) => {
  switch (tileToBeClicked.trim().toLowerCase()) {
    case AdminSettingsTiles.AttributeManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.AttributeManagement);
      break;
    case AdminSettingsTiles.ProjectAccess.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.ProjectAccess);
      break;
    case AdminSettingsTiles.WorkflowManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.WorkflowManagement);
      break;
    case AdminSettingsTiles.TimesheetSettings.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.TimesheetSettings);
      break;
    case AdminSettingsTiles.TimesheetConfiguration.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.TimesheetConfiguration);
      break;
    case AdminSettingsTiles.UserManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.UserManagement);
      break;
    case AdminSettingsTiles.SkillManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.SkillManagement);
      break;
    case AdminSettingsTiles.ImpersonationManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.ImpersonationManagement);
      break;
    case AdminSettingsTiles.CalendarManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.CalendarManagement);
      break;
    case AdminSettingsTiles.EmailManagement.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.EmailManagement);
      break;
    case AdminSettingsTiles.SheetTemplates.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.SheetTemplates);
      break;
    case AdminSettingsTiles.DataSync.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.DataSync);
      break;
    case AdminSettingsTiles.ProjectHierarchy.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.ProjectHierarchy);
      break;
    case AdminSettingsTiles.ResourceHierarchy.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.ResourceHierarchy);
      break;
    case AdminSettingsTiles.AdminTime.trim().toLowerCase():
      await elementParseAndClick(Selectors.adminSettings.specificTile, AdminSettingsTiles.AdminTime);
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values (Case sensitive):\n1.${Object.values(AdminSettingsTiles)}`);
  }
});

Given('ui: I enter Admin Time Type and create', async () => {
  await formFill([
    { locator: '//label[text()="Admin Time Type"]/preceding-sibling::input', value: 'test', action: 'setValue' },
    { locator: '//button[contains(@class,"common-button")]', value: null, action: 'click' },
  ]);
})
