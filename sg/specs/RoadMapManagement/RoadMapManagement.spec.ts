/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import { Then, When } from '@cucumber/cucumber';
import { clearTextUsingBackspace, clickToElement, element, elementParse, elementParseAndClick, formFill, getElementBackgroundColor, isElementDisplayed, locatorParse, mayBeElement } from '../../../../core/func';
import Selectors from '../../../../core/selectors';
import DateTime from '../../../../core/datetime';
import { Roadmap } from '../../../../helpers/RoadMapManagement/RoadMapManagement.helper';
import { context } from '../../../../utils/context';
import { DateFormats } from '../../../../core/enums';
import { assert } from 'chai';

Then('ui: I navigate to the roadmap creation page', async () => {
  await clickToElement(Selectors.roadMapManagement.createRoadMapBtn);
});

Then('ui: Enter current year as date for the project in Roadmap Management', async () => {
  const startDate = DateTime.getCurrentYearStartDate(DateFormats.MonthYearFormat3);
  const endDate = DateTime.getCurrentYearEndDate(DateFormats.MonthYearFormat3);

  await $(Selectors.roadMapManagement.startDate).scrollIntoView()
  await formFill([
    { locator: Selectors.roadMapManagement.startDate, value: null, action: 'clearValue' },
    { locator: Selectors.roadMapManagement.startDate, value: startDate, action: 'setValue' },
    { locator: Selectors.roadMapManagement.endDate, value: null, action: 'clearValue' },
    { locator: Selectors.roadMapManagement.endDate, value: endDate, action: 'setValue' },
  ]);

  await clickToElement(Selectors.roadMapManagement.createOrEditRoadmap.roadmapNameInputBox);
});

When('ui: I Create a new Roadmap', async () => {
  await Roadmap.createRoadmap();
})

When('ui: I clone new Roadmap from previously created one', async () => {
  const { name, cloneName } = context().roadmapSetup;
  await elementParseAndClick(Selectors.roadMapManagement.cloneBtn, name);
  const inputCloneRaodmapNameElement = await element(Selectors.roadMapManagement.inputCloneRaodmapName);
  await clearTextUsingBackspace(inputCloneRaodmapNameElement);
  await inputCloneRaodmapNameElement.setValue(cloneName);
})

When('ui: I click on Save button', async () => {
  await clickToElement(Selectors.roadMapManagement.createOrEditRoadmap.saveBtn);
})

Then('ui: I validate newly cloned roadmap details', async () => {
  const { cloneName } = context().roadmapSetup;
  await expect(await elementParse({ locatorString: Selectors.roadMapManagement.txtRoadmapName, parsing: cloneName })).toBeDisplayed();
})

Then('ui: I delete the cloned roadmap', async () => {
  await Roadmap.deleteClonedRoadmap();
})

Then('ui: I validate that the cloned roadmap is deleted but the original roadmap wont be deleted', async () => {
  const { name, cloneName } = context().roadmapSetup;
  await browser.pause(4000);
  await expect(await elementParse({ locatorString: Selectors.roadMapManagement.txtRoadmapName, parsing: name })).toBeDisplayed();
  await expect(await $(locatorParse(Selectors.roadMapManagement.txtRoadmapName, cloneName))).not.toBeDisplayed();
})

Then('ui: I open Roadmap Options in landing page of roadmap', async () => {
  await clickToElement(Selectors.roadMapManagement.createOrEditRoadmap.roadmapOption)
})

Then(/^ui: I select toggle button to open on clone as "([^"]*)"$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.roadMapManagement.toggleOpenForClone)).toString();
  if (toggleState == "Yes") {
    await (await element(Selectors.roadMapManagement.toggleOpenForClone)).click();
  } else if (color == '#37b5ff' && toggleState == "No") {
    await (await element(Selectors.roadMapManagement.toggleOpenForClone)).click();
  }
})

Then('ui: I Validate that the cloned roadmap is directly open', async () => {
  const { cloneName } = context().roadmapSetup;
  await expect(await elementParse({ locatorString: Selectors.roadMapManagement.txtRoadmapName, parsing: cloneName })).toBeDisplayed();
  await expect(await element(Selectors.roadMapManagement.createOrEditRoadmap.roadmapOption)).toBeDisplayed();
  await expect(await element(Selectors.roadMapManagement.createOrEditRoadmap.roadmapViewTypeMonth)).toBeDisplayed()
})

Then(/^ui: I edit the Roadmap Options for Toggle "([^"]*)" as "(Yes|No)" in the roadmap$/, async (optionName: string, toggleState: string) => {
  const ele = await elementParse({ locatorString: Selectors.roadMapManagement.createOrEditRoadmap.toggleRoadmapOptions, parsing: optionName });
  const color = (await getElementBackgroundColor(ele)).toString();
  if (toggleState === "Yes") {
    await ele.click();
  }
  else if (color == '#37b5ff' && toggleState == "No") {
    await ele.click();
  }
})

Then(/^ui: I validate that the toggle options "([^$]*)" is updated as "(Yes|No)"$/, async (optionName: string, toggleState: string) => {
  const ele = await locatorParse(Selectors.roadMapManagement.createOrEditRoadmap.toggleRoadmapOptions, optionName);
  const element = await isElementDisplayed(ele)
  if (toggleState == "Yes") {
    await assert.isFalse(element, `The toggle option is not updated and its current value is ${toggleState}`)
  }
  else {
    await assert.isTrue(element, `The toggle option is not updated and its current value is ${toggleState}`)
  }
})

