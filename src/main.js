/*
 * Author: @Someoneslamp
 * File: main.js (JS)
 * 
 * Ben
 */
// Globals
const g_translationTagTargets = Object.freeze([
    "p", "button"
]);

// Imports
import * as data from "./modules/data.mjs";
import * as dom from "./modules/dom.mjs";
import * as language from "./modules/language.mjs";
import * as ben from "./ben.mjs";

// Functions
async function main() {
    document.removeEventListener(dom.g_event.DOM_LOADED, main);
    await language.loadTranslations();
    language.assignTranslations(data.assembleCSV(g_translationTagTargets));
    ben.create(
        document.getElementById("bentley_input"),
        document.getElementById("bentley_submit"),
        [
            ben.createResponse("assets/sound/yes.wav", "response.yes"),
            ben.createResponse("assets/sound/no.wav", "response.no"),
            ben.createResponse("assets/sound/chuckle.wav", "response.chuckle"),
            ben.createResponse("assets/sound/silly.wav", "response.silly")
        ]
    );
}

document.addEventListener(dom.g_event.DOM_LOADED, main);