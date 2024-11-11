import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, element, elementParse, formFill, locatorParse, selectFromDropdown } from '../../../../../core/func';
import { GeneralSettings } from '../../../../../core/enums';
import { SHORT_PAUSE } from '../../../../../core/timeouts';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';

Then('ui: Click Default unit dropdown in General Settings', async () => {
  await clickToElement(Selectors.adminSettings.generalSettings.unitSettingsTab.defaultUnitDropdown);
  await browser.pause(SHORT_PAUSE);

});

Then(/^ui: Verify if "([^"]*)" is selected as default unit in Unit settings tab of General Settings$/, async (optionToBeVerified: string) => {
  await expect(await element(Selectors.adminSettings.generalSettings.unitSettingsTab.defaultUnitDropdown)).toHaveText(optionToBeVerified);
});

Then(/^ui: Unselect checkbox of "([^"]*)" from Active units in Unit settings tab of General Settings$/, async (unitToBeUnselected: string) => {
  switch (unitToBeUnselected) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.FTEPercent:
    case GeneralSettings.Units.Gantt:
    case GeneralSettings.Units.Manday:
      if (await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.unitSettingsTab.activeUnitCheckbox, parsing: unitToBeUnselected })).isSelected()) {
        await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.unitSettingsTab.activeUnitCheckbox, parsing: unitToBeUnselected })).click();
      }
      break;
    default: throw Error(`Incorrect unit:{${unitToBeUnselected}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

Then(/^ui: Click Default unit dropdown in General Settings and select "([^"]*)"$/, async (unitToBeUnselected: string) => {
  switch (unitToBeUnselected) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.FTEPercent:
    case GeneralSettings.Units.Gantt:
    case GeneralSettings.Units.Manday:
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultUnitDropdown,
        dropdownSelection: `${Selectors.common.dropdownValues}//*[normalize-space(text())='${unitToBeUnselected}']`,
      });
      break;
    default: throw Error(`Incorrect unit:{${unitToBeUnselected}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

Then(/^ui: Select checkbox of "([^"]*)" from Active units in Unit settings tab of General Settings$/, async (unitToBeUnselected: string) => {
  switch (unitToBeUnselected) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.FTEPercent:
    case GeneralSettings.Units.Gantt:
    case GeneralSettings.Units.Manday:
      if (!await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.unitSettingsTab.activeUnitCheckbox, parsing: unitToBeUnselected })).isSelected()) {
        await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.unitSettingsTab.activeUnitCheckbox, parsing: unitToBeUnselected })).click();
      }
      break;
    default: throw Error(`Incorrect unit:{${unitToBeUnselected}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

Then('ui: Set all to automation defaults in Unit Settings tab of GS', async () => {
  for (const unit of GeneralSettingsDefaultValues.unitSettings.activeUnits) {

    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.unitSettingsTab.activeUnitCheckbox, unit));
    const isSelected = await el.isSelected();

    if (!isSelected) {
      await el.click();
    }
  }

  const { dominantUnit } = GeneralSettingsDefaultValues.unitSettings;

  const el = await element(Selectors.adminSettings.generalSettings.unitSettingsTab.currentDominantUnit);
  const elText = await el.getText();
  if (elText.trim() != dominantUnit) {

    await clickToElement(Selectors.adminSettings.generalSettings.unitSettingsTab.changeDominantUnit);

    await formFill([
      { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.ratioTextbox, value: null, action: 'clearValue' },
      { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.ratioTextbox, value: GeneralSettingsDefaultValues.unitSettings.perDayPerFTEValue, action: 'setValue' },
      { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.setButton, value: null, action: 'click' },
    ]);
  }

  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultUnitDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.unitSettings.defaultUnit),
  });

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.hoursPerMandayInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.hoursPerMandayInputBox, value: GeneralSettingsDefaultValues.unitSettings.hoursPerManday, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultPerDayCapacityHoursInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultPerDayCapacityHoursInputBox, value: GeneralSettingsDefaultValues.unitSettings.defaultPerDayCapacityHours, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultPerDayCapacityFTEInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultPerDayCapacityFTEInputBox, value: GeneralSettingsDefaultValues.unitSettings.defaultPerDayCapacityFTE, action: 'setValue' },
  ]);

});

Then(/^ui: I change "([^"]*)" value as "([^"]*)"$/, async (dataType: string, values: string) => {

  switch (dataType) {
    case 'Hours_Per_Manday':
      await formFill([
        { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.hoursPerMandayInputBox, value: null, action: 'clearValue' },
        { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.hoursPerMandayInputBox, value: values, action: 'setValue' },
      ]);
      break;
    case 'Hours_Per_dayCapacity':
      await formFill([
        { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultPerDayCapacityHoursInputBox, value: null, action: 'clearValue' },
        { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.defaultPerDayCapacityHoursInputBox, value: values, action: 'setValue' },
      ]);
      break;
    default:
      await element[dataType](values);
      break;
  }
})

Then(/^ui: I select current dominant unit "([^"]*)" in general settings unit settings tab$/, async (dominantUnit: string) => {
  const el = await element(Selectors.adminSettings.generalSettings.unitSettingsTab.currentDominantUnit);
  const elText = await el.getText();
  if (elText.trim() != dominantUnit) {
    await clickToElement(Selectors.adminSettings.generalSettings.unitSettingsTab.changeDominantUnit);
    await formFill([
      { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.ratioTextbox, value: null, action: 'clearValue' },
      { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.ratioTextbox, value: GeneralSettingsDefaultValues.unitSettings.perDayPerFTEValue, action: 'setValue' },
      { locator: Selectors.adminSettings.generalSettings.unitSettingsTab.setButton, value: null, action: 'click' },
    ]);
  }
});
