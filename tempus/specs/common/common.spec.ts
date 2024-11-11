import { Given, Then } from "@cucumber/cucumber";
import { clickToElement, isElementDisplayed, locatorParse, selectFromDropdown } from "../../../../core/func";
import Selectors from "../../../../core/selectors";
import { assert } from 'chai';
import { ELEMENT_TIMEOUT, SHORT_PAUSE } from "../../../../core/timeouts";
import { context } from "../../../../utils";


Given('ui: Logout from Tempus', async () => {
  await clickToElement(Selectors.tempus.siteHeader.siteLogo);
  await assert.isTrue(await isElementDisplayed(Selectors.tempus.modelList.searchInputbox, ELEMENT_TIMEOUT),
    `Search input box was not displayed even after waiting for ${ELEMENT_TIMEOUT}ms after clicking on Tempus logo in Tempus`);
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.siteHeader.ddProfile,
    dropdownSelection: Selectors.tempus.siteHeader.profile.options.logout,
  });
});

Then(/^ui: Click on "([^"]*)" button in confirmation modal in Tempus$/, async (buttonText: string) => {
  await clickToElement(locatorParse(Selectors.tempus.common.confirmationModalButton, buttonText));

});

Given('ui: Click on Tempus logo in Tempus', async () => {
  await clickToElement(Selectors.tempus.siteHeader.siteLogo);
});

Given('ui: Click on username and select Go to supergrid', async () => {
    await selectFromDropdown({
      dropdownOpener: Selectors.tempus.siteHeader.ddProfile,
      dropdownSelection: Selectors.tempus.siteHeader.profile.options.goToSupergrid,
    });
    await browser.pause(SHORT_PAUSE *2); // Needed for the new tab to load
    const handles = await browser.getWindowHandles();
    if (handles.length > 1) {
      await browser.switchToWindow(handles[0]);
      await browser.closeWindow();
      await browser.switchToWindow(handles[1]);
    }
  });

Then('ui: I validate user is on supergrid', async () => {
  const { name } = context().user;
  await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.homePage.lblUsername, name), ELEMENT_TIMEOUT),
    `Username is not displayed on supergrid`);
});

Then('ui: I navigate to previous page using back button in tempus',async () => {
  await clickToElement(Selectors.tempus.siteHeader.backButton);
  await browser.pause(SHORT_PAUSE * 2); //Needed for the page to be updated
});
