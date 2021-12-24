"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-index-bar";

var Sidebar = function Sidebar(props) {
  var _classNames;

  var _useState = (0, _react.useState)(false),
      interacting = _useState[0],
      setInteracting = _useState[1];

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix + "-sidebar", (_classNames = {}, _classNames[classPrefix + "-sidebar-interacting"] = interacting, _classNames)),
    onMouseDown: function onMouseDown() {
      setInteracting(true);
    },
    onMouseUp: function onMouseUp() {
      setInteracting(false);
    },
    onTouchStart: function onTouchStart() {
      setInteracting(true);
    },
    onTouchEnd: function onTouchEnd() {
      setInteracting(false);
    },
    onTouchMove: function onTouchMove(e) {
      if (!interacting) return;
      var _e$touches$ = e.touches[0],
          clientX = _e$touches$.clientX,
          clientY = _e$touches$.clientY;
      var target = document.elementFromPoint(clientX, clientY);
      if (!target) return;
      var index = target.dataset['index'];

      if (index) {
        props.onActive(index);
      }
    }
  }, props.indexes.map(function (index) {
    var _classNames2;

    var active = index === props.activeIndex;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-sidebar-row",
      onMouseDown: function onMouseDown() {
        props.onActive(index);
      },
      onTouchStart: function onTouchStart() {
        props.onActive(index);
      },
      onMouseEnter: function onMouseEnter() {
        if (interacting) {
          props.onActive(index);
        }
      },
      "data-index": index,
      key: index
    }, interacting && active && /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-sidebar-bubble"
    }, index), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(classPrefix + "-sidebar-item", (_classNames2 = {}, _classNames2[classPrefix + "-sidebar-item-active"] = active, _classNames2)),
      "data-index": index
    }, /*#__PURE__*/_react["default"].createElement("div", null, index)));
  }));
};

exports.Sidebar = Sidebar;