import { test, expect } from '@playwright/test';

const PROD_URL = 'https://k-and-n-gold.vercel.app';

test.describe('K & N Live Production Verification (https://k-and-n-gold.vercel.app)', () => {
  test('Live Production End-to-End Walkthrough', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
    });

    // 1. Navigate to Live Production URL
    await page.goto(PROD_URL, { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 1440, height: 900 });

    // Handle Password Gate if present
    const passwordInput = page.locator('input[type="password"]');
    if (await passwordInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await passwordInput.fill('23112020');
      const submitBtn = page.locator('button[type="submit"]');
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
      } else {
        await page.keyboard.press('Enter');
      }
      await page.waitForTimeout(1000);
    }

    // Skip Intro Loader
    const skipBtn = page.locator('text=Skip Intro');
    if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);

    // Verify Hero Scene
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-01-hero.png' });

    // Verify Message Scene
    const message = page.locator('#message-before-journey');
    await message.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(message).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-02-message.png' });

    // Verify Counter Scene
    const counter = page.locator('#counter');
    await counter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(counter).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-03-counter.png' });

    // Verify Beauty of You Scene
    const beauty = page.locator('#beauty-of-you');
    await beauty.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(beauty).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-04-beauty.png' });

    // Verify The Two of Us
    const twoOfUs = page.locator('#the-two-of-us');
    await twoOfUs.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(twoOfUs).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-05-two-of-us.png' });

    // Verify Little Moments
    const moments = page.locator('#little-moments');
    await moments.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(moments).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-06-moments.png' });

    // Verify Quotes Journey & Draw Note
    const quotes = page.locator('#quotes-journey');
    await quotes.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(quotes).toBeVisible();
    const drawBtn = page.locator('button:has-text("Draw a Random Love Note")');
    if (await drawBtn.isVisible()) {
      await drawBtn.click();
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: 'tests/screenshots/prod-07-quotes.png' });

    // Verify Soundtrack
    const soundtrack = page.locator('#soundtrack');
    await soundtrack.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(soundtrack).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-08-soundtrack.png' });

    // Verify Timeline (2020 -> 2026)
    const timeline = page.locator('#timeline');
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const btn2026 = page.locator('button:has-text("2026")');
    if (await btn2026.isVisible()) {
      await btn2026.click();
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: 'tests/screenshots/prod-09-timeline.png' });

    // Verify Letters Scene (Open Letter 01 and inspect Letter 03)
    const letters = page.locator('#letters');
    await letters.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const openBtn = page.locator('text=Open Your Letter');
    if (await openBtn.isVisible()) {
      await openBtn.click();
      await page.waitForTimeout(800);
    }
    await page.screenshot({ path: 'tests/screenshots/prod-10-letter.png' });

    // Verify Surprise Scene & Unlock
    const surprise = page.locator('#surprise');
    await surprise.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const unlockBtn = page.locator('text=Quick Unlock Alternative');
    if (await unlockBtn.isVisible()) {
      await unlockBtn.click();
      await page.waitForTimeout(800);
    }
    await page.screenshot({ path: 'tests/screenshots/prod-11-surprise.png' });

    // Verify Final Memory (Master Portrait)
    const finalMemory = page.locator('#final-memory');
    await finalMemory.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(finalMemory).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-12-final-memory.png' });

    // Verify Finale
    const finale = page.locator('#finale');
    await finale.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(finale).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/prod-13-finale.png' });

    // Verify Zero Critical Network Failures
    const criticalFailures = failedRequests.filter(
      (r) => !r.includes('favicon') && !r.includes('google-analytics')
    );
    expect(criticalFailures).toHaveLength(0);
  });

  test('Live Production Mobile Responsiveness (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PROD_URL, { waitUntil: 'domcontentloaded' });

    // Skip Intro
    const skipBtn = page.locator('text=Skip Intro');
    if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);

    // Capture Mobile Hero
    await page.screenshot({ path: 'tests/screenshots/prod-20-mobile-hero.png' });

    // Verify Mobile Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});
