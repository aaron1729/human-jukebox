const { Pool } = require('pg');

const PG_URI = 'postgres://lcxzqwbt:fJr59MbexnXRTjBow7GYbSaFJIhXmAOU@jelani.db.elephantsql.com/lcxzqwbt';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executing the query: ', text);
        return pool.query(text, params, callback);
    }
}