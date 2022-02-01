import React from 'react';
export const DEFAULT_FORM_CONTEXT = {
  hasFeedback: true,
  layout: 'vertical'
};
export const FormContext = React.createContext(DEFAULT_FORM_CONTEXT);
export const NoStyleItemContext = React.createContext(null);