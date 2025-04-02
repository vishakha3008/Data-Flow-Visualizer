const mongoose = require('mongoose');
const Node = require('../models/nodes');
const Edge = require('../models/edge');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

exports.nodes_edges_get_all = function (req, res, next) {
  const getNodePromise = Node.find()
    .select('_type  id type data position style')
    .exec();

  const getEdgePromise = Edge.find()
    .select('_type  id source target')
    .exec();

  Promise.all([getNodePromise, getEdgePromise])
    .then(([nodes, edges]) => {
      const response = {
        nodes: nodes.map(node => ({
          _type: node._type,
          
          id: node.id,
          type: node.type,
          data: node.data,
          position: node.position,
          style: node.style,
        })),
        edges: edges.map(edge => ({
          _type: edge._type,
          _id: edge._id,
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.createNodesAndEdges = async function (req, res, next) {
  console.log('Entering createNodesAndEdges function');

  try {
    const { nodes, edges } = req.body;

    if (!nodes || !edges) {
      return res.status(400).json({ message: 'Invalid data format. Expecting nodes and edges.' });
    }

    console.log('Received Nodes:', nodes);
    console.log('Received Edges:', edges);

    const createdItems = [];

    // Process edges
    for (const edge of edges) {
      if (edge.source && edge.target) {
        const edgeData = {
          _type: 'edge',
          _id: edge._id,
          id: edge.id,
          source: edge.source,
          target: edge.target
        };

        const edgeDocument = new Edge(edgeData);

        const createdEdge = await edgeDocument.save();
        createdItems.push({ type: 'edge', createdEdge });
      } else {
        console.error(`Invalid edge data: ${JSON.stringify(edge)}`);
      }
    }

    // Process nodes
    for (const item of nodes) {
      if (item._type === 'node') {
        const node = new Node({
          _type: item._type,
          id: item.id,
          type: item.type,
          data: item.data,
          position: item.position,
          style: item.style,
        });

        const createdNode = await node.save();
        createdItems.push({ type: 'node', createdNode });
      } else {
        console.error(`Unknown item type: ${item._type}`);
      }
    }

    res.status(201).json({
      message: 'Items successfully added to the database',
      createdItems,
    });
  } catch (error) {
    console.error('Error in createNodesAndEdges:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
