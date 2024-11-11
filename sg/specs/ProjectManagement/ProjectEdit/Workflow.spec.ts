import { Then } from "@cucumber/cucumber";
import { clickToElement, element, locatorParse } from "../../../../../core/func";
import { context } from "../../../../../utils/context";
import Selectors from '../../../../../core/selectors';

Then('ui: Verify Rich text of recently created project Cfs in workflow section of Project', async () => {
  const attributes = [];
  attributes.push(context().projectAttributes);
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i][0];
    const richtextElement = await element(locatorParse(Selectors.projectManagement.workflow.richTextValueOfSpecificAttribute, attribute.name));
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await Promise.all(elements.map(element => element.getHTML()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of project CF:{${attribute.name}} in workflow tab of project:{${context().projectSetup.name}} was incorrect`, true);
  }
});

Then('ui: I click on save button in Workflow tab',async () => {
  await clickToElement(Selectors.projectManagement.buildTeam.btnSave);
})