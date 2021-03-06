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

var _ahooks = require("ahooks");

var _usePropsValue = require("../../utils/use-props-value");

var _convert = require("./convert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dayjs.default.extend(_isoWeek.default);

const classPrefix = 'adm-calendar';
const defaultProps = {
  weekStartsOn: 'Sunday',
  defaultValue: null,
  allowClear: true
};
const Calendar = (0, _react.forwardRef)((p, ref) => {
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

  const [dateRange, setDateRange] = (0, _usePropsValue.usePropsValue)({
    value: props.value === undefined ? undefined : (0, _convert.convertValueToRange)(props.selectionMode, props.value),
    defaultValue: (0, _convert.convertValueToRange)(props.selectionMode, props.defaultValue),
    onChange: v => {
      var _a, _b;

      if (props.selectionMode === 'single') {
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v ? v[0] : null);
      } else if (props.selectionMode === 'range') {
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, v);
      }
    }
  });
  const [intermediate, setIntermediate] = (0, _react.useState)(false);
  const [current, setCurrent] = (0, _react.useState)(() => (0, _dayjs.default)(dateRange ? dateRange[0] : today).date(1));
  (0, _ahooks.useUpdateEffect)(() => {
    var _a;

    (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, current.year(), current.month() + 1);
  }, [current]);
  (0, _react.useImperativeHandle)(ref, () => ({
    jumpTo: pageOrPageGenerator => {
      let page;

      if (typeof pageOrPageGenerator === 'function') {
        page = pageOrPageGenerator({
          year: current.year(),
          month: current.month() + 1
        });
      } else {
        page = pageOrPageGenerator;
      }

      setCurrent((0, _dayjs.default)().year(page.year).month(page.month - 1).date(1));
    },
    jumpToToday: () => {
      setCurrent((0, _dayjs.default)().date(1));
    }
  }));

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

  function renderCells() {
    var _a;

    const cells = [];
    let iterator = current.subtract(current.isoWeekday(), 'day');

    if (props.weekStartsOn === 'Monday') {
      iterator = iterator.add(1, 'day');
    }

    while (cells.length < 6 * 7) {
      const d = iterator;
      let isSelect = false;
      let isBegin = false;
      let isEnd = false;

      if (dateRange) {
        const [begin, end] = dateRange;
        isBegin = d.isSame(begin, 'day');
        isEnd = d.isSame(end, 'day');
        isSelect = isBegin || isEnd || d.isAfter(begin, 'day') && d.isBefore(end, 'day');
      }

      const inThisMonth = d.month() === current.month();
      cells.push(_react.default.createElement("div", {
        key: d.valueOf(),
        className: (0, _classnames.default)(`${classPrefix}-cell`, inThisMonth ? `${classPrefix}-cell-in` : `${classPrefix}-cell-out`, inThisMonth && {
          [`${classPrefix}-cell-today`]: d.isSame(today, 'day'),
          [`${classPrefix}-cell-selected`]: isSelect,
          [`${classPrefix}-cell-selected-begin`]: isBegin,
          [`${classPrefix}-cell-selected-end`]: isEnd
        }),
        onClick: () => {
          if (!props.selectionMode) return;
          const date = d.toDate();

          if (!inThisMonth) {
            setCurrent(d.clone().date(1));
          }

          function shouldClear() {
            if (!props.allowClear) return false;
            if (!dateRange) return false;
            const [begin, end] = dateRange;
            return d.isSame(begin, 'date') && d.isSame(end, 'day');
          }

          if (props.selectionMode === 'single') {
            if (props.allowClear && shouldClear()) {
              setDateRange(null);
              return;
            }

            setDateRange([date, date]);
          } else if (props.selectionMode === 'range') {
            if (!dateRange) {
              setDateRange([date, date]);
              setIntermediate(true);
              return;
            }

            if (shouldClear()) {
              setDateRange(null);
              setIntermediate(false);
              return;
            }

            if (intermediate) {
              const another = dateRange[0];
              setDateRange(another > date ? [date, another] : [another, date]);
              setIntermediate(false);
            } else {
              setDateRange([date, date]);
              setIntermediate(true);
            }
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
});
exports.Calendar = Calendar;