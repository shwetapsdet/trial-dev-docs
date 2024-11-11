import { Then } from "@wdio/cucumber-framework";
import { clickToElement, element, elementParseAndClick, isElementDisplayed, locatorParse, slowInputFilling } from "../../../../../core/func";
import { MEDIUM_PAUSE } from "../../../../../core/timeouts";

Then(/^ui: I create Admin time type as "([^"]*)"$/, async (adminTypeName: string) => {
    if (!(await isElementDisplayed(await locatorParse('//span[text()="{{adminTypeTime}}"]', adminTypeName)))) {
        await slowInputFilling('(//label[text()="Admin Time Type"]/preceding-sibling::input)[1]', adminTypeName);
        await clickToElement('//span[text()="Create"]/parent::button');
        await browser.pause(MEDIUM_PAUSE/2);
    }
})