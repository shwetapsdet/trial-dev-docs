import { Given, Then, When } from '@cucumber/cucumber';
import { element, elementParse, slowInputFilling, clickToElement, mayBeElement, locatorParse, formFill, isElementSelected, hitEnter, isElementDisplayed, elementParseAndClick } from '../../../../../core/func';
import { GeneralSettings } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';
import DateTime from '../../../../../core/datetime';
import { SHORT_PAUSE, SHORT_TIMEOUT } from '../../../../../core/timeouts';
import { context } from '../../../../../utils/context';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
const moment = require('moment')
import * as path from 'path';

Then(/^ui: Verify if "([^"]*)" unit is selected in CPA of Resource capacity$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.capacity.cPA.specificUnitTabLabel, parsing: unitToBeVerified });
      await expect(await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.capacity.cPA.specificUnitTabInput, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.fTEPercentTabLabel);
      await expect(await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.FTE %\n4.Manday`);
  }
});

Then('ui: I click on quick filter icon in CPA section', async () => {
  await clickToElement(Selectors.common.btnQuickFilter);
});

Then(/^ui: I click on individual quick filter options and validate "([^"]*)", "([^"]*)", start date and end date in CPA$/, async (projectName1: string, projectName2: string) => {
  const cpaQuickFilters: string[] = ["Current Qtr", "Next Qtr", "Current Year", "Next Year", "YTD", "3 Years"];
  const cpaStartDate: string[] = [
    DateTime.getCurrentQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat)
  ];

  const cpaEndDate: string[] = [
    DateTime.getCurrentQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNthYearStartDateFromCurrentYear(GeneralSettingsDefaultValues.global.dateFormat, 3)
  ];

  for (let i = 0; i < cpaQuickFilters.length; i++) {
    await browser.pause(SHORT_PAUSE);
    if(!(await isElementDisplayed(await locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, cpaQuickFilters[i])))) {
      await clickToElement(Selectors.common.btnQuickFilter);
      await browser.pause(SHORT_PAUSE);
    };
    const quickfilters = await elementParse({ locatorString: Selectors.common.btnCommonQuickFilterOptionsInCPA, parsing: cpaQuickFilters[i] });
    quickfilters.click();
    await browser.pause(SHORT_PAUSE); // Required to display the date in UI
    const startDate = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA));
    await expect(startDate).toHaveValue(cpaStartDate[i], { ignoreCase: true });

    const endDate = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA));
    await expect(endDate).toHaveValue(cpaEndDate[i], { ignoreCase: true });
    if (projectName1 !== '') {
      await expect(await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.capacity.cPA.lnkProjectNameInCPA, parsing: projectName1 })).toBeDisplayed();
      await expect(await mayBeElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.cPA.lnkProjectNameInCPA, projectName2), SHORT_PAUSE)).toBeFalsy();
    }
  }
});

Then(/^ui: I verify start date "([^"]*)" and end date "([^"]*)" in CPA$/, async (startDate: string, endDate: string) => {
  await browser.pause(SHORT_PAUSE); // Required to display the date in UI
  const startDt = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA));
  await expect(startDt).toHaveValue(startDate, { ignoreCase: true });
  const endDt = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA));
  await expect(endDt).toHaveValue(endDate, { ignoreCase: true });
});

Then(/^ui: Click on dataset dropdown and select "([^"]*)" in CPA$/, async (planType: string) => {
  await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.cPA.ddPlanTypeDropdownInCPA);
  if (planType.toLocaleLowerCase() == "allocation") {
    await clickToElement(Selectors.common.allocationPlanType);
  } else if (planType.toLocaleLowerCase() == "demand") {
    await clickToElement(Selectors.common.demandPlanType);
  }
});

Then(/^ui: I select specific assignment Type "([^"]*)" in CPA$/, async (assignmentType: string) => {
  await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.cPA.ddAssignmentTypeDropdownInCPA);
  if (assignmentType.toLowerCase() == "planned") {
    await clickToElement(Selectors.common.plannedAssignmentType);
  } else if (assignmentType.toLowerCase() == "actual") {
    await clickToElement(Selectors.common.actualAssignmentType);
  }
});

Then(/^ui: I enter start date "([^"]*)" and end date "([^"]*)" in CPA$/, async (startDate: string, endDate: string) => {
  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA, value: startDate, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA, value: endDate, action: 'setValue' },
  ]);
});

Then('ui: I click on save button', async () => {
  await clickToElement(Selectors.resourceManagement.btnSave);
});

Then(/^ui: enter end date "([^"]*)" in CPA$/, async (endDate: string) => {
  await slowInputFilling(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA, endDate);
  await clickToElement(Selectors.common.loginName); //Required to close date picker
  await clickToElement(Selectors.common.loginName);
});

Then(/^ui: I click on individual quick filter options and validate projectName, start date and end date in CPA$/, async () => {
  const cpaQuickFilters: string[] = ["Current Qtr", "Next Qtr", "Current Year", "Next Year", "YTD", "3 Years"];
  const cpaStartDate: string[] = [
    DateTime.getCurrentQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat)
  ];

  const cpaEndDate: string[] = [
    DateTime.getCurrentQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNthYearStartDateFromCurrentYear(GeneralSettingsDefaultValues.global.dateFormat, 3)
  ];

  for (let i = 0; i < cpaQuickFilters.length; i++) {
    await browser.pause(SHORT_PAUSE);
    if(!(await isElementDisplayed(await locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, cpaQuickFilters[i])))) {
      await clickToElement(Selectors.common.btnQuickFilter);
      await browser.pause(SHORT_PAUSE);
    };
    await elementParseAndClick( Selectors.common.btnCommonQuickFilterOptionsInCPA, cpaQuickFilters[i] );
 
    await browser.pause(SHORT_PAUSE); // Required to display the date in UI
    const startDate = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA));
    await expect(startDate).toHaveValue(cpaStartDate[i], { ignoreCase: true });

    const endDate = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA));
    await expect(endDate).toHaveValue(cpaEndDate[i], { ignoreCase: true });
    if (cpaQuickFilters[i] == "Next Year" || cpaQuickFilters[i] == "Next Qtr") {
      await expect(await mayBeElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.cPA.lnkProjectNameInCPA, context().projectSetup.name), SHORT_PAUSE));
    } else {
      await expect(await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.capacity.cPA.lnkProjectNameInCPA, parsing: context().projectSetup.name })).toBeDisplayed();
    }
  }
});


Then(/^ui: I enter and save resource current year start and end date in capacity tab$/, async () => {
  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.capacity.startDate, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.startDate, value: DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.endDate, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.endDate, value: DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);

  await clickToElement(Selectors.resourceManagement.btnSave);

});


Then(/^ui: Enter Base Capacity as:"([^"]*)" in "([^"]*)" number of cells in Resource Capacity$/, async (resourceCapacityToBeEntered: string, numberOfCellsToBeEntered: number) => {
  for (let i = 1; i <= numberOfCellsToBeEntered; i++) {
    await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""));
    await browser.pause(SHORT_PAUSE / 2);
    await browser.keys(resourceCapacityToBeEntered);
    await hitEnter();
  }
});

Then(/^ui: Enter Base Capacity "([^"]*)" in "([^"]*)" number of cells specifically for weekends in Resource Capacity$/, async (resourceCapacityToBeEntered: string, numberOfCellsToBeEntered: number) => {
  for (let i = 2; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityHeadOfCellByIndex, `${i + 1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""));
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(resourceCapacityToBeEntered);
      await hitEnter();
    }
  }
});

Then(/^ui: Verify Base Capacity "([^"]*)" for "([^"]*)" number of cells specifically for weekends in Resource Capacity$/, async (expectedResourceCapacity: string, numberOfCellsToBeEntered: number) => {
  for (let i = 1; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityHeadOfCellByIndex, `${i + 1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i+1 + ""))).getText();
      await context().softAssert.equal(cellValue, expectedResourceCapacity, `Cell #${i} of Resource Capacity has incorrect value`);
    }
  }
});

Then(/^ui: Verify Base Capacity is:"([^"]*)" for "([^"]*)" number of cells in Resource Capacity$/, async (expectedResourceCapacity: string, numberOfCellsToBeEntered: number) => {
  for (let i = 1; i <= numberOfCellsToBeEntered; i++) {
    const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""))).getText();
    await context().softAssert.equal(cellValue, expectedResourceCapacity, `Cell #${i} of Resource Capacity Base Capacity has incorrect value`);
  }
});

Then(/^ui: Click on unit "(Time|FTE)" in Resource capacity$/, async (unitToBeClicked: string) => {
  switch (unitToBeClicked) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.specificUnit, unitToBeClicked));
      break;
    default: throw Error(`Incorrect unit:{${unitToBeClicked}}\nSupported values (Case sensitive):\n1.Time\n2.FTE`);
  }
});

Then(/^ui: I select specific date mode "([^"]*)" in Resource capacity$/, async (dateMode: string) => {
  await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.cPA.ddModeofDate);
  await browser.pause(SHORT_PAUSE); //Required to displayed values
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, dateMode);
});

Then('ui: Enter current year as capacity date for the resource in resource capacity section', async () => {
  const starteDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);

  await slowInputFilling(Selectors.resourceManagement.resourceEdit.capacity.startDate, starteDate);
  await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.endDate);
  await slowInputFilling(Selectors.resourceManagement.resourceEdit.capacity.endDate, endDate);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
});

Given(/^ui: Turn "(On|Off)" Is demand planning resource toggle button in Resource Capacity tab$/, async (toggleState: string) => {
  const demandPlanningInput = await element(Selectors.resourceManagement.resourceEdit.capacity.demandPlanningInput);
  const demandPlanningInputState = await isElementSelected(demandPlanningInput);
  if (toggleState === "On" ? true : false) {
    if (!demandPlanningInputState) {
      await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.demandPlanningToggleButton);
    }
  } else {
    if (demandPlanningInputState) {
      await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.demandPlanningToggleButton);
    }
  }
});

Then(/^ui: I enter specific "(Current|Previous|Next|Today)" year start and end date in CPA$/, async (date: string) => {
  let startDt, endDt;
  switch (date.toLowerCase()) {
    case "current":
      endDt = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "previous":
      endDt = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "next":
      endDt = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "today":
      endDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw new Error(`Invalid value:${Date}\nSupported Values:\n1.Current\n2.Previous\n3.Next\n4.Today`);
      break;
  }

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA, value: startDt, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA, value: endDt, action: 'setValue' },
  ]);
});


Then(/^ui: I verify "(Current|Previous|Next|Today)" year start and end date in CPA$/, async (Date: string) => {
  let startDt, endDt;
  switch (Date.toLowerCase()) {
    case "current":
      endDt = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "previous":
      endDt = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "next":
      endDt = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "today":
      endDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      startDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw new Error(`Invalid value:${Date}\nSupported Values:\n1.Current\n2.Previous\n3.Next\n4.Today`);
      break;
  }
  await browser.pause(SHORT_PAUSE); // Required to display the date in UI
  const startDate = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtStartDateInCPA));
  await expect(startDate).toHaveValue(startDt, { ignoreCase: true });
  const endDate = await (await element(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA));
  await expect(endDate).toHaveValue(endDt, { ignoreCase: true });
});

Then(/^ui: Enter "(Current|Previous|Next|Today)" year end date in CPA$/, async (Date: string) => {
  let endDt;
  switch (Date.toLowerCase()) {
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
    default: throw new Error(`Invalid value:${Date}\nSupported Values:\n1.Current\n2.Previous\n3.Next\n4.Today`);
      break;
  }
  await slowInputFilling(Selectors.resourceManagement.resourceEdit.capacity.cPA.txtEndDateInCPA, endDt);
  await clickToElement(Selectors.common.loginName); //Required to close date picker
  await clickToElement(Selectors.common.loginName);
});

Then('ui: I select the View all Field option', async () => {
  if (!(await isElementDisplayed(Selectors.auditlog.viewFieldButton))) {
    await clickToElement(Selectors.auditlog.expandButton);
    await clickToElement(Selectors.auditlog.viewFieldButton);
  }
})

When('ui: I select Admin Time Type', async () => {
  await slowInputFilling('//div[contains(@class,"ht_clone_left handsontable")]//input[@placeholder="Add Admin Time Type"]', 'test')
  await hitEnter();
})

Then(/^ui: Enter Admin Time Type as: "([^"]*)" in "([^"]*)" number of cells specifically for weekends in Resource Capacity$/, async (resourceCapacityToBeEntered: string, numberOfCellsToBeEntered: number) => {
  for (let i = 2; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeOfCellByIndex, i + ""));
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(resourceCapacityToBeEntered);
      await hitEnter();
    }
  }
});

Then(/^ui: Verify Admin Time Type as: "([^"]*)" for "([^"]*)" number of cells specifically for weekends in Resource Capacity$/, async (expectedResourceCapacity: string, numberOfCellsToBeEntered: number) => {
  for (let i = 1; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeOfCellByIndex, i + ""))).getText();
      await context().softAssert.equal(cellValue, expectedResourceCapacity, `Cell #${i} of Resource Capacity Admin Time Type has incorrect value`);
    }
  }
});

Then(/^ui: Verify Net Capacity as: "([^"]*)" for "([^"]*)" number of cells specifically for weekends in Resource Capacity$/, async (expectedResourceCapacity: string, numberOfCellsToBeEntered: number) => {
  for (let i = 1; i <= numberOfCellsToBeEntered; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.netCapacityOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.netCapacityOfCellByIndex, i + ""))).getText();
      await context().softAssert.equal(cellValue, expectedResourceCapacity, `Cell #${i} of Resource Capacity Net Capacity has incorrect value`);
    }
  }
});

Then(/^ui: Enter Base Capacity as:"([^"]*)" in "([^"]*)" for month mode in Resource Capacity$/, async (resourceCapacityToBeEntered: string, headingOfCell: number) => {
  for (let i = 1; i <= 12; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (cellHead == headingOfCell) {
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.baseCapacityOfCellByIndex, i + ""));
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(resourceCapacityToBeEntered);
      await hitEnter();
    }
  }
});

Then(/^ui: Enter Admin Time Type as:"([^"]*)" in "([^"]*)" for month mode in Resource Capacity$/, async (resourceCapacityToBeEntered: string, headingOfCell: number) => {
  for (let i = 1; i <= 12; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (cellHead == headingOfCell) {
      await clickToElement(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeOfCellByIndex, i + ""));
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(resourceCapacityToBeEntered);
      await hitEnter();
    }
  }
});

Then(/^ui: Verify Admin Time Type "([^"]*)" number of cells specifically for weekends in Resource Capacity are disabled$/, async (numberOfCells: number) => {
  for (let i = 1; i <= numberOfCells; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (moment(cellHead, "DD MMM YY").format("dddd") == "Saturday" || moment(cellHead, "DD MMM YY").format("dddd") == "Sunday") {
      const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeOfCellByIndex, i + ""))).getAttribute('class');
      await context().softAssert.equal(cellValue, "htDimmed grayLight", `Cell #${i} of Resource Capacity Admin Time Type is not disabled`);
    }
  }
});

Then('ui: I verify that loading resource is not displayed', async () => {
  await expect(await mayBeElement(Selectors.resourceManagement.resourceEdit.capacity.validateLoadingResource, SHORT_TIMEOUT)).toBeFalsy();
})

Then(/^ui: Verify Admin Time Type "([^"]*)" number of cells specifically for weekends status OFF in Resource Capacity are disabled$/, async (numberOfCells: number) => {
  for (let i = 1; i <= numberOfCells; i++) {
    const cellHead = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeHeadOfCellByIndex, `${i+1}`))).getAttribute('title');
    if (!(moment(cellHead, "DD MMM YY").format("dddd") == "Saturday") || !(moment(cellHead, "DD MMM YY").format("dddd") == "Sunday")) {
      const cellValue = await (await element(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.AdminTimeTypeOfCellByIndex, i + ""))).getAttribute('class');
      await context().softAssert.equal(cellValue, "", `Cell #${i} of Resource Capacity Admin Time Type is not disabled`);
    }
  }
});