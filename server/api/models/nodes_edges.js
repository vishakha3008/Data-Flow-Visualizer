const mongoose = require('mongoose');

const nodesEdgesSchema = new mongoose.Schema({
  nodes: [
    {
      _type:{type:String},
      
      id: { type:String, required: true },
      type: { type: String, required: true },
      data: { type: Object },
      position:{
        x: { type: Number },
        y: { type: Number },
    },
      style: { type: Object },
    },
  ],
  edges: [
    {
      _type:{type:String},
      
      id: { type: String, required: true },
      source: { type: String, required: true },
      target: { type: String, required: true },
      type: { type: String, required: true },
      label: { type: String },
    },
  ],
});

module.exports = mongoose.model('NodesEdges', nodesEdgesSchema);
