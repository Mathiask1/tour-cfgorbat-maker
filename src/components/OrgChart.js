//Orgchart.js
import React, { useRef, useEffect, useState } from 'react';
import Node from './Node';
import '../styles/App.css';

const OrgChart = ({ data, setSelectedNode, selectedNode, handleDrag, getNodeData }) => {
    const [draggedNode, setDraggedNode] = useState(null);

    const orgChartRef = useRef(null);

    const handleDragUtil = (droppedNode) => {
        if (!droppedNode) {
            handleDrag({ draggedNode: draggedNode, droppedNode: null });
        } else {
            if (!(draggedNode.cfgName === droppedNode.cfgName)) {
                handleDrag({ draggedNode: draggedNode, droppedNode: droppedNode });
            };
        }
    };

    useEffect(() => {
        const handleClickInside = (event) => {
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
        <div ref={orgChartRef} >
            <h2>Order of Battle</h2>
            {data.map((nodeData) => (
                <Node key={nodeData.cfgName}
                    data={nodeData}
                    onClick={setSelectedNode}
                    selectedNode={selectedNode}
                    handleDrag={handleDragUtil}
                    setDraggedNode={setDraggedNode}
                    getNodeData={getNodeData} />
            ))}
        </div>
    );
};

export default OrgChart;
