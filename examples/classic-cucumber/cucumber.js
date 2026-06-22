// Cucumber.js configuration for THIS example only.
// Run it with:  npx cucumber-js --config examples/classic-cucumber/cucumber.js
//
// Note the paths are relative to the project root (where you run the command),
// not to this file.
module.exports = {
  default: {
    paths: ["examples/classic-cucumber/**/*.feature"],
    require: ["examples/classic-cucumber/steps/**/*.js"],
    format: ["html:examples/classic-cucumber/cucumber-report.html"],
    publishQuiet: true,
  },
};
