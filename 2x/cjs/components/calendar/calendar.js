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

var _isoWeek = _interopRequireDefault(require("dayjs/plugin/isoWeek"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dayjs.default.extend(_isoWeek.default);

const classPrefix = 'adm-calendar';
const defaultProps = {
  weekStartsOn: 'Sunday'
};

const Calendar = p => {
  const today = (0, _dayjs.default)();
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const {
    locale
  } = (0, _configProvider.useConfig)();
  const markItems = [...locale.Calendar.markItems];

  if (props.weekStartsOn === 'Sunday') {
    const item = markItems.pop();
    if (item) markItems.unshift(item);
  }

  const [current, setCurrent] = (0, _react.useState)(() => (0, _dayjs.default)().date(1));

  const header = _react.default.createElement("div", {
    className: `${classPrefix}-header`
  }, _react.default.createElement("a", {
    className: `${classPrefix}-arrow-button`,
    onClick: () => {
      setCurrent(current.subtract(1, 'year'));
    }
  }, _react.default.createElement(_arrowLeftDouble.ArrowLeftDouble, null)), _react.default.createElement("a", {
    className: `${classPrefix}-arrow-button`,
    onClick: () => {
      setCurrent(current.subtract(1, 'month'));
    }
  }, _react.default.createElement(_arrowLeft.ArrowLeft, null)), _react.default.createElement("div", {
    className: `${classPrefix}-title`
  }, locale.Calendar.renderYearAndMonth(current.year(), current.month() + 1)), _react.default.createElement("a", {
    className: `${classPrefix}-arrow-button ${classPrefix}-arrow-button-right`,
    onClick: () => {
      setCurrent(current.add(1, 'month'));
    }
  }, _react.default.createElement(_arrowLeft.ArrowLeft, null)), _react.default.createElement("a", {
    className: `${classPrefix}-arrow-button ${classPrefix}-arrow-button-right`,
    onClick: () => {
      setCurrent(current.add(1, 'year'));
    }
  }, _react.default.createElement(_arrowLeftDouble.ArrowLeftDouble, null)));

  const dateRange = (0, _react.useMemo)(() => {
    var _a, _b, _c, _d;

    if (props.selectionMode === 'single') {
      const value = (_b = (_a = props.value) !== null && _a !== void 0 ? _a : props.defaultValue) !== null && _b !== void 0 ? _b : null;
      return [value, value];
    } else if (props.selectionMode === 'range') {
      return (_d = (_c = props.value) !== null && _c !== void 0 ? _c : props.defaultValue) !== null && _d !== void 0 ? _d : [null, null];
    } else {
      return [null, null];
    }
  }, [props.selectionMode, props.value, props.defaultValue]);
  const [begin, setBegin] = (0, _react.useState)(null);
  const [end, setEnd] = (0, _react.useState)(null);
  (0, _react.useLayoutEffect)(() => {
    setBegin(dateRange[0] ? (0, _dayjs.default)(dateRange[0]) : null);
    setEnd(dateRange[1] ? (0, _dayjs.default)(dateRange[1]) : null);
  }, [dateRange[0], dateRange[1]]);

  function renderCells() {
    var _a;

    const cells = [];
    let iterator = current.subtract(current.isoWeekday(), 'day');

    if (props.weekStartsOn === 'Monday') {
      iterator = iterator.add(1, 'day');
    }

    while (cells.length < 6 * 7) {
      const d = iterator;

      const isSelect = (() => {
        if (!begin) return false;
        if (d.isSame(begin, 'day')) return true;
        if (!end) return false;
        if (d.isSame(end, 'day')) return true;
        return d.isAfter(begin, 'day') && d.isBefore(end, 'day');
      })();

      const inThisMonth = d.month() === current.month();
      cells.push(_react.default.createElement("div", {
        key: d.valueOf(),
        className: (0, _classnames.default)(`${classPrefix}-cell`, inThisMonth ? `${classPrefix}-cell-in` : `${classPrefix}-cell-out`, inThisMonth && {
          [`${classPrefix}-cell-today`]: d.isSame(today, 'day'),
          [`${classPrefix}-cell-selected`]: isSelect,
          [`${classPrefix}-cell-selected-begin`]: isSelect && d.isSame(begin, 'day'),
          [`${classPrefix}-cell-selected-end`]: isSelect && (!end || d.isSame(end, 'day'))
        }),
        onClick: () => {
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
      }, _react.default.createElement("div", {
        className: `${classPrefix}-cell-top`
      }, d.date()), _react.default.createElement("div", {
        className: `${classPrefix}-cell-bottom`
      }, (_a = props.renderLabel) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate()))));
      iterator = iterator.add(1, 'day');
    }

    return cells;
  }

  const body = _react.default.createElement("div", {
    className: `${classPrefix}-cells`
  }, renderCells());

  const mark = _react.default.createElement("div", {
    className: `${classPrefix}-mark`
  }, markItems.map(item => _react.default.createElement("div", {
    key: item,
    className: `${classPrefix}-mark-cell`
  }, item)));

  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix
  }, header, mark, body));
};

exports.Calendar = Calendar;