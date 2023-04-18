var express = require("express");
var mysql = require("mysql");
var app = express();
const path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

var property = 0;
var email = "";
var pass = "";
var opt = "";
var p_id = 0;
var t_id = 0;
var data = [[]];
var prop = "";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sql#2003",
  database: "project",
});

app.use("/images", express.static("images"));

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

// Set up EJS
app.set("views", path.join(__dirname, "views"));

app.set("views engine", "ejs");

// Create login page route
app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.get("/changedseller", (req, res) => {
  var q = `select * from pfs natural join seller natural join agent where seller_email = '${email}' and seller_password = '${pass}'`;
  db.query(q, function (error, results, fields) {
    res.render(`seller.ejs`, { properties: results });
  });
});

app.get("/changedbuyer", (req, res) => {
  q = `select * from pfs natural join seller natural join agent`;
  db.query(q, function (error1, results1, fields1) {
    res.render("buyer.ejs", { properties: results1 });
  });
});

app.get("/changedtenant", (req, res) => {
  q = `select * from pfr natural join owner natural join agent`;
  db.query(q, function (error1, results1, fields1) {
    res.render("tenant.ejs", { properties: results1 });
  });
});

app.get("/changedowner", (req, res) => {
  var q = `select * from pfr natural join owner natural join agent where owner_email = '${email}' and owner_password = '${pass}'`;
  db.query(q, function (error, results, fields) {
    res.render(`owner.ejs`, { properties: results });
  });
});

app.get("/addown", (req, res) => {
  res.render("addown.ejs");
});

app.get("/selleredit", (req, res) => {
  const id = req.query.params;
  const myid = parseInt(id);
  t_id = myid;
  var q = `select * from pfs where property_id = ${myid}`;
  db.query(q, function (error, results, fields) {
    res.render("selleredit.ejs", { property: results });
  });
});

app.get("/owneredit", (req, res) => {
  const id = req.query.params;
  const myid = parseInt(id);
  t_id = myid;
  var q = `select * from pfr where property_id = ${myid}`;
  db.query(q, function (error, results, fields) {
    res.render("owneredit.ejs", { property: results });
  });
});

app.post("/ownerupdate", (req, res) => {
  const {
    Hno,
    Street,
    City,
    Pincode,
    Area,
    Rent,
    BHK,
    Construction_Year,
    Information,
  } = req.body;
  var q = `update pfr set property_hno = '${Hno}', property_street = '${Street}', property_city = '${City}', property_pincode = '${Pincode}', property_area = '${Area}', property_rent = ${Rent},property_bhk = ${BHK},property_year = ${Construction_Year},property_info = '${Information}' where property_id = ${t_id}`;
  db.query(q, function (error, results, fields) {
    res.redirect("/changedowner");
  });
});

app.post("/sellerupdate", (req, res) => {
  const {
    Hno,
    Street,
    City,
    Pincode,
    Area,
    Price,
    BHK,
    Construction_Year,
    Information,
  } = req.body;
  var q = `update pfs set property_hno = '${Hno}', property_street = '${Street}', property_city = '${City}', property_pincode = '${Pincode}', property_area = '${Area}', property_price = ${Price},property_bhk = ${BHK},property_year = ${Construction_Year},property_info = '${Information}' where property_id = ${t_id}`;
  db.query(q, function (error, results, fields) {
    res.redirect("/changedseller");
  });
});

app.post("/addseller", (req, res) => {
  const {
    Hno,
    Street,
    City,
    Pincode,
    Area,
    Price,
    BHK,
    Construction_Year,
    Information,
  } = req.body;
  var q = `select max(pfr.property_id) as v1,max(pfs.property_id) as v2, max(agent.agent_id) as v3 from pfr, pfs, agent`;
  db.query(q, function (error2, results2, fields2) {
    if (error2) throw error2;
    var temp = Math.max(results2[0].v1, results2[0].v2);
    property = temp + 1;
    var temp_a_id = Math.floor(Math.random() * results2[0].v3) + 1;
    q = `select seller_id from seller where seller_email = '${email}' and seller_password = '${pass}'`;
    db.query(q, function (error, results, fields) {
      if (error) throw error;
      var id = results[0].seller_id;
      q = `insert into pfs values(${property},'${Hno}','${Street}','${City}','${Pincode}','${Area}','${Price}',${BHK},${Construction_Year},'${Information}',${id},${temp_a_id})`;
      db.query(q, function (error1, results1, fields1) {
        if (error1) throw error1;
        res.redirect("/changedseller");
      });
    });
  });
});

app.get("/buy", (req, res) => {
  const id = req.query.params;
  const myid = parseInt(id);
  var q = `select agent_id,seller_id,property_price from pfs where property_id = ${myid}`;
  db.query(q, function (error, results, fields) {
    var age_id = results[0].agent_id;
    var sell_id = results[0].seller_id;
    var amount = results[0].property_price;
    var gst = Math.floor(0.18 * amount);
    q = `select buyer_id from buyer where buyer_email = '${email}' and buyer_password = '${pass}'`;
    db.query(q, function (error1, results1, fields1) {
      var buy_id = results1[0].buyer_id;
      q = `delete from pfs where property_id = ${myid}`;
      db.query(q, function (error2, results2, fields2) {
        q = `select max(transaction_id) as v1 from transactionforsale`;
        db.query(q, function (error4, results4, fields4) {
          cnt = results4[0].v1 + 1;
          q = `insert into transactionforsale values(${cnt},${myid},${age_id},${buy_id},${sell_id},'2023-04-17','${amount}','${gst}')`;
          db.query(q, function (error3, results3, fields3) {
            res.redirect("/changedbuyer");
          });
        });
      });
    });
  });
});

app.get("/rent", (req, res) => {
  const id = req.query.params;
  const myid = parseInt(id);
  var q = `select agent_id,owner_id,property_rent from pfr where property_id = ${myid}`;
  db.query(q, function (error, results, fields) {
    var age_id = results[0].agent_id;
    var sell_id = results[0].owner_id;
    var amount = results[0].property_rent;
    var gst = Math.floor(0.18 * amount);
    q = `select tenant_id from tenant where tenant_email = '${email}' and tenant_password = '${pass}'`;
    db.query(q, function (error1, results1, fields1) {
      var buy_id = results1[0].tenant_id;
      q = `delete from pfr where property_id = ${myid}`;
      db.query(q, function (error2, results2, fields2) {
        q = `select max(transaction_id) as v1 from transactionforrent`;
        db.query(q, function (error4, results4, fields4) {
          cnt = results4[0].v1 + 1;
          q = `insert into transactionforrent values(${cnt},${myid},${age_id},${buy_id},${sell_id},'2023-04-17','${amount}','${gst}')`;
          db.query(q, function (error3, results3, fields3) {
            res.redirect("/changedtenant");
          });
        });
      });
    });
  });
});

app.post("/addowner", (req, res) => {
  const {
    Hno,
    Street,
    City,
    Pincode,
    Area,
    Rent,
    BHK,
    Construction_Year,
    Information,
  } = req.body;
  var q = `select max(pfr.property_id) as v1,max(pfs.property_id) as v2,max(agent.agent_id) as v3 from pfr, pfs,agent`;
  db.query(q, function (error2, results2, fields2) {
    var temp = Math.max(results2[0].v1, results2[0].v2);
    property = temp + 1;
    var temp_a_id = Math.floor(Math.random() * (results2[0].v3 - 1 + 1)) + 1;
    q = `select owner_id from owner where owner_email = '${email}' and owner_password = '${pass}'`;
    db.query(q, function (error, results, fields) {
      var id = results[0].owner_id;
      q = `insert into pfr values(${property},'${Hno}','${Street}','${City}','${Pincode}','${Area}','${Rent}',${BHK},${Construction_Year},'${Information}',${id},${temp_a_id})`;
      db.query(q, function (error1, results1, fields1) {
        if (error1) throw error1;
        res.redirect("/changedowner");
      });
    });
  });
});

app.post("/", (req, res) => {
  const { username, password, option } = req.body;
  email = username;
  pass = password;
  opt = option;
  var q = `select * from ${option} where ${option}_email = '${username}' and ${option}_password = '${password}'`;
  db.query(q, function (error, results, fields) {
    if (results[0] == null) {
      res.render("login1.ejs");
    } else {
      if (option == "buyer") {
        q = `select * from pfs natural join seller natural join agent`;
        db.query(q, function (error1, results1, fields1) {
          res.render("buyer.ejs", { properties: results1 });
        });
      } else if (option == "tenant") {
        q = `select * from pfr natural join owner natural join agent`;
        db.query(q, function (error1, results1, fields1) {
          res.render("tenant.ejs", { properties: results1 });
        });
      } else if (option == "seller") {
        q = `select * from pfs natural join seller natural join agent where seller_email = '${username}' and seller_password = '${password}'`;
        db.query(q, function (error1, results1, fields1) {
          res.render("seller.ejs", { properties: results1 });
        });
      } else {
        q = `select * from pfr natural join owner natural join agent where owner_email = '${username}' and owner_password = '${password}'`;
        db.query(q, function (error1, results1, fields1) {
          res.render("owner.ejs", { properties: results1 });
        });
      }
    }
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
