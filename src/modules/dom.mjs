/*
 * Author: @Someoneslamp
 * File: dom.mjs (JS module)
 * 
 * I make these for all projects I do
 * using HTML & JavaScript, just super
 * duper easy utility functions, and some
 * JSON to remove the ickiness of magic strings
 */
// Globals
export const g_event = Object.freeze({
    DOM_LOADED: "DOMContentLoaded",
    CLICK: "click",
    MEDIA_ENDED: "ended"
});
/** @type {Array<() => void>} */
export const g_animationFrameSubscriptions = new Array();
let g_animationFrameActive = false;

/**
 * @typedef {{[qualified_name: string]: string}} attributes_t 
 */
// Functions
/**
 * Sets the attributes of an HTML element
 * using the specified qualified name & value
 * pair attributes object
 * @param {HTMLElement} element 
 * @param {attributes_t} attributes 
 */
export function setAttributes(element, attributes) {
    for (const qualifiedName in attributes) {
        if (typeof qualifiedName != "string") continue;
        const value = attributes[qualifiedName];
        element.setAttribute(qualifiedName, value);
    }
}

/**
 * Create an HTML element with an optional
 * parent and attributes object
 * @param {keyof HTMLElementTagNameMap} tagName 
 * @param {HTMLElement?} parent 
 * @param {attributes_t?} attributes 
 * @returns {HTMLElement} 
 */
export function createElement(
    tagName, 
    parent,
    attributes
) {
    const element = document.createElement(tagName);
    if (parent instanceof HTMLElement) {
        parent.appendChild(element);
    }
    if (typeof attributes == "object") {
        setAttributes(element, attributes);
    }
    return element;
}

/**
 * A recursive frame request function with 
 * the base case being that there are active 
 * animation frame subscriptions
 * @returns {void} 
 */
export function recurseAnimationFrame() {
    if (g_animationFrameActive == false) return;
    for (const subscription of g_animationFrameSubscriptions) {
        subscription();
    }
    requestAnimationFrame(recurseAnimationFrame);
}

/**
 * Subscribe to animation frame updates,
 * there is internal state relating to
 * how many subscriptions and if frames
 * are being listened to
 * @param {() => void} callback 
 */
export function subscribeToAnimationFrame(
    callback
) {
    g_animationFrameSubscriptions.push(callback);
    if (g_animationFrameActive == false) {
        g_animationFrameActive = true;
        recurseAnimationFrame();
    }
}
/**
 * Unsubscribe to animation frame updates,
 * there is internal state relating to
 * how many subscriptions and if frames
 * are being listened to
 * @param {() => void} callback 
 */
export function unsubscribeToAnimationFrame(
    callback
) {
    const subscriptions = g_animationFrameSubscriptions;
    subscriptions.splice(
        subscriptions.indexOf(callback), 1
    );
    if (subscriptions.length <= 0) {
        g_animationFrameActive = false;
    }
}