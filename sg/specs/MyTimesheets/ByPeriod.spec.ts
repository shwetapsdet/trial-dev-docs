import { Then } from "@cucumber/cucumber";
import * as moment from 'moment'
import { MyTimesheets } from "../../../../helpers/MyTimesheets/MyTimesheets.helper";
import DateTime from "../../../../core/datetime";
import { context } from "../../../../utils";
import { Common } from "../../../../helpers/common.helper";
import { clickToElement, clickToElementUsingJS, doubleClickToElement, element, elementParse, elementParseAndClick, hitEnter, isElementDisplayed, locatorParse } from "../../../../core";
import Selectors from '../../../../core/selectors';
import { BuildTeam } from "../../../../helpers/ProjectManagement/ProjectEdit/BuildTeam.helper";
import { SHORT_PAUSE } from "../../../../core/timeouts";

Then(/^ui: Navigate to week number "([^"]*)" in the month "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year in My Timesheets$/, async (weekNumber: number, monthName: string) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNames.findIndex(name => name === monthName);
  const weekStartDate = DateTime.getNthMondayOfSpecificMonth(weekNumber, monthIndex, moment().year());
  await MyTimesheets.ByPeriod.navigateToPeriodAndWaitForGridToAppear(weekStartDate);
});

Then(/^ui: Enter "([^"]*)" hours in "([^"]*)" number of cells for recently created project's Generic task in By Period section of My Timesheets$/, async (hoursToBeEntered: string, numberOfCellsToBeEntered: number) => {
  await MyTimesheets.ByPeriod.enterHoursForSpecificTaskOfProject(context().projectSetup.name, "Generic", numberOfCellsToBeEntered, hoursToBeEntered);
});

Then(/^ui: Click on Submit button in My Timesheets and click on "([^"]*)" button in confirmation modal$/, async (buttonToBeClickedInConfirmationModal: string) => {
  await MyTimesheets.ByPeriod.clickOnSubmitButton();
  await Common.clickOnSpecificButtonInConfirmationModal(buttonToBeClickedInConfirmationModal);
});

Then(/^ui: Verify timesheet status is:"(New|Submitted|Archived|Draft|Rejected)" in By Period section$/, async (expectedTimesheetStatus: string) => {
  await MyTimesheets.ByPeriod.verifyStatusOfTimesheet(expectedTimesheetStatus.toUpperCase());
});

Then('ui: Click on next period icon in My Timesheets', async () => {
  await MyTimesheets.ByPeriod.clickOnNextPeriodIcon();
});

Then('ui: Click on Save Draft button in My Timesheets', async () => {
  await MyTimesheets.ByPeriod.clickOnSaveDraftButton();
});

Then(/^ui: Verify "([^"]*)" hours is entered in "([^"]*)" number of cells for recently created project's Generic task in By Period section of My Timesheets$/, async (hoursToBeEntered: string, numberOfCellsToBeEntered: number) => {
  await MyTimesheets.ByPeriod.verifyHoursForSpecificTaskOfProject(context().projectSetup.name, "Generic", numberOfCellsToBeEntered, hoursToBeEntered);
});

Then('ui: Click on Show Comments link in My Timesheets', async () => {
  await MyTimesheets.ByPeriod.clickOnShowCommentsLink();
});

Then(/^ui: Click on Show Comments link and enter comments as:"([^"]*)" in By Period section of My Timesheets$/, async (commentsToBeEntered: string) => {
  await MyTimesheets.ByPeriod.clickOnShowCommentsLinkAndEnterComments(commentsToBeEntered);
});

Then(/^ui: Verify comments:"([^"]*)" have been added by "(timesheetUser|timesheetApprover|projectOwner)" in By Period section of My Timesheets$/,
  async (commentsToBeVerified: string, userWhoAddedTheComment: string) => {
    let user;
    switch (userWhoAddedTheComment) {
      case "timesheetUser":
        user = context().resourceSetup.name;
        break;
      case "timesheetApprover":
        user = context().resourceSetup.timesheetApprover;
        break;
      case "projectOwner":
        user = context().resourceSetup.resourceManager;
        break;
      default: throw Error(`Value:${userWhoAddedTheComment} for variable userWhoAddedTheComment is not supported.`);
    }
    await MyTimesheets.ByPeriod.verifyCommentsOfSpecificUser(commentsToBeVerified, user);
  });

Then('ui: Click on Delete button in By Period of My Timesheets', async () => {
  await MyTimesheets.ByPeriod.clickOnDeleteButton();
});

Then('ui: Click on New assignment request button in My Timesheets', async () => {
  await MyTimesheets.ByPeriod.clickOnNewAssignmentRequestButton();
});

Then('ui: Click on Add assignment button during New Assignment Request in My Timesheets', async () => {
  await MyTimesheets.ByPeriod.NewAssignmentRequest.clickOnAddAssignmentButton();
});

Then('ui: Search recently created project and select the recently added task during New Assignment Request in My Timesheets', async () => {
  const { name, taskName } = context().projectSetup;
  await MyTimesheets.ByPeriod.NewAssignmentRequest.searchProjectAndSelectTaskInAddAssignmentDropdown(name, taskName);
});

Then('ui: Click on Apply button in Add Assignment modal in My Timesheets', async () => {
  await MyTimesheets.ByPeriod.NewAssignmentRequest.clickOnApplyButtonInAddAssignmentDropdown();
});

Then(/^ui: Enter "([^"]*)" hours in "([^"]*)" number of cells for recently created project's recent task in New assignment request section of My Timesheets$/, async (hoursToBeEntered: string, numberOfCellsToBeEntered: number) => {
  await MyTimesheets.ByPeriod.NewAssignmentRequest.enterHoursForSpecificTaskOfProject(context().projectSetup.name, context().projectSetup.taskName, numberOfCellsToBeEntered, hoursToBeEntered);
});

Then(/^ui: Click on Submit button during New assignment request in My Timesheets and click on "([^"]*)" button in confirmation modal$/, async (buttonToBeClickedInConfirmationModal: string) => {
  await MyTimesheets.ByPeriod.NewAssignmentRequest.clickOnSubmitButton();
  await Common.clickOnSpecificButtonInConfirmationModal(buttonToBeClickedInConfirmationModal);
});

Then(/^ui: Verify "([^"]*)" hours is entered in "([^"]*)" number of cells for recently created project's recent task during New assignment request section of My Timesheets$/, async (hoursToBeEntered: string, numberOfCellsToBeEntered: number) => {
  await MyTimesheets.ByPeriod.NewAssignmentRequest.verifyHoursForSpecificTaskOfProject(context().projectSetup.name, context().projectSetup.taskName, numberOfCellsToBeEntered, hoursToBeEntered);
});


Then('ui: Click on Close button in New assignment request section of My Timesheets', async () => {
  await MyTimesheets.ByPeriod.NewAssignmentRequest.clickOnCloseButton();
});

Then('ui: Click on Add assignment button in By Period section of My Timesheets', async () => {
  await MyTimesheets.ByPeriod.clickOnAddAssignmentButton();
});

Then('ui: Search recently created project and select the recently added task in By Period section of My Timesheets', async () => {
  const { name, taskName } = context().projectSetup;
  await MyTimesheets.ByPeriod.searchProjectAndSelectTaskInAddAssignmentDropdown(name, taskName);
});

Then(/^ui: Enter "([^"]*)" hours in "([^"]*)" number of cells for recently created project's recent task in By Period section of My Timesheets$/, async (hoursToBeEntered: string, numberOfCellsToBeEntered: number) => {
  const { name, taskName } = context().projectSetup;
  await MyTimesheets.ByPeriod.enterHoursForSpecificTaskOfProject(name, taskName, numberOfCellsToBeEntered, hoursToBeEntered);
});

Then('ui: Turn of all options if any in By Period section of My Timesheets', async () => {
  await MyTimesheets.ByPeriod.turnOfAllOptionsIfAny();
});

Then(/^ui: Wait for Timesheet Period of week number:"([^"]*)" in the month of:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)" of current year to appear in My Timesheets$/, async (weekNumber: string, monthName: string) => {
  await MyTimesheets.waitForSpecificTimesheetPeriod(monthName + " Week " + weekNumber);
});

Then(/^ui: Click on meatballs icon of recently created project and select option "(Project attributes|Project preview|Notes|Remove)" in My Timesheets$/, async (
  optionToBeSelected: string,
) => {
  const meatballsIcon = await element(locatorParse(Selectors.myTimesheets.byPeriod.meatballsIconOfSpecificProject, context().projectSetup.name))
  await meatballsIcon.click();
  await clickToElement(locatorParse(Selectors.common.dropdownSpecificValue, optionToBeSelected));
});

Then('ui: Verify Rich text in Project Attributes modal of My Timesheets for recently created Project Cfs', async () => {
  const expectedValues = context().expectedValues.get("Project");
  const attributes = [];
  attributes.push(context().projectAttributes);
  for (let i = 0; i < attributes.length; i++) {
    const attributeName = attributes[i][0].name;
    const richtextElement = await element(locatorParse(Selectors.myTimesheets.byPeriod.richTextValueOfSpecificProjectAttribute, attributeName));
    const elements = await richtextElement.$$('*');
    const actualHTMLElements = await Promise.all(elements.map(element => element.getHTML()));
    await context().softAssert.equal(actualHTMLElements, expectedValues, `Rich text of project CF:{${attributeName}} for project:{${context().projectSetup.name}} in Project Attributes of My Timesheets was incorrect`, true);
  }
});

Then('ui: Close Project attributes overlay in My Timesheets', async () => {
  await clickToElementUsingJS(Selectors.projectManagement.sPA.optionsOverlay);
});

Then('ui: Select Assignment attributes created earlier in My Timesheets', async () => {
  const attributes = context().assignmentAttributes;
  await MyTimesheets.ByPeriod.clickOnInsertColumnsDropdown();
  await BuildTeam.uncheckSelectAllCheckbox();
  await browser.pause(SHORT_PAUSE / 2);//Needed for dropdown to open
  for (let i = 0; i < attributes.length; i++) {
    await BuildTeam.searchAndSelectColumns(attributes[i].name);
  }
  await MyTimesheets.ByPeriod.clickOnInsertColumnsDropdown();
});


Then('ui: Verify Rich text in My Timesheets for recently created Assignment Cfs', async () => {
  const expectedValues = context().expectedValues.get("Assignment");
  const projectName = context().projectSetup.name;

  const attributes = context().assignmentAttributes;
  for (let i = 0; i < attributes.length; i++) {
    const attributeName = attributes[i].name;
    const cellLocator = ((Selectors.myTimesheets.byPeriod.cellByColumnNameOfTaskOfSpecificProject)
      .replace('{{projectName}}', projectName)
      .replace('{{taskName}}', "Generic")
      .replace('{{columnName}}', attributeName)) + "/div[contains(@class,'rich-text')]";
    let richtextElement = await element(cellLocator);
    let elements = await richtextElement.$$('*');
    let actualHTMLElements = await Promise.all(elements.map(element => element.getHTML()));
    await context().softAssert.equal(actualHTMLElements, expectedValues, `Rich text of assignment CF:{${attributeName}} for task:{Generic} of project:{${projectName}} in My Timesheets was incorrect`, true);

    await clickToElement(cellLocator);
    await hitEnter();
    await browser.pause(SHORT_PAUSE / 2);
    richtextElement = await element(Selectors.adminSettings.attributeManagement.attributeListSection.richTextInputEditSectionActivator);
    elements = await richtextElement.$$('*');
    actualHTMLElements = await Promise.all(elements.map(element => element.getHTML()));
    await context().softAssert.equal(actualHTMLElements, expectedValues, `Rich text of assignment CF:{${attributeName}} when editing it for task:{Generic} of project:{${projectName}} in My Timesheets was incorrect`, true);
    await elementParseAndClick(Selectors.projectManagement.sPA.specificButtonWhenEditingRichTextCF, "Cancel");
    await browser.pause(SHORT_PAUSE / 2);
  }
});

Then(/^ui: I click on dot button to select "([^"]*)" option$/, async (optionName: string) => {
  await expect(await elementParse({ locatorString: Selectors.myTimesheets.dotMenuButton, parsing: context().projectSetup.name })).toBeDisplayed();
  await elementParseAndClick(Selectors.myTimesheets.dotMenuButton, context().projectSetup.name);
  await elementParseAndClick(Selectors.myTimesheets.selectOptionFromDotMenu, optionName);
});

Then('ui: I validate that the Confirm Delete message has been removed', async () => {
  await expect(await $(Selectors.myTimesheets.Notes.validateConfirmDeleteMessage)).not.toBeExisting();
  await expect(await $(Selectors.myTimesheets.Notes.validateNotesHeaderText)).toBeExisting();
});

Then('ui: I click on Copy Prior Period', async () => {
  await clickToElement('//span[@class="switch-period-btn nextPeriod right-arr-io"]')
  await clickToElement('//span[contains(@class,"copyTimesheet")]')
});

Then('ui: I click on Save button before submitting the timesheet', async () => {
  await clickToElement('//button[contains(text(),"Save")]')
})


Then('ui: Click on retract button if available in My Timesheets', async () => {
  const ele = Selectors.myTimesheets.byPeriod.validateRetractButton
  if (!(await isElementDisplayed(ele))) {
    await clickToElement(ele);
    await clickToElement(Selectors.adminSettings.hierarchy.yesOption);
  };
});

Then('ui: Click on files button in My Timesheets', async () => {
  await clickToElement(Selectors.myTimesheets.byPeriod.uploadFilesButton)
})

Then('ui: Validate that all the files are uploaded with correct extensions in My Timesheets Tab', async () => {
  let extensionValue;
  if (await isElementDisplayed(Selectors.projectManagement.files.showMoreButton)) {
    await clickToElement(Selectors.projectManagement.files.showMoreButton);
  }

  if (context().extension.length == 1) {
    extensionValue = 'doc,docx,gif,jpeg,jpg,png,pdf,ppt,pptx,txt,vcf,csv,eml,msg,ics,mpp,xlsx,xls'
    context().extension = extensionValue.split(",");
    context().extensionUppercase = await context().extension.map(extension => extension.toUpperCase());
  }
  for (let i = 0; i < context().extension.length; i++) {
    const ele1 = Selectors.projectManagement.files.validateFilesWithExtension
      .replace('{{uploadFileName}}', context().extensionUppercase[i])
      .replace('{{extension}}', context().extension[i]);
    const ele2 = await element(ele1);
    extensionValue = await (ele2).getText();
    await context().softAssert.equal(extensionValue, `Upload${context().extensionUppercase[i]}.${context().extension[i]}`, `File Upload: {Upload${context().extensionUppercase[i]}} has wrong extension shown in the table`);
  }
})

Then(/^ui: Validate that file with extension "([^"]*)" is not uploaded and error message is found on My Timesheets page$/, async (extensionValue: string) => {
  const extensions = extensionValue.split(",");
  const extensionUppercase = await extensions.map(extension => extension.toUpperCase());
  for (let i = 0; i < extensions.length; i++) {
    const ele1 = Selectors.projectManagement.files.validateFilesWithExtension
      .replace('{{uploadFileName}}', extensionUppercase[i])
      .replace('{{extension}}', extensions[i]);
    const ele2 = await isElementDisplayed(ele1);
    await context().softAssert.isFalse(ele2, `File Upload: {Upload${extensionUppercase[i]}} is uploaded although extension {${extensionUppercase[i]}} is not yet supported`);
  }
})