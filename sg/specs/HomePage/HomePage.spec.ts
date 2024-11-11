import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import { clickToElement, element, isElementDisplayed } from '../../../../core/func';
import { NavigationOptions } from '../../../../core/enums';
import { LONG_PAUSE, MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../core/timeouts';

Then(/^ui: Click on "([^"]*)" tile in homepage$/, async (tileToBeClicked: string) => {
  switch (tileToBeClicked) {
    case NavigationOptions.AdminSettings:
      await clickToElement(Selectors.homePage.adminSettingsTile);
      break;
    case NavigationOptions.ResourceManagement:
      await clickToElement(Selectors.homePage.resourceManagementTile);
      break;
    case NavigationOptions.MyTimesheets:
      await clickToElement(Selectors.homePage.myTimesheetsTile);
      break;
    case NavigationOptions.TimesheetManagement:
      await clickToElement(Selectors.homePage.timesheetManagementTile);
      break;
    case NavigationOptions.ProjectManagement:
      await clickToElement(Selectors.homePage.projectManagementTile);
      break;
    case NavigationOptions.BulkProjectAllocationFlatGrid:
      await clickToElement(Selectors.homePage.bulkProjectAllocatioFlatGridTile);
      break;
    case NavigationOptions.ResourceRequests:
      await clickToElement(Selectors.homePage.resourceRequetsTile);
      break;
    case NavigationOptions.ReportManagement:
      await clickToElement(Selectors.homePage.reportManagementTile);
      break;
    case NavigationOptions.ScribeRollup:
      await clickToElement(Selectors.homePage.scribeRollupTitle);
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values (Case sensitive):\n1.${Object.values(NavigationOptions)}`);
  }
});

Then('ui: Verify if welcome message is displayed', async () => {
  await expect(await element(Selectors.homePage.welcomeMessage)).toBeDisplayed();
});

Then('ui: Navigate to Audit Log from homepage', async () => {
  await expect(await element(Selectors.homePage.welcomeMessage)).toBeDisplayed();
  if (!await isElementDisplayed(Selectors.homePage.auditLogPanel, MEDIUM_PAUSE)) {
    await clickToElement(Selectors.homePage.auditLogSidebarToggle);
    await browser.pause(SHORT_PAUSE);
  }
  await clickToElement(Selectors.homePage.auditLogTitleInSidePanel);

  if (!await isElementDisplayed(Selectors.common.btnclickFilter, MEDIUM_PAUSE)) {
    await clickToElement(Selectors.homePage.auditLogTitleInSidePanel);
    await browser.pause(SHORT_PAUSE);
  }
});