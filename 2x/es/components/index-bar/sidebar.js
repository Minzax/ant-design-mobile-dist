import React, { useState } from 'react';
import classNames from 'classnames';
var classPrefix = "adm-index-bar";
export var Sidebar = function Sidebar(props) {
  var _classNames;

  var _useState = useState(false),
      interacting = _useState[0],
      setInteracting = _useState[1];

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix + "-sidebar", (_classNames = {}, _classNames[classPrefix + "-sidebar-interacting"] = interacting, _classNames)),
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
    return /*#__PURE__*/React.createElement("div", {
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
    }, interacting && active && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-sidebar-bubble"
    }, index), /*#__PURE__*/React.createElement("div", {
      className: classNames(classPrefix + "-sidebar-item", (_classNames2 = {}, _classNames2[classPrefix + "-sidebar-item-active"] = active, _classNames2)),
      "data-index": index
    }, /*#__PURE__*/React.createElement("div", null, index)));
  }));
};