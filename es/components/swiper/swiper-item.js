import React from 'react';
import { withNativeProps } from '../../utils/native-props';
export var SwiperItem = function SwiperItem(props) {
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: 'adm-swiper-item',
    onClick: props.onClick
  }, props.children));
};