import { Then } from '@cucumber/cucumber';
import { clickToElement, element, elementParse, mayBeElement, slowInputFilling, locatorParse, formFill, elementParseAndClick, isElementDisplayed, elementGetValue } from '../../../../../core/func';
import { GeneralSettings } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';
import DateTime from '../../../../../core/datetime';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { context } from '../../../../../utils/context';
const moment = require('moment')


Then(/^ui: Verify if "([^"]*)" unit is selected in CPA from SPA$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await elementParse({ locatorString: Selectors.projectManagement.cPA.specificUnitTabLabel, parsing: unitToBeVerified })
      await expect(await elementParse({ locatorString: Selectors.projectManagement.cPA.specificUnitTabInput, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await element(Selectors.projectManagement.cPA.fTEPercentTabLabel);
      await expect(await element(Selectors.projectManagement.cPA.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.FTE %\n4.Manday`);
  }
});

Then('ui: Click on Close button in CPA', async () => {
  await clickToElement(Selectors.projectManagement.cPA.closeButton);
});

Then('ui: I verify quick filter icon is displayed', async () => {
  context().softAssert.isTrue(await isElementDisplayed(Selectors.common.btnQuickFilter), "Quick filter icon was not displayed in CPA");
});

Then(/^ui: I click on individual quick filter options and validate "([^"]*)", "([^"]*)", start date and end date in PM CPA section$/, async (projectName1: string, projectName2: string) => {
  const cpaQuickFilters: string[] = ['Current Qtr', 'Next Qtr', 'Current Year', 'Next Year', 'YTD', '3 Years'];
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
    await clickToElement('//div[contains(@class,"quick-filter")]');
    const quickfilters = await elementParse({ locatorString: Selectors.common.btnCommonQuickFilterOptionsInCPA, parsing: cpaQuickFilters[i] });
    await quickfilters.click();

    /**
     * wait for UI update it's state, when you click on any perticular time line,
     * then 2nd project should be disappear, but at runtime it's taking a time.
     * 
     * automation is too fast to need to slow down by pausing a exection.
     */
    await browser.pause(500); // loops are to fast for automation, so slow down it

    const startDate = await element(Selectors.projectManagement.sPA.txtStartDateInCPASection);
    await expect(startDate).toHaveValue(cpaStartDate[i], { ignoreCase: true });

    const endDate = await element(Selectors.projectManagement.sPA.txtEndDateInCPASection);
    await expect(endDate).toHaveValue(cpaEndDate[i], { ignoreCase: true });

    await expect(await elementParse({ locatorString: Selectors.projectManagement.cPA.projectNameInCPA, parsing: projectName1 })).toBeDisplayed();
    await expect(await mayBeElement(locatorParse(Selectors.projectManagement.cPA.projectNameInCPA, projectName2), SHORT_PAUSE)).toBeFalsy()
  }
});

Then('ui: I click on quick filter icon in PM CPA section', async () => {
  await clickToElement(Selectors.common.btnQuickFilter);
});

Then(/^ui: I verify start date "([^"]*)" and end date "([^"]*)" in PM CPA section$/, async (startDate: string, endDate: string) => {
  const startDt = await (await element(Selectors.projectManagement.sPA.txtStartDateInCPASection));
  await expect(startDt).toHaveValue(startDate, { ignoreCase: true });

  const endDt = await (await element(Selectors.projectManagement.sPA.txtEndDateInCPASection));
  await expect(endDt).toHaveValue(endDate, { ignoreCase: true });
});

Then(/^ui: I enter start date "([^"]*)" and end date "([^"]*)" in PM CPA section$/, async (startDate: string, endDate: string) => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.txtStartDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtStartDateInCPASection, value: startDate, action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: endDate, action: 'setValue' },
  ]);
});

Then(/^ui: enter end date "([^"]*)" in PM CPA section$/, async (endDate: string) => {
  await slowInputFilling(Selectors.projectManagement.sPA.txtEndDateInCPASection, endDate);
  await clickToElement(Selectors.common.loginName); //Required to close date picker
  await clickToElement(Selectors.common.loginName);
});

Then('ui: Enter current year as date for the project in CPA', async () => {
  const starteDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);

  await formFill([
    { locator: Selectors.projectManagement.sPA.txtStartDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtStartDateInCPASection, value: starteDate, action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: endDate, action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
});

Then(/^ui: I verify current year start and end date in PM CPA section$/, async () => {
  const actualStartDateText = await elementGetValue(Selectors.projectManagement.sPA.txtStartDateInCPASection);
  const expectedStartDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  await context().softAssert.equal(actualStartDateText, expectedStartDate, "Start Date was incorrect in CPA");

  const actualEndDateText = await elementGetValue(Selectors.projectManagement.sPA.txtEndDateInCPASection);
  const expectedEndDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await context().softAssert.equal(actualEndDateText, expectedEndDate, "End Date was incorrect in CPA");
});

Then(/^ui: I click on individual quick filter options and validate projectName, start date and end date in PM CPA section$/, async () => {
  const cpaQuickFilters: string[] = ['Current Qtr', 'Next Qtr', 'Current Year', 'Next Year', 'YTD', '3 Years'];
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
    await browser.pause(SHORT_PAUSE*2);

    if(!(await isElementDisplayed(await locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, cpaQuickFilters[i])))) {
      await clickToElement(Selectors.common.btnQuickFilter);
      await browser.pause(SHORT_PAUSE);
    };

    const quickfilters = await elementParse({ locatorString: Selectors.common.btnCommonQuickFilterOptionsInCPA, parsing: cpaQuickFilters[i] });
    await quickfilters.click();
    await browser.pause(SHORT_PAUSE); // loops are to fast for automation, so slow down it

    const actualStartDateText = await elementGetValue(Selectors.projectManagement.sPA.txtStartDateInCPASection);
    await context().softAssert.equal(actualStartDateText, cpaStartDate[i], `Start date in CPA was incorrect after selecting date quick filter: {${cpaQuickFilters[i]}}`);

    const actualEndDateText = await elementGetValue(Selectors.projectManagement.sPA.txtEndDateInCPASection);
    await context().softAssert.equal(actualEndDateText, cpaEndDate[i], `End date in CPA was incorrect after selecting date quick filter: {${cpaQuickFilters[i]}}`);

    console.log(actualStartDateText)
    console.log(actualEndDateText)
    let elementIsVisible = false;

    switch (cpaQuickFilters[i]) {
      case 'Current Year':
      case 'YTD':
      case '3 Years':
      case 'Current Qtr':
        elementIsVisible = true;
        break;
      case 'Next Qtr':
        const currentMonthName = moment().format('MMM');
        if (currentMonthName === 'Oct' || currentMonthName === 'Nov' || currentMonthName === 'Dec') {
          elementIsVisible = false;
        } else {
          elementIsVisible = true;
        }
        break;
      case 'Next Year':
        elementIsVisible = false;
        break;
      default:
        throw new Error(`Unsupported quick filter: ${cpaQuickFilters[i]}`);
    }

    const elementIsDisplayed = await isElementDisplayed(locatorParse(Selectors.projectManagement.cPA.projectNameInCPA, context().projectSetup.name), MEDIUM_PAUSE);
    if (elementIsVisible) {
      await context().softAssert.isTrue(elementIsDisplayed,
        `Project was not displayed when quick filter starts from date: {${actualStartDateText}} where as project's start date was: {${context().projectSetup.startDate}}
          and end date was: {${context().projectSetup.endDate}} with quick filter: {${cpaQuickFilters[i]}}`);
    } else {
      await context().softAssert.isFalse(elementIsDisplayed,
        `Project was still displayed when quick filter starts from date: {${actualStartDateText}} where as project's start date was: {${context().projectSetup.startDate}}
          and end date was: {${context().projectSetup.endDate}} with quick filter: {${cpaQuickFilters[i]}}`);
    }


  }
});

Then(/^ui: I enter current quarter start and end date in PM CPA section$/, async () => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.txtStartDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtStartDateInCPASection, value: DateTime.getCurrentQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: DateTime.getCurrentQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
  ]);
});

Then(/^ui: I verify start date and end date in PM CPA section$/, async () => {
  const startDt = await (await element(Selectors.projectManagement.sPA.txtStartDateInCPASection));
  await expect(startDt).toHaveValue(DateTime.getCurrentQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat), { ignoreCase: true });

  const endDt = await (await element(Selectors.projectManagement.sPA.txtEndDateInCPASection));
  await expect(endDt).toHaveValue(DateTime.getCurrentQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat), { ignoreCase: true });
});

Then(/^ui: enter previous year end date in PM CPA section$/, async () => {
  await formFill([
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.txtEndDateInCPASection, value: DateTime.getPreviousYearEndDate((GeneralSettingsDefaultValues.global.dateFormat)), action: 'setValue' }
  ]);
  await clickToElement(Selectors.common.loginName); //Required to close date picker
  await clickToElement(Selectors.common.loginName);
});

Then(/^ui: Verify project hours greater than zero in specific cell "([^"]*)" in CPA$/, async (cellIndex: string) => {
  const projectName = context().projectSetup.name;
  const locator = Selectors.projectManagement.cPA.allocationCellOfProjectForSpecificColumn.replace(/{{ProjectName}}/ig, projectName).replace(/{{cellIndex}}/, cellIndex);
  const val = await (await element(locator)).getText();
  await context().softAssert.isTrue(parseFloat(val) > 0, `Project hour: {${val} is not greater than zero}`);
});

Then(/^ui: Verify project hours lesser than or equal to zero in specific cell "([^"]*)" in CPA$/, async (cellIndex: string) => {
  const projectName = context().projectSetup.name;
  const locator = Selectors.projectManagement.cPA.allocationCellOfProjectForSpecificColumn.replace(/{{ProjectName}}/ig, projectName).replace(/{{cellIndex}}/ig, cellIndex);
  const val = await (await element(locator)).getText();
  await context().softAssert.isTrue(parseFloat(val) <= 0, `Project hour: {${val} is not less than or equal to zero}`);
});

Then(/^ui: I select specific plan type "([^"]*)" in CPA$/, async (planType: string) => {
  await clickToElement(Selectors.projectManagement.cPA.ddPlanTypeDropdownInCPA);
  await elementParseAndClick(Selectors.projectManagement.cPA.ddPlanTypeDropdownValuesInCPA, planType);
});

Then(/^ui: I select specific date mode "([^"]*)" in CPA$/, async (dateMode: string) => {
  await clickToElement(Selectors.projectManagement.cPA.ddDateModeDropdownInCPA);
  await browser.pause(SHORT_PAUSE); //Required to displayed values
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, dateMode);
});

Then(/^ui: I select specific unit "([^"]*)" in CPA$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await elementParseAndClick(Selectors.projectManagement.cPA.specificUnitTabLabel, unitToBeVerified);
      break;
    case GeneralSettings.Units.FTEPercent:
      await elementParseAndClick(Selectors.projectManagement.cPA.fTEPercentTabLabel, unitToBeVerified);
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.FTE %\n4.Manday`);
  }
});

Then('ui: I verify all quick filter options are displayed in CPA section', async () => {
  const cpaQuickFilters: string[] = ["Current Qtr", "Next Qtr", "Current Year", "Next Year", "YTD", "3 Years"];
  await clickToElement(Selectors.common.btnQuickFilter);
  for (let i = 0; i < cpaQuickFilters.length; i++) {
    await browser.pause(SHORT_PAUSE);
    const element = await elementParse({ locatorString: Selectors.common.btnCommonQuickFilterOptionsInCPA, parsing: cpaQuickFilters[i] });
    await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, cpaQuickFilters[i])),
      `Quick filter icon: {${cpaQuickFilters[i]}} was not displayed in CPA`);
  }
  await clickToElement(Selectors.common.btnQuickFilter);
});