/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});
//apiendpoints

app.get("/", (req, res) => {
  return res.send("helloword");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);
exports.app = functions.https.onRequest(app);

const productRoute = require("./routes/products");
app.use("/api/products", productRoute);
exports.app = functions.https.onRequest(app);
