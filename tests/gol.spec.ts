import { test, expect } from '@playwright/test';

test('aparece el GOOOL al hacer click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /goool/i }).click();
  await expect(page.locator('.celebracion')).toBeVisible();
});
