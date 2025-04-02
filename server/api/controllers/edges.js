const mongoose=require('mongoose');
const Edge=require('../models/edge');


exports.edges_get_all=function(req,res,next){             //Returns all edges that we have
    Edge.find()
    .select('_type id source target')
    .exec()
    .then(docs =>{
     const response={
         count:docs.length,
         edges: docs.map(doc =>{
             return{
                _type:doc._type,
                //_id:doc._id,
                 id :doc.id,
                 source:doc.source,
                 target:doc.target
             }
         })
     };
     res.status(200).json(response)
    })
    .catch(err =>{
     console.log(err);
     res.status(500).json({
         error: err
     })
    })}


    exports.edges_get_one=function(req,res,next){          //Returns a specific edge by id
        const Eid=req.params.id;
        Edge.findById(Eid)
        .select('_type  id source target')
        .exec()
        .then(doc =>{
            console.log(doc);
            if(doc){
                res.status(200).json({
                    edges: doc,
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

    exports.edges_post=function(req,res,next){             //Adds a new edge
        const edge= new Edge({
            _type: req.body._type,
            id :req.body.id,
            source:req.body.source,
            target:req.body.target,
        });
        edge.save().then(result => {
            res.status(200).json({
                message:'Dealing with post request',
                createdEdge: result,
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

   
 exports.edges_delete = async (req, res, next) => {
  try {
    const id = req.params.edgeId;

    // Delete the edge
    const result = await Edge.deleteOne({ id: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Edge deleted successfully" });
    } else {
      res.status(404).json({ error: "Edge not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

