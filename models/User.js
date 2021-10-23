const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
    name: {
        type:String,
        required: [true,"name can't be blank"]
    },
    surname: { 
        type:String,
        required: [true,"surname can't be blank"]
    },
    username: {
        type:String,
        required: [true,"it can't be blank"],
        minlength: [6, 'Please provide a username with min 6 characters']
    },
    email: {
        type:String,
        lowercase:true,
        required: [true, "it can't be blank"],
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        minlength: [6," Please provide a password with min 6 characters "],
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","admin"]
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});

//User Schema Methods

//Pre Hooks
User.pre("save", function(next){
    if(!this.isModified("password")) next();

    // salt raund sayısı 10 verildi ve salt isleminden donen sonuc tekrar hash'leme işleminde kullanıldı
    // yani crypto işlemi iç içe 2 tane callbacks içerisinde 2 kademeli olarak yapılır.
    bcrypt.genSalt(10, (err,salt)=>{
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err,hash) =>{
            if(err) next(err);
            this.password = hash;
            next();
        })
    })
});

module.exports = mongoose.model("User",User);
