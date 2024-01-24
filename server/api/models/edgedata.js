const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  edgeId: String,
  formFields: [
    {
      id: Number,
      values: [String],
    },
  ],
});

module.exports = mongoose.model('EdgeFormDataModel', FormDataSchema);