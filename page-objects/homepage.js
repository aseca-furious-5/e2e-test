class Homepage {

    constructor(page)
    {
        this.page = page;
        this.productList = page.locator('//*[@id="root"]/div/ul[1]');
        this.addToCartButton = page.locator('//*[@id="root"]/div/ul[1]/li[1]/button');
        this.cart = page.locator('//*[@id="root"]/div/ul[2]');
        this.placeOrderButton = page.locator('//*[@id="root"]/div/button');
        this.orderDetails = page.locator('//*[@id="root"]/div/div')
    }

    async countProductList()
    {
        return await this.productList.count();
    }

    async clickAddToCartButton()
    {
        await this.addToCartButton.click();
    }

    async clickPlaceOrderButton()
    {
        await this.placeOrderButton.click();
    }

    async getCartItems() {
        //  If we don't wait for a while, the cart items won't be updated
        await this.page.waitForTimeout(1000);
        return await this.cart.locator('li').allTextContents();
    }

}

module.exports = { Homepage };