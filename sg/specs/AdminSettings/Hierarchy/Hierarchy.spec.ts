import { Then } from "@wdio/cucumber-framework";
import { clickToElement, element, elementParse, elementParseAndClick, isElementDisplayed, isElementSelected, locatorParse, selectFromDropdown, slowInputFilling } from "../../../../../core/func";
import Selectors from '../../../../../core/selectors';
import { context } from "../../../../../utils/context";
import { faker } from "@faker-js/faker";
import { hitEnter } from "../../../../../core/func";
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE } from "../../../../../core/timeouts";
import { Key } from 'webdriverio';

Then('ui: I create new node with adding newly created project', async () => {
    while(await isElementDisplayed(Selectors.adminSettings.hierarchy.deleteNode)){
        await clickToElement(Selectors.adminSettings.hierarchy.deleteNode);
        await clickToElement(Selectors.adminSettings.hierarchy.yesOption);
    };
    await clickToElement(Selectors.adminSettings.hierarchy.saveHierarchy);
    await browser.refresh()
    await clickToElement(Selectors.adminSettings.hierarchy.newNodeButton);  
    await slowInputFilling(Selectors.adminSettings.hierarchy.addProjectInNode, context().projectSetup.name);
    await browser.keys(Key.ArrowDown)
    await hitEnter();
    await clickToElement(Selectors.adminSettings.hierarchy.saveHierarchy);
})

Then(/^ui: I navigate to "([^"]*)" tab$/, async (tabName: string) => {
    await elementParseAndClick(Selectors.adminSettings.hierarchy.selectTab, tabName);
    await browser.pause(MEDIUM_PAUSE / 2);
})

Then('ui: I click on choose column dropdown', async () => {
    await browser.pause(MEDIUM_PAUSE / 2);
    await clickToElement(Selectors.adminSettings.hierarchy.chooseColumnDD);
    await browser.pause(MEDIUM_PAUSE / 2);
})

Then(/^ui: I select "([^"]*)" if not already selected$/, async (attributeName: string) => {
    const eleSelectAllChk = await element('//input[@placeholder="Search"]/../preceding-sibling::label/input[@type="checkbox"]')
    await clickToElement(eleSelectAllChk)
    if (await eleSelectAllChk.isSelected()) {
      await eleSelectAllChk.click();
    }
    await browser.pause(MEDIUM_PAUSE);
    const ele = await isElementSelected(await elementParse({locatorString: Selectors.adminSettings.hierarchy.attributeCheckbox, parsing: attributeName}));
    if(!(ele)) {
        await elementParseAndClick(Selectors.adminSettings.hierarchy.attributeCheckbox, attributeName)
    } 
    await browser.pause(SHORT_PAUSE * 2);
    await clickToElement('//th[@data-title="Structure"]');
})

Then(/^ui: I update "([^"]*)" attribute as "([^"]*)"$/, async (attributeName: string, optionName: string) => {
    await browser.pause(MEDIUM_PAUSE);
    await clickToElement(Selectors.adminSettings.hierarchy.selectCellToEdit);
    await elementParseAndClick(Selectors.adminSettings.hierarchy.selectOptionEdit, optionName)
    await clickToElement(Selectors.adminSettings.hierarchy.saveOptionButton)
    await browser.pause(MEDIUM_PAUSE / 2);
})

Then('ui: I click on Save button in Project Hierarchy', async () => {
    await clickToElement(Selectors.adminSettings.hierarchy.saveHierarchy);
    await (await element(Selectors.adminSettings.hierarchy.saveHierarchy)).waitForClickable({ timeout: ELEMENT_TIMEOUT });
    await browser.pause(MEDIUM_PAUSE / 2);
})

Then('ui: I create new node with adding newly created resource', async () => {
    if(await isElementDisplayed(Selectors.adminSettings.hierarchy.deleteNode)) {
        await clickToElement(Selectors.adminSettings.hierarchy.deleteNode);
        await clickToElement(Selectors.adminSettings.hierarchy.yesOption);
    };
    await clickToElement(Selectors.adminSettings.hierarchy.newNodeButton);
    await slowInputFilling(Selectors.adminSettings.hierarchy.addResourceInNode, context().resourceSetup.name);
    await hitEnter();
    await browser.pause(MEDIUM_PAUSE / 2);
});

Then('ui: I validate it is read only and can not be edited',async() => {
    await expect(Selectors.adminSettings.attributeManagement.hierarchy.validate).toBeFalsy()
})