const express = require("express");
const path = require('path');
const fs = require("fs");
const cors = require("cors");
const port = 8080;

const app = express();

app.use(cors(), express.static(path.join(__dirname, 'clubs')))

app.get("/api/clubs", cors(), (req, res, next) => {
    const directoryPath = path.join(__dirname, 'clubs');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("Cannot read directory", err)
        }
        return res.json(JSON.stringify(files));
    })
})

const server = app.listen(port, () => {
    console.log('server listening on', port);
})

module.exports = server