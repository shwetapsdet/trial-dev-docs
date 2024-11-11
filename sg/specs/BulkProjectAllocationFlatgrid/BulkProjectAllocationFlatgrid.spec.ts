/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import { Then, When } from '@cucumber/cucumber';
const moment = require('moment')
import {
  clickToElement, element, elementParse, elementParseAndClick,
  formFill, locatorParse, mayBeElement, slowInputFilling,
  getElementBackgroundColor, clickToElementUsingJS, isElementSelected, isElementDisplayed, hitEnter,
  elementDragAndDrop,
  getElementColor,
  doubleClickToElement,
  elementGetText,
  dragAndDrop
} from '../../../../core/func';
import { DateFormats, GeneralSettings, GenericColorCodes, ToggleStates } from '../../../../core/enums';
import Selectors from '../../../../core/selectors';
import { MEDIUM_PAUSE, SHORT_PAUSE, SHORT_TIMEOUT } from '../../../../core/timeouts';
import { context } from '../../../../utils/context';
import DateTime from '../../../../core/datetime';
import { viewModel } from '../../../../models/ViewManagement.model';
import { BPAFG } from '../../../../helpers/BPAFG.helper';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';
import { assert } from 'chai';
import { BuildTeam } from '../../../../helpers/ProjectManagement/ProjectEdit/BuildTeam.helper';
import { da, el, fi } from '@faker-js/faker';
import { waitForFileToDownload } from '../../../../core/fileUtilities';
const path = require('path');
import { INavigateFromTitle, IFormActionElements } from '../../../../types';
import { Key } from 'webdriverio';



Then(/^ui: Enter Start date as "([^"]*)" and End date as "([^"]*)" in BPAFG$/, async (startDate: any, endDate: any) => {
  await formFill([
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateInputBox, value: startDate, action: 'setValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateLabel, value: null, action: 'click' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.endDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.endDateInputBox, value: endDate, action: 'setValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateLabel, value: null, action: 'click' },
  ]);
});

Then(/^ui: Select Dataset as "([^"]*)" in BPAFG if not already selected$/, async (datasetToBeSelected: string) => {
  await BPAFG.selectSpecifcDatasetIfNotSelectedAlready(datasetToBeSelected);
});

Then(/^ui: Click on entity selection dropdown and click on "([^"]*)" tab in BPAFG$/, async (tabToBeSelected: string) => {
  await expect(await $(Selectors.bulkProjectAllocationFlatgrid.entitySelectionDrodown)).toBeDisplayed();
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.entitySelectionDrodown);
  await browser.pause(SHORT_PAUSE); //Required to open selection dropdown
  switch (tabToBeSelected.trim().toLowerCase()) {
    case "default":
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.defaultTab);
      break;
    case "project":
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.projectTabLocator);
      break;
    case "resource":
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.resourceTab);
      break;
    default:
      throw new Error(`Invalid Tab:${tabToBeSelected}\nSupported Values:\n1.Default\n2.Project\n3.Resource`);
  }
});

Then(/^ui: Search for project "([^"]*)" in entity selection section in BPAFG$/, async (projectName: string) => {
  await formFill([
    { locator: Selectors.bulkProjectAllocationFlatgrid.searchProjectInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.searchProjectInputBox, value: projectName, action: 'setValue' },
  ]);
});

//Need to find solution, overlay is not closed in jenkins run
Then('ui: Close entity selection section in BPAFG', async () => {
  await clickToElementUsingJS(Selectors.bulkProjectAllocationFlatgrid.entitySelectionDrodown);
  await browser.pause(SHORT_PAUSE); //Required to close overlay and interact with other elements
});

Then(/^ui: Select project "([^"]*)" in entity selection section in BPAFG$/, async (projectName: string) => {
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.projectSelectionCheckbox, projectName);
});

Then(/^ui: Click on meatballs icon of project "([^"]*)" and resource "([^"]*)" and select option "([^"]*)" in BPAFG$/, async (
  projectName: string,
  resourceName: string,
  optionToBeSelected: string,
) => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.meatballsIconOfSpecificResourceAndProject.replace("{{projectName}}", projectName).replace("{{resourceName}}", resourceName));
  switch (optionToBeSelected.trim().toLowerCase()) {
    case "resource replace advanced":
      await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, 'Resource replace advanced'));
      break;
    default:
      throw new Error(`Invalid Tab:${optionToBeSelected}\nSupported Values:\n1.Resource replace advanced`);
  }
});

Then(/^ui: Verify if "([^"]*)" unit is selected in Advanced resource replace of BPAFG$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await expect(await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.specificUnitTab, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await expect(await element(Selectors.projectManagement.resourceReplace.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.FTE %\n4.Manday`);
  }
});

Then('ui: I click on view button', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.btnView);
  await browser.pause(SHORT_PAUSE); //Required to display view dropdown
});

Then(/^ui: I verify and click on view "([^"]*)"$/, async (viewName: string) => {
  await (await element(`//span[contains(@class,'layt_litext')]/span[text()='${viewName}']`)).click();
});

Then(/^ui: I verify start date "([^"]*)" and end date "([^"]*)"$/, async (startDate: string, endDate: string) => {
  const startDt = await (await element(Selectors.bulkProjectAllocationFlatgrid.startDateInputBox));
  await expect(startDt).toHaveValue(startDate, { ignoreCase: true });
  const endDt = await (await element(Selectors.bulkProjectAllocationFlatgrid.endDateInputBox));
  await expect(endDt).toHaveValue(endDate, { ignoreCase: true });
});

Then(/^ui: Select Assignment Type as:"([^"]*)" in BPAFG if not already selected$/, async (assignmentType: string) => {
  await BPAFG.selectSpecifcAssignmentTypeIfNotSelectedAlready(assignmentType);
});

Then('ui: I clear filters in both projects and resources section', async () => {
  await browser.pause(MEDIUM_PAUSE);
  const ele1 = await isElementDisplayed(Selectors.bulkProjectAllocationFlatgrid.btnClearFilterInResourceTab, SHORT_PAUSE);
  if (ele1) {
    await clickToElement(Selectors.bulkProjectAllocationFlatgrid.btnClearFilterInResourceTab);
    await browser.pause(SHORT_PAUSE * 2);
  }
  const ele2 = await isElementDisplayed(Selectors.bulkProjectAllocationFlatgrid.btnClearFilterInProjectTab, SHORT_PAUSE);
  if (ele2) {
    await clickToElement(Selectors.bulkProjectAllocationFlatgrid.btnClearFilterInProjectTab);
    await browser.pause(SHORT_PAUSE * 2);
  }
  const eleSelectAllChkProject = await element(Selectors.bulkProjectAllocationFlatgrid.chkSelectAllProject);
  await eleSelectAllChkProject.click();
  if (await eleSelectAllChkProject.isSelected()) {
    await eleSelectAllChkProject.click();
    await browser.pause(SHORT_PAUSE * 2);
  }

  const eleSelectAllChkResource = await element(Selectors.bulkProjectAllocationFlatgrid.chkSelectAllResource);
  await eleSelectAllChkResource.click();
  if (await eleSelectAllChkResource.isSelected()) {
    await eleSelectAllChkResource.click();
    await browser.pause(SHORT_PAUSE * 2);
  }
});

Then('ui: I click on select all projects checkbox in entity selection section in BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.chkSelectAllProject);
});

Then('ui: I click on groupby dropdown in BPAFG', async () => {
  await (await element(Selectors.common.ddGroupByDropdown)).click();
});

Then(/^ui: I verify attribute "([^"]*)" is selected in groupby dropdown in BPAFG$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required to display the value
    await expect(await element(`//div[contains(@class,'k-animation-container-shown')]//span[normalize-space(.)='${attributes[i]}']/preceding-sibling::input`)).toBeChecked();
  }
});

Then(/^ui: I verify attribute "([^"]*)" is disabled in groupby dropdown in BPAFG$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required to display the value
    await expect(await element(`//div[contains(@class,'k-animation-container-shown')]//span[normalize-space(.)='${attributes[i]}']/preceding-sibling::input`)).toBeDisabled();
  }
});

Then(/^ui: I uncheck attributes "([^"]*)" in groupby dropdown in BPAFG$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required to display the value
    const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.ddAttributeCheckboxInGroupByDropdown, parsing: attributes[i] });
    if (await ele.isSelected()) {
      await ele.click();
    }
  }
});

Then(/^ui: I select attributes "([^"]*)" in groupby dropdown in BPAFG$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.txtSearchFieldInGroupByDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required to display the value
    const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.ddAttributeCheckboxInGroupByDropdown, parsing: attributes[i] });
    if (await ele.isSelected()) { /* empty */ } else {
      await ele.click();
    }
  }
});

Then('ui: I verify and click on view created using model', async () => {
  const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.viewName, parsing: context().viewName });
  await ele.click();
});

Then('ui: I search for project created using model in entity selection section in BPAFG', async () => {
  // const { name: projectName } = context().projectSetup;
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.searchProjectInputBox,context().projectSetup.name);
  await browser.pause(SHORT_PAUSE * 2); //Required to display project
});

Then('ui: I enter current year in start and End date in BPAFG', async () => {
  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.startDateInputBox, startDate);
  await hitEnter();
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.endDateInputBox, endDate);
  await hitEnter();
  await browser.pause(SHORT_PAUSE);//Needed for date picker to close
});

Then(/^ui: I click on specific unit "([^"]*)" in BPAFG$/, async (unit: string) => {
  switch (unit.toLowerCase()) {
    case "time":
    case "cost":
    case "fte":
    case "ftep":
    case "manday":
    case "gantt":
      const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.specificUnit, parsing: unit.toLowerCase() });
      await ele.click();
      break;
    default:
      throw new Error(`Unit:${unit} is not supported.\nSupported Values:\n1.Time\n2.Cost\n3.FTE\n4.FTEP\n5.Manday\n6.Gantt`);
  }

});

Then('ui: I click on options in BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.btnOptions);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open
});

Then(/^ui: I toggle show total row to "([^"]*)" in BPAFG Options$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.bulkProjectAllocationFlatgrid.tglShowTotalRow)).toString();
  if (color == '#8c9caa' && toggleState.toLowerCase() == "on") {
    await (await element(Selectors.bulkProjectAllocationFlatgrid.tglShowTotalRow)).click();
  } else if (color != '#8c9caa' && toggleState.toLowerCase() == "off") {
    await (await element(Selectors.bulkProjectAllocationFlatgrid.tglShowTotalRow)).click();
  }
});

Then(/^ui: I select specific date mode "([^"]*)" and verify assignment total "([^"]*)" for task "([^"]*)" in BPAFG$/, async (dateModes: string, assignmentTotal: string, taskName: string) => {
  const mode: string[] = dateModes.split(',');
  const expectedValues: string[] = assignmentTotal.split(',');
  for (let i = 0; i < mode.length; i++) {
    await clickToElement(Selectors.bulkProjectAllocationFlatgrid.ddDateModeDropdown);
    const ele1 = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.dateModeValues, parsing: mode[i] });
    await ele1.click();
    await browser.pause(MEDIUM_PAUSE); //Required to display dropdown options
    const actualValue = await (await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.assignmentTotal, parsing: taskName })).getText();
    await assert.equal(actualValue, expectedValues[i], `Assignment Total was incorrect in BPAFG for task: {${taskName}} in mode: {${mode[i]}}`)
  }
});

Then('ui: I create new view using model and select it', async () => {
  context().viewName = viewModel().name;
  await BPAFG.createViewAndSelectIt(context().viewName);
});

Then(/^ui: Select Date mode as:"([^"]*)" in BPAFG if not already selected$/, async (dateModeToBeSelected: string) => {
  await BPAFG.selectSpecifcDateModetIfNotSelectedAlready(dateModeToBeSelected);
});


Then(/^ui: I verify specific cell "([^"]*)" of task "([^"]*)" is highlighted with assignment type "([^"]*)" in BPAFG$/, async (cellNumber: string, taskName: string, assignmentType: string) => {
  let ele;
  if (assignmentType.toLowerCase() == "planned") {
    ele = await element(Selectors.bulkProjectAllocationFlatgrid.highlightedSpecificCellInPlannedAssignment.replace("{{taskName}}", taskName).replace("{{cellNumber}}", cellNumber));
  } else if (assignmentType.toLowerCase() == "actual") {
    ele = await element(Selectors.bulkProjectAllocationFlatgrid.highlightedSpecificCellInActualAssignment.replace("{{taskName}}", taskName).replace("{{cellNumber}}", cellNumber));
  }
  await expect(ele).toBeDisplayed();
});

Then('ui: Search for template in entity selection section in BPAFG', async () => {
  const { name } = context().projectTemplate;
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.searchProjectInputBox, name);
});

Then('ui: I validate that template is not present', async () => {
  const { name } = context().projectTemplate;
  const el = await mayBeElement(locatorParse(Selectors.bulkProjectAllocationFlatgrid.projectName, name), MEDIUM_PAUSE)
  await expect(el).toBeFalsy();
});

Then('ui: I click on insert columns dropdown in BPAFG', async () => {
  await BPAFG.clickOnInsertColumnsDropdown();
});

Then(/^ui: I uncheck and select attributes "([^\"]*)" in insert columns dropdown in BPAFG$/, async (attributeNames: string) => {
  await BPAFG.uncheckSelectAllCheckbox();
  await BPAFG.searchAndSelectAttributesInInsertColumns(attributeNames);
});

Then('ui: Ungroup groups if any in BPAFG', async () => {
  await BPAFG.unGroupIfAny();
});

Then('ui: Unselect Columns if any in BPAFG', async () => {
  await BPAFG.unselectColumnsIfAny();
});

Then(/^ui: Select Overlay Heatmap as:"([^"]*)" in Grid options of BPAFG$/, async (optionToBeSelected: string) => {
  await BPAFG.clickOnSpecificOverlayHeatmapOptionInGridOptions(optionToBeSelected);
});

Then(/^ui: Select Tasks to show as:"([^"]*)" in Grid options of BPAFG$/, async (optionToBeSelected: string) => {
  await BPAFG.clickOnSpecificTasksToShowOptionInGridOptions(optionToBeSelected);
});

Then(/^ui: Verify if cells of months:"([^"]*)" of current year for recently created "(project|resource|Non-generic task)" is highlighted with non-zero color in BPAFG Grid$/, async (monthNames: string, entityToBeVerified: string) => {

  switch (entityToBeVerified.toLocaleLowerCase()) {
    case 'resource':
      entityToBeVerified = context().resourceSetup.name;
      break;
    case 'project':
      entityToBeVerified = context().projectSetup.name;
      break;
    case 'non-generic task':
      entityToBeVerified = context().projectSetup.taskName;
      break;
    case 'generic task':
      entityToBeVerified = "Generic";
      break;
    default:
      throw new Error(`Entity type:${entityToBeVerified} is not yet supported. Please add if required.\nSupported Values:\n1.Project\n2.Resource\n3.Non-generic task\n4.Generic task`);
  }
  const columnsToBeVerified = monthNames.split(",");

  for (let i = 0; i < columnsToBeVerified.length; i++) {
    const columnName = columnsToBeVerified[i] + " " + moment().year() % 100;
    await BPAFG.verifyIfSpecificCellIsHighlightedInColorForProjectOrTaskOrResource(entityToBeVerified, columnName, GenericColorCodes.NonZero, context().softAssert);
  }
});

Then(/^ui: Verify if cells of months:"([^"]*)" of current year for recently created "(project|resource|Non-generic task)" is highlighted with non-zero color in BPAFG Grid for:"([^"]*)" Assignment type when both Planned and Actual are selected$/, async (monthNames: string, entityToBeVerified: string, assignmentType: string) => {

  switch (entityToBeVerified.toLocaleLowerCase()) {
    case 'resource':
      entityToBeVerified = context().resourceSetup.name;
      break;
    case 'project':
      entityToBeVerified = context().projectSetup.name;
      break;
    case 'non-generic task':
      entityToBeVerified = context().projectSetup.taskName;
      break;
    case 'generic task':
      entityToBeVerified = "Generic";
      break;
    default:
      throw new Error(`Entity type:${entityToBeVerified} is not yet supported. Please add if required.\nSupported Values:\n1.Project\n2.Resource\n3.Non-generic task\n4.Generic task`);
  }
  const columnsToBeVerified = monthNames.split(",");

  for (let i = 0; i < columnsToBeVerified.length; i++) {
    const columnName = columnsToBeVerified[i] + " " + moment().year() % 100;
    await BPAFG.verifyIfSpecificCellIsHighlightedInColorForProjectOrTaskOrResourceWhenPlannedAndActualIsSelected(entityToBeVerified, columnName, assignmentType, GenericColorCodes.NonZero, context().softAssert);
  }
});

Then(/^ui: Verify if cells by indices:"([^"]*)" for recently created "(project|resource|Non-generic task)" is highlighted with non-zero color in BPAFG Grid$/, async (cellNumbers: string, entityToBeVerified: string) => {

  switch (entityToBeVerified.toLocaleLowerCase()) {
    case 'resource':
      entityToBeVerified = context().resourceSetup.name;
      break;
    case 'project':
      entityToBeVerified = context().projectSetup.name;
      break;
    case 'non-generic task':
      entityToBeVerified = context().projectSetup.taskName;
      break;
    case 'generic task':
      entityToBeVerified = "Generic";
      break;
    default:
      throw new Error(`Entity type:${entityToBeVerified} is not yet supported. Please add if required.\nSupported Values:\n1.Project\n2.Resource\n3.Non-generic task\n4.Generic task`);
  }
  const cellIndexesToBeVerified = cellNumbers.split(",");

  for (let i = 0; i < cellIndexesToBeVerified.length; i++) {
    await BPAFG.verifyIfCellByIndexIsHighlightedInColorForProjectOrTaskOrResource(entityToBeVerified, parseInt(cellIndexesToBeVerified[i]), GenericColorCodes.NonZero, context().softAssert);
  }
});

Then(/^ui: Verify if cells by indices:"([^"]*)" for recently created "(project|resource|Non-generic task)" is highlighted with zero color in BPAFG Grid$/, async (cellNumbers: string, entityToBeVerified: string) => {

  switch (entityToBeVerified.toLocaleLowerCase()) {
    case 'resource':
      entityToBeVerified = context().resourceSetup.name;
      break;
    case 'project':
      entityToBeVerified = context().projectSetup.name;
      break;
    case 'non-generic task':
      entityToBeVerified = context().projectSetup.taskName;
      break;
    case 'generic task':
      entityToBeVerified = "Generic";
      break;
    default:
      throw new Error(`Entity type:${entityToBeVerified} is not yet supported. Please add if required.\nSupported Values:\n1.Project\n2.Resource\n3.Non-generic task\n4.Generic task`);
  }
  const cellIndexesToBeVerified = cellNumbers.split(",");

  for (let i = 0; i < cellIndexesToBeVerified.length; i++) {
    await BPAFG.verifyIfCellByIndexIsHighlightedInColorForProjectOrTaskOrResource(entityToBeVerified, parseInt(cellIndexesToBeVerified[i]), GenericColorCodes.Zero, context().softAssert);
  }
});

Then(/^ui: Verify if cells by indices:"([^"]*)" for recently created "(project|resource|Non-generic task)" is highlighted with resource color in BPAFG Grid$/, async (cellNumbers: string, entityToBeVerified: string) => {

  switch (entityToBeVerified.toLocaleLowerCase()) {
    case 'resource':
      entityToBeVerified = context().resourceSetup.name;
      break;
    case 'project':
      entityToBeVerified = context().projectSetup.name;
      break;
    case 'non-generic task':
      entityToBeVerified = context().projectSetup.taskName;
      break;
    case 'generic task':
      entityToBeVerified = "Generic";
      break;
    default:
      throw new Error(`Entity type:${entityToBeVerified} is not yet supported. Please add if required.\nSupported Values:\n1.Project\n2.Resource\n3.Non-generic task\n4.Generic task`);
  }
  const cellIndexesToBeVerified = cellNumbers.split(",");

  for (let i = 0; i < cellIndexesToBeVerified.length; i++) {
    await BPAFG.verifyIfCellByIndexIsHighlightedInColorForProjectOrTaskOrResource(entityToBeVerified, parseInt(cellIndexesToBeVerified[i]), GenericColorCodes.red4, context().softAssert);
  }
});

Then(/^ui: Enter:"([^"]*)" for cells of months:"([^"]*)" of current year for recently created "(project|resource|Non-generic task)" in BPAFG Grid$/, async (valueToBeEntered: string, monthNames: string, projectOrTaskOrResourceName: string) => {

  switch (projectOrTaskOrResourceName.toLocaleLowerCase()) {
    case 'resource':
      projectOrTaskOrResourceName = context().resourceSetup.name;
      break;
    case 'project':
      projectOrTaskOrResourceName = context().projectSetup.name;
      break;
    case 'non-generic task':
      projectOrTaskOrResourceName = context().projectSetup.taskName;
      break;
    case 'generic task':
      projectOrTaskOrResourceName = "Generic";
      break;
    default:
      throw new Error(`Entity type:${projectOrTaskOrResourceName} is not yet supported. Please add if required.\nSupported Values:\n1.Project\n2.Resource\n3.Non-generic task\n4.Generic task`);
  }
  const columnsToBeVerified = monthNames.split(",");

  for (let i = 0; i < columnsToBeVerified.length; i++) {
    const columnName = columnsToBeVerified[i] + " " + moment().year() % 100;
    await BPAFG.enterValueForSpecificCellOfProjectOrTaskOrResource(projectOrTaskOrResourceName, columnName, valueToBeEntered);
  }
});

Then('ui: Click on Save button in BPAFG wait until it disappears', async () => {
  await BPAFG.clickOnSaveButtonAndWaitForItToDisappear();
});

Then(/^ui: Verify if Overlay Heatmap option:"(Off|Resource|Resource request|Non Zero)" is selected in BPAFG Options$/, async (optionToBeVerified: string) => {
  const overlayHeatmapSpecificOptionInputElement = await element(locatorParse(Selectors.bulkProjectAllocationFlatgrid.gridOptions.overlayHeatmapSpecificOptionInputElement, optionToBeVerified));
  const selectionState = await isElementSelected(overlayHeatmapSpecificOptionInputElement);
  await context().softAssert.isTrue(selectionState, `Overlay Heatmap option:${optionToBeVerified} was not selected in BPAFG Options section`);
});

Then('ui: Select the select all projects checkbox if not already selected in BPAFG', async () => {
  const chkSelectAllProjectCheckboxElement = await element(Selectors.bulkProjectAllocationFlatgrid.chkSelectAllProject);
  await chkSelectAllProjectCheckboxElement.click();
  if (!await isElementSelected(chkSelectAllProjectCheckboxElement))
    await chkSelectAllProjectCheckboxElement.click();
});


Then('ui: Close Options section in BPAFG', async () => {
  await browser.pause(SHORT_PAUSE);
  await browser.keys(Key.Escape);
  await browser.pause(MEDIUM_PAUSE);//Needed for dropdown to close
});

Then('ui: I click on legend button in BPAFG', async () => {
  await clickToElementUsingJS(Selectors.bulkProjectAllocationFlatgrid.legendButton);
});

Then(/^ui: I verify legend modal content - "([^"]*)" in BPAFG$/, async (legendContents: string) => {
  const content: string[] = legendContents.split(',');
  for (let i = 0; i < content.length; i++) {
    await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.legendModalContent, content[i]), SHORT_PAUSE), `Specific legend content: {${content[i]} is not displayed}`);
  }
});

Then(/^ui: I verify legend modal milestone shape - "([^"]*)" in BPAFG$/, async (milestoneShape: string) => {
  const shape: string[] = milestoneShape.split(',');
  for (let i = 0; i < shape.length; i++) {
    await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.legendModalMilestoneShape, shape[i]), SHORT_PAUSE), `Specific legend milestone shape: {${shape[i]} is not displayed}`);
  }
});

Then(/^ui: I verify legend resource heatmap color - "([^"]*)" of value - "([^"]*)" in BPAFG$/, async (heatmapColor: string, heatmapValue: string) => {
  const color: string[] = heatmapColor.split(',');
  const value: string[] = heatmapValue.split(',');
  for (let i = 0; i < color.length; i++) {
    const cellLocator = Selectors.bulkProjectAllocationFlatgrid.legendModalResourceHeatmapColor.replace("{{value}}", value[i]);
    const actualColor = (await (await element(cellLocator)).getCSSProperty("background-color")).parsed.hex;
    await context().softAssert.equal(actualColor.toLowerCase(), GeneralSettings.HeatmapColorCodes[color[i]].toLowerCase(), "Expected color - " + GeneralSettings.HeatmapColorCodes[color[i]].toLowerCase() + " but found - " + actualColor.toLowerCase());
  }
});

Then(/^ui: Select Week Display Format as:"(Number|Start date|End date)" in Grid options of BPAFG$/, async (optionToBeSelected: string) => {
  await BPAFG.clickOnSpecificWeekDisplayFormatOptionInGridOptions(optionToBeSelected);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open or close
});

Then(/^ui: Verify 10 column headings when Week Display Format is selected as:"(Number|Start date|End date)" in BPAFG$/, async (weekDisplayFormatSelected: string) => {

  const startDate = moment().startOf('year').startOf('isoWeek');
  const currentDate = startDate.clone();

  const softAssert = context().softAssert;

  for (let i = 1; i <= 10; i++) {
    switch (weekDisplayFormatSelected) {
      case 'Number':
        const expectedHeader = currentDate.format('YYYY-[W]WW');
        const acutalHeader = await elementGetText(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeaderByIndex, (i + 3) + ""));
        await softAssert.equal(acutalHeader.trim(), expectedHeader, `BPAFG Date Header of cell:${i} has incorrect header name when Week display format was:{${weekDisplayFormatSelected}}`);
        currentDate.add(1, 'week');
        break;
      case 'Start date':
        let startDateHeader;
        if (i === 1) {
          startDateHeader = moment().startOf('year').format(DateFormats.DayMonthYearFormat2);
        } else {
          startDateHeader = currentDate.format(DateFormats.DayMonthYearFormat2);
        }
        const actualStartDateHeader = await elementGetText(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeaderByIndex, (i + 3) + ""));
        await softAssert.equal(actualStartDateHeader.trim(), startDateHeader, `BPAFG Date Header of cell:${i} has incorrect header name when Week display format was:{${weekDisplayFormatSelected}}`);
        currentDate.add(1, 'week');
        break;
      case 'End date':
        const endDateHeader = currentDate.clone().add(6, 'days').format(DateFormats.DayMonthYearFormat2);
        const actualEndDateHeader = await elementGetText(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeaderByIndex, (i + 3) + ""));
        await softAssert.equal(actualEndDateHeader.trim(), endDateHeader, `BPAFG Date Header of cell:${i} has incorrect header name when Week display format was:{${weekDisplayFormatSelected}}`);
        currentDate.add(1, 'week');
        break;
      default:
        throw new Error(`Invalid Week Display Format:${weekDisplayFormatSelected}\nSupported Values:\n1.Number\n2.Start date\n3.End date`);
    }
  }
});

Then(/^ui: I verify specific unit "([^"]*)" is displayed$/, async (specificUnit: string) => {
  const unit: string[] = specificUnit.split(',');
  for (let i = 0; i < unit.length; i++) {
    switch (unit[i].toLowerCase()) {
      case "time":
      case "cost":
      case "fte":
      case "ftep":
      case "manday":
      case "gantt":
        context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificUnit, unit[i].toLowerCase()), SHORT_PAUSE), `Specific unit: {${unit[i]} is not displayed}`);
        break;
      default:
        throw new Error(`Unit:${unit} is not supported.\nSupported Values:\n1.Time\n2.Cost\n3.FTE\n4.FTEP\n5.Manday\n6.Gantt`);
    }
  }
});

Then(/^ui: I verify specific unit "([^"]*)" is not displayed$/, async (specificUnit: string) => {
  const unit: string[] = specificUnit.split(',');
  for (let i = 0; i < unit.length; i++) {
    switch (unit[i].toLowerCase()) {
      case "time":
      case "cost":
      case "fte":
      case "ftep":
      case "manday":
      case "gantt":
        context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificUnit, unit[i].toLowerCase()), SHORT_PAUSE), `Specific unit: {${unit[i]} is displayed}`);
        break;
      default:
        throw new Error(`Unit:${unit} is not supported.\nSupported Values:\n1.Time\n2.Cost\n3.FTE\n4.FTEP\n5.Manday\n6.Gantt`);
    }
  }
});

Then('ui: Select attributes created earlier in BPAFG', async () => {
  const attributes = [];
  if (context().projectAttributes !== undefined) {
    attributes.push(context().projectAttributes);
  }
  if (context().resourceAttributes !== undefined) {
    attributes.push(context().resourceAttributes);
  }
  if (context().assignmentAttributes !== undefined) {
    attributes.push(context().assignmentAttributes);
  }
  if (context().attributes !== undefined) {
    attributes.push(context().attributes);
  }
  await BPAFG.clickOnInsertColumnsDropdown();
  await BPAFG.uncheckSelectAllCheckbox();
  for (let i = 0; i < attributes.length; i++) {
    for (let j = 0; j < attributes[i].length; j++) {
      await BPAFG.searchAndSelectAttributesInInsertColumns(attributes[i][j].name);
    }
  }
  await BPAFG.clickOnInsertColumnsDropdown();
});

Then('ui: Verify Rich text in BPAFG for recently created Cfs', async () => {
  let attributes = [];
  if (context().projectAttributes !== undefined) {
    attributes = context().projectAttributes;
  }

  const resourceName = context().resourceSetup.name;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = Selectors.bulkProjectAllocationFlatgrid.specificProjectOrResourceOrTaskAttributeCellByColumnNameForPlannedWhenBothPlannedAndActualIsSelected
      .replace("{{resourceOrTaskOrProjectName}}", resourceName)
      .replace("{{columnName}}", attribute.name);
    const richtextElement = await element(cellLocator + "//div[contains(@class,'rich-text-view')]");
    const elements = await richtextElement.$$('*');
    let actualHTMLElements = await (elements.map(element => element.getText()));
    actualHTMLElements = actualHTMLElements.map(text => text.replace('/\n/g', '').trim());
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Project CF:{${attribute.name}} for resource:{${resourceName}} in BPAFG Grid was incorrect`, true);
  }

  attributes = [];
  if (context().resourceAttributes !== undefined) {
    attributes = context().resourceAttributes;
  }
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = Selectors.bulkProjectAllocationFlatgrid.specificProjectOrResourceOrTaskAttributeCellByColumnNameForPlannedWhenBothPlannedAndActualIsSelected
      .replace("{{resourceOrTaskOrProjectName}}", resourceName)
      .replace("{{columnName}}", attribute.name);
    const richtextElement = await element(cellLocator + "//div[contains(@class,'rich-text-view')]");
    const elements = await richtextElement.$$('*');
    let actualHTMLElements = await (elements.map(element => element.getText()));
    actualHTMLElements = actualHTMLElements.map(text => text.replace('/\n/g', ' ').trim());
    // const expectedValues = attribute.expectedValue.map(text => text.replace('\n', '').trim());
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Assignment CF:{${attribute.name}} for resource:{${resourceName}} in BPAFG Grid was incorrect`, true);
    console.log("expected",attribute.expectedValue)
    console.log("actual",actualHTMLElements)
  }

  attributes = [];
  if (context().assignmentAttributes !== undefined) {
    attributes = context().assignmentAttributes;
  }
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = Selectors.bulkProjectAllocationFlatgrid.specificProjectOrResourceOrTaskAttributeCellByColumnNameForPlannedWhenBothPlannedAndActualIsSelected
      .replace("{{resourceOrTaskOrProjectName}}", resourceName)
      .replace("{{columnName}}", attribute.name);
    const richtextElement = await element(cellLocator + "//div[contains(@class,'rich-text-view')]");
    const elements = await richtextElement.$$('*');
    let actualHTMLElements = await (elements.map(element => element.getText()));
    actualHTMLElements = actualHTMLElements.map(text => text.replace('/\n/g', ' ').trim());
    // const expectedValues = attribute.expectedValue.map(text => text.replace('\n', '').trim());
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Assignment CF:{${attribute.name}} for resource:{${resourceName}} in BPAFG Grid was incorrect`, true);

  }

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = Selectors.bulkProjectAllocationFlatgrid.specificProjectOrResourceOrTaskAttributeCellByColumnNameForPlannedWhenBothPlannedAndActualIsSelected
      .replace("{{resourceOrTaskOrProjectName}}", resourceName)
      .replace("{{columnName}}", attribute.name);
    await doubleClickToElement(cellLocator);
    await browser.pause(SHORT_PAUSE / 2);
    // await hitEnter();
    await browser.pause(SHORT_PAUSE / 2);
    const richtextElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    const elements = await richtextElement.$$('*');
    let actualHTMLElements = await (elements.map(element => element.getText()));
    actualHTMLElements = actualHTMLElements.map(text => text.replace('/\n/g',' ').trim());
    // const expectedValues = attribute.expectedValue.map(text => text.replace('\n', '').trim());
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Assignment CF:{${attribute.name}} for resource:{${resourceName}} in BPAFG Grid was incorrect`, true);
    await elementParseAndClick(Selectors.projectManagement.sPA.specificButtonWhenEditingRichTextCF, "Cancel");

  }

});

Then(/^ui: Click on meatballs icon of recently created project and resource and select option "([^"]*)" in BPAFG$/, async (
  optionToBeSelected: string,
) => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.meatballsIconOfSpecificResourceAndProject.replace("{{projectName}}", context().projectSetup.name).replace("{{resourceName}}", context().resourceSetup.name));
  switch (optionToBeSelected.trim().toLowerCase()) {
    case "resource replace advanced":
      await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, 'Resource replace advanced'));
      break;
    default:
      throw new Error(`Invalid option:${optionToBeSelected}\nSupported Values:\n1.Resource replace advanced`);
  }
});

Then('ui: Clear filters if any in Advanced resource replace of BPAFG', async () => {
  await BPAFG.ResourceReplaceAdvanced.clearFiltersIfAny();
});

Then('ui: Select resource attributes created earlier Advanced resource replace of BPAFG', async () => {
  let attributes = [];
  if (context().resourceAttributes !== undefined) {
    attributes = context().resourceAttributes;
  }
  await BPAFG.ResourceReplaceAdvanced.clickOnInsertColumnsDropdown();
  await BPAFG.ResourceReplaceAdvanced.uncheckSelectAllCheckbox();
  for (let i = 0; i < attributes.length; i++) {
    await BPAFG.ResourceReplaceAdvanced.searchAndSelectAttributesInInsertColumns(attributes[i].name);
  }
  await BPAFG.ResourceReplaceAdvanced.clickOnInsertColumnsDropdown();
});

Then('ui: Verify Rich text in Advanced resource replace of BPAFG for recently created resource Cfs', async () => {
  const attributes = context().resourceAttributes;
  const resourceName = context().resourceSetup.name;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = (Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.specificCellOfResourceByColumnName
      .replace('{{resourceName}}', resourceName)
      .replace('{{columnName}}', attribute.name)) + "/div[contains(@class,'grid-rich-text')]";
    const richtextElement = await element(cellLocator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of resource CF:{${attribute.name}} for resource:{${resourceName}} in Advanced resource replace of BPAFG was incorrect`, true);
  }
});

Then('ui: Search for recently created resource in Advanced resource replace of BPAFG', async () => {
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.quickSearchInputbox, context().resourceSetup.name);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: I uncheck and select newly created skill in insert columns dropdown in BPAFG', async () => {
  await BPAFG.uncheckSelectAllCheckbox();
  await BPAFG.searchAndSelectAttributesInInsertColumns(context().skillName);
});

Then(/^ui: I validate that the skill is "([^"]*)" in grid$/, async (skillStatus: string) => {
  const ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.validateColumnByName, context().skillName);
  if (skillStatus == "included") {
    await expect(await element(ele)).toBeDisplayed()
  }
  else {
    await expect(await $(ele)).not.toBeDisplayed()
  }
})

Then('ui: I search for resource created using model in entity selection section in BPAFG', async () => {
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.searchResourceInputBox, context().resourceSetup.name);
  await browser.pause(SHORT_PAUSE * 2); //Required to display project
});

Then('ui: I click on select all resource checkbox', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.chkSelectAllResource);
});

Then('ui: I uncheck all attribute in insert columns dropdown in BPAFG', async () => {
  await BPAFG.uncheckSelectAllCheckbox();
});

Then(/^ui: I verify previous created attribute is "([^"]*)" in the insert column$/, async (attributeStatus: string) => {
  await BPAFG.uncheckSelectAllCheckbox();
  await BPAFG.searchAndVerifyAttributeInInsertColumn(context().skillName, attributeStatus)
});

Then('ui: I search the view created by model', async () => {
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.viewGrid.searchInput, context().viewName)
})

Then('ui: I create a clone of the view created by model', async () => {
  const name = `${context().viewName} Clone`
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.viewGrid.viewCloneButton, context().viewName);
  await expect(await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, parsing: name })).toBeDisplayed();
})

When(/^ui: I reorder "([^"]*)" above "([^"]*)"$/, async (viewName1: string, viewName2: string) => {

  if (viewName1 === "original view") {
    viewName1 = context().viewName;
    viewName2 = `${context().viewName} Clone`;
  }

  else if (viewName1 === "cloned view") {
    viewName2 = context().viewName;
    viewName1 = `${context().viewName} Clone`;
  }

  await dragAndDrop(
    locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.viewDragIcon, viewName1),
    locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.viewDragIcon, viewName2)
  );

})

Then(/^ui: I verify that "([^"]*)" is arranged above "([^"]*)"$/, async (viewName1: string, viewName2: string) => {
  if (viewName1 === "original view") {
    viewName1 = context().viewName;
    viewName2 = `${context().viewName} Clone`;
  }
  else if (viewName1 === "cloned view") {
    viewName1 = `${context().viewName} Clone`;
    viewName2 = context().viewName;
  }
  const locationString = Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateReorderOfViewsByName;
  const replacedLocator = locationString.replace('viewName1', viewName1).replace('viewName2', viewName2)
  await expect(await element(replacedLocator)).toBeDisplayed();
})

Then(/^ui: I "([^"]*)" the reordered clone view$/, async (editType: string) => {
  const ele = Selectors.bulkProjectAllocationFlatgrid.viewGrid.editButtonView.replace('{{viewName}}', `${context().viewName} Clone`)
  switch (editType.toLocaleLowerCase()) {
    case "rename":
      await clickToElement(ele.replace("{{editType}}", editType.toLocaleLowerCase()));
      await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.viewGrid.inputRenameView, `${context().viewName} Clone Rename`);
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.viewGrid.conformRenameView);
      break;
    case "clone":
      await clickToElement(ele.replace("{{editType}}", editType.toLocaleLowerCase()));
      break;
    case "delete":
      const el = await element(ele.replace("{{editType}}", editType.toLocaleLowerCase()));
      await el.click();
      break;
    default:
      break;
  }
})

Then(/^ui: I verify the clone view has been "([^"]*)" successfully$/, async (editType: string) => {
  let ele;
  switch (editType.toLocaleLowerCase()) {
    case "renamed":
      ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, `${context().viewName} Clone Rename`);
      await expect(await element(ele)).toBeDisplayed();
      break;
    case "cloned":
      ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, `${context().viewName} Clone Clone`);
      await expect(await element(ele)).toBeDisplayed();
      break;
    case "deleted":
      ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, `${context().viewName} Clone`);
      await expect(await $(ele)).not.toBeDisplayed();
      break;
    default:
      break;
  }
})

Then(/^ui: I click on specific cell "([^"]*)" in BPAFG gantt tab$/, async (cellNumber: string) => {
  await doubleClickToElement(Selectors.bulkProjectAllocationFlatgrid.specificCellInGanttTab.replace('{{cellNumber}}', cellNumber));
});

Then(/^ui: I enter "([^"]*)" year start date as shift date and click on save in BPAFG gantt tab$/, async (year: string) => {
  let shiftDate;
  switch (year.toLowerCase()) {
    case 'current':
      shiftDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'next':
      shiftDate = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case 'previous':
      shiftDate = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default: throw Error(`Year :{${year}} is not yet supported.\nSupported values :\n1.Current\n2.Next\n3.Previous`);
  }

  await formFill([
    { locator: Selectors.bulkProjectAllocationFlatgrid.shiftDateInGanttTab, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.shiftDateInGanttTab, value: shiftDate, action: 'setValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.saveButtonInGanttTab, value: null, action: 'click' },
  ]);
  await browser.pause(SHORT_PAUSE); //Required to complete date shift
});

Then(/^ui: I verify value is displayed in specific cell "([^"]*)" in BPAFG gantt tab$/, async (cellNumber: string) => {
  const cellIndex: string[] = cellNumber.split(',');
  for (let i = 0; i < cellIndex.length; i++) {
    const ele2 = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.specificCellInGanttTab, parsing: cellIndex[i] });
    const val = (await ele2.getText()).trim();
    await context().softAssert.isTrue(!isNaN(parseInt(val)), `Value: {${val}} is not displayed`);
  }
});

Then('ui: I verify shift date is not displayed in BPAFG gantt tab', async () => {
  await context().softAssert.isFalse(await isElementDisplayed(Selectors.bulkProjectAllocationFlatgrid.shiftDateInGanttTab, SHORT_PAUSE), `Shift date is displayed in BPAFG gantt tab`);
});

Then('ui: I enter current year in start and next year start date as End date in BPAFG', async () => {
  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  await formFill([
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateInputBox, value: startDate, action: 'setValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateLabel, value: null, action: 'click' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.endDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.endDateInputBox, value: endDate, action: 'setValue' },
    { locator: Selectors.bulkProjectAllocationFlatgrid.startDateLabel, value: null, action: 'click' },
  ]);
});

Then('ui: I click on release button in BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.releaseButton);
});

Then(/^ui: I compare and verify values between FTE and gantt tab of specific task "([^"]*)" in specific cell "([^"]*)" in BPAFG$/, async (taskName: string, cellNumber: string) => {
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.specificUnit, "fte");
  await browser.pause(SHORT_PAUSE); //Required to display values
  const ele1 = await element(Selectors.bulkProjectAllocationFlatgrid.specificCellInPlannedAssignment.replace("{{taskName}}", taskName).replace("{{cellNumber}}", cellNumber));
  const fteValue = (await ele1.getText()).trim();
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.specificUnit, "gantt");
  await browser.pause(SHORT_PAUSE); //Required to display values
  const ele2 = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.specificCellInGanttTab, parsing: cellNumber });
  const ganttValue = (await ele2.getText()).trim();
  await context().softAssert.equal(fteValue, ganttValue, "Expected gantt value - " + ganttValue + " actual FTE value - " + fteValue);
});

Then(/^ui: I verify specific value "([^"]*)" is displayed in specific cell "([^"]*)" in BPAFG gantt tab$/, async (values: string, cellNumber: string) => {
  const cellIndex: string[] = cellNumber.split(',');
  const value: string[] = values.split(',');
  for (let i = 0; i < cellIndex.length; i++) {
    const ele2 = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.specificCellInGanttTab, parsing: cellIndex[i] });
    const val = (await ele2.getText()).trim();
    await context().softAssert.equal(value[i], val, "Expected value - " + value[i] + " actual value - " + val);
  }
});

Then(/^ui: I click on specific unit "([^"]*)" and verify milestone is displayed in BPAFG$/, async (unit: string) => {
  const val: string[] = unit.split(',');
  for (let i = 0; i < val.length; i++) {
    switch (val[i].toLowerCase()) {
      case "time":
      case "cost":
      case "fte":
      case "ftep":
      case "manday":
      case "gantt":
        const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.specificUnit, parsing: val[i].toLowerCase() });
        await ele.click();
        break;
      default:
        throw new Error(`Unit:${val[i]} is not supported.\nSupported Values:\n1.Time\n2.Cost\n3.FTE\n4.FTEP\n5.Manday\n6.Gantt`);
    }
    context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificMilestoneLink, context().milestoneSetup.name)), `Specific milestone : {${context().milestoneSetup.name} is not displayed in BPAFG}`);
  }
});

Then(/^ui: I verify specific column header "([^"]*)" is displayed in BPAFG$/, async (columnHeader: string) => {
  context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeader, columnHeader)), `Specific column header : {${columnHeader} is not displayed in BPAFG}`);
});

Then(/^ui: I verify specific column header "([^"]*)" is not displayed in BPAFG$/, async (columnHeader: string) => {
  context().softAssert.isFalse(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeader, columnHeader)), `Specific column header : {${columnHeader} is displayed in BPAFG}`);
});

Then(/^ui: I search specific column attribute "([^"]*)" and "(pin|unpin)" in BPAFG$/, async (columnAttribute: string, value: string) => {
  await (await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown)).setValue(columnAttribute);
  const ele = await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificPinnedColumnAttribute, columnAttribute));
  switch (value.toLowerCase()) {
    case "pin":
      if (!ele) {
        await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.specificColumnAttributeToPin, columnAttribute);
      }
      break;
    case "unpin":
      if (ele) {
        await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.specificColumnAttributeToPin, columnAttribute);
      }
      break;
    default: throw Error(`Value :{${value}} is not yet supported.\nSupported values :\n1.Pin\n2.Unpin`);
  }
  await browser.pause(SHORT_PAUSE); //Required to pin|unpin value
});

Then(/^ui: I dragdrop from cell "([^"]*)" to cell "([^"]*)" in BPAFG gantt tab$/, async (dragCellNumber: string, dropCellNumber: string) => {
  const ele1 = Selectors.bulkProjectAllocationFlatgrid.specificCellInGanttTab.replace('{{cellNumber}}', dragCellNumber);
  const ele2 = Selectors.bulkProjectAllocationFlatgrid.specificCellInGanttTab.replace('{{cellNumber}}', dropCellNumber);
  await clickToElement(ele1);
  await elementDragAndDrop(ele1, ele2);
  await browser.pause(SHORT_PAUSE); // required to dragdrop.
});

Then('ui: Un-select all options of Filter by Resource Request Status in Grid options of BPAFG', async () => {
  for (let i = 1; i <= 4; i++) {
    const optionInputElement = await element(`(//div[@class="bpafg-options-row-column"]//label//input)[${i}]`);
    if (await isElementSelected(optionInputElement)) {
      await optionInputElement.click();
    }
  }
});

Then(/^ui: Enter "([^"]*)" hours for resource to project in Month mode for current year in BPAFG$/, async (hoursToBeAllocated: string) => {
  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  for (let i = 0; i < betweenMonths.length; i++) {
    await BPAFG.enterValueForSpecificCellOfProjectOrTaskOrResource(context().resourceSetup.name, betweenMonths[i], hoursToBeAllocated);

  }
});

Then(/^ui: Verify if all cells for resource in Month mode for current year has value "([^"]*)" in BPAFG$/, async (expectedValue: string) => {
  const locator = Selectors.bulkProjectAllocationFlatgrid.specificProjectOrResourceOrTaskAllocationCellByColumnNameForPlannedWhenBothPlannedAndActualIsSelected.replace('{{resourceOrTaskOrProjectName}}', context().resourceSetup.name);
  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  for (let i = 0; i < betweenMonths.length; i++) {
    let actualValue = await (await element(locatorParse(locator, betweenMonths[i]))).getText();
    context().softAssert.equal(actualValue, expectedValue, `Resource:{${context().resourceSetup.name}} has incorrect value for column #${betweenMonths[i]} in BPAFG`)
  }
});

Then('ui: Click on Add Assignment button in BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignmentButton);
});

Then('ui: Click on Choose Project dropdown in Add Assignment modal of BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignment.chooseProjectsDropdown);
});

Then('ui: Click on Choose Resource dropdown in Add Assignment modal of BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignment.chooseResourcessDropdown);
});

Then('ui: Click on Choose Task dropdown in Add Assignment modal of BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignment.chooseTasksDropdown);
});

Then('ui: Search and Select recently created Project in Add Assignment modal of BPAFG', async () => {
  const { name } = context().projectSetup;
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.addAssignment.searchProjectInputBox, name);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(`(${Selectors.common.dropdownValues})[2]//*[normalize-space(text())='${name}']`);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Search and Select recently created Resource in Add Assignment modal of BPAFG', async () => {
  const { name } = context().resourceSetup;
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.addAssignment.searchResourceInputBox, name);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(`(${Selectors.common.dropdownValues})[2]//*[normalize-space(text())='${name}']`);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Search and add the task from Project model in Add Assignment modal of BPAFG', async () => {
  const { taskName } = context().projectSetup;
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.addAssignment.searchTaskInputBox, taskName);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignment.addNewTaskButton);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(`(${Selectors.common.dropdownValues})[2]//*[normalize-space(text())='${taskName}']`);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Click on Add new assignment button in add assignment modal of BPAFG', async () => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignment.addNewAssignmentButton);
});

Then('ui: Verify if recently added task is displayed in BPAFG Grid', async () => {
  const { taskName } = context().projectSetup;
  const taskNameElement = await isElementDisplayed((Selectors.bulkProjectAllocationFlatgrid.specificCellInPlannedAssignment)
    .replace("{{taskName}}", taskName).replace("{{cellNumber}}", "1"));
  await context().softAssert.isTrue(taskNameElement, `Task:{${taskName}} was not found in BPAFG`);
});

Then('ui: Select the select all resources checkbox if not already selected in BPAFG', async () => {
  const chkSelectAllResourceCheckboxElement = await element(Selectors.bulkProjectAllocationFlatgrid.chkSelectAllResource);
  await chkSelectAllResourceCheckboxElement.click();
  if (!await isElementSelected(chkSelectAllResourceCheckboxElement))
    await chkSelectAllResourceCheckboxElement.click();
});

Then(/^ui: I click on select attribute "([^\"]*)" and validate no error message is displayed$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    const ele = await locatorParse(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeader, attributes[i]);
    await $(ele).moveTo();
    await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.specificColumnHeader, attributes[i]);
    const ele1 = await isElementDisplayed(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "Server error"), SHORT_PAUSE);
    const ele2 = await isElementDisplayed(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "An error"), SHORT_PAUSE);
    await assert.isNotTrue(ele1, `The client or server error warning message is displayed`);
    await assert.isNotTrue(ele2, `The client or server error warning message is displayed`);
    // To deselect the attribute header
    await clickToElement(Selectors.siteHeader.ddProfile);
    await clickToElement(Selectors.siteHeader.ddProfile);
  }
});

Then('ui: I verify that the Assignment total option is not present in the Options list', async () => {
  await context().softAssert.isFalse(await isElementDisplayed(Selectors.bulkProjectAllocationFlatgrid.showTotalColumnOption), `The Assignment Total option is still present inside the options list`);
})

Then(/^ui: I verify that the "([^"]*)" option is displayed in the grid$/, async (attributeName: string) => {
  if (attributeName === "Newly Created Attribute") {
    attributeName = context().attribute1
  }
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.assignmentTotalColumn, attributeName)), `The column ${attributeName} is not displayed in the grid`);
})

Then(/^ui: I pin the "([^"]*)" option in insert columns$/, async (optionName: string) => {
  if (optionName !== "Newly Attribute Created") {
    const ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.pinIconAttributeinInsetColumn, optionName)
    await clickToElement(ele);
  }
  else if (optionName === "Newly Attribute Created") {
    const ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.pinIconAttributeinInsetColumn, context().attribute1)
    await clickToElement(ele);
  }
})

Then(/^ui: I verify that the "([^"]*)" option is "(UnPinned|Pinned)" in the grid$/, async (optionName: string, pinStatus: string) => {
  if (optionName === "Newly Created Attribute") {
    optionName = context().attribute1
  }
  await browser.execute((scrollPosition) => {
    window.scrollTo(scrollPosition, 0);
  }, 900);
  const ele = await isElementDisplayed(locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateColumnName, optionName));
  await browser.pause(2000);
  if (pinStatus === "Pinned") {
    await context().softAssert.isTrue(ele, `The ${optionName} option is not Pinned in the grid`)
  }
  else if (pinStatus === "unpinned") {
    await context().softAssert.isNotTrue(ele, `The ${optionName} option is Pinned in the grid`)
  }
})

Then(/^ui: I verify if "([^"]*)" is "(unpinned|pinned)"$/, async (attributeName: string, attributeStatus: string) => {
  if (attributeName === "created attribute") {
    attributeName = context().attribute1
  }
  const ele = locatorParse(Selectors.bulkProjectAllocationFlatgrid.pinIconAttributeinInsetColumn, attributeName)
  await browser.pause(3000)
  const color = (await getElementColor(ele)).toString();
  switch (attributeStatus) {
    case 'pinned':
      await context().softAssert.equal(color, "#d36b3f", `Attribute is ${attributeStatus}, kindly check again`);
      break;
    case 'unpinned':
      await context().softAssert.notEqual(color, "#d36b3f", `Attribute is ${attributeStatus}, kindly check again`);
      break;
    default:
      throw new Error(`Given attribute name ${attributeStatus} is not present`);
  };
})

Then(/^ui: I toggle "([^"]*)" to "([^"]*)" in BPAFG Options$/, async (optionName: string, toggleState: string) => {
  let color;
  switch (optionName) {
    case 'net avaliability':
      color = (await getElementBackgroundColor(Selectors.bulkProjectAllocationFlatgrid.tglShowNetAvaliability)).toString();
      if (color == '#6787a2' && toggleState.toLowerCase() == "on") {
        await (await element(Selectors.bulkProjectAllocationFlatgrid.tglShowNetAvaliability)).click();
      } else if (color != '#6787a2' && toggleState.toLowerCase() == "off") {
        await (await element(Selectors.bulkProjectAllocationFlatgrid.tglShowNetAvaliability)).click();
      }
      break;
    case 'allocation':
      color = (await getElementBackgroundColor(Selectors.bulkProjectAllocationFlatgrid.tglShowAllocation)).toString();
      if (color == '#6787a2' && toggleState.toLowerCase() == "on") {
        await (await element(Selectors.bulkProjectAllocationFlatgrid.tglShowAllocation)).click();
      } else if (color != '#6787a2' && toggleState.toLowerCase() == "off") {
        await (await element(Selectors.bulkProjectAllocationFlatgrid.tglShowAllocation)).click();
      }
      break;
    default:
      break;
  }

});

Then(/^ui: I validate that the "([^"]*)" row is "(not present|present)" when "([^"]*)" is selected in groupby dropdown in the grid$/, async (rowname: string, rowState: string, groupByValue: string) => {
  let name;
  if (groupByValue == "resource option") {
    name = context().resourceSetup.name;
  } else {
    name = context().projectSetup.name;
  }
  await browser.pause(MEDIUM_PAUSE);
  if(await isElementDisplayed('//button[contains(@class,"can-expand")]')) {
    await clickToElement('//button[contains(@class,"can-expand")]');
  }
  if (rowState === 'present') {
    await expect(await $(`//td[text()="${rowname}"]`)).toBeDisplayed();
  } else {
    await expect(await $(`//td[text()="${rowname}"]`)).not.toBeDisplayed();
  }
});

Then(/^ui: I check for the value of "([^"]*)" "([^"]*)" cost changed in the grid$/, async (rowName: string, state: string) => {
  if (state === 'before') {
    const beforeValue = await (await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.validateRowFieldValue, parsing: rowName })).getText();
    context().numbericValueBefore = parseInt(beforeValue.replace(/\D/g, ''), 10);
  }
  else if (state === 'after') {
    const afterValue = await (await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.validateRowFieldValue, parsing: rowName })).getText();
    context().numbericValueAfter = parseInt(afterValue.replace(/\D/g, ''), 10);
  }
});

Then(/^I validate the value of "([^"]*)" to be not same$/, async (rowName: string) => {
  if (context().numbericValueBefore == context().numbericValueAfter) {
    throw Error(`The value of ${rowName} is same after the value is changed`);
  }
});

Then(/^I select "([^"]*)" from the groupby dropdown in BPAFG$/, async (optionName: string) => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.groupByDropdown);
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.searchGroupByOption, optionName);
  await hitEnter();
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.groupByDropdown);
});

Then(/^ui: I validate that the fields in "([^"]*)" row are empty$/, async (rowName: string) => {
  const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.validateRowFieldValue, parsing: rowName });
  const text = await ele.getText();

  // Check if the element is null or empty
  if (!(text === null || text.trim() === '')) {
    throw new Error(`The ${rowName} has field which contains value`);
  }
});


Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA in BPAFG$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BPAFG.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA in BPAFG$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BPAFG.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Verify end date is "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA in BPAFG$/, async (dateToBeVerified: string, monthName: string) => {
  let expectedDate;
  switch (dateToBeVerified) {
    case "first":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeVerified:${dateToBeVerified} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  const actualEndDate = await (await element(Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.endDate)).getValue();
  await assert.equal(actualEndDate, expectedDate, "End date of 'Date Range Filter' in Grid options of NA was incorrect");
});


Then('ui: Clear dates of Date Range Filter in Grid options of NA in BPAFG', async () => {
  await BPAFG.enterStartDateInOptionsSection('');
  await BPAFG.enterEndDateInOptionsSection('');
});


Then('ui: Verify dates of Date Range Filter in Grid options of NA are empty in BPAFG', async () => {
  const actualEndDate = await (await element(Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.endDate)).getValue();
  const actualStartDate = await (await element(Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.startDate)).getValue();

  await assert.equal(actualStartDate, '', "Start date of 'Date Range Filter' in Grid options of NA was not empty");
  await assert.equal(actualEndDate, '', "End date of 'Date Range Filter' in Grid options of NA was not empty");

});

Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of previous year in Grid options of NA in BPAFG$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BPAFG.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of next year in Grid options of NA in BPAFG$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().add(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().add(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BPAFG.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Verify start date is "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA in BPAFG$/, async (dateToBeVerified: string, monthName: string) => {
  let expectedDate;
  switch (dateToBeVerified) {
    case "first":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeVerified:${dateToBeVerified} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  const actualstartDate = await (await element(Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.startDate)).getValue();

  await assert.equal(actualstartDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
});

Then(/^ui: Verify start date is month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA in BPAFG$/,async (monthName: string) => {
  let expectedDate = moment(`${monthName} ${moment().year()}`, "MMMM YYYY").startOf('month').format("MMM");
  const actualEndDate = await (await elementParse({locatorString: Selectors.projectManagement.buildTeam.netAvailability.startMonth, parsing: monthName})).getValue();
  await assert.equal(actualEndDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
  
});

Then(/^ui: Verify end date is month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA in BPAFG$/,async (monthName: string) => {
  let expectedDate = moment(`${monthName} ${moment().year()}`, "MMMM YYYY").startOf('month').format("MMM");
  const actualEndDate = await (await elementParse({locatorString: Selectors.projectManagement.buildTeam.netAvailability.endMonth,parsing: monthName})).getValue();
  await assert.equal(actualEndDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
});

Then('ui: I click on dynamic date options in BPAFG',async() => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.dynamicDate)
});

Then(/^ui: Select option "([^"]*)" and check net availability grid in BPAFG$/,async (dateOptions: string) => {
  await elementParseAndClick(Selectors.projectManagement.buildTeam.gridOptions.btn.txtDynamicDate, dateOptions)
});

Then('ui: I validate date is set automatically to current qtr of the month in BPAFG', async () => {
  const endOfQtr = moment().endOf('quarter').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el2 = await element('(//div[@class="rgHeaderCell"]//div/span)[3]');
  const endDate = await el2.getText();
  expect(endDate).toContain(endOfQtr);
});

Then('ui: I validate date is set automatically to next qtr of the month in BPAFG', async () => {
  const nextQtrEndOfTheMonth = moment().add({ quarter: 1 }).endOf('quarter').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('//div[@class="rgHeaderCell"]//div/span')
  const endDate = await el.getText();
  expect(endDate).toContain(nextQtrEndOfTheMonth);
});

Then('ui: I validate date is set automatically to end of the year in BPAFG', async () => {
  const endOfTheYear = moment().endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('(//div[@class="rgHeaderCell"]//div/span)[12]')
  const endDate = await el.getText();
  expect(endDate).toEqual(endOfTheYear);
});

Then('ui: I validate date is set automatically to next year end of the year in BPAFG', async () => {
  const nextYearEnd = moment().add({ year: 1 }).endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('//div[@class="rgHeaderCell"]//div/span')
  const endDate = await el.getText();
  expect(endDate).toEqual(nextYearEnd);
});

Then('ui: I validate date is set automatically to next three year end of the year in BPAFG', async () => {
  const nextThreeYearEnd = moment().add({ year: 3 }).endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('//div[@class="rgHeaderCell"]//div/span')
  const endDate = await el.getText();
  expect(endDate).toEqual(nextThreeYearEnd);
});

Then('ui: I click on edit button of specific resource in BPAFG',async() => {
  const resourceName = context().resourceSetup.name;
  await elementParseAndClick('(//a[text()="{{resourceName}}"]/parent::td/preceding-sibling::th//span[@class="bpafg-icon menu-icon bpafg-context-menu"])[2]', resourceName);
});

// sort - selector issue
Then(/^ui: I sort "(Start|End)" Date in "(ascending|descending)" order$/,async(dateToBeVerified:string,sortOrder:string) => { 
  switch(dateToBeVerified) {
    case "Start":
      switch(sortOrder){
        case "ascending":
          await expect(await mayBeElement('//span[@data-tooltip="Start Date"]/../../following-sibling::span/span[@class="bpafg-column-sort desc"]')).toBeTruthy()
          const el1 = await $('//div[@class="ht_master handsontable"]//span[@data-tooltip="Start Date"]')
          await el1.click()
          break;
        case "descending":
          const el2 = await $('//div[@class="ht_master handsontable"]//span[@data-tooltip="Start Date"]')
          await el2.click()
      }  
    case "End":
      switch(sortOrder){
        case "ascending":
          await mayBeElement('//span[@data-tooltip="End Date"]/../../following-sibling::span/span[@class="bpafg-column-sort desc"]')
          await clickToElement('//div[@class="ht_master handsontable"]//span[@data-tooltip="Start Date"]');
          break;
        case "descending":
          await clickToElement('//div[@class="ht_master handsontable"]//span[@data-tooltip="Start Date"]')
      }  
  }
});

Then(/^ui: I validate "(Start|End)" Date is sorted in "(ascending|descending)" order$/,async(dateFormat:string,sortOrder:string)=>{
  
  switch(dateFormat) {
    case "Start":
      const el1 = await element('//span[@data-tooltip="Start Date"]');
      await el1.moveTo()
      switch(sortOrder){
        case "ascending":
          await mayBeElement('//span[@data-tooltip="Start Date"]/../../following-sibling::span/span[@class="bpafg-column-sort asc"]');
          break;
        case "descending":
          await mayBeElement('//span[@data-tooltip="Start Date"]/../../following-sibling::span/span[@class="bpafg-column-sort desc"]')
      }  
    case "End":
      const el2 = await element('//span[@data-tooltip="End Date"]');
      await el2.moveTo()
      switch(sortOrder){
        case "ascending":
          await mayBeElement('//span[@data-tooltip="End Date"]/../../following-sibling::span/span[@class="bpafg-column-sort asc"]');
          break;
        case "descending":
          await mayBeElement('//span[@data-tooltip="End Date"]/../../following-sibling::span/span[@class="bpafg-column-sort desc"]')
      }  
  }
});

Then('ui: Click on export icon in the BPAFG grid section',async() => {
  await clickToElement('//button[contains(@class,"export__button")]')
});

Then(/^ui: I hover on "(Start|End)" Date header$/,async(dateToBeHovered:string) => {
  switch(dateToBeHovered){
    case 'Start':
      const el1 = await element('//span[@data-tooltip="Start Date"]');
      await el1.moveTo()
      // await clickToElement('//div[@class="ht_master handsontable"]//span[@data-tooltip="Start Date"]')
      break;
      case 'End':
        const el2 = await element('//span[@data-tooltip="End Date"]');
        await el2.moveTo()
        break;
    
  }
});

Then(/^ui: I click on column filter of "(Start|End)" Date$/,async(date:string)=>{
  switch(date){
    case 'Start':
      const el1 = await element('//span[@data-tooltip="Start Date"]/../../following-sibling::span/span[contains(@class,"column-filter")]');
      await el1.moveTo()
      await clickToElement('(//span[@data-tooltip="Start Date"]/../../following-sibling::span/span[contains(@class,"column-filter")])[2]');
      break;
    case 'End':
      const el2 = await element('//span[@data-tooltip="End Date"]/../../following-sibling::span/span[contains(@class,"column-filter")]');
      await el2.moveTo()
      await clickToElement('(//span[@data-tooltip="End Date"]/../../following-sibling::span/span[contains(@class,"column-filter")])[2]');
      break;
  }
});

Then(/^ui: I click on "([^"]*)" column filter$/,async(filter:string) => {
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.columnFilter.filterToggle,filter)
});

Then(/^ui: I select "([^"]*)" as filter and validate applied filter$/,async(filter:string)=> {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.inputBtn);
  // await slowInputFilling('//span[@class="k-input"]',filter);
  // await elementParseAndClick(`//span[@class="k-input" and text()="{{filter}}"]`,filter);
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.columnFilter.filterDropdown,filter)
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.acceptBtn)
});

Then(/^ui: I clear selected column filters of "(Start|End)" date$/,async(date:string)=> {
  switch(date){
    case 'Start':
      const el1 = await element(Selectors.bulkProjectAllocationFlatgrid.columnFilter.hoverStartDate);
      await el1.moveTo()
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.filterStartDate);
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.clearBtn);
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.acceptBtn);
      break;
    case 'End':
      const el2 = await element(Selectors.bulkProjectAllocationFlatgrid.columnFilter.hoverEndDate);
      await el2.moveTo()
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.filterEndDate);
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.clearBtn);
      await clickToElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.acceptBtn);
      break;
  }
});

Then('ui: I click on Group by dropdown in BPAFG',async() => {
  await BPAFG.clickOnGroupByDropdown()
});

Then(/^ui: I uncheck and select attributes "([^"]*)" in group by dropdown in BPAFG$/,async(attribute:string) => {
  await BPAFG.uncheckSelectAllCheckbox();
  await BPAFG.searchAndGroupBy(attribute)
});

Then(/^ui: I validate data is grouped by "(Start Date|End Date)" attribute$/,async(date:string)=> {
  switch(date){
    case 'Start Date':
      const el1 = await element(Selectors.bulkProjectAllocationFlatgrid.columnFilter.attrStartDate)
      await el1.waitForExist({timeout:3000})
      await expect(await mayBeElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.attrStartDate)).toBeTruthy()
      break;
    case 'End Date':
      const el2 = await element(Selectors.bulkProjectAllocationFlatgrid.columnFilter.attrEndDate)
      await el2.waitForExist({timeout:3000})
      await expect(await mayBeElement(Selectors.bulkProjectAllocationFlatgrid.columnFilter.attrEndDate)).toBeTruthy()
      break;
  }
});

Then(/^ui: Softassert if exported csv file got downloaded in directory:"([^"]*)" under project's root directory with extension "([^"]*)" for "([^"]*)" tab$/, async (folderName: string, fileExtension: string, tabView: string) => {
  const expectedFileName = `${tabView} - ${moment().format('MMM_DD_YYYY')}.${fileExtension}`;

  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then('ui: I scroll till bottom of the page',async()=>{
  await browser.execute(() => {
    // Scroll to the maximum vertical scroll position
    window.scrollTo(0, document.body.scrollHeight);
  })
});

Then('ui:I click on project name and validate no error is displayed',async() => {
  const { name: projectName } = context().projectSetup;
  elementParseAndClick('/td//a[text()="{{projectName}}"]',projectName)
  await expect(await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "Server error"), SHORT_TIMEOUT * 3)).toBeFalsy();
  await expect(await mayBeElement(locatorParse(Selectors.common.errorMessagesSlideDownFromBottom + "//*[contains(text(),\"{{warningMessage}}\")]", "An error"), SHORT_TIMEOUT)).toBeFalsy();
});

Then('ui: Click on expand icon in BPAFG grid',async() => {
  if(await isElementDisplayed('//button[@class="button-material bpaflat-expandall-button m-r1 can-expand"]')) {
    await clickToElement('//button[@class="button-material bpaflat-expandall-button m-r1 can-expand"]')
  };
});


Then('ui: I scroll to the recently created project and click on it', async () => {
  await browser.pause(SHORT_PAUSE)
  await $(await locatorParse(Selectors.bulkProjectAllocationFlatgrid.selectProjectByName+'[1]', context().projectSetup.name)).scrollIntoView();
  await $(await locatorParse(Selectors.bulkProjectAllocationFlatgrid.selectProjectByName+'[1]', context().projectSetup.name)).moveTo();
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.selectProjectByName+'[2]', context().projectSetup.name);
  await assert.isTrue(await isElementDisplayed(await locatorParse(Selectors.projectManagement.specificProjectNameInputBox, context().projectSetup.name)), `Project: {${context().projectSetup.name}} is still not opened and displayed`);
});

Then('ui: I click on attribute entity of project',async() => {
  await elementParseAndClick('(//a[text()="{{name}}"]/following-sibling::span[@class="attributes-dialog"])[2]',context().projectSetup.name)
});

Then('ui: I validate new view is not created',async() => {
  await mayBeElement(Selectors.bulkProjectAllocationFlatgrid.defaultView)
})

Then('ui: Click on Allow new resources checkbox in Add Assignment modal of BPAFG', async () => {
  await clickToElement('//input[@class="all-checkbox_input"]');
  await browser.pause(SHORT_PAUSE / 2);
})

Then('ui: Select random resource in Add Assignment modal of BPAFG', async () => {
  await clickToElement('//div[@class="k-popup k-child-animation-container"]//ul/div[1]');
  await browser.pause(SHORT_PAUSE / 2);
})

Then('ui: Verify Generic task should not be case sensitive in add new assignment', async () => {
  const { taskName } = context().projectSetup;
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.addAssignment.chooseTasksDropdown);

  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.addAssignment.searchTaskInputBox, 'generic');
  await browser.pause(SHORT_PAUSE / 2);
  await assert.isTrue(await isElementDisplayed(`(${Selectors.common.dropdownValues})[2]//*[normalize-space(text())='Generic']`), `Task: {Generic} is still not opened and displayed`);

  await browser.pause(SHORT_PAUSE);
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.addAssignment.searchTaskInputBox, taskName.toLowerCase());
  await browser.pause(SHORT_PAUSE / 2);
  await assert.isTrue(await isElementDisplayed(`(${Selectors.common.dropdownValues})[2]//*[normalize-space(text())='${taskName}']`), `Task: {${taskName}} is still not opened and displayed`);
})

Then(/^ui: Switch Exceeded capacity toggle "([^"]*)" in BPAFG$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.bulkProjectAllocationFlatgrid.exceedCapacityToggle)).toString();
  if (color == GenericColorCodes.BPAFGToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.bulkProjectAllocationFlatgrid.exceedCapacityToggle)).click();
  } else if (color != GenericColorCodes.BPAFGToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.bulkProjectAllocationFlatgrid.exceedCapacityToggle)).click();
    
  }
  await browser.pause(SHORT_PAUSE)
});

Then('ui: I verify Warning icon must be displayed beside the resource name in BPAFG',async () => {
  const ele = await isElementDisplayed(Selectors.bulkProjectAllocationFlatgrid.exceedCapacityWarningIconOfSpecificResourceAndProject.replace("{{projectName}}", context().projectSetup.name).replace("{{resourceName}}", context().resourceSetup.name));
  await context().softAssert.isTrue(ele, `Warning icon is still not yet displayed`);
  });
  
  Then('ui: I click on warning icon showing beside Resource in BPAFG',async() => {
    await clickToElement(Selectors.bulkProjectAllocationFlatgrid.exceedCapacityWarningIconOfSpecificResourceAndProject.replace("{{projectName}}", context().projectSetup.name).replace("{{resourceName}}", context().resourceSetup.name));
  });
  
  Then('ui: Verify that warning alert has the exceeded capacity Time and FTE Values in BPAFG',async() => {
    await expect(await mayBeElement(Selectors.projectManagement.sPA.warningCapacityMsg.alertTitle)).toBeTruthy()
    await expect(await mayBeElement(Selectors.projectManagement.sPA.warningCapacityMsg.alertText)).toBeTruthy()
  });

  Then(/^ui: I enter allocation value as "([^"]*)" for date "([^"]*)" in BPAFG if start date is "([^"]*)"$/, async (resourceCapacityToBeEntered: string, allocationUpdateDate: string, startDate: string) => {
    const resourceName = context().resourceSetup.name;
    await browser.pause(MEDIUM_PAUSE/2);

    const allocationDate = moment(allocationUpdateDate, 'DD-MM-YYYY');
    const allocatedStartDate = moment(startDate, 'DD-MM-YYYY');
  
    // const index = allocationDate.diff(allocatedStartDate, 'days') + 1; // Add 1 to include both start and end dates
    const cellLocator = await locatorParse('//div[@class="wtHider"]//table[@class="htCore"]//td[{{index}}]', 4 + "");
  
    await clickToElement(cellLocator);
    await browser.pause(SHORT_PAUSE / 2);
    
    const allocationValue = await $(cellLocator).getText();
    for (let i = 0; i < allocationValue.length; i++) {
      await browser.keys(['Backspace']);
    }
  
    await browser.keys(resourceCapacityToBeEntered);
  });

  Then('ui: I update dominant unit value to non dominant unit value in assignment in BPAFG',async() => {
    await formFill([
      {locator:Selectors.bulkProjectAllocationFlatgrid.ddAssignmentSelectionValue,value:null,action:'click'},
      {locator:Selectors.projectManagement.sPA.ddValueAssignment,value:null,action:'click'}
    ])
  });

  Then(/^ui: Allocate "([^"]*)" hours for resource to project in BPAFG in "([^"]*)" mode for current year$/, async (hoursToBeAllocated: string, modeOfEntry: string) => {
    const resourceName = context().resourceSetup.name;
  
    const startDate = moment().startOf('year');
    const endDate = moment().endOf('year');
    const numberOfColumns = [];
    if(modeOfEntry == 'Year') {
      let date = startDate.clone(); // Use clone() to avoid modifying startDate directly
      while (date.isSameOrBefore(endDate, 'year')) {
        numberOfColumns.push(date.year());
        date.add(1, 'year');
      }
    } else if(modeOfEntry == 'Month') {
      if (startDate < endDate) {
        const date = startDate.startOf('month');
        while (date < endDate.endOf('month')) {
          numberOfColumns.push(date.format(DateFormats.MonthYearFormat2));
          date.add(1, 'month');
        }
      }
    }
  
    for (let i = 0; i < numberOfColumns.length; i++) {
      const ele = Selectors.bulkProjectAllocationFlatgrid.allocateValueToResource.replace('{{resourceName}}', resourceName);
      await elementParseAndClick(ele, `${i+4}`);
      await browser.pause(SHORT_PAUSE / 2);
      await browser.keys(hoursToBeAllocated);
      await hitEnter();
    };
    
  });

  Then(/^ui: Validate "([^"]*)" hours for resource to project in BPAFG in "([^"]*)" mode for current year$/, async (hoursToBeAllocated: string, modeOfEntry: string) => {
    const resourceName = context().resourceSetup.name;
    const dataArray = hoursToBeAllocated.split(',');
  
    const startDate = moment().startOf('year');
    const endDate = moment().endOf('year');
    const numberOfColumns = [];
    if(modeOfEntry == 'Year') {
      let date = startDate.clone(); // Use clone() to avoid modifying startDate directly
      while (date.isSameOrBefore(endDate, 'year')) {
        numberOfColumns.push(date.year());
        date.add(1, 'year');
      }
    } else if(modeOfEntry == 'Month') {
      if (startDate < endDate) {
        const date = startDate.startOf('month');
        while (date < endDate.endOf('month')) {
          numberOfColumns.push(date.format(DateFormats.MonthYearFormat2));
          date.add(1, 'month');
        }
      }
    }
  
    for (let i = 0; i < numberOfColumns.length; i++) {
      const ele = Selectors.bulkProjectAllocationFlatgrid.allocateValueToResource.replace('{{resourceName}}', resourceName);
      const ele2 = await $(await locatorParse(ele, `${i+4}`)).getText();
      await browser.pause(SHORT_PAUSE / 2);
      const value = ele2.replace(/,|\s+/g, "");
    await context().softAssert.equal(value, dataArray[i], `Column: ${numberOfColumns[i]} donot contain the updated value in BPAFG`);
    };
    
  });

Then('ui: I verify if the assignment id associated with project is same as the one on SPA', async () => {
  const ele = await $(await locatorParse('//div[@class="ht_master handsontable"]//*[normalize-space(.)="{{projectName}}"]/following-sibling::td[2]', context().projectSetup.name)).getText();
  await context().softAssert.equal(ele, context().assignmentId, `BPAFG: Assignment Id {${ele}} for Project {${context().projectSetup.name}} is not same as per SPA {${context().assignmentId}}`)
})

Then(/^ui: Click on meatballs icon of recently created project and resource and select option "([^"]*)" in BPAFG for multiple resources$/, async (
  optionToBeSelected: string,
) => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.meatballsIconOfSpecificResourceAndProject.replace("{{projectName}}", context().projectSetup.name).replace("{{resourceName}}", context().resource1));
  switch (optionToBeSelected.trim().toLowerCase()) {
    case "resource replace advanced":
      await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, 'Resource replace advanced'));
      break;
    default:
      throw new Error(`Invalid option:${optionToBeSelected}\nSupported Values:\n1.Resource replace advanced`);
  }
});

Then('ui: I verify if the new assignment id is associated with the 2nd resource replaced with the old assignment id of 1st resource', async () => {
  const resources: string[] = [context().resource1, context().resource2];
  let locatorValueForResource, locatorAssignementTotalValue;
  const assignmentValuesForResource: string[] = [];
  const assignmentTotalForResources: string[] = [];
  for (let i = 0; i < resources.length; i++) {
  locatorValueForResource = Selectors.bulkProjectAllocationFlatgrid.getAssignmentIdForResource.replace("{{projectName}}", context().projectSetup.name).replace("{{resourceName}}", resources[i]);
  locatorAssignementTotalValue = Selectors.bulkProjectAllocationFlatgrid.getAssignmentTotalForResource.replace("{{projectName}}", context().projectSetup.name).replace("{{resourceName}}", resources[i]);
  const assignmentValue: string = await $(locatorValueForResource).getText();
  const assignmentTotalValue: string = await $(locatorAssignementTotalValue).getText();

  assignmentValuesForResource.push(assignmentValue);
  assignmentTotalForResources.push(assignmentTotalValue);  
  }
  await context().softAssert.equal(assignmentTotalForResources[0], '0', `${assignmentTotalForResources[0]}`);
  await context().softAssert.equal(assignmentTotalForResources[1], '1100', `${assignmentTotalForResources[1]}`);

  await context().softAssert.equal(assignmentValuesForResource[0], context().assignmentId, `${assignmentValuesForResource[0]}, ${context().assignmentId}`);
  await assert.include(assignmentValuesForResource[1], 'New Assignment', `${assignmentValuesForResource[1]}, ${context().assignmentId}`);
})
