const express = require("express");
const supabase=require("./model/webDB");
const routers=require("./routes/routes");
const middleware=require("./middlewares/middlewares");
const cookieParser = require('cookie-parser')
const ejs=require("ejs");
const app=express();


app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
  app.get("/api",middleware.checksignin,(req,res)=>{
    decodedtoken= req.decodedtoken;
    if(decodedtoken){
      res.status(201).json({ logged:true });
    }
    else{
      res.status(201).json({ logged:false });
    }
    // res.send("<h1>home page</h1>");
   // res.render("main",{root:__dirname});

 });
 
 
app.use(routers);

