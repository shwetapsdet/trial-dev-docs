import { Then } from "@cucumber/cucumber";
import { clickToElement, clickToElementUsingJS, doubleClickToElement, element, elementParseAndClick, isElementDisplayed, locatorParse, slowInputFilling } from "../../../../core/func";
import { context } from "../../../../utils/context";
import { ProjectGrid } from "../../../../helpers/ProjectManagement/Grid.helper";
import Selectors from '../../../../core/selectors';
import { MEDIUM_PAUSE, SHORT_PAUSE } from "../../../../core/timeouts";
import { Kanban } from "../../../../helpers/ProjectManagement/Kanban.helper";

Then('ui: Search for recently created project in Kanban section of PM', async () => {
  await ProjectGrid.quickSearch( context().projectSetup.name, false);
});

Then(/^ui: Create a new Kanban board with Column attribute as:"([^"]*)" and Swimlanes as:"([^"]*)"$/, async (columnAttribute: string, swimlanes: string) => {
  let columnsToBeSelected = swimlanes.split(",");

  //This will ensure that kanban page has loaded successfully
  await element(Selectors.projectManagement.kanban.kanbanViewWrapper);

  const boardSettingsDisplayed = await isElementDisplayed(Selectors.projectManagement.kanban.boardSettingsIcon, MEDIUM_PAUSE);
  if (boardSettingsDisplayed) {
    await browser.pause(1000) //Wait for Board setting button to be visible inside model
    await Kanban.clickOnBoardSettingsIcon();
    await browser.pause(500) //Wait for New story button to be visible inside model
    await Kanban.BoardSettingsSection.clickOnCreateNewStoryBoardButton();
  } else {
    await clickToElement(Selectors.projectManagement.kanban.createNewBoardButton);
  }

  await Kanban.CreateOrEdit.enterBoardName(context().kanbanSetup.name);
  await Kanban.CreateOrEdit.clickOnColumnAttributeAndSelectSpecificOption(columnAttribute);
  await Kanban.CreateOrEdit.clickOnColumnsAndSelectSpecificOptions(columnsToBeSelected);
  await Kanban.CreateOrEdit.clickOnSaveButtonAndWaitForItBeClickable();

});

Then('ui: Double click on recently created project in Kanban section of PM', async () => {
  await doubleClickToElement(locatorParse(Selectors.projectManagement.kanban.specificProjectCard, context().projectSetup.name));
});

Then('ui: Verify Rich text in Project attributes Edit of Kanban for recently created Cfs', async () => {
  const attributes = context().projectAttributes;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const richtextElement = await element(locatorParse(Selectors.projectManagement.projectEdit.richTextValueOfSpecificAttribute, attribute.name));
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await (elements.map(element => element.getText()));
    await context().softAssert.equal(actualHTMLElements, attribute.expectedValue, `Rich text of project CF:{${attribute.name}} for project:{${context().projectSetup.name}} in Project attributes Edit of Kanban was incorrect`, true);
  }
});

Then('ui: Click on Cancel button in Project Attributes of Kanban section in PM', async () => {
  await clickToElement(Selectors.projectManagement.kanban.cancelButtonInProjectAttributes);
});

Then('ui: I click on save button in Kanban tab', async () => {
  await clickToElement(Selectors.projectManagement.kanban.createOrEditBoardSection.saveButtonInKanban);
})

Then('ui: I delete kanban board in kanban list page', async () => {
  await browser.pause(SHORT_PAUSE); //Required to display after board selection
  await clickToElementUsingJS(Selectors.projectManagement.kanban.deleteKanbanIcon);
  await elementParseAndClick(Selectors.common.confirmationModalButton, "Yes");
})

Then('ui: I scroll forward and backward inside custom modal container in kanban tab', async () => {
  const el1 = Selectors.projectManagement.kanban.optionalFieldsTitleInCustomModalContainer;
  const el2 = Selectors.projectManagement.kanban.saveButtonInCustomModalContainer;
  await (await element(el1)).scrollIntoView({ behavior: "smooth" });
  await (await element(el2)).scrollIntoView({ behavior: "smooth" });
});

Then('ui: I click on board settings and select newly created board in kanban tab', async () => {
  await clickToElement(Selectors.projectManagement.kanban.boardSettings);
  await browser.pause(SHORT_PAUSE); //Required to display value
  const locator = Selectors.projectManagement.kanban.specificBoardInBoardSettings.replace(/{{boardName}}/, context().kanbanSetup.name);
  await clickToElementUsingJS(locator);
})

Then('ui: I click on open folder icon in custom modal container in kanban tab', async () => {
  await doubleClickToElement(Selectors.projectManagement.kanban.openFolderIconInCustomModalContainer);
});

Then('ui: Delete project in custom modal container in kanban tab', async () => {
  await doubleClickToElement(Selectors.projectManagement.kanban.deleteIconInCustomModalContainer);
  await elementParseAndClick(Selectors.common.confirmationModalButton, "Yes");
});

Then('ui: Open filters section in PM Kanban if it isn\'t open already', async () => {
  const filtersIconElement = await element(Selectors.projectManagement.kanban.filtersIcon);
  const filterSectionStatus = await filtersIconElement.getAttribute("class");
  if (!filterSectionStatus.includes("active")) {
    await filtersIconElement.click();
  }
});

Then('ui: Click on first choose filter dropdwon on PM Kanban section', async () => {
  await clickToElement(Selectors.projectManagement.grid.chooseFilterDropdown);
  await browser.pause(SHORT_PAUSE/2);//Needed for dropdown to open
});

Then(/^ui: Enter filter name as:"([^"]*)" and select it in kanban tab$/, async (filterValueToBeEntered: string) => {
  await slowInputFilling(Selectors.common.dropdownSearchInputBox, filterValueToBeEntered);
  await browser.pause(SHORT_PAUSE);//Needed for earch to happen
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, filterValueToBeEntered));
});


