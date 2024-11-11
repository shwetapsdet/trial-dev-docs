import { Then } from '@cucumber/cucumber';
import { clickToElement, element, elementParse, elementParseAndClick, getCurrencySymbol, hitEnter, locatorParse, slowInputFilling } from '../../../../core/func';
import { DateFormats, GeneralSettings } from '../../../../core/enums';
import Selectors from '../../../../core/selectors';
import { context } from '../../../../utils/context';
import { SHORT_PAUSE } from '../../../../core/timeouts';
import * as moment from 'moment'

Then(/^ui: Verify if "([^"]*)" unit is selected in Resource Request Edit$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await expect(await elementParse({ locatorString: Selectors.resourceRequests.editResourceRequest.specificUnitTabInput, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await expect(await element(Selectors.resourceRequests.editResourceRequest.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.FTE %\n4.Manday`);
  }
});

Then(/^ui: I verify specific status "([^"]*)" button is displayed in Resource Request view$/, async (rrStatus: string) => {
  await expect(await elementParse({ locatorString: Selectors.resourceRequests.editResourceRequest.specificRRStatusButton, parsing: rrStatus })).toBeDisplayed();
});

Then('ui: I click on specific project in Resource Request view', async () => {
  await elementParseAndClick(Selectors.resourceRequests.editResourceRequest.specificProjectInRRView, context().projectSetup.name);
});

Then('ui: I specific project lock icon is displayed in Resource Request', async () => {
  await expect(await elementParse({ locatorString: Selectors.resourceRequests.editResourceRequest.specificProjectLockIcon, parsing: context().projectSetup.name })).toBeDisplayed();
});

Then('ui: Search and Select resource attributes created earlier in edit Resource request page', async () => {
  let attributes = [];

  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.insertColumnsDropdown);
  await browser.pause(SHORT_PAUSE);
  const eleSelectAllChk = await element(Selectors.projectManagement.sheets.selectAllGroupByCheckbox);
  await eleSelectAllChk.click();
  if (await eleSelectAllChk.isSelected()) {
    await eleSelectAllChk.click();
  }
  if (context().resourceAttributes != undefined) {
    attributes = context().resourceAttributes;
    for (let i = 0; i < attributes.length; i++) {
      await slowInputFilling(Selectors.resourceRequests.searchRequest,attributes[i].name)
      await browser.pause(SHORT_PAUSE); //Required to display the values
      const ele = await elementParse({ locatorString: Selectors.common.dropdownSpecificValue, parsing: attributes[i].name });
      if (!await ele.isSelected()) {
        await ele.click();
      }
    }
  }
  await clickToElement(Selectors.bulkProjectAllocationFlatgrid.insertColumnsDropdown);
});

Then('ui: Verify Rich text in edit Resource request page for recently created resource Cfs', async () => {
  let attributes = [];
  if (context().resourceAttributes !== undefined) {
    attributes = context().resourceAttributes;
  }
  const resourceName = context().resourceSetup.name;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = (Selectors.bulkProjectAllocationFlatgrid.resourceReplaceAdvanced.specificCellOfResourceByColumnName
      .replace('{{resourceName}}', resourceName)
      .replace('{{columnName}}', attribute.name)) + "/div[contains(@class,'grid-rich-text')]";
    const richtextElement = await element(cellLocator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await Promise.all(elements.map(element => element.getHTML()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of resource CF:{${attribute.name}} for resource:{${resourceName}} in edit Resource request page was incorrect`, true);
  }

  if (context().assignmentAttributes !== undefined) {
    attributes = context().assignmentAttributes;
  }

  await clickToElement(Selectors.resourceRequests.editResourceRequest.assignmentAttributesHeading);
  await browser.pause(SHORT_PAUSE / 2);

  await clickToElement(locatorParse(Selectors.resourceRequests.editResourceRequest.assignmentAttributesSectionName, "Required Fields"));
  await browser.pause(SHORT_PAUSE / 2);

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const cellLocator = (Selectors.resourceRequests.editResourceRequest.assignmentCFValue)
      .replace('{{sectionName}}', "Required Fields")
      .replace('{{attributeName}}', attribute.name);
    const richtextElement = await element(cellLocator);
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await Promise.all(elements.map(element => element.getHTML()));
    await context().softAssert.equal(actualHTMLElements, "", `Rich text of assignment CF:{${attribute.name}} in section:"Required Fields" in edit Resource request page was incorrect`);
  }

});

Then(/^ui: I click on specific RR status "([^"]*)" in Resource Request$/, async (rrStatus: string) => {
  await elementParseAndClick(Selectors.resourceRequests.editResourceRequest.specificRRStatusButton, rrStatus);
});

Then('ui: I click on apply changes button in Resource Request', async () => {
  await clickToElement(Selectors.resourceRequests.editResourceRequest.btnApplyChanges);
});

Then(/^ui: Enter "([^"]*)" hours for resource in Month mode for current year in Edit RR page$/, async (hoursToBeAllocated: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().resourceSetup.name);
  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  for (let i = 0; i < betweenMonths.length; i++) {
    let specificProjectOrResourceOrTaskCellByIndex = locatorParse(locator, betweenMonths[i]);
    await clickToElement(specificProjectOrResourceOrTaskCellByIndex);
    await browser.pause(SHORT_PAUSE / 5);
    await browser.keys(hoursToBeAllocated);
    await browser.pause(SHORT_PAUSE / 5);
    await hitEnter();
  }
});

Then(/^ui: Verify if all cells for resource in Month mode for current year has value "([^"]*)" in Edit RR page$/, async (expectedValue: string) => {
  const locator = Selectors.bulkResourceCapacities.specificResourceCellByColumnName.replace('{{resourceName}}', context().resourceSetup.name);
  const startDate = moment().startOf('year');
  const endDate = moment().endOf('year');
  const betweenMonths = [];
  if (startDate < endDate) {
    const date = startDate.startOf('month');
    while (date < endDate.endOf('month')) {
      betweenMonths.push(date.format(DateFormats.MonthYearFormat2));
      date.add(1, 'month');
    }
  }
  for (let i = 0; i < betweenMonths.length; i++) {
    let actualValue = (await (await element(locatorParse(locator, betweenMonths[i]))).getText()).replace(getCurrencySymbol('Euro'), "").trim();
    context().softAssert.equal(actualValue, expectedValue, `Resource:{${context().resourceSetup.name}} has incorrect value for column #${betweenMonths[i]} in Edit RR page`)
  }
});

Then(/^ui: Cick on unit "([^"]*)" in Edit RR page$/, async (unit: string) => {
  switch (unit) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      const ele = await elementParse({ locatorString: Selectors.resourceRequests.editResourceRequest.specificUnitTabLabel, parsing: unit });
      await ele.click();
      break;
    default: throw Error(`Incorrect unit:{${unit}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.Cost\n4.Manday`);
  }

});