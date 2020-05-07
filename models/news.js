const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255,
    },
    text:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20000,
    },
    category:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100,
    },
    link:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255,
    },
})

const ScienceNews =  mongoose.model('Science',NewsSchema);
const AstroNews   =  mongoose.model('AstroPhysics',NewsSchema);

module.exports.AstroNews = AstroNews;
module.exports.ScienceNews = ScienceNews;