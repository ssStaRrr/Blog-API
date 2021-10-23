const express = require("express");
const app = express();
const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");     //Express'in kendi paketi.
var fs = require("fs");
var bodyParser = require('body-parser');   //express'in kendi parser'ını kullanmamız yeterli oluyor
const articleRouter = require("./routers/articles");
const homeRouter = require("./routers/home");
const userRouter = require("./routers/user");
const {error} = require("./helpers/errors/error");
const connectDatabase = require("./helpers/database/connectDatabase");
const Blog = require("./models/Blog");
const {home} = require("./controllers/home");
const customErrorHandler = require("./middlewares/errors/CustomErrorHandler");
const methodOverride = require("method-override");

app.listen(5000, () => {
    console.log("sunucu dinleniyor");
})  
//Environment Variables
dotenv.config({
    path:"./config/config.env"
});

//Connect Database
connectDatabase();

//Setting ejs as view engine
app.set("view engine","ejs");

//Access to CSS file with public file  & access to form parameters with express urlencoder
app.use(express.static(__dirname + '/public'));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

//use the all article Router Html functions - home Routers
app.use("/articles",articleRouter);
app.use("/home", homeRouter);
app.use("/user",userRouter);
// get All Articles for Home Page
app.get("/",home);

//if router dont find request it will handle error on browser - Middleware
//app.use(error);
app.use(customErrorHandler);
