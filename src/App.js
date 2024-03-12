//app.js
import data from './Data.json';
import React, { useState, useEffect } from 'react';
import OrgChart from './components/OrgChart';
import Sidebar from './components/Sidebar';
import './styles/App.css';
import Converter from './components/Converter';

const App = () => {
  const [orgData, setOrgData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [allNodeIds, setAllNodeIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedOrgData = sessionStorage.getItem('orgData');
        const data = storedOrgData ? JSON.parse(storedOrgData) : await fetchOrgData();
        saveToSessionStorage(data);
        setOrgData(data);

      } catch (error) {
        console.error('Error fetching orgData:', error);
      }
    };

    fetchData();
  }, []);

  const fetchOrgData = async () => {
    return data;
  };


  const extractAllNodeIds = (node) => {
    const ids = [node.cfgName];
    if (node.subordinates) {
      node.subordinates.forEach((subordinate) => {
        ids.push(...extractAllNodeIds(subordinate));
      });
    }
    return ids;
  };

  const handleDrag = async ({ draggedNode, droppedNode }) => {
    if (orgData) {
      const updatedData = await moveNode({draggedNode, droppedNode});

    } else {
      console.log("undefinedddd");
    };

    /*     saveToSessionStorage(updatedData);
    */    //console.log(updatedData);
  };

  const moveNode = async ({ draggedNode, droppedNode }) => {
    let updatedData = await deleteNodeDataUtil(draggedNode.cfgName, orgData);
    console.log("draggedNode", draggedNode, "droppedNode", droppedNode);
    if (!droppedNode) {
      updatedData = ([...updatedData, draggedNode]);
    } else {
      updatedData = await addNodeToSelectedNode(droppedNode, draggedNode, data=updatedData);
    }

    setOrgData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const updateNodeData = (editedNodeData) => {
    const updatedOrgData = updateNodeInData(orgData, editedNodeData, selectedNode);
    setOrgData(updatedOrgData);
    saveToSessionStorage(updatedOrgData);
  };

  const updateNodeInData = (data, editedNodeData, selectedNode) => {
    return data.map(node => {
      if (node.cfgName === selectedNode.cfgName) {
        setSelectedNode(editedNodeData);
        return editedNodeData;
      } else if (node.subordinates && node.subordinates.length > 0) {
        return {
          ...node,
          subordinates: updateNodeInData(node.subordinates, editedNodeData, selectedNode)
        };
      }
      return node;
    });
  };

  const deleteNodeData = (cfgName) => {
    const updatedData = deleteNodeDataUtil(cfgName, orgData);
    if (selectedNode && selectedNode.cfgName === cfgName) {
      setSelectedNode(null);
    }
    setOrgData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const deleteNodeDataUtil = (cfgName, data) => {
    return data.reduce((acc, unit) => {
      if (unit.cfgName === cfgName) {
        return acc;
      }
      const subordinates = unit.subordinates ? deleteNodeDataUtil(cfgName, unit.subordinates) : [];
      return [...acc, { ...unit, subordinates }];
    }, []);
  };

  const addNode = (newNodeData) => {
    const uniqueNodeIds = Array.from(new Set(orgData.flatMap((node) => extractAllNodeIds(node))));
    setAllNodeIds(uniqueNodeIds);

    setAllNodeIds(prevNodeIds => {
      if (prevNodeIds.includes(newNodeData.cfgName)) {
        return prevNodeIds;
      } else {
        newNodeData.subordinates = [];
        if (orgData.length === 0) {
          setOrgData([newNodeData]);
          saveToSessionStorage([newNodeData]);
        } else if (!selectedNode) {
          setOrgData([...orgData, newNodeData]);
          saveToSessionStorage([...orgData, newNodeData]);
        } else {
          const updatedData = addNodeToSelectedNode(selectedNode, newNodeData);
          setOrgData(updatedData);
          saveToSessionStorage(updatedData);
        }
        return [...prevNodeIds, newNodeData.cfgName];
      }
    });
  };

  const getNodeData = (cfgName, nodes = orgData) => {
    let returnNode;
    nodes.forEach(node => {
      //console.log("node", node.cfgName, "cfg", cfgName);

      if (returnNode) {
        return; // If the node has already been found, exit the loop
      }

      if (cfgName === node.cfgName) {
        returnNode = node;
      } else if (node.subordinates && node.subordinates.length > 0) {
        // If the node has subordinates, recursively search within them
        returnNode = getNodeData(cfgName, node.subordinates);
      }
    });

    return returnNode;
  };


  const addNodeToSelectedNode = (selectedNode, newNodeData, data = orgData) => {
    return data.map(node => {
      if (node.cfgName === selectedNode.cfgName) {
        console.log("Selected");
        const updatedNode = {
          ...node,
          subordinates: node.subordinates ? [...node.subordinates, newNodeData] : [newNodeData]
        };
        return updatedNode;
      } else if (node.subordinates && node.subordinates.length > 0) {
        return {
          ...node,
          subordinates: addNodeToSelectedNode(selectedNode, newNodeData, node.subordinates)
        };
      }
      return node;
    });
  };


  const saveToSessionStorage = (updatedOrgData) => {
    sessionStorage.setItem('orgData', JSON.stringify(updatedOrgData));
  };

  return (
    <div className='app'>
      <div className="top-row">
        <div className="sidebar">
          <Sidebar selectedNode={selectedNode}
            onNodeUpdate={updateNodeData}
            saveToSessionStorage={saveToSessionStorage}
            onNodeDelete={deleteNodeData}
            onNodeAdd={addNode} />
        </div>
        <div className="org-chart">
          <OrgChart data={orgData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
            handleDrag={handleDrag}
            getNodeData={getNodeData} />
        </div>
      </div>
      <Converter data={orgData}
        setOrgData={setOrgData}
        fetchOrgData={fetchOrgData}
        saveToSessionStorage={saveToSessionStorage} />
    </div>
  );


};

export default App;
