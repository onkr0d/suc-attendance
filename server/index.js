const express = require("express");
const path = require('path');
const fs = require("fs");
const cors = require("cors");
const {google} = require("googleapis");
const port = 8080;

const app = express();

app.use(cors(), express.static(path.join(__dirname, 'clubs')))
// parse bodies automatically
app.use(express.json())

// FIXME This is a temporary solution. The images should be hosted on the frontend
app.get("/api/clubs", cors(), (req, res, next) => {
    const directoryPath = path.join(__dirname, 'clubs');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("Cannot read directory", err)
        }
        // strip useless .DS_Store files from the list
        files = files.filter(file => !file.startsWith("."));

        return res.json(JSON.stringify(files));
    })
})

app.post("/api/update", cors(), async (req, res) => {
    let auth;
    try {
        // these are gcp credentials, authorized to access the google sheets api
        auth = new google.auth.GoogleAuth({
            keyFile: 'notSafe/suvba-354520-7a424399cccb.json', scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })
    } catch (e) {
        console.error("Failed to authenticate with GCP.")
        console.error(e);
        res.status(500);
        res.send(JSON.stringify("Failed to authenticate with GCP."));
        return;
    }

    console.log(req.body);

    // get user data from request
    const {name, id} = req.body;
    console.log(name, id);

    // user data
    const [firstName, lastName] = req.body.name.split(' ');
    const suffolkID = req.body.id;
    const club = req.body.clubName;

    // api data
    let client;
    let googleSheets;
    try {
        client = await auth.getClient();
        googleSheets = google.sheets({version: "v4", auth: client});
    } catch (e) {
        console.error("Failed to connect to Google APIs.")
        res.status(500);
        res.send(JSON.stringify("Server failed to connect to Google APIs."))
        return;
    }


    const spreadsheetId = findAppropriateID(club);

    if (!spreadsheetId) {
        console.error("Failed to find spreadsheet ID.")
        console.error("Club is probably not in the config.json file.")
        res.status(500);
        res.send(JSON.stringify("Server failed to find spreadsheet ID."))
        return;
    }

    console.log(spreadsheetId);
    // write row to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth, spreadsheetId, range: "Sheet1!A:E", valueInputOption: "USER_ENTERED", resource: {
            values: [[new Date().toLocaleDateString(), firstName, lastName, suffolkID]]
        }
    })


    res.status(200);
    res.send(JSON.stringify("👍"));
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

const server = app.listen(port, () => {
    console.log('server listening on', port);
})

module.exports = server