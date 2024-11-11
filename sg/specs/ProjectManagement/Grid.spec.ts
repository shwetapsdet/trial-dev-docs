/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import { Given, Then, When } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import {
  clickToElement, element, slowInputFilling, elementParse, mayBeElement, elementParseAndClick, locatorParse, elementArray, doubleClickToElement, formFill, selectFromDropdown, verifyElementIsDisplayed, isElementDisplayed, clearTextUsingBackspace, findAndSetValue, pasteAllText, hitEnter,
} from '../../../../core/func';
import { context } from '../../../../utils/context';
import { ProjectOptionsItems } from '../../../../core/constants';
import { DEFAULT_STEP_TIMEOUT, MEDIUM_PAUSE, MEDIUM_STEP_TIMEOUT, SHORT_PAUSE, SHORT_TIMEOUT } from '../../../../core/timeouts';
import { AttributeTypes, NavigationOptions, ProjectOptions } from '../../../../core/enums';
import { Project } from '../../../../helpers/Project.helper';
import { projectModel } from '../../../../models/project.model';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';
import { Common } from '../../../../helpers/common.helper';
import { ProjectGrid } from '../../../../helpers/ProjectManagement/Grid.helper';
import { ProjectAttributes } from '../../../../helpers/ProjectManagement/ProjectEdit/Attributes.helper';
import { Common as ProjectEditCommon } from '../../../../helpers/ProjectManagement/ProjectEdit/Common.helper';
import DateTime from '../../../../core/datetime';
import * as moment from 'moment'
import { faker } from '@faker-js/faker';
import { assert } from 'chai';
import { ResourceGrid } from '../../../../helpers/ResourceManagement/ResourceManagementGrid.helper';
import { waitForFileToDownload } from '../../../../core/fileUtilities';
import * as path from 'path';



Given('ui: I create a new Regular Project', async () => {
  const { name } = context().projectSetup;
  await browser.pause(SHORT_PAUSE);
  await Project.createRegularProject(name);
});

When('ui: I navigate to Project', async () => {
  const { name } = context().projectSetup;
  // await findAndSetValue(Selectors.projectManagement.txtQuickSearch, name);
  await formFill([
    { locator: Selectors.projectManagement.common.txtQuickSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.common.txtQuickSearch, value: name, action: 'setValue' },
  ]);
  await clickToElement(Selectors.projectManagement.projectLink.replace('{{project_name}}', name));
});

Given('ui: I varifty scribe option is avaialble for all project options and verify messaging', { timeout: MEDIUM_STEP_TIMEOUT * 10 }, async () => {
  for (let i = 0; i < ProjectOptionsItems.length; ++i) {
    await ProjectEditCommon.clickOnProjectOptionAndSelectSpecificOption(ProjectOptionsItems[i]);
    await expect(await element(Selectors.projectManagement.projectEdit.inputProjectName)).toBeDisplayed();
    await verifyElementIsDisplayed(Selectors.projectManagement.common.btnScribe);

    // const message = `Hi ! - ${moment().format('MM-DD-YYYY HH:mm:ss')}`.split('')
    // const el = await element(Selectors.scribe().txtChatArea)
    // await el.sendKeys(message)
    // await browser.pause(2000)
    // await clickToElement(Selectors.scribe().btnSendMessage);

    // await expect(
    //     await element(
    //         Selectors.scribe().scribeMessageText.replace('{{scribe_message_section}}', ProjectOptionsItems[i]).replace('{{message}}', message)
    //     )
    // ).toBeDisplayed()
  }
});

Then('ui: I verify scribe option is not avaialble', async () => {
  const scribeButtonDisplayedStatus = await isElementDisplayed(Selectors.projectManagement.common.btnScribe);
  await assert.isFalse(scribeButtonDisplayedStatus, "Scribe icon was still displayed in SPA");
});

Then(/^ui: I select Specific Option "([^"]*)" In Project Navigation Dropdown$/, async (projectNavigationOption: string) => {
  await clickToElement(Selectors.projectManagement.ddProjectNavigationDropdown);
  const navigationOption = await elementParse({ locatorString: Selectors.projectManagement.ddProjectNavigationOption, parsing: projectNavigationOption });
  await expect(navigationOption).toBeDisplayed();
  navigationOption.click();
});

Then('ui: I click on columns dropdown in project list page', async () => {
  await ProjectGrid.clickOnColumnsDropdown();
});

Then(/^ui: I uncheck and select attributes "([^\"]*)" in columns dropdown$/, async (attributeNames: string) => {
  await ProjectGrid.uncheckSelectAllCheckbox();
  await ProjectGrid.searchAndSelectColumns(attributeNames);
});

Then(/^ui: I edit specific attribute "([^\"]*)" of project "([^\"]*)"$/, async (attributeName: string, projectName: string) => {
  const locationString = Selectors.projectManagement.editAttributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', projectName).replace('{{attributeName}}', attributeName);
  await clickToElement(ele, true);
  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element(ele)).doubleClick();
});

Then(/^ui: I select attribute value "([^\"]*)" in project list page edit attribute popup$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.projectManagement.txtSearchFieldInEditAttributePopup)).setValue(attributes[i]);
    const ele = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInEditAttributePopup, parsing: attributes[i] });
    if (await ele.isSelected()) {
    } else {
      await ele.click();
    }
  }
});

Then('ui: I click on save button on attribute popup that available on project list page', async () => {
  await ProjectGrid.clickOnSaveButtonInAttributeEditModal();
  await clickToElement(Selectors.common.loginName); //Required to close the dialog
  await clickToElement(Selectors.common.loginName);
});

Then(/^ui: I search for project "([^\"]*)" in project list page$/, async (projectName: string) => {
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue(projectName);
});

Then(/^ui: I click on project "([^\"]*)" in project list page$/, async (projectName: string) => {
  await elementParseAndClick(Selectors.projectManagement.projectLink, projectName);
  await expect(await element(Selectors.projectManagement.projectEdit.inputProjectName)).toHaveValue(projectName);
});

Then(/^ui: I verify attribute "([^\"]*)" having value "([^\"]*)" for project "([^\"]*)" in project list page$/, async (attributeName: string, attributeValue: string, projectName: string) => {
  const locationString = Selectors.projectManagement.attributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', projectName).replace('{{attributeName}}', attributeName);
  await expect(await element(ele)).toHaveText(attributeValue);
});

Then('ui: I click on clear filter in project list page', async () => {
  const ele = await mayBeElement(Selectors.projectManagement.btnRemoveFilter);
  if (ele) {
    await clickToElement(Selectors.projectManagement.btnRemoveFilter);
  }
});

Then(/^ui: Create "([^\"]*)" projects and assign values to attributes created earlier$/, { timeout: (DEFAULT_STEP_TIMEOUT * 20) }, async (numberOfProjectsToBeCreated: number) => {
  context().projects = [];

  for (let i = 0; i < numberOfProjectsToBeCreated; i++) {
    await Common.quickNavigateToSpecificSection(NavigationOptions.ProjectManagement);
    context().projects.push(projectModel());
    await Project.createRegularProject(context().projects[i].name);
    const attributes = context().attributes;

    const attributeValues = new Map();
    context().attributeValues = attributeValues;
    let valueToBeSelected;


    await Project.switchToOption(ProjectOptions.Attributes);

    for (let i = 0; i < 2; i++) {
      switch (attributes[i].type) {
        case AttributeTypes.Calculated:
        case AttributeTypes.Cascading:
        case AttributeTypes.Hierarchy:
        case AttributeTypes.Resource:
        case AttributeTypes.ResourcesList:
          break;
        case AttributeTypes.Bool:
          valueToBeSelected = ["Not set", "Yes", "No"][Math.floor(Math.random() * ["Not set", "Yes", "No"].length)];
          break;
        case AttributeTypes.Selection:
          valueToBeSelected = attributes[i].selectionValues[Math.floor(Math.random() * attributes[i].selectionValues.length)];
          break;
        case AttributeTypes.MultiSelection:
        case AttributeTypes.Tags:
          valueToBeSelected = attributes[i].selectionValues[1];
          break;
        case AttributeTypes.Currency:
        case AttributeTypes.Number:
        case AttributeTypes.ProgressBar:
          valueToBeSelected = faker.string.numeric(2);
          break;
        case AttributeTypes.PrecisionNumber:
          valueToBeSelected = faker.number.float();
          break;
        case AttributeTypes.String:
        case AttributeTypes.Text:
          valueToBeSelected = faker.science.chemicalElement().name + " " + faker.commerce.department();
          break;
        case AttributeTypes.URL:
          valueToBeSelected = faker.internet.url();
          break;
        case AttributeTypes.Date:
          valueToBeSelected = moment(faker.date.between({ from: moment().dayOfYear(1905).toDate(), to: moment().dayOfYear(2050).toDate() })).format(GeneralSettingsDefaultValues.global.dateFormat);
          break;
        default: throw Error(`Attribute type :{${attributes[i].type}} is not yet supported.\nPlease add if required\n`);
      }
      attributeValues.set(attributes[i].name, valueToBeSelected);
      await ProjectAttributes.changeAttributeValueInAttributesSection(attributes[i].name, attributes[i].type, valueToBeSelected);
    }
    await ProjectEditCommon.clickOnSaveButtonAndWaitForItToBeClickable();
  }
});

Then('ui: Select attributes created earlier and verify if sorting in PM Grid', async () => {
  const isSorted = require('is-sorted')

  const attributes = context().attributes;
  for (let i = 0; i < attributes.length; i++) {
    let elements = [], elementTexts = [];
    await ProjectGrid.clickOnColumnsDropdown();
    await ProjectGrid.searchColumns("");
    //Needed for search to be cleared
    await browser.pause(SHORT_PAUSE);
    await ProjectGrid.uncheckSelectAllCheckbox();
    await ProjectGrid.searchAndSelectColumns(attributes[i].name);
    await ProjectGrid.clickOnColumnsDropdown();

    switch (attributes[i].type) {
      case AttributeTypes.Calculated:
      case AttributeTypes.Cascading:
      case AttributeTypes.Hierarchy:
      case AttributeTypes.Resource:
      case AttributeTypes.ResourcesList:
        break;
      case AttributeTypes.Currency:
        //Ascending order check
        await ProjectGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = await elementArray(locatorParse(Selectors.projectManagement.grid.cFValuesByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].replace(/[$€£]/g, '').trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in PM grid were not sorted in ascending order`);

        //Descending order check
        await ProjectGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = [];
        elementTexts = [];
        elements = await elementArray(locatorParse(Selectors.projectManagement.grid.cFValuesByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].replace(/[$€£]/g, '').trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts, reverseComparator), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in PM grid were not sorted in descending order`);
        break;
      case AttributeTypes.Number:
      case AttributeTypes.ProgressBar:
      case AttributeTypes.PrecisionNumber:
      case AttributeTypes.String:
      case AttributeTypes.Text:
      case AttributeTypes.Bool:
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.URL:
      case AttributeTypes.Date:
      case AttributeTypes.Tags:
        //Ascending order check
        await ProjectGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = await elementArray(locatorParse(Selectors.projectManagement.grid.cFValuesByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in PM grid were not sorted in ascending order`);

        //Descending order check
        await ProjectGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = [];
        elementTexts = [];
        elements = await elementArray(locatorParse(Selectors.projectManagement.grid.cFValuesByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts, reverseComparator), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in PM grid were not sorted in descending order`);
        break;
      default: throw Error(`Attribute type :{${attributes[i].type}} is not yet supported.\nPlease add if required\n`);
    }
  }

});

function reverseComparator(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

Then('ui: Clear filters if any in PM Grid', async () => {
  await ProjectGrid.clearFiltersIfAny();
});

Then('ui: Ungroup groups if any in PM Grid', async () => {
  await ProjectGrid.unGroupIfAny();
});

Then('ui: Create a new Regular Project and set current year as date for allocations', async () => {
  await Project.createProjectAndSetCurrentYearAsAllocationDates(context().projectSetup.name);
});

Then('ui: Select attributes created earlier in PM Grid', async () => {
  let attributes;
  if (context().attributes === undefined) {
    attributes = context().projectAttributes;
  } else {
    attributes = context().attributes;
  }
  await ProjectGrid.clickOnColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  for (const attribute of attributes) {
    await ProjectGrid.searchAndSelectColumns(attribute.name);
  }
  await ProjectGrid.clickOnColumnsDropdown();
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to close and Column to appear
});

Then(/^ui: Click on cell in row no\. "([^"]*)", column no. "([^"]*)" in PM grid and enter value "([^"]*)"$/, async (rowNumber: string,
  columnNumber: string, valueToBeEntered: string) => {
  const cellLocator = Selectors.projectManagement.grid.cFValuesCellByRowAndColumnIndex
    .replace('{{columnIndex}}', columnNumber)
    .replace('{{rowIndex}}', rowNumber);
  await doubleClickToElement(cellLocator);
  await browser.pause(SHORT_PAUSE);//Needed for inputbox to open
  await ProjectGrid.enterValueInInputBoxWhileEditingAndSaveIt(valueToBeEntered)
});

/**
   * Clicks on the cell in specific row and column in PM Grid and verify it has a specific value
   *
   * @param rowNumber - rowNumber strarts from 1 where 1 will fetch you the first row and 2 will fetch second row and so on...
   * @param columnIndex - columnIndex strarts from 0 where 0 will fetch you the first column and 1 will fetch second column and so on...
   * @returns
   *
   */
Then(/^ui: Click on cell in row no\. "([^"]*)", column no. "([^"]*)" in PM grid and verify its value is "([^"]*)"$/, async (rowNumber: string,
  columnIndex: string, expectedValue: string) => {
  const cellLocator = Selectors.projectManagement.grid.cFValuesCellByRowAndColumnIndex
    .replace('{{columnIndex}}', columnIndex)
    .replace('{{rowIndex}}', rowNumber);
  const actualValue = await (await element(cellLocator)).getText();
  await context().softAssert.equal(actualValue, expectedValue, `Cell of row#:{${rowNumber}}, column#:{${columnIndex}} has incorrect value in PM grid`);
});

/**
   * Enter specific value in specific column of current row in PM grid and hitEnter
   *
   * @param valueToBeEntered - Value to be entered
   * @param columnIndex - columnIndex strarts from 0 where 0 will fetch you the first column and 1 will fetch second column and so on...
   * @returns
   *
   */
Then(/^ui: Enter "([^"]*)" in column no\. "([^"]*)" in current row in PM grid$/, async (valueToBeEntered: string, columnNumber: string) => {
  await doubleClickToElement(locatorParse(Selectors.projectManagement.grid.cFValuesCellOfCurrentRowAndColumnIndex, columnNumber));
  await ProjectGrid.enterValueInInputBoxWhileEditingAndSaveIt(valueToBeEntered)
});

Then('ui: I verify specific project name created using model is displayed', async () => {
  const ele = await elementParse({ locatorString: Selectors.projectManagement.specificProjectNameInputBox, parsing: context().projectSetup.name });
  await expect(ele).toBeDisplayed();
});

Then(/^ui: Create "([^\"]*)" regular projects with suffix in name as "([^\"]*)"$/, { timeout: (DEFAULT_STEP_TIMEOUT * 20) }, async (numberOfProjectsToBeCreated: number, suffix: string) => {
  context().projects = [];

  for (let i = 0; i < numberOfProjectsToBeCreated; i++) {
    await Common.quickNavigateToSpecificSection(NavigationOptions.ProjectManagement);
    context().projects.push(projectModel());
    await Project.createRegularProject(context().projects[i].name + suffix);
  }
});

Then('ui: Select Multi-Selection and resources lits attributes created earlier in PM Grid', async () => {
  await ProjectGrid.clickOnColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  await ProjectGrid.searchAndSelectColumns(context().attributes[0].name);
  await ProjectGrid.searchAndSelectColumns(context().resourcesListAttribute.name);
  await ProjectGrid.clickOnColumnsDropdown();
});

Then(/^ui: Select new values for Multi-Selection attributes for all projects with suffix "([^\"]*)" and verify$/, async (suffix: string) => {
  for (const project of context().projects) {
    await ProjectGrid.changeAttributeForSpecificProjectAndSave(project.name + suffix, context().attributes[0].name, context().attributes[0].type, context().attributes[0].selectionValues);
  }
  const expectedValue: string = context().attributes[0].selectionValues + "";

  for (const project of context().projects) {
    await ProjectGrid.verifyAttributeValue(project.name + suffix, context().attributes[0].name, context().attributes[0].type, expectedValue.replaceAll(",", ", "));
  }
});

Then(/^ui: Select new values for Resources List attribute for all projects with suffix "([^\"]*)" and verify$/, async (suffix: string) => {
  await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(context().projects[0].name, context().resourcesListAttribute.name);
  const resourceNames: string[] = [];
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 1 })).getText()).trim());
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 2 })).getText()).trim());
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 3 })).getText()).trim());
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 4 })).getText()).trim());

  await clickToElement(Selectors.projectManagement.grid.btnCancelInEditAttributePopup);
  await browser.pause(SHORT_PAUSE);

  for (const project of context().projects) {
    await ProjectGrid.changeAttributeForSpecificProjectAndSave(project.name + suffix, context().resourcesListAttribute.name, context().resourcesListAttribute.type, resourceNames.slice(0, 2));
  }

  for (const project of context().projects) {
    await ProjectGrid.changeAttributeForSpecificProjectAndSave(project.name + suffix, context().resourcesListAttribute.name, context().resourcesListAttribute.type, resourceNames.slice(-2));
  }


  for (const project of context().projects) {
    await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(project.name + suffix, context().resourcesListAttribute.name);
    await ResourceGrid.verifyIfResourceIsSelectedWhenEditingResourcesListCF(resourceNames);
  }
});

Then('ui: Create a new Regular Project with current year as date for allocations', async () => {
  await Project.createProjectWithCurrentYearAsAllocationDates(context().projectSetup.name);
});

Then('ui: Create new view in PM grid and select it', async () => {
  const { name: viewName } = context().viewSetup;
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnCreateViewButton();
  await browser.pause(SHORT_PAUSE);
  await ProjectGrid.clickOnEditButtonOfViewByIndex("1");
  await ProjectGrid.enterViewnameInEditInputBoxAndClickOnCheckMark(viewName);
  await ProjectGrid.clickOnSpecificView(viewName);
  await ProjectGrid.verifySpecificViewIsSelected(viewName);
});

When('ui: I search for Template', async () => {
  const { name } = context().projectTemplate;

  await slowInputFilling(Selectors.projectManagement.common.txtQuickSearch, context().ProjectTemplate().name);
  await clickToElement(Selectors.projectManagement.projectLink.replace('{{project_name}}', name));
});

When(/^ui: I select "([^\"]*)" view in PM$/, async (gridView: string) => {
  await elementParseAndClick(Selectors.projectManagement.grid.projectManagementView, gridView);
})

When('ui: I validate that the template is not present', async () => {
  const { name } = context().projectTemplate;
  await browser.pause(MEDIUM_PAUSE); //needed for the Search bar to be displayed
  await findAndSetValue(Selectors.projectManagement.common.txtQuickSearch, name);

  const ele = await isElementDisplayed(Selectors.projectManagement.projectLink.replace('{{project_name}}', name))
  await assert.isFalse(ele, `Template ${name} is still visible`);
})

Given('ui: I create another new Regular Project', async () => {
  const { name } = context().projectSetup2;
  await browser.pause(SHORT_PAUSE);
  await Project.createRegularProject(name);
});

When('ui: I navigate to another Project', async () => {
  const { name } = context().projectSetup2;
  await slowInputFilling(Selectors.projectManagement.common.txtQuickSearch, name);
  await elementParseAndClick(Selectors.projectManagement.projectLink, name);
});

Then('ui: Uncheck select all checkbox in Columns or Group By dropdown', async () => {
  await ProjectGrid.uncheckSelectAllCheckbox();
});

Then(/^ui: Select "([^"]*)" CF checkboxes in Columns or Group By dropdown$/, async (numberOfCfsToBeSelected: number) => {
  context().selectedColumns = [];
  for (let i = 1; i <= numberOfCfsToBeSelected; i++) {
    await ProjectGrid.selectAttribueInColumnsOrGroupByDropdownByIndex(i + "");
    const attributeName = await element(locatorParse(Selectors.projectManagement.grid.cFNameInColumnsOrGroupByDropdownByIndex, i + ""));
    context().selectedColumns.push(await attributeName.getText());
  }
});

Then(/^ui: Search for attribute "([^"]*)" in Columns$/, async (attributeName: string) => {
  await ProjectGrid.searchColumns(attributeName);
});

Then(/^ui: Click on view dropdown and select "([^"]*)" view in PM Grid$/, async (viewName: string) => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnSpecificView(viewName);
});

Then('ui: Click on view dropdown and select recently created view in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnSpecificView(context().viewSetup.name);
});

Then(/^ui: Verify if "([^"]*)" earlier selected columns are displayed in PM Grid$/, async (numberOfColumnsToBeVerified: number) => {
  for (let i = 0; i < numberOfColumnsToBeVerified; i++) {
    await ProjectGrid.verifyIfColumnIsDisplayed(context().selectedColumns[i]);
  }
});

Then('ui: Search for recently created project in PM Grid', async () => {
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue(context().projectSetup.name);
});

Then('ui: Verify if recently created project is displayed in PM Grid', async () => {
  await ProjectGrid.verifyIfProjectIsDisplayed(context().projectSetup.name)
});

Then('ui: I enter project name', async () => {
  const { name } = context().projectSetup;
  await clickToElement(Selectors.common.containsOptionName);
  await slowInputFilling(Selectors.common.nameFilter, name)
});

Then('ui: I validate project is built within today', async () => {
  await clickToElement(Selectors.common.withinFilterOption);
  await selectFromDropdown({
    dropdownOpener: Selectors.common.createdOndd,
    dropdownSelection: Selectors.common.createdOnOption
  })
});

Then('ui: I validate project is displayed', async () => {
  const { name } = context().projectSetup;
  await ProjectGrid.verifyIfProjectIsDisplayed(name);
});

Then('ui: Click on view dropdown and Lock the recently created view in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnLockIconOfSpecificView(context().viewSetup.name);
});

Then(/^ui: Verify if last "([^"]*)" earlier selected columns are not displayed in PM Grid$/, async (numberOfColumnsToBeVerified: number) => {
  const valuesToBeAsserted = context().selectedColumns.slice(-2);
  for (let i = 0; i < numberOfColumnsToBeVerified; i++) {
    await ProjectGrid.verifyIfColumnIsNotDisplayed(valuesToBeAsserted[i]);
  }
});

Then('ui: Click on view dropdown and Clone the recently created view in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnCloneIconOfSpecificView(context().viewSetup.name);
});

Then('ui: Click on recently cloned view in PM Grid', async () => {
  await ProjectGrid.clickOnSpecificView(context().viewSetup.name + " Clone");
});

Then('ui: Click on view dropdown and Delete the recently cloned view in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnDeleteIconOfSpecificView(context().viewSetup.name + " Clone");
});

Then('ui: Verify deletion of recently cloned view in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.verifyIfSpecificViewIsNotPresent(context().viewSetup.name + " Clone");
});

Then('ui: Click on view dropdown and Favourite the recently created view in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
  await ProjectGrid.clickOnFavouriteIconOfSpecificView(context().viewSetup.name);
});

Then('ui: Click on view dropdown in PM Grid', async () => {
  await ProjectGrid.clickOnViewButton();
});

Then('ui: Verify if recently created view is selected in PM Grid', async () => {
  await ProjectGrid.verifySpecificViewIsSelected(context().viewSetup.name);
});

Then('ui: Open filters section in PM Grid if it isn\'t open already', async () => {
  const filtersIconElement = await element(Selectors.projectManagement.grid.filtersIcon);
  const filterSectionStatus = await filtersIconElement.getAttribute("class");
  if (!filterSectionStatus.includes("active")) {
    await filtersIconElement.click();
  }
});

Then('ui: Verify Filtering in PM Grid', { timeout: (DEFAULT_STEP_TIMEOUT * 120) }, async () => {
  const attributes = context().attributes;
  const attributeValues = context().attributeValues;
  const { name: projectName } = context().projects[0];
  const filterOptionsForNumberTypeCFs: string[] = ["is set", "is not set", "=", ">=", ">", "<>", "<=", "<"];
  const filterOptionsForDateTypeCF: string[] = ["is set", "is not set", "before", "after", "within", "not within"];
  const filterOptionsForStringTypeCF: string[] = ["is set", "is not set", "begins with", "contains", "doesn't contain"];
  const filterOptionsForSelectionTypeCF: string[] = ["is set", "is not set", "belongs to", "doesn’t belong to"];
  const filterOptionsForMultiSelectionTypeCF: string[] = ["is set", "is not set", "belongs to all", "belongs to any", "doesn’t belong to"];

  for (let i = 0; i < attributes.length; i++) {
    const attributeName = attributes[i].name;
    const attributeValue = attributeValues.get(attributeName);
    const selectionValues: string[] = attributes[i].selectionValues;

    await ProjectGrid.clearFiltersIfAny();
    await clickToElement(Selectors.projectManagement.grid.chooseFilterDropdown);
    await browser.pause(SHORT_PAUSE);//Needed for dropdown to open

    await ProjectGrid.enterFilterNameAndClickOnIt(attributeName);

    switch (attributes[i].type) {
      case AttributeTypes.Bool:
        await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, "is false");
        if (attributeValue === 'Not set' || attributeValue === 'No') {
          await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
        } else {
          await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
        }
        await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, "is true");
        if (attributeValue === 'Yes') {
          await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
        } else {
          await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
        }
        break;
      case AttributeTypes.Currency:
      case AttributeTypes.Number:
      case AttributeTypes.ProgressBar:
      case AttributeTypes.PrecisionNumber:
        const randomNumber = Number(faker.string.numeric(1));
        for (const filterOption of filterOptionsForNumberTypeCFs) {
          await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, filterOption);
          switch (filterOption) {
            case "is set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "is not set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "=":
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) + randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) - randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case ">=":
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) + randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) - randomNumber) + "")
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case ">":
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) + randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) - randomNumber) + "")
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "<>":
              await ProjectGrid.quickSearch(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) + randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) - randomNumber) + "")
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.clickOnDeleteIconOfAttributeInFilterSection("Name");
              await browser.pause(SHORT_PAUSE);//Needed for deletion to happen
              break;
            case "<=":
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) + randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) - randomNumber) + "")
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "<":
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) + randomNumber) + "");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, (Number(attributeValue) - randomNumber) + "")
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
          }
        }
        break;
      case AttributeTypes.Date:
        let dateToBeEnteredInFilterValue;
        for (const filterOption of filterOptionsForDateTypeCF) {
          await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, filterOption);
          switch (filterOption) {
            case "is set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "is not set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "before":
              dateToBeEnteredInFilterValue = moment(attributeValue, GeneralSettingsDefaultValues.global.dateFormat).add(1, 'months').format(GeneralSettingsDefaultValues.global.dateFormat);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, dateToBeEnteredInFilterValue + "");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              dateToBeEnteredInFilterValue = moment(attributeValue, GeneralSettingsDefaultValues.global.dateFormat).subtract(1, 'months').format(GeneralSettingsDefaultValues.global.dateFormat);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, dateToBeEnteredInFilterValue + "");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "after":
              dateToBeEnteredInFilterValue = moment(attributeValue, GeneralSettingsDefaultValues.global.dateFormat).add(1, 'months').format(GeneralSettingsDefaultValues.global.dateFormat);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, dateToBeEnteredInFilterValue + "");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              dateToBeEnteredInFilterValue = moment(attributeValue, GeneralSettingsDefaultValues.global.dateFormat).subtract(1, 'months').format(GeneralSettingsDefaultValues.global.dateFormat);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, dateToBeEnteredInFilterValue + "");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "within":
              dateToBeEnteredInFilterValue = moment().format(GeneralSettingsDefaultValues.global.dateFormat);
              await ProjectGrid.quickSearch(projectName);
              await ProjectGrid.clickOnColumnsDropdown();
              await ProjectGrid.uncheckSelectAllCheckbox();
              await ProjectGrid.searchAndSelectColumns(attributeName);
              await ProjectGrid.clickOnColumnsDropdown();
              await ProjectGrid.changeAttributeForSpecificProjectAndSave(projectName, attributeName, AttributeTypes.Date, dateToBeEnteredInFilterValue);
              await ProjectGrid.clickOnDeleteIconOfAttributeInFilterSection("Name");
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "this year");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "last year");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "next year");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);

              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "this month");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "last month");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "next month");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);

              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "this week");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "last week");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "next week");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);

              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "today");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "yesterday");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "tomorrow");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "not within":
              dateToBeEnteredInFilterValue = moment().format(GeneralSettingsDefaultValues.global.dateFormat);
              await ProjectGrid.quickSearch(projectName);
              await ProjectGrid.clickOnColumnsDropdown();
              await ProjectGrid.uncheckSelectAllCheckbox();
              await ProjectGrid.searchAndSelectColumns(attributeName);
              await ProjectGrid.clickOnColumnsDropdown();
              await ProjectGrid.changeAttributeForSpecificProjectAndSave(projectName, attributeName, AttributeTypes.Date, dateToBeEnteredInFilterValue);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "this year");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "last year");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "next year");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);

              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "this month");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "last month");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "next month");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);

              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "this week");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "last week");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "next week");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);

              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "today");
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "yesterday");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Date, "tomorrow");
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
          }

        }
        break;
      case AttributeTypes.String:
      case AttributeTypes.Text:
      case AttributeTypes.URL:
        let randomValue;
        if (AttributeTypes.URL === attributes[i].type) {
          randomValue = faker.internet.url();
        } else {
          randomValue = faker.string.alphanumeric(6);
        }
        for (const filterOption of filterOptionsForStringTypeCF) {
          await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, filterOption);
          switch (filterOption) {
            case "is set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "is not set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "begins with":
              let searchQuery = "";
              for (const character of attributeValue) {
                searchQuery += character;
                await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, searchQuery);
                await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              }
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, randomValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "contains":
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);

              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, randomValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "doesn't contain":
              await ProjectGrid.quickSearch(projectName);
              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, attributeValue);
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);

              await ProjectGrid.enterFilterOptionValueForSpecificFilter(attributeName, randomValue);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
          }
        }
        break;
      case AttributeTypes.Selection:
        for (const filterOption of filterOptionsForSelectionTypeCF) {
          await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, filterOption);
          switch (filterOption) {
            case "is set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "is not set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "belongs to":
              for (const selectionValue of selectionValues) {
                await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Selection, selectionValue);
                if (attributeValue === selectionValue) {
                  await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
                } else {
                  await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
                }
                await ProjectGrid.uncheckSelectAllCheckboxInFilterOptionValuesDropdown();
                await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              }
              break;
            case "doesn’t belong to":
              for (const selectionValue of selectionValues) {
                await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.Selection, selectionValue);
                if (attributeValue === selectionValue) {
                  await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
                } else {
                  await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
                }
                await ProjectGrid.uncheckSelectAllCheckboxInFilterOptionValuesDropdown();
                await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              }
              break;
          }
        }
        break;
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (const filterOption of filterOptionsForMultiSelectionTypeCF) {
          await ProjectGrid.clickOnSpecificOptionOfFilter(attributeName, filterOption);
          const valuesToUnselect: string[] = selectionValues.filter((str: string) => str !== attributeValue);
          switch (filterOption) {
            case "is set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "is not set":
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
            case "belongs to all":
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, selectionValues);
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, [attributeValue]);
              await ProjectGrid.uncheckSelectAllCheckboxInFilterOptionValuesDropdown();
              await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, [attributeValue]);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "belongs to any":
              await ProjectGrid.clickOnFilterValueDropdownAndUncheckSelectAllCheckbox(attributeName, AttributeTypes.MultiSelection);
              await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, valuesToUnselect);
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, [attributeValue]);
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              break;
            case "doesn’t belong to":
              await ProjectGrid.quickSearch(projectName, false);
              await ProjectGrid.clickOnFilterValueDropdownAndUncheckSelectAllCheckbox(attributeName, AttributeTypes.MultiSelection);
              await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, valuesToUnselect);
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsDisplayed(projectName);
              await ProjectGrid.clickOnGridTabIcon();//To close the dropdown
              await ProjectGrid.selectFilterOptionValueForSpecificFilter(attributeName, AttributeTypes.MultiSelection, [attributeValue]);
              await browser.pause(SHORT_PAUSE);//Needed for filter to happen
              await ProjectGrid.verifyIfProjectIsNotDisplayed(projectName);
              break;
          }
        }
        break;
      default: throw Error("Not supported");
    }

  }
});

Then('ui: I click on filter order in  project management grid', async () => {
  await clickToElement(Selectors.projectManagement.grid.filterOrder);
  await browser.pause(SHORT_PAUSE);//Needed for modal to open up
});

Then(/^ui: I select filter orders "([^"]*)" in project management grid$/, async (filters: string) => {
  await browser.pause(SHORT_PAUSE); //Required to display filter options
  const filter: string[] = filters.split(',');
  for (let i = 0; i < filter.length; i++) {
    const ele = await elementParse({ locatorString: Selectors.projectManagement.grid.chkSpecificFilterOrder, parsing: filter[i] });
    if (!await ele.isSelected()) {
      await ele.waitForClickable();
      await ele.click();
    }
  }
});

Then('ui: I close filter order overlay in project management grid', async () => {
  //This is bound to fail as dev's are still decided wheter to use overlays or not
  // await clickToElementUsingJS(Selectors.resourceManagement.netAvailability.closeOptionsOverlay);
  await clickToElement(Selectors.projectManagement.grid.filterOrder);
  await browser.pause(SHORT_PAUSE);//Neded for dropdown to close
});

Then(/^ui: I uncheck filter orders "([^"]*)" in project management grid$/, async (filters: string) => {
  await browser.pause(SHORT_PAUSE); //Required to display filter options
  const filter: string[] = filters.split(',');
  for (let i = 0; i < filter.length; i++) {
    const ele = await elementParse({ locatorString: Selectors.projectManagement.grid.chkSpecificFilterOrder, parsing: filter[i] });
    if (await ele.isSelected()) {
      await ele.click();
    }
  }
});

Then(/^ui: I verify specific filter order "([^"]*)" is checked in project management grid$/, async (filter: string) => {
  const ele = await elementParse({ locatorString: Selectors.projectManagement.grid.chkSpecificFilterOrder, parsing: filter });
  await expect(ele).toBeSelected();
});

Then('ui: I search for project template created using model in project list page', async () => {
  const { name } = context().projectTemplate;
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue(name);
});

Then('ui: I verify project template is not displayed in project management grid', async () => {
  const { name } = context().projectTemplate;
  await expect(await mayBeElement(locatorParse(Selectors.projectManagement.grid.projectNameInGrid, name), MEDIUM_PAUSE)).toBeFalsy();
})

Then('ui: I verify project template is displayed in project management grid', async () => {
  const { name } = context().projectTemplate;
  const el = await elementParse({ locatorString: Selectors.projectManagement.grid.projectNameInGrid, parsing: name });
  await expect(el).toBeDisplayed();
})

Then('ui: I verify project created using model is not displayed in project management grid', async () => {
  const { name } = context().projectSetup;
  await expect(await mayBeElement(locatorParse(Selectors.projectManagement.grid.projectNameInGrid, name))).toBeFalsy();
})

Then(/^ui: I verify specific filter order "([^"]*)" is not checked in project management grid$/, async (filter: string) => {
  const ele = await elementParse({ locatorString: Selectors.projectManagement.grid.chkSpecificFilterOrder, parsing: filter });
  await expect(ele).not.toBeSelected();
});

Then('ui: I verify scribe option is displayed', async () => {
  const scribeButtonDisplayedStatus = await isElementDisplayed(Selectors.projectManagement.common.btnScribe);
  await assert.isTrue(scribeButtonDisplayedStatus, "Scribe icon was not displayed in SPA");
});

Then('ui: I uncheck and select attributes in columns dropdown', async () => {
  await ProjectGrid.uncheckSelectAllCheckbox();
  await ProjectGrid.searchAndSelectColumns(context().resourcesListAttribute.name);
});

Then('ui: I edit specific attribute of specific project', async () => {
  const locationString = Selectors.projectManagement.editAttributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', context().projectSetup.name).replace('{{attributeName}}', context().resourcesListAttribute.name);
  await clickToElement(ele, true);
  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element(ele)).doubleClick();
});

Then(/^ui: I uncheck and select newly created attribute index "([^"]*)" in columns dropdown$/, async (attributeIndex: string) => {
  await ProjectGrid.uncheckSelectAllCheckbox();
  await ProjectGrid.searchAndSelectColumns(context().attributes[attributeIndex].name);
});

Then(/^ui: I edit specific attribute index "([^"]*)" of specific project$/, async (attributeIndex: string) => {
  const locationString = Selectors.projectManagement.editAttributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', context().projectSetup.name).replace('{{attributeName}}', context().attributes[attributeIndex].name);
  await clickToElement(ele, true);
  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element(ele)).doubleClick();
});

Then(/^ui: I click on specific attribute name index "([^\"]*)" and selects its value index "([^\"]*)" in project list page edit attribute popup$/, async (attributeNameIndex: string, attributeValueIndex: string) => {
  await (await element(Selectors.projectManagement.txtSearchFieldInEditAttributePopup)).setValue(context().attributes[attributeNameIndex].selectionValues[attributeValueIndex]);
  await browser.pause(MEDIUM_PAUSE);
  const ele = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInEditAttributePopup, parsing: context().attributes[attributeNameIndex].selectionValues[attributeValueIndex] });
  if (await ele.isSelected()) {
  } else {
    await ele.click();
  }
});

Then(/^ui: I verify specific attribute name index "([^\"]*)" having value index "([^\"]*)" for specific project in project list page$/, async (attributeNameIndex: string, attributeValueIndex: string) => {
  const locationString = Selectors.projectManagement.attributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', context().projectSetup.name).replace('{{attributeName}}', context().attributes[attributeNameIndex].name);
  await expect(await element(ele)).toHaveText(context().attributes[attributeNameIndex].selectionValues[attributeValueIndex]);
});



Then(/^ui: I verify specific attribute name index "([^\"]*)" having value index "([^\"]*)" for specific project index "([^\"]*)" with suffix "([^\"]*)" in project list page$/, async (attributeNameIndex: string, attributeValueIndex: string, projectIndex: string, suffix: string) => {
  const locationString = Selectors.projectManagement.attributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', context().projects[projectIndex].name + suffix).replace('{{attributeName}}', context().attributes[attributeNameIndex].name);
  await expect(await element(ele)).toHaveText(context().attributes[attributeNameIndex].selectionValues[attributeValueIndex]);
});


Then(/^ui: I edit specific attribute index "([^"]*)" of specific project index "([^\"]*)" with suffix "([^\"]*)"$/, async (attributeIndex: string, projectIndex: string, suffix: string) => {
  const locationString = Selectors.projectManagement.editAttributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', context().projects[projectIndex].name + suffix).replace('{{attributeName}}', context().attributes[attributeIndex].name);
  await clickToElement(ele, true);
  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element(ele)).doubleClick();
});

Then(/^ui: Search for recently created project index "([^"]*)" with suffix "([^"]*)" in PM Grid$/, async (projectIndex: string, suffix: string) => {
  await formFill([
    { locator: Selectors.projectManagement.common.txtQuickSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.common.txtQuickSearch, value: context().projects[projectIndex].name + suffix, action: 'setValue' },
  ]);
});

Then(/^ui: Search for recently created project index "([^"]*)" with suffix "([^"]*)" and click on it in PM Grid$/, async (projectIndex: string, suffix: string) => {
  await formFill([
    { locator: Selectors.projectManagement.common.txtQuickSearch, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.common.txtQuickSearch, value: context().projects[projectIndex].name + suffix, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.projectManagement.projectLink, context().projects[projectIndex].name + suffix);
});

Then(/^ui: Create a new Regular Project and set year as:"([^"]*)" for allocations$/, async (year: string) => {
  await Project.createProjectWithSpecificYearAsAllocationDates(context().projectSetup.name, year);
});

Then('ui: Verify Rich text in PM Grid for recently created Cfs', async () => {
  const attributes = context().projectAttributes;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(context().projectSetup.name, attribute.name);
    await browser.pause(SHORT_PAUSE / 2);
    const richtextElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of project CF:{${attribute.name}} for project:{${context().projectSetup.name}} in PM Grid was incorrect`, true);
    await elementParseAndClick(Selectors.projectManagement.grid.specificButtonWhenEditingRichTextCF, "Cancel");
    await browser.pause(SHORT_PAUSE / 2);
  }
});

Then(/^I stored resource in context array at index "([^"]*)"$/, async (index: string) => {
  const idx = parseInt(index, 10);
  context().resources.splice(idx, 0, context().resourceSetup);
});

Then('ui: I click on Add Assignment', async () => {
  await clickToElement(Selectors.projectManagement.sPA.btnAddAssignment);
});

Then('ui: I validate Bulk Assignment Dialog Open', async () => {
  const el = await element(Selectors.projectManagement.sPA.btnBulkAssigment);
  await expect(el).toBeDisplayed();
});

Then('ui: I search for the previously created resource, select and add to project', async () => {
  for (const resource of context().resources) {
    const { name } = resource;
    await slowInputFilling(Selectors.projectManagement.sPA.txtSearchResourceInBulkAssignment, name);
    await clickToElement(`//label[text()="${name}"]`);
  }
  await clickToElement(Selectors.projectManagement.sPA.btnAddBulkAssignment);
});

Then('ui: I verify each resource is assigned to project', async () => {
  for (const resource of context().resources) {
    const { name } = resource;
    const el = await element(`//span[text()="${name}"]`);
    await expect(el).toBeExisting();
  }
});

Then('ui: Create a new Regular Project and set current year jan month start and end date for allocations', async () => {
  await clickToElement(Selectors.projectManagement.btnCreateProject);
  if (await isElementDisplayed(Selectors.projectManagement.regularProjectOption, SHORT_PAUSE * 2)) {
    await clickToElement(Selectors.projectManagement.regularProjectOption);
  }
  const createButtonInProjectCreationPage = await element(Selectors.common.btnCreate);
  await slowInputFilling(Selectors.projectManagement.projectEdit.inputProjectName, context().projectSetup.name);

  await formFill([
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: DateTime.getCurrentYearSpecificMonthEndDate("0", GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
  ]);
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);

  await createButtonInProjectCreationPage.click();
  await expect(await element(Selectors.projectManagement.sPA.checkoutButton)).toBeDisplayed();
  await expect(await elementParse({ locatorString: Selectors.projectManagement.specificProjectNameInputBox, parsing: context().projectSetup.name })).toBeDisplayed();

});

Then(/^ui: Click on "(grid|kanban|gantt)" tab in Project Management$/, async (tabToBeClicked: string) => {
  await ProjectGrid.clickOnSpecifciTab(tabToBeClicked);
});

Then('ui: Create a workflow project using recently created Project workflow', async () => {
  const { name: workflowName } = context().projectWorkflowSetup;
  await clickToElement(Selectors.projectManagement.btnCreateProject);
  await clickToElement(`//span[contains(@class,'dropdown-btn') and normalize-space(text())='${workflowName}']`);
  await slowInputFilling(Selectors.projectManagement.wflowProjectname, workflowName);
  const saveButton = await element(Selectors.common.btnSave);
  await saveButton.click();
  await browser.pause(SHORT_PAUSE);
  await saveButton.waitForClickable();
});

Then('ui: Verify if recently created public view is displayed in PM Grid', async () => {
  await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.grid.viewManagement.specificViewIcon, context().viewName)), `Specific public view:${context().viewName} was not displayed in PM grid`);
});

Then(/^ui: Double-click on cell of column:"([^"]*)" of recently created project in PM grid$/, async (columnName: string) => {
  const cellLocator = Selectors.projectManagement.grid.cfValueCellOfSpecificProject
    .replace('{{projectName}}', context().projectSetup.name)
    .replace('{{attributeName}}', columnName);
  await doubleClickToElement(cellLocator);
});

Then(/^ui: Enter or select value as:"([^"]*)" for column type:"([^"]*)" while editing attribute in PM grid and save it$/, async (
  valueToBeEntered: string, attributeType: string) => {
  switch (attributeType) {
    case AttributeTypes.Date:
      await ProjectGrid.enterOrSelectValueWhileEditingAttributeAndSaveIt(attributeType, [valueToBeEntered]);
      break;
    case AttributeTypes.Bool:
      await ProjectGrid.enterOrSelectValueWhileEditingAttributeAndSaveIt(attributeType, [valueToBeEntered]);
      break;
    default: 
      throw Error(`Attribute type :{${attributeType}} is not yet supported.\nPlease add if required\n`);
      break;
  }
});

Then(/^ui: SoftAssert if attribute:"([^\"]*)" has value:"([^\"]*)" for recently create project in PM grid$/, async (attributeName: string, expectedValue: string) => {
  const actualValue = await (await element(Selectors.projectManagement.attributeValueInProjectListPage
    .replace('{{projectName}}', context().projectSetup.name)
    .replace('{{attributeName}}', attributeName))).getText();
  await context().softAssert.equal(actualValue, expectedValue, `Project:{${context().projectSetup.name}} has incorrect value for Attribtue:{${attributeName}} in PM grid`)
});

Then('ui: Search for recently create project in PM grid', async () => {
  const txtQuickSearchElement = await element(Selectors.projectManagement.common.txtQuickSearch); //Required to close the dialog
  await clearTextUsingBackspace(txtQuickSearchElement);
  await txtQuickSearchElement.setValue(context().projectSetup.name);
});

Then(/^ui: I change filter from "([^"]*)" to "([^"]*)"$/, async (oldFilterName: string, newFilterName: string) => {
  await elementParseAndClick(Selectors.common.editFilter, oldFilterName);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open
  await ProjectGrid.enterFilterNameAndClickOnIt(newFilterName);
});

Then('ui: I validate that the view is same as selected before', async () => {
  await ProjectGrid.verifySpecificViewIsSelected(context().viewSetup.name);
});

Then('ui: Click on Create Project button in PM grid and select Regular Project if required', async () => {
  await clickToElement(Selectors.projectManagement.btnCreateProject);
  if (await mayBeElement(Selectors.projectManagement.regularProjectOption)) {
    await clickToElement(Selectors.projectManagement.regularProjectOption);
  }
});

Then('ui: Click on export icon in PM Grid', async () => {
  await clickToElement(Selectors.projectManagement.grid.exportIcon);
});

Then(/^ui: Softassert if PM Grid exported file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `Project - ${moment().format('MMM_DD_YYYY')}.xlsx`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then(/^ui: Update value for bool selection as "([^\"]*)" for latest projects with suffix "([^\"]*)"$/, async (valueSelected: string, suffix: string) => {
  for (const project of context().projects) {
    const valuesArray = valueSelected.split(',');
    await ProjectGrid.changeAttributeForSpecificProject(project.name + suffix, context().attributes[0].name, context().attributes[0].type, valuesArray);
  }
})

Then(/^ui: I verify the updated value for bool selection as "(Yes|No|Not set)" for latest projects with suffix "([^\"]*)"$/, async (valueSelected: string, suffix: string) => {
  for (const project of context().projects) {
    await ProjectGrid.verifyAttributeValue(project.name + suffix, context().attributes[0].name, context().attributes[0].type, valueSelected);
  }
})

Then(/^ui: Create a new Regular Project using model: "([^"]*)" with current year as date for allocations$/, async (modelToBeUsedForCreation: string) => {
  let projectName;
  switch (modelToBeUsedForCreation) {
    case 'Project':
      projectName = context().projectSetup.name;
      break;
    case 'Project2':
      projectName = context().projectSetup2.name;
      break;

    default: throw Error(`Model not yet supported :{${modelToBeUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Project2`);
  }
  await Project.createProjectWithCurrentYearAsAllocationDates(projectName);
});

Then('ui: Create 2nd new Regular Project with current year as date for allocations', async () => {
  await Project.createProjectWithCurrentYearAsAllocationDates(context().projectSetup2.name);
});

Then('ui: I navigate to imported project in the PM Grid', async () => {
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue('AutomationSheetImport');
  await clickToElement(Selectors.projectManagement.projectLink.replace('{{project_name}}', 'AutomationSheetImport'));
});

Then('ui: I delete the imported project in the PM Grid if present',async () => {
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue('AutomationSheetImport');
  await clickToElement('//span[text()="AutomationSheetImport"]/parent::a/preceding-sibling::span[@class="entity-grid-menu"]');
  await clickToElement(Selectors.projectManagement.grid.deleteBUtton);
  await clickToElement(Selectors.projectManagement.grid.conformDelete);
})

Then('ui: I conform the delete functionality in PM Grid',async () => {
  await clickToElement(Selectors.projectManagement.grid.conformDelete);
  await browser.pause(MEDIUM_PAUSE/2);
})

Then('ui: Click on Create Project button in PM grid and select created Template if required', async () => {
  const { name } = context().projectTemplate;
  await clickToElement(Selectors.projectManagement.btnCreateProject);
  const ele = await locatorParse(Selectors.projectManagement.templateProjectOption, name)
  if (await mayBeElement(ele)) {
    await clickToElement(ele);
  }
});

Then(/^ui: I hover on recently created project and click on "([^"]*)"$/,async(projectTab:string) => {
  const el1 = await elementParse({locatorString:  Selectors.projectManagement.grid.projectNameInGrid, parsing: context().projectSetup.name});
  await el1.moveTo()
  await elementParseAndClick(Selectors.projectManagement.grid.tooltipOptions, projectTab)
});

Then('ui: I get the URL of the recently created project', async () => {
  await browser.pause(SHORT_PAUSE/2);
  context().currentProjectURL = await browser.getUrl();
  await browser.pause(SHORT_PAUSE/2);
});

Then('ui: I navigate directly to allocation tab using the link', async () => {
  await browser.url(context().currentProjectURL.toString());
})

Then('ui: I hover on recently created project and copy the project link',async() => {
  const el1 = await elementParse({locatorString:  Selectors.projectManagement.grid.projectNameInGrid, parsing: context().projectSetup.name});
  await el1.moveTo()
  await clickToElement(Selectors.projectManagement.grid.copyProjectLink)
});

Then('ui: I hover on recently created project and click on the project', async()=> {
  await elementParseAndClick(Selectors.projectManagement.grid.projectLink,context().projectSetup.name)
  await browser.pause(SHORT_PAUSE *2); // Needed for the new tab to load
    const handles = await browser.getWindowHandles();
    if (handles.length > 1) {
      await browser.switchToWindow(handles[0]);
      await browser.closeWindow();
      await browser.switchToWindow(handles[1]);
    }
});


Then('ui: I click on open on create toggle in template project name container in PM', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.openOnCreateToggle);
});

Then('ui: Click on Create button of template creation model in PM Grid', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.createButtonInTemplateCreationModal);
});
