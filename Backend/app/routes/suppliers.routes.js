const supplierController = require("../controllers/supplier.controller");
const {addSupplier,GetSuppliers} = supplierController;




var router = require("express").Router();

//Get Customers
router.get("/getSuppliers",GetSuppliers);

//Post (Create new customer)
router.post("/addSupplier",addSupplier);

module.exports = router;