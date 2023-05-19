const router = require("express").Router();
const admin = require("firebase-admin");

const data = [];

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

const listAllUsers = (nextPageToken) => {
  return new Promise((resolve, reject) => {
    const fetchUsers = (nextPageToken) => {
      admin
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            data.push(userRecord?.toJSON());
          });
          if (listUsersResult.pageToken) {
            fetchUsers(listUsersResult.pageToken);
          } else {
            resolve(); // Resolve the promise when all users' data is fetched
          }
        })
        .catch((error) => {
          reject(error); // Reject the promise if there's an error
        });
    };

    fetchUsers(nextPageToken);
  });
};

// Start listing users from the beginning, 1000 at a time.
listAllUsers()
  .then(() => {
    console.log("User data fetched successfully");
  })
  .catch((error) => {
    console.log("Error listing users:", error);
  });
router.get("/allUsers", async (req, res) => {
  try {
    await listAllUsers(); // Wait for all users' data to be fetched
    return res
      .status(200)
      .json({ success: true, usersData: data, usersCount: data.length });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting Token: ${err}`,
    });
  }
});
module.exports = router;
