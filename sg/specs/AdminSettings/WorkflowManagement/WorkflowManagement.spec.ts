import { Then } from "@cucumber/cucumber";
import Selectors from '../../../../../core/selectors';
import {
  clickToElement, slowInputFilling, mayBeElement, selectFromDropdown, locatorParse, element, isElementDisplayed,
  elementParseAndClick,
  formFill
} from '../../../../../core/func';
import { context } from "../../../../../utils/context";
import { SHORT_PAUSE } from "../../../../../core/timeouts";
import { Key } from "webdriverio";

Then('ui: I navigate to States tab', async () => {
  await clickToElement(Selectors.workflowManagement.statesTab)
})

Then('ui: I create a State', async () => {
  await slowInputFilling(Selectors.workflowManagement.stateFieldName, context().workflowManagementSetup.stateName)
  await slowInputFilling(Selectors.workflowManagement.stateName,  context().workflowManagementSetup.stateName)
  await clickToElement(Selectors.common.btnCreate)
})

Then('ui: I navigate to Project Forms tab', async () => {
  await clickToElement(Selectors.workflowManagement.projectFormsTab)
})

Then('ui: I create a project form', async () => {
  await clickToElement(Selectors.workflowManagement.createFormInWorkflowManagement)
  await slowInputFilling(Selectors.workflowManagement.formName, context().workflowManagementSetup.formName)
  await clickToElement(Selectors.workflowManagement.formElements)
  await clickToElement(Selectors.workflowManagement.addformElements)
  await elementParseAndClick(Selectors.adminSettings.attributeManagement.attributeLayoutSection.newSectionButton, 'File');
  await clickToElement(Selectors.workflowManagement.saveform)
  await clickToElement(Selectors.common.btnBackButton)
})

Then('ui: I navigate to Workflow tab', async () => {
  await clickToElement(Selectors.workflowManagement.workflowTab)
})

Then('ui: I create a workflow', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.workflowManagement.createWorkflowDropdown,
    dropdownSelection: Selectors.workflowManagement.projectOptionInCreateWorflowButton
  })

  console.log( context().workflowManagementSetup.workflowName )
  await slowInputFilling(Selectors.workflowManagement.workflowName, context().workflowManagementSetup.workflowName);
  await slowInputFilling(Selectors.workflowManagement.workflowDesc, context().workflowManagementSetup.workflowName);
  await clickToElement(Selectors.workflowManagement.workflowAccessDropdown)
  let workflowAccess = 'Default'
  await slowInputFilling(Selectors.workflowManagement.workflowAccessSearch,workflowAccess) //as of now keeping the default value Default
  await clickToElement(Selectors.workflowManagement.workflowAccessSearchOptionSelect)
  await browser.keys(Key.Escape);

  await selectFromDropdown({
    dropdownOpener: Selectors.workflowManagement.stateFieldDropdown,
    dropdownSelection: `//li[(text())="${context().workflowManagementSetup.stateName}"]`,

  });

  const ele = await mayBeElement(locatorParse(Selectors.common.confirmationModalButton, "Yes"));

  if (ele) await ele.click();

  await clickToElement(Selectors.workflowManagement.stateFieldDropdown);
  await clickToElement(Selectors.workflowManagement.createWorkflow);
  await clickToElement(Selectors.common.btnSave);
  await clickToElement(Selectors.common.btnBackButton);
  await clickToElement(Selectors.common.btnBackButton);
  await clickToElement(Selectors.common.btnBackButton);
})

Then('ui: I create a workflow project', async () => {
  await clickToElement(Selectors.projectManagement.btnCreateProject);
  await clickToElement(`//span[contains(@class,'dropdown-btn') and normalize-space( text())='${ context().workflowManagementSetup.workflowName}']`);
  await slowInputFilling(Selectors.projectManagement.wflowProjectname, context().workflowManagementSetup.workflowName);
  await clickToElement(Selectors.common.btnSave);
})

Then(/^ui: Click on "(Workflows|States|Project Forms)" tab in Workflow Management$/, async (tabToBeClicked: string) => {
  switch (tabToBeClicked.trim().toLowerCase()) {
    case 'workflows':
      await clickToElement(Selectors.workflowManagement.workflowTab);
      break;
    case 'states':
      await clickToElement(Selectors.workflowManagement.statesTab);
      break;
    case 'project forms':
      await clickToElement(Selectors.workflowManagement.projectFormsTab);
      break;
    default: throw Error(`Click ot tab :{${tabToBeClicked}} of Workflow Managment is not yet supported.\nPlease add if required\n
      Supported values (Case sensitive):\n1.Workflows\n2.States\n3.Project forms`);
  }
});

Then('ui: Click on Create Workflow button and select Project option in Workflows tab of Workflow Management', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.workflowManagement.createWorkflowDropdown,
    dropdownSelection: Selectors.workflowManagement.projectOptionInCreateWorflowButton
  });
});

Then('ui: Enter Workflow name in Create Workflow page of Workflow Management', async () => {
  const { name } = context().projectWorkflowSetup;
  await slowInputFilling(Selectors.workflowManagement.workflowName, name);
});

Then('ui: Enter Workflow description in Create Workflow page of Workflow Management', async () => {
  const { description } = context().projectWorkflowSetup;
  await slowInputFilling(Selectors.workflowManagement.workflowDesc, description);
});

Then('ui: Click on workflow access to users dropdown and select All in Create Workflow page of Workflow Management', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.workflowManagement.workflowAccessDropdown,
    dropdownSelection: Selectors.common.selectAllCheckBoxInDropdown
  });
  await clickToElement(Selectors.workflowManagement.workflowAccessDropdown);
});

Then('ui: Select recently created State in Create Workflow page of Workflow Management', async () => {
  const { name } = context().projectWorkflowSetup.state;
  await selectFromDropdown({
    dropdownOpener: Selectors.workflowManagement.stateFieldDropdown,
    dropdownSelection: `//li[(text())="${name}"]`,
  });

  if (await isElementDisplayed(locatorParse(Selectors.common.confirmationModalButton, "Yes"), SHORT_PAUSE * 2)) {
    await clickToElement(locatorParse(Selectors.common.confirmationModalButton, "Yes"));
  }
});

Then('ui: Select recently created form for all states in Create Workflow page of Workflow Management', async () => {
  const workflow = context().projectWorkflowSetup;
  const fieldNames = Object.keys(workflow.state.stateFields);

  for (let i = 0; i < fieldNames.length; i++) {
    const fieldName = fieldNames[i];
    await selectFromDropdown({
      dropdownOpener: locatorParse(Selectors.workflowManagement.formNameDropdownOfSpecificState, fieldName),
      dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, workflow.projectForm.name),
    });
  }
});

Then('ui: Click Create button in Create Workflow page of Workflow Management', async () => {
  await clickToElement(Selectors.workflowManagement.createWorkflow);
});

Then('ui: Wait for Save button in Create or edit Workflow page of Workflow Management to be clickable', async () => {
  const saveButton = await element(Selectors.common.btnSave);
  await saveButton.waitForClickable();
});

Then('ui: Click on workflow access to users dropdown in Create Workflow page of Workflow Management', async () => {
  await clickToElement(Selectors.workflowManagement.workflowAccessDropdown);
  await browser.pause(SHORT_PAUSE);
});

Then('I navigate to Project WorkFlow User tab', async () => {
  await clickToElement(Selectors.workflowManagement.workflowUserTab)
});

Then('ui: I validate that all of the users are imported in the Workflow', async () => {
  const users = ["John Schully", "Megan Keller", "Mike Scott", "Shelly Smith"];

  for (const user of users) {
    const resource = await isElementDisplayed(`//span[text()="${user}"]/parent::div`);
    await context().softAssert.isTrue(resource, `Resource: {${user}} is not displayed on the Project Workflow User`);
  }
})

Then('ui: I select one of the resource to edit', async () => {
  await clickToElement(Selectors.workflowManagement.projectWorkflowUser.validateImportedUser)
})

Then(/^ui: I toggle "(On|Off)" the "([^"]*)" button$/, async (toggleStatus: string, toggleName: string) => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.workflowManagement.projectWorkflowUser.validateToggleButton, toggleName))
  if ((toggleStatus == 'On' && ele == false) || (toggleStatus == 'Off' && ele == true)) {
    await elementParseAndClick(Selectors.workflowManagement.projectWorkflowUser.toggleButton, toggleName);
  }
});

Then('ui: I add Username and Password to the Resource', async () => {
  context().resourceSetup.username = 'johnSchully';
  await formFill([
    { locator: Selectors.workflowManagement.workFlowUser.inputUsername, value: context().resourceSetup.username, action: 'setValue' },
    { locator: Selectors.workflowManagement.workFlowUser.inputUserPassword, value: context().resourceSetup.password, action: 'setValue' },
    { locator: Selectors.workflowManagement.workFlowUser.inputUserConformPassword, value: context().resourceSetup.password, action: 'setValue' },
  ]);

  await clickToElement(Selectors.workflowManagement.projectWorkflowUser.updateButton);
})