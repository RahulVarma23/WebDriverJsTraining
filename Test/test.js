const {By,Key,Builder} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

chromeOptions = new chrome.Options();
chromeOptions.addArguments('--start-maximized');
chromeOptions.excludeSwitches("enable-automation");

(async function myFirstScript(){
    let title;
    let driver = await  new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
    await driver.get("https://www.google.com")
   // await driver.findElement(By.css("[title=Search]")).sendKeys("Automated Testing with JS", Key.RETURN);
    await driver.findElement(By.xpath("//*[@name='q']")).sendKeys("Automation using java selenium", Key.RETURN);
    title = await driver.getTitle()
    console.log("title is: "+ title)
    await driver.quit()
})()