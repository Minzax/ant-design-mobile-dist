"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nativeProps = require("../../utils/native-props");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withDefaultProps = require("../../utils/with-default-props");

var _arrowLeft = require("./arrow-left");

var _arrowLeftDouble = require("./arrow-left-double");

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = 'adm-calendar';
var defaultProps = {
  weekStartsOn: 'Sunday'
};

var Calendar = function Calendar(p) {
  var today = (0, _dayjs["default"])();
  var props = (0, _withDefaultProps.mergeProps)(defaultProps, p);

  var _useConfig = (0, _configProvider.useConfig)(),
      locale = _useConfig.locale;

  var markItems = [].concat(locale.Calendar.markItems);

  if (props.weekStartsOn === 'Sunday') {
    var item = markItems.pop();
    if (item) markItems.unshift(item);
  }

  var _useState = (0, _react.useState)(function () {
    return (0, _dayjs["default"])().date(1);
  }),
      current = _useState[0],
      setCurrent = _useState[1];

  var header = /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-header"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: classPrefix + "-arrow-button",
    onClick: function onClick() {
      setCurrent(current.subtract(1, 'year'));
    }
  }, /*#__PURE__*/_react["default"].createElement(_arrowLeftDouble.ArrowLeftDouble, null)), /*#__PURE__*/_react["default"].createElement("a", {
    className: classPrefix + "-arrow-button",
    onClick: function onClick() {
      setCurrent(current.subtract(1, 'month'));
    }
  }, /*#__PURE__*/_react["default"].createElement(_arrowLeft.ArrowLeft, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-title"
  }, locale.Calendar.renderYearAndMonth(current.year(), current.month() + 1)), /*#__PURE__*/_react["default"].createElement("a", {
    className: classPrefix + "-arrow-button " + classPrefix + "-arrow-button-right",
    onClick: function onClick() {
      setCurrent(current.add(1, 'month'));
    }
  }, /*#__PURE__*/_react["default"].createElement(_arrowLeft.ArrowLeft, null)), /*#__PURE__*/_react["default"].createElement("a", {
    className: classPrefix + "-arrow-button " + classPrefix + "-arrow-button-right",
    onClick: function onClick() {
      setCurrent(current.add(1, 'year'));
    }
  }, /*#__PURE__*/_react["default"].createElement(_arrowLeftDouble.ArrowLeftDouble, null)));

  var dateRange = (0, _react.useMemo)(function () {
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

  var _useState2 = (0, _react.useState)(null),
      begin = _useState2[0],
      setBegin = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      end = _useState3[0],
      setEnd = _useState3[1];

  (0, _react.useLayoutEffect)(function () {
    setBegin(dateRange[0] ? (0, _dayjs["default"])(dateRange[0]) : null);
    setEnd(dateRange[1] ? (0, _dayjs["default"])(dateRange[1]) : null);
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
      cells.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: d.valueOf(),
        className: (0, _classnames["default"])(classPrefix + "-cell", inThisMonth ? classPrefix + "-cell-in" : classPrefix + "-cell-out", inThisMonth && (_ref = {}, _ref[classPrefix + "-cell-today"] = d.isSame(today, 'day'), _ref[classPrefix + "-cell-selected"] = isSelect, _ref[classPrefix + "-cell-selected-begin"] = isSelect && d.isSame(begin, 'day'), _ref[classPrefix + "-cell-selected-end"] = isSelect && (!end || d.isSame(end, 'day')), _ref)),
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
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classPrefix + "-cell-top"
      }, d.date()), /*#__PURE__*/_react["default"].createElement("div", {
        className: classPrefix + "-cell-bottom"
      }, (_a = props.renderLabel) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate()))));
      iterator = iterator.add(1, 'day');
    };

    while (cells.length < 6 * 7) {
      _loop();
    }

    return cells;
  }

  var body = /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-cells"
  }, renderCells());

  var mark = /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix + "-mark"
  }, markItems.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: item,
      className: classPrefix + "-mark-cell"
    }, item);
  }));

  return (0, _nativeProps.withNativeProps)(props, /*#__PURE__*/_react["default"].createElement("div", {
    className: classPrefix
  }, header, mark, body));
};

exports.Calendar = Calendar;