import { When, Then } from "@wdio/cucumber-framework";
import DateTime from "../../../../../core/datetime";
import { GeneralSettingsDefaultValues } from "../../../../../data/generalSettings";
import { clickToElement, element, elementParseAndClick, hitEnter, locatorParse, mayBeElement, slowInputFilling, isElementDisplayed } from "../../../../../core/func";
import Selectors from '../../../../../core/selectors';
import { context } from "../../../../../utils/context";
import { SHORT_PAUSE } from "../../../../../core/timeouts";
const moment = require('moment')
import { DateFormats } from "../../../../../core/enums";
import { BuildTeam } from '../../../../../helpers/ProjectManagement/ProjectEdit/BuildTeam.helper';

Then('ui: Enter current year in start and End date in Calendar Management', async () => {
  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await slowInputFilling(Selectors.bulkProjectAllocation.startDateInputBox, startDate);
  await clickToElement(Selectors.bulkResourceCapacities.pageTitle);
  await slowInputFilling(Selectors.bulkProjectAllocation.endDateInputBox, endDate);
  await clickToElement(Selectors.bulkResourceCapacities.pageTitle);
});

Then('ui: Enter calendar name in Calendar Management', async () => {
  await clickToElement(Selectors.calendarManagement.calendarNameInpubox);
  await browser.pause(SHORT_PAUSE / 2);
  await slowInputFilling(Selectors.calendarManagement.calendarNameInpubox, context().calendarSetup.name);
  await clickToElement(Selectors.calendarManagement.tickMarkIconInCalendarNameInputbox);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: I delete any existing calendar',async() => {
  if (await isElementDisplayed(Selectors.calendarManagement.btnDelete, SHORT_PAUSE * 2)) {
    await clickToElement(Selectors.calendarManagement.btnDelete)
    await clickToElement(Selectors.calendarManagement.btnYes)
  }
})

Then('ui: I save the calendar',async() => {
  await clickToElement(Selectors.calendarManagement.btnSave)
})

Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of Calendar Management$/, async (dateToBeEntered: string, monthName: string) => {
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

  await BuildTeam.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
  if (await isElementDisplayed(Selectors.calendarManagement.btnApply, SHORT_PAUSE * 2)) {
    await clickToElement(Selectors.calendarManagement.btnApply)}
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of Calendar Management$/, async (dateToBeEntered: string, monthName: string) => {
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

  await BuildTeam.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
  if (await isElementDisplayed(Selectors.calendarManagement.btnApply, SHORT_PAUSE * 2)) {
  await clickToElement(Selectors.calendarManagement.btnApply)}
});

Then(/^ui: Enter "([^"]*)" value for calendar in Month mode for current year in Calendar Management$/, async (hoursToBeAllocated: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().calendarSetup.name);
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

Then(/^ui: Verify if all cells for calendar in Month mode for current year has value "([^"]*)" in Calendar Management$/, async (expectedValue: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().calendarSetup.name);
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
    context().softAssert.equal(actualValue, expectedValue, `Calendar:{${context().calendarSetup.name}} has incorrect value for column #${betweenMonths[i]} in  Calendar Management`)
  }
});

Then('ui: I verify weekends are grayed out',async() => {
  await expect(await mayBeElement(Selectors.calendarManagement.tdGrid)).toBeTruthy()
});

Then('ui: I verify weekends are not grayed out',async() => {
  await expect(await mayBeElement(Selectors.calendarManagement.tdGrid)).toBeFalsy()
});

Then('ui: I add recently created calendar to resource capacity',async() => {
  await clickToElement(Selectors.calendarManagement.resourceCalendarNameInput)
  await slowInputFilling(Selectors.calendarManagement.resourceCalendarNameInput, context().calendarSetup.name);
  await hitEnter()
});

Then(/^ui: I select specific date mode "([^"]*)" in Calendar$/, async (dateMode: string) => {

  await clickToElement('//div[@class="time-unit-options ml-auto"]//span[@class="k-widget k-dropdown"]')
  await elementParseAndClick('//div[text()="{{dateMode}}"]', dateMode);
});

Then(/^ui: Enter Hours "([^"]*)" in "([^"]*)" number of cells specifically for weekends in Calendar$/, async (resourceCapacityToBeEntered: string, numberOfCellsToBeEntered: number) => {
  for (let i = 2; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""));
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(resourceCapacityToBeEntered);
      await hitEnter();
    }
  }
});

Then(/^ui: Verify Hours "([^"]*)" for "([^"]*)" number of cells specifically for weekends in Calendar$/, async (expectedResourceCapacity: string, numberOfCellsToBeEntered: number) => {
  for (let i = 1; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""))).getText();
      await context().softAssert.equal(cellValue, expectedResourceCapacity, `Cell #${i} of Resource Capacity has incorrect value`);
    }
  }
});

Then('ui: I verify if the created calendar is deleted',async() => {
    await mayBeElement(Selectors.calendarManagement.resourceCalendarNameInput)
});

When('ui: Edit calendar name in Calendar Management', async () => {
  const ele = await locatorParse(Selectors.calendarManagement.selectCalenderNameInput, context().calendarSetup.name);
  const ele2 = await locatorParse(Selectors.calendarManagement.calenderNameInput, context().calendarSetup.name);
  await $(ele).moveTo();
  await clickToElement(ele)
  await slowInputFilling(ele2, `${context().calendarSetup.name2}`);
  await hitEnter()
});

Then('ui: Verify updated calendar name is displayed', async () => {
  await expect(await element(await locatorParse(Selectors.calendarManagement.validateCalenderName, context().calendarSetup.name2))).toBeDisplayed();
});
