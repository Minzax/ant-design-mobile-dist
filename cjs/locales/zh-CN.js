"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeLocale = require("../utils/merge-locale");

var _base = require("./base");

const zhCN = (0, _mergeLocale.mergeLocale)(_base.base, {
  common: {
    confirm: '确定',
    cancel: '取消'
  },
  Calendar: {
    markItems: ['一', '二', '三', '四', '五', '六', '日'],
    renderYearAndMonth: (year, month) => `${year}年${month}月`
  },
  Cascader: {
    placeholder: '请选择'
  },
  Dialog: {
    ok: '我知道了'
  },
  ErrorBlock: {
    default: {
      title: '页面遇到一些小问题',
      description: '待会来试试'
    },
    busy: {
      title: '前方拥堵',
      description: '刷新试试'
    },
    disconnected: {
      title: '网络有点忙',
      description: '动动手指帮忙修复'
    },
    empty: {
      title: '没有找到你需要的东西',
      description: '找找其他的吧'
    }
  },
  ImageUploader: {
    uploading: '上传中...'
  },
  Mask: {
    name: '遮罩层'
  },
  Modal: {
    ok: '我知道了'
  }
});
var _default = zhCN;
exports.default = _default;