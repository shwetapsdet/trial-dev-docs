import { Then, When } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import {
  clickToElement, element, elementParse, formFill, isElementDisplayed, locatorParse,
} from '../../../../../core/func';
import { context } from '../../../../../utils/context';
import { TemplateRestoreOptions, ToggleStates } from '../../../../../core/enums';
import { Common } from '../../../../../helpers/ProjectManagement/ProjectEdit/Common.helper';
import { assert } from 'chai';
import { SHORT_PAUSE } from '../../../../../core/timeouts';
import { Project } from '../../../../../helpers/Project.helper';
import { projectOperations } from "../../../../../apiOperations/createProject.operations";
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import DateTime from '../../../../../core/datetime';


Then(/^ui: Click on Project navigation dropdown and select "([^"]*)"$/, async (projectNavigationOption: string) => {
  await Common.clickOnProjectOptionAndSelectSpecificOption(projectNavigationOption);
});

Then('ui: Click on Project navigation dropdown',async() => {
  await clickToElement(Selectors.projectManagement.ddProjectNavigationDropdown)
});

When('ui: Click on Import from Template button', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.importFromTemplateButton);
});

Then('ui: Search for template in Choose Template dropdown of Import from Template modal', async () => {
  const { name } = context().projectTemplate;
  await formFill([
    { locator: Selectors.projectManagement.projectEdit.searchInputboxOfImportTempalte, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.projectEdit.searchInputboxOfImportTempalte, value: name, action: 'setValue' },
  ]);
});

Then(/^ui: Verify if template is present in Choose Template dropdown of Import from Template modal$/, async () => {
  const { name } = context().projectTemplate;
  await expect(element(locatorParse(Selectors.common.dropdownSpecificValue, name))).toBeDisplayed();
});

Then('ui: Click on Choose Template dropdown in Import from template modal', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.chooseTemplateDropdownInImportFromTemplateModal);
});

Then('ui: Search and select template in Import from Template modal', async () => {
  const { name } = context().projectTemplate;
  await formFill([
    { locator: Selectors.projectManagement.projectEdit.searchInputboxOfImportTempalte, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.projectEdit.searchInputboxOfImportTempalte, value: name, action: 'setValue' },
  ]);
  await (await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: name })).click();
});


Then('ui: Click on save button in Project edit and wait for it to be clickable', async () => {
  await Common.clickOnSaveButtonAndWaitForItToBeClickable();
});

Then(/^ui: Toggle "([^"]*)" "([^"]*)" restore option in Import from Template modal$/, async (toggleState: string, resotreOptionName: string) => {
  if (toggleState == ToggleStates.On) {
    if (!await (await elementParse({ locatorString: Selectors.projectManagement.projectEdit.restorOptionInImportTemplateModalInput, parsing: resotreOptionName })).isSelected()) {
      switch (resotreOptionName) {
        case TemplateRestoreOptions.TemplateOptionsAtApply:
        case TemplateRestoreOptions.Attributes:
        case TemplateRestoreOptions.PlannedAllocation:
        case TemplateRestoreOptions.ActualAllocation:
        case TemplateRestoreOptions.PlannedDemand:
        case TemplateRestoreOptions.ActualDemand:
        case TemplateRestoreOptions.BuildTeam:
        case TemplateRestoreOptions.Financials:
        case TemplateRestoreOptions.Milestones:
        case TemplateRestoreOptions.Schedule:
        case TemplateRestoreOptions.SelectAll:
          await (await elementParse({ locatorString: Selectors.projectManagement.projectEdit.restorOptionInImportTemplateModalToggleButton, parsing: resotreOptionName })).click();
          break;
        default:
          throw new Error(`Invalid Template restore option:${resotreOptionName}\nSupported Values (CASE SENSITIVE):\n${Object.values(TemplateRestoreOptions)}`);
      }
    }
  } else if (toggleState == ToggleStates.Off) {
    if (await (await elementParse({ locatorString: Selectors.projectManagement.projectEdit.restorOptionInImportTemplateModalInput, parsing: resotreOptionName })).isSelected()) {
      switch (resotreOptionName) {
        case TemplateRestoreOptions.TemplateOptionsAtApply:
        case TemplateRestoreOptions.Attributes:
        case TemplateRestoreOptions.PlannedAllocation:
        case TemplateRestoreOptions.ActualAllocation:
        case TemplateRestoreOptions.PlannedDemand:
        case TemplateRestoreOptions.ActualDemand:
        case TemplateRestoreOptions.BuildTeam:
        case TemplateRestoreOptions.Financials:
        case TemplateRestoreOptions.Milestones:
        case TemplateRestoreOptions.Schedule:
          await (await elementParse({ locatorString: Selectors.projectManagement.projectEdit.restorOptionInImportTemplateModalToggleButton, parsing: resotreOptionName })).click();
          break;
        default:
          throw new Error(`Invalid Template restore option:${resotreOptionName}\nSupported Values (CASE SENSITIVE):\n${Object.values(TemplateRestoreOptions)}`);
      }
    }
  } else {
    throw Error(`Incorrect toggle state:{${toggleState}}\nSupported values:${Object.values(ToggleStates)}`);
  }
});

Then('ui: Click on Apply button in Import from Template modal', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.applyButtonInImportTemplateModal);
});

Then('ui: Click on search textbox in Choose Template dropdown of Import from Template modal', async () => {
  await clickToElement(Selectors.projectManagement.projectEdit.searchInputboxOfImportTempalte);
});

Then('ui: Verify if search textbox in Choose Template dropdown of Import from Template modal is displayed', async () => {
  const searchInputBoxDisplayed = await isElementDisplayed(Selectors.projectManagement.projectEdit.searchInputboxOfImportTempalte, SHORT_PAUSE * 2);
  assert.isTrue(searchInputBoxDisplayed, "Project template search textbox is not displayed");
});

Then('ui: Enter Project name in project creation page', async () => {
  await Project.enterProjectNameWhenCreatingProject(context().projectSetup.name);
});

Then('ui: Click on Create button in project creation page', async () => {
  await clickToElement(Selectors.common.btnCreate);
  
});

Then('ui: Enter Project named as "AutomationSheetImport" in project creation page', async () => {
  await Project.enterProjectNameWhenCreatingProject('AutomationSheetImport');
});

Then(/^ui: Click on Resource navigation button and select "([^"]*)"$/, async (resourceNavigationOption: string) => {
  await Common.clickOnResourceOptionAndSelectSpecificOption(resourceNavigationOption);
});

Then('ui: Click on Resource navigation button', async () => {
await clickToElement( Selectors.resourceManagement.resourceEdit.resourceOptionButton  )});

Then(/^ui: I verify if "([^"]*)" option is not avaialble in Project navigation dropdown$/, async (navigationOption) => {
  await clickToElement(Selectors.projectManagement.ddProjectNavigationDropdown);
  const ele = await isElementDisplayed(locatorParse(Selectors.common.dropdownSpecificValue, navigationOption));
  await context().softAssert.isFalse(ele, `Project Navigation Option: {${navigationOption}} is still displayed`);
});

Then(/^api: I create a default project for automation with date range as "([^"]*)" year$/, async (Year: string) => {
  let startDate, endDate;
  const { name } = context().projectSetup;
  switch (Year.toLowerCase()) {
    case 'current':
      startDate = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.createProjectAPIdateFormat);
      endDate = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.createProjectAPIdateFormat);
      break;
    case 'next':
      startDate = DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.createProjectAPIdateFormat);
      endDate = DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.createProjectAPIdateFormat);
      break;
    case 'previous':
      startDate = DateTime.getPreviousYearStartDate(GeneralSettingsDefaultValues.global.createProjectAPIdateFormat);
      endDate = DateTime.getPreviousYearEndDate(GeneralSettingsDefaultValues.global.createProjectAPIdateFormat);
      break;
    default: throw Error(`Year :{${Year}} is not yet supported.\nSupported values :\n1.Current\n2.Next\n3.Previous`);
  }
    
  await projectOperations.createProjectIfNotAlreadyCreated(context().user.baseUrl, context().token, name, startDate, endDate);
})