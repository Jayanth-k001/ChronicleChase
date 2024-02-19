const mongoose = require("mongoose");

const articleschema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },   
    newsUrl:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    source:{
        type: String,
        required: true,
    }
                  

})

const articlesschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    articles: [articleschema]
})

const  articledb=new mongoose.model("articles", articlesschema);

module.exports = articledb;