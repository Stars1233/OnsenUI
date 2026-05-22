exports.config = {
  chromeDriver: require('chromedriver').path,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: require('puppeteer').executablePath(),
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