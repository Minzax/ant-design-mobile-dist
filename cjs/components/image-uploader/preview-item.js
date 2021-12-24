"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antdMobileIcons = require("antd-mobile-icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _image = _interopRequireDefault(require("../image"));

var _loading = _interopRequireDefault(require("../loading"));

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var classPrefix = "adm-image-uploader";

var PreviewItem = function PreviewItem(props) {
  var _useConfig = (0, _configProvider.useConfig)(),
      locale = _useConfig.locale;

  var url = props.url,
      file = props.file,
      deletable = props.deletable,
      onDelete = props.onDelete;
  var src = (0, _react.useMemo)(function () {
    if (url) {
      return url;
    }

    if (file) {
      return URL.createObjectURL(file);
    }

    return '';
  }, [url, file]);

  function renderLoading() {
    return props.status === 'pending' && /*#__PURE__*/_react["default"].createElement("div", {
      className: classPrefix + "-cell-mask"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: classPrefix + "-cell-loading"
    }, /*#__PURE__*/_react["default"].createElement(_loading["default"], {
      color: '#fff'
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: classPrefix + "-cell-mask-message"
    }, locale.ImageUploader.uploading)));
  }

  function renderDelete() {
    return deletable && /*#__PURE__*/_react["default"].createElement("span", {
      className: classPrefix + "-cell-delete",
      onClick: onDelete
    }, /*#__PURE__*/_react["default"].createElement(_antdMobileIcons.CloseOutline, {
      className: classPrefix + "-cell-delete-icon"
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(classPrefix + "-cell", props.status === 'fail' && classPrefix + "-cell-fail")
  }, /*#__PURE__*/_react["default"].createElement(_image["default"], {
    className: classPrefix + "-cell-image",
    src: src,
    fit: 'cover',
    onClick: props.onClick
  }), renderLoading(), renderDelete());
};

var _default = PreviewItem;
exports["default"] = _default;