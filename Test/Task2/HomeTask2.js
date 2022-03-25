const {By,Key,Builder,until} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

chromeOptions = new chrome.Options();
chromeOptions.addArguments('--start-maximized');
chromeOptions.excludeSwitches("enable-automation");
chromeOptions.excludeSwitches("enable-logging");

(async function mySecondJsScript(){
    let driver=await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build()
    await driver.get("https://the-internet.herokuapp.com/")

    //applying implicit wait
    await driver.manage().setTimeouts({implicit:10000})
    await driver.wait(until.titleIs('The Internet'))

    //login 
    await driver.findElement(By.css('a[href="/login"]')).click()
    await driver.findElement(By.css('#username')).clear()
    await driver.findElement(By.css('#username')).sendKeys("tomsmith")
    await driver.findElement(By.css('#password')).sendKeys("SuperSecretPassword!")
    await driver.findElement(By.css('i[class="fa fa-2x fa-sign-in"]')).click()

    //applying explicit waits
    let by = By.xpath('//div[@class="flash success"]');
    await driver.wait(until.elementLocated(by, 5000));
    await driver.wait(until.elementIsVisible(driver.findElement(by)), 10000);
    await driver.wait(until.elementTextContains(driver.findElement(By.xpath('//div[@class="flash success"]')),"You logged into a secure area!"))
    
    //logout
    await driver.findElement(By.css('a[href="/logout"]')).click()
    var elements = await driver.findElements(By.css('a[href="/logout"]'));
    if(elements.length == 0) {
    console.log("Logout button is not visible");  
    }
    
    //verify login page
    await driver.wait(until.elementTextContains(driver.findElement(By.css('i[class="fa fa-2x fa-sign-in"]')),"Login"))
    await driver.quit()
})()