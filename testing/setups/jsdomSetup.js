"use strict";

const {jsdom} = require("jsdom");

const setupCustomWindow = function(window) {
    /**
     * Borrowed from: https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
     * This is for doing some of the offset styles on a dom element
     */
    Object.defineProperties(window.HTMLElement.prototype, {
        offsetLeft: {
            get: function() {
                return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
            },
            configurable: true
        },
        offsetTop: {
            get: function() {
                return parseFloat(window.getComputedStyle(this).marginTop) || 0;
            },
            configurable: true
        },
        offsetHeight: {
            get: function() {
                return parseFloat(window.getComputedStyle(this).height) || 0;
            },
            configurable: true
        },
        offsetWidth: {
            get: function() {
                return parseFloat(window.getComputedStyle(this).width) || 0;
            },
            configurable: true
        }
    });
};

function setupDom() {
    const baseMarkup = `
    <!DOCTYPE html>
    <html>
      <head>
        <title></title>
      </head>
      <body></body>
    </html>`;
    const window = jsdom(baseMarkup, {
        url: "http://localhost"
    }).defaultView;
    setupCustomWindow(window);
    global.window = window;
    global.XMLHttpRequest = window.XMLHttpRequest;
    global.document = window.document;
    global.navigator = window.navigator;
    global.document = window.document;
}

setupDom();

// In case we want to refresh later
module.exports = setupDom;
