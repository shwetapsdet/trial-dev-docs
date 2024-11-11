
import { Then } from '@wdio/cucumber-framework';
import Selectors from '../../../../core/selectors';
import { element, locatorParse, } from '../../../../core/func';

Then('ui: Wait for Config tab to be clickable in RAR Grid section', async () => {
    await element(locatorParse(Selectors.reportManagement.pivotGrid.specificTab, "Config"));
});