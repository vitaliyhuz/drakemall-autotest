require('chai').should();
const {
    passwordForRegistration,
    usernameForRegistration
} = require('../constants');
const { emailForRegistration } = require('../createdEmail.json');
let nameOfcase;
let priceOfCase;
let totalOpenedCasesValueBeforeOpenCase;
let userBalanceBeforeOpenCase;
let gotItemName;
let gotItemPrice;
//Delete after add "Add funds" test
const tempUsername = "AutomationTemp";
const tempUserEmail = "tempUser@test.com";
const tempUserPassword = "!QAZ2wsx";
////////////////////////////////////

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
        const addFundButton = browser.isExisting('//a[@class="action-btn header-glow-btn funds-btn"]');
        addFundButton.should.equal(true);
    });
});

describe("Check Case", function () {
    it("Open View page of Case", function () {
        nameOfcase = browser.getText('//h1[.="Smart Case"]');
        priceOfCase = browser.getText('//h1[.="Smart Case"]/following-sibling::div[1]');
        browser.click('//h1[.="Smart Case"]');
        browser.pause(1000);
    });
    it("Check opened Case", function () {
        const onlineDrop = browser.isExisting('//div[@class="onlinedrop-container"]');
        onlineDrop.should.equal(true);
        const nameOfopenedCase = browser.getText('//h1');
        nameOfopenedCase.should.equal(nameOfcase);
        const priceOfOpenedCase = browser.getText('//div[@class="box-detail-price"]');
        priceOfOpenedCase.should.equal(priceOfCase);
        const roulette = browser.isExisting('//div[@class="roulette-container"]');
        roulette.should.equal(true);
        const boxContent = browser.getText('//div[@class="box-detail-content"]');
        boxContent.should.equal('15 Items in the case that you can get\nApple iPhone X\n$999.00\nGoPro HERO6\n$500.00\nApple Watch Series 3\n$399.00\nSamsung Galaxy S8\n$750.00\nOculus Rift\n$435.00\nXiaomi Mi Band 2\n$35.00\nAmazon Echo\n$100.00\nAmazon Echo Dot\n$50.00\nLaMetric Wi-Fi Clock\n$199.00\nWIFI Projector\n$130.00\nAmazon Fire TV Stick\n$40.00\nVoice Control Car\n$35.00\nWiFi Drone\n$60.00\nEufy RoboVac 11\n$220.00\nSmart Home Hub\n$84.00');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(1000);
    });
});

// describe("Open Case (Balance 0.00$)", function () {
//     it("Open View page of Case", function () {
//         nameOfcase = browser.getText('//h1[.="Smart Case"]');
//         priceOfCase = browser.getText('//h1[.="Smart Case"]/following-sibling::div[1]');
//         browser.click('//h1[.="Smart Box"]');
//         browser.pause(1000);
//     });
//     it("Open Case", function () {
//         const OpenCaseButton = ('//button[@class="action-btn brand-solid"]');
//         browser.click(OpenCaseButton);
//         browser.pause(1000);
//     });
// });

describe("Open Case", function () {
    it("Temporary precondition", function () {
        browser.click('//button[@class="logout-btn"]');
        browser.pause(1000);
        browser.click('//button[.="Log In"]');
        browser.pause(1000);
        const loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
        browser.setValue('#username',tempUserEmail);
        browser.setValue('#password',tempUserPassword);
        browser.click('//button[contains(@class, "form-submit-btn")]');
        browser.pause(3000);
        //Delete after add "Add funds" test
    });
    it("Check User balance and total opened cases value", function () {
        totalOpenedCasesValueBeforeOpenCase = browser.getText('//span[@class="header-stats-count"]')[1];
        userBalanceBeforeOpenCase = browser.getText('//div[@class="header-balance-value"]');
    });
    it("Open View page of Case", function () {
        nameOfcase = browser.getText('//h1[.="Smart Case"]');
        priceOfCase = browser.getText('//h1[.="Smart Case"]/following-sibling::div[1]');
        browser.click('//h1[.="Smart Case"]');
        browser.pause(1000);
    });
    it("Open Case", function () {
        const OpenCaseButton = ('//button[@class="action-btn brand-solid"]');
        browser.click(OpenCaseButton);
        browser.pause(15000);
    });
    it("Check Congratulations window", function () {
        gotItemName = browser.getText('//span[@class="dropitem-name"]');
        gotItemPrice = browser.getText('//span[@class="dropitem-price"]');
        const openAgainButton = browser.isExisting('//span[.="Open again"]');
        openAgainButton.should.equal(true);
        const sellItemButton = browser.isExisting('//span[.="Sell item"]');
        sellItemButton.should.equal(true);
        const linkToPrifileText = browser.getText('//div[@class="roulette-modal-support-info"]');
        linkToPrifileText.should.equal('You can withraw it anytime in your profile');
        const linkToPrifile = browser.isExisting('//a[@href="/profile"]');
        linkToPrifile.should.equal(true);
        browser.click('//button[@class="modal-close"]');
        browser.pause(3000);
    });
    it("Check got item in Live drop", function () {
        const liveDropArray = $$('.onlinedrop-item-product');
        const gotItemInArray = liveDropArray[0];
        const titleOfItemInArray = gotItemInArray.getAttribute('title');
        console.log(gotItemName);
        titleOfItemInArray.should.equal(gotItemName);
    });
    it("Check User balance and total opens cases value after opening box", function () {
        const totalOpenedCasesValueAfterOpenCase = parseInt(browser.getText('//span[@class="header-stats-count"]')[1].replace(new RegExp(/\s/, 'g'), ''),10);
        const userBalanceAfterOpenCase = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedTotalOpenedCasesValueAfterOpenCase = parseInt(totalOpenedCasesValueBeforeOpenCase.replace(new RegExp(/\s/, 'g'), ''), 10) +1;
        const expectedUserBalanceAfterOpenCase = parseFloat((userBalanceBeforeOpenCase.substr(1)).replace(new RegExp(/\s/, 'g'), '')) - parseFloat((priceOfCase.substr(1)).replace(new RegExp(/\s/, 'g'), ''));


        function comparisonOpenCase (totalOpenedCasesValueAfterOpenCase, expectedTotalOpenedCasesValueAfterOpenCase) {
            return totalOpenedCasesValueAfterOpenCase === expectedTotalOpenedCasesValueAfterOpenCase
        }

        let comparisonOpenCaseResult = comparisonOpenCase(totalOpenedCasesValueAfterOpenCase, expectedTotalOpenedCasesValueAfterOpenCase);
        comparisonOpenCaseResult.should.equal(true);

        function comparisonUserBalance (userBalanceAfterOpenCase, expectedUserBalanceAfterOpenCase) {
            return userBalanceAfterOpenCase === expectedUserBalanceAfterOpenCase
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterOpenCase, expectedUserBalanceAfterOpenCase);
        comparisonUserBalanceResult.should.equal(true);
        browser.pause(1000);
    });

    it("Check got item on the Got tab in the User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
        browser.click('//button[@class="btn-profileProducts"]');
        browser.click('//button[@name="got"]');
        const itemNameOnGotTab = browser.getText('//a[@class="product-title"]');
        itemNameOnGotTab.should.equal(gotItemName);
        const itemPriceOnGotTab = browser.getText('//div[@class="product-item"]//div[@class="price"]');
        itemPriceOnGotTab.should.equal(gotItemPrice);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(5000);
    });
});

