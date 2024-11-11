import { assert } from 'chai';
import { clickToElement, elementParse, elementParseAndClick, isElementDisplayed, locatorParse } from '../../../core/func';
import { Then } from '@cucumber/cucumber';
import Selectors from '../../../core/selectors';
import { context } from '../../../utils/context';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE } from '../../../core/timeouts';

Then('ui: Verify if recently created Tempus model is displayed in Model list page', async () => {
  await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.tempus.modelList.specificModelName, context().modelSetup.name)),
    `Tempus model: {${context().modelSetup.name}} was not displayed in model list page`);
});

Then('ui: Click on Create model button on Model list page', async () => {
  await clickToElement(Selectors.tempus.modelList.createModelButton);
});

Then('ui: Softassert if recently created Tempus model is not displayed in Model list page', async () => {
  await context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.tempus.modelList.specificModelName, context().modelSetup.name)),
    `Tempus model: {${context().modelSetup.name}} was still displayed in model list page`);
});

Then('ui: Wait for tempus search input box to be displayed', async () => {
  await isElementDisplayed(Selectors.tempus.modelList.searchInputbox, ELEMENT_TIMEOUT);
});

Then('ui: Click on edit icon of recently created Tempus model in Model list page', async () => {
  await clickToElement(locatorParse(Selectors.tempus.modelList.editIconOfSpecificModel, context().modelSetup.name));
});

Then('ui: Click on recently created Tempus model in Model list page', async () => {
  await clickToElement(locatorParse(Selectors.tempus.modelList.specificModelName, context().modelSetup.name));
  await browser.pause(MEDIUM_PAUSE);
});

Then(/^ui: Click on "(Gantt|Grid)" area in Tempus Model list page$/,async (modelArea:string) =>{
  if(modelArea == "Gantt")
    await clickToElement(Selectors.tempus.modelView.btnGanttView)
  else
    await clickToElement(Selectors.tempus.modelView.btnGridView)
}) 

Then('ui: Softassert if Gantt Chart area is displayed after opening a model', async () => {
  await assert.isTrue(await isElementDisplayed(Selectors.tempus.modelView.ganttArea, ELEMENT_TIMEOUT),
    `Gantt chart area was not displayed when user opened the Tempus model: {${context().modelSetup.name}}`);
});

Then('ui: Softassert if Lock icon is displayed against recently created Tempus model in Model list page', async () => {
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.tempus.modelList.lockIconOfSpecificModel, context().modelSetup.name), ELEMENT_TIMEOUT),
    `Lock icon was not displayed against the Tempus model: {${context().modelSetup.name}}`);
});

Then('ui: Click on Lock icon against recently created Tempus model in Model list page', async () => {
  await clickToElement(locatorParse(Selectors.tempus.modelList.lockIconOfSpecificModel, context().modelSetup.name));
});

Then('ui: Softassert Lock icon against recently created Tempus model in Model list page disappears', async () => {
  const { name } = context().modelSetup;
  const lockIconOfSpecificModel = await isElementDisplayed(locatorParse(Selectors.tempus.modelList.lockIconOfSpecificModel, name), ELEMENT_TIMEOUT);
  await context().softAssert.isTrue(lockIconOfSpecificModel, `Lock icon against the Tempus model: {${name}} did not disappear from model list page even after ${ELEMENT_TIMEOUT}ms`)
});

Then('ui: Softassert if Grid area is displayed after opening a model', async () => {
  await assert.isTrue(await isElementDisplayed(Selectors.tempus.modelView.gridArea, ELEMENT_TIMEOUT),
    `Grid area was not displayed when user opened the Tempus model: {${context().modelSetup.name}}`);
});

Then(/^ui: I switch the view to "([^"]*)" in modal list$/,async (viewName: string) => {
  await browser.pause(SHORT_PAUSE * 2); // Needed for the screen to load
  await elementParseAndClick(Selectors.tempus.modelList.viewTabButton, viewName);
});