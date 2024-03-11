//node.js
import React from 'react';
import '../styles/App.css';

const Node = ({ data, onClick, selectedNode, handleDrag, setDraggedNode, setDroppedNode, getNodeData }) => {

  const handleClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent clicking on a subordinate from also triggering its parent's click
    if (e.target.classList.contains("nodeWrapper")) { } else {
      onClick(data); // Pass the clicked node data to the parent component
    }
  };

  const handleDragStart = (e) => {
    setDraggedNode(data);
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDroppedNode(getNodeData(data.cfgName));
  };


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag(); // Ensure handleDrag is called correctly

  };

  return (
    <div>
      {data ? (
        <div className="nodeWrapper" onClick={handleClick}
          style={{ fontWeight: data && selectedNode && selectedNode.cfgName === data.cfgName ? 'bold' : 'normal' }}>
          <div className='nodeDiv'
            id={data.cfgName}
            draggable
            onDragStart={handleDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={handleDrop}>
            {data.cfgName + ': ' + data.text}
          </div>
          {data.subordinates && data.subordinates.length > 0 && (
            <div style={{ marginLeft: 20 }}>
              {data.subordinates.map((subordinate, index) => (
                <Node key={index} data={subordinate}
                  onClick={onClick}
                  selectedNode={selectedNode}
                  handleDrag={handleDrag}
                  setDraggedNode={setDraggedNode}
                  setDroppedNode={setDroppedNode}
                  getNodeData={getNodeData} /> // Pass selectedNode recursively
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Node;
