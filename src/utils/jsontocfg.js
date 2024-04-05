/**
* Converts JSON data into a cfgOrbat file.
* 
* @param {JSON Data} jsonData - JSON Array.
* 
* @returns {CfgOrbat String} - Returns a CfgOrbat string based on the JSON Data.
*/

export function convertJsonToCfgORBAT(jsonData) {
    let cfgString = 'class CfgORBAT\n{\n';

    function parseObjectToCfg(obj, indentLevel) {
        const indent = '\t'.repeat(indentLevel);
        const cfgName = `${obj.id}_${obj.textShort.replace(/\s/g, '_').replace(/\./g, '')}`;
        cfgString += `${indent}class ${cfgName}\n`;
        cfgString += `${indent}{\n`;

        Object.keys(obj).forEach(key => {
            if (key !== 'subordinates' && key !== 'cfgName') {
                switch (key.toLowerCase()) {
                    case "id":
                        cfgString += `${indent}\t${key} = ${parseInt(obj[key])};\n`;
                        break;
                    case "idtype":
                        cfgString += `${indent}\t${key} = ${parseInt(obj[key])};\n`;
                        break;
                    case "colorinsignia":
                        cfgString += `${indent}\t${key} = {${obj[key]}};\n`;
                        break;
                    case "tags":
                        cfgString += `${indent}\t${key}[] = {${obj[key].map(item => `"${item}"`).join(', ')}};\n`;
                        break;
                    default:
                        cfgString += `${indent}\t${key} = ${JSON.stringify(obj[key])};\n`;
                }
                /*
                if (key.toLowerCase() === "id" || key.toLowerCase() === "idtype") {
                    cfgString += `${indent}\t${key} = ${parseInt(obj[key])};\n`;
                } else {
                    cfgString += `${indent}\t${key} = ${JSON.stringify(obj[key])};\n`;
                }*/
            }
        });

        if (obj.subordinates && obj.subordinates.length > 0) {
            cfgString += `${indent}\t\n`;
            obj.subordinates.forEach(sub => {
                parseObjectToCfg(sub, indentLevel + 1, cfgName);
            });
        } else {
        }

        cfgString += `${indent}};\n`;
    }

    jsonData.forEach(obj => {
        parseObjectToCfg(obj, 1);
    });

    cfgString += '};';

    return cfgString;
}