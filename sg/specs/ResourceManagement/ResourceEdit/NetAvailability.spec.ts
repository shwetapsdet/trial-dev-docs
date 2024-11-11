/* eslint-disable max-len */
import { Then } from '@cucumber/cucumber';
import { elementParse, clickToElement, mayBeElement, slowInputFilling, locatorParse, isElementDisplayed, element, elementParseAndClick, clearTextUsingBackspace, hitTab, elementGetText, } from '../../../../../core/func';
import { waitForFileToDownload } from '../../../../../core/fileUtilities';
import Selectors from '../../../../../core/selectors';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
import { context } from '../../../../../utils/context';
import DateTime from '../../../../../core/datetime';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { ResourceGrid } from '../../../../../helpers/ResourceManagement/ResourceManagementGrid.helper';
import { GeneralSettings } from '../../../../../core/enums';
import * as path from 'path';
import * as moment from 'moment'
import { assert } from 'chai';


Then(/^ui: I select specific option "([^"]*)" in availability dropdown in netavailability tab$/, async (availabilityOption: string) => {
  await clickToElement(Selectors.resourceManagement.netAvailability.availabilityDropdown);
  await browser.pause(SHORT_PAUSE); //Required to display dropdown options
  const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: availabilityOption });
  await ele.click();
});

Then(/^ui: I verify specific option "([^"]*)" is displayed in availability dropdown in netavailability tab$/, async (availabilityOption: string) => {
  const options: string[] = availabilityOption.split(',');
  for (let i = 0; i < options.length; i++) {
    const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: options[i] });
    await expect(await ele).toBeDisplayed();
  }
});

Then('ui: I click on availability dropdown in netavailability tab', async () => {
  await clickToElement(Selectors.resourceManagement.netAvailability.availabilityDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open availability dropdown
});

Then('ui: I verify options is not displayed in netavailability tab', async () => {
  await expect(await mayBeElement(Selectors.resourceManagement.netAvailability.btnOptions)).toBeFalsy();
});

Then('ui: I verify options is displayed in netavailability tab', async () => {
  await expect(await element(Selectors.resourceManagement.netAvailability.btnOptions)).toBeDisplayed();
});

Then('ui: I click on options button in netavailability tab', async () => {
  await clickToElement(Selectors.resourceManagement.netAvailability.btnOptions);
});

Then('ui: I verify overlay heatmap is displayed in netavailability tab', async () => {
  await expect(await element(Selectors.resourceManagement.netAvailability.overlayHeatmapInOptions)).toBeDisplayed();
});

Then('ui: I verify show only is displayed in netavailability tab', async () => {
  await expect(await element(Selectors.resourceManagement.netAvailability.showOnlyInOptions)).toBeDisplayed();
});

Then('ui: I verify overlay heatmap is not displayed in netavailability tab', async () => {
  await expect(await mayBeElement(Selectors.resourceManagement.netAvailability.overlayHeatmapInOptions, MEDIUM_PAUSE)).toBeFalsy();
});

Then('ui: I close options overlay in netavailability tab', async () => {
  //This is bound to fail as dev's are still decided wheter to use overlays or not
  // await clickToElement(Selectors.resourceManagement.netAvailability.closeOptionsOverlay);
  await clickToElement(Selectors.resourceManagement.netAvailabilityTab);
});

Then('ui: I search for resource created using model in RM netavailability tab', async () => {
  const { name } = context().resourceSetup;
  const txtQuickSearchElement = await element(Selectors.projectManagement.common.txtQuickSearch);
  await clearTextUsingBackspace(txtQuickSearchElement);
  await txtQuickSearchElement.setValue(name);
  await browser.pause(SHORT_PAUSE);
});

Then(/^ui: I select plan type "([^"]*)" in RM netavailability tab$/, async (planType: string) => {
  await clickToElement(Selectors.resourceManagement.netAvailability.ddPlanTypeDropdownInNetAvailabilityTab);
  await browser.pause(SHORT_PAUSE); //Required to display dropdown options
  const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: planType });
  await ele.click();
});

Then(/^ui: I select assignment type "([^"]*)" in RM netavailability tab$/, async (assignmentType: string) => {
  await clickToElement(Selectors.resourceManagement.netAvailability.ddAssignmentTypeDropdownInNetAvailabilityTab);
  await browser.pause(SHORT_PAUSE); //Required to display dropdown options
  const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: assignmentType });
  await ele.click();
});

Then('ui: I enter current year start and end date in RM netavailability tab', async () => {
  const startDt = DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat);
  const endDt = DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat);
  await slowInputFilling(Selectors.resourceManagement.netAvailability.txtStartDateInNetAvailabilityTab, startDt);
  await hitTab();
  await slowInputFilling(Selectors.resourceManagement.netAvailability.txtEndDateInNetAvailabilityTab, endDt);
  await hitTab();
});

Then('ui: I clear filters in RM netavailability tab', async () => {
  await (await element(Selectors.resourceManagement.grid.txtQuickSearch)).waitForClickable();
  const clearFilterButtonDisplayed = await isElementDisplayed(Selectors.common.btnClearFilter, SHORT_PAUSE * 2);
  if (clearFilterButtonDisplayed) {
    await clickToElement(Selectors.common.btnClearFilter);
  }
});

Then(/^ui: I click on specific unit "([^"]*)" and verify column index "([^"]*)" value "([^"]*)" is displayed in RM netavailability tab$/, async (units: string, columnIndex: string, value: string) => {
  const unit: string[] = units.split(',');
  for (let i = 0; i < unit.length; i++) {
    const ele1 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.specificUnitTabInNetAvailabilityTab, parsing: unit[i] });
    await ele1.click();
    await browser.pause(SHORT_PAUSE); //Required to load the values
    const ele2 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.columnIndexInNetAvailabilityTab, parsing: columnIndex });
    await expect(ele2).toHaveTextContaining(value);
  }
});

Then(/^ui: I click on specific unit "([^"]*)" in RM netavailability tab$/, async (units: string) => {
  const unit: string[] = units.split(',');
  for (let i = 0; i < unit.length; i++) {
    const ele1 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.specificUnitTabInNetAvailabilityTab, parsing: unit[i] });
    await ele1.click();
    await browser.pause(SHORT_PAUSE); //Required to load the values
  }
});

Then(/^ui: I select specific date mode "([^"]*)" and verify column index "([^"]*)" value "([^"]*)" is displayed in RM netavailability tab$/, async (dateModes: string, columnIndex: string, values: string) => {
  const mode: string[] = dateModes.split(',');
  const value: string[] = values.split(',');
  for (let i = 0; i < mode.length; i++) {
    await clickToElement(Selectors.resourceManagement.netAvailability.ddDateModeDropdownInNetAvailabilityTab);
    await browser.pause(SHORT_PAUSE); //Required to display dropdown options
    const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: mode[i] });
    await ele.click();
    await browser.pause(SHORT_PAUSE); //Required to load the values
    const actualText = await elementGetText(locatorParse(Selectors.resourceManagement.netAvailability.columnIndexInNetAvailabilityTab, columnIndex));
    await assert.equal(actualText, value[i], `Column: {${columnIndex}} has incorrect value in RM netavailability tab when date mode is: {${mode[i]}}`);
  }
});

Then(/^ui: I select specific date mode "([^"]*)" in RM netavailability tab$/, async (dateModes: string) => {
  const mode: string[] = dateModes.split(',');
  for (let i = 0; i < mode.length; i++) {
    await clickToElement(Selectors.resourceManagement.netAvailability.ddDateModeDropdownInNetAvailabilityTab);
    await browser.pause(SHORT_PAUSE); //Required to display dropdown options
    const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: mode[i] });
    await ele.click();
  }
});

Then('ui: I click on quick filter icon in RM netavailability tab', async () => {
  await clickToElement(Selectors.common.btnQuickFilter);
});

Then('ui: I verify all quick filter options are displayed in RM netavailability tab', async () => {
  const cpaQuickFilters: string[] = ["Current Qtr", "Next Qtr", "Current Year", "Next Year", "YTD", "3 Years"];
  for (let i = 0; i < cpaQuickFilters.length; i++) {
    context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, cpaQuickFilters[i])), `Quick filter:{${cpaQuickFilters[i]} was not displayed in NA of RM Grid`);
  }
});

Then(/^ui: I click on individual quick filter options and validate resource created using model, start date and end date in RM netavailability tab$/, async () => {
  const resourceName = context().resourceSetup.name;
  const quickFilters: string[] = ["Current Qtr", "Next Qtr", "Current Year", "Next Year", "YTD", "3 Years"];
  const expectedStartDate: string[] = [
    DateTime.getCurrentQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextQtrStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearStartDate(GeneralSettingsDefaultValues.global.dateFormat)
  ];

  const expectedEndDate: string[] = [
    DateTime.getCurrentQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextQtrEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getCurrentYearEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNextYearEndDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getTodaysDate(GeneralSettingsDefaultValues.global.dateFormat),
    DateTime.getNthYearStartDateFromCurrentYear(GeneralSettingsDefaultValues.global.dateFormat, 3)
  ];

  for (let i = 0; i < quickFilters.length; i++) {
    await browser.pause(SHORT_PAUSE);
    if(!(await isElementDisplayed(await locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, quickFilters[i])))) {
      await clickToElement(Selectors.common.btnQuickFilter);
      await browser.pause(SHORT_PAUSE);
    };
    await clickToElement(locatorParse(Selectors.common.btnCommonQuickFilterOptionsInCPA, quickFilters[i]));
    await browser.pause(SHORT_PAUSE); // Required to display the date in UI
    const actualStartDate = await (await element(Selectors.resourceManagement.netAvailability.txtStartDateInNetAvailabilityTab)).getValue();
    context().softAssert.equal(actualStartDate, expectedStartDate[i], `Start date in NA of RM Grid was incorrect when quick filter:{${quickFilters[i]}} was selected`);

    const actualEndDate = await (await element(Selectors.resourceManagement.netAvailability.txtEndDateInNetAvailabilityTab)).getValue();
    context().softAssert.equal(actualEndDate, expectedEndDate[i], `End date in NA of RM Grid was incorrect when quick filter:{${quickFilters[i]}} was selected`);
    context().softAssert.isTrue(await isElementDisplayed(locatorParse(Selectors.resourceManagement.netAvailability.resourceNameInNetAvailabilityTab, resourceName), MEDIUM_PAUSE), `Resource:{${resourceName} was not displayed in NA of RM Grid when quick filter:{${quickFilters[i]}} was applied}`);
  }
});

Then(/^ui: I click on specific column index "([^"]*)" in RM netavailability tab$/, async (columnIndex: string) => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.columnIndexInNetAvailabilityTab, parsing: columnIndex });
  await ele.doubleClick();
  await browser.pause(SHORT_PAUSE); //Required to load the popup
});

Then('ui: I click on specific project name created using model in allocation popup in RM netavailability tab', async () => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameInAllocationPopupInNetAvailabilityTab, parsing: context().projectSetup.name });
  await ele.click();
  await browser.pause(SHORT_PAUSE); //Required to load the popup
});

Then('ui: I verify specific project name created using model is displayed in allocation popup in RM netavailability tab', async () => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameInAllocationPopupInNetAvailabilityTab, parsing: context().projectSetup.name });
  await expect(ele).toBeDisplayed();
});

Then('ui: I verify specific resource created using model is displayed in netavailability tab', async () => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.resourceNameInNetAvailabilityTab, parsing: context().resourceSetup.name });
  await expect(ele).toBeDisplayed();
});


Then(/^ui: I verify allocation hours "([^"]*)" is displayed in allocation popup in RM netavailability tab$/, async (allocationHours: string) => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.allocationHoursInAllocationPopupInNetAvailabilityTab, parsing: allocationHours });
  await expect(ele).toBeDisplayed();
});

Then(/^ui: I verify utilization "([^"]*)" is displayed in allocation popup in RM netavailability tab$/, async (utilization: string) => {
  const ele = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.utilizationInAllocationPopupInNetAvailabilityTab, parsing: utilization });
  await expect(ele).toBeDisplayed();
});

Then('ui: I mouse hower project name created using model in allocation popup and verify hyperlink tooltip in RM netavailability tab', async () => {
  const { name } = context().projectSetup;

  const ele1 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameInAllocationPopupInNetAvailabilityTab, parsing: name });
  await ele1.moveTo();
  await browser.pause(SHORT_PAUSE); //Required to mouse hower and see the element

  const ele2 = await isElementDisplayed(locatorParse(Selectors.resourceManagement.netAvailability.projectNameTooltipInAllocationPopupInNetAvailabilityTab, name));
  await assert.isTrue(ele2, `Project: {${name}} was not displayed in tooltip of RM netavailability tab`);
});

Then('ui: I mouse hower project name created using model in allocation popup and verify copy link in RM netavailability tab', async () => {
  const { name } = context().projectSetup;
  const ele1 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameInAllocationPopupInNetAvailabilityTab, parsing: name });
  await ele1.moveTo();
  await browser.pause(SHORT_PAUSE); //Required to mouse hower and see the element
  const ele2 = await isElementDisplayed(locatorParse(Selectors.resourceManagement.netAvailability.projectNameCopyLinkInAllocationPopupInNetAvailabilityTab, name));
  await assert.isTrue(ele2, `Project: {${name}}'s Copy link icon was not displayed in tooltip of RM netavailability tab`);
});

Then('ui: I click and verify copied tooltip in allocation popup in RM netavailability tab', async () => {
  const ele1 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameInAllocationPopupInNetAvailabilityTab, parsing: context().projectSetup.name });
  await ele1.moveTo();
  await browser.pause(SHORT_PAUSE); //Required to mouse hower and see the element
  const ele2 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameCopyLinkInAllocationPopupInNetAvailabilityTab, parsing: context().projectSetup.name });
  await ele2.doubleClick();
  await browser.pause(SHORT_PAUSE);  //Required to display tooltip
  const ele3 = await elementParse({ locatorString: Selectors.resourceManagement.netAvailability.projectNameCopiedTooltipInAllocationPopupInNetAvailabilityTab, parsing: context().projectSetup.name });
  await expect(ele3).toBeDisplayed();
});

Then('ui: I click and verify export in RM netavailability tab', async () => {
  await clickToElement(Selectors.resourceManagement.netAvailability.btnExportInNetAvailabilityTab);
});

Then('ui: Clear filters if any in Net Availability section of RM Grid', async () => {
  await ResourceGrid.clearFiltersIfAny();
});

Then('ui: Ungroup groups if any in Net Availability section of RM Grid', async () => {
  await ResourceGrid.unGroupIfAny();
});

Then(/^ui: Search for recently created "(resource|resourceManager|timesheetApprover)" in Net Availability section of RM Grid$/, async (role: string) => {
  let username;
  switch (role) {
    case 'resource':
      username = context().resourceSetup.name;
      break;
    case 'resourceManager':
      username = context().resourceSetup.resourceManager.name;
      break;
    case 'timesheetApprover':
      username = context().resourceSetup.timesheetApprover.name;
      break;
    default: throw Error(`Role:{${role}} is not yet supported.\nPlease add if required\n`);
  }
  await slowInputFilling(Selectors.resourceManagement.grid.txtQuickSearch, username);
});

Then('ui: Select attributes created earlier in Net Availability section of RM Grid', async () => {
  let attributes;
  if (context().attributes === undefined) {
    attributes = context().resourceAttributes;
  } else {
    attributes = context().attributes;
  }
  await ResourceGrid.clickOnColumnsDropdown();
  await ResourceGrid.uncheckSelectAllCheckbox();
  for (const attribute of attributes) {
    await ResourceGrid.selectAttributesInColumnsOrGroupByDropdown(attribute.name);
  }
  await ResourceGrid.clickOnColumnsDropdown();
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to close and Column to appear
});

Then('ui: Verify Rich text in Net Availability section of RM Grid for recently created Cfs', async () => {
  const attributes = context().resourceAttributes;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = Selectors.projectManagement.grid.cfValueCellOfSpecificProject
      .replace('{{projectName}}', context().resourceSetup.name)
      .replace('{{attributeName}}', attribute.name);
    const richtextElement = await element(cellLocator + "/div[contains(@class,'grid-rich-text')]");
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of resource CF:{${attribute.name}} for resource:{${context().resourceSetup.name}} in Net Availability section of RM Grid was incorrect`, true);
  }
});

Then('ui: Click on Group By dropdown in Net Availability section of RM Grid', async () => {
  await clickToElement(Selectors.resourceManagement.netAvailability.groupByDropdown);
  await browser.pause(SHORT_PAUSE / 2);
});

Then('ui: Unselect select all checkbox in Group By dropdown in Net Availability section of RM Grid', async () => {
  await ResourceGrid.uncheckSelectAllCheckbox();
});

Then('ui: Select recently created resource CF in Net Availability section of RM Grid', async () => {
  await ResourceGrid.selectAttributesInColumnsOrGroupByDropdown(context().attributeSetup.name);
});

Then('ui: Click on expand icon of resource CF in Net Availability section of RM Grid', async () => {
  const { name } = context().attributeSetup;
  await clickToElement(locatorParse(Selectors.resourceManagement.netAvailability.expandIconOfCF, name));
});

Then('ui: Verify if Demand planning icon is displayed in Net Availability of RM Grid', async () => {
  const { name } = context().resourceSetup;
  const demandPlanningIconAgainstResourceNameDisplayed = await isElementDisplayed(locatorParse(Selectors.resourceManagement.netAvailability.demandPlanningIconAgainstResourceName, name));
  context().softAssert.isTrue(demandPlanningIconAgainstResourceNameDisplayed, `Demand Planning icon was not displayed in Net Availability of RM Grid for resource:{${name}}`);
});

Then(/^ui: Verify if "([^"]*)" columns have value:"([^"]*)" in Net Availability of RM Grid$/, async (numberOfColumnsToBeAsserted: number,
  expectedValue: string) => {
  for (let i = 0; i < numberOfColumnsToBeAsserted; i++) {
    const actualValue = (await (await element(locatorParse(Selectors.resourceManagement.netAvailability.cellValueByIndex, i + ""))).getText()).trim();
    context().softAssert.equal(actualValue, expectedValue, `Cell #${i} has incorrect value in Net Availability of RM Grid`);
  }
});

Then(/^ui: Click on specific unit "([^"]*)" in Net Availability of RM Grid$/, async (unitToBeClicked: string) => {
  switch (unitToBeClicked) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.Gantt:
    case GeneralSettings.Units.Manday:
      await elementParseAndClick(Selectors.resourceManagement.netAvailability.specificUnitTabLabel, unitToBeClicked);
      break;
    case GeneralSettings.Units.FTEPercent:
      await clickToElement(Selectors.resourceManagement.netAvailability.ftePercentTab);
      break;
    default: throw Error(`Incorrect unit:{${unitToBeClicked}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

Then('ui: I validate that I am on RM netavailability tab with search tab containing previously searched resource', async () => {
  const resourceName = context().resourceSetup.name;
  await clickToElement(Selectors.projectManagement.common.txtQuickSearch);
  await expect(await $(Selectors.projectManagement.common.txtQuickSearch)).toHaveValueContaining(resourceName);
});

Then('ui: Click on export icon in Net Availability section of RM', async () => {
  await clickToElement(Selectors.resourceManagement.netAvailability.exportIcon);
});

Then(/^ui: Softassert if Net Availability file got downloaded in directory:"([^"]*)" under project's root directory$/, async (folderName: string) => {
  const expectedFileName = `Net Availability - ${moment().format('MMM_DD_YYYY')}.csv`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then('ui: Un-select all attributes in Columns dropdown of Net Availability section of RM Grid', async () => {
  await ResourceGrid.clickOnColumnsDropdown();
  const eleSelectAllChk = await element(Selectors.resourceManagement.netAvailability.chkSelectAllCheckboxInColumnsDropdown);
  await eleSelectAllChk.click();
  if (await eleSelectAllChk.isSelected()) {
    await eleSelectAllChk.click();
  }
  await ResourceGrid.clickOnColumnsDropdown();
  await browser.pause(SHORT_PAUSE);//Needed for dropdown to close and Column to appear
});