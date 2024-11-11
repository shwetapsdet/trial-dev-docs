import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import {
  clickToElement, element, slowInputFilling, elementParse, locatorParse, elementDragAndDrop, elementParseAndClick, formFill
} from '../../../../core/func';
import { context } from '../../../../utils/context';
import { reportModel } from '../../../../models/ReportManagement.model';
import * as path from 'path';
import { assert } from 'chai';
const moment = require('moment')


Then(/^ui: I enter report name "([^"]*)"$/, async (reportName: string) => {
  await slowInputFilling(Selectors.reportManagement.txtReportName, reportName);
});

Then(/^ui: I click on specific tab "([^"]*)" in pivot grid$/, async (tabName: string) => {
  await (await elementParse({ locatorString: Selectors.reportManagement.pivotGrid.specificTab, parsing: tabName })).click();
});

Then('ui: I verify search icon is displayed in pivot grid dimensions tab', async () => {
  await expect(await element(Selectors.reportManagement.pivotGrid.btnSearchInDimesionsTab)).toBeDisplayed();
});

Then('ui: I click on search icon in pivot grid dimensions tab', async () => {
  await clickToElement(Selectors.reportManagement.pivotGrid.btnSearchInDimesionsTab);
});

Then('ui: I verify search field is displayed in pivot grid dimensions tab', async () => {
  await expect(await element(Selectors.reportManagement.pivotGrid.txtSearchInDimensionsTab)).toBeDisplayed();
});

Then('ui: I enter report name in pivot grid', async () => {
  context().reportName = reportModel().name;
  await slowInputFilling(Selectors.reportManagement.txtReportName, context().reportName);
});

Then('ui: Wait for dimensions tab to be clickable in Pivot Grid section', async () => {
  await element(locatorParse(Selectors.reportManagement.pivotGrid.specificTab, "Dimensions"));
});

Then(/^ui: I drag and drop "([^"]*)" into "(Rows|Columns|Filters|Measures)"$/,async(feature:string,tileDestination:string) => {
  let ele1 = elementParse({locatorString:Selectors.reportManagement.pivotGrid.feature,parsing:feature})
  let ele2;
  switch(tileDestination){
    case 'Rows':
      ele2 = Selectors.reportManagement.pivotGrid.tileRows;
      break;
    case 'Columns':
      ele2 = Selectors.reportManagement.pivotGrid.tileCols;
      break;
    case 'Filters':
      ele2 = Selectors.reportManagement.pivotGrid.tileFilter
      break;
    case 'Measures':
      ele2 = Selectors.reportManagement.pivotGrid.tileMeasure
      break;
  }
  await elementDragAndDrop(await ele1, ele2);
})

Then(/^ui: I click on "([^"]*)" element$/,async(element:string) => {
  await elementParseAndClick(Selectors.reportManagement.pivotGrid.feature,element)
})

Then('ui: I save the created Pivot Grid and validate it is saved',async() => {
  await clickToElement(Selectors.reportManagement.pivotGrid.btnSave);
});

Then('ui: I click on filters icon in Pivot Grid',async() => {
  await clickToElement(Selectors.reportManagement.pivotGrid.btnFilter)
});

Then(/^ui: I click on "([^"]*)" filters$/,async(filter:string)=> {
  await elementParseAndClick(Selectors.reportManagement.pivotGrid.optionFilter,filter)
});

Then('ui: I unselect all and click on apply button after verifying it is empty',async() => {
  await clickToElement(Selectors.reportManagement.pivotGrid.allCheckbox)
  await clickToElement(Selectors.reportManagement.pivotGrid.btnApply)
});

Then(/^ui: I search for "([^"]*)"$/,async(inputDimension:string) => {
  await clickToElement(Selectors.reportManagement.pivotGrid.btnAddOn)
  await browser.pause(1000)
  await formFill([
    {locator: Selectors.adminSettings.hierarchy.searchInput,value:inputDimension,action:'setValue'}
  ])
});

Then(/^ui: I drag and drop searched "([^"]*)" into "(Rows|Columns|Filters|Measures)"$/,async(feature:string,tileDestination:string) => {
  let ele1 = elementParse({locatorString:Selectors.reportManagement.pivotGrid.searchFeature,parsing:feature})
  let ele2;
  switch(tileDestination){
    case 'Rows':
      ele2 = Selectors.reportManagement.pivotGrid.tileRows;
      break;
    case 'Columns':
      ele2 = Selectors.reportManagement.pivotGrid.tileCols;
      break;
    case 'Filters':
      ele2 = Selectors.reportManagement.pivotGrid.tileFilter
      break;
    case 'Measures':
      ele2 = Selectors.reportManagement.pivotGrid.tileMeasure
      break;
  }
  await elementDragAndDrop(await ele1, ele2);
});

Then('ui: I export the created report',async() => {
  await clickToElement(Selectors.reportManagement.pivotGrid.btnExportReport)
  await clickToElement(Selectors.reportManagement.pivotGrid.pdfExportReport)
});

Then(/^ui: Softassert if exported pdf file got downloaded in directory:"([^"]*)" under project's root directory with extension "([^"]*)" for "([^"]*)" tab$/, async (folderName: string, fileExtension: string, tabView: string) => {
  const expectedFileName = `${tabView}-${moment().format('MMM_DD_YYYY')}.${fileExtension}`;

  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});