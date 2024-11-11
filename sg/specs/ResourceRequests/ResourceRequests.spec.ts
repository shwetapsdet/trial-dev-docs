import { Then } from '@cucumber/cucumber';
import { clickToElement, clickToElementUsingJS, element, elementParse, elementParseAndClick, getElementBackgroundColor, locatorParse, mayBeElement } from '../../../../core/func';
import Selectors from '../../../../core/selectors';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../core/timeouts';
import { NetAvailabilitySection, NetAvailabilityShowResourcesSection } from '../../../../core/enums';
import { context } from '../../../../utils/context';
import { ResourceRequests } from '../../../../helpers/ResourceRequests/ResourceRequests.helper';

Then('ui: I click on pending resource request in Resource Request tab', async () => {
  await clickToElement(Selectors.resourceRequestsTile.specificResourceRequest);
});

Then('ui: I click on options button in Resource Request', async () => {
  await (await element(Selectors.resourceManagement.netAvailability.btnOptions)).scrollIntoView();
  await clickToElementUsingJS(Selectors.resourceManagement.netAvailability.btnOptions);
});

Then('ui: I verify overlay heatmap is displayed in Resource Request', async () => {
  await expect(await element(Selectors.resourceManagement.netAvailability.overlayHeatmapInOptions)).toBeDisplayed();
});

Then('ui: I verify show resources is displayed in Resource Request', async () => {
  await expect(await element(Selectors.resourceRequestsTile.showResourcesInOptions)).toBeDisplayed();
});

Then('ui: I click on choose columns dropdown in Resource Request', async () => {
  await clickToElement(Selectors.resourceRequestsTile.ddchooseColumnsDropdown);
  await browser.pause(SHORT_PAUSE); //Required to display dropdown
});

Then('ui: I uncheck select all checkbox in choose columns dropdown in Resource Request', async () => {
  const eleSelectAllChk = await element(Selectors.resourceRequestsTile.chkSelectAllCheckboxInChooseColumns);
  await eleSelectAllChk.click();
  if (await eleSelectAllChk.isSelected()) {
    await eleSelectAllChk.click();
  }
});

Then(/^ui: I search and select columns "([^"]*)" in Resource Request$/, async (attributeNames: string) => {
  const attributes: string[] = attributeNames.split(',');
  for (let i = 0; i < attributes.length; i++) {
    await (await element(Selectors.common.typeToSearchFieldInDropdown)).setValue(attributes[i]);
    await browser.pause(SHORT_PAUSE); //Required to display the values
    const ele = await elementParse({ locatorString: Selectors.resourceRequestsTile.attributeNameInChooseColumns, parsing: attributes[i] });
    if (!await ele.isSelected()) {
      await ele.click();
    }
  }
});

Then(/^ui: I toggle overlay heatmap to "([^"]*)" in Resource Request Options$/, async (toggleState: string) => {
  const color = (await getElementBackgroundColor(Selectors.resourceRequestsTile.tglOverlayHeatmap)).toString();
  if (color == '#8c9caa' && toggleState.toLowerCase() == "on") {
    await (await element(Selectors.resourceRequestsTile.tglOverlayHeatmap)).click();
  } else if (color != '#8c9caa' && toggleState.toLowerCase() == "off") {
    await (await element(Selectors.resourceRequestsTile.tglOverlayHeatmap)).click();
  }
});

Then(/^ui: I verify color "([^"]*)" of specific cell "([^"]*)" in netavailability section in Resource Request$/, async (heatmapColor: string, columnIndex: string) => {
  const locationString = Selectors.resourceRequestsTile.specificCellInNetAvailabilitySection.replace('{{columnIndex}}', columnIndex);
  const color = (await getElementBackgroundColor(locationString));
  switch (heatmapColor.toLowerCase()) {
    case NetAvailabilitySection.HeatmapColorCodes.red1:
      await expect(color.toLowerCase()).toEqual(NetAvailabilitySection.HeatmapColorCodes.red1);
      break;
    case NetAvailabilitySection.HeatmapColorCodes.green1:
      await expect(color.toLowerCase()).toEqual(NetAvailabilitySection.HeatmapColorCodes.green1);
      break;
    case NetAvailabilitySection.HeatmapColorCodes.white1:
      await expect(color.toLowerCase()).toEqual(NetAvailabilitySection.HeatmapColorCodes.white1);
      break;
    default:
      break;
  }
});

Then('ui: I close options overlay in Resource Request', async () => {
  await (await element(Selectors.resourceManagement.netAvailability.btnOptions)).scrollIntoView();
  //This is bound to fail as dev's are still decided wheter to use overlays or not
  // await clickToElementUsingJS(Selectors.resourceRequestsTile.closeOptionsOverlay);
  await clickToElementUsingJS(Selectors.resourceManagement.netAvailability.btnOptions);
});

Then(/^ui: I click on specific resource request status "([^"]*)" of task created using model in Resource Request tab$/, async (RRStatus: string) => {
  const locationString = Selectors.resourceRequestsTile.specificTaskResourceRequest.replace('{{taskName}}', context().taskName1).replace('{{RRStatus}}', RRStatus);
  await clickToElement(locationString);
});

Then(/^ui: I click on specific show resources option "([^"]*)" in Resource Request tab$/, async (showResourceOption: string) => {
  await elementParseAndClick(Selectors.resourceRequestsTile.specificShowResourcesOption, showResourceOption);
});

Then('ui: I verify specific resource created using model is displayed under net availability section in Resource Request tab', async () => {
  const locatorString = elementParse({ locatorString: Selectors.resourceRequestsTile.specificResourceInNetAvailabilitySection, parsing: context().resource1 });
  await expect(locatorString).toBeDisplayed();
});

Then('ui: I verify specific resource created using model is not displayed under net availability section in Resource Request tab', async () => {
  await expect(await mayBeElement(locatorParse(Selectors.resourceRequestsTile.specificResourceInNetAvailabilitySection, context().resource2))).toBeFalsy();
});

Then('ui: I click on specific show resources options and verify resources under net availability section in Resource Request tab', async () => {
  const options: string[] = ["Current Task", "Current Project", "Available", "All"];
  for (let i = 0; i < options.length; i++) {
    await clickToElementUsingJS(Selectors.resourceManagement.netAvailability.btnOptions);
    await elementParseAndClick(Selectors.resourceRequestsTile.specificShowResourcesOption, options[i]);
    await browser.pause(SHORT_PAUSE); //Required to display the values
    //This is bound to fail as dev's are still decided wheter to use overlays or not
    // await clickToElementUsingJS(Selectors.resourceRequestsTile.closeOptionsOverlay);
    await clickToElementUsingJS(Selectors.resourceManagement.netAvailability.btnOptions);
    switch (options[i]) {
      case NetAvailabilityShowResourcesSection.Available:
      case NetAvailabilityShowResourcesSection.CurrentTask:
        await expect(await elementParse({ locatorString: Selectors.resourceRequestsTile.specificResourceInNetAvailabilitySection, parsing: context().resource1 })).toBeDisplayed();
        await expect(await mayBeElement(locatorParse(Selectors.resourceRequestsTile.specificResourceInNetAvailabilitySection, context().resource2), MEDIUM_PAUSE)).toBeFalsy();
        break;
      case NetAvailabilityShowResourcesSection.All:
      case NetAvailabilityShowResourcesSection.CurrentProject:
        await expect(await elementParse({ locatorString: Selectors.resourceRequestsTile.specificResourceInNetAvailabilitySection, parsing: context().resource1 })).toBeDisplayed();
        await expect(await elementParse({ locatorString: Selectors.resourceRequestsTile.specificResourceInNetAvailabilitySection, parsing: context().resource2 })).toBeDisplayed();
        break;
      default:
        break;
    }
  }
});

Then('ui: Clear filters if any in Resource Requests', async () => {
  await ResourceRequests.clearFiltersIfAny();
});

Then(/^ui: Verify Rich text in "(Resource Requests|All Resource Requests)" section for recently created Cfs$/, async (sectionName: string) => {
  let attributes = [];

  if (context().projectAttributes !== undefined) {
    attributes = context().projectAttributes;
  }
  const projectName = context().projectSetup.name;
  const resourceName = context().resourceSetup.name;
  const cellLocator = (Selectors.resourceRequests.specificCellValueOfSpecificRequest)
    .replace("{{projectName}}", projectName)
    .replace("{{resourceName}}", resourceName)
    .replace("{{resourceRequestStatus}}", "Pending");

  for (let i = 0; i < attributes.length; i++) {
    const richtextElement = await element(cellLocator.replace("{{attributeName}}", attributes[i].name) + "//div[contains(@class,'rich-text-view')]");
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attributes[i].expectedValue, `Rich text of project CF:{${attributes[i].name}} for project:{${projectName}}, resource:{${resourceName}}, RR status:{Pending} in ${sectionName} section was incorrect`, true);
  }

  if (context().resourceAttributes != undefined) {
    attributes = context().resourceAttributes;
  }

  for (let i = 0; i < attributes.length; i++) {
    const richtextElement = await element(cellLocator.replace("{{attributeName}}", attributes[i].name) + "//div[contains(@class,'rich-text-view')]");
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attributes[i].expectedValue, `Rich text of resource CF:{${attributes[i].name}} for project:{${projectName}}, resource:{${resourceName}}, RR status:{Pending} in ${sectionName} section was incorrect`, true);
  }

});

Then('ui: Click on pending RR of recently created project and resource in RR page', async () => {
  await ResourceRequests.clickOnSpecificRequest(context().projectSetup.name, context().resourceSetup.name, "Pending");
});

Then('ui: Search and Select recently created Project and Resource CFs in Choose columns of RR page', async () => {
  let attributes = [];
  if (context().projectAttributes != undefined) {
    attributes = context().projectAttributes;
    for (let i = 0; i < attributes.length; i++) {
      const eleSelectAllChk = await element(Selectors.resourceManagement.grid.selectAllCheckbox);
      await eleSelectAllChk.click();
      if (await eleSelectAllChk.isSelected()) {
        await eleSelectAllChk.click();
      };
      await (await element(Selectors.common.typeToSearchFieldInDropdown)).setValue(attributes[i].name);
      await browser.pause(SHORT_PAUSE); //Required to display the values
      const ele = await elementParse({ locatorString: Selectors.resourceRequestsTile.attributeNameInChooseColumns, parsing: attributes[i].name });
      if (!await ele.isSelected()) {
        await ele.click();
      }
    }
  }

  if (context().resourceAttributes != undefined) {
    attributes = context().resourceAttributes;
    for (let i = 0; i < attributes.length; i++) {
      await (await element(Selectors.common.typeToSearchFieldInDropdown)).setValue(attributes[i].name);
      await browser.pause(SHORT_PAUSE); //Required to display the values
      const ele = await elementParse({ locatorString: Selectors.resourceRequestsTile.attributeNameInChooseColumns, parsing: attributes[i].name });
      if (!await ele.isSelected()) {
        await ele.click();
      }
    }
  }

});

Then('ui: Search and Select recently created Project CF in Choose columns of RR page', async () => {
  await (await element(Selectors.common.typeToSearchFieldInDropdown)).setValue(context().attributeSetup.name);
  await browser.pause(SHORT_PAUSE); //Required to display the values
  const ele = await elementParse({ locatorString: Selectors.resourceRequestsTile.attributeNameInChooseColumns, parsing: context().attributeSetup.name });
  if (!await ele.isSelected()) {
    await ele.click();
  }
});