
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

import { config, data } from "../../wdio.base.conf";
import { Paths, InstancePicker, context } from "../../utils";
const fs = require('fs');
const dns = require('node:dns');

const deployServers = [...new Set(data.deployServers.map((server) => server.baseUrl))];
const RUN_TEARDOWN = process.env.RUN_TEARDOWN === 'true';
const RUN_PREREQUISITES = process.env.RUN_PREREQUISITES === 'true';

const specs: string[] = [];

for (let i = 1; i <= deployServers.length; ++i) {
  specs.push(`./features/**/GeneralSettingsPreRequisites${i}.feature`)
}

console.log(specs);

config.specs = specs

config.maxInstances = specs.length || 1;

const instancePicker = new InstancePicker(specs.length || 1);

config.outputDir = './logs'

config.waitforTimeout = 10000

config.reporters = [
  ['spec', { realtimeReporting: false }]
]

config.cucumberOpts.require = [
  "./tests/**/**/*.spec.ts",
]

config.onPrepare = function (config, capabilities) {
  if (RUN_TEARDOWN && RUN_PREREQUISITES) {
    try {
      const data = JSON.parse(fs.readFileSync(`${Paths.results}/teardown_results.json`))
      if (data.failed) {
        console.log("Teardown failed, stopping execution...");
        process.exit(1);
      }
    } catch (err) {
      console.log("Framework didn't detected testing environment teardown, stopping execution...");
      process.exit(1);
    }
  }
  fs.writeFileSync(`${Paths.results}/prerequisites.json`, JSON.stringify([]));
}

config.onWorkerStart = async function (cid, caps, specs, args, execArgv) {
  const instanceNumber = await instancePicker.acquireInstanceNumber(cid);
  process.env.instanceNumber = instanceNumber;
}

config.onWorkerEnd = async function (cid, exitCode, specs, retries) {
  await instancePicker.relinquishInstanceNumber(cid);
}

config.beforeSession = async function (config, capabilities, specs, cid) {

  dns.setDefaultResultOrder('ipv4first');

  context().user = data.deployServers[process.env.instanceNumber || 0];

  const { username } = context().user;

  const preparingStr = `PREPARING /tests/prerequisites/${specs[0].split('/tests/').pop()} (${username} - 1)`;

  console.log(preparingStr);

}

config.afterSession = function (config, capabilities, specs) {
  try {
    const next_executor = parseInt(process.env.current_executor || "0", 10) + 1;
    process.env.current_executor = next_executor.toString();

  } catch (err) {
    console.error(`afterSession error: ${err}`);
  }
},

config.afterScenario = async function (world, result, { error }) {
  fs.writeFileSync(`${Paths.results}/prerequisites.json`, JSON.stringify(result));
  if (error) {
    console.log("Framework didn't finished execution of prerequisites, stopping execution.");
    process.exit(1);
  }
},

exports.config = config
