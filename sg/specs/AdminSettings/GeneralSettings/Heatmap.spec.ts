import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, elementParse, elementArray, selectFromDropdown, locatorParse, clearTextUsingBackspace, isElementDisplayed, elementParseAndClick } from '../../../../../core/func';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { GeneralSettings } from '../../../../../core/enums';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

Then('ui: Delete all existing heatmaps in Heatmap tab of GS', async () => {
  const deleteButtonsCount = await (await elementArray(Selectors.adminSettings.generalSettings.heatmapTab.deleteButtons)).length;
  for (let i = 1; i < deleteButtonsCount; i++) {
    await clickToElement(`(${Selectors.adminSettings.generalSettings.heatmapTab.deleteButtons})[1]`);
  }
});

Then('ui: Add all automation default thrsholds in Heatmap tab of GS', async () => {
  const colorsCount = GeneralSettingsDefaultValues.heatmap.colors.length - 1;
  const lastColorCode = GeneralSettings.HeatmapColorCodes[GeneralSettingsDefaultValues.heatmap.colors[colorsCount]];
  for (let i = 0; i < colorsCount; i++) {
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.generalSettings.heatmapTab.addNewThresholdButton,
      dropdownSelection: `${locatorParse(Selectors.adminSettings.generalSettings.heatmapTab.thresholdColorInColorPicker, GeneralSettings.HeatmapColorCodes[GeneralSettingsDefaultValues.heatmap.colors[i]])}`,
    });
  }
  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.heatmapTab.choosenColorIconByIndex,
    parsing: GeneralSettingsDefaultValues.heatmap.colors.length
  })).click();
  await clickToElement(`${locatorParse(Selectors.adminSettings.generalSettings.heatmapTab.thresholdColorInColorPicker, lastColorCode)}`);

  for (let i = 0; i < colorsCount; i++) {
    const thresholdValueInputBoxOfSpecificColor = await elementParse({
      locatorString: Selectors.adminSettings.generalSettings.heatmapTab.thresholdValueInputBoxOfSpecificColor,
      parsing: GeneralSettings.HeatmapColorCodes[GeneralSettingsDefaultValues.heatmap.colors[i]]
    });
    await clearTextUsingBackspace(thresholdValueInputBoxOfSpecificColor);
    await browser.pause(SHORT_PAUSE / 2);
    await (thresholdValueInputBoxOfSpecificColor).setValue(GeneralSettingsDefaultValues.heatmap.values[i]);
    await browser.pause(SHORT_PAUSE / 2);
  }

});

Then(/^ui: Add specific thrsholds color "([^"]*)" and value "([^"]*)" in Heatmap tab of GS$/, async (colors: string, values: string) => {
  const hexColor: string[] = colors.split(',');
  const colorsCount = hexColor.length - 1;
  const value: string[] = values.split(',');
  const lastColorCode = GeneralSettings.HeatmapColorCodes[hexColor[colorsCount]];

  for (let i = 0; i < colorsCount; i++) {
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.generalSettings.heatmapTab.addNewThresholdButton,
      dropdownSelection: `${locatorParse(Selectors.adminSettings.generalSettings.heatmapTab.thresholdColorInColorPicker, GeneralSettings.HeatmapColorCodes[hexColor[i]])}`,
    });
  }
  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.heatmapTab.choosenColorIconByIndex,
    parsing: hexColor.length
  })).click();
  await clickToElement(`${locatorParse(Selectors.adminSettings.generalSettings.heatmapTab.thresholdColorInColorPicker, lastColorCode)}`);

  for (let i = 0; i < colorsCount; i++) {
    await (await elementParse({
      locatorString: Selectors.adminSettings.generalSettings.heatmapTab.thresholdValueInputBoxOfSpecificColor,
      parsing: GeneralSettings.HeatmapColorCodes[hexColor[i]]
    })).setValue(value[i]);
  }
});

Then(/^ui: I toggle "(On|Off)" the Net capacity button$/, async (toggleStatus: string) => {
  if (toggleStatus == 'On') {
    await clickToElement(Selectors.adminSettings.generalSettings.heatmapTab.netCapacity);
  } else if (toggleStatus == 'Off'){
    await clickToElement(Selectors.adminSettings.generalSettings.heatmapTab.baseCapacity);
  }
});


