let strTotal;
let agiTotal;
let staTotal;
let perTotal;
let intTotal;
let lucTotal;

let strMod;
let agiMod;
let staMod;
let perMod;
let intMod;
let lucMod;
let abiMod;

let occRace;

let charAlignment;
let cpTotal;
let charLucSign;

let spOne = "n/a";
let spTwo = "n/a";
let spThree = "n/a";
let spFour = "n/a";

let charLanguages = "languages placeholder"

function calcModifier(abiTotal) {
    if (abiTotal == 3) {
        abiMod = -3;
    } else if (abiTotal > 3 && abiTotal < 6) {
        abiMod = -2;
    } else if (abiTotal > 5 && abiTotal < 9) {
        abiMod = -1;
    } else if (abiTotal > 8 && abiTotal < 13) {
        abiMod = 0;
    } else if (abiTotal > 12 && abiTotal < 16) {
        abiMod = 1;
    } else if (abiTotal > 15 && abiTotal < 18) {
        abiMod = 2;
    } else if (abiTotal == 18) {
        abiMod = 3;
    }

    return abiMod;
}

let strRoll = new Roll("3d6");
await strRoll.evaluate();
strTotal = strRoll.total
strMod = calcModifier(strTotal);

let agiRoll = new Roll("3d6");
await agiRoll.evaluate();
agiTotal = agiRoll.total;
agiMod = calcModifier(agiTotal);

let staRoll = new Roll("3d6");
await staRoll.evaluate();
staTotal = staRoll.total;
staMod = calcModifier(staTotal);

let perRoll = new Roll("3d6");
await perRoll.evaluate();
perTotal = perRoll.total;
perMod = calcModifier(perTotal);

let intRoll = new Roll("3d6");
await intRoll.evaluate();
intTotal = intRoll.total;
intMod = calcModifier(intTotal);

let lucRoll = new Roll("3d6");
await lucRoll.evaluate();
lucTotal = lucRoll.total;
lucMod = calcModifier(lucTotal);

staMods = staMod * 2

const occDraw = await game.tables.getName('Table 1-3: Occupation with Goblins').draw({roll: new Roll('1d110'), displayChat: true});
const occTotal = occDraw.roll.total;

if (occTotal < 19) {
    occRace = "human"
    charClass = "Human"
} else if (occTotal >= 19 && occTotal <= 28 ) {
    occRace = "dwarf"
    charClass = "Dwarf"
} else if (occTotal >= 29 && occTotal <= 38) {
    occRace = "elf"
    charClass = "Elf"
}  else if (occTotal >= 39 && occTotal <= 54) {
    occRace = "human"
    charClass = "Human"
}  else if (occTotal >= 55 && occTotal <= 64) {
    occRace = "halfling"
    charClass = "Halfling"
}  else if (occTotal >= 65 && occTotal <= 100) {
    occRace = "human"
    charClass = "Human"
}  else if (occTotal >= 101) {
    occRace = "goblin"
    charClass = "Goblin"
}

async function HumanClass() {

let charResultsHtml = `
<p><b>Class: ${charClass}</b></p>
<p><b>Ability Scores:</b></p>
<table>
<tr>
<td>STRENGTH</td>
<td>${strTotal} (${strMod})</td>
</tr>
<tr>
<td>AGILITY</td>
<td>${agiTotal} (${agiMod})</td>
</tr>
<tr>
<td>STAMINA</td>
<td>${staTotal} (${staMod})</td>
</tr>
<tr>
<td>PERSONALITY</td> 
<td>${perTotal} (${perMod})</td>
</tr>
<tr>
<td>INTELLIGENCE</td> 
<td>${intTotal} (${intMod})</td>
</tr>
<tr>
<td>LUCK</td> 
<td>${lucTotal} (${lucMod})</td>
</tr>
</table>
<hr>
`

ChatMessage.create({
user: game.user._id,
speaker: ChatMessage.getSpeaker({token: actor}),
content: charResultsHtml
});

}

async function DemiHumanClass(){

    if (occRace == "dwarf") {
        hpRoll = new Roll(`1d4+1d10 + ${staMods}`);
        await hpRoll.evaluate();
        startHp = hpRoll.total;
    } else if (occRace == "halfling"){
        hpRoll = new Roll(`1d4+1d6 + ${staMods}`);
        await hpRoll.evaluate();
        startHp = hpRoll.total;
    } else if (occRace == "goblin"){
        hpRoll = new Roll(`1d4+1d4 + ${staMods}`);
        await hpRoll.evaluate();
        startHp = hpRoll.total;
    } else if (occRace == "elf"){
        hpRoll = new Roll(`1d4+1d6 + ${staMods}`);
        await hpRoll.evaluate();
        startHp = hpRoll.total;

        const wizSpTable = game.tables.getName("Wizard Spells")
        const wizSpDraw = await wizSpTable.drawMany(4, {displayChat: false});
        spOne = wizSpDraw.results[0].text;
        spTwo = wizSpDraw.results[1].text;
        spThree = wizSpDraw.results[2].text;
        spFour = wizSpDraw.results[3].text;
    }

    staMods = staMod * 2

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

    let charResultsHtml = `
    <p><b>Class: ${charClass}</b></p>
    <br>
    <p><b>Ability Scores:</b></p>
    <table>
    <tr>
    <td>STRENGTH</td>
    <td>${strTotal} (${strMod})</td>
    </tr>
    <tr>
    <td>AGILITY</td>
    <td>${agiTotal} (${agiMod})</td>
    </tr>
    <tr>
    <td>STAMINA</td>
    <td>${staTotal} (${staMod})</td>
    </tr>
    <tr>
    <td>PERSONALITY</td> 
    <td>${perTotal} (${perMod})</td>
    </tr>
    <tr>
    <td>INTELLIGENCE</td> 
    <td>${intTotal} (${intMod})</td>
    </tr>
    <tr>
    <td>LUCK</td> 
    <td>${lucTotal} (${lucMod})</td>
    </tr>
    </table>
    <hr>
    <p>HP: ${startHp}</p>
    <p>Alignment: ${charAlignment}</p>
    <p>Languages: ${charLanguages}</p>
    <p>Luck Sign: ${charLucSign} (${lucMod})</p>
    <p>Starting copper: ${cpTotal}</p>
    <br>
    <p><b>Spells (if Elf):</b></p>
    <p>Patron Bond</p>
    <p>Invoke Patron</p>
    <p>${spOne}</p>
    <p>${spTwo}</p>
    <p>${spThree}</p>
    `
    
    ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: charResultsHtml
    });
}

if (charClass == "Human") {HumanClass();
} else {DemiHumanClass()
};