"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIconComponent = createIconComponent;

function createIconComponent(svg) {
  var Icon = function Icon() {
    return svg;
  };

  return Icon;
}