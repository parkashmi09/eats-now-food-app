const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productPrice: req.body.productPrice,
      productImage: req.body.productImage,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error : ${err}` });
  }
});

router.get("/all", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let response = [];
      await query.get().then((querySnap) => {
        let docs = querySnap.docs;
        docs?.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error : ${err}` });
    }
  })();
});
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
   db.collection("products").doc(`/${productId}/`).delete().then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error : ${err}` });
  }
});

module.exports = router;
