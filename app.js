require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");
const multer = require("multer");
const Razorpay = require('razorpay');

const app = express();
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://jsamaan:amaan123@cluster0.vz55wc0.mongodb.net/jsamaan?retryWrites=true&w=majority");



let storage = multer.diskStorage({
  destination: "public/photo/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const File = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Kitchen = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Phone = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Furniture = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Grocery = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Pharmacy = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Beauty = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  productName: String,
  productPrice: Number,
  image: String
});

const Skill = new mongoose.Schema({
  name: String,
  profession: String,
  experience: Number,
  email: String,
  phone: Number,
  price: Number
});

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

const Payment = new mongoose.Schema({
  email: String,
  name: String,
  number: Number,
  city: String,
  address: String,
  country: String,
  pincode: Number
});

const razorpay = new Razorpay({
  key_id: 'rzp_test_FCY7ZRu9Ix7mw5',
  key_secret: 'SCdwoI1Vu7ngtCbd6jtZt94O',
});

const file = mongoose.model("file", File);
const kitchen = mongoose.model("kitchen", Kitchen);
const phone = mongoose.model("phone", Phone);
const grocery = mongoose.model("grocery", Grocery);
const furniture = mongoose.model("furniture", Furniture);
const beauty = mongoose.model("beauty", Beauty);
const pharmacy = mongoose.model("pharmacy", Pharmacy);
const skill = mongoose.model("skill", Skill);
const user = mongoose.model("user", UserSchema);
const payment = mongoose.model("payment", Payment);

app.get("/", async function (req, res) {
  try {
    const foundItems = await file.find({});
    const foundItemsk = await kitchen.find({});
    const foundItemsg = await grocery.find({});
    const foundItemsb = await beauty.find({});
    const foundItemsm = await pharmacy.find({});
    const foundItemsf = await furniture.find({});
    const foundItemsp = await phone.find({});
    const skillItems = await skill.find({});
    res.render("header", {
      recordss: foundItems,
      skillName: skillItems,
      kitchen: foundItemsk,
      phone: foundItemsp,
      furniture: foundItemsf,
      beauty: foundItemsb,
      pharmacy: foundItemsm,
      grocery: foundItemsg,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", function (req, res) {
  res.render("header");
  search = req.body.search1;
  console.log(search);
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/submit", function (req, res) {
  res.render("sec1");
});

app.get("/adminn", function (req, res) {
  res.render("adminn");
});

app.get("/skill", function (req, res) {
  res.render("skill");
});

app.get("/raz", function (req, res) {
  res.render("raz");
});

app.get("/select", function (req, res) {
  res.render("select");
});

app.get("/sports", function (req, res) {
  res.render("sports");
});

app.get("/kitchen", function (req, res) {
  res.render("kitchen");
});

app.get("/phone", function (req, res) {
  res.render("phone");
});

app.get("/furniture", function (req, res) {
  res.render("furniture");
});

app.get("/grocery", function (req, res) {
  res.render("grocery");
});

app.get("/pharmacy", function (req, res) {
  res.render("pharmacy");
});

app.get("/beauty", function (req, res) {
  res.render("beauty");
});

app.get("/payment", function (req, res) {
  res.render("payment");
});

app.post("/payment", function (req, res) {
  const paymentperson = new payment({
    email: req.body.username,
    name: req.body.name,
    number: req.body.number,
    city: req.body.city,
    address: req.body.address,
    country: req.body.country,
    pincode: req.body.pincode
  })
  paymentperson.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  const newUser = new user({
    username: username,
    password: md5(password)
  });

  newUser.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/sports", upload, function (req, res) {
  const photo = new file({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    image: req.file.filename
  })
  photo.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/kitchen", upload, function (req, res) {
  const kit = new kitchen({
    name: req.body.namek,
    email: req.body.emailk,
    phone: req.body.phonek,
    productName: req.body.productNamek,
    productPrice: req.body.productPricek,
    image: req.file.filename
  });

  kit.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/phone", upload, function (req, res) {
  const pho = new phone({
    name: req.body.namep,
    email: req.body.emailp,
    phone: req.body.phonep,
    productName: req.body.productNamep,
    productPrice: req.body.productPricep,
    image: req.file.filename
  });

  pho.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/furniture", upload, function (req, res) {
  const fur = new furniture({
    name: req.body.namef,
    email: req.body.emailf,
    phone: req.body.phonef,
    productName: req.body.productNamef,
    productPrice: req.body.productPricef,
    image: req.file.filename
  });

  fur.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/grocery", upload, function (req, res) {
  const gro = new grocery({
    name: req.body.nameg,
    email: req.body.emailg,
    phone: req.body.phoneg,
    productName: req.body.productNameg,
    productPrice: req.body.productPriceg,
    image: req.file.filename
  });
  

    gro.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });

});

app.post("/pharmacy", upload, function (req, res) {
  const pha = new pharmacy({
    name: req.body.namem,
    email: req.body.emailm,
    phone: req.body.phonem,
    productName: req.body.productNamem,
    productPrice: req.body.productPricem,
    image: req.file.filename
  });

  pha.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/beauty", upload, function (req, res) {
  const bea = new beauty({
    name: req.body.nameb,
    email: req.body.emailb,
    phone: req.body.phoneb,
    productName: req.body.productNameb,
    productPrice: req.body.productPriceb,
    image: req.file.filename
  });

  bea.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/login", function (req, res) {
  const Username = req.body.username;
  const Password = md5(req.body.password);
  if (Username == "admin@gmail.com" && req.body.password == "123") {
    res.render("select");
  } else {
    user.findOne({ username: Username }, function (err, foundItems) {
      console.log(foundItems);
      if (err) {
        res.send("err");
      } else {
        console.log(foundItems);
        if (foundItems) {
          console.log(foundItems);
          if (foundItems.password === Password) {
            res.render("select");
          } else {
            res.send("err");
          }
        } else {
          console.log(foundItems);
          res.send("err33");
        }
      }
    });
  }
});

app.post("/skill", upload, function (req, res) {
  const skillPerson = new skill({
    name: req.body.name,
    profession: req.body.profession,
    experience: req.body.experience,
    email: req.body.email,
    phone: req.body.phone,
    price: req.body.price
  })
  skillPerson.save()
  .then(foundItems => {
    res.redirect("/");
  })
  .catch(err => {
    res.send(err);
  });
});

app.post("/search", async function (req, res) {
  const searchTerm = req.body.search1;
  let searchResults = { recordss: [], kitchen: [], phone: [], furniture: [], grocery: [], beauty: [] };

  const renderResults = () => {
    res.render("searchResults", searchResults);
  };

  try {
    const promises = [
      file.find({ productName: { $regex: searchTerm, $options: 'i' } }).exec(),
      kitchen.find({ productName: { $regex: searchTerm, $options: 'i' } }).exec(),
      phone.find({ productName: { $regex: searchTerm, $options: 'i' } }).exec(),
      furniture.find({ productName: { $regex: searchTerm, $options: 'i' } }).exec(),
      grocery.find({ productName: { $regex: searchTerm, $options: 'i' } }).exec(),
      beauty.find({ productName: { $regex: searchTerm, $options: 'i' } }).exec(),
    ];

    const [recordsResults, kitchenResults, phoneResults, furnitureResults, groceryResults, beautyResults] = await Promise.all(promises);

    searchResults.recordss = recordsResults;
    searchResults.kitchen = kitchenResults;
    searchResults.phone = phoneResults;
    searchResults.furniture = furnitureResults;
    searchResults.grocery = groceryResults;
    searchResults.beauty = beautyResults;

    if (Object.keys(searchResults).some((key) => searchResults[key].length !== 0)) {
      renderResults();
    } else {
      res.render("noResults"); // Add a new view for displaying no results
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred during the search.");
  }
});



app.listen(4000, function () {
  console.log("Server started on port 4000.");
});
