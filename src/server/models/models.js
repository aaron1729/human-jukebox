const { Pool } = require('pg');

// postgres URI for dan's DB made in elephantSQL
const PG_URI = process.env.PG_URI;

const pool = new Pool({
    connectionString: PG_URI
});




// // a test db query; note that the 2nd and 3rd arguments of pool.query are not needed
// const tempQueryText = `SELECT * FROM public.musicians WHERE spotifyid = '.a.m.g.'`
// pool.query(tempQueryText).then(data => console.log(data.rows));


module.exports = {
    query: (text, params, callback) => {
        console.log('executing the query: ', text);
        return pool.query(text, params, callback);
    }
}