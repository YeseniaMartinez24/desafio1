const mongoose = require("mongoose");


const productoSchuema = new mongoose.Schema({
 id: {
   type: Number,
   required: true,
 },
 name: {
   type: String,
   required:true,
   trim: true 
 },
 price: {
   type: Number,
   required:true,
   trim: true 
 },
 description: {
   type: String,
   trim: true 
 },
 images:[String],
});


module.exports = mongoose.model("producto", productoScheuema);