import { Then } from '@wdio/cucumber-framework';
import { clickToElement, element, elementDragAndDrop, elementParse, elementParseAndClick, isElementDisplayed, locatorParse, slowInputFilling } from "../../../../../core/func";
import { MEDIUM_PAUSE, SHORT_PAUSE } from "../../../../../core/timeouts";
import { context } from "../../../../../utils/context";
import { waitForFileToDownload } from '../../../../../core/fileUtilities';
import Selectors from '../../../../../core';
const path = require('path');

Then(/^ui: Upload file with extensions "([^"]*)"$/, async (extensionValue: string) => {
  context().extension = extensionValue.split(",");
  context().extensionUppercase = await context().extension.map(extension => extension.toUpperCase());
  for (let i = 0; i < context().extension.length; i++) {
    const elFileInput = await element(Selectors.projectManagement.files.uploadFilesButton);
    await elFileInput.waitForEnabled({ timeout: 60000 });
    await browser.uploadFile(path.join(__dirname, `../../../../../data/DummyUploadFiles/Upload${context().extensionUppercase[i]}.${context().extension[i]}`));
    await elFileInput.addValue(path.join(__dirname, `../../../../../data/DummyUploadFiles/Upload${context().extensionUppercase[i]}.${context().extension[i]}`));
    await browser.pause(SHORT_PAUSE);
  }
})

Then('ui: Validate that all the files are uploaded with correct extensions in Attribute Tab', async () => {
  if (await isElementDisplayed(Selectors.projectManagement.files.showMoreButton)) {
    await clickToElement(Selectors.projectManagement.files.showMoreButton);
  }
  if (await isElementDisplayed(Selectors.common.isResourceManager)) {
    await clickToElement(Selectors.projectManagement.projectEdit.requiredFieldExpand);
  }
  for (let i = 0; i < context().extension.length; i++) {
    const ele1 = Selectors.projectManagement.files.validateFilesWithExtension
      .replace('{{uploadFileName}}', context().extensionUppercase[i])
      .replace('{{extension}}', context().extension[i]);
    await $(ele1).scrollIntoView();
    const ele2 = await element(ele1);
    const extensionValue = await (ele2).getText();
    await context().softAssert.equal(extensionValue, `Upload${context().extensionUppercase[i]}.${context().extension[i]}`, `File Upload: {Upload${context().extensionUppercase[i]}} has wrong extension shown in the table`);
  }
})

Then(/^ui: Softassert if file with extension "([^"]*)" got downloaded in directory:"([^"]*)" under project's root directory$/, async (extensionValue: string, folderName: string) => {
  const expectedFileName = `Upload${extensionValue.toUpperCase()}.${extensionValue}`;
  const defaultDownloadDirectory = path.join(process.cwd(), folderName);
  const filePath = path.join(defaultDownloadDirectory, expectedFileName);
  try {
    await waitForFileToDownload(filePath, expectedFileName);
  } catch (error) {
    await context().softAssert.isTrue(false, `File:{${expectedFileName}} was not downloaded in directory:{${defaultDownloadDirectory}}`);
  }
});

Then(/^ui: I download file with extension "([^"]*)"$/, async (extensionValue: string) => {
  await browser.pause(MEDIUM_PAUSE/2);
  if(!(await isElementDisplayed(Selectors.projectManagement.files.sheetDownload))) {
    await browser.refresh();
  }
  if((await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.downloadFilesByExtension, extensionValue.toUpperCase()))) && (context().subFolderName!= undefined)) {
    await elementParseAndClick(Selectors.projectManagement.files.validateFolderDisplayed, context().subFolderName);
  }
  await elementParseAndClick(Selectors.projectManagement.files.downloadFilesByExtension, extensionValue.toUpperCase());
});

Then(/^ui: Validate that file with extension "([^"]*)" is not uploaded and error message is found$/, async (extensionValue: string) => {
  const extensions = extensionValue.split(",");
  const extensionUppercase = await extensions.map(extension => extension.toUpperCase());
  for (let i = 0; i < extensions.length; i++) {

    const ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.files.validateWrongFileExtension, extensionUppercase[i]));
    await context().softAssert.isFalse(ele, `File Upload: {Upload${extensionUppercase[i]}} has wrong extension shown in the table`);
  }
})

Then('ui: Validate that all the files are uploaded with correct extensions in Files Tab', async () => {
  await browser.pause(MEDIUM_PAUSE);
  await browser.refresh();
  await browser.pause(SHORT_PAUSE);
  for (let i = context().extension.length - 1; i >= 0; i--) {
    await (await $(locatorParse(Selectors.projectManagement.files.validateFilesByExtension, context().extensionUppercase[i]))).scrollIntoView();
    const ele = await elementParse({ locatorString: Selectors.projectManagement.files.validateFilesByExtension, parsing: context().extensionUppercase[i] });
    const extensionValue = await (ele).getText();
    await context().softAssert.equal(extensionValue, `.${context().extension[i]}`, `File Upload: {Upload${context().extensionUppercase[i]}} has wrong extension shown in the table`);
  }
})

Then(/^ui: I download file with extension "([^"]*)" on the Attribute or My Timesheets page$/, async (extensionValue: string) => {
  const ele = Selectors.projectManagement.files.validateFilesWithExtension
    .replace('{{uploadFileName}}', extensionValue.toUpperCase())
    .replace('{{extension}}', extensionValue);
  await clickToElement(ele);
});

Then(/^ui: Validate that file with extension "([^"]*)" is not uploaded and error message is found on attribute page$/, async (extensionValue: string) => {
  const extensions = extensionValue.split(",");
  const extensionUppercase = await extensions.map(extension => extension.toUpperCase());
  for (let i = 0; i < extensions.length; i++) {
    const ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.validateFileUploadWithExtension, extensionUppercase[i]));
    await context().softAssert.isTrue(ele, `File Upload: {Upload${extensionUppercase[i]}} is uploaded although extension {${extensionUppercase[i]}} is not yet supported`);
  }
})

Then(/^ui: I create new folder name "([^"]*)"$/, async (subFolderName: string) => {
  context().subFolderName = subFolderName;
  await clickToElement(Selectors.projectManagement.files.addNewSubFolderButton);
  await slowInputFilling(Selectors.projectManagement.files.inputSubFolderName, context().subFolderName);
  await clickToElement(Selectors.projectManagement.files.saveButton);
});

Then('ui: I validate that the Subfolder has been created successfully', async () => {
  const ele = await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.validateFolderDisplayed, context().subFolderName));
  await context().softAssert.isTrue(ele, `Folder: {${context().subFolderName}} is not yet displayed in the Viewpoint`);
});

Then('ui: I select the newly created SubFolder', async () => {
  await elementParseAndClick(Selectors.projectManagement.files.validateFolderDisplayed, context().subFolderName);
})

Then(/^ui: Validate that file with extension "([^"]*)" are not present in the SubFolder$/, async (extensionValue: string) => {
  const extensions = extensionValue.split(",");
  const extensionsUppercase = await extensions.map(extension => extension.toUpperCase());

  for (let i = 0; i < extensions.length; i++) {
    const ele = await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.validateWrongFileExtension, extensionsUppercase[i]));
    await context().softAssert.isFalse(ele, `File Upload: {Upload${extensionsUppercase[i]}} are still displayed in the SubFolder`);
  }
});

Then(/^ui: I move the "([^"]*)" from the "([^"]*)" to the "([^"]*)"$/, async (extensionValue: string, sourceFolder: string, destinationFolder: string) => {

  if (destinationFolder == 'Primary Files Folder') {
    destinationFolder = 'Files'
  } else if( sourceFolder == 'Primary Files Folder' ) {
    sourceFolder = 'Files'
  };

  if(!await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.validateFocusedFolder, sourceFolder))) {
    await elementParseAndClick(Selectors.projectManagement.files.validateFolderDisplayed, context().subFolderName);
  };

  const extensions = extensionValue.split(",");
  const extensionUppercase = await extensions.map(extension => extension.toUpperCase());
  for (let i = 0; i < extensions.length; i++) {

    const ele = await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.dragSourceFilesByExtension, extensionUppercase[i]));
    await context().softAssert.isTrue(ele, `File Upload: {Upload${extensionUppercase[i]}} is not displayed in the list`);
    await elementDragAndDrop(
      await locatorParse(Selectors.projectManagement.files.dragSourceFilesByExtension, extensionUppercase[i]),
      await locatorParse(Selectors.projectManagement.files.validateFolderDisplayed,destinationFolder)
    )
  }
})

Then(/^ui: I validate that file with extension "([^"]*)" are present in the "([^"]*)"$/, async (extensionValue: string, folderName: string) => {
  if (folderName == 'Primary Files Folder') {
    folderName = 'Files'
  };
  
  if(!await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.validateFocusedFolder, folderName))) {
    await elementParseAndClick(Selectors.projectManagement.files.validateFolderDisplayed, folderName);
  };

  const extensions = extensionValue.split(",");
  const extensionUppercase = await extensions.map(extension => extension.toUpperCase());
  for (let i = 0; i < extensions.length; i++) {
    const ele = await isElementDisplayed(locatorParse(Selectors.projectManagement.files.validateFilesByExtension, extensionUppercase[i]));
    await context().softAssert.isTrue(ele, `Move File: {Upload${extensionUppercase[i]}} is moved to {${folderName}}, yet not displayed `);
  }
})


Then(/^ui: I validate that Alias of File Management is updated to "([^"]*)" in "([^"]*)"$/, async (aliasName: string, validateSection: string) => {
  let ele;
  switch (validateSection) {
    case "Scribe Modal":
      ele = await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.validateFileManagementAlias + '[2]', aliasName));
      break;
    case "Filter under scribe modal":
      ele = await isElementDisplayed(await locatorParse(Selectors.projectManagement.files.validateFileManagementAlias + '[1]', aliasName));
      break;
    case "Import from Template modal":
    case "Create Project from template modal":
    case "Scribe Rollup":
    ele = await isElementDisplayed(await locatorParse(Selectors.scribe.validateAlias, aliasName));
    break;
    case "Filter by section under scribe rollup":
    ele = await isElementDisplayed(await locatorParse(Selectors.scribe.validateAlias+'[2]', aliasName));
    break;
    default:
      break;
  }
    await context().softAssert.isTrue(ele, `Alias: File Management alias is not yet updated to {${aliasName}} in {${validateSection}}`);
})