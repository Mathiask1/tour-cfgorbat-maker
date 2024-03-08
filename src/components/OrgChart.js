//Orgchart.js
import React, { useRef, useEffect } from 'react';
import Node from './Node';
import '../styles/App.css';

const OrgChart = ({ data, setSelectedNode, selectedNode, handleDragData }) => {
    const orgChartRef = useRef(null);

    useEffect(() => {
        const handleClickInside = (event) => {
            console.log(event.target.classList);
            if (!event.target.classList.contains('nodeDiv') && (event.target.classList.contains("org-chart") || event.target.classList.contains("nodeWrapper"))) {
                // Click is not on a node, deselect the selected node
                setSelectedNode(null); // Deselect the selected node
            }
        };

        // Attach event listener to handle clicks inside the OrgChart area
        document.addEventListener('mousedown', handleClickInside);

        return () => {
            // Cleanup: remove event listener when component unmounts
            document.removeEventListener('mousedown', handleClickInside);
        };
    }, [setSelectedNode]);

    return (

        <div ref={orgChartRef}>
            <h2>Order of Battle</h2>
            {data.map((nodeData) => (
                <Node key={nodeData.cfgName} data={nodeData} onClick={setSelectedNode} selectedNode={selectedNode} handleDragData={handleDragData} />
            ))}
        </div>
    );
};

export default OrgChart;
