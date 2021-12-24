"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLockScroll = useLockScroll;

var _useTouch = require("./use-touch");

var _react = require("react");

var _getScrollParent = require("./get-scroll-parent");

var _supportsPassive = require("./supports-passive");

var totalLockCount = 0;
var BODY_LOCK_CLASS = 'adm-overflow-hidden'; // 移植自vant：https://github.com/youzan/vant/blob/HEAD/src/composables/use-lock-scroll.ts

function useLockScroll(rootRef, shouldLock) {
  var touch = (0, _useTouch.useTouch)();

  var onTouchMove = function onTouchMove(event) {
    touch.move(event);
    var direction = touch.deltaY.current > 0 ? '10' : '01';
    var el = (0, _getScrollParent.getScrollParent)(event.target, rootRef.current);
    if (!el) return;
    var scrollHeight = el.scrollHeight,
        offsetHeight = el.offsetHeight,
        scrollTop = el.scrollTop;
    var status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (status !== '11' && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };

  var lock = function lock() {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', onTouchMove, _supportsPassive.supportsPassive ? {
      passive: false
    } : false);

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    totalLockCount++;
  };

  var unlock = function unlock() {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);
      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  (0, _react.useEffect)(function () {
    if (shouldLock) {
      lock();
      return function () {
        unlock();
      };
    }
  }, [shouldLock]);
}