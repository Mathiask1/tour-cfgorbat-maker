//node.js
import React from 'react';
import '../styles/App.css';

const Node = ({ data, onClick, selectedNode, handleDrag, setDraggedNode, setDroppedNode, getNodeData }) => {

  const handleClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent clicking on a subordinate from also triggering its parent's click
    if (e.target.classList.contains("nodeDiv")) {
      // Only trigger onClick if the click target is the nodeDiv
      onClick(data); // Pass the clicked node data to the parent component
    }
  };


  const handleDragStart = (e) => {
    setDraggedNode(data);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Enter", e.target.id);
    setDroppedNode(getNodeData(data.cfgName));
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log("Leave", e.target.id);

      setDroppedNode(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag(); // Ensure handleDrag is called correctly
  };

  return (
    <div>
      {data ? (
        <div>
          <div className='nodeDiv'
            style={{ fontWeight: data && selectedNode && selectedNode.cfgName === data.cfgName ? 'bold' : 'normal' }}
            id={data.cfgName}
            draggable
            onDragStart={handleDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={handleDrop}
            onDragLeave={onDragLeave}
            onClick={handleClick}>
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
