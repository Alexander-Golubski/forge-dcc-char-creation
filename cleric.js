let charClass = "Cleric"

const charLanguages = "Languages placeholder"

const staMod = prompt("Stamina mod (no plus):");
const staMods = staMod * 2

const lucMod = prompt("Luck mod (no plus):");

const culTable = game.tables.getName('Human Culture');
const culDraw = await culTable.draw({roll: new Roll('1d3'), displayChat: false});
const charCulture = culDraw.results[0].text;

const lucTable = game.tables.getName('Table 1-2: Luck Score');
let roll = new Roll(`1d30 + ${lucMod}`);
await roll.roll();
const charLucSignDraw = await lucTable.draw({roll, displayChat: false});
charLucSign = charLucSignDraw.results[0].text;

const alnTable = game.tables.getName('Alignment');
const alnDraw = await alnTable.draw({roll: new Roll('1d3'), displayChat: false});
charAlignment = alnDraw.results[0].text;

let cpRoll = new Roll("5d12");
await cpRoll.evaluate();
cpTotal = cpRoll.total;

hpRoll = new Roll(`1d4+1d8 + ${staMods}`);
await hpRoll.evaluate();
startHp = hpRoll.total;

const deiTable = game.tables.getName(charAlignment + " " + charCulture + " Deities")
const deiDraw = await deiTable.draw({displayChat: false});
charDeity = deiDraw.results[0].text;

const clrSpTable = game.tables.getName("Cleric Spells")
const clrSpDraw = await clrSpTable.drawMany(4, {displayChat: false});
spOne = clrSpDraw.results[0].text;
spTwo = clrSpDraw.results[1].text;
spThree = clrSpDraw.results[2].text;
spFour = clrSpDraw.results[3].text;

let charResultsHtml = `
<hr>
<p>Class: ${charClass}</p>
<p>HP: ${startHp}</p>
<p>Alignment: ${charAlignment}</p>
<p>Culture: ${charCulture}</p>
<p>Deity: ${charDeity}</p>
<p>Languages: ${charLanguages}</p>
<p>Luck Sign: ${charLucSign} (${lucMod})</p>
<p>Starting copper: ${cpTotal}</p>
<p><b>Spells:<b/></p>
<p>${spOne}</p>
<p>${spTwo}</p>
<p>${spThree}</p>
<p>${spFour}</p>
`

ChatMessage.create({
user: game.user._id,
speaker: ChatMessage.getSpeaker({token: actor}),
content: charResultsHtml
});