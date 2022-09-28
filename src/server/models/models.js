const { Pool } = require('pg');

// postgres URI for dan's DB made in elephantSQL
const PG_URI = 'postgres://lcxzqwbt:fJr59MbexnXRTjBow7GYbSaFJIhXmAOU@jelani.db.elephantsql.com/lcxzqwbt';

const pool = new Pool({
    connectionString: PG_URI
});




// // a test db query; note that the 2nd and 3rd arguments of pool.query are not needed
// const tempQueryText = `SELECT * FROM public.songs`
// pool.query(tempQueryText).then(value => console.log(value.rows));



module.exports = {
    query: (text, params, callback) => {
        console.log('executing the query: ', text);
        return pool.query(text, params, callback);
    }
}