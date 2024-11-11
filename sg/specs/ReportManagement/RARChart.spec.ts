import { Then } from "@cucumber/cucumber";
import {
  clickToElement,
  element,
  elementParseAndClick,
  locatorParse,
  slowInputFilling,
} from "../../../../core/func";
import { DateFormats } from "../../../../core/enums";
import Selectors from "../../../../core/selectors";
import { BuildTeam } from "../../../../helpers/ProjectManagement/ProjectEdit/BuildTeam.helper";
const moment = require("moment");
import { GeneralSettingsDefaultValues } from "../../../../data/generalSettings";
import { context } from "../../../../utils";
import { reportModel } from "../../../../models/ReportManagement.model";

Then("ui: I enter report name in RARchart", async () => {
  context().reportName = reportModel().name;
  await slowInputFilling(
    Selectors.reportManagement.txtReportName,
    context().reportName
  );
});

Then(
  "ui: Wait for Config tab to be clickable in RAR Chart section",
  async () => {
    await element(
      locatorParse(Selectors.reportManagement.pivotGrid.specificTab, "Config")
    );
  }
);

Then("ui: I click on config page", async () => {
  await clickToElement(
    locatorParse(Selectors.reportManagement.pivotGrid.specificTab, "Config")
  );
});

Then(
  /^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of Report Management$/,
  async (dateToBeEntered: string, monthName: string) => {
    let dateToEnteredAfterFormatting;
    switch (dateToBeEntered) {
      case "first":
        dateToEnteredAfterFormatting = moment(
          `${monthName} ${moment().year()}`,
          DateFormats.MonthYearFormat3
        )
          .startOf("month")
          .format(GeneralSettingsDefaultValues.global.dateFormat);
        break;
      case "last":
        dateToEnteredAfterFormatting = moment(
          `${monthName} ${moment().year()}`,
          DateFormats.MonthYearFormat3
        )
          .endOf("month")
          .format(GeneralSettingsDefaultValues.global.dateFormat);
        break;
      default:
        throw new Error(
          `Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`
        );
    }

    await BuildTeam.enterStartDateInOptionsSection(
      dateToEnteredAfterFormatting
    );
  }
);

Then(
  /^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of Report Management$/,
  async (dateToBeEntered: string, monthName: string) => {
    let dateToEnteredAfterFormatting;
    switch (dateToBeEntered) {
      case "first":
        dateToEnteredAfterFormatting = moment(
          `${monthName} ${moment().year()}`,
          DateFormats.MonthYearFormat3
        )
          .startOf("month")
          .format(GeneralSettingsDefaultValues.global.dateFormat);
        break;
      case "last":
        dateToEnteredAfterFormatting = moment(
          `${monthName} ${moment().year()}`,
          DateFormats.MonthYearFormat3
        )
          .endOf("month")
          .format(GeneralSettingsDefaultValues.global.dateFormat);
        break;
      default:
        throw new Error(
          `Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`
        );
    }

    await BuildTeam.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
  }
);

Then(
  /^ui: I select "(Allocation|Demand)" as Plan Type$/,
  async (planType: string) => {
    await elementParseAndClick(Selectors.reportManagement.rarChart.planOrAllocationType, planType);
  }
);

Then(
  /^ui: I select "(Planned|Actual|Remaining)" as Allocation Type$/,
  async (allocationType: string) => {
    await elementParseAndClick(Selectors.reportManagement.rarChart.planOrAllocationType, allocationType);
  }
);

Then(
  /^ui: I select "(Time|FTE|Cost|Manday)" in Values$/,
  async (value: string) => {
    await elementParseAndClick(Selectors.reportManagement.rarChart.valueChart, value);
  }
);

Then(/^ui: I select Group By "(Project|Resource)"$/, async (value: string) => {
  await elementParseAndClick(Selectors.reportManagement.rarChart.valueChart, value);
});

Then("ui: I select created attribute in Group by list", async () => {
  await clickToElement(Selectors.reportManagement.rarChart.groupBy);
  await clickToElement(Selectors.reportManagement.rarChart.attributeSelection); //static value
  await clickToElement(Selectors.reportManagement.rarChart.ddgroupByOpener);
  await clickToElement(Selectors.reportManagement.rarChart.selectAll);
});

Then("ui: I export the created report pdf", async () => {
  await clickToElement(Selectors.reportManagement.rarChart.exportReport);
});
