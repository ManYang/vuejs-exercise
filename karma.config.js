var webpackConf = require('./webpack.config.js')
delete webpackConf.entry

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['progress', 'html'],
 
    htmlReporter: {
      outputFile: 'tests/unit-test.html',
      // Optional 
      pageTitle: 'Unit Tests',
       subPageTitle: 'A sample project description',
       groupSuites: true,
       useCompactStyle: true,
       useLegacyStyle: true
    },
    // this is the entry file for all our tests.
    files: [
      {pattern: './test/index.js', watched: false},
    ],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      './test/index.js': ['webpack']
    },
    // use the webpack config
    webpack: webpackConf,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-htmlfile-reporter'
    ]
  })
}