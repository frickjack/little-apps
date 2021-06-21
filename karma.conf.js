// Karma configuration
// Generated on Sat Jan 07 2017 22:42:18 GMT-0600 (CST)

module.exports = function(config) {
  const settings = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    // list of files / patterns to load in the browser
    files: [
      { pattern: 'node_modules/@littleware/**/*.js', type: 'module', included: false },
      { pattern: 'web/lib/511/**/*.js', type: 'module', included: false },
      { pattern: 'web/lib/jwt/**/*.js', type: 'module', included: false },
      { pattern: 'node_modules/i18next/*.js', type: 'module', included: false },
      { pattern: 'node_modules/@littleware/little-elements/web/**/*.js', 
        type: 'module', included: false },
      { pattern: 'node_modules/lit-html/*.js', type: 'module', included: false },
      { pattern: 'node_modules/lit-html/lib/*.js', type: 'module', included: false },
      { pattern: 'node_modules/@fortawesome/fontawesome-free/**/*', included: false },
      { pattern: 'node_modules/purecss/build/*', included: false },
      { pattern: 'web/lib/testMain.js', type: 'module', included: true }
    ],
    
    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },
    proxies: {
      '/i18next': '/base/node_modules/i18next',
      '/lit-html': '/base/node_modules/lit-html',
      '/@littleware/little-elements': '/base/node_modules/@littleware/little-elements',
      '/modules/@fortawesome/fontawesome-free': '/base/node_modules/@fortawesome/fontawesome-free',
      '/modules/purecss': '/base/node_modules/purecss'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    customLaunchers: {
      // see https://github.com/karma-runner/karma-chrome-launcher/issues/158
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  if (process.env['LITTLE_INTERACTIVE'] === 'false') {
    settings.singleRun = true;
    settings.browsers = ['ChromeHeadlessNoSandbox'];
  }
  config.set(settings);
}
