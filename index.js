/**
 * List of all the zero-width characters used to encode the private message
 *
 * @type {String[]}
 */
let chars = [
                    "\u034f", "\u061c", "\u180e", "\u200b", "\u200c", "\u200d", "\u202a", "\u202c", "\u202d",
                    "\u202e", "\u2060", "\u2062", "\u2063", "\u2064", "\ufeff"
];

/**
 * Converts the private message into a list of Unicode character codes
 *
 * @param {String} text
 * @returns {String[]}
 */
function textToCodes(text) {
    let codes = [];
    let textLen = text.length;
    for (let i = 0; i < textLen; i++) {
        codes.push(text.charCodeAt(i).toString(chars.length-1));
    }
    return codes;
}

/**
 * Converts a list of Unicode character codes into base-x, x being chars.length-1, and encodes each digit
 * into its corresponding zero-width character in chars
 *
 * @param {String[]} codes
 * @returns {String}
 */
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

/**
 * Converts each chunk of zero-width characters separated by the last character in chars into a list of Unicode
 * character codes
 *
 * @param {String} zeroes
 * @returns {Number[]}
 */
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

/**
 * Converts a list of Unicode character codes into a full message
 *
 * @param {String[]} codes
 * @returns {String}
 */
function codesToText(codes) {
    return String.fromCharCode.apply(null, codes);
}

/**
 * Private function that puts together the pieces for encoding a zero-width message
 *
 * @param {String} message
 * @param {String} secret
 * @returns {String}
 * @private
 */
function _encode(message, secret) {
    let codes = textToCodes(secret);
    let zeroes = codesToZeroes(codes);
    return zeroes+message;
}

/**
 * Private function that puts together the pieces for decoding a zero-width message
 *
 * @param {String} message
 * @returns {String[]}
 * @private
 */
function _decode(message) {
    let privateEnd = message.lastIndexOf(chars[chars.length-1]);
    let codes = zeroesToCodes(message.substring(0, privateEnd));
    let secret = codesToText(codes);
    return [message.substring(privateEnd+1), secret];
}

/**
 * Runs when the encode button is pressed. Gets the inputted public and private messages and passes it to _encode()
 */
function encode() {
    let publicVal = document.getElementById("public").value;
    let privateVal = document.getElementById("private").value;
    document.getElementById("encoded").value = _encode(publicVal, privateVal);
}

/**
 * Runs when the decode button is pressed. Grabs the inputted encoded message and passes it to _decode()
 */
function decode() {
    let encodedVal = document.getElementById("encoded").value;
    [document.getElementById("public").value, document.getElementById("private").value] = _decode(encodedVal);
}