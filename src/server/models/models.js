const { Pool } = require('pg');
const globals = require('../../globals');

// postgres URI for db (in elephantSQL)
const PG_URI = process.env.PG_URI;

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        if (globals.longConsoleLogs) {
            console.log('executing the query:', text);
        }
        return pool.query(text, params, callback);
    }
}