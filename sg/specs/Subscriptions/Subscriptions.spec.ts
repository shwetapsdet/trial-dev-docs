/* eslint-disable max-len */
import { Then } from '@wdio/cucumber-framework';
import {
  clickToElement, elementParseAndClick, 
} from '../../../../core/func';
import Selectors from '../../../../core/selectors';

import { SHORT_PAUSE } from '../../../../core/timeouts';

Then('ui: Click on login user header and click on Subscriptions', async () => {
  await clickToElement(Selectors.common.loginName);
  await clickToElement(Selectors.siteHeader.profile.options.subscriptions);
});

Then(/^ui: Click on specific tab "(Timesheet|Project|Resource Request)" in Subscriptions$/, async (tab: string) => {
  await elementParseAndClick(Selectors.subscriptions.specificTab, tab);
});

Then(/^ui: Set value "(Yes|No)" for Timesheet status "(ApprovedOrSubmitted|RejectedOrRetracted|Notsubmitted)" in specific section "(My timesheet|Timesheet management)" in Subscriptions timesheet tab$/, async (value: string, status: string, sectionName: string) => {
  let locationString;
  switch (status) {
    case "ApprovedOrSubmitted":
      locationString = Selectors.subscriptions.approvedOrSubmittedTimesheetPermissionCell;
      break;
    case "RejectedOrRetracted":
      locationString = Selectors.subscriptions.rejectedOrRetractedTimesheetPermissionCell;
      break;
    case "Notsubmitted":
      locationString = Selectors.subscriptions.notSubmittedTimesheetPermissionCell;
      break;
    default: throw Error(`Status:{${status}} is not yet supported. Supported values\n1.Approved\n2.Rejected\n3.Not submitted`);
  }
  const ele = locationString.replace('{{section}}', sectionName);
  await clickToElement(ele);
  await browser.pause(SHORT_PAUSE / 2);
  await clickToElement(Selectors.subscriptions.editPermissionButton);
  await elementParseAndClick(Selectors.subscriptions.YesNoValueInPermissionDropdown, value);
  await clickToElement(Selectors.subscriptions.saveSubscriptionInPermissionDropdown);
});