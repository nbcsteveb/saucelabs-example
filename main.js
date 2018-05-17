const makeSuite = require('./helper').makeSuite
const {assert} = require('chai')

makeSuite('BrowserTest', function() {
    it('Should navigate to sites correctly', async function () {
        await this.driver.get('http://www.nbcnewyork.com')
        assert.equal(await this.driver.getCurrentUrl(), 'https://www.nbcnewyork.com/')
        assert.equal(await this.driver.getTitle(), 'New York News, Local News, Weather, Traffic, Entertainment, Breaking News')
    })
})