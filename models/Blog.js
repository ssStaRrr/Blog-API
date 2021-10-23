const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window)
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        minlength: [3, "Title Must be min length 3 characters"]
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description Must be min length 10 characters"]
    },
    markdown: {
        type: String,
        required: true
    },
    articleImage: {
        type: String,
        data: Buffer,
        contentType: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isCreated: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
    
});

BlogSchema.pre("validate",function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true }, {strict: true})
    }
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
})

module.exports = mongoose.model("Blog",BlogSchema);