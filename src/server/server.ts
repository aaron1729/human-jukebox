import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.status(200).send("Yellow world!!");
});

app.get("/api", (req, res) => {
    res.status(200).send("this is the api route!");
})

app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});