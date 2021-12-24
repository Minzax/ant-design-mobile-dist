"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTouch = useTouch;

var _react = require("react");

var MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

function useTouch() {
  var startX = (0, _react.useRef)(0);
  var startY = (0, _react.useRef)(0);
  var deltaX = (0, _react.useRef)(0);
  var deltaY = (0, _react.useRef)(0);
  var offsetX = (0, _react.useRef)(0);
  var offsetY = (0, _react.useRef)(0);
  var direction = (0, _react.useRef)('');

  var isVertical = function isVertical() {
    return direction.current === 'vertical';
  };

  var isHorizontal = function isHorizontal() {
    return direction.current === 'horizontal';
  };

  var reset = function reset() {
    deltaX.current = 0;
    deltaY.current = 0;
    offsetX.current = 0;
    offsetY.current = 0;
    direction.current = '';
  };

  var start = function start(event) {
    reset();
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
  };

  var move = function move(event) {
    var touch = event.touches[0]; // Fix: Safari back will set clientX to negative number

    deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;
    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);

    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current);
    }
  };

  return {
    move: move,
    start: start,
    reset: reset,
    startX: startX,
    startY: startY,
    deltaX: deltaX,
    deltaY: deltaY,
    offsetX: offsetX,
    offsetY: offsetY,
    direction: direction,
    isVertical: isVertical,
    isHorizontal: isHorizontal
  };
}