exports.config = {
  chromeDriver: require('chromedriver').path,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: process.env.CHROME_BIN,
      args: ['--no-sandbox', '--disable-gpu', '--headless']
    }
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};