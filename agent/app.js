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

app.get("/changed", (req, res) => {
  var q = `select * from pfs natural join seller natural join agent where agent_email = '${email}' and agent_password = '${pass}'`;
  db.query(q, function (error1, results1, fields1) {
    data = results1;
    q = `select * from pfr natural join owner natural join agent where agent_email = '${email}' and agent_password = '${pass}'`;
    db.query(q, function (error2, results2, fields2) {
      res.render("agent.ejs", {
        properties1: data,
        properties2: results2,
        agent_id: a_id,
      });
    });
  });
});

app.get("/progress", (req, res) => {
  const id = req.query.params;
  const myid = parseInt(id);
  var q = `SELECT COUNT(*) as count FROM transactionforsale WHERE agent_id = ${myid}`;
  db.query(q, function (error, results, fields) {
    sales = results[0].count;
    q = `SELECT COUNT(*) as count FROM transactionforrent WHERE agent_id = ${myid}`;
    db.query(q, function (error1, results1, fields1) {
      rent = results1[0].count;
      res.render("progess.ejs", { sales: sales, rent: rent });
    });
  });
});

app.post("/", (req, res) => {
  const { username, password } = req.body;
  email = username;
  pass = password;
  var q = `select * from agent where agent_email = '${username}' and agent_password = '${password}'`;
  db.query(q, function (error, results, fields) {
    if (results[0] == null) {
      res.render("login1.ejs");
    }
    a_id = results[0].agent_id;
    q = `select * from pfs natural join seller natural join agent where agent_email = '${username}' and agent_password = '${password}'`;
    db.query(q, function (error1, results1, fields1) {
      data = results1;
      q = `select * from pfr natural join owner natural join agent where agent_email = '${username}' and agent_password = '${password}'`;
      db.query(q, function (error2, results2, fields2) {
        res.render("agent.ejs", {
          properties1: data,
          properties2: results2,
          agent_id: a_id,
        });
      });
    });
  });
});

// Start server
const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
