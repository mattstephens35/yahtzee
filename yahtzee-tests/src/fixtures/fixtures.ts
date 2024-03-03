import { test as base } from "@playwright/test";
import { Login } from "./login";

export type TestFixtures = {
    apiLogin: Login;
};

export const test = base.extend<TestFixtures>({
    apiLogin: async ({ }, use) => {
        const login: Login = new Login();
        login.username = "admin";
        login.password = "snakeeyes"

        await use(login);
    }
});
