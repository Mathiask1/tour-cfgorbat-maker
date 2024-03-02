//node.js
import React from 'react';
import '../styles/App.css';

const Node = ({ data, onClick, selectedNode }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent clicking on a subordinate from also triggering its parent's click
    if (e.target.classList.contains("nodeWrapper")) { } else {
      onClick(data); // Pass the clicked node data to the parent component
    }
  };

  return (
    <div className="nodeWrapper" onClick={handleClick} style={{ fontWeight: selectedNode && selectedNode.cfgName === data.cfgName ? 'bold' : 'normal' }}>
      <div className='nodeDiv'>
        {data.cfgName + ': ' + data.text}
      </div>
      {data.subordinates && data.subordinates.length > 0 && (
        <div style={{ marginLeft: 20 }}>
          {data.subordinates.map((subordinate, index) => (
            <Node key={index} data={subordinate} onClick={onClick} selectedNode={selectedNode} /> // Pass selectedNode recursively
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
