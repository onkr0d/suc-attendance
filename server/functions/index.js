const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
exports.app = functions.https.onRequest(app);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.get("*", (request, response) => {
    response.send("Hello from Express on Firebase!")
    functions.logger.info(request.body);
    functions.logger.info(request.body.name);
    functions.logger.info("User '" + request.body.name + "' with SUid " + request.body.id + " is trying to sign into " + request.body.clubName);

})