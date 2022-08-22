const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const {google} = require("googleapis");
const fs = require("fs");
const path = require("path");

const app = express();
exports.app = functions.https.onRequest(app);
app.use(cors({origin: true}));
app.use(express.json());
app.use(bodyParser.json())

app.post("/api/update", cors(), async (request, response) => {
    let auth;
    try {
        // these are gcp credentials, authorized to access the google sheets api
        auth = new google.auth.GoogleAuth({
            keyFile: 'suvba-354520-7a424399cccb.json', scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })
    } catch (e) {
        console.error("Failed to authenticate with GCP.")
        console.error(e);
        response.status(500);
        response.send(JSON.stringify("Failed to authenticate with GCP."));
        return;
    }

    // get user data from request
    const {name, id} = request.body;
    console.log("User is: " + name, id);

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

    const spreadsheetId = findAppropriateID(club);

    if (!spreadsheetId) {
        console.error("Failed to find spreadsheet ID.")
        console.error("Club is probably not in the config.json file.")
        response.status(500);
        response.send(JSON.stringify("Server failed to find spreadsheet ID."))
        return;
    }

    console.log(spreadsheetId);
    // write row to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth, spreadsheetId, range: "Sheet1!A:E", valueInputOption: "USER_ENTERED", resource: {
            values: [[new Date().toLocaleDateString(), firstName, lastName, suffolkID]]
        }
    })


    response.status(200);
    response.send(JSON.stringify("👍"));
})

/**
 * Parses club.json into a map, and finds the appropriate spreadsheet id. Returns the id, or null if not found.
 * @param clubName
 * @return {string | undefined}
 */
function findAppropriateID(clubName) {
    const clubData = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
    const clubMap = new Map(Object.entries(clubData));
    return clubMap.get(clubName.toLowerCase());
}