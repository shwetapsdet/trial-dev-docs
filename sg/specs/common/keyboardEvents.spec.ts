import { Then } from "@cucumber/cucumber";
import { Key } from 'webdriverio'

Then(/^ui: Press Left arrow key "([^"]*)" number of times$/, async (keyPressCount: number) => {
  for (let i = 1; i <= keyPressCount; i++) {
    await browser.keys(Key.ArrowLeft);
  }
});

Then('ui: Press Escape Key', async () => {
  await browser.keys(Key.Escape);
});

Then('ui: Press Backspace Key', async () => {
  await browser.keys(Key.Backspace);
});

Then(/^ui: Press Right arrow key "([^"]*)" number of times$/, async (keyPressCount: number) => {
  for (let i = 1; i <= keyPressCount; i++) {
    await browser.keys(Key.ArrowRight);
  }
});

Then(/^ui: Enter text:"([^"]*)" in currently selected textbox$/, async (textToBeEntered: string) => {
  await browser.keys(textToBeEntered);
});