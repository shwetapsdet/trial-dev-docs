import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, element, elementParse, formFill, getElementBackgroundColor, isElementDisplayed, isElementSelected, locatorParse, selectFromDropdown } from '../../../../../core/func';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { GenericColorCodes, ToggleStates, languageValidation  } from '../../../../../core/enums';
import { context } from '../../../../../utils/context';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';


Then('ui: Set all to automation defaults in Global tab of GS', async () => {
  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.dateFormat,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.global.dateFormat),
  });

  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.costCurrency,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.global.costCurrency),
  });

  // await selectFromDropdown({
  //   dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.numberFormat,
  //   dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.global.numberFormat),
  // });

  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.globalTab.availableProjectAllocationTab,
    parsing: GeneralSettingsDefaultValues.global.availableProjectAllocationTab
  })).click();

  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.globalTab.availableAssignmentMode,
    parsing: GeneralSettingsDefaultValues.global.availableAssignmentType
  })).click();

  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.globalTab.defaultAssignmentMode,
    parsing: GeneralSettingsDefaultValues.global.defaultAssignmentType
  })).click();

  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.globalTab.availableDataset,
    parsing: GeneralSettingsDefaultValues.global.availableDataset
  })).click();

  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.calculateCostFromDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.global.calculateCostFrom),
  });

  const allowApiToModifyAllDatasetsInput = await $(Selectors.adminSettings.generalSettings.globalTab.allowApiToModifyAllDatasetsInput);
  const allowApiToModifyAllDatasetsInputSelectionState = await allowApiToModifyAllDatasetsInput.isSelected()
  if (GeneralSettingsDefaultValues.global.allowApiToModifyAllDatasets) {
    if (!allowApiToModifyAllDatasetsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.allowApiToModifyAllDatasetsToggleButton)
    }
  } else {
    if (allowApiToModifyAllDatasetsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.allowApiToModifyAllDatasetsToggleButton)
    }
  }

  const allocationOrDemandDatasetInput = await $(Selectors.adminSettings.generalSettings.globalTab.copyAllocationOrDemandDatasetInput);
  const copyAllocationOrDemandDatasetInputSelectionState = await allocationOrDemandDatasetInput.isSelected();
  if (GeneralSettingsDefaultValues.global.copyAllocationOrDemandDataset) {
    if (!copyAllocationOrDemandDatasetInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.copyAllocationOrDemandDatasetToggleButton)
    }
  } else {
    if (copyAllocationOrDemandDatasetInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.copyAllocationOrDemandDatasetToggleButton)
    }
  }

  const allowNegativeAllocationsInput = await $(Selectors.adminSettings.generalSettings.globalTab.allowNegativeAllocationsInput);
  const allowNegativeAllocationsInputSelectionState = await allowNegativeAllocationsInput.isSelected();
  if (GeneralSettingsDefaultValues.global.allowNegativeAllocations) {
    if (!allowNegativeAllocationsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.allowNegativeAllocationsToggleButton)
    }
  } else {
    if (allowNegativeAllocationsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.allowNegativeAllocationsToggleButton)
    }
  }

  for (const modeOfEntry of GeneralSettingsDefaultValues.global.modeOfEntry) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.globalTab.modeOfEntryInput, modeOfEntry))
    const isSelected = await el.isSelected();

    if (!isSelected) {
      await el.click();
    }
  }

  for (const view of GeneralSettingsDefaultValues.global.projectManagementViews) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.globalTab.projectManagementViewsCheckbox, view));
    const isSelected = await el.isSelected();

    if (!isSelected) {
      await el.click();
    }
  }

  const enforceBuildTeamInput = await $(Selectors.adminSettings.generalSettings.globalTab.enforceBuildTeamInput);
  const enforceBuildTeamInputSelectionState = await enforceBuildTeamInput.isSelected();
  if (GeneralSettingsDefaultValues.global.enforceBuildTeam) {
    if (!enforceBuildTeamInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.enforceBuildTeamToggleButton)
    }
  } else {
    if (enforceBuildTeamInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.enforceBuildTeamToggleButton)
    }
  }

  const excludeProposalProjectsInput = await $(Selectors.adminSettings.generalSettings.globalTab.excludeProposalProjectsInput);
  const excludeProposalProjectsInputSelectionState = await excludeProposalProjectsInput.isSelected();
  if (GeneralSettingsDefaultValues.global.excludeProposalProjects) {
    if (!excludeProposalProjectsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.excludeProposalProjectsToggleButton);
    }
  } else {
    if (excludeProposalProjectsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.excludeProposalProjectsToggleButton);
    }
  }

  const excludeUnapprovedAssignmentsInput = await $(Selectors.adminSettings.generalSettings.globalTab.excludeUnapprovedAssignmentsInput);
  const excludeUnapprovedAssignmentsInputSelectionState = await excludeUnapprovedAssignmentsInput.isSelected();

  if (GeneralSettingsDefaultValues.global.excludeUnapprovedAssignments) {
    if (!excludeUnapprovedAssignmentsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.excludeUnapprovedAssignmentsToggleButton)
    }
  } else {
    if (excludeUnapprovedAssignmentsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.globalTab.excludeUnapprovedAssignmentsToggleButton)
    }
  }

  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.globalTab.showEmptyAllocationOrDemandAsIcon,
    parsing: GeneralSettingsDefaultValues.global.showEmptyAllocationOrDemandAs
  })).click();

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.globalTab.userSessionInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.globalTab.userSessionInputBox, value: GeneralSettingsDefaultValues.global.userSession, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.globalTab.lockingTimeoutInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.globalTab.lockingTimeoutInputBox, value: GeneralSettingsDefaultValues.global.lockingTimeout, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.globalTab.lockingTimeoutWarningInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.globalTab.lockingTimeoutWarningInputBox, value: GeneralSettingsDefaultValues.global.lockingTimeoutWarning, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.globalTab.minimalPasswordLengthInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.globalTab.minimalPasswordLengthInputBox, value: GeneralSettingsDefaultValues.global.minimalPasswordLength, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.globalTab.maximumLoginAttemptsInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.globalTab.maximumLoginAttemptsInputBox, value: GeneralSettingsDefaultValues.global.maximumLoginAttempts, action: 'setValue' },
  ]);

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.globalTab.projectAutoSaveInputBox, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.globalTab.projectAutoSaveInputBox, value: GeneralSettingsDefaultValues.global.projectAutoSave, action: 'setValue' },
  ]);

});

Then(/^ui: I toggle exclude unapproved assignment to "([^"]*)" in General settings global tab$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.adminSettings.generalSettings.globalTab.excludeUnapprovedAssignmentsToggleButton)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.adminSettings.generalSettings.globalTab.excludeUnapprovedAssignmentsToggleButton)).click();
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.adminSettings.generalSettings.globalTab.excludeUnapprovedAssignmentsToggleButton)).click();
  }
});

Then(/^ui: Click on assignment type:"(Planned|Actual|Both)" in General settings global tab$/, async (assignmentTypeToBeSelected: string) => {
  await (await elementParse({
    locatorString: Selectors.adminSettings.generalSettings.globalTab.availableAssignmentMode,
    parsing: assignmentTypeToBeSelected
  })).click();

});

Then(/^ui: I select calulation cost field as "([^"]*)"$/,async (optionName: string) => {
  switch (optionName) {
    case 'custom field':
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.calculateCostFromDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, context().attribute1),
      });
      break;
    case 'default field':
      await selectFromDropdown({
        dropdownOpener: Selectors.adminSettings.generalSettings.globalTab.calculateCostFromDropdown,
        dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.global.calculateCostFrom),
      });
      break;
    default:
      throw Error(`The selected option ${optionName} doesnot exist in the list`);
  }
});

Then('ui: Click on Language dropdown in General Settings', async () => {
  await clickToElement(Selectors.adminSettings.generalSettings.globalTab.languageDropdownOpener)
});

Then(/^ui: Select "([^"]*)" from the language dropdown in Profile$/, async (languageName: string) => {
  const ele = locatorParse(Selectors.adminSettings.generalSettings.globalTab.languageDropdownOption, languageName);
  await browser.pause(MEDIUM_PAUSE);
  await clickToElement(ele);
  const ele2 = await element('//button[contains(@class,"buttonblue positive")]')
  if(await ele2.isElementDisplayed(languageName))
  {
    await clickToElement(ele2);
  }
});

Then(/^ui: Select "([^"]*)" from the language dropdown$/, async (languageName: string) => {
  const ele = locatorParse(Selectors.adminSettings.generalSettings.globalTab.languageDropdownOption, languageName);
  await clickToElement(ele);
});

Then('ui: Validate that there are different supported languages present', async () => {
  const languageName = ['English', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Portuguese', 'Spanish']
  languageName.forEach(async (language) => {

    await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.adminSettings.generalSettings.globalTab.languageDropdownOption, language)), `Language: {${language}} is not shown in Language dropdown of General Settings`);
  });
});

Then(/^ui: Validate changes done in "([^"]*)" for "([^"]*)" language$/, async (screenName: string, languageName: string) => {
  switch (languageName.toLocaleLowerCase()) {
    case "english":
      if (screenName === "General Settings") {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.English.SaveButton)), `Language Validation: {${languageValidation.English.SaveButton}} was not updated and applied in ${screenName} section`);
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.English.GeneralSettings)),`Language Validation: {${languageValidation.English.GeneralSettings}} was not updated and applied in ${screenName} section`);
      }
      else if (screenName === "Profile") {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.English.ProfileLanguage)), `Language Validation: {${languageValidation.English.ProfileLanguage}} was not updated and applied in ${screenName} section`);
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.English.ProfileManagement)),`Language Validation: {${languageValidation.English.ProfileManagement}} was not updated and applied in ${screenName} section`);
      }
      break;
    case "japanese":
      if (screenName === "General Settings") {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.Japanese.SaveButton)), `Language Validation: {${languageValidation.Japanese.SaveButton}} was not updated and applied in ${screenName} section`);
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.Japanese.GeneralSettings)), `Language Validation: {${languageValidation.Japanese.GeneralSettings}} was not updated and applied in ${screenName} section`);
      }
      else if (screenName === "Profile") {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.Japanese.ProfileLanguage)), `Language Validation: {${languageValidation.Japanese.ProfileLanguage}} was not updated and applied in ${screenName} section`);
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.txtValidationByName, languageValidation.Japanese.ProfileManagement)),`Language Validation: {${languageValidation.Japanese.ProfileManagement}} was not updated and applied in ${screenName} section`);
      }
      break;
      default: throw Error(`The Selected language ${languageName} is not yet defined. Kindly check validation for English or Japanese language`);
  }
})

Then(/^ui: I toggle Working Weekends to "([^"]*)" in General settings global tab$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.adminSettings.generalSettings.globalTab.workingWeekendsToggle)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.adminSettings.generalSettings.globalTab.workingWeekendsToggle)).click();
    if(await isElementDisplayed((Selectors.adminSettings.generalSettings.globalTab.confirmPopupInputBox))){
      await formFill([
        { locator: Selectors.adminSettings.generalSettings.globalTab.confirmPopupInputBox, value: null, action: 'clearValue' },
        { locator: Selectors.adminSettings.generalSettings.globalTab.confirmPopupInputBox, value: 'confirm', action: 'setValue' },
        { locator: Selectors.adminSettings.generalSettings.globalTab.confirmPopupButton, value: null, action: 'click' },
      ]);
    }
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.adminSettings.generalSettings.globalTab.workingWeekendsToggle)).click();
    if(await isElementDisplayed((Selectors.adminSettings.generalSettings.globalTab.confirmPopupInputBox))){
      await formFill([
        { locator: Selectors.adminSettings.generalSettings.globalTab.confirmPopupInputBox, value: null, action: 'clearValue' },
        { locator: Selectors.adminSettings.generalSettings.globalTab.confirmPopupInputBox, value: 'confirm', action: 'setValue' },
        { locator: Selectors.adminSettings.generalSettings.globalTab.confirmPopupButton, value: null, action: 'click' },
      ]);
    }
  }
});

Then(/^ui: I toggle Auto Calculate Capacity "([^"]*)" in General settings global tab$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.adminSettings.generalSettings.globalTab.autoCalculateCapacityToggleButton)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await (await element(Selectors.adminSettings.generalSettings.globalTab.autoCalculateCapacityToggleButton)).click();
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await (await element(Selectors.adminSettings.generalSettings.globalTab.autoCalculateCapacityToggleButton)).click();
  }
});

Then(/^ui: I validate toggle Auto Calculate Capacity is "([^"]*)" in General settings global tab$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.adminSettings.generalSettings.globalTab.autoCalculateCapacityToggleButton)).toString();
  if (color == GenericColorCodes.ToggleON && toggleState == ToggleStates.On) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.adminSettings.generalSettings.globalTab.autoCalculateCapacityToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.adminSettings.generalSettings.globalTab.autoCalculateCapacityToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  }
});

Then(/^ui: I validate toggle Auto Calculate FTE is "([^"]*)" in Resource Management/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.resourceManagement.actions.autoCalculateFTEToggle)).toString();
  if (color == GenericColorCodes.ToggleON && toggleState == ToggleStates.On) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.resourceManagement.actions.autoCalculateFTEToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.resourceManagement.actions.autoCalculateFTEToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  }
});

Then(/^ui: I validate toggle Auto Calculate Time is "([^"]*)" in Resource Management$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.resourceManagement.actions.autoCalculateTimeToggle)).toString();
  if (color == GenericColorCodes.ToggleON && toggleState == ToggleStates.On) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.resourceManagement.actions.autoCalculateTimeToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
        await context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.resourceManagement.actions.autoCalculateTimeToggleParser, toggleState)), `Toggle Validation: {${toggleState}} was not applie global tab section`);
  }
});

Then(/^ui: I validate if mode of entry "([^"]*)" is "([^"]*)"$/, async (modeOfEntry: string, selectedStatus: string) => {
  const ele = await isElementSelected(await elementParse({ locatorString: Selectors.adminSettings.generalSettings.globalTab.modeOfEntryInput, parsing: modeOfEntry}));

  const optionStatusLowerCase = selectedStatus.toLowerCase();
  const assertionMessage = optionStatusLowerCase === 'disabled' 
      ? `Mode of Entry: {${modeOfEntry}} is not yet disabled`
      : `Mode of Entry: {${modeOfEntry}} is not yet enabled`;

  await context().softAssert[optionStatusLowerCase === 'disabled' ? 'isFalse' : 'isTrue'](ele, assertionMessage);
});

Then(/^ui: I toggle Multi Assignment to "([^"]*)" in General settings global tab$/, async (toggleState: string) => {
  await $(Selectors.adminSettings.generalSettings.globalTab.multiAssignmentToggleButton).scrollIntoView();
  await browser.pause( SHORT_PAUSE);
  const color = (await getElementBackgroundColor(Selectors.adminSettings.generalSettings.globalTab.multiAssignmentToggleButton)).toString();
  if (color == GenericColorCodes.ToggleOFF && toggleState == ToggleStates.On) {
    await clickToElement(Selectors.adminSettings.generalSettings.globalTab.multiAssignmentToggleButton);
  } else if (color != GenericColorCodes.ToggleOFF && toggleState == ToggleStates.Off) {
    await clickToElement(Selectors.adminSettings.generalSettings.globalTab.multiAssignmentToggleButton);
  }
});