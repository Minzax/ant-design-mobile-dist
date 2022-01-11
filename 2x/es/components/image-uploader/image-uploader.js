var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

import React, { useLayoutEffect, useRef, useState } from 'react';
import { AddOutline } from 'antd-mobile-icons';
import { mergeProps } from '../../utils/with-default-props';
import ImageViewer from '../image-viewer';
import PreviewItem from './preview-item';
import { usePropsValue } from '../../utils/use-props-value';
import { useMemoizedFn, useUnmount } from 'ahooks';
import Space from '../space';
import { withNativeProps } from '../../utils/native-props';
var classPrefix = "adm-image-uploader";
var defaultProps = {
  disableUpload: false,
  deletable: true,
  showUpload: true,
  multiple: false,
  maxCount: 0,
  defaultValue: [],
  accept: 'image/*',
  preview: true
};
export var ImageUploader = function ImageUploader(p) {
  var props = mergeProps(defaultProps, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var updateValue = useMemoizedFn(function (updater) {
    setValue(updater(value));
  });

  var _useState = useState([]),
      tasks = _useState[0],
      setTasks = _useState[1];

  useLayoutEffect(function () {
    setTasks(function (prev) {
      return prev.filter(function (task) {
        if (task.url === undefined) return true;
        return !value.some(function (fileItem) {
          return fileItem.url === task.url;
        });
      });
    });
  }, [value]);
  var idCountRef = useRef(0);
  var maxCount = props.maxCount,
      onPreview = props.onPreview;

  function onChange(e) {
    var _a;

    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      var rawFiles, files, exceed, newTasks;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.persist();
              rawFiles = e.target.files;

              if (rawFiles) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return");

            case 4:
              files = [].slice.call(rawFiles);

              if (!props.beforeUpload) {
                _context2.next = 9;
                break;
              }

              _context2.next = 8;
              return props.beforeUpload(files);

            case 8:
              files = _context2.sent;

            case 9:
              if (!(files.length === 0)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return");

            case 11:
              if (maxCount > 0) {
                exceed = value.length + files.length - maxCount;

                if (exceed > 0) {
                  files = files.slice(0, files.length - exceed);
                  (_a = props.onCountExceed) === null || _a === void 0 ? void 0 : _a.call(props, exceed);
                }
              }

              newTasks = files.map(function (file) {
                return {
                  id: idCountRef.current++,
                  status: 'pending',
                  file: file
                };
              });
              setTasks(function (prev) {
                return [].concat(prev, newTasks);
              });
              _context2.next = 16;
              return Promise.all(newTasks.map(function (currentTask) {
                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var result;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return props.upload(currentTask.file);

                        case 3:
                          result = _context.sent;
                          setTasks(function (prev) {
                            return prev.map(function (task) {
                              if (task.id === currentTask.id) {
                                return Object.assign(Object.assign({}, task), {
                                  url: result.url
                                });
                              }

                              return task;
                            });
                          });
                          updateValue(function (prev) {
                            var newVal = Object.assign({}, result);
                            return [].concat(prev, [newVal]);
                          });
                          _context.next = 12;
                          break;

                        case 8:
                          _context.prev = 8;
                          _context.t0 = _context["catch"](0);
                          setTasks(function (prev) {
                            return prev.map(function (task) {
                              if (task.id === currentTask.id) {
                                return Object.assign(Object.assign({}, task), {
                                  status: 'fail'
                                });
                              }

                              return task;
                            });
                          });
                          throw _context.t0;

                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 8]]);
                }));
              }))["catch"](function (error) {
                return console.error(error);
              });

            case 16:
              e.target.value = ''; // HACK: fix the same file doesn't trigger onChange

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }

  var imageViewerHandlerRef = useRef(null);

  function previewImage(index) {
    imageViewerHandlerRef.current = ImageViewer.Multi.show({
      images: value.map(function (fileItem) {
        return fileItem.url;
      }),
      defaultIndex: index,
      onClose: function onClose() {
        imageViewerHandlerRef.current = null;
      }
    });
  }

  useUnmount(function () {
    var _a;

    (_a = imageViewerHandlerRef.current) === null || _a === void 0 ? void 0 : _a.close();
  });
  var showUpload = props.showUpload && (maxCount === 0 || value.length + tasks.length < maxCount);
  return withNativeProps(props, /*#__PURE__*/React.createElement("div", {
    className: classPrefix
  }, /*#__PURE__*/React.createElement(Space, {
    className: classPrefix + "-space",
    wrap: true
  }, value.map(function (fileItem, index) {
    var _a, _b;

    return /*#__PURE__*/React.createElement(PreviewItem, {
      key: (_a = fileItem.key) !== null && _a !== void 0 ? _a : index,
      url: (_b = fileItem.thumbnailUrl) !== null && _b !== void 0 ? _b : fileItem.url,
      deletable: props.deletable,
      onClick: function onClick() {
        if (props.preview) {
          previewImage(index);
        }

        onPreview && onPreview(index);
      },
      onDelete: function onDelete() {
        return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var _c, canDelete;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return (_c = props.onDelete) === null || _c === void 0 ? void 0 : _c.call(props, fileItem);

                case 2:
                  canDelete = _context3.sent;

                  if (!(canDelete === false)) {
                    _context3.next = 5;
                    break;
                  }

                  return _context3.abrupt("return");

                case 5:
                  setValue(value.filter(function (x, i) {
                    return i !== index;
                  }));

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
      }
    });
  }), tasks.map(function (task) {
    return /*#__PURE__*/React.createElement(PreviewItem, {
      key: task.id,
      file: task.file,
      deletable: task.status !== 'pending',
      status: task.status,
      onDelete: function onDelete() {
        setTasks(tasks.filter(function (x) {
          return x.id !== task.id;
        }));
      }
    });
  }), showUpload && /*#__PURE__*/React.createElement("div", {
    className: classPrefix + "-upload-button-wrap"
  }, props.children ? props.children : /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-cell " + classPrefix + "-upload-button",
    role: 'button'
  }, /*#__PURE__*/React.createElement("span", {
    className: classPrefix + "-upload-button-icon"
  }, /*#__PURE__*/React.createElement(AddOutline, null))), !props.disableUpload && /*#__PURE__*/React.createElement("input", {
    capture: props.capture,
    accept: props.accept,
    multiple: props.multiple,
    type: 'file',
    className: classPrefix + "-input",
    onChange: onChange
  })))));
};