//Used for validation in Node.js
const Joi = require("joi");
const path = require("path");

const db = require("../Models");
const fs = require("fs");

const Item = db.items;

//Get all the Items from DB
exports.getItems = async (req, res) => {
  try {
    console.log("From API:");
    const items = await Item.findAll()
      .then((items) => {
        items.map((i) => {
          const itemimage = i.imageData.toString("base64");
          i["imageData"] = itemimage;
        });
        return items;
      })
      .then((items) => {
        return res.status(200).send(items);
      });
  } catch (error) {
    return res.status(500).send(error.mesage);
  }
};

//Get Item Image
exports.getItemImage = async (req, res) => {
  const { filename } = req.params;

  const fullfilepath = path.join(
    __basedir,
    "/resources/static/assets/temps/" + filename
  );
  return res.sendFile(fullfilepath);
};

//Post Request Item
exports.addItems = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send("You must select a file");
    }

    const Name = req.body.Name;

    Item.findOne({ where: { Name: Name } }).then((data) => {
      if (data) {
        res.status(456).send({
          message: "Product with same Name already exist",
        });
        res.end();
        return;
      }
      const my_item = {
        Name: req.body.Name,
        purchase_price: req.body.purchase_price,
        selling_price: req.body.selling_price,
        item_color: req.body.item_color,
        total_stocks: req.body.total_stocks,

        //For images
        imageType: req.file.mimetype,
        imageName: req.file.originalname,
        imageData: fs.readFileSync(
          __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
      };

      Item.create(my_item)
        .then((image) => {
          // console.log(image);
          fs.writeFileSync(
            __basedir + "/resources/static/assets/temps/" + image.imageName,
            image.imageData
          );

          return res.send(`File has been uploaded.`);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "some error occured while creating the Item",
          });
        });
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

exports.Delete_Item = (req, res) => {
const id = req.params.id;

  Item.destroy({
    where: { id: id },
  })
  .then((num) => {
    if (num == 1) {
      res.send({
        message: "Item was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Item with id=${id}. Maybe Item was not found!`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete Item with id=" + id,
    });
})};