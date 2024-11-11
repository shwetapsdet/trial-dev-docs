import { Then } from '@wdio/cucumber-framework';
import { clickToElement, elementParseAndClick, formFill, locatorParse, slowInputFilling } from '../../../../core/func';
import Selectors from '../../../../core/selectors';
import { context } from '../../../../utils/context';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';
import DateTime from '../../../../core/datetime';
import { SHORT_PAUSE } from '../../../../core/timeouts';

Then(/^ui: Enter "(Current|Previous|Next|Today)" year start and end date in Bulk Resource Capacities$/, async (dateOption: string) => {
  let startDt, endDt;
  switch (dateOption.toLowerCase()) {
    case "current":
      startDt = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDt = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "previous":
      startDt = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDt = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "next":
      startDt = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDt = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "today":
      startDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      endDt = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw new Error(`Incorrect value:${dateOption}\nSupported Values:\n1.Current\n2.Previous\n3.Next\n4.Today`);
      break;
  }
  await formFill([
    { locator: Selectors.bulkResourceCapacities.startDateTxt, value: null, action: 'click' },
    { locator: Selectors.bulkResourceCapacities.startDateTxt, value: null, action: 'clearValue' },
    { locator: Selectors.bulkResourceCapacities.startDateTxt, value: startDt, action: 'setValue' },
    { locator: Selectors.bulkResourceCapacities.endDateTxt, value: null, action: 'click' },
    { locator: Selectors.bulkResourceCapacities.endDateTxt, value: null, action: 'clearValue' },
    { locator: Selectors.bulkResourceCapacities.endDateTxt, value: endDt, action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);
});


Then('ui: Add newly created resource in Bulk Resource Capacities', async () => {
  const { name } = context().resourceSetup;
  await slowInputFilling(Selectors.bulkResourceCapacities.addResourceInput, name);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, name));
});

Then('ui: Click on Save button in Bulk Resource Capacities', async () => {
  await clickToElement(Selectors.common.btnSave);
})

Then('ui: Delete newly added resource in Bulk Resource Capacities', async () => {
  await elementParseAndClick(Selectors.bulkResourceCapacities.specificResourceDeleteIcon, context().resourceSetup.name);
})