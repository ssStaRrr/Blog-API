const asyncHandler = require('express-async-handler');
const CustomError = require('../helpers/errors/CustomError');
const Blog = require("../models/Blog");
const fs = require('fs');

const createBlog = asyncHandler (async(req,res,next) => {
    const {title,description,markdown} = req.body;

    if( !(title) && !(description) && !(markdown)) return next(new CustomError("Article Elemanlarini tanimlayiniz!",400));

    const article = new Blog({
        title,
        description,
        markdown
    })
    await article.save()
    .then((ans) => {
        console.log("kayit islemi basarili");
        console.log(article);
        res.redirect(`/articles/${article.slug}`);
    }).catch( (err) => {
        console.log(err);
        console.log("kayit gerçekleştirilemedi");
        article.isCreated = false;
        res.render("create", {article: article} );
    }); 

    //res.render("create");
});

const getArticleWithSlug = asyncHandler (async(req,res,next) => { 
    const article = await Blog.findOne({slug: req.params.slug});
    if(!article) return next();
    res.render("readArticle", {article});
});

const deleteBlog = asyncHandler (async(req,res) => { 
    const {id} = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect("/");
 
    // await Blog.findByIdAndDelete(id)
    // .then( (data) => {
    //      console.log("delete islemi basarili!");
    //      return res.redirect("/");
    //     })
    // .catch(err =>  console.log(err));
});
const editBlogPage = asyncHandler (async(req,res) => {
    const {id} = req.params;
    const article = await Blog.findById(id);

    res.render("editArticle", {article});
});

const editBlog = asyncHandler (async(req,res) => { 
    const {id} = req.params;
    const {title, description, markdown} = req.body;
    console.log(id);
    let article = await Blog.findOneAndUpdate( {_id:id},{
         title,
         description,
         markdown
     }, {
         new: true
     }); 
     res.redirect(`/articles/${article.slug}`);
});

const addArticleImagePage = asyncHandler (async(req,res) => {
    const {id} = req.params;
    const article = await Blog.findById(id);
    res.render("addArticleImage", {article});
});

const addArticleImage = asyncHandler (async(req,res) => {
    
    const {id} = req.params;
    // const article1 = await Blog.findById(id);
    // const pathPrefix = article1.articleImage.split(".")[0];
    
    const article = await Blog.findByIdAndUpdate(id, {
         "articleImage" : req.savedArticleName
    }, {
         new: true
    });
    return res.redirect("/");
});

const checkNumberOfImage = asyncHandler (async(req,res,next) => { 
    const {id} = req.params;
    const article1 = await Blog.findById(id);
    const pathPrefix = article1.articleImage.split(".")[0];

    //Delete file
    let files = fs.readdirSync("public/uploads");
    files.forEach( file => {
        if(file.split(".")[0]==pathPrefix) {
            fs.unlink("public/uploads/" + article1.articleImage, err => {
                if(err) console.log(err); 
            })
    }});
    next();
});

module.exports = {
    createBlog,
    getArticleWithSlug,
    deleteBlog,
    editBlogPage,
    editBlog,
    addArticleImagePage,
    addArticleImage,
    checkNumberOfImage
}