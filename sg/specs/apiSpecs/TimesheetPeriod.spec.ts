import { Given } from "@cucumber/cucumber";
import { context } from "../../../../utils/context";
import { TimesheetPeriodOperations } from "../../../../apiOperations/TimesheetPeriod.operations";
import DateTime from "../../../../core/datetime";
import { DateFormats } from "../../../../core/enums";

Given('api: Create default Timesheet periods for automation', async () => {
  //Creating periods for the month of Jan
  const mondays = DateTime.getAllMondayDatesFromSpecificMonthOfCurrentYear(1, DateFormats.YearMonthDayFormat1);
  const fridays = DateTime.getAllFridayDatesFromSpecificMonthOfCurrentYear(1, DateFormats.YearMonthDayFormat1);

  if (mondays.length > fridays.length) {
    fridays.push(DateTime.getAllFridayDatesFromSpecificMonthOfCurrentYear(2, DateFormats.YearMonthDayFormat1)[0]);
  }
  for (let i = 0; i < mondays.length; i++) {
    await TimesheetPeriodOperations.createPeriodIfItDoesNotExistAlready(context().user.baseUrl, context().token, "Jan Week " + (i + 1),
      mondays[i], fridays[i], true);
  }
});