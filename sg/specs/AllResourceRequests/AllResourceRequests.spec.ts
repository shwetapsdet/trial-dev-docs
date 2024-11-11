import { Then } from '@wdio/cucumber-framework';
import { isElementDisplayed } from '../../../../core/func';
import Selectors from '../../../../core/selectors';
import { SHORT_PAUSE } from '../../../../core/timeouts';
import { context } from '../../../../utils/context';
import { assert } from 'chai';
    
Then(/^ui: I verify specific resource request status "(Pending|Approved|Rejected|Partially Approved)" is displayed in All Resource Requests tab$/, async (status: string) => {
  const cellLocator = (Selectors.resourceRequests.rowOfSpecificRequest)
    .replace("{{projectName}}", context().projectSetup.name)
    .replace("{{resourceName}}", context().resourceSetup.name)
    .replace("{{resourceRequestStatus}}", status);
  const specificStatusDisplayed = await isElementDisplayed(cellLocator, SHORT_PAUSE); 
  assert.isTrue(specificStatusDisplayed, `Specific status :{${status}} of project : {${context().projectSetup.name}} and resource : {${context().resourceSetup.name}} was not displayed`);
});   
    
    
