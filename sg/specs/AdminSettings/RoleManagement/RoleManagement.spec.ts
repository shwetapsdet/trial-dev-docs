/* eslint-disable max-len */
import { Given, Then, When } from '@cucumber/cucumber';
import Selectors from '../../../../../core/selectors';
import {
  clickToElement, element, elementParse, elementParseAndClick, isElementDisplayed, locatorParse, slowInputFilling,
} from '../../../../../core/func';
import { RoleData } from '../../../../../models/RoleManagement.model';
import { context } from '../../../../../utils/context';
import { RoleManagement } from '../../../../../helpers/AdminSettings/AttributeManagement/RoleManagement.helper';
import { MEDIUM_PAUSE, SHORT_PAUSE } from '../../../../../core/timeouts';

Given(/^ui: I create a new "([^"]*)" Role and assign "([^"]*)" permission to "([^"]*)"$/,
  { timeout: 120000 },
  async (roleType: string, permissionName: string, permissionToBeApplied: string) => {
    context().globalRole = RoleData();

    const { name: roleName } = context().globalRole;

    let permissionLocator;
    // switch to specific role tab
    switch (roleType) {
      case 'Global':
        permissionLocator = Selectors
          .adminSettings
          .roleManagement
          .globalRoles
          .targetPermission
          .replaceAll('{{role_name}}', roleName)
          .replace('{{permission_name}}', permissionName);
        await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.tabTitle);
        break;
      case 'Project':
        permissionLocator = Selectors
          .adminSettings
          .roleManagement
          .projectRoles
          .targetPermission
          .replaceAll('{{role_name}}', roleName)
          .replace('{{permission_name}}', permissionName);
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
        case 'Resource':
          permissionLocator = Selectors
            .adminSettings
            .roleManagement
            .resourceRoles
            .targetPermission
            .replaceAll('{{role_name}}', roleName)
            .replace('{{permission_name}}', permissionName);
          await clickToElement(Selectors.adminSettings.roleManagement.resourceRoles.tabTitle);
          break;
      default:
        break;
    }

    await slowInputFilling(Selectors.adminSettings.roleManagement.txtNewRole, roleName);
    await clickToElement(Selectors.adminSettings.roleManagement.btnSaveRole);

    // check role is saved or not
    await expect(await element(`//span[@title="${roleName}"]`)).toBeDisplayed();

    // target specific permission and assert it visible to screen or not
    // browser refresh is required because permission table update didn't recognized
    await browser.refresh();
    switch (roleType) {
      case 'Project':
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
        case 'Global':
          await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.tabTitle);
          break;
          case 'Resource':
            await clickToElement(Selectors.adminSettings.roleManagement.resourceRoles.tabTitle);
            break;
      default:
        break;
    }

    await clickToElement(permissionLocator);

    // target edit permission button and click on it
    await clickToElement(`${permissionLocator}/span[contains(@class, "layt_editbutton")]`);

    // select grant permission and save it
    browser.execute("arguments[0].click();", await elementParse({ locatorString: Selectors.adminSettings.roleManagement.permission, parsing: permissionToBeApplied }));
    await clickToElement(Selectors.common.btnSave);
  }
);

Given(
  /^ui: I update a "([^"]*)" Role and assign "([^"]*)" permission to "([^"]*)"$/,
  async (roleType: string, permissionName: string, permissionToBeApplied: string) => {
    const { name: roleName } = context().globalRole;
    let permissionLocator;
    // switch to specific role tab
    switch (roleType) {
      case 'Global':
        permissionLocator = Selectors
          .adminSettings
          .roleManagement
          .globalRoles
          .targetPermission
          .replaceAll('{{role_name}}', roleName)
          .replace('{{permission_name}}', permissionName);
        await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.tabTitle);
        break;
      case 'Project':
        permissionLocator = Selectors
          .adminSettings
          .roleManagement
          .projectRoles
          .targetPermission
          .replaceAll('{{role_name}}', roleName)
          .replace('{{permission_name}}', permissionName);
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
      case 'Resource':
        permissionLocator = Selectors
          .adminSettings
          .roleManagement
          .resourceRoles
          .targetPermission
          .replaceAll('{{role_name}}', roleName)
          .replace('{{permission_name}}', permissionName);
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
      default:
        break;
        case 'Resource':
          permissionLocator = Selectors
            .adminSettings
            .roleManagement
            .resourceRoles
            .targetPermission
            .replaceAll('{{role_name}}', roleName)
            .replace('{{permission_name}}', permissionName);
          await clickToElement(Selectors.adminSettings.roleManagement.resourceRoles.tabTitle);
          break;
    }

    // target specific permission and assert it visible to screen or not
    // browser refresh is required because permission table update didn't recognized
    await browser.refresh();
    switch (roleType) {
      case 'Project':
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
      case 'Global':
        await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.tabTitle);
        break;
      case 'Resource':
        await clickToElement(Selectors.adminSettings.roleManagement.resourceRoles.tabTitle);
        break;
      default:
        break;
    }
    await clickToElement(permissionLocator);

    // target edit permission button and click on it
    await clickToElement(`${permissionLocator}/span[contains(@class, "layt_editbutton")]`);

    // select grant permission and save it
    browser.execute("arguments[0].click();", await elementParse({ locatorString: Selectors.adminSettings.roleManagement.permission, parsing: permissionToBeApplied }));
    await clickToElement(Selectors.common.btnSave);
  }
);

Then(/^ui: I update permisson for "([^"]*)"$/,async (permissionType: string) => {
  await browser.pause(SHORT_PAUSE);
  let permissionLocator;
  if(permissionType === 'Restore_Snapshot'){
    permissionLocator = Selectors
      .adminSettings
      .roleManagement
      .projectRoles
      .snapshotRestore;
  }
  else if(permissionType === 'Access_Snapshot'){
    permissionLocator = Selectors
      .adminSettings
      .roleManagement
      .projectRoles
      .snapshotAccess;
  }
  else if(permissionType === 'Access_Team'){
    permissionLocator = Selectors
      .adminSettings
      .roleManagement
      .projectRoles
      .accessTeam;
  }
  await browser.pause(SHORT_PAUSE);
  await (await $(permissionLocator)).scrollIntoView();
  await clickToElement(permissionLocator); 
  await clickToElement(`${permissionLocator}/span[contains(@class, "layt_editbutton")]`);
  await browser.pause(SHORT_PAUSE);
  if(permissionType === 'Restore_Snapshot'){
    await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.permissions.grant);
  }
  else if(permissionType === 'Access_Snapshot' || permissionType === 'Access_Team'){ 
    await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.permissions.edit);
  }
  await clickToElement(Selectors.common.btnSave);
})

When(/^ui: I create a Project Role for "([^"]*)"$/, { timeout: 120000}, async (feature: string ) => {
  await feature
  await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
  context().projectRole = RoleData();
  const { name: roleName } = context().projectRole;

  await slowInputFilling(Selectors.adminSettings.roleManagement.txtNewRole, roleName);
  await clickToElement(Selectors.adminSettings.roleManagement.btnSaveRole);

  // check role is saved or not
  await browser.refresh();
  await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
  await expect(await element(`//span[@title="${roleName}"]`)).toBeDisplayed();
  await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);

});

When(/^ui: I click on specific permission "([^"]*)" and select access "([^"]*)" in "([^"]*)" tab$/, async (permissionToBeSelected: string, permission: string, primaryRole: string) => {
  const { name: roleName } = context().globalRole;
  await RoleManagement.clickOnSpecificRolePermissionInSpecificTabAndSave(permissionToBeSelected, permission, primaryRole, roleName);
});

When(/^ui: I multi select permissions using shiftkey in "([^"]*)" tab, first column "([^"]*)", last column "([^"]*)", permission "([^"]*)"$/, async (primaryRole: string, firstPermissionToBeSelected: string, lastPermissionToBeSelected: string, permission: string) => {
  const { name: roleName } = context().globalRole;
  await RoleManagement.multiSelectPermissionsUsingShiftKey(primaryRole, roleName, firstPermissionToBeSelected, lastPermissionToBeSelected, permission);
});

Then('ui: I validate that the role has been removed from the list',async () => {
  const { name: roleName } = context().globalRole;
  await browser.pause(5000);
  const ele = await isElementDisplayed(await locatorParse(Selectors.adminSettings.roleManagement.roleValdiateByName, roleName));
  await context().softAssert.isFalse(ele, `The Role {${roleName}}} is still displayed and not removed`);
})

Then(/^ui: I delete the newly created role from "([^"]*)" tab$/,async (tabName: string) => {
  const { name: roleName } = context().globalRole;
    let permissionLocator;
    // switch to specific role tab
    switch (tabName) {
      case 'Global':
        await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.tabTitle);
        break;
      case 'Project':
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
      case 'Resource':
        await clickToElement(Selectors.adminSettings.roleManagement.resourceRoles.tabTitle);
        break;
      default:
        break;
    }
    await browser.pause(MEDIUM_PAUSE/2);
    await elementParseAndClick(Selectors.adminSettings.roleManagement.deleteRole, roleName);
    await clickToElement(Selectors.adminSettings.roleManagement.conformDeleteRoleButton);
})

Then(/^ui: I navigate to the "([^"]*)" tab$/,async (tabName: string) => {
    // switch to specific role tab
    switch (tabName) {
      case 'Global':
        await clickToElement(Selectors.adminSettings.roleManagement.globalRoles.tabTitle);
        break;
      case 'Project':
        await clickToElement(Selectors.adminSettings.roleManagement.projectRoles.tabTitle);
        break;
      case 'Resource':
        await clickToElement(Selectors.adminSettings.roleManagement.resourceRoles.tabTitle);
        break;
      default:
        break;
    }
})

Then('ui: I expand the Dependent entities modal and click on Project Access Redirect link',async () => {
  await clickToElement(Selectors.adminSettings.roleManagement.dependentEntityModal);
  await clickToElement(Selectors.adminSettings.roleManagement.redirectLink);
})

Then('ui: I validate that the link for Project Access gets redirect perfectly',async () => {
  const ele = await isElementDisplayed('//span[text()="Project"]/parent::span');
  await context().softAssert.isTrue(ele, `The Rule is still not displayed, the redirect link didnot worked as expected`);
});

