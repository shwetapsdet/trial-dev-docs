import { Then } from '@cucumber/cucumber';
import { projectTemplate } from '../../../../../models/ProjectTemplate.model';
import { context } from '../../../../../utils/context';
import { AttributeTypes } from '../../../../../core/enums';
import { clickToElement, doubleClickToElement, element, elementParse, elementParseAndClick, formFill, hitEnter, isElementDisplayed, locatorParse, mayBeElement, slowInputFilling } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { ProjectAttributes } from '../../../../../helpers/ProjectManagement/ProjectEdit/Attributes.helper';
import { Common } from '../../../../../helpers/ProjectManagement/ProjectEdit/Common.helper';
import { ResourceGrid } from '../../../../../helpers/ResourceManagement/ResourceManagementGrid.helper';
import { assert } from 'chai';
import { Key } from 'webdriverio';

Then('ui: Verify if Create Template button is clickable in Project Attributes', async () => {
  await expect(await element(Selectors.projectManagement.projectEdit.createTemplateButton)).toBeClickable();
});

Then('ui: Click on Create Template button in Project Attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.createTemplateButton);
  await browser.pause(SHORT_PAUSE);//Needed for modal to open up
});

Then('ui: Enter template name in template creation modal', async () => {
  context().projectTemplate = projectTemplate();
  const { name } = context().projectTemplate;
  await slowInputFilling(Selectors.projectManagement.projectEdit.templateNameInputBoxInCreationModal, name);
});

Then('ui: Click on Create button of template creation modal in Project Attributes and wait for save button to be clickable', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.createButtonInTemplateCreationModal);
  await (await element(Selectors.projectManagement.common.saveButton)).waitForClickable();
});

Then(/^ui: Change value of CF "([^"]*)" of type "([^"]*)" to "([^"]*)" in Project Attributes$/, async (customFieldName: string, customFieldType: string, valueToBeUpdated: string) => {
  await ProjectAttributes.changeAttributeValueInAttributesSection(customFieldName, customFieldType, valueToBeUpdated);
});

Then(/^ui: Verify if CF "([^"]*)" of type "([^"]*)" has value "([^"]*)" in Project Attributes$/, async (customFieldName: string, customFieldType: string, valueToBeVerified: string) => {
  await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
  switch (customFieldType.trim()) {
    case AttributeTypes.Selection:
      await expect(await elementParse({ locatorString: Selectors.projectManagement.projectEdit.selectionAttributeValue, parsing: customFieldName })).toHaveText(valueToBeVerified);
      break;
    default: throw Error(`Attribute type:{${customFieldType.trim()}} not yet supported here. Please add if required.\nSupported values (Case sensitive):\n1.${AttributeTypes.Selection}`);
  }
});

Then('ui: Verify if Create Template button is not displayed in Project Attributes', async () => {
  await expect(await mayBeElement(Selectors.projectManagement.projectEdit.createTemplateButton)).toBeFalsy();
});

Then('ui: Verify if Import from Template button is not displayed in Project Attributes', async () => {
  await expect(await mayBeElement(Selectors.projectManagement.projectEdit.importFromTemplateButton)).toBeFalsy()
});

Then('ui: Enter another template name in template creation modal', async () => {
  context().projectTemplate2 = projectTemplate();
  const { name } = context().projectTemplate2;
  await slowInputFilling(Selectors.projectManagement.projectEdit.templateNameInputBoxInCreationModal, name)
});

Then('ui: Assign resource manager as Project Owner', async () => {
  const {
    resourceManager,
  } = context().resourceSetup;
  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Project Owner")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  };
  await elementParseAndClick(Selectors.projectManagement.projectEdit.selectionAttributeDropdown, "Project Owner");
  await browser.pause(SHORT_PAUSE);
  await slowInputFilling(Selectors.common.dropdownSearchInputBox, resourceManager);
  await browser.pause(SHORT_PAUSE);
  await (await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: resourceManager })).click();
});

Then(/^ui: Change the value of recently created CF to:"([^"]*)" in Project Attributes and save$/, async (valueToBeUpdated: any) => {
  await ProjectAttributes.changeAttributeValueInAttributesSection(context().attributeSetup.name, context().attributeSetup.type, valueToBeUpdated);
  await Common.clickOnSaveButtonAndWaitForItToBeClickable();
});

Then('ui: I click on clone button in project attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.cloneButton);
});

Then('ui: I click on open on clone toggle in clone project name container in PM', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.openOnCloneToggle);
});

Then(/^ui: I click on meat ball icon by index "([^"]*)" and select specific option "([^"]*)" in project attributes$/, async (index: string, option: string) => {
  await ResourceGrid.clickOnMeatballsIconByIndexAndSelectSpecificOption(index, option);
});

Then('ui: I click on save button in edit form container in project attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.btnSaveInEditFormContainer);
});

Then(/^ui: I enter cloned project name "([^"]*)" in edit form container in project attributes$/, async (cloneProjectName: string) => {
  await slowInputFilling(Selectors.projectManagement.projectEdit.txtClonedProjectName, cloneProjectName + ": " + context().projectSetup.name);
});

Then('ui: I click on open on create toggle in create project template modal', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.openOnCreateToggle);
});

Then('ui: Click on Create button of template creation modal in Project Attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.createButtonInTemplateCreationModal);
});

Then('ui: Verify Rich text in Project edit for recently created Cfs', async () => {
  const attributes = [];
  attributes.push(context().projectAttributes);
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i][0];
    const richtextElement = await element(locatorParse(Selectors.projectManagement.projectEdit.richTextValueOfSpecificAttribute, attribute.name));
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of project CF:{${attribute.name}} for project:{${context().projectSetup.name}} in Project Attributes was incorrect`, true);
  }
});

Then('ui: Verify if Create button in Template Creation modal is not displayed', async () => {
  assert.isFalse(await isElementDisplayed(Selectors.projectManagement.projectEdit.createButtonInTemplateCreationModal, 0));
});

Then(/^ui: I validate that the "([^"]*)" section is present on the attribute page$/,async (sectionName: string) => {
  let ele;
  switch (sectionName) {
    case 'File':
      ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.projectEdit.fileSection, sectionName))
      break;
    case 'Section-3':
      ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.projectEdit.sectionThree, sectionName))
      break;
    default:
      break;
  }
  await context().softAssert.isTrue(ele, `Section: {${sectionName}} is not displayed in the attribute page`);
})

Then('ui: Click on Workflow button in Project Attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.createWorkflowButton);
  await browser.pause(SHORT_PAUSE);//Needed for modal to open up
});

Then('ui: Enter workflow name in workflow modal in Project Attribute', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.openWorkflowDropdown);
  await slowInputFilling(Selectors.projectManagement.projectEdit.inputWorkflowName, context().workflowManagementSetup.workflowName);
});

Then('ui: Click on Apply button of workflow modal in Project Attributes and wait for save button to be clickable', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.applyWorkflowButton);
  await clickToElement(Selectors.projectManagement.projectEdit.processConformationButton);
  await (await elementParse({locatorString: Selectors.projectManagement.projectEdit.validateNavigationOption, parsing: 'Workflow'})).waitForClickable();
});
Then('ui: Click on Save Button in Project Attributes', async () => {
  await Common.clickOnSaveButtonAndWaitForItToBeClickable();
});

Then(/^ui: I expand "([^"]*)" section in Project Attribute$/,async (sectionName: string) => {
  if (!(await isElementDisplayed(await locatorParse(Selectors.projectManagement.projectEdit.expandedFieldValidation, sectionName)))) {
    await elementParseAndClick(Selectors.projectManagement.projectEdit.expandSection, sectionName);
  }
});

Then(/^ui: I validate that "([^"]*)" attribute is "([^"]*)"$/,async (attributeName: string, optionName: string) => {
  let ele, ele1, ele2;
  await browser.refresh();
  await browser.pause(MEDIUM_PAUSE);
  switch (optionName) {
    case "Enabled":
      await $(await locatorParse(Selectors.projectManagement.projectEdit.navigateToAttribute, attributeName)).scrollIntoView();
      await elementParseAndClick(Selectors.projectManagement.projectEdit.selectAttributeByValue, attributeName);
      if (await isElementDisplayed(Selectors.projectManagement.projectEdit.searchBox)) {
        await slowInputFilling(Selectors.projectManagement.projectEdit.searchBox , context().resourceSetup.name);
      }
      await hitEnter();
      await browser.pause(SHORT_PAUSE);
      await browser.keys(Key.Escape);
      ele2 = Selectors.projectManagement.projectEdit.selectAttributeByOptionName
      .replace('{{attributeName}}', attributeName)
      .replace('{{optionName}}', context().resourceSetup.name);
      await $(await locatorParse(Selectors.projectManagement.projectEdit.navigateToAttribute, attributeName)).scrollIntoView();
      ele = await isElementDisplayed(ele2);
      break;
    case "Read Only":
      await $(await locatorParse(Selectors.projectManagement.projectEdit.navigateToAttribute, attributeName)).scrollIntoView();
      ele1 = Selectors.projectManagement.projectEdit.selectAttributeByOptionName
      .replace('{{attributeName}}', attributeName)
      .replace('{{optionName}}', context().resourceSetup.name);
      await $(await locatorParse(Selectors.projectManagement.projectEdit.navigateToAttribute, attributeName)).scrollIntoView();
      ele = (await isElementDisplayed(ele1));
      break;
    case "Hidden":
      ele1 = await locatorParse(Selectors.projectManagement.projectEdit.validateAttributeByValue, attributeName);
      ele = !(await isElementDisplayed(ele1));
      break;
    default:
      break;
    }
    await context().softAssert.isTrue(ele, `Attribute: {${attributeName}} option {${optionName}} is not correctly implemented`);

})

Then(/^ui: I validate that "([^"]*)" attribute is "([^"]*)" for Resource Attribute$/,async (attributeName: string, optionName: string) => {
  let ele, ele1, ele2;
  await browser.refresh();
  if (!(await isElementDisplayed(await locatorParse(Selectors.projectManagement.projectEdit.expandedFieldValidation, 'Required Fields')))) {
    await elementParseAndClick(Selectors.projectManagement.projectEdit.expandSection, 'Required Fields');
  }
  switch (optionName) {
    case "Enabled":
      await elementParseAndClick(Selectors.projectManagement.projectEdit.selectAttributeByValue, attributeName);
      if (await isElementDisplayed(Selectors.projectManagement.projectEdit.searchAttribute)) {
        await slowInputFilling(Selectors.projectManagement.projectEdit.searchAttribute, "qa-automation-01");
      }
      await hitEnter();
      await browser.pause(SHORT_PAUSE);
      await browser.keys(Key.Escape);
      ele2 = Selectors.projectManagement.projectEdit.selectAttributeByOptionName
      .replace('{{attributeName}}', attributeName)
      .replace('{{optionName}}', 'qa-automation-01');
      await $(ele2).scrollIntoView();
      ele = await isElementDisplayed(ele2);
      break;
    case "Read Only":
      ele2 = Selectors.projectManagement.projectEdit.selectAttributeByOptionName
      .replace('{{attributeName}}', attributeName)
      .replace('{{optionName}}', context().resourceSetup.name);
      ele = !(await isElementDisplayed(ele2));
      break;
    case "Hidden":
      ele1 = await locatorParse(Selectors.projectManagement.projectEdit.validateAttributeByValue, attributeName);
      ele = await isElementDisplayed(ele1);
      break;
    default:
      break;
    }
    await context().softAssert.isTrue(ele, `Attribute: {${attributeName}} option {${optionName}} is not correctly implemented`);

});

Then('ui: I verify that Attributes values are hidden',async() => {
  await browser.pause(3000)
  await expect(mayBeElement(Selectors.projectManagement.projectEdit.requiredFieldExpand))
  await expect(mayBeElement(Selectors.projectManagement.projectEdit.optionalFieldExpand))
});

Then(/^ui: I collapse "([^"]*)" section in Project Attributes if expanded$/,async(section:string) => {
  if(await isElementDisplayed(await elementParse({locatorString:Selectors.projectManagement.projectEdit.caretDown,parsing:section})))
  {
    await elementParseAndClick(Selectors.projectManagement.projectEdit.caretDown,section)    }
});

Then(/^ui: I validate that the newly created attribute has option "([^"]*)" as "([^"]*)"$/, async (optionNumber: number, optionStatus: string) => {
  const attribute = context().attributeSetup;
  let attributeNameLocator;
  await browser.pause(SHORT_PAUSE * 2);
  if(attribute.type == 'Multi-Selection') {
    attributeNameLocator = await locatorParse(Selectors.projectManagement.projectEdit.selectAttributeMultiSelByName, attribute.name);
  } else {
    attributeNameLocator = await locatorParse(Selectors.projectManagement.projectEdit.selectAttributeByName, attribute.name);
  }
  await clickToElement(attributeNameLocator);
  
  const optionNameLocator = await locatorParse(Selectors.projectManagement.projectEdit.validateAttributeOption, attribute.selectionValues[optionNumber - 1]);
  const ele = await isElementDisplayed(optionNameLocator);
  
  await browser.pause(SHORT_PAUSE * 2);
  const optionStatusLowerCase = optionStatus.toLowerCase();
  const assertionMessage = optionStatusLowerCase === 'disabled' 
      ? `Option Number "${optionNumber}" which contains value "${attribute.selectionValues[optionNumber - 1]}" is not yet disabled`
      : `Option Number "${optionNumber}" which contains value "${attribute.selectionValues[optionNumber - 1]}" is not enabled`;
  
  await context().softAssert[optionStatusLowerCase === 'disabled' ? 'isFalse' : 'isTrue'](ele, assertionMessage);
});


Then(/^ui: I validate that the newly created attribute has option "([^"]*)" as "([^"]*)" on SPA$/, async (optionNumber: number, optionStatus: string) => {
  const attribute = context().attributeSetup;  
  const optionNameLocator = await locatorParse(Selectors.projectManagement.projectEdit.validateAttributeOption, attribute.selectionValues[optionNumber - 1]);
  const ele = await isElementDisplayed(optionNameLocator);
  
  await browser.pause(SHORT_PAUSE * 2);
  const optionStatusLowerCase = optionStatus.toLowerCase();
  const assertionMessage = optionStatusLowerCase === 'disabled' 
      ? `Option Number "${optionNumber}" which contains value "${attribute.selectionValues[optionNumber - 1]}" is not yet disabled`
      : `Option Number "${optionNumber}" which contains value "${attribute.selectionValues[optionNumber - 1]}" is not enabled`;
  
  await context().softAssert[optionStatusLowerCase === 'disabled' ? 'isFalse' : 'isTrue'](ele, assertionMessage);
})

Then(/^ui: I validate that the newly created attribute has option "([^"]*)" as "([^"]*)" on RM grid$/, async (optionNumber: number, optionStatus: string) => {
  const attribute = context().attributeSetup;
  const cellLocator = Selectors.projectManagement.grid.cFValuesCellByRowAndColumnIndex
  .replace('{{columnIndex}}', '0')
  .replace('{{rowIndex}}', '1');
  await doubleClickToElement(cellLocator);
  await browser.pause(SHORT_PAUSE * 2);//Needed for inputbox to open
  
  const optionNameLocator = await locatorParse(Selectors.resourceManagement.grid.validateOptionForAttribute, attribute.selectionValues[optionNumber - 1]);
  const ele = await isElementDisplayed(optionNameLocator);
  
  await browser.pause(SHORT_PAUSE * 2);
  const optionStatusLowerCase = optionStatus.toLowerCase();
  const assertionMessage = optionStatusLowerCase === 'disabled' 
      ? `Option Number "${optionNumber}" which contains value "${attribute.selectionValues[optionNumber - 1]}" is not yet disabled on RM grid`
      : `Option Number "${optionNumber}" which contains value "${attribute.selectionValues[optionNumber - 1]}" is not enabled on RM grid`;
  
  await context().softAssert[optionStatusLowerCase === 'disabled' ? 'isFalse' : 'isTrue'](ele, assertionMessage);

  await clickToElement(Selectors.resourceManagement.grid.cancelButton);
  await browser.pause(SHORT_PAUSE);
  
});