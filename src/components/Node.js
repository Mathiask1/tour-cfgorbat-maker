//node.js
import React from 'react';
import '../styles/App.css';

const Node = ({ data, onClick, selectedNode, handleDragData }) => {
    const handleClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent clicking on a subordinate from also triggering its parent's click
    if (e.target.classList.contains("nodeWrapper")) { } else {
      onClick(data); // Pass the clicked node data to the parent component
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
    //onNodeDragStart(data);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onClick(data);
    console.log(selectedNode);
    //console.log(e.target.id, data);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedNodeData = JSON.parse(e.dataTransfer.getData('text/plain'));
    console.log("Dragged: ", draggedNodeData);

    handleDragData(draggedNodeData, data); // Ensure handleDrag is called correctly
        //console.log("DragDropped: ", draggedNodeData);
    //onNodeDrop(draggedNodeData, data);
  };

  return (
    <div className="nodeWrapper" onClick={handleClick} 
    style={{ fontWeight: selectedNode && selectedNode.cfgName === data.cfgName ? 'bold' : 'normal' }}>
      <div className='nodeDiv'
          id={data.cfgName}
          draggable
          onDragStart={handleDragStart}
          onDragEnter={handleDragOver}
          onDragEnd={handleDrop}>
        {data.cfgName + ': ' + data.text}
      </div>
      {data.subordinates && data.subordinates.length > 0 && (
        <div style={{ marginLeft: 20 }}>
          {data.subordinates.map((subordinate, index) => (
            <Node key={index} data={subordinate} onClick={onClick} selectedNode={selectedNode}   handleDragData={handleDragData} /> // Pass selectedNode recursively
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
