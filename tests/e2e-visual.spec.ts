import { test, expect } from '@playwright/test';

test.describe('K & N Cinematic Love Story E2E & Visual Verification', () => {
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

  test('Desktop Walkthrough & Visual Captures (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Hero Scene Capture
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/01-hero-desktop.png' });

    // 2. Message Before the Journey Scene Capture
    const message = page.locator('#message-before-journey');
    await message.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(message).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/02-message-desktop.png' });

    // 3. Counter Scene & Milestone
    const counter = page.locator('#counter');
    await counter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(counter).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/03-counter-scene.png' });

    // 4. Beauty of You Scene (Nasreen Portraits)
    const beautyOfYou = page.locator('#beauty-of-you');
    await beautyOfYou.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(beautyOfYou).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/04-beauty-of-you-desktop.png' });

    // Test Lightbox in Beauty of You
    const firstPortrait = page.locator('#beauty-of-you [data-cursor="view"]').first();
    if (await firstPortrait.isVisible()) {
      await firstPortrait.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'tests/screenshots/04-beauty-lightbox.png' });
      // Close lightbox
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }

    // 5. The Two of Us Scene
    const twoOfUs = page.locator('#the-two-of-us');
    await twoOfUs.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(twoOfUs).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/05-two-of-us-desktop.png' });

    // 6. Little Moments Scene (Candids)
    const littleMoments = page.locator('#little-moments');
    await littleMoments.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(littleMoments).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/06-little-moments-desktop.png' });

    // 7. Quote Journey Scene
    const quoteJourney = page.locator('#quotes-journey');
    await quoteJourney.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(quoteJourney).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/07-quotes-journey.png' });

    // Test interactive random love note generator button
    const drawBtn = page.locator('button:has-text("Draw a Random Love Note")');
    if (await drawBtn.isVisible()) {
      await drawBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'tests/screenshots/07-quotes-random-note.png' });
    }

    // 8. Soundtrack Scene
    const soundtrack = page.locator('#soundtrack');
    await soundtrack.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(soundtrack).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/08-soundtrack-desktop.png' });

    // 9. Timeline Scene & Year Interaction
    const timeline = page.locator('#timeline');
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/09-timeline-2020.png' });

    // Click 2026 Year Button
    const btn2026 = page.locator('button:has-text("2026")');
    if (await btn2026.isVisible()) {
      await btn2026.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'tests/screenshots/09-timeline-2026.png' });
    }

    // 10. Letters Scene (Closed & Opened)
    const letters = page.locator('#letters');
    await letters.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/10-letter-closed.png' });

    // Open Letter 01
    const openLetterBtn = page.locator('text=Open Your Letter');
    if (await openLetterBtn.isVisible()) {
      await openLetterBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'tests/screenshots/10-letter-01-opened.png' });
    }

    // Switch to Letter 03 ("Open When You Miss Me" with Ribbon Seal)
    const letter03Tab = page.locator('button:has-text("When You Miss Me")');
    if (await letter03Tab.isVisible()) {
      await letter03Tab.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'tests/screenshots/10-letter-03-ribbon-seal.png' });
    }

    // 11. Audio Player (Collapsed & Expanded)
    const audioPlayer = page.locator('.fixed.bottom-6.right-6');
    await expect(audioPlayer).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/11-player-collapsed.png' });

    // Click vinyl to expand
    await audioPlayer.locator('[title="Expand player"]').click({ force: true });
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/11-player-expanded.png' });

    // 12. Surprise Interaction
    const surprise = page.locator('#surprise');
    await surprise.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/12-surprise-sealed.png' });

    // Trigger quick unlock
    const unlockBtn = page.locator('text=Quick Unlock Alternative');
    if (await unlockBtn.isVisible()) {
      await unlockBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'tests/screenshots/12-surprise-unlocked.png' });
    }

    // 13. Final Memory Scene (Master Portrait)
    const finalMemory = page.locator('#final-memory');
    await finalMemory.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(finalMemory).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/13-final-memory-desktop.png' });

    // 14. Grand Finale
    const finale = page.locator('#finale');
    await finale.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'tests/screenshots/14-finale-desktop.png' });
  });

  test('Mobile Responsive Composition (iPhone 390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Mobile Hero
    await page.screenshot({ path: 'tests/screenshots/20-mobile-hero.png' });

    // Mobile Message
    const message = page.locator('#message-before-journey');
    await message.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/21-mobile-message.png' });

    // Mobile Counter
    const counter = page.locator('#counter');
    await counter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/22-mobile-counter.png' });

    // Mobile Beauty of You
    const beautyOfYou = page.locator('#beauty-of-you');
    await beautyOfYou.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/23-mobile-beauty.png' });

    // Mobile The Two of Us
    const twoOfUs = page.locator('#the-two-of-us');
    await twoOfUs.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/24-mobile-two-of-us.png' });

    // Mobile Little Moments
    const littleMoments = page.locator('#little-moments');
    await littleMoments.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/25-mobile-little-moments.png' });

    // Mobile Quote Journey
    const quoteJourney = page.locator('#quotes-journey');
    await quoteJourney.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/26-mobile-quotes.png' });

    // Mobile Soundtrack
    const soundtrack = page.locator('#soundtrack');
    await soundtrack.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/27-mobile-soundtrack.png' });

    // Mobile Timeline
    const timeline = page.locator('#timeline');
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/28-mobile-timeline.png' });

    // Mobile Letters
    const letters = page.locator('#letters');
    await letters.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/29-mobile-letters.png' });

    // Mobile Final Memory
    const finalMemory = page.locator('#final-memory');
    await finalMemory.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/30-mobile-final-memory.png' });

    // Mobile Finale
    const finale = page.locator('#finale');
    await finale.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/31-mobile-finale.png' });

    // Verify No Horizontal Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // Within 2px tolerance
  });
});
