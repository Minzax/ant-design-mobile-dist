import React, { useLayoutEffect, useMemo, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { mergeProps } from '../../utils/with-default-props';
import { ArrowLeft } from './arrow-left';
import { ArrowLeftDouble } from './arrow-left-double';
import { useConfig } from '../config-provider';
var classPrefix = 'adm-calendar';
var defaultProps = {
  weekStartsOn: 'Sunday'
};
export var Calendar = function Calendar(p) {
  var today = dayjs();
  var props = mergeProps(defaultProps, p);

  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var markItems = [].concat(locale.Calendar.markItems);

  if (props.weekStartsOn === 'Sunday') {
    var item = markItems.pop();
    if (item) markItems.unshift(item);
  }

  var _useState = useState(function () {
    return dayjs().date(1);
  }),
      current = _useState[0],
      setCurrent = _useState[1];

  var header = /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: classPrefix + "-arrow-button",
    onClick: function onClick() {
      setCurrent(current.subtract(1, 'year'));
    }
  }, /*#__PURE__*/React.createElement(ArrowLeftDouble, null)), /*#__PURE__*/React.createElement("a", {
    className: classPrefix + "-arrow-button",
    onClick: function onClick() {
      setCurrent(current.subtract(1, 'month'));
    }
  }, /*#__PURE__*/React.createElement(ArrowLeft, null)), /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-title"
  }, locale.Calendar.renderYearAndMonth(current.year(), current.month() + 1)), /*#__PURE__*/React.createElement("a", {
    className: classPrefix + "-arrow-button " + classPrefix + "-arrow-button-right",
    onClick: function onClick() {
      setCurrent(current.add(1, 'month'));
    }
  }, /*#__PURE__*/React.createElement(ArrowLeft, null)), /*#__PURE__*/React.createElement("a", {
    className: classPrefix + "-arrow-button " + classPrefix + "-arrow-button-right",
    onClick: function onClick() {
      setCurrent(current.add(1, 'year'));
    }
  }, /*#__PURE__*/React.createElement(ArrowLeftDouble, null)));
  var dateRange = useMemo(function () {
    var _a, _b, _c, _d;

    if (props.selectionMode === 'single') {
      var value = (_b = (_a = props.value) !== null && _a !== void 0 ? _a : props.defaultValue) !== null && _b !== void 0 ? _b : null;
      return [value, value];
    } else if (props.selectionMode === 'range') {
      return (_d = (_c = props.value) !== null && _c !== void 0 ? _c : props.defaultValue) !== null && _d !== void 0 ? _d : [null, null];
    } else {
      return [null, null];
    }
  }, [props.selectionMode, props.value, props.defaultValue]);

  var _useState2 = useState(null),
      begin = _useState2[0],
      setBegin = _useState2[1];

  var _useState3 = useState(null),
      end = _useState3[0],
      setEnd = _useState3[1];

  useLayoutEffect(function () {
    setBegin(dateRange[0] ? dayjs(dateRange[0]) : null);
    setEnd(dateRange[1] ? dayjs(dateRange[1]) : null);
  }, [dateRange[0], dateRange[1]]);

  function renderCells() {
    var _a;

    var cells = [];
    var iterator = current.subtract(current.isoWeekday(), 'day');

    if (props.weekStartsOn === 'Monday') {
      iterator = iterator.add(1, 'day');
    }

    var _loop = function _loop() {
      var _ref;

      var d = iterator;

      var isSelect = function () {
        if (!begin) return false;
        if (d.isSame(begin, 'day')) return true;
        if (!end) return false;
        if (d.isSame(end, 'day')) return true;
        return d.isAfter(begin, 'day') && d.isBefore(end, 'day');
      }();

      var inThisMonth = d.month() === current.month();
      cells.push( /*#__PURE__*/React.createElement("div", {
        key: d.valueOf(),
        className: classNames(classPrefix + "-cell", inThisMonth ? classPrefix + "-cell-in" : classPrefix + "-cell-out", inThisMonth && (_ref = {}, _ref[classPrefix + "-cell-today"] = d.isSame(today, 'day'), _ref[classPrefix + "-cell-selected"] = isSelect, _ref[classPrefix + "-cell-selected-begin"] = isSelect && d.isSame(begin, 'day'), _ref[classPrefix + "-cell-selected-end"] = isSelect && (!end || d.isSame(end, 'day')), _ref)),
        onClick: function onClick() {
          var _a, _b, _c;

          if (!props.selectionMode) return;

          if (props.selectionMode === 'single') {
            setBegin(d);
            setEnd(d);
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate());
          } else if (props.selectionMode === 'range') {
            if (begin !== null && end === null) {
              if (d.isBefore(begin)) {
                setEnd(begin);
                setBegin(d);
                (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, [d.toDate(), begin.toDate()]);
              } else {
                setEnd(d);
                (_c = props.onChange) === null || _c === void 0 ? void 0 : _c.call(props, [begin.toDate(), d.toDate()]);
              }
            } else {
              setBegin(d);
              setEnd(null);
            }
          }

          if (!inThisMonth) {
            setCurrent(d.clone().date(1));
          }
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: classPrefix + "-cell-top"
      }, d.date()), /*#__PURE__*/React.createElement("div", {
        className: classPrefix + "-cell-bottom"
      }, (_a = props.renderLabel) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate()))));
      iterator = iterator.add(1, 'day');
    };

    while (cells.length < 6 * 7) {
      _loop();
    }

    return cells;
  }

  var body = /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-cells"
  }, renderCells());
  var mark = /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-mark"
  }, markItems.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item,
      className: classPrefix + "-mark-cell"
    }, item);
  }));
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, header, mark, body));
};