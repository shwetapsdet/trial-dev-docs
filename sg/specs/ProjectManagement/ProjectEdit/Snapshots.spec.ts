import { Then, When } from '@cucumber/cucumber';
import { clickToElement, element, elementParse, elementParseAndClick, slowInputFilling } from '../../../../../core/func';
import { GeneralSettings, SnapshotRestoreOptions } from '../../../../../core/enums';
import Selectors from '../../../../../core/selectors';
import { context } from '../../../../../utils/context';
import { Project } from '../../../../../helpers/Project.helper';

Then('ui: Click on Create Snapshot button in Snapshots section of Project edit', async () => {
  await clickToElement(Selectors.projectManagement.snapshots.createSnapshotButton);
});

Then('ui: Click on Create Snapshot button in snapshot creation modal', async () => {
  await clickToElement(Selectors.projectManagement.snapshots.createSnapshotButtonInModal);
});

Then(/^ui: Click on snapshot "([^"]*)"$/, async (snapshotName: string) => {
  await elementParseAndClick(Selectors.projectManagement.snapshots.snapshotName, snapshotName);
});

Then(/^ui: Verify if "([^"]*)" unit is selected in $/, async (unitToBeVerified: string) => {
  switch (unitToBeVerified) {
    case GeneralSettings.Units.Time:
    case GeneralSettings.Units.Cost:
    case GeneralSettings.Units.FTE:
    case GeneralSettings.Units.Manday:
      await expect(await element(Selectors.projectManagement.sPA.specificUnitTabInput)).toBeChecked();
      break;
    case GeneralSettings.Units.FTEPercent:
      await expect(await element(Selectors.projectManagement.sPA.fTEPercentTabLabel)).toBeChecked();
      break;
    default: throw Error(`Incorrect unit:{${unitToBeVerified}}\nSupported values (Case sensitive):${Object.values(GeneralSettings.Units)}`);
  }
});

When('ui: I create project snapshot from project option', async () => {
  await Project.createSnapshot()
})

Then('ui: I validate snapshot is created', async () => {
  const el = await elementParse({
    locatorString: Selectors.projectManagement.snapshots.linkSnapshot,
    parsing: await context().snapshot.name
  })
  await expect(el).toBeDisplayed()
});

Then('ui: I validate restore icon showing in Snapshot Grid', async () => {
  const el = await elementParse({
    locatorString: Selectors.projectManagement.snapshots.btnRestoreSnapshot,
    parsing: await context().snapshot.name
  })
  await expect(el).toBeDisplayed()
});

Then('ui: I click on snapshot from snapshot table', async () => {
  await elementParseAndClick(Selectors.projectManagement.snapshots.linkSnapshot, context().snapshot.name)
})

Then('ui: I validate restore icon showing on preview panel', async () => {
  await expect(await element(Selectors.projectManagement.snapshots.preview.restoreBtn)).toBeDisplayed()
})

Then('ui: I click on snapshot preview list', async () => {
  const el = await elementParse({
    locatorString: Selectors.projectManagement.snapshots.preview.list,
    parsing: await context().snapshot.name
  });

  await el.click()
})

Then('ui: I validate resotre icon showing on preview list', async () => {
  const el = await elementParse({
    locatorString: Selectors.projectManagement.snapshots.preview.btnRestoreOnModelList,
    parsing: await context().snapshot.name 
  });

  await expect(el).toBeDisplayed()
})

Then('ui: I click on restore button from preview list', async () => {

  // slow down process so element element can render on browser
  await browser.pause(2000)
  await clickToElement(Selectors.projectManagement.snapshots.preview.restoreBtn)

})

Then('ui: I validate snapshot name and timestamp', async () => {
  const elSnapshotTitle = await elementParse({
    locatorString: Selectors.projectManagement.snapshots.restorePopup.title,
    parsing: await context().snapshot.name
  });

  await expect(elSnapshotTitle).toBeDisplayed()

});

Then(/^ui: I select "([^"]*)" from restore popup$/, async (option: string) => {
  if (option === 'RestoreOptions') {
    await clickToElement(Selectors.projectManagement.snapshots.restorePopup.restoreOptions);
  }

  else {
    const el = await elementParse({
      locatorString: Selectors.projectManagement.snapshots.restorePopup.restoreOtherOptions,
      parsing: SnapshotRestoreOptions[option]
    });

    await el.click()
  }
});

Then('ui: I validate all options toggle is enabled', async () => {
  for (const item in SnapshotRestoreOptions) {
    // loop is too fast, so slow down process by 200ms        
    await browser.pause(200);

    let el = null;

    if (item === 'RestoreOptions') {
      el = await element(Selectors.projectManagement.snapshots.restorePopup.restoreOptions);
    } else {
      el = await elementParse({
        locatorString: Selectors.projectManagement.snapshots.restorePopup.restoreOtherOptions,
        parsing: SnapshotRestoreOptions[item]
      });
    }

    const cssClass = await el.getAttribute('class')
    expect(cssClass.includes('toggled')).toEqual(true)
  }
});

Then('ui: I validate all option toggle is disabled', async () => {
  for (const item in SnapshotRestoreOptions) {
    // loop is too fast, so slow down process by 200ms        
    await browser.pause(500);

    let el = null;

    if (item === 'RestoreOptions') {
      el = await element(Selectors.projectManagement.snapshots.restorePopup.restoreOptions);
    } else {
      el = await elementParse({
        locatorString: Selectors.projectManagement.snapshots.restorePopup.restoreOtherOptions,
        parsing: SnapshotRestoreOptions[item]
      });
    }

    const cssClass = await el.getAttribute('class')
    expect(cssClass.includes('toggled')).toEqual(false)
  }
});

Then('ui: I Validate the popup error by restore button', async () => {
  await clickToElement(Selectors.projectManagement.snapshots.restorePopup.btnRestore);
  expect(await element('//*[text()="At least one option must be selected."]')).toExist();
});

Then('ui: I Validate restore button is selected properly', async () => {

  await clickToElement(Selectors.projectManagement.snapshots.restorePopup.btnRestore);
  await expect(await element('//*[text()="At least one option must be selected."]')).not.toBeDisplayed();
});

Then('ui: I Validate the tooltip on restore icon', async () => {
  await expect(await element('//*[@class="restore__toggle"]/span[@title="Restore"]')).toBeDisplayed();
});

Then(/^ui: I "(select|deselect)" all option from restore popup one by one and validate all option toggle$/, async (selectedType: string) => {
  for (const item in SnapshotRestoreOptions) {
    // loop is too fast, so slow down process by 200ms        
    await browser.pause(200);

    let el = null;

    if (item !== 'RestoreOptions') {
      el = await elementParse({
        locatorString: Selectors.projectManagement.snapshots.restorePopup.restoreOtherOptions,
        parsing: SnapshotRestoreOptions[item]
      });
      await el.click();
      const cssClass = await el.getAttribute('class')
      if (selectedType === 'select') {
        expect(cssClass.includes('toggled')).toEqual(true)
      }
      else if (selectedType === 'deselect') {
        expect(cssClass.includes('toggled')).toEqual(false)
      }
    }
  }
});

Then('ui: I restore the latest created snapshot and conform it',async () => {
  await clickToElement(Selectors.projectManagement.snapshots.restorePopup.btnRestore);
  await clickToElement(Selectors.projectManagement.snapshots.restorePopup.btnRestore);
})

Then('ui: I click on quit snapshot view from the snapshot',async () => {
  await clickToElement(Selectors.projectManagement.snapshots.quitSnapshotView);
})

Then(/^ui: I search and open for "([^"]*)" in snapshot list page$/, async (snapshotName: string) => {
  await slowInputFilling(Selectors.projectManagement.snapshots.txtQuickSearch, snapshotName);
  await elementParseAndClick('//div[@class="green-button sg_update__save_button"]', snapshotName)
});