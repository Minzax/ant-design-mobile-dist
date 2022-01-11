"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base = void 0;
var base = {
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  Calendar: {
    markItems: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    renderYearAndMonth: function renderYearAndMonth(year, month) {
      return year + "/" + month;
    }
  },
  Cascader: {
    placeholder: 'Selecting'
  },
  Dialog: {
    ok: 'OK'
  },
  ErrorBlock: {
    "default": {
      title: 'Oops, something went wrong',
      description: 'Please wait a minute and try again'
    },
    busy: {
      title: 'Oops, not loading',
      description: 'Try to refresh the page'
    },
    disconnected: {
      title: 'Network is busy',
      description: 'Try to refresh the page'
    },
    empty: {
      title: "Hmm, couldn't find that...",
      description: 'Want to try a new search?'
    }
  },
  ImageUploader: {
    uploading: 'Uploading...'
  },
  Mask: {
    name: 'Mask'
  },
  Modal: {
    ok: 'OK'
  }
};
exports.base = base;