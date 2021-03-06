"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageUploader = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _antdMobileIcons = require("antd-mobile-icons");

var _withDefaultProps = require("../../utils/with-default-props");

var _imageViewer = _interopRequireDefault(require("../image-viewer"));

var _previewItem = _interopRequireDefault(require("./preview-item"));

var _usePropsValue = require("../../utils/use-props-value");

var _ahooks = require("ahooks");

var _space = _interopRequireDefault(require("../space"));

var _nativeProps = require("../../utils/native-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classPrefix = `adm-image-uploader`;
const defaultProps = {
  disableUpload: false,
  deletable: true,
  showUpload: true,
  multiple: false,
  maxCount: 0,
  defaultValue: [],
  accept: 'image/*',
  preview: true,
  showFailed: true,
  imageFit: 'cover'
};

const ImageUploader = p => {
  const props = (0, _withDefaultProps.mergeProps)(defaultProps, p);
  const [value, setValue] = (0, _usePropsValue.usePropsValue)(props);
  const updateValue = (0, _ahooks.useMemoizedFn)(updater => {
    setValue(updater(value));
  });
  const [tasks, setTasks] = (0, _react.useState)([]);
  (0, _ahooks.useIsomorphicLayoutEffect)(() => {
    setTasks(prev => prev.filter(task => {
      if (task.url === undefined) return true;
      return !value.some(fileItem => fileItem.url === task.url);
    }));
  }, [value]);
  const idCountRef = (0, _react.useRef)(0);
  const {
    maxCount,
    onPreview
  } = props;

  function processFile(file, fileList) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
      const {
        beforeUpload
      } = props;
      let transformedFile = file;
      transformedFile = yield beforeUpload === null || beforeUpload === void 0 ? void 0 : beforeUpload(file, fileList);
      return transformedFile;
    });
  }

  function onChange(e) {
    var _a;

    return (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
      e.persist();
      const {
        files: rawFiles
      } = e.target;
      if (!rawFiles) return;
      let files = [].slice.call(rawFiles);

      if (props.beforeUpload) {
        const postFiles = files.map(file => {
          return processFile(file, files);
        });
        yield Promise.all(postFiles).then(filesList => {
          files = filesList.filter(Boolean);
        });
      }

      if (files.length === 0) {
        return;
      }

      if (maxCount > 0) {
        const exceed = value.length + files.length - maxCount;

        if (exceed > 0) {
          files = files.slice(0, files.length - exceed);
          (_a = props.onCountExceed) === null || _a === void 0 ? void 0 : _a.call(props, exceed);
        }
      }

      const newTasks = files.map(file => ({
        id: idCountRef.current++,
        status: 'pending',
        file
      }));
      setTasks(prev => [...prev, ...newTasks]);
      e.target.value = ''; // HACK: fix the same file doesn't trigger onChange

      yield Promise.all(newTasks.map(currentTask => (0, _tslib.__awaiter)(this, void 0, void 0, function* () {
        try {
          const result = yield props.upload(currentTask.file);
          setTasks(prev => {
            return prev.map(task => {
              if (task.id === currentTask.id) {
                return Object.assign(Object.assign({}, task), {
                  url: result.url
                });
              }

              return task;
            });
          });
          updateValue(prev => {
            const newVal = Object.assign({}, result);
            return [...prev, newVal];
          });
        } catch (e) {
          setTasks(prev => {
            return prev.map(task => {
              if (task.id === currentTask.id) {
                return Object.assign(Object.assign({}, task), {
                  status: 'fail'
                });
              }

              return task;
            });
          });
          throw e;
        }
      }))).catch(error => console.error(error));
    });
  }

  const imageViewerHandlerRef = (0, _react.useRef)(null);

  function previewImage(index) {
    imageViewerHandlerRef.current = _imageViewer.default.Multi.show({
      images: value.map(fileItem => fileItem.url),
      defaultIndex: index,
      onClose: () => {
        imageViewerHandlerRef.current = null;
      }
    });
  }

  (0, _ahooks.useUnmount)(() => {
    var _a;

    (_a = imageViewerHandlerRef.current) === null || _a === void 0 ? void 0 : _a.close();
  });
  const showUpload = props.showUpload && (maxCount === 0 || value.length + tasks.length < maxCount);
  return (0, _nativeProps.withNativeProps)(props, _react.default.createElement("div", {
    className: classPrefix
  }, _react.default.createElement(_space.default, {
    className: `${classPrefix}-space`,
    wrap: true,
    block: true
  }, value.map((fileItem, index) => {
    var _a, _b;

    return _react.default.createElement(_previewItem.default, {
      key: (_a = fileItem.key) !== null && _a !== void 0 ? _a : index,
      url: (_b = fileItem.thumbnailUrl) !== null && _b !== void 0 ? _b : fileItem.url,
      deletable: props.deletable,
      imageFit: props.imageFit,
      onClick: () => {
        if (props.preview) {
          previewImage(index);
        }

        onPreview && onPreview(index, fileItem);
      },
      onDelete: () => (0, _tslib.__awaiter)(void 0, void 0, void 0, function* () {
        var _c;

        const canDelete = yield (_c = props.onDelete) === null || _c === void 0 ? void 0 : _c.call(props, fileItem);
        if (canDelete === false) return;
        setValue(value.filter((x, i) => i !== index));
      })
    });
  }), tasks.map(task => {
    if (!props.showFailed && task.status === 'fail') {
      return null;
    }

    return _react.default.createElement(_previewItem.default, {
      key: task.id,
      file: task.file,
      deletable: task.status !== 'pending',
      status: task.status,
      imageFit: props.imageFit,
      onDelete: () => {
        setTasks(tasks.filter(x => x.id !== task.id));
      }
    });
  }), showUpload && _react.default.createElement("div", {
    className: `${classPrefix}-upload-button-wrap`
  }, props.children ? props.children : _react.default.createElement("span", {
    className: `${classPrefix}-cell ${classPrefix}-upload-button`,
    role: 'button'
  }, _react.default.createElement("span", {
    className: `${classPrefix}-upload-button-icon`
  }, _react.default.createElement(_antdMobileIcons.AddOutline, null))), !props.disableUpload && _react.default.createElement("input", {
    capture: props.capture,
    accept: props.accept,
    multiple: props.multiple,
    type: 'file',
    className: `${classPrefix}-input`,
    onChange: onChange
  })))));
};

exports.ImageUploader = ImageUploader;