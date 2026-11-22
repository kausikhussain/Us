import { test, expect } from '@playwright/test';

test.describe('Live Production Gate & Audio Parity Tests (k-and-n-gold.vercel.app)', () => {
  test.setTimeout(120000);

  test('Full Production Gate Flow: Gate, Rejection, Acceptance, Session Persistence & Lock', async ({ page, context }) => {
    // 1. Visit live production URL
    await page.goto('https://k-and-n-gold.vercel.app', { waitUntil: 'domcontentloaded' });

    // Verify Gate Elements are prominently displayed on production
    const heading = page.locator('text=A Little World of Ours');
    await expect(heading).toBeVisible({ timeout: 20000 });

    const supportingText = page.locator('text=Some memories are meant to be shared only with the ones who know their story.');
    await expect(supportingText).toBeVisible();

    const instruction = page.locator('text=Enter our special date to unlock this little world.');
    await expect(instruction).toBeVisible();

    const input = page.locator('input[placeholder="DD / MM / YYYY"]');
    await expect(input).toBeVisible();

    const unlockBtn = page.locator('button:has-text("Unlock Our Memories")');
    await expect(unlockBtn).toBeVisible();

    // 2. Submit wrong date on production
    await input.fill('01/01/2020');
    await unlockBtn.click();

    // Verify friendly error message from real server endpoint using getByText
    const errorMsg = page.getByText("That isn't our special date. Try once more.");
    await expect(errorMsg).toBeVisible({ timeout: 10000 });

    // 3. Submit valid anniversary date: 23/11/2020
    await input.fill('23/11/2020');
    await unlockBtn.click();

    // Verify luxury transition: "Welcome to Our Little World."
    const welcomeMsg = page.locator('text=Welcome to Our Little World.');
    await expect(welcomeMsg).toBeVisible({ timeout: 10000 });

    // Wait for the gate to smoothly unveil the main experience
    await expect(heading).not.toBeVisible({ timeout: 15000 });

    // Verify Hero Scene on production
    const heroBrand = page.locator('text=Six Years. One Story.');
    await expect(heroBrand.first()).toBeVisible({ timeout: 20000 });

    // 4. Verify cookies in live browser context
    const cookies = await context.cookies();
    const sessionCookie = cookies.find((c) => c.name === 'kn_session');
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie?.httpOnly).toBe(true);

    // 5. Test Refresh: Site stays unlocked without prompting
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=A Little World of Ours')).not.toBeVisible();
    await expect(heroBrand.first()).toBeVisible({ timeout: 15000 });

    // 6. Test Lock Action from Navigation
    const lockBtn = page.locator('button[title="Lock Story"]');
    await expect(lockBtn).toBeVisible();
    await lockBtn.click();

    // Verify site is now locked again on production
    await expect(page.locator('text=A Little World of Ours')).toBeVisible({ timeout: 15000 });
  });

  test('Live Production Audio Assets Parity via HEAD & Range', async ({ request }) => {
    // Track 1: Alfaaz
    const alfaazRes = await request.fetch('https://k-and-n-gold.vercel.app/audio/alfaaz.m4a', {
      method: 'HEAD',
    });
    expect(alfaazRes.status()).toBe(200);
    expect(alfaazRes.headers()['content-type']).toContain('audio/mp4');
    const alfaazLen = Number(alfaazRes.headers()['content-length']);
    expect(alfaazLen).toBeGreaterThan(6000000);

    // Track 2: Dilruba Dilnasee
    const dilrubaRes = await request.fetch('https://k-and-n-gold.vercel.app/audio/dilruba-dilnasee.mp3', {
      method: 'HEAD',
    });
    expect(dilrubaRes.status()).toBe(200);
    expect(dilrubaRes.headers()['content-type']).toContain('audio/mpeg');
    const dilrubaLen = Number(dilrubaRes.headers()['content-length']);
    expect(dilrubaLen).toBeGreaterThan(6000000);
  });
});
