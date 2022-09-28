const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/api');

app.use('/api', router);

app.get("/", (req: any, res: any) => {
    res.status(200).send("Yellow world!!");
});

app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});