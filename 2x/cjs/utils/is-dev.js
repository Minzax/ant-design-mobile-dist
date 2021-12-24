"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDev = void 0;
var isDev = process.env.NODE_ENV === 'development';
exports.isDev = isDev;