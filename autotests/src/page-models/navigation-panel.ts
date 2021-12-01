import {Selector, t} from "testcafe";

export class NavigationPanel {
    static readonly navigationItems = Selector("#navbar .navbar-menu-item");

    public static async navigateToTab(tabName: string) {
        await t
            .click(NavigationPanel.navigationItems.withText(tabName));
    }
}
