const challanController = require("../controllers/challans.controller");
const {addChallan, findAndGetChallans, findAndGetChallanDetails} = challanController;





var router = require("express").Router();

//Get Challan count
router.get("/getChallanCount/:id",findAndGetChallans);

//Get challan details
router.get("/getChallanDetails/:id",findAndGetChallanDetails);

//Post (Create new challan)
router.post("/addChallans",addChallan);

//Delete Customer
// router.delete("/deleteCustomers/:id",Delete_Customer);

module.exports = router;