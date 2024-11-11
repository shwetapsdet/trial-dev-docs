import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { locatorParse } from '../../../../../core/func';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';


Then('ui: Set all to automation defaults in Resource Request tab of GS', async () => {

  const requireSelectionOfBooleanFieldToTriggerCheckbox = await $(
    Selectors.adminSettings.generalSettings.resourceRequestTab.allocationTriggerMode.requireSelectionOfBooleanFieldToTriggerCheckbox
  );
  const requireSelectionOfBooleanFieldToTriggerCheckboxSelectionState = await requireSelectionOfBooleanFieldToTriggerCheckbox.isSelected();

  if (GeneralSettingsDefaultValues.resourceRequest.allocationTriggerMode.requireBooleanAttributeToTriggerWorkflow) {
    if (!requireSelectionOfBooleanFieldToTriggerCheckboxSelectionState) {
      await requireSelectionOfBooleanFieldToTriggerCheckbox.click();
    }
  } else {
    if (requireSelectionOfBooleanFieldToTriggerCheckboxSelectionState) {
      await requireSelectionOfBooleanFieldToTriggerCheckbox.click();
    }
  }


  const rejectionStrategyCheckbox = await $(
    Selectors.adminSettings.generalSettings.resourceRequestTab.rejectionStrategyCheckbox
  );
  const rejectionStrategyCheckboxSelectionState = await rejectionStrategyCheckbox.isSelected();

  if (GeneralSettingsDefaultValues.resourceRequest.rejectionStrategy) {
    if (!rejectionStrategyCheckboxSelectionState) {
      await rejectionStrategyCheckbox.click();
    }
  } else {
    if (rejectionStrategyCheckboxSelectionState) {
      await rejectionStrategyCheckbox.click();
    }
  }

  const demandPlanningResourcesCheckbox = await $(Selectors.adminSettings.generalSettings.resourceRequestTab.allocationDataset.demandPlanningResourcesCheckbox)
  const demandPlanningResourcesCheckboxSelectionState = await demandPlanningResourcesCheckbox.isSelected();

  if (GeneralSettingsDefaultValues.resourceRequest.allocationDataset.demandPlanningResources) {
    if (!demandPlanningResourcesCheckboxSelectionState) {
      await demandPlanningResourcesCheckbox.click()
    }
  } else {
    if (demandPlanningResourcesCheckboxSelectionState) {
      await demandPlanningResourcesCheckbox.click()
    }
  }

  const namedResourcesCheckbox = await $(Selectors.adminSettings.generalSettings.resourceRequestTab.allocationDataset.namedResourcesCheckbox);
  const namedResourcesCheckboxSelectionState = await namedResourcesCheckbox.isSelected();

  if (GeneralSettingsDefaultValues.resourceRequest.allocationDataset.namedResources) {
    if (!namedResourcesCheckboxSelectionState) {
      await namedResourcesCheckbox.click();
    }
  } else {
    if (namedResourcesCheckboxSelectionState) {
      await namedResourcesCheckbox.click();
    }
  }

  for (const allowedWorkflows of GeneralSettingsDefaultValues.resourceRequest.allocationDataset.allowedResourceRequestWorkflows) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.resourceRequestTab.allocationDataset.allowedResourceRequestWorkflows, allowedWorkflows));
    if (!await el.isSelected()) {
      await el.click();
    }
  }

  for (const allowedWorkflows of GeneralSettingsDefaultValues.resourceRequest.demandDataset.allowedResourceRequestWorkflows) {
    const el = await $(locatorParse(Selectors.adminSettings.generalSettings.resourceRequestTab.demandDataset.allowedResourceRequestWorkflows, allowedWorkflows));
    if (!await el.isSelected()) {
      await el.click();
    }
  }

});
