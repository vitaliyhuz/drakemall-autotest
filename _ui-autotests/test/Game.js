require('chai').should();
const {
    passwordForRegistration,
    usernameForRegistration
} = require('../constants');
const { emailForRegistration } = require('../createdEmail.json');
let nameOfcase;
let priceOfсase;


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


describe("Check Case", function () {
    it("Open View page of Case", function () {
        nameOfcase = browser.getText('//h1[.="Smart Box"]');
        priceOfсase = browser.getText('//h1[.="Smart Box"]/following-sibling::div[1]');
        browser.click('//h1[.="Smart Box"]');
        browser.pause(1000);
    });
    it("Check opened Case", function () {
        const onlineDrop = browser.isExisting('//div[@class="onlinedrop-container"]');
        onlineDrop.should.equal(true);
        const nameOfopenedCase = browser.getText('//h1');
        nameOfopenedCase.should.equal(nameOfcase);
        const priceOfOpenedCase = browser.getText('//div[@class="box-detail-price"]');
        priceOfOpenedCase.should.equal(priceOfсase);
        const roulette = browser.isExisting('//div[@class="roulette-container"]');
        roulette.should.equal(true);
        const boxContent = browser.getText('//div[@class="box-detail-content"]');
        boxContent.should.equal('15 Items in the case that you can get\nAmazon Echo Dot\n$40.00\nAmazon Fire TV stick\n$150.00\nWiFi Projector\n$50.00\nXiaomi Mi Brand 2\n$120.00\nLaMetric WiFi Clock\n$90.00\nSmart Home Hub\n$350.00\nVoice controlled car\n$80.00\nEufy RoboVac\n$300.00\nWiFi Drone\n$500.00\nApple Watch Gold\n$600.00\nSamsung Galaxy S8\n$900.00\nIphone X\n$1200.00\nGoPro Hero6\n$400.00\nAmazon Echo\n$40.00\nOculus Rift\n$600.00');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(1000);
    });
});

