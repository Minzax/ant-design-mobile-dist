import React, { useLayoutEffect, useMemo, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { mergeProps } from '../../utils/with-default-props';
import { ArrowLeft } from './arrow-left';
import { ArrowLeftDouble } from './arrow-left-double';
import { useConfig } from '../config-provider';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
const classPrefix = 'adm-calendar';
const defaultProps = {
  weekStartsOn: 'Sunday'
};
export const Calendar = p => {
  const today = dayjs();
  const props = mergeProps(defaultProps, p);
  const {
    locale
  } = useConfig();
  const markItems = [...locale.Calendar.markItems];

  if (props.weekStartsOn === 'Sunday') {
    const item = markItems.pop();
    if (item) markItems.unshift(item);
  }

  const [current, setCurrent] = useState(() => dayjs().date(1));
  const header = React.createElement("div", {
    className: `${classPrefix}-header`
  }, React.createElement("a", {
    className: `${classPrefix}-arrow-button`,
    onClick: () => {
      setCurrent(current.subtract(1, 'year'));
    }
  }, React.createElement(ArrowLeftDouble, null)), React.createElement("a", {
    className: `${classPrefix}-arrow-button`,
    onClick: () => {
      setCurrent(current.subtract(1, 'month'));
    }
  }, React.createElement(ArrowLeft, null)), React.createElement("div", {
    className: `${classPrefix}-title`
  }, locale.Calendar.renderYearAndMonth(current.year(), current.month() + 1)), React.createElement("a", {
    className: `${classPrefix}-arrow-button ${classPrefix}-arrow-button-right`,
    onClick: () => {
      setCurrent(current.add(1, 'month'));
    }
  }, React.createElement(ArrowLeft, null)), React.createElement("a", {
    className: `${classPrefix}-arrow-button ${classPrefix}-arrow-button-right`,
    onClick: () => {
      setCurrent(current.add(1, 'year'));
    }
  }, React.createElement(ArrowLeftDouble, null)));
  const dateRange = useMemo(() => {
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
  const [begin, setBegin] = useState(null);
  const [end, setEnd] = useState(null);
  useLayoutEffect(() => {
    setBegin(dateRange[0] ? dayjs(dateRange[0]) : null);
    setEnd(dateRange[1] ? dayjs(dateRange[1]) : null);
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
      cells.push(React.createElement("div", {
        key: d.valueOf(),
        className: classNames(`${classPrefix}-cell`, inThisMonth ? `${classPrefix}-cell-in` : `${classPrefix}-cell-out`, inThisMonth && {
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
      }, React.createElement("div", {
        className: `${classPrefix}-cell-top`
      }, d.date()), React.createElement("div", {
        className: `${classPrefix}-cell-bottom`
      }, (_a = props.renderLabel) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate()))));
      iterator = iterator.add(1, 'day');
    }

    return cells;
  }

  const body = React.createElement("div", {
    className: `${classPrefix}-cells`
  }, renderCells());
  const mark = React.createElement("div", {
    className: `${classPrefix}-mark`
  }, markItems.map(item => React.createElement("div", {
    key: item,
    className: `${classPrefix}-mark-cell`
  }, item)));
  return withNativeProps(props, React.createElement("div", {
    className: classPrefix
  }, header, mark, body));
};