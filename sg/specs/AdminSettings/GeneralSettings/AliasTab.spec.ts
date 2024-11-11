import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { formFill, selectFromDropdown, locatorParse, clickToElement, isElementDisplayed, slowInputFilling } from '../../../../../core/func';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { SHORT_PAUSE } from '../../../../../core/timeouts';
import { context } from '../../../../../utils/context';

Then('ui: Set all to automation defaults in Alias tab of GS', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.alisaTab.projectAliasDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.alias.projectAlias),
  });

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.alisaTab.timeAliasInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.timeAliasInputBox, value: GeneralSettingsDefaultValues.alias.timeAlias, action: 'setValue' },

    { locator: Selectors.adminSettings.generalSettings.alisaTab.bPADefaultModeAliasInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.bPADefaultModeAliasInputBox, value: GeneralSettingsDefaultValues.alias.bPADefaultModeAlias, action: 'setValue' },

    { locator: Selectors.adminSettings.generalSettings.alisaTab.singularAliasForMandayInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.singularAliasForMandayInputBox, value: GeneralSettingsDefaultValues.alias.mandaySingularAlias, action: 'setValue' },

    { locator: Selectors.adminSettings.generalSettings.alisaTab.pluralAliasForMandayInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.pluralAliasForMandayInputBox, value: GeneralSettingsDefaultValues.alias.mandayPluralAlias, action: 'setValue' },

    { locator: Selectors.adminSettings.generalSettings.alisaTab.allocationAliasInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.allocationAliasInputBox, value: GeneralSettingsDefaultValues.alias.allocationAlias, action: 'setValue' },

    { locator: Selectors.adminSettings.generalSettings.alisaTab.demandAliasInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.demandAliasInputBox, value: GeneralSettingsDefaultValues.alias.demandAlias, action: 'setValue' },

    { locator: Selectors.adminSettings.generalSettings.alisaTab.taskAliasInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.alisaTab.taskAliasInputBox, value: GeneralSettingsDefaultValues.alias.taskAlias, action: 'setValue' },

  ]);
});

Then('ui: Click on Font Color icon in Generic Error Text textbox of Alias tab in General Settings', async () => {
  await clickToElement(Selectors.adminSettings.generalSettings.alisaTab.fontColorDropdownInGenericErrorTextInputBox);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: I validate that File Management Alias tab is displayed', async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.generalSettings.alisaTab.fileManagementAlias);
  await context().softAssert.isTrue(ele, `Alias: {File Management} is still not displayed`)
});

Then(/^ui: I update the Alias of File Management to "([^"]*)"$/, async (updatedAliasName: string) => {
  await slowInputFilling(Selectors.adminSettings.generalSettings.alisaTab.fileManagementAlias, updatedAliasName);
});

Then('ui: I validate that the warning message is displayed', async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.generalSettings.alisaTab.fileManagementAliasWarning);
  await context().softAssert.isTrue(ele, `Warning Message for the File Management Alias is not displayed`)
});
