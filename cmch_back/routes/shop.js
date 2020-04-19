const express = require("express");
const router = express.Router();
const {
    listRelated
} = require("../controllers/shop");
router.post("/shop/seller/:sellerId", listRelated);
module.exports = router;
