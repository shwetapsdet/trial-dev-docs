import { Then } from "@cucumber/cucumber";
import { context } from "../../../../../utils/context";
import { deleteProject } from "../../../../../apiOperations/deleteProject.operations";

Then('ui: I delete all created projects using id', async () => {
  await deleteProject.deleteProjectWithIdIfFound(context().user.baseUrl, context().token, context().projectId);
  });