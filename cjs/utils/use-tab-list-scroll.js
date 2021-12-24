"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTabListScroll = void 0;

var _react = require("react");

var _web = require("@react-spring/web");

var _useMutationEffect = require("./use-mutation-effect");

var _bound = require("./bound");

var _ahooks = require("ahooks");

var useTabListScroll = function useTabListScroll(targetRef, activeIndex) {
  var _useSpring = (0, _web.useSpring)(function () {
    return {
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      scrollLeft = _useSpring[0].scrollLeft,
      api = _useSpring[1];

  function animate(immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = targetRef.current;
    if (!container) return;
    if (!activeIndex) return;
    var activeTabWrapper = container.children.item(activeIndex);
    var activeTab = activeTabWrapper.children.item(0);
    var activeTabLeft = activeTab.offsetLeft;
    var activeTabWidth = activeTab.offsetWidth;
    var containerWidth = container.offsetWidth;
    var containerScrollWidth = container.scrollWidth;
    var containerScrollLeft = container.scrollLeft;
    var maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    var nextScrollLeft = (0, _bound.bound)(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    api.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate: immediate
    });
  }

  (0, _react.useLayoutEffect)(function () {
    animate(true);
  }, []);
  (0, _ahooks.useUpdateLayoutEffect)(function () {
    animate();
  }, [activeIndex]);
  (0, _useMutationEffect.useMutationEffect)(function () {
    animate(true);
  }, targetRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  return {
    scrollLeft: scrollLeft,
    animate: animate
  };
};

exports.useTabListScroll = useTabListScroll;