import React from 'react';
export const defaultFormContext = {
  name: undefined,
  hasFeedback: true,
  layout: 'vertical',
  requiredMarkStyle: 'asterisk'
};
export const FormContext = React.createContext(defaultFormContext);
export const NoStyleItemContext = React.createContext(null);