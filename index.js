let chars = ["\u180e", "\u200b", "\u200c", "\u200d", "\u202a", "\u202b", "\u202c", "\u202d", "\u202e", "\u2062", "\u2063", "\u2064", "\ufeff"];

function textToCodes(text) {
    let codes = [];
    let textLen = text.length;
    for (let i = 0; i < textLen; i++) {
        codes.push(text.charCodeAt(i).toString(chars.length-1));
    }
    return codes;
}

function codesToZeroes(codes) {
    let zeroes = "";
    for (let i = 0; i < codes.length; i++) {
        for (let j = 0; j < codes[i].length; j++) {
            zeroes += chars[parseInt(codes[i][j], chars.length-1)];
        }
        zeroes += chars.at(-1);
    }
    return zeroes;
}

function zeroesToCodes(zeroes) {
    let chunks = zeroes.split(chars.at(-1));
    let codes = [];
    for (let i = 0; i < chunks.length; i++) {
        let num = "";
        for (let j = 0; j < chunks[i].length; j++) {
            num += chars.indexOf(chunks[i][j]).toString(chars.length-1);
        }
        codes.push(parseInt(num, chars.length-1));
    }
    return codes;
}

function codesToText(codes) {
    return String.fromCharCode.apply(null, codes);
}

function _encode(message, secret) {
    let codes = textToCodes(secret);
    let zeroes = codesToZeroes(codes);
    return zeroes+message;
}

function _decode(message) {
    let privateEnd = message.lastIndexOf(chars[chars.length-1]);
    let codes = zeroesToCodes(message.substring(0, privateEnd));
    let secret = codesToText(codes);
    return [message.substring(privateEnd+1), secret];
}

function encode() {
    let publicVal = document.getElementById("public").value;
    let privateVal = document.getElementById("private").value;
    document.getElementById("output").value = _encode(publicVal, privateVal);
}

function decode() {
    let outputVal = document.getElementById("output").value;
    [document.getElementById("public").value, document.getElementById("private").value] = _decode(outputVal);
}