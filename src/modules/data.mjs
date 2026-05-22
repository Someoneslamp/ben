/*
 * Author: @Someoneslamp
 * File: data.mjs (JS module)
 * 
 * Data related utilities
 */
// Globals
// Functions
/**
 * Loads a JSON object under the
 * specified path, using fetch
 * @param {string} path 
 * @return {object?} 
 */
export async function loadJSON(path) {
    const jsonResponse = await fetch(path);
    if (!jsonResponse.ok) {
        console.error(`Failed to load JSON file at (${path})`);
        return null;
    }
    return await jsonResponse.json();
}

/**
 * Creates Comma-Separated-Values
 * based on the "variable arguments"
 * provided
 * @param {...any} values 
 * @returns {string} 
 */
export function assembleCSV(...values) {
    // TODO: gonna be pretty crappy implementation, but fine for now
    let result = "";
    for (let index = 0; index < values.length; index++) {
        const value = values[index];
        result = (index < values.length - 1) ?
                 result + `${value},`    :
                 result + `${value}`;
    }
    return result;
}