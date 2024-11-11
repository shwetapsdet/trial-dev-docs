/* eslint-disable max-len */
import { Given, Then } from '@cucumber/cucumber';
import { context } from '../../../../../utils/context';
import { SheetTemplate } from '../../../../../helpers/AdminSettings/SheetTemplate.helper';
import { clickToElement, element, elementParse, elementParseAndClick, formFill, hitEnter, isElementDisplayed, locatorParse, mayBeElement } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { Key } from 'webdriverio'

Given(/^ui: I create 2 sheet template with column type as "([^"]*)" for "(Project|Resource)"$/,async (columnType: string, templateType: string) => {
    await SheetTemplate.createNewSheetTemplate(context().sheetTemplate1.name, context().sheetTemplate1.columnName, columnType, templateType);
    await SheetTemplate.createNewSheetTemplate(context().sheetTemplate2.name, context().sheetTemplate2.columnName, columnType, templateType);
});

Given(/^ui: I create a sheet template with column type as "([^"]*)" for "(Project|Resource)"$/,async (columnType: string, templateType: string) => {
  await SheetTemplate.createNewSheetTemplate(context().sheetTemplate1.name, context().sheetTemplate1.columnName, columnType, templateType);
})

Given('ui: I create new template for import sheet',async () => {
    await SheetTemplate.createNewSheetTemplate('Sample Template', 'Column1', 'Bool', 'Project');
});

Then('ui: I click on navigation menu and validate it is displayed correctly',async() => {
    await clickToElement(Selectors.siteHeader.quickNavigateIcon)
    await mayBeElement(Selectors.adminSettings.sheetTemplate.sheetDisplayValidate)
    await clickToElement(Selectors.siteHeader.quickNavigateIcon)
});

Then('ui: I delete the created sheet',async() => {
    await elementParseAndClick(Selectors.adminSettings.sheetTemplate.btnDeleteSheet,context().sheetTemplate1.name)
    await clickToElement(Selectors.adminSettings.sheetTemplate.confirmDeleteSheet)
    await browser.pause(3000)
});

Then('ui: I validate a popup denying the deletion is shown',async() => {
    await mayBeElement(Selectors.adminSettings.sheetTemplate.popupDelete)
    await clickToElement(Selectors.adminSettings.sheetTemplate.dependentEntities)

});

Then('ui: I validate entities show where template is assigned to',async() => {
    await mayBeElement(await elementParse({locatorString:Selectors.adminSettings.sheetTemplate.assignedEntityValidate,parsing:context().projectSetup.name}))
});

Then('ui: Click on Save and Check In button in Sheet Management and wait for Checkout button',async() => {
    await clickToElement(Selectors.adminSettings.sheetTemplate.btnSave)
});

Then(/^ui: I pin newly created sheet in the tab$/, async () => {
      const ele = locatorParse(Selectors.adminSettings.sheetTemplate.btnpin, context().sheetTemplate1.name)
      await clickToElement(ele);
  });

Then(/^ui: I verify that the newly created sheet is "(UnPinned|Pinned)" in the grid$/, async (pinStatus: string) => {
    
    await browser.execute((scrollPosition) => {
      window.scrollTo(scrollPosition, 0);
    }, 900);
    const ele = await isElementDisplayed(locatorParse(Selectors.adminSettings.sheetTemplate.sheetNameValidate,context().sheetTemplate1.name));
    await browser.pause(2000);
    if (pinStatus === "Pinned") {
      await context().softAssert.isTrue(ele, `The ${context().sheetTemplate1.name} is not Pinned in the grid`)
    }
    else if (pinStatus === "Unpinned") {
      await context().softAssert.isNotTrue(ele, `The ${context().sheetTemplate1.name} is Pinned in the grid`)
    }
  });
  
  Then('ui: I verify created project sheet is present and is in sorted order',async() => {
    await clickToElement(Selectors.projectManagement.ddProjectNavigationDropdown)
    await expect(await elementParse({locatorString:Selectors.common.dropdownSpecificValue,parsing:"Audit Log"}))
    await expect(await elementParse({locatorString:Selectors.common.dropdownSpecificValue,parsing:context().sheetTemplate1.name}))
  });

  Then('ui: I verify created resource sheet is present and is in sorted order',async() => {
    await clickToElement( Selectors.resourceManagement.resourceEdit.resourceOptionButton)
    await expect(await elementParse({locatorString:Selectors.resourceManagement.resourceEdit.resourceOptionSelect,parsing:"Audit Log"}))
    await expect(await elementParse({locatorString:Selectors.resourceManagement.resourceEdit.resourceOptionSelect,parsing:context().sheetTemplate1.name}))
 
  });

  Then('ui: I click on pinned project sheet',async() => {
    await clickToElement(Selectors.projectManagement.ddProjectNavigationDropdown)
    await elementParseAndClick(Selectors.common.dropdownSpecificValue,context().sheetTemplate1.name)
  });

  Then('ui: I click on pinned resource sheet',async() => {
    await clickToElement( Selectors.resourceManagement.resourceEdit.resourceOptionButton)
    await elementParseAndClick(Selectors.common.dropdownSpecificValue,context().sheetTemplate1.name)
  });

  Given(/^ui: I create a sheet template with "([^"]*)" columns and column type as "([^"]*)" for "(Project|Resource)"$/,async (columnNumber,columnType: string, templateType: string) => {
    await SheetTemplate.createNewSheetTemplateWithMultipleColumn(context().sheetTemplate1.name, context().sheetTemplate1.columnName, columnType, templateType, columnNumber);
  });
