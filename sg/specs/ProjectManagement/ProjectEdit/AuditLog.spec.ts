import { Then } from '@cucumber/cucumber';
import { context } from '../../../../../utils/context';
import {isElementDisplayed} from '../../../../../core/func';


Then(/^ui: Validate that the file with extension "([^"]*)" are updated as uploaded in the Audit log$/, async (extensionValue: string) => {
    context().extension = extensionValue.split(",");
    context().extensionUppercase = await context().extension.map(extension => extension.toUpperCase());
    for (let i = 0; i < context().extension.length; i++) {
        const ele = '//span[text()=" Upload{{extensionValue}}.{{extension}}"]'
            .replace('{{extensionValue}}', context().extensionUppercase[i])
            .replace('{{extension}}', context().extension[i]);
        await (await $(ele)).scrollIntoView();
        await context().softAssert.isTrue(await isElementDisplayed(ele), `Audit log: {Upload${context().extensionUppercase[i]}} is still not shown in Audit log`)
    }
  })