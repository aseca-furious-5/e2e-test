const { test, expect } = require ('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require("../test-data/testData.json")));
import { Homepage } from "../page-objects/homepage";

let homepage;

test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await page.goto(dataset.home.url, {viewport: null});
    expect(page).toHaveTitle(dataset.home.title);
});

test('Verify that the product list has items', async () => {
    const productList = await homepage.countProductList();
    expect(productList).toBeGreaterThan(0);
});

test('Verify that when the user clicks on the Add to Cart button, the item is added to the cart', async () => {
    await homepage.clickAddToCartButton();
    const cart = homepage.cart;
    expect(await cart.count()).toBe(1);
});

test('Verify that when the user clicks on the Add to Cart button, the item is added to the cart with the correct quantity', async () => {
    for (let i = 0; i < 3; i++) {
        await homepage.clickAddToCartButton();
    }
    const cartItems = await homepage.getCartItems();
    expect(cartItems[0]).toContain("Qty: 3");
});

test('Verify that when the user clicks on the Place Order button, the cart is empty', async () => {
    await homepage.clickAddToCartButton();
    await homepage.clickPlaceOrderButton();
    const cartItems = await homepage.getCartItems();
    expect(cartItems.length).toBe(0);
});

test('Verify that when the user clicks on the Place Order button, the order is placed', async () => {
    await homepage.clickAddToCartButton();
    await homepage.clickPlaceOrderButton();
    expect(await homepage.orderDetails.innerText()).toContain("Order Details");
});