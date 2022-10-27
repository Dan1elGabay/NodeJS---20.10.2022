const mysql = require('mysql');
const db_config = require('./config');

const pool  = mysql.createPool(db_config);


//* create connection do data-Base
pool.getConnection(function(err, connection) {
  if (err){
    console.log('Sorry error connecting to DB 😥');
}else{
    console.log('Successfully connected to DB 😁');
}
});

pool.on('error', function(err) {
  console.log('[X] ERROR Occurred !\n',err.code);
  // https://www.npmjs.com/package/mysql#error-handling
});

module.exports = pool;