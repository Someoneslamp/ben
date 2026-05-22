/*
 * Author: @Someoneslamp
 * File: site.mjs (JS module)
 * 
 * Site related thingies
 */
// Globals
// Imports
import * as dom from "./dom.mjs";
import * as data from "./data.mjs";
import * as language from "./language.mjs";

export const g_translationTargetSelector = data.assembleCSV([
    "h1", "h2", "h3", "p", "title", "a"
]);

// Functions
/**
 * Generates the heavy-lifting site layouts
 * necessary for dynamically loaded webpages,
 * localization, and ADA Compliance
 */
export async function generate() {
    await language.loadTranslations();
    /**
    const skipContent = dom.createElement(
        "a", document.body,
        {
            href: "#maincontent",
            id: "skip_content"
        }
    ); fancy documentation LIES, this is not complete...
    skipContent.textContent = "site.title";
    */
    language.assignTranslations(g_translationTargetSelector);
}