const express = require("express");
const connection = require("./mongoose/database");
const UserModel = require("./model/UserModel");
const PORT = 8000;
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", async (req,res) => {
    //   try {
    //       const userData = await UserModel.find({});

    //       res.render("addData",{ userData });
    //   } catch(err){
    //     console.log(err);
    //   }
      res.render("add");
});

app.post("/AddData",async (req,res) => {
        try {
             await UserModel.create(req.body);
             console.log("Add Data SucessFully");
             
        }catch(err){
            console.log(err);
        }
        res.redirect("http://localhost:8000/");
});


app.listen(PORT, () => {
      connection();
      console.log(`Server is running on port ${PORT}`);
});


