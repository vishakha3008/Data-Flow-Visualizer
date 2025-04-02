const mongoose=require('mongoose');

const edgeSchema=mongoose.Schema({
    
    id: {type: String,required:true},
    _type:{type:String},
    source:{type: String, required:true},
    target:{type:String,required:true},
})

module.exports= mongoose.model('Edge',edgeSchema);