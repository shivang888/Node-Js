const express = require("express");
const connection = require("./Config/db");
const UserModel = require("./Model/UserDataBase");
const app = express();
const PORT = 9000;
const path = require("path");

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.use("/public" , express.static("public"));
app.use("/img" , express.static("img"));
app.use("/uploads" , express.static("/uploads"));
app.use("/views" , express.static("/views"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/" , async (req , res) =>{
try{
 const dataData = await UserModel.find({});
res.render("bookMyShow" , {dataData});
}catch(err){
    console.log(err);
}
})
app.get("/imageUpload" , (req , res)=> {
    res.render("imageUpload")
})

app.post("/insertData" ,  UserModel.imageUpload ,async  (req,res)=> {
    console.log(req.file);
    console.log(req.body);
    if(req.file){
        req.body.image = UserModel.imagePath + "/" + req.file.filename;
    }
try{
await UserModel.create(req.body);
console.log("data insert succesfully");
}
catch(err){
    console.log(err);
    
}
    res.redirect("/")
})

app.listen(PORT , () => {
    console.log("Server Started");
    connection();
});