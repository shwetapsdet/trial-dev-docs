import { Given, Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import { clickToElement, navigationFromTile, element, elementParse, slowInputFilling, mayBeElement, elementParseAndClick, isElementDisplayed } from '../../../../core/func';
import { context } from '../../../../utils/context';
import { ELEMENT_TIMEOUT, SHORT_PAUSE } from '../../../../core/timeouts';
import { config } from '../../wdio.conf';


Given(/^ui: I navigate to "([^"]*)" "([^"]*)"$/, async (title1: string, title2: string) => {
  // navigate to perticular page from tile
  await navigationFromTile({ title1, title2 });
});

Given(/^ui: I navigate to "([^"]*)"$/, async (goal: string) => {
  // navigate to perticular page from tile
  switch (goal) {
    case 'Dashboard':
      await browser.url(context().user.baseUrl);
      // await expect(await browser.getTitle()).toEqual(config.tempusSiteTitle);
      break;
    case "Email Management":
      await browser.url(context().user.baseUrl + "/emails");
      break;
    default: throw console.error(`Invalid parameter:{${goal}} for goal variable\nSupported Values:Dashboard,Email Management`);
  }
});

Given(/^ui: I navigate to "([^"]*)" using "([^"]*)"$/, async (goal: string, helper: string) => {
  try {
    await clickToElement(Selectors.common.btnBackButton);
  } catch (e) {
    console.error(`Unable to navigate ${goal} by using ${helper}`);
  }
});

Given('ui: I navigate to previous window', async () => {
  await clickToElement(Selectors.common.btnBackButton);
});

Given('ui: I navigate to Project Access', async () => {
  await clickToElement('//span[@class="sg_navtitle"]/span[text()="project"]');
  await element(Selectors.adminSettings.projectAccess.projectAccessPage);
});

Then(/^ui: Search for "([^"]*)" in global search and click on it$/, async (entityName: string) => {
  await expect(await element(Selectors.common.btnGlobalSearchIcon)).toBeDisplayed();
  await clickToElement(Selectors.common.btnGlobalSearchIcon);
  await slowInputFilling(Selectors.common.txtGlobalSearchInputBox, entityName);
  await expect(await elementParse({ locatorString: Selectors.common.clickOnEntityInGlobalSearch, parsing: entityName })).toBeClickable();
  await (await elementParse({ locatorString: Selectors.common.clickOnEntityInGlobalSearch, parsing: entityName })).click();
});

Then('ui: Search for Project in global search and click on it', async () => {
  const { name } = context().projectSetup;
  await expect(await element(Selectors.common.btnGlobalSearchIcon)).toBeDisplayed();
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.common.btnGlobalSearchIcon);
  await slowInputFilling(Selectors.common.txtGlobalSearchInputBox, name);
  await browser.pause(SHORT_PAUSE / 2);
  await elementParseAndClick(Selectors.common.clickOnEntityInGlobalSearch, name);
});

Given('ui: I click on logo to navigate to homepage', async () => {
  await (await element(Selectors.siteHeader.siteLogo)).click();
});

Then(/^ui: Search for attribute created using model in global search and click on it$/, async () => {
  await clickToElement(Selectors.common.btnGlobalSearchIcon);
  await slowInputFilling(Selectors.common.txtGlobalSearchInputBox, context().attribute2);
  await browser.pause(SHORT_PAUSE / 2);
  await elementParseAndClick(Selectors.common.clickOnEntityInGlobalSearch, context().attribute2);
});

Then(/^ui: Search for attribute created using resource list model in global search and click on it$/, async () => {
  await clickToElement(Selectors.common.btnGlobalSearchIcon);
  await slowInputFilling(Selectors.common.txtGlobalSearchInputBox, context().attribute1);
  await browser.pause(SHORT_PAUSE);
  await elementParseAndClick(Selectors.common.clickOnEntityInGlobalSearch, context().attribute1);
});

Then('ui: I search for resource in global search and click on it', async () => {
  if(await isElementDisplayed('//div[contains(@class,"message-container")]')) {
    await clickToElement('//button[starts-with(text(),"Close")]');
  };
  const resourceName = context().resourceSetup.name;
  await clickToElement(Selectors.common.btnGlobalSearchIcon);
  await slowInputFilling(Selectors.common.txtGlobalSearchInputBox, resourceName);
  await browser.pause(SHORT_PAUSE / 2);
  await elementParseAndClick(Selectors.common.clickOnEntityInGlobalSearch, resourceName);
});

Given('ui: I navigate to previous window by clicking on browser back button', async () => {
  await browser.back();
});

Given(/^ui: I verify specific tile "([^"]*)" "([^"]*)" is displayed$/, async (title1: string, title2: string) => {
  const locationString = Selectors.common.navigationTile;
  const sanitizedLocator = locationString.replace('{{title1}}', title1).replace('{{title2}}', title2);
  await expect(await element(sanitizedLocator)).toBeDisplayed();
});

Given(/^ui: I verify specific tile "([^"]*)" "([^"]*)" is not displayed$/, async (title1: string, title2: string) => {
  const locationString = Selectors.common.navigationTile;
  const sanitizedLocator = locationString.replace('{{title1}}', title1).replace('{{title2}}', title2);
  //await expect(await element(sanitizedLocator)).not.toBeDisplayed();
  await expect(await mayBeElement(sanitizedLocator)).toBeFalsy();
});

Then(/^ui: I navigate to specific tile "([^"]*)" in admin settings$/, async (tileName: string) => {
  await elementParseAndClick(Selectors.adminSettings.specificTile, tileName);
});

Then(/^ui: I verify url containing value "([^"]*)"$/, async (urlString: string) => {
  await expect(browser).toHaveUrlContaining(urlString);
});

Given('ui: Switch to Tempus in same tab', async () => {
  await browser.url(context().user.baseUrl + "/tempus");

  // commented by Rinkesh because of logic is not working properly
  // await browser.waitUntil(async function () {
  //   return (await browser.getTitle()) === config.tempusSiteTitle
  // }, {
  //   timeout: ELEMENT_TIMEOUT,
  //   timeoutMsg: `Tempus page did not load within {${ELEMENT_TIMEOUT}}ms`
  // });
});