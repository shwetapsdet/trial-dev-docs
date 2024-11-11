import { Then } from "@wdio/cucumber-framework";
import { clickToElement, elementParseAndClick, selectFromDropdown, slowInputFilling } from "../../../../core/func";
import Selectors from '../../../../core/selectors';
import { context } from "../../../../utils/context";
import { faker } from "@faker-js/faker";


Then(/^ui: I enter a name for Financial Category with "([^"]*)" and type as "([^"]*)"$/,async (FCValue: string, FCType: string) => {
  context().financialCategoryName = `TestAUTFinancialCategory-${faker.string.alphanumeric(6)}`;
  await slowInputFilling(Selectors.projectManagement.scribe.financials.categoryName, context().financialCategoryName);
  
  if(FCType !=='Default') {
    await elementParseAndClick(Selectors.projectManagement.scribe.financials.fcValue.fcValueType, FCValue);  
    await selectFromDropdown({
      dropdownOpener:Selectors.projectManagement.scribe.financials.fcValue.ddOpenerFC ,
      dropdownSelection: Selectors.projectManagement.scribe.financials.fcValue.ddselectionFC,
    });
  }
});

Then('ui: I click on create new financial category',async () => {
  await clickToElement(Selectors.projectManagement.scribe.financials.fcValue.categoryBtn);
});

Then('ui: I click on Save button in the financial category create model',async () => {
  await clickToElement(Selectors.projectManagement.scribe.financials.fcValue.saveBtn);
});