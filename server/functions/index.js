const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.donkeyDick = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs! We out here 😎", {structuredData: true});
  response.send("Donkey dick haha :)");
});

exports.logUserIn = functions.https.onRequest((request, response) => {
  functions.logger.info("Logging user in");
  functions.logger.info(request.body);
  functions.logger.info(request.body);
  response.send("Logged in");
});