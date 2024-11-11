/* eslint-disable no-case-declarations */
import { Then, When } from '@cucumber/cucumber';
import { clickToElement, element, elementDragAndDrop, dragAndDrop, elementParse, elementParseAndClick, formFill, locatorParse, slowInputFilling } from '../../../../core/func';
import Selectors from '../../../../core/selectors';
import { context } from '../../../../utils/context';
import DateTime from '../../../../core/datetime';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../core/timeouts';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';
import { viewModel } from '../../../../models/ViewManagement.model';

Then('ui: I search for the template in the search project section and validate that its not present', async () => {
  const { name } = context().projectTemplate;

  await slowInputFilling(Selectors.bulkProjectAllocation.searchBtn, name);

  const ele = await $(Selectors.bulkProjectAllocation.projectName.replace('{{project_name}}', name))
  await expect(ele).not.toBeExisting();

});

Then('ui: I enter current year in start and End date in BPA', async () => {

  const startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await formFill([
    { locator: Selectors.bulkProjectAllocation.startDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocation.startDateInputBox, value: startDate, action: 'setValue' },
    { locator: Selectors.bulkProjectAllocation.endDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocation.endDateInputBox, value: endDate, action: 'setValue' },
  ]);
  await clickToElement(Selectors.bulkProjectAllocation.pageTitle);
})

Then('ui: I Click on Create View',async () => {
  await browser.pause(MEDIUM_PAUSE/2);
  await clickToElement(Selectors.bulkProjectAllocation.createViewButton)
})

Then('ui: I rename the new view with the model name',async () => {
  context().viewName = viewModel().name;
  await browser.pause(MEDIUM_PAUSE/2);
  await elementParseAndClick(Selectors.bulkProjectAllocation.renameViewButton, 'New view 1');
  await slowInputFilling(Selectors.bulkProjectAllocationFlatgrid.viewGrid.inputRenameView, `${context().viewName}`);
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.viewGrid.conformRenameView);
})

Then('ui: I create a clone of the view created inside view block', async () => {
  const name = `${context().viewName} clone`
  await elementParseAndClick(Selectors.bulkProjectAllocationFlatgrid.viewGrid.viewCloneButton, context().viewName);
  await expect(await elementParse({ locatorString: Selectors.bulkProjectAllocationFlatgrid.viewGrid.validateViewByName, parsing: name })).toBeDisplayed();
})

When(/^ui: I reorder "([^"]*)" above "([^"]*)" in the BPA$/, async (viewName1: string, viewName2: string) => {
  
  if (viewName1 === "original view") {
    viewName1 = context().viewName;
    viewName2 = `${context().viewName} clone`;
  }

  else if (viewName1 === "cloned view") {
    viewName2 = context().viewName;
    viewName1 = `${context().viewName} clone`;
  }

  await dragAndDrop(
    locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.viewDragIcon, viewName1),
    locatorParse(Selectors.bulkProjectAllocationFlatgrid.viewGrid.viewDragIcon, viewName2)
  ); 
    
})

Then(/^ui: I click on specific Dataset "([^"]*)" in BPA$/, async (planType: string) => {
  await elementParseAndClick(Selectors.bulkProjectAllocation.specificPlanType, planType);
});

Then(/^ui: I click on specific tab in selection grid "([^"]*)" in BPA$/, async (tab: string) => {
  await elementParseAndClick(Selectors.bulkProjectAllocation.specificTabInSelectionGrid, tab);
});

Then('ui: I search for project created using model in selection grid in BPA', async () => {
  await elementParseAndClick(Selectors.bulkProjectAllocation.searchProjects, context().projectSetup.name);
  await slowInputFilling(Selectors.bulkProjectAllocation.searchProjects, context().projectSetup.name);
  await browser.pause(SHORT_PAUSE * 2); //Required to display project
});

Then('ui: I search for resource created using model in selection grid in BPA', async () => {
  const {name} = context().resourceSetup;
  await elementParseAndClick(Selectors.bulkProjectAllocation.searchResources, name);
  await slowInputFilling(Selectors.bulkProjectAllocation.searchResources, name);
  await browser.pause(SHORT_PAUSE * 2); //Required to display resource
});

Then(/^ui: I click on specific "(Project|Resource)" checkbox in BPA$/, async (projectOrResource: string) => {
  switch (projectOrResource.toLowerCase()) {
    case "project":
      const value = context().projectSetup.name;
      await elementParseAndClick(Selectors.bulkProjectAllocation.specificResourceOrProjectSelectionCheckbox, value);
      break;
    case "resource":
      const {name} = context().resourceSetup;
      await elementParseAndClick(Selectors.bulkProjectAllocation.specificResourceOrProjectSelectionCheckbox, name);
      break;
    default: throw Error(`Value :{${projectOrResource}} is not yet supported.\nSupported values :\n1.Project\n2.Resource`);
  }
});

Then(/^ui: Select Date mode as:"([^"]*)" in BPA$/, async (dateModeToBeSelected: string) => {
  await clickToElement(Selectors.bulkProjectAllocation.dateModeDropdown);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, dateModeToBeSelected);
});

Then(/^ui: I click on specific unit "([^"]*)" in BPA$/, async (unit: string) => {
  switch (unit) {
    case "Time":
    case "Cost":
    case "FTEU":
    case "FTEUP":
    case "Manday":
      const ele = await elementParse({ locatorString: Selectors.bulkProjectAllocation.specificUnit, parsing: unit });
      await ele.click();
      break;
    default:
      throw new Error(`Unit:${unit} is not supported.\nSupported Values:\n1.Time\n2.Cost\n3.FTEU\n4.FTEUP\n5.Manday`);
  }
});

Then(/^ui: I click on aggregate by "(Project|Resource)" tab in BPA details grid$/, async (projectOrResource: string) => {
  await elementParseAndClick(Selectors.bulkProjectAllocation.aggregateByProjectResource, projectOrResource);
});

Then(/^ui: I verify specific "(Project|Resource)" value is displayed in specific cell "([^"]*)" in BPA$/, async (projectOrResource: string, cellIndex: string) => {
  let ele1;
  const locationString = Selectors.bulkProjectAllocation.specificCellInBPADetailsGrid;
  switch (projectOrResource.toLowerCase()) {
    case "project":
      const value = context().projectSetup.name;
      ele1 = locationString.replace('{{projectOrResourceName}}', value).replace('{{cellIndex}}', cellIndex);
      break;
    case "resource":
      const {name} = context().resourceSetup;
      ele1 = locationString.replace('{{projectOrResourceName}}', name).replace('{{cellIndex}}', cellIndex);
      break;
    default:
      throw new Error(`Value:${projectOrResource} is not supported.\nSupported Values:\n1.Project\n2.Resource`);
  }
  const ele2 = await element(ele1);
  const val = (await ele2.getText()).trim();
  await context().softAssert.isTrue(!isNaN(parseInt(val)), `Value: {${val} is not displayed in BPA detail grid}`);
});
