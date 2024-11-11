import { Then } from '@cucumber/cucumber';
import { clickToElement, element, elementParse } from '../../../../../core/func';
import { GeneralSettings } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';

Then(/^ui: Verify if "([^"]*)" unit is selected in Resource Replace from SPA$/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await elementParse({ locatorString: Selectors.projectManagement.resourceReplace.specificUnitTabLabel, parsing: unitToBeVerified });
      await expect(await elementParse({ locatorString: Selectors.projectManagement.resourceReplace.specificUnitTabInput, parsing: unitToBeVerified })).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await element(Selectors.projectManagement.resourceReplace.fTEPercentTabLabel);
      await expect(await element(Selectors.projectManagement.resourceReplace.fTEPercentTabInput)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):\n1.Time\n2.FTE\n3.FTE %\n4.Manday`);
  }
});

Then('ui: Click on Cancel button in Resource Replace', async () => {
  await clickToElement(Selectors.projectManagement.resourceReplace.cancelButton);
});
