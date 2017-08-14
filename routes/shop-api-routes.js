var db = require("../models");
var bucket = require("../config/storage.js");
var format = require('util').format;
var Multer = require("multer");
var multer =  Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 //No larger than 5 mb
  }
});


module.exports = function(app) {
  app.get("/api/shops", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Shop.findAll({
      include: [db.Item]
    }).then(function(dbShop) {
      res.json(dbShop);
    });
  });

  app.get("/api/shops/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Shop.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Item]
    }).then(function(dbShop) {
      res.json(dbShops);
    });
  });

  app.post("/api/shops", function(req, res) {
    db.Shop.create(req.body).then(function(dbAuthor) {
      res.json(dbShop);
    });
  });

  app.delete("/api/shops/:id", function(req, res) {
    db.Shop.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbShop) {
      res.json(dbShop);
    });
  });

//This is to be merfed with the main POST method;
//currently this is for uploading to cloud storage and returns a url address for where it is located
app.post("/uploadimg", multer.single('image'), function(req, res, next){

  if (!req.file) {
    return next();
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  blobStream.on('finish', () => {

   const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    res.status(200).send(publicUrl);
    
    console.log(publicUrl);
    next();
  });

  blobStream.end(req.file.buffer);
}
)

function tester() {
   db.Shop.findAll({
      include: [db.Item]
    }).then(function(dbShop) {
      console.log(dbShop);
})}

};

