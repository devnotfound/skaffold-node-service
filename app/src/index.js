const run = require('./run');
const process = require('process');
const console = require('console');

run().catch((err) => {
  console.error(`Error occurred while trying to run server. Error - [${err}], exiting...`);
  process.exit(1);
});
