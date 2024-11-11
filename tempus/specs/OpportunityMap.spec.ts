import { Then } from '@cucumber/cucumber';
import { elementParse, elementParseAndClick, clickToElement, isElementDisplayed, locatorParse, selectFromDropdown} from '../../../core/func';
import Selectors from '../../../core/selectors';
import { context } from '../../../utils/context';
import { ELEMENT_TIMEOUT, MEDIUM_PAUSE, SHORT_PAUSE} from '../../../core/timeouts';
const moment = require('moment');
const path = require('path');

Then(/^ui: Click on "(Availability Unit|Timeframe)" dropdown and select: "([^"]*)" if not selected already in the Opportunity Map$/,async (dropdownType: string, dropdownOption: string) => {
    const ele = !(await isElementDisplayed(await locatorParse(Selectors.tempus.modelView.lowerTabs.financialGridTab.validateTimeFrameActiveValue, dropdownOption)));
    await browser.pause(2000);    
    switch (dropdownType) {
        case 'Timeframe':
            if(ele && (dropdownOption=='Month' || dropdownOption=='Week')) {
                await selectFromDropdown({
                    dropdownOpener: Selectors.tempus.opportunityMap.timeFrameDropdownOpener,
                    dropdownSelection: `//span[contains(text(),"${dropdownOption}")]`
                }) 
            } else if(dropdownOption=='Time' || dropdownOption=='FTE') {
                throw new Error(`${dropdownType} dropdown: The selected option donot match with the available option`);
            }
            break;
        case 'Availability Unit':
            if(ele && (dropdownOption=='Time' || dropdownOption=='FTE')) {
                await selectFromDropdown({
                    dropdownOpener: Selectors.tempus.modelView.lowerTabs.financialGridTab.timeFrameDropdown,
                    dropdownSelection: `//span[contains(text(),"${dropdownOption}")]`
                }) 
            } else if(dropdownOption=='Month' || dropdownOption=='Week') {
                throw new Error(`${dropdownType} dropdown: The selected option donot match with the available option`);
            }
            break;   
        default: throw new Error(`The selected dropdown type '${dropdownType}' is not available on the Opportunity Map.\nThe available Options are: \n1. Availability Unit \n2. Timeframe`);
    }
})

Then(/^ui: I click on Option "([^"]*)" row to open specific grid view$/,async (optionNumber: string) => {
    await elementParseAndClick(Selectors.tempus.opportunityMap.openOptionView, optionNumber)
    await browser.pause(MEDIUM_PAUSE);
})

Then(/^ui: I validate if the "(Availability Unit|Timeframe)" dropdown is selected as "([^"]*)" and the grid values have been updated$/, async (dropdownType: string, dropdownOption: string) => {
    await $(Selectors.tempus.opportunityMap.validateOption1ViewOpen).waitForDisplayed({ timeout: ELEMENT_TIMEOUT });
    await browser.pause(2000);    
    
    const columnHeaderName = await $(Selectors.tempus.opportunityMap.validateColumnHead).getText();
    const gridAllocationValue = await $(Selectors.tempus.opportunityMap.validateGridAllocationValue).getText();

    switch (dropdownOption) {
        case 'Time':
            await clickToElement(Selectors.tempus.opportunityMap.validateGridAllocationValue);
            await clickToElement(Selectors.tempus.opportunityMap.openImpactAssessmentViewFromOptionView);  
            const locator = await elementParse({ locatorString: Selectors.tempus.modelView.impactAssessmentView.allocationValue, parsing: context().projectSetup.name });
            const impactAssessmentallocationValue = await locator.getText();  
            await context().softAssert.equal(impactAssessmentallocationValue, '22.73', `Allocation Value: The allocated value is not same in the heatmap as per the allocation input in the Project Management`);
            await clickToElement(Selectors.tempus.opportunityMap.closeImpactAssessmentView);
            break;
        case 'FTE':
            await clickToElement(Selectors.tempus.opportunityMap.validateGridAllocationValue);
            await clickToElement(Selectors.tempus.opportunityMap.openImpactAssessmentViewFromOptionView); 
            const locator1 = await elementParse({ locatorString: Selectors.tempus.opportunityMap.validateImpactAssessmentFTE, parsing: context().projectSetup.name });
            const impactAssessmentallocationValueFTE = await locator1.getText();
            await context().softAssert.equal(impactAssessmentallocationValueFTE, '1.01', `Allocation Value: The allocated value is not same in the heatmap as per the allocation input in the Project Management`);
            await clickToElement(Selectors.tempus.opportunityMap.closeImpactAssessmentView);
            break;
        case 'Month':
            await context().softAssert.equal(columnHeaderName, 'Mar 23', `Column Head: The expected column header is not same as per ${dropdownType} {${dropdownOption}}`);
            await context().softAssert.equal(gridAllocationValue, '3.50', `Column Head Value: The expected column header allocation value is not updated as per ${dropdownType} {${dropdownOption}}`);
            break;
        case 'Week':
            await context().softAssert.equal(columnHeaderName, 'Jan 23 Week 1', `Column Head: The expected column header is not same as per ${dropdownType} {${dropdownOption}}`);
            await context().softAssert.equal(gridAllocationValue, '0.23', `Column Head Value: The expected column header allocation value is not updated as per ${dropdownType} {${dropdownOption}}`);
            break;
        default: throw new Error(`The selected dropdown type '${dropdownType}' is not available on the Opportunity Map.\nThe available Options are: \n1. Availability Unit \n2. Timeframe`);
    }
    await clickToElement(Selectors.tempus.opportunityMap.cancelBUttonInOptionView);

})

Then(/^ui: I update the start date in the opportunity map as "([^"]*)" of the month "([^"]*)" of current year$/,async (startDate: string, startMonth: string) => {
    await clickToElement(Selectors.tempus.opportunityMap.openCalenderStartDate);
    await clickToElement(Selectors.tempus.opportunityMap.openDatePicker);
    await elementParseAndClick(Selectors.tempus.opportunityMap.selectDateOrMonth, startMonth);
    await elementParseAndClick(Selectors.tempus.opportunityMap.selectDateOrMonth, startDate);
})

Then(/^ui: I click on "(Named Resources|Resource Aggregate)" button on Opportunity map$/,async (resourceType: string) => {
    await elementParseAndClick(Selectors.tempus.opportunityMap.selectNamedOrAggerateResource, resourceType);
    await browser.pause(SHORT_PAUSE);
})

Then(/^ui: I validate that "(Named Resources|Resource Aggregate)" is updated in the option view$/, async (resourceType: string) => {
    if(resourceType=="Named Resources") {
        const ele = await isElementDisplayed(await locatorParse(Selectors.tempus.opportunityMap.validateNamedOrAggerateResourceInOptionView, context().resourceSetup.name));
        await context().softAssert.isTrue(ele, `Resource Type: {${resourceType}} didn't updated as expected`);
        await clickToElement(Selectors.tempus.opportunityMap.cancelBUttonInOptionView);
    }  else if(resourceType=="Resource Aggregate")  {
        const ele = await isElementDisplayed(await locatorParse(Selectors.tempus.opportunityMap.validateNamedOrAggerateResourceInOptionView, context().resourceSetup.name));
        await context().softAssert.isFalse(ele, `Resource Type: {${resourceType}} didn't updated as expected`);
        await clickToElement(Selectors.tempus.opportunityMap.cancelBUttonInOptionView);
    }
})