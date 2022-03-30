const {By,Key,Builder,until} = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
require("chromedriver")

chromeOptions = new chrome.Options()
chromeOptions.addArguments('--start-maximized')
chromeOptions.excludeSwitches('enable-automation')
chromeOptions.excludeSwitches("enable-logging")
const chai = require("chai")
const { expect } = require("chai")
var assert = chai.assert;

describe("Test saucedemo app",()=>{
    let driver;
    before(async()=>{
        driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build()
    })

    beforeEach(async()=>{
        await driver.get("https://www.saucedemo.com/")
        await driver.manage().setTimeouts({implicit:10000})
        await driver.wait(until.titleIs("Swag Labs"))

        //explict wait
        let by = By.name('login-button');
        await driver.wait(until.elementLocated(by, 5000));
        await driver.wait(until.elementIsVisible(driver.findElement(by)), 10000);
    })
    
    it('Login with invalid credentials',async()=>{
        //login
        await driver.findElement(By.id("user-name")).sendKeys("standard_user")
        await driver.findElement(By.css("#password")).sendKeys("test")
        await driver.findElement(By.name("login-button")).click()

        //verify error message
        var errMsg = await driver.findElement(By.css("[data-test=error]")).getText()
        assert.equal(errMsg,'Epic sadface: Username and password do not match any user in this service')
    })

    it('Verify item and Price on chekout',async()=>{
        let price;
        //login
        await driver.findElement(By.id("user-name")).sendKeys("standard_user")
        await driver.findElement(By.css("#password")).sendKeys("secret_sauce")
        await driver.findElement(By.name("login-button")).click()

        //verify if inventory page is opened
        let url =await driver.getCurrentUrl()
        expect(url).to.contain("inventory.html")

        //Select any item and note the price from the inventroy page and add it to cart 
        price = await driver.findElement(By.xpath('//div[text()="Sauce Labs Backpack"]/ancestor::div[@class="inventory_item_label"][1]//following-sibling::div[@class="pricebar"][1]/div')).getText()
        await driver.findElement(By.xpath('//div[text()="Sauce Labs Backpack"]')).click()
        await driver.findElement(By.css("[id*=add-to-cart]")).click()
        
        //Navigate to cart page and verify same price as above noted displayed. 
        await driver.findElement(By.className('shopping_cart_link')).click()
        let cartPrice = await driver.findElement(By.css('.inventory_item_price')).getText()
        console.log("cart price: "+cartPrice)
        expect(cartPrice).to.equals(price)
        
        //Click on checkout and enter the sample details and click continue
        await driver.findElement(By.id("checkout")).click()
        let currentUrl =await driver.getCurrentUrl()
        expect(currentUrl).to.contain("checkout-step-one")
        
        await driver.findElement(By.css('#first-name')).sendKeys("Rahul")
        await driver.findElement(By.css('#last-name')).sendKeys("Varma")
        await driver.findElement(By.css('#postal-code')).sendKeys("12345")
        await driver.findElement(By.id("continue")).click()

        //Verify the Item and Price on chekout page and click finish
        let itemName= await driver.findElement(By.css(".inventory_item_name")).getText()
        assert.strictEqual(itemName,"Sauce Labs Backpack","Item names are not matching")
        let itemPrice = await driver.findElement(By.className("inventory_item_price")).getText()
        expect(itemPrice).equals(price)
        await driver.findElement(By.css("#finish")).click()
    })

    after(async()=>{
        await driver.quit()
    })
})