import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import { element, locatorParse} from '../../../../../core/func';
import { context } from '../../../../../utils/context';
import { ProjectGrid } from '../../../../../helpers/ProjectManagement/Grid.helper';
import { ProjectGantt } from '../../../../../helpers/ProjectManagement/Gantt.helper';




Then('ui: I click on columns dropdown in Project Gantt Tab', async () => {
    await ProjectGantt.clickOnColumnsDropdownGanttTab();
  });

  
Then(/^ui: Select "([^"]*)" CF checkboxes in Columns or Group By dropdown in Gantt$/, async (numberOfCfsToBeSelected: number) => {
    context().selectedColumns = [];
    for (let i = 1; i <= numberOfCfsToBeSelected; i++) {
      await ProjectGrid.selectAttribueInColumnsOrGroupByDropdownByIndex(i + "");
      const attributeName = await element(locatorParse(Selectors.projectManagement.gantt.cFNameInColumnsOrGroupByDropdownByIndex, i + ""));
      context().selectedColumns.push(await attributeName.getText());
    }
  });

Then(/^ui: Verify if "([^"]*)" earlier selected columns are displayed in PM Gantt Tab$/, async (numberOfColumnsToBeVerified: number) => {
    for (let i = 0; i < numberOfColumnsToBeVerified; i++) {
      await ProjectGantt.verifyIfColumnIsDisplayedGanttTab(context().selectedColumns[i]);
    }
  });

  Then(/^ui: Verify if last "([^"]*)" earlier selected columns are not displayed in PM Gantt Tab$/, async (numberOfColumnsToBeVerified: number) => {
    const valuesToBeAsserted = context().selectedColumns.slice(-2);
    for (let i = 0; i < numberOfColumnsToBeVerified; i++) {
      await ProjectGantt.verifyIfColumnIsNotDisplayedGanttTab(valuesToBeAsserted[i]);
    }
  });

  Then('ui: Verify if recently created project is displayed in PM Gantt Tab', async () => {
    await ProjectGantt.verifyIfProjectIsDisplayedGanttTab(context().projectSetup.name)
  });