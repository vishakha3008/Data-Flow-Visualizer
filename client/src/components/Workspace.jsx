import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import PopUp from "./PopUp";
import { getNodes, createNode, deleteNode, getEdges, createEdge, deleteEdge, saveNodesAndEdges } from './axios'; 
import "./index.css";
import EdgePopUp from './EdgePopUp';
const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;





const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [popups, setPopups] = useState({});
  const [clickedNodeData, setClickedNodeData] = useState(null);
  const [clickedEdgeData, setClickedEdgeData] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  

  const fetchNodes = async () => {
    try {
      const response = await getNodes();
      console.log('Fetched nodes:', response.data.nodes);
      setNodes(response.data.nodes);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchEdges = async () => {
    try {
      const response = await getEdges();
      console.log('Fetched edges:', response.data.edges);
      setEdges(response.data.edges);
    } catch (error) {
      console.error('Error fetching edges:', error);
    }
  };

  useEffect(() => {
    fetchEdges(); // Fetch edges 
  }, []);

  const onConnect = useCallback((params) => {
    if (!edges.find((edge) => edge.source === params.source && edge.target === params.target)) {
      setEdges((eds) => addEdge(params, eds));
      const newEdge = {
        id: `${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
      };

      setEdges((prevEdges) => [...prevEdges, newEdge]);
      setSelectedEdgeId(`${params.source}-${params.target}`);
    }
  }, [edges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let bgColor;
      if (type === "input") {
        bgColor = "#5fe62a";
      } else if (type === "middle") {
        bgColor = "#f2bb05";
      } else if (type === "output") {
        bgColor = "#74d3ae";
      } 
      else if (type === "default1") {
        bgColor = "#f787bb";
      }
      else {
        bgColor = "orange"; // Default color 
      }
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: type === "input" ? `Source` : type === "middle" ? `Middleware` : type === "output" ? `Destination` : "Default App" },
        _type: "node",
        style: {
          background: bgColor,
          border: "1px solid black",
          borderRadius: 4,
          fontSize: 12,
          height: "40px",
          width: "100px",
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeDoubleClick = (event, element) => {
    if (element && element.id) {
      const clickedNodeId = element.id;
      console.log("Node clicked:", clickedNodeId);
     
      if (!popups[clickedNodeId]) {
        
        const newPopup = (
          <PopUp
            key={clickedNodeId}
            nodeData={element}
            onClose={() => setPopups((prevPopups) => ({ ...prevPopups, [clickedNodeId]: null }))}
          />
        );
        console.log("PopUp ID:", clickedNodeId);
        setPopups((prevPopups) => ({ ...prevPopups, [clickedNodeId]: newPopup }));
      }
     
      setClickedNodeData(element);
  
    }
  };
  const onNodeClick = (event, element) => {
    if (element && element.id) {
      setSelectedNodeId(element.id);
    }
  };
  
  const clearSelection = () => {
    setSelectedNodeId(null);
  };

  
const onDeleteEdge = async (edgeId) => {
  try {
    await deleteEdge(edgeId);
  } catch (error) {
    console.error('Error deleting edge:', error);
  }
};

const onDeleteNode = () => {
  if (selectedNodeId) {
   
    const fetchEdgesForNode = async () => {
      try {
        const response = await getEdges();  
        const edgesForNode = response.data.edges.filter(
          (edge) => edge.source === selectedNodeId || edge.target === selectedNodeId
        );
        return edgesForNode;
      } catch (error) {
        console.error('Error fetching edges:', error);
        return [];
      }
    };

   
    fetchEdgesForNode()
      .then((edgesForNode) => {
        
        deleteNode(selectedNodeId)
          .then((response) => {
            if (response.data.message === 'Deleted Successfully') {
             
              const updatedNodes = nodes.filter((node) => node.id !== selectedNodeId);
              setNodes(updatedNodes);

              
              const deleteEdgesPromises = edgesForNode.map((edge) => deleteEdge(edge.id));

             
              Promise.all(deleteEdgesPromises)
                .then(() => {
                  
                  const updatedEdges = edges.filter(
                    (edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId
                  );
                  setEdges(updatedEdges);

                  
                  setClickedNodeData(null);

                 
                  setPopups((prevPopups) => {
                    const { [selectedNodeId]: removedPopup, ...restPopups } = prevPopups;
                    return restPopups;
                  });

                  setSelectedNodeId(null);

                  console.log('Node deleted successfully:', response.data.message);
                  console.log('Edges connected to the node deleted successfully');
                })
                .catch((deleteEdgesError) => {
                  console.error('Error deleting edges connected to the node:', deleteEdgesError);
                });
            } else {
              console.error('Error deleting node:', response.data.message);
            }
          })
          .catch((deleteNodeError) => {
            
            console.error('Error deleting node:', deleteNodeError);
          });
      })
      .catch((fetchEdgesError) => {
       
        console.error('Error fetching edges:', fetchEdgesError);
      });
  }
};

  
  
 
  const onSaveNode = () => {

    const filteredEdges = edges.filter((edge) => !edge.id.startsWith('reactflow__edge'));
    const dataToSave = {
      nodes,
      edges: filteredEdges,
    };
  
   
    console.log('Data to Save:', dataToSave);
  
    
    saveNodesAndEdges(dataToSave)
      .then((response) => {
        console.log('Nodes and edges saved successfully:', response.data);
        
      })
      .catch((error) => {
        console.error('Error saving nodes and edges:', error);
       
      });
  };

//label change
  const onChangeLabelClick = () => {
    if (selectedNodeId) {
      const newLabelInput = prompt("Enter new label:", nodes.find(node => node.id === selectedNodeId)?.data.label);
      
      if (newLabelInput !== null) {
       
        const updatedNodes = nodes.map((node) =>
          node.id === selectedNodeId
            ? { ...node, data: { ...node.data, label: newLabelInput } }
            : node
        );
  
        setNodes(updatedNodes);
      }
    }
  };

  const onEdgeDoubleClick = (event, element) => {
    console.log('Edge Double Clicked:', element);
    setClickedEdgeData(element);
  };


  return (
    <div
      className="dndflow"
      style={{ width: "100vw", height: "100vh", border: "1px solid black" }}
    >
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodeDoubleClick={(event, element) => onNodeDoubleClick(event, element)}
  onEdgeDoubleClick={(event, element) => onEdgeDoubleClick(event, element)}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  onNodeClick={(event, element) => {
    onNodeClick(event, element);
  }}
  onInit={setReactFlowInstance}
  onDrop={onDrop}
  onDragOver={onDragOver}
  fitView
>
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={4} size={1} color=" #d6d4d0" />
          </ReactFlow>
        </div>
        <Sidebar
  onDeleteNode={onDeleteNode}
  onSaveNode={onSaveNode}
  onDeleteEdge={onDeleteEdge}  
  clearSelection={clearSelection}
  selectedNodeId={selectedNodeId}
  onChangeLabelClick={onChangeLabelClick}
/>
{clickedNodeData && popups[clickedNodeData.id]}
{clickedEdgeData && (
  <EdgePopUp
    edgeData={clickedEdgeData}
    onClose={() => setClickedEdgeData(null)}
  />
)}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;

