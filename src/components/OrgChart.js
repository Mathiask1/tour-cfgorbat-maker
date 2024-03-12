//Orgchart.js
import React, { useRef, useEffect, useState } from 'react';
import Node from './Node';
import '../styles/App.css';

const OrgChart = ({ data, setSelectedNode, selectedNode, handleDrag, getNodeData }) => {
    const [draggedNode, setDraggedNode] = useState(null);
    const [droppedNode, setDroppedNode] = useState(null);
    const orgChartRef = useRef(null);

    const handleDragUtil = () => {
        if (!droppedNode) {
            console.log("undefined droppedNode");
            handleDrag({ draggedNode: draggedNode, droppedNode: droppedNode });
        } else {
            if (!(draggedNode.cfgName === droppedNode.cfgName)) {
                handleDrag({ draggedNode: draggedNode, droppedNode: droppedNode });
            };
        }
    };

    useEffect(() => {
        const handleClickInside = (event) => {
            console.log(event.target.classList);
            if (!event.target.classList.contains('nodeDiv') && (event.target.classList.contains("org-chart") || event.target.classList.contains("nodeWrapper"))) {
                setSelectedNode(null);
            }
        };

        document.addEventListener('mousedown', handleClickInside);

        return () => {
            document.removeEventListener('mousedown', handleClickInside);
        };
    }, [setSelectedNode]);

    return (
        <div ref={orgChartRef}>
            <h2>Order of Battle</h2>
            {data.map((nodeData) => (
                <Node key={nodeData.cfgName}
                    data={nodeData}
                    onClick={setSelectedNode}
                    selectedNode={selectedNode}
                    handleDrag={handleDragUtil}
                    setDraggedNode={setDraggedNode}
                    setDroppedNode={setDroppedNode}
                    getNodeData={getNodeData} />
            ))}
        </div>
    );
};

export default OrgChart;
