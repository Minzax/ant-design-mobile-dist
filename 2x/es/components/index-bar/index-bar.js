import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { useThrottleFn } from 'ahooks';
import { mergeProps } from '../../utils/with-default-props';
import { Sidebar } from './sidebar';
import { convertPx } from '../../utils/convert-px';
import { Panel } from './panel';
import { devWarning } from '../../utils/dev-log';
const classPrefix = `adm-index-bar`;
const defaultProps = {
  sticky: true
};
export const IndexBar = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const titleHeight = convertPx(35);
  const bodyRef = useRef(null);
  const indexes = [];
  const panels = [];
  React.Children.forEach(props.children, child => {
    if (!React.isValidElement(child)) return;

    if (child.type !== Panel) {
      devWarning('IndexBar', 'The children of `IndexBar` must be `IndexBar.Panel` components.');
      return;
    }

    indexes.push(child.props.index);
    panels.push(withNativeProps(child.props, React.createElement("div", {
      key: child.props.index,
      "data-index": child.props.index,
      className: `${classPrefix}-anchor`
    }, React.createElement("div", {
      className: `${classPrefix}-anchor-title`
    }, child.props.title || child.props.index), child.props.children)));
  });
  const [activeIndex, setActiveIndex] = useState(indexes[0]);
  useImperativeHandle(ref, () => ({
    scrollTo
  }));

  function scrollTo(index) {
    const body = bodyRef.current;
    if (!body) return;
    const children = body.children;

    for (let i = 0; i < children.length; i++) {
      const panel = children.item(i);
      if (!panel) continue;
      const panelIndex = panel.dataset['index'];

      if (panelIndex === index) {
        body.scrollTop = panel.offsetTop;
        setActiveIndex(index);
        return;
      }
    }
  }

  const {
    run: checkActiveIndex
  } = useThrottleFn(() => {
    const body = bodyRef.current;
    if (!body) return;
    const scrollTop = body.scrollTop;
    const elements = body.getElementsByClassName(`${classPrefix}-anchor`);

    for (let i = 0; i < elements.length; i++) {
      const panel = elements.item(i);
      if (!panel) continue;
      const panelIndex = panel.dataset['index'];
      if (!panelIndex) continue;

      if (panel.offsetTop + panel.clientHeight - titleHeight > scrollTop) {
        setActiveIndex(panelIndex);
        return;
      }
    }
  }, {
    wait: 50,
    trailing: true,
    leading: true
  });
  return withNativeProps(props, React.createElement("div", {
    className: classNames(`${classPrefix}`, {
      [`${classPrefix}-sticky`]: props.sticky
    })
  }, React.createElement(Sidebar, {
    indexes: indexes,
    activeIndex: activeIndex,
    onActive: index => {
      scrollTo(index);
    }
  }), React.createElement("div", {
    className: `${classPrefix}-body`,
    ref: bodyRef,
    onScroll: checkActiveIndex
  }, panels)));
});