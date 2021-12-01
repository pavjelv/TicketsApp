import { Selector, t } from "testcafe";
import * as authData from "../data/auth.json"

export class LoginPage {
    static readonly loginButton = Selector("#loginSubmit");
    static readonly emailField = Selector("#loginEmail");
    static readonly passwordField = Selector("#loginPassword");

    static async auth(): Promise<void> {
        await t
            .typeText(LoginPage.emailField, authData.credentials.email)
            .typeText(LoginPage.passwordField, authData.credentials.password)
            .click(LoginPage.loginButton);
    }
}
