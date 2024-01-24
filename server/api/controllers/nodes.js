const mongoose=require('mongoose');
const Node=require('../models/nodes');


exports.nodes_get_all=function(req,res,next){             //Returns all nodes that we have
    Node.find()
    .select('_type  id type data position style')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            nodes: docs.map(doc => {
                return {
                    _type: doc._type,
                    //_id: doc._id,
                    id: doc.id,
                    type: doc.type,
                    data: doc.data,
                    position: doc.position,
                    style: doc.style,
                };
            }),
        };
     res.status(200).json(response)
    })
    .catch(err =>{
     console.log(err);
     res.status(500).json({
         error: err
     })
    })
}

//Not really needed
    exports.nodes_get_one=function(req,res,next){          //Returns a specific node by id
        const Nid=req.params.id;
        Node.findById(Nid)
        .select('_type id type data position style')
        .exec()
        .then(doc =>{
            console.log(doc);
            if(doc){
                res.status(200).json({
                    nodes: doc,
                });
            }
            else{
                res.status(404).json({
                    message:'No valid entry found'
                })
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    }

    exports.nodes_post=function(req,res,next){             //Adds a new node
        const node= new Node({
            _type:req.body._type,
            //_id: new mongoose.Types.ObjectId(),
            id :req.body.id,
            type:req.body.type,
            data:req.body.data,
            position:req.body.position,
            style:req.body.style,
        });
        node.save().then(result => {
            res.status(200).json({
                message:'Dealing with post request',
                createdNode: result,
            });
        })
        .catch(err => {
            console.log(err);
    
            if (err.name === 'ValidationError') {
                    // Handle validation error
                    return res.status(422).json({
                        error: {
                            message: 'Validation failed',
                            details: err.errors
                        }
                    });
                }
    
            res.status(500).json({
                error: err
            })
        })
    }

    exports.nodes_delete = (req, res, next) => {
        const id = req.params.nodeId;
      
        console.log('Deleting node with ID:', id);
      
        Node.deleteOne({ id: id })
          .exec()
          .then(result => {
            console.log(result); // Log the result to see what was deleted
            if (result.deletedCount > 0) {
              res.status(200).json({ message: "Deleted Successfully" });
            } else {
              res.status(500).json({ error: "No ID Found" });
            }
          })
          .catch(error => {
            console.error('Error deleting node:', error);
            res.status(500).json({
              error: error
            });
          });
      };

    // exports.nodes_put = async (req, res, next) => {
    //     const nodeId = req.params.id;
    //     const newPosition = req.body.newPosition;
      
    //     try {
    //       // Update the node in MongoDB based on the provided nodeId
    //       const updatedNode = await Node.findOneAndUpdate(
    //         { id: nodeId },
    //         { position: newPosition },
    //         { new: true } // Return the updated document
    //       );
      
    //       if (updatedNode) {
    //         res.status(200).json({ message: 'Node position updated successfully', node: updatedNode });
    //       } else {
    //         res.status(404).json({ message: 'No valid entry found for the provided nodeId' });
    //       }
    //     } catch (error) {
    //       res.status(500).json({ message: 'Error updating node position', error: error.message });
    //     }
    //   };