import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { elementParse, element, formFill, getElementBackgroundColor } from '../../../../../core/func';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { GenericColorCodes, ToggleStates, languageValidation  } from '../../../../../core/enums';

Then('ui: Set all to automation defaults in Miscellaneous tab of GS', async () => {
  await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.miscellaneousTab.defaultTabs.defaultResourcePage, parsing: GeneralSettingsDefaultValues.miscellaneous.defaultTabs.defaultResourcePage })).click();

  await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.miscellaneousTab.defaultTabs.defaultProjectPage, parsing: GeneralSettingsDefaultValues.miscellaneous.defaultTabs.defaultProjectPage })).click();

  await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.miscellaneousTab.defaultTabs.defaultProjectManagementView, parsing: GeneralSettingsDefaultValues.miscellaneous.defaultTabs.defaultProjectManagementView })).click();

  await (await elementParse({ locatorString: Selectors.adminSettings.generalSettings.miscellaneousTab.defaultTabs.defaultReportView, parsing: GeneralSettingsDefaultValues.miscellaneous.defaultTabs.defaultReportView })).click();

});

Then('ui: Click on Font Color icon in Custom home page message textbox of Miscellaneous tab in General Settings', async () => {
  const fontColorDropdownInCustomHomepageMessageTextInputBox = await element(Selectors.adminSettings.generalSettings.miscellaneousTab.fontColorDropdownInCustomHomepageMessageTextInputBox);
  await fontColorDropdownInCustomHomepageMessageTextInputBox.waitForClickable({ timeout: MEDIUM_PAUSE });
  await fontColorDropdownInCustomHomepageMessageTextInputBox.scrollIntoView();
  await browser.pause(SHORT_PAUSE / 2);
  await fontColorDropdownInCustomHomepageMessageTextInputBox.click();
});

Then(/^ui: I toggle Advanced Tooltips to "([^"]*)" in General Settings in Miscellaneous Tab$/,async(toggleState) => {
  const color = (await getElementBackgroundColor(Selectors.adminSettings.generalSettings.miscellaneousTab.advancedTooltipToggle)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.adminSettings.generalSettings.miscellaneousTab.advancedTooltipToggle)).click();

  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.adminSettings.generalSettings.miscellaneousTab.advancedTooltipToggle)).click();
  }
})