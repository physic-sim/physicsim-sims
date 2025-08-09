/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/lib.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/lib.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* Brand Colours */\n:root {\n    --main-bg: #1e1e1e;\n    --off-bg: #080808;\n    --ctrl-bg: #ffffff;\n    --off-ctrl-bg: #ececec;\n    --alt-green: #a6bd6f;\n    --alt-purple: #6c46cc;\n    --alt-red: #9c6270;\n    --alt-blue: #aacadb;    \n}\n\n/* NumInput */\n.num-input-input {\n    width: 40px;\n    height: 20px;\n    margin: .1em;\n    padding: .2em;\n    background-color: var(--ctrl-bg);\n    outline: none;\n    border: none;\n    font-size: medium;\n    font-family: 'CMUSerifRoman';\n    font-weight: normal;\n    font-style: normal;\n    text-align: center;\n}\n\n.num-input-input::-webkit-outer-spin-button,\n.num-input-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.input-disabled {\n    color: #fff;\n}\n\n/* VectorInput */\n.vector-input-container {\n    display: flex;\n    align-items: center;\n    font-family: 'CMUSerifRoman';\n    font-weight: normal;\n    font-style: normal;\n    padding: .5em;\n}\n\n.vector-input-label {\n    text-decoration: underline;\n}\n\n.vector-input-text {\n    padding: .5em;\n}\n\n.vector-input-bra {\n    width: 40px;\n    z-index: 1;\n}\n\n.vector-input-in-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 10px;\n}\n\n/* Value Input */\n.value-input-container {\n    display: flex;\n    align-items: center;\n    font-size: medium;\n    font-family: 'CMUSerifRoman';\n    font-weight: normal;\n    font-style: normal;\n    padding: .5em;\n}\n\n.value-input-text {\n    padding: .25em;\n}\n\n/* Slider Input */\n.slider-input-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 90%;\n}\n\ninput[type=\"range\"].slider-input-slider {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 100%;\n    height: 8px;\n    background: #ddd;\n    border-radius: 5px;\n    outline: none; \n    transition: background 0.3s ease;\n}\n\ninput[type=\"range\"].slider-input-slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 16px;\n    height: 16px;\n    background: var(--alt-green);\n    border-radius: 50%;\n    cursor: pointer;\n    transition: background 0.3s ease;\n}\n\ninput[type=\"range\"].slider-input-slider::-moz-range-thumb {\n    width: 16px;\n    height: 16px;\n    background: var(--alt-green);\n    border-radius: 50%;\n    cursor: pointer;\n    border: none;\n    transition: background 0.3s ease;\n}\n\ninput[type=\"range\"].slider-input-slider::-ms-thumb {\n    width: 16px;\n    height: 16px;\n    background: var(--alt-green);\n    border-radius: 50%;\n    cursor: pointer;\n    border: none;\n    transition: background 0.3s ease;\n}\n\ninput[type=\"range\"].slider-input-slider::-webkit-slider-thumb:hover {\n    background: var(--alt-purple);\n}\n\ninput[type=\"range\"].slider-input-slider::-webkit-slider-thumb:active {\n    background: var(--alt-purple);\n}\n\n/* Check box Input */\n.check-box-input-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n\n.check-box-input-input[type=\"checkbox\"] {\n    margin: 1em;\n    width: 20px;\n    height: 20px;\n    outline: none;\n    appearance: none;\n    border: 2px solid var(--alt-green);\n    border-radius: 5px;\n    cursor: pointer;\n    transition: all 0.2s ease-in-out;\n    position: relative;\n}\n\n.check-box-input-input[type=\"checkbox\"]:checked {\n    background-color: #a6bd6f55;\n}\n\n.check-box-input-input[type=\"checkbox\"]:checked::after {\n    content: \"✓\";\n    font-size: 14px;\n    color: var(--main-bg);\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n/* RunBtn */\n.btn-run {\n    border: none;\n    outline: none;\n    border: 2px solid var(--alt-green);\n    background-color: #ffffff00;\n    padding: 1em;\n    border-radius: .6em;\n    color: #fff;\n    font-size: medium;\n    margin: .25em;\n    transition: all 500ms;\n    font-family: \"proxima-nova\", sans-serif;\n    font-weight: 400;\n    font-style: normal;\n}\n\n.btn-run:hover {\n    background-color: #a6bd6f55;\n}\n\n/* PauseBtn */\n.btn-pause {\n    border: none;\n    outline: none;\n    border: 2px solid var(--alt-red);\n    background-color: #ffffff00;\n    padding: 1em;\n    border-radius: .6em;\n    color: #fff;\n    font-size: medium;\n    margin: .25em;\n    transition: all 500ms;\n    font-family: \"proxima-nova\", sans-serif;\n    font-weight: 400;\n    font-style: normal;\n}\n\n.btn-pause:hover {\n    background-color: #9c627055;\n}\n\n/* Altbtn */\n.btn-alt {\n    border: none;\n    outline: none;\n    border: 2px solid var(--alt-purple);\n    background-color: #ffffff00;\n    padding: 1em;\n    border-radius: .6em;\n    color: #fff;\n    font-size: medium;\n    margin: .25em;\n    transition: background-color 500ms;\n    font-family: \"proxima-nova\", sans-serif;\n    font-weight: 400;\n    font-style: normal;\n}\n\n.btn-alt:hover {\n    background-color: #6c46cc55;\n}\n\n/* ToggleBtn */\n.btn-toggle {\n    margin: .25em;\n    padding: 1em;\n    background-color: #ffffff00;\n    outline: none;\n    border: 2px solid var(--main-bg);\n    color: #fff;\n    border-radius: .6em;\n    transition: background-color 500ms;\n    font-family: \"proxima-nova\", sans-serif;\n    font-weight: 400;\n    font-style: normal;\n}\n\n.btn-toggle:hover {\n    background-color: #a6bd6f;\n}\n\n.btn-toggle--selected {\n    background-color: var(--alt-purple);\n}\n\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://physicsim/./src/styles/lib.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.header-wrapper {\n    position: absolute;\n    top: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-left: 1em;\n    z-index: 100;\n}\n\n.header-logo {\n    padding: 1em;\n    width: 100px;\n    height: auto;\n}\n\n.header-title {\n    font-size: 25px;\n    color: #fff;\n}\n\n.ctrl-wrapper--bottom {\n    position: absolute;\n    left: 0;    \n    bottom: 0;\n    padding: 1em;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1;\n}\n\n.ctrl-wrapper--left {\n    position: absolute;\n    left: 0;\n    top: 0%;\n    height: 100vh;\n    width: 125px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    padding: 1em;\n}\n\n.sim-wrapper {\n    width: 70vw;\n    height: 100vh;\n    background-color: #000;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n#sim-wrapper {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n.inputs-wrapper {\n    position: absolute;\n    right: 0;\n    top: 0;\n    z-index: 100;\n    background-color: var(--ctrl-bg);\n    height: 100vh;\n    width: 30vw;\n    display: flex;\n    flex-direction:column;\n    align-items: center;\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n.input-selector-wrapper {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    transition: display 250ms;\n}\n\n.input-selector-options {\n    width: 100%;\n    display: flex;\n    justify-content: space-evenly;\n}\n\n.input-selector-option {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    padding: 1em;\n    border-bottom: 2px solid #9a9a9a;\n    background-color: #eeeeee;\n    width: 50%;\n    transition: all 250ms;\n}\n\n.input-selector-option:hover {\n    border-bottom: 2px solid #000;\n}\n\n.input-selector-option--selected {\n    border-bottom: 2px solid #000;\n    background-color: #ffffff;\n}\n\n.inputs-header-wrapper {\n    width: 100%;\n    padding: 1em 1em 0 1em;\n    text-align: center;\n    background-color: var(--off-ctrl-bg);\n    color: #000;\n}\n\n.inputs-prompt {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n\n.inputs-prompt-img-axis {\n    height: 150px;\n    width: auto;\n}\n\n.inputs-header-hide-wrapper {\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: .5em 0 .5em 0;\n    background-color: var(--off-ctrl-bg);\n}\n\n.inputs-header-hide-header {\n    font-size: large;\n    padding-right: 1em;\n}\n\n.inputs-header-hide-btn {\n    position: relative;\n    background-color: var(--alt-green);\n    outline: none;\n    border: none;\n    padding: .6em;\n    color: #fff;\n    border-radius: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: background-color 500ms;\n}\n\n.inputs-header-hide-btn:hover {\n    background-color: var(--alt-purple);\n}\n\n.inputs-header-hide-btn-icon {\n    width: 2em;\n}\n\n.inputs-container {\n    width: 100%;\n    padding-bottom: 2em;\n}\n\n.inputs-header {\n    background-color: var(--main-bg);\n    width: 100%;\n    padding: 0.5em;\n    margin: 0;\n    text-align: center;\n    color: #fff;\n    font-size: x-large;\n    filter: drop-shadow(5px 5px 10px #00000076);\n}\n\n.inputs-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 1em;\n}\n\n.graphs-wrapper {  \n    position: absolute;\n    display: grid;\n    top: 0;\n    right: 0;\n    width: 30vw;\n    height: 100vh;\n    background-color: var(--main-bg);\n    grid-template-rows: 1fr 1fr 1fr;\n    grid-template-columns: 95%;\n    overflow-y: auto;\n}\n\n.graph {\n    height: 350px;\n}\n\n.table-wrapper {\n    width: 100%;\n    font-family: \"proxima-nova\", sans-serif;\n    font-weight: 400;\n    font-style: normal;\n    padding: .5em;\n    border-spacing: 0;\n}\n\n.table-title {\n    text-align: center;\n    color: #fff;\n}\n\n.table-head {\n    color: #fff;\n}\n\n.table-tr {\n    color: #fff;\n}\n\n.table-td {\n    text-align: center;\n    border: 0.5px solid var(--off-ctrl-bg);\n}\n\n.frame-rate {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: small;\n    color: #9a9a9a;\n}\n\n.attr-wrapper {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 15px;\n    color: #c6c6c6;\n    width: max-content;\n}\n\n@media (max-width: 900px) {\n    .inputs-wrapper {\n        width: 100vw;\n        height: 40vh;\n        bottom: 0;\n        top: auto;\n    }\n\n    .graphs-wrapper {\n        width: 100vw;\n        height: 40vh;\n        bottom: 0;\n        top: auto;\n    }\n\n    .ctrl-wrapper--left {\n        padding-top: 5em;\n        justify-content: flex-start;\n    }\n\n    .inputs-header-wrapper {\n        width: 100%;\n    }\n\n    .attr-wrapper {\n        font-family: Arial, Helvetica, sans-serif;\n        font-size: small;\n        color: #c6c6c6;\n    }\n\n    .ctrl-wrapper--bottom {\n        bottom: auto;\n        left: auto;\n        right: 0;\n        padding-top: 5em;\n        flex-direction: column;\n        align-items: flex-end;\n    }\n\n    .sim-wrapper {\n        width: 100vw;\n        height: 60vh;\n    }\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://physicsim/./src/styles/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/styles/lib.css":
/*!****************************!*\
  !*** ./src/styles/lib.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_lib_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./lib.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/lib.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_lib_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_lib_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_lib_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_lib_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://physicsim/./src/styles/lib.css?");

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://physicsim/./src/styles/styles.css?");

/***/ }),

/***/ "./src/Controls/Button.js":
/*!********************************!*\
  !*** ./src/Controls/Button.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Button: () => (/* binding */ Button)\n/* harmony export */ });\nclass Button {\n    container;\n    button;\n    callback;\n\n    constructor(container, callback, text) {\n        this.container = container;\n        this.callback = callback;\n\n        // construct btn\n        this.button = document.createElement('button');\n        this.button.innerHTML = text;\n        this.button.classList.add('btn-alt');\n\n        // add click functionality\n        this.button.addEventListener('click', this.callback);\n\n        this.container.append(this.button);\n    }\n}\n\n\n//# sourceURL=webpack://physicsim/./src/Controls/Button.js?");

/***/ }),

/***/ "./src/Controls/PauseButton.js":
/*!*************************************!*\
  !*** ./src/Controls/PauseButton.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PauseButton: () => (/* binding */ PauseButton)\n/* harmony export */ });\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ \"./src/Controls/Button.js\");\n\n\nclass PauseButton extends _Button__WEBPACK_IMPORTED_MODULE_0__.Button {\n    paused;\n\n    constructor(container, callback, paused = false) {\n        if (paused) {\n            super(container, callback, 'Play');\n            this.button.classList.add('btn-run');\n        } else {\n            super(container, callback, 'Pause');\n            this.button.classList.add('btn-pause');\n        }\n        this.button.classList.remove('btn-alt');\n        this.paused = paused;\n\n        this.button.addEventListener('click', this.onClick.bind(this));\n    }\n\n    onClick() {\n        this.paused = !this.paused;\n\n        if (this.paused) {\n            this.button.innerHTML = 'Play';\n            this.button.classList.remove('btn-pause');\n            this.button.classList.add('btn-run');\n        } else {\n            this.button.innerHTML = 'Pause';\n            this.button.classList.remove('btn-run');\n            this.button.classList.add('btn-pause');\n        }\n    }\n}\n\n\n//# sourceURL=webpack://physicsim/./src/Controls/PauseButton.js?");

/***/ }),

/***/ "./src/Controls/ResetButton.js":
/*!*************************************!*\
  !*** ./src/Controls/ResetButton.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ResetButton: () => (/* binding */ ResetButton)\n/* harmony export */ });\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ \"./src/Controls/Button.js\");\n\n\nclass ResetButton extends _Button__WEBPACK_IMPORTED_MODULE_0__.Button {\n    constructor(container, callback) {\n        super(container, callback, 'Reset');\n        this.button.classList.remove('btn-alt');\n        this.button.classList.add('btn-run');\n    }\n}\n\n\n//# sourceURL=webpack://physicsim/./src/Controls/ResetButton.js?");

/***/ }),

/***/ "./src/Simulations/ThreeDSimulation.js":
/*!*********************************************!*\
  !*** ./src/Simulations/ThreeDSimulation.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThreeDSimulation: () => (/* binding */ ThreeDSimulation)\n/* harmony export */ });\n/* harmony import */ var _Controls_ResetButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controls/ResetButton */ \"./src/Controls/ResetButton.js\");\n/* harmony import */ var _Controls_PauseButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Controls/PauseButton */ \"./src/Controls/PauseButton.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min-exposed.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nclass ThreeDSimulation {\n\n    constructor(\n        container,\n        inputs,\n        graphs,\n        controls,\n        attributes,\n        isStatic = false, // TODO: Add noReset functionality\n    ) {\n        // add containers and pause functionality\n        this.paused = false;\n        this.container = container;\n        this.inputWrapper = inputs;\n        this.graphWrapper = graphs;\n        this.controlWrapper = controls;\n        this.attributeWrapper = attributes;\n        this.selected = 'graphs';\n        this.isStatic = isStatic;\n        this.rotateControl = true;\n    }\n\n    setup(stopLoading) { // initialiser\n\n        // init p5 instance\n        let p = new (p5__WEBPACK_IMPORTED_MODULE_2___default())((p) => {\n            p.setup = () => this.simSetup(p, stopLoading);\n            p.draw = () => this.simDraw(p);\n            p.windowResized = () => this.handleResize(p);\n        });\n\n        /* update frame-rate\n        setInterval(() => {\n            document.getElementById('frame-rate').innerHTML =\n                `${p.frameRate().toFixed(2)}/${p.getTargetFrameRate().toFixed(2)} fps`;\n        }, 1000);\n        */\n\n        // panel selector\n        document.getElementById('graphs-selector').addEventListener('click', () => {\n            if (this.selected == 'graphs') {\n                document.getElementById('graphs-wrapper').style.opacity = 0;\n                document.getElementById('graphs-wrapper').style.zIndex = -1;\n                document\n                    .getElementById('graphs-selector')\n                    .classList.remove('btn-toggle--selected');\n                this.selected = null;\n            } else {\n                document.getElementById('graphs-wrapper').style.opacity = 100;\n                document.getElementById('graphs-wrapper').style.zIndex = 100;\n                document.getElementById('inputs-wrapper').style.display = 'none';\n                document\n                    .getElementById('graphs-selector')\n                    .classList.add('btn-toggle--selected');\n                document\n                    .getElementById('inputs-selector')\n                    .classList.remove('btn-toggle--selected');\n                this.selected = 'graphs';\n            }\n        });\n\n        document.getElementById('inputs-selector').addEventListener('click', () => {\n            if (this.selected == 'inputs') {\n                document.getElementById('inputs-wrapper').style.display = 'none';\n                document\n                    .getElementById('inputs-selector')\n                    .classList.remove('btn-toggle--selected');\n                this.selected = null;\n            } else {\n                document.getElementById('graphs-wrapper').style.opacity = 0;\n                document.getElementById('graphs-wrapper').style.zIndex = -1;\n                document.getElementById('inputs-wrapper').style.display = 'flex';\n                document\n                    .getElementById('inputs-selector')\n                    .classList.add('btn-toggle--selected');\n                document\n                    .getElementById('graphs-selector')\n                    .classList.remove('btn-toggle--selected');\n                this.selected = 'inputs';\n            }\n        });\n\n        // prevent rotate when over control or graphs\n        document\n            .getElementById('inputs-wrapper')\n            .addEventListener('mouseenter', () => {\n                this.rotateControl = false;\n            });\n\n        document\n            .getElementById('inputs-wrapper')\n            .addEventListener('mouseleave', () => {\n                this.rotateControl = true;\n            });\n\n        document.getElementById('inputs-wrapper').addEventListener('scroll', () => {\n            this.rotateControl = false;\n        });\n\n        document\n            .getElementById('inputs-wrapper')\n            .addEventListener('scrollend', () => {\n                this.rotateControl = true;\n            });\n\n        document\n            .getElementById('graphs-wrapper')\n            .addEventListener('mouseenter', () => {\n                this.rotateControl = false;\n            });\n\n        document\n            .getElementById('graphs-wrapper')\n            .addEventListener('mouseleave', () => {\n                this.rotateControl = true;\n            });\n\n        document\n            .getElementById('graphs-wrapper')\n            .addEventListener('scroll', () => {\n                this.rotateControl = false;\n        });\n\n        document\n            .getElementById('graphs-wrapper')\n            .addEventListener('scrollend', () => {\n                this.rotateControl = true;\n            });\n\n        document.querySelectorAll('input[type=\"range\"]').forEach((slider) => {\n            slider.addEventListener('pointerdown', (e) => {\n                e.stopPropagation();\n                this.rotateControl = false;\n            });\n            slider.addEventListener('pointerup', (e) => {\n                this.rotateControl = true;\n            });\n        });\n\n        // play / pause simulation based on visibility API\n        document.addEventListener('visibilitychange', (e) => {\n            if (document.visibilityState == 'visible') {\n                this.togglePause(false);\n            } else {\n                this.togglePause(true);\n            }\n        });\n    }\n\n    simSetup(p, stopLoading) { // 3d sim setup wrapper\n        // disable p5 error system\n        p.disableFriendlyErrors = true;\n\n        // add basic controls\n        this.controlWrapper.innerHTML = '';\n        this.runBtn = new _Controls_ResetButton__WEBPACK_IMPORTED_MODULE_0__.ResetButton(\n            this.controlWrapper,\n            (() => this.simSetup(p, stopLoading)).bind(this),\n        );\n\n        // render pause button if simulation is continuous\n        if (!this.isStatic) {\n            this.pauseBtn = new _Controls_PauseButton__WEBPACK_IMPORTED_MODULE_1__.PauseButton(\n                this.controlWrapper,\n                this.togglePause.bind(this),\n            );\n        }\n\n        // make canvas\n        this.width = window.innerWidth;\n        this.height = window.innerHeight;\n        this.canvas = p.createCanvas(\n            this.width,\n            this.height,\n            p.WEBGL,\n            this.container,\n        );\n\n        this.paused = false;\n        p.frameRate(30);\n\n        // run simulation init code\n        this.init(p);\n\n        // disable loading screen\n        stopLoading();\n    }\n\n    init(p) {\n        // initial simulation logic\n        throw new Error('init() must be implemented by subclass');\n    }\n\n    simDraw(p) { // p5 draw wrapper\n        p.background(0);\n        this.frame(p);\n    }\n\n    frame(p) {\n        // frame simulation logic\n        throw new Error('frame() must be implemented by subclass');\n    }\n\n    togglePause(paused = null) {\n        if (typeof paused !== Boolean) {\n            paused = !this.paused;\n        }\n\n        this.paused = paused;\n    }\n\n    handleResize(p) { // resize sketch based on window change\n        this.width = window.innerWidth;\n        this.height = window.innerHeight;\n        p.resizeCanvas(this.width, this.height);\n    }\n\n    makeGraph() {\n        // return graph div with correct styling\n        let element = document.createElement('canvas');\n        this.graphWrapper.append(element);\n        element.classList.add('graph');\n        return element;\n    }\n}\n\n\n//# sourceURL=webpack://physicsim/./src/Simulations/ThreeDSimulation.js?");

/***/ }),

/***/ "./src/Simulations/TwoDSimulation.js":
/*!*******************************************!*\
  !*** ./src/Simulations/TwoDSimulation.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TwoDSimulation: () => (/* binding */ TwoDSimulation)\n/* harmony export */ });\n/* harmony import */ var _Controls_ResetButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controls/ResetButton */ \"./src/Controls/ResetButton.js\");\n/* harmony import */ var _Controls_PauseButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Controls/PauseButton */ \"./src/Controls/PauseButton.js\");\n\n\n\nclass TwoDSimulation {\n    constructor(\n        container,\n        inputs,\n        controls,\n        attributes,\n        isStatic = false,\n        noReset = false\n    ) {\n        // add containers and pause functionality\n        this.paused = false;\n        this.container = container;\n        this.inputWrapper = inputs;\n        this.controlWrapper = controls;\n        this.attributeWrapper = attributes;\n        this.isStatic = isStatic;\n        this.noReset = noReset;\n    }\n\n    setup(stopLoading) {\n        // disable loading screen\n        stopLoading();\n\n        // disable pause\n        this.paused = false;\n\n        // add basic controls\n        this.controlWrapper.innerHTML = '';\n\n        if (!this.noReset) {\n            this.runBtn = new _Controls_ResetButton__WEBPACK_IMPORTED_MODULE_0__.ResetButton(\n                this.controlWrapper,\n                (() => this.setup(stopLoading)).bind(this),\n            );\n        }\n\n        // render pause button if simulation is continuous\n        if (!this.isStatic) {\n            this.pauseBtn = new _Controls_PauseButton__WEBPACK_IMPORTED_MODULE_1__.PauseButton(\n                this.controlWrapper,\n                this.togglePause.bind(this),\n            );\n        }\n\n        // run simulation init code\n        this.init();\n    }\n\n    init() {\n        // initial simulation logic\n        throw new Error('init() must be implemented by subclass');\n    }\n\n    togglePause(paused = null) {\n        if (typeof paused !== Boolean) {\n            paused = !this.paused;\n        }\n\n        this.paused = paused;\n    }\n}\n\n\n//# sourceURL=webpack://physicsim/./src/Simulations/TwoDSimulation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! page */ \"./node_modules/page/page.js\");\n/* harmony import */ var page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_lib_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/lib.css */ \"./src/styles/lib.css\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles.css */ \"./src/styles/styles.css\");\n/* harmony import */ var _Simulations_ThreeDSimulation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Simulations/ThreeDSimulation */ \"./src/Simulations/ThreeDSimulation.js\");\n/* harmony import */ var _Simulations_TwoDSimulation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Simulations/TwoDSimulation */ \"./src/Simulations/TwoDSimulation.js\");\n\n\n// import css\n\n\n\n\n\n// loading logic\nlet isLoading = true;\nlet loadingTexts = [\n    'Setting quantum state...',\n    'Accelerating protons!',\n    'Diffracting light...',\n    'Light: A wave or a particle?',\n    'Checking conservation of momentum...',\n    'Checking Newton\\'s Laws...',\n    'Reading up on Snell\\'s Law...',\n    'Correcting for parallax...',\n];\n\nfunction isSubclassOf(ClassA, ClassB) {\n    // get the prototype of ClassA\n    const protoA = Object.getPrototypeOf(ClassA.prototype);\n    \n    // check if the prototype of ClassA is ClassB.prototype\n    return protoA === ClassB.prototype;\n  }\n\nfunction updateLoading(textElement) {\n    // update loading text with a random statement from loadingTexts\n    if (!isLoading) return;\n    const randomIndex = Math.floor(Math.random() * loadingTexts.length);\n    const text = loadingTexts[randomIndex];\n    textElement.innerHTML = text;\n    setTimeout(() => updateLoading(textElement), 500);\n}\n\nfunction stopLoading() {\n    // close loading screen when triggered by setup() in sim\n    if (!isLoading) return;\n    isLoading = false;\n    document.getElementById('body').firstElementChild.remove();\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const loadingText = document.getElementById('loading-txt');\n    updateLoading(loadingText);\n});\n\nfunction loadSim(Sim, title, description = null, hasControls = true, hasGraphs = true) {\n    // set header & tab title\n    document.getElementById('header-title').innerHTML = title;\n    document.getElementById('tab-title').innerHTML =\n        `Physicsim (${title.split('(')[0].trim()})`;\n\n    if (description) {\n        document.getElementById('description').innerText = description;\n    }\n\n    // switch between 2 & 3d logic\n    if (isSubclassOf(Sim, _Simulations_ThreeDSimulation__WEBPACK_IMPORTED_MODULE_3__.ThreeDSimulation)) { // 3d logic\n        // init sim\n        const sim = new Sim(\n            document.getElementById('sim-wrapper'),\n            document.getElementById('inputs-container'),\n            document.getElementById('graphs-wrapper'),\n            document.getElementById('ctrl-wrapper'),\n            document.getElementById('attr-wrapper')\n        );\n\n        sim.setup(stopLoading)\n    }\n\n    if (isSubclassOf(Sim, _Simulations_TwoDSimulation__WEBPACK_IMPORTED_MODULE_4__.TwoDSimulation)) { // 2d logic\n        // init simulation\n        console.log('running...')\n        const sim = new Sim(\n            document.getElementById('sim-wrapper'),\n            document.getElementById('inputs-container'),\n            document.getElementById('ctrl-wrapper'),\n            document.getElementById('attr-wrapper')\n        );\n\n        sim.setup(stopLoading);\n    }\n\n    // remove / add buttons based on sim settings\n    if (hasControls == false) {\n        document.getElementById('inputs-selector').style.display = 'none';\n    }\n\n    if (hasGraphs == false) {\n        document.getElementById('graphs-selector').style.display = 'none';\n    }\n\n    // prompt hider\n    document.getElementById('hide-btn').addEventListener('click', () => {\n        let header = document.getElementById('header-wrapper');\n        let btn = document.getElementById('hide-btn-img');\n\n        if (header.style.display == 'none') {\n            header.style.display = 'block';\n            btn.src = '/static/prompt-close.png';\n        } else {\n            header.style.display = 'none';\n            btn.src = '/static/prompt-open.png';\n        }\n    });\n\n\n}\n\n// routing system and chunk loading system\npage__WEBPACK_IMPORTED_MODULE_0___default()('/nuclear-decay', () => {\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_chart_js_auto_auto_js\"), __webpack_require__.e(\"src_Simulations_NuclearDecaySimulation_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/NuclearDecaySimulation */ \"./src/Simulations/NuclearDecaySimulation.js\")).then((module) => {\n        loadSim(\n            module.default,\n            'Nuclear Decay',\n            'This simulation models the randomness within nuclear decay. Change the starting number of nuclei to see how the exponential model of decay becomes more accurate as the number of nuclei becomes statistically significant.',\n            false,\n            false\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/wave-interference', () => {\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_p5_lib_addons_p5_sound_js\"), __webpack_require__.e(\"src_Simulations_InterferenceSimulation_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/InterferenceSimulation */ \"./src/Simulations/InterferenceSimulation.js\")).then((module) => {\n        loadSim(\n            module.default,\n            'Wave Interference',\n            'This simulation shows how interference of waves occurs as the path difference between two sources changes as an observer moves between them. Drag around on the simulation pane to manually move the observer.',\n            false,\n            false\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/collisions', () => {\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_chart_js_auto_auto_js\"), __webpack_require__.e(\"src_Simulations_CollisionsSimulation_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/CollisionsSimulation */ \"./src/Simulations/CollisionsSimulation.js\")).then((module) => {\n        loadSim(\n            module.default, \n            'Collisions',\n            'This simulation models 3d collisions. Download the data to check that conservation of momentum occurs in all dimensions: x, y and z.'\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/circular-motion', () => {\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_chart_js_auto_auto_js\"), __webpack_require__.e(\"src_Simulations_CircularMotionSimulation_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/CircularMotionSimulation */ \"./src/Simulations/CircularMotionSimulation.js\")).then((module) => {\n        loadSim(\n            module.default, \n            'Circular Motion',\n            'This simulation shows circular motion and how it is linked to simple harmonic motion.'\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/projectile-motion', () => {\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_chart_js_auto_auto_js\"), __webpack_require__.e(\"src_Simulations_ProjectileSimulation_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/ProjectileSimulation */ \"./src/Simulations/ProjectileSimulation.js\")).then((module) => {\n        loadSim(\n            module.default, \n            'Projectile Motion',\n            'This simulation shows displacement, velocity and acceleration time graphs for the vertical motion of a projectile under earth\\'s gravitational field assuming g = 9.81 N/kg.'\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/snells-law', () => {\n    __webpack_require__.e(/*! import() */ \"src_Simulations_SnellsLawSimulation_SnellsLawSimulation_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/SnellsLawSimulation/SnellsLawSimulation */ \"./src/Simulations/SnellsLawSimulation/SnellsLawSimulation.js\")).then(\n        (module) => {\n            loadSim(module.default, 'Snell\\'s Law');\n        },\n    );\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/cyclotron', () => {\n    Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_chart_js_auto_auto_js\"), __webpack_require__.e(\"src_Simulations_CyclotronSimulation_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/CyclotronSimulation */ \"./src/Simulations/CyclotronSimulation.js\")).then((module) => {\n        loadSim(\n            module.default, \n            'Cyclotron (Non-Relativistic)',\n            'This simulation showcases the acceleration of the cyclotron and the paths of different charged particles.'\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('/alpha-scattering', () => {\n    __webpack_require__.e(/*! import() */ \"src_Simulations_ScatteringSimulation_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./Simulations/ScatteringSimulation */ \"./src/Simulations/ScatteringSimulation.js\")).then((module) => {\n        loadSim(\n            module.default,\n            'Alpha Particle Scattering', \n            'This simulation provides an idealistic model for the alpha particle scattering experiment, showing how alpha particles at different distances from a nucleus are deflected.', \n            true, \n            false\n        );\n    });\n});\n\npage__WEBPACK_IMPORTED_MODULE_0___default()('*', () => {\n    window.location.href = 'https://physicsim.co.uk';\n});\n\n// start router\npage__WEBPACK_IMPORTED_MODULE_0___default()();\n\n//# sourceURL=webpack://physicsim/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + {"vendors-node_modules_chart_js_auto_auto_js":"a9bbc68ba5c558325a46","src_Simulations_NuclearDecaySimulation_js":"5aac751ec0b41b963826","vendors-node_modules_p5_lib_addons_p5_sound_js":"b1e3c2e082d4b0d23b5a","src_Simulations_InterferenceSimulation_js":"b773a96342c5c8039715","src_Simulations_CollisionsSimulation_js":"20c5b0d19427913dad10","src_Simulations_CircularMotionSimulation_js":"77540ea99e57b94a1680","src_Simulations_ProjectileSimulation_js":"0be3d985c4e94e0d268d","src_Simulations_SnellsLawSimulation_SnellsLawSimulation_js":"5186869798a875ac04bf","src_Simulations_CyclotronSimulation_js":"9cd64713d35f00c723e0","src_Simulations_ScatteringSimulation_js":"3e31d86e0c588a0da8c6"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "physicsim:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkphysicsim"] = self["webpackChunkphysicsim"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_noSo-ba4995"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;