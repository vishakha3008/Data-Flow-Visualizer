

const express=require('express');
const router= express.Router();


// const isLoggedIn = require('../middleware/isLoggedIn');
// const hasPermission = require('../middleware/hasPermission');

const NodeController =require('../controllers/nodes');
const EdgeController =require('../controllers/edges');
const NodesEdgesController = require('../controllers/nodes_edges');
const FormDataModel=require('../models/metadata');
const EdgeFormDataModel=require('../models/edgedata');


router.get('/node', NodeController.nodes_get_all);      // Get all nodes
router.get('/edge',EdgeController.edges_get_all);
router.get('/nodes-edges', NodesEdgesController.nodes_edges_get_all);

router.get("/node/:id", NodeController.nodes_get_one);  // Gets a specific Node by id
router.get("/edge/:id",EdgeController.edges_get_one);


router.post('/node', NodeController.nodes_post);  //Create a node
router.post('/edge',EdgeController.edges_post);
router.post('/nodes-edges',  NodesEdgesController.createNodesAndEdges);

router.post('/saveMeta', async (req, res) => {
  const { nodeId, formFields } = req.body;

  console.log('Received data from node with ID:', nodeId);
  console.log('Form fields:', formFields);

  // Save formFields data to the database
  const formData = new FormDataModel({ nodeId, formFields });

  try {
    const savedFormData = await formData.save();
    console.log('Form data saved to the database:', savedFormData);
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving form data to the database:', error);
    res.status(500).json({ error: 'Failed to save data to the database' });
  }
});

router.get('/getMeta/:nodeId', async (req, res) => {
  const nodeId = req.params.nodeId;

  try {
    // Find the corresponding data in the database based on the nodeId
    const formData = await FormDataModel.findOne({ nodeId });

    if (!formData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Return the data
    res.json(formData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
});


router.delete('/deleteMeta/:nodeId/:fieldId', async (req, res) => {
  const nodeId = req.params.nodeId;
  const fieldId = req.params.fieldId;

  try {
    // Find the corresponding data in the database based on the nodeId
    const formData = await FormDataModel.findOne({ nodeId });

    if (!formData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Remove the specified field from the formFields array
    formData.formFields = formData.formFields.filter((field) => field.id !== parseInt(fieldId));

    // Save the updated data
    await formData.save();

    // Return success message
    res.json({ message: 'Field deleted successfully' });
  } catch (error) {
    console.error('Error deleting field:', error);
    res.status(500).json({ error: 'Failed to delete field' });
  }
});

router.patch('/patchMeta/:nodeId', async (req, res) => {
  const nodeId = req.params.nodeId;
  const { formFields } = req.body;

  try {
    // Find the corresponding data in the database based on the nodeId
    const formData = await FormDataModel.findOne({ nodeId });

    if (!formData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Update the formFields array with the new data
    formData.formFields = formFields;

    // Save the updated data
    await formData.save();

    // Return success message
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data' });
  }
});

router.post('/saveEdgeMeta', async (req, res) => {
  const { edgeId, formFields } = req.body;

  console.log('Received data from edge with ID:', edgeId);
  console.log('Form fields:', formFields);

  // Save formFields data to the database
  const formData = new EdgeFormDataModel({ edgeId, formFields });

  try {
    const savedFormData = await formData.save();
    console.log('Form data saved to the database:', savedFormData);
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving form data to the database:', error);
    res.status(500).json({ error: 'Failed to save data to the database' });
  }
});

router.get('/getEdgeMeta/:edgeId', async (req, res) => {
  const edgeId = req.params.edgeId;

  try {
    // Assuming edgeId is a string in the format "65ac914d2383545cc9021775"
    const edgeFormData = await EdgeFormDataModel.findOne({ edgeId });

    if (!edgeFormData) {
      return res.status(404).json({ error: 'Edge metadata not found' });
    }

    res.json(edgeFormData);
  } catch (error) {
    console.error('Error fetching edge metadata:', error);
    res.status(500).json({ error: 'Failed to fetch edge metadata from the database' });
  }
});

router.delete('/node/:nodeId', NodeController.nodes_delete);  //Delete a node
router.delete('/edge/:edgeId',EdgeController.edges_delete);

//router.put('/node',NodeController.nodes_put)

module.exports=router;