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

class Club {

    // FIXME we still need to add the description to each club :)
    constructor(name, spreadsheetId, isActivated) {
        this.name = name.toLowerCase();
        this.spreadsheetId = spreadsheetId;
        this.isActivated = isActivated;
    }
}

const defaultSpreadSheetID = "1Ue2W8OfG17hSHm3nWkzcrusIZRv7j68Q4pa5qaYumVM";
let clubList = [new Club("volleyball", null, false), new Club("computer science", null, false), new Club("mock trial", "1afySUqmr2pelwFoUCZzZCeBS2q9Bbe9FMaxYQiZqWKw", true)];

// these are demo only :)
app.post("/api/signindemo", cors(), async (request, response) => {
    functions.logger.info(request.body.name + " signed up with ID " + request.body.id + " !");
    response.status(200).send(JSON.stringify("👍"));
})

app.post("/api/signindemo/club", cors(), async (request, response) => {
    functions.logger.info(request.body.name + " signed into the UNACTIVATED " + request.body.clubName + " club with ID " + request.body.id);
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
        functions.logger.error("Failed to authenticate with GCP.")
        functions.logger.error(e);
        response.status(500).send(JSON.stringify("Failed to authenticate with GCP."));
        return;
    }

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
        functions.logger.error("Failed to connect to Google APIs.")
        response.status(500).send(JSON.stringify("Server failed to connect to Google APIs."))
        return;
    }

    const spreadsheetId = findAppropriateClubID(club);

    if (!spreadsheetId) {
        functions.logger.error("Failed to find spreadsheet ID.")
        functions.logger.error("Club is probably not in the config.json file.")
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
    // return spreadsheet id or default
    if (clubList.find(c => c.name.toLowerCase() === club.toLowerCase())) {
        // wtf 'return undefined || defined' is so cool
        return clubList.find(c => c.name === club).spreadsheetId || defaultSpreadSheetID;
    }
    return defaultSpreadSheetID;
}

app.get("/api/clubs", cors(), async (request, response) => {
    functions.logger.info("Getting club list.");
    let final = [];
    for (let club of clubList) {
        // remove spreadsheet IDs from the club list
        // i don't actually know how this works, something to do with object destructuring
        const {spreadsheetId, ...strippedClub} = club;
        final.push(strippedClub);
    }

    response.status(200).send(JSON.stringify(final));
})