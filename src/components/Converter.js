import React, { useState, useRef } from 'react';
import '../styles/App.css';
import '../styles/text-area-container.css';
import data from '../Data.json';

// Import the conversion utility functions
import { convertJsonToCfgORBAT } from '../utils/jsontocfg.js'; // Update the path as per your file structure
import { convertToJson } from '../utils/cfgtojson.js';

const Converter = ({ orgData, setOrgData, fetchOrgData, saveToSessionStorage }) => {
    const [convertedText, setConvertedText] = useState('');
    const [converterType, setConverterType] = useState("JsonToCfg");
    const [lineNumbers, setLineNumbers] = useState(0);
    const textAreaRef = useRef(null); // Define textAreaRef using useRef
    const lines = convertedText.split('\n');

    const handleConverterTypeChange = (event) => {
        setConverterType(event.target.value);
    };

    const handleOnChange = (e) => {
        setConvertedText(e.target.value);
    };

    const handleConvert = (e) => {
        e.preventDefault();
        if (converterType === "JsonToCfg") {
            const text = convertJsonToCfgORBAT(orgData);
            setConvertedText(text);
        } else if (converterType === "CfgToJson") {
            const text = convertToJson(convertedText);
            setOrgData(JSON.parse(text));
        }
    };

    const importDefault = async (e) => {
        setOrgData(data);
        saveToSessionStorage(data);
    };

    const handleTab = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();

            const { target } = event;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const text = target.value;
            const newValue = text.substring(0, start) + '\t' + text.substring(end);
            const newPosition = start + 1;

            setConvertedText(newValue);
            setTimeout(() => {
                textAreaRef.current.focus();
                textAreaRef.current.setSelectionRange(newPosition, newPosition);
            }, 0);
        }
    };

    const updateRowNumbering = () => {
        const num = convertedText.split('\n').length;
        setLineNumbers(num);
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
            <div className="line-number-text-area-container">
                <div className="numbers">
                    {lines.map((_, index) => (
                        <div key={index} className='line-number'>{index + 1}</div>
                    ))}
                </div>
                <div className='text-area-container'>
                    <textarea
                        spellCheck="false"
                        className="converter-text"
                        wrap='off'
                        value={convertedText}
                        onChange={handleOnChange}
                        onKeyDown={handleTab}
                        ref={textAreaRef}
                        placeholder={converterType === "JsonToCfg" ? "Hit convert to export CfgOrbat." : "Enter CfgORBAT here, and hit convert"}
                    />
                </div>
            </div>
            <div className="buttons-container">
                <button name="convertButton" onClick={handleConvert}>Convert</button>
                <button name="convertButton" onClick={importDefault}>Import Default</button>
            </div>
        </div>
    );
};

export default Converter;
