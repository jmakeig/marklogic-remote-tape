'use strict';

const test = require('tape-promise')(require('tape'));
const remote = require('./remote');

test('ensure promises work', assert => {
  remote(() => { 
    const admin = require("/MarkLogic/admin.xqy");
    const config = admin.getConfiguration();
    return Sequence.from([config, 1, false, {}]);
  }).then((result) => {
    assert.equal(result.length, 4, 'Correct number of items');
  });
  assert.end();
});
