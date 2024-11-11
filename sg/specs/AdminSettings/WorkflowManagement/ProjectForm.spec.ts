import { Then } from "@cucumber/cucumber"
import { context } from "../../../../../utils/context";
import { clickToElement, element, isElementSelected, locatorParse, slowInputFilling } from "../../../../../core/func";
import { ELEMENT_TIMEOUT, SHORT_PAUSE } from "../../../../../core/timeouts";
import Selectors from '../../../../../core/selectors';

Then('ui: Search and select recently created project cfs in Project Form', async () => {
  const attributes = context().projectAttributes.map((item) => item.name);
  for (let i = 0; i < attributes.length; i++) {
    await slowInputFilling(Selectors.workflowManagement.searchFieldInputBox, attributes[i]);
    await browser.pause(SHORT_PAUSE / 2);
    const fieldNameInputBox = await element(locatorParse(Selectors.workflowManagement.fieldNameInputBox, attributes[i]));
    if (!(await isElementSelected(fieldNameInputBox))) {
      await fieldNameInputBox.click();
    }
  }
});

Then('ui: Click on Create Form button in Project Forms tab of Workflow Management', async () => {
  await clickToElement(Selectors.workflowManagement.createFormInWorkflowManagement);
});

Then('ui: Click on Create Form button in Project Form creation page', async () => {
  await clickToElement(Selectors.workflowManagement.createFormInCreationPage);
});

Then('ui: Enter form name in Project Form creation page', async () => {
  const { name } = context().projectWorkflowSetup.projectForm;
  await slowInputFilling(Selectors.workflowManagement.formName, name);
});

Then('ui: Click on Add selected button in Project Form', async () => {
  await clickToElement(Selectors.workflowManagement.addformElements);
});

Then('ui: Wait for Save form button to be clickable in Project Form', async () => {
  const saveFormButton = await element(Selectors.workflowManagement.saveFormButton);
  await saveFormButton.waitForClickable({ timeout: ELEMENT_TIMEOUT });
});

