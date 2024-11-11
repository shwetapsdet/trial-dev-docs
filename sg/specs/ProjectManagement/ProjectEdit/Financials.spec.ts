import { Given, Then } from '@wdio/cucumber-framework';
import DateTime from "../../../../../core/datetime";
import { clickToElement, element, elementParseAndClick, formFill, hitEnter, isElementDisplayed, locatorParse, slowInputFilling } from "../../../../../core/func";
import Selectors from '../../../../../core/selectors';
import { DateFormats } from "../../../../../core/enums";
import { ELEMENT_TIMEOUT, SHORT_PAUSE } from "../../../../../core/timeouts";
import { context } from "../../../../../utils/context";
import { resourcesListAttributeModel } from '../../../../../models/Attribute.model';
import {budgetModel} from '../../../../../models/BudgetManagement.model'
import { FiscalPeriod } from '../../../../../helpers/FiscalPeriodManagement/FiscalPeriodManagement.helper';
import { waitForFileToDownload } from '../../../../../core/fileUtilities';
const moment = require('moment')
import * as path from 'path';


Then('ui: Enter current year in start and End date in Financials', async () => {
  const startDate = DateTime.getCurrentYearStartDate(DateFormats.MonthYearFormat3);
  const endDate = DateTime.getCurrentYearEndDate(DateFormats.MonthYearFormat3);
  await clickToElement(Selectors.projectManagement.scribe.financials.startDateInputbox);
  await slowInputFilling(Selectors.projectManagement.scribe.financials.startDateInputbox, startDate);
  await clickToElement(Selectors.projectManagement.scribe.financials.endDateInputbox);
  await slowInputFilling(Selectors.projectManagement.scribe.financials.endDateInputbox, endDate);
  await clickToElement(Selectors.projectManagement.scribe.financials.startDateInputbox);//Needed to close date picker of end date
});

Then('ui: Click on Assignment Type dropdown in Financials', async () => {
  await clickToElement(Selectors.projectManagement.scribe.financials.assignmentTypeDropdown);
});

Then(/^ui: Verify if "([^"]*)" options are displayed in Assignment type dropdown of financials$/, async (optionsToBeVerified: string) => {
  const options = optionsToBeVerified.split(",");
  for (const option of options) {
    const optionDisplayed = await isElementDisplayed(`${Selectors.common.dropdownValues}//div[normalize-space(.)='${option}']`, SHORT_PAUSE);
    await context().softAssert.isTrue(optionDisplayed, `Option:{${option}} was not displayed in Assignment type dropdown of financials`);
  }
});

Then('ui: Click on Checkout button in Financials and wait for Release button', async () => {
  await clickToElement(Selectors.projectManagement.sPA.checkoutButton);
  await (await element(Selectors.projectManagement.sPA.releaseButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then(/^ui: Verify if "([^"]*)" options are not displayed in Assignment type dropdown of financials$/, async (optionsToBeVerified: string) => {
  const options = optionsToBeVerified.split(",");
  for (const option of options) {
    const optionDisplayed = await isElementDisplayed(`${Selectors.common.dropdownValues}//div[normalize-space(.)='${option}']`, SHORT_PAUSE);
    await context().softAssert.isFalse(optionDisplayed, `Option:{${option}} was displayed in Assignment type dropdown of financials`);
  }
});


Given('ui: I click on create Budget button',async() => {
  await clickToElement(Selectors.budgetManagement.btnCreate)
});

Given(/^ui: Enter start date as "([^"]*)" of current year$/,async(startMonth: string) => {
  await formFill([
    {locator: Selectors.budgetManagement.startDate, value: null, action:'clearValue'},
    {locator: Selectors.budgetManagement.startDate, value: startMonth, action:'setValue'},
  ])
  await hitEnter();
  if(await isElementDisplayed(Selectors.projectManagement.projectEdit.btnApprove)) {
    await clickToElement(Selectors.projectManagement.projectEdit.btnApprove);
  }

});

Given(/^ui: Enter end date as "([^"]*)" of current year$/,async(endMonth: string) => {
  await formFill([
    {locator: Selectors.budgetManagement.endDate, value: null, action:'clearValue'},
    {locator: Selectors.budgetManagement.endDate, value: endMonth, action:'setValue'},
  ])
  await hitEnter();
  if(await isElementDisplayed(Selectors.projectManagement.projectEdit.btnApprove)) {
    await clickToElement(Selectors.projectManagement.projectEdit.btnApprove);
  }
});

Given('ui: I create a budget with using created attribute as project custom field', async() =>{
  context().budgetModel = budgetModel().name
  context().attributeName = resourcesListAttributeModel().projectAttributeName    
  await slowInputFilling(Selectors.budgetManagement.name,context().budgetModel)
  await clickToElement('(//label[text()="Project Custom Field"]/parent::div//span)[1]');
  await clickToElement('//div[@class="name_fl" and normalize-space(text())="Dataset Preference"]')
  await browser.pause(SHORT_PAUSE * 2)
  await clickToElement(Selectors.budgetManagement.saveButton);
});

Given('ui: Click on Include labor costs toggle',async() => {
  await clickToElement(Selectors.projectManagement.scribe.financials.includeLaborCost)
});

Then('ui: I select recently created financial category',async () => {
  const ele = context().financialCategoryName;
  await slowInputFilling(Selectors.projectManagement.scribe.financials.createdCategory, ele);
  await elementParseAndClick(Selectors.projectManagement.scribe.financials.selectCreatedCategory, ele);
});

Then(/^ui: I allocate "([^"]*)" hours to the financial category for each months$/, async (hoursToBeAllocated: number) => {

  const ele = context().financialCategoryName

  const locator = locatorParse(Selectors.projectManagement.scribe.financials.hourLocator, ele);
  for (let i = 1; i < 7; i++) {
    await clickToElement(locator + `[${i+1}]`);
    await browser.keys(hoursToBeAllocated);
    await hitEnter();
  }
});

Then(/^ui: I update the budget allocation value to "([^"]*)" for months:"([^"]*)" of current year$/,async (hoursToBeAllocated: string, monthsToBeUpdated: string,) => {
  const columnsToBeUpdated = monthsToBeUpdated.split(",");
  let locator = Selectors.budgetManagement.updateValueForBudgetByGrid.replace('{{rowName}}', 'Allocation');
  for (let i = 0; i < columnsToBeUpdated.length; i++) {
    const columnName = columnsToBeUpdated[i] + " " + moment().year();
    await elementParseAndClick(locator, columnName);
    await browser.keys(hoursToBeAllocated);
    await hitEnter();
  }
})

Then('ui: Click on Save Changes button in Budget',async () => {
  await clickToElement(Selectors.budgetManagement.saveChangesBUtton);
  await browser.pause(SHORT_PAUSE);
})

Given('ui: Uncheck fiscal month and fiscal quarter', async () => {
  for (const modeOfEntry of ["Fiscal Month", "Fiscal Quarter"]) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.globalTab.modeOfEntryInput, modeOfEntry))
    const isSelected = await el.isSelected();

    if (isSelected) {
      await el.click();
    }
  }
})

Given('ui: Check fiscal month and fiscal quarter', async () => {
  for (const modeOfEntry of ["Fiscal Month", "Fiscal Quarter"]) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.globalTab.modeOfEntryInput, modeOfEntry))
    const isSelected = await el.isSelected();

    if (!isSelected) {
      await el.click();
    }
  }
})

Then('ui: I verify Fiscal Month option is not displayed in mode of entry dropdown', async () => {
  await clickToElement(Selectors.projectManagement.scribe.financials.modeOFEntrydd);
  const ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.scribe.financials.selectModeOfEntry, 'Fiscal Month'))
  await context().softAssert.isFalse(ele, `Option: {Fiscal Month} is still displayed`)
})

Then(/^ui: Select Date mode as:"([^"]*)" in Financials if not already selected$/, async (dateModeToBeSelected: string) => {
  await FiscalPeriod.selectSpecifcDateModetIfNotSelectedAlready(dateModeToBeSelected);
});


Then(/^ui: I validate that the allocated hour is "([^"]*)" to the financial category$/,async (hoursToBeAllocated: string) => {
  const ele = context().financialCategoryName

  const locator = locatorParse(Selectors.projectManagement.scribe.financials.hourLocator, ele);
  for (let i = 1; i < 7; i++) {
    const ele = await $(locator + `[${i+1}]`).getText();
    await context().softAssert.equal(ele, `€            ${hoursToBeAllocated}`, `Allocated Hours: {${hoursToBeAllocated}} are not same as the updated hours`);
    await hitEnter();
  }
})

Then('ui: Click on export icon in Financials', async () => {
  await clickToElement(Selectors.projectManagement.scribe.financials.exportIcon);
});

Then(/^ui: Softassert if Financials exported file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `financial ${moment().format('DD.MM.YYYY')}.csv`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then(/^ui: I validate Allocation value for range between "([^"]*)" to "([^"]*)"$/, async (start_Date: string, end_Date: string) => {
  const startDate = moment(start_Date, 'DD-MM-YYYY');
  const endDate = moment(end_Date, 'DD-MM-YYYY');

  // Calculate the difference in days
  const numberOfDays = endDate.diff(startDate, 'days')+1; // Add 1 to include both start and end dates

  const expectedAllocationValue = numberOfDays*80;

  const ele = await $('//span[text()="Allocation Labor Cost"]/ancestor::th/following-sibling::td').getText();
  const eleValue = ele.match(/\d+/)[0];
  await context().softAssert.equal(eleValue, expectedAllocationValue, `Allocation Value is not correct`)
})