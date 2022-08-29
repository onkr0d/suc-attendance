const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const {google} = require("googleapis");

const app = express();
exports.app = functions.https.onRequest(app);
app.use(cors({origin: true}));
app.use(express.json());
app.use(bodyParser.json())

let clubToSpreadsheetMap = new Map();
clubToSpreadsheetMap.set("volleyball", "1Ue2W8OfG17hSHm3nWkzcrusIZRv7j68Q4pa5qaYumVM");
clubToSpreadsheetMap.set("computer science", "1Ue2W8OfG17hSHm3nWkzcrusIZRv7j68Q4pa5qaYumVM");
clubToSpreadsheetMap.set("mock trial", "1Ue2W8OfG17hSHm3nWkzcrusIZRv7j68Q4pa5qaYumVM");

app.post("/api/signindemo", cors(), async (request, response) => {
    functions.logger.info("[DEMO] " + request.body.name + " signed up for the demo with ID " + request.body.id);
    response.status(200).send(JSON.stringify("👍"));
})

app.post("/api/signindemo/club", cors(), async (request, response) => {
    functions.logger.info("[DEMO] " + request.body.name + " signed into the " + request.body.clubName + " club with ID " + request.body.id);
    response.status(200).send(JSON.stringify("👍"));
})

app.post("/api/update", cors(), async (request, response) => {
    functions.logger.info("Trying to sign " + request.body.name + " in for " + request.body.clubName + " with ID " + request.body.id);
    let auth;
    try {
        // these are gcp credentials, authorized to access the google sheets api
        auth = new google.auth.GoogleAuth({
            keyFile: 'suvba-354520-7a424399cccb.json', scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })
    } catch (e) {
        console.error("Failed to authenticate with GCP.")
        console.error(e);
        response.status(500).send(JSON.stringify("Failed to authenticate with GCP."));
        return;
    }

    // get user data from request
    const {name, id} = request.body;

    // user data
    const [firstName, lastName] = request.body.name.split(' ');
    const suffolkID = request.body.id;
    const club = request.body.clubName;

    // api data
    let client;
    let googleSheets;
    try {
        client = await auth.getClient();
        googleSheets = google.sheets({version: "v4", auth: client});
    } catch (e) {
        console.error("Failed to connect to Google APIs.")
        response.status(500).send(JSON.stringify("Server failed to connect to Google APIs."))
        return;
    }

    // log the request to the console
    console.log(request.body);

    const spreadsheetId = findAppropriateClubID(club);

    if (!spreadsheetId) {
        console.error("Failed to find spreadsheet ID.")
        console.error("Club is probably not in the config.json file.")
        response.status(500).send(JSON.stringify("Server failed to find spreadsheet ID."))
        return;
    }

    // write row to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth, spreadsheetId, range: "Sheet1!A:E", valueInputOption: "USER_ENTERED", resource: {
            values: [[new Date().toLocaleDateString(), firstName, lastName, suffolkID]]
        }
    })

    functions.logger.info("Successfully signed " + request.body.name + " in.");
    response.status(200).send(JSON.stringify("👍"));
})

/**
 * Finds the appropriate spreadsheet ID for the given club.
 *
 * @param club The club to find the spreadsheet ID for.
 * @return {string} The spreadsheet ID for the given club.
 */
function findAppropriateClubID(club) {
    return clubToSpreadsheetMap.get(club.toLowerCase());
}