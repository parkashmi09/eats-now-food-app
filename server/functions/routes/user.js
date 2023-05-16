const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("Inside the router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token not found" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodValue = await admin.auth().verifyIdToken(token);
    if (!decodValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting Token: ${err}`,
    });
  }
});
module.exports = router;
