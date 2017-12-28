require('chai').should();
const {
    passwordForRegistration,
    usernameForRegistration
} = require('../constants');
const { emailForRegistration } = require('../createdEmail.json');

let nameOfItemForSell;
let priceOfItemForSell;
let userBalanceBeforeSelling;
//Delete after add "Add funds" test
const tempUsername = "AutomationUA";
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
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check added address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo.should.equal('QaTester\nUkraine, Kyiv 02000\nKhreshchatyk str, b. 77, apt. 9\nPhone: +380507777777');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});

describe("Edit Delivery address", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
    });
    it("Edit address", function () {
        browser.click('//a[@class="edit"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");

        browser.setValue('//input[@name="phone"]', '+380508787879');
        browser.setValue('//input[@name="street"]','Velyka Vasylkivska ');
        browser.setValue('//input[@name="building"]','74');
        browser.setValue('//input[@name="apartment"]','11');
        browser.click('//button[contains(@class, "action-btn brand-solid save-btn")]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check edited address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo.should.equal('QaTester\nUkraine, Kyiv 02000\nVelyka Vasylkivska str, b. 74, apt. 11\nPhone: +380508787879');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});

describe("Add new address (Second)", function () {
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
        browser.setValue('//input[@name="phone"]', '+380509999999');
      browser.setValue('//input[@name="country"]','Ukraine');
        browser.setValue('//input[@name="region"]','Kyiv city');
        browser.setValue('//input[@name="city"]','Kyiv');
        browser.setValue('//input[@name="zipCode"]','02000');
        browser.setValue('//input[@name="street"]','Baseina Street');
        browser.setValue('//input[@name="building"]','7');
        browser.setValue('//input[@name="apartment"]','10');
        browser.click('//button[contains(@class, "action-btn brand-solid save-btn")]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check added second address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo[1].should.equal ('QaTester\nUkraine, Kyiv 02000\nBaseina Street str, b. 7, apt. 10\nPhone: +380509999999');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});
describe("Set address as Default", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
        browser.pause(1000);
    });
    it("Set as default", function () {
        const arrayInitialAddressStatus = $$('.address-controls span');
        const initialAddressStatusFirst = arrayInitialAddressStatus[0];
        const initialAddressStatusSecond = arrayInitialAddressStatus[1];
        const initialAddressStatusFirstText = initialAddressStatusFirst.getText();
        const initialAddressStatusSecondText = initialAddressStatusSecond.getText();
        initialAddressStatusFirstText.should.equal('Default'); //Check initial address status
        initialAddressStatusSecondText.should.equal('Set as default'); //Check initial address status
        browser.click('//span[.="Set as default"]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check setting Default address on the General info tab", function () {
        const arrayChangedAddressStatus = $$('.address-controls span');
        const changedAddressStatusFirst = arrayChangedAddressStatus[0];
        const changedAddressStatusSecond = arrayChangedAddressStatus[1];
        const changedAddressStatusFirstText = changedAddressStatusFirst.getText();
        const changedAddressStatusSecondText = changedAddressStatusSecond.getText();
        changedAddressStatusFirstText.should.equal('Set as default');
        changedAddressStatusSecondText.should.equal('Default');
        browser.pause(1000);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
    //Add test "Check setting Default address on the Delivery tab" after completed Game tests!!!
});
describe("Delete Address", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
        browser.pause(3000);
    });
    it("Deleting address", function () {
        const arayOfAddresses = browser.getText('//div[@class="address-controls"]');
        const quantityOfAddresses = arayOfAddresses.length;
        quantityOfAddresses.should.equal(2); // Check quantity of added addresses
        browser.click('//a[@class="default"][1]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check deleting address", function () {
        let addresses = browser.getText('//div[@class="address-controls"]');
        addresses = typeof addresses === 'string' ? [addresses] : addresses;
        const quantityOfAddresses = addresses.length;
        quantityOfAddresses.should.equal(1);
        const addressStatus = browser.getText('//div[@class="address-controls"]');
        addressStatus.should.equal('Default');
        //Use after fixing bug DRAKE-206
    });

    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
    //Add test "Check deleting address on the Delivery tab" after completed Game tests!!!
});
describe("Sell Item", function () {
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
    });
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
    });
    it("Open Got tab", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
        browser.click('//button[@class="btn-profileProducts"]');
        browser.click('//button[@name="got"]');
    });
    it("Sell Item", function () {
        userBalanceBeforeSelling = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        nameOfItemForSell = browser.getText('//a[@class="product-title"]');
        priceOfItemForSell = browser.getText('//div[@class="product-item"]//div[@class="price"]');
        browser.click('//button[@class="action-btn brand-solid sell"]');
        browser.pause(1000);
        const sellingWindowTitle = browser.getText('//span[@class="sell-modal-title"]');
        sellingWindowTitle.should.equal("Selling product");
        const sellingWindowText =  browser.getText('//div[@class="sell-modal-text with-image"]');
        sellingWindowText.should.equal(`Are you sure you want to sell ${nameOfItemForSell} for ${priceOfItemForSell}?\nThe sum will be added to your balance`); //Add after fix on the modal window
        browser.click('//button[@class="action-btn brand-solid sell-modal-submit-btn"]');
        browser.pause(1000);
    });
    it("Check selling of item", function () {
        const userBalanceAfterSelling = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const priceOfItemForSellFloat = parseFloat(priceOfItemForSell.substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedUserBalanceAfterSelling = (userBalanceBeforeSelling + priceOfItemForSellFloat);
        function comparisonUserBalance (userBalanceAfterSelling, expectedUserBalanceAfterSelling) {
            return userBalanceAfterSelling === expectedUserBalanceAfterSelling
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterSelling, expectedUserBalanceAfterSelling);
        comparisonUserBalanceResult.should.equal(true);
    });
});

