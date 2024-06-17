const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "dname":{type:String,required:true},
        "dmail":{type:String,required:true},
        "daddress":{type:String,required:true},
        "dphone":{type:String,required:true},
        "dspecialization":{type:String,required:true},
        "dexperience":{type:String,required:true},
        "dpassword":{type:String,required:true}
    }
)
let doctorsmodel=mongoose.model("doctors",schema);
module.exports={doctorsmodel}