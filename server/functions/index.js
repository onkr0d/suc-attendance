const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
exports.app = functions.https.onRequest(app);
app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.json())

app.post("/ayo", cors(), (request, response) => {
    functions.logger.info(request.body);
    response.status(200).send("User: " + request.body.name + "; SU-id: " + request.body.id + "; club: " + request.body.clubName);
})