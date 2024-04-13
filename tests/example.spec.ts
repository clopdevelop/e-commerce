import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto("http://localhost:3000/entrada");

  await page.fill('input[type="email"]', 'john@example.com');
  await page.fill('input[type="password"]', 'supersecurepassword');

  await page.click('text="Entrar"');
  await page.waitForURL('http://localhost:3000/dashboard', { timeout: 5000 });
  await expect(page.locator('h1:has-text("Hola John Doe")')).toBeVisible();

})

test('payment process', async ({ page }) => {
  await page.goto('http://localhost:3000/catalogo',{timeout:5000});
  await page.click('text="Comprar"');

  await page.waitForSelector('#email', { state: 'visible' });
  await page.fill('#email', 'test@example.com');

  await page.fill('#cardNumber', '4242 4242 4242 4242');
  await page.fill('#cardExpiry', '12/34');
  await page.fill('#cardCvc', '123');
  await page.fill('#billingName', 'Test User');

  await page.click('[data-testid="hosted-payment-submit-button"]');

  await page.waitForURL('http://localhost:3000/?success=true');
  await expect(page.locator('h1:has-text("SUCCESS")')).toBeVisible();
});
