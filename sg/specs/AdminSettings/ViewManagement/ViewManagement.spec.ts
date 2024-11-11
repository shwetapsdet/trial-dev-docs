import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import {
  clickToElement, element, elementParse, getElementBackgroundColor, slowInputFilling, mayBeElement, formFill, locatorParse, hitEnter, elementParseAndClick,
  isElementDisplayed
} from '../../../../../core/func';
import DateTime from '../../../../../core/datetime';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { context } from '../../../../../utils/context';
import { viewModel } from '../../../../../models/ViewManagement.model';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
const moment = require('moment-timezone');

Then(/^ui: I click on "([^"]*)" tab in view management$/, async (tabName: string) => {
  switch (tabName.toLocaleLowerCase()) {
    case 'bpa flatgrid':
      await clickToElement(Selectors.viewManagement.tabBPAFlatGrid);
      break;
    case 'project management':
      await clickToElement(Selectors.viewManagement.tabProjectManagement);
      break;
    case 'resource management':
      await clickToElement(Selectors.viewManagement.tabResourceManagement);
      break;
    default:
      throw new Error(`Invalid Tab Name:${tabName}\nSupported Values:\n1.bpa flatgrid\n2.project management\n3.resource management`);
  }
});

Then('ui: I verify groupby dropdown is displayed', async () => {
  await expect(await element(Selectors.common.ddGroupByDropdown)).toBeDisplayed();
});

Then('ui: I click on groupby dropdown', async () => {
  await (await element(Selectors.common.ddGroupByDropdown)).click();
});

Then(/^ui: I uncheck and select attributes "([^"]*)" in groupby dropdown$/, async (attributeNames: string) => {
  const ele = await mayBeElement(Selectors.common.chkDisabledSelectAllCheckboxInGroupByDropdown);
  if (ele) { /* empty */ } else {
    await (await element(Selectors.common.chkSelectAllCheckboxInGroupByDropdown)).click();
  }

  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required for checkbox to display
    const ele = await elementParse({ locatorString: Selectors.viewManagement.bpaFlatgrid.attributeCheckboxInGroupByDropdown, parsing: attributes[i] });
    if (await ele.isSelected()) { /* empty */ } else {
      await ele.click();
    }
    // 1 second timeout is required for checkbox selection inside dropdown
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(SHORT_PAUSE);
  }
});

Then(/^ui: I verify attribute "([^"]*)" is selected in groupby dropdown$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required for checkbox to display
    const ele = await elementParse({ locatorString: Selectors.viewManagement.bpaFlatgrid.attributeCheckboxInGroupByDropdown, parsing: attributes[i] });
    await expect(ele).toBeChecked();
  }
});

Then(/^ui: I verify attribute "([^"]*)" is disabled in groupby dropdown$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required for checkbox to display
    const ele = await elementParse({ locatorString: Selectors.viewManagement.bpaFlatgrid.attributeCheckboxInGroupByDropdown, parsing: attributes[i] });
    await expect(ele).toBeDisabled();
  }
});

Then('ui: I click on add new view button', async () => {
  await (await element(Selectors.viewManagement.bpaFlatgrid.btnAddNewViewInBPAFlatGrid)).click();
  const ele = await mayBeElement(locatorParse(Selectors.common.confirmationModalButton, "Yes"), SHORT_PAUSE);
  if (ele) {
    await ele.click();
  }
});

Then(/^ui: I enter view name "([^"]*)"$/, async (viewName: string) => {
  await slowInputFilling(Selectors.viewManagement.txtViewName, viewName);
});

Then(/^ui: I toggle is default view button to "([^"]*)"$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.viewManagement.tglIsDefaultView)).toString();
  switch (toggleState.toLowerCase()) {
    case 'on':
      if (color == '#8c9caa') {
        await (await element(Selectors.viewManagement.tglIsDefaultView)).click();
      }
      break;
    case 'off':
      if (color != '#8c9caa') {
        await (await element(Selectors.viewManagement.tglIsDefaultView)).click();
      }
      break;
    default:
      throw new Error(`Invalid Toggle state:${toggleState}\nSupported Values:\n1.ON\n2.OFF`);
  }
});

Then(/^ui: I enter date range "([^"]*)" to "([^"]*)"$/, async (startDate: string, endDate: string) => {
  await formFill([
    { locator: Selectors.viewManagement.bpaFlatgrid.txtStartDate, value: null, action: 'clearValue' },
    { locator: Selectors.viewManagement.bpaFlatgrid.txtStartDate, value: startDate, action: 'setValue' },
    { locator: Selectors.viewManagement.bpaFlatgrid.txtEndDate, value: null, action: 'clearValue' },
    { locator: Selectors.viewManagement.bpaFlatgrid.txtEndDate, value: endDate, action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);

});

Then('ui: I click on save button in view management', async () => {
  await (await element(Selectors.viewManagement.btnSave)).click();
  await expect(await element(Selectors.viewManagement.btnSave)).toBeClickable();
});

Then(/^ui: I verify if specific view "([^"]*)" is displayed in "([^"]*)" section$/, async (viewName: string, tabName: string) => {
  const locationString = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await expect(replacedLocator).toBeDisplayed();
});

Then(/^ui: I verify if default view icon is displayed for specific view "([^"]*)" in "([^"]*)" section$/, async (viewName: string, tabName: string) => {
  const locationString = Selectors.viewManagement.defaultViewIconInSpecificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await expect(await element(replacedLocator)).toBeDisplayed();
});

Then(/^ui: I delete specific view "([^"]*)" in "([^"]*)" section$/, async (viewName: string, tabName: string) => {
  const locationString1 = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator1 = locationString1.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  const el1 = await element(replacedLocator1);
  await el1.moveTo();
  await browser.pause(SHORT_PAUSE); //Required to mouse hower and see the element
  const locationString2 = Selectors.viewManagement.deleteSpecificViewInSpecificTab;
  const replacedLocator2 = locationString2.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await clickToElement(replacedLocator2, true);
  await clickToElement(Selectors.viewManagement.btnYesRemoveItInConfirmationModal);
  await browser.pause(MEDIUM_PAUSE); //Required to complete deletion
});

Then(/^ui: I verify if specific view "([^"]*)" is not displayed in "([^"]*)" section$/, async (viewName: string, tabName: string) => {
  const locationString = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await expect(await mayBeElement(replacedLocator)).toBeFalsy();
});

Then(/^ui: I click on specific view "([^"]*)" in "([^"]*)" section$/, async (viewName: string, tabName: string) => {
  const locationString = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await clickToElement(replacedLocator, true);
});

Then('ui: I enter date range for current year', async () => {
  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await expect(await element(Selectors.viewManagement.bpaFlatgrid.txtStartDate)).toBeDisplayed();
  await slowInputFilling(Selectors.viewManagement.bpaFlatgrid.txtStartDate, startDate);
  await hitEnter();
  // await (await element(Selectors.viewManagement.bpaFlatgrid.txtStartDate)).click();
  await expect(await element(Selectors.viewManagement.bpaFlatgrid.txtEndDate)).toBeDisplayed();
  await (await element(Selectors.viewManagement.bpaFlatgrid.txtEndDate)).click();
  await slowInputFilling(Selectors.viewManagement.bpaFlatgrid.txtEndDate, endDate);
  await hitEnter();
  // await (await element(Selectors.viewManagement.bpaFlatgrid.txtEndDate)).click();
});

Then('ui: I enter view name using model', async () => {
  context().viewName = viewModel().name;
  await slowInputFilling(Selectors.viewManagement.txtViewName, context().viewName);
});

Then(/^ui: I verify if specific view created using model is displayed in "([^"]*)" section$/, async (tabName: string) => {
  const locationString = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await expect(await element(replacedLocator)).toBeDisplayed();
});

Then(/^ui: I verify if default view icon is displayed for specific view created using model in "([^"]*)" section$/, async (tabName: string) => {
  const locationString = Selectors.viewManagement.defaultViewIconInSpecificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await expect(await element(replacedLocator)).toBeDisplayed();
});

Then(/^ui: I delete specific view created using model in "([^"]*)" section$/, async (tabName: string) => {
  const locationString1 = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator1 = locationString1.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  const el1 = await element(replacedLocator1);
  await el1.scrollIntoView();
  await browser.pause(SHORT_PAUSE / 2); //Required to mouse hower and see the element
  await el1.moveTo();
  await browser.pause(SHORT_PAUSE / 2); //Required to mouse hower and see the element
  const locationString2 = Selectors.viewManagement.deleteSpecificViewInSpecificTab;
  const replacedLocator2 = locationString2.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await clickToElement(replacedLocator2, true);
  await clickToElement(locatorParse(Selectors.common.confirmationModalButton, "Yes, remove it"));
  await browser.pause(MEDIUM_PAUSE); //Required to complete deletion
});

Then(/^ui: I verify if specific view created using model is not displayed in "([^"]*)" section$/, async (tabName: string) => {
  const locationString = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await expect(await mayBeElement(replacedLocator, SHORT_PAUSE)).toBeFalsy();
});

Then(/^ui: I click on specific view created using model in "([^"]*)" section$/, async (tabName: string) => {
  const locationString = Selectors.viewManagement.specificViewInSpecificTab;
  const replacedLocator = locationString.replace('{{tabName}}', tabName).replace('{{viewName}}', context().viewName);
  await clickToElement(replacedLocator, true);
});

Then('ui: I enabled Dynamic Date Inputs', async () => {
  const el = await element(Selectors.viewManagement.bpaFlatgrid.btnDyanamicDate);
  await el.click();
});

Then('ui: I validate start date filled automatically', async () => {
  const el = await element(Selectors.viewManagement.bpaFlatgrid.txtStartDyanamicDate);
  const startDate = (await el.getText()).trim();
  const today = moment().format(GeneralSettingsDefaultValues.global.dateFormat)
  expect(`${startDate}`).toEqual(`Today: ${today}`);
});

Then(/^ui: I select "(Current Month|Next Month|Current Qtr|Next Qtr|Current Year|Next Year|3 Years)" form the end date$/, async (duration: string) => {
  await clickToElement(Selectors.viewManagement.bpaFlatgrid.txtEndDyanamicDate);
  await elementParseAndClick(Selectors.viewManagement.bpaFlatgrid.txtEndDyanmicDateDuration, duration)
});

Then('ui: I validate date is set automatically end of the Month', async () => {
  const endOfTheMonth = moment().endOf('months').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(endOfTheMonth);
});

Then('ui: I validate date is set automatically next end of the Month', async () => {
  const nextEndOfTheMonth = moment().add({ months: 1 }).endOf('months').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(nextEndOfTheMonth);
});

Then('ui: I validate date is set automatically current qtr end of the month', async () => {
  const endOfQtr = moment().endOf('quarter').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(endOfQtr);
});

Then('ui: I validate date is set automatically next qtr end of the month', async () => {
  const nextQtrEndOfTheMonth = moment().add({ quarter: 1 }).endOf('quarter').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(nextQtrEndOfTheMonth);
});

Then('ui: I validate date is set automatically end of the year', async () => {
  const endOfTheYear = moment().endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(endOfTheYear);
});

Then('ui: I validate date is set automatically next year end of the year', async () => {
  const nextYearEnd = moment().add({ year: 1 }).endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(nextYearEnd);
});

Then('ui: I validate date is set automatically next three year end of the year', async () => {
  const nextThreeYearEnd = moment().add({ year: 3 }).endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat);
  const el = await element(Selectors.viewManagement.bpaFlatgrid.lblDyanmicEndDateText)
  const endDate = await el.getText();
  expect(endDate).toEqual(nextThreeYearEnd);
});

Then(/^ui: I click on add new view button in "([^"]*)" tab$/, async (tabName:string) => {
  switch (tabName.toLocaleLowerCase()) {
    case 'bpa flatgrid':
      await (await element(Selectors.viewManagement.bpaFlatgrid.btnAddNewViewInBPAFlatGrid)).click();
      break;
    case 'project management':
      await (await element(Selectors.viewManagement.projectManagementgrid.btnAddNewViewInProjectTab)).click();
      break;
    case 'resource management':
      await (await element(Selectors.viewManagement.resourceManagementgrid.btnAddNewViewInResourceTab)).click();
      break;
    default:
      throw new Error(`Invalid Tab Name:${tabName}\nSupported Values:\n1.bpa flatgrid\n2.project management\n3.resource management`);
  }
  const ele = await mayBeElement(locatorParse(Selectors.common.confirmationModalButton, "Yes"), SHORT_PAUSE);
  if (ele) {
    await ele.click();
  }
});

Then('ui: Reenter same view name again in View Management', async () => {
  await slowInputFilling(Selectors.viewManagement.txtViewName, context().viewName);
});

Then(/^ui: I validate data is grouped by "([^"]*)"$/,async(groupBy:string) => {
  await mayBeElement(await elementParse({locatorString:'(//span[contains(text(),"{{groupBy}}")])',parsing:groupBy}))
});

Then('ui: I click on view button and change it to newly created view',async() => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.btnView)
  await formFill([
    {locator:'//input[@placeholder="Search" and @type="text"]',value: context().viewName,action:'setValue'}
  ]);
  await elementParseAndClick('//span[@class="layt_litext"]/*[text()="{{viewName}}"]',context().viewName)
})

Then('ui: I validate that the newly created view is not the default view', async () => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.viewManagement.defaultViewValidation, context().viewName));
  const ele2 = await isElementDisplayed(await locatorParse(Selectors.viewManagement.defaultViewValidation, 'Default'));
  await context().softAssert.isFalse(ele, `Sheet Management: View {${context().viewName}} is the default view`);
  await context().softAssert.isTrue(ele2, `Sheet Management: View {Default} is the default view`);
})