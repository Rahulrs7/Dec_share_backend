const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema({
    fileName:String,
    cid:String,
    url:String,
    size:Number,
    mimeType:String,
    uploadedAt:Date,
});
module.exports=mongoose.model("File",fileSchema);