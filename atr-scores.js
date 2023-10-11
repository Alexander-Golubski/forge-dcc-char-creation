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

let charResultsHtml = `
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