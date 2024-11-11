import { Then } from '@cucumber/cucumber';
import { clickToElement, element, elementParse, locatorParse, selectFromDropdown } from '../../../../../core/func';
import { GeneralSettings, GenericColorCodes } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE } from '../../../../../core/timeouts';

Then(/^ui: Click on "([^"]*)" tab in General Settings$/, async (tabToBeClicked: string) => {
  switch (tabToBeClicked) {
    case GeneralSettings.Tabs.Global:
    case GeneralSettings.Tabs.UnitSettings:
    case GeneralSettings.Tabs.ResourceRequest:
    case GeneralSettings.Tabs.DataSync:
    case GeneralSettings.Tabs.BPA:
    case GeneralSettings.Tabs.Alias:
    case GeneralSettings.Tabs.Miscellaneous:
    case GeneralSettings.Tabs.Heatmap:
    case GeneralSettings.Tabs.Recommendations:
      await clickToElement(`//span[normalize-space(text())='${tabToBeClicked}']`);
      break;
    default: throw Error(`Incorrect general settings tab:{${tabToBeClicked}}\nSupported values (CASE SENSITIVE):${Object.values(GeneralSettings.Tabs)}`);
  }
});

Then('ui: Click on Save button in General Settings and wait for Save button to be clickable again', async () => {
  await clickToElement(Selectors.adminSettings.generalSettings.saveButton);
  await (await element(Selectors.adminSettings.generalSettings.saveButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then('ui: Click on Save button in General Settings and click on Save Settings button if displayed', async () => {
  await clickToElement(Selectors.adminSettings.generalSettings.saveButton);
  try {
    const el = await $(locatorParse(Selectors.common.confirmationModalButton, "Save Settings"));
    await el.waitForDisplayed({ timeout: MEDIUM_PAUSE });
    await (await elementParse({ locatorString: Selectors.common.confirmationModalButton, parsing: "Save Settings" })).click();
  } catch (Error) { /* empty */ }
});

Then('ui: Wait for Save button in GS to be clickable again', async () => {
  await (await element(Selectors.adminSettings.generalSettings.saveButton)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

Then(
  /^ui: Select Font Color as:"([^"]*)" icon in Generic Error Text textbox of "([^"]*)" tab in General Settings$/,
  async (colorToBeSelected: string, selectedTab: string) => {
    if (selectedTab.trim().toLowerCase() == "alias") {
      switch (colorToBeSelected.trim().toLowerCase()) {
        case "green1":
          await clickToElement(locatorParse (Selectors.adminSettings.generalSettings.alisaTab.specificFontColorAlias , GenericColorCodes.green1));
          break;
        case "red4":
          await clickToElement(locatorParse (Selectors.adminSettings.generalSettings.alisaTab.specificFontColorAlias , GenericColorCodes.red4));
          break;
        default:
          throw Error(
            `Incorrect color code:{${colorToBeSelected}}\nSupported values: ${Object.keys(
              GenericColorCodes
            )}`
          );
      }
    } else if (selectedTab.trim().toLowerCase() == "miscellaneous") {
      switch (colorToBeSelected.trim().toLowerCase()) {
        case "green1":
          await clickToElement(locatorParse (Selectors.adminSettings.generalSettings.miscellaneousTab.defaultTabs.specificFontColorMis , GenericColorCodes.green1));
          break;
        case "red4":
          await clickToElement(locatorParse (Selectors.adminSettings.generalSettings.miscellaneousTab.defaultTabs.specificFontColorMis , GenericColorCodes.red4));
          break;
        default:
          throw Error(
            `Incorrect color code:{${colorToBeSelected}}\nSupported values: ${Object.keys(
              GenericColorCodes
            )}`
          );
      }
    }
  }
);

Then(/^ui: Click on Number format dropdown in Global tab of General Settings and select format as:"(International|USA and UK)"$/, async (formatToBeSelected: string) => {
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.numberFormat,
    dropdownSelection: Selectors.common.dropdownValues + `//*[contains(text(),'${formatToBeSelected}')]`,
  });
});
