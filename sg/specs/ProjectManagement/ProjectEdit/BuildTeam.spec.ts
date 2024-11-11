import { Then, When } from '@cucumber/cucumber';
import { clickToElement, element, elementParse, elementParseAndClick, findAndSetValue, formFill, hitEnter, isElementDisplayed, locatorParse, mayBeElement, slowInputFilling } from '../../../../../core/func';
import { DateFormats, GeneralSettings } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';
import { context } from "../../../../../utils/context";
import { BuildTeam } from '../../../../../helpers/ProjectManagement/ProjectEdit/BuildTeam.helper';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { assert } from 'chai';
const moment = require('moment');
import { Key } from 'webdriverio';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';

Then(/^ui: Verify if "([^"]*)" unit is selected in Build Team$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await elementParse({ locatorString: Selectors.projectManagement.buildTeam.specificUnitTabLabel, parsing: unitToBeVerified });
      await expect(await elementParse({ locatorString: Selectors.projectManagement.buildTeam.specificUnitTabInput, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await element(Selectors.projectManagement.buildTeam.fTEPercentTabLabel);
      await expect(await element(Selectors.projectManagement.buildTeam.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

When('ui: I create a new BuildTeam from project option by adding new resource', async () => {
  const { name } = context().resourceSetup;
  await findAndSetValue(Selectors.projectManagement.buildTeam.searchResourceInputBox, name);
  await browser.pause(1000);
  await clickToElement(Selectors.projectManagement.buildTeam.resourceCheckbox);
  await clickToElement(Selectors.projectManagement.buildTeam.btnSave);
});

Then('ui: I validate all resource are visible but only "View in List" resource are editable', async () => {
  await clickToElement('//a[text()="Administrator"]');
})

When(/^ui: Add recently created "(resource|resourceManager|timesheetApprover)" to build team$/, async (resourceType: string) => {
  let user = null;
  switch (resourceType) {
    case 'resource':
      user = context().resourceSetup.name;
      break;
    case 'resourceManager':
      user = context().resourceSetup.resourceManager;
      break;
    case 'timesheetApprover':
      user = context().resourceSetup.timesheetApprover;
      break;
    case 'administrator':
      user = 'Administrator';
      break;
    default:
      throw Error(`Resource type:${resourceType} is not supported`);
  }

  await BuildTeam.clickOnDownArrowIconToExpandTeam();
  await BuildTeam.clearFiltersIfAny();
  await BuildTeam.searchAndSelectResourceName(user);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Click on save button in Build Team and wait for it to be clickable', async () => {
  await BuildTeam.clickOnSaveButtonAndWaitForItToBeClickable();
});

Then('ui: Select resource attributes created earlier in Build Team', async () => {
  const attributes = context().resourceAttributes;
  await BuildTeam.clickOnInsertColumnsDropdown();
  await BuildTeam.uncheckSelectAllCheckbox();
  for (let i = 0; i < attributes.length; i++) {
    await BuildTeam.searchAndSelectColumns(attributes[i].name);
  }
  await BuildTeam.clickOnInsertColumnsDropdown();
});

Then('ui: Verify Rich text in Build Team for recently created resource Cfs', async () => {
  const attributes = context().resourceAttributes;
  const resourceName = context().resourceSetup.name;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    let cellLocator;
    cellLocator = (Selectors.projectManagement.buildTeam.specificCellByColumnNameOfResourceOrTaskInAllocationSection
      .replace('{{resourceName}}', resourceName)
      .replace('{{columnName}}', attribute.name)) + "/div[contains(@class,'grid-rich-text')]";
    const richtextElement = await element(cellLocator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of resource CF:{${attribute.name}} for resource:{${resourceName}} in Build Team's Grid was incorrect`, true);
  }
});

When(/^ui: Clear filters if any and search recently created "(resource|resourceManager|timesheetApprover)" in Build Team$/, async (resourceType: string) => {
  let user = null;
  switch (resourceType) {
    case 'resource':
      user = context().resourceSetup.name;
      break;
    case 'resourceManager':
      user = context().resourceSetup.resourceManager;
      break;
    case 'timesheetApprover':
      user = context().resourceSetup.timesheetApprover;
      break;
    default:
      throw Error(`Resource type:${resourceType} is not supported`);
  }
  await BuildTeam.clearFiltersIfAny();
  await BuildTeam.searchResourceName(user);
  await browser.pause(SHORT_PAUSE);
});

When(/^ui: Add attribute and its value as "([^"]*)" to Automatic Team Fields$/, async (value: string) => {
  await BuildTeam.selectAttributeAnditsValueInAutomaticAddResource(context().attribute1, value);
})

When('ui: I remove the newly added resource from the buildteam', async () => {
  const {
    name,
  } = context().resourceSetup;
  await elementParseAndClick(Selectors.projectManagement.buildTeam.automaticResourceAdd.removeResourceButton, name);
})

Then(/^ui: Observe that the resource is "(added|removed)" successfully into the BuildTeam$/, async (resourceStatus: string) => {
  const {
    name,
  } = context().resourceSetup;
  const ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.buildTeam.automaticResourceAdd.validateAutomaticAddedResource, name));
  if (resourceStatus == "added") {
    assert.isTrue(ele, `The resource ${name} is not added successfully from the auto add functionality in Build Team`)
  }
  else if (resourceStatus == "removed") {
    assert.isNotTrue(ele, `The resource ${name} is not removed successfully from the auto add functionality in Build Team`)
  }

  const elClose = await mayBeElement('//div[normalize-space(.)="Close" and @class="button-material"]');
  if (elClose) {
    await elClose.click();
  }
})

When('ui: I add Administrator resource to the BuildTeam', async () => {
  await findAndSetValue(Selectors.projectManagement.buildTeam.searchResourceInputBox, 'Administrator');
  await browser.pause(1000);
  await clickToElement(Selectors.projectManagement.buildTeam.resourceCheckbox);
  await clickToElement(Selectors.projectManagement.buildTeam.btnSave);
})

When('ui: Click on Auto-Add to Team button in Build Team section', async () => {
  await clickToElement(Selectors.projectManagement.buildTeam.automaticResourceAdd.autoAddToTeamButton);
});

Then(/^ui: I validate filter "([^"]*)" has correct filter options$/, async (filterName: string) => {
  let ele1: string;
  let myArray: any[];
  switch (filterName) {
    case 'Is Timesheet Approver':
    case 'Is Resource Manager':
    case 'Require Resource Manager Approval':
      myArray = ["is true", "is false"];
      for (let i = 0; i < 2; i++) {
        ele1 = locatorParse(Selectors.projectManagement.buildTeam.validateFilterOptions.replace('optionName', myArray[i]), filterName);
        const ele = await isElementDisplayed(ele1)
        assert.isTrue(ele, `Filter option "${myArray[i]}" is not present for filter ${filterName}`);
      };
      break;
    case 'Timesheet Approver':
      myArray = ["is set", "is not set", "belongs to", "doesn’t belong to"];
      for (let i = 0; i < 4; i++) {
        ele1 = locatorParse(Selectors.projectManagement.buildTeam.validateFilterOptions.replace('optionName', myArray[i]), filterName);
        const ele = await isElementDisplayed(ele1)
        assert.isTrue(ele, `Filter option "${myArray[i]}" is not present for filter ${filterName}`);
      };
      break;
    case 'Resource Managers':
      myArray = ["is set", "is not set", "belongs to all", "belongs to any", "doesn’t belong to"];
      for (let i = 0; i < 5; i++) {
        ele1 = locatorParse(Selectors.projectManagement.buildTeam.validateFilterOptions.replace('optionName', myArray[i]), filterName);
        const ele = await isElementDisplayed(ele1)
        assert.isTrue(ele, `Filter option "${myArray[i]}" is not present for filter ${filterName}`);
      };
      break;
    default:
      throw new Error("The selected Filter Name is not present right now");
  }
});

Then('ui: I validate recently created resource name is present inside resource merge list in Build Team', async () => {
  const {
    name,
  } = context().resourceSetup;
  const ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.buildTeam.automaticResourceAdd.validateResourceInMergeModel, name));
  assert.isTrue(ele, `The resource name '${name}' is not present in the merge list to be added in Build Team`);
});

Then('ui: I click on merge button', async () => {
  await clickToElement(Selectors.projectManagement.buildTeam.automaticResourceAdd.mergeBUtton);
});


Then('ui: Click on Options button in NA', async () => {
  await clickToElement(Selectors.projectManagement.buildTeam.btnOption);
});

Then('ui: Close Options section in NA', async () => {
  await browser.keys(Key.Escape);
  await browser.pause(SHORT_PAUSE / 2);//Needed for modal to close
});

Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BuildTeam.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BuildTeam.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Verify end date is "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA$/, async (dateToBeVerified: string, monthName: string) => {
  let expectedDate;
  switch (dateToBeVerified) {
    case "first":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeVerified:${dateToBeVerified} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  const actualEndDate = await (await element(Selectors.projectManagement.buildTeam.gridOptions.endDateInputbox)).getValue();
  await assert.equal(actualEndDate, expectedDate, "End date of 'Date Range Filter' in Grid options of NA was incorrect");
});


Then('ui: Clear dates of Date Range Filter in Grid options of NA', async () => {
  await BuildTeam.enterStartDateInOptionsSection('');
  await BuildTeam.enterEndDateInOptionsSection('');
});


Then('ui: Verify dates of Date Range Filter in Grid options of NA are empty', async () => {
  const actualEndDate = await (await element(Selectors.projectManagement.buildTeam.gridOptions.endDateInputbox)).getValue();
  const actualStartDate = await (await element(Selectors.projectManagement.buildTeam.gridOptions.startDateInputbox)).getValue();

  await assert.equal(actualStartDate, '', "Start date of 'Date Range Filter' in Grid options of NA was not empty");
  await assert.equal(actualEndDate, '', "End date of 'Date Range Filter' in Grid options of NA was not empty");

});

Then(/^ui: Enter start date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of previous year in Grid options of NA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().subtract(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BuildTeam.enterStartDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Enter end date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of next year in Grid options of NA$/, async (dateToBeEntered: string, monthName: string) => {
  let dateToEnteredAfterFormatting;
  switch (dateToBeEntered) {
    case "first":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().add(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      dateToEnteredAfterFormatting = moment(`${monthName} ${moment().add(1, 'year').format(DateFormats.YearFormat1)}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeEntered:${dateToBeEntered} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  await BuildTeam.enterEndDateInOptionsSection(dateToEnteredAfterFormatting);
});

Then(/^ui: Verify start date is "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA$/, async (dateToBeVerified: string, monthName: string) => {
  let expectedDate;
  switch (dateToBeVerified) {
    case "first":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).startOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    case "last":
      expectedDate = moment(`${monthName} ${moment().year()}`, DateFormats.MonthYearFormat3).endOf('month').format(GeneralSettingsDefaultValues.global.dateFormat);
      break;
    default:
      throw new Error(`Value for arguement dateToBeVerified:${dateToBeVerified} is not yet supported.\nPlease add supporte if required...\nSupported Values:\n1.first\n2.last`);
  }

  const actualDate = await (await element(Selectors.projectManagement.buildTeam.gridOptions.startDateInputbox)).getValue();

  await assert.equal(actualDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
});

Then(/^ui: Verify start date is "first" of the month "Jan" of current year in Grid options of NA in RR$/, async () => {
  let expectedDate;
      expectedDate = '01.01.2024'
  const actualDate = await (await element(Selectors.projectManagement.buildTeam.gridOptions.startDateInputbox)).getValue();
  await assert.equal(actualDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
});

Then(/^ui: Verify end date is "last" of the month "Dec" of current year in Grid options of NA in RR$/, async () => {
  let expectedDate;
      expectedDate = '31.12.2024'
  const actualDate = await (await element(Selectors.projectManagement.buildTeam.gridOptions.endDateInputbox)).getValue();
  await assert.equal(actualDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
});

Then(/^ui: Verify start date is month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA$/,async (monthName: string) => {
  let expectedDate = moment(`${monthName} ${moment().year()}`, "MMM YY").startOf('month').format("MMM");
  const actualEndDate = await (await elementParse({locatorString: Selectors.projectManagement.buildTeam.netAvailability.startMonth, parsing: monthName})).getValue();
  // await assert.equal(actualEndDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
  expect(actualEndDate).toEqual(expectedDate);
});

Then(/^ui: Verify end date is month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in Grid options of NA$/,async (monthName: string) => {
  let expectedDate = moment(`${monthName} ${moment().year()}`, "MMM YY").startOf('month').format("MMM");
  const actualEndDate = await (await elementParse({locatorString: Selectors.projectManagement.buildTeam.netAvailability.endMonth,parsing: monthName})).getValue();
  // await assert.equal(actualEndDate, expectedDate, "Start date of 'Date Range Filter' in Grid options of NA was incorrect");
  expect(actualEndDate).toEqual(expectedDate);
});

Then('ui: I click on dynamic date options',async() => {
  await clickToElement(Selectors.projectManagement.buildTeam.gridOptions.btnDynamic)
});

Then(/^ui: Select option "([^"]*)" and check net availability grid$/,async (dateOptions: string) => {
  await elementParseAndClick(Selectors.projectManagement.buildTeam.gridOptions.btn.txtDynamicDate, dateOptions)
});

Then('ui: I validate date is set automatically to current qtr of the month', async () => {
  const endOfQtr = moment().endOf('quarter').format(GeneralSettingsDefaultValues.global.dateFormat2);
  await browser.pause(MEDIUM_PAUSE);
  // The selector has high posibility of changing, so no need to add that into selector file
  const el2 = await element('(//div[@class="header-content"]//span[@title])[4]');
  const endDate = await el2.getText();
  await expect(endDate).toContain(endOfQtr);
});

Then('ui: I validate date is set automatically to next qtr of the month', async () => {
  const nextQtrEndOfTheMonth = moment().add({ quarter: 1 }).endOf('quarter').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('//div[@class="rgHeaderCell"]//div/span')
  const endDate = await el.getText();
  expect(endDate).toContain(nextQtrEndOfTheMonth);
});

Then('ui: I validate date is set automatically to end of the year', async () => {
  const endOfTheYear = moment().endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('(//div[@class="rgHeaderCell"]//div/span)[12]')
  const endDate = await el.getText();
  expect(endDate).toEqual(endOfTheYear);
});

Then('ui: I validate date is set automatically to next year end of the year', async () => {
  const nextYearEnd = moment().add({ year: 1 }).endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('//div[@class="rgHeaderCell"]//div/span')
  const endDate = await el.getText();
  expect(endDate).toEqual(nextYearEnd);
});

Then('ui: I validate date is set automatically to next three year end of the year', async () => {
  const nextThreeYearEnd = moment().add({ year: 3 }).endOf('year').format(GeneralSettingsDefaultValues.global.dateFormat2);
  const el = await element('//div[@class="rgHeaderCell"]//div/span')
  const endDate = await el.getText();
  expect(endDate).toEqual(nextThreeYearEnd);
});

Then('ui: I cancel the resource replace',async() => {
  await clickToElement(Selectors.projectManagement.buildTeam.btnCancel)
})

Then('ui: I select Administrator resource and click on edit button',async() => {
  let el;
  await formFill([ 
  { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'click' },
  { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value: null, action: 'clearValue' },
  { locator: Selectors.projectManagement.sPA.typeANewResourceInputBoxInAllocationSection, value:'Administrator', action: 'setValue' },
])
await browser.pause(SHORT_PAUSE);
await hitEnter();
await browser.pause(SHORT_PAUSE);
el = await elementParse({ locatorString: Selectors.projectManagement.sPA.editResourceInAllocationSection, parsing:'Administrator' });
  await browser.execute("arguments[0].click();", el);

});

Then('ui: I click on edit button of specific resource',async() => {
  const resourceName = context().resourceSetup.name;
  let el;
  el = await elementParse({locatorString: Selectors.projectManagement.buildTeam.btnEditResource, parsing:resourceName});
  await browser.execute("arguments[0].click();", el);
});

Then('ui: I click on Resource Replace Advanced',async() => {
  await clickToElement(Selectors.projectManagement.buildTeam.btnResourceReplaceAdvance)
});

Then('ui: I click on the project',async() => {
  const projectName = context().projectSetup.name;
  await elementParseAndClick(Selectors.projectManagement.buildTeam.projectName,projectName)
});

Then(/^ui: I select specific date mode "([^"]*)" in NA$/, async (dateMode: string) => {
  await clickToElement(Selectors.projectManagement.buildTeam.netAvailability.periodDropDown)
  await elementParseAndClick(Selectors.projectManagement.buildTeam.netAvailability.periodValue, dateMode);
});