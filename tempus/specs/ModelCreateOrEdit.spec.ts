import { Then } from '@cucumber/cucumber';
import { clickToElement, element, isElementDisplayed, elementParseAndClick, isElementSelected, locatorParse, selectFromDropdown, slowInputFilling } from '../../../core/func';
import Selectors from '../../../core/selectors';
import { context } from '../../../utils/context';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../core/timeouts';
const moment = require('moment')
import { Key } from 'webdriverio'


Then('ui: Enter Model name in Tempus model create or edit page', async () => {
  await slowInputFilling(Selectors.tempus.modelCreateOrEdit.modelNameInputbox, context().modelSetup.name)
});

Then(/^ui: Select Start date as "(0?[1-9]|[1-2][0-9]|3[0-1])" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Tempus model create or edit page$/, async (dateToBeEntered: string, monthName: string) => {

  await clickToElement(Selectors.tempus.modelCreateOrEdit.startDateInputbox);
  await browser.pause(SHORT_PAUSE / 2);

  const year = moment().year();

  const topLabelElement = await element(`${Selectors.tempus.common.topLabelInDatePicker}`);
  await topLabelElement.click();
  await browser.pause(SHORT_PAUSE / 2);
  const currentYear = parseInt(await topLabelElement.getText());
  const difference: number = Math.abs(parseInt(await topLabelElement.getText()) - year);
  if (currentYear > year) {
    for (let i = 1; i <= difference; i++) {
      await clickToElement(Selectors.tempus.common.rightNavigateIconInDatePicker);
    }
  } else if (currentYear < year) {
    for (let i = 1; i <= difference; i++) {
      await clickToElement(Selectors.tempus.common.leftNavigateIconInDatePicker);
    }
  }
  await clickToElement(locatorParse(Selectors.tempus.common.specificDateOrMonthInDatePicker, monthName));
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(locatorParse(Selectors.tempus.common.specificDateOrMonthInDatePicker, dateToBeEntered));
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Select recently created CF in Level 1 of Tempus model create or edit page', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.aggregation.level1Attribute,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, context().attributeSetup.name),
  });
});

Then('ui: Select Select All in Level 1 of Tempus model create or edit page', async () => {
  await clickToElement(Selectors.tempus.modelCreateOrEdit.aggregation.level1Type);
  await browser.pause(SHORT_PAUSE / 2);

  const specificOptionElement = await element((locatorParse(Selectors.tempus.common.dropdownSpecificValue, "Select all") + "/preceding-sibling::img"));
  const srcAttribute: string = await specificOptionElement.getAttribute("src");
  if (srcAttribute.includes('unselected')) {
    await clickToElement((locatorParse(Selectors.tempus.common.dropdownSpecificValue, "Select all") + "/preceding-sibling::img"));
  }
});

Then('ui: Click on Save button in Tempus model create or edit page', async () => {
  await clickToElement(Selectors.common.btnSave);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: Click on "(Private|Shared|Shared with data)" Model access button in Tempus model create or edit page$/, async (modelAccess: string) => {
  await clickToElement(locatorParse(Selectors.tempus.modelCreateOrEdit.spcificModelAccessButton, modelAccess));
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Click on Filters button in Projects section of Tempus model create or edit page', async () => {
  await clickToElement(Selectors.tempus.modelCreateOrEdit.projectsSection.filtersButton);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Enter recently CF in search input box of Filters in Projects section of Tempus model create or edit page', async () => {
  const { name } = context().attributeSetup;
  await slowInputFilling(Selectors.tempus.modelCreateOrEdit.projectsSection.attributeSearchInputBoxInFiltersPopup, name);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(locatorParse(Selectors.tempus.modelCreateOrEdit.projectsSection.specificAttributeInFilterPopupSearch, name));
});

Then(/^ui: Enter and select operator as: "([^"]*)" in Filters in Projects section of Tempus model create or edit page$/, async (operator: string) => {
  await slowInputFilling(Selectors.tempus.modelCreateOrEdit.projectsSection.operatorSearchInputBoxInFiltersPopup, operator);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(locatorParse(Selectors.tempus.modelCreateOrEdit.projectsSection.operatorValueInFilterPopupSearch, operator));
});

Then('ui: Click on Value dropdown and select Select All checkbox in Filters in Projects section of Tempus model create or edit page', async () => {
  await clickToElement(Selectors.tempus.modelCreateOrEdit.projectsSection.valueDropdownInFiltersPopup);
  await browser.pause(SHORT_PAUSE / 2);
  const selectAllCheckBoxInDropdownElement = await element(Selectors.tempus.modelCreateOrEdit.projectsSection.selectAllCheckboxInFiltersValuePopUp);
  await selectAllCheckBoxInDropdownElement.click();
  if (await !isElementSelected(selectAllCheckBoxInDropdownElement)) {
    await selectAllCheckBoxInDropdownElement.click();
  }
  await browser.keys(Key.Escape);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Click on Add button in Filters in Projects section of Tempus model create or edit page', async () => {
  await clickToElement(Selectors.tempus.modelCreateOrEdit.projectsSection.addButtonInFiltersPopup);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Select recently created CFs in All 3 Levels of Tempus model create or edit page', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.aggregation.level1Attribute,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, context().attributesSetup[0].name),
  });

  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.aggregation.level2Attribute,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, context().attributesSetup[1].name),
  });

  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.aggregation.level3Attribute,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, context().attributesSetup[2].name),
  });
});

Then('ui: Select Select All in All 3 Levels of Tempus model create or edit page', async () => {
  await clickToElement(Selectors.tempus.modelCreateOrEdit.aggregation.level1Type);
  await browser.pause(SHORT_PAUSE / 2);

  let specificOptionElement = await element((locatorParse(Selectors.tempus.common.dropdownSpecificValue, "Select all") + "/preceding-sibling::img"));
  let srcAttribute: string = await specificOptionElement.getAttribute("src");
  if (srcAttribute.includes('unselected')) {
    await browser.pause(MEDIUM_PAUSE/2);
    await specificOptionElement.click();
  }

  await clickToElement(Selectors.tempus.modelCreateOrEdit.aggregation.level2Type);
  await browser.pause(SHORT_PAUSE / 2);

  specificOptionElement = await element((locatorParse(Selectors.tempus.common.dropdownSpecificValue, "Select all") + "/preceding-sibling::img"));
  srcAttribute = await specificOptionElement.getAttribute("src");
  if (srcAttribute.includes('unselected')) {
    await browser.pause(MEDIUM_PAUSE/2);
    await specificOptionElement.click();
  }

  await clickToElement(Selectors.tempus.modelCreateOrEdit.aggregation.level3Type);
  await browser.pause(SHORT_PAUSE / 2);

  specificOptionElement = await element((locatorParse(Selectors.tempus.common.dropdownSpecificValue, "Select all") + "/preceding-sibling::img"));
  srcAttribute = await specificOptionElement.getAttribute("src");
  if (srcAttribute.includes('unselected')) {
    await browser.pause(MEDIUM_PAUSE/2);
    await specificOptionElement.click();
  }

});

Then(/^ui: Enter recently CF number: "([^"]*)" in search input box of Filters in Projects section of Tempus model create or edit page$/, async (cfIndex: number) => {
  const { name } = context().attributesSetup[cfIndex - 1];
  await slowInputFilling(Selectors.tempus.modelCreateOrEdit.projectsSection.attributeSearchInputBoxInFiltersPopup, name);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(locatorParse(Selectors.tempus.modelCreateOrEdit.projectsSection.specificAttributeInFilterPopupSearch, name));
});

Then('ui: Select recently created CF in Priority attribute of Tempus model create or edit page', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.priorityAttributeOpener,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, 'Dataset Preference'),
  })
});

Then('ui: Select Financial Category from the latest created one', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.projectGrid.financialDDOpener,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, context().financialCategoryName)
  });
  await clickToElement('//span[@class="header-wrapper__username"]');
  await clickToElement('//span[@class="header-wrapper__username"]');
})


Then(/^ui: Select "([^"]*)" in the model creation$/, async (capacityType: string) => {
  const ele = locatorParse(Selectors.tempus.modelCreateOrEdit.capacityTypeButton, capacityType)
  if (!(await isElementDisplayed(ele))) {
    await elementParseAndClick(Selectors.tempus.modelCreateOrEdit.capacityButton, capacityType);
  };
});

Then(/^ui: I validate "([^"]*)" in the model creation$/, async (capacityType: string) => {
  const ele = locatorParse(Selectors.tempus.modelCreateOrEdit.capacityTypeButton, capacityType);
  await context().softAssert.isTrue(await isElementDisplayed(ele), `Capacity Type: {${capacityType}} is not selected`);
})

Then(/^ui: Turn "(On|Off)" Dynamic Project Inclusion toggle button in Advanced Model Settings of Tempus model create or edit page$/, async (toggleState: string) => {
  const dynamicProjectInclusionToggleButton = await element(Selectors.tempus.modelCreateOrEdit.advancedModelSettings.dynamicProjectInclusionToggleButton);
  const dynamicProjectInclusionToggleButtonClassAttribute = await dynamicProjectInclusionToggleButton.getAttribute("class");
  if (toggleState === "On") {
    if (!dynamicProjectInclusionToggleButtonClassAttribute.includes('active')) {
      await dynamicProjectInclusionToggleButton.click();
    }
  } else {
    if (dynamicProjectInclusionToggleButtonClassAttribute.includes('active')) {
      await dynamicProjectInclusionToggleButton.click();
    }
  }
});

Then(/^ui: Click on option "(Allocation|Demand|Use Dataset Preference)" under Dynamic Project Inclusion toggle button in Advanced Model Settings of Tempus model create or edit page$/, async (optionToBeClicked: string) => {
  await elementParseAndClick(Selectors.tempus.modelCreateOrEdit.advancedModelSettings.specificOptionUnderDynamicProjetcInclusionToggleButton, optionToBeClicked);
});

Then('ui: Select Select All checkbox of Project list in Tempus model create or edit page', async () => {
  const selectAllCheckboxOfProjectsElement = await element(Selectors.tempus.modelCreateOrEdit.projectsSection.selectAllCheckboxOfProjects);
  await browser.pause(SHORT_PAUSE / 2);

  const classAttribute: string = await selectAllCheckboxOfProjectsElement.getAttribute("class");
  if (!classAttribute.includes('active')) {
    await selectAllCheckboxOfProjectsElement.click();
  }
});
Then('ui: Select Budget from the latest created one', async () => {
  await browser.pause(MEDIUM_PAUSE);
  await selectFromDropdown({
    dropdownOpener: Selectors.tempus.modelCreateOrEdit.projectGrid.budgetDDOpener,
    dropdownSelection: locatorParse(Selectors.tempus.modelCreateOrEdit.aggregation.attributeValueInDropdown, context().budgetModel)
  });
})
