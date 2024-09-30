import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base/base-page';
import { login } from '../../common-functions/urls';
import { Locators } from './login-locators';


export class LoginPage extends BasePage {
    readonly page: Page;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly btnSignIn: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.inputUsername = Locators.inputUsername(page)
        this.inputPassword = Locators.inputPassword(page);
        this.btnSignIn = Locators.btnSignIn(page)
    }

    async goto() {
        await this.page.goto(process.env.URL! + login);
        await expect(this.page).toHaveURL(/.*login/);
    }

    async fillCredentials(username: string, password: string) {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
    }

    async loginPositive() {
        await this.btnSignIn.click();
        await expect(this.page).toHaveTitle("My Account - FashionHub")
        await expect(this.page).toHaveURL(/.*account/);
    }
}