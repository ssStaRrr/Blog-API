const express = require("express");
const router = express.Router();
const {createBlog, deleteBlog, getArticleWithSlug, editBlogPage, editBlog, addArticleImagePage, addArticleImage, checkNumberOfImage} = require("../controllers/articles");
const {upload} = require("../middlewares/libraries/articleImageUpload");
const Blog = require("../models/Blog");

router.get("/new", (req,res) => {
    res.render("create", {article: new Blog() });
});

router.post("/newCreate",createBlog);
router.get("/:slug",getArticleWithSlug);
router.get("/addArticleImagePage/:id",addArticleImagePage);
router.post("/addArticleImage/:id",[checkNumberOfImage,upload.single("image"),addArticleImage]);
router.delete("/delete/:id",deleteBlog);
router.get("/:id/editBlogPage",editBlogPage);
router.put("/edit/:id",editBlog);


module.exports = router;