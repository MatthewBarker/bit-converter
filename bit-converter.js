/* eslint no-bitwise: ["error", { "allow": ["<<=", ">>=", "&"] }] */

/**
 * Calculate the bits required for the longest number in the array.
 *
 * @param {number[]} numberArray - Value to write
 * @param {boolean} [signed = true] - True if signed; false if unsigned
* @return {number}
 */
function bitsRequired(numberArray, signed = true) {
    let nbit = 0;
    let length = 0;

    numberArray.forEach((int) => {
        length = Math.abs(int).toString(2).length;
        nbit = Math.max(nbit, length);
    });

    return signed ? nbit + 1 : nbit;
}

/**
 * Convert the unsigned integer to a signed integer.
 * Taken from here: http://stackoverflow.com/a/27911974/6234491
 *
 * @param {number} uint - Unsigned integer
 * @param {number} [nbit = 32] - Length to write in bits
 * @exception {RangeError} Minimum bit length is 1
 * @exception {RangeError} Maximum bit length is 32
 * @return {number}
 */
function uintToInt(uint, nbit = 32) {
    if (nbit < 1) {
        throw new RangeError('Minimum bit length is 1');
    }

    if (nbit > 32) {
        throw new RangeError('Maximum bit length is 32');
    }

    let result = uint;

    result <<= 32 - nbit;
    result >>= 32 - nbit;

    return result;
}

/**
 * Convert the signed integer to an unsigned integer.
 * Taken from here: http://stackoverflow.com/a/27911974/6234491
 *
 * @param {number} int - Signed integer
 * @param {number} [nbit = 32] - Length to write in bits
 * @exception {RangeError} Minimum bit length is 1
 * @exception {RangeError} Maximum bit length is 32
 * @return {number}
 */
function intToUint(int, nbit) {
    const result = new Uint32Array(1);

    if (nbit < 1) {
        throw new RangeError('Minimum bit length is 1');
    }

    if (nbit > 32) {
        throw new RangeError('Maximum bit length is 32');
    }

    result[0] = int;

    // Don't accidentally sign again
    if (nbit < 32) {
        return result[0] & (Math.pow(2, nbit) - 1);
    }

    return result[0];
}

/**
 * Convert the number to a binary string.
 *
 * @param {number} number - Value to write
 * @param {number} minLength - Minimum length to write in bits
 * @return {string}
 */
function intToBinaryString(number, minLength) {
    const unsigned = intToUint(number, minLength);
    let binary = unsigned.toString(2);

    while (binary.length < minLength) {
        binary = (number >= 0 ? '0' : '1') + binary;
    }

    return binary;
}

export {
    bitsRequired,
    uintToInt,
    intToUint,
    intToBinaryString,
};
