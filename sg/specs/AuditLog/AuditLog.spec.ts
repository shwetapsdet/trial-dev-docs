import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import { clickToElement, element, elementParseAndClick, isElementDisplayed, locatorParse, selectFromDropdown, slowInputFilling } from '../../../../core/func';
import { context } from '../../../../utils/context';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../core/timeouts';
import { ProjectGrid } from '../../../../helpers/ProjectManagement/Grid.helper';


Then('ui: Filter by recently created CFs and verify logs have Rich Text in Audit Log page', async () => {
  let attributes = [];

  if (context().projectAttributes !== undefined) {
    attributes = context().projectAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      const extractedStringWithSpaces = context().attributeDefaultValue[i].join(' ');
      
      await selectFromDropdown({
        dropdownOpener: Selectors.auditlog.firstChooseEntityDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Custom Field"),
      });

      await selectFromDropdown({
        dropdownOpener: locatorParse(Selectors.auditlog.entityListDropdownOfSpecificEntityType, "Custom Field"),
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.name),
      });

      await selectFromDropdown({
        dropdownOpener: locatorParse(Selectors.auditlog.actionDropdownOfSpecificEntityType, "Custom Field"),
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Created"),
      });

      await clickToElement(locatorParse(Selectors.auditlog.expandIconOfAuditLogByAuditLogText, `custom field ${attribute.name} and 2 custom field permission rules`));
      await browser.pause(SHORT_PAUSE / 2);
      await clickToElement(locatorParse(Selectors.auditlog.expandIconOfAuditLogByAuditLogText, `custom field ${attribute.name}`));
      await browser.pause(SHORT_PAUSE / 2);

      const cellLocator = (Selectors.auditlog.specificLogDetailAfterExpanding)
        .replace('{{logDetailText}}', "Default Value");
      
      const actualHTMLElements = await $(cellLocator).getText();
      await context().softAssert.equal(actualHTMLElements, `Default Value: ${extractedStringWithSpaces}`, `Rich text of project CF:{${attribute.name}} in Audit Log was incorrect`);

      await clickToElement(locatorParse(Selectors.auditlog.deleteIconOfSpecificEntity, "Custom Field"))
      await browser.pause(SHORT_PAUSE / 2);
    }

  }

  attributes = [];

  if (context().resourceAttributes !== undefined) {
    attributes = context().resourceAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      const extractedStringWithSpaces = context().attributeDefaultValue[i].join(' ');

      await selectFromDropdown({
        dropdownOpener: Selectors.auditlog.firstChooseEntityDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Custom Field"),
      });

      await selectFromDropdown({
        dropdownOpener: locatorParse(Selectors.auditlog.entityListDropdownOfSpecificEntityType, "Custom Field"),
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.name),
      });

      await selectFromDropdown({
        dropdownOpener: locatorParse(Selectors.auditlog.actionDropdownOfSpecificEntityType, "Custom Field"),
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Created"),
      });

      await clickToElement(locatorParse(Selectors.auditlog.expandIconOfAuditLogByAuditLogText, `custom field ${attribute.name} and 2 custom field permission rules`));
      await browser.pause(SHORT_PAUSE / 2);
      await clickToElement(locatorParse(Selectors.auditlog.expandIconOfAuditLogByAuditLogText, `custom field ${attribute.name}`));
      await browser.pause(SHORT_PAUSE / 2);

      const cellLocator = (Selectors.auditlog.specificLogDetailAfterExpanding)
        .replace('{{logDetailText}}', "Default Value");
      
      const actualHTMLElements = await $(cellLocator).getText();
      await context().softAssert.equal(actualHTMLElements, `Default Value: ${extractedStringWithSpaces}`, `Rich text of resource CF:{${attribute.name}} in Audit Log was incorrect`);
      await clickToElement(locatorParse(Selectors.auditlog.deleteIconOfSpecificEntity, "Custom Field"))
      await browser.pause(SHORT_PAUSE / 2);
    }
  }

  attributes = [];

  if (context().assignmentAttributes !== undefined) {
    attributes = context().assignmentAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      const extractedStringWithSpaces = context().attributeDefaultValue[i].join(' ');

      await selectFromDropdown({
        dropdownOpener: Selectors.auditlog.firstChooseEntityDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Custom Field"),
      });

      await selectFromDropdown({
        dropdownOpener: locatorParse(Selectors.auditlog.entityListDropdownOfSpecificEntityType, "Custom Field"),
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, attribute.name),
      });

      await selectFromDropdown({
        dropdownOpener: locatorParse(Selectors.auditlog.actionDropdownOfSpecificEntityType, "Custom Field"),
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, "Created"),
      });

      await clickToElement(locatorParse(Selectors.auditlog.expandIconOfAuditLogByAuditLogText, `custom field ${attribute.name}`));
      await browser.pause(SHORT_PAUSE / 2);

      const cellLocator = (Selectors.auditlog.specificLogDetailAfterExpanding)
        .replace('{{logDetailText}}', "Default Value");
      
      const actualHTMLElements = await $(cellLocator).getText();
      await context().softAssert.equal(actualHTMLElements, `Default Value: ${extractedStringWithSpaces}`, `Rich text of assignment CF:{${attribute.name}} in Audit Log was incorrect`);
      await clickToElement(locatorParse(Selectors.auditlog.deleteIconOfSpecificEntity, "Custom Field"))
      await browser.pause(SHORT_PAUSE / 2);
    }
  }
});

Then(/^ui: I select "([^"]*)" filter from the Choose Entity dropdown$/, async (filterName: string) => {
  context().filterName = filterName;
  await selectFromDropdown({
    dropdownOpener: Selectors.auditlog.firstChooseEntityDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, filterName),
  });
});

Then(/^ui: I validate that the attribute field contain option "([^"]*)" is "(not displayed|displayed)"$/, async (optionValue: string, optionStatus: string) => {
  let ele;
  await elementParseAndClick(Selectors.auditlog.entityListDropdown, context().filterName);
  switch (optionStatus) {
    case 'not displayed':
      ele = await isElementDisplayed(locatorParse(Selectors.auditlog.entityListOptionValidation, optionValue));
      await context().softAssert.isFalse(ele, `The Option value "${optionValue}" is displayed in the option list`);
      break;
    case 'displayed':
      ele = await isElementDisplayed(locatorParse(Selectors.auditlog.entityListOptionValidation, optionValue));
      await context().softAssert.isTrue(ele, `The Option value "${optionValue}" is not displayed in the option list`);
      break;
    default: throw new Error(`The option ${optionValue} is not present in the given option list`);
  }
  await elementParseAndClick(Selectors.auditlog.entityListDropdown, context().filterName);
});

Then('ui: Clear filter if any in Audit log', async () => {
  await browser.refresh();
  await browser.pause(MEDIUM_PAUSE);
  await ProjectGrid.clearFiltersIfAny();
});

Then(/^ui: I filter by recently created project with method as "([^"]*)"$/, async (methodName: string) => {
  const { name } = context().projectSetup;
  await clickToElement(Selectors.auditlog.filterByProjectButton)
  await elementParseAndClick(Selectors.auditlog.inputProjectName, name);

  if(methodName!="Null") {
    await clickToElement(Selectors.auditlog.filterByMethod);
    await elementParseAndClick(Selectors.auditlog.inputMethodName, methodName);
  }
})

Then('ui: I select the updated project from audit log', async () => {
  await clickToElement(Selectors.auditlog.selectUpdatedAllocationField);
})

Then(/^ui: I validate allocation value as "([^"]*)" for date mode as "(Days|Months|Weeks|None)" for method as "(Updated|Deleted)"$/, async (expectedValue: string, dateMode: string, methodMode: string) => {
  let ele;
  switch (methodMode) {
    case "Updated":
      ele = await $(Selectors.auditlog.validateAfterAllocationValue).getText();
      break;
    default:
      break;
  }
  await context().softAssert.equal(ele, expectedValue, `Method: Allocation value for {${methodMode}} project in date mode as {${dateMode}} is not as expected`);
})

Then(/^ui: I select date mode as "(Days|Months|Weeks)" in audit log$/, async (dateMode: string) => {
  await elementParseAndClick(Selectors.auditlog.selectDateMode, dateMode);
})

Then(/^ui: I validate that log has been added for working weekend toggle as "(On|Off)"$/, async (toggleButton: string) => {
  const ele = await isElementDisplayed(await locatorParse('', toggleButton));
  await context().softAssert.isTrue(ele, `Working Weekend toggle button is {${toggleButton}}, still no such log added into the Audit log`)
})