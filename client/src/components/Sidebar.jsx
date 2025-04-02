// Sidebar.jsx

import React from 'react';
const Sidebar = (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const onDeleteNodeClick = () => {
    props.onDeleteNode();
    props.clearSelection(); // Clear selected node after deletion
  };

  const onSaveNodeClick = () => {
    props.onSaveNode();
    props.clearSelection(); // Clear selected node after saving
  };
  return (
    <aside>
      <div id="input" className={`dndnode ${props.selectedNodeId === 'input' ? 'selected' : ''}`} onDragStart={(event) => onDragStart(event, 'input')} draggable="true">
        Source
      </div>
      <div id="default" className="dndnode" onDragStart={(event) => onDragStart(event, 'middle')} draggable="true">
        Middleware
      </div>
      <div id="output" className="dndnode" onDragStart={(event) => onDragStart(event, 'output')} draggable="true">
        Destination
      </div>
      <div id="default1" className="dndnode" onDragStart={(event) => onDragStart(event, 'default1')} draggable="true">
        Default App 
      </div>
        <button type="button" className='delete' onClick={onDeleteNodeClick}>
          Delete Node
        </button>
        <button type="button" className='save' onClick={onSaveNodeClick}>
          Save the Flow
        </button>
        <button type="button" className='change_label' onClick={props.onChangeLabelClick}>
          Change Label
        </button>
    </aside>
  );
};
export default Sidebar;