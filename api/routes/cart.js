const {
  verifyToekenAndAuthorization,
  verifyToekenAndAdmin,
} = require("../middleware/verifyToekn");
const Cart = require("../models/Cart");

const router = require("express").Router();

//CREATE CART
router.post("/", verifyToekenAndAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedNewCart = await newCart.save();
    res.status(200).json(savedNewCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyToekenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToekenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CART BY USER ID
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Products for both user and admins
router.get("/", verifyToekenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
