/* eslint-disable max-len */
import { Then } from '@cucumber/cucumber';
const moment = require('moment')

import Selectors from '../../../../core/selectors';
import {
  clickToElement, elementParseAndClick, formFill, isElementDisplayed, locatorParse, mayBeElement,
} from '../../../../core/func';
import { context } from '../../../../utils/context';
import DateTime from '../../../../core/datetime';
import { fiscalModel } from '../../../../models/FiscalPeriodManagement.model';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../core/timeouts';
import { FiscalPeriod } from '../../../../helpers/FiscalPeriodManagement/FiscalPeriodManagement.helper';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';

Then('ui: I click on create fiscal period button in fiscal period management', async () => {
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.createFiscalPeriodButton);
});

Then(/^ui: I enter current year start and end date in fiscal period management$/, async () => {
  await formFill([
    { locator: Selectors.adminSettings.fiscalPeriodManagement.txtStartDate, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.fiscalPeriodManagement.txtStartDate, value: DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.adminSettings.fiscalPeriodManagement.txtEndDate, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.fiscalPeriodManagement.txtEndDate, value: DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
  ]);
});

Then('ui: I enter fiscal alias name in fiscal period management', async () => {
  context().fiscalName = fiscalModel().name;
  await formFill([
    { locator: Selectors.adminSettings.fiscalPeriodManagement.txtFiscalAlias, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.fiscalPeriodManagement.txtFiscalAlias, value: context().fiscalName, action: 'setValue' },
  ]);
});

Then('ui: I click on close button in fiscal period management', async () => {
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.closeButton);
});

Then('ui: I click on save button in fiscal period management', async () => {
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.saveButton);
});

Then('ui: I delete first fiscal calendar in fiscal period management', async () => {
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.deleteButtonOfFirstFiscalCalendar);
});

Then('ui: I delete last fiscal calendar in fiscal period management', async () => {
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.deleteButtonOfFirstFiscalCalendar);
});

Then(/^ui: I select "([^"]*)" year in fiscal period management$/, async (fiscalYear: string) => {
  let year;
  switch (fiscalYear.toLowerCase()) {
    case 'current':
      year = moment().year();
      break;
    case 'next':
      year = moment().year() + 1;
      break;
    case 'previous':
      year = moment().subtract(1, "year");
      break;
    default: throw Error(`Year :{${fiscalYear}} is not yet supported.\nSupported values :\n1.Current\n2.Next\n3.Previous`);
  }
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.fiscalYearDropdown);
  await browser.pause(SHORT_PAUSE);
  await elementParseAndClick(Selectors.adminSettings.fiscalPeriodManagement.yearDropdownValue, year);
});

Then(/^ui: I select "([^"]*)" month in fiscal period management$/, async (fiscalMonth: string) => {
  await clickToElement(Selectors.adminSettings.fiscalPeriodManagement.fiscalMonthDropdown);
  await browser.pause(SHORT_PAUSE);
  await elementParseAndClick(Selectors.adminSettings.fiscalPeriodManagement.yearDropdownValue, fiscalMonth);
});

Then(/^ui: I create fiscal period for "([^"]*)" year in fiscal period management$/, async (fiscalYear: string) => {
  await browser.pause(MEDIUM_PAUSE);
  if(await isElementDisplayed('//button[@class="bubble-button delete-io red"]')) {
    await clickToElement('//button[@class="bubble-button delete-io red"]');
    await clickToElement('//button[normalize-space(text())="Yes"]');
  };
  await FiscalPeriod.createFirstFiscalCalendar(fiscalYear);
});

Then('ui: I verify specific fiscal period is not displayed in fiscal period management', async () => {
  await browser.pause(SHORT_PAUSE); //Required for page to refresh
  await expect(await mayBeElement(Selectors.adminSettings.fiscalPeriodManagement.fiscalPeriodName, SHORT_PAUSE)).toBeFalsy();
});