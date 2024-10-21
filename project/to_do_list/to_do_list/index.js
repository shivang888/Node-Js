const express = require("express");

const app = express();
const PORT = 8000;

// Middleware

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


let records = [];

// Home Route

app.get("/", (req, res) => {
  return res.render("index", { records });
});

// Add Route

app.post("/add", (req, res) => {
  const newRecord = req.body.record;
  if (newRecord) {
    records.push(newRecord);
  }
  res.redirect("/");
});

// edit Route

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const editToBe = records[index];
  res.render("edit", { record: editToBe, index });
});

// update route

app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  records[index] = req.body.record;
  res.redirect("/");
});

// delete route

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  records.splice(index, 1);
  res.redirect("/");
});

// Server listen

app.listen(PORT, () => {
  console.log("Server Started");
});



