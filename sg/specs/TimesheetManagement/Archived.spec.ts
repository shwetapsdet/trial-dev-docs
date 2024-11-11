import { Then } from "@cucumber/cucumber";
import * as moment from 'moment'
import DateTime from "../../../../core/datetime";
import { GeneralSettingsDefaultValues } from "../../../../data/generalSettings";
import { TimesheetManagement } from "../../../../helpers/TimesheetManagement/TimesheetManagement.helper";
import { DateFormats } from "../../../../core/enums";


Then(/^ui: Verify Timesheet of week number "([^"]*)" in the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year is present in archived section$/, async (weekNumber: number, monthName: string) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNames.findIndex(name => name === monthName);
  const weekStartDate = DateTime.getNthMondayOfSpecificMonth(weekNumber, monthIndex, moment().year());
  const dateObject = moment(weekStartDate, GeneralSettingsDefaultValues.global.dateFormat);
  const weekStartDateAsPerTimesheetManagement = dateObject.format(DateFormats.DayMonthYearFormat3);
  await TimesheetManagement.Archived.verifyIfSpecificTimesheetIsArchvied(weekStartDateAsPerTimesheetManagement);
});
