/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { chromium } from 'playwright';

export default async function({ github, context }) {
  console.log("Launching headless browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  console.log("Navigating to site...");
  await page.goto('http://localhost:5173/'); 

  console.log("Clicking the send button...");
  await page.locator('button:has-text("send")').click();

  await page.waitForTimeout(1000);

  await browser.close();
  console.log("Browser closed. Fetch complete.");
}