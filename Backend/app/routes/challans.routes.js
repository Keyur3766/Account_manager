const challanController = require("../controllers/challans.controller");
const {addChallan} = challanController;





var router = require("express").Router();

//Get Customers
// router.get("/getCustomers",GetCustomers);

//Post (Create new challan)
router.post("/addChallans",addChallan);

//Delete Customer
// router.delete("/deleteCustomers/:id",Delete_Customer);

module.exports = router;