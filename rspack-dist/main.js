(function() {
var __webpack_modules__ = {
"./src/answer.js?raw": function (module, exports, __webpack_require__) {
module.exports = "export const answer = 42;\n";},
"./src/index.js": function (module, exports, __webpack_require__) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _answerjsraw = __webpack_require__("./src/answer.js?raw");
function render() {
    document.getElementById('root').innerHTML = `The answer to the universe is ${_answerjsraw.answer}.`;
}
render();
},

}
// The module cache
 var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
// Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
      return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
       exports: {} 
      });
      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
// Return the exports of the module
 return module.exports;

}
var __webpack_exports__ = __webpack_require__('./src/index.js');

})();
