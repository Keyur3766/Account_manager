//Used for validation in Node.js
const Joi = require("joi"); 

const db = require("../Models");

const Challans = db.challans;

// //Get Request Customer
// exports.GetCustomers = async(req,res) => {
//     const data = await Customer.findAll();
    
//     res.status(200).send(data);
// }



//Post Request challan
exports.addChallan = async(req,res) => {
    
    const{
        customer_id,
        item_id,
        quantity,
    } = req.body;
    console.log(customer_id);

    const challan = {
        customer_id: req.body.customer_id,
        item_id: req.body.item_id,
        quantity: req.body.quantity,
    }

    Challans.create(challan)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "some error occured while creating the challan"
        });
    });
}

