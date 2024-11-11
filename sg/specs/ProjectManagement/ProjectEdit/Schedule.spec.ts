import { Then } from '@cucumber/cucumber';
import { clickToElement, doubleClickToElement, element, elementParseAndClick, formFill, hitEnter, hitTab, isElementDisplayed, isElementSelected, locatorParse, mayBeElement, selectFromDropdown, slowInputFilling } from '../../../../../core/func';
import Selectors from '../../../../../core/selectors';
import { Project } from '../../../../../helpers/Project.helper';
import { context } from '../../../../../utils/context';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';
const moment = require('moment')
import { DateFormats } from '../../../../../core/enums';
import { GeneralSettingsDefaultValues } from '../../../../../data/generalSettings';
import { projectModel } from '../../../../../models/project.model';
import { assert } from 'chai';
import { BPAFG } from '../../../../../helpers/BPAFG.helper';

Then(/^ui: I create a Schedule$/, async () => {
  await Project.createSchedule();
});

Then(/^ui: I change the duration of day to "([^"]*)"$/, async (numberOfDay: string) => {
  await clickToElement(Selectors.projectManagement.Schedule.btnCheckoutSchedule);
  await browser.pause(SHORT_PAUSE);
  await doubleClickToElement(locatorParse(Selectors.projectManagement.Schedule.dayDuration, context().schedule.name));
  await browser.keys(numberOfDay);
  await clickToElement(Selectors.projectManagement.Schedule.btnSaveAndCheckIn);
});

Then(/^ui: I validate the duration of days remain in integer format as "([^"]*)" rather than in decimal form$/, async (numberOfDay: string) => {
  const daydurationLocator = Selectors.projectManagement.Schedule.dayDuration
    .replace('{{schedule_name}}', context().schedule.name)
  await expect(await $(daydurationLocator)).toHaveTextContaining(numberOfDay);
});

Then('ui: Click on Checkout Schedule button in and wait for Revert button', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.btnCheckoutSchedule);
  await (await element(Selectors.projectManagement.Schedule.revertButton)).waitForClickable();
});

Then('ui: I verify Checkout Schedule button is not displayed',async() => {
  await expect(await isElementDisplayed(Selectors.projectManagement.Schedule.btnCheckoutSchedule)).toBeFalsy()
})

Then('ui: Click on add task icon in Project Schedule page', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.addTaskIcon);
  await browser.pause(SHORT_PAUSE);
});

Then('ui: Double click on task icon in gantt area for task called as Task', async () => {
  const taskIconInGanttAreaElement = await element(locatorParse(Selectors.projectManagement.Schedule.taskIconInGanttArea, "Task"));
  await taskIconInGanttAreaElement.doubleClick();
});

Then('ui: Click on Finish date picker icon in edit task dialog', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.editDialog.finishDatPickerIcon);
  await browser.pause(SHORT_PAUSE / 2);
});

Then(/^ui: Select date as "(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in edit task dialog of a Project Schedule using date picker$/,
  async (dateToBeEntered: string, monthName: string) => {

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

    const dateObject = moment(dateToEnteredAfterFormatting, GeneralSettingsDefaultValues.global.dateFormat);
    const year = dateObject.year();
    const month = dateObject.format("MMM");
    const dateForClicking = dateObject.format('dddd, MMMM D, YYYY');

    const topLabelElement = await element(`${Selectors.common.dropdownValues}${Selectors.projectManagement.Schedule.editDialog.topLabelInDatePicker}`);
    await topLabelElement.click();
    await browser.pause(SHORT_PAUSE / 2);
    const currentYear = parseInt(await topLabelElement.getText());
    const difference: number = Math.abs(parseInt(await topLabelElement.getText()) - year);
    if (currentYear > year) {
      for (let i = 1; i <= difference; i++) {
        await clickToElement(Selectors.projectManagement.Schedule.editDialog.rightNavigateIconInDatePicker);
      }
    } else if (currentYear < year) {
      for (let i = 1; i <= difference; i++) {
        await clickToElement(Selectors.projectManagement.Schedule.editDialog.leftNavigateIconInDatePicker);
      }
    }
    await clickToElement(locatorParse(Selectors.projectManagement.Schedule.editDialog.specificMonthInDatePicker, month));
    await browser.pause(SHORT_PAUSE / 2);
    await clickToElement(locatorParse(Selectors.projectManagement.Schedule.editDialog.specificDateInDatePicker, dateForClicking));
    await browser.pause(SHORT_PAUSE / 2);
  });

Then('ui: Click on Start date picker icon in edit task dialog', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.editDialog.startDatePickerIcon);
  await browser.pause(SHORT_PAUSE / 2);
});

Then(/^ui: Verify Finish date is:"(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in edit task dialog of a Project Schedule$/,
  async (dateToBeEntered: string, monthName: string) => {
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

    const expectedValue = dateToEnteredAfterFormatting;
    const finishDatPickerInputValue = await (await element(Selectors.projectManagement.Schedule.editDialog.finishDatPickerInput)).getValue();
    await context().softAssert.equal(finishDatPickerInputValue, expectedValue, "Finish date was incorrect in edit task dialog of a Project Schedule")
  });

Then(/^ui: Verify Start date is:"(first|last)" of the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in edit task dialog of a Project Schedule$/,
  async (dateToBeEntered: string, monthName: string) => {
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

    const expectedValue = dateToEnteredAfterFormatting;
    const startDatePickerInputValue = await (await element(Selectors.projectManagement.Schedule.editDialog.startDatePickerInput)).getValue();
    await context().softAssert.equal(startDatePickerInputValue, expectedValue, "Start date was incorrect in edit task dialog of a Project Schedule")
  });

Then('ui: Enter task name in schedule edit task dialog', async () => {
  context().taskName = projectModel().taskName;
  await formFill([
    { locator: Selectors.projectManagement.Schedule.editDialog.taskNameText, value: null, action: 'clearValue' },
    { locator: Selectors.projectManagement.Schedule.editDialog.taskNameText, value: context().taskName, action: 'setValue' },
  ]);
  await hitTab();
  await clickToElement(Selectors.projectManagement.Schedule.editDialog.saveButton);
});

Then('ui: Verify newly created task is displayed in schedule', async () => {
  await assert.isTrue(await isElementDisplayed(locatorParse(Selectors.projectManagement.Schedule.specificTask, context().taskName)), `Task ${context().taskName} was not displayed in schedule`);
});


Then('ui: Click on Save and CheckIn button in schedule and wait for Checkout Schedule button', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.btnSaveAndCheckIn);
  await (await element(Selectors.projectManagement.Schedule.btnCheckoutSchedule)).waitForClickable();
});

Then(/^ui: Click on edit icon of task with ID:"([^"]*)" in Project Schedule$/, async (taskId: string) => {
  const taskIdElement = await element(locatorParse(Selectors.projectManagement.Schedule.specificTaskId, taskId));
  await taskIdElement.moveTo();
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.projectManagement.Schedule.meatballsIcon);
});

Then(/^ui: Click on Task Type dropdown and select value as:"([^"]*)" in edit task modal of Project Schedule$/, async (taskType: string) => {
  await selectFromDropdown({
    dropdownOpener: Selectors.projectManagement.Schedule.editDialog.taskTypeDropdown,
    dropdownSelection: locatorParse(Selectors.projectManagement.Schedule.editDialog.specificTaskTypeValue, taskType),
  });
});

Then(/^ui: Softassert if Task Type is selected as:"([^"]*)" in edit task modal of Project Schedule$/, async (taskType: string) => {
  const actualTaskType = await (await element(Selectors.projectManagement.Schedule.editDialog.currentTaskType)).getValue();
  await context().softAssert.equal(actualTaskType, taskType, "Project Schedule - Task Type was incorrect in edit task modal");
});

Then('ui: Click on Choose columns dropdown in Project Schedule', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.chooseColumnsDropdown);
  await browser.pause(SHORT_PAUSE / 2); //Needed for dropdown to open
});

Then(/^ui: Softassert if column:"([^"]*)" of task:"([^"]*)" has value as:"([^"]*)" in Project Schedule$/, async (columnName: string, taskName: string, expectedValue: string) => {
  const locator = (Selectors.projectManagement.Schedule.specficColumnValueOfSpecificTask).replace("{{taskName}}", taskName).replace("{{columnName}}", columnName)
  const actualValue = await (await element(locator)).getText();
  await context().softAssert.equal(actualValue, expectedValue, `Project Schedule - Task:{${taskName}} has incorrect value in column:{${columnName}}`);
});

Then(/^ui: Select column:"([^"]*)" in Choose columns dropdown in Project Schedule$/, async (columnName: string) => {
  await BPAFG.uncheckSelectAllCheckbox();
  const elementSelected = await element(locatorParse(Selectors.common.dropdownSpecificValue, columnName) + "/preceding-sibling::input");
  if (!await isElementSelected(elementSelected)) {
    await elementSelected.click();
  }
});

Then('ui: Softassert if Resoruces tab is not displayed in edit task dialog in Project Schedule', async () => {
  const resourceTabDisplayed = await isElementDisplayed(locatorParse(Selectors.projectManagement.Schedule.editDialog.specificTab, "Resources"), MEDIUM_PAUSE);
  context().softAssert.isFalse(resourceTabDisplayed, `Resources tab was displayed in edit task dialog in Project Schedule`);
});

Then('ui: Click on Increment Work icon in edit task dialog in Project Schedule', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.editDialog.incrementWorkIcon);
});

Then('ui: I decrement work days to 0 in edit task dialog in Project Schedule', async () => {
  const el = await element(Selectors.projectManagement.Schedule.editDialog.duration)
  await el.clearValue()
  await slowInputFilling(el,'0');
  await hitEnter()
});

Then('ui: I increment work days to 1 in edit task dialog in Project Schedule',async() => {
  const el = await element(Selectors.projectManagement.Schedule.editDialog.duration)
  await el.clearValue()
  await slowInputFilling(el,'1');
  await hitEnter()
})
Then('ui: Softassert if Resoruces tab is displayed in edit task dialog in Project Schedule', async () => {
  const resourceTabDisplayed = await isElementDisplayed(locatorParse(Selectors.projectManagement.Schedule.editDialog.specificTab, "Resources"), MEDIUM_PAUSE);
  context().softAssert.isTrue(resourceTabDisplayed, `Resources tab was not displayed in edit task dialog in Project Schedule`);
});

Then(/^ui: Click on:"(General|Predecessors|Resources|Notes)" tab in edit task modal of Project Schedule$/, async (tabToBeClicked: string) => {
  await clickToElement(locatorParse(Selectors.projectManagement.Schedule.editDialog.specificTab, tabToBeClicked));
});

Then('ui: Click on Add Assignment button in Resources tab of edit task dialog in Project Schedule', async () => {
  await clickToElement(Selectors.projectManagement.Schedule.editDialog.addAssignmentButtonInResourcesTab);
});

Then(/^ui: Click on Resource dropdown number:"([^"]*)" in Resources tab of edit task dialog in Project Schedule$/, async (dropdownIndex: string) => {
  await clickToElement(`(${Selectors.common.dropdownValues}${Selectors.projectManagement.Schedule.editDialog.resourceSelectionDropdownInResourcesTab})[${dropdownIndex}]`);
});

Then('ui: Search and select recently created resource in Resources tab of edit task dialog in Project Schedule', async () => {
  const { name } = context().resourceSetup;
  await formFill([{locator:Selectors.projectManagement.Schedule.editDialog.searchResourceInputboxInResourcesTab, value: name,action:'setValue'}]);
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, name));
  await clickToElement(Selectors.projectManagement.Schedule.btnSaveFooter)
});

Then('ui: I click on created resources in grid view and validate resource field is opened',async() => {
  const { name } = context().resourceSetup;
  await clickToElement(Selectors.projectManagement.Schedule.editDialog.resourceCol)
  await elementParseAndClick(Selectors.projectManagement.Schedule.editDialog.resourceName,name)
await mayBeElement('(//div[@class="sg_gridFilter sg_all-hierarchy-columns"]//input[@placeholder="Search"])[1])')
});

Then('ui: I validate resource column is available when no resources are assigned',async()=>{
  await expect(Selectors.projectManagement.Schedule.editDialog.resourceCol).toBeExisting()
  // await expect(await mayBeElement(Selectors.projectManagement.Schedule.editDialog.resourceCol)).toBeTruthy()
});

Then('ui: I click on Save Button in dialog box',async() => {
  await clickToElement(Selectors.projectManagement.Schedule.btnSaveFooter)
})

Then('ui: I click on undo button in schedule and wait for redo button to get enabled',async () => {
  const elUndo = await $(Selectors.projectManagement.Schedule.undoButton);
  await elUndo.waitForClickable();
  await clickToElement(Selectors.projectManagement.Schedule.undoButton);
  const elRedo = await $(Selectors.projectManagement.Schedule.redoButton);
  await elRedo.waitForClickable();
});

Then('ui: I validate that the undo functionality worked',async () => {
  await assert.isFalse(await isElementDisplayed(locatorParse(Selectors.projectManagement.Schedule.specificTask, context().taskName)), `Task ${context().taskName} was displayed in schedule`);
})