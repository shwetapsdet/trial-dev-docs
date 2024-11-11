import { Given, Then } from '@cucumber/cucumber';
import { clickToElement, element, formFill, isElementDisplayed, locatorParse } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { context } from '../../../../../utils/context';
import { ResourceAttributesAndIdentity } from '../../../../../helpers/ResourceManagement/ResourceEdit/Attributes.helper';
import { AttributeTypes } from '../../../../../core/enums';
import { MEDIUM_PAUSE } from '../../../../../core/timeouts';

Given(/^ui: Expand on User Identity section and enter username as "([^"]*)", password as "([^"]*)" and confirm password as "([^"]*)"$/, async (username: string,
  password: string, confirmPassword: string) => {
  if (!(await isElementDisplayed(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtEmail))) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.title);
  }

  const formStyle = await (await element(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.credentialsForm)).getAttribute("style");
  if (formStyle != null) {
    await clickToElement(Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.toggleCustomLogin);
  }

  await formFill([
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtUserID, value: username, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtPassword, value: password, action: 'setValue' },
    { locator: Selectors.resourceManagement.resourceEdit.sections.userIdenitiy.txtConfirmPassword, value: confirmPassword, action: 'setValue' },
    { locator: Selectors.common.btnSave, value: null, action: 'click' },
  ]);

  await expect(await element(Selectors.common.btnSave)).toBeClickable();
});

Then(/^ui: Click on "(Resource Attributes and Identity|Capacity tab)"$/, async (toggleType) => {
  switch (toggleType) {
    case 'Resource Attributes and Identity':
    await clickToElement(Selectors.resourceManagement.resourceEdit.resAttrAndIdentityTab);   
      break;
    case 'Capacity tab':
      await clickToElement(Selectors.resourceManagement.resourceEdit.capacityTab);
      break;
    default:
      break;
  }
});

Then('ui: I click on clone button in resource attributes', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.cloneButton);
});

Then('ui: Verify Rich text in Resource edit for recently created Cfs', async () => {
  const attributes = context().resourceAttributes;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const richtextElement = await element(locatorParse(Selectors.projectManagement.projectEdit.richTextValueOfSpecificAttribute, attribute.name));
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of Resource CF:{${attribute.name}} for resource:{${context().resourceSetup.name}} in Resource Attributes & Identity was incorrect`, true);
  }
});

Then('ui: Update resource manager in resource edit page', async () => {
  const {
    resourceManager,
  } = context().resourceSetup;
  if(!(await isElementDisplayed(locatorParse(Selectors.resourceManagement.resourceEdit.attributeNameLabel, "Resource Managers")))) {
    await clickToElement(Selectors.projectManagement.projectEdit.optionalFieldExpand);
    await browser.pause(MEDIUM_PAUSE/2)
  };
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection("Resource Managers", AttributeTypes.MultiSelection, resourceManager);

});

Then('ui: Select first CF value for recently created selection CF in Resource Attributes and Identity section', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
  const attribute = context().attributeSetup;
  await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection(
    attribute.name, AttributeTypes.Selection, attribute.selectionValues[0]
  );
});

Then('ui: Select first CF value for recently created selection CFs in Resource Attributes and Identity section', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
  for (let i = 0; i < context().attributesSetup.length; i++) {
    const attribute = context().attributesSetup[i];
    await ResourceAttributesAndIdentity.changeAttributeValueInAttributesSection(attribute.name, AttributeTypes.Selection, attribute.selectionValues[0]);
  }
});