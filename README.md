# Install

```bash
$ yarn install
yarn install v1.6.0
warning package.json: No license field
warning No license field
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
✨  Done in 1.02s.
```

# Configure

Setup a `.env` file, should contain the following:

```bash
$ cat .env
SAUCE_USERNAME=xxx
SAUCE_ACCESS_KEY=aaa-bbb-ccc-ddd
```

# Run it

```bash
$ yarn test
yarn test
yarn run v1.6.0
warning package.json: No license field
$ env $(cat .env) mocha ./main.js
[INFO] Searching for WebDriver executables installed on the current system...
[INFO] ... located chrome
[INFO] ... located firefox
[INFO] ... located safari
[INFO] Running tests against [chrome, firefox, safari]


  [chrome]
    BrowserTest
      ✓ Should navigate to sites correctly (10721ms)
SauceOnDemandSessionID=96dfcbc6cd5444a992d9cee2e23b629d job-name=Should navigate to sites correctly

  [firefox]
    BrowserTest
      ✓ Should navigate to sites correctly (14074ms)
SauceOnDemandSessionID=9b777d8dad7547eaa5c3c168d0a46a2d job-name=Should navigate to sites correctly

  [safari]
    BrowserTest
      ✓ Should navigate to sites correctly (9165ms)
SauceOnDemandSessionID=43825c01e32e49bb8007fc1d80bf95da job-name=Should navigate to sites correctly


  3 passing (1m)

✨  Done in 68.64s.
```
