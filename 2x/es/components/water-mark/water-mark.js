import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
var classPrefix = "adm-water-mark";
var defaultProps = {
  fullPage: true
};
export var WaterMark = function WaterMark(p) {
  var _classNames;

  var props = mergeProps(defaultProps, p);
  var _props$zIndex = props.zIndex,
      zIndex = _props$zIndex === void 0 ? 2000 : _props$zIndex,
      _props$gapX = props.gapX,
      gapX = _props$gapX === void 0 ? 24 : _props$gapX,
      _props$gapY = props.gapY,
      gapY = _props$gapY === void 0 ? 48 : _props$gapY,
      _props$width = props.width,
      width = _props$width === void 0 ? 120 : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? 64 : _props$height,
      _props$rotate = props.rotate,
      rotate = _props$rotate === void 0 ? -22 : _props$rotate,
      image = props.image,
      _props$imageWidth = props.imageWidth,
      imageWidth = _props$imageWidth === void 0 ? 120 : _props$imageWidth,
      _props$imageHeight = props.imageHeight,
      imageHeight = _props$imageHeight === void 0 ? 64 : _props$imageHeight,
      content = props.content,
      _props$fontStyle = props.fontStyle,
      fontStyle = _props$fontStyle === void 0 ? 'normal' : _props$fontStyle,
      _props$fontWeight = props.fontWeight,
      fontWeight = _props$fontWeight === void 0 ? 'normal' : _props$fontWeight,
      _props$fontColor = props.fontColor,
      fontColor = _props$fontColor === void 0 ? 'rgba(0,0,0,.15)' : _props$fontColor,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? 14 : _props$fontSize,
      _props$fontFamily = props.fontFamily,
      fontFamily = _props$fontFamily === void 0 ? 'sans-serif' : _props$fontFamily;

  var _useState = useState(''),
      base64Url = _useState[0],
      setBase64Url = _useState[1];

  useEffect(function () {
    var canvas = document.createElement('canvas');
    var ratio = window.devicePixelRatio;
    var ctx = canvas.getContext('2d');
    var canvasWidth = (gapX + width) * ratio + "px";
    var canvasHeight = (gapY + height) * ratio + "px";
    var markWidth = width * ratio;
    var markHeight = height * ratio;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    if (ctx) {
      if (image) {
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate(Math.PI / 180 * Number(rotate));
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;

        img.onload = function () {
          ctx.drawImage(img, -imageWidth * ratio / 2, -imageHeight * ratio / 2, imageWidth * ratio, imageHeight * ratio);
          ctx.restore();
          setBase64Url(canvas.toDataURL());
        };
      } else if (content) {
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center'; // 文字绕中间旋转

        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate(Math.PI / 180 * Number(rotate));
        var markSize = Number(fontSize) * ratio;
        ctx.font = fontStyle + " normal " + fontWeight + " " + markSize + "px/" + markHeight + "px " + fontFamily;
        ctx.fillStyle = fontColor;
        ctx.fillText(content, 0, 0);
        ctx.restore();
        setBase64Url(canvas.toDataURL());
      }
    } else {
      throw new Error('当前环境不支持Canvas');
    }
  }, [gapX, gapY, rotate, fontStyle, fontWeight, width, height, fontFamily, fontColor, image, content, fontSize]);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classNames(classPrefix, (_classNames = {}, _classNames[classPrefix + "-full-page"] = props.fullPage, _classNames)),
    style: {
      zIndex: zIndex,
      backgroundSize: gapX + width + "px",
      backgroundImage: "url('" + base64Url + "')"
    }
  }));
};