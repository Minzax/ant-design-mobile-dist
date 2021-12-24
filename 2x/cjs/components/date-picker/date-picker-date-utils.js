"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDateToStringArray = convertDateToStringArray;
exports.convertStringArrayToDate = convertStringArrayToDate;
exports.defaultRenderLabel = defaultRenderLabel;
exports.generateDatePickerColumns = generateDatePickerColumns;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _isoWeek = _interopRequireDefault(require("dayjs/plugin/isoWeek"));

var _isoWeeksInYear = _interopRequireDefault(require("dayjs/plugin/isoWeeksInYear"));

var _isLeapYear = _interopRequireDefault(require("dayjs/plugin/isLeapYear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dayjs["default"].extend(_isoWeek["default"]);

_dayjs["default"].extend(_isoWeeksInYear["default"]);

_dayjs["default"].extend(_isLeapYear["default"]);

var precisionRankRecord = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function defaultRenderLabel(type, data) {
  switch (type) {
    case 'minute':
    case 'second':
    case 'hour':
      return ('0' + data.toString()).slice(-2);

    default:
      return data.toString();
  }
}

function generateDatePickerColumns(selected, min, max, precision, renderLabel, filter) {
  var ret = [];
  var minYear = min.getFullYear();
  var minMonth = min.getMonth() + 1;
  var minDay = min.getDate();
  var minHour = min.getHours();
  var minMinute = min.getMinutes();
  var minSecond = min.getSeconds();
  var maxYear = max.getFullYear();
  var maxMonth = max.getMonth() + 1;
  var maxDay = max.getDate();
  var maxHour = max.getHours();
  var maxMinute = max.getMinutes();
  var maxSecond = max.getSeconds();
  var rank = precisionRankRecord[precision];

  if (rank >= precisionRankRecord.year) {
    var years = [];

    for (var i = minYear; i <= maxYear; i++) {
      var value = i.toString();
      years.push({
        label: renderLabel ? renderLabel('year', i) : value,
        value: value
      });
    }

    ret.push(years);
  }

  var selectedYear = parseInt(selected[0]);
  var firstDayInSelectedMonth = (0, _dayjs["default"])(convertStringArrayToDate([selected[0], selected[1], '1']));
  var selectedMonth = parseInt(selected[1]);
  var selectedDay = parseInt(selected[2]);
  var selectedHour = parseInt(selected[3]);
  var selectedMinute = parseInt(selected[4]);
  var isInMinYear = selectedYear === minYear;
  var isInMaxYear = selectedYear === maxYear;
  var isInMinMonth = isInMinYear && selectedMonth === minMonth;
  var isInMaxMonth = isInMaxYear && selectedMonth === maxMonth;
  var isInMinDay = isInMinMonth && selectedDay === minDay;
  var isInMaxDay = isInMaxMonth && selectedDay === maxDay;
  var isInMinHour = isInMinDay && selectedHour === minHour;
  var isInMaxHour = isInMaxDay && selectedHour === maxHour;
  var isInMinMinute = isInMinHour && selectedMinute === minMinute;
  var isInMaxMinute = isInMaxHour && selectedMinute === maxMinute;

  var generateColumn = function generateColumn(from, to, precision) {
    var column = [];

    for (var _i = from; _i <= to; _i++) {
      column.push(_i);
    }

    var prefix = selected.slice(0, precisionRankRecord[precision]);
    var currentFilter = filter === null || filter === void 0 ? void 0 : filter[precision];

    if (currentFilter && typeof currentFilter === 'function') {
      column = column.filter(function (i) {
        return currentFilter(i, {
          get date() {
            var stringArray = [].concat(prefix, [i.toString()]);
            return convertStringArrayToDate(stringArray);
          }

        });
      });
    }

    return column;
  };

  if (rank >= precisionRankRecord.month) {
    var lower = isInMinYear ? minMonth : 1;
    var upper = isInMaxYear ? maxMonth : 12;
    var months = generateColumn(lower, upper, 'month');
    ret.push(months.map(function (v) {
      return {
        label: renderLabel('month', v),
        value: v.toString()
      };
    }));
  }

  if (rank >= precisionRankRecord.day) {
    var _lower = isInMinMonth ? minDay : 1;

    var _upper = isInMaxMonth ? maxDay : firstDayInSelectedMonth.daysInMonth();

    var days = generateColumn(_lower, _upper, 'day');
    ret.push(days.map(function (v) {
      return {
        label: renderLabel('day', v),
        value: v.toString()
      };
    }));
  }

  if (rank >= precisionRankRecord.hour) {
    var _lower2 = isInMinDay ? minHour : 0;

    var _upper2 = isInMaxDay ? maxHour : 23;

    var hours = generateColumn(_lower2, _upper2, 'hour');
    ret.push(hours.map(function (v) {
      return {
        label: renderLabel('hour', v),
        value: v.toString()
      };
    }));
  }

  if (rank >= precisionRankRecord.minute) {
    var _lower3 = isInMinHour ? minMinute : 0;

    var _upper3 = isInMaxHour ? maxMinute : 59;

    var minutes = generateColumn(_lower3, _upper3, 'minute');
    ret.push(minutes.map(function (v) {
      return {
        label: renderLabel('minute', v),
        value: v.toString()
      };
    }));
  }

  if (rank >= precisionRankRecord.second) {
    var _lower4 = isInMinMinute ? minSecond : 0;

    var _upper4 = isInMaxMinute ? maxSecond : 59;

    var seconds = generateColumn(_lower4, _upper4, 'second');
    ret.push(seconds.map(function (v) {
      return {
        label: renderLabel('second', v),
        value: v.toString()
      };
    }));
  }

  return ret;
}

function convertDateToStringArray(date) {
  if (!date) return [];
  return [date.getFullYear().toString(), (date.getMonth() + 1).toString(), date.getDate().toString(), date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()];
}

function convertStringArrayToDate(value) {
  var _a, _b, _c, _d, _e, _f;

  var yearString = (_a = value[0]) !== null && _a !== void 0 ? _a : '1900';
  var monthString = (_b = value[1]) !== null && _b !== void 0 ? _b : '1';
  var dateString = (_c = value[2]) !== null && _c !== void 0 ? _c : '1';
  var hourString = (_d = value[3]) !== null && _d !== void 0 ? _d : '0';
  var minuteString = (_e = value[4]) !== null && _e !== void 0 ? _e : '0';
  var secondString = (_f = value[5]) !== null && _f !== void 0 ? _f : '0';
  return new Date(parseInt(yearString), parseInt(monthString) - 1, parseInt(dateString), parseInt(hourString), parseInt(minuteString), parseInt(secondString));
}