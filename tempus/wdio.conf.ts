/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

const fs = require('fs');
const dns = require('node:dns');

import { config, data } from '../../wdio.base.conf'
import { Paths, InstancePicker, context } from "../../utils";
import { WAIT_FOR_TIMEOUT } from "../../core/timeouts";

const maxInstances = data.maxInstance || 1;
const instancePicker = new InstancePicker(maxInstances);
const RUN_TEARDOWN = process.env.RUN_TEARDOWN === 'true';
const RUN_PREREQUISITES = process.env.RUN_PREREQUISITES === 'true';

config.specs = [
  './features/**/*.feature'
]

config.maxInstances = maxInstances

config.outputDir = Paths.logs_directory

config.waitforTimeout = WAIT_FOR_TIMEOUT

config.reporters = [
  ['spec', { realtimeReporting: false }],
  ['allure', {
    outputDir: Paths.allure_results_directory,
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
    useCucumberStepReporter: true,
    issueLinkTemplate: "https://prosymmetry.atlassian.net/browse/{}",
    tmsLinkTemplate: "https://prosymmetry.atlassian.net/browse/{}",
  }],
  ['junit', {
    outputDir: './reports/',
    outputFileFormat: function(options) {
      return `results-${new Date().getTime()}.xml`
    }
  }],
  [
    'cucumberjs-json', {
      jsonFolder: Paths.cucumber_json_results
    }
  ]
]

config.cucumberOpts.require = [
  "./tests/**/**/*.spec.ts",
]


config.onPrepare = function (config, capabilities) {
  if (RUN_TEARDOWN && RUN_PREREQUISITES) {
    try {
      const data = JSON.parse(fs.readFileSync(`${Paths.results}/prerequisites.json`));
      if (data.failed) {
        console.log("Pre-Requisites failed, stopping execution...");
        process.exit(1);
      }
    } catch (err) {
      console.log("Framework didn't detected testing environment Pre-Requisites executed, stopping execution...");
      process.exit(1);
    }
  }
},

config.onWorkerStart = async function (cid, caps, specs, args, execArgv) {
  const instanceNumber = await instancePicker.acquireInstanceNumber(cid);
  let failedScenarios;

  try {
    failedScenarios = JSON.parse(fs.readFileSync(`worker_context/${cid}`)).failedScenarios;
  } catch (err) {
    failedScenarios = '';
  }

  try { 
    fs.rmSync(`worker_context/${cid}`);
  } catch {}
  
  try {

    let tagExpression = args?.cucumberOpts?.tagExpression;

    if(!args?.cucumberOpts?.tagExpression) {
      tagExpression = "not @Pending"
    }

    if (failedScenarios.length) {
      tagExpression = failedScenarios.split(" ").join(" ")
    }

    args.cucumberOpts = {
      tagExpression
    }

    console.log(args.cucumberOpts.tagExpression);

    fs.writeFileSync(`worker_context/${cid}`, JSON.stringify({ instanceNumber, failedScenarios }, null, " "));

    // args.cucumberOpts.tagExpression = undefined;

  } catch (err) {
    console.error(`onWorkerStart error: ${err}`);
  }
},

config.onWorkerEnd = async function (cid, exitCode, specs, retries) {
  let failedScenarios;
  try {
    failedScenarios = JSON.parse(fs.readFileSync(`worker_context/${cid}`)).failedScenarios;
  } catch (err) {
    console.log(err)
    failedScenarios = '';
  }

  fs.rmSync(`worker_context/${cid}`);

  try {
    if (retries > 0) {
      fs.writeFileSync(
        `worker_context/${cid}`,
        JSON.stringify({ failedScenarios }, null, " ")
      );
    }
  } catch (err) {
    console.error(`onWorkerEnd error: ${err}`);
  }

  await instancePicker.relinquishInstanceNumber(cid);
},

config.beforeSession = async function (config, capabilities, specs, cid) {

  dns.setDefaultResultOrder('ipv4first');
  const { instanceNumber, failedScenarios } = JSON.parse(fs.readFileSync(`worker_context/${cid}`));
  process.env.cid = cid;
  process.env.instanceNumber = instanceNumber;
  process.env.failedScenarios = '';

  const { username } = data.deployServers[process.env.instanceNumber || 0];
  context().user = data.deployServers[instanceNumber];
  let preparingStr = `PREPARING /tests/tempus/${specs[0].split('/tests/').pop()} (${username} - ${instanceNumber})`;

  if (failedScenarios) {
    if (failedScenarios.length) {
      preparingStr += ` for tests tagged ${failedScenarios}`;
    }
  }

  console.log(preparingStr);

},

config.beforeScenario = async function (world, ctx) {    
  await browser.cdp('Page', 'setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: Paths.download_directory,
  });
},

config.afterStep = async function (step, scenario, { error, duration, passed }, { wdioRetries }) {
  if (error) {
    await browser.takeScreenshot();

    const featureFileName = scenario.uri.split("/").pop();
    let retryNumber = wdioRetries == undefined ? 0 : wdioRetries;

    let fileName = `screenshots/${featureFileName}-${scenario.name.replace(/\W+/g, '-')}_${retryNumber}.png`;

    while (fs.existsSync(fileName)) {
      retryNumber = retryNumber + 1;
      fileName = `screenshots/${featureFileName}-${scenario.name.replace(/\W+/g, '-')}_${retryNumber}.png`;
    }

    if (process.env.HANDLING_AFTER_STEP_FAILURE === "true") {
      console.log("===========");
      console.log(`The previous step error'ed and was not handled properly -- please verify code is correct -- all subsequent scenarios in this file will be continued`);
      console.log("===========");
      // process.exit(1);
    }

    process.env.HANDLING_AFTER_STEP_FAILURE = "true";
    await browser.saveScreenshot(fileName);
    fs.writeFileSync(`${fileName}.txt`, JSON.stringify(context(), null, " "));
    delete process.env.HANDLING_AFTER_STEP_FAILURE
  }
},

config.afterScenario = async function (world, result, { error }) {
  // clearContext();
  await browser.reloadSession();
  if (!result.passed && world.pickle.tags[0].name.includes('@prerequisite')) {
    console.error('Stopping further executions since, previous general settings pre-requisites is failed.')
    process.exit(1)
  } else if (!result.passed && (world.pickle.tags[0].name.includes('@Level-1') || world.pickle.tags[0].name.includes('@Level-2'))) {
    process.env.failedScenarios = `${process.env.failedScenarios} ${world.pickle.tags[1].name}`.trim();
  }
  else {
    if (!result.passed && world.pickle.tags[0].name) {
      process.env.failedScenarios = `${process.env.failedScenarios} ${world.pickle.tags[0].name}`.trim();
    }
  }
},

config.afterSession = function (config, capabilities, specs) {
  const { failedScenarios, cid } = process.env;

  try {
    const { instanceNumber } = JSON.parse(fs.readFileSync(`worker_context/${cid}`));

    fs.rmSync(`worker_context/${cid}`);

    fs.writeFileSync(
      `worker_context/${cid}`,
      JSON.stringify({ instanceNumber, failedScenarios }, null, " ")
    );

  } catch (err) {
    console.error(`afterSession error: ${err}`);
  }
},

exports.config = config
