const express = require("express");
const path = require('path');
const fs = require("fs");
const cors = require("cors");
const {google} = require("googleapis");
const faker = require("@faker-js/faker");
const port = 8080;

const app = express();

app.use(cors(), express.static(path.join(__dirname, 'clubs')))
// parse bodies automatically
app.use(express.json())

// this is middleware, i think
const myLogger = function (req, res, next) {
    console.log("LOGGED " + req.body)
    next()
}

app.use(myLogger);

app.get("/api/clubs", cors(), (req, res, next) => {
    const directoryPath = path.join(__dirname, 'clubs');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("Cannot read directory", err)
        }
        return res.json(JSON.stringify(files));
    })
})

app.post("/api/update", cors(), (req, res, next) => {
    // validate data here
    console.log('received user data')
    console.log(req.body)
    res.status(200);

    let response = {
        everything: "ok 👍",
    };
    console.log(response);
    res.end(JSON.stringify(response));

    next();
})

app.get("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'notSafe/suvba-354520-7a424399cccb.json', scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1Ue2W8OfG17hSHm3nWkzcrusIZRv7j68Q4pa5qaYumVM";

    // read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth, spreadsheetId, range: "Sheet1!A:B"
    })

    // write row to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth, spreadsheetId, range: "Sheet1!A:C", valueInputOption: "USER_ENTERED", resource: {
            values: [[day, getRandomInt(100, memberMin)], [++day, getRandomInt(100, memberMin)]]
        }
    })

    day += 1;
    memberMin += 5;
    res.send(getRows.data);
})

const server = app.listen(port, () => {
    console.log('server listening on', port);
})

let day = 1;
let memberMin = 1;

function getRandomInt(max, min) {
    if (min > max) {
        return max;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSuffolkId() {
    return Math.floor(Math.random() * 10000000);
}

app.get("/api/update/demo", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'notSafe/suvba-354520-7a424399cccb.json', scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1Ue2W8OfG17hSHm3nWkzcrusIZRv7j68Q4pa5qaYumVM";

    // write row to spreadsheet

    let users = getRandomInt(10, 0);

    for (let i = 0; i < users; i++) {
        await googleSheets.spreadsheets.values.append({
            auth, spreadsheetId, range: "Sheet1!A:E", valueInputOption: "USER_ENTERED", resource: {
                values: [["6/" + fakeDay + "/2022", faker.faker.name.firstName(), faker.faker.name.lastName(), getRandomSuffolkId()]]
            }
        })
    }

    fakeDay += 1;

    res.send(JSON.stringify("👍"));
})
let fakeDay = 3;
module.exports = server