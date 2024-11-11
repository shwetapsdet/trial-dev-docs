import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import {
  clickToElement, element, elementParse, locatorParse
} from '../../../../core/func';

Then(/^ui: I click on specific tab "([^"]*)" in pivot chart$/, async (tabName: string) => {
  await (await elementParse({ locatorString: Selectors.reportManagement.pivotGrid.specificTab, parsing: tabName })).click();
});

Then('ui: I verify search icon is displayed in pivot chart dimensions tab', async () => {
  await expect(await element(Selectors.reportManagement.pivotGrid.btnSearchInDimesionsTab)).toBeDisplayed();
});

Then('ui: I click on search icon in pivot chart dimensions tab', async () => {
  await clickToElement(Selectors.reportManagement.pivotGrid.btnSearchInDimesionsTab);
});

Then('ui: I verify search field is displayed in pivot chart dimensions tab', async () => {
  await expect(await element(Selectors.reportManagement.pivotGrid.txtSearchInDimensionsTab)).toBeDisplayed();
});

Then('ui: Wait for dimensions tab to be clickable in Pivot Chart section', async () => {
  await element(locatorParse(Selectors.reportManagement.pivotGrid.specificTab, "Dimensions"));
});