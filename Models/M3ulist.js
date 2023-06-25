const mongoose = require('mongoose');

const M3ulistSchema = new mongoose.Schema({
   listname:{
      type:String,
   },
   originalName:{
    type:String,
   },
  ownerId: {
    type:String,
  }



}, {timestamps:true})

const M3ulist = mongoose.model("Playlist",M3ulistSchema);

module.exports  =  M3ulist;