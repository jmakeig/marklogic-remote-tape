'use strict';

const test = require('tape-promise')(require('tape'));
const marklogic = require('marklogic');

function remote(f) {
  var db = marklogic.createDatabaseClient({
    host:     'localhost',
    port:     '8000',
    user:     'admin',
    password: 'admin',
    authType: 'DIGEST'
  });
  const code = `(${String(f)})()`;
  
  return new Promise((resolve, reject) => 
    db
      .eval(code)
      .result()
      .then(
        result => {
          resolve(result.map(item => item.value));
        }
      )
      .catch(error => reject(error))
  );
}

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
