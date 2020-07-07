const express = require("express");
const router = express.Router();
const {
  getItems,
  countItems,
  randomItems,
  getSingleItems,
  userUpdateItem,
  addItemReviews,
  userAddItem,
  insertImages,
  getItemReviews,
  addToShoppingCart,
  getUserShoppingCart,
  removeFromShoppingCart,
} = require("../db/api/items");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/items");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* GET items listing. */
router.get("/", (req, res) => {
  getItems(req.query)
    .then((items) => res.status(200).json({ items }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/* GET single item from listing. */
router.get("/:id", (req, res) => {
  getSingleItems(req.params.id)
    .then((item) => res.status(200).json({ item }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/* GET Total Count item from DB. */
router.get("/categories/count", (req, res) => {
  countItems()
    .then((countItems) => res.status(200).json({ countItems }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/* GET item reviews from DB. */
router.get("/item/reviews/:id", (req, res) => {
  getItemReviews(req.params.id)
    .then((itemReviews) => res.status(200).json({ itemReviews }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/* POST item reviews from DB. */
router.post("/item/reviews", requireAuth, async (req, res) => {
  try {
    const result = await addItemReviews(req.body);
    if (result) {
      const itemReviews = await getItemReviews(req.body.item_id);
      res.status(201).json({ itemReviews });
    } else {
      res.status(405);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST RANDOMS items from DB. */
router.post("/home/randoms", (req, res) => {
  randomItems(req.body)
    .then((randomItems) => res.status(200).json({ randomItems }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.post("/addItem", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const itemId = req.body.id;
  const result = await addToShoppingCart(userId, itemId);
  res.status(201).json({ result });
});

router.post("/user/shopping-cart", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const data = await getUserShoppingCart(userId);
  res.status(200).json({ data });
});

router.delete("/removeItem/:id", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const itemId = parseInt(req.params.id);
  const result = await removeFromShoppingCart(userId, itemId);
  res.status(201).json({ result });
});

/*Update Item */
router.put("/item/update/:id", requireAuth, async (req, res) => {
  const valueName = Object.keys(req.body)[0];
  const byId = req.params.id;
  const value = req.body[valueName];
  try {
    const result = await userUpdateItem(byId, value, valueName);
    const item = await getSingleItems(byId);
    res.status(200).json({ item, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/item/admin/add-item",
  upload.array("images"),
  async (req, res) => {
    const newItemId = await userAddItem(req.body);
    for (let img of req.files) {
      await insertImages(newItemId[0][0].new_item, img.originalname);
    }
    res.status(201).json({ itemId: newItemId[0][0].new_item });
  }
);

module.exports = router;
