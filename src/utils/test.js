let str = `
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
    color = "test";
    tags = {"BIS", "USArmy", "CA"};
`;

let matches = str.match(/([^=]+)\s*=\s*("[^"]+"|\{[^}]+\}|\S+);/g);

if (matches) {
  let parts = matches.map(match => match.split("=").map(part => part.trim()));
  console.log(parts);
} else {
  console.log("No matches found.");
}
