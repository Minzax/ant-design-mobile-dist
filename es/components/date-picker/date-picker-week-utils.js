import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
var precisionRankRecord = {
  year: 0,
  week: 1,
  'week-day': 2
};
export function defaultRenderLabel(type, data) {
  return data.toString();
}
export function generateDatePickerColumns(selected, min, max, precision, renderLabel, filter) {
  var ret = [];
  var minYear = min.getFullYear();
  var maxYear = max.getFullYear();
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
  var isInMinYear = selectedYear === minYear;
  var isInMaxYear = selectedYear === maxYear;
  var minDay = dayjs(min);
  var maxDay = dayjs(max);
  var minWeek = minDay.isoWeek();
  var maxWeek = maxDay.isoWeek();
  var minWeekday = minDay.isoWeekday();
  var maxWeekday = maxDay.isoWeekday();
  var selectedWeek = parseInt(selected[1]);
  var isInMinWeek = isInMinYear && selectedWeek === minWeek;
  var isInMaxWeek = isInMaxYear && selectedWeek === maxWeek;
  var selectedYearWeeks = dayjs(selectedYear + "-01-01").isoWeeksInYear();

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

  if (rank >= precisionRankRecord.week) {
    var lower = isInMinYear ? minWeek : 1;
    var upper = isInMaxYear ? maxWeek : selectedYearWeeks;
    var weeks = generateColumn(lower, upper, 'week');
    ret.push(weeks.map(function (v) {
      return {
        label: renderLabel('week', v),
        value: v.toString()
      };
    }));
  }

  if (rank >= precisionRankRecord['week-day']) {
    var _lower = isInMinWeek ? minWeekday : 1;

    var _upper = isInMaxWeek ? maxWeekday : 7;

    var _weeks = generateColumn(_lower, _upper, 'week-day');

    ret.push(_weeks.map(function (v) {
      return {
        label: renderLabel('week-day', v),
        value: v.toString()
      };
    }));
  }

  return ret;
}
export function convertDateToStringArray(date) {
  if (!date) return [];
  var day = dayjs(date);
  return [day.isoWeekYear().toString(), day.isoWeek().toString(), day.isoWeekday().toString()];
}
export function convertStringArrayToDate(value) {
  var _a, _b, _c;

  var yearString = (_a = value[0]) !== null && _a !== void 0 ? _a : '1900';
  var weekString = (_b = value[1]) !== null && _b !== void 0 ? _b : '1';
  var weekdayString = (_c = value[2]) !== null && _c !== void 0 ? _c : '1';
  var day = dayjs().year(parseInt(yearString)).isoWeek(parseInt(weekString)).isoWeekday(parseInt(weekdayString)).hour(0).minute(0).second(0);
  return day.toDate();
}