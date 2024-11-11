import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';

import { clickToElement, element, elementParse, elementParseAndClick, hitEnter, isElementDisplayed, locatorParse, mayBeElement, slowInputFilling } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { context } from '../../../../../utils/context';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { waitForFileToDownload } from '../../../../../core/fileUtilities';
const sheetName = "AUTQClonedSheet" + faker.string.numeric(6);
import * as path from 'path';
import { Key } from 'webdriverio';
import { ProjectGrid } from '../../../../../helpers/ProjectManagement/Grid.helper';
import { assert } from "chai";

When(/^ui: I clone sheet from previously created project with Open to clone button "([^"]*)"$/, async (toggleStatus: string) => {
  const { name } = context().projectSetup;
  const search = await element(Selectors.projectManagement.sheets.addNewSheetPlusIcon);
  await search.waitForClickable();
  await browser.pause(MEDIUM_PAUSE);
  await clickToElement(Selectors.projectManagement.sheets.cloneSheetButton);
  await browser.pause(SHORT_PAUSE);
  await slowInputFilling(Selectors.common.dropdownSearchInputBox, name);
  await browser.pause(SHORT_PAUSE / 2);
  await elementParseAndClick(Selectors.projectManagement.sheets.previouslytCreatedProjectName, name);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.sheets.toggleSheetButton);
  await slowInputFilling(Selectors.projectManagement.sheets.newSheetNameField, sheetName);
  if (toggleStatus === "Enabled") {
    await clickToElement(Selectors.projectManagement.sheets.openToCloneButton);
  }
  await clickToElement(Selectors.projectManagement.sheets.cloneButton);
})

When(/^ui: I enter "([^"]*)" name in the input cell$/, async (projectNumber: string) => {
  if (projectNumber === "Project1") {
    context().project = context().projectSetup;
  }
  else {
    context().project = context().projectSetup2;
  }
  await browser.pause(2000);
  await slowInputFilling(Selectors.projectManagement.sheets.inputFieldInSheet, context().project.name);
})

Then('ui: Click on Checkout button in Sheets and wait for Release button', async () => {
  await browser.pause(MEDIUM_PAUSE)
  await clickToElement(Selectors.projectManagement.sheets.checkoutbuttonSheets);
  await (await element(Selectors.projectManagement.sheets.releaseButtonSheets)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then('ui: Click on Release button in Sheets and wait for Checkout button', async () => {
  const ele = $(Selectors.projectManagement.sheets.releaseButtonSheets);
  await browser.waitUntil(async () => { 
    return await ele.isDisplayed();
  }, {
      timeout: 10000, // Maximum wait time in milliseconds
      timeoutMsg: 'Element did not become visible within 10 seconds'
  });
  await clickToElement(Selectors.projectManagement.sheets.releaseButtonSheets);
  await (await element(Selectors.projectManagement.sheets.checkoutbuttonSheets)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then('ui: Click on Save and Check In button in Sheets and wait for Checkout button', async () => {
  const ele = $(Selectors.projectManagement.sheets.saveAndCheckInButtonSheeets);
  await browser.waitUntil(async () => { 
    return await ele.isDisplayed();
  }, {
      timeout: 10000, // Maximum wait time in milliseconds
      timeoutMsg: 'Element did not become visible within 10 seconds'
  });
  await clickToElement(Selectors.projectManagement.sheets.saveAndCheckInButtonSheeets);
  await (await element(Selectors.projectManagement.sheets.checkoutbuttonSheets)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then('ui: I validate that the existing data has been changed', async () => {
  await expect(await $(locatorParse(Selectors.projectManagement.sheets.validateProjectNameInCell, context().projectSetup.name))).not.toBeDisplayed()
})

Then('ui: I select the cloned sheet', async () => {
  await elementParseAndClick(Selectors.projectManagement.sheets.selectSheetByName, sheetName)
})

Then('ui: Verify cloned sheet is present', async () => {
  const sheetNameElementDisplayed = await isElementDisplayed(locatorParse(Selectors.projectManagement.sheets.selectSheetByName, sheetName));
  await context().softAssert.isTrue(sheetNameElementDisplayed, `Cloned sheet:${sheetName} was not found in Sheets`);
});

When(/^ui: Verify sheet named:"([^"]*)" is present$/, async (sheetName: string) => {
  await expect(await $(await locatorParse(Selectors.projectManagement.sheets.selectSheetByName, sheetName))).toBeExisting();
});

When('ui: Click on the edit in list view button', async () => {
  await clickToElement(Selectors.projectManagement.sheets.editInListViewButton);
})

When('ui: Click on the sheet list dropdown', async () => {
  await clickToElement(Selectors.projectManagement.sheets.sheetListDropdown);
  // validate existing sheets, switch sheets and search functionality
})

When(/^ui: Click on the sheet export as "(Excel|Pdf)"$/, async (exportOption: string) => {
  await clickToElement(Selectors.projectManagement.sheets.exportDropdown);
  await elementParseAndClick(Selectors.projectManagement.sheets.exportSheetOption, exportOption.toLowerCase());
})

When('ui: Click on the edit in grid view button', async () => {
  await clickToElement(Selectors.projectManagement.sheets.editInGridViewButton);
})

When('ui: Click on the add new button', async () => {
  await clickToElement(Selectors.projectManagement.sheets.addNewButton);
  await slowInputFilling(Selectors.projectManagement.sheets.newRowInput, '123');
  await clickToElement(Selectors.projectManagement.sheets.newRowValueSaveButton);
})

When('ui: Click on three dots and Select the sheet row and delete it', async () => {
  // select sheet row, delete single and multiple rows and validate
  await clickToElement(Selectors.projectManagement.sheets.listViewRow)
  await clickToElement(Selectors.projectManagement.sheets.deleteRowButton)
  // validate row deleted
})

When('ui: Click on the filter', async () => {
  await clickToElement(Selectors.projectManagement.sheets.filterButton)
})

Then(/^ui: Softassert if sheet exported file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `Workbook.xlsx`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then('ui: I select the Groupby dropdown',async () => {
  await clickToElement(Selectors.projectManagement.sheets.groupByDropdown)
})

Then(/^ui: I add "([^"]*)" new sheet through add button$/,async (sheetAddNumber: number) => {
  for (let index = 0; index < sheetAddNumber; index++) {
    await clickToElement(Selectors.projectManagement.sheets.addSheetButton);
  }
});

Then(/^ui: I search and validate that the "(Imported Template|Template|Normal)" sheet names are "(present|not present)"$/, async (sheetType: string, status: string) => {
  let sheetName1, sheetName2;

  if (sheetType === "Template") {
    sheetName1 = context().sheetTemplate1.name;
    sheetName2 = context().sheetTemplate2.name;
  } else if (sheetType === "Normal") {
    sheetName1 = 'sheet-2';
    sheetName2 = 'sheet-3';
  } else if (sheetType === "Imported Template") {
    sheetName1 = 'Sample Template';
    sheetName2 = 'Sample Template';
  }

  const locator1 = await locatorParse(Selectors.projectManagement.sheets.validateSheetTemplateByName, sheetName1);
  const locator2 = await locatorParse(Selectors.projectManagement.sheets.validateSheetTemplateByName, sheetName2);

  const ele1 = await isElementDisplayed(locator1);
  const ele2 = await isElementDisplayed(locator2);

  if (status === 'present') {
    await context().softAssert.isTrue(ele1, `Sheet: {${sheetName1}} is not present in search although it is a sheet template`);
    await context().softAssert.isTrue(ele2, `Sheet: {${sheetName2}} is not present in search although it is a sheet template`);
  } else if (status === 'not present') {
    await context().softAssert.isFalse(ele1, `Sheet: {${sheetName1}} is present in search although it is a normal sheet`);
    await context().softAssert.isFalse(ele2, `Sheet: {${sheetName2}} is present in search although it is a normal sheet`);
  }
});

Then(/^ui: I select column name for template "([^"]*)" from the choose filter option$/,async (sheetTemplate: string) => {
  if(sheetTemplate==="1") {
    context().sheetColumnName = context().sheetTemplate1.columnName
  } else if(sheetTemplate==="2") {
    context().sheetColumnName = context().sheetTemplate2.columnName
  }
  await clickToElement(Selectors.projectManagement.sheets.chooseFilter);
  await elementParseAndClick(Selectors.projectManagement.sheets.selectColumnNameInFilter, context().sheetColumnName)
});

Then('ui: I delete filter and validate for the newly created filter',async () => {
  await clickToElement(Selectors.projectManagement.sheets.deleteFilterButton);
})

Then(/^ui: I select and vaidate column name for template "([^"]*)" from the Groupby dropdown$/,async (sheetTemplate: string) => {
  if(sheetTemplate==="1") {
    context().sheetColumnName = context().sheetTemplate1.columnName
  } else if(sheetTemplate==="2") {
    context().sheetColumnName = context().sheetTemplate2.columnName
  }
  await elementParseAndClick(Selectors.projectManagement.sheets.selectColumnNameInGroupby, context().sheetColumnName)
});

Then('ui: I select recently created sheet template 1',async () => {
  await browser.pause(MEDIUM_PAUSE)
  await elementParseAndClick(Selectors.projectManagement.sheets.selectSheetByName, context().sheetTemplate1.name)
})

Then('ui: I select recently created sheet template 1 in RM',async () => {
  await elementParseAndClick(Selectors.projectManagement.sheets.selectSheetByName, context().sheetTemplate1.name)
  await browser.pause(MEDIUM_PAUSE)
  if(await isElementDisplayed(Selectors.projectManagement.sheets.btnSaveAndRelease)){
    await clickToElement(Selectors.projectManagement.sheets.btnSaveAndRelease)}
})

Then('ui: I import sheet from sync',async () => {
  await clickToElement(Selectors.adminSettings.dataSync.excelSync.btnExcelSync);
  await clickToElement(Selectors.adminSettings.dataSync.excelSync.tabExcel);
  const elFileInput = await element(`//*[@type="file"]`);
  await elFileInput.waitForEnabled({ timeout: 60000 });
  await browser.uploadFile(path.join(__dirname, '../../../../../data/importSheet.xlsx'));
  await elFileInput.addValue(path.join(__dirname, '../../../../../data/importSheet.xlsx'));
  await clickToElement(Selectors.adminSettings.dataSync.btnSync);
  await (await element(Selectors.adminSettings.dataSync.excelSync.msgSyncSuccess)).waitForDisplayed({
    timeout: 120000,
    timeoutMsg: 'Failed to sync test environment users'
  })

})

Then('ui: I click on add new button in list sheet view',async () => {
  await clickToElement(Selectors.projectManagement.sheets.addNewButton);
});

Then(/^ui: I create new row with column option set as "(Yes|No)"$/,async (columnOption: string) => {
  await clickToElement(Selectors.projectManagement.sheets.addNewRowFromColumnOption)
  await clickToElement(`//span[@class="m-lundefined" and normalize-space(text())="${columnOption}"]/parent::div`);
  await clickToElement(Selectors.projectManagement.sheets.newRowValueSaveButton);
});

Then(/^ui: I delete the first row with column option set as "(Yes|No)"$/,async (columnOption: string) => {
  await elementParseAndClick(Selectors.projectManagement.sheets.deleteFirstRow, columnOption);
  await clickToElement(Selectors.projectManagement.sheets.deleteRowButton);
});

Then('ui: I select recently created new sheet', async () => {
  await browser.pause(MEDIUM_PAUSE / 2)
  await clickToElement(Selectors.projectManagement.sheets.selectLastSheet);
  await browser.pause(MEDIUM_PAUSE / 2)
  context().sheet_Name = await $(Selectors.projectManagement.sheets.selectLastSheet).getText();
})

Then('ui: I lock the created view', async () => {
  const ele = await locatorParse(Selectors.projectManagement.sheets.lockViewValidate, context().viewName)
  if (!(await isElementDisplayed(ele))) {
    await elementParseAndClick(Selectors.projectManagement.sheets.lockButtonForView, context().viewName)
  }
})

Then('ui: I validate that the selected view is still locked', async () => {
  const ele = await locatorParse(Selectors.projectManagement.sheets.lockViewValidate, context().viewName)
  await context().softAssert.isTrue(await isElementDisplayed(ele), `View: {${context().viewName}} is not locked`);
})

Then(/^ui: I select the "([^"]*)" view$/, async (viewType: string) => {
  let ele1;
  switch (viewType) {
    case "Default":
      ele1 = viewType
      break;
    case "Created":
      ele1 = context().viewName
      break;
    default:
      break;
  }
  await ProjectGrid.clickOnSpecificView(ele1);
  await ProjectGrid.verifySpecificViewIsSelected(ele1);
})

Then('ui: I validate that the created view is displayed', async () => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.projectManagement.sheets.validateviewButton, context().viewName));
  await context().softAssert.isTrue(ele, `View Button: {${context().viewName}} is not yet displayed`);
})

Then(/^ui: I "([^"]*)" the created view$/, async (editType: string) => {
  const ele = Selectors.bulkProjectAllocationFlatgrid.viewGrid.editButtonView.replace('{{viewName}}', `${context().viewName}`)
  switch (editType.toLocaleLowerCase()) {
    case "rename":
      await clickToElement(ele.replace("{{editType}}", editType.toLocaleLowerCase()));
      await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.viewGrid.inputRenameView, `${context().viewName} Rename`);
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.viewGrid.conformRenameView);
      break;
    case "clone":
      await clickToElement(ele.replace("{{editType}}", editType.toLocaleLowerCase()));
      break;
    case "delete":
      const el = await element(ele.replace("{{editType}}", editType.toLocaleLowerCase()));
      await browser.pause(SHORT_PAUSE/2);
      await el.click();
      await context().softAssert.isTrue(await isElementDisplayed(`//b[text()="${context().viewName}"]`));
      if (await isElementDisplayed('//button[normalize-space(text())="Yes"]')) {
        await clickToElement('//button[normalize-space(text())="Yes"]');
      }
      break;
    default:
      break;
  }
})

Then(/^ui: I verify the created view has been "([^"]*)" successfully$/, async (editType: string) => {
  await browser.pause(MEDIUM_PAUSE/2);
  let ele;
  switch (editType.toLocaleLowerCase()) {
    case "renamed":
      ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, `${context().viewName} Rename`);
      await context().softAssert.isTrue((await isElementDisplayed(ele)), `View: {${context().viewName}} is not yet {${editType}}`);
      break;
    case "cloned":
      ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, `${context().viewName} Clone`);
      await context().softAssert.isTrue((await isElementDisplayed(ele)), `View: {${context().viewName}} is not yet {${editType}}`);
      break;
    case "deleted":
      ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, `${context().viewName}`);
      await context().softAssert.isFalse((await isElementDisplayed(ele)), `View: {${context().viewName}} is not yet {${editType}}`);
      break;
    default:
      break;
  }
})

Then('ui: I select sheet template 1 from the select sheet template dropdown', async () => {
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.projectManagement.sheets.openSheetTemplateDropdown);
  await browser.pause(SHORT_PAUSE);
  await slowInputFilling(Selectors.projectManagement.sheets.searchSheetTemplate, context().sheetTemplate1.name);
  await elementParseAndClick(Selectors.projectManagement.sheets.selectSheetTemplate, context().sheetTemplate1.name);
  if(await isElementDisplayed(Selectors.projectManagement.sheets.btnSaveAndRelease)){
    await clickToElement(Selectors.projectManagement.sheets.btnSaveAndRelease)}
})

When('ui: I click on save button for add new item', async () => {
  await clickToElement(Selectors.projectManagement.sheets.newRowValueSaveButton);
})

Then('ui: Validate that all the files are uploaded with correct extensions in Sheet', async () => {
  for (let i = context().extension.length - 1; i >= 0; i--) {
    await (await $(locatorParse(Selectors.projectManagement.sheets.validateFilesByExtension, context().extensionUppercase[i]))).scrollIntoView();
    const ele = await elementParse({ locatorString: Selectors.projectManagement.sheets.validateFilesByExtension, parsing: context().extensionUppercase[i] });
    const extensionValue = await (ele).getText();
    await context().softAssert.equal(extensionValue, `Upload${context().extensionUppercase[i]}`, `File Upload: {Upload${context().extensionUppercase[i]}} has wrong extension shown in the table`);
  }
})

When('ui: I click on edit button for the newly created row', async () => {
  await $(Selectors.projectManagement.sheets.hoverToCheckbox).moveTo();
  await clickToElement(Selectors.projectManagement.sheets.selectFirstRowCheckbox);
  await clickToElement(Selectors.projectManagement.sheets.editRowButton);
})

When('ui: I click on cancel button in add new row modal in list sheet view', async () => {
  await clickToElement(Selectors.projectManagement.sheets.cancelAddNewRowModalButton);
  await browser.pause(SHORT_PAUSE / 2);
})

Then(/^ui: I download file with extension "([^"]*)" in sheets tab$/, async (extensionValue: string) => {
  await browser.pause(MEDIUM_PAUSE / 2);
  await elementParseAndClick(Selectors.projectManagement.files.downloadFilesByExtension, extensionValue.toUpperCase());
});

Then(/^ui: I delete the file with extension "([^"]*)"$/, async (extensionValue: string) => {
  const ele = await locatorParse(Selectors.projectManagement.files.downloadFilesByExtension, extensionValue.toUpperCase());
  await $(ele).scrollIntoView();
  await elementParseAndClick(Selectors.projectManagement.files.deleteUploadedFile, extensionValue.toUpperCase());
});

Then(/^ui: Softassert if file with extension "([^"]*)" got deleted$/, async (extensionValue: string) => {
  const ele = await locatorParse(Selectors.projectManagement.files.downloadFilesByExtension, extensionValue.toUpperCase());
  await context().softAssert.isFalse(await isElementDisplayed(ele), `File: Upload${extensionValue.toUpperCase()}.${extensionValue} is still displayed on the sheet list view`)
});

Then('ui: Validate that user is not able to upload files due to restricted permissions', async () => {
  const elFileInput = await isElementDisplayed(Selectors.projectManagement.files.uploadFilesButton);
  await context().softAssert.isFalse(elFileInput, `File: Upload area/button is still displayed on the sheet list view in resource`);
});


Then(/^ui: I add "([^"]*)" formula of 2 cells "([^"]*)" and "([^"]*)" to row "([^"]*)"$/,async(formulaName,col1, col2,rowNumber) => {
  let cell1 = col1+rowNumber;
  let cell2 = col2+rowNumber;
  await browser.keys(Key.ArrowDown)
  await clickToElement(Selectors.projectManagement.sheets.formulaInput)
  await browser.keys('=' + formulaName + '(' + cell1 + ',' + cell2 + ')')
  await hitEnter()
});

Then(/^ui: I insert "([^"]*)" new row in grid view$/,async(numOfRows) => {
  await slowInputFilling(Selectors.projectManagement.sheets.addRowsInput,numOfRows)
  await clickToElement(Selectors.projectManagement.sheets.addRowsBtn)
  await browser.pause(5000)
});

Then(/^ui: I delete the row "([^"]*)"$/,async(rowNumber) => {
  await elementParseAndClick(Selectors.projectManagement.sheets.deleteRowSelector,rowNumber)
  await clickToElement(Selectors.projectManagement.sheets.deleteRowsBtn)
});