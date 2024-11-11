import { Then } from "@wdio/cucumber-framework";
import { clickToElement, element, elementParseAndClick, isElementDisplayed} from "../../../../../core/func";
import Selectors from '../../../../../core/selectors';
import { context } from "../../../../../utils/context";
import { ExcelSource } from "../../../../../core/enums";
import { waitForFileToDownload } from "../../../../../core/fileUtilities";
import * as path from 'path';
import { MEDIUM_PAUSE } from "../../../../../core/timeouts";

Then(/^ui: I Select "([^"]*)" from the Sync list$/, async (syncTabName: string) => {
  await elementParseAndClick(Selectors.adminSettings.dataSync.syncTile, syncTabName.toLowerCase());
});

Then(/^ui: I select "([^"]*)" tab from the Import list$/, async (importListName: string) => {
  await browser.pause(MEDIUM_PAUSE);
  const ele = await ExcelSource[importListName]
  await elementParseAndClick(Selectors.adminSettings.dataSync.excelSync.importTab, ele);
});

Then('ui: I download the demo Resource template', async () => {
  await clickToElement(Selectors.adminSettings.dataSync.excelSync.downloadResourceTemplate);
});

Then(/^ui: Softassert if resource template file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `Step 2 Resources_Instructions_SP.xlsx`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then('ui: Upload the Workflow User csv file', async () => {
  const elFileInput = await element(`//*[@type="file"]`);
  await elFileInput.waitForEnabled({ timeout: 60000 });
  await browser.uploadFile(path.join(__dirname, '../../../../../data/WorkFlow-Users.xlsx'));
  await elFileInput.addValue(path.join(__dirname, '../../../../../data/WorkFlow-Users.xlsx'));
});

Then('ui: I click on Synchronize button', async () => {
  await clickToElement(Selectors.adminSettings.dataSync.btnSync);
});

Then('ui: I validate that the sync process has been completed', async () => {
  await browser.pause(MEDIUM_PAUSE);
  if ((await isElementDisplayed(Selectors.adminSettings.dataSync.btnResolve)) && (await isElementDisplayed(Selectors.adminSettings.dataSync.btnOverwrite)) && (await isElementDisplayed(Selectors.adminSettings.dataSync.validateConflictText))) {
    await clickToElement(Selectors.adminSettings.dataSync.btnResolve)
  };
  await (await element(Selectors.adminSettings.dataSync.excelSync.msgSyncSuccess)).waitForDisplayed({
    timeout: 120000,
    timeoutMsg: 'Failed to sync test environment users'
  })
  await browser.pause(MEDIUM_PAUSE); // Pause needed cause in Vultr slot API call is taking a bit longer
});

Then(/^ui: I select the method "([^"]*)" for the conflicts$/, async (conflictsSolveMethod: string) => {
  await elementParseAndClick(Selectors.adminSettings.dataSync.conflictMethodButton, conflictsSolveMethod);
  await clickToElement(Selectors.adminSettings.dataSync.btnResolve)
})

Then('ui: Upload the Updated Workflow User csv file', async () => {
  const elFileInput = await element(`//*[@type="file"]`);
  await elFileInput.waitForEnabled({ timeout: 60000 });
  await browser.uploadFile(path.join(__dirname, '../../../../../data/updatedWorkFlow-Users.xlsx'));
  await elFileInput.addValue(path.join(__dirname, '../../../../../data/updatedWorkFlow-Users.xlsx'));
})

Then(/^ui: I validate that the data is as per "([^"]*)" conflict process$/, async (conflictsSolveMethod: string) => {
  let ele1, ele2;
  switch (conflictsSolveMethod) {
    case 'Overwrite':
      ele2 = await isElementDisplayed(Selectors.workflowManagement.projectWorkflowUser.validateUserByName1);
      ele1 = await isElementDisplayed(Selectors.workflowManagement.projectWorkflowUser.validateUserByName2);
      await context().softAssert.isTrue(ele2, `Resource: Mike Scott is still not visible although sync process is covered by {${conflictsSolveMethod}}`);
      break;
    case 'Do Not Overwrite':
      ele1 = await isElementDisplayed(Selectors.workflowManagement.projectWorkflowUser.validateEmail);
      ele2 = await isElementDisplayed(Selectors.workflowManagement.projectWorkflowUser.validateUserByName1);
      await context().softAssert.isTrue(ele2, `Resource: Mike Scott is still visible although sync process is covered by {${conflictsSolveMethod}}`);
      break;
    case 'Merge':
      ele1 = await isElementDisplayed(Selectors.workflowManagement.projectWorkflowUser.validateUserByName2);
      ele2 = await isElementDisplayed(Selectors.workflowManagement.projectWorkflowUser.validateUserByName1);
      await context().softAssert.isTrue(ele2, `Resource: Mike Scott is still not visible although sync process is covered by {${conflictsSolveMethod}}`);
      break;
    default:
      break;
  }
  await context().softAssert.isTrue(ele1, `Conflict Process: {${conflictsSolveMethod}} didn't worked as expected`);
})

Then(/^ui: Upload the "([^"]*)" csv file$/, async (uploadFile: string) => {
  let filePath;
  switch (uploadFile) {
    case 'importAdminTime':
      filePath = '../../../../../data/importAdminType.xlsx'
      break;
    case 'importResource':
      filePath = '../../../../../data/importResource.xlsx'
      break;
  
    default:
      break;
  }
  const elFileInput = await element(`//*[@type="file"]`);
  await elFileInput.waitForEnabled({ timeout: 60000 });
  await browser.uploadFile(path.join(__dirname, filePath));
  await elFileInput.addValue(path.join(__dirname, filePath));
})