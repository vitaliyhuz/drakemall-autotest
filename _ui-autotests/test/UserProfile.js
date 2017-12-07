require('chai').should();
const {
    passwordForRegistration,
    usernameForRegistration
} = require('../constants');
const { emailForRegistration } = require('../createdEmail.json');


describe("Login with registered User account", function () {
    it("Open Login window", function () {
        // browser.windowHandleMaximize();
        browser.windowHandleFullscreen();
        browser.url('');
        browser.click('//button[.="Log In"]');
        browser.pause(1000);
        const loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
    });
    it("Login with Email", function () {
        const loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
        browser.setValue('#username',emailForRegistration);
        browser.setValue('#password',passwordForRegistration);
        browser.click('//button[contains(@class, "form-submit-btn")]');
        browser.pause(3000);
    });
    it("Check Login with Email", function () {
        const userLogin = browser.getText('//span[@class="profile-name"]');
        userLogin.should.equal(usernameForRegistration);
        const balanceTitle = browser.getText('//div[@class="header-balance-title"]');
        balanceTitle.should.equal('Your balance');
        const balanceValue = browser.getText('//div[@class="header-balance-value"]');
        balanceValue.should.equal('$0.00');
        const addFundButton = browser.isExisting('//button[@class="action-btn header-glow-btn funds-btn"]');
        addFundButton.should.equal(true);
    });
});
describe("Add new address (General info)", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
    });
    it("Add new address", function () {
        browser.click('//button[@class="add-address"]');
        browser.setValue('//input[@name="firstName"]', 'QA');
        browser.setValue('//input[@name="lastName"]', 'Automation');
        browser.setValue('//input[@name="phone"]', '+380507777777');
        browser.setValue('//input[@name="country"]','Ukraine');
        browser.setValue('//input[@name="region"]','Kyiv city');
        browser.setValue('//input[@name="city"]','Kyiv');
        browser.setValue('//input[@name="zipCode"]','02000');
        browser.setValue('//input[@name="street"]','Khreshchatyk');
        browser.setValue('//input[@name="building"]','77');
        browser.setValue('//input[@name="apartment"]','9');
        browser.click('//button[contains(@class, "action-btn brand-solid save-btn")]');
        //Make a check for Message: "Delivery address has been successfully updated!"
        browser.pause(1000);
    });
    it("Check added address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo.should.equal('QaTester\nUkraine, Kyiv 02000\nKhreshchatyk str, b. 77, apt. 9\nPhone: +380507777777');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(1000);
    });
});
