import '../styles/sidebar.css';
import '../styles/TagsInput.css';

import React, { useState, useEffect } from 'react';

const Sidebar = ({ selectedNode, onNodeUpdate, onNodeDelete, onNodeAdd }) => {
    const defaultAttributes = () => {
        return {
            cfgName: '',
            id: "",
            idType: "",
            side: "",
            size: "",
            type: "",
            commander: "",
            commanderRank: "",
            text: "",
            textShort: "",
            description: "",
            insignia: "",
            color: "",
            colorInsignia: [],
            tags: [],
            subordinates: []
        };
    }

    const [formData, setFormData] = useState(defaultAttributes());
    const [tags, setTags] = useState([]);

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        console.log(tags);
        e.target.value = ''
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    useEffect(() => {
        if (selectedNode) {
            const updatedFormData = { ...defaultAttributes(), ...selectedNode };
            setTags(updatedFormData.tags);
            setFormData(updatedFormData);
        } else {
            setTags([]);
            setFormData(defaultAttributes());
        }
    }, [selectedNode]);



    const generateCfgName = (id, textShort) => {
        let str = `${id}_${textShort.replace(/\s+/g, '_')}`;
        return str.replace(/\./g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name.toLowerCase() === 'commanderrank') {
            parsedValue = value.toLowerCase();
        } else if (name.toLowerCase() === 'colorinsignia') {
            parsedValue = value.trim().split(/[,\s]+/) // Trim input value before splitting
                .map(str => parseInt(str.trim(), 10))
                .filter(num => !isNaN(num));
        } else if (name.toLowerCase() === 'tags') {
            parsedValue = tags;
            console.log(parsedValue);
        } else if (name.toLowerCase() === 'id' || name.toLowerCase() === 'idtype') {
            parsedValue = parseInt(value);
            console.log(parsedValue);
        }

        const updatedFormData = { ...formData, [name]: parsedValue };

        if (name === 'textShort') {
            const cfgName = generateCfgName(updatedFormData.id, value);
            updatedFormData.cfgName = cfgName;
        }

        setFormData(updatedFormData);
        updateCfgNameRecursively(updatedFormData);
    };


    const updateCfgNameRecursively = (node) => {
        const cfgName = generateCfgName(node.id, node.textShort);
        node.cfgName = cfgName;

        if (node.subordinates && node.subordinates.length > 0) {
            node.subordinates.forEach((subordinate) => {
                updateCfgNameRecursively(subordinate);
            });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const action = e.target.name;
        formData.tags = tags;
        if (action === 'updateButton' && selectedNode) {
            onNodeUpdate(formData);
        } else if (action === 'deleteButton' && selectedNode) {
            onNodeDelete(formData.cfgName);
        } else if (action === 'addButton') {
            if (!formData.cfgName === "") {
                onNodeAdd(formData);
            }
        } else {
            // Handle other actions
        }
    };

    return (
        <div>
            <form>
                <div className="label-input">
                    <label htmlFor="cfgName">cfgName:</label>
                    <input className="input-sidebar" type="text" id="cfgName" name="cfgName" value={formData.cfgName} onChange={handleChange} readOnly />
                </div>
                <div className="label-input">
                    <label htmlFor="id">ID:</label>
                    <input className="input-sidebar" type="number" id="id" name="id" value={formData.id} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="idType">ID Type:</label>
                    <select id="idType" name="idType" value={formData.idType} onChange={handleChange}>
                        <option value="0">Ordinal number (e.g., "7th")</option>
                        <option value="1">Roman numeral (e.g., "VII")</option>
                        <option value="2">NATO phonetical alphabet</option>
                        <option value="3">Color (e.g., "Red")</option>
                    </select>
                </div>
                <div className="label-input">
                    <label htmlFor="side">Side:</label>
                    <select id="side" name="side" value={formData.side} onChange={handleChange}>
                        <option value="">Select Side</option>
                        <option value="West">West</option>
                        <option value="East">East</option>
                        <option value="Independent">Independent</option>
                        <option value="Civilian">Civilian</option>
                    </select>
                </div>
                <div className="label-input">
                    <label htmlFor="size">Size:</label>
                    <select id="size" name="size" value={formData.size} onChange={handleChange}>
                        <option value="">Select Size</option>
                        <option value="Army">Army</option>
                        <option value="ArmyGroup">ArmyGroup</option>
                        <option value="Battalion">Battalion</option>
                        <option value="BCT">BCT</option>
                        <option value="Brigade">Brigade</option>
                        <option value="Company">Company</option>
                        <option value="Corps">Corps</option>
                        <option value="Division">Division</option>
                        <option value="FireTeam">FireTeam</option>
                        <option value="HBCT">HBCT</option>
                        <option value="IBCT">IBCT</option>
                        <option value="Platoon">Platoon</option>
                        <option value="Regiment">Regiment</option>
                        <option value="Section">Section</option>
                        <option value="Squad">Squad</option>
                        <option value="Squadron">Squadron</option>
                        <option value="Troop">Troop</option>
                    </select>
                </div>
                <div className="label-input">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="Airborne">Airborne</option>
                        <option value="Armored">Armored</option>
                        <option value="Artillery">Artillery</option>
                        <option value="Assault">Assault</option>
                        <option value="AttackRecon">AttackRecon</option>
                        <option value="AviationSupport">AviationSupport</option>
                        <option value="Cavalry">Cavalry</option>
                        <option value="CombatAviation">CombatAviation</option>
                        <option value="Fighter">Fighter</option>
                        <option value="GeneralSupport">GeneralSupport</option>
                        <option value="Helicopter">Helicopter</option>
                        <option value="HQ">HQ</option>
                        <option value="Infantry">Infantry</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Maritime">Maritime</option>
                        <option value="MechanizedInfantry">MechanizedInfantry</option>
                        <option value="Medical">Medical</option>
                        <option value="Mortar">Mortar</option>
                        <option value="MotorizedInfantry">MotorizedInfantry</option>
                        <option value="Recon">Recon</option>
                        <option value="Service">Service</option>
                        <option value="Support">Support</option>
                        <option value="UAV">UAV</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="label-input">
                    <label htmlFor="commander">Commander:</label>
                    <input className="input-sidebar" type="text" id="commander" name="commander" value={formData.commander} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="commanderRank">Commander Rank:</label>
                    <select id="commanderRank" name="commanderRank" value={formData.commanderRank} onChange={handleChange}>
                        <option value="">Select Rank</option>
                        <option value="private">Private</option>
                        <option value="corporal">Corporal</option>
                        <option value="sergeant">Sergeant</option>
                        <option value="lieutenant">Lieutenant</option>
                        <option value="captain">Captain</option>
                        <option value="major">Major</option>
                        <option value="colonel">Colonel</option>
                        <option value="general">General</option>
                    </select>

                </div>
                <div className="label-input">
                    <label htmlFor="text">Text:</label>
                    <input className="input-sidebar" type="text" id="text" name="text" value={formData.text} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="textShort">Text Short:</label>
                    <input className="input-sidebar" type="text" id="textShort" name="textShort" value={formData.textShort} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="description">Description:</label>
                    <input className="input-sidebar" type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="insignia">Insignia:</label>
                    <input className="input-sidebar" type="text" id="insignia" name="insignia" value={formData.insignia} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="color">Color:</label>
                    <input className="input-sidebar" type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="colorInsignia">Color Insignia:</label>
                    <input className="input-sidebar" type="text" id="colorInsignia" name="colorInsignia" value={formData.colorInsignia} onChange={handleChange} />
                </div>
                <div className="label-input">
                    <label htmlFor="tags">Tags:</label>
                    <div className="tags-input-container">
                        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something" />
                        <div className='tags-list-container'>
                            {tags.map((tag, index) => (
                                <div className="tag-item" key={index}>
                                    <span className="text">{tag}</span>
                                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='sidebar-Buttons'>
                    <button name="addButton" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                        onClick={handleUpdate}>Add</button>
                    <button name="updateButton" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }} onClick={handleUpdate}>Update</button>
                    <button name="deleteButton" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }} onClick={handleUpdate}>Delete</button>
                </div>
            </form>

        </div>
    );
};

export default Sidebar;
