import React from 'react';
import '../styles/App.css';

const Node = ({ data, onClick, selectedNode, handleDrag, setDroppedNode, setDraggedNode,  getNodeData }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("nodeDiv")) {
      onClick(data);
    }
  };

  const handleDragStart = (e) => {
    setDraggedNode(data);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnd = (e) => {
    if (!e.dataTransfer.dropEffect || e.dataTransfer.dropEffect === 'none') {
      handleDrag();
    }
  }

  const onDrop = (e) => {
    e.preventDefault();
    handleDrag(getNodeData(e.target.id));
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
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
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
