import { Page, Locator } from "@playwright/test";


export const Locators = {
    // buttons
    btnSignIn: (page: Page): Locator => page.getByRole('button', { name: 'Login', exact: true }),

    // inputs
    inputPassword: (page: Page): Locator => page.getByPlaceholder('Password'),
    inputUsername: (page: Page): Locator => page.getByPlaceholder('Username'),
};
