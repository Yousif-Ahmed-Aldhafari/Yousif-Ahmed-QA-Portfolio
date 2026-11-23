const { defineConfig } = require('cypress');
module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: { mochaFile: 'artifacts/junit-[hash].xml', toConsole: true },
  video: false,
  e2e: { baseUrl: 'http://127.0.0.1:4173' },
});
