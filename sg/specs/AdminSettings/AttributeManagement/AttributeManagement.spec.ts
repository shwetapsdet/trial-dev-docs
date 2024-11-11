/* eslint-disable max-len */
import { When, Then } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';

import { Attribute } from '../../../../../helpers/Attribute.helper';
import Selectors from '../../../../../core';
import {
  clickToElement, element, elementParse, slowInputFilling, selectFromDropdown, elementParseAndClick, formFill, locatorParse, isElementSelected, reload, clearTextUsingBackspace, isElementDisplayed, getElementBackgroundColor, doubleClickToElement, selectAllTextUsingCTRLPlusA, hitEnter, findAndSetValue, mayBeElement,
  elementDragAndDrop,
} from '../../../../../core/func';
import { context } from '../../../../../utils';
import { resourcesListAttributeModel, attributeModel, resourcesListAttributeModelWithAttribute } from '../../../../../models/Attribute.model';
import { AttributeSection, AttributeTypes } from '../../../../../core/enums';
import { AttributeLayout } from '../../../../../helpers/AdminSettings/AttributeManagement/AttributeLayout.helper';
import { DEFAULT_STEP_TIMEOUT, ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { AttributeList } from '../../../../../helpers/AdminSettings/AttributeManagement/AttributeList.helper';
import { Common as AttributesCommon } from '../../../../../helpers/AdminSettings/AttributeManagement/Common.helper';
import { Common } from '../../../../../helpers/common.helper';
import { assert } from 'chai';
import { waitForFileToDownload } from '../../../../../core/fileUtilities';
import * as path from 'path';
import { resourceHierarchyModel } from '../../../../../models/resourceHierarchy.model';
import { resourceModel } from '../../../../../models/resource.model';
import { projectModel } from '../../../../../models/project.model';
import { projectHierarchyModel } from '../../../../../models/projectHierarchy.model';
import { click, getValue } from 'webdriverio/build/commands/element';
import { ProjectGrid } from '../../../../../helpers/ProjectManagement/Grid.helper';
import { BPAFG } from '../../../../../helpers/BPAFG.helper';
import { SingleProjectAllocation } from '../../../../../helpers/ProjectManagement/ProjectEdit/SingleProjectAllocation.helper';
import { waitUntil } from 'webdriverio/build/commands/browser';


Then(/^ui: I click on specific tab "([^"]*)" in attribute management$/, async (tabName: string) => {
  await (await elementParse({ locatorString: Selectors.attributeManagement.specificTab, parsing: tabName })).click();
});

Then(/^ui: I toggle unique button to "([^"]*)" in attribute create section$/, async (toggleState: string) => {
  await Attribute.toggleUniqueButtonInCreateAttributeSection(toggleState);
});

Then(/^ui: I toggle read only button to "([^"]*)" in attribute create section$/, async (toggleState: string) => {
  await Attribute.toggleReadOnlyButtonInCreateAttributeSection(toggleState);
});

Then(/^ui: I toggle required button to "([^"]*)" in attribute create section$/, async (toggleState: string) => {
  await Attribute.toggleRequiredButtonInCreateAttributeSection(toggleState);
});

Then(/^ui: Click on attribute type dropdown and select "([^"]*)" in Attribute creation section$/, async (attributeType: string) => {
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attributeType),
  });
});

Then(/^ui: I enter attribute name "([^"]*)"$/, async (attributeName: string) => {
  await expect(await element(Selectors.attributeManagement.txtAttributeName)).toBeDisplayed();
  await slowInputFilling(Selectors.attributeManagement.txtAttributeName, attributeName);
});

Then('ui: I click on create attribute', async () => {
  await clickToElement(Selectors.attributeManagement.btnCreateAttribute);
});

Then(/^ui: I enter default value as "([^"]*)" for type "([^"]*)"$/, async (defaultValue: string, attributeType: string) => {
  Attribute.enterDefaultValue(defaultValue, attributeType);
});

Then('ui: I click only allow resource who are checkbox in attributes page', async () => {
  await clickToElement(Selectors.attributeManagement.chkOnlyAllowResourcesWhoAreLocator);
});

Then(/^ui: I select attribute "([^"]*)" in only allow resource who are dropdown in attributes page$/, async (attributeName: string) => {
  await selectFromDropdown({
    dropdownOpener: Selectors.attributeManagement.ddOnlyAllowResourcesWhoAreLocator,
    dropdownSelection: `${Selectors.common.dropdownValues}//*[normalize-space(text())='${attributeName}']`,
  });
});

Then(/^ui: I search for attribute "([^"]*)"$/, async (attributeName: string) => {
  await slowInputFilling(Selectors.attributeManagement.txtsearchAttributeName, '');
  await slowInputFilling(Selectors.attributeManagement.txtsearchAttributeName, attributeName);
});

Then(/^ui: I verify attribute "([^"]*)" is displayed$/, async (attributeName: string) => {
  await expect(await elementParse({ locatorString: Selectors.attributeManagement.createdAttribute, parsing: attributeName })).toBeDisplayed();
});

Then(/^ui: I create "([^"]*)" attribute using model testdata$/, async (tabName: string) => {
  const { resourceAttributeName, projectAttributeName, assignmentAttributeName } = context().attributeSetup;
  let attributeName;
  if (tabName.toLowerCase() == 'project') {
    attributeName = projectAttributeName;
  } else if (tabName.toLowerCase() == 'resource') {
    attributeName = resourceAttributeName;
  } else if (tabName.toLowerCase() == 'assignment') {
    attributeName = assignmentAttributeName;
  }
  await Attribute.clickOnSpecificTabAndEnterAttributeNameInAttributeManagement(tabName, attributeName);
});

Then(/^ui: I click on edit attribute "([^"]*)" in attributes page$/, async (attributeName: string) => {
  await expect(await elementParse({ locatorString: Selectors.attributeManagement.btnEditAttribute, parsing: attributeName })).toBeDisplayed();
  await (await elementParse({ locatorString: Selectors.attributeManagement.btnEditAttribute, parsing: attributeName })).click();
});

Then('ui: I click on save button in edit attribute section', async () => {
  await clickToElement(Selectors.attributeManagement.btnSaveInEditAttributeSection);
});

Then(/^ui: create and verify "([^"]*)" attribute with type "([^"]*)"$/, async (tabName: string, attributeType: string) => {
  const { resourceAttributeName, projectAttributeName, assignmentAttributeName } = context().attributeSetup;
  let attributeName;
  if (tabName.toLowerCase() == 'project') {
    attributeName = projectAttributeName;
  } else if (tabName.toLowerCase() == 'resource') {
    attributeName = resourceAttributeName;
  } else if (tabName.toLowerCase() == 'assignment') {
    attributeName = assignmentAttributeName;
  }
  await Attribute.createAttributeAndVerify(tabName, attributeName, attributeType);

});

Then(/^ui: create and verify "([^"]*)" attribute using model with type "([^"]*)" default value "([^"]*)" and required "([^"]*)"$/, async (tabName: string, attributeType: string, defaultValue: string, requiredToggleState: string) => {
  if (tabName.toLowerCase() == 'project') {
    context().attribute1 = resourcesListAttributeModel().projectAttributeName;
  } else if (tabName.toLowerCase() == 'resource') {
    context().attribute1 = resourcesListAttributeModel().resourceAttributeName;
  } else if (tabName.toLowerCase() == 'assignment') {
    context().attribute1 = resourcesListAttributeModel().assignmentAttributeName;
  }
  await Attribute.createAttributeWithDefaultValueRequiredFieldAndVerify(tabName, context().attribute1, attributeType, defaultValue, requiredToggleState);
  console.log('Test Data:',context().attribute1)
});

Then(/^ui: create and verify "([^"]*)" attribute using model with type "([^"]*)" and select model attribute in allow resources$/, async (tabName: string, attributeType: string) => {
  if (tabName.toLowerCase() == 'project') {
    context().attribute2 = resourcesListAttributeModel().projectAttributeName;
  } else if (tabName.toLowerCase() == 'resource') {
    context().attribute2 = resourcesListAttributeModel().resourceAttributeName;
  } else if (tabName.toLowerCase() == 'assignment') {
    context().attribute2 = resourcesListAttributeModel().assignmentAttributeName;
  }
  await Attribute.createAttributeSelectAllowResourcesAndVerify(tabName, context().attribute2, attributeType, context().attribute1);
});


Then(/^ui: I click on edit "([^"]*)" attribute created using model in attributes page$/, async (tabName: string) => {
  await (await elementParse({ locatorString: Selectors.attributeManagement.specificTab, parsing: tabName })).click();
  await clearTextUsingBackspace(await element(Selectors.attributeManagement.txtsearchAttributeName));
  await slowInputFilling(Selectors.attributeManagement.txtsearchAttributeName, context().attribute2);
  await expect(await elementParse({ locatorString: Selectors.attributeManagement.btnEditAttribute, parsing: context().attribute2 })).toBeDisplayed();
  await (await elementParse({ locatorString: Selectors.attributeManagement.btnEditAttribute, parsing: context().attribute2 })).click();
});

Then(/^ui: I select attribute created using model in only allow resource who are dropdown in attributes page$/, async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.attributeManagement.ddOnlyAllowResourcesWhoAreLocator,
    dropdownSelection: `${Selectors.common.dropdownValues}//*[normalize-space(text())='${context().attribute1}']`,
  });
});

Then(/^ui: Create all types of attributes in "([^"]*)" tab and add to "([^"]*)" section of Attribute Management$/, { timeout: (DEFAULT_STEP_TIMEOUT * 20) }, async (tileToBeClicked: string,
  sectionName: string) => {
  //Switch to tab
  switch (tileToBeClicked.trim().toLowerCase()) {
    case "project":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case "resource":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case "assignment":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Assignment`);
  }

  context().attributes = [];
  const keys = Object.values(AttributeTypes);

  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case AttributeTypes.Calculated:
      case AttributeTypes.Cascading:
      case AttributeTypes.Hierarchy:
      case AttributeTypes.Resource:
      case AttributeTypes.ResourcesList:
        break;
      default:
        context().attributes.push(attributeModel(keys[i], 4, 2));
    }
  }

  for (let i = 0; i < context().attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const attribute = context().attributes[i];

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    if (attribute.type != "Number"){
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
      });
    }

    // if selected option and dropdown option is same then press tab programatically

    //Enter Selection values
    switch (attribute.type) {
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let j = 0; j < attribute.selectionValues.length; j++) {
          await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
          await browser.pause(SHORT_PAUSE / 5);
          await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
        }
        break;
    }

    //Enter default value as per attribute type
    switch (attribute.type) {
      case AttributeTypes.Currency:
      case AttributeTypes.Number:
      case AttributeTypes.PrecisionNumber:
      case AttributeTypes.ProgressBar:
      case AttributeTypes.String:
      case AttributeTypes.Text:
      case AttributeTypes.URL:
        await formFill([
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: null, action: 'clearValue' },
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: attribute.defaultValue, action: 'setValue' },
        ]);
        await AttributesCommon.clickOnAttributeListTab();
        break;
      case AttributeTypes.Date:
        await formFill([
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: null, action: 'clearValue' },
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: attribute.defaultValue, action: 'setValue' },
        ]);
        await AttributesCommon.clickOnAttributeListTab();
        break;
      case AttributeTypes.Selection:
      case AttributeTypes.Bool:
        await selectFromDropdown({
          dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
          dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValue),
        });
        break;
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let k = 0; k < attribute.defaultValues.length; k++) {
          await browser.pause(SHORT_PAUSE / 5);
          await selectFromDropdown({
            dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
            dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValues[k]),
          });
          await clickToElement(Selectors.siteHeader.ddProfile);
          await clickToElement(Selectors.siteHeader.ddProfile);
        }
        break;
    }
    await browser.pause(SHORT_PAUSE / 2);

    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

    //Verify if attribute got created
    await mayBeElement(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name }))
  }

  //Add attribute to section
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);

  for (let i = 0; i < context().attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const { name } = context().attributes[i];
    await AttributeLayout.dragAttributeAndDropToSection(name, sectionName)
  }

  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();

});

Then(/^ui: Create "([^"]*)" attributes in "([^"]*)" tab of type "([^"]*)" without default values$/, async (numberOfAttributesToBeCreated: any, tileToBeClicked: string,
  attributeType: string) => {
  if (parseInt(numberOfAttributesToBeCreated) !== attributeType.split(",").length) {
    throw Error("Number of attributes to be created is not equal to number of Attributes types provided");
  }

  //Switch to tab
  switch (tileToBeClicked.trim().toLowerCase()) {
    case "project":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case "resource":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case "assignment":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Assignment`);
  }

  context().attributes = [];
  const attributeTypes = attributeType.split(",");

  for (let i = 0; i < numberOfAttributesToBeCreated; i++) {
    context().attributes.push(attributeModel(attributeTypes[i], 4, 2, false));
  }

  for (let i = 0; i < numberOfAttributesToBeCreated; i++) {
    const attribute = context().attributes[i];

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    //Enter Selection values
    switch (attribute.type) {
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let j = 0; j < attribute.selectionValues.length; j++) {
          await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
          await browser.pause(SHORT_PAUSE / 5);
          await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
        }
        break;
    }


    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

    //Verify if attribute got created
    await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();
  }

});

Then(/^ui: Create "([^"]*)" attributes in "([^"]*)" tab of type "([^"]*)" with default values$/, async (numberOfAttributesToBeCreated: number, tileToBeClicked: string,
  attributeType: string) => {
  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case AttributeSection.Resource:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case AttributeSection.Assignment:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
  }

  context().attributes = [];
  const attributeTypes = attributeType.split(",");

  for (let i = 0; i < numberOfAttributesToBeCreated; i++) {
    context().attributes.push(attributeModel(attributeTypes[i], 4, 2,));
  }

  for (let i = 0; i < numberOfAttributesToBeCreated; i++) {
    const attribute = context().attributes[i];

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    //Enter Selection values
    switch (attribute.type) {
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let j = 0; j < attribute.selectionValues.length; j++) {
          await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
          await browser.pause(SHORT_PAUSE / 5);
          await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
        }
        break;
    }

    //Enter default value as per attribute type
    switch (attribute.type) {
      case AttributeTypes.Currency:
      case AttributeTypes.Number:
      case AttributeTypes.PrecisionNumber:
      case AttributeTypes.ProgressBar:
      case AttributeTypes.String:
      case AttributeTypes.Text:
      case AttributeTypes.URL:
        await formFill([
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: null, action: 'clearValue' },
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: attribute.defaultValue, action: 'setValue' },
        ]);
        await AttributesCommon.clickOnAttributeListTab();
        break;
      case AttributeTypes.Date:
        await formFill([
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: null, action: 'clearValue' },
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: attribute.defaultValue, action: 'setValue' },
        ]);
        await AttributesCommon.clickOnAttributeListTab();
        break;
      case AttributeTypes.Selection:
      case AttributeTypes.Bool:
        await selectFromDropdown({
          dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
          dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValue),
        });
        break;
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let k = 0; k < attribute.defaultValues.length; k++) {
          await browser.pause(SHORT_PAUSE / 5);
          await selectFromDropdown({
            dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
            dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValues[k]),
          });
        }
        break;
    }

    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

    //Verify if attribute got created
    await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();
  }

});


Then(/^ui: Create a Bool attribute and a resources list attribute in "([^"]*)" tab$/, async (tileToBeClicked: string) => {

  context().boolAttribute = attributeModel("Bool");
  context().resourcesListAttribute = resourcesListAttributeModelWithAttribute(context().boolAttribute.name, true);

  await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");

  //Enter attribute name
  await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, context().boolAttribute.name);

  // select attribute type
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, context().boolAttribute.type),
  });

  await Attribute.toggleRequiredButtonInCreateAttributeSection("on");

  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Yes"),
  });

  //Click on create attribute button
  await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

  //Verify if attribute got created
  await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: context().boolAttribute.name })).toBeDisplayed();


  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case AttributeSection.Resource:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case AttributeSection.Assignment:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
  }


  //Enter Resources list attribute name
  await formFill([
    { locator: Selectors.adminSettings.attributeManagement.attributeNameInputbox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.attributeManagement.attributeNameInputbox, value: context().resourcesListAttribute.name, action: 'setValue' },
  ]);

  // select attribute type
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, context().resourcesListAttribute.type),
  });

  await clickToElement(Selectors.attributeManagement.chkOnlyAllowResourcesWhoAreLocator);

  await selectFromDropdown({
    dropdownOpener: Selectors.attributeManagement.ddOnlyAllowResourcesWhoAreLocator,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, context().resourcesListAttribute.booleanAttributeName),
  });


  //Click on create attribute button
  await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

  //Verify if attribute got created
  await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: context().resourcesListAttribute.name })).toBeDisplayed();


});

Then(/^ui: Create all types of attributes in "([^"]*)" tab without defaults and add to "([^"]*)" section of Attribute Management$/, { timeout: (DEFAULT_STEP_TIMEOUT * 20) }, async (tileToBeClicked: string,
  sectionName: string) => {

  //Switch to tab
  switch (tileToBeClicked.trim().toLowerCase()) {
    case "project":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case "resource":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case "assignment":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Assignment`);
  }

  context().attributes = [];
  const keys = Object.values(AttributeTypes);

  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case AttributeTypes.Calculated:
      case AttributeTypes.Cascading:
      case AttributeTypes.Hierarchy:
      case AttributeTypes.Resource:
      case AttributeTypes.ResourcesList:
        break;
      default:
        context().attributes.push(attributeModel(keys[i], 4, 2, false));
    }
  }

  for (let i = 0; i < context().attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const attribute = context().attributes[i];
    await AttributeList.createAttribute(attribute);

  }

  //Add attribute to section
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);

  for (let i = 0; i < context().attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const { name } = context().attributes[i];
    await AttributeLayout.dragAttributeAndDropToSection(name, sectionName)
  }

  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();

});

Then(/^ui: Create "([^"]*)" attributes in "([^"]*)" tab of type "([^"]*)" without default values and add to "([^"]*)" section of Attribute Management$/, async (numberOfAttributesToBeCreated: number, tileToBeClicked: string,
  attributeType: string, sectionName: string) => {
  //Switch to tab
  switch (tileToBeClicked.trim().toLowerCase()) {
    case "project":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case "resource":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case "assignment":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Assignment`);
  }

  context().attributes = [];
  const attributeTypes = attributeType.split(",");

  for (let i = 0; i < numberOfAttributesToBeCreated; i++) {
    context().attributes.push(attributeModel(attributeTypes[i], 4, 2, false));
  }

  for (let i = 0; i < numberOfAttributesToBeCreated; i++) {
    const attribute = context().attributes[i];

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    //Enter Selection values
    switch (attribute.type) {
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let j = 0; j < attribute.selectionValues.length; j++) {
          await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
          await browser.pause(SHORT_PAUSE / 5);
          await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
        }
        break;
    }


    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

    //Verify if attribute got created
    await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();

    //Add attribute to section
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);

    for (let i = 0; i < context().attributes.length; i++) {
      await browser.pause(SHORT_PAUSE / 5);
      const { name } = context().attributes[i];
      await AttributeLayout.dragAttributeAndDropToSection(name, sectionName)
    }

    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
    const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
    await saveButton.waitForClickable();
  }

});

Then(/^ui: Create an attribute in "([^"]*)" tab with test data that was setup earlier and add to "([^"]*)" section of Attribute Management$/,
  async (tileToBeClicked: string, sectionName: string) => {

    //Switch to tab
    switch (tileToBeClicked.trim().toLowerCase()) {
      case "project":
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
        break;
      case "resource":
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
        break;
      case "assignment":
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
        break;
      default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Assignment`);
    }

    const attribute = context().attributeSetup;

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    //Enter Selection values
    switch (attribute.type) {
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let j = 0; j < attribute.selectionValues.length; j++) {
          await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
          await browser.pause(SHORT_PAUSE / 5);
          await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
        }
        break;
    }

    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

    //Verify if attribute got created
    await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();

    //Add attribute to section
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);

    if(tileToBeClicked == "Assignment") {
      const attributeNameElement = await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeName, parsing: attribute.name });
      attributeNameElement.waitForClickable();
      await elementDragAndDrop(
        locatorParse(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeName, attribute.name),
        '(//div[@type="section"])[1]');
    }
    else {
      await AttributeLayout.dragAttributeAndDropToSection(attribute.name, sectionName)
    }

    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
    const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
    await saveButton.waitForClickable();

  });

Then(/^ui: Create Rich text type attributes in "(Project|Resource|Assignment)" tab with default values and add them to "([^"]*)" section$/, async (tileToBeClicked: string, sectionName: string) => {

  let attributes;
  context().attributeDefaultValue = [];
  for (let i = 0; i < 8; i++) { 
    context().attributeDefaultValue.push([]);
  }

  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      context().projectAttributes = [];
      context().projectAttributes.push(attributeModel(AttributeTypes.String, 4, 2));
      context().projectAttributes.push(attributeModel(AttributeTypes.Text, 4, 2));
      context().projectAttributes.push(attributeModel("String", 4, 2));
      context().projectAttributes.push(attributeModel("Text", 4, 2));
      attributes = context().projectAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Project);
      break;
    case AttributeSection.Resource:
      context().resourceAttributes = [];
      context().resourceAttributes.push(attributeModel(AttributeTypes.String, 4, 2));
      context().resourceAttributes.push(attributeModel(AttributeTypes.Text, 4, 2));
      attributes = context().resourceAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Resource);
      break;
    case AttributeSection.Assignment:
      context().assignmentAttributes = [];
      context().assignmentAttributes.push(attributeModel(AttributeTypes.String, 4, 2));
      context().assignmentAttributes.push(attributeModel(AttributeTypes.Text, 4, 2));
      context().assignmentAttributes.push(attributeModel("String", 4, 2));
      context().assignmentAttributes.push(attributeModel("Text", 4, 2));
      attributes = context().assignmentAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Assignment);
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
      Supported values :\n${Object.values(AttributeSection)}`);
  }


  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    attribute.defaultValue = [faker.string.alphanumeric(5), faker.string.alphanumeric(5), faker.string.alphanumeric(5),
    faker.string.alphanumeric(5), faker.string.alphanumeric(5)];

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    await AttributeList.toggleRichTextInCreateAttributeSection(true);

    await browser.pause(SHORT_PAUSE);//Needed for input to open
    const richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);

    //Enter default value
    await richTextInputEditSectionActivatorElement.click();
    await browser.pause(SHORT_PAUSE / 2);//Needed for input to open

    //Bold
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextBoldIcon);
    await browser.pause(SHORT_PAUSE / 5);
    await richTextInputEditSectionActivatorElement.click();
    await browser.pause(SHORT_PAUSE / 5);

    await richTextInputEditSectionActivatorElement.addValue(attributes[i].defaultValue[0] + " ");
    context().attributeDefaultValue[i].push(attributes[i].defaultValue[0]);
    //Italic
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextItalicIcon);
    await browser.pause(SHORT_PAUSE / 5);
    await richTextInputEditSectionActivatorElement.addValue(attributes[i].defaultValue[1] + " ");
    context().attributeDefaultValue[i].push(attributes[i].defaultValue[1]);

    //Font Name
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameDropdown,
      dropdownSelection: locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameAndSizeDropdownValue, "monospace"),
    });
    await richTextInputEditSectionActivatorElement.addValue(attributes[i].defaultValue[3] + " ");
    context().attributeDefaultValue[i].push(attributes[i].defaultValue[3]);

    //Font Size
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontSizeDropdown,
      dropdownSelection: locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameAndSizeDropdownValue, "18px"),
    });
    await richTextInputEditSectionActivatorElement.addValue(attributes[i].defaultValue[4] + " ");
    context().attributeDefaultValue[i].push(attributes[i].defaultValue[4]);

    //Underline
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextUnderlineIcon);
    await browser.pause(SHORT_PAUSE / 5);
    await richTextInputEditSectionActivatorElement.addValue(attributes[i].defaultValue[2] + " ");
    context().attributeDefaultValue[i].push(attributes[i].defaultValue[2]);

    await browser.pause(SHORT_PAUSE);

    //Adding expected values to map which will in-turn be added to context()
    const elements = await richTextInputEditSectionActivatorElement.$$('*');
    const expectedHTMLElements = await (elements.map(element => element.getText()))
    //Adding expected value to context
    switch (tileToBeClicked) {
      case AttributeSection.Project:
        context().projectAttributes[i].expectedValue = expectedHTMLElements;
        break;
      case AttributeSection.Resource:
        context().resourceAttributes[i].expectedValue = expectedHTMLElements;
        break;
      case AttributeSection.Assignment:
        context().assignmentAttributes[i].expectedValue = expectedHTMLElements;
        break;
      default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
      Supported values :\n${Object.values(AttributeSection)}`);
    }

    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);
    const ele = await element(Selectors.adminSettings.attributeManagement.createAttributeButton)
    await browser.waitUntil(async () => { 
      return await ele.isDisplayed();
    }, {
        timeout: 10000, // Maximum wait time in milliseconds
        timeoutMsg: 'Element did not become visible within 10 seconds'
    });
    //Verify if attribute got created
    await AttributesCommon.searchForAttribute(attribute.name);
    await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();
  }

  //Add attribute to section
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);

  for (let i = 0; i < attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const { name } = attributes[i];
    await formFill([
      {locator:'//input[@placeholder="Type your field name"]',value:name,action:'setValue'}
    ])
    if(tileToBeClicked == 'Assignment') {
      const attributeNameElement = await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeName, parsing: name });
      attributeNameElement.waitForClickable();
      await elementDragAndDrop(locatorParse(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeName, name),
        Selectors.adminSettings.attributeManagement.attributeLayoutSection.sectionDropToAreaForAssignment);
    } else {
      await AttributeLayout.dragAttributeAndDropToSection(name, sectionName);
    }
  }

  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();
});


Then('ui: Click on Attribute List tab in Attribute Management', async () => {
  await AttributesCommon.clickOnAttributeListTab();
});

Then('ui: Verify if Rich Text is converted to regular text in attribute creation', async () => {

  const attributeTypes = [AttributeTypes.String, AttributeTypes.Text];
  const tabs = ["Project", "Resource", "Assignment"];

  for (let i = 0; i < tabs.length; i++) {
    for (let j = 0; j < attributeTypes.length; j++) {
      const defaultToBeEntered = faker.company.name();
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, tabs[i]);

      // select attribute type
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attributeTypes[j]),
      });
      const richTextToggleInput = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInput);
      const richTextToggleInputState = await isElementSelected(richTextToggleInput);

      context().softAssert.isFalse(richTextToggleInputState, `Rich Text Toggle button was not de-selected for new CF creation in ${tabs[i]} tab`);

      await AttributeList.toggleRichTextInCreateAttributeSection(true);
      const richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);

      await browser.pause(SHORT_PAUSE / 2);
      await richTextInputEditSectionActivatorElement.click();
      await browser.pause(SHORT_PAUSE / 2);

      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextBoldIcon);
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextItalicIcon);
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextUnderlineIcon);

      await richTextInputEditSectionActivatorElement.setValue(defaultToBeEntered);

      await AttributeList.toggleRichTextInCreateAttributeSection(false);
      await browser.pause(SHORT_PAUSE);
      const defaultValueInputBoxElement = await element(Selectors.adminSettings.attributeManagement.defaultValueInputBoxValidation);

      const elements = await defaultValueInputBoxElement.$$('*');
      const expectedHTMLElements = await (elements.map(element => element.getText()))

      context().softAssert.equal(expectedHTMLElements, "", `Rich Text was not converted to Regular text after toggle button was turned OFF for new CF creation in ${tabs[i]} tab`)
    }
  }
});

Then(/^ui: Verify if default Rich Text value of CF in tab "(Project|Resource|Assignment)" can be edited in Attribute Management$/, async (tileToBeClicked: string) => {

  let attributes;
  let formatMap;
  if (context().expectedValues === undefined) {
    context().expectedValues = [];
    formatMap = new Map<string, string>();
    context().expectedValues = formatMap;
  }


  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      attributes = context().projectAttributes;
      break;
    case AttributeSection.Resource:
      attributes = context().resourceAttributes;
      break;
    case AttributeSection.Assignment:
      attributes = context().assignmentAttributes;
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
      Supported values :\n${Object.values(AttributeSection)}`);
  }


  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];

    attribute.defaultValue = [faker.string.alphanumeric(5), faker.string.alphanumeric(5), faker.string.alphanumeric(5),
    faker.string.alphanumeric(5), faker.string.alphanumeric(5)];

    // Click on edit button of CF
    await AttributeList.clickOnEditButtonOfCF(attribute.name);

    await browser.pause(SHORT_PAUSE);//Needed for input to open
    let richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);

    //Enter default value
    await richTextInputEditSectionActivatorElement.click();
    await browser.pause(SHORT_PAUSE / 2);//Needed for input to open
    await clearTextUsingBackspace(richTextInputEditSectionActivatorElement);

    //Bold
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextBoldIcon);
    await browser.pause(SHORT_PAUSE / 5);
    await richTextInputEditSectionActivatorElement.setValue(attributes[i].defaultValue[0] + " ");

    //Italic
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextItalicIcon);
    await browser.pause(SHORT_PAUSE / 5);
    await richTextInputEditSectionActivatorElement.setValue(attributes[i].defaultValue[1] + " ");

    //Font Name
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameDropdown,
      dropdownSelection: locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameAndSizeDropdownValue, "serif"),
    });
    await richTextInputEditSectionActivatorElement.setValue(attributes[i].defaultValue[3] + " ");

    await browser.pause(SHORT_PAUSE / 2);

    //Adding expected values to map which will in-turn be added to context()
    let elements = await richTextInputEditSectionActivatorElement.$$('*');
    const expectedHTMLElements = await (elements.map(element => element.getText()))

    //Click on save attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.saveButtonInAttributeEditSection);
    await browser.pause(SHORT_PAUSE);

    await reload();

    switch (tileToBeClicked) {
      case AttributeSection.Project:
        attributes = context().projectAttributes;
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Project);
        break;
      case AttributeSection.Resource:
        attributes = context().resourceAttributes;
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Resource);
        break;
      case AttributeSection.Assignment:
        attributes = context().assignmentAttributes;
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Assignment);
        break;
      default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
        Supported values :\n${Object.values(AttributeSection)}`);
    }

    // Click on edit button of CF
    await AttributeList.clickOnEditButtonOfCF(attribute.name);

    richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    const actualHTMLElements = await (elements.map(element => element.getText()));

    context().softAssert.equal(actualHTMLElements, expectedHTMLElements, `Rich text default value was incorrect after editing the CF name:${attribute.name} in tab:{${tileToBeClicked}} of Attribute Management`, true);

    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.cancelButtonInAttributeEditSection);
    await browser.pause(SHORT_PAUSE);
  }
});

Then(/^ui: Delete recently created "(Project|Resource|Assignment)" CFs and verify they are not visible after page refresh$/, async (tileToBeClicked: string) => {
  let attributes;

  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      attributes = context().projectAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Project);
      break;
    case AttributeSection.Resource:
      attributes = context().resourceAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Resource);
      break;
    case AttributeSection.Assignment:
      attributes = context().assignmentAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Assignment);
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
      Supported values :\n${Object.values(AttributeSection)}`);
  }

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    await AttributesCommon.searchForAttribute(attribute.name);
    await browser.pause(SHORT_PAUSE);
    await AttributeList.clickOnDeleteButtonOfCF(attribute.name);
    await Common.clickOnSpecificButtonInConfirmationModal("Yes");
    await browser.pause(SHORT_PAUSE);
    await reload();
    switch (tileToBeClicked) {
      case AttributeSection.Project:
        attributes = context().projectAttributes;
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Project);
        break;
      case AttributeSection.Resource:
        attributes = context().resourceAttributes;
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Resource);
        break;
      case AttributeSection.Assignment:
        attributes = context().assignmentAttributes;
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Assignment);
        break;
      default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
        Supported values :\n${Object.values(AttributeSection)}`);
    }
    await AttributesCommon.searchForAttribute(attribute.name);
    await AttributeList.verifyIfCFIsNotPresent(attribute.name, true);
  }
  await AttributesCommon.searchForAttribute('');
});

Then(/^ui: Turn "(On|Off)" Rich Text toggle button in attribute creation section$/, async (toggleState: string) => {
  await AttributeList.toggleRichTextInCreateAttributeSection(toggleState === "On" ? true : false);
});

Then(/^ui: Enter "([^"]*)" number of words in Rich Text default value textbox of attribute creation section$/, async (numberOfWords: number) => {
  const defaultValue = Array.from({ length: numberOfWords }, () => faker.lorem.word()).join(' ').trim();
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
  await formFill([
    { locator: Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator, value: defaultValue, action: 'setValue' },
  ]);
  context().defaultValuesEntered = defaultValue;
});

Then(/^ui: Click on "(Bold|Italic|Underline|Strikethrough)" formatting icon in Rich text editor of attribute creation section$/, async (formattingToBeApplied: string) => {
  switch (formattingToBeApplied) {
    case "Bold":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextBoldIcon);
      break;
    case "Italic":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextItalicIcon);
      break;
    case "Underline":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextUnderlineIcon);
      break;
    case "Strikethrough":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextStrikethroughIcon);
      break;
    default: throw Error(`Formatting to be applied :{${formattingToBeApplied}} is not yet supported.\nPlease add if required\n
      Supported values: Bold|Italic|Underline|Strikethrough`);
  }
  await browser.pause(SHORT_PAUSE / 2);
});

Then(/^ui: Select "(Font name|Font size|Font Color)" as:"([^"]*)" in Rich text editor of attribute creation section$/, async (formattingToBeApplied: string, formattingValue: string) => {
  switch (formattingToBeApplied) {
    case "Font name":
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameDropdown,
        dropdownSelection: locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameAndSizeDropdownValue, formattingValue),
      });
      break;
    case "Font size":
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontSizeDropdown,
        dropdownSelection: locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameAndSizeDropdownValue, formattingValue),
      });
      break;
    case "Font Color":
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontColorDropdown,
        dropdownSelection: locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontColorDropdownValue, formattingValue),
      });
      break;
    default: throw Error(`Formatting to be applied :{${formattingToBeApplied}} is not yet supported.\nPlease add if required\n
      Supported values: Font name|Font size|Font Color`);
  }
});

Then(/^ui: Verify "(Font name|Font size|Font Color)" is:"([^"]*)" in Rich text editor of attribute creation section$/, async (formattingToBeApplied: string, expectedFormattingValue: string) => {
  switch (formattingToBeApplied) {
    case "Font name":
      const actualFontName = (await (await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontNameDropdown)).getAttribute('data-value'));
      context().softAssert.equal(actualFontName, expectedFormattingValue, "Font name was incorrect in Rich text editor of attribute creation section");
      // context().softAssert.isTrue()
      break;
    case "Font size":
      const actualFontsize = (await (await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontSizeDropdown)).getAttribute('data-value')).trim();
      context().softAssert.equal(actualFontsize, expectedFormattingValue, "Font size was incorrect in Rich text editor of attribute creation section");
      break;
    case "Font Color":
      const actualFontColor = await getElementBackgroundColor(Selectors.adminSettings.attributeManagement.attributeListSection.richTextFontColorSelected);
      context().softAssert.equal(actualFontColor, expectedFormattingValue, "Font Color was incorrect in Rich text editor of attribute creation section");
      break;
    default: throw Error(`Formatting to be applied :{${formattingToBeApplied}} is not yet supported.\nPlease add if required\n
      Supported values: Font name|Font size|Font Color`);
  }
});

Then('ui: Verify if Tooltip is not displayed in Attribute Management', async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeListSection.toolTip, MEDIUM_PAUSE);
  context().softAssert.isFalse(ele, "Tooltip is still dislayed in Attribute Management");
});

Then('ui: Verify if Tooltip from Attribute Management is not displayed in Admin Settings', async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeListSection.toolTip, MEDIUM_PAUSE);
  context().softAssert.isFalse(ele, "Tooltip from Attribute Management is still dislayed in Admin Settings");
});

Then('ui: Click on Rich Text default value textbox in attribute creation section', async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
});

Then('ui: Double click on last word in Rich Text default value textbox in attribute creation section', async () => {
  await doubleClickToElement(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.defaultValueTextInRichText, context().defaultValuesEntered.split(' ')[context().defaultValuesEntered.split(' ').length - 1].slice(0, -2)));
});

Then('ui: I click on default value Rich text field and select all text using CTRL plus A in attribute list tab', async () => {
  const richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
  await richTextInputEditSectionActivatorElement.click();
  await selectAllTextUsingCTRLPlusA();
});

Then('ui: Enter Attribute name in Attribute create section of Attribute Management', async () => {
  await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, context().attributeSetup.name);
});

Then('ui: Select Attribute type in create section of Attribute Management', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, context().attributeSetup.type),
  });
});

Then('ui: Click on Create attribute button in Attribute Management', async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);
});

Then('ui: Search for recently created attribute in Attribute Management', async () => {
  await AttributesCommon.searchForAttribute(context().attributeSetup.name);
});

Then('ui: Verify recently created attribute is displayed in Attribute Management', async () => {
  const cFDeleteIconDisplayStatus = await isElementDisplayed(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.attributeDeleteIcon, context().attributeSetup.name), MEDIUM_PAUSE);
  assert.isTrue(cFDeleteIconDisplayStatus, `CF:{${context().attributeSetup.name}} is was not present in Attribute Management`);
});

Then('ui: Click on Default value text are in create section of Attribute Management', async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
});

Then(/^ui: Click on "(Bold|Italic|Underline|Strike)" formatting icon in Rich text editor and validate only single tooltip is present$/, async (formattingToBeApplied: string) => {
  switch (formattingToBeApplied) {
    case "Bold":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextBoldIcon);
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validate2ndTooltip, formattingToBeApplied))).not.toBeDisplayed();
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validateTooltip, formattingToBeApplied))).toBeDisplayed();
      break;
    case "Italic":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextItalicIcon);
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validate2ndTooltip, formattingToBeApplied))).not.toBeDisplayed();
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validateTooltip, formattingToBeApplied))).toBeDisplayed();
      break;
    case "Underline":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextUnderlineIcon);
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validate2ndTooltip, formattingToBeApplied))).not.toBeDisplayed();
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validateTooltip, formattingToBeApplied))).toBeDisplayed();
      break;
    case "Strike":
      await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.richTextStrikethroughIcon);
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validate2ndTooltip, formattingToBeApplied))).not.toBeDisplayed();
      await expect(await $(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.validateTooltip, formattingToBeApplied))).toBeDisplayed();
      break;
    default: throw Error(`Formatting to be applied :{${formattingToBeApplied}} is not yet supported.\nPlease add if required\n
      Supported values: Bold|Italic|Underline|Strike`);
  }
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: I search for the created attribute and click on edit button', async () => {
  await browser.pause(MEDIUM_PAUSE);
  let attributes;
  attributes = context().projectAttributes;
  const attribute = attributes[0];
  await AttributesCommon.searchForAttribute(attribute.name);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeEditButton);
  await browser.pause(SHORT_PAUSE);//Needed for input to open
  const richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
  await richTextInputEditSectionActivatorElement.click();
});

Then(/^ui: Create an attributes in "(Project|Resource|Assignment)" tab with Rich text default of text types$/, async (tileToBeClicked: string) => {

  let attributes;

  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      context().projectAttributes = [];
      context().projectAttributes.push(attributeModel(AttributeTypes.String, 4, 2));
      attributes = context().projectAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Project);
      break;
    case AttributeSection.Resource:
      context().resourceAttributes = [];
      context().resourceAttributes.push(attributeModel(AttributeTypes.String, 4, 2));
      attributes = context().resourceAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Resource);
      break;
    case AttributeSection.Assignment:
      context().assignmentAttributes = [];
      context().assignmentAttributes.push(attributeModel(AttributeTypes.String, 4, 2));
      attributes = context().assignmentAttributes;
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, AttributeSection.Assignment);
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
      Supported values :\n${Object.values(AttributeSection)}`);
  }


  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    attribute.defaultValue = [faker.string.alphanumeric(5), faker.string.alphanumeric(5), faker.string.alphanumeric(5),
    faker.string.alphanumeric(5), faker.string.alphanumeric(5)];

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    await AttributeList.toggleRichTextInCreateAttributeSection(true);

    await browser.pause(SHORT_PAUSE);//Needed for input to open
    const richTextInputEditSectionActivatorElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);

    //Enter default value
    await richTextInputEditSectionActivatorElement.click();
  }
});

Then('ui: I click on create attribute and validate attribute is created', async () => {
  let attributes;
  attributes = context().projectAttributes;
  const attribute = attributes[0];
  //Click on create attribute button
  await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);
  //Verify if attribute got created
  await AttributesCommon.searchForAttribute(attribute.name);
  await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();
  await browser.pause(MEDIUM_PAUSE);
  await browser.refresh();
});

Then('ui: I validate that the default value is still present inside textbox', async () => {
  const ele = await (await $(Selectors.adminSettings.attributeManagement.defaultValueInputBoxValidation)).getValue();
  await assert.equal(ele, context().defaultValuesEntered, `The default value '${context().defaultValuesEntered}' has been changed after Rich Text toggle button is set to "OFF" in attribute creation section`);
});

Then(/^ui: Create an Attribute using model data in "(Project|Resource|Assignment)" tab of Attribute Management$/, async (tileToBeClicked: string) => {
  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case AttributeSection.Resource:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case AttributeSection.Assignment:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
  }

  const attribute = context().attributeSetup;

  //Enter attribute name
  await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

  // select attribute type
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
  });

  //Enter Selection values
  switch (attribute.type) {
    case AttributeTypes.Selection:
    case AttributeTypes.MultiSelection:
    case AttributeTypes.Tags:
      for (let j = 0; j < attribute.selectionValues.length; j++) {
        await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
        await browser.pause(SHORT_PAUSE / 5);
        await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
      }
      break;
  }

  if (attribute.createDefaultValues === true) {
    //Enter default value as per attribute type
    switch (attribute.type) {
      case AttributeTypes.Currency:
      case AttributeTypes.Number:
      case AttributeTypes.PrecisionNumber:
      case AttributeTypes.ProgressBar:
      case AttributeTypes.String:
      case AttributeTypes.Text:
      case AttributeTypes.URL:
        await formFill([
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: null, action: 'clearValue' },
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: attribute.defaultValue, action: 'setValue' },
        ]);
        await AttributesCommon.clickOnAttributeListTab();
        break;
      case AttributeTypes.Date:
        await formFill([
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: null, action: 'clearValue' },
          { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: attribute.defaultValue, action: 'setValue' },
        ]);
        await AttributesCommon.clickOnAttributeListTab();
        break;
      case AttributeTypes.Selection:
      case AttributeTypes.Bool:
        await selectFromDropdown({
          dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
          dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValue),
        });
        break;
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let k = 0; k < attribute.defaultValues.length; k++) {
          await browser.pause(SHORT_PAUSE / 5);
          await selectFromDropdown({
            dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
            dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValues[k]),
          });
        }
        break;
    }
  }

  //Click on create attribute button
  await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

  //Verify if attribute got created
  await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, attribute.name), ELEMENT_TIMEOUT),
    `Attribute name: {${attribute.name}} was not created even after ${ELEMENT_TIMEOUT}ms`);

});

Then(/^ui: Add recently created CF to "(Required Fields|Optional Fields)" section of Attribute Layout$/, async (sectionName: string) => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);

  await browser.pause(SHORT_PAUSE / 5);
  const { name } = context().attributeSetup;
  const el = await element('//*[@class="wf-attribute-filter"]')
  await el.setValue(name);
  await AttributeLayout.dragAttributeAndDropToSection(name, sectionName)

  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();

});

Then(/^ui: Create an Attributes using model data in "(Project|Resource|Assignment)" tab of Attribute Management$/, async (tileToBeClicked: string) => {
  for (let i = 0; i < context().attributesSetup.length; i++) {
    //Switch to tab
    switch (tileToBeClicked) {
      case AttributeSection.Project:
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
        break;
      case AttributeSection.Resource:
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
        break;
      case AttributeSection.Assignment:
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
        break;
      default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
    }

    const attribute = context().attributesSetup[i];
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeListTab);

    //Enter attribute name
    await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute.name);

    // select attribute type
    await selectFromDropdown({
      dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.type),
    });

    //Enter Selection values
    switch (attribute.type) {
      case AttributeTypes.Selection:
      case AttributeTypes.MultiSelection:
      case AttributeTypes.Tags:
        for (let j = 0; j < attribute.selectionValues.length; j++) {
          await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
          await browser.pause(SHORT_PAUSE / 5);
          await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute.selectionValues[j]);
        }
        break;
    }

    if (attribute.createDefaultValues === true) {
      //Enter default value as per attribute type
      switch (attribute.type) {
        case AttributeTypes.Currency:
        case AttributeTypes.Number:
        case AttributeTypes.PrecisionNumber:
        case AttributeTypes.ProgressBar:
        case AttributeTypes.String:
        case AttributeTypes.Text:
        case AttributeTypes.URL:
          await formFill([
            { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: null, action: 'clearValue' },
            { locator: Selectors.adminSettings.attributeManagement.defaultValueInputbox, value: attribute.defaultValue, action: 'setValue' },
          ]);
          await AttributesCommon.clickOnAttributeListTab();
          break;
        case AttributeTypes.Date:
          await formFill([
            { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: null, action: 'clearValue' },
            { locator: Selectors.adminSettings.attributeManagement.defaultValueInputboxWhenCreatingDateCF, value: attribute.defaultValue, action: 'setValue' },
          ]);
          await AttributesCommon.clickOnAttributeListTab();
          break;
        case AttributeTypes.Selection:
        case AttributeTypes.Bool:
          await selectFromDropdown({
            dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
            dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValue),
          });
          break;
        case AttributeTypes.MultiSelection:
        case AttributeTypes.Tags:
          for (let k = 0; k < attribute.defaultValues.length; k++) {
            await browser.pause(SHORT_PAUSE / 5);
            await selectFromDropdown({
              dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
              dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.defaultValues[k]),
            });
          }
          break;
      }
    }

    //Click on create attribute button
    await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);

    //Verify if attribute got created
    await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, attribute.name), ELEMENT_TIMEOUT),
      `Attribute name: {${attribute.name}} was not created even after ${ELEMENT_TIMEOUT}ms`);
  }
});

Then(/^ui: Add recently created CFs to "(Required Fields|Optional Fields)" section of Attribute Layout$/, async (sectionName: string) => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);
  for (let i = 0; i < context().attributesSetup.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const { name } = context().attributesSetup[i];
    await AttributeLayout.dragAttributeAndDropToSection(name, sectionName)
  }
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();
});

Then('ui: I navigate to Attribute Layout tab',async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);
});

Then('ui: I add a new section to Attribute Layout tab',async()=>{
  await clickToElement(Selectors.adminSettings.attributeManagement.btnNewSection)
  await formFill([
    {locator:Selectors.adminSettings.attributeManagement.sectionForm,value:null,action:'click'},
    {locator:Selectors.adminSettings.attributeManagement.newSectionInput,value:null,action:'click'},
  ]) 
  await slowInputFilling(Selectors.adminSettings.attributeManagement.newSectionInput,context().sectionSetup.name)
});

Then(/^ui: Add recently created attribute to "([^"]*)" section of Attribute Layout$/, async (sectionName: string) => {

  await browser.pause(SHORT_PAUSE / 5);
  const { name } = context().attributeSetup;
  const el = await element('//*[@class="wf-attribute-filter"]')
  await el.setValue(name);
  await AttributeLayout.dragAttributeAndDropToSection(name, sectionName)

  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();

});

Then('ui: Add recently created CF to recently created section of Attribute Layout',async() => {
  await browser.pause(SHORT_PAUSE / 5);
  const { name } = context().attributeSetup;
  const el = await element('//*[@class="wf-attribute-filter"]')
  await el.setValue(name);
  await AttributeLayout.addAttributeToSection()

  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();

})

Then(/^ui: I add "(New|Upload File)" section below the Required Field section$/, async (sectionType: string) => {
  switch (sectionType) {
    case 'New':
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.newSectionButton, 'New section');
      break;
    case 'Upload File':
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.newSectionButton, 'File');
      break;
    default:
      break;
  }
})

Then(/^ui: I add and validate "([^"]*)" sub-section inside the newly created section$/,async (subSection: string) => {
  if(subSection=='solidLine' || subSection=='dotLine' || subSection=='dashLine'){
    subSection = subSection.replace('Line', '');
  }
  let ele;
  switch (subSection) {
    case 'solid':
    case 'dot':
    case 'dash':
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.addSubsectionButtonByName, subSection);
      ele = await isElementDisplayed(locatorParse(Selectors.adminSettings.attributeManagement.attributeLayoutSection.validateSubsection, subSection));

      break;
    case 'Title':
    case 'Body':
    case 'Small':
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.newSectionButton, subSection);
      ele = await isElementDisplayed(locatorParse(Selectors.adminSettings.attributeManagement.attributeLayoutSection.validateLineSubSection, subSection.toLowerCase()));
      break;
    default:
      break;
  }
  context().softAssert.isTrue(ele, `Sub-Section: {${subSection}} is not added`); 
})

Then(/^ui: I "(Hide|Un-Hide)" the attribute selection section$/,async (status: string) => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeSectionValidation);
  if(status=='Hide' && ele == true){
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.hideAttributeSection);
  } else if(status=='Un-Hide'){
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.hideAttributeSection);
  }
});

Then(/^ui: I "(Collapse|Expand)" the Required Fields section$/,async (status: string) => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.collapseSectionButton);
  if(status=='Collapse' && ele == true){
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.collapseSectionButton)
  } else if(status=='Expand' && ele == false){
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.expandSectionBUtton)
  }
})

Then(/^ui: I select "([^"]*)" section if not already selected$/,async (sectionName: string) => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.validateSectionSelected);
  if(ele == false) {
    await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.clickSectionToSelect, sectionName);
  }
})

Then(/^ui: I toggle "([^"]*)" to "(On|Off)"$/,async (toggleName: string, toggleStatus: string) => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.adminSettings.attributeManagement.attributeLayoutSection.validateToggleSectionButton, toggleName))
  if(toggleStatus=='On' && ele == false){
    await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.toggleSectionButton, toggleName);
  } else if(toggleStatus=='Off' && ele == true){
    await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.toggleSectionButton, toggleName);
  }
})

Then('ui: I select the newly created attribute if not already selected',async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.validateHintBUtton);
  const ele2 = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.selectRequiredFieldSection);
  if(ele2 == true) {
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.selectRequiredFieldSection);
  }

  if(ele == false) {
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.selectSubAttributeSection);
  }
})

Then('ui: I export the attribute layout',async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.exportAttributeLayout);
})

Then(/^ui: Softassert if Attribute layout file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `Attribute List.xlsx`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then('ui: I click on save button in attribute layout tab', async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();
});

Then('ui: I delete the Files section included in the attribute layout',async () => {
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.addFileSection);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.deleteFileSection)
})

Then('ui: I validate the Files section is removed from the attribute layout',async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.addFileSection);
  await context().softAssert.isFalse(ele, `Section:{File} is still present and not deleted`)
})

Then(/^ui: create and verify "([^"]*)" attribute with type "([^"]*)" has filter Is Enabled attribute present$/, async (tabName: string, attributeType: string) => {
  const { resourceAttributeName, projectAttributeName, assignmentAttributeName } = context().attributeSetup;
  let attributeName;
  if (tabName.toLowerCase() == 'project') {
    attributeName = projectAttributeName;
  } else if (tabName.toLowerCase() == 'resource') {
    attributeName = resourceAttributeName;
  } else if (tabName.toLowerCase() == 'assignment') {
    attributeName = assignmentAttributeName;
  }
  await (await elementParse({ locatorString: Selectors.attributeManagement.specificTab, parsing: tabName })).click();
  await slowInputFilling(Selectors.attributeManagement.txtAttributeName, attributeName);
  await clickToElement(Selectors.attributeManagement.ddAttributeType);
  const el = await element(`${Selectors.common.dropdownValues}//*[normalize-space(text())='${attributeType}']`);
  await browser.pause(SHORT_PAUSE); // Required to open dropdown
  el.click();
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.checkboxForAllowFilters);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.selectFilterButton);
  await slowInputFilling('//input[contains(@class,"select-header_input")]', 'Is Enabled');
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeListSection.selectIsEnabledFilter);
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeListSection.validateIsEnabledFilter)
  await context().softAssert.isTrue(ele, `Filter: Is Enabled is not available for the ${attributeName}`)
  await clickToElement(Selectors.attributeManagement.btnCreateAttribute)
  
});

Then(/^ui: I navigate to "([^"]*)" section in Attribute Layout tab$/,async (attributeSection: string) => {
  switch (attributeSection) {
    case AttributeSection.Project:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case AttributeSection.Resource:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case AttributeSection.Assignment:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${attributeSection}} is not yet supported.\nPlease add if required\n
  Supported values :\n${Object.values(AttributeSection)}`);
  }
})

Then('ui: I search for Resource Hierarchy and create a new node',async() => {

  // await AttributesCommon.searchForAttribute('Resource Hierarchy');
  // await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeEditButton);
  // await browser.pause(SHORT_PAUSE);//Needed for input to open
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnAdd)
  const el = await element(Selectors.adminSettings.attributeManagement.hierarchy.input)
  await slowInputFilling(el,context().resourceHierarchySetup.name)
 await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnApply)
  await formFill([
    {locator:Selectors.adminSettings.attributeManagement.hierarchy.btnAddResource,value:null,action:'click'},
    {locator:Selectors.adminSettings.attributeManagement.hierarchy.btnAddResource,value:context().resourceSetup.name,action:'setValue'},
  ])
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnSave)
});


Then('ui: I search for Project Hierarchy and create a new node',async() => {
  await AttributesCommon.searchForAttribute('Project Hierarchy');
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeEditButton);
  await browser.pause(SHORT_PAUSE);//Needed for input to open
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnAdd)
  const el = await element(Selectors.adminSettings.attributeManagement.hierarchy.input)
  await slowInputFilling(el,context().projectHierarchySetup.name)
 await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnApply)
  await formFill([
    {locator:Selectors.adminSettings.attributeManagement.hierarchy.addProject,value:null,action:'click'},
    {locator:Selectors.adminSettings.attributeManagement.hierarchy.addProject,value: context().projectSetup.name,action:'setValue'},
  ])
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnSave)
});

Then('ui: I validate enums values are hidden within PM grid',async() => {
  const el = await element(await elementParse({locatorString:`//span[text()="{{}}"]/../preceding-sibling::div`,parsing: context().projectHierarchySetup.name}))
  await expect(el).toBeDisplayed()
  await el.getValue()
  await el.equal('')
});

Then('ui: I add a selection attribute to hierarchy and set it to hidden',async() => {
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.attributeText)
  await elementParseAndClick(Selectors.adminSettings.attributeManagement.hierarchy.attributeCell,context().projectHierarchySetup.name)
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnHidden)
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnOk)
  await clickToElement(Selectors.adminSettings.attributeManagement.hierarchy.btnSave)
});

Then(/^ui: create and verify "([^"]*)" attribute using model with type "([^"]*)" default value as Null and required "([^"]*)"$/, async (tabName: string, attributeType: string, requiredToggleState: string) => {
  // Assuming tabName is comma-separated, split it into an array
  const tabNames = tabName.split(',');
  let contextArray = [];
  for (const name of tabNames) {
    // Normalize name to lowercase for comparison
    const normalizedTabName = name.trim();

    let attribute1;
    if (normalizedTabName === 'Project') {
      attribute1 = resourcesListAttributeModel().projectAttributeName;
    } else if (normalizedTabName === 'Resource') {
      attribute1 = resourcesListAttributeModel().resourceAttributeName;
    } else if (normalizedTabName === 'Assignment') {
      attribute1 = resourcesListAttributeModel().assignmentAttributeName;
    }
    // Store attribute1 in an array for later use
    contextArray.push(attribute1);

    await Attribute.createAttributeWithDefaultValueRequiredFieldAndVerify(normalizedTabName, attribute1, attributeType, "Null", requiredToggleState);
  }
  context().attributes = [];
  context().attributes = contextArray;
});

Then(/^ui: I add recently created CFs to "(Required Fields|Optional Fields)" section of Attribute Layout for "([^"]*)"$/, async (sectionName: string, attributeLayoutTab: string) => {
  let layoutName;
  
  if(attributeLayoutTab == "Assignment") {
    layoutName = ["Assignment"];
  } 
  else {
    layoutName = ["Project", "Resource"];
  }
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutTab);
  for (let i = 0; i < layoutName.length; i++) {
    switch (layoutName[i]) {
      case AttributeSection.Project:
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
        break;
      case AttributeSection.Resource:
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
        break;
      case AttributeSection.Assignment:
        await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
        break;
      default: throw Error(`Click ot Tile :{${layoutName[i]}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
    }
    await browser.pause(SHORT_PAUSE / 5);
    const attribute = context().attributeSetup
    console.log(attribute.name)
    const el = await element('//*[@class="wf-attribute-filter"]')
    await slowInputFilling(el,attribute.name);
    if(attributeLayoutTab == 'Assignment') {
      const attributeNameElement = await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeName, parsing: attribute.name });
      attributeNameElement.waitForClickable();
      await elementDragAndDrop(locatorParse(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeName, attribute.name),
        locatorParse('(//div[@type="section"])[1]', sectionName));
    }
    else {
      await AttributeLayout.dragAttributeAndDropToSection(attribute.name, sectionName)
    }
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
    const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
    await saveButton.waitForClickable();
  }
});

Then(/^ui: I validate that the recently created "([^"]*)" CF has default value as "([^"]*)"$/, async (attributeTabName: string, defaultValue: string) => {
  let attribute1;
  const resourceName = context().resourceSetup.name;
  switch (attributeTabName) {
    case 'Project':
    case 'Assignment':
      attribute1 = context().attributes[0];
      break;
    case 'Resource':
      attribute1 = context().attributes[1];
      break;
    default:
      break;
  }
  if (attributeTabName == "Assignment") {
    await browser.pause(MEDIUM_PAUSE / 2);
    const ele = await $(await locatorParse(Selectors.projectManagement.projectEdit.validateAssignmentAttributeValue, resourceName)).getText();
    await context().softAssert.equal(ele, 'Not set', `Assignment attribute {${attribute1}} donot contain default value as Null`);
  }
  else {
    if (!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, attribute1)))) {
      await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
      await browser.pause(MEDIUM_PAUSE / 2)
    };
    const ele = await $(await locatorParse(Selectors.projectManagement.projectEdit.validateAttributeValue, attribute1)).getValue();
    await context().softAssert.equal(ele, defaultValue.toLowerCase(), `Attribute Value: {${attribute1}} donot contain default value as Null`);
  }
})

Then(/^ui: I remove the newly added CFs from the "([^"]*)" layout$/, async (tabName: string) => {
  //Switch to tab
  switch (tabName) {
        case AttributeSection.Project:
          await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
          break;
        case AttributeSection.Resource:
          await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
          break;
        case AttributeSection.Assignment:
          await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
          break;
    default: throw Error(`Click ot Tile :{${tabName}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
  }
  await browser.pause(SHORT_PAUSE / 2);
  if (await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.expandButton)) {
    await browser.pause(SHORT_PAUSE / 2);  
    await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.expandButton)
    await browser.pause(SHORT_PAUSE / 2);
  };
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.expandAttributeButton);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.deleteAttributeButton);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  const saveButton = await element(Selectors.adminSettings.attributeManagement.attributeLayoutSection.saveChangesButton);
  await saveButton.waitForClickable();
})

Then(/^ui: Create all types of attributes in "([^"]*)" tab without defaults and required status On$/, { timeout: (DEFAULT_STEP_TIMEOUT * 20) }, async (tileToBeClicked: string) => {

  //Switch to tab
  switch (tileToBeClicked.trim().toLowerCase()) {
    case "project":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case "resource":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case "assignment":
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Assignment`);
  }

  context().attributes = [];
  const keys = Object.values(AttributeTypes);

  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case AttributeTypes.Calculated:
      case AttributeTypes.Cascading:
      case AttributeTypes.Hierarchy:
      case AttributeTypes.Resource:
      case AttributeTypes.ResourcesList:
        break;
      default:
        context().attributes.push(attributeModel(keys[i], 4, 2, false));
    }
  }

  for (let i = 0; i < context().attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const attribute = context().attributes[i];
    await AttributeList.createAttributeWithRequired(attribute, 'On');

  }
});

Then('ui: I verify if the list of attributes are created or not', async () => {
  for (let i = 0; i < context().attributes.length; i++) {
    await browser.pause(SHORT_PAUSE / 5);
    const attribute = context().attributes[i];
  await AttributesCommon.searchForAttribute(attribute.name);
  await expect(await elementParse({ locatorString: Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, parsing: attribute.name })).toBeDisplayed();
  }
})

Then(/^ui: Create an Attribute of type:"(.*)" using model data in "(Project|Resource|Assignment)" tab of Attribute Management with "(.*)" order and validate created order$/, async (attrType: string, tileToBeClicked: string, sortingOrder: string) => {
  //Switch to tab
  switch (tileToBeClicked) {
    case AttributeSection.Project:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Project");
      break;
    case AttributeSection.Resource:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Resource");
      break;
    case AttributeSection.Assignment:
      await elementParseAndClick(Selectors.adminSettings.attributeManagement.specificTab, "Assignment");
      break;
    default: throw Error(`Click ot Tile :{${tileToBeClicked}} is not yet supported.\nPlease add if required\n
    Supported values :\n${Object.values(AttributeSection)}`);
  }

  const attribute = context().attributesSetup;

  for (let attrCnt = 0; attrCnt < attribute.length; attrCnt++) {

    if (attrType === attribute[attrCnt].type) {

      //Enter attribute name
      await slowInputFilling(Selectors.adminSettings.attributeManagement.attributeNameInputbox, attribute[attrCnt].name);
  
      // select attribute type
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.attributeManagement.attributeTypeDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute[attrCnt].type),
      });
  
      //Enter Selection values
      switch (attribute[attrCnt].type) {
        case AttributeTypes.Selection:
        case AttributeTypes.MultiSelection:
        case AttributeTypes.Tags:
          for (let j = 0; j < attribute[attrCnt].selectionValues.length; j++) {
            await clickToElement(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""));
            await browser.pause(SHORT_PAUSE / 5);
            await slowInputFilling(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (j + 1) + ""), attribute[attrCnt].selectionValues[j]);
          }
          break;
      }
  
      //orderBy
      let attrValuesSorted;
      if (sortingOrder === 'ascending')  {
        await clickToElement('//div[text()="Value"]')
        await assert.isTrue(await isElementDisplayed(`//div[text()="Value"]/span[contains(@class, 'arrow-up')]`, ELEMENT_TIMEOUT), `Order by not applied`)
  
        attrValuesSorted = attribute[attrCnt].selectionValues.sort()
      } else if (sortingOrder === 'descending')  {
        await clickToElement('//div[text()="Value"]')
        await browser.pause(SHORT_PAUSE / 5);
        await clickToElement('//div[text()="Value"]')
        await assert.isTrue(await isElementDisplayed(`//div[text()="Value"]/span[contains(@class, 'arrow-down')]`, ELEMENT_TIMEOUT), `Order by not applied`)
  
        attrValuesSorted = attribute[attrCnt].selectionValues.sort().reverse()
      } else {
        attrValuesSorted = attribute[attrCnt].selectionValues
      }
  
      for (const [i, value] of attrValuesSorted.entries()) {
        let sortedVal = await (await element(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (i + 1) + ""))).getValue()
        assert.equal(sortedVal, value, `The value of attribute ${value} is not equal to sorted value ${sortedVal}`);
      }  
  
      //Click on create attribute button
      await clickToElement(Selectors.adminSettings.attributeManagement.createAttributeButton);
      
      //Verify if attribute got created
      await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.adminSettings.attributeManagement.attributeListSection.attributeName, attribute[attrCnt].name), ELEMENT_TIMEOUT),
        `Attribute name: {${attribute[attrCnt].name}} was not created even after ${ELEMENT_TIMEOUT}ms`);
      
      await expect(await elementParse({ locatorString: Selectors.attributeManagement.btnEditAttribute, parsing: attribute[attrCnt].name })).toBeDisplayed();
      await (await elementParse({ locatorString: Selectors.attributeManagement.btnEditAttribute, parsing: attribute[attrCnt].name })).click();

      for (const [i, value] of attrValuesSorted.entries()) {
        let sortedVal = await (await element(locatorParse(Selectors.adminSettings.attributeManagement.selectionValuesInputBoxByIndex, (i + 1) + ""))).getValue()
        assert.equal(sortedVal, value, `The value of attribute ${value} is not equal to sorted value ${sortedVal}`);
      }
    }
  }

});

When(/^ui: I validate the attribute of type:"(.*)" is displaying with "(.*)" order on project list page$/,  async (attrType: string, sortingOrder: string) => {
  await clickToElement('(//revogr-viewport-scroll[@class="rgCol"]//revogr-data[@type="rgRow"]//div[contains(@class,"rgRow")])[1]')

  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element('(//revogr-viewport-scroll[@class="rgCol"]//revogr-data[@type="rgRow"]//div[contains(@class,"rgRow")])[1]')).doubleClick();
  
  const attributes = context().attributesSetup
  const attribute = attributes.find(item => item.type === attrType)
  let attrValuesSorted;

  if (sortingOrder === 'ascending')  {
    attrValuesSorted = attribute.selectionValues.sort()
  }

  else if (sortingOrder === 'descending')  {
    attrValuesSorted = attribute.selectionValues.sort().reverse()
  }

  else {
    attrValuesSorted = attribute.selectionValues
  }

  for (const [i, value] of attrValuesSorted.entries()) {
    let dropdownVal = await (await element(locatorParse(`(//label[contains(@class, 'resource-grid-select-item')])[{{index}}]/div`, (i + 2) + ""))).getText()
    await assert.equal(dropdownVal, value, `The value of attribute ${value} is not equal to option value ${dropdownVal}`);
  }
})

When(/^ui: I validate the attribute of type:"(.*)" is displaying with "(.*)" order on resource list page$/,  async (attrType: string, sortingOrder: string) => {
  await clickToElement('(//revogr-viewport-scroll[@class="rgCol"]//revogr-data[@type="rgRow"]//div[contains(@class,"rgRow")])[1]')

  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element('(//revogr-viewport-scroll[@class="rgCol"]//revogr-data[@type="rgRow"]//div[contains(@class,"rgRow")])[1]')).doubleClick();
  
  const attributes = context().attributesSetup
  const attribute = attributes.find(item => item.type === attrType)
  let attrValuesSorted;

  if (sortingOrder === 'ascending')  {
    attrValuesSorted = attribute.selectionValues.sort()
  }

  else if (sortingOrder === 'descending')  {
    attrValuesSorted = attribute.selectionValues.sort().reverse()
  }

  else {
    attrValuesSorted = attribute.selectionValues
  }

  for (const [i, value] of attrValuesSorted.entries()) {
    let dropdownVal = await (await element(locatorParse(`(//label[contains(@class, 'resource-grid-select-item')])[{{index}}]/div`, (i + 2) + ""))).getText()
    await assert.equal(dropdownVal, value, `The value of attribute ${value} is not equal to option value ${dropdownVal}`);
  }
})

When(/^ui: I select recently created attribute of type:"(.*)" from columns dropdown$/, async (attrType: string) => {
  const attributes = context().attributesSetup
  const attribute = attributes.find(item => item.type === attrType)
  await ProjectGrid.uncheckSelectAllCheckbox();
  await ProjectGrid.searchAndSelectColumns(attribute.name);
})

Then(/^ui: I uncheck and select recently created attribute of type:"(.*)" in insert columns dropdown in BPAFG$/, async (attrType: string) => {
  const attributes = context().attributesSetup
  const attribute = attributes.find(item => item.type === attrType)
  await BPAFG.uncheckSelectAllCheckbox();
  await BPAFG.searchAndSelectAttributesInInsertColumns(attribute.name);
});

When(/^ui: I validate the attribute of type:"(.*)" is displaying with "(.*)" order in BPAFG$/,  async (attrType: string, sortingOrder: string) => {
  await clickToElement('(//div[contains(@class,"ht_master handsontable")]//tbody//td[4])[1]')

  // 1 second timeout is required for selection box to open
  await browser.pause(SHORT_PAUSE);
  await (await element('(//div[contains(@class,"ht_master handsontable")]//tbody//td[4])[1]')).doubleClick();
  
  const attributes = context().attributesSetup
  const attribute = attributes.find(item => item.type === attrType)
  let attrValuesSorted;

  if (sortingOrder === 'ascending')  {
    attrValuesSorted = attribute.selectionValues.sort()
  }

  else if (sortingOrder === 'descending')  {
    attrValuesSorted = attribute.selectionValues.sort().reverse()
  }

  else {
    attrValuesSorted = attribute.selectionValues
  }

  for (const [i, value] of attrValuesSorted.entries()) {
    let dropdownVal = await (await element(locatorParse(`(//span[@class="m-lundefined"])[{{index}}]`, (i + 2) + ""))).getText()
    await assert.equal(dropdownVal, value, `The value of attribute ${value} is not equal to option value ${dropdownVal}`);
  }
})

Then(/^ui: Unselect all and Select specific assignment attribute of type:"(.*)" in SPA$/, async(attrType: string) => {
  const attributes = context().attributesSetup
  const { name } = attributes.find(item => item.type === attrType)
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
  await ProjectGrid.uncheckSelectAllCheckbox();
  const txtSearchFieldInColumnsDropdown = await element(Selectors.projectManagement.txtSearchFieldInColumnsDropdown);
  await clearTextUsingBackspace(txtSearchFieldInColumnsDropdown);
  await txtSearchFieldInColumnsDropdown.setValue(name);
  await browser.pause(SHORT_PAUSE);
  const attributeNameInColumnsDropdownInProjectListPage = await elementParse({ locatorString: Selectors.projectManagement.attributeNameInColumnsDropdownInProjectListPage, parsing: name });
  if (!await attributeNameInColumnsDropdownInProjectListPage.isSelected()) {
    await attributeNameInColumnsDropdownInProjectListPage.click();
  }
  await SingleProjectAllocation.clickOnInsertColumnsDropdown();
});

When(/^ui: I validate the attribute of type:"(.*)" is displaying with "(.*)" order in SPA$/,  async (attrType: string, sortingOrder: string) => {
  const resourceName = context().resourceSetup.name;

  await browser.pause(SHORT_PAUSE);//Required to open dropdown
  await clickToElement(Selectors.projectManagement.sPA.ddGroupByDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown
  await clickToElement(locatorParse(Selectors.projectManagement.sPA.ddGroupByOption, "Resource"));

  await formFill([
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: resourceName, action: 'setValue' },
  ]);
  await browser.pause(SHORT_PAUSE);
  await hitEnter();

  await elementParseAndClick(Selectors.projectManagement.sPA.expandButtonOfResourceOrTask, resourceName);

  await clickToElement('(//div[@class="ht_master handsontable"]//tbody//td)[1]')
  await browser.pause(SHORT_PAUSE);
  await clickToElement('(//div[@class="ht_master handsontable"]//tbody//td/div)[1]');

  // 1 second timeout is required for selection box to open
  await browser.pause(MEDIUM_PAUSE);
  
  const attributes = await context().attributesSetup
  const attribute = await attributes.find(item => item.type === attrType)
  let attrValuesSorted;

  if (sortingOrder === 'ascending')  {
    attrValuesSorted = await attribute.selectionValues.sort()
  }

  else if (sortingOrder === 'descending')  {
    attrValuesSorted = await attribute.selectionValues.sort().reverse()
  }

  else {
    attrValuesSorted = await attribute.selectionValues
  }

  for (const [i, value] of attrValuesSorted.entries()) {
    const dropdownValElement = await element(`(//div[@class="k-animation-container"]//div[contains(@class,"k-list-container k-popup k-group k-reset")]//ul[@class="k-list k-reset"]/li/span)[${i + 2}]`);
    const dropdownVal2 = await dropdownValElement.getText();
    const finalValue = await dropdownVal2.trim().replace(/\s+/g, ' ');
    // await assert.equal(finalValue, value, `The value of attribute ${value} is not equal to option value ${dropdownVal}`);
}
})

Then(/^ui: I "([^"]*)" number "([^"]*)" option from the list of options for the newly created attribute$/, async (optionStatus: string, optionNumber: string) => {
  if(optionNumber=='last') {
    optionNumber = 'last()'; 
  }
  await browser.pause(SHORT_PAUSE * 2);
  const ele = Selectors.adminSettings.attributeManagement.attributeListSection.selectAttributeOptionByIndex + `[${optionNumber}]`;
  const ele2 = Selectors.adminSettings.attributeManagement.attributeListSection.attributeLastOptionValue + `[${optionNumber}]`;
  
  const value = await $(ele).isSelected();
  context().attributeOPtionValue = await $(ele2).getValue();
  if((value == true && optionStatus == 'disable') || (value == false && optionStatus == 'enable')) {
    await clickToElement(ele);
    await browser.pause(SHORT_PAUSE * 2);
  }
})

Then('ui: I search for the newly created attribute and click on edit button', async () => {
  await browser.pause(MEDIUM_PAUSE);
  const attribute = context().attributeSetup;
  await AttributesCommon.searchForAttribute(attribute.name);
  await clickToElement(Selectors.adminSettings.attributeManagement.attributeLayoutSection.attributeEditButton);
  await browser.pause(SHORT_PAUSE);//Needed for input to open
});

Then(/^ui: Verify if the disabled option number "([^"]*)" went to last place and got StrikeThrough$/, async (optionNumber: string) => {
  await browser.pause(SHORT_PAUSE * 2);
  const ele = Selectors.adminSettings.attributeManagement.attributeListSection.attributeLastOptionValue + '[last()]';
  const value = await $(ele).getValue();
  await context().softAssert.equal(value, context().attributeOPtionValue, `The disabled option number {${optionNumber}} checkbox is not yet unchecked`);
})

Then(/^ui: I edit the Default value to option "([^"]*)"$/, async (optionNumber: number) => {
  const attribute = context().attributeSetup
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.attributeManagement.defaultValuedropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.selectionValues[optionNumber]),
  });
});

Then(/^ui: I verify if the default value is updated to option "([^"]*)"$/, async (optionNumber: number) => {
  const attribute = context().attributeSetup
  const ele = await isElementDisplayed(await locatorParse(Selectors.adminSettings.attributeManagement.defaultValueValidation, attribute.selectionValues[optionNumber]));
  context().softAssert.isTrue(ele, `Selection Value: {${attribute.selectionValues[optionNumber]}} is not the default value`);
});

Then(/^ui: I toggle the Required button as "([^"]*)"$/, async (toggleStatus: string) => {
  await browser.pause(SHORT_PAUSE);
  await Attribute.toggleRequiredButtonInCreateAttributeSection(toggleStatus);
  await browser.pause(SHORT_PAUSE);
})

Then(/^ui: I update the recently created attribute value to "([^"]*)"$/, async (inputValue: string) => {
  const attribute = context().attributeSetup
  const ele = await locatorParse('//label[normalize-space(text())="{{attributeName}}"]/parent::div/following-sibling::div//input', attribute.name)
  await slowInputFilling(ele, inputValue);
  context().precisionNumberInputValue = inputValue;
});

Then('ui: I verify if the current value of CF is similar to the updated value', async () => {
  const attribute = context().attributeSetup
  const ele = await locatorParse('//label[normalize-space(text())="{{attributeName}}"]/parent::div/following-sibling::div//input', attribute.name);
  const updatedValue = await $(ele).getValue();
  await context().softAssert.equal(updatedValue, context().precisionNumberInputValue, `Attribute: {${attribute.name}} has incorrect updated value`);
});

Then('ui: I verify if the Progress bar attribute shows slider', async () => {
  const attribute = context().attributeSetup
  const ele = await isElementDisplayed(await locatorParse(Selectors.adminSettings.attributeManagement.validateProgressBarSlider, attribute.name));
  await context().softAssert.isTrue(ele, `Attribute Type: Progress Bar {${attribute.name}} does not show its value in slider form`)
})

Then('ui: I verify Progress bar is default set to slider', async () => {
  const ele = await isElementDisplayed(Selectors.adminSettings.attributeManagement.attributeLayoutSection.validateProgressBarSlider);
  await context().softAssert.isTrue(ele, `Progress Bar default setting is not set to Slider`);
})
