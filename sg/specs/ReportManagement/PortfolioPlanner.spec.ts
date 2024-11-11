import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import { clickToElement, element, elementParse, elementParseAndClick, formFill, locatorParse, mayBeElement, slowInputFilling,
} from '../../../../core/func';
import { SHORT_PAUSE } from '../../../../core/timeouts';
import { context } from '../../../../utils/context';
import { reportModel } from '../../../../models/ReportManagement.model';
import DateTime from '../../../../core/datetime';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';

Then(/^ui: I verify specific time unit "([^"]*)" is displayed in portfolio planner$/, async (timeunits: string) => {
  const unit: string[] = timeunits.split(",");
  for (let i = 0; i < unit.length; i++) {
    await expect(await elementParse({ locatorString: Selectors.reportManagement.portfolioPlanner.specificTimeUnit, parsing: unit[i] })).toBeDisplayed();
  }
});

Then(/^ui: I verify specific time unit "([^"]*)" is not displayed in portfolio planner$/, async (timeunits: string) => {
  const unit: string[] = timeunits.split(",");
  for (let i = 0; i < unit.length; i++) {
    await expect(await mayBeElement(locatorParse(Selectors.reportManagement.portfolioPlanner.specificTimeUnit, unit[i]), SHORT_PAUSE)).toBeFalsy();
  }
});

Then('ui: I enter report name in portfolio planner', async () => {
  context().reportName = reportModel().name;
  await slowInputFilling(Selectors.reportManagement.portfolioPlanner.txtPortfolioReportName, context().reportName);
});

Then(/^ui: I enter "([^"]*)" year start and end date in portfolio planner$/, async (Year: string) => {
  let startDate, endDate;
  switch (Year.toLowerCase()) {
    case 'current':
      startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'next':
      startDate = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'previous':
      startDate = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw Error(`Year :{${Year}} is not yet supported.\nSupported values :\n1.Current\n2.Next\n3.Previous`);
  }
  await formFill([
    { locator: Selectors.reportManagement.portfolioPlanner.txtStartName, value: null, action: 'clearValue' },
    { locator: Selectors.reportManagement.portfolioPlanner.txtStartName, value: startDate, action: 'setValue' },
    { locator: Selectors.reportManagement.portfolioPlanner.txtEndName, value: null, action: 'clearValue' },
    { locator: Selectors.reportManagement.portfolioPlanner.txtEndName, value: endDate, action: 'setValue' },
  ]);
});

Then(/^ui: I click on specific tab "([^"]*)" in portfolio planner$/, async (tabName: string) => {
  await elementParseAndClick(Selectors.reportManagement.portfolioPlanner.specificTab, tabName);
});

Then('ui: I click on new series button in portfolio planner', async () => {
  await clickToElement(Selectors.reportManagement.portfolioPlanner.btnNewSeries);
});

Then('ui: I click on save button in portfolio planner', async () => {
  await clickToElement(Selectors.reportManagement.portfolioPlanner.btnSave);
});

Then('ui: I verify no data to show message is not displayed in portfolio planner', async () => {
  await expect(await mayBeElement(Selectors.reportManagement.portfolioPlanner.noDataToShowMessage, SHORT_PAUSE)).toBeFalsy();
});

Then(/^ui: I click on specific time unit "([^"]*)" in portfolio planner$/, async (timeunit: string) => {
  await elementParseAndClick(Selectors.reportManagement.portfolioPlanner.specificTimeUnit, timeunit);
});

Then('ui: I click on settings icon in portfolio planner', async () => {
  await clickToElement(Selectors.reportManagement.portfolioPlanner.settingsIcon);
});

Then('ui: I click on data series save button in portfolio planner', async () => {
  await clickToElement(Selectors.reportManagement.portfolioPlanner.saveButtonInDataSeries);
});

Then(/^ui: I verify "([^"]*)" year start and end date is displayed in portfolio planner$/, async (Year: string) => {
  let startDate, endDate;
  switch (Year.toLowerCase()) {
    case 'current':
      startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'next':
      startDate = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'previous':
      startDate = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw Error(`Year :{${Year}} is not yet supported.\nSupported values :\n1.Current\n2.Next\n3.Previous`);
  }
  await expect(await element(Selectors.reportManagement.portfolioPlanner.txtStartName)).toHaveValue(startDate, { ignoreCase: true });
  await expect(await element(Selectors.reportManagement.portfolioPlanner.txtEndName)).toHaveValue(endDate, { ignoreCase: true });
});

Then(/^ui: I verify "([^"]*)" year start and end date is not displayed in portfolio planner$/, async (Year: string) => {
  let startDate, endDate;
  switch (Year.toLowerCase()) {
    case 'current':
      startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'next':
      startDate = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'previous':
      startDate = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDate = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw Error(`Year :{${Year}} is not yet supported.\nSupported values :\n1.Current\n2.Next\n3.Previous`);
  }
  await expect(await element(Selectors.reportManagement.portfolioPlanner.txtStartName)).not.toHaveValue(startDate, { ignoreCase: true });
  await expect(await element(Selectors.reportManagement.portfolioPlanner.txtEndName)).not.toHaveValue(endDate, { ignoreCase: true });
});

Then(/^ui: I click on specific chart type "([^"]*)" in portfolio planner$/, async (chartType: string) => {
  await elementParseAndClick(Selectors.reportManagement.portfolioPlanner.specificChartType, chartType);
});

Then('ui: I verify export option is not displayed in portfolio planner', async () => {
  await expect(await mayBeElement(Selectors.reportManagement.portfolioPlanner.btnExport, SHORT_PAUSE)).toBeFalsy();
});

Then('ui: I verify export option is displayed in portfolio planner', async () => {
  await expect(await element(Selectors.reportManagement.portfolioPlanner.btnExport)).toBeDisplayed();
});

Then('ui: Wait for Config tab to be clickable in Portfolio Planner section', async () => {
  await element(locatorParse(Selectors.reportManagement.portfolioPlanner.specificTab, "Config"));
});