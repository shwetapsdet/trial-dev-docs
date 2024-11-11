import { Then } from '@cucumber/cucumber';
import { clickToElement, formFill } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import DateTime from '../../../../../core/datetime';
import { context } from '../../../../../utils/context';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';

Then('ui: Add Milestone by entered name, description and current year start date', async () => {
  await clickToElement(Selectors.projectManagement.milestones.addMilestoneButton);
  await formFill([
    { locator: Selectors.projectManagement.milestones.milestoneName, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.milestones.milestoneName, value: context().milestoneSetup.name, action: 'setValue' },
    { locator: Selectors.projectManagement.milestones.milestoneDescription, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.milestones.milestoneDescription, value: context().milestoneSetup.description, action: 'setValue' },
    { locator: Selectors.projectManagement.milestones.milestoneDate, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.milestones.milestoneDate, value: DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat), action: 'setValue' },
    { locator: Selectors.projectManagement.milestones.createButton, value: null, action: 'click' },
  ]);
});