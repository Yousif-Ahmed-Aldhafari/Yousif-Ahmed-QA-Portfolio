import type { Page } from '@playwright/test';
import { account } from '../fixtures/data';

export class OrderDesk {
  constructor(private readonly page: Page) {}

  get feedback() {
    return this.page.getByRole('status');
  }

  async signIn(password = account.password) {
    await this.page.goto('/');
    await this.page.getByLabel('Username').fill(account.username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async submitOrder(quantity: number) {
    await this.page.getByLabel('Quantity').fill(String(quantity));
    await this.page.getByRole('button', { name: 'Submit order' }).click();
  }
}
