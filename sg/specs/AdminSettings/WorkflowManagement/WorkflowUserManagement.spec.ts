import { Then } from '@wdio/cucumber-framework';
import {
  clickToElement, formFill, slowInputFilling, mayBeElement, element, clearTextUsingBackspace,
} from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { context } from '../../../../../utils/context';
import { MEDIUM_PAUSE } from '../../../../../core/timeouts';

Then('ui: I create new Workflow User', async () => {
  await clickToElement(Selectors.workflowManagement.workflowUserTab);

  await clickToElement(Selectors.workflowManagement.workFlowUser.createUser);

  const {
    name, username, password,
  } = context().workflowUserSetup;

  await slowInputFilling(Selectors.workflowManagement.workFlowUser.inputName, name);

  await formFill([
    // { locator: Selectors.workflowManagement.workFlowUser.inputUserEmail, value: email.toLowerCase(), action: 'setValue' },
    { locator: Selectors.workflowManagement.workFlowUser.toggleCustomCredentials, value: null, action: 'click' },
    { locator: Selectors.workflowManagement.workFlowUser.inputUsername, value: username, action: 'setValue' },
    { locator: Selectors.workflowManagement.workFlowUser.inputUserPassword, value: password, action: 'setValue' },
    { locator: Selectors.workflowManagement.workFlowUser.inputUserConformPassword, value: password, action: 'setValue' },
    { locator: Selectors.common.btnCreate, value: null, action: 'click' },
  ]);
});

Then('ui: I search for workflow user in resource list page', async () => {
  const {
    name
  } = context().workflowUserSetup;
  const txtQuickSearch = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearch);
  await txtQuickSearch.setValue(name);
});

Then('ui: I validate the user is not present', async () => {
  const {
    name
  } = context().workflowUserSetup;

  await expect(await mayBeElement(`//span[text()="${name}"]`, MEDIUM_PAUSE)).toBeFalsy();
});

Then('ui: I reassign task to the workflow user from any existing resource', async () => {
  const {
    name
  } = context().workflowUserSetup;

  await clickToElement(Selectors.resourceManagement.grid.resourceReplace.adminstratorEditThreeButton);
  await clickToElement(Selectors.resourceManagement.grid.resourceReplace.globalReplaceButton);

  await formFill([
    { locator: Selectors.resourceManagement.grid.resourceReplace.reassignResourceInput, value: name, action: 'setValue' }
  ]);
});

Then('ui: I click on cancel button', async () => {
  await clickToElement(Selectors.resourceManagement.grid.resourceReplace.cancelButton);
})