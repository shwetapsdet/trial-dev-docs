import { Then } from '@cucumber/cucumber';
import {
  clearTextUsingBackspace, hitEnter, elementParse, elementDragAndDrop, elementParseAndClick, clickToElement, element,
  elementGetText, isElementDisplayed, locatorParse, selectFromDropdown, slowInputFilling, doubleClickToElement, findAndSetValue, getElementBackgroundColor, mayBeElement
} from '../../../core/func';
import Selectors from '../../../core/selectors';
import { context } from '../../../utils/context';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../core/timeouts';
import { assert } from 'chai';
import { Model } from '../../../helpers/Model.helper';
const moment = require('moment');
import { waitForFileToDownload } from '../../../core/fileUtilities';
const path = require('path');


Then(/^ui: Click ellipsis icon against recently created project in Tempus model and select option: "(Clone|Exclude|Lock|Opportunity Map|Split)"$/, async (optionToBeSelected: string) => {
  await selectFromDropdown({
    dropdownOpener: locatorParse(Selectors.tempus.modelView.projectGantt.specificProjectEllipsisIcon, context().projectSetup.name),
    dropdownSelection: locatorParse(Selectors.tempus.common.dropdownSpecificValue, optionToBeSelected),
  });
});

Then('ui: Enter project name in Clone popup of a Tempus model', async () => {
  context().projectSetup.cloneName = context().projectSetup.name + "_Clone";
  const projectNameInputbox = await element(Selectors.tempus.modelView.clonePopUp.projectNameInputbox);
  await clearTextUsingBackspace(projectNameInputbox);
  await projectNameInputbox.setValue(context().projectSetup.name + `_Clone`);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Verify if cloned project is displayed in Project Gantt area of a Tempus model', async () => {
  await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.tempus.modelView.clonePopUp.projectNameInputbox, context().projectSetup.name + `_Clone`)));
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Click on Expand all in Resource Grid area of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.resourceGrid.expandAllIcon);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Softassert if all 3 CF values are displayed in Resource Grid area of a Tempus model', async () => {
  for (let i = 1; i <= context().attributesSetup.length; i++) {
    const actualValue = await elementGetText(locatorParse(Selectors.tempus.modelView.resourceGrid.specificLevelCFValue, i + ''));
    await context().softAssert.equal(actualValue, context().attributesSetup[i - 1].selectionValues[0],
      `CF: {${context().attributesSetup[i - 1]}}'s value was incorrect in for level: {${i}} in Resource Grid area of a Tempus model`);
    await browser.pause(SHORT_PAUSE);
  }
});

Then('ui: I toggle On the Limited Assigned Resource option from setting in resource Grid', async () => {
  await clickToElement(Selectors.tempus.modelView.resourceGrid.buttonLimitToAssignResource);
});

Then('ui: I click on Setting button in resource grid', async () => {
  await clickToElement(Selectors.tempus.modelView.resourceGrid.settingButton);
});

Then(/^ui: I click on filter button in "(upper|lower)" section of model$/, async (sectionLevel: string) => {
  if (sectionLevel == 'upper') {
    await clickToElement(Selectors.tempus.modelView.filter.buttonFilterProjectview + '[1]');
  }
  else {
    await clickToElement(Selectors.tempus.modelView.filter.buttonFilterProjectview + '[2]');
  }
});

Then('ui: I search and select the recently created project in gantt tab', async () => {
  await slowInputFilling(Selectors.tempus.modelView.filter.searchProject, context().projectSetup.name);
  await elementParseAndClick(Selectors.tempus.modelView.filter.selectProjectCheckbox, context().projectSetup.name);
});

Then('ui: I uncheck all the projects', async () => {
  await clickToElement(Selectors.tempus.modelView.filter.selectAllCheckbox);
});



Then(/^ui: I verify specific column header "([^"]*)" is "(not displayed|displayed)" in Model$/, async (columnHeader: string, viewStatus: string) => {
  if (viewStatus == "displayed") {
    await context().softAssert.isTrue(
      await isElementDisplayed(locatorParse(Selectors.tempus.modelView.columnHeaderInGanttTab, columnHeader)),
      `Specific column header : {${columnHeader} is not displayed in Gantt tab of Model}`
    );
  }
  else if (viewStatus == "not displayed") {
    await context().softAssert.isFalse(
      await isElementDisplayed(locatorParse(Selectors.tempus.modelView.columnHeaderInGanttTab, columnHeader)),
      `Specific column header : {${columnHeader} is displayed in Gantt tab of Model}`
    );
  }

});

Then(/^ui: I select attributes "([^\"]*)" in insert columns dropdown in Model$/, async (attributeNames: string) => {
  await Model.searchAndSelectAttributesInInsertColumns(attributeNames);
});

Then('ui: I open impact assesment view for newly created resource type', async () => {
  await elementParseAndClick(Selectors.tempus.modelView.resourceGrid.resourceNameImpactAssessmentView, context().resourceSetup.name);
});

Then('ui: I validate impact assesment view is filled with data', async () => {
  const ele = await isElementDisplayed(Selectors.tempus.modelView.impactAssessmentView.projectInImpactAssessmentView);
  const ele2 = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.impactAssessmentView.noData, context().projectSetup.name));
  await context().softAssert.isFalse(ele2, `The impact assesment view is not opened`);
  await context().softAssert.isFalse(ele, `The impact assesment view is opened but not populated with data`);
});

Then('ui: I exclude the project from the impact assesment view', async () => {
  await elementParseAndClick(Selectors.tempus.modelView.impactAssessmentView.excludeProject, context().projectSetup.name);
});

Then('ui: I validate the project has been excluded from the Gantt tab', async () => {
  const ele = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.validateExcludedProject, context().projectSetup.name));
  await context().softAssert.isTrue(ele, `Exclude Project: ${context().projectSetup.name} is not excluded in Gantt tab`);
});

Then('ui: I validate Priority attribute in impact assesment view in the lower tab', async () => {
  const ele = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.impactAssessmentView.headerInImpactAssessment, 'Dataset Preference'));
  await context().softAssert.isTrue(ele, `Priority Attribute: "Dataset Preference "is not visible in the impact assessment view`);
});

Then(/^ui: I navigate to "([^\"]*)" tab in "([^\"]*)" section of model$/, async (tabName: string, sectionLevel: string) => {
  if (tabName == 'Grid' && sectionLevel == 'upper') {
    await elementParseAndClick(Selectors.tempus.modelView.upperGridButton, tabName);
  }
  else if (tabName == 'Grid' && sectionLevel == 'lower') {
    await elementParseAndClick(Selectors.tempus.modelView.lowerGridButton, tabName);
  }
  else {
    await elementParseAndClick(Selectors.tempus.modelView.tabButton, tabName)
  }
});

Then(/^ui: I search for the recently created "(project|resource)" in grid tab$/, async (filterBy: string) => {
  context().searchName = context().resourceSetup.name;

  if (filterBy == 'project') {
    context().searchName = context().projectSetup.name;
  }

  await findAndSetValue(Selectors.tempus.modelView.filter.searchProject, context().searchName);
});

Then('ui: I validate the search is visible in viewpoint in the view model', async () => {
  if (context().searchName == undefined) {
    context().searchName = context().projectSetup.name
  };
  const ele = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.projectName, context().searchName));
  await context().softAssert.isTrue(ele, `Filter Object: ${context().searchName} is not displayed in the viewpoint in model view`)
});

Then(/^I select "([^"]*)" from the groupby dropdown in view model$/, async (optionName: string) => {
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.groupByDropdown);
  await elementParseAndClick(Selectors.tempus.modelView.groupByOptionSelect, optionName);
  await browser.pause(SHORT_PAUSE / 2) // wait for the group by functionality to take effect
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.groupByDropdown);
});

Then('ui: I include the searched project from the gantt tab', async () => {
  await elementParseAndClick(Selectors.tempus.modelView.threeDotButtonForprojectInGanttTab, context().projectSetup.name);
  await clickToElement(Selectors.tempus.modelView.includeOption);
});

Then('ui: I open impact assesment view for newly created resource type in delta view', async () => {
  await clickToElement(Selectors.tempus.modelView.resourceGrid.resourceTypeImpactAssessmentViewDelta);
});

Then('ui: I validate that the allocation value and % in the impact assessment view', async () => {
  const locator = await elementParse({ locatorString: Selectors.tempus.modelView.impactAssessmentView.allocationValue, parsing: context().projectSetup.name });
  const allocationValue = await locator.getText();
  const locator2 = await elementParse({ locatorString: Selectors.tempus.modelView.impactAssessmentView.allocationPercentage, parsing: context().projectSetup.name });
  const allocationPercentage = await locator2.getText();
  const ele = await isElementDisplayed(locator);

  await context().softAssert.equal(allocationPercentage, '100%', `Allocation %: The allocated % is not same in the heatmap as per the allocation input in the Project Management`);
  await context().softAssert.equal(allocationValue, '100.00', `Allocation Value: The allocated value is not same in the heatmap as per the allocation input in the Project Management`);
  await context().softAssert.isTrue(ele, `Allocation Value: The allocation data is not displayed in the impact assessment view`);
});

Then('ui: I expand the resource type and open impact assesment view for newly created resource', async () => {
  const ele = await isElementDisplayed(Selectors.tempus.modelView.resourceGrid.validateExpandedResourceTypeGrid);
  if (ele == false) {
    await clickToElement(Selectors.tempus.modelView.resourceGrid.expandresourcetypeButton)
  };
  await elementParseAndClick(Selectors.tempus.modelView.resourceGrid.resourceNameImpactAssessmentView, context().resourceSetup.name);
});


Then(/^ui: I drag the "([^"]*)" point of project bar to "([^"]*)" months "([^"]*)"$/, async (pointOfSource: string, numberofMonths: string, barForwardOrBackward: string) => {
  let monthsValue;
  if (pointOfSource === 'end') {
    if (barForwardOrBackward === 'Forward') {
      monthsValue = parseInt(numberofMonths, 10) + 12;
    } else if (barForwardOrBackward === 'Backward') {
      monthsValue = 12 - parseInt(numberofMonths, 10);
    }
  } else if (pointOfSource === 'start' && barForwardOrBackward === 'Backward') {
    throw new Error("The Project Bar start date is the initial month of the Grid. The bar cannot move backward from its initial point");
  } else {
    monthsValue = parseInt(numberofMonths, 10);
  }

  const ele1 = Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody;
  const ele2 = `//div[@class="gantt_task_cell"][${monthsValue}]`;
  await $(ele1).click();
  const source = await locatorParse(Selectors.tempus.modelView.projectGantt.projectBarEndPoints, pointOfSource);
  await browser.pause(SHORT_PAUSE * 2)
  await elementDragAndDrop(source, ele2);
  await browser.pause(SHORT_PAUSE * 2)

});

Then(/^ui: I validate that the Allocation value has been updated for dragging the "([^"]*)" point of project bar to "([^"]*)"$/, async (pointOfSource: string, barForwardOrBackward: string) => {
  const gridSelector = Selectors.tempus.modelView.resourceGrid.allocationValueValidationByGrid;
  let ele1, ele2;
  let message;

  if (barForwardOrBackward === "Forward" && pointOfSource === "start") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalStartMonth}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalStartMonth}]`
    ).getText();
    message = "Forward - Start Point";
  } else if (barForwardOrBackward === "Forward" && pointOfSource === "end") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalEndMonth}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalEndMonth}]`
    ).getText();
    message = "Forward - End Point";
  } else if (barForwardOrBackward === "Backward" && pointOfSource === "start") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalStartMonth}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalStartMonth}]`
    ).getText();
    message = "Backward - Start Point";
  } else if (barForwardOrBackward === "Backward" && pointOfSource === "end") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalEndMonth}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalEndMonth}]`
    ).getText();
    message = "Backward - End Point";
  }

  await context().softAssert.notEqual(
    ele1,
    ele2,
    `Allocation Update: The updated value don't match with the actual value as the bar didn't collapse properly (${message})`
  );

});

Then(/^ui: I move the Project bar forward to "([^"]*)" months$/, async (numberofMonths: string) => {

  const ele1 = Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody;
  var result = parseInt(numberofMonths, 10) + 12;
  const ele2 = `//div[@class="gantt_task_cell"][${result}]`;
  await browser.pause(SHORT_PAUSE * 2)
  await elementDragAndDrop(ele1, ele2);
  await browser.pause(SHORT_PAUSE * 2)
});

Then('ui: I validate Financial catagory data in the financial tab for any month', async () => {
  const ele = locatorParse(Selectors.tempus.modelView.financialCategory, context().financialCategoryName);
  const ele3 = await isElementDisplayed(await locatorParse(Selectors.tempus.modelView.financialCategoryValidateByName, context().financialCategoryName));
  const value = await $(ele).getText();
  const ele2 = await isElementDisplayed(ele);
  await context().softAssert.equal(value, '€ 100', `Financial tab: The value donot match with the date of SG`);
  await context().softAssert.isTrue(ele2, `Financial Category: The Data is not displayed under the financial tab`);
  // await context().softAssert.isTrue(ele3, `Financial Category: ${context().financialCategoryName} is not displayed under the financial tab`);
  
});

Then('ui: I validate Budget data in the lower tab for any month', async () => {
  const value = await $(Selectors.tempus.modelView.budgetAllocationValidation).getText();
  await context().softAssert.equal(value, '€ 500', `Budget tab: The value donot match with the date of SG`);
});

Then('ui: I validate the updated allocation values and total allocation value', async () => {
  for (let index = 1; index <= context().numberOfMonths; index++) {
    const value = await $(Selectors.tempus.modelView.selectAllocationValueGrid + `[${index}]`).getText();
    await context().softAssert.equal(value, '200', `Updated Allocation: The allocation value is same as the old value and didn't updated`)
  }
  const ele = locatorParse(Selectors.tempus.modelView.totalAllocationValue, context().projectSetup.name);
  const totalvalue = await $(ele).getText();
  await context().softAssert.equal(totalvalue, '700', `Updated Allocation: The total allocation value is same as the old value and didn't updated`)
})

Then('ui: I expand the view in the grid tab using expand button', async () => {
  await clickToElement(Selectors.tempus.modelView.expandButton);
});

Then('ui: I Click on Revert option beside Profile section', async () => {
  await clickToElement(Selectors.tempus.modelView.historyTab);
});

Then(/^ui: I validate the total allocation value "(before|after)" revert$/, async (revertStatus: string) => {
  let beforeValue;
  let afterValue;

  switch (revertStatus) {
    case 'before':
      await browser.pause(SHORT_PAUSE);
      beforeValue = await $(Selectors.tempus.modelView.totalAllocationValue).getText();
      await context().softAssert.isTrue(await isElementDisplayed(Selectors.tempus.modelView.totalAllocationValue), `Project Allocation: The specified project is not displayed in the Grid`);
      break;
    case 'after':
      await browser.pause(SHORT_PAUSE);
      afterValue = await $(Selectors.tempus.modelView.totalAllocationValue).getText();
      await context().softAssert.notEqual(afterValue, beforeValue, `Allocation Value: The allocation value before and after the revert is both the same and soo Revert functionality didnot worked properly`);
      await context().softAssert.isTrue(await isElementDisplayed(Selectors.tempus.modelView.totalAllocationValue), `Project Allocation: The specified project is not displayed in the Grid`);
      break;
    default:
      break;
  }
});

Then(/^ui: I revert the "([^"]*)" changes for the list$/, async (revertSteps: string) => {
  if (revertSteps == 'last') {
    await clickToElement(Selectors.tempus.modelView.revertLatestChange);
  }
  else if (revertSteps == 'all') {
    await clickToElement(Selectors.tempus.modelView.revertAllChangesBUtton);
  }
});

Then(/^ui: I update the allocation for the recently created project or resource to "([^"]*)" for "([^"]*)" months$/, async (hourValue: number, numberOfMonths: number) => {
  context().numberOfMonths = numberOfMonths;
  for (let index = 1; index <= numberOfMonths; index++) {
    await clickToElement(Selectors.tempus.modelView.selectAllocationValueGrid + `[${index}]`);
    await browser.keys(hourValue);
    await hitEnter();
  }
  clickToElement(Selectors.tempus.modelView.filter.buttonFilterProjectview + '[1]');
  clickToElement(Selectors.tempus.modelView.filter.buttonFilterProjectview + '[1]');
  await browser.pause(MEDIUM_PAUSE); // Needed for the values to be updated
});

Then(/^ui: I "(Hide|Un-Hide)" the insert column with the eye icon$/, async (eyeStatus: string) => {
  const ele = await isElementDisplayed(Selectors.tempus.modelView.validateEyeSlashButton);
  if ((eyeStatus == 'Un-Hide' && ele == true) || (eyeStatus == 'Hide' && ele == false)) {
    await clickToElement(Selectors.tempus.modelView.eyeSlashButton);
  }
});

Then('ui: I validate the search is not visible in viewpoint in the view model', async () => {
  if (context().searchName == undefined) {
    context().searchName = context().projectSetup.name
  }
  const ele = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.projectName, context().searchName));
  await context().softAssert.isTrue(ele, `Filter Object: ${context().searchName} is still displayed in the viewpoint in model view`)
});

Then(/^ui: I validate the resource allocation value has been removed for "([^"]*)" view$/, async (viewName: string) => {
  let ele;
  switch (viewName) {
    case "Heat map":
    case "Cool map":
      ele = await $(locatorParse(Selectors.tempus.modelView.resourceGrid.resourceNameImpactAssessmentView, context().resourceSetup.name)).getText();
      await context().softAssert.equal(ele, '0 %', `Allocation Update: The allocation value didnot got updated after the project is excluded`)
      break;
    case "Grid":
      ele = await $(locatorParse(Selectors.tempus.modelView.resourceGrid.resourceNameImpactAssessmentView, context().resourceSetup.name)).getText();
      await context().softAssert.equal(ele, '184', `Allocation Update: The allocation value didnot got updated after the project is excluded`)
      break;
    case "Delta":
      ele = await $(locatorParse(Selectors.tempus.modelView.resourceGrid.resourceNameImpactAssessmentView, context().resourceSetup.name)).getText();
      await context().softAssert.equal(ele, '54 %', `Allocation Update: The allocation value didnot got updated after the project is excluded`)
      break;
    default:
      throw new Error("The option available are Grid, Delta, Cool map, Heat map");
  }
});

Then('ui: I expand the resource type section', async () => {
  const ele = await isElementDisplayed(Selectors.tempus.modelView.resourceGrid.validateExpandedResourceTypeGrid);
  if (ele == false) {
    await clickToElement(Selectors.tempus.modelView.resourceGrid.expandresourcetypeButton)
  }
  await elementParseAndClick(Selectors.tempus.modelView.resourceGrid.resourceNameImpactAssessmentView, context().resourceSetup.name);
});

Then(/^ui: I validate that the Allocation value has been updated for dragging the "([^"]*)" point of project bar to "([^"]*)" for Financial tab$/, async (pointOfSource: string, barForwardOrBackward: string) => {
  const gridSelector = Selectors.tempus.modelView.resourceGrid.allocationValueValidationByFinancialTab;
  let ele1, ele2;
  let message;

  if (barForwardOrBackward === "Forward" && pointOfSource === "start") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalStartMonth + 2}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalStartMonth + 2}]`
    ).getText();
    message = "Forward - Start Point";
  } else if (barForwardOrBackward === "Forward" && pointOfSource === "end") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalEndMonth + 2}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalEndMonth + 2}]`
    ).getText();
    message = "Forward - End Point";
  } else if (barForwardOrBackward === "Backward" && pointOfSource === "start") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalStartMonth + 2}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalStartMonth + 2}]`
    ).getText();
    message = "Backward - Start Point";
  } else if (barForwardOrBackward === "Backward" && pointOfSource === "end") {
    ele1 = await $(
      gridSelector + `[${context().beforeNumericalEndMonth + 2}]`
    ).getText();
    ele2 = await $(
      gridSelector + `[${context().afterNumericalEndMonth + 2}]`
    ).getText();
    message = "Backward - End Point";
  }

  await context().softAssert.notEqual(
    ele1,
    ele2,
    `Allocation Update Financial Tab: The updated value don't match with the actual value as the bar didn't collapse properly (${message})`
  );

});

Then('ui: Click on Insert columns dropdown in Project Section of Tempus model view page', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGantt.insertColumnsDropdown);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: Select column as: "([^"]*)" in Insert columns dropdown in Project Section of Tempus model view page$/, async (attributeName: string) => {
  const specificColumnInInsertColumnsDropdown = await element(locatorParse(Selectors.tempus.modelView.projectGantt.specificColumnInInsertColumnsDropdown, attributeName));
  const tagName = await specificColumnInInsertColumnsDropdown.getTagName();
  if (tagName !== 'path') {
    await specificColumnInInsertColumnsDropdown.click();
  }
});

Then('ui: Click on Show or Hide icon in Project Section of Tempus model view page', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGantt.showOrHideAttributesIcon);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: SoftAssert if CF column: "([^"]*)" is not displayed in Project Section of Tempus model view page$/, async (attributeName: string) => {
  const specificColumnHeaderDisplayedStatus = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.projectGantt.specificColumnHeader, attributeName));
  context().softAssert.isFalse(specificColumnHeaderDisplayedStatus, `Column header: {${attributeName}} was still displayed in Project Section of Tempus model view page`)
});

Then(/^ui: SoftAssert if CF column: "([^"]*)" is displayed in Project Section of Tempus model view page$/, async (attributeName: string) => {
  const specificColumnHeaderDisplayedStatus = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.projectGantt.specificColumnHeader, attributeName));
  context().softAssert.isTrue(specificColumnHeaderDisplayedStatus, `Column header: {${attributeName}} was not displayed in Project Section of Tempus model view page`)
});

Then(/^ui: I fetch the month on which the "([^"]*)" bar is present for validation "([^"]*)" moving$/, async (barType: string, dragStatus: string) => {
  await browser.pause(MEDIUM_PAUSE);

  if (barType == 'Task') {
    await $(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[2]').moveTo();
    await $(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[2]').moveTo();
    await doubleClickToElement(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[2]');
  }
  else {
    await $(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[1]').moveTo();
    await $(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[1]').moveTo();
    await doubleClickToElement(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[1]');
  }

  const ele1 = locatorParse(Selectors.tempus.modelView.projectGantt.monthValidation, 'From');
  const ele2 = locatorParse(Selectors.tempus.modelView.projectGantt.monthValidation, 'to');
  const startMonth = await $(ele1).getText();
  const endMonth = await $(ele2).getText();
  var abbreviatedStartMonth = new Date(startMonth);
  var abbreviatedEndMonth = new Date(endMonth);
  if (dragStatus == "before") {
    context().beforeStartDate = new Date(startMonth);
    context().beforeEndDate = new Date(endMonth);
    context().beforeNumericalStartMonth = await abbreviatedStartMonth.getUTCMonth() + 1;
    context().beforeNumericalEndMonth = await abbreviatedEndMonth.getUTCMonth() + 1;

  } else {
    context().afterStartDate = new Date(startMonth);
    context().afterEndDate = new Date(startMonth);
    context().afterNumericalStartMonth = await abbreviatedStartMonth.getUTCMonth() + 1;
    context().afterNumericalEndMonth = await abbreviatedEndMonth.getUTCMonth() + 1;

  }
})

Then(/^ui: I validate that the bar has "(Expanded|Collapsed)" from "(end|start)" point$/, async (barStatus: string, sourcePoint: string) => {
  if (barStatus == 'Expanded') {
    if (sourcePoint == "end") {
      context().softAssert.isLessThan(context().beforeEndDate, context().afterEndDate, `Bar Status: The bar didn't Expanded Properly as the before end date is still greater than before end date`);
    } else {
      context().softAssert.isGreaterThan(context().afterStartDate, context().beforeStartDate, `Bar Status: The bar didn't Expanded Properly as the before start date is still less than after start date`);
    }
  }
  else if (barStatus == 'Collapsed') {
    if (sourcePoint == 'end') {
      context().softAssert.isGreaterThan(context().beforeEndDate, context().afterEndDate, `Bar Status: The bar didn't collapsed Properly as the before end date is still less than after end date`);
    } else {
      context().softAssert.isLessThan(context().afterStartDate, context().beforeStartDate, `Bar Status: The bar didn't collapsed Properly as the before start date is still greater than after start date`);
    }
  }
})

Then('ui: I expand the project to show task in model view', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGantt.expandProject);
})

Then(/^ui: I drag the "([^"]*)" point of task bar to "([^"]*)" months "([^"]*)"$/, async (pointOfSource: string, numberofMonths: string, barForwardOrBackward: string) => {
  let monthsValue;
  if (pointOfSource === 'end') {
    if (barForwardOrBackward === 'Forward') {
      monthsValue = parseInt(numberofMonths, 10) + 12;
    } else if (barForwardOrBackward === 'Backward') {
      monthsValue = 12 - parseInt(numberofMonths, 10);
    }
  } else if (pointOfSource === 'start' && barForwardOrBackward === 'Backward') {
    throw new Error("The Project Bar start date is the initial month of the Grid. The bar cannot move backward from its initial point");
  } else {
    monthsValue = parseInt(numberofMonths, 10);
  }

  const ele1 = Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[2]';
  const ele2 = `(//div[@class="gantt_task_cell"][${monthsValue}])[2]`;
  await $(ele1).click();
  const source = await locatorParse(Selectors.tempus.modelView.projectGantt.projectBarEndPoints + `[2]`, pointOfSource);
  await browser.pause(SHORT_PAUSE * 2)
  await elementDragAndDrop(source, ele2);
  await browser.pause(SHORT_PAUSE * 2)

});

Then(/^ui: I move the Task bar forward to "([^"]*)" months$/, async (numberofMonths: Number) => {

  const ele1 = Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[2]';
  const ele2 = `(//div[@class="gantt_task_cell"][${numberofMonths}])[2]`;
  await browser.pause(SHORT_PAUSE * 2)
  await elementDragAndDrop(ele1, ele2);
  await browser.pause(SHORT_PAUSE * 2)
});

Then(/^ui: I move the Financial bar forward to "([^"]*)" months$/, async (numberofMonths: string) => {

  const ele1 = Selectors.tempus.modelView.financialTabBar;
  const ele2 = `(//div[@class="gantt_task_cell"][${parseInt(numberofMonths, 10) + 12}])`;
  await browser.pause(SHORT_PAUSE * 2)
  await elementDragAndDrop(ele1, ele2);
  await browser.pause(SHORT_PAUSE * 2)
});

Then('ui: SoftAssert if both resources have values as expected in Heatmap tab of Resource section in model view page', async () => {

  const expectedValueForFirstResource = ['54 %', '0 %', '60 %', '0 %', '54 %'];
  let currentYear = moment(`${moment().year()}-01-01`).format('YY').toString();
  const columnHeaders = ['Jan ' + currentYear, 'Feb ' + currentYear, 'Mar ' + currentYear, 'Apr ' + currentYear, 'May ' + currentYear]

  for (let i = 0; i < 5; i++) {
    const locator =
      (Selectors.tempus.modelView.resourceGrid.specificCellValueOfSpecificCFOrResource)
        .replace('{{resourceOrCFValue}}', context().resourceSetup.name)
        .replace('{{columnHeader}}', columnHeaders[i]);
    const actualValue = await elementGetText(locator);
    await context().softAssert.equal(actualValue, expectedValueForFirstResource[i],
      `Resource: {${context().resourceSetup.name}} has incorrect value for column: {${columnHeaders[i]}} in resource grid's 
      Heatmap tab of Model view page`);
  }

  for (let i = 0; i < 5; i++) {
    const locator =
      (Selectors.tempus.modelView.resourceGrid.specificCellValueOfSpecificCFOrResource)
        .replace('{{resourceOrCFValue}}', context().resourceSetup2.name)
        .replace('{{columnHeader}}', columnHeaders[i]);
    const actualValue = await elementGetText(locator);
    await context().softAssert.equal(actualValue, "0 %",
      `Resource: {${context().resourceSetup2.name}} has incorrect value for column: {${columnHeaders[i]}} in resource grid's 
      Heatmap tab of Model view page`);
  }

});
Then('ui: I click on Setting button in lower grid', async () => {
  await clickToElement(Selectors.tempus.modelView.lowerGridSettingButton);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: I toggle "([^"]*)" option as "(On|Off)" from the setting options from the "([^"]*)" tab in lower grid section$/, async (optionName: string, toggleState: string, tabView: string) => {
  if (tabView == 'Financial lower Grid' || tabView == 'Gantt lower Grid' || tabView == 'Grid lower Grid') {
    tabView = 'grid'
  }
  const color = await (await getElementBackgroundColor(locatorParse(Selectors.tempus.modelView.optionColorvalidation, optionName))).toString();
  await elementParse({ locatorString: Selectors.tempus.modelView.activeTabValidation, parsing: tabView });
  if (
    (color != '#37b5ff' && toggleState == "On") ||
    (color != '#767676' && toggleState == "Off")
  ) {
    await elementParseAndClick(Selectors.tempus.modelView.optionButton, optionName);
  }
})

Then(/^ui: I validate "([^"]*)" option in the "([^"]*)" tab in lower grid section to show effect$/, async (optionName: string, tabView: string) => {
  let tabView1 = tabView;
  if (tabView == 'Financial lower Grid' || tabView == 'Gantt lower Grid' || tabView == 'Grid lower Grid') {
    tabView1 = 'grid'
  }
  await elementParse({ locatorString: Selectors.tempus.modelView.activeTabValidation, parsing: tabView1 });
  let ele;
  switch (tabView) {
    case 'budget':
      if (optionName == 'Show Total') {
        ele = await isElementDisplayed(Selectors.tempus.modelView.lowerTabs.budgetTab.showTotal);
        break;
      } else if (optionName == 'Show Heatmap') {
        ele = await isElementDisplayed(Selectors.tempus.modelView.lowerTabs.budgetTab.showHeatmap);
        break;
      } else if (optionName == 'Show Labor Costs') {
        ele = await isElementDisplayed(Selectors.tempus.modelView.lowerTabs.budgetTab.showLaborCosts);
        break;
      } else {
        throw Error(`Lower Grid Option: {${optionName}} is not available in the given option list for ${tabView} view`)
      }
    case 'Financial lower Grid':
      if (optionName == 'Show Total') {
        ele = await isElementDisplayed(Selectors.tempus.modelView.lowerTabs.budgetTab.showTotal);
        break;
      } else if (optionName == 'Show Total Column') {
        ele = await isElementDisplayed(Selectors.tempus.modelView.lowerTabs.financialGridTab.showTotalColumn);
        break;
      } else if (optionName == 'Show Labor Costs') {
        ele = await isElementDisplayed(Selectors.tempus.modelView.lowerTabs.budgetTab.showLaborCosts);
        break;
      } else {
        throw Error(`Lower Grid Option: {${optionName}} is not available in the given option list for ${tabView} tab`)
      }
    default: Error(`Lower Grid Option: {${optionName}} is not available in the given option list for ${tabView} tab`)
  }
  await context().softAssert.isTrue(ele, `${tabView} tab: The selected option '${optionName}' didn't worked as expected`);

})

Then(/^ui: Click on export icon in the lower grid section and select extension as "([^"]*)"$/, async (fileExtension: string) => {
  await clickToElement(Selectors.tempus.modelView.exportButton);
  await elementParseAndClick(Selectors.tempus.modelView.exportFileType, fileExtension);
});

Then(/^ui: Softassert if exported file got downloaded in directory:"([^"]*)" under project's root directory with extension "([^"]*)" for "([^"]*)" tab$/, async (folderName: string, fileExtension: string, tabView: string) => {
  const modelNumber = (await (await browser.getUrl()).match(/\/(\d+)$/))[1];
  const expectedFileName = `${tabView}_modelDetails-${modelNumber}_${moment().format('ddd_MMM_DD_YYYY')}.${fileExtension}`;

  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});
Then('ui: I click on Opportunity Map in the lower tabs', async () => {
  await elementParseAndClick(Selectors.tempus.modelView.impactAssessmentView.opportunityMap, context().projectSetup.name);

})

Then('ui: I validate that the opportunity map is displayed', async () => {
  const ele = await $(Selectors.tempus.opportunityMap.valdiateModelName).getText();
  await context().softAssert.equal(ele, context().projectSetup.name, `Opportunity Map: The viewed screen is not the opportunity map for the created Project`)
});

Then('ui: I open the Opportunity map for the searched project from the gantt tab', async () => {
  await elementParseAndClick(Selectors.tempus.modelView.threeDotButtonForprojectInGanttTab, context().projectSetup.name);
  await clickToElement(Selectors.tempus.modelView.opportunityMapOption);
});

Then('ui: I validate Grid data in the lower tab for financial tab for any month', async () => {
  const value = await $(await locatorParse(Selectors.tempus.modelView.financialGridAllocationValue, context().financialCategoryName)).getText();
  await context().softAssert.equal(value, '€ 100', `Grid view Financial tab: The value donot match with the date of SG`);
});

Then(/^ui: I search for the "([^"]*)" in the financial lower tab$/, async (searchType: string) => {
  if (searchType == 'project') {
    context().searchName = context().projectSetup.name;
  } else {
    context().searchName = searchType;
  }
  await findAndSetValue(Selectors.tempus.modelView.filter.searchLowerTabProject, context().searchName);
});

Then(/^ui: I validate that the Grid gets rearranged as per "([^"]*)" groupby dropdown$/, async (attributeName: string) => {
  switch (attributeName) {
    case 'Dataset Preference':
      const ele = await isElementDisplayed(await locatorParse(Selectors.tempus.modelView.lowerTabs.financialGridTab.validateGroupByDatasetPreferenceOption, context().projectSetup.name));
      await context().softAssert.isTrue(ele, `Groupby dropdown: The Grid didn't responded as expected for "${attributeName}"`);
      break;
    default: throw new Error(`The given option {${attributeName}} is not available in the groupby dropdown list`)

  }
})

Then('ui: I expand the project view in the financial lower grid tab using expand button', async () => {
  await clickToElement(Selectors.tempus.modelView.lowerTabs.financialGridTab.expandBUtton);
});

Then(/^ui: Click on Timeframe dropdown and select: "(Month|Year|Quarter)" if not selected already in Financial's Grid tab of a Tempus model$/, async (timeFrame: string) => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.tempus.modelView.lowerTabs.financialGridTab.validateTimeFrameActiveValue, timeFrame));
  if (!(ele) && timeFrame != "Year") {
    await selectFromDropdown({
      dropdownOpener: Selectors.tempus.modelView.lowerTabs.financialGridTab.timeFrameDropdown,
      dropdownSelection: `//span[contains(text(),"${timeFrame}")]`
    })
  } else if (!(ele) && timeFrame == "Year") {
    await selectFromDropdown({
      dropdownOpener: Selectors.tempus.modelView.lowerTabs.financialGridTab.timeFrameDropdown,
      dropdownSelection: `(//span[contains(text(),"${timeFrame}")])[2]`
    })
  }
})

Then(/^ui: I validate if the Timeframe dropdown is selected as "(Month|Year|Quarter)" and the grid values have been updated$/, async (timeFrame: string) => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.tempus.modelView.lowerTabs.financialGridTab.validateTimeFrameActiveValue, timeFrame));
  await context().softAssert.isTrue(ele, `TimeFrame Dropdown: The given option {${timeFrame}} in the dropdown is not the one displayed in the grid`);

  const columnHeaderMapping = {
    'Month': 'Jan 24',
    'Quarter': 'Q1 24',
    'Year': '2024',
  };

  const columnHeaderName = columnHeaderMapping[timeFrame];

  const ele2 = await isElementDisplayed(await locatorParse(Selectors.tempus.modelView.lowerTabs.financialGridTab.validateColumnHeadAsPerTimeFrame, columnHeaderName));
  await context().softAssert.isTrue(ele2, `TimeFrame Dropdown: The Grid didn't get updated as per the selected Timeframe {${timeFrame}}`);
});


Then('ui: I click on groupby dropdown in lower tab view in tempus model view', async () => {
  await (await element(Selectors.tempus.modelView.groupByDropdown)).click();
});

Then(/^ui: I uncheck and select attributes "([^"]*)" in groupby dropdown in lower tab view in tempus model view$/, async (attributeNames: string) => {
  await slowInputFilling(Selectors.tempus.modelView.lowerTabs.financialGridTab.searchAttributeInGroupbyDropdown, attributeNames);
  await elementParseAndClick(Selectors.tempus.modelView.groupByDropdownOption, attributeNames);
  await browser.pause(SHORT_PAUSE); //Required for checkbox to display
});

Then(/^ui: Move gantt bar of project that was created using model: "([^"]*)" forward by 100 pixels$/, async (modelUsedForCreation: string) => {
  let name;
  switch (modelUsedForCreation) {
    case 'Project':
      name = context().projectSetup.name;
      break;
    case 'Project2':
      name = context().projectSetup2.name;
      break;
    default: throw Error(`Project model: {${modelUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Project2`);
  }
  const projectGanttBarElement = await element(locatorParse(Selectors.tempus.modelView.projectGantt.specificProjectGanttBar, name));
  await projectGanttBarElement.waitForClickable();
  await projectGanttBarElement.dragAndDrop({ x: 100, y: 0 });
  await browser.pause(SHORT_PAUSE * 2);//Needed for drag and drop to finish
});

Then(/^ui: Click on "(Grid|Graph|Heat map|Cool map|Delta)" tab in Resource Grid area of a Tempus model$/, async (viewTabToBeClicked: string) => {
  await clickToElement(locatorParse(Selectors.tempus.modelView.resourceGrid.specificViewTab, viewTabToBeClicked));
});

Then(/^ui: Softassert before and after values in of resource after moving project by 100 pixels when timeframe was: "(Day|Week|Month|Quarter)"$/, async (timeFrameSelected: string) => {
  const expectedValuesForDay = ["57 %", "0 %", "63 %", "0 %", "54 %", "49 %", "63 %", "62 %", "54 %", "55 %"];
  const expectedValuesForWeek = ["57 %", "0 %", "63 %", "0 %", "54 %", "49 %", "63 %", "62 %", "54 %", "55 %"];
  const expectedValuesForMonth = ["57 %", "0 %", "63 %", "0 %", "54 %", "49 %", "63 %", "62 %", "54 %", "55 %"];
  const expectedValuesForQuarter = ["57 %", "0 %", "63 %", "0 %", "54 %", "49 %", "63 %", "62 %", "54 %", "55 %"];
  let expectedValues;

  switch (timeFrameSelected) {
    case "Day": expectedValues = expectedValuesForDay;
      break;
    case "Week": expectedValues = expectedValuesForWeek;
      break;
    case "Month": expectedValues = expectedValuesForMonth;
      break;
    case "Quarter": expectedValues = expectedValuesForQuarter;
      break;
  }

  for (let i = 1; i <= 10; i++) {
    const actualValue = await elementGetText(`(${locatorParse(Selectors.tempus.modelView.resourceGrid.cellValuesOfResourceInDeltaView, context().resourceSetup.name)})[${i}]`);
    await context().softAssert.equal(actualValue, expectedValues[i - 1],
      `Delta section for resoruce: {${context().resourceSetup.name}} in model: {${context().modelSetup.name}} has incorrect value in cell#{${i}} Timeframe selected:{${timeFrameSelected}}`)
  }
});

Then(/^ui: Click on Timeframe dropdown and select: "(Day|Week|Month|Quarter)" if not selected already in Resource Grid area of a Tempus model$/, async (timeFrameToBeSelected: string) => {
  const currentTimeFrame = (await elementGetText(Selectors.tempus.modelView.resourceGrid.timeframeDropdown)).trim();
  if (timeFrameToBeSelected !== currentTimeFrame) {
    await selectFromDropdown({
      dropdownOpener: Selectors.tempus.modelView.resourceGrid.timeframeDropdown,
      dropdownSelection: locatorParse(Selectors.tempus.modelView.resourceGrid.timeFrameDropdownSpecificValue, timeFrameToBeSelected),
    });
  }
});

Then(/^ui: Click on Time unit dropdown and select: "(Time|FTE|Cost)" if not selected already in Resource Grid area of a Tempus model$/, async (timeUnitToBeSelected: string) => {
  const currentTimeUnit = (await elementGetText(Selectors.tempus.modelView.resourceGrid.timeUnitDropdown)).trim();
  if (timeUnitToBeSelected !== currentTimeUnit) {
    await selectFromDropdown({
      dropdownOpener: Selectors.tempus.modelView.resourceGrid.timeUnitDropdown,
      dropdownSelection: locatorParse(Selectors.tempus.modelView.resourceGrid.timeFrameDropdownSpecificValue, timeUnitToBeSelected),
    });
  }
});

Then('ui: Softassert before and after FTE values in of resource after moving project by 100 pixels', async () => {
  const expectedValuesForDay = ["57 %", "0 %", "63 %", "0 %", "54 %", "49 %", "63 %", "62 %", "54 %", "55 %"];

  for (let i = 1; i <= 10; i++) {
    const actualValue = await elementGetText(`(${locatorParse(Selectors.tempus.modelView.resourceGrid.cellValuesOfResourceInDeltaView, context().resourceSetup.name)})[${i}]`);
    await context().softAssert.equal(actualValue, expectedValuesForDay[i - 1],
      `Delta section for resoruce: {${context().resourceSetup.name}} in model: {${context().modelSetup.name}} has incorrect FTE value in cell#{${i}}`)
  }
});

Then(/^ui: Softassert if resource has "(down|up)" arrow displayed against it in Resource Grid area of a Tempus model$/, async (arrrowDirection: string) => {
  const specificResourceOrCFValueClassValue = await (await element(locatorParse(Selectors.tempus.modelView.resourceGrid.specificResourceOrCFValue, context().resourceSetup.name))).getAttribute("class");
  await context().softAssert.equal(specificResourceOrCFValueClassValue, `delta-impact-${arrrowDirection} resource `,
    `Delta section for resoruce: {${context().resourceSetup.name}} in model: {${context().modelSetup.name}} did not have ${arrrowDirection} arrow displayed against it`);
});

Then(/^ui: Toggle: "(On|Off)" "(Limit to Assigned Resources|Baseline Change|Net Availability|Named Resource|Show Changed Rows)" option in Chart options modal in Resource Grid area of a Tempus model$/, async (
  onOrOff: string, chartOptionToBeSelected: string) => {

  const specificToggleButtonInChartOptions = await element(locatorParse(Selectors.tempus.modelView.resourceGrid.specificToggleButtonInChartOptions, chartOptionToBeSelected));
  const classAttributeValue = await specificToggleButtonInChartOptions.getAttribute("class");
  if (onOrOff == 'On') {
    if (!classAttributeValue.includes("active")) {
      await specificToggleButtonInChartOptions.click();
    }
  }
  else {
    if (classAttributeValue.includes("active")) {
      await specificToggleButtonInChartOptions.click();
    }
  }
});
Then('ui: Click on Group by dropdown in Project Gantt section of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGantt.groupByDropdown);
});

Then('ui: Click on Group by dropdown in Project Grid section of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGrid.groupByDropdown);
  await browser.pause(SHORT_PAUSE); //Needed for dropdown to open or close
});

Then(/^ui: Click on option: "(Project|Resource)" in Group by dropdown of Project Grid area in Tempus model view page$/, async (optionToBeSelected: string) => {
  await elementParseAndClick(Selectors.tempus.common.dropdownSpecificValue, optionToBeSelected);
});

Then(/^ui: Click on option: "(gantt|grid)" in Group by dropdown of Project Grid area in Tempus model view page$/, async (optionToBeSelected: string) => {
  if (optionToBeSelected === "grid") {
    await clickToElement(Selectors.tempus.modelView.gridTab);
  } else {
    await clickToElement(Selectors.tempus.modelView.ganttTab);
  }
});

Then(/^ui: Softassert if resource created using model: "([^"]*)" is "(not displayed|displayed)" in Resource Grid area of a Tempus model$/, async (modelUsedForCreation: string, dispayedOrNotDisplayed: string) => {
  let name;
  switch (modelUsedForCreation) {
    case 'Resource':
      name = context().resourceSetup.name;
      break;
    case 'Resource2':
      name = context().resourceSetup2.name;
      break;
    default: throw Error(`Resource model: {${modelUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Resource\n2.Resource2`);
  }
  const specificResourceOrCFValueDisplayedStatus = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.resourceGrid.specificResourceOrCFValue, name));
  if (dispayedOrNotDisplayed === "displayed") {
    await context().softAssert.isTrue(specificResourceOrCFValueDisplayedStatus,
      `Resource: {${name}} was not displayed in Tempus model: {${context().modelSetup.name}} in Resource Grid area of a Tempus model`);
  } else {
    await context().softAssert.isFalse(specificResourceOrCFValueDisplayedStatus,
      `Resource: {${name}} was still displayed in Tempus model: {${context().modelSetup.name}} in Resource Grid area of a Tempus model`);
  }
});

Then(/^ui: Fetch before values of resource created using model: "([^"]*)" in Resource Grid area of a Tempus model$/, async (modelUsedForCreation: string) => {

  let name;
  switch (modelUsedForCreation) {
    case 'Resource':
      name = context().resourceSetup.name;
      break;
    case 'Resource2':
      name = context().resourceSetup2.name;
      break;
    default: throw Error(`Resource model: {${modelUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Resource\n2.Resource2`);
  }
  let expectedValues: string[] = [];
  for (let i = 1; i <= 10; i += 2) {
    expectedValues.push(await elementGetText(`(${locatorParse(Selectors.tempus.modelView.resourceGrid.cellValuesOfResourceInDeltaView, name)})[${i}]`));
  }
  context().expectedBeforeValues = expectedValues;
});

Then('ui: Softassert if before values are unchanged in Resource Grid area of a Tempus model', async () => {
  let expectedValues = context().expectedBeforeValues;
  for (let i = 1, j = 0; i <= 10; i += 2, j++) {
    const actualValue = await elementGetText(`(${locatorParse(Selectors.tempus.modelView.resourceGrid.cellValuesOfResourceInDeltaView, context().resourceSetup.name)})[${i}]`);
    await context().softAssert.equal(actualValue, expectedValues[j],
      `Delta section for resoruce: {${context().resourceSetup.name}} in model: {${context().modelSetup.name}} has incorrect value in cell#{${i}} when Baseline Changes toggle button was turned ON`)
  }
});

Then('ui: Softassert before and after Net Availability values of resource after moving project by 100 pixels', async () => {
  let expectedValues = ["80.55", "176", "60.45", "160", "83.35", "93.09", "60.65", "60.91", "83.35", "82.70"];
  for (let i = 1; i <= 10; i++) {
    const actualValue = await elementGetText(`(${locatorParse(Selectors.tempus.modelView.resourceGrid.cellValuesOfResourceInDeltaView, context().resourceSetup.name)})[${i}]`);
    await context().softAssert.equal(actualValue, expectedValues[i - 1],
      `Delta section for resoruce: {${context().resourceSetup.name}} in model: {${context().modelSetup.name}} has incorrect value in Net Availability in cell#{${i}}`)
  }
});

Then(/^ui: Softassert if Resource Attribute value is "(not displayed|displayed)" in Resource Grid area of a Tempus model$/, async (dispayedOrNotDisplayed: string) => {
  const specificResourceOrCFValueDisplayed = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.resourceGrid.specificResourceOrCFValue, context().attributeSetup.selectionValues[0]));
  if (dispayedOrNotDisplayed === "displayed") {
    await context().softAssert.isTrue(specificResourceOrCFValueDisplayed,
      `Resource Attribute value: {${context().attributeSetup.selectionValues[0]}} was not displayed in model: {${context().modelSetup.name}}`)
  } else {
    await context().softAssert.isFalse(specificResourceOrCFValueDisplayed,
      `Resource Attribute value: {${context().attributeSetup.selectionValues[0]}} was still displayed in model: {${context().modelSetup.name}}`)
  }
});

Then(/^ui: Click on export icon in Resource Grid area of a Tempus model and select: "(excel|pdf)" option$/, async (fileTypeToBeDownloaded: string) => {
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelView.resourceGrid.exportDropdown,
    dropdownSelection: locatorParse(Selectors.tempus.modelView.resourceGrid.specificDownloadButton, fileTypeToBeDownloaded),
  });
});

Then(/^ui: Softassert if Resource Grid "(excel|pdf)" is exported to directory: "([^"]*)" under project's root directory$/, async (fileTypeToBeDownloaded: string, folderName: string) => {
  let fileExtension;
  if (fileTypeToBeDownloaded === "excel") {
    fileExtension = ".xlsx";
  } else {
    fileExtension = ".pdf";
  }

  let modelIdFromURL: string = await browser.getUrl();
  modelIdFromURL = modelIdFromURL.split("model-details/")[1];

  const expectedFileName = `resources_modelDetails-${modelIdFromURL}_${moment().format('ddd_MMM_DD_YYYY')}${fileExtension}`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then('ui: Click on Filters dropdown in Resource Grid area of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.resourceGrid.filtersDropdown);
});

Then('ui: Unselect select all checkbox in Filters dropdown of Resource Grid area of a Tempus model', async () => {
  const selectAllCheckboxInFiltersDropdownElement = await element(Selectors.tempus.modelView.resourceGrid.selectAllCheckboxInFiltersDropdown);
  await selectAllCheckboxInFiltersDropdownElement.click();
  if (await selectAllCheckboxInFiltersDropdownElement.isSelected()) {
    await selectAllCheckboxInFiltersDropdownElement.click();
  }
});

Then('ui: Softassert before and after are zero in Resource Grid area of a Tempus model', async () => {
  for (let i = 1; i <= 10; i++) {
    const actualValue = await elementGetText(`(${locatorParse(Selectors.tempus.modelView.resourceGrid.cellValuesOfResourceInDeltaView, context().resourceSetup.name)})[${i}]`);
    await context().softAssert.equal(actualValue, "0 %",
      `Delta section for resoruce: {${context().resourceSetup.name}} in model: {${context().modelSetup.name}} has incorrect value in Net Availability in cell#{${i}}`)
  }
});

Then(/^ui: Move gantt bar of project that was created using model: "([^"]*)" backward by 100 pixels$/, async (modelUsedForCreation: string) => {
  let name;
  switch (modelUsedForCreation) {
    case 'Project':
      name = context().projectSetup.name;
      break;
    case 'Project2':
      name = context().projectSetup2.name;
      break;
    default: throw Error(`Project model: {${modelUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Project2`);
  }
  const projectGanttBarElement = await element(locatorParse(Selectors.tempus.modelView.projectGantt.specificProjectGanttBar, name));
  await projectGanttBarElement.waitForClickable();
  await projectGanttBarElement.dragAndDrop({ x: -100, y: 0 });
  await browser.pause(SHORT_PAUSE * 2);//Needed for drag and drop to finish
});

Then('ui: Click on Chart Options cog icon in Resource Grid area of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.resourceGrid.charOptionsCogIcon);
  await browser.pause(SHORT_PAUSE);//Needed for modal options to open or close
});
Then(/^ui: Softassert if Entity created using model: "([^"]*)" is displayed at level: "([^"]*)" in Project Grid area in Tempus model view page$/, async (
  modelUsedForCreation: string, level: string) => {

  let name;
  switch (modelUsedForCreation) {
    case "Project":
      name = context().projectSetup.name;
      break;
    case "Resource":
      name = context().resourceSetup.name;
      break;
    default: throw new Error(`Model:{${modelUsedForCreation}} is not yet supported. Please add if required`);
  }
  const specificResourceOrProjectName = await element(locatorParse(Selectors.tempus.modelView.projectGrid.specificResourceOrProjectName, name));
  const classAttributeValue: string = await specificResourceOrProjectName.getAttribute("class");
  await context().softAssert.isTrue(classAttributeValue.includes(level),
    `Entity : {${name}} is not displayed at level:{${level}}in Project Grid area of Model`
  );
});


Then(/^ui: Click on Entity created using model: "([^"]*)" in Project Grid area in Tempus model view page$/, async (
  modelUsedForCreation: string) => {

  let name;
  switch (modelUsedForCreation) {
    case "Project":
      name = context().projectSetup.name;
      break;
    case "Resource":
      name = context().resourceSetup.name;
      break;
    default: throw new Error(`Model:{${modelUsedForCreation}} is not yet supported. Please add if required`);
  }
  await clickToElement(locatorParse(Selectors.tempus.modelView.projectGrid.specificResourceOrProjectName, name));
});

Then('ui: Click on Insert columns dropdown in Project Grid section of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGrid.insertColumnsDropdown);
  await browser.pause(SHORT_PAUSE); //Needed for dropdown to open or close
});

Then(/^ui: Search and select CF: "([^"]*)" in Insert Columns of Project Grid area in Tempus model view page$/, async (attributeToBeSearched: string) => {
  await slowInputFilling(Selectors.tempus.modelView.projectGrid.searchInputboxInInsertColumns, attributeToBeSearched);
  await browser.pause(SHORT_PAUSE); //Needed for Search results to appear
  const specificCFCheckboxInInsertColumnsDropdown = await element(locatorParse(Selectors.tempus.modelView.projectGrid.specificCFCheckboxInInsertColumnsDropdown, attributeToBeSearched));
  const classValue = await specificCFCheckboxInInsertColumnsDropdown.getAttribute("class");
  if (!classValue.includes("active")) {
    await specificCFCheckboxInInsertColumnsDropdown.click();
  }
});

Then(/^ui: Softassert if CF: "([^"]*)" is "(displayed|not displayed)" in Project Grid area in Tempus model view page$/, async (attributeToBeAsserted: string,
  viewStatus: string) => {
  const displayedStatus = await isElementDisplayed(locatorParse(Selectors.tempus.modelView.projectGrid.columnHeader, attributeToBeAsserted));
  if (viewStatus === "displayed") {
    await context().softAssert.isTrue(displayedStatus, `CF:{${attributeToBeAsserted}}'s header was not displayed in Project Grid area in Tempus model view page`)
  } else {
    await context().softAssert.isFalse(displayedStatus, `CF:{${attributeToBeAsserted}}'s header was still displayed in Project Grid area in Tempus model view page`)
  }
});

Then('ui: Click on Eye icon in Project section of a Tempus model', async () => {
  await clickToElement(Selectors.tempus.modelView.eyeIcon);
  await browser.pause(SHORT_PAUSE); //Needed for dropdown to open or close
});

Then('ui: I validate Financial coin icon is present beside project name containing financials', async () => {
  const ele = await locatorParse(Selectors.tempus.modelView.projectNameFinancialCoinIcon, context().projectSetup.name);
  const validate = await isElementDisplayed(ele);
  context().softAssert.isTrue(validate, `Grid View: The Financial coin icon is not present beside project name ${context().projectSetup.name}`);
})

Then('ui: I validate that the tooltip of Project bar has reverted', async () => {
  const currentYear = moment().year();
  const firstDayOfYear = moment().year(currentYear).startOf('year').format('DD MMM YYYY');
  const lastDayOfYear = moment().year(currentYear).endOf('year').format('DD MMM YYYY');

  await browser.pause(MEDIUM_PAUSE); // Needed for the revert functionality to take action
  await $(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[1]').moveTo();
  await $(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[1]').moveTo();
  await doubleClickToElement(Selectors.tempus.modelView.projectGantt.taskOrProjectbarBody + '[1]');

  const locator = Selectors.tempus.modelView.toolTipBar
    .replace("{{startDate}}", firstDayOfYear)
    .replace("{{endDate}}", lastDayOfYear)
  const ele = await isElementDisplayed(locator);
  await context().softAssert.isTrue(ele, `ProjectBar: Data in the Tooltip is not reverted back`)
})

Then(/^ui: I validate that the attribute "([^"]*)" has same value for both Cloned Project and Original project$/, async (attributeName: string) => {
  const locator = await elementParse({ locatorString: Selectors.tempus.modelView.attributeValueByProjectName, parsing: context().projectSetup.name });
  const originalAttributeValue = await locator.getText();
  const locator2 = await elementParse({ locatorString: Selectors.tempus.modelView.attributeValueByProjectName, parsing: context().projectSetup.name + `_Clone` });
  const cloneAttributeValue = await locator.getText();
  await context().softAssert.equal(originalAttributeValue, cloneAttributeValue, `Project {${context().projectSetup.name}} and Cloned Project {${context().projectSetup.name + `_Clone`}} has different attribute value for {${attributeName}}`);
})

Then(/^ui: Click on option: "([^"]*)" in Group by dropdown of Project Gantt area in Tempus model view page$/, async (optionToBeSelected: string) => {
  if(optionToBeSelected== 'Created CF') {
    optionToBeSelected = context().attributeSetup.name;
  };
  await elementParseAndClick(Selectors.tempus.modelView.projectGantt.specificCFInGroupByDropdown, optionToBeSelected);
});

Then('ui: I expand the groupBy bar to show Project in model view', async () => {
  await clickToElement(Selectors.tempus.modelView.projectGantt.expandGroupByAttribute);
})

Then(/^ui: I sort the "([^"]*)" column head in the lower resource grid in "(Ascending|Descending|Normal)" order$/, async (columnHeader: string, sortingOrder: string) => {
  let sortingLocator;

  if (sortingOrder === "Ascending") {
      sortingLocator = Selectors.tempus.modelView.resourceGrid.sortingAscending;
  } else if (sortingOrder === "Descending") {
      sortingLocator = Selectors.tempus.modelView.resourceGrid.sortingDecending;
  } else if (sortingOrder === "Normal") {
      sortingLocator = '';
  }

  const locator = `(//span[@class="header-name" and text()="${columnHeader}"]${sortingLocator})[1]`;

  let ele = await isElementDisplayed(locator);
});

Then('ui: I select the first CF under the Resource Grid area of tempus model',async () => {
  context().CFName =  await (await $(Selectors.tempus.modelView.resourceGrid.firstCFName).getText()).trim();
  await $(Selectors.tempus.modelView.resourceGrid.CFNameButton).moveTo();
  await $(Selectors.tempus.modelView.resourceGrid.CFNameButton).moveTo();
  await clickToElement(Selectors.tempus.modelView.resourceGrid.editCFButton);
});

Then('ui: I validate the name of the opened CF',async () => {
  const ele = await (await $(Selectors.tempus.opportunityMap.valdiateModelName).getText()).trim();
  await assert(ele.includes(context().CFName), `CF Name: '${ele}' does not contain text '${context().CFName}'`);
})

Then('ui: I validate that the resource data is not displayed due to no data being found',async () => {
  const ele = await isElementDisplayed(Selectors.tempus.modelView.resourceGrid.noResourceDataValidation);
  await context().softAssert.isTrue(ele, `The Resource grid is still visible and data is still being shown in the grid`)
})