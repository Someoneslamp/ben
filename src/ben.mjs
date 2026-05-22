/*
 * Author: @Someoneslamp
 * File: ben.mjs (JS module)
 * 
 * Talking Ben stuff
 */
// Imports
import * as dom from "./modules/dom.mjs";
import * as language from "./modules/language.mjs";

// Globals
/**
 * @typedef {{sound_url: string, translation_key: string, operation: (() => void)?}} response_t 
 */
// Functions
/**
 * Create an instance of Ben
 * @param {HTMLInputElement} input 
 * @param {HTMLButtonElement} submit 
 * @param {response_t[]} responses 
 */
export function create(input, submit, responses) {
    const responseCount = responses.length;
    let active = false;
    submit.addEventListener(dom.g_event.CLICK, () => {
        if (active) return;
        active = true;
        const response = responses[Math.floor(Math.random() * responseCount)];
        if (response.operation != null) response.operation();
        /** @type {HTMLParagraphElement} */
        const textResponse = dom.createElement("p", document.body);
        textResponse.textContent = language.getTranslation(response.translation_key);
        /** @type {HTMLAudioElement} */
        const audioResponse = dom.createElement(
            "audio", document.body,
            {
                src: response.sound_url
            }
        );
        // hack
        function handle() {
            audioResponse.removeEventListener(dom.g_event.MEDIA_ENDED, handle);
            audioResponse.remove();
            active = false;
        }
        audioResponse.play();
        audioResponse.addEventListener(dom.g_event.MEDIA_ENDED, handle);
    });
}

/**
 * Create a response object
 * @param {string} soundURL 
 * @param {string} translationKey 
 * @param {(() => void)?} operation 
 * @returns {response_t} 
 */
export function createResponse(soundURL, translationKey, operation) {
    return {
        sound_url: soundURL,
        translation_key: translationKey,
        operation: operation
    };
}