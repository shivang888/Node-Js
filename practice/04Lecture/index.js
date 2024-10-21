const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res) =>  {
  
    const log = `New Reqest Recived : ${Date.now()} : ${req.url} \n`;

    fs.appendFile("log.txt",log,(err,data) => {
        
        switch (req.url) {
            case "/":
                res.end("Welcome Shivang Kad in Home Page");
                break;
            case "/about" :
                 res.end("Welcome Shivang Kad in About Page");
                 break;

            default:
                res.end("404 Error, Page Not Found!");
              
        }
    }); 
 
});

myServer.listen(9000,() => {
    console.log("server started");
})