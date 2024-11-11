import { Then } from '@cucumber/cucumber';
import Selectors from '../../../../core/selectors';
import { clickToElement } from '../../../../core/func';


Then('ui: Click on Language dropdown in Profile', async () => {
    await clickToElement(Selectors.siteHeader.profile.languageDropdownOpener)
});