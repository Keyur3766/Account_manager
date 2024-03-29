//Used for validation in Node.js
const Joi = require("joi"); 
const pdf = require('html-pdf');
const pdfTemplate = require("../documents/InvoiceTemplate/index");
const db = require("../models");


const Customer = db.customer;
const Invoice = db.Invoice;
const Item = db.items;

exports.generateInvoice = async (req, res) => {
    try {
        const { customerId, items } = req.body;
    
        // create the invoice
        const invoice = await db.Invoice.create({
          total_amount: 0, // initialize total amount to 0
          customerId, // set the customer ID for this invoice
        });
    
        var ans = 0;
        // add items to the invoice
        const invoiceItems = await Promise.all(items.map(async (item) => {
          const { item_id, quantity } = item;
    
          // get the item from the database
          const dbItem = await Item.findByPk(item_id);
          
          ans += dbItem.selling_price * quantity

          // create a new invoice item with the quantity and calculated price
          return await db.InvoiceItem.create({
            quantity,
            price: dbItem.selling_price * quantity,
            itemId: item_id,
            invoiceId: invoice.id,
          });
        }));
        
        ans = ans*1.18
        // update the invoice with the total amount
        await invoice.update({ total_amount: ans });
    
        // return the created invoice
        const response = await Invoice.findOne({
            where: { id: invoice.id },
            include: [
              {
                model: Item,
                attributes: ['id', 'Name', 'selling_price'],
                through: { attributes: ['quantity'] },
              },

              {
                model: Customer,
                attributes: ['Name','Email','Address','City']
              }
            ],
          });
          
          
          pdf.create(pdfTemplate(response),{}).toFile(`${__dirname}/invoice.pdf`, (err) => {
            if(err){
                res.send(Promise.reject());
            }
            console.log("pdf generated");

            res.status(201).json(response);
          });


          // res.sendFile(`${__dirname}/invoice.pdf`);
          
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


// Generating Challan PDF
// exports.GenerateInvoicePDF = async(req,res) => {
//   pdf.create(pdfTemplate(req.body),{}).toFile(`${__dirname}/invoice.pdf`, (err) => {
//       if(err){
//           res.send(Promise.reject());
//       }
//       console.log("pdf generated");
//       res.send(Promise.resolve());
//   });
// }

// Downloading Generated PDF
exports.DownloadInvoicePDF = async(req,res) => {
  console.log("Pdf downloading");
  console.warn(`${__dirname}`);
  res.sendFile(`${__dirname}/invoice.pdf`);
}






  