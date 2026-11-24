const express =
require("express");

const router =
express.Router();

const OrderController =
require(
  "../controllers/OrderController"
);

const authMiddleware =
require(
  "../middlewares/authMiddleware"
);

router.get(
  "/",
  OrderController.index
);


router.get(
  "/:id",
  OrderController.show
);

router.post(
  "/",
  OrderController.store
);

router.put(
  "/:id/status",
  authMiddleware,
  OrderController.updateStatus
);


module.exports =
router;