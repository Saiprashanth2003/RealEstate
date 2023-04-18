var express = require("express");
var mysql = require("mysql");
var app = express();
const path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

var property = 0;
var email = "";
var pass = "";
var p_id = 0;
var data = [[]];
var prop = "";
var t_id = 0;
var temp_id = 0;
var amount = 0;
var gst = 0;
var a_id = 0;
var sales = 0;
var rents = 0;
var s_id = 0;
var o_id = 0;
var b_id = 0;
var ten_id = 0;

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

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/select", (req, res) => {
  res.render("select.ejs");
});

app.get("/agent", (req, res) => {
  res.render("agent.ejs");
});

app.get("/buyer", (req, res) => {
  res.render("buyer.ejs");
});

app.get("/owner", (req, res) => {
  res.render("owner.ejs");
});

app.get("/tenant", (req, res) => {
  res.render("tenant.ejs");
});

app.get("/seller", (req, res) => {
  res.render("seller.ejs");
});

app.post("/addagent", (req, res) => {
  const { Agent_Name, Agent_Phone, Agent_Email, Agent_password } = req.body;
  var q = `select max(agent_id) as v1 from agent`;
  db.query(q, function (error, results, fields) {
    a_id = results[0].v1 + 1;
    q = `insert into agent values(${a_id},'${Agent_Name}','${Agent_Phone}','${Agent_Email}','${Agent_password}')`;
    db.query(q, function (error1, results1, fields1) {
      res.render("agentadded.ejs");
    });
  });
});

app.post("/addbuyer", (req, res) => {
  const { Buyer_Name, Buyer_Phone, Buyer_Email, Buyer_password } = req.body;
  var q = `select max(buyer_id) as v1 from buyer`;
  db.query(q, function (error, results, fields) {
    a_id = results[0].v1 + 1;
    q = `insert into buyer values(${a_id},'${Buyer_Name}','${Buyer_Phone}','${Buyer_Email}','${Buyer_password}')`;
    db.query(q, function (error1, results1, fields1) {
      res.render("buyeradded.ejs");
    });
  });
});

app.post("/addseller", (req, res) => {
  const { Seller_Name, Seller_Phone, Seller_Email, Seller_password } = req.body;
  var q = `select max(seller_id) as v1 from seller`;
  db.query(q, function (error, results, fields) {
    a_id = results[0].v1 + 1;
    q = `insert into seller values(${a_id},'${Seller_Name}','${Seller_Phone}','${Seller_Email}','${Seller_password}')`;
    db.query(q, function (error1, results1, fields1) {
      res.render("selleradded.ejs");
    });
  });
});

app.post("/addowner", (req, res) => {
  const { Owner_Name, Owner_Phone, Owner_Email, Owner_password } = req.body;
  var q = `select max(owner_id) as v1 from owner`;
  db.query(q, function (error, results, fields) {
    a_id = results[0].v1 + 1;
    q = `insert into owner values(${a_id},'${Owner_Name}','${Owner_Phone}','${Owner_Email}','${Owner_password}')`;
    db.query(q, function (error1, results1, fields1) {
      res.render("owneradded.ejs");
    });
  });
});

app.post("/addtenant", (req, res) => {
  const { Tenant_Name, Tenant_Phone, Tenant_Email, Tenant_password } = req.body;
  var q = `select max(tenant_id) as v1 from tenant`;
  db.query(q, function (error, results, fields) {
    a_id = results[0].v1 + 1;
    q = `insert into tenant values(${a_id},'${Tenant_Name}','${Tenant_Phone}','${Tenant_Email}','${Tenant_password}')`;
    db.query(q, function (error1, results1, fields1) {
      res.render("tenantadded.ejs");
    });
  });
});

app.post("/", (req, res) => {
  const { username, password } = req.body;
  email = username;
  pass = password;
  if (email == "admin@gmail.com" && pass == "admin#2003") {
    res.redirect("/select");
  } else {
    res.render("login1.ejs");
  }
});

// Start server
const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
