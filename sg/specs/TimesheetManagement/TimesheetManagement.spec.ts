import { Then } from "@cucumber/cucumber";
import * as moment from 'moment'
import DateTime from "../../../../core/datetime";
import { GeneralSettingsDefaultValues } from "../../../../data/generalSettings";
import { TimesheetManagement } from "../../../../helpers/TimesheetManagement/TimesheetManagement.helper";
import { context } from "../../../../utils/context";
import { DateFormats } from "../../../../core/enums";
import Selectors, { clickToElement, elementParseAndClick } from "../../../../core";
import { MEDIUM_PAUSE } from "../../../../core/timeouts";


Then(/^ui: Click on Timesheet of week number "([^"]*)" in the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Timesheet Manager Approval section$/, async (weekNumber: number, monthName: string) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNames.findIndex(name => name === monthName);
  const weekStartDate = DateTime.getNthMondayOfSpecificMonth(weekNumber, monthIndex, moment().year());
  const dateObject = moment(weekStartDate, GeneralSettingsDefaultValues.global.dateFormat);
  const weekStartDateAsPerTimesheetManagement = dateObject.format(DateFormats.DayMonthYearFormat3);
  await TimesheetManagement.TimesheetManagerApproval.clickOnPendingTimesheet(weekStartDateAsPerTimesheetManagement, context().resourceSetup.name);
});

Then('ui: Click on Approve button in edit pending timesheet page and wait for Timesheet Management title to appear', async () => {
  await TimesheetManagement.TimesheetManagerApproval.clickOnApproveButtonAndWaitForTimesheetManagementTitleToAppear();
});

Then('ui: Click on Archived tab in Timesheet Management', async () => {
  await TimesheetManagement.clickOnArchivedTab();
});

Then('ui: Click on Timesheet Manager Approval tab', async () => {
  await TimesheetManagement.clickOnTimesheetManagerApprovalTab();
});

Then(/^ui: Enter comments as:"([^"]*)" in a pending timesheet$/, async (commentsToBeEntered: string) => {
  await browser.pause(MEDIUM_PAUSE / 2);
  await TimesheetManagement.TimesheetManagerApproval.enterComments(commentsToBeEntered);
});

Then('ui: Click on Reject button and wait for Timesheet Management title to appear', async () => {
  await TimesheetManagement.TimesheetManagerApproval.clickOnRejectButtonAndWaitForTimesheetManagementTitleToAppear();
});


Then('ui: Verify No records element is displayed in Timesheet Management', async () => {
  await TimesheetManagement.verifyIfNoTimesheetsPendingApprovalIsDisplayed();
});

Then('ui: Click on Project Owner Approval tab', async () => {
  await TimesheetManagement.clickOnProjectOwnerApprovalTab();
});

Then(/^ui: Click on Timesheet of week number "([^"]*)" in the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Assignment Requests section$/, async (weekNumber: number, monthName: string) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNames.findIndex(name => name === monthName);
  const weekStartDate = DateTime.getNthMondayOfSpecificMonth(weekNumber, monthIndex, moment().year());
  const dateObject = moment(weekStartDate, GeneralSettingsDefaultValues.global.dateFormat);
  const weekStartDateAsPerTimesheetManagement = dateObject.format(DateFormats.DayMonthYearFormat3);
  await TimesheetManagement.AssignmentRequests.clickOnPendingTimesheet(weekStartDateAsPerTimesheetManagement, context().resourceSetup.name);
});

Then('ui: Click on Assignment Requests tab in Timesheet Management', async () => {
  await TimesheetManagement.clickOnAssignmentRequestsTab();
});

Then('ui: Select checkbox of recently created project\'s recently task in Edit Assignment Request page in Timesheet Management', async () => {
  await TimesheetManagement.AssignmentRequests.selectCheckboxOfTaskOfSpecificProject(context().projectSetup.name, context().projectSetup.taskName);
});

Then('ui: Click on Approve button in edit Assignment Request page and wait for Timesheet Management title to appear', async () => {
  await TimesheetManagement.AssignmentRequests.clickOnApproveButtonAndWaitForTimesheetManagementTitleToAppear();
});

Then('ui: Open the newly added Timesheet from the available timesheets in the Timesheet Manager Approval section', async () => {
  await browser.pause(MEDIUM_PAUSE/2);
  await elementParseAndClick(Selectors.adminSettings.timesheetSettings.selectTimesheetByResourceName, context().resourceSetup.name);
})