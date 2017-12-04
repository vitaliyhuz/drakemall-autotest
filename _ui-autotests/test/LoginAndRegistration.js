require('chai').should();
var timestamp = + new Date();
var emailForRegistration = 'qadm' + timestamp + '@mailinator.com';
var passwordForRegistration = '!QAZ2wsx';
var usernameForRegistration = 'QaTester';
var facebookEmail = '+380981041718';
var facebookPassword = '!QAZ2wsx';

describe("Register with Email", function () {
    it("Open Registration window", function () {
        browser.windowHandleMaximize();
        browser.url('');
        browser.click('//button[.="Sign Up"]');
        browser.pause(1000);
        var registrationWindowTitle = browser.getText('//span[@class="form-title"]');
        registrationWindowTitle.should.equal('Registration');
    });
    it("Enter registration data", function () {
        browser.setValue('#name',usernameForRegistration);
        browser.setValue('#email',emailForRegistration);
        browser.setValue('#password',passwordForRegistration);
        browser.click('//button[contains(@class, "form-submit-btn")]');
        browser.pause(3000);
    });
    it("Check login after registration", function () {
        var userLogin = browser.getText('//span[@class="profile-name"]');
        userLogin.should.equal(usernameForRegistration);
        var balanceTitle = browser.getText('//div[@class="header-balance-title"]');
        balanceTitle.should.equal('Your balance');
        var balanceValue = browser.getText('//div[@class="header-balance-value"]');
        balanceValue.should.equal('$0.00');

    });
    it("Logout", function () {
        browser.click('//button[@class="logout-btn"]');
    });
 });


describe("Login with Facebook", function () {
    it("Open Login window", function () {
        browser.click('//button[.="Log In"]');
        browser.pause(1000);
        var loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
    });
    it("Login to Facebook", function () {
        browser.click('//a[@class="social-login-btn large facebook-login"]');
        browser.setValue('#email',facebookEmail);
        browser.setValue('#pass',facebookPassword);
        browser.click('//button[@name="login"]');
        browser.pause(3000);
    });
    it("Check login with Facebook", function () {
        var userLogin = browser.getText('//span[@class="profile-name"]');
        userLogin.should.equal('QA');
    });
    it("Logout", function () {
        browser.click('//button[@class="logout-btn"]');
    });
 });
