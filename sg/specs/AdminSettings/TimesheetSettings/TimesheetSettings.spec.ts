import { Given, Then } from "@cucumber/cucumber";
import { TimesheetSettings } from "../../../../../helpers/TimesheetSettings/TimesheetSettings.helper";
import { TimesheetSettingsDefaultValues } from "../../../../../data/timesheetSettings";
import { DEFAULT_STEP_TIMEOUT } from "../../../../../core/timeouts";
import { context } from '../../../../../utils/context';

Given('ui: Set all to automation defaults in Timesheet Settings', { timeout: (DEFAULT_STEP_TIMEOUT * 120) }, async () => {

  await TimesheetSettings.selectWeekStart(TimesheetSettingsDefaultValues.weekStart);

  await TimesheetSettings.selectNonWorkingDays(TimesheetSettingsDefaultValues.nonWorkingDays);

  await TimesheetSettings.selectDominantUnit(TimesheetSettingsDefaultValues.dominantUnit, TimesheetSettingsDefaultValues.hoursPerDayPerFTE);

  await TimesheetSettings.selectActiveUnits(TimesheetSettingsDefaultValues.activeUnits);

  await TimesheetSettings.toggleSaveApprovedTimesheetsToProjectActuals(TimesheetSettingsDefaultValues.saveApprovedTimesheetsToProjectActuals);

  await TimesheetSettings.toggleShowProjectAssignments(TimesheetSettingsDefaultValues.showProjectAssignments);

  await TimesheetSettings.toggleShowResourceRequestStatus(TimesheetSettingsDefaultValues.showResourceRequestStatus);

  await TimesheetSettings.toggleAllowTimesheetUsersToViewPlannedAllocations(TimesheetSettingsDefaultValues.allowTimesheetUsersToViewPlannedAllocations);

  await TimesheetSettings.toggleAllowTimesheetApproverToViewPlannedAllocations(TimesheetSettingsDefaultValues.allowTimesheetApproverToViewPlannedAllocations);

  await TimesheetSettings.toggleAllowTimesheetUsersToSeePeriodView(TimesheetSettingsDefaultValues.allowTimesheetUsersToSeePeriodView);

  await TimesheetSettings.toggleAllowTimesheetApproverToSeePeriodView(TimesheetSettingsDefaultValues.allowTimesheetApproverToSeePeriodView);

  await TimesheetSettings.clickOnSpecificTimesheetEntry(TimesheetSettingsDefaultValues.timesheetTimeEntry);

  await TimesheetSettings.toggleRestrictTimeEntryWhenCalendarsAreApplied(TimesheetSettingsDefaultValues.restrictTimeEntryWhenCalendarsAreApplied);

  await TimesheetSettings.toggleWriteWeekendDataIntoTheWorkWeek(TimesheetSettingsDefaultValues.writeWeekendDataIntoTheWorkWeek);

  await TimesheetSettings.toggleAutoOpenOrCloseBehavior(TimesheetSettingsDefaultValues.autoOpenOrCloseBehavior);

  await TimesheetSettings.toggleProjectOwnerApproval(TimesheetSettingsDefaultValues.projectOwnerApproval);

  await TimesheetSettings.selectSelfServiceTimesheetFlag(TimesheetSettingsDefaultValues.selfServiceTimesheetFlag);

  await TimesheetSettings.enterGenericTaskLabel(TimesheetSettingsDefaultValues.genericTaskLabel);

  await TimesheetSettings.enterMaximumHoursPerDay(TimesheetSettingsDefaultValues.maximumHoursPerDay);

  await TimesheetSettings.enterMaximumHoursPerTimesheet(TimesheetSettingsDefaultValues.maximumHoursPerTimesheet);

  await TimesheetSettings.enterMinimumHoursPerDay(TimesheetSettingsDefaultValues.minimumHoursPerDay);

  await TimesheetSettings.enterMinimumHoursPerTimesheet(TimesheetSettingsDefaultValues.minimumHoursPerTimesheet);

  await TimesheetSettings.selectMandatoryNotesForProjects(TimesheetSettingsDefaultValues.mandatoryNotesForProjects);

  await TimesheetSettings.selectAutoApproveForResources(TimesheetSettingsDefaultValues.autoApproveForResoruces);

  await TimesheetSettings.selectAllowAssignmentRequestsForProjects(TimesheetSettingsDefaultValues.allowAssignmentRequestsForProjects);

  await TimesheetSettings.selectHideProjectsFromTimesheet(TimesheetSettingsDefaultValues.hideProjectsFromTimesheet);

  await TimesheetSettings.toggleShowProjectAttribtues(TimesheetSettingsDefaultValues.showProjectAttributes);

  if (TimesheetSettingsDefaultValues.showProjectAttributes) {
    await TimesheetSettings.selectAvailableProjectAttributes(TimesheetSettingsDefaultValues.availableProjectAttributes);
  }

  await TimesheetSettings.selectAssignmentAttributes(TimesheetSettingsDefaultValues.assignmentAttributes);

  await TimesheetSettings.selectTimesheetAvailableViews(TimesheetSettingsDefaultValues.timesheetAvailableViews);

  await TimesheetSettings.clickOnSpecificDefaultView(TimesheetSettingsDefaultValues.defaultView);

  await TimesheetSettings.clickOnTimeSheetConfigSaveButtonAndWaitForItFinishLoading();
});

Then('ui: Click on Save button in Timesheet Settings and wait for loading to complete', async () => {
  await TimesheetSettings.clickOnTimeSheetConfigSaveButtonAndWaitForItFinishLoading();
});

Given('ui: Select recently created project in Allow assignment requests for projects dropdown of Timesheet Settings', async () => {
  await TimesheetSettings.selectAllowAssignmentRequestsForProjects([context().projectSetup.name]);
});

Given('ui: Select recently created CF in Self service timesheet flag dropdown of Timesheet Settings', async () => {
  await TimesheetSettings.selectSelfServiceTimesheetFlag(context().attributeSetup.name);
});

Given('ui: Select recently created project CFs in Available project attributes dropdown of Timesheet Settings', async () => {
  let attributes = [];
  for (let i = 0; i < context().projectAttributes.length; i++) {
    attributes.push(context().projectAttributes[i].name);
  }
  await TimesheetSettings.selectAvailableProjectAttributes(attributes);
});

Given('ui: Select recently created assignment CFs in Available assignment attributes dropdown of Timesheet Settings', async () => {
  let attributes = [];
  for (let i = 0; i < context().assignmentAttributes.length; i++) {
    attributes.push(context().assignmentAttributes[i].name);
  }
  await TimesheetSettings.selectAssignmentAttributes(attributes);
});
