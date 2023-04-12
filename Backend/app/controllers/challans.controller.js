//Used for validation in Node.js
const Joi = require("joi"); 

const db = require("../Models");
const Sequelize = require('sequelize');


const Challans = db.challans;

// //Get Request Customer
// exports.GetCustomers = async(req,res) => {
//     const data = await Customer.findAll();
    
//     res.status(200).send(data);
// }


// Get pending challan count
exports.findAndGetChallans = async(req,res)=>{
    const id = req.params.id;
    console.warn(id);
    const data = await Challans.count({
        attributes: [
            'customer_id', 'issue_date',[Sequelize.fn('COUNT', 'challan_id'), 'count']
        ],
        where: {
            payment_status:'false',
            customer_id: id
        },
        group: ['customer_id','issue_date']
    });

    const size = Object.keys(data).length;
    
    res.status(200).send(size.toString());
}

// Get all the details related to challan for particular customer
exports.findAndGetChallanDetails = async(req,res)=>{
    const id = req.params.id;
    console.warn(id);
    const data = await Challans.findAll({
        attributes: ["customer_id","issue_date", [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity']],
        where: {
            payment_status:'false',
            customer_id: id
        },
        include: [
            {
                model: db.items,
                attributes: ["Name","selling_price"]
            }  
        ],
        group: ['issue_date','customer_id','item.id'],
        order: [
            ['issue_date', 'ASC']
        ]
    });
    res.status(200).send(data);
}



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

