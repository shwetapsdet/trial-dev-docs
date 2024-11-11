import { Given } from '@cucumber/cucumber';
import { context } from '../../../../utils/context';
import { projectModel } from '../../../../models/project.model';
import { resourceModel } from '../../../../models/resource.model';
import { attributeModel, resourcesListAttributeModel , attributeNewSectionModel } from '../../../../models/Attribute.model';
import { viewModel } from '../../../../models/ViewManagement.model';
import { workflowUserModel } from '../../../../models/WorkflowUser.model';
import { fiscalModel } from '../../../../models/FiscalPeriodManagement.model';
import { reportModel } from '../../../../models/ReportManagement.model';
import SoftAssert from '../../../../core/softAssert';
import { milestoneModel } from '../../../../models/Milestones.model';
import { projectWorkflow } from '../../../../models/ProjectWorkflow.model';
import { kanbanModel } from '../../../../models/kanban.model';
import { calendarModel } from '../../../../models/calendar.model';
import { tempusModel } from '../../../../models/Tempus.model';
import { sheetTemplateModel } from '../../../../models/SheetTemplate.model';
import { projectHierarchyModel } from '../../../../models/projectHierarchy.model';
import { resourceHierarchyModel } from '../../../../models/resourceHierarchy.model';
import { workflowManagementModel } from '../../../../models/WorkflowManagement.model';


Given(/^setup: Test Data "([^"]*)"$/, async (setupItem: string) => {
  await browser.pause(500); // timeskip for instance
  switch (setupItem) {
    case 'Project':
      context().projectSetup = projectModel();
      break;

    case 'Resource':
      context().resourceSetup = resourceModel();
      break;

    case 'Resource2':
      context().resourceSetup2 = resourceModel();
      break;

    case 'Resource List Attribute':
      context().attributeSetup = resourcesListAttributeModel();
      break;

    case 'Section Name':
      context().sectionSetup = attributeNewSectionModel();
      break;

    case 'View':
      context().viewSetup = viewModel();
      break;

    case 'WorkflowUser':
      context().workflowUserSetup = workflowUserModel();
      break;

    case 'WorkflowManagement':
      context().workflowManagementSetup = workflowManagementModel();
      break;

    case 'Fiscal':
      context().viewSetup = fiscalModel();
      break;

    case 'SoftAssert':
      context().softAssert = new SoftAssert();
      break;

    case 'Report':
      context().viewSetup = reportModel();
      break;

    case 'Project2':
      context().projectSetup2 = projectModel();
      break;

    case 'Milestone':
      context().milestoneSetup = milestoneModel();
      break;

    case 'Kanban':
      context().kanbanSetup = kanbanModel();
      break;

    case 'Project Hierarchy':
      context().projectHierarchySetup = projectHierarchyModel();
      break;

    case 'Resource Hierarchy':
      context().resourceHierarchySetup = resourceHierarchyModel();
      break;

    case 'Calendar':
      context().calendarSetup = calendarModel();
      break;

    case 'Tempus Model':
      context().modelSetup = tempusModel();
      break;
    case 'Sheet Template1':
      context().sheetTemplate1 = sheetTemplateModel();
      break;
    case 'Sheet Template2':
      context().sheetTemplate2 = sheetTemplateModel();
      break;
    default: throw Error(`Test Data setup for :{${setupItem}} is not yet supported.\nPlease add if required\n
    Supported values :\n1.Project\n2.Resource\n3.Resource List Attribute\n4.View\n5.WorkflowUser\n6.Fiscal\n7.SoftAssert\n8.Report\n9.Kanban\n10.Milestone\n.11.Calendar\n12.Tempus Model\n13.Resource2`);
  }
});

Given(/^setup: Test Data setup for Attribute of type:"([^"]*)" with "([^"]*)" number of selection values, "([^"]*)" number of default values and create default values:"(true|false)"$/,
  async (attributeType: string, numberOfSelectionValues: number, numberOfDefaults: number, createDefaultValues: boolean) => {
    await browser.pause(500); // timeskip for instance
    context().attributeSetup = attributeModel(attributeType, numberOfSelectionValues, numberOfDefaults, createDefaultValues);
  });

Given(/^setup: Test Data for a Project Workflow with "([^"]*)" number of state fields$/, async (numberOfStateFields: number) => {
  context().projectWorkflowSetup = projectWorkflow(numberOfStateFields);
});

Given(/^setup: Test Data setup for "([^"]*)" Attributes of type:"([^"]*)" with "([^"]*)" number of selection values, "([^"]*)" number of default values and create default values:"(true|false)"$/,
  async (numberOfAttributes: number, attributeType: string, numberOfSelectionValues: number, numberOfDefaults: number, createDefaultValues: boolean) => {
    await browser.pause(500); // timeskip for instance
    const attributeTypes = attributeType.split(",");
    context().attributesSetup = [];
    for (let i = 0; i < numberOfAttributes; i++) {
      context().attributesSetup.push(attributeModel(attributeTypes[i], numberOfSelectionValues, numberOfDefaults, createDefaultValues));
    }
  });