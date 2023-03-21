const itemsController = require("../controllers/items.controller");
const {addItems, getItemImage, getItems} = itemsController;
const upload = require("../middleware/upload");
const express = require("express")
var router = express.Router();

// router.use(express.json())
// router.use(express.urlencoded({ extended: true }));
//Get Customers
// router.get("/getCustomers",GetCustomers);

//Post (Create new Item)
router.post("/addItems",upload.single("file"),addItems);

router.get("/image/:filename", getItemImage);

router.get("/getItems",getItems);

module.exports = router;