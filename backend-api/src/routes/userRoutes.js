const express =
require("express");

const router =
express.Router();

const UserController =
require(
  "../controllers/UserController"
);

const authMiddleware =
require(
  "../middlewares/authMiddleware"
);
router.get(
  "/:id",
  authMiddleware,
  UserController.show
);
router.put(
  "/:id",
  authMiddleware,
  UserController.update
);
router.delete(
  "/:id",
  authMiddleware,
  UserController.delete
);



router.post(
  "/",
  UserController.store
);

router.get(
  "/",
  authMiddleware,
  UserController.index
);

module.exports =
router;