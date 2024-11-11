import { Then, When } from '@wdio/cucumber-framework';
import Selectors from '../../../../../core/selectors';
import {
  clickToElement, elementParseAndClick, findAndSetValue, formFill, hitEnter, hitTab, isElementDisplayed, locatorParse, mayBeElement,
} from '../../../../../core/func';
import { assert } from 'chai';
import { context } from '../../../../../utils/context';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

When('ui: Click on Scribe button to open in PM', async () => {
  const elementDisplayed = await isElementDisplayed(Selectors.projectManagement.scribe.closeScribeButton, SHORT_PAUSE / 2);
  if (!elementDisplayed) {
    await clickToElement(Selectors.projectManagement.common.btnScribe);
  }
});

Then('ui: Send scribe message and verify in PM', async () => {
  const { scribeMessage } = context().projectSetup;
  await formFill([
    { locator: Selectors.projectManagement.scribe.scribeMessageText, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.scribe.scribeMessageText, value: scribeMessage, action: 'setValue' },
    { locator: Selectors.projectManagement.scribe.sendScribeButton, value: null, action: 'click' },
  ]);
  assert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.scribe.specificSentScribeMessage, scribeMessage)));
});

Then('ui: Send scribe message and mention newly created resource in PM', async () => {
  const { scribeMessage } = context().projectSetup;
  await formFill([
    { locator: Selectors.projectManagement.scribe.scribeMessageText, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.scribe.scribeMessageText, value: `@${context().resourceSetup.name}`, action: 'setValue' },
  ]);

  await browser.pause(SHORT_PAUSE);//Required to display values
  await hitEnter();
  await hitEnter(); //Required to send message
  await expect(await mayBeElement(locatorParse(Selectors.projectManagement.scribe.specificSentScribeMessage, `@${context().resourceSetup.name}`)));
});

Then('ui: Click on close Scribe button in PM', async () => {
  const elementDisplayed = await isElementDisplayed(Selectors.projectManagement.scribe.closeScribeButton, SHORT_PAUSE / 2);
  if (elementDisplayed) {
    await clickToElement(Selectors.projectManagement.scribe.closeScribeButton);
  }
});

Then('ui: I click on Filter button in scribe modal', async () => {
  await clickToElement(Selectors.scribe.filterButton);
});