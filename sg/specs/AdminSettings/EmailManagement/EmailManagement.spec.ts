import { Then } from '@wdio/cucumber-framework';
import Selectors from '../../../../../core/selectors';
import { clickToElement, elementArray, locatorParse } from '../../../../../core/func';
import { SHORT_PAUSE } from '../../../../../core/timeouts';

Then(/^ui: Click on Event:"(Approved|Submitted|Not Submitted|Rejected|Retracted*)" of "(Timesheet User|Timesheet Approver)" in Email Management$/, async (
    event: string, user: string) => {
    await clickToElement(locatorParse(Selectors.adminSettings.emailManagement.specificEventName, `${user}: ${event}`));
});

Then('ui: Click on Event Description text area in Edit Event section', async () => {
    await clickToElement(Selectors.adminSettings.emailManagement.eventDescriptionTextarea);
});

Then('ui: Click on all variables in Edit Event section', async () => {
    const emailVariables = await elementArray(Selectors.adminSettings.emailManagement.emailVariables);
    for (const emailVar of emailVariables) {
        await emailVar.waitForClickable();
        await emailVar.click()
        await browser.pause(SHORT_PAUSE / 2);
    }
});