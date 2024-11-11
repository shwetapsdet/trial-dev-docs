/* eslint-disable max-len */
import { Then, When } from '@cucumber/cucumber';
const moment = require('moment')
import { faker } from '@faker-js/faker';

import { clearTextUsingBackspace, clickToElement, clickToElementUsingJS, doubleClickToElement, element, elementDragAndDrop, elementParse, elementParseAndClick, formFill, getCurrencySymbol, getElementBackgroundColor, hitEnter, isElementDisplayed, locatorParse, mayBeElement, reload, selectFromDropdown, slowInputFilling } from '../../../../../core/func';
import { DateFormats, GeneralSettings, GenericColorCodes, PlanType, ProjectEdit, ToggleStates } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { context } from '../../../../../utils/context';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import DateTime from '../../../../../core/datetime';
import { projectModel } from '../../../../../models/project.model';
import { SingleProjectAllocation } from '../../../../../helpers/ProjectManagement/ProjectEdit/SingleProjectAllocation.helper';
import { ProjectGrid } from '../../../../../helpers/ProjectManagement/Grid.helper';
import { Key } from 'webdriverio'
import { assert } from 'chai';
import { waitForFileToDownload } from '../../../../../core/fileUtilities';
import * as path from 'path';
const projectId = [];

Then(/^ui: Verify if "([^"]*)" unit is selected in SPA$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.Gantt:
    case GeneralSettings.Units.Manday:
      await elementParse({ locatorString: Selectors.projectManagement.sPA.specificUnitTabLabel, parsing: unitToBeVerified });
      await expect(await elementParse({ locatorString: Selectors.projectManagement.sPA.specificUnitTabInput, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await element(Selectors.projectManagement.sPA.fTEPercentTabLabel);
      await expect(await element(Selectors.projectManagement.sPA.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

Then(/^ui: Click on meatballs icon against resource "([^"]*)" in "([^"]*)" section and select "([^"]*)"$/, async (resourceName: string, planType: string, optionToBeSelected: string) => {
  switch (planType) {
    case PlanType.Allocation:
      await (
        await element(
          Selectors.projectManagement.sPA.allocationSectionGrid +
          "//div[contains(@class,'ht_master handsontable')]//span[text()='" +
          resourceName +
          "']/ancestor::div[contains(@class,'sg_lftinp--box')]/div[@class='sg_lftedit bubble-button blue-over']"
        )
      ).click();
      break;
    case PlanType.Demand:
      await (
        await element(
          Selectors.projectManagement.sPA.demandSectionGrid +
          "//div[contains(@class,'ht_master handsontable')]//span[text()='" +
          resourceName +
          "']/ancestor::div[contains(@class,'sg_lftinp--box')]/div[@class='sg_lftedit bubble-button blue-over']"
        )
      ).click();
      break;
    default: throw Error(`Incorrect plan type:{${planType}}\nSupported values (Case sensitive):${Object.values(PlanType)}`);
  }

  await browser.pause(SHORT_PAUSE);

  switch (optionToBeSelected) {
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.CrossProjectAllocation:
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.CrossProjectAllocationShortHand:
      await elementParseAndClick(Selectors.common.dropdownSpecificValue, ProjectEdit.SPA.ResourceOrTaskEditOptions.CrossProjectAllocation);
      break;
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.ResourceReplace:
      await elementParseAndClick(Selectors.common.dropdownSpecificValue, ProjectEdit.SPA.ResourceOrTaskEditOptions.ResourceReplace);
      break;
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.Delete:
      await elementParseAndClick(Selectors.common.dropdownSpecificValue, ProjectEdit.SPA.ResourceOrTaskEditOptions.Delete);
      break;
    default: throw Error("Incorrect option to be selected:{" + optionToBeSelected + "} after click on meatballs icon of:{" + resourceName + "}\nSupported values (Case sensitive):${" + Object.values(ProjectEdit.SPA.ResourceOrTaskEditOptions + "}"));
  }
});

Then('ui: Click on Checkout button in SPA and wait for Release button', async () => {
  await browser.pause(MEDIUM_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.sPA.checkoutButton);
  // await (await element(Selectors.projectManagement.sPA.releaseButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then('ui: Click on Release button in SPA and wait for Checkout button', async () => {
  await clickToElement(Selectors.projectManagement.sPA.releaseButton);
  await (await element(Selectors.projectManagement.sPA.checkoutButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then(/^ui: I click on edit button of specific resource "([^"]*)" in "([^"]*)" Tab$/, async (resourceName: string, planType: string) => {

  /**
   * 3-dot button it's contains shadow :before inside it, and it's tricky to target
   * browser needs to wait until it's fully presents and replace their :before content value in css to \f141 means 3 dots
   */

  await browser.pause(SHORT_PAUSE);

  let el;

  if (planType.toLowerCase() == 'allocation') {
    el = await $(`//div[contains(@class,'allocation-resourceshl')]//div[contains(@class,'ht_master handsontable')]
    //span[text()='${resourceName}']/ancestor::div[contains(@class,'sg_lftinp--box')]/div[@class='sg_lftedit bubble-button blue-over']`);
  } else if (planType.toLowerCase() == 'demand') {
    el = await $(
      `//div[contains(@class,'allocation-resourceplan')]//div[contains(@class,'ht_master handsontable')]
        //span[text()='${resourceName}']/ancestor::div[contains(@class,'sg_lftinp--box')]/div[@class='sg_lftedit bubble-button blue-over']`
    )
  }

  // it's hard to eliminate element and perform click on it, so need help of native js things. 
  await browser.execute("arguments[0].click();", el);
});

Then('ui: I click on cross project allocation', async () => {
  await clickToElement(Selectors.projectManagement.sPA.lnkCrossProjectAllocation);
});

Then('ui: I click on Resource Replace Button', async () => {
  await clickToElement(Selectors.projectManagement.sPA.lnkResourceReplace);
})

Then(/^ui: Click on dataset dropdown and select "([^"]*)" in SPA$/, async (planType: string) => {
  await expect(await element(Selectors.projectManagement.sPA.datasetDropdown)).toBeClickable();
  await clickToElement(Selectors.projectManagement.sPA.datasetDropdown);
  if (planType.toLocaleLowerCase() == 'allocation') {
    await expect(await element(Selectors.common.allocationPlanType)).toBeClickable();
    await clickToElement(Selectors.common.allocationPlanType);
  } else if (planType.toLocaleLowerCase() == 'demand') {
    await expect(await element(Selectors.common.demandPlanType)).toBeClickable();
    await clickToElement(Selectors.common.demandPlanType);
  }
});

Then(/^ui: Select Assignment Type as:"([^"]*)" in SPA if not already selected$/, async (assignmentType: string) => {
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);
});

Then(/^ui: I click on group by dropdown and select "([^"]*)" in SPA$/, async (groupByOption: string) => {
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await elementParseAndClick(Selectors.projectManagement.sPA.ddGroupByOption,groupByOption );
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: Click on resource or task "([^"]*)" expand icon$/, async (resourceOrTaskName: string) => {
  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceOrTaskName);
});

Then('ui: Enter current year as date for the project in SPA', async () => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
});

Then(/^ui: Allocate "([^"]*)" hours for resource to project in SPA in Month mode for current year when dataset is "(Allocation|Demand)"$/, async (hoursToBeAllocated: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.pause(SHORT_PAUSE)
    await browser.keys(hoursToBeAllocated);
  }
});

Then(/^ui: Update hours to "([^"]*)" for resource in SPA in Month mode for current year when dataset is "([^"]*)"$/, async (hoursToBeAllocated: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  const startDate = moment(moment().startOf('year'));
  const endDate = moment(moment().endOf('year'));
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.keys(hoursToBeAllocated);
    await hitEnter();
  }
});

Then('ui: Click on Save and Check In button in SPA and wait for Checkout button', async () => {
  await clickToElement(Selectors.projectManagement.sPA.saveAndCheckInButton);
  await (await element(Selectors.projectManagement.sPA.checkoutButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then(/^ui: Verify if resource has "([^"]*)" hours for every month of current year in SPA when dataset is "(Allocation|Demand)"$/, async (hoursToBeVerified: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  for (let i = 0; i < betweenMonths.length; i++) {
    const actualValue = (await (await elementParse({ locatorString: locator, parsing: betweenMonths[i] })).getText()).replace(getCurrencySymbol(GeneralSettingsDefaultValues.global.costCurrency), "").trim();
    context().softAssert.equal(actualValue, hoursToBeVerified, `Resource:{${resourceName}} has incorrect value in SPA for month:{${betweenMonths[i]}}`);
  }
});

Then(/^ui: Allocate "([^"]*)" hours for resource to project in SPA in Month mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.pause(SHORT_PAUSE)
    await browser.keys(hoursToBeAllocated);
    
  }
  
});

Then('ui: Verify project allocation dates are set to current year', async () => {
  const expectedStartDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const expectedEndDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  const actualStartDate = await (await element(Selectors.projectManagement.sPA.startDateInSPA)).getValue();
  await context().softAssert.equal(actualStartDate, expectedStartDate, "Start date in SPA was incorrect");
  // await expect(startDateElement).toHaveValue(expectedStartDate, { ignoreCase: true });
  const actualEndDate = await (await element(Selectors.projectManagement.sPA.endDateInSPA)).getValue();
  await context().softAssert.equal(actualEndDate, expectedEndDate, "End date in SPA was incorrect");
  // await expect(endDateElement).toHaveValue(endDate, { ignoreCase: true });
});

Then(/^ui: Allocate "([^"]*)" hours for existing resource to project in SPA in Month mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.keys(hoursToBeAllocated);
  }
});

Then(/^ui: I click on specific unit "([^"]*)" in SPA$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.Gantt:
    case GeneralSettings.Units.Manday:
      await elementParseAndClick(Selectors.projectManagement.sPA.specificUnitTabLabel, unitToBeVerified);
      await browser.pause(3000)
      break;
    case GeneralSettings.Units.FTEPercent:
      await clickToElement(Selectors.projectManagement.sPA.fTEPercentTabLabel);
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

Then(/^ui: I select specific date mode "([^"]*)" in SPA$/, async (dateMode: string) => {
  await clickToElement(Selectors.projectManagement.sPA.ddDateModeDropdown);
  await browser.pause(SHORT_PAUSE); //Required to display values
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, dateMode)
});

Then(/^ui: Allocate specific "([^"]*)" hours for resource to project in SPA in Month mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;
  const hours: string[] = hoursToBeAllocated.split(',');
  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.pause(SHORT_PAUSE)
    await browser.keys(hours[i]);
  }
});

Then('ui: Add new resource to the SPA', async () => {
  const resourceName = context().resourceSetup.name;

  await selectFromDropdown({
    dropdownOpener: Selectors.projectManagement.sPA.ddGroupByDropdown,
    dropdownSelection: locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"),
  });

  await slowInputFilling(Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, resourceName);
  await browser.pause(SHORT_PAUSE);
  await hitEnter();
})

Then(/^ui: Allocate random hours for two resource task in SPA in Month mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (dataset: string, assignmentType: string) => {
  context().taskName1 = projectModel().taskName;
  context().taskName2 = projectModel().taskName;
  const resources: string[] = [context().resource1, context().resource2];
  const task: string[] = [context().taskName1, context().taskName2];
  const twoDigitValue = faker.string.numeric(2);
  const threeDigitValue = faker.string.numeric(4);
  const values: string[] = [twoDigitValue, threeDigitValue];

  for (let i = 0; i < resources.length; i++) {
    const hours = values[i];
    await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
    await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

    await browser.pause(SHORT_PAUSE);//Required to open dropdown
    await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
    await browser.pause(SHORT_PAUSE); //Required to open dropdown
    await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

    if (dataset.toLowerCase() == "allocation") {
      const el1 = await element(Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection)
      await el1.click()
      await slowInputFilling(Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, resources[i]);
      await browser.pause(SHORT_PAUSE);
      await hitEnter();
    } else {
      const el2 = await element(Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection)
      await el2.click()
      await slowInputFilling(Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, resources[i]);
      await browser.pause(SHORT_PAUSE);
      await hitEnter();
    }

    await clickToElement(Selectors.common.loginName);
    await clickToElement(Selectors.common.loginName);
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resources[i]);
    await browser.pause(SHORT_PAUSE);

    if (dataset.toLowerCase() == "allocation") {
      await slowInputFilling(Selectors.projectManagement.sPA.typeANewTaskInputBoxInAllocationSection, task[i]);
      await browser.pause(SHORT_PAUSE);
      await clickToElement(Selectors.projectManagement.sPA.allocationSectionGrid + Selectors.projectManagement.sPA.applyTaskButton);
    } else {
      await slowInputFilling(Selectors.projectManagement.sPA.typeANewTaskInputBoxInDemandSection, task[i]);
      await browser.pause(SHORT_PAUSE);
      await clickToElement(Selectors.projectManagement.sPA.demandSectionGrid + Selectors.projectManagement.sPA.applyTaskButton);
    }

    const startDate = moment().startOf('year');
    const endDate = moment().endOf('year');
    const betweenMonths = [];
    if (startDate < endDate) {
      const date = startDate.startOf('month');
      while (date < endDate.endOf('month')) {
        betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
        date.add(1, 'month');
      }
    }
    let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, task[i]);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }

    for (let i = 0; i < betweenMonths.length; i++) {
      await elementParseAndClick(locator, betweenMonths[i]);
      await browser.keys(hours);
    }
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resources[i]);
  }
});

Then(/^ui: I select dataset "([^"]*)" and assignment type "([^"]*)"$/,async(dataset:string, assignmentType:string) => {
  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);
})

Then(/^ui: Allocate "([^"]*)" hours for resource to project in SPA in Project mode when dataset is "(Allocation|Demand)"$/, async (hoursToBeAllocated: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  await selectFromDropdown({
    dropdownOpener: Selectors.projectManagement.sPA.ddGroupByDropdown,
    dropdownSelection: locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"),
  });

  await SingleProjectAllocation.selectSpecificDateModeIfNotSelectedAlready("Project");

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      await formFill([
        { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
        { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
        { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
      ]);
      await browser.pause(SHORT_PAUSE);
      await hitEnter();
      break;
    case 'demand':
      await formFill([
        { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
        { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
        { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
      ]);
      await browser.pause(SHORT_PAUSE);
      await hitEnter();
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);

  await elementParseAndClick(Selectors.projectManagement.sPA.firstCellOfResourceOrTask, resourceName);
  await browser.keys(hoursToBeAllocated);
  await hitEnter();
});


Then(/^ui: Add a new task in SPA when dataset is "(Allocation|Demand)"$/, async (dataset: string) => {
  const { taskName } = context().projectSetup;
  await SingleProjectAllocation.enterTaskNameAndClickOnGreenTickMark(taskName, dataset);
});


Then(/^ui: Click on Group By dropdown in SPA and select "(Resource|Task)"$/, async (optionToBeSelected: string) => {
  await SingleProjectAllocation.clickOnGroupByDropdownAndSelectSpecificOption(optionToBeSelected);
});

Then('ui: I verify release button is displayed in SPA', async () => {
  await expect(await element(Selectors.projectManagement.sPA.releaseButton)).toBeDisplayed();
});

Then(/^ui: Update "([^"]*)" hours for recently added resource in SPA for months:"([^"]*)" of current year when dataset is "(Allocation|Demand)"$/,
  async (hoursToBeAllocated: string, monthsToBeUpdated: string, dataset: string) => {
    const columnsToBeUpdated = monthsToBeUpdated.split(",");
    const resourceName = context().resourceSetup.name;
    let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }

    await SingleProjectAllocation.selectSpecificDateModeIfNotSelectedAlready("Month");
    await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);

    for (let i = 0; i < columnsToBeUpdated.length; i++) {
      const columnName = columnsToBeUpdated[i] + " " + moment().year() % 100;
      await elementParseAndClick(locator, columnName);
      await browser.keys(hoursToBeAllocated);
      await hitEnter();
    }
  });

Then(/^ui: Update "([^"]*)" hours for resource to project in SPA in Project mode$/, async (hoursToBeAllocated: string) => {
  const resourceName = context().resourceSetup.name;
  await selectFromDropdown({
    dropdownOpener: Selectors.projectManagement.sPA.ddGroupByDropdown,
    dropdownSelection: locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"),
  });

  await SingleProjectAllocation.selectSpecificDateModeIfNotSelectedAlready("Project");

  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);
  await elementParseAndClick(Selectors.projectManagement.sPA.firstCellOfResourceOrTask, resourceName);
  await browser.keys(hoursToBeAllocated);
  await hitEnter();
});

Then(/^ui: Add recently created resource in SPA when dataset is "(Allocation|Demand)"$/, async (dataset: string) => {
  const resourceName = context().resourceSetup.name;
  await browser.pause(MEDIUM_PAUSE);
  await selectFromDropdown({
    dropdownOpener: Selectors.projectManagement.sPA.ddGroupByDropdown,
    dropdownSelection: locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"),
  });

  await SingleProjectAllocation.addNewResource(resourceName, dataset)
});

Then(/^ui: Allocate random hours for resource to project in SPA in Month mode for "([^"]*)" quarter when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (currentOrPreviousYear: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;
  const randomHour = faker.string.numeric(2);
  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  let startDate, endDate;
  if (currentOrPreviousYear.toLowerCase() == "current") {
    startDate = moment().startOf('quarter');
    endDate = moment().endOf('quarter');
  } else if (currentOrPreviousYear.toLowerCase() == "next") {
    const nextQuarterNo = moment().quarter() + 1;
    startDate = moment().startOf('quarter').quarter(nextQuarterNo);
    endDate = moment().endOf('quarter').quarter(nextQuarterNo);
  }

  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.pause(SHORT_PAUSE)
    await browser.keys(randomHour);
  }
});

Then(/^ui: I click on edit button of specific resource in "([^"]*)" Tab$/, async (planType: string) => {
  const resourceName = context().resourceSetup.name;
  await browser.pause(SHORT_PAUSE);
  let el;

  if (planType.toLowerCase() == 'allocation') {
    el = await elementParse({ locatorString: Selectors.projectManagement.sPA.editResourceInAllocationSection, parsing: resourceName });
  } else if (planType.toLowerCase() == 'demand') {
    el = await elementParse({ locatorString: Selectors.projectManagement.sPA.editResourceInDemandSection, parsing: resourceName });
  }
  // it's hard to eliminate element and perform click on it, so need help of native js things. 
  await browser.execute("arguments[0].click();", el);
});

Then('ui: Click on Options button in SPA', async () => {
  await clickToElement(Selectors.projectManagement.sPA.optionsButton);
});

Then('ui: Close Options section in SPA', async () => {
  await browser.keys(Key.Escape);
  await browser.pause(SHORT_PAUSE / 2);//Needed for modal to close
});

Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of SPA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await SingleProjectAllocation.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of SPA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await SingleProjectAllocation.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Verify end date is "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of SPA$/, async (dateToBeVerified: string, monthName: string) => {
  let expectedDate;
  switch (dateToBeVerified) {
    case "first":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeVerified:${dateToBeVerified} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  const actualEndDate = await (await element(Selectors.projectManagement.sPA.gridOptions.endDateInputbox)).getValue();
  await context().softAssert.equal(actualEndDate, expectedDate, "End date of 'Date Range Filter' in Grid options of SPA was incorrect");
});


Then('ui: Clear dates of Date Range Filter in Grid options of SPA', async () => {
  await SingleProjectAllocation.enterStartDateInOptionsSection('');
  await SingleProjectAllocation.enterEndDateInOptionsSection('');
});


Then('ui: Verify dates of Date Range Filter in Grid options of SPA are empty', async () => {
  const actualEndDate = await (await element(Selectors.projectManagement.sPA.gridOptions.endDateInputbox)).getValue();
  const actualStartDate = await (await element(Selectors.projectManagement.sPA.gridOptions.startDateInputbox)).getValue();

  await context().softAssert.equal(actualStartDate, '', "Start date of 'Date Range Filter' in Grid options of SPA was not empty");
  await context().softAssert.equal(actualEndDate, '', "End date of 'Date Range Filter' in Grid options of SPA was not empty");
});

Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of previous year in Grid options of SPA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await SingleProjectAllocation.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
});


Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of previous year in SPA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await SingleProjectAllocation.enterStartDateInSpaSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of next year in Grid options of SPA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().add(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().add(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await SingleProjectAllocation.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Verify start date is "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of SPA$/, async (dateToBeVerified: string, monthName: string) => {
  let expectedDate;
  switch (dateToBeVerified) {
    case "first":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeVerified:${dateToBeVerified} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  const actualEndDate = await (await element(Selectors.projectManagement.sPA.gridOptions.startDateInputbox)).getValue();

  await context().softAssert.equal(actualEndDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of SPA was incorrect");
});

Then('ui: I verify quick search option is displayed', async () => {
  await expect(await element(Selectors.projectManagement.sPA.txtSearch)).toBeDisplayed();
});

Then(/^ui: I expand "([^"]*)" and quick search two resources|task and verify search results in SPA$/, async (resourceOrTask: string) => {
  const resource1 = context().resource1;
  const resource2 = context().resource2;
  const task1 = context().taskName1;
  const task2 = context().taskName2;

  await formFill([
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: resource1, action: 'setValue' },
  ]);
  if (resourceOrTask.toLowerCase() == "resource") {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resource1);
  } else {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, task1);
  }

  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource1), SHORT_PAUSE), `Resource: {${resource1} is not displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource2), SHORT_PAUSE), `Resource: {${resource2} is displayed}`);
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task1), SHORT_PAUSE), `Task: {${task1} is not displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task2), SHORT_PAUSE), `Task: {${task2} is displayed}`);

  await formFill([
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: resource2, action: 'setValue' },
  ]);
  if (resourceOrTask.toLowerCase() == "resource") {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resource2);
  } else {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, task2);
  }

  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource2), SHORT_PAUSE), `Resource: {${resource2} is not displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource1), SHORT_PAUSE), `Resource: {${resource1} is displayed}`);
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task2), SHORT_PAUSE), `Task: {${task2} is not displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task1), SHORT_PAUSE), `Task: {${task1} is displayed}`);

  await clickToElementUsingJS(Selectors.projectManagement.sPA.closeIconInQuickSearchField);
  await browser.pause(SHORT_PAUSE);

  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource2), SHORT_PAUSE), `Resource: {${resource2} is displayed}`);
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource1), SHORT_PAUSE), `Resource: {${resource1} is displayed}`);
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task2), SHORT_PAUSE), `Task: {${task2} is displayed}`);
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task1), SHORT_PAUSE), `Task: {${task1} is displayed}`);

});


Then('ui: I click on expand all icon in SPA', async () => {
  await browser.pause(SHORT_PAUSE * 2);
  await clickToElementUsingJS(Selectors.projectManagement.sPA.expandAllIcon);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: Click on option: "([^"]*)" in Tasks to Show in Grid Options of SPA$/, async (taskToShow: string) => {
  await elementParseAndClick(Selectors.projectManagement.sPA.taskToShowFilter, taskToShow);
});

Then('ui: I click on options dropdown in SPA', async () => {
  await clickToElementUsingJS(Selectors.projectManagement.sPA.optionsDropdown);
});

Then('ui: I close options overlay in SPA', async () => {
  await clickToElementUsingJS(Selectors.projectManagement.sPA.optionsOverlay);
});

Then(/^ui: I quick search two non generic task and verify resource is not displayed in SPA$/, async () => {
  const resource1 = context().resource1;
  const resource2 = context().resource2;
  const task1 = context().taskName1;
  const task2 = context().taskName2;

  await formFill([
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: task1, action: 'setValue' },
  ]);

  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource1), SHORT_PAUSE), `Resource: {${resource1} is displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource2), SHORT_PAUSE), `Resource: ${resource2} is displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task1), SHORT_PAUSE), `Task: {${task1} is displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task2), SHORT_PAUSE), `Task: {${task2} is displayed}`);

  await formFill([
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: task2, action: 'setValue' },
  ]);

  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource1), SHORT_PAUSE), `Resource: {${resource1} is displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, resource2), SHORT_PAUSE), `Resource: {${resource2} is displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task1), SHORT_PAUSE), `Task: {${task1} is displayed}`);
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, task2), SHORT_PAUSE), `Task: {${task2} is displayed}`);

  await clickToElementUsingJS(Selectors.projectManagement.sPA.closeIconInQuickSearchField);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: I click on specific heatmap toggle "([^"]*)" in SPA grid options dialog$/, async (heatmapOption: string) => {
  await elementParseAndClick(Selectors.projectManagement.sPA.heatmapInGridOptionsDialog, heatmapOption);
});

Then('ui: I verify overlay heatmap for rows option is displayed in SPA grid options dialog', async () => {
  await context().softAssert.isTrue(await isElementDisplayed(Selectors.projectManagement.sPA.OverlayHeatmapForRowsLabelInGridOptionsDialog, SHORT_PAUSE), "overlay heatmap for rows option is not displayed");
});

Then('ui: I verify overlay heatmap for groups option is displayed in SPA grid options dialog', async () => {
  await context().softAssert.isTrue(await isElementDisplayed(Selectors.projectManagement.sPA.OverlayHeatmapForGroupsLabelInGridOptionsDialog, SHORT_PAUSE), "overlay heatmap for groups option is not displayed");
});

Then('ui: I verify overlay heatmap for rows option is not displayed in SPA grid options dialog', async () => {
  await context().softAssert.isFalse(await isElementDisplayed(Selectors.projectManagement.sPA.OverlayHeatmapForRowsLabelInGridOptionsDialog, SHORT_PAUSE), "overlay heatmap for rows option is displayed");
});

Then('ui: I verify overlay heatmap for groups option is not displayed in SPA grid options dialog', async () => {
  await context().softAssert.isFalse(await isElementDisplayed(Selectors.projectManagement.sPA.OverlayHeatmapForGroupsLabelInGridOptionsDialog, SHORT_PAUSE), "overlay heatmap for groups option is displayed");
});

Then(/^ui: Enter start date as "([^"]*)" in Grid options of SPA$/, async (dateToBeEntered: string) => {
  
  await SingleProjectAllocation.enterStartDateInOptionsSection(dateToBeEntered);
});

Then(/^ui: Enter end date as "([^"]*)" in Grid options of SPA$/, async (dateToBeEntered: string) => {
  context().projectEndDate = dateToBeEntered
  await SingleProjectAllocation.enterEndDateInOptionsSection(dateToBeEntered);
});

Then('ui: Unselect Columns if any in SPA', async () => {
  await SingleProjectAllocation.unselectColumnsIfAny();
});


Then(/^ui: Verify if column number "([^"]*)" has the title:"([^"]*)" in SPA$/, async (columnIndex: string, expectedColumnHeader: string) => {
  const actualColumnHeader = await (await element(locatorParse(Selectors.projectManagement.sPA.columnHeaderTitleByIndex, columnIndex))).getText();
  await context().softAssert.equal(actualColumnHeader, expectedColumnHeader, `Column number:${columnIndex}'s header title was incorrect`);
});

Then(/^ui: Verify if resource has "([^"]*)" hours in cell number:"([^"]*)" in SPA when dataset is "([^"]*)"$/, async (hoursToBeVerified: string, cellNumber: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;

  let locator = Selectors.projectManagement.sPA.resourceCellByIndex.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  const actualValueOfCell = await (await element(locatorParse(locator, cellNumber))).getText();
  context().softAssert.equal(actualValueOfCell, hoursToBeVerified, "Cell number:{" + cellNumber + "} of resource:{" + resourceName + "} had incorrect value");
});

Then(/^ui: Allocate "([^"]*)" hours for existing resource to project in SPA in Month mode for year:"([^"]*)" when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: string, year: number, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);
  await SingleProjectAllocation.selectSpecificDateModeIfNotSelectedAlready("Month");

  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  const startDate = moment().year(year).startOf('year');
  const endDate = moment().year(year).endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.keys(hoursToBeAllocated);
  }
});

Then(/^ui: I toggle overlay heatmap for rows option to "([^"]*)" in SPA grid options dialogs$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.projectManagement.sPA.tglOverlayHeatmapForRowsLabelInGridOptionsDialog)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.projectManagement.sPA.tglOverlayHeatmapForRowsLabelInGridOptionsDialog)).click();
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.projectManagement.sPA.tglOverlayHeatmapForRowsLabelInGridOptionsDialog)).click();
  }
});

Then(/^ui: I toggle overlay heatmap for groups option to "([^"]*)" in SPA grid options dialogs$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.projectManagement.sPA.tglOverlayHeatmapForGroupsLabelInGridOptionsDialog)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.projectManagement.sPA.tglOverlayHeatmapForGroupsLabelInGridOptionsDialog)).click();
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.projectManagement.sPA.tglOverlayHeatmapForGroupsLabelInGridOptionsDialog)).click();
  }
});

Then('ui: I verify overlay heatmap for groups option is toggled ON in SPA grid options dialog', async () => {
  const color = (await getElementBackgroundColor(Selectors.projectManagement.sPA.tglOverlayHeatmapForGroupsLabelInGridOptionsDialog)).toString();
  await context().softAssert.equal(color, GenericColorCodes.ToggleON, "overlay heatmap for groups option is toggled OFF");
});

Then('ui: I verify overlay heatmap for rows option is toggled ON in SPA grid options dialog', async () => {
  const color = (await getElementBackgroundColor(Selectors.projectManagement.sPA.tglOverlayHeatmapForRowsLabelInGridOptionsDialog)).toString();
  await context().softAssert.equal(color, GenericColorCodes.ToggleON, "overlay heatmap for rows option is toggled OFF");
});


Then(/^ui: I select specific unit "([^"]*)" and verify heatmap color "([^"]*)" in SPA for current year when dataset is "([^"]*)"$/, async (unitToBeVerified: string, heatmapColor: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  const startDate = moment(moment().startOf('year'));
  const endDate = moment(moment().endOf('year'));
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  const unit = unitToBeVerified.split(",");
  for (let i = 0; i < unit.length; i++) {
    switch (unit[i]) {
      case GeneralSettings.Units.Time:
      case GeneralSettings.Units.FTE:
      case GeneralSettings.Units.Cost:
      case GeneralSettings.Units.Gantt:
      case GeneralSettings.Units.Manday:
        await elementParseAndClick(Selectors.projectManagement.sPA.specificUnitTabLabel, unit[i]);
        break;
      case GeneralSettings.Units.FTEPercent:
        await clickToElement(Selectors.projectManagement.sPA.fTEPercentTabLabel);
        break;
      default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
    }

    let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }

    await browser.pause(SHORT_PAUSE); //Required to displaye values
    for (let i = 0; i < betweenMonths.length; i++) {
      const color = (await getElementBackgroundColor(locatorParse(locator, betweenMonths[i]))).toString();

      switch (heatmapColor) {
        case GeneralSettings.HeatmapColorCodes.red1:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.red1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.green1:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.green1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.yellow1:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.grey6:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.grey7:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey7.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.blue6:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.blue6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.green6:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.green6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.red6:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.red6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        case GeneralSettings.HeatmapColorCodes.yellow6:
          await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + betweenMonths[i]);
          break;
        default: throw new Error(`Invalid heatmap Color:${heatmapColor}\nSupported Values:\n1.Red1\n2.Green1\n3.Yellow1\n4.Grey6\n5.Grey7\n6.Blue6\n7.Green6\n8.Red6\n9.yellow6`);

      }
    }
  }
});

Then(/^ui: I select specific date mode "([^"]*)" and verify specific cell "([^"]*)" heatmap color "([^"]*)" in SPA for current year when dataset is "([^"]*)"$/, async (datemode: string, cellIndex: string, heatmapColor: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  const dtmode = datemode.split(",");
  for (let i = 0; i < dtmode.length; i++) {
    await clickToElement(Selectors.projectManagement.sPA.ddDateModeDropdown);
    await browser.pause(SHORT_PAUSE); //Required to displaye values
    const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: dtmode[i] });
    await ele.click();

    let locator = Selectors.projectManagement.sPA.specificCellInSPA.replace(/{{resourceName}}/ig, resourceName);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }


    await browser.pause(SHORT_PAUSE); //Required to displaye values
    const color = (await getElementBackgroundColor(locatorParse(locator, cellIndex))).toString();

    switch (heatmapColor) {
      case GeneralSettings.HeatmapColorCodes.red1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.red1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.green1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.green1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.yellow1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.grey6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.grey7:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey7.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.blue6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.blue6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.green6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.green6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.red6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.red6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.yellow6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.grey1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      default: throw new Error(`Invalid heatmap Color:${heatmapColor}\nSupported Values:\n1.Red1\n2.Green1\n3.Yellow1\n4.Grey6\n5.Grey7\n6.Blue6\n7.Green6\n8.Red6\n9.yellow6`);

    }
  }
});

Then('ui: Select attributes created earlier in SPA', async () => {
  const attributes = [];
  if (context().projectAttributes !== undefined) {
    attributes.push(context().projectAttributes);
  }
  if (context().resourceAttributes !== undefined) {
    attributes.push(context().resourceAttributes);
  }
  if (context().assignmentAttributes !== undefined) {
    attributes.push(context().assignmentAttributes);
  }
  if (context().attributes !== undefined) {
    attributes.push(context().attributes);
  }
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  for (let i = 0; i < attributes.length; i++) {
    for (let j = 0; j < attributes[i].length; j++) {
      await ProjectGrid.searchAndSelectColumns(attributes[i][j].name);
    }
  }
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then(/^ui: Verify Rich text in SPA for recently created Cfs when dataset is:"(Allocation|Demand)"$/, async (dataset: string) => {

  const resourceName = context().resourceSetup.name;
  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);

  if (context().projectAttributes !== undefined) {
    const attributes = context().projectAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      let cellLocator;
      switch (dataset) {
        case 'Allocation':
          cellLocator = (Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInAllocationSection)
            .replace('{{resourceOrTaskName}}', resourceName)
            .replace('{{columnName}}', attribute.name);
          break;
        case 'Demand':
          cellLocator = (Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInDemandSection)
            .replace('{{resourceOrTaskName}}', resourceName)
            .replace('{{columnName}}', attribute.name);
          break;
        default:
          throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
      }
      await element(cellLocator);
      const richtextElement = await mayBeElement(cellLocator + "//div[contains(@class,'rich-text-view')]", SHORT_PAUSE * 2);
      if (richtextElement === false) {
        await context().softAssert.isTrue(false, `SG-11590 Failed - Rich text formatting was not applied for Project CF:{${attribute.name}} of resource:{${resourceName}}, dataset:{${dataset}} in SPA Grid was not found`);
      } else {
        const elements = await richtextElement.$$('*');
        const actualHTMLElements = await (elements.map(element => element.getText()));
        await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Project CF:{${attribute.name}} for resource:{${resourceName}} dataset:{${dataset}} in SPA Grid was incorrect`, true);
      }

    }
  }
  if (context().resourceAttributes !== undefined) {
    const attributes = context().resourceAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      let cellLocator;
      switch (dataset) {
        case 'Allocation':
          cellLocator = (Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInAllocationSection)
            .replace('{{resourceOrTaskName}}', resourceName)
            .replace('{{columnName}}', attribute.name);
          break;
        case 'Demand':
          cellLocator = (Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInDemandSection)
            .replace('{{resourceOrTaskName}}', resourceName)
            .replace('{{columnName}}', attribute.name);
          break;
        default:
          throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
      }
      await element(cellLocator);
      const richtextElement = await mayBeElement(cellLocator + "//div[contains(@class,'rich-text-view')]", SHORT_PAUSE * 2);
      if (richtextElement === false) {
        await context().softAssert.isTrue(false, `SG-11590 Failed - Rich text formatting was not applied for Resource CF:{${attribute.name}} of resource:{${resourceName}}, dataset:{${dataset}} in SPA Grid was not found`);
      } else {
        const elements = await richtextElement.$$('*');
        const actualHTMLElements = await (elements.map(element => element.getText()));
        await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Resource CF:{${attribute.name}} for resource:{${resourceName}} dataset:{${dataset}} in SPA Grid was incorrect`, true);
      }
    }
  }
  if (context().assignmentAttributes !== undefined) {
    const attributes = context().assignmentAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      let cellLocator;
      switch (dataset) {
        case 'Allocation':
          cellLocator = (Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInAllocationSection)
            .replace('{{resourceOrTaskName}}', resourceName)
            .replace('{{columnName}}', attribute.name);
          break;
        case 'Demand':
          cellLocator = (Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInDemandSection)
            .replace('{{resourceOrTaskName}}', resourceName)
            .replace('{{columnName}}', attribute.name);
          break;
        default:
          throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
      }
      await element(cellLocator);
      const richtextElement = await mayBeElement(cellLocator + "//div[contains(@class,'rich-text-view')]", SHORT_PAUSE * 2);
      if (richtextElement === false) {
        await context().softAssert.isTrue(false, `Rich text formatting was not applied for Assignment CF:{${attribute.name}} of resource:{${resourceName}}, dataset:{${dataset}} in SPA Grid was not found`);
      } else {
        const elements = await richtextElement.$$('*');
        const actualHTMLElements = await (elements.map(element => element.getText()));
        await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Assignment CF:{${attribute.name}} for resource:{${resourceName}} dataset:{${dataset}} in SPA Grid was incorrect`, true);
      }
    }
  }

  const attributes = context().assignmentAttributes;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    let cellLocator;
    switch (dataset) {
      case 'Allocation':
        cellLocator = Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInAllocationSection
          .replace('{{resourceOrTaskName}}', resourceName)
          .replace('{{columnName}}', attribute.name);
        break;
      case 'Demand':
        cellLocator = Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInDemandSection
          .replace('{{resourceOrTaskName}}', resourceName)
          .replace('{{columnName}}', attribute.name);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }
    await clickToElement(cellLocator);
    await browser.pause(SHORT_PAUSE / 2);
    await hitEnter();
    await browser.pause(SHORT_PAUSE);

    const richtextElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Assignment CF:{${attribute.name}} when editing it for resource:{${resourceName}} in SPA was incorrect`, true);
    await elementParseAndClick(Selectors.projectManagement.sPA.specificButtonWhenEditingRichTextCF, "Cancel");
    await browser.pause(SHORT_PAUSE / 2);
  }
});

Then('ui: Click on resource expand icon', async () => {
  const resourceName = context().resourceSetup.name;
  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
});

Then('ui: Unselect any attributes selected in SPA and close the dropdown', async () => {
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then('ui: I open Bulk assignment popup', async () => {
  await clickToElement(Selectors.projectManagement.sPA.bulkAssurceignmentButton)
})

Then('ui: I validate that the added resource is in Bulk assignment', async () => {
  const {
    name,
  } = context().resourceSetup;
  const ele = locatorParse(Selectors.projectManagement.sPA.bulkAssignmentReso, name);
  await expect(await $(ele)).toBeDisplayed()
})

Then('ui: Enter current year as start date and next year start as end date for the project in SPA', async () => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
});

Then(/^ui: Verify if resource has "([^"]*)" hours for specific cell "([^"]*)" in SPA when dataset is "([^"]*)"$/, async (hoursToBeVerified: string, cellIndex: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  let locator = Selectors.projectManagement.sPA.specificCellInSPA.replace(/{{resourceName}}/ig, resourceName);
  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }
  await expect(await elementParse({ locatorString: locator, parsing: cellIndex })).toHaveText(hoursToBeVerified);
});

Then(/^ui: Verify if resource hours greater than zero in specific cell "([^"]*)" in SPA when dataset is "([^"]*)"$/, async (cellIndex: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  let locator = Selectors.projectManagement.sPA.specificCellInSPA.replace(/{{resourceName}}/ig, resourceName).replace(/{{cellIndex}}/, cellIndex);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }
  const val = await (await element(locator)).getText();
  await context().softAssert.isTrue(parseFloat(val) > 0, `Project hour: {${val} is not greater than zero}`);
});

Then(/^ui: Update "([^"]*)" hours for resource in specific cell "([^"]*)" in SPA when dataset is "([^"]*)"$/, async (hoursToBeAllocated: string, cellIndex: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  let locator = Selectors.projectManagement.sPA.specificCellInSPA.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }
  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);
  await elementParseAndClick(locator, cellIndex);
  await browser.keys(hoursToBeAllocated);
  await hitEnter();
});

Then(/^ui: I select specific unit "([^"]*)" and verify specific cell "([^"]*)" heatmap color "([^"]*)" in SPA for current year when dataset is "([^"]*)"$/, async (unitToBeVerified: string, cellIndex: string, heatmapColor: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  const unit = unitToBeVerified.split(",");
  for (let i = 0; i < unit.length; i++) {
    switch (unit[i]) {
      case GeneralSettings.Units.Time:
      case GeneralSettings.Units.FTE:
      case GeneralSettings.Units.Cost:
      case GeneralSettings.Units.Gantt:
      case GeneralSettings.Units.Manday:
        await elementParseAndClick(Selectors.projectManagement.sPA.specificUnitTabLabel, unit[i]);
        break;
      case GeneralSettings.Units.FTEPercent:
        await clickToElement(Selectors.projectManagement.sPA.fTEPercentTabLabel);
        break;
      default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
    }

    let locator = Selectors.projectManagement.sPA.specificCellInSPA.replace(/{{resourceName}}/ig, resourceName);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }

    await browser.pause(SHORT_PAUSE); //Required to displaye values
    const color = (await getElementBackgroundColor(locatorParse(locator, cellIndex))).toString();

    switch (heatmapColor) {
      case GeneralSettings.HeatmapColorCodes.red1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.red1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.green1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.green1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.yellow1:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow1.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.grey6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.grey7:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.grey7.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in cell - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.blue6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.blue6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.green6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.green6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.red6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.red6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.yellow6:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow6.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      case GeneralSettings.HeatmapColorCodes.yellow7:
        await context().softAssert.equal(color.toLowerCase(), GeneralSettings.HeatmapColorCodes.yellow7.toLowerCase(), "Incorrect heatmap color - " + color + " is displayed in column - " + cellIndex);
        break;
      default: throw new Error(`Invalid heatmap Color:${heatmapColor}\nSupported Values:\n1.Red1\n2.Green1\n3.Yellow1\n4.Grey6\n5.Grey7\n6.Blue6\n7.Green6\n8.Red6\n9.yellow6\n10.yellow7`);
        break;
    }
  }
});

Then('ui: Verify current year column headers are displayed in Gantt tab of SPA', async () => {
  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat1));
      date.add(1, 'month');
    }
  }
  for (let i = 0; i < betweenMonths.length; i++) {
    const locator = Selectors.projectManagement.sPA.specificColumnHeaderInGanttTab.replace(/{{columnHeader}}/ig, betweenMonths[i]);
    await context().softAssert.isTrue(await isElementDisplayed(locator), `Specific column header - ${betweenMonths[i]} is not displayed in Gantt tab`);
  }
});

Then(/^ui: Verify current year start "([^"]*)" and end "([^"]*)" date is displayed in Gantt bar tooltip in Gantt tab$/, async (startMonthIndex: string, endMonthIndex: string) => {
  const startDate = DateTime.getCurrentYearSpecificMonthStartDate(startMonthIndex, DateFormats.DayMonthYearFormat1);
  const endDate = DateTime.getCurrentYearSpecificMonthEndDate(endMonthIndex, DateFormats.DayMonthYearFormat1);
  const dates: string[] = [startDate, endDate];
  await (await element(Selectors.projectManagement.sPA.ganttBarInGanttTab)).moveTo();
  for (let i = 0; i < dates.length; i++) {
    const expectedDate = await (await element(locatorParse(Selectors.projectManagement.sPA.specificDateTooltipInGanttTab, dates[i]))).getText();
    await context().softAssert.equal(dates[i].toLowerCase(), expectedDate.toLowerCase(), `Specific date - ${dates[i]} is not displayed in Gantt bar tooltip`);
  }
});

Then('ui: Verify if International Number formatting is working in SPA', async () => {
  const dateModes = ["Day"]
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then(/^ui: I enter specific end date "(Current|Previous|Next|Today|Empty)" in SPA$/, async (endDate: string) => {
  let endDt;
  switch (endDate.toLowerCase()) {
    case "current":
      endDt = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "previous":
      endDt = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "next":
      endDt = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "today":
      endDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "empty":
      endDt = " ";
      break;
    default: throw new Error(`Invalid value:${endDate}\nSupported Values:\n1.Current\n2.Previous\n3.Next\n4.Today\n5.Empty`);
      break;
  }
  await formFill([
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: endDt, action: 'setValue' },
  ]);

  await hitEnter();

});

Then('ui: Click on Save and Check In button in SPA', async () => {
  await clickToElement(Selectors.projectManagement.sPA.saveAndCheckInButton);
});

Then(/^ui: Verify if column "([^"]*)" of recently added resource has heatmap color as:"([^"]*)" in SPA when dataset is:"(Allocation|Demand)"$/, async (columnNameToBeVerified: string, heatmapColor: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;

  let locator;

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInAllocationSection.replace(/{{resourceOrTaskName}}/ig, resourceName);
      break;
    case 'demand':
      locator = Selectors.projectManagement.sPA.specificCellByColumnNameOfResourceOrTaskInDemandSection.replace(/{{resourceOrTaskName}}/ig, resourceName);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await browser.pause(SHORT_PAUSE); //Required to displaye values
  const actualColor = (await getElementBackgroundColor(locatorParse(locator, columnNameToBeVerified))).toString().toLowerCase();
  let expectedColor;
  switch (heatmapColor.toLowerCase()) {
    case GeneralSettings.HeatmapColorCodes.red1.toLowerCase():
      expectedColor = GeneralSettings.HeatmapColorCodes.red1.toLowerCase();
      break;
    case GeneralSettings.HeatmapColorCodes.green1.toLowerCase():
      expectedColor = GeneralSettings.HeatmapColorCodes.green1.toLowerCase();
      break;
    case GeneralSettings.HeatmapColorCodes.yellow1.toLowerCase():
      expectedColor = GeneralSettings.HeatmapColorCodes.yellow1.toLowerCase();
      break;
    default: throw new Error(`Invalid heatmap Color:${heatmapColor}\nSupported Values:\n1.${GeneralSettings.HeatmapColorCodes.red1}\n2.${GeneralSettings.HeatmapColorCodes.yellow1}\n3.${GeneralSettings.HeatmapColorCodes.green1}`);
  }
  await context().softAssert.equal(actualColor, expectedColor, `Column:{${columnNameToBeVerified}} of SPA has incorrect heatmap color for resoruce:{${resourceName}}`);
});

Then(/^ui: Quick search "(Resource|GenericTask|Non-GenericTask)" and verify specific ResourceOrTask is displayed in SPA$/, async (searchEntity: string) => {
  let searchValue;
  switch (searchEntity) {
    case "Resource":
      searchValue = context().resourceSetup.name;
      break;
    case "GenericTask":
      searchValue = "Generic";
      break;
    case "Non-GenericTask":
      searchValue = context().projectSetup.taskName;
      break;
    default:
      throw new Error(`Invalid search entity:${searchValue}\nSupported Values:\n1.Resource\n2.GenericTask\n3.Non-GenericTask`);
  }
  await formFill([
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: searchValue, action: 'setValue' },
  ]);
  assert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, searchValue), SHORT_PAUSE), `Resource/Task: {${searchValue} is not displayed}`);

});

Then('ui: Click on Release button if displayed in SPA and wait for Checkout button', async () => {
  const releaseButtonElement = await mayBeElement(Selectors.projectManagement.sPA.releaseButton);
  if (releaseButtonElement) {
    await releaseButtonElement.click();
    await (await element(Selectors.projectManagement.sPA.checkoutButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
  }
});

Then(/^ui: I validate button for specific heatmap toggle "([^"]*)" in SPA is clickable$/, async (heatmapOption: string) => {
  const ele = await $(locatorParse(Selectors.projectManagement.sPA.heatmapInGridOptionsDialog, heatmapOption)).isClickable();
  await context().softAssert.isTrue(ele, `The button for specific heatmap toggle ${heatmapOption} in SPA is not clickable`);
});

Then(/^ui: I validate button for specific task to show "([^"]*)" in SPA is clickable$/, async (taskToShow: string) => {
  const ele = await $(locatorParse(Selectors.projectManagement.sPA.taskToShowFilter, taskToShow)).isClickable();
  await context().softAssert.isTrue(ele, `The button for specific task to show ${taskToShow} in SPA is not clickable`);
});

Then('ui: Click on Insert columns dropdown in SPA', async () => {
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then(/^ui: Unselect all and Select specific attributes "([^"]*)" in SPA$/, async (attributes: string) => {
  const attribute: string[] = attributes.split(',');
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  for (const attr of attribute) {
    await ProjectGrid.searchAndSelectColumns(attr);
  }
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then('ui: Unselect all and Select specific assignment attributes in SPA',async() => {
  const {name} = context().attributeSetup
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  const txtSearchFieldInColumnsDropdown = await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown);
  await clearTextUsingBackspace(txtSearchFieldInColumnsDropdown);
  await txtSearchFieldInColumnsDropdown.setValue(name);
  await browser.pause(SHORT_PAUSE);
  const attributeNameInColumnsDropdownInProjectListPage = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInColumnsDropdownInProjectListPage, parsing: name });
  if (!await attributeNameInColumnsDropdownInProjectListPage.isSelected()) {
    await attributeNameInColumnsDropdownInProjectListPage.click();
  }
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then('ui: I update dominant unit value to non dominant unit value in assignment',async() => {
  await formFill([
    {locator:Selectors.projectManagement.sPA.ddAssignmentAttribute,value:null,action:'click'},
    {locator:Selectors.projectManagement.sPA.ddValueAssignment,value:null,action:'click'}
  ])
});

Then('ui: I rearrange resources by sorting them in ascending and descending order',async() => {

  await clickToElement(Selectors.projectManagement.sPA.sortName)
  await mayBeElement(Selectors.projectManagement.sPA.ascendingSortName)
  await clickToElement(Selectors.projectManagement.sPA.sortName)
  await mayBeElement(Selectors.projectManagement.sPA.descendingSortName)

});

Then('ui: I add all the selected resources to Project',async() => {
  await clickToElement(Selectors.projectManagement.sPA.btnAddBulkAssignment)
});

Then(/^ui: Switch Exceeded capacity toggle "([^"]*)"$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.projectManagement.sPA.exceededCapacityToggle)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.projectManagement.sPA.exceededCapacityToggle)).click();
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.projectManagement.sPA.exceededCapacityToggle)).click();
  }
});

Then(/^ui: I validate Exceeded capacity toggle is "([^"]*)"$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.projectManagement.sPA.exceededCapacityToggle)).toString();
  if (color == GenericColorCodes.ToggleON && toggleState == ToggleStates.On) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.exceededCapacityToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.exceededCapacityToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  }
});


Then(/^ui: I dragdrop from column header "([^"]*)" to column header "([^"]*)" in SPA$/, async (dragColumn: string, dropColumn: string) => {
  const ele1 = Selectors.projectManagement.sPA.specificColumnHeader.replace('{{columnHeader}}', dragColumn);
  const ele2 = Selectors.projectManagement.sPA.specificColumnHeader.replace('{{columnHeader}}', dropColumn);
  await clickToElement(ele1);
  await elementDragAndDrop(ele1, ele2);
  await browser.pause(SHORT_PAUSE);
  await elementDragAndDrop(ele1, ele2);
});

Then('ui: I validate Add Assignment button is not present when project is not Checked out', async () => {
  const ele = await isElementDisplayed(Selectors.projectManagement.sPA.btnAddAssignment);
  assert.isNotTrue(ele, `The Add Assignment button is still displayed although the Project is not checked out`);
});

Then('ui: I search for recently created resource in quick search and try to add it', async () => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: context().resourceSetup.name, action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.txtSearch, value: null, action: 'hitEnter' },
  ]);

  let ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, context().resourceSetup.name));
  assert.isNotTrue(ele, `Resource: ${context().resourceSetup.name} is displayed} and so the functionality is broken`);
});

Then('ui: I validate that the resource is not added in SPA', async () => {
  assert.isNotTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.sPA.specificResourceOrTask, context().resourceSetup.name), SHORT_PAUSE), `Resource: ${context().resourceSetup.name} is displayed}`);
});

Then('ui: Clear quick search in SPA', async () => {
  const txtSearchElement = await element(Selectors.projectManagement.sPA.txtSearch);
  await clearTextUsingBackspace(txtSearchElement);
});
Then('ui: Click on End date inputbox in SPA', async () => {
  await clickToElement(Selectors.projectManagement.sPA.endDateInSPA);
});

Then(/^ui: Enter resource name as:"([^"]*)" in SPA and press Enter key$/, async (resourceName: string) => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'hitEnter' },
  ]);
});

Then(/^ui: Select Dataset as:"(Allocation|Demand)" in SPA if not already selected$/, async (dataset: string) => {
  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
});

Then(/^ui: Select date mode as: "(Project|Month|Quarter|Week|Day)" in SPA if not already selected$/, async (dateMode: string) => {
  await SingleProjectAllocation.selectSpecificDateModeIfNotSelectedAlready(dateMode);
});

Then(/^ui: Add recently created resource using model: "([^"]*)" in SPA when dataset is "(Allocation|Demand)"$/, async (modelToBeUsedForCreation: string, dataset: string,) => {

  let resourceModel;
  switch (modelToBeUsedForCreation) {
    case 'Resource':
      resourceModel = context().resourceSetup;
      break;
    case 'Resource2':
      resourceModel = context().resourceSetup2;
      break;

    default: throw Error(`Model not yet supported :{${modelToBeUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Resource\n2.Resource2`);
  }

  await selectFromDropdown({
    dropdownOpener: Selectors.projectManagement.sPA.ddGroupByDropdown,
    dropdownSelection: locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"),
  });

  await SingleProjectAllocation.addNewResource(resourceModel.name, dataset)
});

Then(/^ui: Update "([^"]*)" hours for recently added resource using model: "([^"]*)" in SPA for months:"([^"]*)" of current year when dataset is "(Allocation|Demand)"$/,
  async (hoursToBeAllocated: string, modelToBeUsedForCreation: string, monthsToBeUpdated: string, dataset: string) => {
    const columnsToBeUpdated = monthsToBeUpdated.split(",");

    let resourceName;
    switch (modelToBeUsedForCreation) {
      case 'Resource':
        resourceName = context().resourceSetup.name;
        break;
      case 'Resource2':
        resourceName = context().resourceSetup2.name;
        break;

      default: throw Error(`Model not yet supported :{${modelToBeUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Resource\n2.Resource2`);
    }

    let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }

    await SingleProjectAllocation.selectSpecificDateModeIfNotSelectedAlready("Month");
    await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);

    for (let i = 0; i < columnsToBeUpdated.length; i++) {
      const columnName = columnsToBeUpdated[i] + " " + moment().year() % 100;
      await elementParseAndClick(locator, columnName);
      await browser.keys(hoursToBeAllocated);
      await hitEnter();
    }
  });

Then('ui: I click on assignment attribute', async () => {
  await clickToElement(Selectors.projectManagement.sPA.lnkAssignmentAttribute);
});

Then('ui: I click on delete button', async () => {
  await clickToElement(Selectors.projectManagement.sPA.btnDelete)
});

Then('ui: I select Administrator resource', async () => {
  await clickToElement(Selectors.projectManagement.sPA.adminCheckbox)
});

Then('ui: I click on Replace Resource and verify resource is replaced',async() => {
  await clickToElement(Selectors.projectManagement.sPA.resourceReplace.replaceAction)
  await clickToElement(Selectors.projectManagement.sPA.resourceReplace.btnReplace)
});

Then(/^ui: Allocate random hours for resource to project in SPA in Day mode for "([^"]*)" quarter when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (currentOrPreviousYear: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;
  const randomHour = faker.string.numeric(2);
  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await browser.pause(SHORT_PAUSE); // Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); // Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  let startDate, endDate;
  if (currentOrPreviousYear.toLowerCase() == "current") {
    startDate = moment().startOf('quarter');
    endDate = moment().endOf('quarter');
  } else if (currentOrPreviousYear.toLowerCase() == "next") {
    const nextQuarterNo = moment().quarter() + 1;
    startDate = moment().startOf('quarter').quarter(nextQuarterNo);
    endDate = moment().endOf('quarter').quarter(nextQuarterNo);
  }

  const betweenDays = [];
  if (startDate < endDate) {
    const date = startDate.clone().startOf('day');
    while (date < endDate.clone().endOf('day')) {
      betweenDays.push(date.format(DateFormats.DayMonthYearFormat));
      date.add(1, 'day');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < betweenDays.length; i++) {
    await elementParseAndClick(locator, betweenDays[i]);
    await browser.keys(randomHour);
  }
});

Then(/^ui: I click on specific unit as "(Cost|FTE|FTE %)", specific date mode as "(Day|Week|Month)" and verify correct value is displayed for allocation for weekend as "(On|Off)"$/, async (specificUnit: string, dateMode: string, weekendStatus: string) => {
  let columnValue, columnSelector, expectedValue;
  await browser.pause(MEDIUM_PAUSE)
  // Determine columnValue and columnSelector based on dateMode
  switch (dateMode) {
    case 'Day':
      columnValue = '120';  
      if(weekendStatus == "Off" ){
        columnSelector = '(//td[3])[1]';
      } else {
        columnSelector = '(//td[1])[1]';
      }
      break;
    case 'Week':
      if(weekendStatus == "Off" ){
        columnValue = '600';
      } else {
        columnValue = '840';
      }
      columnSelector = '(//td[2])[1]';
      break;
    case 'Month':
      if(weekendStatus == "Off" ){
        columnValue = '2520';
      } else {
      columnValue = '3000';
      }
      columnSelector = '(//td[1])[1]';
      break;
    default:
      break;
  }

  // Set expectedValue based on specificUnit
  switch (specificUnit) {
    case 'Cost':
      expectedValue = columnValue;
      break;
    case 'FTE':
    case 'FTE %':
      expectedValue = '75';
      break;
    default:
      break;
  }

  // Get the actual value from the UI and match it with the expected value
  const eleText = await $(columnSelector).getText();
  const eleValueMatch = eleText.match(/(?:\b|\$)(\d+(\.\d{2})?)\b/); // Match the number with optional decimal part
  let eleValue = eleValueMatch ? eleValueMatch[1] : null; // Extract the matched value

  // Convert decimal number to integer if applicable
  if (eleValue && eleValue.includes('.')) {
    eleValue = parseInt(eleValue.replace(/^0\.|0$/g, "")); // Remove leading zeros
  } else if (eleValue) {
    eleValue = parseInt(eleValue); // Parse integer directly
  }

  await context().softAssert.equal(eleValue, expectedValue, `The Allocation value for specific unit as "${specificUnit}", specific date mode as "${dateMode}" and weekend mode as "${weekendStatus}" is not as expected`);
});

Then(/^ui: Enter Start date as "([^"]*)" and End date as "([^"]*)" in SPA$/, async (startDate: any, endDate: any) => {
  context().projectStartDate = startDate;
  context().projectEndDate = endDate;
  await formFill([
    { locator: '//span[@class="startDate inputDates"]//input', value: null, action: 'clearValue' },
    { locator: '//span[@class="startDate inputDates"]//input', value: startDate, action: 'setValue' },
  ]);
  
  await hitEnter();

  await formFill([
    { locator: '//span[@class="endDate inputDates"]//input', value: null, action: 'clearValue' },
    { locator: '//span[@class="endDate inputDates"]//input', value: endDate, action: 'setValue' },
  ]);
  await hitEnter();
});

Then(/^ui: Allocate "([^"]*)" hour for resource to project in SPA in Month mode for the dates between "([^"]*)" and "([^"]*)" when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: string, start_Date: string, end_Date: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  // await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment(start_Date, 'DD.MM.YYYY');
  const endDate = moment(end_Date, 'DD.MM.YYYY');

  const numMonths = endDate.diff(startDate, 'months') + 1;

  const monthNames: string[] = [];

  for (let i = 0; i < numMonths; i++) {
    const monthDate = startDate.clone().add(i, 'months');
    const formattedMonth = monthDate.format('MMM YY');
    monthNames.push(formattedMonth);
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 0; i < numMonths; i++) {
    await elementParseAndClick(locator, monthNames[i]);
    await browser.keys(hoursToBeAllocated);
  }
});

Then(/^ui: I enter allocation value as "([^"]*)" for weekends between date range from "([^"]*)" to "([^"]*)" in SPA$/, async (resourceCapacityToBeEntered: string, start_Date: string, end_Date: string) => {
  const resourceName = context().resourceSetup.name;
  await browser.pause(MEDIUM_PAUSE/2);
  if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resourceName)))) {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  }
  const startDate = moment(start_Date, 'DD-MM-YYYY');
  const endDate = moment(end_Date, 'DD-MM-YYYY');

  // Calculate the difference in days
  const numberOfDays = endDate.diff(startDate, 'days') + 1; // Add 1 to include both start and end dates
  
  for (let i = 2; i <= numberOfDays; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityHeadOfCellByIndex, `${i + 1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""));
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(resourceCapacityToBeEntered);
    } else {
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys('\ue004');
    }
  }
})

Then(/^ui: I enter allocation value as "([^"]*)" for date "([^"]*)" in SPA if start date is "([^"]*)"$/, async (resourceCapacityToBeEntered: string, allocationUpdateDate: string, startDate: string) => {
  const resourceName = context().resourceSetup.name;
  await browser.pause(MEDIUM_PAUSE/2);
  if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resourceName)))) {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  }
  const allocationDate = moment(allocationUpdateDate, 'DD-MM-YYYY');
  const allocatedStartDate = moment(startDate, 'DD-MM-YYYY');

  const index = allocationDate.diff(allocatedStartDate, 'days') + 1; // Add 1 to include both start and end dates
  const cellLocator = await locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, index + "");

  await clickToElement(cellLocator);
  await browser.pause(SHORT_PAUSE / 2);
  
  const allocationValue = await $(cellLocator).getText();
  for (let i = 0; i < allocationValue.length; i++) {
    await browser.keys(['Backspace']);
  }
  await browser.pause(SHORT_PAUSE);
  await browser.keys(resourceCapacityToBeEntered);
})

Then(/^ui: Allocate "([^"]*)" hours for resource to project in SPA in Day mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: string, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;

  // await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);
  // await SingleProjectAllocation.selectSpecificAssignmentTypeIfNotSelectedAlready(assignmentType);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    if(!(await isElementDisplayed(Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection))) {
      await clickToElement(Selectors.projectManagement.sPA.saveAndCheckInButton);
      await (await element(Selectors.projectManagement.sPA.checkoutButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
      await reload();
      await clickToElement(Selectors.projectManagement.sPA.checkoutButton);
    }
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    if(!(await isElementDisplayed(Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection))) {
      await clickToElement(Selectors.projectManagement.sPA.saveAndCheckInButton);
      await (await element(Selectors.projectManagement.sPA.checkoutButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
      await reload();
      await clickToElement(Selectors.projectManagement.sPA.checkoutButton);
    }
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);

  for (let i = 1; i <= 14; i++) {
    await clickToElement(locatorParse(Selectors.projectManagement.sPA.gridInputField, `${i+1}` + ""));
    await browser.pause(SHORT_PAUSE / 2);
    await browser.keys(hoursToBeAllocated);
    await hitEnter();
  }

});

When('ui: I copy allocation to demand', async () => {
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.sPA.copyAllocationToDemand)
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.sPA.overwriteValidation)
})

When('ui: I copy demand to allocation', async () => {
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.sPA.copyDemandToAllocation)
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.sPA.overwriteValidation)
})

When(/^ui: Validate "([^"]*)" hours for resource to project in SPA in Day mode for seven days work week$/, async (allocatedHours: string) => {
  for (let i = 2; i <= 15; i++) {
    const cellValue = await (await element(locatorParse(Selectors.projectManagement.sPA.gridInputField, i + ""))).getText();
    await context().softAssert.equal(cellValue, allocatedHours, `Cell #${i} of Allocation has incorrect value`);``
  }
})

When(/^ui: I update allocation to "([^"]*)" hours for resoure to project in SPA in Day mode for seven days work week$/, async (hoursToBeAllocated: string) => {
  const resourceName = context().resourceSetup.name;
  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  for (let i = 2; i <= 15; i++) {
    await clickToElement(locatorParse(Selectors.projectManagement.sPA.resourceGridInput, i + ""));
    await browser.pause(SHORT_PAUSE / 2);
    await browser.keys(hoursToBeAllocated);
    await hitEnter();
  }
});

Then('ui: I select all allocation and delete them', async () => {
  const resourceName = context().resourceSetup.name;
  await clickToElementUsingJS(Selectors.projectManagement.sPA.expandAllIcon);
  await clickToElement(`(//tbody/tr[1]/td[2])[1]`)
  await browser.keys([Key.Control, 'a']);
  await browser.keys([Key.Delete]);
});

Then('ui: I verify Warning icon must be displayed beside the resource name',async () => {
await expect(await mayBeElement(Selectors.projectManagement.sPA.btnWarningCapacityAlert)).toBeTruthy()
});

Then('ui: I click on warning icon showing beside Resource',async() => {
  await clickToElement(Selectors.projectManagement.sPA.btnWarningCapacityAlert)
});

Then('ui: Verify that warning alert has the exceeded capacity Time and FTE Values',async() => {
  await expect(await mayBeElement(Selectors.projectManagement.sPA.warningCapacityMsg.alertTitle)).toBeTruthy()
  await expect(await mayBeElement(Selectors.projectManagement.sPA.warningCapacityMsg.alertText)).toBeTruthy()
});

Then('ui: Unselect all and Select recently created assignment attributes in SPA',async() => {
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  const txtSearchFieldInColumnsDropdown = await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown);
  await clearTextUsingBackspace(txtSearchFieldInColumnsDropdown);
  await txtSearchFieldInColumnsDropdown.setValue(context().attributes[0]);
  await browser.pause(SHORT_PAUSE);
  const attributeNameInColumnsDropdownInProjectListPage = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInColumnsDropdownInProjectListPage, parsing: context().attributes[0]});
  if (!await attributeNameInColumnsDropdownInProjectListPage.isSelected()) {
    await attributeNameInColumnsDropdownInProjectListPage.click();
  }
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

Then('ui: I click on specific Assignment Attribute in SPA',async() => {
  await clickToElement(Selectors.projectManagement.sPA.ddAssignmentAttribute)
})

Then('ui: I double click on specific Assignment Attribute in SPA',async() => {
  const el = await locatorParse(Selectors.projectManagement.sPA.ddMultiSelectionAttribute,  context().resourceSetup.name) 
  await doubleClickToElement(el)
})

Then(/^ui: Allocate "([^"]*)" hours for resource to project in SPA in Year mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)"$/, async (hoursToBeAllocated: number, dataset: string, assignmentType: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment(context().projectStartDate, 'DD.MM.YYYY');
  const endDate = moment(context().projectEndDate, 'DD.MM.YYYY');
  const numberOfColumns = [];
  let date = startDate.clone(); // Use clone() to avoid modifying startDate directly
  while (date.isSameOrBefore(endDate, 'year')) {
    numberOfColumns.push(date.year());
    date.add(1, 'year');
  }
  
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resourceName)))) {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  }
  for (let i = 0; i < numberOfColumns.length; i++) {
    await elementParseAndClick(locator, numberOfColumns[i]);
    await browser.pause(SHORT_PAUSE/2)
    await browser.keys(hoursToBeAllocated);
  }
  
});

Then(/^ui: Validate "([^"]*)" hours for resource to project in SPA in "([^"]*)" mode for current year$/, async (hoursToBeAllocated: string, modeOfEntry: string) => {
  const resourceName = context().resourceSetup.name;
  const dataArray = hoursToBeAllocated.split(',');
  const finalDataArray = dataArray.map(element => element.replace(/[.\s]+/g, ""));

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const numberOfColumns = [];
  if(modeOfEntry == 'Year') {
    let date = startDate.clone(); // Use clone() to avoid modifying startDate directly
    while (date.isSameOrBefore(endDate, 'year')) {
      numberOfColumns.push(date.year());
      date.add(1, 'year');
    }
  } else if(modeOfEntry == 'Month') {
    if (startDate < endDate) {
      const date = startDate.startOf('month');
      while (date < endDate.endOf('month')) {
        numberOfColumns.push(date.format(DateFormats.MonthYearFormat2));
        date.add(1, 'month');
      }
    }
  }
  
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, resourceName);
  locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);

  if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resourceName)))) {
    await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);
  }
  for (let i = 0; i < numberOfColumns.length; i++) {
    const ele = await $(await locatorParse(locator, numberOfColumns[i])).getText();
    const value = ele.replace(/[.,\s]+/g, "");
    await context().softAssert.equal(value, finalDataArray[i], `Column: ${numberOfColumns[i]} donot contain the updated value in SPA`);
  };
  
});

Then('ui: I click on export button in SPA', async () => {
  await clickToElement('//span[contains(@class,"export")]');
})

Then(/^ui: Softassert if SPA file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `SPA - ${moment().format('MMM_DD_YYYY')}.csv`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then(/^ui: I verify value on specific unit as Cost, specific date mode as "([^"]*)"$/, async (dateMode: string) => {
  let columnValue, columnSelector, eleValue;
  await browser.pause(MEDIUM_PAUSE)
  // Determine columnValue and columnSelector based on dateMode
  switch (dateMode) {
    case 'Day':
      columnValue = '160';  
      columnSelector = '(//td[3])[1]';
      break;
    case 'Week':
      columnValue = '800';
      columnSelector = '(//td[2])[1]';
      break;
    case 'Month':
      columnValue = '3360';
      columnSelector = '(//td[1])[1]';
      break;
    default:
      break;
  }

  // Get the actual value from the UI and match it with the expected value
  const eleText = await $(columnSelector).getText();
  eleValue = eleText.replace(/[^\d]/g, "");

  await context().softAssert.equal(eleValue, columnValue, `The Allocation value for specific unit as "Cost", specific date mode as "${dateMode}" is not as expected`);
});

Then(/^ui: Allocate "([^"]*)" hours for resource to project in SPA in Month mode for current year when dataset is "(Allocation|Demand)" and Multi Assignemnt toggle is "([^"]*)"$/, async (hoursToBeAllocated: string, dataset: string, multiAssignmentToggleStatus: string) => {
  const resourceName = context().resourceSetup.name;

  await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  if (dataset.toLowerCase() == "allocation") {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  } else {
    await formFill([
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'click' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, value: resourceName, action: 'setValue' },
    ]);
    await browser.pause(SHORT_PAUSE);
    await hitEnter();
  }

  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }

  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded(resourceName);
  await SingleProjectAllocation.expandResourceIfNotAlreadyExpanded('Generic');
  await browser.pause(SHORT_PAUSE);

  const rowName = await $('(//input[@placeholder="Type a new Task"]/ancestor::tr/preceding-sibling::tr//span)[last()]').getText();
  let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, rowName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  for (let i = 0; i < betweenMonths.length; i++) {
    await elementParseAndClick(locator, betweenMonths[i]);
    await browser.pause(SHORT_PAUSE)
    await browser.keys(hoursToBeAllocated);
  }
});

Then(/^ui: I validate that the user "(cannot|can)" add input on resoruce row when Multi Assignemnt toggle is "(On|Off)"$/, async (inputStatus: string, toggleStatus: string) => {
  const resourceName = context().resourceSetup.name;
  const locator= await locatorParse(`//div[contains(@class,"ht_master handsontable")]//tbody//tr//span[normalize-space(text())='{{rowname}}']/ancestor::tr/td[@aria-readonly="true"][1]`, resourceName);
  
  const ele = await isElementDisplayed(locator)
  if(toggleStatus== 'Off' && inputStatus == "can") {
    await context().softAssert.isFalse(ele, `Input for Resource {${resourceName}} row is not editable although multi assignment toggle is {${toggleStatus}}`);
  }
  else if (toggleStatus== 'On' && inputStatus == "cannot") {
    await context().softAssert.isTrue(ele, `Input for Resource {${resourceName}} row is still editable although multi assignment toggle is {${toggleStatus}}`);
  }
})

Then('ui: I save project Id from the attribute page', async () => {
  const ele = await $('//label[normalize-space(text())="ID"]/preceding-sibling::div/input').getValue();
  projectId.push(ele);
  context().projectId = projectId;
});

Then(/^ui: Verify if resource has "([^"]*)" allocation value in cell number:"([^"]*)" in SPA when dataset is "([^"]*)" and Multi Assignment is On$/, async (hoursToBeVerified: string, cellNumber: string, dataset: string) => {
  const resourceName = context().resourceSetup.name;
  if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resourceName)))) {
      await browser.pause(SHORT_PAUSE * 2);
      await clickToElementUsingJS(Selectors.projectManagement.sPA.expandAllIcon);
  }
  await browser.pause(SHORT_PAUSE);

  const rowName = await $('(//input[@placeholder="Type a new Task"]/ancestor::tr/preceding-sibling::tr//span)[last()]').getText();
  let locator = Selectors.projectManagement.sPA.resourceCellByIndex.replace(/{{resourceName}}/ig, rowName);

  switch (dataset.toLocaleLowerCase()) {
    case 'allocation':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
      break;
    case 'demand':
      locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
      break;
    default:
      throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
  }

  const actualValueOfCell = await (await element(locatorParse(locator, cellNumber))).getText();
  await context().softAssert.equal(actualValueOfCell, hoursToBeVerified, `Cell number:{${cellNumber}} of assignment id:{${rowName}} for resource: {${resourceName}} had incorrect value`);
});

Then(/^ui: Allocate "([^"]*)" hours for two resource task in SPA in Month mode for current year when dataset is "([^"]*)" and assignment type "([^"]*)" when Multi assignment is On$/, async (hoursToBeAllocated: string, dataset: string, assignmentType: string) => {
  context().taskName1 = projectModel().taskName;
  context().taskName2 = projectModel().taskName;
  const resources: string[] = [context().resource1, context().resource2];

  for (let i = 0; i < resources.length; i++) {
    await SingleProjectAllocation.selectSpecificDatasetIfNotSelectedAlready(dataset);

    await browser.pause(SHORT_PAUSE);//Required to open dropdown
    await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
    await browser.pause(SHORT_PAUSE); //Required to open dropdown
    await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

    if (dataset.toLowerCase() == "allocation") {
      const el1 = await element(Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection)
      await el1.click()
      await slowInputFilling(Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, resources[i]);
      await browser.pause(SHORT_PAUSE);
      await hitEnter();
    } else {
      const el2 = await element(Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection)
      await el2.click()
      await slowInputFilling(Selectors.projectManagement.sPA.typeANewResourceInputBoxInDemandSection, resources[i]);
      await browser.pause(SHORT_PAUSE);
      await hitEnter();
    }

    await clickToElement(Selectors.common.loginName);
    await clickToElement(Selectors.common.loginName);
    if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resources[i])))) {
      await browser.pause(SHORT_PAUSE * 2);
      await clickToElementUsingJS(Selectors.projectManagement.sPA.expandAllIcon);
    }
    await browser.pause(SHORT_PAUSE);


    const startDate = moment().startOf('year');
    const endDate = moment().endOf('year');
    const betweenMonths = [];
    if (startDate < endDate) {
      const date = startDate.startOf('month');
      while (date < endDate.endOf('month')) {
        betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
        date.add(1, 'month');
      }
    }
    const ele = await $(await locatorParse(`((//div[contains(@class,"ht_clone_inline_start ht_clone_left handsontable")]//tbody//tr//span[normalize-space(text())="{{taskName}}"])[last()]/ancestor::tr/following-sibling::tr//span)[1]`, "Generic")).getText();
    let locator = Selectors.projectManagement.sPA.allocationCellOfResourceForSpecificColumn.replace(/{{resourceName}}/ig, ele);

    switch (dataset.toLocaleLowerCase()) {
      case 'allocation':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.allocationSectionGrid);
        break;
      case 'demand':
        locator = locator.replace(/{{sectionLocator}}/ig, Selectors.projectManagement.sPA.demandSectionGrid);
        break;
      default:
        throw new Error(`Invalid Dataset:${dataset}\nSupported Values:\n1.Allocation\n2.Demand`);
    }

    for (let i = 0; i < betweenMonths.length; i++) {
      await elementParseAndClick(locator, betweenMonths[i]);
      await browser.pause(SHORT_PAUSE)
      await browser.keys(hoursToBeAllocated);
    }
  }
}); 

Then(/^ui: I click on meat ball icon for "([^"]*)" on index "([^"]*)" and select "([^"]*)" option$/, async (entityType: string, indexNumber: string, optionName: string) => {
  const resourceName = context().resourceSetup.name;
  if(!(await isElementDisplayed(await locatorParse('(//span[text()="{{resourceName}} Total"])[2]',resourceName)))) {
      await browser.pause(SHORT_PAUSE * 2);
      await clickToElementUsingJS(Selectors.projectManagement.sPA.expandAllIcon);
  }
  const ele = '(//span[normalize-space(text())="{{entityType}}"]//ancestor::tr//div[contains(@class, "sg_lftedit bubble-button")])[{{index}}]'
              .replace("{{entityType}}", resourceName)
              .replace("{{index}}",  indexNumber);
  await clickToElement(ele);

  switch (optionName) {
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.CrossProjectAllocation:
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.CrossProjectAllocationShortHand:
      await elementParseAndClick(Selectors.common.dropdownSpecificValue, ProjectEdit.SPA.ResourceOrTaskEditOptions.CrossProjectAllocation);
      break;
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.ResourceReplace:
      await elementParseAndClick(Selectors.common.dropdownSpecificValue, ProjectEdit.SPA.ResourceOrTaskEditOptions.ResourceReplace);
      break;
    case ProjectEdit.SPA.ResourceOrTaskEditOptions.Delete:
      await elementParseAndClick(Selectors.common.dropdownSpecificValue, ProjectEdit.SPA.ResourceOrTaskEditOptions.Delete);
      break;
    default: throw Error("Incorrect option to be selected:{" + optionName + "} after click on meatballs icon of:{" + resourceName + "}\nSupported values (Case sensitive):${" + Object.values(ProjectEdit.SPA.ResourceOrTaskEditOptions + "}"));
  }

});

Then(/^ui: I select the newly created "([^"]*)" resource$/, async (resourceIndex: string) => {
  if(resourceIndex == '1') {
    await elementParseAndClick(Selectors.projectManagement.sPA.resourceCheckbox, context().resource1)
  } else if(resourceIndex == '2') {
    await elementParseAndClick(Selectors.projectManagement.sPA.resourceCheckbox, context().resource2)
  }
});

Then('ui: I save the assignment id value', async () => {
  const ele = await $(await locatorParse(`(//div[contains(@class,"ht_clone_inline_start ht_clone_left handsontable")]//tbody//tr//span[normalize-space(text())="{{taskName}}"]/ancestor::tr/following-sibling::tr//span)[1]`, 'Generic')).getText();
  context().assignmentId = ele;
})

Then('ui: I click on Replace Resource with redistribute and verify resource is replaced',async() => {
  await clickToElement(Selectors.projectManagement.sPA.resourceReplace.btnRedistribute);
  await clickToElement(Selectors.projectManagement.sPA.resourceReplace.btnReplace);
});