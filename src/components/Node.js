//node.js
import React from 'react';
import '../styles/App.css';

const Node = ({ data, onClick, selectedNode, handleDrag, setDraggedNode, setDroppedNode, getNodeData }) => {

  const handleClick = (e) => {
    e.stopPropagation(); 
    if (e.target.classList.contains("nodeDiv")) {
      onClick(data);
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

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDroppedNode(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDrag();
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
                  getNodeData={getNodeData} />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Node;
