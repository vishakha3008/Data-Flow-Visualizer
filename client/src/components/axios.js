import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/flows';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getNodes = () => api.get('/node');
export const createNode = (nodeData) => api.post('/node', nodeData);
export const deleteNode = (nodeId) => api.delete(`/node/${nodeId}`);

export const getEdges = () => api.get('/edge');
export const createEdge = (edgeData) => api.post('/edge', edgeData);

export const deleteEdge = async (edgeId) => {
  try {
    
    const response = await api.delete(`/edge/${edgeId}`);
    console.log(`Edge with ID ${edgeId} deleted successfully`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting edge with ID ${edgeId}:`, error);
    throw error;
  }
};

// Function to save both nodes and edges
export const saveNodesAndEdges = (dataToSave) => {
  return api.post('/nodes-edges', dataToSave);
};



export default {
  getNodes,
  createNode,
  deleteNode,
  getEdges,
  createEdge,
  deleteEdge,
  saveNodesAndEdges,
};