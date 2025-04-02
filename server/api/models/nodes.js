const mongoose=require('mongoose');

const nodeSchema=mongoose.Schema({
    
    id:{type:String,required:true},
    type:{type:String,required:true},
    position:{
        x: { type: Number },
        y: { type: Number },
    },
    data: {type: Object},
    _type:{type:String},
    style:{type:Object}
})

module.exports= mongoose.model('Node',nodeSchema);