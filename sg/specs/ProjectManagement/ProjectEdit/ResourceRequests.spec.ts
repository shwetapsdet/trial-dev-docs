import { Then } from '@cucumber/cucumber';
import { clickToElement } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';

Then(/^ui: Click on "([^"]*)" RR of resource "([^"]*)" for project "([^"]*)"$/, async (resourceRequestStatus: string, resourceName: string,
  projectName: string) => {
  await clickToElement(Selectors.projectManagement.resourceRequests.resourceRequest1.replace('{{resourceRequestStatus}}', resourceRequestStatus).replace('{{resourceName}}', resourceName).replace('{{projectName}}', projectName));
});
