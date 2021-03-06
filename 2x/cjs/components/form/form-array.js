"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormArray = void 0;

var _react = _interopRequireDefault(require("react"));

var _rcFieldForm = require("rc-field-form");

var _list = _interopRequireDefault(require("../list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FormArray = props => {
  return _react.default.createElement(_rcFieldForm.List, {
    name: props.name,
    initialValue: props.initialValue
  }, (rcFields, operation) => {
    const fields = rcFields.map(field => ({
      index: field.name,
      key: field.key
    }));
    const children = props.children(fields, operation).map((child, index) => {
      var _a;

      return _react.default.createElement(_list.default, {
        key: fields[index].key,
        mode: 'card',
        header: (_a = props.renderHeader) === null || _a === void 0 ? void 0 : _a.call(props, fields[index], operation)
      }, child);
    });

    if (props.renderAdd) {
      children.push(_react.default.createElement(_list.default, {
        key: 'add',
        mode: 'card'
      }, _react.default.createElement(_list.default.Item, {
        className: 'adm-form-list-operation',
        onClick: () => {
          props.onAdd ? props.onAdd(operation) : operation.add();
        },
        arrow: false
      }, props.renderAdd())));
    }

    return _react.default.createElement(_react.default.Fragment, null, children);
  });
};

exports.FormArray = FormArray;