import { test, expect } from '@playwright/test';

test.describe('KAUSEEN Cinematic Love Story E2E & Visual Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local server
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    // Wait for initial loader to complete or click skip
    const skipBtn = page.locator('text=Skip Intro');
    if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);
  });

  test('Desktop Walkthrough & Visual Captures', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Hero Scene Capture
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/01-hero-desktop.png' });

    // 2. Infinity Scene Capture
    const infinity = page.locator('#infinity');
    await infinity.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/02-infinity-desktop.png' });

    // 3. Timeline Scene & Year Interaction
    const timeline = page.locator('#timeline');
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/03-timeline-2020.png' });

    // Click 2026 Year Button
    const btn2026 = page.locator('button:has-text("2026")');
    if (await btn2026.isVisible()) {
      await btn2026.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'tests/screenshots/03-timeline-2026.png' });
    }

    // 4. Gallery Scene & Compositions
    const gallery = page.locator('#gallery');
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'tests/screenshots/04-gallery-editorial.png' });

    // Test Lightbox
    const firstPhoto = page.locator('#gallery [data-cursor="view"]').first();
    if (await firstPhoto.isVisible()) {
      await firstPhoto.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'tests/screenshots/04-gallery-lightbox.png' });
      // Close lightbox
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }

    // 5. Letters Scene (Closed & Opened)
    const letters = page.locator('#letters');
    await letters.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/05-letter-closed.png' });

    // Open the letter
    const openLetterBtn = page.locator('text=Open Your Letter');
    if (await openLetterBtn.isVisible()) {
      await openLetterBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'tests/screenshots/05-letter-opened.png' });
    }

    // 6. Audio Player (Collapsed & Expanded)
    const audioPlayer = page.locator('.fixed.bottom-6.right-6');
    await expect(audioPlayer).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/06-player-collapsed.png' });

    // Click vinyl to expand
    await audioPlayer.locator('[title="Expand player"]').click({ force: true });
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/06-player-expanded.png' });

    // 7. Surprise Interaction
    const surprise = page.locator('#surprise');
    await surprise.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/07-surprise-sealed.png' });

    // Trigger quick unlock
    const unlockBtn = page.locator('text=Quick Unlock Alternative');
    if (await unlockBtn.isVisible()) {
      await unlockBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'tests/screenshots/07-surprise-unlocked.png' });
    }

    // 8. Counter & Quotes
    const counter = page.locator('#counter');
    await counter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/08-counter-and-quotes.png' });

    // 9. Grand Finale
    const finale = page.locator('#finale');
    await finale.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/09-finale-desktop.png' });
  });

  test('Mobile Responsive Composition (iPhone 390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Mobile Hero
    await page.screenshot({ path: 'tests/screenshots/10-mobile-hero.png' });

    // Mobile Timeline
    const timeline = page.locator('#timeline');
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/11-mobile-timeline.png' });

    // Mobile Gallery
    const gallery = page.locator('#gallery');
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/12-mobile-gallery.png' });

    // Mobile Letters
    const letters = page.locator('#letters');
    await letters.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/13-mobile-letters.png' });

    // Verify No Horizontal Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // Within 2px tolerance
  });
});
