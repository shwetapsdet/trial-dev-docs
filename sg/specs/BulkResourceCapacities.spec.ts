import { Then } from "@cucumber/cucumber";
import DateTime from "../../../core/datetime";
import { GeneralSettingsDefaultValues } from "../../../data/generalSettings";
import { clickToElement, clickToElementUsingJS, element, elementParse, elementParseAndClick, getElementBackgroundColor, hitEnter, locatorParse, slowInputFilling } from "../../../core/func";
import Selectors from '../../../core/selectors';
import { context } from "../../../utils/context";
import { SHORT_PAUSE } from "../../../core/timeouts";
import moment = require("moment");
import { DateFormats, GenericColorCodes, ToggleStates, Units } from "../../../core/enums";

Then('ui: Enter current year in start and End date in Bulk Resource Capacities', async () => {
  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await slowInputFilling(Selectors.bulkProjectAllocation.startDateInputBox, startDate);
  await clickToElement(Selectors.bulkResourceCapacities.pageTitle);
  await slowInputFilling(Selectors.bulkProjectAllocation.endDateInputBox, endDate);
  await clickToElement(Selectors.bulkResourceCapacities.pageTitle);
});


Then('ui: Add resource in Bulk Resource Capacities', async () => {
  await clickToElementUsingJS(Selectors.bulkResourceCapacities.addResourceInput);
  await browser.pause(SHORT_PAUSE / 2);
  await slowInputFilling(Selectors.bulkResourceCapacities.addResourceInput, context().resourceSetup.name);
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, context().resourceSetup.name));
  await browser.pause(SHORT_PAUSE / 2);
});

Then(/^ui: Enter "([^"]*)" capacity for resource in Month mode for current year in Bulk Resource Capacities$/, async (hoursToBeAllocated: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().resourceSetup.name);
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
  for (let i = 0; i < betweenMonths.length; i++) {
    let specificProjectOrResourceOrTaskCellByIndex = locatorParse(locator, betweenMonths[i]);
    await clickToElement(specificProjectOrResourceOrTaskCellByIndex);
    await browser.pause(SHORT_PAUSE / 5);
    await browser.keys(hoursToBeAllocated);
    await browser.pause(SHORT_PAUSE / 5);
    await hitEnter();
  }
});

Then(/^ui: Verify if all cells for resource in Month mode for current year has value "([^"]*)" in Bulk Resource Capacities$/, async (expectedValue: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().resourceSetup.name);
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
  for (let i = 0; i < betweenMonths.length; i++) {
    let actualValue = await (await element(locatorParse(locator, betweenMonths[i]))).getText();
    context().softAssert.equal(actualValue, expectedValue, `Resource:{${context().resourceSetup.name}} has incorrect value for column #${betweenMonths[i]} in Bulk Resource Capacities`)
  }
});

Then(/^ui: Click on unit "(Time|FTE)" in Bulk Resource Capacities$/, async (unit: string) => {
  switch (unit) {
    case Units.Time:
    case Units.FTE:
      await clickToElement(locatorParse(Selectors.bulkResourceCapacities.specificUnitTab, unit));
      break;
    default:
      throw new Error(`Unit:${unit} is not supported in Bulk Resource Capacities.\nSupported Values:\n1.Time\n2.FTE`);
  }
});


Then('ui: Click on Clear button in Bulk Resource Capacities', async () => {
  await clickToElement(Selectors.bulkResourceCapacities.clearButton);
});

Then(/^ui: Enter "([^"]*)" capacity for resource for month or date as "([^"]*)" in Bulk Resource Capacities$/, async (hoursToBeAllocated: string, monthName: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().resourceSetup.name);

    let specificProjectOrResourceOrTaskCellByIndex = locatorParse(locator, monthName);
    await clickToElement(specificProjectOrResourceOrTaskCellByIndex);
    await browser.pause(SHORT_PAUSE / 5);
    await browser.keys(hoursToBeAllocated);
    await browser.pause(SHORT_PAUSE / 5);
    await hitEnter();
});

Then(/^ui: Verify if resource for month or date as "([^"]*)" has value "([^"]*)" in Bulk Resource Capacities$/, async (monthname: string, expectedValue: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().resourceSetup.name);

  let actualValue = await (await element(locatorParse(locator, monthname))).getText();
  await context().softAssert.equal(actualValue, expectedValue, `Resource:{${context().resourceSetup.name}} has incorrect value for column #${monthname} in Bulk Resource Capacities`)
});

Then(/^ui: I toggle Auto Calculate Capacity for "([^"]*)" as "([^"]*)" in Bulk Resource Capacities$/, async (toggleName: string, toggleState: string) => {
  const color = (await getElementBackgroundColor(await locatorParse(Selectors.bulkResourceCapacities.autoCalculateCapacityToggleInput, toggleName))).toString();
  if (color != GenericColorCodes.ToggleON && toggleState == ToggleStates.On) {
    await elementParseAndClick(Selectors.bulkResourceCapacities.autoCalculateCapacityToggleButton, toggleName);
  } else if (color == GenericColorCodes.ToggleON && toggleState == ToggleStates.Off) {
    await elementParseAndClick(Selectors.bulkResourceCapacities.autoCalculateCapacityToggleButton, toggleName);
  }
});