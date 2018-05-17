const { suite } = require('selenium-webdriver/testing')
const webdriver = require('selenium-webdriver')
const SauceLabs = require("saucelabs")

var username,
    accessKey,
    saucelabs,
    seRelayHost,
    seRelayPort,
    buildTag,
    sauceSeUri,
    tunnelId;

function setSauceEnv(){
    username = process.env.SAUCE_USERNAME;
    accessKey = process.env.SAUCE_ACCESS_KEY;
    buildTag = process.env.BUILD_TAG || process.env.SAUCE_BUILD_NAME;
    tunnelId = process.env.TUNNEL_IDENTIFIER;
    //making sure we have some username and access key
    if (username == undefined || accessKey == undefined){
        console.error("Sauce username and password is not defined!");
        process.exit(1);
    }

    saucelabs = new SauceLabs({
        username: username,
        password: accessKey
    });
}

async function beforeEachExample(self, env) {
    var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";

    var desiredCaps = {
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey,
        'name': self.currentTest.title
        };
    //check if buildTag is set if so add to desired caps.
    if (buildTag != undefined){
        desiredCaps['build'] = buildTag;
    }
    //check if there's a tunnel identifier set by CI (Plugin)
    if (tunnelId != undefined){
        desiredCaps['tunnel-identifier'] = tunnelId;
    }
    self.driver = await env.builder().
    withCapabilities(desiredCaps).
    usingServer(server).
    build();

    self.driver.getSession().then(function(sessionid) {
        self.driver.sessionID = sessionid.id_;
    });
};

function afterEachExample(done) {
	var passed = (this.currentTest.state === 'passed') ? true : false;

    saucelabs.updateJob(this.driver.sessionID, {
      passed: passed
    }, done);
    console.log("SauceOnDemandSessionID=" + this.driver.sessionID +" job-name=" + this.currentTest.title);
    this.driver.quit();
};

function makeSuite(desc, cb) {
    suite(function(env) {
        describe(desc, function () {
            var self = this
            self.timeout(60000)
            setSauceEnv();
            self.beforeEach(async function () {
                return beforeEachExample(this, env)
            });
            cb();
            self.afterEach(afterEachExample);
        })
    });
};

exports.makeSuite = makeSuite;
