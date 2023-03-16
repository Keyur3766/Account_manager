//importing modules
const express = require('express')
const bodyParser = require("body-parser");
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cors = require("cors");
const cookieParser = require("cookie-parser")
const customerRoutes = require("./app/routes/customers.routes");
const supplierRoutes = require("./app/routes/suppliers.routes");


//setting up your port
const PORT = process.env.PORT || 8081

//assigning the variable app to express
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// synchronizing the database and forcing it to false so we dont lose data
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("db has been re sync");
// });

app.use("/api/customers/", customerRoutes);
app.use("/api/suppliers/",supplierRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))


