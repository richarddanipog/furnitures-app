require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getUser,
  login,
  signup,
  checkingEmailOnDB,
  userProfileUpdate,
  getAllUsers,
  getAllItems,
  getUserWishList,
  addItemToWishList,
  removeItemWishList,
} = require("../db/api/users");
const requireAuth = require("../middleware/requireAuth");

/* GET user by Id from DB. */
router.get("/:id", (req, res, next) => {
  getUser(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/* GET ALL users from DB. */
router.get("/admin/users", (req, res, next) => {
  getAllUsers()
    .then((allUsers) => res.status(200).json({ allUsers }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/* GET ALL Items from DB. */
router.get("/admin/items", (req, res, next) => {
  getAllItems()
    .then((allItems) => res.status(200).json({ allItems }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

/*User login*/
router.post("/login", async (req, res) => {
  const findUser = await login(req.body);
  if (!login) {
    res.status(500).json("Cannot find user");
  }
  try {
    const wasHash = await bcrypt.compare(
      req.body.password,
      findUser[0].password
    );
    if (wasHash) {
      const user = { ...findUser[0] };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.cookie("token", accessToken, { maxAge: 1000 * 60 * 60 * 24 });
      res.status(200).json({ accessToken });
    } else {
      res.status(405).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*User signup*/
router.post("/signup", authenticateEmail, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await signup({ ...req.body, password: hashedPassword });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*Get User */
router.post("/user", requireAuth, (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
});

/*Get User wish list */
router.post("/user/wish-list", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const wishList = await getUserWishList(user.id);
    res.status(200).json({ wishList });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

/*ADD item to User wish list */
router.post("/user/wish-list/add", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const result = await addItemToWishList(req.body.item_id, user.id);
    if (result) {
      const wishList = await getUserWishList(user.id);
      res.status(201).json({ wishList });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

/*REMOVE item from wish list */
router.delete("/user/wish-list/remove/:id", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const result = await removeItemWishList(req.params.id);
    if (result) {
      const wishList = await getUserWishList(user.id);
      res.status(201).json({ wishList });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

/*Update User */
router.put("/user/edit", requireAuth, async (req, res) => {
  const valueName = Object.keys(req.body)[0];
  const byId = req.user.id;
  const value = req.body[valueName];
  try {
    const update = await userProfileUpdate(byId, value, valueName);
    const user = await getUser(byId);
    const accessToken = jwt.sign(
      { ...user[0] },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("token", accessToken, { maxAge: 1000 * 60 * 60 * 24 });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*Authenticate user email */
async function authenticateEmail(req, res, next) {
  const authEmail = await checkingEmailOnDB(req.body.email);
  if (authEmail.length === 1) {
    res.sendStatus(403);
  } else {
    next();
  }
}

module.exports = router;
