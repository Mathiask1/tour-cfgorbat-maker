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

  const handleDrag = ({draggedNodeData, targetNode}) => {
    console.log(targetNode);
    const updatedData = addNodeToSelectedNode(selectedNode, draggedNodeData, orgData);
/*    setOrgData(updatedData);
    saveToSessionStorage(updatedData);
*/    console.log(updatedData);
  }

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

  const deleteNodeData = (idToDelete) => {
    const updatedData = deleteNodeDataUtil(idToDelete, orgData);
    if (selectedNode && selectedNode.cfgName === idToDelete) {
      setSelectedNode(null);
    }
    setOrgData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const deleteNodeDataUtil = (idToDelete, data) => {
    return data.reduce((acc, unit) => {
      if (unit.cfgName === idToDelete) {
        return acc;
      }
      const subordinates = unit.subordinates ? deleteNodeDataUtil(idToDelete, unit.subordinates) : [];
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
          const updatedData = addNodeToSelectedNode(selectedNode, newNodeData, orgData);
          setOrgData(updatedData);
          saveToSessionStorage(updatedData);
        }
        return [...prevNodeIds, newNodeData.cfgName];
      }
    });
  };

  const addNodeToSelectedNode = (selectedNode, newNodeData, data) => {
    return data.map(node => {
      if (node.cfgName === selectedNode.cfgName) {
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
          <OrgChart data={orgData} setSelectedNode={setSelectedNode} selectedNode={selectedNode} handleDragData={handleDrag}/>
        </div>
      </div>
      <Converter data={orgData} setOrgData={setOrgData} fetchOrgData={fetchOrgData} saveToSessionStorage={saveToSessionStorage} />
    </div>
  );


};

export default App;
