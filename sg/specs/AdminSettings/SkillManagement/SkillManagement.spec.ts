import { When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import Selectors from '../../../../../core/selectors';
import { locatorParse } from '../../../../../core/func';
import { context } from '../../../../../utils/context';
import { SkillManagement } from '../../../../../helpers/AdminSettings/SkillManagement.helper';

const skillName = `AutomationSkill-${faker.string.numeric(6)}`;
context().skillName =  skillName;

/* eslint-disable no-unused-vars */
When(/^ui: Create new Skill with skill type as "([^"]*)"$/, async (skillType) => {
  await SkillManagement.createNewSkillWithSkillType(skillType)
})

When('ui: I delete the previous created skill',async () => {
  await SkillManagement.deletePreviousSkill()
})

When(/^ui: I validate that the skill is "([^"]*)" in SkillManagement$/, async (skillStatus:string) => {
  const ele = locatorParse(Selectors.adminSettings.skillManagement.validateSkillByName, context().skillName)
  if(skillStatus==="included") {
    await expect(await $(ele)).toBeDisplayed()
  }
  else {
    await expect(await $(ele)).not.toBeDisplayed()
  }
})