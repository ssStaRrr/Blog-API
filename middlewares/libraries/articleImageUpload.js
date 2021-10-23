const multer = require('multer');
const path = require("path");
const CustomError = require("../../helpers/errors/CustomError");

// Storage , FileFilter

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir,"/public/uploads"));
    },
    filename: function(req, file, cb) {
        //File - Mimetype
        const extension = file.mimetype.split("/")[1];
        req.savedArticleName = "image_" + req.params.id + "." + extension;
        cb(null, req.savedArticleName);
    }
});

const FileFilter = (req, file, cb) => {
    let allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];

    if(!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valide image file",400), false);
    }
    return cb(null,true);
}

var upload = multer({storage:storage, FileFilter});

module.exports = {
    upload 
} 

// Set up multer for storing uploaded files
 
// var storage = multer.diskStorage({
//     destination: (req,file,cb => {
//         cb(null,"uploads")
//     }),
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now())
//     }
// });
// var upload = multer({ storage: storage });


