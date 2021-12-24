import React, { useMemo } from 'react';
import { CloseOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import Image from '../image';
import Loading from '../loading';
import { useConfig } from '../config-provider';
var classPrefix = "adm-image-uploader";

var PreviewItem = function PreviewItem(props) {
  var _useConfig = useConfig(),
      locale = _useConfig.locale;

  var url = props.url,
      file = props.file,
      deletable = props.deletable,
      onDelete = props.onDelete;
  var src = useMemo(function () {
    if (url) {
      return url;
    }

    if (file) {
      return URL.createObjectURL(file);
    }

    return '';
  }, [url, file]);

  function renderLoading() {
    return props.status === 'pending' && /*#__PURE__*/React.createElement("div", {
      className: classPrefix + "-cell-mask"
    }, /*#__PURE__*/React.createElement("span", {
      className: classPrefix + "-cell-loading"
    }, /*#__PURE__*/React.createElement(Loading, {
      color: '#fff'
    }), /*#__PURE__*/React.createElement("span", {
      className: classPrefix + "-cell-mask-message"
    }, locale.ImageUploader.uploading)));
  }

  function renderDelete() {
    return deletable && /*#__PURE__*/React.createElement("span", {
      className: classPrefix + "-cell-delete",
      onClick: onDelete
    }, /*#__PURE__*/React.createElement(CloseOutline, {
      className: classPrefix + "-cell-delete-icon"
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix + "-cell", props.status === 'fail' && classPrefix + "-cell-fail")
  }, /*#__PURE__*/React.createElement(Image, {
    className: classPrefix + "-cell-image",
    src: src,
    fit: 'cover',
    onClick: props.onClick
  }), renderLoading(), renderDelete());
};

export default PreviewItem;