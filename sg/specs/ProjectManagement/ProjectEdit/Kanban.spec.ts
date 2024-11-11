import { Then } from '@cucumber/cucumber';
import {
  clickToElement, clickToElementUsingJS, elementParseAndClick, formFill, isElementDisplayed
} from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { kanbanModel } from '../../../../../models/kanban.model';
import { context } from '../../../../../utils/context';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

Then('ui: I click on Kanban tab icon',async () => {
  await clickToElement(Selectors.projectManagement.common.kanbanTabIcon);
})

Then('ui: I open create board section in kanban tab',async () => {
  if(await isElementDisplayed(Selectors.projectManagement.kanban.createNewBoardButton, SHORT_PAUSE*2)) {
    await clickToElement(Selectors.projectManagement.kanban.createNewBoardButton);
  }else {
    await clickToElement(Selectors.projectManagement.kanban.boardSettings);
    await clickToElement(Selectors.projectManagement.kanban.createNewStoryBoard);
  }
})

Then('ui: I enter kanban name in kanban tab', async () => {
  context().kanbanName = kanbanModel().name;
  await formFill([
    { locator: Selectors.projectManagement.kanban.createOrEditBoardSection.boardName, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.kanban.createOrEditBoardSection.boardName, value: context().kanbanName, action: 'setValue' },
  ]);
});

Then(/^ui: I search and select specific column attribute "([^"]*)" in kanban tab$/, async (columnAttribute: string) => {
  if(!await isElementDisplayed(Selectors.projectManagement.kanban.createOrEditBoardSection.expandBoardLayoutSection, SHORT_PAUSE*2)) {
    await clickToElement(Selectors.projectManagement.kanban.createOrEditBoardSection.expandBoardLayoutSection);
  }
  await clickToElement(Selectors.projectManagement.kanban.createOrEditBoardSection.columnAttributeDropdown);
  await browser.pause(SHORT_PAUSE); //Required to open dropdown value
  await formFill([
    { locator: Selectors.projectManagement.kanban.createOrEditBoardSection.searchFieldInColumnAttributeDropdown, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.kanban.createOrEditBoardSection.searchFieldInColumnAttributeDropdown, value: columnAttribute, action: 'setValue' },
  ]);
  await elementParseAndClick(Selectors.common.dropdownSpecificValue, columnAttribute);
});

Then(/^ui: I search and select specific columns "([^"]*)" in kanban tab$/, async (columns: string) => {
  const column = columns.split(",");
  for (let i = 0; i < column.length; i++) {
    await clickToElement(Selectors.projectManagement.kanban.createOrEditBoardSection.columnsDropdown);
    await browser.pause(SHORT_PAUSE); //Required to open dropdown value
    await formFill([
      { locator: Selectors.projectManagement.kanban.createOrEditBoardSection.searchFieldInColumnsDropdown, value: null, action: 'clearValue' },
      { locator: Selectors.projectManagement.kanban.createOrEditBoardSection.searchFieldInColumnsDropdown, value: column[i], action: 'setValue' },
    ]);
    await elementParseAndClick(Selectors.projectManagement.kanban.createOrEditBoardSection.specificColumnsCheckbox, column[i]);
    await clickToElement(Selectors.projectManagement.kanban.createOrEditBoardSection.columnsDropdown); 
    await browser.pause(SHORT_PAUSE);//Required to close columns dropdown
  }
});

// Then('ui: I click on save button in Kanban tab',async () => {
//   await clickToElement(Selectors.projectManagement.kanban.createOrEditBoardSection.saveButtonInKanban);
// })

// Then('ui: I delete kanban board in kanban list page',async () => {
//   await clickToElementUsingJS(Selectors.projectManagement.kanban.deleteKanbanIcon);
//   await elementParseAndClick(Selectors.common.confirmationModalButton, "Yes");
// })

// Then('ui: I click on board settings and select newly created board in kanban tab',async () => {
//   await clickToElement(Selectors.projectManagement.kanban.boardSettings);
//   await browser.pause(SHORT_PAUSE); //Required to display value
//   const locator = Selectors.projectManagement.kanban.specificBoardInBoardSettings.replace(/{{boardName}}/, context().kanbanName);
//   await clickToElementUsingJS(locator);
// })