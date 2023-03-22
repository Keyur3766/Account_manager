//Used for validation in Node.js
const Joi = require("joi"); 

const db = require("../Models");

const Customer = db.customer;

//Get Request Customer
exports.GetCustomers = async(req,res) => {
    const data = await Customer.findAll();
    
    res.status(200).send(data);
}



//Post Request Customer
exports.addCustomer = async(req,res) => {
    const schema = Joi.object({
        Name: Joi.string().min(2).required(),
        Email: Joi.string().required(),
        Address: Joi.string().required(),
        City: Joi.string().required(),
        Mobile: Joi.number().required()
    });

    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.message);
        return;
    }
    const{
        Name,
        Email,
        Address,
        City,
        Mobile
    } = req.body;
    console.log(Name);
    Customer.findOne({where: {Email: Email}})
    .then((data)=>{
        if(data){
            res.status(456).send({
                message: "Customer with same EmailId already exist",
            });
            res.end();
            return;
        }
        
        const customer = {
            Name: req.body.Name,
            Email: req.body.Email,
            Address: req.body.Address,
            City: req.body.City,
            Mobile: req.body.Mobile
        }

        Customer.create(customer)
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
            res.status(500).send({
                message: err.message || "some error occured while creating the customer"
            });
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error retrieving while entering the data into database=",
        });
    });
}

exports.Delete_Customer = (req, res) => {
const id = req.params.id;

    Customer.destroy({
    where: { id: id },
    })
    .then((num) => {
    if (num == 1) {
        res.send({
        message: "Customer was deleted successfully!",
        });
    } else {
        res.send({
        message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
    }
    })
    .catch((err) => {
    res.status(500).send({
        message: "Could not delete Customer with id=" + id,
    });
})};