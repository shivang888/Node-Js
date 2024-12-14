change password 

let storeData = req.cookies.auth

if(old pass === db.password){
if(oldpass !=== newpassword){
if(newpassword === confirm){

await adminModel.findbyIdandUpdate(store.id,{password:newPassword})

console.log("password changed")
 res.clearCookie("auth");
  res.redirect("/");



}
else{
  res.redirect("back")
}

}else{
  res.redirect("back")
}


}else{
  res.redirect("back")
}