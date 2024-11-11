import { Then } from "@cucumber/cucumber";
import { element, elementParseAndClick } from "../../../../core/func";
import { SHORT_PAUSE } from "../../../../core/timeouts";
import { ProjectGrid } from "../../../../helpers/ProjectManagement/Grid.helper";
import { context } from "../../../../utils/context";
import Selectors from '../../../../core/selectors';

Then('ui: Verify Rich text in User Management Grid for recently created Cfs', async () => {
  const attributes = context().resourceAttributes;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    await ProjectGrid.doubleClickOnAttributeCellOfSpecificProject(context().resourceSetup.name, attribute.name);
    await browser.pause(SHORT_PAUSE / 2);
    const richtextElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of resource CF:{${attribute.name}} for resource:{${context().resourceSetup.name}} in User Management Grid was incorrect`, true);

    await elementParseAndClick(Selectors.projectManagement.grid.specificButtonWhenEditingRichTextCF, "Cancel");
    await browser.pause(SHORT_PAUSE / 2);
  }
});