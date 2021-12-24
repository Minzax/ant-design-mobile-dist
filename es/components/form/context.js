import React from 'react';
export var DEFAULT_FORM_CONTEXT = {
  hasFeedback: true,
  layout: 'vertical'
};
export var FormContext = /*#__PURE__*/React.createContext(DEFAULT_FORM_CONTEXT);
export var NoStyleItemContext = /*#__PURE__*/React.createContext(null);