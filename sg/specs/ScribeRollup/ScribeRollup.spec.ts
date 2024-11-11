import { Then } from "@cucumber/cucumber";
import { clickToElement, clickToElementUsingJS, element, hitEnter, locatorParse, slowInputFilling } from "../../../../core/func";
import { elementParseAndClick, isElementDisplayed, selectFromDropdown } from "../../../../core/func";
import Selectors from "../../../../core";

Then('ui: I click on Filter button in scribe rollup', async () => {
    await clickToElement(Selectors.scribeRollup.filterButton);
});

Then(/^ui: I select "([^"]*)" in the filter$/, async (filterSection: string) => {
    await elementParseAndClick(Selectors.scribeRollup.selectSection, filterSection);
})
