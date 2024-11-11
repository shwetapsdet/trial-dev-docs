import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { clickToElement, elementParse, formFill, locatorParse, selectFromDropdown } from '../../../../../core/func';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';

Then('ui: Set all to automation defaults in BPA tab of GS', async () => {
  for (const mode of GeneralSettingsDefaultValues.bPA.activeAssignmentModes) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.bPATab.activeAssignmentModesCheckbox, mode));
    if (!await el.isSelected()) {
      await el.click();
    }
  }

  await selectFromDropdown({
    dropdownOpener: Selectors.adminSettings.generalSettings.bPATab.defaultAssignmentModeDropdown,
    dropdownSelection: locatorParse(Selectors.common.dropdownSpecificValue, GeneralSettingsDefaultValues.bPA.defaultAssignmentMode),
  });

  await formFill([
    { locator: Selectors.adminSettings.generalSettings.bPATab.selectAllLimit, value: null, action: 'clearValue' },
    { locator: Selectors.adminSettings.generalSettings.bPATab.selectAllLimit, value: GeneralSettingsDefaultValues.bPA.selectAllLimit, action: 'setValue' },
  ]);


  const showReadOnlyAssignmentsInput = await $(Selectors.adminSettings.generalSettings.bPATab.showReadOnlyAssignmentsInput);
  const showReadOnlyAssignmentsInputSelectionState = await showReadOnlyAssignmentsInput.isSelected();
  if (GeneralSettingsDefaultValues.bPA.showReadOnlyAssignments) {
    if (!showReadOnlyAssignmentsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.showReadOnlyAssignmentsToggleButton);
    }
  } else {
    if (showReadOnlyAssignmentsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.showReadOnlyAssignmentsToggleButton);
    }
  }

  const allowHidingTaskColumnInput = await $(Selectors.adminSettings.generalSettings.bPATab.allowHidingTaskColumnInput)
  const allowHidingTaskColumnInputSelectionState = await allowHidingTaskColumnInput.isSelected();

  if (GeneralSettingsDefaultValues.bPA.allowHidingTaskColumn) {
    if (!allowHidingTaskColumnInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.allowHidingTaskColumnToggleButton);
    }
  } else {
    if (allowHidingTaskColumnInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.allowHidingTaskColumnToggleButton);
    }
  }

  const showZeroAllocationAssignmentsInput = await $(Selectors.adminSettings.generalSettings.bPATab.showZeroAllocationAssignmentsInput);
  const showZeroAllocationAssignmentsInputSelectionState = await showZeroAllocationAssignmentsInput.isSelected();

  if (GeneralSettingsDefaultValues.bPA.showZeroAllocationAssignments) {
    if (!showZeroAllocationAssignmentsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.showReadOnlyAssignmentsToggleButton);
    }
  } else {
    if (showZeroAllocationAssignmentsInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.showReadOnlyAssignmentsToggleButton);
    }
  }

  const resourceReplaceInput = await $(Selectors.adminSettings.generalSettings.bPATab.resourceReplaceInput)
  const resourceReplaceInputSelectionState = await resourceReplaceInput.isSelected();
  if (GeneralSettingsDefaultValues.bPA.resourceReplace) {
    if (!resourceReplaceInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.resourceReplaceToggleButton);
    }
  } else {
    if (resourceReplaceInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.resourceReplaceToggleButton);
    }
  }


  const resourceReplaceAdvancedInput = await $(Selectors.adminSettings.generalSettings.bPATab.resourceReplaceAdvancedInput);
  const resourceReplaceAdvancedInputSelectionState = await resourceReplaceAdvancedInput.isSelected();
  if (GeneralSettingsDefaultValues.bPA.resourceReplaceAdvanced) {
    if (!resourceReplaceAdvancedInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.resourceReplaceAdvancedToggleButton);
    }
  } else {
    if (resourceReplaceAdvancedInputSelectionState) {
      await clickToElement(Selectors.adminSettings.generalSettings.bPATab.resourceReplaceAdvancedToggleButton);
    }
  }

});

