const asyncHandler = require('express-async-handler');
const Blog = require("../models/Blog");

const home = asyncHandler (async(req,res) => { 
    const articles = await Blog.find();
    res.render("index", { articles:articles });
});

const getAbout = asyncHandler (async(req,res) => { 
    res.render("about");
});

module.exports = {
    home,
    getAbout
};