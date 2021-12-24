import React, { memo, useLayoutEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { convertPx } from '../../utils/convert-px';
import { rubberbandIfOutOfBounds } from '../../utils/rubberband';
import { bound } from '../../utils/bound';
import isEqual from 'lodash/isEqual';
var classPrefix = "adm-picker-view";
export var Column = /*#__PURE__*/memo(function (props) {
  var itemHeight = convertPx(34);
  var value = props.value,
      column = props.column;

  function onSelect(val) {
    props.onSelect(val, props.index);
  }

  var _useSpring = useSpring(function () {
    return {
      from: {
        y: 0
      },
      config: {
        tension: 400,
        mass: 0.8
      }
    };
  }),
      y = _useSpring[0].y,
      api = _useSpring[1];

  var draggingRef = useRef(false);
  useLayoutEffect(function () {
    if (draggingRef.current) return;
    if (!value) return;
    var targetIndex = column.findIndex(function (item) {
      return item.value === value;
    });
    if (targetIndex < 0) return;
    var finalPosition = targetIndex * -itemHeight;
    api.start({
      y: finalPosition,
      immediate: y.goal !== finalPosition
    });
  }, [value, column]);
  useLayoutEffect(function () {
    if (column.length === 0) {
      if (value !== null) {
        onSelect(null);
      }
    } else {
      if (!column.some(function (item) {
        return item.value === value;
      })) {
        var firstItem = column[0];
        onSelect(firstItem.value);
      }
    }
  }, [column, value]);

  function scrollSelect(index) {
    var finalPosition = index * -itemHeight;
    api.start({
      y: finalPosition
    });
    onSelect(column[index].value);
  }

  var bind = useDrag(function (state) {
    draggingRef.current = true;
    var min = -((column.length - 1) * itemHeight);
    var max = 0;

    if (state.last) {
      draggingRef.current = false;
      var position = state.offset[1] + state.velocity[1] * state.direction[1] * 50;
      var targetIndex = -Math.round(bound(position, min, max) / itemHeight);
      scrollSelect(targetIndex);
    } else {
      var _position = state.offset[1];
      api.start({
        y: rubberbandIfOutOfBounds(_position, min, max, itemHeight * 50, 0.2)
      });
    }
  }, {
    axis: 'y',
    from: function from() {
      return [0, y.get()];
    },
    filterTaps: true,
    pointer: {
      touch: true
    }
  });
  var selectedIndex = null;

  function renderAccessible() {
    if (selectedIndex === null) {
      return null;
    }

    var current = column[selectedIndex];
    var previousIndex = selectedIndex - 1;
    var nextIndex = selectedIndex + 1;
    var previous = column[previousIndex];
    var next = column[nextIndex];
    return /*#__PURE__*/React.createElement("div", {
      className: 'adm-picker-view-column-accessible'
    }, /*#__PURE__*/React.createElement("div", {
      className: 'adm-picker-view-column-accessible-current',
      role: 'button',
      "aria-label": current ? "\u5F53\u524D\u9009\u62E9\u7684\u662F\uFF1A" + current.label : '当前未选择'
    }, "-"), /*#__PURE__*/React.createElement("div", null, previous && /*#__PURE__*/React.createElement("div", {
      className: 'adm-picker-view-column-accessible-button',
      onClick: function onClick() {
        scrollSelect(previousIndex);
      },
      role: 'button',
      "aria-label": "\u9009\u62E9\u4E0A\u4E00\u9879\uFF1A" + previous.label
    }, "-")), /*#__PURE__*/React.createElement("div", null, next && /*#__PURE__*/React.createElement("div", {
      className: 'adm-picker-view-column-accessible-button',
      onClick: function onClick() {
        scrollSelect(nextIndex);
      },
      role: 'button',
      "aria-label": "\u9009\u62E9\u4E0B\u4E00\u9879\uFF1A" + next.label
    }, "-")));
  }

  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classPrefix + "-column"
  }, bind()), /*#__PURE__*/React.createElement(animated.div, {
    style: {
      y: y
    },
    className: classPrefix + "-column-wheel",
    "aria-hidden": true
  }, column.map(function (item, index) {
    var selected = props.value === item.value;
    if (selected) selectedIndex = index;

    function handleClick() {
      draggingRef.current = false;
      scrollSelect(index);
    }

    return /*#__PURE__*/React.createElement("div", {
      key: item.value,
      "data-selected": item.value === value,
      className: classPrefix + "-column-item",
      onClick: handleClick,
      "aria-hidden": !selected,
      "aria-label": selected ? 'active' : ''
    }, /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-column-item-label"
    }, item.label));
  })), renderAccessible());
}, function (prev, next) {
  if (prev.value !== next.value) return false;
  if (prev.onSelect !== next.onSelect) return false;

  if (!isEqual(prev.column, next.column)) {
    return false;
  }

  return true;
});
Column.displayName = 'Column';