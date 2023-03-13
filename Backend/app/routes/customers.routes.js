const customerController = require("../controllers/customer.controller");
const {addCustomer,GetCustomers} = customerController;





var router = require("express").Router();

//Get Customers
router.get("/getCustomers",GetCustomers);

//Post (Create new customer)
router.post("/addCustomer",addCustomer);

module.exports = router;