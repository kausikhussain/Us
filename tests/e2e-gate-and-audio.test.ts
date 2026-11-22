import { test, expect } from '@playwright/test';

test.describe('K & N Anniversary Access Gate & Audio Verification', () => {
  test('Full Gate Flow: Rejection, Acceptance, Session Persistence, Audio and Lock', async ({ page, context }) => {
    // 1. Visit homepage without session
    await page.goto('/');

    // Verify Gate Elements are prominently displayed
    const heading = page.locator('text=A Little World of Ours');
    await expect(heading).toBeVisible();

    const supportingText = page.locator('text=Some memories are meant to be shared only with the ones who know their story.');
    await expect(supportingText).toBeVisible();

    const instruction = page.locator('text=Enter our special date to unlock this little world.');
    await expect(instruction).toBeVisible();

    const input = page.locator('input[placeholder="DD / MM / YYYY"]');
    await expect(input).toBeVisible();

    const unlockBtn = page.locator('button:has-text("Unlock Our Memories")');
    await expect(unlockBtn).toBeVisible();

    // 2. Submit wrong date
    await input.fill('01/01/2020');
    await unlockBtn.click();

    // Verify friendly error message
    const errorMsg = page.locator('text=That isn\'t our special date. Try once more.');
    await expect(errorMsg).toBeVisible();

    // 3. Submit valid anniversary date with slashes: 23/11/2020
    await input.fill('23/11/2020');
    await unlockBtn.click();

    // Verify luxury transition: "Welcome to Our Little World."
    const welcomeMsg = page.locator('text=Welcome to Our Little World.');
    await expect(welcomeMsg).toBeVisible();

    // Wait for the smooth reveal of the main experience
    await expect(heading).not.toBeVisible({ timeout: 5000 });

    // Verify Hero Scene is unveiled
    const heroBrand = page.locator('text=Six Years. One Story.');
    await expect(heroBrand.first()).toBeVisible();

    // 4. Verify cookies in browser context
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'kn_session');
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie?.httpOnly).toBe(true);

    // 5. Test Refresh: Site stays unlocked without prompting
    await page.reload();
    await expect(page.locator('text=A Little World of Ours')).not.toBeVisible();
    await expect(heroBrand.first()).toBeVisible();

    // 6. Verify Audio elements and tracks in DOM
    const audioControls = page.locator('[title="Expand player"]');
    await expect(audioControls).toBeVisible();

    // 7. Test Lock Action from Navigation
    const lockBtn = page.locator('button[title="Lock Story"]');
    await expect(lockBtn).toBeVisible();
    await lockBtn.click();

    // Verify site is now locked again
    await expect(page.locator('text=A Little World of Ours')).toBeVisible({ timeout: 5000 });
  });

  test('Direct Audio Assets Verification', async ({ request }) => {
    // Track 1: Alfaaz
    const alfaazRes = await request.get('/audio/alfaaz.m4a');
    expect(alfaazRes.status()).toBe(200);
    const alfaazLen = Number(alfaazRes.headers()['content-length']);
    expect(alfaazLen).toBeGreaterThan(6000000);

    // Track 2: Dilruba Dilnasee
    const dilrubaRes = await request.get('/audio/dilruba-dilnasee.mp3');
    expect(dilrubaRes.status()).toBe(200);
    const dilrubaLen = Number(dilrubaRes.headers()['content-length']);
    expect(dilrubaLen).toBeGreaterThan(6000000);
  });
});
