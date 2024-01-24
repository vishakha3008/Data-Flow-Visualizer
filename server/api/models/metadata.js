const mongoose=require('mongoose');



const FormDataSchema = new mongoose.Schema({
  nodeId: String,
  formFields: [
    {
      id: Number,
      values: [String],
    },
  ],
});

module.exports= mongoose.model('FormDataModel',FormDataSchema);