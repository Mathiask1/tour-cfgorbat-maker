import React, { useState, useRef  } from 'react';
import '../styles/App.css';

// Import the conversion utility functions
import { convertJsonToCfgORBAT } from '../utils/jsontocfg.js'; // Update the path as per your file structure
import { convertToJson } from '../utils/cfgtojson.js';

const Converter = ({ data, setOrgData, fetchOrgData, saveToSessionStorage }) => {
    const [convertedText, setConvertedText] = useState('');
    const [converterType, setConverterType] = useState("JsonToCfg");
    const textAreaRef = useRef(null); // Define textAreaRef using useRef

    const handleConverterTypeChange = (event) => {
        setConverterType(event.target.value);
    };

    const handleOnChange = (e) => {
        setConvertedText(e.target.value);
    };

    const handleConvert = (e) => {
        e.preventDefault();
        // Call the conversion utility function based on the selected converter type
        if (converterType === "JsonToCfg") {
            const text = convertJsonToCfgORBAT(data);
            setConvertedText(text);
        } else if (converterType === "CfgToJson") {
            const text = convertToJson(convertedText); // Pass the JSON data
            setOrgData(JSON.parse(text));
        }
    };

    const importDefault = async (e) => {
        e.preventDefault();
        const data = await fetchOrgData();
        saveToSessionStorage(data);
        setOrgData(data);
    };

    const handleTab = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
    
            const { target } = event;
            const start = target.selectionStart;
            const end = target.selectionEnd;
    
            // Get the current value and calculate the new value with the tab character inserted
            const text = target.value;
            const newValue = text.substring(0, start) + '\t' + text.substring(end);
    
            // Save the cursor position before updating the value
            const newPosition = start + 1;
    
            // Update the value
            setConvertedText(newValue);
    
            // Set the cursor position after the value is updated
            setTimeout(() => {
                textAreaRef.current.focus();
                textAreaRef.current.setSelectionRange(newPosition, newPosition);
            }, 0);
        }
    };
    

    return (
        <div className="converter">
            <div>
                <label>
                    <input type="radio" value="JsonToCfg" checked={converterType === "JsonToCfg"} onChange={handleConverterTypeChange} />
                    Export (JSON to CfgORBAT)
                </label>
                <label>
                    <input type="radio" value="CfgToJson" checked={converterType === "CfgToJson"} onChange={handleConverterTypeChange} />
                    Import (Convert CfgORBAT to JSON)
                </label>
            </div>
            <textarea 
                className="converter-text" 
                value={convertedText} 
                onChange={handleOnChange} 
                onKeyDown={handleTab} 
                ref={textAreaRef}
                placeholder={converterType === "JsonToCfg" ? "Hit convert to export CfgOrbat." : "Enter CfgORBAT here, and hit convert"} 
            />
            <button name="convertButton" onClick={handleConvert}>Convert</button>
            <button name="convertButton" onClick={importDefault}>Import Default</button>
        </div>
    );
};

export default Converter;
