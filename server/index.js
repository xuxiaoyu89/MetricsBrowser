// server/index.js

const express = require("express");
const bodyParser = require('body-parser')
const { request } = require('urllib');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.post("/api", (req, res) => {
    console.log(req.body);
    const url = req.body.url;
    const publicKey = req.body.publicKey;
    const privateKey = req.body.privateKey;

    request(url, {
        method: "GET",
        digestAuth: `${publicKey}:${privateKey}`
    }).then(response => {
        res.json(JSON.parse(response.data.toString()));
    })
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});