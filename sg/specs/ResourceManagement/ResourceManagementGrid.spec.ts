import { Given, Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
const moment = require('moment')
import { config } from '../../wdio.conf';
const servers: any = [...new Set(config.deployServers.map(item => item.baseUrl))];
import {
  clickToElement, element, formFill, slowInputFilling, selectFromDropdown, locatorParse, elementParse, elementArray, doubleClickToElement, getCurrencySymbol, elementParseAndClick, isElementDisplayed, clearTextUsingBackspace, getTextFromAllChildElements, mayBeElement, hitTab, hitEnter,
  reload,
  getElementBackgroundColor,
} from '../../../../core/func';
import Selectors from '../../../../core/selectors';
import { context } from '../../../../utils/context';
import { DEFAULT_STEP_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE, SHORT_TIMEOUT } from '../../../../core/timeouts';
import { AttributeTypes, GenericColorCodes, NavigationOptions, SystemRoles, ToggleStates } from '../../../../core/enums';
import { Common } from '../../../../helpers/common.helper';
import { ResourceGrid } from '../../../../helpers/ResourceManagement/ResourceManagementGrid.helper';
import { resourceModel } from '../../../../models/resource.model';
import { ResourceAttributesAndIdentity } from '../../../../helpers/ResourceManagement/ResourceEdit/Attributes.helper';
import { GeneralSettingsDefaultValues } from '../../../../data/generalSettings';
import { ProjectGrid } from '../../../../helpers/ProjectManagement/Grid.helper';
import { assert } from 'chai';
import { FiscalPeriod } from '../../../../helpers/FiscalPeriodManagement/FiscalPeriodManagement.helper';
import DateTime from '../../../../core/datetime';
import { resourceOperations } from "../../../../apiOperations/createResource.operations";

Given('ui: I create a new Resource with previous Role', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    name, email, username, password,
  } = context().resourceSetup;

  await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, name);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }

  const { name: roleName } = context().globalRole;

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: `//li[text()="${roleName}"]`,
  });

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail, value: email.toLowerCase(), action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: username, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.common.btnCreate, value: null, action: 'click' },
  ]);

  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(`//input[@data-previous-value="${name}"]`)).toBeDisplayed();
});

Given('ui: I create a new Resource', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
  const { name } = context().resourceSetup;
  const createButtonInResourceCreatePage = await element(Selectors.common.btnCreate);

  await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, name);

  await createButtonInResourceCreatePage.waitForClickable();
  await createButtonInResourceCreatePage.click();
  await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
});

Given('ui: I create a new Resource with email, username, password', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
  const {
    name, email, username, password,
  } = context().resourceSetup;
  const createButtonInResourceCreatePage = await element(Selectors.common.btnCreate);

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(name);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail, value: email.toLowerCase(), action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: username, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
  ]);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddItemAdministrator
  });

  await browser.pause(SHORT_PAUSE);
  await createButtonInResourceCreatePage.click();
  await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
  await expect(await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.confirmProjectName, parsing: name })).toBeDisplayed();
  await browser.pause(SHORT_PAUSE);
});

Given(/^ui: I create a new Resource and assign role "([^"]*)"$/, async (globalRoleName: string) => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    name, email, username, password,
  } = context().resourceSetup;

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(name);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await browser.pause(SHORT_PAUSE);

  await ResourceAttributesAndIdentity.seletcGlobalRole(globalRoleName);

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail, value: email.toLowerCase(), action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: username, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.common.btnCreate, value: null, action: 'click' },
  ]);

  await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
  await expect(await element(`//input[@data-previous-value="${name}"]`)).toBeDisplayed();
});

Given(/^ui: I create a new Resource with Global Role as "([^"]*)"$/, async (globalRole: string) => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
  const {
    name,
  } = context().resourceSetup;
  await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, name);
  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: `//li[text()="${globalRole}"]`,
  });
  await clickToElement(Selectors.common.btnCreate);
  await expect(await element(`//input[@data-previous-value="${name}"]`)).toBeDisplayed();
});

Then('ui: I search for resource in resource list page', async () => {
  const {
    name,
  } = context().resourceSetup;
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue(name);
});

Then('ui: I click on columns dropdown in resource list page', async () => {
  await clickToElement(Selectors.projectManagement.grid.ddColumns);
});

Then(/^ui: I uncheck and select attributes "([^"]*)" in columns dropdown in resource list page$/, async (attributeNames: string) => {
  const eleSelectAllChk = await element(Selectors.projectManagement.grid.chkSelectAllCheckboxInColumnsDropdown);
  await eleSelectAllChk.click();
  if (await eleSelectAllChk.isSelected()) {
    await eleSelectAllChk.click();
  }
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown)).setValue(attributes[i]);
    const ele = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInColumnsDropdownInProjectListPage, parsing: attributes[i] });
    if (await ele.isSelected()) { /* empty */ } else {
      await ele.click();
    }
  }
});

Then(/^ui: I edit specific attribute "([^"]*)" of resource in resource list page$/, async (attributeName: string) => {
  const {
    name,
  } = context().resourceSetup;
  const locationString = Selectors.projectManagement.editAttributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', name).replace('{{attributeName}}', attributeName);
  await clickToElement(ele, true);
  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element(ele)).doubleClick();
});

Then(/^ui: I verify and select attribute value "([^"]*)" in resource list page edit attribute popup$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.projectManagement.txtSearchFieldInEditAttributePopup)).setValue(attributes[i]);
    const eleDisplayed = await isElementDisplayed(locatorParse(Selectors.projectManagement.attributeNameInEditAttributePopup, attributes[i]), SHORT_PAUSE * 2);
    await assert.isTrue(eleDisplayed, `Specific attribute:{${attributes[i]}} was not displayed`);
    const ele = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInEditAttributePopup, parsing: attributes[i] });
    if (await ele.isSelected()) { /* empty */ } else {
      await ele.click();
    }
  }
});

Then('ui: I click on save button on attribute popup that available on resource list page', async () => {
  await ProjectGrid.clickOnSaveButtonInAttributeEditModal();
});

Then(/^ui: I verify attribute "([^"]*)" having value "([^"]*)" for model resource in resource list page$/, async (attributeName: string, attributeValue: string) => {
  const {
    name,
  } = context().resourceSetup;
  const locationString = Selectors.projectManagement.attributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', name).replace('{{attributeName}}', attributeName);
  await expect(await element(ele)).toHaveText(attributeValue);
});

Then(/^ui: I uncheck and select attribute created using model in columns dropdown in resource list page$/, async () => {

  console.log('search cols data:',context().attribute1)
  const eleSelectAllChk = await element(Selectors.projectManagement.grid.chkSelectAllCheckboxInColumnsDropdown);
  await eleSelectAllChk.click();
  if (await eleSelectAllChk.isSelected()) {
    await eleSelectAllChk.click();
  }
  await (await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown)).setValue(context().attribute1);
  const ele = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInColumnsDropdownInProjectListPage, parsing: context().attribute1 });
  if (await ele.isSelected()) { /* empty */ } else {
    await ele.click();
  }
});

Then(/^ui: I edit attribute and resource created using model in resource list page$/, async () => {
  const {
    name,
  } = context().resourceSetup;
  const locationString = Selectors.projectManagement.editAttributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', name).replace('{{attributeName}}', context().attribute2);
  await clickToElement(ele, true);
  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element(ele)).doubleClick();
});



Then(/^ui: I verify attribute created using model having value "([^"]*)" for model resource in resource list page$/, async (string, attributeValue: string) => {
  const {
    name,
  } = context().resourceSetup;
  const locationString = Selectors.projectManagement.attributeValueInProjectListPage;
  const ele = locationString.replace('{{projectName}}', name).replace('{{attributeName}}', context().attribute2);
  await expect(await element(ele)).toHaveText(attributeValue);
});

Then(/^ui: Create "([^"]*)" resources and assign values to attributes created earlier$/, { timeout: (DEFAULT_STEP_TIMEOUT * 20) }, async (numberOfProjectsToBeCreated: number) => {
  context().resources = [];

  for (let i = 0; i < numberOfProjectsToBeCreated; i++) {
    const attributeValues = new Map();
    context().attributeValues = attributeValues;
    let valueToBeSelected;

    await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
    context().resources.push(resourceModel());
    await ResourceGrid.createResource(context().resources[i].name);
    const attributes = context().attributes;
    const booleanValues = ["Not set", "Yes", "No"]

    for (let i = 0; i < 4; i++) {
      await browser.pause(200);
      switch (attributes[i].type) {
        case AttributeTypes.Calculated:
        case AttributeTypes.Cascading:
        case AttributeTypes.Hierarchy:
        case AttributeTypes.Resource:
        case AttributeTypes.ResourcesList:
          break;
        case AttributeTypes.Bool:
          valueToBeSelected = booleanValues[Math.floor(Math.random() * booleanValues.length)];
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
      await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
      await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection(attributes[i].name, attributes[i].type, valueToBeSelected);
    }
    await ResourceAttributesAndIdentity.clickOnSaveButtonAndWaitForItToBeClickable();
  }
});

Then('ui: Clear filters if any in RM Grid', async () => {
  await ResourceGrid.clearFiltersIfAny();
});

Then('ui: Ungroup groups if any in RM Grid', async () => {
  await ResourceGrid.unGroupIfAny();
});

Then('ui: Select attributes created earlier and verify if sorting in RM Grid', async () => {
  const isSorted = require('is-sorted')

  const attributes = context().attributes;
  for (let i = 0; i < attributes.length; i++) {
    let elements = [], elementTexts = [];
    await ResourceGrid.clickOnColumnsDropdown();
    await ResourceGrid.uncheckSelectAllCheckbox();
    await ResourceGrid.selectAttributesInColumnsOrGroupByDropdown(attributes[i].name);
    await ResourceGrid.clickOnColumnsDropdown();

    switch (attributes[i].type) {
      case AttributeTypes.Calculated:
      case AttributeTypes.Cascading:
      case AttributeTypes.Hierarchy:
      case AttributeTypes.Resource:
      case AttributeTypes.ResourcesList:
        break;
      case AttributeTypes.Currency:
        //Ascending order check
        await ResourceGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = await elementArray(locatorParse(Selectors.resourceManagement.grid.cFValuesCellByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].replace(/[$€£]/g, '').trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in RM grid were not sorted in ascending order`);

        //Descending order check
        await ResourceGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = [];
        elementTexts = [];
        elements = await elementArray(locatorParse(Selectors.resourceManagement.grid.cFValuesCellByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].replace(/[$€£]/g, '').trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts, reverseComparator), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in RM grid were not sorted in descending order`);
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
        await ResourceGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = await elementArray(locatorParse(Selectors.resourceManagement.grid.cFValuesCellByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in RM grid were not sorted in ascending order`);

        //Descending order check
        await ResourceGrid.clickOnColumnHeader(attributes[i].name);
        await browser.pause(SHORT_PAUSE);
        elements = [];
        elementTexts = [];
        elements = await elementArray(locatorParse(Selectors.resourceManagement.grid.cFValuesCellByColumnIndex, "0"));
        for (let i = 0; i < elements.length; i++) {
          elementTexts[i] = await (elements[i].getText());
          elementTexts[i] = elementTexts[i].trim();
        }
        context().softAssert.isTrue(isSorted(elementTexts, reverseComparator), `Values:{${elementTexts}} of CF:{${attributes[i].name}} of type:{${attributes[i].type}} in RM grid were not sorted in descending order`);
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

Then('ui: Click on Net Availability tab in RM grid', async () => {
  await clickToElement(Selectors.resourceManagement.netAvailabilityTab);
});

Then('ui: Select attributes created earlier in RM Grid', async () => {
  let attributes;
  if (context().attributes === undefined) {
    attributes = context().resourceAttributes;
  } else {
    attributes = context().attributes;
  }
  await ResourceGrid.clickOnColumnsDropdown();
  await ResourceGrid.uncheckSelectAllCheckbox();
  for (const attribute of attributes) {
    await ResourceGrid.selectAttributesInColumnsOrGroupByDropdown(attribute.name);
  }
  await ResourceGrid.clickOnColumnsDropdown();
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to close and Column to appear
});

/**
   * Clicks on the cell in specific row and column in RM Grid and enter a specific value and click on green checkmark icon
   *
   *
   * @param rowNumber - rowNumber strarts from 1 where 1 will fetch you the first row and 2 will fetch second row and so on...
   * @param columnIndex - columnIndex strarts from 0 where 0 will fetch you the first column and 1 will fetch second column and so on...
   * @returns
   *
   */
Then(/^ui: Click on cell in row no\. "([^"]*)", column no. "([^"]*)" in RM grid and enter value "([^"]*)"$/, async (rowNumber: string,
  columnNumber: string, valueToBeEntered: string) => {
  const cellLocator = Selectors.resourceManagement.grid.cFValuesCellByRowAndColumnIndex
    .replace('{{columnIndex}}', columnNumber)
    .replace('{{rowIndex}}', rowNumber);
  await doubleClickToElement(cellLocator);
  await ResourceGrid.enterValueInInputBoxWhileEditingAndSaveIt(valueToBeEntered)
});

/**
   * Clicks on the cell in specific row and column in RM Grid and verify it has a specific value
   *
   * @param rowNumber - rowNumber strarts from 1 where 1 will fetch you the first row and 2 will fetch second row and so on...
   * @param columnIndex - columnIndex strarts from 0 where 0 will fetch you the first column and 1 will fetch second column and so on...
   * @returns
   *
   */
Then(/^ui: Click on cell in row no\. "([^"]*)", column no. "([^"]*)" in RM grid and verify its value is "([^"]*)"$/, async (rowNumber: string,
  columnIndex: string, expectedValue: string) => {
  const cellLocator = Selectors.resourceManagement.grid.cFValuesCellByRowAndColumnIndex
    .replace('{{columnIndex}}', columnIndex)
    .replace('{{rowIndex}}', rowNumber);
  const actualValue = await (await element(cellLocator)).getText();
  await context().softAssert.equal(actualValue, expectedValue, `Cell of row#:{${rowNumber}}, column#:{${columnIndex}} has incorrect value in RM grid`);
});

/**
   * Enter specific value in specific column of current row in RM grid and hitEnter
   *
   * @param valueToBeEntered - Value to be entered
   * @param columnIndex - columnIndex strarts from 0 where 0 will fetch you the first column and 1 will fetch second column and so on...
   * @returns
   *
   */
Then(/^ui: Enter "([^"]*)" in column no\. "([^"]*)" in current row in RM grid$/, async (valueToBeEntered: string, columnNumber: string) => {
  await doubleClickToElement(locatorParse(Selectors.resourceManagement.grid.cFValuesCellOfCurrentRowAndColumnIndex, columnNumber));
  await browser.pause(SHORT_PAUSE);
  await ResourceGrid.enterValueInInputBoxWhileEditingAndSaveIt(valueToBeEntered);
});

Given(/^ui: Create "([^"]*)" resources with suffix in name as "([^"]*)"$/, async (numberOfResourcesToBeCreated: number, suffix: string) => {
  context().resources = [];

  for (let i = 0; i < numberOfResourcesToBeCreated; i++) {
    await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
    context().resources.push(resourceModel());
    await clickToElement(Selectors.resourceManagement.btnCreateResource);
    const { name } = context().resources[i];
    await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, name + suffix);
    await clickToElement(Selectors.resourceManagement.createButtonInResourceCreatePage);
    await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
    await expect(await element(`//input[@data-previous-value="${name + suffix}"]`)).toBeDisplayed();
  }
});

Then(/^ui: I search for resource "([^"]*)" in resource list page$/, async (resourceName: string) => {
  await slowInputFilling(Selectors.projectManagement.common.txtQuickSearch, '');
  await slowInputFilling(Selectors.projectManagement.common.txtQuickSearch, resourceName);
});

Then('ui: Select Multi-Selection and resources lits attributes created earlier in RM Grid', async () => {
  await ProjectGrid.clickOnColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  await ProjectGrid.searchAndSelectColumns(context().attributes[0].name);
  await ProjectGrid.searchAndSelectColumns(context().resourcesListAttribute.name);
  await ProjectGrid.clickOnColumnsDropdown();
});

Then(/^ui: Select new values for Multi-Selection attributes for all resources with suffix "([^"]*)" and verify$/, async (suffix: string) => {
  const expectedValue: string = context().attributes[0].selectionValues + "";
  for (const resource of context().resources) {
    await ProjectGrid.changeAttributeForSpecificProjectAndSave(resource.name + suffix, context().attributes[0].name, context().attributes[0].type, context().attributes[0].selectionValues);
    await ResourceGrid.verifyAttributeValue(resource.name + suffix, context().attributes[0].name, context().attributes[0].type, expectedValue.replaceAll(",", ", "), true);
  }
});

Then(/^ui: Select new values for Resources List attribute for all resources with suffix "([^"]*)" and verify$/, async (suffix: string) => {
  await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(context().resources[0].name, context().resourcesListAttribute.name);
  const resourceNames: string[] = [];
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 1 })).getText()).trim());
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 2 })).getText()).trim());
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 3 })).getText()).trim());
  resourceNames.push((await (await elementParse({ locatorString: Selectors.projectManagement.grid.resourceNamesByIndexWhileEditingResourcesListCF, parsing: 4 })).getText()).trim());

  await clickToElement(Selectors.projectManagement.grid.btnCancelInEditAttributePopup);
  await browser.pause(SHORT_PAUSE);

  for (const resource of context().resources) {
    await ProjectGrid.changeAttributeForSpecificProjectAndSave(resource.name + suffix, context().resourcesListAttribute.name, context().resourcesListAttribute.type, resourceNames.slice(0, 2));
  }

  for (const resource of context().resources) {
    await ProjectGrid.changeAttributeForSpecificProjectAndSave(resource.name + suffix, context().resourcesListAttribute.name, context().resourcesListAttribute.type, resourceNames.slice(-2));
  }


  for (const resource of context().resources) {
    await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(resource.name + suffix, context().resourcesListAttribute.name);
    await ResourceGrid.verifyIfResourceIsSelectedWhenEditingResourcesListCF(resourceNames, true);
    await clickToElement(Selectors.projectManagement.grid.btnCancelInEditAttributePopup);
    await browser.pause(SHORT_PAUSE);
  }
});

Then('ui: I verify current project is visible', async () => {
  await browser.pause(MEDIUM_PAUSE);
  const el = await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.capacity.cPA.currentProject, context().projectSetup.name ))
  await context().softAssert.isTrue(el, `Project: {${context().projectSetup.name}} is still not displayed`);
});

Given('ui: I create a new resource manager with username, password, global role', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    password, resourceManager,
  } = context().resourceSetup;
  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(resourceManager);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Administrator"),
  });
  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: resourceManager, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
  ]);

  await browser.pause(MEDIUM_PAUSE/2)
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Resource Manager", "Bool", "Yes");
  const el1 = await element(Selectors.common.btnCreate);
  await el1.scrollIntoView();
  await clickToElement(el1);
  await expect(await element(el1)).toBeDisplayed();
  await expect(await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, resourceManager))).toBeDisplayed();
});

Given('ui: I create a new resource by adding resource manager, username, password, global role', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    name, password, resourceManager,
  } = context().resourceSetup;

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(name);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Administrator"),
  });
  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: name, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
  ]);
  await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);

  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Resource Managers")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  };

  await browser.pause(SHORT_PAUSE);
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Resource Managers", "Multi-Selection", resourceManager);
  await browser.pause(SHORT_PAUSE);

  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Require Resource Manager Approval")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  };

  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Require Resource Manager Approval", "Bool", "Yes");

  await clickToElement(Selectors.common.btnCreate);
  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, name))).toBeDisplayed();
});

Then('ui: I validate resource is built within today', async () => {
  await clickToElement(Selectors.common.withinFilterOption);
  await selectFromDropdown({
    dropdownOpener: Selectors.common.createdOndd,
    dropdownSelection: Selectors.common.createdOnOption
  })
});

Then('ui: I validate resource is enabled', async () => {
  await clickToElement(Selectors.common.isEnabledOption);
});

Then('ui: I enter resource name', async () => {
  const { name } = context().resourceSetup;
  await clickToElement(Selectors.common.containsOptionName);
  await slowInputFilling(Selectors.common.nameFilter, name)
})

Then('ui: I validate resource is displayed', async () => {
  const { name } = context().resourceSetup;
  await elementParse({ locatorString: Selectors.resourceManagement.grid.resourceDisplayCell, parsing: name })
});

Then('ui: SoftAssert Grouping in RM Grid', { timeout: (DEFAULT_STEP_TIMEOUT * 120) }, async () => {
  const attributes = context().attributes;
  const attributeValues = context().attributeValues;

  const currentUsername = await Common.getCurrentUserNameFromHeader();

  const filtersIconElement = await element(Selectors.projectManagement.grid.filtersIcon);
  const filterSectionStatus = await filtersIconElement.getAttribute("class");
  if (!filterSectionStatus.includes("active")) {
    await filtersIconElement.click();
  }

  await clickToElement(Selectors.projectManagement.grid.chooseFilterDropdown);
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open
  await slowInputFilling(Selectors.common.dropdownSearchInputBox, "Name");
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to open

  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, "Name"));
  await ProjectGrid.clickOnSpecificOptionOfFilter("Name", "doesn't contain");
  await ProjectGrid.enterFilterOptionValueForSpecificFilter("Name", currentUsername);
  await browser.pause(SHORT_PAUSE);//Needed for filter to happen
  await ResourceGrid.selectSelectAllResorucesCheckbox();
  await ResourceGrid.clickOnMeatballsIconByIndexAndSelectSpecificOption("1", "Delete");

  const resourcesListMessage = await (await element(Selectors.resourceManagement.grid.deletionModalResourcesList)).getText();
  const numberOfResources = parseInt(resourcesListMessage.match(/The following (\d+) resources/)[1]);

  await Common.clickOnSpecificButtonInConfirmationModal("Cancel");
  await browser.pause(SHORT_PAUSE);//Needed for modal to close

  await ResourceGrid.clearFiltersIfAny();

  for (let i = 0; i < attributes.length; i++) {
    const attributeName = attributes[i].name;
    const attributeValue = attributeValues.get(attributeName);

    await ResourceGrid.unGroupIfAny();
    await ResourceGrid.clickOnGroupByDropdown();
    await ResourceGrid.selectAttributesInColumnsOrGroupByDropdown(attributeName);
    await ResourceGrid.clickOnGroupByDropdown();
    await browser.pause(SHORT_PAUSE);//Needed for dropdown to close
    let locator, formattedAttributeValue, actualValue;

    switch (attributes[i].type) {
      case AttributeTypes.Bool:
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', "Not set");
        actualValue = await getTextFromAllChildElements(locator);
        if (attributeValue === 'Not set') {
          //This will fail in future when "SG-11237 - PM/RM Grid - Unify Boolean values to show Not set instead of No Value in grids" is fixed
          await context().softAssert.equal(actualValue, attributeName + ": " + "Not set" + "count:" + (numberOfResources + 1), `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        } else {
          //This will fail in future when "SG-11237 - PM/RM Grid - Unify Boolean values to show Not set instead of No Value in grids" is fixed
          await context().softAssert.equal(actualValue, attributeName + ": " + "Not set" + "count:" + (numberOfResources), `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
          locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
            .replace('{{attributeName}}', attributeName)
            .replace('{{attributeValue}}', attributeValue);
          actualValue = await getTextFromAllChildElements(locator);
          await context().softAssert.equal(actualValue, attributeName + ": " + attributeValue + "count:1", `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        }
        break;
      case AttributeTypes.Number:
      case AttributeTypes.ProgressBar:
        formattedAttributeValue = parseInt(attributeValue).toLocaleString('en-US');
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', "No Value");
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + "No Value" + "count:" + (numberOfResources), `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', formattedAttributeValue);
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + formattedAttributeValue + "count:1", `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        break;
      case AttributeTypes.PrecisionNumber:
        formattedAttributeValue = parseFloat(attributeValue).toLocaleString('en-US');
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', "No Value");
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + "No Value" + "count:" + numberOfResources, `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', formattedAttributeValue);
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + formattedAttributeValue + "count:1", `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        break;
      case AttributeTypes.Currency:
        const currencySymbol = getCurrencySymbol(GeneralSettingsDefaultValues.global.costCurrency);
        formattedAttributeValue = parseInt(attributeValue).toLocaleString('en-US');
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', "No Value");
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + "No Value" + "count:" + numberOfResources, `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', formattedAttributeValue);
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue.replace(/\s/g, ''), `${attributeName}:${currencySymbol} ${formattedAttributeValue}count:1`.replace(/\s/g, ''), `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        break;
      case AttributeTypes.Date:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.String:
      case AttributeTypes.Text:
      case AttributeTypes.URL:
      case AttributeTypes.Selection:
      case AttributeTypes.Tags:
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', "No Value");
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + "No Value" + "count:" + numberOfResources, `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        locator = Selectors.resourceManagement.grid.rowTextWhenGroupedForCFsOtherThanCurrency
          .replace('{{attributeName}}', attributeName)
          .replace('{{attributeValue}}', attributeValue);
        actualValue = await getTextFromAllChildElements(locator);
        await context().softAssert.equal(actualValue, attributeName + ": " + attributeValue + "count:1", `RM Grid - CF: ${attributeName}'s grouping was incorrect`);
        break;
      default: throw Error("Attribute type:{" + attributes[i].type + "} is not yet supported in the step:[ui: Verify Grouping in RM Grid]");
    }
  }
});

Given('ui: Create a new Timesheet Approver and Timesheet user', async () => {
  //Create Timesheet Approver
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    timesheetApprover, password, name: timesheetUser, username: timeshetUserUsername,
  } = context().resourceSetup;

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(timesheetApprover);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await browser.pause(SHORT_PAUSE);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, SystemRoles.RegularUser),
  });
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Timesheet Approver", AttributeTypes.Bool, "Yes");

  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Resource Manager", AttributeTypes.Bool, "Yes");

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: timesheetApprover, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.common.btnCreate, value: null, action: 'click' },
  ]);


  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(`//input[@data-previous-value="${timesheetApprover}"]`)).toBeDisplayed();

  // // Create Timesheet User
  await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(timesheetUser);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await browser.pause(SHORT_PAUSE);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, SystemRoles.RegularUser),
  });

  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Timesheet Approver")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  }

  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Timesheet Approver", AttributeTypes.Selection, timesheetApprover);
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Resource Managers", AttributeTypes.MultiSelection, timesheetApprover);

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: timeshetUserUsername, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.timesheetUserToggleButton, value: null, action: 'click' },
  ]);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.common.btnCreate);

  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(`//input[@data-previous-value="${timesheetUser}"]`)).toBeDisplayed();
});

Given('ui: Create a new Timesheet Approver and Timesheet user with adding resource manager', async () => {
  //Create Timesheet Approver
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    timesheetApprover, password, name: timesheetUser, username: timeshetUserUsername, resourceManager,
  } = context().resourceSetup;

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(timesheetApprover);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await browser.pause(SHORT_PAUSE);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, SystemRoles.RegularUser),
  });
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Timesheet Approver", AttributeTypes.Bool, "Yes");

  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Resource Manager", AttributeTypes.Bool, "No");

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: timesheetApprover, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.common.btnCreate, value: null, action: 'click' },
  ]);


  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(`//input[@data-previous-value="${timesheetApprover}"]`)).toBeDisplayed();

  // // Create Timesheet User
  await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(timesheetUser);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await browser.pause(SHORT_PAUSE);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, SystemRoles.RegularUser),
  });

  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Timesheet Approver")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  }

  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Timesheet Approver", AttributeTypes.Selection, timesheetApprover);
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Resource Managers", AttributeTypes.MultiSelection,resourceManager );

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: timeshetUserUsername, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.timesheetUserToggleButton, value: null, action: 'click' },
  ]);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.common.btnCreate);

  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(`//input[@data-previous-value="${timesheetUser}"]`)).toBeDisplayed();
});


Then(/^ui: Change value of CF "([^"]*)" of type "([^"]*)" to "([^"]*)" in Resource Attributes and Identity$/, async (attributeName: string, attributeType: string, valueToBeUpdated: string) => {
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection(attributeName, attributeType, valueToBeUpdated);
});

Then('ui: Click on Save button in Resource Attributes and Identity and wait for it to be clickable', async () => {
  await ResourceAttributesAndIdentity.clickOnSaveButtonAndWaitForItToBeClickable();
  await browser.pause(10000)
});

Then('ui: Click on User Identity section in Resource Attributes and Identity', async () => {
  await ResourceAttributesAndIdentity.clickOnUserIdentitySection();
});

Then(/^ui: Enter default rate as "([^"]*)" in Resource Attributes and Identity$/, async (defaultRateToBeEntered: string) => {
  await ResourceAttributesAndIdentity.enterDefaultRate(defaultRateToBeEntered);
});

Given('ui: I create two resource with username, password and Administrator global role', async () => {
  const {
    password,
  } = context().resourceSetup;

  context().resource1 = resourceModel().name;
  context().resource2 = resourceModel().name;
  context().email1 = resourceModel().email;
  context().email2 = resourceModel().email;
  const emails: string[] = [context().email1, context().email2];
  const resources: string[] = [context().resource1, context().resource2];
  for (let i = 0; i < resources.length; i++) {
    await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
    await clickToElement(Selectors.resourceManagement.btnCreateResource);
    await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, resources[i]);

    if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
      await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
    }
    await selectFromDropdown({
      dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Administrator"),
    });

    await formFill([
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail, value: emails[i].toLowerCase(), action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: resources[i], action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
      { locator: Selectors.common.btnCreate, value: null, action: 'click' },
    ]);

    await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
    await expect(await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, resources[i]))).toBeDisplayed();
  }
});

Then(/^ui: I click on meat ball icon by index "([^"]*)" and select specific option "([^"]*)" in resource list page$/, async (index: string, option: string) => {
  await ResourceGrid.clickOnMeatballsIconByIndexAndSelectSpecificOption(index, option);
});

Then('ui: I click on open on clone toggle in clone resource name container in RM', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.openOnCloneToggle);
});

Then(/^ui: I enter cloned resource name "([^"]*)" in edit form container in resource list page$/, async (cloneResourceName: string) => {
  const { name } = context().resourceSetup;
  await slowInputFilling(Selectors.projectManagement.projectEdit.txtClonedProjectName, cloneResourceName + ": " + name);
});

Then('ui: I click on save button in edit form container in resource attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.btnSaveInEditFormContainer);
});

Then('ui: Verify Rich text in RM Grid for recently created Cfs', async () => {
  const attributes = context().resourceAttributes;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(context().resourceSetup.name, attribute.name);
    await browser.pause(SHORT_PAUSE / 2);
    const richtextElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of resource CF:{${attribute.name}} for resource:{${context().resourceSetup.name}} in RM Grid was incorrect`, true);

    await elementParseAndClick(Selectors.projectManagement.grid.specificButtonWhenEditingRichTextCF, "Cancel");
    await browser.pause(SHORT_PAUSE / 2);
  }
});

Then(/^ui: Search for recently created "(resource|resourceManager|timesheetApprover)" in RM Grid$/, async (role: string) => {
  let username;
  switch (role) {
    case 'resource':
      username = context().resourceSetup.name;
      break;
    case 'resourceManager':
      username = context().resourceSetup.resourceManager.name;
      break;
    case 'timesheetApprover':
      username = context().resourceSetup.timesheetApprover.name;
      break;
    default: throw Error(`Role:{${role}} is not yet supported.\nPlease add if required\n`);
  }
  await slowInputFilling(Selectors.resourceManagement.grid.txtQuickSearch, username);
});

Then(/^ui: Search for recently created "(resource|resourceManager|timesheetApprover)" in RM Grid and click on it$/, async (role: string) => {
  let username;
  switch (role) {
    case 'resource':
      username = context().resourceSetup.name;
      break;
    case 'resourceManager':
      username = context().resourceSetup.resourceManager.name;
      break;
    case 'timesheetApprover':
      username = context().resourceSetup.timesheetApprover.name;
      break;
    default: throw Error(`Role:{${role}} is not yet supported.\nPlease add if required\n`);
  }
  await slowInputFilling(Selectors.resourceManagement.grid.txtQuickSearch, username);
  await elementParseAndClick(Selectors.resourceManagement.grid.resourceName,username)
});

Then('ui: I set Attribute Value to Yes', async () => {
  await expect(await element(Selectors.resourceManagement.grid.attributeEditYes)).toBeDisplayed();
  await clickToElement(Selectors.resourceManagement.grid.attributeEditYes);
})

Then(/^ui: I uncheck and select first attribute created using model in columns dropdown in resource list page$/, async () => {
  const eleSelectAllChk = await element(Selectors.projectManagement.grid.chkSelectAllCheckboxInColumnsDropdown);
  await eleSelectAllChk.click();
  if (await eleSelectAllChk.isSelected()) {
    await eleSelectAllChk.click();
  }
  await (await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown)).setValue(context().attribute1);
  const ele = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInColumnsDropdownInProjectListPage, parsing: context().attribute1 });
  if (await ele.isSelected()) { /* empty */ } else {
    await ele.click();
  }
});

Given(/^ui: Create a new Manager with username, password and assign role as:"([^"]*)"$/, async (globalRole: string) => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
  const {
    resourceManager: name, username, password,
  } = context().resourceSetup;
  const createButtonInResourceCreatePage = await element(Selectors.common.btnCreate);

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(name);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: name, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
  ]);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, globalRole)
  });

  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Resource Manager", "Selection", "Yes");

  await createButtonInResourceCreatePage.click();
  await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
  await expect(await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.confirmProjectName, parsing: name })).toBeDisplayed();
  await browser.pause(SHORT_PAUSE);
});

Given('ui: Create one Timesheet user and three new Timesheet Approver and link each other as Approver', async () => {
  //Create Timesheet Approver
  const {
    password,
  } = context().resourceSetup;

  context().TSApprover1 = resourceModel().timesheetApprover;
  context().TSApprover2 = resourceModel().timesheetApprover;
  context().TSApprover3 = resourceModel().timesheetApprover;
  const TSApprovers: string[] = [context().TSApprover1, context().TSApprover2, context().TSApprover3];

  for (const approver of TSApprovers) {

    await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
    await clickToElement(Selectors.resourceManagement.btnCreateResource);
    await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(approver);

    if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
      await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
    }
    await browser.pause(SHORT_PAUSE);

    await selectFromDropdown({
      dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, SystemRoles.Administrator),
    });

    if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Require Resource Manager Approval")))) {
      await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
      await browser.pause(MEDIUM_PAUSE/2)
    };
    await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Is Timesheet Approver", AttributeTypes.Bool, "Yes");

    await formFill([
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: approver, action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
      { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
      { locator: Selectors.common.btnCreate, value: null, action: 'click' },
    ]);

    await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
    await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, approver));

  }

  // Create Timesheet User
  await Common.quickNavigateToSpecificSection(NavigationOptions.ResourceManagement);
  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const {
    name: timesheetUser, username: timeshetUserUsername,
  } = context().resourceSetup;

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(timesheetUser);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await browser.pause(SHORT_PAUSE);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, SystemRoles.RegularUser),
  });

  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Resource Managers")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  };
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Timesheet Approver", AttributeTypes.Selection, context().TSApprover1);

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: timeshetUserUsername, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.timesheetUserToggleButton, value: null, action: 'click' },
  ]);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.common.btnCreate);

  await expect(await element(Selectors.common.btnSave)).toBeDisplayed();
  await expect(await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, timesheetUser))).toBeDisplayed();

  //Link Timesheet Approvers to another Approver:

  const TSApproverOrder: string[] = [context().TSApprover3, context().TSApprover1, context().TSApprover2];

  for (let i = 0; i < TSApproverOrder.length; i++) {

    await clickToElement(Selectors.common.btnGlobalSearchIcon);
    await slowInputFilling(Selectors.common.txtGlobalSearchInputBox, TSApprovers[i]);
    await browser.pause(SHORT_PAUSE);
    await (await elementParse({ locatorString: Selectors.common.clickOnEntityInGlobalSearch, parsing: TSApprovers[i] })).click();

    if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
      await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
    }
    await browser.pause(SHORT_PAUSE);

    if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Resource Managers")))) {
      await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
      await browser.pause(MEDIUM_PAUSE/2)
    };
    await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Timesheet Approver", AttributeTypes.Selection, TSApproverOrder[i]);

    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.timesheetUserToggleButton);
    await browser.pause(SHORT_PAUSE);
    await clickToElement(Selectors.resourceManagement.btnSave);

    await expect(await element(locatorParse(Selectors.resourceManagement.specificResourceNameInputBox, TSApprovers[i]))).toBeDisplayed();

  }
});

Given('ui: I try creating resource with same email, username, password', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
  const {
    name,
  } = context().resourceSetup;

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(name);
  await clickToElement(Selectors.common.btnCreate);
});

Then('ui: I validate error message for duplicate resource created', async () => {
  await expect(await $(Selectors.resourceManagement.validateDuplicateResourceMessage)).toBeDisplayed({ wait: MEDIUM_PAUSE });
});

Then('ui: I click on the resource created in RM Grid', async () => {
  const {
    name
  } = context().resourceSetup;
  await clickToElement(locatorParse(Selectors.resourceManagement.grid.resourceLink, name));
  await expect(await $(Selectors.resourceManagement.btnSave)).toBeDisplayed();
});

Then(/^ui: I change the cost for the resource to "([^"]*)" per hours$/, async (costValue: string) => {
  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }
  await slowInputFilling(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.defaultRateInputBox, costValue);
  await ResourceAttributesAndIdentity.clickOnSaveButtonAndWaitForItToBeClickable();
});

Given(/^ui: Create a new Resource with email, username, password with model: "([^"]*)"$/, async (modelToBeUsedForCreation: string) => {
  let resourceModel;
  switch (modelToBeUsedForCreation) {
    case 'Resource':
      resourceModel = context().resourceSetup;
      break;
    case 'Resource2':
      resourceModel = context().resourceSetup2;
      break;

    default: throw Error(`Model not yet supported :{${modelToBeUsedForCreation}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Resource\n2.Resource2`);
  }

  const {
    name, email, username, password,
  } = resourceModel;

  await clickToElement(Selectors.resourceManagement.btnCreateResource);

  const createButtonInResourceCreatePage = await element(Selectors.common.btnCreate);

  await ResourceAttributesAndIdentity.enterResourceNameWhenCreatingResource(name);

  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail, value: email.toLowerCase(), action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: username, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: password, action: 'setValue' },
  ]);

  await selectFromDropdown({
    dropdownOpener: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddGlobalRole,
    dropdownSelection: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.ddItemAdministrator
  });

  await createButtonInResourceCreatePage.click();
  await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
  const confirmProjectNameDisplayedStatus = await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.confirmProjectName, name));
  await assert.isTrue(confirmProjectNameDisplayedStatus, `Resource: {${name}} was not created successfully`);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: I conform the delete functionality in RM Grid', async () => {
  await clickToElement(Selectors.projectManagement.grid.conformDelete);
  await browser.pause(MEDIUM_PAUSE / 2);
});

Then('ui: I select all resources in RM Grid', async () => {
  await clickToElement(Selectors.resourceManagement.grid.selectAllResourcesInputBox)
});

Then('ui: I clear the earlier searched resource in RM Grid', async () => {
  if (await isElementDisplayed(Selectors.resourceManagement.actions.clearSearch)) {
    await clickToElement(Selectors.resourceManagement.actions.clearSearch)
  }
})

Then(/^ui: I click on Columns dropdown and select "([^"]*)"$/, async (columnDD: string) => {
  await clickToElement(Selectors.resourceManagement.actions.columns)
  await ProjectGrid.uncheckSelectAllCheckbox();
  await slowInputFilling(Selectors.resourceManagement.actions.columnDD.search, columnDD)
  await elementParseAndClick(Selectors.resourceManagement.actions.columnDD.columnAttribute, columnDD)
  await clickToElement(Selectors.resourceManagement.actions.columns)
});

Then('ui: I change recently created resource login name to AutomationUpdate', async () => {
  let name = "AutomationUpdate"

  const ele1 = await elementParse({ locatorString: Selectors.resourceManagement.actions.editResource, parsing: context().resourceSetup.name })
  await ele1.moveTo()
  const ele2 = await elementParse({ locatorString: Selectors.resourceManagement.actions.btnEditResource, parsing: context().resourceSetup.name })
  await doubleClickToElement(ele2)
  await slowInputFilling(Selectors.resourceManagement.actions.inputEdit, name)
  await clickToElement(Selectors.resourceManagement.actions.btnApprove)
});

Then('ui: I change recently created resource password', async () => {
  const {
    password
  } = config.defaultUser;
  // this is very generic, so it's can't be move to selector file.
  await clickToElement(`//div[@class="header-content"]/label/input[@type="checkbox"]`);

  // this is very generic, so it's can't be move to selector file.
  const elPassword = await element(`//div[contains(text(), "********")]/..`);
  await elPassword.moveTo();

  // this is very generic, so it's can't be move to selector file.    
  await clickToElement(`(//div[contains(text(), "********")]/following::div)[1]`);
  const elNewPassword = await element(Selectors.resourceManagement.bulkAction.resetPassword.txtNewPassword);
  await elNewPassword.setValue(password);
  const elNewConfirmPassword = await element(Selectors.resourceManagement.bulkAction.resetPassword.txtConfirmNewPassword);
  await elNewConfirmPassword.setValue(password);
});

Then('ui: I click on Tab key', async () => {
  await hitTab()
});

Then('ui: I verify password window is not closed', async () => {
  await expect(await mayBeElement(Selectors.resourceManagement.actions.tabPassword))
})


Then(/^ui: I create a new Resource with name as "([^"]*)"$/, async (resourceName: string) => {
  context().customResourceName = resourceName
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue(context().customResourceName);
  if (!(await isElementDisplayed(await locatorParse('//span[text()="{{resoureName}}"]', context().customResourceName)))) {
    await clickToElement(Selectors.resourceManagement.btnCreateResource);

    const createButtonInResourceCreatePage = await element(Selectors.common.btnCreate);

    await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, context().customResourceName);

    await createButtonInResourceCreatePage.waitForClickable();
    await createButtonInResourceCreatePage.click();
    await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
  }
});

Then(/^ui: I validate that the allocation in "([^"]*)" is as per imported sheet$/, async (sectionName: string) => {
  let ele, expectedValue;
  await browser.pause(MEDIUM_PAUSE)
  switch (sectionName) {
    case "AdminType Capacity":
      ele = await $(await locatorParse(Selectors.resourceManagement.resourceEdit.capacity.validateResourceCapacity, 'AutomationAdminType')).getText();
      expectedValue = '40';
      break;
    case "Base Capacity":
      ele = await $(await locatorParse(Selectors.resourceManagement.resourceEdit.capacity.validateResourceCapacity, 'Base Capacity')).getText();
      expectedValue = '35';
      break;
    default:
      break;
  }
  await context().softAssert.equal(ele, expectedValue, `Allocation Value: the total allocation value from imported sheet in {${sectionName}} is not as expected`)
})

Then(/^ui: I select start date as "([^"]*)" and end date as "([^"]*)" in capacity tab$/, async (startDate: string, endDate: string) => {
  await formFill([
    { locator: Selectors.bulkProjectAllocation.startDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocation.startDateInputBox, value: startDate, action: 'setValue' },
  ]);
  await hitEnter();

  if (await isElementDisplayed(Selectors.resourceManagement.resourceEdit.capacity.approveButton)) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.approveButton)
  }

  await formFill([
    { locator: Selectors.bulkProjectAllocation.endDateInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.bulkProjectAllocation.endDateInputBox, value: endDate, action: 'setValue' },
  ]);
  await hitEnter();

  await $(Selectors.resourceManagement.btnSave).scrollIntoView();
  await clickToElement(Selectors.resourceManagement.btnSave);
  if (await isElementDisplayed(Selectors.resourceManagement.resourceEdit.capacity.approveButton)) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.approveButton)
  }
  await reload();
})

Then(/^ui: Select Date mode as:"([^"]*)" in Capacity if not already selected$/, async (dateModeToBeSelected: string) => {
  await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.dateMode);
  await elementParseAndClick(Selectors.resourceManagement.resourceEdit.capacity.dateModeOption, dateModeToBeSelected);
});

Then(/^ui: I search and open for resource "([^"]*)" in resource list page$/, async (resourceName: string) => {
  await slowInputFilling(Selectors.projectManagement.common.txtQuickSearch, '');
  await slowInputFilling(Selectors.projectManagement.common.txtQuickSearch, resourceName);
  await elementParseAndClick(Selectors.resourceManagement.actions.resourceName, resourceName)
});

When('ui: Click on Shift option and shift project on next weekend', async () => {
  await clickToElement(Selectors.resourceManagement.grid.btnShiftProject);

  const nextSaturdayDate = DateTime.getNextSaturdaysDate(GeneralSettingsDefaultValues.global.dateFormat);
  await formFill([
    { locator: Selectors.resourceManagement.grid.shiftStartDate, value: null, action: 'clearValue' },
    { locator: Selectors.resourceManagement.grid.shiftStartDate, value: nextSaturdayDate, action: 'setValue' },
    { locator: Selectors.resourceManagement.grid.btnShiftProject, value: null, action: 'click' },
    { locator: Selectors.resourceManagement.grid.btnSaveShift, value: null, action: 'click' },
  ]);

  context().projectSetup.shiftedDate = nextSaturdayDate;
})

When(/^ui: Create a new Regular Project and set start date as today and End date as "([^"]*)" for allocations$/, async (endDate: any) => {
  const projectName = context().projectSetup.name
  await clickToElement(Selectors.projectManagement.btnCreateProject);
  await browser.pause(MEDIUM_PAUSE / 2)
  if (await isElementDisplayed(Selectors.projectManagement.regularProjectOption)) {
    await clickToElement(Selectors.projectManagement.regularProjectOption);
  }
  const createButtonInProjectCreationPage = await element(Selectors.common.btnCreate);
  await slowInputFilling(Selectors.projectManagement.projectEdit.inputProjectName, projectName);

  const todaysDate = DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat);
  await formFill([
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.startDateInSPA, value: todaysDate, action: 'setValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.endDateInSPA, value: endDate, action: 'setValue' },
  ]);

  context().projectSetup.startDate = todaysDate;
  context().projectSetup.endDate = endDate;
  await clickToElement(Selectors.siteHeader.ddProfile);
  await clickToElement(Selectors.siteHeader.ddProfile);

  await createButtonInProjectCreationPage.click();
  await expect(await element(Selectors.projectManagement.sPA.checkoutButton)).toBeDisplayed();
  await expect(await elementParse({ locatorString: Selectors.projectManagement.specificProjectNameInputBox, parsing: projectName })).toBeDisplayed();
});

Then(/^ui: I hover on recently created resource and click on "([^"]*)"$/,async(resourceTab:string) => {
      const el1 = await elementParse({locatorString: Selectors.resourceManagement.grid.resourceName, parsing: context().resourceSetup.name});
  await el1.moveTo()
  await elementParseAndClick(Selectors.resourceManagement.grid.resourceTooltip, resourceTab)
});

Given('ui: I click on Create Resource Button', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
});

Then('ui: I hover on recently created resource and copy the resource link',async() => {
  const el1 = await elementParse({locatorString:  Selectors.resourceManagement.grid.resourceName, parsing: context().resourceSetup.name});
  await el1.moveTo()
  await clickToElement(Selectors.resourceManagement.grid.copyResourceLink)
});

Then('ui: I hover on recently created resource and click on the resource', async()=> {
  await elementParseAndClick(Selectors.resourceManagement.grid.resourceLinkTooltip,context().resourceSetup.name)
  await browser.pause(SHORT_PAUSE *2); // Needed for the new tab to load
  const handles = await browser.getWindowHandles();
  if (handles.length > 1) {
    await browser.switchToWindow(handles[0]);
    await browser.closeWindow();
    await browser.switchToWindow(handles[1]);
  }
});

Then('ui: I verify specific resource name created using model is displayed', async () => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.specificResourceNameInputBox, parsing: context().resourceSetup.name });
  await isElementDisplayed(ele)
});

Then('ui: Select single attribute created earlier in RM Grid', async () => {
  let attribute = context().attributeSetup;
  await ResourceGrid.clickOnColumnsDropdown();
  await ResourceGrid.uncheckSelectAllCheckbox();
  await ResourceGrid.selectAttributesInColumnsOrGroupByDropdown(attribute.name);
  await ResourceGrid.clickOnColumnsDropdown();
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to close and Column to appear
});

When('ui: I click on "Crete Resource" button on resource management', async () => {
  await clickToElement(Selectors.resourceManagement.btnCreateResource);
})

Then(/^ui: I verify "(.*)", "(.*)" and "(.*)" are "(.*)"$/, async (isResourceManager, isTimesheetApprover, isReqRMApproval, dropdownValue) => {
  const isResourceManagerVal = await (await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.boolAndSelectionAttributeDropdown, parsing: isResourceManager })).getText();
  const isTimesheetApproverVal = await (await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.boolAndSelectionAttributeDropdown, parsing: isTimesheetApprover })).getText();
  const isReqRMApprovalVal = await (await elementParse({ locatorString: Selectors.resourceManagement.resourceEdit.boolAndSelectionAttributeDropdown, parsing: isReqRMApproval })).getText();

  await assert.equal(isResourceManagerVal, dropdownValue, `The default value should be '${dropdownValue}'`);
  await assert.equal(isTimesheetApproverVal, dropdownValue, `The default value should be '${dropdownValue}'`);
  await assert.equal(isReqRMApprovalVal, dropdownValue, `The default value should be '${dropdownValue}'`);

})

Then('ui: I create a new Resource while on resource create page', async () => {
  const { name } = context().resourceSetup;
  const createButtonInResourceCreatePage = await element(Selectors.common.btnCreate);

  await slowInputFilling(Selectors.resourceManagement.resourceEdit.inputResourceName, name);

  await createButtonInResourceCreatePage.waitForClickable();
  await createButtonInResourceCreatePage.click();
  await ResourceAttributesAndIdentity.waitForSaveButtonToBeClickable();
})

Then('ui: I select All Reources present in RM Grid',async()=>{
  const ele = await element(Selectors.resourceManagement.actions.selectAllResourceBtn)
  if (!(await ele.isSelected())) {
    await ele.click();
  }
  await browser.pause(4000)
});

Then('ui: I click on Columns dropdown and select recently created attribute', async () => {
  await clickToElement(Selectors.resourceManagement.actions.columns)
  await ProjectGrid.uncheckSelectAllCheckbox();
  await slowInputFilling(Selectors.resourceManagement.actions.columnDD.search, context().attribute1)
  await elementParseAndClick(Selectors.resourceManagement.actions.columnDD.columnAttribute, context().attribute1)
  await clickToElement(Selectors.resourceManagement.actions.columns)

});

Then(/^ui: I toggle Auto Calculate Capacity for "([^"]*)" as "([^"]*)" in Resource Capacity$/, async (toggleName: string, toggleState: string) => {
  const color = (await getElementBackgroundColor(await locatorParse(Selectors.bulkResourceCapacities.autoCalculateCapacityToggleInput, toggleName))).toString();
  if (color != GenericColorCodes.ToggleON && toggleState == ToggleStates.On) {
    await elementParseAndClick(Selectors.bulkResourceCapacities.autoCalculateCapacityToggleButton, toggleName);
  } else if (color == GenericColorCodes.ToggleON && toggleState == ToggleStates.Off) {
    await elementParseAndClick(Selectors.bulkResourceCapacities.autoCalculateCapacityToggleButton, toggleName);
  }
});

Given(/^api: I create a default resource for automation with default rate as "([^"]*)"$/, async (defaultRate: string) => {
  const { name } = context().resourceSetup;
  const numericDefaultRate = parseFloat(defaultRate);
  await resourceOperations.createResourceIfNotAlreadyCreated(context().user.baseUrl, context().token, name, numericDefaultRate);
  await browser.pause(MEDIUM_PAUSE/2);
});

When(/^ui: turn on has capacity toggle "(On|Off)"$/, async (toggleMode) => {

  const color = (await getElementBackgroundColor(await element(Selectors.resourceManagement.resourceEdit.capacity.hasCapacityToggle))).toString();
  if (color != '#467998' && toggleMode == ToggleStates.On) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.hasCapacityToggle);
  } else if (color == '#467998' && toggleMode == ToggleStates.Off) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.capacity.hasCapacityToggle);
  }
  await browser.pause(SHORT_PAUSE);
  await clickToElement(Selectors.resourceManagement.btnSave);
  await browser.pause(SHORT_PAUSE);
});