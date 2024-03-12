/**
* Converts cfgOrbat into a JSON array.
* 
* @param {String} armaData - String containing cfgOrbat file.
* 
* @returns {JSON Data} - Returns a JSON Array based on the Arma Data.
*/
function armaConfigToJSON(armaData) {
	let jsonData = [];
	const lines = armaData.split('\n');
	let classStack = []; // Stack to keep track of parent classes
	let depth = 0; // Track the depth of the current class
	let isClassBracket = false;

	for (let index = 0; index < lines.length; index++) {
		let line = lines[index].trim();

		if (line.startsWith('//')) {
			continue;
		}

		if (line.startsWith('class')) {
			const className = line.split(' ')[1];
			if (className.toLowerCase() === 'CfgORBAT'.toLowerCase()) {
				continue; // Skip CfgOrbat class
			}
			const parentClass = classStack.length > 0 ? classStack[classStack.length - 1] : null;
			const currentClass = resetCurrentAttributes(className); // Reset current attributes for each class
			if (parentClass) {
				parentClass.subordinates.push(currentClass);
			} else {
				jsonData.push(currentClass);
			}
			classStack.push(currentClass);
			depth++;
			isClassBracket = true;
		} else if (line.includes('{')) {
			// Do nothing for opening brace
			if (line.includes("=")) {
				isClassBracket = false;
			}
		} else if (line.includes('};')) {
			if (depth > 0 && isClassBracket) {
				classStack.pop();
				depth--;
			} else {
				isClassBracket = true;
			}
		} else {
			const attributeMatch = line.match(/^\s*([^=]+)\s*=\s*"?([^";]+)"?;/);
			if (attributeMatch) {
				const attributeName = attributeMatch[1].trim();
				const attributeValue = attributeMatch[2];
				const currentClass = classStack[classStack.length - 1];
				if (attributeName in resetCurrentAttributes() && attributeName !== "subordinates") { // Check if the attribute is not "subordinates"
					currentClass[attributeName] = attributeValue; // Assign attribute to the current class
				}
			}
		}

	}

	jsonData = jsonData.filter(Boolean);
	return JSON.stringify(jsonData, null, 2);
}


function resetCurrentAttributes(className) {
	return {
		cfgName: className,
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
		subordinates: []
	};
}

export function convertToJson(cfgText) {
	const jsonData = armaConfigToJSON(cfgText);
	return jsonData;
}
/*
// Example Arma 3 config string
const armaConfigString = `
class CfgORBAT
{
	class 1_1st_Inf._Reg.
	{
		id = 1;
		idType = "UUID";
		side = "West";
		size = "Regiment";
		type = "Infantry";
		commander = "Captain Smith";
		commanderRank = "Captain";
		text = "1st Regiment Infantry Unit";
		textShort = "1st Inf. Reg.";
		description = "This infantry unit is known for its discipline and effectiveness on the battlefield.";
	};
	class 2_2nd_Inf._Btn.
	{
		id = 2;
		idType = "UUID";
		side = "West";
		size = "Regiment";
		type = "Infantry";
		commander = "Captain Johnson";
		commanderRank = "Captain";
		text = "2nd Battalion Infantry Unit";
		textShort = "2nd Inf. Btn.";
		description = "This infantry unit is led by Captain Johnson.";
	};
	class 3_3rd_Div._HW
	{
		id = 3;
		idType = "UUID";
		side = "West";
		size = "Regiment";
		type = "Heavy Weapons";
		commander = "Major Davis";
		commanderRank = "Major";
		text = "3rd Division Heavy Weapons Unit";
		textShort = "3rd Div. HW";
		description = "This unit specializes in operating heavy weapons and artillery.";
		class 4_4th_Pl._Spec._HW
		{
			id = 4;
			idType = "UUID";
			side = "West";
			size = "Battalion";
			type = "Heavy Weapons";
			commander = "Major Davis";
			commanderRank = "Major";
			text = "4th Platoon Specialized Heavy Weapons Team";
			textShort = "4th Pl. Spec. HW";
			description = "This specialized team handles heavy weapons and artillery.";
			class 5_5th_Pl._Spec._HW
			{
				id = 5;
				idType = "UUID";
				side = "West";
				size = "Battalion";
				type = "Heavy Weapons";
				commander = "Major Davis";
				commanderRank = "Major";
				text = "5th Platoon Specialized Heavy Weapons Team";
				textShort = "5th Pl. Spec. HW";
				description = "This specialized team handles heavy weapons and artillery.";
			};
			class 6_6th_Pl._Spec._HWs
			{
				id = 6;
				idType = "UUID";
				side = "West";
				size = "Battalion";
				type = "Infantry";
				commander = "Major Davis";
				commanderRank = "Major";
				text = "6th Platoon Specialized Heavy Weapons Team";
				textShort = "6th Pl. Spec. HWs";
				description = "This specialized team handles heavy weapons and artillery.";
			};
		};
	};
};
`;*/