const { verifyToekenAndAdmin } = require("../middleware/verifyToekn");
const Product = require("../models/Product");

const router = require("express").Router();

//CREATE product
router.post("/", verifyToekenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedNewProduct = await newProduct.save();
    res.status(200).json(savedNewProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyToekenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToekenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Product BY ID
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Products for both user and admins
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCat = req.query.category;

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCat) {
      products = await Product.find({
        categories: {
          $in: [queryCat],
        },
      });
    } else {
      products =  await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
