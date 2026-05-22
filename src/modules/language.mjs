/*
 * Author: @Someoneslamp
 * File: language.mjs (JS module)
 * 
 * Language localization module
 */
/**
 * @typedef {{[translation_key: string]: string}} translations_t 
 */
// Globals
/** @type {translations_t} */
export let g_translations = null;
/** @type {string?} */
export let g_languageCode = null;

// Imports
import * as data from "./data.mjs";

/**
 * @typedef {string[]} language_codes_t 
 */
// Functions
/**
 * Loads all the string translations
 * using the language code found via.
 * scraping the DOM
 */
export async function loadTranslations() {
    if (g_translations != null) {
        console.warn("Language has already been loaded");
        return;
    }
    const htmlContainer = document.querySelector("html");
    if (htmlContainer == null) {
        throw new Error("Failed to find language code in DOM");
    }
    /** @type {language_codes_t} */
    const supportedLanguageCodes = await data.loadJSON("assets/language_codes.json");
    const languageCode = htmlContainer.lang;
    if (!supportedLanguageCodes.includes(languageCode)) {
        throw new Error(`Language is unsupported: ${languageCode}`);
    }
    g_languageCode = languageCode;
    g_translations = await data.loadJSON(`assets/language/${languageCode}.json`);
}

/**
 * Gets a string translation from the
 * language actively loaded
 * @param {string} translationKey 
 * @returns {string} 
 */
export function getTranslation(translationKey) {
    if (g_translations == null) return translationKey;
    const translation = g_translations[translationKey];
    if (translation == null) return translationKey;
    return g_translations[translationKey];
}

/**
 * Assigns string translation to any
 * DOM elements that can be found with
 * the provided query selector
 * @param {string} querySelector 
 */
export function assignTranslations(querySelector) {
    const elements = document.querySelectorAll(querySelector);
    for (const element of elements) {
        if (element.textContent <= 0) {
            continue;
        }
        element.textContent = getTranslation(element.textContent);
    }
}