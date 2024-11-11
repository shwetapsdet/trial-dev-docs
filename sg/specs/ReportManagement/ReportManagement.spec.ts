import { Then } from '@wdio/cucumber-framework';
import Selectors from '../../../../core/selectors';
import { clickToElement } from '../../../../core/func';


Then(/^ui: Click on "([^"]*)" tile in Report Management$/, async (tileName: string) => {
  const supportedTabs = ['pivot grid', 'pivot chart', 'rar grid', 'rar chart', 'rar2 chart', 'portfolio planner', 'dashboards'];
  switch (tileName.toLowerCase()) {
    case 'pivot grid':
      await clickToElement(Selectors.reportManagement.pivotGridTile);
      break;
    case 'pivot chart':
      await clickToElement(Selectors.reportManagement.pivotChartTile);
      break;
    case 'rar grid':
      await clickToElement(Selectors.reportManagement.rarGridTile);
      break;
    case 'rar chart':
      await clickToElement(Selectors.reportManagement.rarChartTile);
      break;
    case 'rar2 chart':
      await clickToElement(Selectors.reportManagement.rar2ChartTile);
      break;
    case 'portfolio planner':
      await clickToElement(Selectors.reportManagement.portfolioPlannerTile);
      break;
    case 'dashboards':
    case 'dashboard':
      await clickToElement(Selectors.reportManagement.dashboardsTile);
      break;
    default:
      throw new Error(`Invalid Tile Name:${tileName}\nSupported Values:\n${supportedTabs}`);
  }
});