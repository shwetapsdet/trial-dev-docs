import { Then } from "@cucumber/cucumber";
import { clickToElement, element, locatorParse, slowInputFilling } from "../../../../../core/func";
import { context } from "../../../../../utils/context";
import Selectors from '../../../../../core/selectors';

Then(/^ui: Click on State type as:"(Project|Assignment)" in States tab of Workflow Management$/, async (stateType: string) => {
  await clickToElement(locatorParse(Selectors.workflowManagement.stateType, stateType));
});

Then('ui: Enter new State Field name in States tab of Workflow Management', async () => {
  const { name } = context().projectWorkflowSetup.state;
  await slowInputFilling(Selectors.workflowManagement.stateFieldName, name);
});

Then('ui: Enter new State names in States tab of Workflow Management', async () => {
  const fieldNames = Object.keys(context().projectWorkflowSetup.state.stateFields);
  for (let i = 0; i < fieldNames.length; i++) {
    const fieldName = fieldNames[i];
    await slowInputFilling(Selectors.workflowManagement.lastStateNameInputBox, fieldName);
  }
});

Then('ui: Click on Create button in States tab of Workflow Management', async () => {
  await clickToElement(Selectors.common.btnCreate);
});

Then('ui: Wait for State to be present in States tab of Workflow Management', async () => {
  const { name } = context().projectWorkflowSetup.state;
  await element(locatorParse(Selectors.workflowManagement.stateFieldName, name));
});