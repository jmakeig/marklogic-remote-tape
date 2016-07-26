'use strict';
const marklogic = require('marklogic');

const DB = marklogic.createDatabaseClient({
  host:     'localhost',
  port:     '8000',
  user:     'admin',
  password: 'admin',
  authType: 'DIGEST'
});

function remote(f, db) {
  db = db || DB;
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
module.exports = remote;
