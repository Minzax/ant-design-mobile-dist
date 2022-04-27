import { __rest, __awaiter } from "tslib";
import React$1, { useContext, useRef, useEffect, useMemo, useState, memo, forwardRef, useImperativeHandle, useCallback, createContext, cloneElement, createRef } from "react";
import classNames from "classnames";
import { useUnmountedRef, useUpdate, useMemoizedFn, useUpdateEffect, useIsomorphicLayoutEffect, createUpdateEffect, useThrottleFn, useDebounceEffect, useMount, useInViewport, useClickAway, useUnmount, useLockFn, useTimeout } from "ahooks";
import { useSpring, animated, to } from "@react-spring/web";
import dayjs from "dayjs";
import { isFragment } from "react-is";
import { useDrag, useWheel, createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { RightOutline, CheckOutline, DownOutline, PictureOutline, PictureWrongOutline, DownFill, QuestionCircleOutline, CloseOutline, AddOutline, CloseCircleFill, LeftOutline, SoundOutline, TextDeletionOutline, StarFill, CheckCircleFill, InformationCircleFill, ClockCircleFill, ExclamationCircleFill, SearchOutline, MinusOutline } from "antd-mobile-icons";
import { staged } from "staged-components";
import RcForm, { List as List$2, Field, useForm } from "rc-field-form";
import { computePosition, offset, shift, limitShift, flip, hide, arrow, autoUpdate } from "@floating-ui/dom";
import Big from "big.js";
var global$1 = "";
const canUseDom = !!(typeof window !== "undefined" && typeof document !== "undefined" && window.document && window.document.createElement);
if (canUseDom) {
  document.addEventListener("touchstart", () => {
  }, true);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$5(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$5;
var eq$4 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$4(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index2 = assocIndexOf$3(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index2 = assocIndexOf$2(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result2 = data["delete"](key);
  this.size = data.size;
  return result2;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$8 = freeGlobal || freeSelf || Function("return this")();
var _root = root$8;
var root$7 = _root;
var Symbol$5 = root$7.Symbol;
var _Symbol = Symbol$5;
var Symbol$4 = _Symbol;
var objectProto$g = Object.prototype;
var hasOwnProperty$e = objectProto$g.hasOwnProperty;
var nativeObjectToString$1 = objectProto$g.toString;
var symToStringTag$1 = Symbol$4 ? Symbol$4.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$e.call(value, symToStringTag$1), tag2 = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result2 = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag2;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result2;
}
var _getRawTag = getRawTag$1;
var objectProto$f = Object.prototype;
var nativeObjectToString = objectProto$f.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$3 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$3 ? Symbol$3.toStringTag : void 0;
function baseGetTag$5(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$5;
function isObject$8(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$8;
var baseGetTag$4 = _baseGetTag, isObject$7 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$7(value)) {
    return false;
  }
  var tag2 = baseGetTag$4(value);
  return tag2 == funcTag$2 || tag2 == genTag$1 || tag2 == asyncTag || tag2 == proxyTag;
}
var isFunction_1 = isFunction$3;
var root$6 = _root;
var coreJsData$1 = root$6["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$6 = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$e = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$d = objectProto$e.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$d).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$1(value) {
  if (!isObject$6(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$5 = _root;
var Map$4 = getNative$6(root$5, "Map");
var _Map = Map$4;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result2 = this.has(key) && delete this.__data__[key];
  this.size -= result2 ? 1 : 0;
  return result2;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$d = Object.prototype;
var hasOwnProperty$c = objectProto$d.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result2 = data[key];
    return result2 === HASH_UNDEFINED$2 ? void 0 : result2;
  }
  return hasOwnProperty$c.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$c = Object.prototype;
var hasOwnProperty$b = objectProto$c.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$b.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$3 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$3 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result2 = getMapData$3(this, key)["delete"](key);
  this.size -= result2 ? 1 : 0;
  return result2;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$3(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache$3.prototype.clear = mapCacheClear;
MapCache$3.prototype["delete"] = mapCacheDelete;
MapCache$3.prototype.get = mapCacheGet;
MapCache$3.prototype.has = mapCacheHas;
MapCache$3.prototype.set = mapCacheSet;
var _MapCache = MapCache$3;
var ListCache$1 = _ListCache, Map$2 = _Map, MapCache$2 = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$3(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$3.prototype.clear = stackClear;
Stack$3.prototype["delete"] = stackDelete;
Stack$3.prototype.get = stackGet;
Stack$3.prototype.has = stackHas;
Stack$3.prototype.set = stackSet;
var _Stack = Stack$3;
function arrayEach$1(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$1;
var getNative$4 = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$3 = eq_1;
var objectProto$b = Object.prototype;
var hasOwnProperty$a = objectProto$b.hasOwnProperty;
function assignValue$3(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$a.call(object, key) && eq$3(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignValue = assignValue$3;
var assignValue$2 = _assignValue, baseAssignValue$1 = _baseAssignValue;
function copyObject$7(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$2(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$7;
function baseTimes$1(n, iteratee) {
  var index2 = -1, result2 = Array(n);
  while (++index2 < n) {
    result2[index2] = iteratee(index2);
  }
  return result2;
}
var _baseTimes = baseTimes$1;
function isObjectLike$8(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$8;
var baseGetTag$3 = _baseGetTag, isObjectLike$7 = isObjectLike_1;
var argsTag$3 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$7(value) && baseGetTag$3(value) == argsTag$3;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$6 = isObjectLike_1;
var objectProto$a = Object.prototype;
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
var isArguments$2 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$6(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$2;
var isArray$5 = Array.isArray;
var isArray_1 = isArray$5;
var isBuffer$4 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$4, isBuffer$4.exports);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$2;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$2;
var baseGetTag$2 = _baseGetTag, isLength$1 = isLength_1, isObjectLike$5 = isObjectLike_1;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$5(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$2(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$3;
var _nodeUtil = { exports: {} };
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary$2 = _baseUnary, nodeUtil$2 = _nodeUtil.exports;
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;
var isTypedArray$3 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$3;
var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$4 = isArray_1, isBuffer$3 = isBuffer$4.exports, isIndex$1 = _isIndex, isTypedArray$2 = isTypedArray_1;
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$4(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$3(value), isType = !isArr && !isArg && !isBuff && isTypedArray$2(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String) : [], length = result2.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$8.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex$1(key, length)))) {
      result2.push(key);
    }
  }
  return result2;
}
var _arrayLikeKeys = arrayLikeKeys$2;
var objectProto$8 = Object.prototype;
function isPrototype$4(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
var _isPrototype = isPrototype$4;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$3 = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$7 = Object.prototype;
var hasOwnProperty$7 = objectProto$7.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$3(object)) {
    return nativeKeys(object);
  }
  var result2 = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != "constructor") {
      result2.push(key);
    }
  }
  return result2;
}
var _baseKeys = baseKeys$1;
var isFunction$1 = isFunction_1, isLength = isLength_1;
function isArrayLike$5(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$5;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$4 = isArrayLike_1;
function keys$5(object) {
  return isArrayLike$4(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$5;
var copyObject$6 = _copyObject, keys$4 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$6(source, keys$4(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$1(object) {
  var result2 = [];
  if (object != null) {
    for (var key in Object(object)) {
      result2.push(key);
    }
  }
  return result2;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$5 = isObject_1, isPrototype$2 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$6 = Object.prototype;
var hasOwnProperty$6 = objectProto$6.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$5(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$2(object), result2 = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result2.push(key);
    }
  }
  return result2;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$3 = isArrayLike_1;
function keysIn$5(object) {
  return isArrayLike$3(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$5;
var copyObject$5 = _copyObject, keysIn$4 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$5(source, keysIn$4(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = { exports: {} };
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result2);
    return result2;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
function copyArray$2(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var _copyArray = copyArray$2;
function arrayFilter$1(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result2[resIndex++] = value;
    }
  }
  return result2;
}
var _arrayFilter = arrayFilter$1;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$5 = Object.prototype;
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$4 = _copyObject, getSymbols$2 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$4(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;
function arrayPush$2(array, values) {
  var index2 = -1, length = values.length, offset2 = array.length;
  while (++index2 < length) {
    array[offset2 + index2] = values[index2];
  }
  return array;
}
var _arrayPush = arrayPush$2;
var overArg = _overArg;
var getPrototype$3 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$3;
var arrayPush$1 = _arrayPush, getPrototype$2 = _getPrototype, getSymbols$1 = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result2 = [];
  while (object) {
    arrayPush$1(result2, getSymbols$1(object));
    object = getPrototype$2(object);
  }
  return result2;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject$3 = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject$3(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush = _arrayPush, isArray$3 = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result2 = keysFunc(object);
  return isArray$3(object) ? result2 : arrayPush(result2, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols = _getSymbols, keys$3 = keys_1;
function getAllKeys$2(object) {
  return baseGetAllKeys$1(object, keys$3, getSymbols);
}
var _getAllKeys = getAllKeys$2;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$3 = keysIn_1;
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$3, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$1;
var getNative$3 = _getNative, root$4 = _root;
var DataView$1 = getNative$3(root$4, "DataView");
var _DataView = DataView$1;
var getNative$2 = _getNative, root$3 = _root;
var Promise$2 = getNative$2(root$3, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$2 = _root;
var Set$2 = getNative$1(root$2, "Set");
var _Set = Set$2;
var getNative = _getNative, root$1 = _root;
var WeakMap$2 = getNative(root$1, "WeakMap");
var _WeakMap = WeakMap$2;
var DataView = _DataView, Map$1 = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource = _toSource;
var mapTag$4 = "[object Map]", objectTag$3 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag$4 = baseGetTag$1;
if (DataView && getTag$4(new DataView(new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag$4(new Map$1()) != mapTag$4 || Promise$1 && getTag$4(Promise$1.resolve()) != promiseTag || Set$1 && getTag$4(new Set$1()) != setTag$4 || WeakMap$1 && getTag$4(new WeakMap$1()) != weakMapTag$1) {
  getTag$4 = function(value) {
    var result2 = baseGetTag$1(value), Ctor = result2 == objectTag$3 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result2;
  };
}
var _getTag = getTag$4;
var objectProto$4 = Object.prototype;
var hasOwnProperty$5 = objectProto$4.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result2 = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$5.call(array, "index")) {
    result2.index = array.index;
    result2.input = array.input;
  }
  return result2;
}
var _initCloneArray = initCloneArray$1;
var root = _root;
var Uint8Array$2 = root.Uint8Array;
var _Uint8Array = Uint8Array$2;
var Uint8Array$1 = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result2).set(new Uint8Array$1(arrayBuffer));
  return result2;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result2.lastIndex = regexp.lastIndex;
  return result2;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$2 = _Symbol;
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$2;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray$1 = _cloneTypedArray;
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag2, isDeep) {
  var Ctor = object.constructor;
  switch (tag2) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$2:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray$1(object, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$2:
      return cloneRegExp(object);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$4 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$4(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result2 = new object();
    object.prototype = void 0;
    return result2;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate, getPrototype$1 = _getPrototype, isPrototype$1 = _isPrototype;
function initCloneObject$2(object) {
  return typeof object.constructor == "function" && !isPrototype$1(object) ? baseCreate(getPrototype$1(object)) : {};
}
var _initCloneObject = initCloneObject$2;
var getTag$3 = _getTag, isObjectLike$4 = isObjectLike_1;
var mapTag$2 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$4(value) && getTag$3(value) == mapTag$2;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtil.exports;
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$2 = _getTag, isObjectLike$3 = isObjectLike_1;
var setTag$2 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike$3(value) && getTag$2(value) == setTag$2;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary = _baseUnary, nodeUtil = _nodeUtil.exports;
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack$2 = _Stack, arrayEach = _arrayEach, assignValue$1 = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer$1 = _cloneBuffer.exports, copyArray$1 = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys$1 = _getAllKeys, getAllKeysIn = _getAllKeysIn, getTag$1 = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject$1 = _initCloneObject, isArray$2 = isArray_1, isBuffer$2 = isBuffer$4.exports, isMap = isMap_1, isObject$3 = isObject_1, isSet = isSet_1, keys$2 = keys_1, keysIn$2 = keysIn_1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$2] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result2, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result2 = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result2 !== void 0) {
    return result2;
  }
  if (!isObject$3(value)) {
    return value;
  }
  var isArr = isArray$2(value);
  if (isArr) {
    result2 = initCloneArray(value);
    if (!isDeep) {
      return copyArray$1(value, result2);
    }
  } else {
    var tag2 = getTag$1(value), isFunc = tag2 == funcTag || tag2 == genTag;
    if (isBuffer$2(value)) {
      return cloneBuffer$1(value, isDeep);
    }
    if (tag2 == objectTag$2 || tag2 == argsTag$1 || isFunc && !object) {
      result2 = isFlat || isFunc ? {} : initCloneObject$1(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
      }
    } else {
      if (!cloneableTags[tag2]) {
        return object ? value : {};
      }
      result2 = initCloneByTag(value, tag2, isDeep);
    }
  }
  stack || (stack = new Stack$2());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result2);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result2.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result2.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys$1 : isFlat ? keysIn$2 : keys$2;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue$1(result2, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result2;
}
var _baseClone = baseClone$1;
var baseClone = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var cloneDeep_1 = cloneDeep;
var baseAssignValue = _baseAssignValue, eq$2 = eq_1;
function assignMergeValue$2(object, key, value) {
  if (value !== void 0 && !eq$2(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index2];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
var isArrayLike$2 = isArrayLike_1, isObjectLike$2 = isObjectLike_1;
function isArrayLikeObject$1(value) {
  return isObjectLike$2(value) && isArrayLike$2(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$1;
var baseGetTag = _baseGetTag, getPrototype = _getPrototype, isObjectLike$1 = isObjectLike_1;
var objectTag$1 = "[object Object]";
var funcProto = Function.prototype, objectProto$3 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$4 = objectProto$3.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike$1(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$4.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$1;
function safeGet$2(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet$2;
var copyObject$2 = _copyObject, keysIn$1 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject$2(value, keysIn$1(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer = _cloneBuffer.exports, cloneTypedArray = _cloneTypedArray, copyArray = _copyArray, initCloneObject = _initCloneObject, isArguments = isArguments_1, isArray$1 = isArray_1, isArrayLikeObject = isArrayLikeObject_1, isBuffer$1 = isBuffer$4.exports, isFunction = isFunction_1, isObject$2 = isObject_1, isPlainObject = isPlainObject_1, isTypedArray$1 = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$2(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack$1 = _Stack, assignMergeValue = _assignMergeValue, baseFor = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$1 = isObject_1, keysIn = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack$1());
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var _baseMerge = baseMerge$1;
function identity$2(value) {
  return value;
}
var identity_1 = identity$2;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$1(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index2 < length) {
      array[index2] = args[start + index2];
    }
    index2 = -1;
    var otherArgs = Array(start + 1);
    while (++index2 < start) {
      otherArgs[index2] = args[index2];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$1;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
var constant = constant_1, defineProperty = _defineProperty, identity$1 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$1 = shortOut(baseSetToString);
var _setToString = setToString$1;
var identity = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var _baseRest = baseRest$1;
var eq$1 = eq_1, isArrayLike$1 = isArrayLike_1, isIndex = _isIndex, isObject = isObject_1;
function isIterateeCall$1(value, index2, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index2;
  if (type == "number" ? isArrayLike$1(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
    return eq$1(object[index2], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest = _baseRest, isIterateeCall = _isIterateeCall;
function createAssigner$3(assigner) {
  return baseRest(function(object, sources) {
    var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index2 < length) {
      var source = sources[index2];
      if (source) {
        assigner(object, source, index2, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner$3;
var baseMerge = _baseMerge, createAssigner$2 = _createAssigner;
var merge = createAssigner$2(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge_1 = merge;
function mergeLocale(base2, patch) {
  return merge_1(cloneDeep_1(base2), patch);
}
const typeTemplate$1 = "${label} is not a valid ${type}";
const base = {
  locale: "en",
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    loading: "Loading"
  },
  Calendar: {
    markItems: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    renderYearAndMonth: (year, month) => `${year}/${month}`
  },
  Cascader: {
    placeholder: "Selecting"
  },
  Dialog: {
    ok: "OK"
  },
  ErrorBlock: {
    default: {
      title: "Oops, something went wrong",
      description: "Please wait a minute and try again"
    },
    busy: {
      title: "Oops, not loading",
      description: "Try to refresh the page"
    },
    disconnected: {
      title: "Network is busy",
      description: "Try to refresh the page"
    },
    empty: {
      title: "Hmm, couldn't find that...",
      description: "Want to try a new search?"
    }
  },
  Form: {
    required: "Required",
    optional: "Optional",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate$1,
        method: typeTemplate$1,
        array: typeTemplate$1,
        object: typeTemplate$1,
        number: typeTemplate$1,
        date: typeTemplate$1,
        boolean: typeTemplate$1,
        integer: typeTemplate$1,
        float: typeTemplate$1,
        regexp: typeTemplate$1,
        email: typeTemplate$1,
        url: typeTemplate$1,
        hex: typeTemplate$1
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  ImageUploader: {
    uploading: "Uploading..."
  },
  InfiniteScroll: {
    noMore: "No more"
  },
  Mask: {
    name: "Mask"
  },
  Modal: {
    ok: "OK"
  },
  PullToRefresh: {
    pulling: "Scroll down to refresh",
    canRelease: "Release to refresh immediately",
    complete: "Refresh successful"
  }
};
const typeTemplate = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}";
const zhCN = mergeLocale(base, {
  locale: "zh-CH",
  common: {
    confirm: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    loading: "\u52A0\u8F7D\u4E2D"
  },
  Calendar: {
    markItems: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"],
    renderYearAndMonth: (year, month) => `${year}\u5E74${month}\u6708`
  },
  Cascader: {
    placeholder: "\u8BF7\u9009\u62E9"
  },
  Dialog: {
    ok: "\u6211\u77E5\u9053\u4E86"
  },
  ErrorBlock: {
    default: {
      title: "\u9875\u9762\u9047\u5230\u4E00\u4E9B\u5C0F\u95EE\u9898",
      description: "\u5F85\u4F1A\u6765\u8BD5\u8BD5"
    },
    busy: {
      title: "\u524D\u65B9\u62E5\u5835",
      description: "\u5237\u65B0\u8BD5\u8BD5"
    },
    disconnected: {
      title: "\u7F51\u7EDC\u6709\u70B9\u5FD9",
      description: "\u52A8\u52A8\u624B\u6307\u5E2E\u5FD9\u4FEE\u590D"
    },
    empty: {
      title: "\u6CA1\u6709\u627E\u5230\u4F60\u9700\u8981\u7684\u4E1C\u897F",
      description: "\u627E\u627E\u5176\u4ED6\u7684\u5427"
    }
  },
  Form: {
    required: "\u5FC5\u586B",
    optional: "\u9009\u586B",
    defaultValidateMessages: {
      default: "\u5B57\u6BB5\u9A8C\u8BC1\u9519\u8BEF${label}",
      required: "\u8BF7\u8F93\u5165${label}",
      enum: "${label}\u5FC5\u987B\u662F\u5176\u4E2D\u4E00\u4E2A[${enum}]",
      whitespace: "${label}\u4E0D\u80FD\u4E3A\u7A7A\u5B57\u7B26",
      date: {
        format: "${label}\u65E5\u671F\u683C\u5F0F\u65E0\u6548",
        parse: "${label}\u4E0D\u80FD\u8F6C\u6362\u4E3A\u65E5\u671F",
        invalid: "${label}\u662F\u4E00\u4E2A\u65E0\u6548\u65E5\u671F"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label}\u987B\u4E3A${len}\u4E2A\u5B57\u7B26",
        min: "${label}\u6700\u5C11${min}\u4E2A\u5B57\u7B26",
        max: "${label}\u6700\u591A${max}\u4E2A\u5B57\u7B26",
        range: "${label}\u987B\u5728${min}-${max}\u5B57\u7B26\u4E4B\u95F4"
      },
      number: {
        len: "${label}\u5FC5\u987B\u7B49\u4E8E${len}",
        min: "${label}\u6700\u5C0F\u503C\u4E3A${min}",
        max: "${label}\u6700\u5927\u503C\u4E3A${max}",
        range: "${label}\u987B\u5728${min}-${max}\u4E4B\u95F4"
      },
      array: {
        len: "\u987B\u4E3A${len}\u4E2A${label}",
        min: "\u6700\u5C11${min}\u4E2A${label}",
        max: "\u6700\u591A${max}\u4E2A${label}",
        range: "${label}\u6570\u91CF\u987B\u5728${min}-${max}\u4E4B\u95F4"
      },
      pattern: {
        mismatch: "${label}\u4E0E\u6A21\u5F0F\u4E0D\u5339\u914D${pattern}"
      }
    }
  },
  ImageUploader: {
    uploading: "\u4E0A\u4F20\u4E2D..."
  },
  InfiniteScroll: {
    noMore: "\u6CA1\u6709\u66F4\u591A\u4E86"
  },
  Mask: {
    name: "\u906E\u7F69\u5C42"
  },
  Modal: {
    ok: "\u6211\u77E5\u9053\u4E86"
  },
  PullToRefresh: {
    pulling: "\u4E0B\u62C9\u5237\u65B0",
    canRelease: "\u91CA\u653E\u7ACB\u5373\u5237\u65B0",
    complete: "\u5237\u65B0\u6210\u529F"
  }
});
const defaultConfigRef = {
  current: {
    locale: zhCN
  }
};
function setDefaultConfig(config2) {
  defaultConfigRef.current = config2;
}
function getDefaultConfig() {
  return defaultConfigRef.current;
}
const ConfigContext = React$1.createContext(null);
const ConfigProvider = (props) => {
  const {
    children
  } = props, config2 = __rest(props, ["children"]);
  const parentConfig = useConfig();
  return React$1.createElement(ConfigContext.Provider, {
    value: Object.assign(Object.assign({}, parentConfig), config2)
  }, children);
};
function useConfig() {
  var _a;
  return (_a = useContext(ConfigContext)) !== null && _a !== void 0 ? _a : getDefaultConfig();
}
var actionSheet = "";
function attachPropertiesToComponent(component, properties) {
  const ret = component;
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }
  return ret;
}
function withNativeProps(props, element) {
  const p = Object.assign({}, element.props);
  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = Object.assign(Object.assign({}, p.style), props.style);
  }
  if (props.tabIndex !== void 0) {
    p.tabIndex = props.tabIndex;
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key))
      continue;
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      p[key] = props[key];
    }
  }
  return React$1.cloneElement(element, p);
}
var assignValue = _assignValue, copyObject$1 = _copyObject, createAssigner$1 = _createAssigner, isArrayLike = isArrayLike_1, isPrototype = _isPrototype, keys$1 = keys_1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$3 = objectProto$2.hasOwnProperty;
var assign = createAssigner$1(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject$1(source, keys$1(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty$3.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});
var assign_1 = assign;
var copyObject = _copyObject, createAssigner = _createAssigner, keys = keys_1;
var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keys(source), object, customizer);
});
var assignWith_1 = assignWith;
function isUndefined(value) {
  return value === void 0;
}
var isUndefined_1 = isUndefined;
function mergeProps(...items) {
  function customizer(objValue, srcValue) {
    return isUndefined_1(srcValue) ? objValue : srcValue;
  }
  let ret = assign_1({}, items[0]);
  for (let i = 1; i < items.length; i++) {
    ret = assignWith_1(ret, items[i], customizer);
  }
  return ret;
}
var popup = "";
var mask = "";
const MIN_DISTANCE = 10;
function getDirection(x, y2) {
  if (x > y2 && x > MIN_DISTANCE) {
    return "horizontal";
  }
  if (y2 > x && y2 > MIN_DISTANCE) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const direction = useRef("");
  const isVertical = () => direction.current === "vertical";
  const isHorizontal = () => direction.current === "horizontal";
  const reset = () => {
    deltaX.current = 0;
    deltaY.current = 0;
    offsetX.current = 0;
    offsetY.current = 0;
    direction.current = "";
  };
  const start = (event) => {
    reset();
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
  };
  const move = (event) => {
    const touch = event.touches[0];
    deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;
    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);
    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current);
    }
  };
  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal
  };
}
const defaultRoot = canUseDom ? window : void 0;
const overflowStylePatterns = ["scroll", "auto", "overlay"];
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el, root2 = defaultRoot) {
  let node = el;
  while (node && node !== root2 && isElement(node)) {
    if (node === document.body) {
      return root2;
    }
    const {
      overflowY
    } = window.getComputedStyle(node);
    if (overflowStylePatterns.includes(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root2;
}
let supportsPassive = false;
if (canUseDom) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
let totalLockCount = 0;
const BODY_LOCK_CLASS = "adm-overflow-hidden";
function useLockScroll(rootRef, shouldLock) {
  const touch = useTouch();
  const onTouchMove = (event) => {
    touch.move(event);
    const direction = touch.deltaY.current > 0 ? "10" : "01";
    const el = getScrollParent(event.target, rootRef.current);
    if (!el)
      return;
    const {
      scrollHeight,
      offsetHeight,
      scrollTop
    } = el;
    let status = "11";
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01";
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10";
    }
    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };
  const lock = () => {
    document.addEventListener("touchstart", touch.start);
    document.addEventListener("touchmove", onTouchMove, supportsPassive ? {
      passive: false
    } : false);
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  };
  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener("touchstart", touch.start);
      document.removeEventListener("touchmove", onTouchMove);
      totalLockCount--;
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };
  useEffect(() => {
    if (shouldLock) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [shouldLock]);
}
var reactDom = { exports: {} };
var reactDom_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
      return test2[n];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to2 = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty$2.call(from, key)) {
        to2[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to2[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to2;
};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  var f, g, h, k;
  if (typeof performance === "object" && typeof performance.now === "function") {
    var l = performance;
    exports.unstable_now = function() {
      return l.now();
    };
  } else {
    var p = Date, q = p.now();
    exports.unstable_now = function() {
      return p.now() - q;
    };
  }
  if (typeof window === "undefined" || typeof MessageChannel !== "function") {
    var t = null, u = null, w = function() {
      if (t !== null)
        try {
          var a = exports.unstable_now();
          t(true, a);
          t = null;
        } catch (b) {
          throw setTimeout(w, 0), b;
        }
    };
    f = function(a) {
      t !== null ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
    };
    g = function(a, b) {
      u = setTimeout(a, b);
    };
    h = function() {
      clearTimeout(u);
    };
    exports.unstable_shouldYield = function() {
      return false;
    };
    k = exports.unstable_forceFrameRate = function() {
    };
  } else {
    var x = window.setTimeout, y2 = window.clearTimeout;
    if (typeof console !== "undefined") {
      var z = window.cancelAnimationFrame;
      typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      typeof z !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    }
    var A = false, B2 = null, C = -1, D2 = 5, E = 0;
    exports.unstable_shouldYield = function() {
      return exports.unstable_now() >= E;
    };
    k = function() {
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    var F2 = new MessageChannel(), G2 = F2.port2;
    F2.port1.onmessage = function() {
      if (B2 !== null) {
        var a = exports.unstable_now();
        E = a + D2;
        try {
          B2(true, a) ? G2.postMessage(null) : (A = false, B2 = null);
        } catch (b) {
          throw G2.postMessage(null), b;
        }
      } else
        A = false;
    };
    f = function(a) {
      B2 = a;
      A || (A = true, G2.postMessage(null));
    };
    g = function(a, b) {
      C = x(function() {
        a(exports.unstable_now());
      }, b);
    };
    h = function() {
      y2(C);
      C = -1;
    };
  }
  function H2(a, b) {
    var c = a.length;
    a.push(b);
    a:
      for (; ; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (e !== void 0 && 0 < I2(e, b))
          a[d] = b, a[c] = e, c = d;
        else
          break a;
      }
  }
  function J(a) {
    a = a[0];
    return a === void 0 ? null : a;
  }
  function K(a) {
    var b = a[0];
    if (b !== void 0) {
      var c = a.pop();
      if (c !== b) {
        a[0] = c;
        a:
          for (var d = 0, e = a.length; d < e; ) {
            var m2 = 2 * (d + 1) - 1, n = a[m2], v = m2 + 1, r2 = a[v];
            if (n !== void 0 && 0 > I2(n, c))
              r2 !== void 0 && 0 > I2(r2, n) ? (a[d] = r2, a[v] = c, d = v) : (a[d] = n, a[m2] = c, d = m2);
            else if (r2 !== void 0 && 0 > I2(r2, c))
              a[d] = r2, a[v] = c, d = v;
            else
              break a;
          }
      }
      return b;
    }
    return null;
  }
  function I2(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return c !== 0 ? c : a.id - b.id;
  }
  var L = [], M2 = [], N2 = 1, O2 = null, P2 = 3, Q = false, R2 = false, S2 = false;
  function T2(a) {
    for (var b = J(M2); b !== null; ) {
      if (b.callback === null)
        K(M2);
      else if (b.startTime <= a)
        K(M2), b.sortIndex = b.expirationTime, H2(L, b);
      else
        break;
      b = J(M2);
    }
  }
  function U2(a) {
    S2 = false;
    T2(a);
    if (!R2)
      if (J(L) !== null)
        R2 = true, f(V2);
      else {
        var b = J(M2);
        b !== null && g(U2, b.startTime - a);
      }
  }
  function V2(a, b) {
    R2 = false;
    S2 && (S2 = false, h());
    Q = true;
    var c = P2;
    try {
      T2(b);
      for (O2 = J(L); O2 !== null && (!(O2.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
        var d = O2.callback;
        if (typeof d === "function") {
          O2.callback = null;
          P2 = O2.priorityLevel;
          var e = d(O2.expirationTime <= b);
          b = exports.unstable_now();
          typeof e === "function" ? O2.callback = e : O2 === J(L) && K(L);
          T2(b);
        } else
          K(L);
        O2 = J(L);
      }
      if (O2 !== null)
        var m2 = true;
      else {
        var n = J(M2);
        n !== null && g(U2, n.startTime - b);
        m2 = false;
      }
      return m2;
    } finally {
      O2 = null, P2 = c, Q = false;
    }
  }
  var W2 = k;
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    R2 || Q || (R2 = true, f(V2));
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return P2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return J(L);
  };
  exports.unstable_next = function(a) {
    switch (P2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = P2;
    }
    var c = P2;
    P2 = b;
    try {
      return a();
    } finally {
      P2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = W2;
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = P2;
    P2 = a;
    try {
      return b();
    } finally {
      P2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    typeof c === "object" && c !== null ? (c = c.delay, c = typeof c === "number" && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: N2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, H2(M2, a), J(L) === null && a === J(M2) && (S2 ? h() : S2 = true, g(U2, c - d))) : (a.sortIndex = e, H2(L, a), R2 || Q || (R2 = true, f(V2)));
    return a;
  };
  exports.unstable_wrapCallback = function(a) {
    var b = P2;
    return function() {
      var c = P2;
      P2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        P2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = React$1, m = objectAssign, r = scheduler.exports;
function y(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
if (!aa)
  throw Error(y(227));
var ba = /* @__PURE__ */ new Set(), ca = {};
function da(a, b) {
  ea(a, b);
  ea(a + "Capture", b);
}
function ea(a, b) {
  ca[a] = b;
  for (a = 0; a < b.length; a++)
    ba.add(b[a]);
}
var fa = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined"), ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ia = Object.prototype.hasOwnProperty, ja = {}, ka = {};
function la(a) {
  if (ia.call(ka, a))
    return true;
  if (ia.call(ja, a))
    return false;
  if (ha.test(a))
    return ka[a] = true;
  ja[a] = true;
  return false;
}
function ma(a, b, c, d) {
  if (c !== null && c.type === 0)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (c !== null)
        return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return a !== "data-" && a !== "aria-";
    default:
      return false;
  }
}
function na(a, b, c, d) {
  if (b === null || typeof b === "undefined" || ma(a, b, c, d))
    return true;
  if (d)
    return false;
  if (c !== null)
    switch (c.type) {
      case 3:
        return !b;
      case 4:
        return b === false;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function B(a, b, c, d, e, f, g) {
  this.acceptsBooleans = b === 2 || b === 3 || b === 4;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
  this.removeEmptyString = g;
}
var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  D[a] = new B(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  D[b] = new B(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  D[a] = new B(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  D[a] = new B(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  D[a] = new B(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  D[a] = new B(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  D[a] = new B(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  D[a] = new B(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  D[a] = new B(a, 5, false, a.toLowerCase(), null, false, false);
});
var oa = /[\-:]([a-z])/g;
function pa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  D[a] = new B(a, 1, false, a.toLowerCase(), null, false, false);
});
D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  D[a] = new B(a, 1, false, a.toLowerCase(), null, true, true);
});
function qa(a, b, c, d) {
  var e = D.hasOwnProperty(b) ? D[b] : null;
  var f = e !== null ? e.type === 0 : d ? false : !(2 < b.length) || b[0] !== "o" && b[0] !== "O" || b[1] !== "n" && b[1] !== "N" ? false : true;
  f || (na(b, c, e, d) && (c = null), d || e === null ? la(b) && (c === null ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = c === null ? e.type === 3 ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, c === null ? a.removeAttribute(b) : (e = e.type, c = e === 3 || e === 4 && c === true ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}
var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = 60103, ta = 60106, ua = 60107, wa = 60108, xa = 60114, ya = 60109, za = 60110, Aa = 60112, Ba = 60113, Ca = 60120, Da = 60115, Ea = 60116, Fa = 60121, Ga = 60128, Ha = 60129, Ia = 60130, Ja = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  var E = Symbol.for;
  sa = E("react.element");
  ta = E("react.portal");
  ua = E("react.fragment");
  wa = E("react.strict_mode");
  xa = E("react.profiler");
  ya = E("react.provider");
  za = E("react.context");
  Aa = E("react.forward_ref");
  Ba = E("react.suspense");
  Ca = E("react.suspense_list");
  Da = E("react.memo");
  Ea = E("react.lazy");
  Fa = E("react.block");
  E("react.scope");
  Ga = E("react.opaque.id");
  Ha = E("react.debug_trace_mode");
  Ia = E("react.offscreen");
  Ja = E("react.legacy_hidden");
}
var Ka = typeof Symbol === "function" && Symbol.iterator;
function La(a) {
  if (a === null || typeof a !== "object")
    return null;
  a = Ka && a[Ka] || a["@@iterator"];
  return typeof a === "function" ? a : null;
}
var Ma;
function Na(a) {
  if (Ma === void 0)
    try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      Ma = b && b[1] || "";
    }
  return "\n" + Ma + a;
}
var Oa = false;
function Pa(a, b) {
  if (!a || Oa)
    return "";
  Oa = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect === "object" && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (k) {
          var d = k;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (k) {
          d = k;
        }
        a.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (k) {
        d = k;
      }
      a();
    }
  } catch (k) {
    if (k && d && typeof k.stack === "string") {
      for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
        h--;
      for (; 1 <= g && 0 <= h; g--, h--)
        if (e[g] !== f[h]) {
          if (g !== 1 || h !== 1) {
            do
              if (g--, h--, 0 > h || e[g] !== f[h])
                return "\n" + e[g].replace(" at new ", " at ");
            while (1 <= g && 0 <= h);
          }
          break;
        }
    }
  } finally {
    Oa = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
}
function Qa(a) {
  switch (a.tag) {
    case 5:
      return Na(a.type);
    case 16:
      return Na("Lazy");
    case 13:
      return Na("Suspense");
    case 19:
      return Na("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Pa(a.type, false), a;
    case 11:
      return a = Pa(a.type.render, false), a;
    case 22:
      return a = Pa(a.type._render, false), a;
    case 1:
      return a = Pa(a.type, true), a;
    default:
      return "";
  }
}
function Ra(a) {
  if (a == null)
    return null;
  if (typeof a === "function")
    return a.displayName || a.name || null;
  if (typeof a === "string")
    return a;
  switch (a) {
    case ua:
      return "Fragment";
    case ta:
      return "Portal";
    case xa:
      return "Profiler";
    case wa:
      return "StrictMode";
    case Ba:
      return "Suspense";
    case Ca:
      return "SuspenseList";
  }
  if (typeof a === "object")
    switch (a.$$typeof) {
      case za:
        return (a.displayName || "Context") + ".Consumer";
      case ya:
        return (a._context.displayName || "Context") + ".Provider";
      case Aa:
        var b = a.render;
        b = b.displayName || b.name || "";
        return a.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
      case Da:
        return Ra(a.type);
      case Fa:
        return Ra(a._render);
      case Ea:
        b = a._payload;
        a = a._init;
        try {
          return Ra(a(b));
        } catch (c) {
        }
    }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && a.toLowerCase() === "input" && (b === "checkbox" || b === "radio");
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && typeof c !== "undefined" && typeof c.get === "function" && typeof c.set === "function") {
    var e = c.get, f = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a)
    return false;
  var b = a._valueTracker;
  if (!b)
    return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || (typeof document !== "undefined" ? document : void 0);
  if (typeof a === "undefined")
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return m({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c != null ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = b.defaultValue == null ? "" : b.defaultValue, d = b.checked != null ? b.checked : b.defaultChecked;
  c = Sa(b.value != null ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: b.type === "checkbox" || b.type === "radio" ? b.checked != null : b.value != null };
}
function $a(a, b) {
  b = b.checked;
  b != null && qa(a, "checked", b, false);
}
function ab(a, b) {
  $a(a, b);
  var c = Sa(b.value), d = b.type;
  if (c != null)
    if (d === "number") {
      if (c === 0 && a.value === "" || a.value != c)
        a.value = "" + c;
    } else
      a.value !== "" + c && (a.value = "" + c);
  else if (d === "submit" || d === "reset") {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
  b.checked == null && b.defaultChecked != null && (a.defaultChecked = !!b.defaultChecked);
}
function cb(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!(d !== "submit" && d !== "reset" || b.value !== void 0 && b.value !== null))
      return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  c !== "" && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  c !== "" && (a.name = c);
}
function bb(a, b, c) {
  if (b !== "number" || Xa(a.ownerDocument) !== a)
    c == null ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
function db(a) {
  var b = "";
  aa.Children.forEach(a, function(a2) {
    a2 != null && (b += a2);
  });
  return b;
}
function eb(a, b) {
  a = m({ children: void 0 }, b);
  if (b = db(b.children))
    a.children = b;
  return a;
}
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++)
      b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++)
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      b !== null || a[e].disabled || (b = a[e]);
    }
    b !== null && (b.selected = true);
  }
}
function gb(a, b) {
  if (b.dangerouslySetInnerHTML != null)
    throw Error(y(91));
  return m({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (c == null) {
    c = b.children;
    b = b.defaultValue;
    if (c != null) {
      if (b != null)
        throw Error(y(92));
      if (Array.isArray(c)) {
        if (!(1 >= c.length))
          throw Error(y(93));
        c = c[0];
      }
      b = c;
    }
    b == null && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  c != null && (c = "" + c, c !== a.value && (a.value = c), b.defaultValue == null && a.defaultValue !== c && (a.defaultValue = c));
  d != null && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && b !== "" && b !== null && (a.value = b);
}
var kb = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
function lb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function mb(a, b) {
  return a == null || a === "http://www.w3.org/1999/xhtml" ? lb(b) : a === "http://www.w3.org/2000/svg" && b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a;
}
var nb, ob = function(a) {
  return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if (a.namespaceURI !== kb.svg || "innerHTML" in a)
    a.innerHTML = b;
  else {
    nb = nb || document.createElement("div");
    nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = nb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b.firstChild; )
      a.appendChild(b.firstChild);
  }
});
function pb(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && c.nodeType === 3) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var qb = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, rb = ["Webkit", "ms", "Moz", "O"];
Object.keys(qb).forEach(function(a) {
  rb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    qb[b] = qb[a];
  });
});
function sb(a, b, c) {
  return b == null || typeof b === "boolean" || b === "" ? "" : c || typeof b !== "number" || b === 0 || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
}
function tb(a, b) {
  a = a.style;
  for (var c in b)
    if (b.hasOwnProperty(c)) {
      var d = c.indexOf("--") === 0, e = sb(c, b[c], d);
      c === "float" && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
}
var ub = m({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function vb(a, b) {
  if (b) {
    if (ub[a] && (b.children != null || b.dangerouslySetInnerHTML != null))
      throw Error(y(137, a));
    if (b.dangerouslySetInnerHTML != null) {
      if (b.children != null)
        throw Error(y(60));
      if (!(typeof b.dangerouslySetInnerHTML === "object" && "__html" in b.dangerouslySetInnerHTML))
        throw Error(y(61));
    }
    if (b.style != null && typeof b.style !== "object")
      throw Error(y(62));
  }
}
function wb(a, b) {
  if (a.indexOf("-") === -1)
    return typeof b.is === "string";
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return a.nodeType === 3 ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if (typeof yb !== "function")
      throw Error(y(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b)
      for (a = 0; a < b.length; a++)
        Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb(a, b, c, d, e) {
  return a(b, c, d, e);
}
function Ib() {
}
var Jb = Gb, Kb = false, Lb = false;
function Mb() {
  if (zb !== null || Ab !== null)
    Ib(), Fb();
}
function Nb(a, b, c) {
  if (Lb)
    return a(b, c);
  Lb = true;
  try {
    return Jb(a, b, c);
  } finally {
    Lb = false, Mb();
  }
}
function Ob(a, b) {
  var c = a.stateNode;
  if (c === null)
    return null;
  var d = Db(c);
  if (d === null)
    return null;
  c = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !(a === "button" || a === "input" || a === "select" || a === "textarea"));
        a = !d;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c && typeof c !== "function")
    throw Error(y(231, b, typeof c));
  return c;
}
var Pb = false;
if (fa)
  try {
    var Qb = {};
    Object.defineProperty(Qb, "passive", { get: function() {
      Pb = true;
    } });
    window.addEventListener("test", Qb, Qb);
    window.removeEventListener("test", Qb, Qb);
  } catch (a) {
    Pb = false;
  }
function Rb(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l);
  } catch (n) {
    this.onError(n);
  }
}
var Sb = false, Tb = null, Ub = false, Vb = null, Wb = { onError: function(a) {
  Sb = true;
  Tb = a;
} };
function Xb(a, b, c, d, e, f, g, h, k) {
  Sb = false;
  Tb = null;
  Rb.apply(Wb, arguments);
}
function Yb(a, b, c, d, e, f, g, h, k) {
  Xb.apply(this, arguments);
  if (Sb) {
    if (Sb) {
      var l = Tb;
      Sb = false;
      Tb = null;
    } else
      throw Error(y(198));
    Ub || (Ub = true, Vb = l);
  }
}
function Zb(a) {
  var b = a, c = a;
  if (a.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a = b;
    do
      b = a, (b.flags & 1026) !== 0 && (c = b.return), a = b.return;
    while (a);
  }
  return b.tag === 3 ? c : null;
}
function $b(a) {
  if (a.tag === 13) {
    var b = a.memoizedState;
    b === null && (a = a.alternate, a !== null && (b = a.memoizedState));
    if (b !== null)
      return b.dehydrated;
  }
  return null;
}
function ac(a) {
  if (Zb(a) !== a)
    throw Error(y(188));
}
function bc(a) {
  var b = a.alternate;
  if (!b) {
    b = Zb(a);
    if (b === null)
      throw Error(y(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (e === null)
      break;
    var f = e.alternate;
    if (f === null) {
      d = e.return;
      if (d !== null) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f.child) {
      for (f = e.child; f; ) {
        if (f === c)
          return ac(e), a;
        if (f === d)
          return ac(e), b;
        f = f.sibling;
      }
      throw Error(y(188));
    }
    if (c.return !== d.return)
      c = e, d = f;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f.child; h; ) {
          if (h === c) {
            g = true;
            c = f;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g)
          throw Error(y(189));
      }
    }
    if (c.alternate !== d)
      throw Error(y(190));
  }
  if (c.tag !== 3)
    throw Error(y(188));
  return c.stateNode.current === c ? a : b;
}
function cc(a) {
  a = bc(a);
  if (!a)
    return null;
  for (var b = a; ; ) {
    if (b.tag === 5 || b.tag === 6)
      return b;
    if (b.child)
      b.child.return = b, b = b.child;
    else {
      if (b === a)
        break;
      for (; !b.sibling; ) {
        if (!b.return || b.return === a)
          return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return null;
}
function dc(a, b) {
  for (var c = a.alternate; b !== null; ) {
    if (b === a || b === c)
      return true;
    b = b.return;
  }
  return false;
}
var ec, fc, gc, hc, ic = false, jc = [], kc = null, lc = null, mc = null, nc = /* @__PURE__ */ new Map(), oc = /* @__PURE__ */ new Map(), pc = [], qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a, b, c, d, e) {
  return { blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d] };
}
function sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      kc = null;
      break;
    case "dragenter":
    case "dragleave":
      lc = null;
      break;
    case "mouseover":
    case "mouseout":
      mc = null;
      break;
    case "pointerover":
    case "pointerout":
      nc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      oc.delete(b.pointerId);
  }
}
function tc(a, b, c, d, e, f) {
  if (a === null || a.nativeEvent !== f)
    return a = rc(b, c, d, e, f), b !== null && (b = Cb(b), b !== null && fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  e !== null && b.indexOf(e) === -1 && b.push(e);
  return a;
}
function uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return kc = tc(kc, a, b, c, d, e), true;
    case "dragenter":
      return lc = tc(lc, a, b, c, d, e), true;
    case "mouseover":
      return mc = tc(mc, a, b, c, d, e), true;
    case "pointerover":
      var f = e.pointerId;
      nc.set(f, tc(nc.get(f) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), true;
  }
  return false;
}
function vc(a) {
  var b = wc(a.target);
  if (b !== null) {
    var c = Zb(b);
    if (c !== null) {
      if (b = c.tag, b === 13) {
        if (b = $b(c), b !== null) {
          a.blockedOn = b;
          hc(a.lanePriority, function() {
            r.unstable_runWithPriority(a.priority, function() {
              gc(c);
            });
          });
          return;
        }
      } else if (b === 3 && c.stateNode.hydrate) {
        a.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function xc(a) {
  if (a.blockedOn !== null)
    return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (c !== null)
      return b = Cb(c), b !== null && fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function zc(a, b, c) {
  xc(a) && c.delete(b);
}
function Ac() {
  for (ic = false; 0 < jc.length; ) {
    var a = jc[0];
    if (a.blockedOn !== null) {
      a = Cb(a.blockedOn);
      a !== null && ec(a);
      break;
    }
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (c !== null) {
        a.blockedOn = c;
        break;
      }
      b.shift();
    }
    a.blockedOn === null && jc.shift();
  }
  kc !== null && xc(kc) && (kc = null);
  lc !== null && xc(lc) && (lc = null);
  mc !== null && xc(mc) && (mc = null);
  nc.forEach(zc);
  oc.forEach(zc);
}
function Bc(a, b) {
  a.blockedOn === b && (a.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
}
function Cc(a) {
  function b(b2) {
    return Bc(b2, a);
  }
  if (0 < jc.length) {
    Bc(jc[0], a);
    for (var c = 1; c < jc.length; c++) {
      var d = jc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  kc !== null && Bc(kc, a);
  lc !== null && Bc(lc, a);
  mc !== null && Bc(mc, a);
  nc.forEach(b);
  oc.forEach(b);
  for (c = 0; c < pc.length; c++)
    d = pc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < pc.length && (c = pc[0], c.blockedOn === null); )
    vc(c), c.blockedOn === null && pc.shift();
}
function Dc(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var Ec = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") }, Fc = {}, Gc = {};
fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
function Hc(a) {
  if (Fc[a])
    return Fc[a];
  if (!Ec[a])
    return a;
  var b = Ec[a], c;
  for (c in b)
    if (b.hasOwnProperty(c) && c in Gc)
      return Fc[a] = b[c];
  return a;
}
var Ic = Hc("animationend"), Jc = Hc("animationiteration"), Kc = Hc("animationstart"), Lc = Hc("transitionend"), Mc = /* @__PURE__ */ new Map(), Nc = /* @__PURE__ */ new Map(), Oc = [
  "abort",
  "abort",
  Ic,
  "animationEnd",
  Jc,
  "animationIteration",
  Kc,
  "animationStart",
  "canplay",
  "canPlay",
  "canplaythrough",
  "canPlayThrough",
  "durationchange",
  "durationChange",
  "emptied",
  "emptied",
  "encrypted",
  "encrypted",
  "ended",
  "ended",
  "error",
  "error",
  "gotpointercapture",
  "gotPointerCapture",
  "load",
  "load",
  "loadeddata",
  "loadedData",
  "loadedmetadata",
  "loadedMetadata",
  "loadstart",
  "loadStart",
  "lostpointercapture",
  "lostPointerCapture",
  "playing",
  "playing",
  "progress",
  "progress",
  "seeking",
  "seeking",
  "stalled",
  "stalled",
  "suspend",
  "suspend",
  "timeupdate",
  "timeUpdate",
  Lc,
  "transitionEnd",
  "waiting",
  "waiting"
];
function Pc(a, b) {
  for (var c = 0; c < a.length; c += 2) {
    var d = a[c], e = a[c + 1];
    e = "on" + (e[0].toUpperCase() + e.slice(1));
    Nc.set(d, b);
    Mc.set(d, e);
    da(e, [d]);
  }
}
var Qc = r.unstable_now;
Qc();
var F = 8;
function Rc(a) {
  if ((1 & a) !== 0)
    return F = 15, 1;
  if ((2 & a) !== 0)
    return F = 14, 2;
  if ((4 & a) !== 0)
    return F = 13, 4;
  var b = 24 & a;
  if (b !== 0)
    return F = 12, b;
  if ((a & 32) !== 0)
    return F = 11, 32;
  b = 192 & a;
  if (b !== 0)
    return F = 10, b;
  if ((a & 256) !== 0)
    return F = 9, 256;
  b = 3584 & a;
  if (b !== 0)
    return F = 8, b;
  if ((a & 4096) !== 0)
    return F = 7, 4096;
  b = 4186112 & a;
  if (b !== 0)
    return F = 6, b;
  b = 62914560 & a;
  if (b !== 0)
    return F = 5, b;
  if (a & 67108864)
    return F = 4, 67108864;
  if ((a & 134217728) !== 0)
    return F = 3, 134217728;
  b = 805306368 & a;
  if (b !== 0)
    return F = 2, b;
  if ((1073741824 & a) !== 0)
    return F = 1, 1073741824;
  F = 8;
  return a;
}
function Sc(a) {
  switch (a) {
    case 99:
      return 15;
    case 98:
      return 10;
    case 97:
    case 96:
      return 8;
    case 95:
      return 2;
    default:
      return 0;
  }
}
function Tc(a) {
  switch (a) {
    case 15:
    case 14:
      return 99;
    case 13:
    case 12:
    case 11:
    case 10:
      return 98;
    case 9:
    case 8:
    case 7:
    case 6:
    case 4:
    case 5:
      return 97;
    case 3:
    case 2:
    case 1:
      return 95;
    case 0:
      return 90;
    default:
      throw Error(y(358, a));
  }
}
function Uc(a, b) {
  var c = a.pendingLanes;
  if (c === 0)
    return F = 0;
  var d = 0, e = 0, f = a.expiredLanes, g = a.suspendedLanes, h = a.pingedLanes;
  if (f !== 0)
    d = f, e = F = 15;
  else if (f = c & 134217727, f !== 0) {
    var k = f & ~g;
    k !== 0 ? (d = Rc(k), e = F) : (h &= f, h !== 0 && (d = Rc(h), e = F));
  } else
    f = c & ~g, f !== 0 ? (d = Rc(f), e = F) : h !== 0 && (d = Rc(h), e = F);
  if (d === 0)
    return 0;
  d = 31 - Vc(d);
  d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
  if (b !== 0 && b !== d && (b & g) === 0) {
    Rc(b);
    if (e <= F)
      return b;
    F = e;
  }
  b = a.entangledLanes;
  if (b !== 0)
    for (a = a.entanglements, b &= d; 0 < b; )
      c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function Wc(a) {
  a = a.pendingLanes & -1073741825;
  return a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
}
function Xc(a, b) {
  switch (a) {
    case 15:
      return 1;
    case 14:
      return 2;
    case 12:
      return a = Yc(24 & ~b), a === 0 ? Xc(10, b) : a;
    case 10:
      return a = Yc(192 & ~b), a === 0 ? Xc(8, b) : a;
    case 8:
      return a = Yc(3584 & ~b), a === 0 && (a = Yc(4186112 & ~b), a === 0 && (a = 512)), a;
    case 2:
      return b = Yc(805306368 & ~b), b === 0 && (b = 268435456), b;
  }
  throw Error(y(358, a));
}
function Yc(a) {
  return a & -a;
}
function Zc(a) {
  for (var b = [], c = 0; 31 > c; c++)
    b.push(a);
  return b;
}
function $c(a, b, c) {
  a.pendingLanes |= b;
  var d = b - 1;
  a.suspendedLanes &= d;
  a.pingedLanes &= d;
  a = a.eventTimes;
  b = 31 - Vc(b);
  a[b] = c;
}
var Vc = Math.clz32 ? Math.clz32 : ad, bd = Math.log, cd = Math.LN2;
function ad(a) {
  return a === 0 ? 32 : 31 - (bd(a) / cd | 0) | 0;
}
var dd = r.unstable_UserBlockingPriority, ed = r.unstable_runWithPriority, fd = true;
function gd(a, b, c, d) {
  Kb || Ib();
  var e = hd, f = Kb;
  Kb = true;
  try {
    Hb(e, a, b, c, d);
  } finally {
    (Kb = f) || Mb();
  }
}
function id(a, b, c, d) {
  ed(dd, hd.bind(null, a, b, c, d));
}
function hd(a, b, c, d) {
  if (fd) {
    var e;
    if ((e = (b & 4) === 0) && 0 < jc.length && -1 < qc.indexOf(a))
      a = rc(null, a, b, c, d), jc.push(a);
    else {
      var f = yc(a, b, c, d);
      if (f === null)
        e && sc(a, d);
      else {
        if (e) {
          if (-1 < qc.indexOf(a)) {
            a = rc(f, a, b, c, d);
            jc.push(a);
            return;
          }
          if (uc(f, a, b, c, d))
            return;
          sc(a, d);
        }
        jd(a, b, d, null, c);
      }
    }
  }
}
function yc(a, b, c, d) {
  var e = xb(d);
  e = wc(e);
  if (e !== null) {
    var f = Zb(e);
    if (f === null)
      e = null;
    else {
      var g = f.tag;
      if (g === 13) {
        e = $b(f);
        if (e !== null)
          return e;
        e = null;
      } else if (g === 3) {
        if (f.stateNode.hydrate)
          return f.tag === 3 ? f.stateNode.containerInfo : null;
        e = null;
      } else
        f !== e && (e = null);
    }
  }
  jd(a, b, d, e, c);
  return null;
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++)
    ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
    ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, a === 0 && b === 13 && (a = 13)) : a = b;
  a === 10 && (a = 13);
  return 32 <= a || a === 13 ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f;
    this.target = g;
    this.currentTarget = null;
    for (var c in a)
      a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
    this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === false) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  m(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : typeof a2.returnValue !== "unknown" && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : typeof a2.cancelBubble !== "unknown" && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = m({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = m({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== yd && (yd && a.type === "mousemove" ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = m({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = m({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = m({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = m({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = m({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = m({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if (b !== "Unidentified")
      return b;
  }
  return a.type === "keypress" ? (a = od(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return a.type === "keypress" ? od(a) : 0;
}, keyCode: function(a) {
  return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
}, which: function(a) {
  return a.type === "keypress" ? od(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = m({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = m({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = m({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = m({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = fa && "CompositionEvent" in window, be = null;
fa && "documentMode" in document && (be = document.documentMode);
var ce = fa && "TextEvent" in window && !be, de = fa && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return $d.indexOf(b.keyCode) !== -1;
    case "keydown":
      return b.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return typeof a === "object" && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (b.which !== 32)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie)
    return a === "compositionend" || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && b.locale !== "ko" ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b === "input" ? !!le[a.type] : b === "textarea" ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b))
    return a;
}
function ve(a, b) {
  if (a === "change")
    return b;
}
var we = false;
if (fa) {
  var xe;
  if (fa) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = typeof ze.oninput === "function";
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if (a.propertyName === "value" && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    a = re;
    if (Kb)
      a(b);
    else {
      Kb = true;
      try {
        Gb(a, b);
      } finally {
        Kb = false, Mb();
      }
    }
  }
}
function Ce(a, b, c) {
  a === "focusin" ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : a === "focusout" && Ae();
}
function De(a) {
  if (a === "selectionchange" || a === "keyup" || a === "keydown")
    return te(qe);
}
function Ee(a, b) {
  if (a === "click")
    return te(b);
}
function Fe(a, b) {
  if (a === "input" || a === "change")
    return te(b);
}
function Ge(a, b) {
  return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = typeof Object.is === "function" ? Object.is : Ge, Ie = Object.prototype.hasOwnProperty;
function Je(a, b) {
  if (He(a, b))
    return true;
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null)
    return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length)
    return false;
  for (d = 0; d < c.length; d++)
    if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]]))
      return false;
  return true;
}
function Ke(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Le(a, b) {
  var c = Ke(a);
  a = 0;
  for (var d; c; ) {
    if (c.nodeType === 3) {
      d = a + c.textContent.length;
      if (a <= b && d >= b)
        return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Ke(c);
  }
}
function Me(a, b) {
  return a && b ? a === b ? true : a && a.nodeType === 3 ? false : b && b.nodeType === 3 ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Ne() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = typeof b.contentWindow.location.href === "string";
    } catch (d) {
      c = false;
    }
    if (c)
      a = b.contentWindow;
    else
      break;
    b = Xa(a.document);
  }
  return b;
}
function Oe(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && (b === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || b === "textarea" || a.contentEditable === "true");
}
var Pe = fa && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
  Te || Qe == null || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
Pc(Oc, 2);
for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
  Nc.set(Ve[We], 0);
ea("onMouseEnter", ["mouseout", "mouseover"]);
ea("onMouseLeave", ["mouseout", "mouseover"]);
ea("onPointerEnter", ["pointerout", "pointerover"]);
ea("onPointerLeave", ["pointerout", "pointerover"]);
da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Yb(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = (b & 4) !== 0;
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f = void 0;
      if (b)
        for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k = h.instance, l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped())
            break a;
          Ze(e, h, l);
          f = k;
        }
      else
        for (g = 0; g < d.length; g++) {
          h = d[g];
          k = h.instance;
          l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped())
            break a;
          Ze(e, h, l);
          f = k;
        }
    }
  }
  if (Ub)
    throw a = Vb, Ub = false, Vb = null, a;
}
function G(a, b) {
  var c = $e(b), d = a + "__bubble";
  c.has(d) || (af(b, a, 2, false), c.add(d));
}
var bf = "_reactListening" + Math.random().toString(36).slice(2);
function cf(a) {
  a[bf] || (a[bf] = true, ba.forEach(function(b) {
    Ye.has(b) || df(b, false, a, null);
    df(b, true, a, null);
  }));
}
function df(a, b, c, d) {
  var e = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, f = c;
  a === "selectionchange" && c.nodeType !== 9 && (f = c.ownerDocument);
  if (d !== null && !b && Ye.has(a)) {
    if (a !== "scroll")
      return;
    e |= 2;
    f = d;
  }
  var g = $e(f), h = a + "__" + (b ? "capture" : "bubble");
  g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
}
function af(a, b, c, d) {
  var e = Nc.get(b);
  switch (e === void 0 ? 2 : e) {
    case 0:
      e = gd;
      break;
    case 1:
      e = id;
      break;
    default:
      e = hd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Pb || b !== "touchstart" && b !== "touchmove" && b !== "wheel" || (e = true);
  d ? e !== void 0 ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : e !== void 0 ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function jd(a, b, c, d, e) {
  var f = d;
  if ((b & 1) === 0 && (b & 2) === 0 && d !== null)
    a:
      for (; ; ) {
        if (d === null)
          return;
        var g = d.tag;
        if (g === 3 || g === 4) {
          var h = d.stateNode.containerInfo;
          if (h === e || h.nodeType === 8 && h.parentNode === e)
            break;
          if (g === 4)
            for (g = d.return; g !== null; ) {
              var k = g.tag;
              if (k === 3 || k === 4) {
                if (k = g.stateNode.containerInfo, k === e || k.nodeType === 8 && k.parentNode === e)
                  return;
              }
              g = g.return;
            }
          for (; h !== null; ) {
            g = wc(h);
            if (g === null)
              return;
            k = g.tag;
            if (k === 5 || k === 6) {
              d = f = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
  Nb(function() {
    var d2 = f, e2 = xb(c), g2 = [];
    a: {
      var h2 = Mc.get(a);
      if (h2 !== void 0) {
        var k2 = td, x = a;
        switch (a) {
          case "keypress":
            if (od(c) === 0)
              break a;
          case "keydown":
          case "keyup":
            k2 = Rd;
            break;
          case "focusin":
            x = "focus";
            k2 = Fd;
            break;
          case "focusout":
            x = "blur";
            k2 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k2 = Fd;
            break;
          case "click":
            if (c.button === 2)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k2 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k2 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k2 = Vd;
            break;
          case Ic:
          case Jc:
          case Kc:
            k2 = Hd;
            break;
          case Lc:
            k2 = Xd;
            break;
          case "scroll":
            k2 = vd;
            break;
          case "wheel":
            k2 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k2 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k2 = Td;
        }
        var w = (b & 4) !== 0, z = !w && a === "scroll", u = w ? h2 !== null ? h2 + "Capture" : null : h2;
        w = [];
        for (var t = d2, q; t !== null; ) {
          q = t;
          var v = q.stateNode;
          q.tag === 5 && v !== null && (q = v, u !== null && (v = Ob(t, u), v != null && w.push(ef(t, v, q))));
          if (z)
            break;
          t = t.return;
        }
        0 < w.length && (h2 = new k2(h2, x, null, c, e2), g2.push({ event: h2, listeners: w }));
      }
    }
    if ((b & 7) === 0) {
      a: {
        h2 = a === "mouseover" || a === "pointerover";
        k2 = a === "mouseout" || a === "pointerout";
        if (h2 && (b & 16) === 0 && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff]))
          break a;
        if (k2 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k2) {
            if (x = c.relatedTarget || c.toElement, k2 = d2, x = x ? wc(x) : null, x !== null && (z = Zb(x), x !== z || x.tag !== 5 && x.tag !== 6))
              x = null;
          } else
            k2 = null, x = d2;
          if (k2 !== x) {
            w = Bd;
            v = "onMouseLeave";
            u = "onMouseEnter";
            t = "mouse";
            if (a === "pointerout" || a === "pointerover")
              w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
            z = k2 == null ? h2 : ue(k2);
            q = x == null ? h2 : ue(x);
            h2 = new w(v, t + "leave", k2, c, e2);
            h2.target = z;
            h2.relatedTarget = q;
            v = null;
            wc(e2) === d2 && (w = new w(u, t + "enter", x, c, e2), w.target = q, w.relatedTarget = z, v = w);
            z = v;
            if (k2 && x)
              b: {
                w = k2;
                u = x;
                t = 0;
                for (q = w; q; q = gf(q))
                  t++;
                q = 0;
                for (v = u; v; v = gf(v))
                  q++;
                for (; 0 < t - q; )
                  w = gf(w), t--;
                for (; 0 < q - t; )
                  u = gf(u), q--;
                for (; t--; ) {
                  if (w === u || u !== null && w === u.alternate)
                    break b;
                  w = gf(w);
                  u = gf(u);
                }
                w = null;
              }
            else
              w = null;
            k2 !== null && hf(g2, h2, k2, w, false);
            x !== null && z !== null && hf(g2, z, x, w, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k2 = h2.nodeName && h2.nodeName.toLowerCase();
        if (k2 === "select" || k2 === "input" && h2.type === "file")
          var J = ve;
        else if (me(h2))
          if (we)
            J = Fe;
          else {
            J = De;
            var K = Ce;
          }
        else
          (k2 = h2.nodeName) && k2.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (J = Ee);
        if (J && (J = J(a, d2))) {
          ne(g2, J, c, e2);
          break a;
        }
        K && K(a, h2, d2);
        a === "focusout" && (K = h2._wrapperState) && K.controlled && h2.type === "number" && bb(h2, "number", h2.value);
      }
      K = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(K) || K.contentEditable === "true")
            Qe = K, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var Q;
      if (ae)
        b: {
          switch (a) {
            case "compositionstart":
              var L = "onCompositionStart";
              break b;
            case "compositionend":
              L = "onCompositionEnd";
              break b;
            case "compositionupdate":
              L = "onCompositionUpdate";
              break b;
          }
          L = void 0;
        }
      else
        ie ? ge(a, c) && (L = "onCompositionEnd") : a === "keydown" && c.keyCode === 229 && (L = "onCompositionStart");
      L && (de && c.locale !== "ko" && (ie || L !== "onCompositionStart" ? L === "onCompositionEnd" && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a, null, c, e2), g2.push({ event: L, listeners: K }), Q ? L.data = Q : (Q = he(c), Q !== null && (L.data = Q))));
      if (Q = ce ? je(a, c) : ke(a, c))
        d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = Q);
    }
    se(g2, b);
  });
}
function ef(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; a !== null; ) {
    var e = a, f = e.stateNode;
    e.tag === 5 && f !== null && (e = f, f = Ob(a, c), f != null && d.unshift(ef(a, f, e)), f = Ob(a, b), f != null && d.push(ef(a, f, e)));
    a = a.return;
  }
  return d;
}
function gf(a) {
  if (a === null)
    return null;
  do
    a = a.return;
  while (a && a.tag !== 5);
  return a ? a : null;
}
function hf(a, b, c, d, e) {
  for (var f = b._reactName, g = []; c !== null && c !== d; ) {
    var h = c, k = h.alternate, l = h.stateNode;
    if (k !== null && k === d)
      break;
    h.tag === 5 && l !== null && (h = l, e ? (k = Ob(c, f), k != null && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), k != null && g.push(ef(c, k, h))));
    c = c.return;
  }
  g.length !== 0 && a.push({ event: b, listeners: g });
}
function jf() {
}
var kf = null, lf = null;
function mf(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }
  return false;
}
function nf(a, b) {
  return a === "textarea" || a === "option" || a === "noscript" || typeof b.children === "string" || typeof b.children === "number" || typeof b.dangerouslySetInnerHTML === "object" && b.dangerouslySetInnerHTML !== null && b.dangerouslySetInnerHTML.__html != null;
}
var of = typeof setTimeout === "function" ? setTimeout : void 0, pf = typeof clearTimeout === "function" ? clearTimeout : void 0;
function qf(a) {
  a.nodeType === 1 ? a.textContent = "" : a.nodeType === 9 && (a = a.body, a != null && (a.textContent = ""));
}
function rf(a) {
  for (; a != null; a = a.nextSibling) {
    var b = a.nodeType;
    if (b === 1 || b === 3)
      break;
  }
  return a;
}
function sf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (a.nodeType === 8) {
      var c = a.data;
      if (c === "$" || c === "$!" || c === "$?") {
        if (b === 0)
          return a;
        b--;
      } else
        c === "/$" && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var tf = 0;
function uf(a) {
  return { $$typeof: Ga, toString: a, valueOf: a };
}
var vf = Math.random().toString(36).slice(2), wf = "__reactFiber$" + vf, xf = "__reactProps$" + vf, ff = "__reactContainer$" + vf, yf = "__reactEvents$" + vf;
function wc(a) {
  var b = a[wf];
  if (b)
    return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[ff] || c[wf]) {
      c = b.alternate;
      if (b.child !== null || c !== null && c.child !== null)
        for (a = sf(a); a !== null; ) {
          if (c = a[wf])
            return c;
          a = sf(a);
        }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[wf] || a[ff];
  return !a || a.tag !== 5 && a.tag !== 6 && a.tag !== 13 && a.tag !== 3 ? null : a;
}
function ue(a) {
  if (a.tag === 5 || a.tag === 6)
    return a.stateNode;
  throw Error(y(33));
}
function Db(a) {
  return a[xf] || null;
}
function $e(a) {
  var b = a[yf];
  b === void 0 && (b = a[yf] = /* @__PURE__ */ new Set());
  return b;
}
var zf = [], Af = -1;
function Bf(a) {
  return { current: a };
}
function H(a) {
  0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
}
function I(a, b) {
  Af++;
  zf[Af] = a.current;
  a.current = b;
}
var Cf = {}, M = Bf(Cf), N = Bf(false), Df = Cf;
function Ef(a, b) {
  var c = a.type.contextTypes;
  if (!c)
    return Cf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f;
  for (f in c)
    e[f] = b[f];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Ff(a) {
  a = a.childContextTypes;
  return a !== null && a !== void 0;
}
function Gf() {
  H(N);
  H(M);
}
function Hf(a, b, c) {
  if (M.current !== Cf)
    throw Error(y(168));
  I(M, b);
  I(N, c);
}
function If(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if (typeof d.getChildContext !== "function")
    return c;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in a))
      throw Error(y(108, Ra(b) || "Unknown", e));
  return m({}, c, d);
}
function Jf(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
  Df = M.current;
  I(M, a);
  I(N, N.current);
  return true;
}
function Kf(a, b, c) {
  var d = a.stateNode;
  if (!d)
    throw Error(y(169));
  c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
  I(N, c);
}
var Lf = null, Mf = null, Nf = r.unstable_runWithPriority, Of = r.unstable_scheduleCallback, Pf = r.unstable_cancelCallback, Qf = r.unstable_shouldYield, Rf = r.unstable_requestPaint, Sf = r.unstable_now, Tf = r.unstable_getCurrentPriorityLevel, Uf = r.unstable_ImmediatePriority, Vf = r.unstable_UserBlockingPriority, Wf = r.unstable_NormalPriority, Xf = r.unstable_LowPriority, Yf = r.unstable_IdlePriority, Zf = {}, $f = Rf !== void 0 ? Rf : function() {
}, ag = null, bg = null, cg = false, dg = Sf(), O = 1e4 > dg ? Sf : function() {
  return Sf() - dg;
};
function eg() {
  switch (Tf()) {
    case Uf:
      return 99;
    case Vf:
      return 98;
    case Wf:
      return 97;
    case Xf:
      return 96;
    case Yf:
      return 95;
    default:
      throw Error(y(332));
  }
}
function fg(a) {
  switch (a) {
    case 99:
      return Uf;
    case 98:
      return Vf;
    case 97:
      return Wf;
    case 96:
      return Xf;
    case 95:
      return Yf;
    default:
      throw Error(y(332));
  }
}
function gg(a, b) {
  a = fg(a);
  return Nf(a, b);
}
function hg(a, b, c) {
  a = fg(a);
  return Of(a, b, c);
}
function ig() {
  if (bg !== null) {
    var a = bg;
    bg = null;
    Pf(a);
  }
  jg();
}
function jg() {
  if (!cg && ag !== null) {
    cg = true;
    var a = 0;
    try {
      var b = ag;
      gg(99, function() {
        for (; a < b.length; a++) {
          var c = b[a];
          do
            c = c(true);
          while (c !== null);
        }
      });
      ag = null;
    } catch (c) {
      throw ag !== null && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
    } finally {
      cg = false;
    }
  }
}
var kg = ra.ReactCurrentBatchConfig;
function lg(a, b) {
  if (a && a.defaultProps) {
    b = m({}, b);
    a = a.defaultProps;
    for (var c in a)
      b[c] === void 0 && (b[c] = a[c]);
    return b;
  }
  return b;
}
var mg = Bf(null), ng = null, og = null, pg = null;
function qg() {
  pg = og = ng = null;
}
function rg(a) {
  var b = mg.current;
  H(mg);
  a.type._context._currentValue = b;
}
function sg(a, b) {
  for (; a !== null; ) {
    var c = a.alternate;
    if ((a.childLanes & b) === b)
      if (c === null || (c.childLanes & b) === b)
        break;
      else
        c.childLanes |= b;
    else
      a.childLanes |= b, c !== null && (c.childLanes |= b);
    a = a.return;
  }
}
function tg(a, b) {
  ng = a;
  pg = og = null;
  a = a.dependencies;
  a !== null && a.firstContext !== null && ((a.lanes & b) !== 0 && (ug = true), a.firstContext = null);
}
function vg(a, b) {
  if (pg !== a && b !== false && b !== 0) {
    if (typeof b !== "number" || b === 1073741823)
      pg = a, b = 1073741823;
    b = { context: a, observedBits: b, next: null };
    if (og === null) {
      if (ng === null)
        throw Error(y(308));
      og = b;
      ng.dependencies = { lanes: 0, firstContext: b, responders: null };
    } else
      og = og.next = b;
  }
  return a._currentValue;
}
var wg = false;
function xg(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
}
function yg(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function zg(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function Ag(a, b) {
  a = a.updateQueue;
  if (a !== null) {
    a = a.shared;
    var c = a.pending;
    c === null ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
}
function Bg(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (d !== null && (d = d.updateQueue, c === d)) {
    var e = null, f = null;
    c = c.firstBaseUpdate;
    if (c !== null) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        f === null ? e = f = g : f = f.next = g;
        c = c.next;
      } while (c !== null);
      f === null ? e = f = b : f = f.next = b;
    } else
      e = f = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  a === null ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function Cg(a, b, c, d) {
  var e = a.updateQueue;
  wg = false;
  var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (h !== null) {
    e.shared.pending = null;
    var k = h, l = k.next;
    k.next = null;
    g === null ? f = l : g.next = l;
    g = k;
    var n = a.alternate;
    if (n !== null) {
      n = n.updateQueue;
      var A = n.lastBaseUpdate;
      A !== g && (A === null ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
    }
  }
  if (f !== null) {
    A = e.baseState;
    g = 0;
    n = l = k = null;
    do {
      h = f.lane;
      var p = f.eventTime;
      if ((d & h) === h) {
        n !== null && (n = n.next = {
          eventTime: p,
          lane: 0,
          tag: f.tag,
          payload: f.payload,
          callback: f.callback,
          next: null
        });
        a: {
          var C = a, x = f;
          h = b;
          p = c;
          switch (x.tag) {
            case 1:
              C = x.payload;
              if (typeof C === "function") {
                A = C.call(p, A, h);
                break a;
              }
              A = C;
              break a;
            case 3:
              C.flags = C.flags & -4097 | 64;
            case 0:
              C = x.payload;
              h = typeof C === "function" ? C.call(p, A, h) : C;
              if (h === null || h === void 0)
                break a;
              A = m({}, A, h);
              break a;
            case 2:
              wg = true;
          }
        }
        f.callback !== null && (a.flags |= 32, h = e.effects, h === null ? e.effects = [f] : h.push(f));
      } else
        p = { eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, n === null ? (l = n = p, k = A) : n = n.next = p, g |= h;
      f = f.next;
      if (f === null)
        if (h = e.shared.pending, h === null)
          break;
        else
          f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
    } while (1);
    n === null && (k = A);
    e.baseState = k;
    e.firstBaseUpdate = l;
    e.lastBaseUpdate = n;
    Dg |= g;
    a.lanes = g;
    a.memoizedState = A;
  }
}
function Eg(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (a !== null)
    for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (e !== null) {
        d.callback = null;
        d = c;
        if (typeof e !== "function")
          throw Error(y(191, e));
        e.call(d);
      }
    }
}
var Fg = new aa.Component().refs;
function Gg(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = c === null || c === void 0 ? b : m({}, b, c);
  a.memoizedState = c;
  a.lanes === 0 && (a.updateQueue.baseState = c);
}
var Kg = { isMounted: function(a) {
  return (a = a._reactInternals) ? Zb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = Hg(), e = Ig(a), f = zg(d, e);
  f.payload = b;
  c !== void 0 && c !== null && (f.callback = c);
  Ag(a, f);
  Jg(a, e, d);
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = Hg(), e = Ig(a), f = zg(d, e);
  f.tag = 1;
  f.payload = b;
  c !== void 0 && c !== null && (f.callback = c);
  Ag(a, f);
  Jg(a, e, d);
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = Hg(), d = Ig(a), e = zg(c, d);
  e.tag = 2;
  b !== void 0 && b !== null && (e.callback = b);
  Ag(a, e);
  Jg(a, d, c);
} };
function Lg(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return typeof a.shouldComponentUpdate === "function" ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : true;
}
function Mg(a, b, c) {
  var d = false, e = Cf;
  var f = b.contextType;
  typeof f === "object" && f !== null ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = d !== null && d !== void 0) ? Ef(a, e) : Cf);
  b = new b(c, f);
  a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null;
  b.updater = Kg;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}
function Ng(a, b, c, d) {
  a = b.state;
  typeof b.componentWillReceiveProps === "function" && b.componentWillReceiveProps(c, d);
  typeof b.UNSAFE_componentWillReceiveProps === "function" && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
}
function Og(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = Fg;
  xg(a);
  var f = b.contextType;
  typeof f === "object" && f !== null ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f));
  Cg(a, c, e, d);
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  typeof f === "function" && (Gg(a, b, f, c), e.state = a.memoizedState);
  typeof b.getDerivedStateFromProps === "function" || typeof e.getSnapshotBeforeUpdate === "function" || typeof e.UNSAFE_componentWillMount !== "function" && typeof e.componentWillMount !== "function" || (b = e.state, typeof e.componentWillMount === "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
  typeof e.componentDidMount === "function" && (a.flags |= 4);
}
var Pg = Array.isArray;
function Qg(a, b, c) {
  a = c.ref;
  if (a !== null && typeof a !== "function" && typeof a !== "object") {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (c.tag !== 1)
          throw Error(y(309));
        var d = c.stateNode;
      }
      if (!d)
        throw Error(y(147, a));
      var e = "" + a;
      if (b !== null && b.ref !== null && typeof b.ref === "function" && b.ref._stringRef === e)
        return b.ref;
      b = function(a2) {
        var b2 = d.refs;
        b2 === Fg && (b2 = d.refs = {});
        a2 === null ? delete b2[e] : b2[e] = a2;
      };
      b._stringRef = e;
      return b;
    }
    if (typeof a !== "string")
      throw Error(y(284));
    if (!c._owner)
      throw Error(y(290, a));
  }
  return a;
}
function Rg(a, b) {
  if (a.type !== "textarea")
    throw Error(y(31, Object.prototype.toString.call(b) === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
}
function Sg(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.lastEffect;
      d2 !== null ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
      c2.nextEffect = null;
      c2.flags = 8;
    }
  }
  function c(c2, d2) {
    if (!a)
      return null;
    for (; d2 !== null; )
      b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); b2 !== null; )
      b2.key !== null ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Tg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f(b2, c2, d2) {
    b2.index = d2;
    if (!a)
      return c2;
    d2 = b2.alternate;
    if (d2 !== null)
      return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
    b2.flags = 2;
    return c2;
  }
  function g(b2) {
    a && b2.alternate === null && (b2.flags = 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (b2 === null || b2.tag !== 6)
      return b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k(a2, b2, c2, d2) {
    if (b2 !== null && b2.elementType === c2.type)
      return d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2;
    d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Qg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l(a2, b2, c2, d2) {
    if (b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
      return b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function n(a2, b2, c2, d2, f2) {
    if (b2 === null || b2.tag !== 7)
      return b2 = Xg(c2, a2.mode, d2, f2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function A(a2, b2, c2) {
    if (typeof b2 === "string" || typeof b2 === "number")
      return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
    if (typeof b2 === "object" && b2 !== null) {
      switch (b2.$$typeof) {
        case sa:
          return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
        case ta:
          return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
      }
      if (Pg(b2) || La(b2))
        return b2 = Xg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Rg(a2, b2);
    }
    return null;
  }
  function p(a2, b2, c2, d2) {
    var e2 = b2 !== null ? b2.key : null;
    if (typeof c2 === "string" || typeof c2 === "number")
      return e2 !== null ? null : h(a2, b2, "" + c2, d2);
    if (typeof c2 === "object" && c2 !== null) {
      switch (c2.$$typeof) {
        case sa:
          return c2.key === e2 ? c2.type === ua ? n(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
        case ta:
          return c2.key === e2 ? l(a2, b2, c2, d2) : null;
      }
      if (Pg(c2) || La(c2))
        return e2 !== null ? null : n(a2, b2, c2, d2, null);
      Rg(a2, c2);
    }
    return null;
  }
  function C(a2, b2, c2, d2, e2) {
    if (typeof d2 === "string" || typeof d2 === "number")
      return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if (typeof d2 === "object" && d2 !== null) {
      switch (d2.$$typeof) {
        case sa:
          return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, d2.type === ua ? n(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
        case ta:
          return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, l(b2, a2, d2, e2);
      }
      if (Pg(d2) || La(d2))
        return a2 = a2.get(c2) || null, n(b2, a2, d2, e2, null);
      Rg(b2, d2);
    }
    return null;
  }
  function x(e2, g2, h2, k2) {
    for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; u !== null && z < h2.length; z++) {
      u.index > z ? (q = u, u = null) : q = u.sibling;
      var n2 = p(e2, u, h2[z], k2);
      if (n2 === null) {
        u === null && (u = q);
        break;
      }
      a && u && n2.alternate === null && b(e2, u);
      g2 = f(n2, g2, z);
      t === null ? l2 = n2 : t.sibling = n2;
      t = n2;
      u = q;
    }
    if (z === h2.length)
      return c(e2, u), l2;
    if (u === null) {
      for (; z < h2.length; z++)
        u = A(e2, h2[z], k2), u !== null && (g2 = f(u, g2, z), t === null ? l2 = u : t.sibling = u, t = u);
      return l2;
    }
    for (u = d(e2, u); z < h2.length; z++)
      q = C(u, e2, z, h2[z], k2), q !== null && (a && q.alternate !== null && u.delete(q.key === null ? z : q.key), g2 = f(q, g2, z), t === null ? l2 = q : t.sibling = q, t = q);
    a && u.forEach(function(a2) {
      return b(e2, a2);
    });
    return l2;
  }
  function w(e2, g2, h2, k2) {
    var l2 = La(h2);
    if (typeof l2 !== "function")
      throw Error(y(150));
    h2 = l2.call(h2);
    if (h2 == null)
      throw Error(y(151));
    for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); u !== null && !n2.done; z++, n2 = h2.next()) {
      u.index > z ? (q = u, u = null) : q = u.sibling;
      var w2 = p(e2, u, n2.value, k2);
      if (w2 === null) {
        u === null && (u = q);
        break;
      }
      a && u && w2.alternate === null && b(e2, u);
      g2 = f(w2, g2, z);
      t === null ? l2 = w2 : t.sibling = w2;
      t = w2;
      u = q;
    }
    if (n2.done)
      return c(e2, u), l2;
    if (u === null) {
      for (; !n2.done; z++, n2 = h2.next())
        n2 = A(e2, n2.value, k2), n2 !== null && (g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
      return l2;
    }
    for (u = d(e2, u); !n2.done; z++, n2 = h2.next())
      n2 = C(u, e2, z, n2.value, k2), n2 !== null && (a && n2.alternate !== null && u.delete(n2.key === null ? z : n2.key), g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
    a && u.forEach(function(a2) {
      return b(e2, a2);
    });
    return l2;
  }
  return function(a2, d2, f2, h2) {
    var k2 = typeof f2 === "object" && f2 !== null && f2.type === ua && f2.key === null;
    k2 && (f2 = f2.props.children);
    var l2 = typeof f2 === "object" && f2 !== null;
    if (l2)
      switch (f2.$$typeof) {
        case sa:
          a: {
            l2 = f2.key;
            for (k2 = d2; k2 !== null; ) {
              if (k2.key === l2) {
                switch (k2.tag) {
                  case 7:
                    if (f2.type === ua) {
                      c(a2, k2.sibling);
                      d2 = e(k2, f2.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    break;
                  default:
                    if (k2.elementType === f2.type) {
                      c(a2, k2.sibling);
                      d2 = e(k2, f2.props);
                      d2.ref = Qg(a2, k2, f2);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                }
                c(a2, k2);
                break;
              } else
                b(a2, k2);
              k2 = k2.sibling;
            }
            f2.type === ua ? (d2 = Xg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Qg(a2, d2, f2), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case ta:
          a: {
            for (k2 = f2.key; d2 !== null; ) {
              if (d2.key === k2)
                if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f2.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
              else
                b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Wg(f2, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
      }
    if (typeof f2 === "string" || typeof f2 === "number")
      return f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
    if (Pg(f2))
      return x(a2, d2, f2, h2);
    if (La(f2))
      return w(a2, d2, f2, h2);
    l2 && Rg(a2, f2);
    if (typeof f2 === "undefined" && !k2)
      switch (a2.tag) {
        case 1:
        case 22:
        case 0:
        case 11:
        case 15:
          throw Error(y(152, Ra(a2.type) || "Component"));
      }
    return c(a2, d2);
  };
}
var Yg = Sg(true), Zg = Sg(false), $g = {}, ah = Bf($g), bh = Bf($g), ch = Bf($g);
function dh(a) {
  if (a === $g)
    throw Error(y(174));
  return a;
}
function eh(a, b) {
  I(ch, b);
  I(bh, a);
  I(ah, $g);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
      break;
    default:
      a = a === 8 ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
  }
  H(ah);
  I(ah, b);
}
function fh() {
  H(ah);
  H(bh);
  H(ch);
}
function gh(a) {
  dh(ch.current);
  var b = dh(ah.current);
  var c = mb(b, a.type);
  b !== c && (I(bh, a), I(ah, c));
}
function hh(a) {
  bh.current === a && (H(ah), H(bh));
}
var P = Bf(0);
function ih(a) {
  for (var b = a; b !== null; ) {
    if (b.tag === 13) {
      var c = b.memoizedState;
      if (c !== null && (c = c.dehydrated, c === null || c.data === "$?" || c.data === "$!"))
        return b;
    } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
      if ((b.flags & 64) !== 0)
        return b;
    } else if (b.child !== null) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a)
      break;
    for (; b.sibling === null; ) {
      if (b.return === null || b.return === a)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var jh = null, kh = null, lh = false;
function mh(a, b) {
  var c = nh(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.flags = 8;
  a.lastEffect !== null ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}
function oh(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = b.nodeType !== 1 || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return b !== null ? (a.stateNode = b, true) : false;
    case 6:
      return b = a.pendingProps === "" || b.nodeType !== 3 ? null : b, b !== null ? (a.stateNode = b, true) : false;
    case 13:
      return false;
    default:
      return false;
  }
}
function ph(a) {
  if (lh) {
    var b = kh;
    if (b) {
      var c = b;
      if (!oh(a, b)) {
        b = rf(c.nextSibling);
        if (!b || !oh(a, b)) {
          a.flags = a.flags & -1025 | 2;
          lh = false;
          jh = a;
          return;
        }
        mh(jh, c);
      }
      jh = a;
      kh = rf(b.firstChild);
    } else
      a.flags = a.flags & -1025 | 2, lh = false, jh = a;
  }
}
function qh(a) {
  for (a = a.return; a !== null && a.tag !== 5 && a.tag !== 3 && a.tag !== 13; )
    a = a.return;
  jh = a;
}
function rh(a) {
  if (a !== jh)
    return false;
  if (!lh)
    return qh(a), lh = true, false;
  var b = a.type;
  if (a.tag !== 5 || b !== "head" && b !== "body" && !nf(b, a.memoizedProps))
    for (b = kh; b; )
      mh(a, b), b = rf(b.nextSibling);
  qh(a);
  if (a.tag === 13) {
    a = a.memoizedState;
    a = a !== null ? a.dehydrated : null;
    if (!a)
      throw Error(y(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (a.nodeType === 8) {
          var c = a.data;
          if (c === "/$") {
            if (b === 0) {
              kh = rf(a.nextSibling);
              break a;
            }
            b--;
          } else
            c !== "$" && c !== "$!" && c !== "$?" || b++;
        }
        a = a.nextSibling;
      }
      kh = null;
    }
  } else
    kh = jh ? rf(a.stateNode.nextSibling) : null;
  return true;
}
function sh() {
  kh = jh = null;
  lh = false;
}
var th = [];
function uh() {
  for (var a = 0; a < th.length; a++)
    th[a]._workInProgressVersionPrimary = null;
  th.length = 0;
}
var vh = ra.ReactCurrentDispatcher, wh = ra.ReactCurrentBatchConfig, xh = 0, R = null, S = null, T = null, yh = false, zh = false;
function Ah() {
  throw Error(y(321));
}
function Bh(a, b) {
  if (b === null)
    return false;
  for (var c = 0; c < b.length && c < a.length; c++)
    if (!He(a[c], b[c]))
      return false;
  return true;
}
function Ch(a, b, c, d, e, f) {
  xh = f;
  R = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  vh.current = a === null || a.memoizedState === null ? Dh : Eh;
  a = c(d, e);
  if (zh) {
    f = 0;
    do {
      zh = false;
      if (!(25 > f))
        throw Error(y(301));
      f += 1;
      T = S = null;
      b.updateQueue = null;
      vh.current = Fh;
      a = c(d, e);
    } while (zh);
  }
  vh.current = Gh;
  b = S !== null && S.next !== null;
  xh = 0;
  T = S = R = null;
  yh = false;
  if (b)
    throw Error(y(300));
  return a;
}
function Hh() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  T === null ? R.memoizedState = T = a : T = T.next = a;
  return T;
}
function Ih() {
  if (S === null) {
    var a = R.alternate;
    a = a !== null ? a.memoizedState : null;
  } else
    a = S.next;
  var b = T === null ? R.memoizedState : T.next;
  if (b !== null)
    T = b, S = a;
  else {
    if (a === null)
      throw Error(y(310));
    S = a;
    a = { memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null };
    T === null ? R.memoizedState = T = a : T = T.next = a;
  }
  return T;
}
function Jh(a, b) {
  return typeof b === "function" ? b(a) : b;
}
function Kh(a) {
  var b = Ih(), c = b.queue;
  if (c === null)
    throw Error(y(311));
  c.lastRenderedReducer = a;
  var d = S, e = d.baseQueue, f = c.pending;
  if (f !== null) {
    if (e !== null) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }
    d.baseQueue = e = f;
    c.pending = null;
  }
  if (e !== null) {
    e = e.next;
    d = d.baseState;
    var h = g = f = null, k = e;
    do {
      var l = k.lane;
      if ((xh & l) === l)
        h !== null && (h = h.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
      else {
        var n = {
          lane: l,
          action: k.action,
          eagerReducer: k.eagerReducer,
          eagerState: k.eagerState,
          next: null
        };
        h === null ? (g = h = n, f = d) : h = h.next = n;
        R.lanes |= l;
        Dg |= l;
      }
      k = k.next;
    } while (k !== null && k !== e);
    h === null ? f = d : h.next = g;
    He(d, b.memoizedState) || (ug = true);
    b.memoizedState = d;
    b.baseState = f;
    b.baseQueue = h;
    c.lastRenderedState = d;
  }
  return [b.memoizedState, c.dispatch];
}
function Lh(a) {
  var b = Ih(), c = b.queue;
  if (c === null)
    throw Error(y(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f = b.memoizedState;
  if (e !== null) {
    c.pending = null;
    var g = e = e.next;
    do
      f = a(f, g.action), g = g.next;
    while (g !== e);
    He(f, b.memoizedState) || (ug = true);
    b.memoizedState = f;
    b.baseQueue === null && (b.baseState = f);
    c.lastRenderedState = f;
  }
  return [f, d];
}
function Mh(a, b, c) {
  var d = b._getVersion;
  d = d(b._source);
  var e = b._workInProgressVersionPrimary;
  if (e !== null)
    a = e === d;
  else if (a = a.mutableReadLanes, a = (xh & a) === a)
    b._workInProgressVersionPrimary = d, th.push(b);
  if (a)
    return c(b._source);
  th.push(b);
  throw Error(y(350));
}
function Nh(a, b, c, d) {
  var e = U;
  if (e === null)
    throw Error(y(349));
  var f = b._getVersion, g = f(b._source), h = vh.current, k = h.useState(function() {
    return Mh(e, b, c);
  }), l = k[1], n = k[0];
  k = T;
  var A = a.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
  A = A.subscribe;
  var w = R;
  a.memoizedState = { refs: p, source: b, subscribe: d };
  h.useEffect(function() {
    p.getSnapshot = c;
    p.setSnapshot = l;
    var a2 = f(b._source);
    if (!He(g, a2)) {
      a2 = c(b._source);
      He(n, a2) || (l(a2), a2 = Ig(w), e.mutableReadLanes |= a2 & e.pendingLanes);
      a2 = e.mutableReadLanes;
      e.entangledLanes |= a2;
      for (var d2 = e.entanglements, h2 = a2; 0 < h2; ) {
        var k2 = 31 - Vc(h2), v = 1 << k2;
        d2[k2] |= a2;
        h2 &= ~v;
      }
    }
  }, [c, b, d]);
  h.useEffect(function() {
    return d(b._source, function() {
      var a2 = p.getSnapshot, c2 = p.setSnapshot;
      try {
        c2(a2(b._source));
        var d2 = Ig(w);
        e.mutableReadLanes |= d2 & e.pendingLanes;
      } catch (q) {
        c2(function() {
          throw q;
        });
      }
    });
  }, [b, d]);
  He(C, c) && He(x, b) && He(A, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n }, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n);
  return n;
}
function Ph(a, b, c) {
  var d = Ih();
  return Nh(d, a, b, c);
}
function Qh(a) {
  var b = Hh();
  typeof a === "function" && (a = a());
  b.memoizedState = b.baseState = a;
  a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a };
  a = a.dispatch = Oh.bind(null, R, a);
  return [b.memoizedState, a];
}
function Rh(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = R.updateQueue;
  b === null ? (b = { lastEffect: null }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function Sh(a) {
  var b = Hh();
  a = { current: a };
  return b.memoizedState = a;
}
function Th() {
  return Ih().memoizedState;
}
function Uh(a, b, c, d) {
  var e = Hh();
  R.flags |= a;
  e.memoizedState = Rh(1 | b, c, void 0, d === void 0 ? null : d);
}
function Vh(a, b, c, d) {
  var e = Ih();
  d = d === void 0 ? null : d;
  var f = void 0;
  if (S !== null) {
    var g = S.memoizedState;
    f = g.destroy;
    if (d !== null && Bh(d, g.deps)) {
      Rh(b, c, f, d);
      return;
    }
  }
  R.flags |= a;
  e.memoizedState = Rh(1 | b, c, f, d);
}
function Wh(a, b) {
  return Uh(516, 4, a, b);
}
function Xh(a, b) {
  return Vh(516, 4, a, b);
}
function Yh(a, b) {
  return Vh(4, 2, a, b);
}
function Zh(a, b) {
  if (typeof b === "function")
    return a = a(), b(a), function() {
      b(null);
    };
  if (b !== null && b !== void 0)
    return a = a(), b.current = a, function() {
      b.current = null;
    };
}
function $h(a, b, c) {
  c = c !== null && c !== void 0 ? c.concat([a]) : null;
  return Vh(4, 2, Zh.bind(null, b, a), c);
}
function ai() {
}
function bi(a, b) {
  var c = Ih();
  b = b === void 0 ? null : b;
  var d = c.memoizedState;
  if (d !== null && b !== null && Bh(b, d[1]))
    return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ci(a, b) {
  var c = Ih();
  b = b === void 0 ? null : b;
  var d = c.memoizedState;
  if (d !== null && b !== null && Bh(b, d[1]))
    return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function di(a, b) {
  var c = eg();
  gg(98 > c ? 98 : c, function() {
    a(true);
  });
  gg(97 < c ? 97 : c, function() {
    var c2 = wh.transition;
    wh.transition = 1;
    try {
      a(false), b();
    } finally {
      wh.transition = c2;
    }
  });
}
function Oh(a, b, c) {
  var d = Hg(), e = Ig(a), f = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, g = b.pending;
  g === null ? f.next = f : (f.next = g.next, g.next = f);
  b.pending = f;
  g = a.alternate;
  if (a === R || g !== null && g === R)
    zh = yh = true;
  else {
    if (a.lanes === 0 && (g === null || g.lanes === 0) && (g = b.lastRenderedReducer, g !== null))
      try {
        var h = b.lastRenderedState, k = g(h, c);
        f.eagerReducer = g;
        f.eagerState = k;
        if (He(k, h))
          return;
      } catch (l) {
      } finally {
      }
    Jg(a, e, d);
  }
}
var Gh = { readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false }, Dh = { readContext: vg, useCallback: function(a, b) {
  Hh().memoizedState = [a, b === void 0 ? null : b];
  return a;
}, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
  c = c !== null && c !== void 0 ? c.concat([a]) : null;
  return Uh(4, 2, Zh.bind(null, b, a), c);
}, useLayoutEffect: function(a, b) {
  return Uh(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Hh();
  b = b === void 0 ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Hh();
  b = c !== void 0 ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  a = a.dispatch = Oh.bind(null, R, a);
  return [d.memoizedState, a];
}, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
  var b = Qh(a), c = b[0], d = b[1];
  Wh(function() {
    var b2 = wh.transition;
    wh.transition = 1;
    try {
      d(a);
    } finally {
      wh.transition = b2;
    }
  }, [a]);
  return c;
}, useTransition: function() {
  var a = Qh(false), b = a[0];
  a = di.bind(null, a[1]);
  Sh(a);
  return [a, b];
}, useMutableSource: function(a, b, c) {
  var d = Hh();
  d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
  return Nh(d, a, b, c);
}, useOpaqueIdentifier: function() {
  if (lh) {
    var a = false, b = uf(function() {
      a || (a = true, c("r:" + (tf++).toString(36)));
      throw Error(y(355));
    }), c = Qh(b)[1];
    (R.mode & 2) === 0 && (R.flags |= 516, Rh(5, function() {
      c("r:" + (tf++).toString(36));
    }, void 0, null));
    return b;
  }
  b = "r:" + (tf++).toString(36);
  Qh(b);
  return b;
}, unstable_isNewReconciler: false }, Eh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
  return Kh(Jh);
}, useDebugValue: ai, useDeferredValue: function(a) {
  var b = Kh(Jh), c = b[0], d = b[1];
  Xh(function() {
    var b2 = wh.transition;
    wh.transition = 1;
    try {
      d(a);
    } finally {
      wh.transition = b2;
    }
  }, [a]);
  return c;
}, useTransition: function() {
  var a = Kh(Jh)[0];
  return [
    Th().current,
    a
  ];
}, useMutableSource: Ph, useOpaqueIdentifier: function() {
  return Kh(Jh)[0];
}, unstable_isNewReconciler: false }, Fh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
  return Lh(Jh);
}, useDebugValue: ai, useDeferredValue: function(a) {
  var b = Lh(Jh), c = b[0], d = b[1];
  Xh(function() {
    var b2 = wh.transition;
    wh.transition = 1;
    try {
      d(a);
    } finally {
      wh.transition = b2;
    }
  }, [a]);
  return c;
}, useTransition: function() {
  var a = Lh(Jh)[0];
  return [
    Th().current,
    a
  ];
}, useMutableSource: Ph, useOpaqueIdentifier: function() {
  return Lh(Jh)[0];
}, unstable_isNewReconciler: false }, ei = ra.ReactCurrentOwner, ug = false;
function fi(a, b, c, d) {
  b.child = a === null ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
}
function gi(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  tg(b, e);
  d = Ch(a, b, c, d, f, e);
  if (a !== null && !ug)
    return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
  b.flags |= 1;
  fi(a, b, d, e);
  return b.child;
}
function ii(a, b, c, d, e, f) {
  if (a === null) {
    var g = c.type;
    if (typeof g === "function" && !ji(g) && g.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0)
      return b.tag = 15, b.type = g, ki(a, b, g, d, e, f);
    a = Vg(c.type, null, d, b, b.mode, f);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  g = a.child;
  if ((e & f) === 0 && (e = g.memoizedProps, c = c.compare, c = c !== null ? c : Je, c(e, d) && a.ref === b.ref))
    return hi(a, b, f);
  b.flags |= 1;
  a = Tg(g, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function ki(a, b, c, d, e, f) {
  if (a !== null && Je(a.memoizedProps, d) && a.ref === b.ref)
    if (ug = false, (f & e) !== 0)
      (a.flags & 16384) !== 0 && (ug = true);
    else
      return b.lanes = a.lanes, hi(a, b, f);
  return li(a, b, c, d, f);
}
function mi(a, b, c) {
  var d = b.pendingProps, e = d.children, f = a !== null ? a.memoizedState : null;
  if (d.mode === "hidden" || d.mode === "unstable-defer-without-hiding")
    if ((b.mode & 4) === 0)
      b.memoizedState = { baseLanes: 0 }, ni(b, c);
    else if ((c & 1073741824) !== 0)
      b.memoizedState = { baseLanes: 0 }, ni(b, f !== null ? f.baseLanes : c);
    else
      return a = f !== null ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, ni(b, a), null;
  else
    f !== null ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
  fi(a, b, e, c);
  return b.child;
}
function oi(a, b) {
  var c = b.ref;
  if (a === null && c !== null || a !== null && a.ref !== c)
    b.flags |= 128;
}
function li(a, b, c, d, e) {
  var f = Ff(c) ? Df : M.current;
  f = Ef(b, f);
  tg(b, e);
  c = Ch(a, b, c, d, f, e);
  if (a !== null && !ug)
    return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
  b.flags |= 1;
  fi(a, b, c, e);
  return b.child;
}
function pi(a, b, c, d, e) {
  if (Ff(c)) {
    var f = true;
    Jf(b);
  } else
    f = false;
  tg(b, e);
  if (b.stateNode === null)
    a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = true;
  else if (a === null) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k = g.context, l = c.contextType;
    typeof l === "object" && l !== null ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
    var n = c.getDerivedStateFromProps, A = typeof n === "function" || typeof g.getSnapshotBeforeUpdate === "function";
    A || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== d || k !== l) && Ng(b, g, d, l);
    wg = false;
    var p = b.memoizedState;
    g.state = p;
    Cg(b, d, g, e);
    k = b.memoizedState;
    h !== d || p !== k || N.current || wg ? (typeof n === "function" && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || typeof g.UNSAFE_componentWillMount !== "function" && typeof g.componentWillMount !== "function" || (typeof g.componentWillMount === "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount === "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount === "function" && (b.flags |= 4)) : (typeof g.componentDidMount === "function" && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : (typeof g.componentDidMount === "function" && (b.flags |= 4), d = false);
  } else {
    g = b.stateNode;
    yg(a, b);
    h = b.memoizedProps;
    l = b.type === b.elementType ? h : lg(b.type, h);
    g.props = l;
    A = b.pendingProps;
    p = g.context;
    k = c.contextType;
    typeof k === "object" && k !== null ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
    var C = c.getDerivedStateFromProps;
    (n = typeof C === "function" || typeof g.getSnapshotBeforeUpdate === "function") || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== A || p !== k) && Ng(b, g, d, k);
    wg = false;
    p = b.memoizedState;
    g.state = p;
    Cg(b, d, g, e);
    var x = b.memoizedState;
    h !== A || p !== x || N.current || wg ? (typeof C === "function" && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || typeof g.UNSAFE_componentWillUpdate !== "function" && typeof g.componentWillUpdate !== "function" || (typeof g.componentWillUpdate === "function" && g.componentWillUpdate(d, x, k), typeof g.UNSAFE_componentWillUpdate === "function" && g.UNSAFE_componentWillUpdate(d, x, k)), typeof g.componentDidUpdate === "function" && (b.flags |= 4), typeof g.getSnapshotBeforeUpdate === "function" && (b.flags |= 256)) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = false);
  }
  return qi(a, b, c, d, f, e);
}
function qi(a, b, c, d, e, f) {
  oi(a, b);
  var g = (b.flags & 64) !== 0;
  if (!d && !g)
    return e && Kf(b, c, false), hi(a, b, f);
  d = b.stateNode;
  ei.current = b;
  var h = g && typeof c.getDerivedStateFromError !== "function" ? null : d.render();
  b.flags |= 1;
  a !== null && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f);
  b.memoizedState = d.state;
  e && Kf(b, c, true);
  return b.child;
}
function ri(a) {
  var b = a.stateNode;
  b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, false);
  eh(a, b.containerInfo);
}
var si = { dehydrated: null, retryLane: 0 };
function ti(a, b, c) {
  var d = b.pendingProps, e = P.current, f = false, g;
  (g = (b.flags & 64) !== 0) || (g = a !== null && a.memoizedState === null ? false : (e & 2) !== 0);
  g ? (f = true, b.flags &= -65) : a !== null && a.memoizedState === null || d.fallback === void 0 || d.unstable_avoidThisFallback === true || (e |= 1);
  I(P, e & 1);
  if (a === null) {
    d.fallback !== void 0 && ph(b);
    a = d.children;
    e = d.fallback;
    if (f)
      return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, a;
    if (typeof d.unstable_expectedLoadTime === "number")
      return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, b.lanes = 33554432, a;
    c = vi({ mode: "visible", children: a }, b.mode, c, null);
    c.return = b;
    return b.child = c;
  }
  if (a.memoizedState !== null) {
    if (f)
      return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
    c = xi(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }
  if (f)
    return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
  c = xi(a, b, d.children, c);
  b.memoizedState = null;
  return c;
}
function ui(a, b, c, d) {
  var e = a.mode, f = a.child;
  b = { mode: "hidden", children: b };
  (e & 2) === 0 && f !== null ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
  c = Xg(c, e, d, null);
  f.return = a;
  c.return = a;
  f.sibling = c;
  a.child = f;
  return c;
}
function xi(a, b, c, d) {
  var e = a.child;
  a = e.sibling;
  c = Tg(e, { mode: "visible", children: c });
  (b.mode & 2) === 0 && (c.lanes = d);
  c.return = b;
  c.sibling = null;
  a !== null && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
  return b.child = c;
}
function wi(a, b, c, d, e) {
  var f = b.mode, g = a.child;
  a = g.sibling;
  var h = { mode: "hidden", children: c };
  (f & 2) === 0 && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, g !== null ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
  a !== null ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2);
  d.return = b;
  c.return = b;
  c.sibling = d;
  b.child = c;
  return d;
}
function yi(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  c !== null && (c.lanes |= b);
  sg(a.return, b);
}
function zi(a, b, c, d, e, f) {
  var g = a.memoizedState;
  g === null ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
}
function Ai(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f = d.tail;
  fi(a, b, d.children, c);
  d = P.current;
  if ((d & 2) !== 0)
    d = d & 1 | 2, b.flags |= 64;
  else {
    if (a !== null && (a.flags & 64) !== 0)
      a:
        for (a = b.child; a !== null; ) {
          if (a.tag === 13)
            a.memoizedState !== null && yi(a, c);
          else if (a.tag === 19)
            yi(a, c);
          else if (a.child !== null) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b)
            break a;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === b)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d &= 1;
  }
  I(P, d);
  if ((b.mode & 2) === 0)
    b.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; c !== null; )
          a = c.alternate, a !== null && ih(a) === null && (e = c), c = c.sibling;
        c = e;
        c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        zi(b, false, e, c, f, b.lastEffect);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; e !== null; ) {
          a = e.alternate;
          if (a !== null && ih(a) === null) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        zi(b, true, c, null, f, b.lastEffect);
        break;
      case "together":
        zi(b, false, null, null, void 0, b.lastEffect);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function hi(a, b, c) {
  a !== null && (b.dependencies = a.dependencies);
  Dg |= b.lanes;
  if ((c & b.childLanes) !== 0) {
    if (a !== null && b.child !== a.child)
      throw Error(y(153));
    if (b.child !== null) {
      a = b.child;
      c = Tg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; a.sibling !== null; )
        a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  return null;
}
var Bi, Ci, Di, Ei;
Bi = function(a, b) {
  for (var c = b.child; c !== null; ) {
    if (c.tag === 5 || c.tag === 6)
      a.appendChild(c.stateNode);
    else if (c.tag !== 4 && c.child !== null) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; c.sibling === null; ) {
      if (c.return === null || c.return === b)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Ci = function() {
};
Di = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    dh(ah.current);
    var f = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f = [];
        break;
      case "option":
        e = eb(a, e);
        d = eb(a, d);
        f = [];
        break;
      case "select":
        e = m({}, e, { value: void 0 });
        d = m({}, d, { value: void 0 });
        f = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f = [];
        break;
      default:
        typeof e.onClick !== "function" && typeof d.onClick === "function" && (a.onclick = jf);
    }
    vb(c, d);
    var g;
    c = null;
    for (l in e)
      if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && e[l] != null)
        if (l === "style") {
          var h = e[l];
          for (g in h)
            h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else
          l !== "dangerouslySetInnerHTML" && l !== "children" && l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
    for (l in d) {
      var k = d[l];
      h = e != null ? e[l] : void 0;
      if (d.hasOwnProperty(l) && k !== h && (k != null || h != null))
        if (l === "style")
          if (h) {
            for (g in h)
              !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k)
              k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
          } else
            c || (f || (f = []), f.push(l, c)), c = k;
        else
          l === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, k != null && h !== k && (f = f || []).push(l, k)) : l === "children" ? typeof k !== "string" && typeof k !== "number" || (f = f || []).push(l, "" + k) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && (ca.hasOwnProperty(l) ? (k != null && l === "onScroll" && G("scroll", a), f || h === k || (f = [])) : typeof k === "object" && k !== null && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
    }
    c && (f = f || []).push("style", c);
    var l = f;
    if (b.updateQueue = l)
      b.flags |= 4;
  }
};
Ei = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Fi(a, b) {
  if (!lh)
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; b !== null; )
          b.alternate !== null && (c = b), b = b.sibling;
        c === null ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; c !== null; )
          c.alternate !== null && (d = c), c = c.sibling;
        d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
}
function Gi(a, b, c) {
  var d = b.pendingProps;
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;
    case 1:
      return Ff(b.type) && Gf(), null;
    case 3:
      fh();
      H(N);
      H(M);
      uh();
      d = b.stateNode;
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (a === null || a.child === null)
        rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
      Ci(b);
      return null;
    case 5:
      hh(b);
      var e = dh(ch.current);
      c = b.type;
      if (a !== null && b.stateNode != null)
        Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
      else {
        if (!d) {
          if (b.stateNode === null)
            throw Error(y(166));
          return null;
        }
        a = dh(ah.current);
        if (rh(b)) {
          d = b.stateNode;
          c = b.type;
          var f = b.memoizedProps;
          d[wf] = b;
          d[xf] = f;
          switch (c) {
            case "dialog":
              G("cancel", d);
              G("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", d);
              break;
            case "video":
            case "audio":
              for (a = 0; a < Xe.length; a++)
                G(Xe[a], d);
              break;
            case "source":
              G("error", d);
              break;
            case "img":
            case "image":
            case "link":
              G("error", d);
              G("load", d);
              break;
            case "details":
              G("toggle", d);
              break;
            case "input":
              Za(d, f);
              G("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f.multiple };
              G("invalid", d);
              break;
            case "textarea":
              hb(d, f), G("invalid", d);
          }
          vb(c, f);
          a = null;
          for (var g in f)
            f.hasOwnProperty(g) && (e = f[g], g === "children" ? typeof e === "string" ? d.textContent !== e && (a = ["children", e]) : typeof e === "number" && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && e != null && g === "onScroll" && G("scroll", d));
          switch (c) {
            case "input":
              Va(d);
              cb(d, f, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof f.onClick === "function" && (d.onclick = jf);
          }
          d = a;
          b.updateQueue = d;
          d !== null && (b.flags |= 4);
        } else {
          g = e.nodeType === 9 ? e : e.ownerDocument;
          a === kb.html && (a = lb(c));
          a === kb.html ? c === "script" ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : typeof d.is === "string" ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), c === "select" && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[wf] = b;
          a[xf] = d;
          Bi(a, b, false, false);
          b.stateNode = a;
          g = wb(c, d);
          switch (c) {
            case "dialog":
              G("cancel", a);
              G("close", a);
              e = d;
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", a);
              e = d;
              break;
            case "video":
            case "audio":
              for (e = 0; e < Xe.length; e++)
                G(Xe[e], a);
              e = d;
              break;
            case "source":
              G("error", a);
              e = d;
              break;
            case "img":
            case "image":
            case "link":
              G("error", a);
              G("load", a);
              e = d;
              break;
            case "details":
              G("toggle", a);
              e = d;
              break;
            case "input":
              Za(a, d);
              e = Ya(a, d);
              G("invalid", a);
              break;
            case "option":
              e = eb(a, d);
              break;
            case "select":
              a._wrapperState = { wasMultiple: !!d.multiple };
              e = m({}, d, { value: void 0 });
              G("invalid", a);
              break;
            case "textarea":
              hb(a, d);
              e = gb(a, d);
              G("invalid", a);
              break;
            default:
              e = d;
          }
          vb(c, e);
          var h = e;
          for (f in h)
            if (h.hasOwnProperty(f)) {
              var k = h[f];
              f === "style" ? tb(a, k) : f === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && ob(a, k)) : f === "children" ? typeof k === "string" ? (c !== "textarea" || k !== "") && pb(a, k) : typeof k === "number" && pb(a, "" + k) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (ca.hasOwnProperty(f) ? k != null && f === "onScroll" && G("scroll", a) : k != null && qa(a, f, k, g));
            }
          switch (c) {
            case "input":
              Va(a);
              cb(a, d, false);
              break;
            case "textarea":
              Va(a);
              jb(a);
              break;
            case "option":
              d.value != null && a.setAttribute("value", "" + Sa(d.value));
              break;
            case "select":
              a.multiple = !!d.multiple;
              f = d.value;
              f != null ? fb(a, !!d.multiple, f, false) : d.defaultValue != null && fb(a, !!d.multiple, d.defaultValue, true);
              break;
            default:
              typeof e.onClick === "function" && (a.onclick = jf);
          }
          mf(c, d) && (b.flags |= 4);
        }
        b.ref !== null && (b.flags |= 128);
      }
      return null;
    case 6:
      if (a && b.stateNode != null)
        Ei(a, b, a.memoizedProps, d);
      else {
        if (typeof d !== "string" && b.stateNode === null)
          throw Error(y(166));
        c = dh(ch.current);
        dh(ah.current);
        rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
      }
      return null;
    case 13:
      H(P);
      d = b.memoizedState;
      if ((b.flags & 64) !== 0)
        return b.lanes = c, b;
      d = d !== null;
      c = false;
      a === null ? b.memoizedProps.fallback !== void 0 && rh(b) : c = a.memoizedState !== null;
      if (d && !c && (b.mode & 2) !== 0)
        if (a === null && b.memoizedProps.unstable_avoidThisFallback !== true || (P.current & 1) !== 0)
          V === 0 && (V = 3);
        else {
          if (V === 0 || V === 3)
            V = 4;
          U === null || (Dg & 134217727) === 0 && (Hi & 134217727) === 0 || Ii(U, W);
        }
      if (d || c)
        b.flags |= 4;
      return null;
    case 4:
      return fh(), Ci(b), a === null && cf(b.stateNode.containerInfo), null;
    case 10:
      return rg(b), null;
    case 17:
      return Ff(b.type) && Gf(), null;
    case 19:
      H(P);
      d = b.memoizedState;
      if (d === null)
        return null;
      f = (b.flags & 64) !== 0;
      g = d.rendering;
      if (g === null)
        if (f)
          Fi(d, false);
        else {
          if (V !== 0 || a !== null && (a.flags & 64) !== 0)
            for (a = b.child; a !== null; ) {
              g = ih(a);
              if (g !== null) {
                b.flags |= 64;
                Fi(d, false);
                f = g.updateQueue;
                f !== null && (b.updateQueue = f, b.flags |= 4);
                d.lastEffect === null && (b.firstEffect = null);
                b.lastEffect = d.lastEffect;
                d = c;
                for (c = b.child; c !== null; )
                  f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, g === null ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                I(P, P.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
          d.tail !== null && O() > Ji && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
        }
      else {
        if (!f)
          if (a = ih(g), a !== null) {
            if (b.flags |= 64, f = true, c = a.updateQueue, c !== null && (b.updateQueue = c, b.flags |= 4), Fi(d, true), d.tail === null && d.tailMode === "hidden" && !g.alternate && !lh)
              return b = b.lastEffect = d.lastEffect, b !== null && (b.nextEffect = null), null;
          } else
            2 * O() - d.renderingStartTime > Ji && c !== 1073741824 && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
        d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, c !== null ? c.sibling = g : b.child = g, d.last = g);
      }
      return d.tail !== null ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
    case 23:
    case 24:
      return Ki(), a !== null && a.memoizedState !== null !== (b.memoizedState !== null) && d.mode !== "unstable-defer-without-hiding" && (b.flags |= 4), null;
  }
  throw Error(y(156, b.tag));
}
function Li(a) {
  switch (a.tag) {
    case 1:
      Ff(a.type) && Gf();
      var b = a.flags;
      return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
    case 3:
      fh();
      H(N);
      H(M);
      uh();
      b = a.flags;
      if ((b & 64) !== 0)
        throw Error(y(285));
      a.flags = b & -4097 | 64;
      return a;
    case 5:
      return hh(a), null;
    case 13:
      return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
    case 19:
      return H(P), null;
    case 4:
      return fh(), null;
    case 10:
      return rg(a), null;
    case 23:
    case 24:
      return Ki(), null;
    default:
      return null;
  }
}
function Mi(a, b) {
  try {
    var c = "", d = b;
    do
      c += Qa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f) {
    e = "\nError generating stack: " + f.message + "\n" + f.stack;
  }
  return { value: a, source: b, stack: e };
}
function Ni(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Oi = typeof WeakMap === "function" ? WeakMap : Map;
function Pi(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Qi || (Qi = true, Ri = d);
    Ni(a, b);
  };
  return c;
}
function Si(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if (typeof d === "function") {
    var e = b.value;
    c.payload = function() {
      Ni(a, b);
      return d(e);
    };
  }
  var f = a.stateNode;
  f !== null && typeof f.componentDidCatch === "function" && (c.callback = function() {
    typeof d !== "function" && (Ti === null ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this), Ni(a, b));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: c2 !== null ? c2 : "" });
  });
  return c;
}
var Ui = typeof WeakSet === "function" ? WeakSet : Set;
function Vi(a) {
  var b = a.ref;
  if (b !== null)
    if (typeof b === "function")
      try {
        b(null);
      } catch (c) {
        Wi(a, c);
      }
    else
      b.current = null;
}
function Xi(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;
    case 1:
      if (b.flags & 256 && a !== null) {
        var c = a.memoizedProps, d = a.memoizedState;
        a = b.stateNode;
        b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
        a.__reactInternalSnapshotBeforeUpdate = b;
      }
      return;
    case 3:
      b.flags & 256 && qf(b.stateNode.containerInfo);
      return;
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(y(163));
}
function Yi(a, b, c) {
  switch (c.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      b = c.updateQueue;
      b = b !== null ? b.lastEffect : null;
      if (b !== null) {
        a = b = b.next;
        do {
          if ((a.tag & 3) === 3) {
            var d = a.create;
            a.destroy = d();
          }
          a = a.next;
        } while (a !== b);
      }
      b = c.updateQueue;
      b = b !== null ? b.lastEffect : null;
      if (b !== null) {
        a = b = b.next;
        do {
          var e = a;
          d = e.next;
          e = e.tag;
          (e & 4) !== 0 && (e & 1) !== 0 && (Zi(c, a), $i(c, a));
          a = d;
        } while (a !== b);
      }
      return;
    case 1:
      a = c.stateNode;
      c.flags & 4 && (b === null ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate)));
      b = c.updateQueue;
      b !== null && Eg(c, b, a);
      return;
    case 3:
      b = c.updateQueue;
      if (b !== null) {
        a = null;
        if (c.child !== null)
          switch (c.child.tag) {
            case 5:
              a = c.child.stateNode;
              break;
            case 1:
              a = c.child.stateNode;
          }
        Eg(c, b, a);
      }
      return;
    case 5:
      a = c.stateNode;
      b === null && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
      c.memoizedState === null && (c = c.alternate, c !== null && (c = c.memoizedState, c !== null && (c = c.dehydrated, c !== null && Cc(c))));
      return;
    case 19:
    case 17:
    case 20:
    case 21:
    case 23:
    case 24:
      return;
  }
  throw Error(y(163));
}
function aj(a, b) {
  for (var c = a; ; ) {
    if (c.tag === 5) {
      var d = c.stateNode;
      if (b)
        d = d.style, typeof d.setProperty === "function" ? d.setProperty("display", "none", "important") : d.display = "none";
      else {
        d = c.stateNode;
        var e = c.memoizedProps.style;
        e = e !== void 0 && e !== null && e.hasOwnProperty("display") ? e.display : null;
        d.style.display = sb("display", e);
      }
    } else if (c.tag === 6)
      c.stateNode.nodeValue = b ? "" : c.memoizedProps;
    else if ((c.tag !== 23 && c.tag !== 24 || c.memoizedState === null || c === a) && c.child !== null) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === a)
      break;
    for (; c.sibling === null; ) {
      if (c.return === null || c.return === a)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
}
function bj(a, b) {
  if (Mf && typeof Mf.onCommitFiberUnmount === "function")
    try {
      Mf.onCommitFiberUnmount(Lf, b);
    } catch (f) {
    }
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      a = b.updateQueue;
      if (a !== null && (a = a.lastEffect, a !== null)) {
        var c = a = a.next;
        do {
          var d = c, e = d.destroy;
          d = d.tag;
          if (e !== void 0)
            if ((d & 4) !== 0)
              Zi(b, c);
            else {
              d = b;
              try {
                e();
              } catch (f) {
                Wi(d, f);
              }
            }
          c = c.next;
        } while (c !== a);
      }
      break;
    case 1:
      Vi(b);
      a = b.stateNode;
      if (typeof a.componentWillUnmount === "function")
        try {
          a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
        } catch (f) {
          Wi(b, f);
        }
      break;
    case 5:
      Vi(b);
      break;
    case 4:
      cj(a, b);
  }
}
function dj(a) {
  a.alternate = null;
  a.child = null;
  a.dependencies = null;
  a.firstEffect = null;
  a.lastEffect = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.return = null;
  a.updateQueue = null;
}
function ej(a) {
  return a.tag === 5 || a.tag === 3 || a.tag === 4;
}
function fj(a) {
  a: {
    for (var b = a.return; b !== null; ) {
      if (ej(b))
        break a;
      b = b.return;
    }
    throw Error(y(160));
  }
  var c = b;
  b = c.stateNode;
  switch (c.tag) {
    case 5:
      var d = false;
      break;
    case 3:
      b = b.containerInfo;
      d = true;
      break;
    case 4:
      b = b.containerInfo;
      d = true;
      break;
    default:
      throw Error(y(161));
  }
  c.flags & 16 && (pb(b, ""), c.flags &= -17);
  a:
    b:
      for (c = a; ; ) {
        for (; c.sibling === null; ) {
          if (c.return === null || ej(c.return)) {
            c = null;
            break a;
          }
          c = c.return;
        }
        c.sibling.return = c.return;
        for (c = c.sibling; c.tag !== 5 && c.tag !== 6 && c.tag !== 18; ) {
          if (c.flags & 2)
            continue b;
          if (c.child === null || c.tag === 4)
            continue b;
          else
            c.child.return = c, c = c.child;
        }
        if (!(c.flags & 2)) {
          c = c.stateNode;
          break a;
        }
      }
  d ? gj(a, c, b) : hj(a, c, b);
}
function gj(a, b, c) {
  var d = a.tag, e = d === 5 || d === 6;
  if (e)
    a = e ? a.stateNode : a.stateNode.instance, b ? c.nodeType === 8 ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (c.nodeType === 8 ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, c !== null && c !== void 0 || b.onclick !== null || (b.onclick = jf));
  else if (d !== 4 && (a = a.child, a !== null))
    for (gj(a, b, c), a = a.sibling; a !== null; )
      gj(a, b, c), a = a.sibling;
}
function hj(a, b, c) {
  var d = a.tag, e = d === 5 || d === 6;
  if (e)
    a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (d !== 4 && (a = a.child, a !== null))
    for (hj(a, b, c), a = a.sibling; a !== null; )
      hj(a, b, c), a = a.sibling;
}
function cj(a, b) {
  for (var c = b, d = false, e, f; ; ) {
    if (!d) {
      d = c.return;
      a:
        for (; ; ) {
          if (d === null)
            throw Error(y(160));
          e = d.stateNode;
          switch (d.tag) {
            case 5:
              f = false;
              break a;
            case 3:
              e = e.containerInfo;
              f = true;
              break a;
            case 4:
              e = e.containerInfo;
              f = true;
              break a;
          }
          d = d.return;
        }
      d = true;
    }
    if (c.tag === 5 || c.tag === 6) {
      a:
        for (var g = a, h = c, k = h; ; )
          if (bj(g, k), k.child !== null && k.tag !== 4)
            k.child.return = k, k = k.child;
          else {
            if (k === h)
              break a;
            for (; k.sibling === null; ) {
              if (k.return === null || k.return === h)
                break a;
              k = k.return;
            }
            k.sibling.return = k.return;
            k = k.sibling;
          }
      f ? (g = e, h = c.stateNode, g.nodeType === 8 ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
    } else if (c.tag === 4) {
      if (c.child !== null) {
        e = c.stateNode.containerInfo;
        f = true;
        c.child.return = c;
        c = c.child;
        continue;
      }
    } else if (bj(a, c), c.child !== null) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; c.sibling === null; ) {
      if (c.return === null || c.return === b)
        return;
      c = c.return;
      c.tag === 4 && (d = false);
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
}
function ij(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      var c = b.updateQueue;
      c = c !== null ? c.lastEffect : null;
      if (c !== null) {
        var d = c = c.next;
        do
          (d.tag & 3) === 3 && (a = d.destroy, d.destroy = void 0, a !== void 0 && a()), d = d.next;
        while (d !== c);
      }
      return;
    case 1:
      return;
    case 5:
      c = b.stateNode;
      if (c != null) {
        d = b.memoizedProps;
        var e = a !== null ? a.memoizedProps : d;
        a = b.type;
        var f = b.updateQueue;
        b.updateQueue = null;
        if (f !== null) {
          c[xf] = d;
          a === "input" && d.type === "radio" && d.name != null && $a(c, d);
          wb(a, e);
          b = wb(a, d);
          for (e = 0; e < f.length; e += 2) {
            var g = f[e], h = f[e + 1];
            g === "style" ? tb(c, h) : g === "dangerouslySetInnerHTML" ? ob(c, h) : g === "children" ? pb(c, h) : qa(c, g, h, b);
          }
          switch (a) {
            case "input":
              ab(c, d);
              break;
            case "textarea":
              ib(c, d);
              break;
            case "select":
              a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, f != null ? fb(c, !!d.multiple, f, false) : a !== !!d.multiple && (d.defaultValue != null ? fb(c, !!d.multiple, d.defaultValue, true) : fb(c, !!d.multiple, d.multiple ? [] : "", false));
          }
        }
      }
      return;
    case 6:
      if (b.stateNode === null)
        throw Error(y(162));
      b.stateNode.nodeValue = b.memoizedProps;
      return;
    case 3:
      c = b.stateNode;
      c.hydrate && (c.hydrate = false, Cc(c.containerInfo));
      return;
    case 12:
      return;
    case 13:
      b.memoizedState !== null && (jj = O(), aj(b.child, true));
      kj(b);
      return;
    case 19:
      kj(b);
      return;
    case 17:
      return;
    case 23:
    case 24:
      aj(b, b.memoizedState !== null);
      return;
  }
  throw Error(y(163));
}
function kj(a) {
  var b = a.updateQueue;
  if (b !== null) {
    a.updateQueue = null;
    var c = a.stateNode;
    c === null && (c = a.stateNode = new Ui());
    b.forEach(function(b2) {
      var d = lj.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function mj(a, b) {
  return a !== null && (a = a.memoizedState, a === null || a.dehydrated !== null) ? (b = b.memoizedState, b !== null && b.dehydrated === null) : false;
}
var nj = Math.ceil, oj = ra.ReactCurrentDispatcher, pj = ra.ReactCurrentOwner, X = 0, U = null, Y = null, W = 0, qj = 0, rj = Bf(0), V = 0, sj = null, tj = 0, Dg = 0, Hi = 0, uj = 0, vj = null, jj = 0, Ji = Infinity;
function wj() {
  Ji = O() + 500;
}
var Z = null, Qi = false, Ri = null, Ti = null, xj = false, yj = null, zj = 90, Aj = [], Bj = [], Cj = null, Dj = 0, Ej = null, Fj = -1, Gj = 0, Hj = 0, Ij = null, Jj = false;
function Hg() {
  return (X & 48) !== 0 ? O() : Fj !== -1 ? Fj : Fj = O();
}
function Ig(a) {
  a = a.mode;
  if ((a & 2) === 0)
    return 1;
  if ((a & 4) === 0)
    return eg() === 99 ? 1 : 2;
  Gj === 0 && (Gj = tj);
  if (kg.transition !== 0) {
    Hj !== 0 && (Hj = vj !== null ? vj.pendingLanes : 0);
    a = Gj;
    var b = 4186112 & ~Hj;
    b &= -b;
    b === 0 && (a = 4186112 & ~a, b = a & -a, b === 0 && (b = 8192));
    return b;
  }
  a = eg();
  (X & 4) !== 0 && a === 98 ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
  return a;
}
function Jg(a, b, c) {
  if (50 < Dj)
    throw Dj = 0, Ej = null, Error(y(185));
  a = Kj(a, b);
  if (a === null)
    return null;
  $c(a, b, c);
  a === U && (Hi |= b, V === 4 && Ii(a, W));
  var d = eg();
  b === 1 ? (X & 8) !== 0 && (X & 48) === 0 ? Lj(a) : (Mj(a, c), X === 0 && (wj(), ig())) : ((X & 4) === 0 || d !== 98 && d !== 99 || (Cj === null ? Cj = /* @__PURE__ */ new Set([a]) : Cj.add(a)), Mj(a, c));
  vj = a;
}
function Kj(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  c !== null && (c.lanes |= b);
  c = a;
  for (a = a.return; a !== null; )
    a.childLanes |= b, c = a.alternate, c !== null && (c.childLanes |= b), c = a, a = a.return;
  return c.tag === 3 ? c.stateNode : null;
}
function Mj(a, b) {
  for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g; ) {
    var h = 31 - Vc(g), k = 1 << h, l = f[h];
    if (l === -1) {
      if ((k & d) === 0 || (k & e) !== 0) {
        l = b;
        Rc(k);
        var n = F;
        f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
      }
    } else
      l <= b && (a.expiredLanes |= k);
    g &= ~k;
  }
  d = Uc(a, a === U ? W : 0);
  b = F;
  if (d === 0)
    c !== null && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
  else {
    if (c !== null) {
      if (a.callbackPriority === b)
        return;
      c !== Zf && Pf(c);
    }
    b === 15 ? (c = Lj.bind(null, a), ag === null ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : b === 14 ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Nj(a) {
  Fj = -1;
  Hj = Gj = 0;
  if ((X & 48) !== 0)
    throw Error(y(327));
  var b = a.callbackNode;
  if (Oj() && a.callbackNode !== b)
    return null;
  var c = Uc(a, a === U ? W : 0);
  if (c === 0)
    return null;
  var d = c;
  var e = X;
  X |= 16;
  var f = Pj();
  if (U !== a || W !== d)
    wj(), Qj(a, d);
  do
    try {
      Rj();
      break;
    } catch (h) {
      Sj(a, h);
    }
  while (1);
  qg();
  oj.current = f;
  X = e;
  Y !== null ? d = 0 : (U = null, W = 0, d = V);
  if ((tj & Hi) !== 0)
    Qj(a, 0);
  else if (d !== 0) {
    d === 2 && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), c = Wc(a), c !== 0 && (d = Tj(a, c)));
    if (d === 1)
      throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
    a.finishedWork = a.current.alternate;
    a.finishedLanes = c;
    switch (d) {
      case 0:
      case 1:
        throw Error(y(345));
      case 2:
        Uj(a);
        break;
      case 3:
        Ii(a, c);
        if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
          if (Uc(a, 0) !== 0)
            break;
          e = a.suspendedLanes;
          if ((e & c) !== c) {
            Hg();
            a.pingedLanes |= a.suspendedLanes & e;
            break;
          }
          a.timeoutHandle = of(Uj.bind(null, a), d);
          break;
        }
        Uj(a);
        break;
      case 4:
        Ii(a, c);
        if ((c & 4186112) === c)
          break;
        d = a.eventTimes;
        for (e = -1; 0 < c; ) {
          var g = 31 - Vc(c);
          f = 1 << g;
          g = d[g];
          g > e && (e = g);
          c &= ~f;
        }
        c = e;
        c = O() - c;
        c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
        if (10 < c) {
          a.timeoutHandle = of(Uj.bind(null, a), c);
          break;
        }
        Uj(a);
        break;
      case 5:
        Uj(a);
        break;
      default:
        throw Error(y(329));
    }
  }
  Mj(a, O());
  return a.callbackNode === b ? Nj.bind(null, a) : null;
}
function Ii(a, b) {
  b &= ~uj;
  b &= ~Hi;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - Vc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Lj(a) {
  if ((X & 48) !== 0)
    throw Error(y(327));
  Oj();
  if (a === U && (a.expiredLanes & W) !== 0) {
    var b = W;
    var c = Tj(a, b);
    (tj & Hi) !== 0 && (b = Uc(a, b), c = Tj(a, b));
  } else
    b = Uc(a, 0), c = Tj(a, b);
  a.tag !== 0 && c === 2 && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), b = Wc(a), b !== 0 && (c = Tj(a, b)));
  if (c === 1)
    throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Uj(a);
  Mj(a, O());
  return null;
}
function Vj() {
  if (Cj !== null) {
    var a = Cj;
    Cj = null;
    a.forEach(function(a2) {
      a2.expiredLanes |= 24 & a2.pendingLanes;
      Mj(a2, O());
    });
  }
  ig();
}
function Wj(a, b) {
  var c = X;
  X |= 1;
  try {
    return a(b);
  } finally {
    X = c, X === 0 && (wj(), ig());
  }
}
function Xj(a, b) {
  var c = X;
  X &= -2;
  X |= 8;
  try {
    return a(b);
  } finally {
    X = c, X === 0 && (wj(), ig());
  }
}
function ni(a, b) {
  I(rj, qj);
  qj |= b;
  tj |= b;
}
function Ki() {
  qj = rj.current;
  H(rj);
}
function Qj(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  c !== -1 && (a.timeoutHandle = -1, pf(c));
  if (Y !== null)
    for (c = Y.return; c !== null; ) {
      var d = c;
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          d !== null && d !== void 0 && Gf();
          break;
        case 3:
          fh();
          H(N);
          H(M);
          uh();
          break;
        case 5:
          hh(d);
          break;
        case 4:
          fh();
          break;
        case 13:
          H(P);
          break;
        case 19:
          H(P);
          break;
        case 10:
          rg(d);
          break;
        case 23:
        case 24:
          Ki();
      }
      c = c.return;
    }
  U = a;
  Y = Tg(a.current, null);
  W = qj = tj = b;
  V = 0;
  sj = null;
  uj = Hi = Dg = 0;
}
function Sj(a, b) {
  do {
    var c = Y;
    try {
      qg();
      vh.current = Gh;
      if (yh) {
        for (var d = R.memoizedState; d !== null; ) {
          var e = d.queue;
          e !== null && (e.pending = null);
          d = d.next;
        }
        yh = false;
      }
      xh = 0;
      T = S = R = null;
      zh = false;
      pj.current = null;
      if (c === null || c.return === null) {
        V = 1;
        sj = b;
        Y = null;
        break;
      }
      a: {
        var f = a, g = c.return, h = c, k = b;
        b = W;
        h.flags |= 2048;
        h.firstEffect = h.lastEffect = null;
        if (k !== null && typeof k === "object" && typeof k.then === "function") {
          var l = k;
          if ((h.mode & 2) === 0) {
            var n = h.alternate;
            n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var A = (P.current & 1) !== 0, p = g;
          do {
            var C;
            if (C = p.tag === 13) {
              var x = p.memoizedState;
              if (x !== null)
                C = x.dehydrated !== null ? true : false;
              else {
                var w = p.memoizedProps;
                C = w.fallback === void 0 ? false : w.unstable_avoidThisFallback !== true ? true : A ? false : true;
              }
            }
            if (C) {
              var z = p.updateQueue;
              if (z === null) {
                var u = /* @__PURE__ */ new Set();
                u.add(l);
                p.updateQueue = u;
              } else
                z.add(l);
              if ((p.mode & 2) === 0) {
                p.flags |= 64;
                h.flags |= 16384;
                h.flags &= -2981;
                if (h.tag === 1)
                  if (h.alternate === null)
                    h.tag = 17;
                  else {
                    var t = zg(-1, 1);
                    t.tag = 2;
                    Ag(h, t);
                  }
                h.lanes |= 1;
                break a;
              }
              k = void 0;
              h = b;
              var q = f.pingCache;
              q === null ? (q = f.pingCache = new Oi(), k = /* @__PURE__ */ new Set(), q.set(l, k)) : (k = q.get(l), k === void 0 && (k = /* @__PURE__ */ new Set(), q.set(l, k)));
              if (!k.has(h)) {
                k.add(h);
                var v = Yj.bind(null, f, l, h);
                l.then(v, v);
              }
              p.flags |= 4096;
              p.lanes = b;
              break a;
            }
            p = p.return;
          } while (p !== null);
          k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
        }
        V !== 5 && (V = 2);
        k = Mi(k, h);
        p = g;
        do {
          switch (p.tag) {
            case 3:
              f = k;
              p.flags |= 4096;
              b &= -b;
              p.lanes |= b;
              var J = Pi(p, f, b);
              Bg(p, J);
              break a;
            case 1:
              f = k;
              var K = p.type, Q = p.stateNode;
              if ((p.flags & 64) === 0 && (typeof K.getDerivedStateFromError === "function" || Q !== null && typeof Q.componentDidCatch === "function" && (Ti === null || !Ti.has(Q)))) {
                p.flags |= 4096;
                b &= -b;
                p.lanes |= b;
                var L = Si(p, f, b);
                Bg(p, L);
                break a;
              }
          }
          p = p.return;
        } while (p !== null);
      }
      Zj(c);
    } catch (va) {
      b = va;
      Y === c && c !== null && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Pj() {
  var a = oj.current;
  oj.current = Gh;
  return a === null ? Gh : a;
}
function Tj(a, b) {
  var c = X;
  X |= 16;
  var d = Pj();
  U === a && W === b || Qj(a, b);
  do
    try {
      ak();
      break;
    } catch (e) {
      Sj(a, e);
    }
  while (1);
  qg();
  X = c;
  oj.current = d;
  if (Y !== null)
    throw Error(y(261));
  U = null;
  W = 0;
  return V;
}
function ak() {
  for (; Y !== null; )
    bk(Y);
}
function Rj() {
  for (; Y !== null && !Qf(); )
    bk(Y);
}
function bk(a) {
  var b = ck(a.alternate, a, qj);
  a.memoizedProps = a.pendingProps;
  b === null ? Zj(a) : Y = b;
  pj.current = null;
}
function Zj(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if ((b.flags & 2048) === 0) {
      c = Gi(c, b, qj);
      if (c !== null) {
        Y = c;
        return;
      }
      c = b;
      if (c.tag !== 24 && c.tag !== 23 || c.memoizedState === null || (qj & 1073741824) !== 0 || (c.mode & 4) === 0) {
        for (var d = 0, e = c.child; e !== null; )
          d |= e.lanes | e.childLanes, e = e.sibling;
        c.childLanes = d;
      }
      a !== null && (a.flags & 2048) === 0 && (a.firstEffect === null && (a.firstEffect = b.firstEffect), b.lastEffect !== null && (a.lastEffect !== null && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (a.lastEffect !== null ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
    } else {
      c = Li(b);
      if (c !== null) {
        c.flags &= 2047;
        Y = c;
        return;
      }
      a !== null && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
    }
    b = b.sibling;
    if (b !== null) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (b !== null);
  V === 0 && (V = 5);
}
function Uj(a) {
  var b = eg();
  gg(99, dk.bind(null, a, b));
  return null;
}
function dk(a, b) {
  do
    Oj();
  while (yj !== null);
  if ((X & 48) !== 0)
    throw Error(y(327));
  var c = a.finishedWork;
  if (c === null)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current)
    throw Error(y(177));
  a.callbackNode = null;
  var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
  a.pendingLanes = e;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= e;
  a.mutableReadLanes &= e;
  a.entangledLanes &= e;
  e = a.entanglements;
  for (var g = a.eventTimes, h = a.expirationTimes; 0 < f; ) {
    var k = 31 - Vc(f), l = 1 << k;
    e[k] = 0;
    g[k] = -1;
    h[k] = -1;
    f &= ~l;
  }
  Cj !== null && (d & 24) === 0 && Cj.has(a) && Cj.delete(a);
  a === U && (Y = U = null, W = 0);
  1 < c.flags ? c.lastEffect !== null ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
  if (d !== null) {
    e = X;
    X |= 32;
    pj.current = null;
    kf = fd;
    g = Ne();
    if (Oe(g)) {
      if ("selectionStart" in g)
        h = { start: g.selectionStart, end: g.selectionEnd };
      else
        a:
          if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && l.rangeCount !== 0) {
            h = l.anchorNode;
            f = l.anchorOffset;
            k = l.focusNode;
            l = l.focusOffset;
            try {
              h.nodeType, k.nodeType;
            } catch (va) {
              h = null;
              break a;
            }
            var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
            b:
              for (; ; ) {
                for (var u; ; ) {
                  w !== h || f !== 0 && w.nodeType !== 3 || (A = n + f);
                  w !== k || l !== 0 && w.nodeType !== 3 || (p = n + l);
                  w.nodeType === 3 && (n += w.nodeValue.length);
                  if ((u = w.firstChild) === null)
                    break;
                  z = w;
                  w = u;
                }
                for (; ; ) {
                  if (w === g)
                    break b;
                  z === h && ++C === f && (A = n);
                  z === k && ++x === l && (p = n);
                  if ((u = w.nextSibling) !== null)
                    break;
                  w = z;
                  z = w.parentNode;
                }
                w = u;
              }
            h = A === -1 || p === -1 ? null : { start: A, end: p };
          } else
            h = null;
      h = h || { start: 0, end: 0 };
    } else
      h = null;
    lf = { focusedElem: g, selectionRange: h };
    fd = false;
    Ij = null;
    Jj = false;
    Z = d;
    do
      try {
        ek();
      } catch (va) {
        if (Z === null)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (Z !== null);
    Ij = null;
    Z = d;
    do
      try {
        for (g = a; Z !== null; ) {
          var t = Z.flags;
          t & 16 && pb(Z.stateNode, "");
          if (t & 128) {
            var q = Z.alternate;
            if (q !== null) {
              var v = q.ref;
              v !== null && (typeof v === "function" ? v(null) : v.current = null);
            }
          }
          switch (t & 1038) {
            case 2:
              fj(Z);
              Z.flags &= -3;
              break;
            case 6:
              fj(Z);
              Z.flags &= -3;
              ij(Z.alternate, Z);
              break;
            case 1024:
              Z.flags &= -1025;
              break;
            case 1028:
              Z.flags &= -1025;
              ij(Z.alternate, Z);
              break;
            case 4:
              ij(Z.alternate, Z);
              break;
            case 8:
              h = Z;
              cj(g, h);
              var J = h.alternate;
              dj(h);
              J !== null && dj(J);
          }
          Z = Z.nextEffect;
        }
      } catch (va) {
        if (Z === null)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (Z !== null);
    v = lf;
    q = Ne();
    t = v.focusedElem;
    g = v.selectionRange;
    if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
      g !== null && Oe(t) && (q = g.start, v = g.end, v === void 0 && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = g.end === void 0 ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (v.rangeCount !== 1 || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
      q = [];
      for (v = t; v = v.parentNode; )
        v.nodeType === 1 && q.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
      typeof t.focus === "function" && t.focus();
      for (t = 0; t < q.length; t++)
        v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
    }
    fd = !!kf;
    lf = kf = null;
    a.current = c;
    Z = d;
    do
      try {
        for (t = a; Z !== null; ) {
          var K = Z.flags;
          K & 36 && Yi(t, Z.alternate, Z);
          if (K & 128) {
            q = void 0;
            var Q = Z.ref;
            if (Q !== null) {
              var L = Z.stateNode;
              switch (Z.tag) {
                case 5:
                  q = L;
                  break;
                default:
                  q = L;
              }
              typeof Q === "function" ? Q(q) : Q.current = q;
            }
          }
          Z = Z.nextEffect;
        }
      } catch (va) {
        if (Z === null)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (Z !== null);
    Z = null;
    $f();
    X = e;
  } else
    a.current = c;
  if (xj)
    xj = false, yj = a, zj = b;
  else
    for (Z = d; Z !== null; )
      b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
  d = a.pendingLanes;
  d === 0 && (Ti = null);
  d === 1 ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
  c = c.stateNode;
  if (Mf && typeof Mf.onCommitFiberRoot === "function")
    try {
      Mf.onCommitFiberRoot(Lf, c, void 0, (c.current.flags & 64) === 64);
    } catch (va) {
    }
  Mj(a, O());
  if (Qi)
    throw Qi = false, a = Ri, Ri = null, a;
  if ((X & 8) !== 0)
    return null;
  ig();
  return null;
}
function ek() {
  for (; Z !== null; ) {
    var a = Z.alternate;
    Jj || Ij === null || ((Z.flags & 8) !== 0 ? dc(Z, Ij) && (Jj = true) : Z.tag === 13 && mj(a, Z) && dc(Z, Ij) && (Jj = true));
    var b = Z.flags;
    (b & 256) !== 0 && Xi(a, Z);
    (b & 512) === 0 || xj || (xj = true, hg(97, function() {
      Oj();
      return null;
    }));
    Z = Z.nextEffect;
  }
}
function Oj() {
  if (zj !== 90) {
    var a = 97 < zj ? 97 : zj;
    zj = 90;
    return gg(a, fk);
  }
  return false;
}
function $i(a, b) {
  Aj.push(b, a);
  xj || (xj = true, hg(97, function() {
    Oj();
    return null;
  }));
}
function Zi(a, b) {
  Bj.push(b, a);
  xj || (xj = true, hg(97, function() {
    Oj();
    return null;
  }));
}
function fk() {
  if (yj === null)
    return false;
  var a = yj;
  yj = null;
  if ((X & 48) !== 0)
    throw Error(y(331));
  var b = X;
  X |= 32;
  var c = Bj;
  Bj = [];
  for (var d = 0; d < c.length; d += 2) {
    var e = c[d], f = c[d + 1], g = e.destroy;
    e.destroy = void 0;
    if (typeof g === "function")
      try {
        g();
      } catch (k) {
        if (f === null)
          throw Error(y(330));
        Wi(f, k);
      }
  }
  c = Aj;
  Aj = [];
  for (d = 0; d < c.length; d += 2) {
    e = c[d];
    f = c[d + 1];
    try {
      var h = e.create;
      e.destroy = h();
    } catch (k) {
      if (f === null)
        throw Error(y(330));
      Wi(f, k);
    }
  }
  for (h = a.current.firstEffect; h !== null; )
    a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
  X = b;
  ig();
  return true;
}
function gk(a, b, c) {
  b = Mi(c, b);
  b = Pi(a, b, 1);
  Ag(a, b);
  b = Hg();
  a = Kj(a, 1);
  a !== null && ($c(a, 1, b), Mj(a, b));
}
function Wi(a, b) {
  if (a.tag === 3)
    gk(a, a, b);
  else
    for (var c = a.return; c !== null; ) {
      if (c.tag === 3) {
        gk(c, a, b);
        break;
      } else if (c.tag === 1) {
        var d = c.stateNode;
        if (typeof c.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (Ti === null || !Ti.has(d))) {
          a = Mi(b, a);
          var e = Si(c, a, 1);
          Ag(c, e);
          e = Hg();
          c = Kj(c, 1);
          if (c !== null)
            $c(c, 1, e), Mj(c, e);
          else if (typeof d.componentDidCatch === "function" && (Ti === null || !Ti.has(d)))
            try {
              d.componentDidCatch(b, a);
            } catch (f) {
            }
          break;
        }
      }
      c = c.return;
    }
}
function Yj(a, b, c) {
  var d = a.pingCache;
  d !== null && d.delete(b);
  b = Hg();
  a.pingedLanes |= a.suspendedLanes & c;
  U === a && (W & c) === c && (V === 4 || V === 3 && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
  Mj(a, b);
}
function lj(a, b) {
  var c = a.stateNode;
  c !== null && c.delete(b);
  b = 0;
  b === 0 && (b = a.mode, (b & 2) === 0 ? b = 1 : (b & 4) === 0 ? b = eg() === 99 ? 1 : 2 : (Gj === 0 && (Gj = tj), b = Yc(62914560 & ~Gj), b === 0 && (b = 4194304)));
  c = Hg();
  a = Kj(a, b);
  a !== null && ($c(a, b, c), Mj(a, c));
}
var ck;
ck = function(a, b, c) {
  var d = b.lanes;
  if (a !== null)
    if (a.memoizedProps !== b.pendingProps || N.current)
      ug = true;
    else if ((c & d) !== 0)
      ug = (a.flags & 16384) !== 0 ? true : false;
    else {
      ug = false;
      switch (b.tag) {
        case 3:
          ri(b);
          sh();
          break;
        case 5:
          gh(b);
          break;
        case 1:
          Ff(b.type) && Jf(b);
          break;
        case 4:
          eh(b, b.stateNode.containerInfo);
          break;
        case 10:
          d = b.memoizedProps.value;
          var e = b.type._context;
          I(mg, e._currentValue);
          e._currentValue = d;
          break;
        case 13:
          if (b.memoizedState !== null) {
            if ((c & b.child.childLanes) !== 0)
              return ti(a, b, c);
            I(P, P.current & 1);
            b = hi(a, b, c);
            return b !== null ? b.sibling : null;
          }
          I(P, P.current & 1);
          break;
        case 19:
          d = (c & b.childLanes) !== 0;
          if ((a.flags & 64) !== 0) {
            if (d)
              return Ai(a, b, c);
            b.flags |= 64;
          }
          e = b.memoizedState;
          e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null);
          I(P, P.current);
          if (d)
            break;
          else
            return null;
        case 23:
        case 24:
          return b.lanes = 0, mi(a, b, c);
      }
      return hi(a, b, c);
    }
  else
    ug = false;
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      d = b.type;
      a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
      a = b.pendingProps;
      e = Ef(b, M.current);
      tg(b, c);
      e = Ch(null, b, d, a, e, c);
      b.flags |= 1;
      if (typeof e === "object" && e !== null && typeof e.render === "function" && e.$$typeof === void 0) {
        b.tag = 1;
        b.memoizedState = null;
        b.updateQueue = null;
        if (Ff(d)) {
          var f = true;
          Jf(b);
        } else
          f = false;
        b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null;
        xg(b);
        var g = d.getDerivedStateFromProps;
        typeof g === "function" && Gg(b, d, g, a);
        e.updater = Kg;
        b.stateNode = e;
        e._reactInternals = b;
        Og(b, d, a, c);
        b = qi(null, b, d, true, f, c);
      } else
        b.tag = 0, fi(null, b, e, c), b = b.child;
      return b;
    case 16:
      e = b.elementType;
      a: {
        a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        f = e._init;
        e = f(e._payload);
        b.type = e;
        f = b.tag = hk(e);
        a = lg(e, a);
        switch (f) {
          case 0:
            b = li(null, b, e, a, c);
            break a;
          case 1:
            b = pi(null, b, e, a, c);
            break a;
          case 11:
            b = gi(null, b, e, a, c);
            break a;
          case 14:
            b = ii(null, b, e, lg(e.type, a), d, c);
            break a;
        }
        throw Error(y(306, e, ""));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
    case 3:
      ri(b);
      d = b.updateQueue;
      if (a === null || d === null)
        throw Error(y(282));
      d = b.pendingProps;
      e = b.memoizedState;
      e = e !== null ? e.element : null;
      yg(a, b);
      Cg(b, d, null, c);
      d = b.memoizedState.element;
      if (d === e)
        sh(), b = hi(a, b, c);
      else {
        e = b.stateNode;
        if (f = e.hydrate)
          kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = true;
        if (f) {
          a = e.mutableSourceEagerHydrationData;
          if (a != null)
            for (e = 0; e < a.length; e += 2)
              f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
          c = Zg(b, null, d, c);
          for (b.child = c; c; )
            c.flags = c.flags & -3 | 1024, c = c.sibling;
        } else
          fi(a, b, d, c), sh();
        b = b.child;
      }
      return b;
    case 5:
      return gh(b), a === null && ph(b), d = b.type, e = b.pendingProps, f = a !== null ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : f !== null && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;
    case 6:
      return a === null && ph(b), null;
    case 13:
      return ti(a, b, c);
    case 4:
      return eh(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
    case 7:
      return fi(a, b, b.pendingProps, c), b.child;
    case 8:
      return fi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return fi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g = b.memoizedProps;
        f = e.value;
        var h = b.type._context;
        I(mg, h._currentValue);
        h._currentValue = f;
        if (g !== null)
          if (h = g.value, f = He(h, f) ? 0 : (typeof d._calculateChangedBits === "function" ? d._calculateChangedBits(h, f) : 1073741823) | 0, f === 0) {
            if (g.children === e.children && !N.current) {
              b = hi(a, b, c);
              break a;
            }
          } else
            for (h = b.child, h !== null && (h.return = b); h !== null; ) {
              var k = h.dependencies;
              if (k !== null) {
                g = h.child;
                for (var l = k.firstContext; l !== null; ) {
                  if (l.context === d && (l.observedBits & f) !== 0) {
                    h.tag === 1 && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                    h.lanes |= c;
                    l = h.alternate;
                    l !== null && (l.lanes |= c);
                    sg(h.return, c);
                    k.lanes |= c;
                    break;
                  }
                  l = l.next;
                }
              } else
                g = h.tag === 10 ? h.type === b.type ? null : h.child : h.child;
              if (g !== null)
                g.return = h;
              else
                for (g = h; g !== null; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  h = g.sibling;
                  if (h !== null) {
                    h.return = g.return;
                    g = h;
                    break;
                  }
                  g = g.return;
                }
              h = g;
            }
        fi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(e, f.unstable_observedBits), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
    case 14:
      return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);
    case 15:
      return ki(a, b, b.type, b.pendingProps, d, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = true, Jf(b)) : a = false, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, true, a, c);
    case 19:
      return Ai(a, b, c);
    case 23:
      return mi(a, b, c);
    case 24:
      return mi(a, b, c);
  }
  throw Error(y(156, b.tag));
};
function ik(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.flags = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function nh(a, b, c, d) {
  return new ik(a, b, c, d);
}
function ji(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function hk(a) {
  if (typeof a === "function")
    return ji(a) ? 1 : 0;
  if (a !== void 0 && a !== null) {
    a = a.$$typeof;
    if (a === Aa)
      return 11;
    if (a === Da)
      return 14;
  }
  return 2;
}
function Tg(a, b) {
  var c = a.alternate;
  c === null ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = b === null ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Vg(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if (typeof a === "function")
    ji(a) && (g = 1);
  else if (typeof a === "string")
    g = 5;
  else
    a:
      switch (a) {
        case ua:
          return Xg(c.children, e, f, b);
        case Ha:
          g = 8;
          e |= 16;
          break;
        case wa:
          g = 8;
          e |= 1;
          break;
        case xa:
          return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;
        case Ba:
          return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;
        case Ca:
          return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;
        case Ia:
          return vi(c, e, f, b);
        case Ja:
          return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;
        default:
          if (typeof a === "object" && a !== null)
            switch (a.$$typeof) {
              case ya:
                g = 10;
                break a;
              case za:
                g = 9;
                break a;
              case Aa:
                g = 11;
                break a;
              case Da:
                g = 14;
                break a;
              case Ea:
                g = 16;
                d = null;
                break a;
              case Fa:
                g = 22;
                break a;
            }
          throw Error(y(130, a == null ? a : typeof a, ""));
      }
  b = nh(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f;
  return b;
}
function Xg(a, b, c, d) {
  a = nh(7, a, d, b);
  a.lanes = c;
  return a;
}
function vi(a, b, c, d) {
  a = nh(23, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  return a;
}
function Ug(a, b, c) {
  a = nh(6, a, null, b);
  a.lanes = c;
  return a;
}
function Wg(a, b, c) {
  b = nh(4, a.children !== null ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function jk(a, b, c) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = c;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = Zc(0);
  this.expirationTimes = Zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = Zc(0);
  this.mutableSourceEagerHydrationData = null;
}
function kk(a, b, c) {
  var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: ta, key: d == null ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function lk(a, b, c, d) {
  var e = b.current, f = Hg(), g = Ig(e);
  a:
    if (c) {
      c = c._reactInternals;
      b: {
        if (Zb(c) !== c || c.tag !== 1)
          throw Error(y(170));
        var h = c;
        do {
          switch (h.tag) {
            case 3:
              h = h.stateNode.context;
              break b;
            case 1:
              if (Ff(h.type)) {
                h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }
          }
          h = h.return;
        } while (h !== null);
        throw Error(y(171));
      }
      if (c.tag === 1) {
        var k = c.type;
        if (Ff(k)) {
          c = If(c, k, h);
          break a;
        }
      }
      c = h;
    } else
      c = Cf;
  b.context === null ? b.context = c : b.pendingContext = c;
  b = zg(f, g);
  b.payload = { element: a };
  d = d === void 0 ? null : d;
  d !== null && (b.callback = d);
  Ag(e, b);
  Jg(e, g, f);
  return g;
}
function mk(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function nk(a, b) {
  a = a.memoizedState;
  if (a !== null && a.dehydrated !== null) {
    var c = a.retryLane;
    a.retryLane = c !== 0 && c < b ? c : b;
  }
}
function ok(a, b) {
  nk(a, b);
  (a = a.alternate) && nk(a, b);
}
function pk() {
  return null;
}
function qk(a, b, c) {
  var d = c != null && c.hydrationOptions != null && c.hydrationOptions.mutableSources || null;
  c = new jk(a, b, c != null && c.hydrate === true);
  b = nh(3, null, null, b === 2 ? 7 : b === 1 ? 3 : 0);
  c.current = b;
  b.stateNode = c;
  xg(b);
  a[ff] = c.current;
  cf(a.nodeType === 8 ? a.parentNode : a);
  if (d)
    for (a = 0; a < d.length; a++) {
      b = d[a];
      var e = b._getVersion;
      e = e(b._source);
      c.mutableSourceEagerHydrationData == null ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
    }
  this._internalRoot = c;
}
qk.prototype.render = function(a) {
  lk(a, this._internalRoot, null, null);
};
qk.prototype.unmount = function() {
  var a = this._internalRoot, b = a.containerInfo;
  lk(null, a, null, function() {
    b[ff] = null;
  });
};
function rk(a) {
  return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11 && (a.nodeType !== 8 || a.nodeValue !== " react-mount-point-unstable "));
}
function sk(a, b) {
  b || (b = a ? a.nodeType === 9 ? a.documentElement : a.firstChild : null, b = !(!b || b.nodeType !== 1 || !b.hasAttribute("data-reactroot")));
  if (!b)
    for (var c; c = a.lastChild; )
      a.removeChild(c);
  return new qk(a, 0, b ? { hydrate: true } : void 0);
}
function tk(a, b, c, d, e) {
  var f = c._reactRootContainer;
  if (f) {
    var g = f._internalRoot;
    if (typeof e === "function") {
      var h = e;
      e = function() {
        var a2 = mk(g);
        h.call(a2);
      };
    }
    lk(b, g, a, e);
  } else {
    f = c._reactRootContainer = sk(c, d);
    g = f._internalRoot;
    if (typeof e === "function") {
      var k = e;
      e = function() {
        var a2 = mk(g);
        k.call(a2);
      };
    }
    Xj(function() {
      lk(b, g, a, e);
    });
  }
  return mk(g);
}
ec = function(a) {
  if (a.tag === 13) {
    var b = Hg();
    Jg(a, 4, b);
    ok(a, 4);
  }
};
fc = function(a) {
  if (a.tag === 13) {
    var b = Hg();
    Jg(a, 67108864, b);
    ok(a, 67108864);
  }
};
gc = function(a) {
  if (a.tag === 13) {
    var b = Hg(), c = Ig(a);
    Jg(a, c, b);
    ok(a, c);
  }
};
hc = function(a, b) {
  return b();
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      ab(a, c);
      b = c.name;
      if (c.type === "radio" && b != null) {
        for (c = a; c.parentNode; )
          c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e)
              throw Error(y(90));
            Wa(d);
            ab(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, b != null && fb(a, !!c.multiple, b, false);
  }
};
Gb = Wj;
Hb = function(a, b, c, d, e) {
  var f = X;
  X |= 4;
  try {
    return gg(98, a.bind(null, b, c, d, e));
  } finally {
    X = f, X === 0 && (wj(), ig());
  }
};
Ib = function() {
  (X & 49) === 0 && (Vj(), Oj());
};
Jb = function(a, b) {
  var c = X;
  X |= 2;
  try {
    return a(b);
  } finally {
    X = c, X === 0 && (wj(), ig());
  }
};
function uk(a, b) {
  var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!rk(b))
    throw Error(y(200));
  return kk(a, b, null, c);
}
var vk = { Events: [Cb, ue, Db, Eb, Fb, Oj, { current: false }] }, wk = { findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom" };
var xk = { bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = cc(a);
  return a === null ? null : a.stateNode;
}, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
  var yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!yk.isDisabled && yk.supportsFiber)
    try {
      Lf = yk.inject(xk), Mf = yk;
    } catch (a) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
reactDom_production_min.createPortal = uk;
reactDom_production_min.findDOMNode = function(a) {
  if (a == null)
    return null;
  if (a.nodeType === 1)
    return a;
  var b = a._reactInternals;
  if (b === void 0) {
    if (typeof a.render === "function")
      throw Error(y(188));
    throw Error(y(268, Object.keys(a)));
  }
  a = cc(b);
  a = a === null ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a, b) {
  var c = X;
  if ((c & 48) !== 0)
    return a(b);
  X |= 1;
  try {
    if (a)
      return gg(99, a.bind(null, b));
  } finally {
    X = c, ig();
  }
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!rk(b))
    throw Error(y(200));
  return tk(null, a, b, true, c);
};
reactDom_production_min.render = function(a, b, c) {
  if (!rk(b))
    throw Error(y(200));
  return tk(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!rk(a))
    throw Error(y(40));
  return a._reactRootContainer ? (Xj(function() {
    tk(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[ff] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Wj;
reactDom_production_min.unstable_createPortal = function(a, b) {
  return uk(a, b, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
};
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!rk(c))
    throw Error(y(200));
  if (a == null || a._reactInternals === void 0)
    throw Error(y(38));
  return tk(a, b, c, false, d);
};
reactDom_production_min.version = "17.0.2";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var ReactDOM = reactDom.exports;
function resolveContainer(getContainer) {
  const container = typeof getContainer === "function" ? getContainer() : getContainer;
  return container || document.body;
}
function renderToContainer(getContainer, node) {
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer);
    return reactDom.exports.createPortal(node, container);
  }
  return node;
}
function useInitialized(check) {
  const initializedRef = useRef(check);
  if (check) {
    initializedRef.current = true;
  }
  return !!initializedRef.current;
}
const ShouldRender = (props) => {
  const shouldRender = useShouldRender(props.active, props.forceRender, props.destroyOnClose);
  return shouldRender ? props.children : null;
};
function useShouldRender(active, forceRender, destroyOnClose) {
  const initialized = useInitialized(active);
  if (forceRender)
    return true;
  if (active)
    return true;
  if (!initialized)
    return false;
  return !destroyOnClose;
}
const eventToPropRecord = {
  "click": "onClick"
};
function withStopPropagation(events, element) {
  const props = Object.assign({}, element.props);
  for (const key of events) {
    const prop = eventToPropRecord[key];
    props[prop] = function(e) {
      var _a, _b;
      e.stopPropagation();
      (_b = (_a = element.props)[prop]) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    };
  }
  return React$1.cloneElement(element, props);
}
const classPrefix$1g = `adm-mask`;
const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
};
const defaultProps$Z = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: "black",
  opacity: "default",
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ["click"]
};
const Mask = (p) => {
  const props = mergeProps(defaultProps$Z, p);
  const {
    locale
  } = useConfig();
  const ref = useRef(null);
  useLockScroll(ref, props.visible && props.disableBodyScroll);
  const background = useMemo(() => {
    var _a;
    const opacity2 = (_a = opacityRecord[props.opacity]) !== null && _a !== void 0 ? _a : props.opacity;
    const rgb = props.color === "white" ? "255, 255, 255" : "0, 0, 0";
    return `rgba(${rgb}, ${opacity2})`;
  }, [props.color, props.opacity]);
  const [active, setActive] = useState(props.visible);
  const unmountedRef = useUnmountedRef();
  const {
    opacity
  } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      var _a, _b;
      if (unmountedRef.current)
        return;
      setActive(props.visible);
      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });
  const shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
  const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement(animated.div, {
    className: classPrefix$1g,
    ref,
    style: Object.assign(Object.assign({
      background,
      opacity
    }, props.style), {
      display: active ? "unset" : "none"
    }),
    onClick: (e) => {
      var _a;
      if (e.target === e.currentTarget) {
        (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
      }
    }
  }, props.onMaskClick && React$1.createElement("div", {
    className: `${classPrefix$1g}-aria-button`,
    role: "button",
    "aria-label": locale.Mask.name,
    onClick: props.onMaskClick
  }), React$1.createElement("div", {
    className: `${classPrefix$1g}-content`
  }, shouldRender && props.children))));
  return renderToContainer(props.getContainer, node);
};
const classPrefix$1f = `adm-popup`;
const defaultProps$Y = {
  position: "bottom",
  visible: false,
  getContainer: () => document.body,
  mask: true,
  stopPropagation: ["click"]
};
const Popup = (p) => {
  const props = mergeProps(defaultProps$Y, p);
  const bodyCls = classNames(`${classPrefix$1f}-body`, props.bodyClassName, `${classPrefix$1f}-body-position-${props.position}`);
  const ref = useRef(null);
  const [active, setActive] = useState(props.visible);
  useLockScroll(ref, active);
  const shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
  const unmountedRef = useUnmountedRef();
  const {
    percent
  } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      var _a, _b;
      if (unmountedRef.current)
        return;
      setActive(props.visible);
      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });
  const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$1f,
    onClick: props.onClick,
    style: {
      display: active ? "unset" : "none"
    }
  }, props.mask && React$1.createElement(Mask, {
    visible: props.visible,
    onMaskClick: props.onMaskClick,
    className: props.maskClassName,
    style: props.maskStyle,
    disableBodyScroll: false,
    stopPropagation: props.stopPropagation
  }), React$1.createElement(animated.div, {
    className: bodyCls,
    style: Object.assign(Object.assign({}, props.bodyStyle), {
      transform: percent.to((v) => {
        if (props.position === "bottom") {
          return `translate(0, ${v}%)`;
        }
        if (props.position === "top") {
          return `translate(0, -${v}%)`;
        }
        if (props.position === "left") {
          return `translate(-${v}%, 0)`;
        }
        if (props.position === "right") {
          return `translate(${v}%, 0)`;
        }
        return "none";
      })
    }),
    ref
  }, shouldRender && props.children))));
  return renderToContainer(props.getContainer, node);
};
var button = "";
var dotLoading = "";
const classPrefix$1e = `adm-dot-loading`;
const colorRecord$3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
};
const defaultProps$X = {
  color: "default"
};
const DotLoading = memo((p) => {
  var _a;
  const props = mergeProps(defaultProps$X, p);
  return withNativeProps(props, React$1.createElement("div", {
    style: {
      color: (_a = colorRecord$3[props.color]) !== null && _a !== void 0 ? _a : props.color
    },
    className: classNames("adm-loading", classPrefix$1e)
  }, React$1.createElement("svg", {
    height: "1em",
    viewBox: "0 0 100 40",
    style: {
      verticalAlign: "-0.125em"
    }
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("g", {
    transform: "translate(-100.000000, -71.000000)"
  }, React$1.createElement("g", {
    transform: "translate(95.000000, 71.000000)"
  }, React$1.createElement("g", {
    transform: "translate(5.000000, 0.000000)"
  }, [0, 1, 2].map((i) => React$1.createElement("rect", {
    key: i,
    fill: "currentColor",
    x: 20 + i * 26,
    y: "16",
    width: "8",
    height: "8",
    rx: "2"
  }, React$1.createElement("animate", {
    attributeName: "y",
    from: "16",
    to: "16",
    dur: "2s",
    begin: `${i * 0.2}s`,
    repeatCount: "indefinite",
    values: "16; 6; 26; 16; 16",
    keyTimes: "0; 0.1; 0.3; 0.4; 1"
  }))))))))));
});
const classPrefix$1d = `adm-button`;
const defaultProps$W = {
  color: "default",
  fill: "solid",
  block: false,
  loading: false,
  type: "button",
  shape: "default",
  size: "middle"
};
const Button = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$W, p);
  const disabled = props.disabled || props.loading;
  const nativeButtonRef = useRef(null);
  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current;
    }
  }));
  return withNativeProps(props, React$1.createElement("button", {
    ref: nativeButtonRef,
    type: props.type,
    onClick: props.onClick,
    className: classNames(classPrefix$1d, props.color ? `${classPrefix$1d}-${props.color}` : null, {
      [`${classPrefix$1d}-block`]: props.block,
      [`${classPrefix$1d}-disabled`]: disabled,
      [`${classPrefix$1d}-fill-outline`]: props.fill === "outline",
      [`${classPrefix$1d}-fill-none`]: props.fill === "none",
      [`${classPrefix$1d}-mini`]: props.size === "mini",
      [`${classPrefix$1d}-small`]: props.size === "small",
      [`${classPrefix$1d}-large`]: props.size === "large",
      [`${classPrefix$1d}-loading`]: props.loading
    }, `${classPrefix$1d}-shape-${props.shape}`),
    disabled
  }, props.loading ? React$1.createElement("div", {
    className: `${classPrefix$1d}-loading-wrapper`
  }, React$1.createElement(DotLoading, {
    color: "currentColor"
  }), props.loadingText) : props.children));
});
var safeArea = "";
const classPrefix$1c = "adm-safe-area";
const SafeArea = (props) => {
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$1c, `${classPrefix$1c}-position-${props.position}`)
  }));
};
function renderToBody(element) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  function unmount2() {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
  ReactDOM.render(element, container);
  return unmount2;
}
function renderImperatively(element) {
  const Wrapper2 = React$1.forwardRef((_, ref) => {
    const [visible, setVisible] = useState(false);
    const closedRef = useRef(false);
    useEffect(() => {
      if (!closedRef.current) {
        setVisible(true);
      } else {
        afterClose();
      }
    }, []);
    function onClose() {
      var _a, _b;
      closedRef.current = true;
      setVisible(false);
      (_b = (_a = element.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    function afterClose() {
      var _a, _b;
      unmount2();
      (_b = (_a = element.props).afterClose) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    useImperativeHandle(ref, () => ({
      close: onClose
    }));
    return React$1.cloneElement(element, Object.assign(Object.assign({}, element.props), {
      visible,
      onClose,
      afterClose
    }));
  });
  const wrapperRef = React$1.createRef();
  const unmount2 = renderToBody(React$1.createElement(Wrapper2, {
    ref: wrapperRef
  }));
  function close() {
    var _a;
    (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.close();
  }
  return {
    close
  };
}
const classPrefix$1b = `adm-action-sheet`;
const defaultProps$V = {
  visible: false,
  actions: [],
  cancelText: "",
  closeOnAction: false,
  closeOnMaskClick: true,
  safeArea: true
};
const ActionSheet = (p) => {
  const props = mergeProps(defaultProps$V, p);
  return React$1.createElement(Popup, {
    visible: props.visible,
    onMaskClick: () => {
      var _a, _b;
      (_a = props.onMaskClick) === null || _a === void 0 ? void 0 : _a.call(props);
      if (props.closeOnMaskClick) {
        (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    },
    afterClose: props.afterClose,
    className: classNames(`${classPrefix$1b}-popup`, props.popupClassName),
    style: props.popupStyle,
    getContainer: props.getContainer
  }, withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$1b
  }, props.extra && React$1.createElement("div", {
    className: `${classPrefix$1b}-extra`
  }, props.extra), React$1.createElement("div", {
    className: `${classPrefix$1b}-button-list`
  }, props.actions.map((action, index2) => React$1.createElement("div", {
    key: action.key,
    className: `${classPrefix$1b}-button-item-wrapper`
  }, React$1.createElement(Button, {
    block: true,
    fill: "none",
    shape: "rectangular",
    disabled: action.disabled,
    onClick: () => {
      var _a, _b, _c;
      (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action);
      (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index2);
      if (props.closeOnAction) {
        (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
      }
    },
    className: classNames(`${classPrefix$1b}-button-item`, {
      [`${classPrefix$1b}-button-item-danger`]: action.danger
    })
  }, React$1.createElement("div", {
    className: `${classPrefix$1b}-button-item-name`
  }, action.text), action.description && React$1.createElement("div", {
    className: `${classPrefix$1b}-button-item-description`
  }, action.description))))), props.cancelText && React$1.createElement("div", {
    className: `${classPrefix$1b}-cancel`
  }, React$1.createElement("div", {
    className: `${classPrefix$1b}-button-item-wrapper`
  }, React$1.createElement(Button, {
    block: true,
    fill: "none",
    shape: "rectangular",
    className: `${classPrefix$1b}-button-item`,
    onClick: () => {
      var _a;
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, React$1.createElement("div", {
    className: `${classPrefix$1b}-button-item-name`
  }, props.cancelText)))), props.safeArea && React$1.createElement(SafeArea, {
    position: "bottom"
  }))));
};
function showActionSheet(props) {
  return renderImperatively(React$1.createElement(ActionSheet, Object.assign({}, props)));
}
var index$h = attachPropertiesToComponent(ActionSheet, {
  show: showActionSheet
});
var autoCenter = "";
const classPrefix$1a = "adm-auto-center";
const AutoCenter = (props) => {
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$1a
  }, React$1.createElement("div", {
    className: `${classPrefix$1a}-content`
  }, props.children)));
};
var avatar = "";
const Fallback = memo(() => React$1.createElement("svg", {
  className: "adm-avatar-fallback",
  width: "88px",
  height: "88px",
  viewBox: "0 0 88 88",
  version: "1.1"
}, React$1.createElement("title", null, "\u7F16\u7EC4 3"), React$1.createElement("defs", null, React$1.createElement("polygon", {
  id: "path-1",
  points: "0 0 88 0 88 88 0 88"
})), React$1.createElement("g", {
  id: "\u9875\u9762-1",
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, React$1.createElement("g", {
  id: "\u8BED\u96C0",
  transform: "translate(-495.000000, -71.000000)"
}, React$1.createElement("g", {
  id: "\u7F16\u7EC4-3",
  transform: "translate(495.000000, 71.000000)"
}, React$1.createElement("mask", {
  id: "mask-2",
  fill: "white"
}, React$1.createElement("use", {
  xlinkHref: "#path-1"
})), React$1.createElement("use", {
  id: "Mask",
  fill: "#EEEEEE",
  fillRule: "nonzero",
  xlinkHref: "#path-1"
}), React$1.createElement("path", {
  d: "M44.5707528,16 L43.4292117,16 L42.9575197,16.0086403 L42.9575195,16.0086403 C36.5215787,16.2615464 31.4341803,21.5678078 31.4344832,28.0273864 L31.4344832,34.7776551 L31.4495601,35.3716788 L31.4495593,35.3716628 C31.599687,38.5368723 32.9422041,41.5269327 35.2058513,43.7376716 L38.2147759,46.6775505 L38.4086219,46.8913989 C38.7747759,47.3385365 38.9750835,47.9001589 38.9750835,48.4833848 L38.9750835,48.8938006 L38.9556989,49.1897326 L38.9556989,49.1897325 C38.8577746,49.9812662 38.3754713,50.67284 37.667703,51.036605 L18.7375269,60.7440265 L18.4101421,60.9276334 L18.4101423,60.9276333 C16.9141658,61.8418636 16.0009389,63.4714674 16,65.2283758 L16,66.070809 L16.0129231,66.3948217 C16.1766149,68.4123376 17.860922,70 19.91569,70 L68.0843101,70 L68.08431,70 C70.2460467,70 71.9988087,68.243122 72,66.0751224 L72,65.2326893 C72,63.3382982 70.9446194,61.6037466 69.2624598,60.7440295 L50.3322837,51.036608 L50.3322835,51.0366079 C49.5291218,50.6249082 49.0240448,49.7962466 49.024903,48.8916436 L49.024903,48.4812278 C49.024903,47.8029608 49.3005955,47.1527756 49.7852106,46.6775603 L52.7941352,43.7376813 L52.7941354,43.7376811 C55.204308,41.3832325 56.5636029,38.151975 56.5633606,34.7776456 L56.5633606,28.0273769 L56.5633606,28.0273774 C56.5633606,21.3848531 51.1940878,16 44.5707524,16 L44.5707528,16 Z",
  id: "\u5F62\u72B6",
  fill: "#CCCCCC",
  fillRule: "nonzero",
  mask: "url(#mask-2)"
}))))));
const classPrefix$19 = "adm-avatar";
const defaultProps$U = {
  fallback: React$1.createElement(Fallback, null),
  fit: "cover"
};
const Avatar = (p) => {
  const props = mergeProps(defaultProps$U, p);
  return withNativeProps(props, React$1.createElement(Image$1, {
    className: classPrefix$19,
    src: props.src,
    fallback: props.fallback,
    placeholder: props.fallback,
    alt: props.alt,
    lazy: props.lazy,
    fit: props.fit,
    onClick: props.onClick,
    onError: props.onError
  }));
};
var badge = "";
const classPrefix$18 = `adm-badge`;
const dot = Symbol();
const Badge$1 = (props) => {
  const {
    content,
    color,
    children
  } = props;
  const isDot = content === dot;
  const badgeCls = classNames(classPrefix$18, !!children && `${classPrefix$18}-fixed`, isDot && `${classPrefix$18}-dot`, props.bordered && `${classPrefix$18}-bordered`);
  const element = content || content === 0 ? withNativeProps(props, React$1.createElement("div", {
    className: badgeCls,
    style: {
      "--color": color
    }
  }, !isDot && React$1.createElement("div", {
    className: `${classPrefix$18}-content`
  }, content))) : null;
  return children ? React$1.createElement("div", {
    className: `${classPrefix$18}-wrap`
  }, children, element) : element;
};
var Badge = attachPropertiesToComponent(Badge$1, {
  dot
});
var calendar = "";
const ArrowLeft = () => {
  return React$1.createElement("svg", {
    height: "1em",
    viewBox: "0 0 44 44"
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("g", {
    transform: "translate(-100.000000, -22.000000)"
  }, React$1.createElement("g", {
    transform: "translate(100.000000, 22.000000)"
  }, React$1.createElement("rect", {
    x: "0",
    y: "0",
    width: "44",
    height: "44"
  }), React$1.createElement("g", {
    transform: "translate(12.000000, 4.000000)",
    fill: "currentColor",
    fillRule: "nonzero"
  }, React$1.createElement("path", {
    d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
  }))))));
};
const ArrowLeftDouble = () => {
  return React$1.createElement("svg", {
    height: "1em",
    viewBox: "0 0 44 44"
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("g", {
    transform: "translate(-24.000000, -22.000000)"
  }, React$1.createElement("g", {
    transform: "translate(24.000000, 22.000000)"
  }, React$1.createElement("rect", {
    x: "0",
    y: "0",
    width: "44",
    height: "44"
  }), React$1.createElement("g", {
    transform: "translate(7.000000, 4.000000)",
    fill: "currentColor",
    fillRule: "nonzero"
  }, React$1.createElement("path", {
    d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
  }), React$1.createElement("path", {
    d: "M19.5305114,17.0699744 C19.0173831,17.5315665 18.9752295,18.3220903 19.436308,18.8357433 C19.4660129,18.8688164 19.4974585,18.9002801 19.5305113,18.9300007 L29.4833057,27.2801611 C30.1234001,27.8559077 30.1759552,28.8420707 29.6007967,29.4827774 C29.0256382,30.1235263 28.0404824,30.1761351 27.400388,29.6003885 L17.4475937,21.2502703 C17.3320874,21.1463692 17.2222026,21.036372 17.1184079,20.920748 C15.5069703,19.1256817 15.6543605,16.3628317 17.4475933,14.7497465 L27.4003877,6.39962828 C28.0404821,5.82383957 29.0256378,5.87649058 29.6007963,6.51723942 C30.1759548,7.1579461 30.1233997,8.14410915 29.4833053,8.7198557 L19.5305114,17.0699744 Z"
  }))))));
};
var isoWeek$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    var e = "day";
    return function(t, i, s) {
      var a = function(t2) {
        return t2.add(4 - t2.isoWeekday(), e);
      }, d = i.prototype;
      d.isoWeekYear = function() {
        return a(this).year();
      }, d.isoWeek = function(t2) {
        if (!this.$utils().u(t2))
          return this.add(7 * (t2 - this.isoWeek()), e);
        var i2, d2, n2, o, r2 = a(this), u = (i2 = this.isoWeekYear(), d2 = this.$u, n2 = (d2 ? s.utc : s)().year(i2).startOf("year"), o = 4 - n2.isoWeekday(), n2.isoWeekday() > 4 && (o += 7), n2.add(o, e));
        return r2.diff(u, "week") + 1;
      }, d.isoWeekday = function(e2) {
        return this.$utils().u(e2) ? this.day() || 7 : this.day(this.day() % 7 ? e2 : e2 - 7);
      };
      var n = d.startOf;
      d.startOf = function(e2, t2) {
        var i2 = this.$utils(), s2 = !!i2.u(t2) || t2;
        return i2.p(e2) === "isoweek" ? s2 ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : n.bind(this)(e2, t2);
      };
    };
  });
})(isoWeek$1);
var isoWeek = isoWeek$1.exports;
function usePropsValue(options) {
  const {
    value,
    defaultValue,
    onChange
  } = options;
  const update = useUpdate();
  const stateRef = useRef(value !== void 0 ? value : defaultValue);
  if (value !== void 0) {
    stateRef.current = value;
  }
  const setState = useMemoizedFn((v) => {
    const nextValue = typeof v === "function" ? v(stateRef.current) : v;
    if (value === void 0) {
      stateRef.current = nextValue;
      update();
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
  });
  return [stateRef.current, setState];
}
function convertValueToRange(selectionMode, value) {
  if (selectionMode === void 0) {
    return null;
  }
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value, value];
}
dayjs.extend(isoWeek);
const classPrefix$17 = "adm-calendar";
const defaultProps$T = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: true
};
const Calendar = forwardRef((p, ref) => {
  const today = dayjs();
  const props = mergeProps(defaultProps$T, p);
  const {
    locale
  } = useConfig();
  const markItems = [...locale.Calendar.markItems];
  if (props.weekStartsOn === "Sunday") {
    const item = markItems.pop();
    if (item)
      markItems.unshift(item);
  }
  const [dateRange, setDateRange] = usePropsValue({
    value: props.value === void 0 ? void 0 : convertValueToRange(props.selectionMode, props.value),
    defaultValue: convertValueToRange(props.selectionMode, props.defaultValue),
    onChange: (v) => {
      var _a, _b;
      if (props.selectionMode === "single") {
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v ? v[0] : null);
      } else if (props.selectionMode === "range") {
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, v);
      }
    }
  });
  const [intermediate, setIntermediate] = useState(false);
  const [current, setCurrent] = useState(() => dayjs(dateRange ? dateRange[0] : today).date(1));
  useUpdateEffect(() => {
    var _a;
    (_a = props.onPageChange) === null || _a === void 0 ? void 0 : _a.call(props, current.year(), current.month() + 1);
  }, [current]);
  useImperativeHandle(ref, () => ({
    jumpTo: (pageOrPageGenerator) => {
      let page;
      if (typeof pageOrPageGenerator === "function") {
        page = pageOrPageGenerator({
          year: current.year(),
          month: current.month() + 1
        });
      } else {
        page = pageOrPageGenerator;
      }
      setCurrent(dayjs().year(page.year).month(page.month - 1).date(1));
    },
    jumpToToday: () => {
      setCurrent(dayjs().date(1));
    }
  }));
  const header = React$1.createElement("div", {
    className: `${classPrefix$17}-header`
  }, React$1.createElement("a", {
    className: `${classPrefix$17}-arrow-button`,
    onClick: () => {
      setCurrent(current.subtract(1, "year"));
    }
  }, React$1.createElement(ArrowLeftDouble, null)), React$1.createElement("a", {
    className: `${classPrefix$17}-arrow-button`,
    onClick: () => {
      setCurrent(current.subtract(1, "month"));
    }
  }, React$1.createElement(ArrowLeft, null)), React$1.createElement("div", {
    className: `${classPrefix$17}-title`
  }, locale.Calendar.renderYearAndMonth(current.year(), current.month() + 1)), React$1.createElement("a", {
    className: `${classPrefix$17}-arrow-button ${classPrefix$17}-arrow-button-right`,
    onClick: () => {
      setCurrent(current.add(1, "month"));
    }
  }, React$1.createElement(ArrowLeft, null)), React$1.createElement("a", {
    className: `${classPrefix$17}-arrow-button ${classPrefix$17}-arrow-button-right`,
    onClick: () => {
      setCurrent(current.add(1, "year"));
    }
  }, React$1.createElement(ArrowLeftDouble, null)));
  function renderCells() {
    var _a;
    const cells = [];
    let iterator = current.subtract(current.isoWeekday(), "day");
    if (props.weekStartsOn === "Monday") {
      iterator = iterator.add(1, "day");
    }
    while (cells.length < 6 * 7) {
      const d = iterator;
      let isSelect = false;
      let isBegin = false;
      let isEnd = false;
      if (dateRange) {
        const [begin, end] = dateRange;
        isBegin = d.isSame(begin, "day");
        isEnd = d.isSame(end, "day");
        isSelect = isBegin || isEnd || d.isAfter(begin, "day") && d.isBefore(end, "day");
      }
      const inThisMonth = d.month() === current.month();
      cells.push(React$1.createElement("div", {
        key: d.valueOf(),
        className: classNames(`${classPrefix$17}-cell`, inThisMonth ? `${classPrefix$17}-cell-in` : `${classPrefix$17}-cell-out`, inThisMonth && {
          [`${classPrefix$17}-cell-today`]: d.isSame(today, "day"),
          [`${classPrefix$17}-cell-selected`]: isSelect,
          [`${classPrefix$17}-cell-selected-begin`]: isBegin,
          [`${classPrefix$17}-cell-selected-end`]: isEnd
        }),
        onClick: () => {
          if (!props.selectionMode)
            return;
          const date = d.toDate();
          if (!inThisMonth) {
            setCurrent(d.clone().date(1));
          }
          function shouldClear() {
            if (!props.allowClear)
              return false;
            if (!dateRange)
              return false;
            const [begin, end] = dateRange;
            return d.isSame(begin, "date") && d.isSame(end, "day");
          }
          if (props.selectionMode === "single") {
            if (props.allowClear && shouldClear()) {
              setDateRange(null);
              return;
            }
            setDateRange([date, date]);
          } else if (props.selectionMode === "range") {
            if (!dateRange) {
              setDateRange([date, date]);
              setIntermediate(true);
              return;
            }
            if (shouldClear()) {
              setDateRange(null);
              setIntermediate(false);
              return;
            }
            if (intermediate) {
              const another = dateRange[0];
              setDateRange(another > date ? [date, another] : [another, date]);
              setIntermediate(false);
            } else {
              setDateRange([date, date]);
              setIntermediate(true);
            }
          }
        }
      }, React$1.createElement("div", {
        className: `${classPrefix$17}-cell-top`
      }, d.date()), React$1.createElement("div", {
        className: `${classPrefix$17}-cell-bottom`
      }, (_a = props.renderLabel) === null || _a === void 0 ? void 0 : _a.call(props, d.toDate()))));
      iterator = iterator.add(1, "day");
    }
    return cells;
  }
  const body = React$1.createElement("div", {
    className: `${classPrefix$17}-cells`
  }, renderCells());
  const mark = React$1.createElement("div", {
    className: `${classPrefix$17}-mark`
  }, markItems.map((item) => React$1.createElement("div", {
    key: item,
    className: `${classPrefix$17}-mark-cell`
  }, item)));
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$17
  }, header, mark, body));
});
var capsuleTabs = "";
function useResizeEffect(effect, targetRef) {
  const fn = useMemoizedFn(effect);
  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current;
    if (!target)
      return;
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        fn(target);
      });
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
}
function useMutationEffect(effect, targetRef, options) {
  const fn = useMemoizedFn(effect);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      fn();
    });
    if (!targetRef.current)
      return;
    observer.observe(targetRef.current, options);
    return () => {
      observer.disconnect();
    };
  }, [targetRef]);
}
function bound(position, min, max) {
  let ret = position;
  if (min !== void 0) {
    ret = Math.max(position, min);
  }
  if (max !== void 0) {
    ret = Math.min(ret, max);
  }
  return ret;
}
const useIsomorphicUpdateLayoutEffect = createUpdateEffect(useIsomorphicLayoutEffect);
const useTabListScroll = (targetRef, activeIndex) => {
  const [{
    scrollLeft
  }, api] = useSpring(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  function animate(immediate = false) {
    const container = targetRef.current;
    if (!container)
      return;
    if (activeIndex === void 0)
      return;
    const activeTabWrapper = container.children.item(activeIndex);
    const activeTab = activeTabWrapper.children.item(0);
    const activeTabLeft = activeTab.offsetLeft;
    const activeTabWidth = activeTab.offsetWidth;
    const containerWidth = container.offsetWidth;
    const containerScrollWidth = container.scrollWidth;
    const containerScrollLeft = container.scrollLeft;
    const maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0)
      return;
    const nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    api.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate
    });
  }
  useIsomorphicLayoutEffect(() => {
    animate(true);
  }, []);
  useIsomorphicUpdateLayoutEffect(() => {
    animate();
  }, [activeIndex]);
  useMutationEffect(() => {
    animate(true);
  }, targetRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  return {
    scrollLeft,
    animate
  };
};
var scrollMask = "";
const classPrefix$16 = `adm-scroll-mask`;
const ScrollMask = (props) => {
  const maskRef = useRef(null);
  const [{
    leftMaskOpacity,
    rightMaskOpacity
  }, api] = useSpring(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: true
    }
  }));
  const {
    run: updateMask
  } = useThrottleFn((immediate = false) => {
    const mask2 = maskRef.current;
    if (!mask2)
      return;
    const scrollEl = props.scrollTrackRef.current;
    if (!scrollEl)
      return;
    const scrollLeft = scrollEl.scrollLeft;
    const showLeftMask = scrollLeft > 0;
    const showRightMask = scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth;
    api.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  });
  useEffect(() => {
    updateMask(true);
  }, []);
  useEffect(() => {
    const scrollEl = props.scrollTrackRef.current;
    if (!scrollEl)
      return;
    scrollEl.addEventListener("scroll", updateMask);
    return () => scrollEl.removeEventListener("scroll", updateMask);
  }, []);
  return React$1.createElement(React$1.Fragment, null, React$1.createElement(animated.div, {
    ref: maskRef,
    className: classNames(classPrefix$16, `${classPrefix$16}-left`),
    style: {
      opacity: leftMaskOpacity
    }
  }), React$1.createElement(animated.div, {
    className: classNames(classPrefix$16, `${classPrefix$16}-right`),
    style: {
      opacity: rightMaskOpacity
    }
  }));
};
function traverseReactNode(children, fn) {
  let i = 0;
  function handle(target) {
    React$1.Children.forEach(target, (child) => {
      if (!isFragment(child)) {
        fn(child, i);
        i += 1;
      } else {
        handle(child.props.children);
      }
    });
  }
  handle(children);
}
const classPrefix$15 = `adm-capsule-tabs`;
const CapsuleTab = () => {
  return null;
};
const CapsuleTabs = (props) => {
  var _a;
  const tabListContainerRef = useRef(null);
  const rootRef = useRef(null);
  const keyToIndexRecord = {};
  let firstActiveKey = null;
  const panes = [];
  traverseReactNode(props.children, (child, index2) => {
    if (!React$1.isValidElement(child))
      return;
    const key = child.key;
    if (typeof key !== "string")
      return;
    if (index2 === 0) {
      firstActiveKey = key;
    }
    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: (v) => {
      var _a2;
      if (v === null)
        return;
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
    }
  });
  const {
    scrollLeft,
    animate
  } = useTabListScroll(tabListContainerRef, keyToIndexRecord[activeKey]);
  useResizeEffect(() => {
    animate(true);
  }, rootRef);
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$15,
    ref: rootRef
  }, React$1.createElement("div", {
    className: `${classPrefix$15}-header`
  }, React$1.createElement(ScrollMask, {
    scrollTrackRef: tabListContainerRef
  }), React$1.createElement(animated.div, {
    className: `${classPrefix$15}-tab-list`,
    ref: tabListContainerRef,
    scrollLeft
  }, panes.map((pane) => withNativeProps(pane.props, React$1.createElement("div", {
    key: pane.key,
    className: `${classPrefix$15}-tab-wrapper`
  }, React$1.createElement("div", {
    onClick: () => {
      const {
        key
      } = pane;
      if (pane.props.disabled)
        return;
      if (key === void 0 || key === null) {
        return;
      }
      setActiveKey(key.toString());
    },
    className: classNames(`${classPrefix$15}-tab`, {
      [`${classPrefix$15}-tab-active`]: pane.key === activeKey,
      [`${classPrefix$15}-tab-disabled`]: pane.props.disabled
    })
  }, pane.props.title)))))), panes.map((pane) => {
    if (pane.props.children === void 0) {
      return null;
    }
    const active = pane.key === activeKey;
    return React$1.createElement(ShouldRender, {
      key: pane.key,
      active,
      forceRender: pane.props.forceRender,
      destroyOnClose: pane.props.destroyOnClose
    }, React$1.createElement("div", {
      className: `${classPrefix$15}-content`,
      style: {
        display: active ? "block" : "none"
      }
    }, pane.props.children));
  })));
};
var index$g = attachPropertiesToComponent(CapsuleTabs, {
  Tab: CapsuleTab
});
var card = "";
const classPrefix$14 = `adm-card`;
const Card = (props) => {
  const renderHeader = () => {
    if (!(props.title || props.extra)) {
      return null;
    }
    return React$1.createElement("div", {
      className: classNames(`${classPrefix$14}-header`, props.headerClassName),
      style: props.headerStyle,
      onClick: props.onHeaderClick
    }, React$1.createElement("div", {
      className: `${classPrefix$14}-header-title`
    }, props.title), props.extra);
  };
  const renderBody = () => {
    if (!props.children) {
      return null;
    }
    return React$1.createElement("div", {
      className: classNames(`${classPrefix$14}-body`, props.bodyClassName),
      style: props.bodyStyle,
      onClick: props.onBodyClick
    }, props.children);
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$14,
    onClick: props.onClick
  }, renderHeader(), renderBody()));
};
var picker = "";
function rubberband(distance, dimension, constant2) {
  return distance * dimension * constant2 / (dimension + constant2 * distance);
}
function rubberbandIfOutOfBounds(position, min, max, dimension, constant2 = 0.15) {
  if (constant2 === 0)
    return bound(position, min, max);
  if (position < min)
    return -rubberband(min - position, dimension, constant2) + min;
  if (position > max)
    return +rubberband(position - max, dimension, constant2) + max;
  return position;
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var _setCacheAdd = setCacheAdd$1;
function setCacheHas$1(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$1;
var MapCache$1 = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
function SetCache$1(values) {
  var index2 = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache$1();
  while (++index2 < length) {
    this.add(values[index2]);
  }
}
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;
var _SetCache = SetCache$1;
function arraySome$1(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (predicate(array[index2], index2, array)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome$1;
function cacheHas$1(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas$1;
var SetCache = _SetCache, arraySome = _arraySome, cacheHas = _cacheHas;
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index2 < arrLength) {
    var arrValue = array[index2], othValue = other[index2];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result2 = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result2 = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result2 = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result2;
}
var _equalArrays = equalArrays$2;
function mapToArray$1(map) {
  var index2 = -1, result2 = Array(map.size);
  map.forEach(function(value, key) {
    result2[++index2] = [key, value];
  });
  return result2;
}
var _mapToArray = mapToArray$1;
function setToArray$1(set) {
  var index2 = -1, result2 = Array(set.size);
  set.forEach(function(value) {
    result2[++index2] = value;
  });
  return result2;
}
var _setToArray = setToArray$1;
var Symbol$1 = _Symbol, Uint8Array = _Uint8Array, eq = eq_1, equalArrays$1 = _equalArrays, mapToArray = _mapToArray, setToArray = _setToArray;
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag$1(object, other, tag2, bitmask, customizer, equalFunc, stack) {
  switch (tag2) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack.set(object, other);
      var result2 = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result2;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag$1;
var getAllKeys = _getAllKeys;
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index2 = objLength;
  while (index2--) {
    var key = objProps[index2];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result2 = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index2 < objLength) {
    key = objProps[index2];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result2 = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result2 && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result2 = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result2;
}
var _equalObjects = equalObjects$1;
var Stack = _Stack, equalArrays = _equalArrays, equalByTag = _equalByTag, equalObjects = _equalObjects, getTag = _getTag, isArray = isArray_1, isBuffer = isBuffer$4.exports, isTypedArray = isTypedArray_1;
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep$1;
var baseIsEqualDeep = _baseIsEqualDeep, isObjectLike = isObjectLike_1;
function baseIsEqual$1(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$1, stack);
}
var _baseIsEqual = baseIsEqual$1;
var baseIsEqual = _baseIsEqual;
function isEqual(value, other) {
  return baseIsEqual(value, other);
}
var isEqual_1 = isEqual;
function measureCSSLength(raw) {
  if (raw === null || raw === void 0) {
    return 0;
  }
  const withUnit = raw.trim();
  if (withUnit.endsWith("px")) {
    return parseFloat(withUnit);
  } else if (withUnit.endsWith("rem")) {
    return parseFloat(withUnit) * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  } else if (withUnit.endsWith("vw")) {
    return parseFloat(withUnit) * window.innerWidth / 100;
  } else {
    return 0;
  }
}
const classPrefix$13 = `adm-picker-view`;
const Wheel = memo((props) => {
  const {
    value,
    column,
    renderLabel
  } = props;
  function onSelect(val) {
    props.onSelect(val, props.index);
  }
  const [{
    y: y2
  }, api] = useSpring(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  }));
  const draggingRef = useRef(false);
  const rootRef = useRef(null);
  const itemHeight = useRef(34);
  useIsomorphicLayoutEffect(() => {
    const root2 = rootRef.current;
    if (!root2)
      return;
    itemHeight.current = measureCSSLength(window.getComputedStyle(root2).getPropertyValue("--item-height"));
  });
  useIsomorphicLayoutEffect(() => {
    if (draggingRef.current)
      return;
    if (!value)
      return;
    const targetIndex = column.findIndex((item) => item.value === value);
    if (targetIndex < 0)
      return;
    const finalPosition = targetIndex * -itemHeight.current;
    api.start({
      y: finalPosition,
      immediate: y2.goal !== finalPosition
    });
  }, [value, column]);
  useIsomorphicLayoutEffect(() => {
    if (column.length === 0) {
      if (value !== null) {
        onSelect(null);
      }
    } else {
      if (!column.some((item) => item.value === value)) {
        const firstItem = column[0];
        onSelect(firstItem.value);
      }
    }
  }, [column, value]);
  function scrollSelect(index2) {
    const finalPosition = index2 * -itemHeight.current;
    api.start({
      y: finalPosition
    });
    const item = column[index2];
    if (!item)
      return;
    onSelect(item.value);
  }
  const handleDrag = (state) => {
    draggingRef.current = true;
    const min = -((column.length - 1) * itemHeight.current);
    const max = 0;
    if (state.last) {
      draggingRef.current = false;
      const position = state.offset[1] + state.velocity[1] * state.direction[1] * 50;
      const targetIndex = min < max ? -Math.round(bound(position, min, max) / itemHeight.current) : 0;
      scrollSelect(targetIndex);
    } else {
      const position = state.offset[1];
      api.start({
        y: rubberbandIfOutOfBounds(position, min, max, itemHeight.current * 50, 0.2)
      });
    }
  };
  useDrag((state) => {
    state.event.stopPropagation();
    handleDrag(state);
  }, {
    axis: "y",
    from: () => [0, y2.get()],
    filterTaps: true,
    pointer: {
      touch: true
    },
    target: rootRef
  });
  useWheel((state) => {
    state.event.stopPropagation();
    handleDrag(state);
  }, {
    axis: "y",
    from: () => [0, y2.get()],
    preventDefault: true,
    target: props.mouseWheel ? rootRef : void 0,
    eventOptions: supportsPassive ? {
      passive: false
    } : false
  });
  let selectedIndex = null;
  function renderAccessible() {
    if (selectedIndex === null) {
      return null;
    }
    const current = column[selectedIndex];
    const previousIndex = selectedIndex - 1;
    const nextIndex = selectedIndex + 1;
    const previous = column[previousIndex];
    const next = column[nextIndex];
    return React$1.createElement("div", {
      className: "adm-picker-view-column-accessible"
    }, React$1.createElement("div", {
      className: "adm-picker-view-column-accessible-current",
      role: "button",
      "aria-label": current ? `\u5F53\u524D\u9009\u62E9\u7684\u662F\uFF1A${current.label}` : "\u5F53\u524D\u672A\u9009\u62E9"
    }, "-"), React$1.createElement("div", null, previous && React$1.createElement("div", {
      className: "adm-picker-view-column-accessible-button",
      onClick: () => {
        scrollSelect(previousIndex);
      },
      role: "button",
      "aria-label": `\u9009\u62E9\u4E0A\u4E00\u9879\uFF1A${previous.label}`
    }, "-")), React$1.createElement("div", null, next && React$1.createElement("div", {
      className: "adm-picker-view-column-accessible-button",
      onClick: () => {
        scrollSelect(nextIndex);
      },
      role: "button",
      "aria-label": `\u9009\u62E9\u4E0B\u4E00\u9879\uFF1A${next.label}`
    }, "-")));
  }
  return React$1.createElement("div", {
    ref: rootRef,
    className: `${classPrefix$13}-column`
  }, React$1.createElement(animated.div, {
    style: {
      translateY: y2
    },
    className: `${classPrefix$13}-column-wheel`,
    "aria-hidden": true
  }, column.map((item, index2) => {
    var _a;
    const selected = props.value === item.value;
    if (selected)
      selectedIndex = index2;
    function handleClick() {
      draggingRef.current = false;
      scrollSelect(index2);
    }
    return React$1.createElement("div", {
      key: (_a = item.key) !== null && _a !== void 0 ? _a : item.value,
      "data-selected": item.value === value,
      className: `${classPrefix$13}-column-item`,
      onClick: handleClick,
      "aria-hidden": !selected,
      "aria-label": selected ? "active" : ""
    }, React$1.createElement("div", {
      className: `${classPrefix$13}-column-item-label`
    }, renderLabel(item)));
  })), renderAccessible());
}, (prev, next) => {
  if (prev.index !== next.index)
    return false;
  if (prev.value !== next.value)
    return false;
  if (prev.onSelect !== next.onSelect)
    return false;
  if (!isEqual_1(prev.column, next.column)) {
    return false;
  }
  return true;
});
Wheel.displayName = "Wheel";
function withCache(generate) {
  let cache = null;
  return () => {
    if (cache === null) {
      cache = generate();
    }
    return cache;
  };
}
function generateColumnsExtend(rawColumns, val) {
  const columns = withCache(() => {
    const c = typeof rawColumns === "function" ? rawColumns(val) : rawColumns;
    return c.map((column) => column.map((item) => typeof item === "string" ? {
      label: item,
      value: item
    } : item));
  });
  const items = withCache(() => {
    return val.map((v, index2) => {
      var _a;
      const column = columns()[index2];
      if (!column)
        return null;
      return (_a = column.find((item) => item.value === v)) !== null && _a !== void 0 ? _a : null;
    });
  });
  const extend = {
    get columns() {
      return columns();
    },
    get items() {
      return items();
    }
  };
  return extend;
}
function useColumnsExtend(rawColumns, value) {
  return useMemo(() => generateColumnsExtend(rawColumns, value), [rawColumns, value]);
}
const defaultRenderLabel$3 = (item) => item.label;
const classPrefix$12 = `adm-picker-view`;
const defaultProps$S = {
  defaultValue: [],
  renderLabel: defaultRenderLabel$3,
  mouseWheel: false
};
const PickerView = memo((p) => {
  const props = mergeProps(defaultProps$S, p);
  const [innerValue, setInnerValue] = useState(props.value === void 0 ? props.defaultValue : props.value);
  useEffect(() => {
    if (props.value === void 0)
      return;
    if (props.value === innerValue)
      return;
    setInnerValue(props.value);
  }, [props.value]);
  useEffect(() => {
    if (props.value === innerValue)
      return;
    const timeout = window.setTimeout(() => {
      if (props.value !== void 0 && props.value !== innerValue) {
        setInnerValue(props.value);
      }
    }, 1e3);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [props.value, innerValue]);
  const extend = useColumnsExtend(props.columns, innerValue);
  const columns = extend.columns;
  useDebounceEffect(() => {
    var _a;
    if (props.value === innerValue)
      return;
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, innerValue, extend);
  }, [innerValue], {
    wait: 0,
    leading: false,
    trailing: true
  });
  const handleSelect = useCallback((val, index2) => {
    setInnerValue((prev) => {
      const next = [...prev];
      next[index2] = val;
      return next;
    });
  }, []);
  return withNativeProps(props, React$1.createElement("div", {
    className: `${classPrefix$12}`
  }, columns.map((column, index2) => React$1.createElement(Wheel, {
    key: index2,
    index: index2,
    column,
    value: innerValue[index2],
    onSelect: handleSelect,
    renderLabel: props.renderLabel,
    mouseWheel: props.mouseWheel
  })), React$1.createElement("div", {
    className: `${classPrefix$12}-mask`
  }, React$1.createElement("div", {
    className: `${classPrefix$12}-mask-top`
  }), React$1.createElement("div", {
    className: `${classPrefix$12}-mask-middle`
  }), React$1.createElement("div", {
    className: `${classPrefix$12}-mask-bottom`
  }))));
});
PickerView.displayName = "PickerView";
var pickerView = "";
const classPrefix$11 = `adm-picker`;
const defaultProps$R = {
  defaultValue: [],
  closeOnMaskClick: true,
  renderLabel: defaultRenderLabel$3
};
const Picker$1 = memo((p) => {
  var _a;
  const {
    locale
  } = useConfig();
  const props = mergeProps(defaultProps$R, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel
  }, p);
  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: (val) => {
      var _a2;
      const extend2 = generateColumnsExtend(props.columns, val);
      (_a2 = props.onConfirm) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, extend2);
    }
  }));
  const extend = useColumnsExtend(props.columns, value);
  const [innerValue, setInnerValue] = useState(value);
  useEffect(() => {
    if (innerValue !== value) {
      setInnerValue(value);
    }
  }, [props.visible]);
  useEffect(() => {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [value]);
  const onChange = useMemoizedFn((val, ext) => {
    var _a2;
    setInnerValue(val);
    if (props.visible) {
      (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, ext);
    }
  });
  const pickerElement = withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$11
  }, React$1.createElement("div", {
    className: `${classPrefix$11}-header`
  }, React$1.createElement("a", {
    className: `${classPrefix$11}-header-button`,
    onClick: () => {
      var _a2, _b;
      (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    }
  }, props.cancelText), React$1.createElement("div", {
    className: `${classPrefix$11}-header-title`
  }, props.title), React$1.createElement("a", {
    className: `${classPrefix$11}-header-button`,
    onClick: () => {
      var _a2;
      setValue(innerValue);
      (_a2 = props.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(props);
    }
  }, props.confirmText)), React$1.createElement("div", {
    className: `${classPrefix$11}-body`
  }, React$1.createElement(PickerView, {
    columns: props.columns,
    renderLabel: props.renderLabel,
    value: innerValue,
    mouseWheel: props.mouseWheel,
    onChange
  }))));
  const popupElement = React$1.createElement(Popup, {
    className: `${classPrefix$11}-popup`,
    visible: props.visible,
    position: "bottom",
    onMaskClick: () => {
      var _a2, _b;
      if (!props.closeOnMaskClick)
        return;
      (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    },
    getContainer: props.getContainer,
    destroyOnClose: true,
    afterShow: props.afterShow,
    afterClose: props.afterClose,
    onClick: props.onClick,
    forceRender: true,
    stopPropagation: props.stopPropagation
  }, pickerElement, React$1.createElement(SafeArea, {
    position: "bottom"
  }));
  return React$1.createElement(React$1.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, extend.items));
});
Picker$1.displayName = "Picker";
function prompt$3(props) {
  return new Promise((resolve) => {
    const Wrapper2 = () => {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setVisible(true);
      }, []);
      return React$1.createElement(Picker$1, Object.assign({}, props, {
        visible,
        onConfirm: (val, extend) => {
          var _a;
          (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
          resolve(val);
        },
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          setVisible(false);
          resolve(null);
        },
        afterClose: () => {
          var _a;
          (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
          unmount2();
        }
      }));
    };
    const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
  });
}
var Picker = attachPropertiesToComponent(Picker$1, {
  prompt: prompt$3
});
function useCascadePickerOptions(options) {
  return useMemo(() => {
    let depth = 1;
    const subOptionsRecord = {};
    function traverse(option, currentDepth) {
      if (!option.children) {
        return;
      }
      subOptionsRecord[option.value] = option.children;
      const nextDepth = currentDepth + 1;
      if (nextDepth > depth) {
        depth = nextDepth;
      }
      option.children.forEach((option2) => {
        traverse(option2, nextDepth);
      });
    }
    options.forEach((option) => {
      traverse(option, 1);
    });
    return {
      depth,
      subOptionsRecord
    };
  }, [options]);
}
function generateCascadePickerColumns(value, options, depth, subOptionsRecord) {
  const columns = [];
  columns.push(options.map((option) => ({
    label: option.label,
    value: option.value
  })));
  for (let i = 0; i < depth - 1; i++) {
    const x = value[i];
    const subOptions = subOptionsRecord[x];
    if (!subOptions) {
      columns.push([]);
    } else {
      columns.push(subOptions.map((option) => ({
        label: option.label,
        value: option.value
      })));
    }
  }
  return columns;
}
const CascadePicker = (props) => {
  const {
    options
  } = props, pickerProps = __rest(props, ["options"]);
  const {
    depth,
    subOptionsRecord
  } = useCascadePickerOptions(options);
  return React$1.createElement(Picker, Object.assign({}, pickerProps, {
    columns: (selected) => generateCascadePickerColumns(selected, options, depth, subOptionsRecord)
  }));
};
function prompt$2(props) {
  return new Promise((resolve) => {
    const Wrapper2 = () => {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setVisible(true);
      }, []);
      return React$1.createElement(CascadePicker, Object.assign({}, props, {
        visible,
        onConfirm: (val, extend) => {
          var _a;
          (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
          resolve(val);
        },
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          setVisible(false);
          resolve(null);
        },
        afterClose: () => {
          var _a;
          (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
          unmount2();
        }
      }));
    };
    const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
  });
}
var index$f = attachPropertiesToComponent(CascadePicker, {
  prompt: prompt$2
});
const CascadePickerView = (props) => {
  const {
    options
  } = props, pickerProps = __rest(props, ["options"]);
  const {
    depth,
    subOptionsRecord
  } = useCascadePickerOptions(options);
  return React$1.createElement(PickerView, Object.assign({}, pickerProps, {
    columns: (selected) => generateCascadePickerColumns(selected, options, depth, subOptionsRecord)
  }));
};
var cascaderView = "";
var tabs = "";
const classPrefix$10 = `adm-tabs`;
const Tab = () => {
  return null;
};
const defaultProps$Q = {
  activeLineMode: "auto",
  stretch: true
};
const Tabs$1 = (p) => {
  var _a;
  const props = mergeProps(defaultProps$Q, p);
  const tabListContainerRef = useRef(null);
  const activeLineRef = useRef(null);
  const keyToIndexRecord = {};
  let firstActiveKey = null;
  const panes = [];
  traverseReactNode(props.children, (child, index2) => {
    if (!React$1.isValidElement(child))
      return;
    const key = child.key;
    if (typeof key !== "string")
      return;
    if (index2 === 0) {
      firstActiveKey = key;
    }
    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: (v) => {
      var _a2;
      if (v === null)
        return;
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
    }
  });
  const [{
    x,
    width
  }, api] = useSpring(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  const [{
    scrollLeft
  }, scrollApi] = useSpring(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  const [{
    leftMaskOpacity,
    rightMaskOpacity
  }, maskApi] = useSpring(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: true
    }
  }));
  function animate(immediate = false) {
    const container = tabListContainerRef.current;
    if (!container)
      return;
    const activeIndex = keyToIndexRecord[activeKey];
    if (activeIndex === void 0) {
      api.start({
        x: 0,
        width: 0,
        immediate: true
      });
      return;
    }
    const activeLine = activeLineRef.current;
    if (!activeLine)
      return;
    const activeTabWrapper = container.children.item(activeIndex + 1);
    const activeTab = activeTabWrapper.children.item(0);
    const activeTabLeft = activeTab.offsetLeft;
    const activeTabWidth = activeTab.offsetWidth;
    const activeTabWrapperLeft = activeTabWrapper.offsetLeft;
    const activeTabWrapperWidth = activeTabWrapper.offsetWidth;
    const containerWidth = container.offsetWidth;
    const containerScrollWidth = container.scrollWidth;
    const containerScrollLeft = container.scrollLeft;
    const activeLineWidth = activeLine.offsetWidth;
    let x2 = 0;
    let width2 = 0;
    if (props.activeLineMode === "auto") {
      x2 = activeTabLeft;
      width2 = activeTabWidth;
    } else if (props.activeLineMode === "full") {
      x2 = activeTabWrapperLeft;
      width2 = activeTabWrapperWidth;
    } else {
      x2 = activeTabLeft + (activeTabWidth - activeLineWidth) / 2;
    }
    api.start({
      x: x2,
      width: width2,
      immediate
    });
    const maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0)
      return;
    const nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate
    });
  }
  useIsomorphicLayoutEffect(() => {
    animate(!x.isAnimating);
  }, []);
  useIsomorphicUpdateLayoutEffect(() => {
    animate();
  }, [activeKey]);
  useResizeEffect(() => {
    animate(!x.isAnimating);
  }, tabListContainerRef);
  useMutationEffect(() => {
    animate(!x.isAnimating);
  }, tabListContainerRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  const {
    run: updateMask
  } = useThrottleFn((immediate = false) => {
    const container = tabListContainerRef.current;
    if (!container)
      return;
    const scrollLeft2 = container.scrollLeft;
    const showLeftMask = scrollLeft2 > 0;
    const showRightMask = scrollLeft2 + container.offsetWidth < container.scrollWidth;
    maskApi.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  });
  useIsomorphicLayoutEffect(() => {
    updateMask(true);
  }, []);
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$10
  }, React$1.createElement("div", {
    className: `${classPrefix$10}-header`
  }, React$1.createElement(animated.div, {
    className: classNames(`${classPrefix$10}-header-mask`, `${classPrefix$10}-header-mask-left`),
    style: {
      opacity: leftMaskOpacity
    }
  }), React$1.createElement(animated.div, {
    className: classNames(`${classPrefix$10}-header-mask`, `${classPrefix$10}-header-mask-right`),
    style: {
      opacity: rightMaskOpacity
    }
  }), React$1.createElement(animated.div, {
    className: `${classPrefix$10}-tab-list`,
    ref: tabListContainerRef,
    scrollLeft,
    onScroll: updateMask
  }, React$1.createElement(animated.div, {
    ref: activeLineRef,
    className: `${classPrefix$10}-tab-line`,
    style: {
      width: props.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : width,
      x
    }
  }), panes.map((pane) => withNativeProps(pane.props, React$1.createElement("div", {
    key: pane.key,
    className: classNames(`${classPrefix$10}-tab-wrapper`, {
      [`${classPrefix$10}-tab-wrapper-stretch`]: props.stretch
    })
  }, React$1.createElement("div", {
    onClick: () => {
      const {
        key
      } = pane;
      if (pane.props.disabled)
        return;
      if (key === void 0 || key === null) {
        return;
      }
      setActiveKey(key.toString());
    },
    className: classNames(`${classPrefix$10}-tab`, {
      [`${classPrefix$10}-tab-active`]: pane.key === activeKey,
      [`${classPrefix$10}-tab-disabled`]: pane.props.disabled
    })
  }, pane.props.title)))))), panes.map((pane) => {
    if (pane.props.children === void 0) {
      return null;
    }
    const active = pane.key === activeKey;
    return React$1.createElement(ShouldRender, {
      key: pane.key,
      active,
      forceRender: pane.props.forceRender,
      destroyOnClose: pane.props.destroyOnClose
    }, React$1.createElement("div", {
      className: `${classPrefix$10}-content`,
      style: {
        display: active ? "block" : "none"
      }
    }, pane.props.children));
  })));
};
var Tabs = attachPropertiesToComponent(Tabs$1, {
  Tab
});
var checkList = "";
var list = "";
const classPrefix$$ = `adm-list`;
const defaultProps$P = {
  mode: "default"
};
const List$1 = (p) => {
  const props = mergeProps(defaultProps$P, p);
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$$, `${classPrefix$$}-${props.mode}`)
  }, props.header && React$1.createElement("div", {
    className: `${classPrefix$$}-header`
  }, props.header), React$1.createElement("div", {
    className: `${classPrefix$$}-body`
  }, React$1.createElement("div", {
    className: `${classPrefix$$}-body-inner`
  }, props.children))));
};
const classPrefix$_ = `adm-list-item`;
const ListItem = (props) => {
  var _a;
  const clickable = (_a = props.clickable) !== null && _a !== void 0 ? _a : !!props.onClick;
  const arrow2 = props.arrow === void 0 ? clickable : props.arrow;
  const content = React$1.createElement("div", {
    className: `${classPrefix$_}-content`
  }, props.prefix && React$1.createElement("div", {
    className: `${classPrefix$_}-content-prefix`
  }, props.prefix), React$1.createElement("div", {
    className: `${classPrefix$_}-content-main`
  }, props.title && React$1.createElement("div", {
    className: `${classPrefix$_}-title`
  }, props.title), props.children, props.description && React$1.createElement("div", {
    className: `${classPrefix$_}-description`
  }, props.description)), props.extra && React$1.createElement("div", {
    className: `${classPrefix$_}-content-extra`
  }, props.extra), arrow2 && React$1.createElement("div", {
    className: `${classPrefix$_}-content-arrow`
  }, arrow2 === true ? React$1.createElement(RightOutline, null) : arrow2));
  return withNativeProps(props, React$1.createElement(clickable ? "a" : "div", {
    className: classNames(`${classPrefix$_}`, clickable ? ["adm-plain-anchor"] : [], props.disabled && `${classPrefix$_}-disabled`),
    onClick: props.disabled ? void 0 : props.onClick
  }, content));
};
var List = attachPropertiesToComponent(List$1, {
  Item: ListItem
});
const CheckListContext = createContext(null);
const classPrefix$Z = "adm-check-list";
const defaultProps$O = {
  multiple: false,
  defaultValue: [],
  activeIcon: React$1.createElement(CheckOutline, null)
};
const CheckList$1 = (p) => {
  const props = mergeProps(defaultProps$O, p);
  const [value, setValue] = usePropsValue(props);
  function check(val) {
    if (props.multiple) {
      setValue([...value, val]);
    } else {
      setValue([val]);
    }
  }
  function uncheck(val) {
    setValue(value.filter((item) => item !== val));
  }
  const {
    activeIcon,
    disabled,
    readOnly
  } = props;
  return React$1.createElement(CheckListContext.Provider, {
    value: {
      value,
      check,
      uncheck,
      activeIcon,
      disabled,
      readOnly
    }
  }, withNativeProps(props, React$1.createElement(List, {
    mode: props.mode,
    className: classPrefix$Z
  }, props.children)));
};
const classPrefix$Y = `adm-check-list-item`;
const CheckListItem = (props) => {
  const context = useContext(CheckListContext);
  if (context === null) {
    return null;
  }
  const active = context.value.includes(props.value);
  const readOnly = props.readOnly || context.readOnly;
  const extra = React$1.createElement("div", {
    className: `${classPrefix$Y}-extra`
  }, active ? context.activeIcon : null);
  return withNativeProps(props, React$1.createElement(List.Item, {
    title: props.title,
    className: classNames(classPrefix$Y, readOnly && `${classPrefix$Y}-readonly`, active && `${classPrefix$Y}-active`),
    description: props.description,
    prefix: props.prefix,
    onClick: (e) => {
      var _a;
      if (readOnly)
        return;
      if (active) {
        context.uncheck(props.value);
      } else {
        context.check(props.value);
      }
      (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    arrow: false,
    clickable: !readOnly,
    extra,
    disabled: props.disabled || context.disabled
  }, props.children));
};
var CheckList = attachPropertiesToComponent(CheckList$1, {
  Item: CheckListItem
});
var MapCache = _MapCache;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result2 = func.apply(this, args);
    memoized.cache = cache.set(key, result2) || cache;
    return result2;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var memoize_1 = memoize;
function useCascaderValueExtend(options) {
  const generateItems = useMemo(() => {
    return memoize_1((val) => {
      const ret = [];
      let currentOptions = options;
      for (const v of val) {
        const target = currentOptions.find((option) => option.value === v);
        if (!target) {
          break;
        }
        ret.push(target);
        if (!target.children)
          break;
        currentOptions = target.children;
      }
      return ret;
    }, (val) => JSON.stringify(val));
  }, [options]);
  const generateIsLeaf = useMemo(() => {
    return memoize_1((val) => {
      var _a;
      let isLeaf = false;
      for (const v of val) {
        const target = options.find((option) => option.value === v);
        if (!target) {
          break;
        }
        isLeaf = ((_a = target.children) === null || _a === void 0 ? void 0 : _a.length) === val.length;
      }
      return isLeaf;
    }, (val) => JSON.stringify(val));
  }, [options]);
  function generateValueExtend(val) {
    return {
      get items() {
        return generateItems(val);
      },
      get isLeaf() {
        return generateIsLeaf(val);
      }
    };
  }
  return generateValueExtend;
}
const optionSkeleton = [];
var skeleton = "";
function generateIntArray(from, to2) {
  const array = [];
  for (let i = from; i <= to2; i++) {
    array.push(i);
  }
  return array;
}
const classPrefix$X = "adm-skeleton";
const Skeleton$1 = (props) => {
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$X, {
      [`${classPrefix$X}-animated`]: props.animated
    })
  }));
};
const SkeletonTitle = (props) => {
  return withNativeProps(props, React$1.createElement(Skeleton$1, {
    animated: props.animated,
    className: `${classPrefix$X}-title`
  }));
};
const defaultSkeletonParagraphProps = {
  lineCount: 3
};
const SkeletonParagraph = (p) => {
  const props = mergeProps(defaultSkeletonParagraphProps, p);
  const keys2 = generateIntArray(1, props.lineCount);
  const node = React$1.createElement("div", {
    className: `${classPrefix$X}-paragraph`
  }, keys2.map((key) => React$1.createElement(Skeleton$1, {
    key,
    animated: props.animated,
    className: `${classPrefix$X}-paragraph-line`
  })));
  return withNativeProps(props, node);
};
var Skeleton = attachPropertiesToComponent(Skeleton$1, {
  Title: SkeletonTitle,
  Paragraph: SkeletonParagraph
});
const classPrefix$W = `adm-cascader-view`;
const defaultProps$N = {
  defaultValue: []
};
const CascaderView$1 = (p) => {
  const {
    locale
  } = useConfig();
  const props = mergeProps(defaultProps$N, {
    placeholder: locale.Cascader.placeholder
  }, p);
  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: (val) => {
      var _a;
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, generateValueExtend(val));
    }
  }));
  const [tabActiveKey, setTabActiveKey] = useState(0);
  const generateValueExtend = useCascaderValueExtend(props.options);
  const levels = useMemo(() => {
    const ret = [];
    let currentOptions = props.options;
    let reachedEnd = false;
    for (const v of value) {
      const target = currentOptions.find((option) => option.value === v);
      ret.push({
        selected: target,
        options: currentOptions
      });
      if (!target || !target.children) {
        reachedEnd = true;
        break;
      }
      currentOptions = target.children;
    }
    if (!reachedEnd) {
      ret.push({
        selected: void 0,
        options: currentOptions
      });
    }
    return ret;
  }, [value, props.options]);
  useEffect(() => {
    setTabActiveKey(levels.length - 1);
  }, [value]);
  useEffect(() => {
    const max = levels.length - 1;
    if (tabActiveKey > max) {
      setTabActiveKey(max);
    }
  }, [tabActiveKey, levels]);
  const onItemSelect = (selectValue, depth) => {
    const next = value.slice(0, depth);
    if (selectValue !== void 0) {
      next[depth] = selectValue;
    }
    setValue(next);
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$W
  }, React$1.createElement(Tabs, {
    activeKey: tabActiveKey.toString(),
    onChange: (key) => setTabActiveKey(parseInt(key)),
    stretch: false,
    className: `${classPrefix$W}-tabs`
  }, levels.map((level, index2) => {
    const selected = level.selected;
    return React$1.createElement(Tabs.Tab, {
      key: index2,
      title: React$1.createElement("div", {
        className: `${classPrefix$W}-header-title`
      }, selected ? selected.label : props.placeholder),
      forceRender: true
    }, React$1.createElement("div", {
      className: `${classPrefix$W}-content`
    }, level.options === optionSkeleton ? React$1.createElement("div", {
      className: `${classPrefix$W}-skeleton`
    }, React$1.createElement(Skeleton, {
      className: `${classPrefix$W}-skeleton-line-1`,
      animated: true
    }), React$1.createElement(Skeleton, {
      className: `${classPrefix$W}-skeleton-line-2`,
      animated: true
    }), React$1.createElement(Skeleton, {
      className: `${classPrefix$W}-skeleton-line-3`,
      animated: true
    }), React$1.createElement(Skeleton, {
      className: `${classPrefix$W}-skeleton-line-4`,
      animated: true
    })) : React$1.createElement(CheckList, {
      value: [value[index2]],
      onChange: (selectValue) => onItemSelect(selectValue[0], index2)
    }, level.options.map((option) => {
      const active = value[index2] === option.value;
      return React$1.createElement(CheckList.Item, {
        value: option.value,
        key: option.value,
        disabled: option.disabled,
        className: classNames(`${classPrefix$W}-item`, {
          [`${classPrefix$W}-item-active`]: active
        })
      }, option.label);
    }))));
  }))));
};
var CascaderView = attachPropertiesToComponent(CascaderView$1, {
  optionSkeleton
});
const classPrefix$V = `adm-cascader`;
const defaultProps$M = {
  defaultValue: []
};
const Cascader = (p) => {
  var _a;
  const {
    locale
  } = useConfig();
  const props = mergeProps(defaultProps$M, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel,
    placeholder: locale.Cascader.placeholder
  }, p);
  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    onChange: (val) => {
      var _a2;
      (_a2 = props.onConfirm) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, generateValueExtend(val));
    }
  }));
  const generateValueExtend = useCascaderValueExtend(props.options);
  const [innerValue, setInnerValue] = useState(value);
  useEffect(() => {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [props.visible]);
  useEffect(() => {
    if (!props.visible) {
      setInnerValue(value);
    }
  }, [value]);
  const cascaderElement = withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$V
  }, React$1.createElement("div", {
    className: `${classPrefix$V}-header`
  }, React$1.createElement("a", {
    className: `${classPrefix$V}-header-button`,
    onClick: () => {
      var _a2, _b;
      (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    }
  }, props.cancelText), React$1.createElement("div", {
    className: `${classPrefix$V}-header-title`
  }, props.title), React$1.createElement("a", {
    className: `${classPrefix$V}-header-button`,
    onClick: () => {
      var _a2;
      setValue(innerValue);
      (_a2 = props.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(props);
    }
  }, props.confirmText)), React$1.createElement("div", {
    className: `${classPrefix$V}-body`
  }, React$1.createElement(CascaderView, Object.assign({}, props, {
    value: innerValue,
    onChange: (val, ext) => {
      var _a2;
      setInnerValue(val);
      if (props.visible) {
        (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, val, ext);
      }
    }
  })))));
  const popupElement = React$1.createElement(Popup, {
    visible: props.visible,
    position: "bottom",
    onMaskClick: () => {
      var _a2, _b;
      (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(props);
      (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
    },
    getContainer: props.getContainer,
    destroyOnClose: true,
    afterShow: props.afterShow,
    afterClose: props.afterClose,
    onClick: props.onClick,
    stopPropagation: props.stopPropagation
  }, cascaderElement);
  return React$1.createElement(React$1.Fragment, null, popupElement, (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, generateValueExtend(value).items));
};
function prompt$1(props) {
  return new Promise((resolve) => {
    const Wrapper2 = () => {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setVisible(true);
      }, []);
      return React$1.createElement(Cascader, Object.assign({}, props, {
        visible,
        onConfirm: (val, extend) => {
          var _a;
          (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
          resolve(val);
        },
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          setVisible(false);
          resolve(null);
        },
        afterClose: () => {
          var _a;
          (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
          unmount2();
        }
      }));
    };
    const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
  });
}
var cascader = "";
var index$e = attachPropertiesToComponent(Cascader, {
  prompt: prompt$1,
  optionSkeleton
});
var checkbox = "";
const CheckboxGroupContext = createContext(null);
const defaultProps$L = {
  disabled: false,
  defaultValue: []
};
const Group$1 = (p) => {
  const props = mergeProps(defaultProps$L, p);
  const [value, setValue] = usePropsValue(props);
  return React$1.createElement(CheckboxGroupContext.Provider, {
    value: {
      value,
      disabled: props.disabled,
      check: (v) => {
        setValue([...value, v]);
      },
      uncheck: (v) => {
        setValue(value.filter((item) => item !== v));
      }
    }
  }, props.children);
};
const CheckIcon = memo((props) => {
  return withNativeProps(props, React$1.createElement("svg", {
    viewBox: "0 0 40 40"
  }, React$1.createElement("path", {
    d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
    fill: "currentColor"
  })));
});
const IndeterminateIcon = memo((props) => {
  return withNativeProps(props, React$1.createElement("svg", {
    viewBox: "0 0 40 40"
  }, React$1.createElement("path", {
    d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
    fill: "currentColor"
  })));
});
const NativeInput = (props) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (props.disabled)
      return;
    if (!inputRef.current)
      return;
    const input2 = inputRef.current;
    function handleClick(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      props.onChange(input2.checked);
    }
    input2.addEventListener("click", handleClick);
    return () => {
      input2.removeEventListener("click", handleClick);
    };
  }, [props.disabled, props.onChange]);
  return React$1.createElement("input", {
    ref: inputRef,
    type: "checkbox",
    checked: props.checked,
    onChange: () => {
    },
    disabled: props.disabled,
    id: props.id
  });
};
const classPrefix$U = `adm-checkbox`;
const defaultProps$K = {
  defaultChecked: false,
  indeterminate: false
};
const Checkbox$1 = (p) => {
  const groupContext = useContext(CheckboxGroupContext);
  const props = mergeProps(defaultProps$K, p);
  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  });
  let disabled = props.disabled;
  const {
    value
  } = props;
  if (groupContext && value !== void 0) {
    checked = groupContext.value.includes(value);
    setChecked = (checked2) => {
      var _a;
      if (checked2) {
        groupContext.check(value);
      } else {
        groupContext.uncheck(value);
      }
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, checked2);
    };
    disabled = disabled || groupContext.disabled;
  }
  const renderIcon = () => {
    if (props.icon) {
      return React$1.createElement("div", {
        className: `${classPrefix$U}-custom-icon`
      }, props.icon(checked, props.indeterminate));
    }
    return React$1.createElement("div", {
      className: `${classPrefix$U}-icon`
    }, props.indeterminate ? React$1.createElement(IndeterminateIcon, null) : checked && React$1.createElement(CheckIcon, null));
  };
  return withNativeProps(props, React$1.createElement("label", {
    className: classNames(classPrefix$U, {
      [`${classPrefix$U}-checked`]: checked && !props.indeterminate,
      [`${classPrefix$U}-indeterminate`]: props.indeterminate,
      [`${classPrefix$U}-disabled`]: disabled,
      [`${classPrefix$U}-block`]: props.block
    })
  }, React$1.createElement(NativeInput, {
    type: "checkbox",
    checked,
    onChange: setChecked,
    disabled,
    id: props.id
  }), renderIcon(), props.children && React$1.createElement("div", {
    className: `${classPrefix$U}-content`
  }, props.children)));
};
var Checkbox = attachPropertiesToComponent(Checkbox$1, {
  Group: Group$1
});
var collapse = "";
const classPrefix$T = `adm-collapse`;
const CollapsePanel = () => {
  return null;
};
const CollapsePanelContent = (props) => {
  const {
    visible
  } = props;
  const innerRef = useRef(null);
  const shouldRender = useShouldRender(visible, props.forceRender, props.destroyOnClose);
  const [{
    height
  }, api] = useSpring(() => ({
    from: {
      height: 0
    },
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 25,
      clamp: true
    }
  }));
  useMount(() => {
    if (!visible)
      return;
    const inner = innerRef.current;
    if (!inner)
      return;
    api.start({
      height: inner.offsetHeight,
      immediate: true
    });
  });
  useIsomorphicUpdateLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner)
      return;
    if (visible) {
      api.start({
        height: inner.offsetHeight
      });
    } else {
      api.start({
        height: inner.offsetHeight,
        immediate: true
      });
      api.start({
        height: 0
      });
    }
  }, [visible]);
  return React$1.createElement(animated.div, {
    className: `${classPrefix$T}-panel-content`,
    style: {
      height: height.to((v) => {
        if (height.idle && visible) {
          return "auto";
        } else {
          return v;
        }
      })
    }
  }, React$1.createElement("div", {
    className: `${classPrefix$T}-panel-content-inner`,
    ref: innerRef
  }, React$1.createElement(List.Item, null, shouldRender && props.children)));
};
const Collapse = (props) => {
  var _a;
  const panels = [];
  traverseReactNode(props.children, (child) => {
    if (!React$1.isValidElement(child))
      return;
    const key = child.key;
    if (typeof key !== "string")
      return;
    panels.push(child);
  });
  const [activeKey, setActiveKey] = usePropsValue(props.accordion ? {
    value: props.activeKey === void 0 ? void 0 : props.activeKey === null ? [] : [props.activeKey],
    defaultValue: props.defaultActiveKey === void 0 || props.defaultActiveKey === null ? [] : [props.defaultActiveKey],
    onChange: (v) => {
      var _a2, _b;
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, (_b = v[0]) !== null && _b !== void 0 ? _b : null);
    }
  } : {
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : [],
    onChange: props.onChange
  });
  const activeKeyList = activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey];
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$T
  }, React$1.createElement(List, null, panels.map((panel) => {
    const key = panel.key;
    const active = activeKeyList.includes(key);
    function handleClick(event) {
      var _a2, _b;
      if (props.accordion) {
        if (active) {
          setActiveKey([]);
        } else {
          setActiveKey([key]);
        }
      } else {
        if (active) {
          setActiveKey(activeKeyList.filter((v) => v !== key));
        } else {
          setActiveKey([...activeKeyList, key]);
        }
      }
      (_b = (_a2 = panel.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
    }
    const renderArrow = () => {
      let arrow2 = React$1.createElement(DownOutline, null);
      if (props.arrow !== void 0) {
        arrow2 = props.arrow;
      }
      if (panel.props.arrow !== void 0) {
        arrow2 = panel.props.arrow;
      }
      return typeof arrow2 === "function" ? arrow2(active) : React$1.createElement("div", {
        className: classNames(`${classPrefix$T}-arrow`, {
          [`${classPrefix$T}-arrow-active`]: active
        })
      }, arrow2);
    };
    return React$1.createElement(React$1.Fragment, {
      key
    }, withNativeProps(panel.props, React$1.createElement(List.Item, {
      className: `${classPrefix$T}-panel-header`,
      onClick: handleClick,
      disabled: panel.props.disabled,
      arrow: renderArrow()
    }, panel.props.title)), React$1.createElement(CollapsePanelContent, {
      visible: active,
      forceRender: !!panel.props.forceRender,
      destroyOnClose: !!panel.props.destroyOnClose
    }, panel.props.children));
  }))));
};
var index$d = attachPropertiesToComponent(Collapse, {
  Panel: CollapsePanel
});
var datePicker = "";
var isoWeeksInYear$1 = { exports: {} };
(function(module, exports) {
  !function(e, n) {
    module.exports = n();
  }(commonjsGlobal, function() {
    return function(e, n) {
      n.prototype.isoWeeksInYear = function() {
        var e2 = this.isLeapYear(), n2 = this.endOf("y").day();
        return n2 === 4 || e2 && n2 === 5 ? 53 : 52;
      };
    };
  });
})(isoWeeksInYear$1);
var isoWeeksInYear = isoWeeksInYear$1.exports;
var isLeapYear$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    return function(e, t) {
      t.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(isLeapYear$1);
var isLeapYear = isLeapYear$1.exports;
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
const precisionRankRecord$1 = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function defaultRenderLabel$2(type, data) {
  switch (type) {
    case "minute":
    case "second":
    case "hour":
      return ("0" + data.toString()).slice(-2);
    default:
      return data.toString();
  }
}
function generateDatePickerColumns$2(selected, min, max, precision, renderLabel, filter) {
  const ret = [];
  const minYear = min.getFullYear();
  const minMonth = min.getMonth() + 1;
  const minDay = min.getDate();
  const minHour = min.getHours();
  const minMinute = min.getMinutes();
  const minSecond = min.getSeconds();
  const maxYear = max.getFullYear();
  const maxMonth = max.getMonth() + 1;
  const maxDay = max.getDate();
  const maxHour = max.getHours();
  const maxMinute = max.getMinutes();
  const maxSecond = max.getSeconds();
  const rank = precisionRankRecord$1[precision];
  if (rank >= precisionRankRecord$1.year) {
    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
      const value = i.toString();
      years.push({
        label: renderLabel ? renderLabel("year", i) : value,
        value
      });
    }
    ret.push(years);
  }
  const selectedYear = parseInt(selected[0]);
  const firstDayInSelectedMonth = dayjs(convertStringArrayToDate$2([selected[0], selected[1], "1"]));
  const selectedMonth = parseInt(selected[1]);
  const selectedDay = parseInt(selected[2]);
  const selectedHour = parseInt(selected[3]);
  const selectedMinute = parseInt(selected[4]);
  const isInMinYear = selectedYear === minYear;
  const isInMaxYear = selectedYear === maxYear;
  const isInMinMonth = isInMinYear && selectedMonth === minMonth;
  const isInMaxMonth = isInMaxYear && selectedMonth === maxMonth;
  const isInMinDay = isInMinMonth && selectedDay === minDay;
  const isInMaxDay = isInMaxMonth && selectedDay === maxDay;
  const isInMinHour = isInMinDay && selectedHour === minHour;
  const isInMaxHour = isInMaxDay && selectedHour === maxHour;
  const isInMinMinute = isInMinHour && selectedMinute === minMinute;
  const isInMaxMinute = isInMaxHour && selectedMinute === maxMinute;
  const generateColumn = (from, to2, precision2) => {
    let column = [];
    for (let i = from; i <= to2; i++) {
      column.push(i);
    }
    const prefix = selected.slice(0, precisionRankRecord$1[precision2]);
    const currentFilter = filter === null || filter === void 0 ? void 0 : filter[precision2];
    if (currentFilter && typeof currentFilter === "function") {
      column = column.filter((i) => currentFilter(i, {
        get date() {
          const stringArray = [...prefix, i.toString()];
          return convertStringArrayToDate$2(stringArray);
        }
      }));
    }
    return column;
  };
  if (rank >= precisionRankRecord$1.month) {
    const lower = isInMinYear ? minMonth : 1;
    const upper = isInMaxYear ? maxMonth : 12;
    const months = generateColumn(lower, upper, "month");
    ret.push(months.map((v) => {
      return {
        label: renderLabel("month", v),
        value: v.toString()
      };
    }));
  }
  if (rank >= precisionRankRecord$1.day) {
    const lower = isInMinMonth ? minDay : 1;
    const upper = isInMaxMonth ? maxDay : firstDayInSelectedMonth.daysInMonth();
    const days = generateColumn(lower, upper, "day");
    ret.push(days.map((v) => {
      return {
        label: renderLabel("day", v),
        value: v.toString()
      };
    }));
  }
  if (rank >= precisionRankRecord$1.hour) {
    const lower = isInMinDay ? minHour : 0;
    const upper = isInMaxDay ? maxHour : 23;
    const hours = generateColumn(lower, upper, "hour");
    ret.push(hours.map((v) => {
      return {
        label: renderLabel("hour", v),
        value: v.toString()
      };
    }));
  }
  if (rank >= precisionRankRecord$1.minute) {
    const lower = isInMinHour ? minMinute : 0;
    const upper = isInMaxHour ? maxMinute : 59;
    const minutes = generateColumn(lower, upper, "minute");
    ret.push(minutes.map((v) => {
      return {
        label: renderLabel("minute", v),
        value: v.toString()
      };
    }));
  }
  if (rank >= precisionRankRecord$1.second) {
    const lower = isInMinMinute ? minSecond : 0;
    const upper = isInMaxMinute ? maxSecond : 59;
    const seconds = generateColumn(lower, upper, "second");
    ret.push(seconds.map((v) => {
      return {
        label: renderLabel("second", v),
        value: v.toString()
      };
    }));
  }
  return ret;
}
function convertDateToStringArray$2(date) {
  if (!date)
    return [];
  return [date.getFullYear().toString(), (date.getMonth() + 1).toString(), date.getDate().toString(), date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()];
}
function convertStringArrayToDate$2(value) {
  var _a, _b, _c, _d, _e, _f;
  const yearString = (_a = value[0]) !== null && _a !== void 0 ? _a : "1900";
  const monthString = (_b = value[1]) !== null && _b !== void 0 ? _b : "1";
  const dateString = (_c = value[2]) !== null && _c !== void 0 ? _c : "1";
  const hourString = (_d = value[3]) !== null && _d !== void 0 ? _d : "0";
  const minuteString = (_e = value[4]) !== null && _e !== void 0 ? _e : "0";
  const secondString = (_f = value[5]) !== null && _f !== void 0 ? _f : "0";
  return new Date(parseInt(yearString), parseInt(monthString) - 1, parseInt(dateString), parseInt(hourString), parseInt(minuteString), parseInt(secondString));
}
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
const precisionRankRecord = {
  year: 0,
  week: 1,
  "week-day": 2
};
function defaultRenderLabel$1(type, data) {
  return data.toString();
}
function generateDatePickerColumns$1(selected, min, max, precision, renderLabel, filter) {
  const ret = [];
  const minYear = min.getFullYear();
  const maxYear = max.getFullYear();
  const rank = precisionRankRecord[precision];
  if (rank >= precisionRankRecord.year) {
    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
      const value = i.toString();
      years.push({
        label: renderLabel ? renderLabel("year", i) : value,
        value
      });
    }
    ret.push(years);
  }
  const selectedYear = parseInt(selected[0]);
  const isInMinYear = selectedYear === minYear;
  const isInMaxYear = selectedYear === maxYear;
  const minDay = dayjs(min);
  const maxDay = dayjs(max);
  const minWeek = minDay.isoWeek();
  const maxWeek = maxDay.isoWeek();
  const minWeekday = minDay.isoWeekday();
  const maxWeekday = maxDay.isoWeekday();
  const selectedWeek = parseInt(selected[1]);
  const isInMinWeek = isInMinYear && selectedWeek === minWeek;
  const isInMaxWeek = isInMaxYear && selectedWeek === maxWeek;
  const selectedYearWeeks = dayjs(`${selectedYear}-01-01`).isoWeeksInYear();
  const generateColumn = (from, to2, precision2) => {
    let column = [];
    for (let i = from; i <= to2; i++) {
      column.push(i);
    }
    const prefix = selected.slice(0, precisionRankRecord[precision2]);
    const currentFilter = filter === null || filter === void 0 ? void 0 : filter[precision2];
    if (currentFilter && typeof currentFilter === "function") {
      column = column.filter((i) => currentFilter(i, {
        get date() {
          const stringArray = [...prefix, i.toString()];
          return convertStringArrayToDate$1(stringArray);
        }
      }));
    }
    return column;
  };
  if (rank >= precisionRankRecord.week) {
    const lower = isInMinYear ? minWeek : 1;
    const upper = isInMaxYear ? maxWeek : selectedYearWeeks;
    const weeks = generateColumn(lower, upper, "week");
    ret.push(weeks.map((v) => {
      return {
        label: renderLabel("week", v),
        value: v.toString()
      };
    }));
  }
  if (rank >= precisionRankRecord["week-day"]) {
    const lower = isInMinWeek ? minWeekday : 1;
    const upper = isInMaxWeek ? maxWeekday : 7;
    const weeks = generateColumn(lower, upper, "week-day");
    ret.push(weeks.map((v) => {
      return {
        label: renderLabel("week-day", v),
        value: v.toString()
      };
    }));
  }
  return ret;
}
function convertDateToStringArray$1(date) {
  if (!date)
    return [];
  const day = dayjs(date);
  return [day.isoWeekYear().toString(), day.isoWeek().toString(), day.isoWeekday().toString()];
}
function convertStringArrayToDate$1(value) {
  var _a, _b, _c;
  const yearString = (_a = value[0]) !== null && _a !== void 0 ? _a : "1900";
  const weekString = (_b = value[1]) !== null && _b !== void 0 ? _b : "1";
  const weekdayString = (_c = value[2]) !== null && _c !== void 0 ? _c : "1";
  const day = dayjs().year(parseInt(yearString)).isoWeek(parseInt(weekString)).isoWeekday(parseInt(weekdayString)).hour(0).minute(0).second(0);
  return day.toDate();
}
const precisionLengthRecord = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
};
const convertDateToStringArray = (date, precision) => {
  if (precision.includes("week")) {
    return convertDateToStringArray$1(date);
  } else {
    const datePrecision = precision;
    const stringArray = convertDateToStringArray$2(date);
    return stringArray.slice(0, precisionLengthRecord[datePrecision]);
  }
};
const convertStringArrayToDate = (value, precision) => {
  if (precision.includes("week")) {
    return convertStringArrayToDate$1(value);
  } else {
    return convertStringArrayToDate$2(value);
  }
};
const generateDatePickerColumns = (selected, min, max, precision, renderLabel, filter) => {
  if (precision.startsWith("week")) {
    return generateDatePickerColumns$1(selected, min, max, precision, renderLabel, filter);
  } else {
    return generateDatePickerColumns$2(selected, min, max, precision, renderLabel, filter);
  }
};
const defaultRenderLabel = (precision, data) => {
  if (precision.includes("week")) {
    return defaultRenderLabel$1(precision, data);
  } else {
    return defaultRenderLabel$2(precision, data);
  }
};
const thisYear$1 = new Date().getFullYear();
const defaultProps$J = {
  min: new Date(new Date().setFullYear(thisYear$1 - 10)),
  max: new Date(new Date().setFullYear(thisYear$1 + 10)),
  precision: "day",
  renderLabel: defaultRenderLabel,
  defaultValue: null
};
const DatePicker = (p) => {
  const props = mergeProps(defaultProps$J, p);
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: (v) => {
      var _a;
      if (v === null)
        return;
      (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, v);
    }
  });
  const now = useMemo(() => new Date(), []);
  const pickerValue = useMemo(() => {
    let date = value !== null && value !== void 0 ? value : now;
    date = new Date(bound(date.getTime(), props.min.getTime(), props.max.getTime()));
    return convertDateToStringArray(date, props.precision);
  }, [value, props.precision, props.min, props.max]);
  const onConfirm = useCallback((val) => {
    setValue(convertStringArrayToDate(val, props.precision));
  }, [setValue, props.precision]);
  const onSelect = useMemoizedFn((val) => {
    var _a;
    const date = convertStringArrayToDate(val, props.precision);
    (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, date);
  });
  const columns = useCallback((selected) => generateDatePickerColumns(selected, props.min, props.max, props.precision, props.renderLabel, props.filter), [props.min, props.max, props.precision, props.renderLabel]);
  return withNativeProps(props, React$1.createElement(Picker, {
    columns,
    value: pickerValue,
    onCancel: props.onCancel,
    onClose: props.onClose,
    visible: props.visible,
    confirmText: props.confirmText,
    cancelText: props.cancelText,
    onConfirm,
    onSelect,
    getContainer: props.getContainer,
    afterShow: props.afterShow,
    afterClose: props.afterClose,
    onClick: props.onClick,
    title: props.title,
    stopPropagation: props.stopPropagation,
    mouseWheel: props.mouseWheel
  }, () => {
    var _a;
    return (_a = props.children) === null || _a === void 0 ? void 0 : _a.call(props, value);
  }));
};
function prompt(props) {
  return new Promise((resolve) => {
    const Wrapper2 = () => {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setVisible(true);
      }, []);
      return React$1.createElement(DatePicker, Object.assign({}, props, {
        visible,
        onConfirm: (val) => {
          var _a;
          (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, val);
          resolve(val);
        },
        onClose: () => {
          var _a;
          (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
          setVisible(false);
          resolve(null);
        },
        afterClose: () => {
          var _a;
          (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
          unmount2();
        }
      }));
    };
    const unmount2 = renderToBody(React$1.createElement(Wrapper2, null));
  });
}
var index$c = attachPropertiesToComponent(DatePicker, {
  prompt
});
const thisYear = new Date().getFullYear();
const defaultProps$I = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: "day",
  renderLabel: defaultRenderLabel
};
const DatePickerView = (p) => {
  var _a;
  const props = mergeProps(defaultProps$I, p);
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : null
  });
  const pickerValue = useMemo(() => convertDateToStringArray(value, props.precision), [value, props.precision]);
  const onChange = useCallback((val) => {
    var _a2;
    const date = convertStringArrayToDate(val, props.precision);
    if (date) {
      setValue(date);
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, date);
    }
  }, [props.onChange, props.precision]);
  return withNativeProps(props, React$1.createElement(PickerView, {
    columns: (selected) => generateDatePickerColumns(selected, props.min, props.max, props.precision, props.renderLabel, props.filter),
    value: pickerValue,
    mouseWheel: props.mouseWheel,
    onChange
  }));
};
var dialog = "";
const DialogActionButton = (props) => {
  const {
    action
  } = props;
  const [loading, setLoading] = useState(false);
  function handleClick() {
    return __awaiter(this, void 0, void 0, function* () {
      setLoading(true);
      try {
        const promise = props.onAction();
        yield promise;
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    });
  }
  return withNativeProps(props.action, React$1.createElement(Button, {
    key: action.key,
    onClick: handleClick,
    className: classNames("adm-dialog-button", {
      "adm-dialog-button-bold": action.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: true,
    color: action.danger ? "danger" : "primary",
    loading,
    disabled: action.disabled
  }, action.text));
};
var image = "";
function toCSSLength(val) {
  return typeof val === "number" ? `${val}px` : val;
}
const LazyDetector = (props) => {
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);
  useEffect(() => {
    if (inViewport) {
      props.onActive();
    }
  }, [inViewport]);
  return React$1.createElement("div", {
    ref
  });
};
const classPrefix$S = `adm-image`;
const defaultProps$H = {
  fit: "fill",
  placeholder: React$1.createElement("div", {
    className: `${classPrefix$S}-tip`
  }, React$1.createElement(PictureOutline, null)),
  fallback: React$1.createElement("div", {
    className: `${classPrefix$S}-tip`
  }, React$1.createElement(PictureWrongOutline, null)),
  lazy: false
};
const Image$1 = staged((p) => {
  const props = mergeProps(defaultProps$H, p);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  let src = props.src;
  let srcSet = props.srcSet;
  const [initialized, setInitialized] = useState(!props.lazy);
  src = initialized ? props.src : void 0;
  srcSet = initialized ? props.srcSet : void 0;
  useIsomorphicUpdateLayoutEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);
  function renderInner() {
    if (failed) {
      return React$1.createElement(React$1.Fragment, null, props.fallback);
    }
    const img = React$1.createElement("img", {
      className: `${classPrefix$S}-img`,
      src,
      alt: props.alt,
      onClick: props.onClick,
      onLoad: (e) => {
        var _a;
        setLoaded(true);
        (_a = props.onLoad) === null || _a === void 0 ? void 0 : _a.call(props, e);
      },
      onError: (e) => {
        var _a;
        setFailed(true);
        (_a = props.onError) === null || _a === void 0 ? void 0 : _a.call(props, e);
      },
      style: {
        objectFit: props.fit,
        display: loaded ? "block" : "none"
      },
      crossOrigin: props.crossOrigin,
      decoding: props.decoding,
      loading: props.loading,
      referrerPolicy: props.referrerPolicy,
      sizes: props.sizes,
      srcSet,
      useMap: props.useMap
    });
    return React$1.createElement(React$1.Fragment, null, !loaded && props.placeholder, img);
  }
  const style = {};
  if (props.width) {
    style["--width"] = toCSSLength(props.width);
  }
  if (props.height) {
    style["--height"] = toCSSLength(props.height);
  }
  return withNativeProps(props, React$1.createElement("div", {
    ref,
    className: classPrefix$S,
    style
  }, props.lazy && !initialized && React$1.createElement(LazyDetector, {
    onActive: () => {
      setInitialized(true);
    }
  }), renderInner()));
});
const defaultProps$G = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ["click"],
  getContainer: null,
  disableBodyScroll: true
};
const Dialog = (p) => {
  const props = mergeProps(defaultProps$G, p);
  const unmountedRef = useUnmountedRef();
  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: true
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      var _a, _b;
      if (unmountedRef.current)
        return;
      setActive(props.visible);
      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });
  const [active, setActive] = useState(props.visible);
  const body = React$1.createElement("div", {
    className: classNames(cls$1("body"), props.image && cls$1("with-image"), props.bodyClassName),
    style: props.bodyStyle
  }, !!props.image && React$1.createElement("div", {
    className: cls$1("image-container")
  }, React$1.createElement(Image$1, {
    src: props.image,
    alt: "dialog header image",
    width: "100%"
  })), !!props.header && React$1.createElement("div", {
    className: cls$1("header")
  }, React$1.createElement(AutoCenter, null, props.header)), !!props.title && React$1.createElement("div", {
    className: cls$1("title")
  }, props.title), React$1.createElement("div", {
    className: classNames(cls$1("content"), !props.content && cls$1("content-empty"))
  }, typeof props.content === "string" ? React$1.createElement(AutoCenter, null, props.content) : props.content), React$1.createElement("div", {
    className: cls$1("footer")
  }, props.actions.map((row, index2) => {
    const actions = Array.isArray(row) ? row : [row];
    return React$1.createElement("div", {
      className: cls$1("action-row"),
      key: index2
    }, actions.map((action, index3) => React$1.createElement(DialogActionButton, {
      key: action.key,
      action,
      onAction: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index3)]);
        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      })
    })));
  })));
  const node = withNativeProps(props, React$1.createElement("div", {
    className: cls$1(),
    style: {
      display: active ? "unset" : "none"
    }
  }, React$1.createElement(Mask, {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : void 0,
    style: props.maskStyle,
    className: classNames(cls$1("mask"), props.maskClassName),
    disableBodyScroll: props.disableBodyScroll
  }), React$1.createElement("div", {
    className: cls$1("wrap"),
    style: {
      pointerEvents: props.visible ? "unset" : "none"
    }
  }, React$1.createElement(animated.div, {
    style
  }, body))));
  return renderToContainer(props.getContainer, withStopPropagation(props.stopPropagation, node));
};
function cls$1(name = "") {
  return "adm-dialog" + (name && "-") + name;
}
const closeFnSet$1 = /* @__PURE__ */ new Set();
function show$2(props) {
  const handler = renderImperatively(React$1.createElement(Dialog, Object.assign({}, props, {
    afterClose: () => {
      var _a;
      closeFnSet$1.delete(handler.close);
      (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  })));
  closeFnSet$1.add(handler.close);
  return handler;
}
function alert$1(p) {
  const defaultProps2 = {
    confirmText: getDefaultConfig().locale.Dialog.ok
  };
  const props = mergeProps(defaultProps2, p);
  return new Promise((resolve) => {
    show$2(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      actions: [{
        key: "confirm",
        text: props.confirmText
      }],
      onAction: props.onConfirm,
      onClose: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        resolve();
      }
    }));
  });
}
const defaultProps$F = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function confirm$1(p) {
  const {
    locale
  } = getDefaultConfig();
  const props = mergeProps(defaultProps$F, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel
  }, p);
  return new Promise((resolve) => {
    show$2(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      onClose: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        resolve(false);
      },
      actions: [[{
        key: "cancel",
        text: props.cancelText,
        onClick: () => __awaiter(this, void 0, void 0, function* () {
          var _a;
          yield (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
          resolve(false);
        })
      }, {
        key: "confirm",
        text: props.confirmText,
        bold: true,
        onClick: () => __awaiter(this, void 0, void 0, function* () {
          var _b;
          yield (_b = props.onConfirm) === null || _b === void 0 ? void 0 : _b.call(props);
          resolve(true);
        })
      }]]
    }));
  });
}
function clear$2() {
  closeFnSet$1.forEach((close) => {
    close();
  });
}
var index$b = attachPropertiesToComponent(Dialog, {
  show: show$2,
  alert: alert$1,
  confirm: confirm$1,
  clear: clear$2
});
var divider = "";
const classPrefix$R = `adm-divider`;
const defaultProps$E = {
  contentPosition: "center",
  direction: "horizontal"
};
const Divider = (p) => {
  const props = mergeProps(defaultProps$E, p);
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$R, `${classPrefix$R}-${props.direction}`, `${classPrefix$R}-${props.contentPosition}`)
  }, props.children && React$1.createElement("div", {
    className: `${classPrefix$R}-content`
  }, props.children)));
};
var dropdown = "";
const classPrefix$Q = `adm-dropdown-item`;
const Item = (props) => {
  var _a;
  const cls2 = classNames(classPrefix$Q, {
    [`${classPrefix$Q}-active`]: props.active,
    [`${classPrefix$Q}-highlight`]: (_a = props.highlight) !== null && _a !== void 0 ? _a : props.active
  });
  return withNativeProps(props, React$1.createElement("div", {
    className: cls2,
    onClick: props.onClick
  }, React$1.createElement("div", {
    className: `${classPrefix$Q}-title`
  }, React$1.createElement("span", {
    className: `${classPrefix$Q}-title-text`
  }, props.title), React$1.createElement("span", {
    className: classNames(`${classPrefix$Q}-title-arrow`, {
      [`${classPrefix$Q}-title-arrow-active`]: props.active
    })
  }, props.arrow === void 0 ? React$1.createElement(DownFill, null) : props.arrow))));
};
const ItemChildrenWrap = (props) => {
  const {
    active = false
  } = props;
  const shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
  const cls2 = classNames(`${classPrefix$Q}-content`, {
    [`${classPrefix$Q}-content-hidden`]: !active
  });
  return shouldRender ? React$1.createElement("div", {
    className: cls2,
    onClick: props.onClick
  }, props.children) : null;
};
const classPrefix$P = `adm-dropdown`;
const defaultProps$D = {
  defaultActiveKey: null,
  closeOnMaskClick: true,
  closeOnClickAway: false
};
const Dropdown = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$D, p);
  const [value, setValue] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey,
    onChange: props.onChange
  });
  const navRef = useRef(null);
  const contentRef = useRef(null);
  useClickAway(() => {
    if (!props.closeOnClickAway)
      return;
    setValue(null);
  }, [navRef, contentRef]);
  const [top, setTop] = useState();
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container)
      return;
    if (value) {
      const rect = container.getBoundingClientRect();
      setTop(rect.bottom);
    }
  }, [value]);
  const changeActive = (key) => {
    if (value === key) {
      setValue(null);
    } else {
      setValue(key);
    }
  };
  let popupForceRender = false;
  const items = [];
  const navs = React$1.Children.map(props.children, (child) => {
    if (React$1.isValidElement(child)) {
      const childProps = Object.assign(Object.assign({}, child.props), {
        onClick: () => {
          changeActive(child.key);
        },
        active: child.key === value,
        arrow: child.props.arrow === void 0 ? props.arrow : child.props.arrow
      });
      items.push(child);
      if (child.props.forceRender)
        popupForceRender = true;
      return cloneElement(child, childProps);
    } else {
      return child;
    }
  });
  useImperativeHandle(ref, () => ({
    close: () => {
      setValue(null);
    }
  }), [setValue]);
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$P, {
      [`${classPrefix$P}-open`]: !!value
    }),
    ref: containerRef
  }, React$1.createElement("div", {
    className: `${classPrefix$P}-nav`,
    ref: navRef
  }, navs), React$1.createElement(Popup, {
    visible: !!value,
    position: "top",
    className: `${classPrefix$P}-popup`,
    maskClassName: `${classPrefix$P}-popup-mask`,
    bodyClassName: `${classPrefix$P}-popup-body`,
    style: {
      top
    },
    forceRender: popupForceRender,
    onMaskClick: props.closeOnMaskClick ? () => {
      changeActive(null);
    } : void 0
  }, React$1.createElement("div", {
    ref: contentRef
  }, items.map((item) => {
    const isActive = item.key === value;
    return React$1.createElement(ItemChildrenWrap, {
      key: item.key,
      active: isActive,
      forceRender: item.props.forceRender,
      destroyOnClose: item.props.destroyOnClose
    }, item.props.children);
  })))));
});
var index$a = attachPropertiesToComponent(Dropdown, {
  Item
});
var ellipsis = "";
const classPrefix$O = `adm-ellipsis`;
const defaultProps$C = {
  direction: "end",
  rows: 1,
  expandText: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  }
};
const Ellipsis = (p) => {
  const props = mergeProps(defaultProps$C, p);
  const rootRef = useRef(null);
  const [ellipsised, setEllipsised] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [exceeded, setExceeded] = useState(false);
  function calcEllipsised() {
    const root2 = rootRef.current;
    if (!root2)
      return;
    const originStyle = window.getComputedStyle(root2);
    const container = document.createElement("div");
    const styleNames = Array.prototype.slice.apply(originStyle);
    styleNames.forEach((name) => {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });
    container.style.position = "fixed";
    container.style.left = "999999px";
    container.style.top = "999999px";
    container.style.zIndex = "-1000";
    container.style.height = "auto";
    container.style.minHeight = "auto";
    container.style.maxHeight = "auto";
    container.style.textOverflow = "clip";
    container.style.whiteSpace = "normal";
    container.style.webkitLineClamp = "unset";
    container.style.webkitBoxOrient = "unset";
    container.style.display = "block";
    const lineHeight = pxToNumber(originStyle.lineHeight);
    const maxHeight = Math.floor(lineHeight * (props.rows + 0.5) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
    container.innerText = props.content;
    document.body.appendChild(container);
    if (container.offsetHeight <= maxHeight) {
      setExceeded(false);
    } else {
      let check = function(left, right) {
        if (right - left <= 1) {
          if (props.direction === "end") {
            return {
              leading: props.content.slice(0, left) + "..."
            };
          } else {
            return {
              tailing: "..." + props.content.slice(right, end)
            };
          }
        }
        const middle2 = Math.round((left + right) / 2);
        if (props.direction === "end") {
          container.innerText = props.content.slice(0, middle2) + "..." + actionText;
        } else {
          container.innerText = actionText + "..." + props.content.slice(middle2, end);
        }
        if (container.offsetHeight <= maxHeight) {
          if (props.direction === "end") {
            return check(middle2, right);
          } else {
            return check(left, middle2);
          }
        } else {
          if (props.direction === "end") {
            return check(left, middle2);
          } else {
            return check(middle2, right);
          }
        }
      }, checkMiddle = function(leftPart, rightPart) {
        if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
          return {
            leading: props.content.slice(0, leftPart[0]) + "...",
            tailing: "..." + props.content.slice(rightPart[1], end)
          };
        }
        const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
        const rightPartMiddle = Math.floor((rightPart[0] + rightPart[1]) / 2);
        container.innerText = props.content.slice(0, leftPartMiddle) + "..." + actionText + "..." + props.content.slice(rightPartMiddle, end);
        if (container.offsetHeight <= maxHeight) {
          return checkMiddle([leftPartMiddle, leftPart[1]], [rightPart[0], rightPartMiddle]);
        } else {
          return checkMiddle([leftPart[0], leftPartMiddle], [rightPartMiddle, rightPart[1]]);
        }
      };
      setExceeded(true);
      const end = props.content.length;
      const actionText = expanded ? props.collapseText : props.expandText;
      const middle = Math.floor((0 + end) / 2);
      const ellipsised2 = props.direction === "middle" ? checkMiddle([0, middle], [middle, end]) : check(0, end);
      setEllipsised(ellipsised2);
    }
    document.body.removeChild(container);
  }
  useResizeEffect(calcEllipsised, rootRef);
  useIsomorphicLayoutEffect(() => {
    calcEllipsised();
  }, [props.content, props.direction, props.rows, props.expandText, props.collapseText]);
  const expandActionElement = exceeded && props.expandText ? withStopPropagation(props.stopPropagationForActionButtons, React$1.createElement("a", {
    onClick: () => {
      setExpanded(true);
    }
  }, props.expandText)) : null;
  const collapseActionElement = exceeded && props.expandText ? withStopPropagation(props.stopPropagationForActionButtons, React$1.createElement("a", {
    onClick: () => {
      setExpanded(false);
    }
  }, props.collapseText)) : null;
  const renderContent = () => {
    if (!exceeded) {
      return props.content;
    }
    if (expanded) {
      return React$1.createElement(React$1.Fragment, null, props.content, collapseActionElement);
    } else {
      return React$1.createElement(React$1.Fragment, null, ellipsised.leading, expandActionElement, ellipsised.tailing);
    }
  };
  return withNativeProps(props, React$1.createElement("div", {
    ref: rootRef,
    className: classPrefix$O,
    onClick: (e) => {
      if (e.target === e.currentTarget) {
        props.onContentClick(e);
      }
    }
  }, renderContent()));
};
function pxToNumber(value) {
  if (!value)
    return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}
var empty = "";
const EmptyIcon = (props) => {
  return withNativeProps(props, React$1.createElement("svg", {
    viewBox: "0 0 64 41"
  }, React$1.createElement("g", {
    transform: "translate(0 1)",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("ellipse", {
    fill: "#f5f5f5",
    cx: "32",
    cy: "33",
    rx: "32",
    ry: "7"
  }), React$1.createElement("g", {
    stroke: "#d9d9d9"
  }, React$1.createElement("path", {
    d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
  }), React$1.createElement("path", {
    d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
    fill: "#fafafa"
  })))));
};
const classPrefix$N = `adm-empty`;
const Empty = (props) => {
  function renderImageNode() {
    const {
      image: image2
    } = props;
    if (image2 === void 0) {
      return React$1.createElement(EmptyIcon, {
        className: `${classPrefix$N}-image`,
        style: props.imageStyle
      });
    }
    if (typeof image2 === "string") {
      return React$1.createElement("img", {
        className: `${classPrefix$N}-image`,
        style: props.imageStyle,
        src: image2,
        alt: "empty"
      });
    }
    return image2;
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$N
  }, React$1.createElement("div", {
    className: `${classPrefix$N}-image-container`
  }, renderImageNode()), props.description && React$1.createElement("div", {
    className: classNames(`${classPrefix$N}-description`)
  }, props.description)));
};
var errorBlock = "";
const defaultImage = React$1.createElement("svg", {
  viewBox: "0 0 200 200",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, React$1.createElement("defs", null, React$1.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-default-a"
}, React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), React$1.createElement("circle", {
  id: "error-block-image-default-d",
  cx: 18.823,
  cy: 18.823,
  r: 18.823
}), React$1.createElement("rect", {
  id: "error-block-image-default-b",
  x: 3.5,
  y: 9,
  width: 51.429,
  height: 88,
  rx: 4.571
})), React$1.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React$1.createElement("path", {
  d: "M73.557.004c19.435-.311 38.696 17.016 51.523 35.287 8.708-10.822 17.127-16.233 25.255-16.233 13.333 0 28.35 14.274 45.053 42.822 1.769 3.024-3.582 7.435-16.054 13.231l-41.322 1.37c-7.343 5.872-31.225.626-69.152 1.234-27.79.445-45.759-1.234-53.908-5.037C3.2 71.143-1.625 68.686.48 65.308 27.371 22.12 51.73.353 73.557.003Zm93.098 49.53a1.125 1.125 0 0 0-.401.072l-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.283 1.719 4.153 3.898 4.314l.026.001v3.805c0 .39.25.705.56.705.31 0 .56-.316.56-.705l.001-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734Zm-100-5a1.125 1.125 0 0 0-.331.05l-.035.01-.035.012-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.212 1.613 4.036 3.695 4.294l.203.02.026.001v3.805c0 .39.25.705.56.705.282 0 .515-.26.555-.6l.006-.105v-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734ZM52.64 38.348l-.15.008-.149.023-.032.007-.032.008-.078.022-.045.015-.045.016-.06.023-.038.017-.038.017-.058.028-.022.011a2.201 2.201 0 0 0-.323.204l-.05.038-.05.04-.025.02-.025.021a3.742 3.742 0 0 0-.31.294l-.036.04c-.035.037-.07.076-.105.116-.01.012-.02.025-.031.036a3.275 3.275 0 0 0-.081.098l-.063.078c-2.031 2.583-3.48 8.692-3.48 11.027 0 2.636 1.846 4.832 4.292 5.323l.224.04-.064-.012.105.018.103.014v4.618c0 .47.299.85.667.85.337 0 .615-.32.659-.735l.006-.115v-4.618c.18-.023.355-.054.527-.094l.256-.067.196-.06c2.136-.706 3.68-2.75 3.68-5.162 0-2.996-2.383-12.207-5.325-12.207Z",
  transform: "translate(2.286 22.286)",
  fill: "url(#error-block-image-default-a)"
}), React$1.createElement("g", {
  transform: "rotate(-90 102.429 55.357)"
}, React$1.createElement("path", {
  d: "M6.857 0H52a6.857 6.857 0 0 1 6.857 6.857v92A6.857 6.857 0 0 1 52 105.714H6.857A6.857 6.857 0 0 1 0 98.857v-92A6.857 6.857 0 0 1 6.857 0Z",
  fill: "#7EACFF"
}), React$1.createElement("mask", {
  id: "error-block-image-default-c",
  fill: "#fff"
}, React$1.createElement("use", {
  xlinkHref: "#error-block-image-default-b"
})), React$1.createElement("use", {
  fill: "#377EFF",
  xlinkHref: "#error-block-image-default-b"
}), React$1.createElement("path", {
  d: "M11.838 91.8a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-2.858 0a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.16-2.305a.64.64 0 0 1 .628.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-2.982-.04a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm5.268-.531a.64.64 0 0 1 .628.651.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.858-1.143a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-6.37-.917c.209 0 .377.175.377.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm3.512-.798.093.007a.644.644 0 0 1 .535.645.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.652.627-.652Zm5.715 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-11.429 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.261.241c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm11.833-.812a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.628-.651c0-.36.281-.652.628-.652Zm-4.851.399c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm10.313-2.056a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-2.354-.128a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.652.628-.652Zm-13.798.311c.207 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.377-.39c0-.217.169-.392.377-.392Zm11.832-.812a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-6.285 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm3.428 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-6.118.24c.208 0 .376.176.376.392a.384.384 0 0 1-.376.39.384.384 0 0 1-.377-.39c0-.216.169-.391.377-.391Zm11.261-2.525a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm-3.557.484c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.478-.555a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.512-.26c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.857 0c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-4.571 0c.207 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm14.898-1.835a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-8.027-.245c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.169-.391.376-.391Zm6.271-1.349c.208 0 .377.175.377.391a.384.384 0 0 1-.377.391.384.384 0 0 1-.376-.39c0-.217.169-.392.376-.392Zm-11.484-.481c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm15.103-.972c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.39c0-.217.168-.392.376-.392Zm-9.333-1.404c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-6.819-.405c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Z",
  fill: "#003CFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-c)",
  transform: "rotate(116 12.367 83.503)"
}), React$1.createElement("path", {
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M36.774 5.474H21.523"
}), React$1.createElement("path", {
  d: "m67.818 94.025-4.996 3.913m4.996 11.91-4.996-3.912m-1.142 9.145-1.143-6.288m10.71-6.768h-7.262",
  stroke: "#4486FE",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), React$1.createElement("circle", {
  cx: 8.571,
  cy: 8.571,
  r: 8.571,
  transform: "translate(22.857 142)",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), React$1.createElement("g", {
  transform: "translate(132.857 124)"
}, React$1.createElement("mask", {
  id: "error-block-image-default-e",
  fill: "#fff"
}, React$1.createElement("use", {
  xlinkHref: "#error-block-image-default-d"
})), React$1.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-default-d"
}), React$1.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 13.886,
  cy: 15.12,
  r: 18.823
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 23.4,
  cy: 29.057,
  r: 1
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 30.343,
  cy: 29.829,
  r: 1
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 18.771,
  cy: 32.657,
  r: 1.286
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 29.571,
  cy: 25.971,
  r: 1.286
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 19.286,
  cy: 7.971,
  r: 1.286
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 26.486,
  cy: 5.914,
  r: 1.286
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 11.057,
  cy: 6.943,
  r: 1
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 30.086,
  cy: 15.686,
  r: 1.286
}), React$1.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 22.886,
  cy: 14.657,
  r: 1
})), React$1.createElement("path", {
  d: "m87.429 135.123 6.591-9.378v-.08h-5.99v-2.559h10.038v1.787l-6.44 9.254v.082h6.56v2.557h-10.76v-1.663Zm12.185-5.889 4.948-7.047v-.056h-4.498v-1.917h7.536v1.34l-4.849 6.942v.059h4.923v1.92h-8.06v-1.24Zm10.345.702 3.708-5.274v-.045h-3.372v-1.437h5.648v1.003l-3.628 5.206v.045H116v1.438h-6.041v-.936Z",
  fill: "#FFF",
  fillRule: "nonzero"
})));
const disconnectedImage = React$1.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, React$1.createElement("title", null, "@\u53CD\u9988/\u5F02\u5E38/\u7F51\u7EDC\u670D\u52A1\u5F02\u5E38"), React$1.createElement("defs", null, React$1.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-disconnected-c"
}, React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), React$1.createElement("circle", {
  id: "error-block-image-disconnected-d",
  cx: 22.309,
  cy: 22.309,
  r: 22.309
}), React$1.createElement("path", {
  id: "error-block-image-disconnected-a",
  d: "M0 0h400v400H0z"
})), React$1.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React$1.createElement("mask", {
  id: "error-block-image-disconnected-b",
  fill: "#fff"
}, React$1.createElement("use", {
  xlinkHref: "#error-block-image-disconnected-a"
})), React$1.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)",
  fill: "url(#error-block-image-disconnected-c)"
}, React$1.createElement("path", {
  d: "M151.686 45.58c38.869-.623 77.391 34.03 103.046 70.573 17.416-21.644 34.253-32.465 50.51-32.465 26.666 0 56.701 28.548 90.105 85.643 3.539 6.05-7.164 14.87-32.107 26.462l-82.643 2.741c-14.686 11.745-62.45 1.252-138.305 2.467-55.58.89-91.518-2.468-107.816-10.074-23.505-3.07-33.154-7.983-28.946-14.74C59.313 89.813 108.03 46.278 151.686 45.58Zm186.195 99.06-.127.003-.126.01a2.32 2.32 0 0 0-.465.103l-.032.01-.031.01a2.364 2.364 0 0 0-.181.071 2.52 2.52 0 0 0-.116.054l-.133.067-.042.024-.036.02a2.946 2.946 0 0 0-.133.08l-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024a4.906 4.906 0 0 0-.31.27l-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.108.008v7.608c0 .779.502 1.41 1.121 1.41.62 0 1.121-.632 1.121-1.41v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-200-10-.127.003-.126.01a2.32 2.32 0 0 0-.368.073l-.049.014-.048.016-.032.01-.031.01a2.364 2.364 0 0 0-.181.071l-.058.026-.058.028-.133.067-.042.024-.036.02-.066.039-.067.041-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024l-.156.13-.154.14-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.054.004.054.004v7.608c0 .779.502 1.41 1.121 1.41.58 0 1.058-.556 1.115-1.266l.006-.144v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-28.029-12.373-.107.002-.106.006a2.978 2.978 0 0 0-.551.095 3.444 3.444 0 0 0-.323.104 3.962 3.962 0 0 0-.61.297c-.076.045-.15.092-.226.141-4.964 3.312-8.728 18.445-8.728 23.77 0 5.434 3.922 9.935 9.04 10.726l.28.04v9.236c0 .886.532 1.614 1.21 1.692l.121.007.122-.007c.638-.074 1.147-.723 1.204-1.538l.006-.155v-9.235c5.254-.668 9.32-5.234 9.32-10.767 0-5.993-4.77-24.414-10.652-24.414Z"
})), React$1.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)"
}, React$1.createElement("g", {
  transform: "translate(85.858 150.644)"
}, React$1.createElement("path", {
  d: "M116.26 28.467c1.352 0 2.703.018 4.054.054 3.923.385 10.188 4.248 9.267 11.061-.878 6.496-5.836 9.089-8.962 9.529a130.762 130.762 0 0 0-4.36-.072c-28.567 0-60.654 10.149-96.22 30.676l-2.227 1.297c-.744.437-1.49.878-2.236 1.323-4.878 2.911-11.193 1.316-14.103-3.562C-1.438 73.894.157 67.58 5.035 64.67 45.34 40.62 82.4 28.467 116.26 28.467Zm22 11.63c1.03-5.942 6.376-8.618 11.084-8.08C172.14 36.91 194.83 46.86 217.37 61.794c4.735 3.138 6.03 9.52 2.893 14.255-3.138 4.736-9.52 6.031-14.256 2.893-20.111-13.325-40.075-22.165-59.935-26.584a9.974 9.974 0 0 0-.325-.088c-3.987-1.015-8.602-5.738-7.487-12.175ZM116.26 77.418c22.777 0 45.4 7.057 67.73 20.988 4.82 3.007 6.289 9.351 3.282 14.17-3.007 4.82-9.351 6.29-14.17 3.283-19.194-11.974-38.095-17.87-56.842-17.87s-37.648 5.896-56.842 17.87c-4.82 3.007-11.164 1.537-14.17-3.282-3.007-4.82-1.538-11.164 3.282-14.171 22.33-13.931 44.953-20.988 67.73-20.988ZM117.974 124.67c9.85 0 17.303 1.69 25.687 5.082l.82.337 2.9 1.231 3.008 1.252.77.305.107.04c5.326 1.976 8.042 7.895 6.066 13.221-1.976 5.326-7.895 8.042-13.221 6.067l-.713-.27-.726-.285-.763-.31-1.263-.527-2.944-1.26-1.125-.473c-6.393-2.648-11.433-3.838-18.603-3.838-8.223 0-16.532 2.126-25.028 6.475-5.056 2.588-11.254.587-13.842-4.47-2.589-5.056-.588-11.253 4.47-13.842 11.313-5.791 22.814-8.735 34.4-8.735ZM118.235 197.047c7.15 0 13.77-.897 19.841-2.721 5.44-1.635 8.526-7.37 6.892-12.81-1.635-5.44-7.37-8.526-12.81-6.892-4.072 1.224-8.707 1.851-13.923 1.851-4.36 0-8.79-1.045-13.373-3.21l-.626-.301c-5.095-2.512-11.262-.418-13.773 4.678-2.512 5.095-.418 11.261 4.678 13.773 7.559 3.727 15.288 5.632 23.094 5.632Z",
  fill: "#377EFF",
  fillRule: "nonzero"
}), React$1.createElement("path", {
  d: "M198.35 62.413c2.755-4.967 9.016-6.76 13.984-4.004 13.068 7.25 19.124 18.535 17.615 30.952-1.157 9.515-6.83 18.757-14.096 24.352-13.364 10.29-34.915 9.401-49.363-1.91-4.472-3.502-5.26-9.967-1.758-14.44 3.436-4.388 9.724-5.229 14.185-1.952l.255.194c7.283 5.702 18.475 6.164 24.13 1.809 3.072-2.366 5.766-6.754 6.226-10.536.467-3.844-1.21-7.07-6.796-10.267l-.378-.213c-4.967-2.756-6.76-9.017-4.004-13.985ZM61.35 103.092c-2.84-4.92-9.13-6.607-14.05-3.768-20.662 11.922-21.772 35.751-6.018 51.69 13.752 13.914 33.192 13.447 50.507 1.158 4.633-3.288 5.723-9.708 2.436-14.34-3.288-4.633-9.709-5.724-14.341-2.436-9.763 6.928-18.07 7.128-23.97 1.158-6.761-6.84-6.498-14.501 1.35-19.225l.317-.187c4.92-2.84 6.608-9.13 3.769-14.05ZM129.103 135.702c1.688-5.424 7.454-8.453 12.878-6.764 14.776 4.599 23.437 13.727 25.259 25.58 1.316 8.561-1.228 17.533-5.58 24.052-3.132 4.688-7.388 8.287-12.504 11.112-3.03 1.673-5.75 2.811-9.37 4.066l-1.4.477c-5.387 1.806-11.217-1.097-13.022-6.484-1.805-5.386 1.098-11.216 6.484-13.02l1.09-.374c6.032-2.112 9.602-4.19 11.613-7.201 1.693-2.535 2.818-6.502 2.356-9.503-.564-3.673-3.432-6.696-11.04-9.063-5.424-1.689-8.452-7.454-6.764-12.878Z",
  fill: "#377EFF",
  fillRule: "nonzero"
}), React$1.createElement("path", {
  d: "M148.072 181.58c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.236-9.096-10.275-9.707",
  stroke: "#FFF",
  strokeWidth: 0.571,
  strokeLinecap: "round"
}), React$1.createElement("ellipse", {
  fill: "#7EACFF",
  transform: "rotate(10 147 41.933)",
  cx: 147,
  cy: 41.933,
  rx: 9.143,
  ry: 10.286
}), React$1.createElement("path", {
  d: "M210.422 107.472c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.668-9.883-11.572-12.067M51.604 131.769c-3.15-6.8-3.537-12.694-1.161-17.685 2.376-4.99 5.57-8.136 9.583-9.438",
  stroke: "#003CFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), React$1.createElement("path", {
  d: "M21.53 64.408c4.946-3.389 9.817-6.026 14.612-7.912",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), React$1.createElement("path", {
  d: "m113.243 15.444 9.588 8.314M144.31 9.405l-5.775 11.3m18.389-1.246-11.907 4.643M127.64 5.66l2.77 14.255",
  stroke: "#4486FE",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), React$1.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)"
}, React$1.createElement("g", {
  transform: "translate(275.143 302.571)"
}, React$1.createElement("mask", {
  id: "error-block-image-disconnected-e",
  fill: "#fff"
}, React$1.createElement("use", {
  xlinkHref: "#error-block-image-disconnected-d"
})), React$1.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-disconnected-d"
}), React$1.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-disconnected-e)",
  cx: 16.457,
  cy: 17.92,
  r: 22.309
}), React$1.createElement("circle", {
  fill: "#FFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-disconnected-e)",
  cx: 14.263,
  cy: 12.069,
  r: 2.194
}))), React$1.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)",
  fill: "#FBBE47",
  fillRule: "nonzero"
}, React$1.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 12,
  transform: "translate(84 297.714)"
}))));
const emptyImage = React$1.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, React$1.createElement("defs", null, React$1.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-empty-a"
}, React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), React$1.createElement("path", {
  d: "M146.183 18.461c31.705 23.336 33.349 71.85 4.93 96.614-.252.22 6.172 5.602 13.577 11.414l.686.537.69.54.695.54.348.27.698.54a341.27 341.27 0 0 0 8.806 6.596c1.114.802 4.643-.853 10.587-4.965l-.532 12.218a1.2 1.2 0 0 1-.481.91l-10.868 8.111c-1.405 1.048-3.32 1.185-4.854.072l-35.578-25.834c-33.414 17.333-79.913 15-109.804-7-33.444-24.616-33.444-75.95 0-100.563 33.443-24.615 87.657-24.615 121.1 0Zm-60.469 7.653C51.63 26.114 24 44.534 24 67.257S51.63 108.4 85.714 108.4s61.715-18.42 61.715-41.143c0-22.722-27.63-41.143-61.715-41.143Z",
  id: "error-block-image-empty-b"
})), React$1.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React$1.createElement("path", {
  d: "M157.964 244.661H0L3.806 100.13a4.572 4.572 0 0 1 4.353-4.446l.217-.006h45.588V68.2a4.572 4.572 0 0 1 4.356-4.567l.216-.005h65.498l2.554-58.689a4.571 4.571 0 0 1 4.779-4.367l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.212 3.146 69.652L301.634 64.9a4.571 4.571 0 0 1 5.628 4.231l.005.215v43.955l56.162.001v130.264h-56.163v.001h-82.383v-.004h-66.919v1.098ZM89.503 160.03h-9.968v8.436h9.968v-8.436Zm0-14.507h-9.968v8.435h9.968v-8.435Zm197.985-5.15h-9.967v8.432h9.967v-8.431Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.436h9.967v-8.436Zm-84.643-3.29h-30.8v8.436h30.8v-8.436Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
  transform: "translate(18.286 50.286)",
  fill: "url(#error-block-image-empty-a)"
}), React$1.createElement("g", {
  transform: "translate(108.571 189.886)"
}, React$1.createElement("mask", {
  id: "error-block-image-empty-c",
  fill: "#fff"
}, React$1.createElement("use", {
  xlinkHref: "#error-block-image-empty-b"
})), React$1.createElement("use", {
  fill: "#377EFF",
  xlinkHref: "#error-block-image-empty-b"
}), React$1.createElement("path", {
  d: "M131.429 134.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM128 133.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM120 128.971a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.142.125.006a1.143 1.143 0 1 1-.125-.006Zm11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-22.857 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm17.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM136 125.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-13.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm18.857-2.286a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-37.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm13.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm18.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-28 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm17.715-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-4.571a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.428 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.143 1.142a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-9.143 0a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm30.286-3.429a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM124 109.543a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.858-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-11.428-3.429a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM124 99.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM49.143 55.829a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-9.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM52 52.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-19.429-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-1.142a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-13.143 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM64 44.4a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.125.007a1.143 1.143 0 1 1-.125-.007Zm11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.858 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM30.286 44.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM44 43.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM72 38.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-28 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm5.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM56 37.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM60.57 32.97a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM44 34.114a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm30.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-15.429 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.857-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-11.429-3.428a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM41.714 20.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Z",
  fill: "#003CFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-empty-c)"
})), React$1.createElement("path", {
  d: "M295.213 319.24c.744.546.745 1.433.002 1.98l-11.806 8.81c-1.069.799-3.326.474-4.853-.609l-35.622-25.241c-33.375 17.037-79.545 14.615-109.28-7.271-33.443-24.615-33.443-64.521 0-89.133 33.443-24.616 87.657-24.616 121.1 0 31.706 23.336 33.35 60.42 4.931 85.185-.543.473 35.528 26.278 35.528 26.278ZM148.06 220.015c-25.44 17.853-25.44 46.8 0 64.652 25.44 17.85 66.689 17.85 92.129 0 25.436-17.853 25.436-46.799 0-64.652-25.44-17.853-66.688-17.853-92.129 0Z",
  fill: "#5D96FE"
}), React$1.createElement("path", {
  d: "M123.514 233.021c2.185-5.241 5.67-9.735 10.453-13.482M264.967 271.54c-2.185 5.24-5.67 9.734-10.453 13.481",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), React$1.createElement("path", {
  d: "M81.143 252.571c7.574 0 13.714 23.88 13.714 31.649 0 6.97-4.942 12.755-11.429 13.871v11.672c0 1.235-.767 2.237-1.713 2.237-.904 0-1.644-.912-1.71-2.07l-.005-.167v-11.526c-7.04-.595-12.571-6.644-12.571-14.017 0-7.024 5.02-27.222 11.581-31.027l.096-.053c.027-.016.055-.03.082-.045l.067-.035.066-.033.1-.05.094-.041a3.34 3.34 0 0 1 .224-.093l.11-.042.097-.032c.038-.013.077-.025.115-.036l.053-.016.053-.014a3.351 3.351 0 0 1 .23-.055l.085-.016a3.95 3.95 0 0 1 .441-.054l.11-.005.11-.002Z",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), React$1.createElement("g", {
  transform: "translate(283.429 177.143)",
  fillRule: "nonzero"
}, React$1.createElement("path", {
  d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.49 0-2.707-1.46-2.79-3.301l-.004-.2-.001-19.018C8.659 71.92.13 62.518.13 51.123.13 40.071 8.154 8.49 18.694 2.015l.054-.031a5.94 5.94 0 0 1 .214-.128l.088-.048c.213-.12.427-.228.642-.326l.135-.06.18-.075.135-.053a5.796 5.796 0 0 1 .464-.16 4.44 4.44 0 0 1 .33-.092l.124-.03a7.122 7.122 0 0 1 .31-.065l.018-.003a6.305 6.305 0 0 1 .756-.088l.165-.007.166-.002Z",
  fill: "#FFCD6B"
}), React$1.createElement("path", {
  d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.543 0-2.794-1.566-2.794-3.5V73.295C8.659 71.921.13 62.518.13 51.123.13 38.783 10.134.847 22.475.847Z",
  fill: "#FFCD6B"
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 26.4,
  cy: 56.869,
  r: 1.45
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 39.453,
  cy: 58.319,
  r: 1
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 17.698,
  cy: 63.637,
  r: 2.417
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 38.002,
  cy: 51.068,
  r: 2.417
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 18.665,
  cy: 17.228,
  r: 2.417
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 32.201,
  cy: 13.36,
  r: 2.417
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 26.83,
  cy: 20.666,
  r: 1.45
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 38.969,
  cy: 31.731,
  r: 2.417
}), React$1.createElement("circle", {
  fill: "#FFB400",
  cx: 25.433,
  cy: 29.797,
  r: 1.45
}), React$1.createElement("path", {
  d: "M34.197 53.033c0 9.825-6.934 18.017-16.172 19.987a22.44 22.44 0 0 0 4.45.448c12.34 0 22.344-10.004 22.344-22.345C44.82 38.783 34.815.847 22.475.847c8.947 14.03 11.722 40.891 11.722 52.186Z",
  fill: "#FBBE47"
}))));
const busyImage = React$1.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, React$1.createElement("defs", null, React$1.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-busy-a"
}, React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), React$1.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), React$1.createElement("circle", {
  id: "error-block-image-busy-b",
  cx: 34.857,
  cy: 34.857,
  r: 34.857
})), React$1.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React$1.createElement("path", {
  d: "M157.964 243.667H0L3.806 99.134a4.572 4.572 0 0 1 4.353-4.446l.217-.005h45.588V67.205a4.572 4.572 0 0 1 4.356-4.566l.216-.005 65.498-.001 2.554-58.688a4.571 4.571 0 0 1 4.779-4.368l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.213 3.146 69.652 74.976-17.906a4.571 4.571 0 0 1 5.628 4.23l.005.216v43.955h56.162v130.265l-56.163-.001v.002h-82.383v-.004h-66.919v1.098Zm-68.461-84.631h-9.968v8.435h9.968v-8.435Zm0-14.508h-9.968v8.436h9.968v-8.436Zm197.985-5.149h-9.967v8.432h9.967v-8.432Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.435h9.967v-8.435Zm-84.643-3.29h-30.8v8.435h30.8v-8.435Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
  transform: "translate(18.286 51.286)",
  fill: "url(#error-block-image-busy-a)"
}), React$1.createElement("path", {
  d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l.958-.01c-.376 7.363 3.679 59.93 34.894 62.659 4.203.367 7.432.39 7.475 4.609.042 4.218-3.176 4.307-7.37 4.76-34.593 3.737-34.136 56.004-33.61 63.357l-.957.01c-5.276.053-9.51 4.373-9.455 9.649.053 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.054 9.508-4.374 9.455-9.648-.055-5.276-4.374-9.51-9.65-9.455l-.958.01c.377-7.363-.729-59.672-34.894-62.66-4.202-.367-7.432-.39-7.474-4.608-.043-4.219 3.175-4.308 7.369-4.76 31.276-3.377 34.136-56.004 33.61-63.357l.958-.01c5.276-.053 9.508-4.373 9.455-9.649-.055-5.276-4.374-9.509-9.65-9.454Z",
  fill: "#377EFF"
}), React$1.createElement("path", {
  d: "M233.524 314.422c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.894-5.644c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.149 17.865c.108.684.773 1.147 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm-2.144-8.182c.109.684.773 1.148 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-1.586-4.694c.108.684.772 1.148 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.013-5.88c.109.685.773 1.148 1.484 1.036.71-.113 1.2-.759 1.09-1.443-.107-.684-.772-1.148-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm.236 15.575c.108.685.772 1.148 1.483 1.035.71-.112 1.2-.758 1.09-1.442-.107-.685-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.442Zm-.4 4.494c.108.684.772 1.147 1.483 1.035.71-.113 1.2-.759 1.091-1.443-.108-.684-.773-1.148-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-3.88-8.601c.108.684.772 1.147 1.483 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-.524-7.186c.065.41.463.688.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-2.265-4.102c.109.684.773 1.148 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.147-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm-.545-6.518c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm2.098 23.629c.109.684.773 1.147 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.443Zm-.756-9.65c.043.274.309.46.593.414a.512.512 0 0 0 .437-.577.512.512 0 0 0-.594-.414.512.512 0 0 0-.436.577Zm-.808 20.96c.109.684.773 1.147 1.484 1.034.71-.112 1.2-.758 1.09-1.442-.108-.685-.772-1.148-1.483-1.036-.71.113-1.199.759-1.09 1.443Zm-4.691-31.966c.065.41.463.689.89.621.426-.068.72-.455.654-.866-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm2.098 23.628c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.967-12.416c.109.684.773 1.147 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm1.073 6.772c.108.685.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.036-.711.113-1.2.759-1.091 1.443Zm-.009-3.131c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.43-9.03c.065.41.463.688.89.62.426-.067.72-.454.655-.865-.065-.41-.464-.689-.89-.62-.427.067-.72.454-.655.865ZM214.5 333.38c.108.685.772 1.148 1.483 1.036.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.711.112-1.2.758-1.091 1.442Zm-.156-7.178c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm-1.871-4.72c.108.684.773 1.147 1.483 1.034.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.035-.71.112-1.2.758-1.091 1.442Zm-1.614-6.857c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-.894-5.644c.065.41.464.689.89.621.427-.067.72-.455.655-.866-.065-.41-.463-.688-.89-.62-.427.067-.72.455-.655.865Zm-1.43-9.03c.065.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.958 14.225c.065.41.463.689.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-.703 12.81c.065.41.464.688.89.62.427-.067.72-.455.655-.865-.065-.41-.463-.689-.89-.621-.427.067-.72.455-.655.866Zm-4.543-22.536c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm2.806 30.138c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm-5.694-17.996c.065.41.463.688.89.62.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.866Zm-2.935-13.343c.066.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.463-.689-.89-.621-.426.068-.72.455-.655.866Z",
  fill: "#003CFF",
  fillRule: "nonzero"
}), React$1.createElement("path", {
  d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l101.963-1.04c5.276-.052 9.508-4.372 9.455-9.648-.055-5.276-4.374-9.509-9.65-9.454ZM252.64 331.241l-101.964 1.038c-5.275.054-9.508 4.374-9.454 9.65.054 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.053 9.507-4.373 9.454-9.649-.054-5.275-4.374-9.508-9.649-9.454Z",
  fill: "#7EACFF"
}), React$1.createElement("path", {
  stroke: "#003CFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "m196.824 197.298 52.216-.506M193.329 330.5h52.215"
}), React$1.createElement("path", {
  d: "M167.367 228.041c-4.091-10.787-6.086-20.934-5.985-30.44",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), React$1.createElement("circle", {
  cx: 14.857,
  cy: 14.857,
  r: 14.857,
  transform: "translate(106.857 248.571)",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), React$1.createElement("g", {
  transform: "translate(236.571 284.571)"
}, React$1.createElement("mask", {
  id: "error-block-image-busy-c",
  fill: "#fff"
}, React$1.createElement("use", {
  xlinkHref: "#error-block-image-busy-b"
})), React$1.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-busy-b"
}), React$1.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-busy-c)",
  cx: 25.714,
  cy: 28,
  r: 34.857
}), React$1.createElement("circle", {
  fill: "#FFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-busy-c)",
  cx: 22.286,
  cy: 18.857,
  r: 3.429
}))));
const imageRecord = {
  "default": defaultImage,
  "disconnected": disconnectedImage,
  "empty": emptyImage,
  "busy": busyImage
};
const classPrefix$M = `adm-error-block`;
const defaultProps$B = {
  status: "default"
};
const ErrorBlock = (p) => {
  const props = mergeProps(defaultProps$B, p);
  const {
    locale
  } = useConfig();
  const contentPack = locale.ErrorBlock[props.status];
  const des = "description" in props ? props.description : contentPack.description;
  const title = "title" in props ? props.title : contentPack.title;
  let imageNode = imageRecord[props.status];
  if (props.image) {
    if (typeof props.image === "string") {
      imageNode = React$1.createElement("img", {
        src: props.image,
        alt: "error block image"
      });
    } else {
      imageNode = props.image;
    }
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$M, {
      [`${classPrefix$M}-full-page`]: props.fullPage
    })
  }, React$1.createElement("div", {
    className: `${classPrefix$M}-image`
  }, imageNode), React$1.createElement("div", {
    className: `${classPrefix$M}-description`
  }, title && React$1.createElement("div", {
    className: `${classPrefix$M}-description-title`
  }, title), des && React$1.createElement("div", {
    className: `${classPrefix$M}-description-subtitle`
  }, des)), props.children && React$1.createElement("div", {
    className: `${classPrefix$M}-content`
  }, props.children)));
};
var floatingBubble = "";
const classPrefix$L = `adm-floating-bubble`;
const defaultProps$A = {
  axis: "y"
};
const FloatingBubble = (p) => {
  const props = mergeProps(defaultProps$A, p);
  const boundaryRef = useRef(null);
  const buttonRef = useRef(null);
  const [{
    x,
    y: y2,
    opacity
  }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: 1
  }));
  const bind = useDrag((state) => {
    let nextX = state.offset[0];
    let nextY = state.offset[1];
    if (state.last && props.magnetic) {
      const boundary = boundaryRef.current;
      const button2 = buttonRef.current;
      if (!boundary || !button2)
        return;
      const boundaryRect = boundary.getBoundingClientRect();
      const buttonRect = button2.getBoundingClientRect();
      if (props.magnetic === "x") {
        const compensation = x.goal - x.get();
        const leftDistance = buttonRect.left + compensation - boundaryRect.left;
        const rightDistance = boundaryRect.right - (buttonRect.right + compensation);
        if (rightDistance <= leftDistance) {
          nextX += rightDistance;
        } else {
          nextX -= leftDistance;
        }
      } else if (props.magnetic === "y") {
        const compensation = y2.goal - y2.get();
        const topDistance = buttonRect.top + compensation - boundaryRect.top;
        const bottomDistance = boundaryRect.bottom - (buttonRect.bottom + compensation);
        if (bottomDistance <= topDistance) {
          nextY += bottomDistance;
        } else {
          nextY -= topDistance;
        }
      }
    }
    api.start({
      x: nextX,
      y: nextY
    });
    api.start({
      opacity: state.active ? 0.8 : 1
    });
  }, {
    axis: props.axis === "xy" ? void 0 : props.axis,
    pointer: {
      touch: true
    },
    filterTaps: true,
    bounds: boundaryRef,
    from: () => [x.get(), y2.get()]
  });
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$L
  }, React$1.createElement("div", {
    className: `${classPrefix$L}-boundary-outer`
  }, React$1.createElement("div", {
    className: `${classPrefix$L}-boundary`,
    ref: boundaryRef
  })), React$1.createElement(animated.div, Object.assign({}, bind(), {
    style: {
      opacity,
      transform: to([x, y2], (x2, y3) => `translate(${x2}px, ${y3}px)`)
    },
    onClick: props.onClick,
    className: `${classPrefix$L}-button`,
    ref: buttonRef
  }), props.children)));
};
var floatingPanel = "";
function nearest(arr, target) {
  return arr.reduce((pre, cur) => {
    return Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur;
  });
}
const defaultProps$z = {
  handleDraggingOfContent: true
};
const FloatingPanel = forwardRef((p, ref) => {
  var _a, _b;
  const props = mergeProps(defaultProps$z, p);
  const {
    anchors,
    headerChildren,
    onIndexDragEndChange
  } = props;
  const maxHeight = (_a = anchors[anchors.length - 1]) !== null && _a !== void 0 ? _a : window.innerHeight;
  const possibles = anchors.map((x) => -x);
  const elementRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [pulling, setPulling] = useState(false);
  const pullingRef = useRef(false);
  const bounds = {
    top: possibles[possibles.length - 1],
    bottom: possibles[0]
  };
  const onHeightChange = useMemoizedFn((_b = props.onHeightChange) !== null && _b !== void 0 ? _b : () => {
  });
  const [{
    y: y2
  }, api] = useSpring(() => ({
    y: bounds.bottom,
    config: {
      tension: 300
    },
    onChange: (result2) => {
      onHeightChange(result2.value.y, y2.isAnimating);
    }
  }));
  useDrag((state) => {
    const [, offsetY] = state.offset;
    if (state.first) {
      const target = state.event.target;
      const header = headerRef.current;
      if (header === target || (header === null || header === void 0 ? void 0 : header.contains(target))) {
        pullingRef.current = true;
      } else {
        if (!props.handleDraggingOfContent)
          return;
        const reachedTop = y2.goal <= bounds.top;
        const content = contentRef.current;
        if (!content)
          return;
        if (reachedTop) {
          if (content.scrollTop <= 0 && state.direction[1] > 0) {
            pullingRef.current = true;
          }
        } else {
          pullingRef.current = true;
        }
      }
    }
    setPulling(pullingRef.current);
    if (!pullingRef.current)
      return;
    const {
      event
    } = state;
    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();
    let nextY = offsetY;
    if (state.last) {
      pullingRef.current = false;
      setPulling(false);
      nextY = nearest(possibles, offsetY);
      onIndexDragEndChange === null || onIndexDragEndChange === void 0 ? void 0 : onIndexDragEndChange(possibles.indexOf(nextY));
    }
    api.start({
      y: nextY
    });
  }, {
    axis: "y",
    bounds,
    rubberband: true,
    from: () => [0, y2.get()],
    pointer: {
      touch: true
    },
    target: elementRef,
    eventOptions: supportsPassive ? {
      passive: false
    } : false
  });
  useImperativeHandle(ref, () => ({
    setHeight: (height, options) => {
      api.start({
        y: -height,
        immediate: options === null || options === void 0 ? void 0 : options.immediate
      });
    }
  }), [api]);
  useLockScroll(elementRef, true);
  return withNativeProps(props, React$1.createElement(animated.div, {
    ref: elementRef,
    className: "adm-floating-panel",
    style: {
      height: maxHeight,
      translateY: y2.to((y3) => `calc(100% + (${y3}px))`)
    }
  }, React$1.createElement("div", {
    className: "adm-floating-panel-mask",
    style: {
      display: pulling ? "block" : "none"
    }
  }), React$1.createElement("div", {
    className: "adm-floating-panel-header",
    ref: headerRef
  }, headerChildren || React$1.createElement("div", {
    className: "adm-floating-panel-bar"
  })), React$1.createElement("div", {
    className: "adm-floating-panel-content",
    ref: contentRef
  }, props.children)));
});
var index$9 = "";
const defaultFormContext = {
  name: void 0,
  hasFeedback: true,
  layout: "vertical",
  requiredMarkStyle: "asterisk"
};
const FormContext = React$1.createContext(defaultFormContext);
const NoStyleItemContext = React$1.createContext(null);
const Header = () => null;
const FormArray = (props) => {
  return React$1.createElement(List$2, {
    name: props.name,
    initialValue: props.initialValue
  }, (rcFields, operation) => {
    const fields = rcFields.map((field) => ({
      index: field.name,
      key: field.key
    }));
    const children = props.children(fields, operation).map((child, index2) => {
      var _a;
      return React$1.createElement(List, {
        key: fields[index2].key,
        mode: "card",
        header: (_a = props.renderHeader) === null || _a === void 0 ? void 0 : _a.call(props, fields[index2], operation)
      }, child);
    });
    if (props.renderAdd) {
      children.push(React$1.createElement(List, {
        key: "add",
        mode: "card"
      }, React$1.createElement(List.Item, {
        className: "adm-form-list-operation",
        onClick: () => {
          props.onAdd ? props.onAdd(operation) : operation.add();
        },
        arrow: false
      }, props.renderAdd())));
    }
    return React$1.createElement(React$1.Fragment, null, children);
  });
};
const classPrefix$K = "adm-form";
const defaultProps$y = defaultFormContext;
const Form$1 = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$y, p);
  const {
    className,
    style,
    hasFeedback,
    children,
    layout,
    footer,
    mode,
    requiredMarkStyle
  } = props, formProps = __rest(props, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "requiredMarkStyle"]);
  const {
    locale
  } = useConfig();
  const validateMessages = useMemo(() => merge_1({}, locale.Form.defaultValidateMessages, formProps.validateMessages), [locale.Form.defaultValidateMessages, formProps.validateMessages]);
  const lists = [];
  let currentHeader = null;
  let items = [];
  let count = 0;
  function collect() {
    if (items.length === 0)
      return;
    count += 1;
    lists.push(React$1.createElement(List, {
      header: currentHeader,
      key: count,
      mode
    }, items));
    items = [];
  }
  traverseReactNode(props.children, (child) => {
    if (React$1.isValidElement(child)) {
      if (child.type === Header) {
        collect();
        currentHeader = child.props.children;
        return;
      }
      if (child.type === FormArray) {
        collect();
        lists.push(child);
        return;
      }
    }
    items.push(child);
  });
  collect();
  return React$1.createElement(RcForm, Object.assign({
    className: classNames(classPrefix$K, className),
    style,
    ref
  }, formProps, {
    validateMessages
  }), React$1.createElement(FormContext.Provider, {
    value: {
      name: formProps.name,
      hasFeedback,
      layout,
      requiredMarkStyle
    }
  }, lists), footer && React$1.createElement("div", {
    className: `${classPrefix$K}-footer`
  }, footer));
});
var FieldContext = {};
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module.exports = _interopRequireDefault2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(interopRequireDefault);
var interopRequireWildcard = { exports: {} };
var _typeof = { exports: {} };
(function(module) {
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }
    return _typeof2(obj);
  }
  module.exports = _typeof2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(_typeof);
(function(module) {
  var _typeof$1 = _typeof.exports["default"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard2(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || _typeof$1(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  module.exports = _interopRequireWildcard2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(interopRequireWildcard);
var warning$1 = {};
Object.defineProperty(warning$1, "__esModule", {
  value: true
});
warning$1.warning = warning;
warning$1.note = note;
warning$1.resetWarned = resetWarned;
warning$1.call = call;
warning$1.warningOnce = warningOnce;
warning$1.noteOnce = noteOnce;
warning$1.default = void 0;
var warned = {};
function warning(valid, message) {
}
function note(valid, message) {
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
var _default$1 = warningOnce;
warning$1.default = _default$1;
var _interopRequireDefault = interopRequireDefault.exports;
var _interopRequireWildcard = interopRequireWildcard.exports;
Object.defineProperty(FieldContext, "__esModule", {
  value: true
});
var default_1 = FieldContext.default = FieldContext.HOOK_MARK = void 0;
var React = _interopRequireWildcard(React$1);
var _warning = _interopRequireDefault(warning$1);
var HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";
FieldContext.HOOK_MARK = HOOK_MARK;
var warningFunc = function warningFunc2() {
  (0, _warning.default)(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
};
var Context = /* @__PURE__ */ React.createContext({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  getFieldError: warningFunc,
  getFieldWarning: warningFunc,
  getFieldsError: warningFunc,
  isFieldsTouched: warningFunc,
  isFieldTouched: warningFunc,
  isFieldValidating: warningFunc,
  isFieldsValidating: warningFunc,
  resetFields: warningFunc,
  setFields: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  submit: warningFunc,
  getInternalHooks: function getInternalHooks() {
    warningFunc();
    return {
      dispatch: warningFunc,
      initEntityValue: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      setCallbacks: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc,
      setPreserve: warningFunc,
      getInitialValue: warningFunc
    };
  }
});
var _default = Context;
default_1 = FieldContext.default = _default;
function toArray(candidate) {
  if (candidate === void 0 || candidate === false)
    return [];
  return Array.isArray(candidate) ? candidate : [candidate];
}
var popover = "";
var popoverMenu = "";
const Arrow = memo((props) => {
  return withNativeProps(props, React$1.createElement("svg", {
    viewBox: "0 0 30 16"
  }, React$1.createElement("g", {
    fill: "currentColor"
  }, React$1.createElement("path", {
    d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
  }))));
});
class Wrapper extends React$1.Component {
  constructor() {
    super(...arguments);
    this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const node = reactDom.exports.findDOMNode(this);
    if (node instanceof Element) {
      this.element = node;
    } else {
      this.element = null;
    }
  }
  render() {
    return React$1.Children.only(this.props.children);
  }
}
const record = {
  "topLeft": "top-start",
  "topRight": "top-end",
  "bottomLeft": "bottom-start",
  "bottomRight": "bottom-end",
  "leftTop": "left-start",
  "leftBottom": "left-end",
  "rightTop": "right-start",
  "rightBottom": "right-end"
};
function normalizePlacement(placement) {
  var _a;
  return (_a = record[placement]) !== null && _a !== void 0 ? _a : placement;
}
let tenPxTester = null;
let tester = null;
if (canUseDom) {
  tenPxTester = document.createElement("div");
  tenPxTester.className = "adm-px-tester";
  tenPxTester.style.setProperty("--size", "10");
  document.body.appendChild(tenPxTester);
  tester = document.createElement("div");
  tester.className = "adm-px-tester";
  document.body.appendChild(tester);
}
function convertPx(px) {
  if (tenPxTester === null || tester === null)
    return px;
  if (tenPxTester.getBoundingClientRect().height === 10) {
    return px;
  }
  tester.style.setProperty("--size", px.toString());
  return tester.getBoundingClientRect().height;
}
const classPrefix$J = `adm-popover`;
const defaultProps$x = {
  placement: "top",
  defaultVisible: false,
  stopPropagation: ["click"],
  getContainer: () => document.body
};
const Popover$1 = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$x, p);
  const {
    mode = "light"
  } = props;
  const placement = normalizePlacement(props.placement);
  const [visible, setVisible] = usePropsValue({
    value: props.visible,
    defaultValue: props.defaultVisible,
    onChange: props.onVisibleChange
  });
  useImperativeHandle(ref, () => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      visible
    };
  }, [visible]);
  const targetRef = useRef(null);
  const floatingRef = useRef(null);
  const arrowRef = useRef(null);
  const floating = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$J, `${classPrefix$J}-${mode}`, !visible && `${classPrefix$J}-hidden`),
    ref: floatingRef
  }, React$1.createElement("div", {
    className: `${classPrefix$J}-arrow`,
    ref: arrowRef
  }, React$1.createElement(Arrow, {
    className: `${classPrefix$J}-arrow-icon`
  })), React$1.createElement("div", {
    className: `${classPrefix$J}-inner`
  }, React$1.createElement("div", {
    className: `${classPrefix$J}-inner-content`
  }, props.content)))));
  const [targetElement, setTargetElement] = useState(null);
  function update() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
      const target = (_b = (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : null;
      const floating2 = floatingRef.current;
      const arrowElement = arrowRef.current;
      setTargetElement(target);
      if (!target || !floating2 || !arrowElement)
        return;
      const {
        x,
        y: y2,
        placement: realPlacement,
        middlewareData
      } = yield computePosition(target, floating2, {
        placement,
        middleware: [offset(convertPx(12)), shift({
          padding: convertPx(4),
          crossAxis: false,
          limiter: limitShift()
        }), flip(), hide(), arrow({
          element: arrowElement,
          padding: convertPx(12)
        })]
      });
      Object.assign(floating2.style, {
        left: `${x}px`,
        top: `${y2}px`
      });
      const side = realPlacement.split("-")[0];
      const arrowSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[side];
      const {
        x: arrowX,
        y: arrowY
      } = (_c = middlewareData.arrow) !== null && _c !== void 0 ? _c : {};
      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [arrowSide]: `-${convertPx(8)}px`
      });
      const arrowRotate = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[side];
      arrowElement.style.setProperty("--arrow-icon-rotate", arrowRotate);
    });
  }
  useIsomorphicLayoutEffect(() => {
    update();
  });
  useEffect(() => {
    if (!targetElement)
      return;
    if (!props.trigger)
      return;
    function handleClick() {
      setVisible((v) => !v);
    }
    targetElement.addEventListener("click", handleClick);
    return () => {
      targetElement.removeEventListener("click", handleClick);
    };
  }, [targetElement, props.trigger]);
  useEffect(() => {
    const floatingElement = floatingRef.current;
    if (!targetElement || !floatingElement)
      return;
    return autoUpdate(targetElement, floatingElement, update);
  }, [targetElement]);
  useClickAway(() => {
    if (!props.trigger)
      return;
    setVisible(false);
  }, () => {
    var _a;
    return (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.element;
  });
  const shouldRender = useShouldRender(visible, false, props.destroyOnHide);
  return React$1.createElement(React$1.Fragment, null, React$1.createElement(Wrapper, {
    ref: targetRef
  }, props.children), shouldRender && renderToContainer(props.getContainer, floating));
});
const classPrefix$I = `adm-popover-menu`;
const PopoverMenu = forwardRef((props, ref) => {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current, []);
  const onClick = useCallback((e) => {
    var _a;
    const {
      onAction
    } = props;
    if (onAction) {
      onAction(e);
    }
    (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.hide();
  }, [props.onAction]);
  const overlay = useMemo(() => {
    return React$1.createElement("div", {
      className: `${classPrefix$I}-list`
    }, React$1.createElement("div", {
      className: `${classPrefix$I}-list-inner`
    }, props.actions.map((action, index2) => {
      var _a;
      return React$1.createElement("a", {
        key: (_a = action.key) !== null && _a !== void 0 ? _a : index2,
        className: classNames(`${classPrefix$I}-item`, "adm-plain-anchor", action.disabled && `${classPrefix$I}-item-disabled`),
        onClick: () => {
          var _a2;
          if (action.disabled)
            return;
          onClick(action);
          (_a2 = action.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(action);
        }
      }, action.icon && React$1.createElement("div", {
        className: `${classPrefix$I}-item-icon`
      }, action.icon), React$1.createElement("div", {
        className: `${classPrefix$I}-item-text`
      }, action.text));
    })));
  }, [props.actions, onClick]);
  return React$1.createElement(Popover$1, Object.assign({
    ref: innerRef
  }, props, {
    className: classNames(classPrefix$I, props.className),
    content: overlay
  }), props.children);
});
var Popover = attachPropertiesToComponent(Popover$1, {
  Menu: PopoverMenu
});
function undefinedFallback(...items) {
  let i;
  for (i = 0; i < items.length; i++) {
    if (items[i] !== void 0)
      break;
  }
  return items[i];
}
const NAME_SPLIT = "__SPLIT__";
const classPrefix$H = `adm-form-item`;
const MemoInput = React$1.memo(({
  children
}) => children, (prev, next) => prev.value === next.value && prev.update === next.update);
const FormItemLayout = (props) => {
  const {
    className,
    style,
    extra,
    label,
    help,
    required,
    disabled,
    children,
    htmlFor,
    hidden,
    arrow: arrow2,
    childElementPosition = "normal"
  } = props;
  const context = useContext(FormContext);
  const {
    locale
  } = useConfig();
  const hasFeedback = props.hasFeedback !== void 0 ? props.hasFeedback : context.hasFeedback;
  const layout = props.layout || context.layout;
  const requiredMark = (() => {
    const {
      requiredMarkStyle
    } = context;
    switch (requiredMarkStyle) {
      case "asterisk":
        return required && React$1.createElement("span", {
          className: `${classPrefix$H}-required-asterisk`
        }, "*");
      case "text-required":
        return required && React$1.createElement("span", {
          className: `${classPrefix$H}-required-text`
        }, "(", locale.Form.required, ")");
      case "text-optional":
        return !required && React$1.createElement("span", {
          className: `${classPrefix$H}-required-text`
        }, "(", locale.Form.optional, ")");
      default:
        return null;
    }
  })();
  const labelElement = label ? React$1.createElement("label", {
    className: `${classPrefix$H}-label`,
    htmlFor
  }, label, requiredMark, help && React$1.createElement(Popover, {
    content: help,
    mode: "dark",
    trigger: "click"
  }, React$1.createElement("span", {
    className: `${classPrefix$H}-label-help`,
    onClick: (e) => {
      e.preventDefault();
    }
  }, React$1.createElement(QuestionCircleOutline, null)))) : null;
  const description = React$1.createElement(React$1.Fragment, null, props.description, hasFeedback && React$1.createElement(React$1.Fragment, null, props.errors.map((error, index2) => React$1.createElement("div", {
    key: `error-${index2}`,
    className: `${classPrefix$H}-feedback-error`
  }, error)), props.warnings.map((warning2, index2) => React$1.createElement("div", {
    key: `warning-${index2}`,
    className: `${classPrefix$H}-feedback-warning`
  }, warning2))));
  return React$1.createElement(List.Item, {
    style,
    title: layout === "vertical" && labelElement,
    prefix: layout === "horizontal" && labelElement,
    extra,
    description,
    className: classNames(classPrefix$H, className, `${classPrefix$H}-${layout}`, {
      [`${classPrefix$H}-hidden`]: hidden,
      [`${classPrefix$H}-has-error`]: props.errors.length
    }),
    disabled,
    onClick: props.onClick,
    clickable: props.clickable,
    arrow: arrow2
  }, React$1.createElement("div", {
    className: classNames(`${classPrefix$H}-child`, `${classPrefix$H}-child-position-${childElementPosition}`)
  }, React$1.createElement("div", {
    className: classNames(`${classPrefix$H}-child-inner`)
  }, children)));
};
const FormItem = (props) => {
  const {
    className,
    style,
    label,
    help,
    extra,
    hasFeedback,
    name,
    required,
    noStyle,
    hidden,
    layout,
    childElementPosition,
    description,
    disabled,
    rules,
    children,
    messageVariables,
    trigger = "onChange",
    validateTrigger = trigger,
    onClick,
    shouldUpdate,
    dependencies,
    clickable,
    arrow: arrow2
  } = props, fieldProps = __rest(props, ["className", "style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]);
  const {
    name: formName
  } = useContext(FormContext);
  const {
    validateTrigger: contextValidateTrigger
  } = useContext(default_1);
  const mergedValidateTrigger = undefinedFallback(validateTrigger, contextValidateTrigger, trigger);
  const updateRef = React$1.useRef(0);
  updateRef.current += 1;
  const [subMetas, setSubMetas] = useState({});
  const onSubMetaChange = useCallback((subMeta, namePath) => {
    setSubMetas((prevSubMetas) => {
      const nextSubMetas = Object.assign({}, prevSubMetas);
      const nameKey = namePath.join(NAME_SPLIT);
      if (subMeta.destroy) {
        delete nextSubMetas[nameKey];
      } else {
        nextSubMetas[nameKey] = subMeta;
      }
      return nextSubMetas;
    });
  }, [setSubMetas]);
  function renderLayout(baseChildren, fieldId, meta, isRequired) {
    var _a, _b;
    if (noStyle && !hidden) {
      return baseChildren;
    }
    const curErrors = (_a = meta === null || meta === void 0 ? void 0 : meta.errors) !== null && _a !== void 0 ? _a : [];
    const errors = Object.keys(subMetas).reduce((subErrors, key) => {
      var _a2, _b2;
      const errors2 = (_b2 = (_a2 = subMetas[key]) === null || _a2 === void 0 ? void 0 : _a2.errors) !== null && _b2 !== void 0 ? _b2 : [];
      if (errors2.length) {
        subErrors = [...subErrors, ...errors2];
      }
      return subErrors;
    }, curErrors);
    const curWarnings = (_b = meta === null || meta === void 0 ? void 0 : meta.warnings) !== null && _b !== void 0 ? _b : [];
    const warnings = Object.keys(subMetas).reduce((subWarnings, key) => {
      var _a2, _b2;
      const warnings2 = (_b2 = (_a2 = subMetas[key]) === null || _a2 === void 0 ? void 0 : _a2.warnings) !== null && _b2 !== void 0 ? _b2 : [];
      if (warnings2.length) {
        subWarnings = [...subWarnings, ...warnings2];
      }
      return subWarnings;
    }, curWarnings);
    return React$1.createElement(FormItemLayout, {
      className,
      style,
      label,
      extra,
      help,
      description,
      required: isRequired,
      disabled,
      hasFeedback,
      htmlFor: fieldId,
      errors,
      warnings,
      onClick,
      hidden,
      layout,
      childElementPosition,
      clickable,
      arrow: arrow2
    }, React$1.createElement(NoStyleItemContext.Provider, {
      value: onSubMetaChange
    }, baseChildren));
  }
  const isRenderProps = typeof children === "function";
  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children);
  }
  let Variables = {};
  if (typeof label === "string") {
    Variables.label = label;
  }
  if (messageVariables) {
    Variables = Object.assign(Object.assign({}, Variables), messageVariables);
  }
  const notifyParentMetaChange = useContext(NoStyleItemContext);
  const onMetaChange = (meta) => {
    if (noStyle && notifyParentMetaChange) {
      const namePath = meta.name;
      notifyParentMetaChange(meta, namePath);
    }
  };
  return React$1.createElement(Field, Object.assign({}, fieldProps, {
    name,
    shouldUpdate,
    dependencies,
    rules,
    trigger,
    validateTrigger: mergedValidateTrigger,
    onMetaChange,
    messageVariables: Variables
  }), (control, meta, context) => {
    let childNode = null;
    const isRequired = required !== void 0 ? required : rules && rules.some((rule) => !!(rule && typeof rule === "object" && rule.required));
    const nameList = toArray(name).length && meta ? meta.name : [];
    const fieldId = (nameList.length > 0 && formName ? [formName, ...nameList] : nameList).join("_");
    if (isRenderProps) {
      if ((shouldUpdate || dependencies) && !name) {
        childNode = children(context);
      }
    } else if (dependencies && !name)
      ;
    else if (React$1.isValidElement(children)) {
      if (children.props.defaultValue)
        ;
      const childProps = Object.assign(Object.assign({}, children.props), control);
      if (!childProps.id) {
        childProps.id = fieldId;
      }
      const triggers = /* @__PURE__ */ new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);
      triggers.forEach((eventName) => {
        childProps[eventName] = (...args) => {
          var _a, _b, _c;
          (_a = control[eventName]) === null || _a === void 0 ? void 0 : _a.call(control, ...args);
          (_c = (_b = children.props)[eventName]) === null || _c === void 0 ? void 0 : _c.call(_b, ...args);
        };
      });
      childNode = React$1.createElement(MemoInput, {
        value: control[props.valuePropName || "value"],
        update: updateRef.current
      }, React$1.cloneElement(children, childProps));
    } else {
      childNode = children;
    }
    return renderLayout(childNode, fieldId, meta, isRequired);
  });
};
const FormSubscribe = ({
  children,
  to: to2
}) => {
  return React$1.createElement(Form.Item, {
    noStyle: true,
    dependencies: to2
  }, (form) => {
    const changedValues = form.getFieldsValue(to2);
    return children(changedValues, form);
  });
};
var Form = attachPropertiesToComponent(Form$1, {
  Item: FormItem,
  Subscribe: FormSubscribe,
  Header,
  Array: FormArray,
  useForm
});
var grid = "";
const classPrefix$G = `adm-grid`;
const Grid$1 = (props) => {
  const style = {
    "--columns": props.columns.toString()
  };
  const {
    gap
  } = props;
  if (gap !== void 0) {
    if (Array.isArray(gap)) {
      style["--gap-horizontal"] = toCSSLength(gap[0]);
      style["--gap-vertical"] = toCSSLength(gap[1]);
    } else {
      style["--gap"] = toCSSLength(gap);
    }
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$G,
    style
  }, props.children));
};
const GridItem = (p) => {
  const props = mergeProps({
    span: 1
  }, p);
  const itemStyle = {
    "--item-span": props.span
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: `${classPrefix$G}-item`,
    style: itemStyle,
    onClick: props.onClick
  }, props.children));
};
var Grid = attachPropertiesToComponent(Grid$1, {
  Item: GridItem
});
var imageViewer = "";
const useDragAndPinch = createUseGesture([dragAction, pinchAction]);
const classPrefix$F = `adm-image-viewer`;
const Slide = (props) => {
  const {
    dragLockRef
  } = props;
  const controlRef = useRef(null);
  const imgRef = useRef(null);
  const [{
    zoom,
    x,
    y: y2
  }, api] = useSpring(() => ({
    zoom: 1,
    x: 0,
    y: 0,
    config: {
      tension: 200
    }
  }));
  const pinchLockRef = useRef(false);
  function boundXY([x2, y3], rubberband2) {
    const currentZoom = zoom.get();
    let xOffset = 0, yOffset = 0;
    if (imgRef.current && controlRef.current) {
      xOffset = ((currentZoom * imgRef.current.width || 0) - controlRef.current.clientWidth) / 2;
      yOffset = ((currentZoom * imgRef.current.height || 0) - controlRef.current.clientHeight) / 2;
    }
    xOffset = xOffset > 0 ? xOffset : 0;
    yOffset = yOffset > 0 ? yOffset : 0;
    const bounds = {
      left: -xOffset,
      right: xOffset,
      top: -yOffset,
      bottom: yOffset
    };
    if (rubberband2) {
      return [rubberbandIfOutOfBounds(x2, bounds.left, bounds.right, currentZoom * 50), rubberbandIfOutOfBounds(y3, bounds.top, bounds.bottom, currentZoom * 50)];
    } else {
      return [bound(x2, bounds.left, bounds.right), bound(y3, bounds.top, bounds.bottom)];
    }
  }
  useDragAndPinch({
    onDrag: (state) => {
      if (state.tap && state.elapsedTime > 0 && state.elapsedTime < 1e3) {
        props.onTap();
        return;
      }
      const currentZoom = zoom.get();
      if (dragLockRef) {
        dragLockRef.current = currentZoom !== 1;
      }
      if (!pinchLockRef.current && currentZoom <= 1) {
        api.start({
          x: 0,
          y: 0
        });
      } else {
        if (state.last) {
          const [x2, y3] = boundXY([state.offset[0] + state.velocity[0] * state.direction[0] * 200, state.offset[1] + state.velocity[1] * state.direction[1] * 200], false);
          api.start({
            x: x2,
            y: y3
          });
        } else {
          const [x2, y3] = boundXY(state.offset, true);
          api.start({
            x: x2,
            y: y3,
            immediate: true
          });
        }
      }
    },
    onPinch: (state) => {
      var _a;
      pinchLockRef.current = !state.last;
      const [d] = state.offset;
      if (d < 0)
        return;
      const nextZoom = state.last ? bound(d, 1, props.maxZoom) : d;
      api.start({
        zoom: nextZoom,
        immediate: !state.last
      });
      (_a = props.onZoomChange) === null || _a === void 0 ? void 0 : _a.call(props, nextZoom);
      if (state.last && nextZoom <= 1) {
        api.start({
          x: 0,
          y: 0
        });
        if (dragLockRef) {
          dragLockRef.current = false;
        }
      } else {
        if (dragLockRef) {
          dragLockRef.current = true;
        }
      }
    }
  }, {
    target: controlRef,
    drag: {
      from: () => [x.get(), y2.get()],
      pointer: {
        touch: true
      }
    },
    pinch: {
      from: () => [zoom.get(), 0],
      pointer: {
        touch: true
      }
    }
  });
  return React$1.createElement("div", {
    className: `${classPrefix$F}-slide`,
    onPointerMove: (e) => {
      if (zoom.get() !== 1) {
        e.stopPropagation();
      }
    }
  }, React$1.createElement("div", {
    className: `${classPrefix$F}-control`,
    ref: controlRef
  }, React$1.createElement(animated.div, {
    className: `${classPrefix$F}-image-wrapper`,
    style: {
      translateX: x,
      translateY: y2,
      scale: zoom
    }
  }, React$1.createElement("img", {
    ref: imgRef,
    src: props.image,
    draggable: false,
    alt: props.image
  }))));
};
const classPrefix$E = `adm-image-viewer`;
const Slides = forwardRef((props, ref) => {
  const slideWidth = window.innerWidth + convertPx(16);
  const [{
    x
  }, api] = useSpring(() => ({
    x: props.defaultIndex * slideWidth,
    config: {
      tension: 250,
      clamp: true
    }
  }));
  const count = props.images.length;
  function swipeTo(index2, immediate = false) {
    var _a;
    const i = bound(index2, 0, count - 1);
    (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, i);
    api.start({
      x: i * slideWidth,
      immediate
    });
  }
  useImperativeHandle(ref, () => ({
    swipeTo
  }));
  const dragLockRef = useRef(false);
  const bind = useDrag((state) => {
    if (dragLockRef.current)
      return;
    const [offsetX] = state.offset;
    if (state.last) {
      const minIndex = Math.floor(offsetX / slideWidth);
      const maxIndex = minIndex + 1;
      const velocityOffset = Math.min(state.velocity[0] * 2e3, slideWidth) * state.direction[0];
      swipeTo(bound(Math.round((offsetX + velocityOffset) / slideWidth), minIndex, maxIndex));
    } else {
      api.start({
        x: offsetX,
        immediate: true
      });
    }
  }, {
    transform: ([x2, y2]) => [-x2, y2],
    from: () => [x.get(), 0],
    bounds: () => {
      return {
        left: 0,
        right: (count - 1) * slideWidth
      };
    },
    rubberband: true,
    axis: "x",
    pointer: {
      touch: true
    }
  });
  return React$1.createElement("div", Object.assign({
    className: `${classPrefix$E}-slides`
  }, bind()), React$1.createElement(animated.div, {
    className: `${classPrefix$E}-indicator`
  }, x.to((v) => {
    const index2 = bound(Math.round(v / slideWidth), 0, count - 1);
    return `${index2 + 1} / ${count}`;
  })), React$1.createElement(animated.div, {
    className: `${classPrefix$E}-slides-inner`,
    style: {
      x: x.to((x2) => -x2)
    }
  }, props.images.map((image2) => React$1.createElement(Slide, {
    key: image2,
    image: image2,
    onTap: props.onTap,
    maxZoom: props.maxZoom,
    onZoomChange: (zoom) => {
      if (zoom !== 1) {
        const index2 = Math.round(x.get() / slideWidth);
        api.start({
          x: index2 * slideWidth
        });
      }
    },
    dragLockRef
  }))));
});
const classPrefix$D = `adm-image-viewer`;
const defaultProps$w = {
  maxZoom: 3,
  getContainer: null,
  visible: false
};
const ImageViewer$1 = (p) => {
  const props = mergeProps(defaultProps$w, p);
  const node = React$1.createElement(Mask, {
    visible: props.visible,
    disableBodyScroll: false,
    opacity: "thick",
    afterClose: props.afterClose
  }, React$1.createElement("div", {
    className: `${classPrefix$D}-content`
  }, props.image && React$1.createElement(Slide, {
    image: props.image,
    onTap: () => {
      var _a;
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    },
    maxZoom: props.maxZoom
  })));
  return renderToContainer(props.getContainer, node);
};
const multiDefaultProps = Object.assign(Object.assign({}, defaultProps$w), {
  defaultIndex: 0
});
const MultiImageViewer = forwardRef((p, ref) => {
  const props = mergeProps(multiDefaultProps, p);
  const [defaultIndex, setDefaultIndex] = useState(props.defaultIndex);
  const slidesRef = useRef(null);
  useImperativeHandle(ref, () => ({
    swipeTo: (index2, immediate) => {
      var _a;
      setDefaultIndex(index2);
      (_a = slidesRef.current) === null || _a === void 0 ? void 0 : _a.swipeTo(index2, immediate);
    }
  }));
  const node = React$1.createElement(Mask, {
    visible: props.visible,
    disableBodyScroll: false,
    opacity: "thick",
    afterClose: props.afterClose
  }, React$1.createElement("div", {
    className: `${classPrefix$D}-content`
  }, props.images && React$1.createElement(Slides, {
    ref: slidesRef,
    defaultIndex,
    onIndexChange: props.onIndexChange,
    images: props.images,
    onTap: () => {
      var _a;
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    },
    maxZoom: props.maxZoom
  })));
  return renderToContainer(props.getContainer, node);
});
const handlerSet = /* @__PURE__ */ new Set();
function showImageViewer(props) {
  clearImageViewer();
  const handler = renderImperatively(React$1.createElement(ImageViewer$1, Object.assign({}, props, {
    afterClose: () => {
      var _a;
      handlerSet.delete(handler);
      (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  })));
  handlerSet.add(handler);
  return handler;
}
function showMultiImageViewer(props) {
  clearImageViewer();
  const handler = renderImperatively(React$1.createElement(MultiImageViewer, Object.assign({}, props, {
    afterClose: () => {
      var _a;
      handlerSet.delete(handler);
      (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  })));
  handlerSet.add(handler);
  return handler;
}
function clearImageViewer() {
  handlerSet.forEach((handler) => {
    handler.close();
  });
  handlerSet.clear();
}
const Multi = attachPropertiesToComponent(MultiImageViewer, {
  show: showMultiImageViewer
});
var ImageViewer = attachPropertiesToComponent(ImageViewer$1, {
  Multi,
  show: showImageViewer,
  clear: clearImageViewer
});
var spinLoading = "";
const classPrefix$C = "adm-spin-loading";
const colorRecord$2 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
};
const defaultProps$v = {
  color: "default"
};
const circumference = 15 * 3.14159265358979 * 2;
const SpinLoading = memo((p) => {
  var _a;
  const props = mergeProps(defaultProps$v, p);
  const {
    percent
  } = useSpring({
    loop: {
      reverse: true
    },
    from: {
      percent: 30
    },
    to: {
      percent: 80
    },
    config: {
      duration: 1200
    }
  });
  return withNativeProps(props, React$1.createElement(animated.div, {
    className: classPrefix$C,
    style: {
      "--color": (_a = colorRecord$2[props.color]) !== null && _a !== void 0 ? _a : props.color,
      "--percent": percent
    }
  }, React$1.createElement("svg", {
    className: `${classPrefix$C}-svg`,
    viewBox: "0 0 32 32"
  }, React$1.createElement(animated.circle, {
    className: `${classPrefix$C}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: circumference,
    strokeDashoffset: percent,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
});
const classPrefix$B = `adm-image-uploader`;
const PreviewItem = (props) => {
  const {
    locale
  } = useConfig();
  const {
    url,
    file,
    deletable,
    onDelete,
    imageFit
  } = props;
  const src = useMemo(() => {
    if (url) {
      return url;
    }
    if (file) {
      return URL.createObjectURL(file);
    }
    return "";
  }, [url, file]);
  function renderLoading() {
    return props.status === "pending" && React$1.createElement("div", {
      className: `${classPrefix$B}-cell-mask`
    }, React$1.createElement("span", {
      className: `${classPrefix$B}-cell-loading`
    }, React$1.createElement(SpinLoading, {
      color: "white"
    }), React$1.createElement("span", {
      className: `${classPrefix$B}-cell-mask-message`
    }, locale.ImageUploader.uploading)));
  }
  function renderDelete() {
    return deletable && React$1.createElement("span", {
      className: `${classPrefix$B}-cell-delete`,
      onClick: onDelete
    }, React$1.createElement(CloseOutline, {
      className: `${classPrefix$B}-cell-delete-icon`
    }));
  }
  return React$1.createElement("div", {
    className: classNames(`${classPrefix$B}-cell`, props.status === "fail" && `${classPrefix$B}-cell-fail`)
  }, React$1.createElement(Image$1, {
    className: `${classPrefix$B}-cell-image`,
    src,
    fit: imageFit,
    onClick: props.onClick
  }), renderLoading(), renderDelete());
};
var space = "";
const classPrefix$A = `adm-space`;
const defaultProps$u = {
  direction: "horizontal"
};
const Space = (p) => {
  const props = mergeProps(defaultProps$u, p);
  const {
    direction,
    onClick
  } = props;
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$A, {
      [`${classPrefix$A}-wrap`]: props.wrap,
      [`${classPrefix$A}-block`]: props.block,
      [`${classPrefix$A}-${direction}`]: true,
      [`${classPrefix$A}-align-${props.align}`]: !!props.align,
      [`${classPrefix$A}-justify-${props.justify}`]: !!props.justify
    }),
    onClick
  }, React$1.Children.map(props.children, (child) => {
    return child !== null && child !== void 0 && React$1.createElement("div", {
      className: `${classPrefix$A}-item`
    }, child);
  })));
};
const classPrefix$z = `adm-image-uploader`;
const defaultProps$t = {
  disableUpload: false,
  deletable: true,
  showUpload: true,
  multiple: false,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: true,
  showFailed: true,
  imageFit: "cover"
};
const ImageUploader = (p) => {
  const props = mergeProps(defaultProps$t, p);
  const [value, setValue] = usePropsValue(props);
  const updateValue = useMemoizedFn((updater) => {
    setValue(updater(value));
  });
  const [tasks, setTasks] = useState([]);
  useIsomorphicLayoutEffect(() => {
    setTasks((prev) => prev.filter((task) => {
      if (task.url === void 0)
        return true;
      return !value.some((fileItem) => fileItem.url === task.url);
    }));
  }, [value]);
  const idCountRef = useRef(0);
  const {
    maxCount,
    onPreview
  } = props;
  function processFile(file, fileList) {
    return __awaiter(this, void 0, void 0, function* () {
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
    return __awaiter(this, void 0, void 0, function* () {
      e.persist();
      const {
        files: rawFiles
      } = e.target;
      if (!rawFiles)
        return;
      let files = [].slice.call(rawFiles);
      if (props.beforeUpload) {
        const postFiles = files.map((file) => {
          return processFile(file, files);
        });
        yield Promise.all(postFiles).then((filesList) => {
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
      const newTasks = files.map((file) => ({
        id: idCountRef.current++,
        status: "pending",
        file
      }));
      setTasks((prev) => [...prev, ...newTasks]);
      e.target.value = "";
      yield Promise.all(newTasks.map((currentTask) => __awaiter(this, void 0, void 0, function* () {
        try {
          const result2 = yield props.upload(currentTask.file);
          setTasks((prev) => {
            return prev.map((task) => {
              if (task.id === currentTask.id) {
                return Object.assign(Object.assign({}, task), {
                  url: result2.url
                });
              }
              return task;
            });
          });
          updateValue((prev) => {
            const newVal = Object.assign({}, result2);
            return [...prev, newVal];
          });
        } catch (e2) {
          setTasks((prev) => {
            return prev.map((task) => {
              if (task.id === currentTask.id) {
                return Object.assign(Object.assign({}, task), {
                  status: "fail"
                });
              }
              return task;
            });
          });
          throw e2;
        }
      }))).catch((error) => console.error(error));
    });
  }
  const imageViewerHandlerRef = useRef(null);
  function previewImage(index2) {
    imageViewerHandlerRef.current = ImageViewer.Multi.show({
      images: value.map((fileItem) => fileItem.url),
      defaultIndex: index2,
      onClose: () => {
        imageViewerHandlerRef.current = null;
      }
    });
  }
  useUnmount(() => {
    var _a;
    (_a = imageViewerHandlerRef.current) === null || _a === void 0 ? void 0 : _a.close();
  });
  const showUpload = props.showUpload && (maxCount === 0 || value.length + tasks.length < maxCount);
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$z
  }, React$1.createElement(Space, {
    className: `${classPrefix$z}-space`,
    wrap: true,
    block: true
  }, value.map((fileItem, index2) => {
    var _a, _b;
    return React$1.createElement(PreviewItem, {
      key: (_a = fileItem.key) !== null && _a !== void 0 ? _a : index2,
      url: (_b = fileItem.thumbnailUrl) !== null && _b !== void 0 ? _b : fileItem.url,
      deletable: props.deletable,
      imageFit: props.imageFit,
      onClick: () => {
        if (props.preview) {
          previewImage(index2);
        }
        onPreview && onPreview(index2, fileItem);
      },
      onDelete: () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const canDelete = yield (_c = props.onDelete) === null || _c === void 0 ? void 0 : _c.call(props, fileItem);
        if (canDelete === false)
          return;
        setValue(value.filter((x, i) => i !== index2));
      })
    });
  }), tasks.map((task) => {
    if (!props.showFailed && task.status === "fail") {
      return null;
    }
    return React$1.createElement(PreviewItem, {
      key: task.id,
      file: task.file,
      deletable: task.status !== "pending",
      status: task.status,
      imageFit: props.imageFit,
      onDelete: () => {
        setTasks(tasks.filter((x) => x.id !== task.id));
      }
    });
  }), showUpload && React$1.createElement("div", {
    className: `${classPrefix$z}-upload-button-wrap`
  }, props.children ? props.children : React$1.createElement("span", {
    className: `${classPrefix$z}-cell ${classPrefix$z}-upload-button`,
    role: "button"
  }, React$1.createElement("span", {
    className: `${classPrefix$z}-upload-button-icon`
  }, React$1.createElement(AddOutline, null))), !props.disableUpload && React$1.createElement("input", {
    capture: props.capture,
    accept: props.accept,
    multiple: props.multiple,
    type: "file",
    className: `${classPrefix$z}-input`,
    onChange
  })))));
};
var imageUploader = "";
var indexBar = "";
const Panel = () => null;
const classPrefix$y = `adm-index-bar`;
const Sidebar = (props) => {
  const [interacting, setInteracting] = useState(false);
  return React$1.createElement("div", {
    className: classNames(`${classPrefix$y}-sidebar`, {
      [`${classPrefix$y}-sidebar-interacting`]: interacting
    }),
    onMouseDown: () => {
      setInteracting(true);
    },
    onMouseUp: () => {
      setInteracting(false);
    },
    onTouchStart: () => {
      setInteracting(true);
    },
    onTouchEnd: () => {
      setInteracting(false);
    },
    onTouchMove: (e) => {
      if (!interacting)
        return;
      const {
        clientX,
        clientY
      } = e.touches[0];
      const target = document.elementFromPoint(clientX, clientY);
      if (!target)
        return;
      const index2 = target.dataset["index"];
      if (index2) {
        props.onActive(index2);
      }
    }
  }, props.indexItems.map(({
    index: index2,
    brief
  }) => {
    const active = index2 === props.activeIndex;
    return React$1.createElement("div", {
      className: `${classPrefix$y}-sidebar-row`,
      onMouseDown: () => {
        props.onActive(index2);
      },
      onTouchStart: () => {
        props.onActive(index2);
      },
      onMouseEnter: () => {
        if (interacting) {
          props.onActive(index2);
        }
      },
      "data-index": index2,
      key: index2
    }, interacting && active && React$1.createElement("div", {
      className: `${classPrefix$y}-sidebar-bubble`
    }, brief), React$1.createElement("div", {
      className: classNames(`${classPrefix$y}-sidebar-item`, {
        [`${classPrefix$y}-sidebar-item-active`]: active
      }),
      "data-index": index2
    }, React$1.createElement("div", null, brief)));
  }));
};
const classPrefix$x = `adm-index-bar`;
const defaultProps$s = {
  sticky: true
};
const IndexBar = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$s, p);
  const titleHeight = convertPx(35);
  const bodyRef = useRef(null);
  const indexItems = [];
  const panels = [];
  traverseReactNode(props.children, (child) => {
    var _a;
    if (!React$1.isValidElement(child))
      return;
    if (child.type !== Panel) {
      return;
    }
    indexItems.push({
      index: child.props.index,
      brief: (_a = child.props.brief) !== null && _a !== void 0 ? _a : child.props.index.charAt(0)
    });
    panels.push(withNativeProps(child.props, React$1.createElement("div", {
      key: child.props.index,
      "data-index": child.props.index,
      className: `${classPrefix$x}-anchor`
    }, React$1.createElement("div", {
      className: `${classPrefix$x}-anchor-title`
    }, child.props.title || child.props.index), child.props.children)));
  });
  const [activeIndex, setActiveIndex] = useState(() => {
    const firstItem = indexItems[0];
    return firstItem ? firstItem.index : null;
  });
  useImperativeHandle(ref, () => ({
    scrollTo
  }));
  function scrollTo(index2) {
    const body = bodyRef.current;
    if (!body)
      return;
    const children = body.children;
    for (let i = 0; i < children.length; i++) {
      const panel = children.item(i);
      if (!panel)
        continue;
      const panelIndex = panel.dataset["index"];
      if (panelIndex === index2) {
        body.scrollTop = panel.offsetTop;
        setActiveIndex(index2);
        return;
      }
    }
  }
  const {
    run: checkActiveIndex
  } = useThrottleFn(() => {
    const body = bodyRef.current;
    if (!body)
      return;
    const scrollTop = body.scrollTop;
    const elements = body.getElementsByClassName(`${classPrefix$x}-anchor`);
    for (let i = 0; i < elements.length; i++) {
      const panel = elements.item(i);
      if (!panel)
        continue;
      const panelIndex = panel.dataset["index"];
      if (!panelIndex)
        continue;
      if (panel.offsetTop + panel.clientHeight - titleHeight > scrollTop) {
        setActiveIndex(panelIndex);
        return;
      }
    }
  }, {
    wait: 50,
    trailing: true,
    leading: true
  });
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(`${classPrefix$x}`, {
      [`${classPrefix$x}-sticky`]: props.sticky
    })
  }, React$1.createElement(Sidebar, {
    indexItems,
    activeIndex,
    onActive: (index2) => {
      scrollTo(index2);
    }
  }), React$1.createElement("div", {
    className: `${classPrefix$x}-body`,
    ref: bodyRef,
    onScroll: checkActiveIndex
  }, panels)));
});
var index$8 = attachPropertiesToComponent(IndexBar, {
  Panel
});
var infiniteScroll = "";
function isWindow(element) {
  return element === window;
}
const classPrefix$w = `adm-infinite-scroll`;
const InfiniteScrollContent = ({
  hasMore
}) => {
  const {
    locale
  } = useConfig();
  return React$1.createElement(React$1.Fragment, null, hasMore ? React$1.createElement(React$1.Fragment, null, React$1.createElement("span", null, locale.common.loading), React$1.createElement(DotLoading, null)) : React$1.createElement("span", null, locale.InfiniteScroll.noMore));
};
const InfiniteScroll = (p) => {
  const props = mergeProps({
    threshold: 250
  }, p);
  const doLoadMore = useLockFn(() => props.loadMore());
  const elementRef = useRef(null);
  const [flag, setFlag] = useState({});
  const nextFlagRef = useRef(flag);
  const check = useMemoizedFn(() => __awaiter(void 0, void 0, void 0, function* () {
    if (nextFlagRef.current !== flag)
      return;
    if (!props.hasMore)
      return;
    const element = elementRef.current;
    if (!element)
      return;
    if (!element.offsetParent)
      return;
    const parent = getScrollParent(element);
    if (!parent)
      return;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;
    if (current >= elementTop - props.threshold) {
      const nextFlag = {};
      nextFlagRef.current = nextFlag;
      yield doLoadMore();
      setFlag(nextFlag);
    }
  }));
  useEffect(() => {
    check();
  });
  useEffect(() => {
    const element = elementRef.current;
    if (!element)
      return;
    const parent = getScrollParent(element);
    if (!parent)
      return;
    function onScroll() {
      check();
    }
    parent.addEventListener("scroll", onScroll);
    return () => {
      parent.removeEventListener("scroll", onScroll);
    };
  }, []);
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$w,
    ref: elementRef
  }, props.children && props.children, !props.children && React$1.createElement(InfiniteScrollContent, {
    hasMore: props.hasMore
  })));
};
var input = "";
const classPrefix$v = `adm-input`;
const defaultProps$r = {
  defaultValue: ""
};
const Input = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$r, p);
  const [value, setValue] = usePropsValue(props);
  const [hasFocus, setHasFocus] = useState(false);
  const nativeInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue("");
    },
    focus: () => {
      var _a;
      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;
      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    },
    get nativeElement() {
      return nativeInputRef.current;
    }
  }));
  const handleKeydown = (e) => {
    var _a;
    if (props.onEnterPress && (e.code === "Enter" || e.keyCode === 13)) {
      props.onEnterPress(e);
    }
    (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };
  useIsomorphicLayoutEffect(() => {
    var _a;
    if (!props.enterKeyHint)
      return;
    (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute("enterkeyhint", props.enterKeyHint);
    return () => {
      var _a2;
      (_a2 = nativeInputRef.current) === null || _a2 === void 0 ? void 0 : _a2.removeAttribute("enterkeyhint");
    };
  }, [props.enterKeyHint]);
  function checkValue() {
    let nextValue = value;
    if (props.type === "number") {
      nextValue = nextValue && bound(parseFloat(nextValue), props.min, props.max).toString();
    }
    if (nextValue !== value) {
      setValue(nextValue);
    }
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(`${classPrefix$v}`, props.disabled && `${classPrefix$v}-disabled`)
  }, React$1.createElement("input", {
    ref: nativeInputRef,
    className: `${classPrefix$v}-element`,
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
    onFocus: (e) => {
      var _a;
      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onBlur: (e) => {
      var _a;
      setHasFocus(false);
      checkValue();
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    id: props.id,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readOnly: props.readOnly,
    maxLength: props.maxLength,
    minLength: props.minLength,
    max: props.max,
    min: props.min,
    autoComplete: props.autoComplete,
    autoFocus: props.autoFocus,
    pattern: props.pattern,
    inputMode: props.inputMode,
    type: props.type,
    autoCapitalize: props.autoCapitalize,
    autoCorrect: props.autoCorrect,
    onKeyDown: handleKeydown,
    onKeyUp: props.onKeyUp,
    onCompositionStart: props.onCompositionStart,
    onCompositionEnd: props.onCompositionEnd,
    onClick: props.onClick
  }), props.clearable && !!value && !props.readOnly && hasFocus && React$1.createElement("div", {
    className: `${classPrefix$v}-clear`,
    onMouseDown: (e) => {
      e.preventDefault();
    },
    onClick: () => {
      var _a;
      setValue("");
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, React$1.createElement(CloseCircleFill, null))));
});
var jumboTabs = "";
const classPrefix$u = `adm-jumbo-tabs`;
const JumboTab = () => {
  return null;
};
const JumboTabs = (props) => {
  var _a;
  const tabListContainerRef = useRef(null);
  const rootRef = useRef(null);
  const keyToIndexRecord = {};
  let firstActiveKey = null;
  const panes = [];
  traverseReactNode(props.children, (child, index2) => {
    if (!React$1.isValidElement(child))
      return;
    const key = child.key;
    if (typeof key !== "string")
      return;
    if (index2 === 0) {
      firstActiveKey = key;
    }
    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: (v) => {
      var _a2;
      if (v === null)
        return;
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
    }
  });
  const {
    scrollLeft,
    animate
  } = useTabListScroll(tabListContainerRef, keyToIndexRecord[activeKey]);
  useResizeEffect(() => {
    animate(true);
  }, rootRef);
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$u,
    ref: rootRef
  }, React$1.createElement("div", {
    className: `${classPrefix$u}-header`
  }, React$1.createElement(ScrollMask, {
    scrollTrackRef: tabListContainerRef
  }), React$1.createElement(animated.div, {
    className: `${classPrefix$u}-tab-list`,
    ref: tabListContainerRef,
    scrollLeft
  }, panes.map((pane) => withNativeProps(pane.props, React$1.createElement("div", {
    key: pane.key,
    className: `${classPrefix$u}-tab-wrapper`
  }, React$1.createElement("div", {
    onClick: () => {
      const {
        key
      } = pane;
      if (pane.props.disabled)
        return;
      if (key === void 0 || key === null) {
        return;
      }
      setActiveKey(key.toString());
    },
    className: classNames(`${classPrefix$u}-tab`, {
      [`${classPrefix$u}-tab-active`]: pane.key === activeKey,
      [`${classPrefix$u}-tab-disabled`]: pane.props.disabled
    })
  }, React$1.createElement("div", {
    className: `${classPrefix$u}-tab-title`
  }, pane.props.title), React$1.createElement("div", {
    className: `${classPrefix$u}-tab-description`
  }, pane.props.description))))))), panes.map((pane) => {
    if (pane.props.children === void 0) {
      return null;
    }
    const active = pane.key === activeKey;
    return React$1.createElement(ShouldRender, {
      key: pane.key,
      active,
      forceRender: pane.props.forceRender,
      destroyOnClose: pane.props.destroyOnClose
    }, React$1.createElement("div", {
      className: `${classPrefix$u}-content`,
      style: {
        display: active ? "block" : "none"
      }
    }, pane.props.children));
  })));
};
var index$7 = attachPropertiesToComponent(JumboTabs, {
  Tab: JumboTab
});
var modal = "";
const ModalActionButton = (props) => {
  const {
    action
  } = props;
  const [loading, setLoading] = useState(false);
  function handleClick() {
    return __awaiter(this, void 0, void 0, function* () {
      setLoading(true);
      try {
        const promise = props.onAction();
        yield promise;
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    });
  }
  return withNativeProps(props.action, React$1.createElement(Button, {
    key: action.key,
    onClick: handleClick,
    className: classNames("adm-modal-button", {
      "adm-modal-button-primary": props.action.primary
    }),
    fill: props.action.primary ? "solid" : "none",
    size: props.action.primary ? "large" : "middle",
    block: true,
    color: action.danger ? "danger" : "primary",
    loading,
    disabled: action.disabled
  }, action.text));
};
const defaultProps$q = {
  visible: false,
  actions: [],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ["click"],
  showCloseButton: false,
  getContainer: null,
  disableBodyScroll: true
};
const Modal = (p) => {
  const props = mergeProps(defaultProps$q, p);
  const unmountedRef = useUnmountedRef();
  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: true
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      var _a, _b;
      if (unmountedRef.current)
        return;
      setActive(props.visible);
      if (props.visible) {
        (_a = props.afterShow) === null || _a === void 0 ? void 0 : _a.call(props);
      } else {
        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
      }
    }
  });
  const [active, setActive] = useState(props.visible);
  const body = React$1.createElement("div", {
    className: classNames(cls("body"), props.image && cls("with-image"), props.bodyClassName),
    style: props.bodyStyle
  }, props.showCloseButton && React$1.createElement("a", {
    className: classNames(cls("close"), "adm-plain-anchor"),
    onClick: props.onClose
  }, React$1.createElement(CloseOutline, null)), !!props.image && React$1.createElement("div", {
    className: cls("image-container")
  }, React$1.createElement(Image$1, {
    src: props.image,
    alt: "modal header image",
    width: "100%"
  })), !!props.header && React$1.createElement("div", {
    className: cls("header")
  }, React$1.createElement(AutoCenter, null, props.header)), !!props.title && React$1.createElement("div", {
    className: cls("title")
  }, props.title), React$1.createElement("div", {
    className: cls("content")
  }, typeof props.content === "string" ? React$1.createElement(AutoCenter, null, props.content) : props.content), React$1.createElement(Space, {
    direction: "vertical",
    block: true,
    className: classNames(cls("footer"), props.actions.length === 0 && cls("footer-empty"))
  }, props.actions.map((action, index2) => {
    return React$1.createElement(ModalActionButton, {
      key: action.key,
      action,
      onAction: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        yield Promise.all([(_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action), (_b = props.onAction) === null || _b === void 0 ? void 0 : _b.call(props, action, index2)]);
        if (props.closeOnAction) {
          (_c = props.onClose) === null || _c === void 0 ? void 0 : _c.call(props);
        }
      })
    });
  })));
  const node = withStopPropagation(props.stopPropagation, withNativeProps(props, React$1.createElement("div", {
    className: cls(),
    style: {
      display: active ? "unset" : "none"
    }
  }, React$1.createElement(Mask, {
    visible: props.visible,
    onMaskClick: props.closeOnMaskClick ? props.onClose : void 0,
    style: props.maskStyle,
    className: classNames(cls("mask"), props.maskClassName),
    disableBodyScroll: props.disableBodyScroll
  }), React$1.createElement("div", {
    className: cls("wrap"),
    style: {
      pointerEvents: props.visible ? "unset" : "none"
    }
  }, React$1.createElement(animated.div, {
    style
  }, body)))));
  return renderToContainer(props.getContainer, node);
};
function cls(name = "") {
  return "adm-modal" + (name && "-") + name;
}
const closeFnSet = /* @__PURE__ */ new Set();
function show$1(props) {
  const handler = renderImperatively(React$1.createElement(Modal, Object.assign({}, props, {
    afterClose: () => {
      var _a;
      closeFnSet.delete(handler.close);
      (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  })));
  closeFnSet.add(handler.close);
  return handler;
}
function alert(p) {
  const defaultProps2 = {
    confirmText: getDefaultConfig().locale.Modal.ok
  };
  const props = mergeProps(defaultProps2, p);
  return new Promise((resolve) => {
    show$1(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      actions: [{
        key: "confirm",
        text: props.confirmText,
        primary: true
      }],
      onAction: props.onConfirm,
      onClose: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        resolve();
      }
    }));
  });
}
const defaultProps$p = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function confirm(p) {
  const {
    locale
  } = getDefaultConfig();
  const props = mergeProps(defaultProps$p, {
    confirmText: locale.common.confirm,
    cancelText: locale.common.cancel
  }, p);
  return new Promise((resolve) => {
    show$1(Object.assign(Object.assign({}, props), {
      closeOnAction: true,
      onClose: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        resolve(false);
      },
      actions: [{
        key: "confirm",
        text: props.confirmText,
        primary: true,
        onClick: () => __awaiter(this, void 0, void 0, function* () {
          var _a;
          yield (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props);
          resolve(true);
        })
      }, {
        key: "cancel",
        text: props.cancelText,
        onClick: () => __awaiter(this, void 0, void 0, function* () {
          var _b;
          yield (_b = props.onCancel) === null || _b === void 0 ? void 0 : _b.call(props);
          resolve(false);
        })
      }]
    }));
  });
}
function clear$1() {
  closeFnSet.forEach((close) => {
    close();
  });
}
var index$6 = attachPropertiesToComponent(Modal, {
  show: show$1,
  alert,
  confirm,
  clear: clear$1
});
var navBar = "";
const classPrefix$t = `adm-nav-bar`;
const defaultProps$o = {
  back: "",
  backArrow: true
};
const NavBar = (p) => {
  const props = mergeProps(defaultProps$o, p);
  const {
    back,
    backArrow
  } = props;
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$t)
  }, React$1.createElement("div", {
    className: `${classPrefix$t}-left`,
    role: "button"
  }, back !== null && React$1.createElement("div", {
    className: `${classPrefix$t}-back`,
    onClick: props.onBack
  }, backArrow && React$1.createElement("span", {
    className: `${classPrefix$t}-back-arrow`
  }, backArrow === true ? React$1.createElement(LeftOutline, null) : backArrow), React$1.createElement("span", {
    "aria-hidden": "true"
  }, back)), props.left), React$1.createElement("div", {
    className: `${classPrefix$t}-title`
  }, props.children), React$1.createElement("div", {
    className: `${classPrefix$t}-right`
  }, props.right)));
};
var noticeBar = "";
const classPrefix$s = `adm-notice-bar`;
const defaultProps$n = {
  color: "default",
  delay: 2e3,
  speed: 50,
  icon: React$1.createElement(SoundOutline, null)
};
const NoticeBar = memo((p) => {
  const props = mergeProps(defaultProps$n, p);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const speed = props.speed;
  const delayLockRef = useRef(true);
  const animatingRef = useRef(false);
  function start() {
    if (delayLockRef.current)
      return;
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text)
      return;
    if (container.offsetWidth >= text.offsetWidth) {
      animatingRef.current = false;
      text.style.removeProperty("transition-duration");
      text.style.removeProperty("transform");
      return;
    }
    if (animatingRef.current)
      return;
    const initial = !text.style.transform;
    text.style.transitionDuration = "0s";
    if (initial) {
      text.style.transform = "translateX(0)";
    } else {
      text.style.transform = `translateX(${container.offsetWidth}px)`;
    }
    const distance = initial ? text.offsetWidth : container.offsetWidth + text.offsetWidth;
    animatingRef.current = true;
    text.style.transitionDuration = `${Math.round(distance / speed)}s`;
    text.style.transform = `translateX(-${text.offsetWidth}px)`;
  }
  useTimeout(() => {
    delayLockRef.current = false;
    start();
  }, props.delay);
  useResizeEffect(() => {
    start();
  }, containerRef);
  useMutationEffect(() => {
    start();
  }, textRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  if (!visible)
    return null;
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$s, `${classPrefix$s}-${props.color}`)
  }, props.icon && React$1.createElement("span", {
    className: `${classPrefix$s}-left`
  }, props.icon), React$1.createElement("span", {
    ref: containerRef,
    className: `${classPrefix$s}-content`
  }, React$1.createElement("span", {
    onTransitionEnd: () => {
      animatingRef.current = false;
      start();
    },
    ref: textRef,
    className: `${classPrefix$s}-content-inner`
  }, props.content)), (props.closeable || props.extra) && React$1.createElement("span", {
    className: `${classPrefix$s}-right`
  }, props.extra, props.closeable && React$1.createElement(CloseOutline, {
    className: `${classPrefix$s}-close-icon`,
    onClick: () => {
      var _a;
      setVisible(false);
      (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }))));
});
var numberKeyboard = "";
function shuffle(array) {
  const result2 = [...array];
  for (let i = result2.length; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [result2[i - 1], result2[j]] = [result2[j], result2[i - 1]];
  }
  return result2;
}
const classPrefix$r = "adm-number-keyboard";
const defaultProps$m = {
  defaultVisible: false,
  randomOrder: false,
  showCloseButton: true,
  confirmText: null,
  closeOnConfirm: true,
  safeArea: true
};
const NumberKeyboard = (p) => {
  const props = mergeProps(defaultProps$m, p);
  const {
    visible,
    title,
    getContainer,
    confirmText,
    customKey,
    randomOrder,
    showCloseButton,
    onInput
  } = props;
  const keyboardRef = useRef(null);
  const keys2 = useMemo(() => {
    const defaultKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const keyList = randomOrder ? shuffle(defaultKeys) : defaultKeys;
    keyList.push("0");
    if (confirmText) {
      keyList.push(customKey || "");
    } else {
      keyList.splice(9, 0, customKey || "");
      keyList.push("BACKSPACE");
    }
    return keyList;
  }, [customKey, confirmText, randomOrder, randomOrder && visible]);
  const timeoutRef = useRef(-1);
  const intervalRef = useRef(-1);
  const onDelete = useMemoizedFn(() => {
    var _a;
    (_a = props.onDelete) === null || _a === void 0 ? void 0 : _a.call(props);
  });
  const onBackspacePressStart = () => {
    timeoutRef.current = window.setTimeout(() => {
      onDelete();
      intervalRef.current = window.setInterval(onDelete, 150);
    }, 700);
  };
  const onBackspacePressEnd = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  };
  const onKeyPress = (e, key) => {
    var _a, _b;
    e.preventDefault();
    switch (key) {
      case "BACKSPACE":
        onDelete === null || onDelete === void 0 ? void 0 : onDelete();
        break;
      case "OK":
        (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props);
        if (props.closeOnConfirm) {
          (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
        break;
      default:
        if (key !== "")
          onInput === null || onInput === void 0 ? void 0 : onInput(key);
        break;
    }
  };
  const renderHeader = () => {
    if (!showCloseButton && !title)
      return null;
    return React$1.createElement("div", {
      className: classNames(`${classPrefix$r}-header`, {
        "with-title": !!title
      })
    }, title && React$1.createElement("div", {
      className: `${classPrefix$r}-title`
    }, title), showCloseButton && React$1.createElement("span", {
      className: `${classPrefix$r}-header-close-button`,
      onClick: () => {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      },
      role: "button",
      title: "CLOSE"
    }, React$1.createElement(DownOutline, null)));
  };
  const renderKey = (key, index2) => {
    const isNumberKey = /^\d$/.test(key);
    const className = classNames(`${classPrefix$r}-key`, {
      "number-key": isNumberKey,
      "sign-key": !isNumberKey && key,
      "mid-key": index2 === 9 && !!confirmText
    });
    return React$1.createElement("div", {
      key,
      className,
      onTouchStart: () => {
        if (key === "BACKSPACE") {
          onBackspacePressStart();
        }
      },
      onTouchEnd: (e) => {
        onKeyPress(e, key);
        if (key === "BACKSPACE") {
          onBackspacePressEnd();
        }
      },
      title: key,
      role: "button"
    }, key === "BACKSPACE" ? React$1.createElement(TextDeletionOutline, null) : key);
  };
  return React$1.createElement(Popup, {
    visible,
    getContainer,
    mask: false,
    afterClose: props.afterClose,
    afterShow: props.afterShow,
    className: `${classPrefix$r}-popup`,
    stopPropagation: props.stopPropagation
  }, withNativeProps(props, React$1.createElement("div", {
    ref: keyboardRef,
    className: classPrefix$r,
    onMouseDown: (e) => {
      e.preventDefault();
    }
  }, renderHeader(), React$1.createElement("div", {
    className: `${classPrefix$r}-wrapper`
  }, React$1.createElement("div", {
    className: classNames(`${classPrefix$r}-main`, {
      "confirmed-style": !!confirmText
    })
  }, keys2.map(renderKey)), !!confirmText && React$1.createElement("div", {
    className: `${classPrefix$r}-confirm`
  }, React$1.createElement("div", {
    className: `${classPrefix$r}-key extra-key bs-key`,
    onTouchStart: () => {
      onBackspacePressStart();
    },
    onTouchEnd: (e) => {
      onKeyPress(e, "BACKSPACE");
      onBackspacePressEnd();
    },
    title: "BACKSPACE",
    role: "button"
  }, React$1.createElement(TextDeletionOutline, null)), React$1.createElement("div", {
    className: `${classPrefix$r}-key extra-key ok-key`,
    onTouchEnd: (e) => onKeyPress(e, "OK"),
    role: "button"
  }, confirmText))), props.safeArea && React$1.createElement("div", {
    className: `${classPrefix$r}-footer`
  }, React$1.createElement(SafeArea, {
    position: "bottom"
  })))));
};
var pageIndicator = "";
const classPrefix$q = `adm-page-indicator`;
const defaultProps$l = {
  color: "primary",
  direction: "horizontal"
};
const PageIndicator = memo((p) => {
  const props = mergeProps(defaultProps$l, p);
  const dots = [];
  for (let i = 0; i < props.total; i++) {
    dots.push(React$1.createElement("div", {
      key: i,
      className: classNames(`${classPrefix$q}-dot`, {
        [`${classPrefix$q}-dot-active`]: props.current === i
      })
    }));
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$q, `${classPrefix$q}-${props.direction}`, `${classPrefix$q}-color-${props.color}`)
  }, dots));
});
var passcodeInput = "";
const classPrefix$p = "adm-passcode-input";
const defaultProps$k = {
  defaultValue: "",
  length: 6,
  plain: false,
  error: false,
  seperated: false,
  caret: true
};
const PasscodeInput = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$k, p);
  const cellLength = props.length > 0 && props.length < Infinity ? Math.floor(props.length) : defaultProps$k.length;
  const [focused, setFocused] = useState(false);
  const [value, setValue] = usePropsValue(props);
  const rootRef = useRef(null);
  const nativeInputRef = useRef(null);
  useEffect(() => {
    var _a;
    if (value.length >= cellLength) {
      (_a = props.onFill) === null || _a === void 0 ? void 0 : _a.call(props, value);
    }
  }, [value, cellLength]);
  const onFocus = () => {
    var _a, _b;
    if (!props.keyboard) {
      (_a = nativeInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
    setFocused(true);
    (_b = props.onFocus) === null || _b === void 0 ? void 0 : _b.call(props);
  };
  useEffect(() => {
    if (!focused)
      return;
    const timeout = window.setTimeout(() => {
      var _a;
      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [focused]);
  const onBlur = () => {
    var _a;
    setFocused(false);
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
  };
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a, _b;
      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      (_b = nativeInputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
    }
  }));
  const renderCells = () => {
    const cells = [];
    const chars = value.split("");
    const caretIndex = chars.length;
    const focusedIndex = bound(chars.length, 0, cellLength - 1);
    for (let i = 0; i < cellLength; i++) {
      cells.push(React$1.createElement("div", {
        className: classNames(`${classPrefix$p}-cell`, {
          caret: props.caret && caretIndex === i && focused,
          focused: focusedIndex === i && focused,
          dot: !props.plain && chars[i]
        }),
        key: i
      }, chars[i] && props.plain ? chars[i] : ""));
    }
    return cells;
  };
  const cls2 = classNames(classPrefix$p, {
    focused,
    error: props.error,
    seperated: props.seperated
  });
  return React$1.createElement(React$1.Fragment, null, withNativeProps(props, React$1.createElement("div", {
    ref: rootRef,
    tabIndex: 0,
    className: cls2,
    onFocus,
    onBlur
  }, React$1.createElement("div", {
    className: `${classPrefix$p}-cell-container`
  }, renderCells()), React$1.createElement("input", {
    ref: nativeInputRef,
    className: `${classPrefix$p}-native-input`,
    value,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    onChange: (e) => {
      setValue(e.target.value.slice(0, props.length));
    }
  }))), props.keyboard && React$1.cloneElement(props.keyboard, {
    visible: focused,
    onInput: (v) => {
      if (value.length < cellLength) {
        setValue((value + v).slice(0, props.length));
      }
    },
    onDelete: () => {
      setValue(value.slice(0, -1));
    },
    onClose: () => {
      var _a;
      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));
});
var progressBar = "";
const classPrefix$o = `adm-progress-bar`;
const ProgressBar = (p) => {
  const props = mergeProps({
    percent: 0
  }, p);
  const fillStyle = {
    width: `${props.percent}%`
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$o
  }, React$1.createElement("div", {
    className: `${classPrefix$o}-trail`
  }, React$1.createElement("div", {
    className: `${classPrefix$o}-fill`,
    style: fillStyle
  }))));
};
var progressCircle = "";
const classPrefix$n = `adm-progress-circle`;
const ProgressCircle = (p) => {
  const props = mergeProps({
    percent: 0
  }, p);
  const style = {
    "--percent": props.percent.toString()
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: `${classPrefix$n}`,
    style
  }, React$1.createElement("div", {
    className: `${classPrefix$n}-content`
  }, React$1.createElement("svg", {
    className: `${classPrefix$n}-svg`
  }, React$1.createElement("circle", {
    className: `${classPrefix$n}-track`,
    fill: "transparent"
  }), React$1.createElement("circle", {
    className: `${classPrefix$n}-fill`,
    fill: "transparent"
  })), React$1.createElement("div", {
    className: `${classPrefix$n}-info`
  }, props.children))));
};
var pullToRefresh = "";
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const classPrefix$m = `adm-pull-to-refresh`;
const defaultProps$j = {
  pullingText: "\u4E0B\u62C9\u5237\u65B0",
  canReleaseText: "\u91CA\u653E\u7ACB\u5373\u5237\u65B0",
  refreshingText: "\u52A0\u8F7D\u4E2D...",
  completeText: "\u5237\u65B0\u6210\u529F",
  completeDelay: 500,
  disabled: false,
  onRefresh: () => {
  }
};
const PullToRefresh = (p) => {
  var _a, _b;
  const {
    locale
  } = useConfig();
  const props = mergeProps(defaultProps$j, {
    refreshingText: `${locale.common.loading}...`,
    pullingText: locale.PullToRefresh.pulling,
    canReleaseText: locale.PullToRefresh.canRelease,
    completeText: locale.PullToRefresh.complete
  }, p);
  const headHeight = (_a = props.headHeight) !== null && _a !== void 0 ? _a : convertPx(40);
  const threshold = (_b = props.threshold) !== null && _b !== void 0 ? _b : convertPx(60);
  const [status, setStatus] = useState("pulling");
  const [springStyles, api] = useSpring(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      clamp: true
    }
  }));
  const elementRef = useRef(null);
  const pullingRef = useRef(false);
  useEffect(() => {
    var _a2;
    (_a2 = elementRef.current) === null || _a2 === void 0 ? void 0 : _a2.addEventListener("touchmove", () => {
    });
  }, []);
  function doRefresh() {
    return __awaiter(this, void 0, void 0, function* () {
      api.start({
        height: headHeight
      });
      setStatus("refreshing");
      try {
        yield props.onRefresh();
        setStatus("complete");
      } catch (e) {
        api.start({
          to: (next) => __awaiter(this, void 0, void 0, function* () {
            yield next({
              height: 0
            });
            setStatus("pulling");
          })
        });
        throw e;
      }
      if (props.completeDelay > 0) {
        yield sleep(props.completeDelay);
      }
      api.start({
        to: (next) => __awaiter(this, void 0, void 0, function* () {
          yield next({
            height: 0
          });
          setStatus("pulling");
        })
      });
    });
  }
  useDrag((state) => {
    if (status === "refreshing" || status === "complete")
      return;
    const {
      event
    } = state;
    if (state.last) {
      pullingRef.current = false;
      if (status === "canRelease") {
        doRefresh();
      } else {
        api.start({
          height: 0
        });
      }
      return;
    }
    const [, y2] = state.movement;
    if (state.first && y2 > 0) {
      let getScrollTop = function(element) {
        return "scrollTop" in element ? element.scrollTop : element.scrollY;
      };
      const target = state.event.target;
      if (!target || !(target instanceof Element))
        return;
      let scrollParent = getScrollParent(target);
      while (true) {
        if (!scrollParent)
          return;
        const scrollTop = getScrollTop(scrollParent);
        if (scrollTop > 0) {
          return;
        }
        if (scrollParent instanceof Window) {
          break;
        }
        scrollParent = getScrollParent(scrollParent.parentNode);
      }
      pullingRef.current = true;
    }
    if (!pullingRef.current)
      return;
    if (event.cancelable) {
      event.preventDefault();
    }
    event.stopPropagation();
    const height = Math.max(rubberbandIfOutOfBounds(y2, 0, 0, headHeight * 5, 0.5), 0);
    api.start({
      height
    });
    setStatus(height > threshold ? "canRelease" : "pulling");
  }, {
    pointer: {
      touch: true
    },
    axis: "y",
    target: elementRef,
    enabled: !props.disabled,
    eventOptions: supportsPassive ? {
      passive: false
    } : false
  });
  const renderStatusText = () => {
    var _a2;
    if (props.renderText) {
      return (_a2 = props.renderText) === null || _a2 === void 0 ? void 0 : _a2.call(props, status);
    }
    if (status === "pulling")
      return props.pullingText;
    if (status === "canRelease")
      return props.canReleaseText;
    if (status === "refreshing")
      return props.refreshingText;
    if (status === "complete")
      return props.completeText;
  };
  return React$1.createElement(animated.div, {
    ref: elementRef,
    className: classPrefix$m
  }, React$1.createElement(animated.div, {
    style: springStyles,
    className: `${classPrefix$m}-head`
  }, React$1.createElement("div", {
    className: `${classPrefix$m}-head-content`,
    style: {
      height: headHeight
    }
  }, renderStatusText())), React$1.createElement("div", {
    className: `${classPrefix$m}-content`
  }, props.children));
};
var radio = "";
const RadioGroupContext = createContext(null);
const defaultProps$i = {
  disabled: false,
  defaultValue: null
};
const Group = (p) => {
  const props = mergeProps(defaultProps$i, p);
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: (v) => {
      var _a;
      if (v === null)
        return;
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, v);
    }
  });
  return React$1.createElement(RadioGroupContext.Provider, {
    value: {
      value: value === null ? [] : [value],
      check: (v) => {
        setValue(v);
      },
      uncheck: () => {
      },
      disabled: props.disabled
    }
  }, props.children);
};
const classPrefix$l = `adm-radio`;
const defaultProps$h = {
  defaultChecked: false
};
const Radio = (p) => {
  const props = mergeProps(defaultProps$h, p);
  const groupContext = useContext(RadioGroupContext);
  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  });
  let disabled = props.disabled;
  const {
    value
  } = props;
  if (groupContext && value !== void 0) {
    checked = groupContext.value.includes(value);
    setChecked = (checked2) => {
      var _a;
      if (checked2) {
        groupContext.check(value);
      } else {
        groupContext.uncheck(value);
      }
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, checked2);
    };
    disabled = disabled || groupContext.disabled;
  }
  const renderIcon = () => {
    if (props.icon) {
      return React$1.createElement("div", {
        className: `${classPrefix$l}-custom-icon`
      }, props.icon(checked));
    }
    return React$1.createElement("div", {
      className: `${classPrefix$l}-icon`
    }, checked && React$1.createElement(CheckIcon, null));
  };
  return withNativeProps(props, React$1.createElement("label", {
    className: classNames(classPrefix$l, {
      [`${classPrefix$l}-checked`]: checked,
      [`${classPrefix$l}-disabled`]: disabled,
      [`${classPrefix$l}-block`]: props.block
    })
  }, React$1.createElement(NativeInput, {
    type: "radio",
    checked,
    onChange: setChecked,
    disabled,
    id: props.id
  }), renderIcon(), props.children && React$1.createElement("div", {
    className: `${classPrefix$l}-content`
  }, props.children)));
};
var index$5 = attachPropertiesToComponent(Radio, {
  Group
});
var rate = "";
const classPrefix$k = `adm-rate`;
const defaultProps$g = {
  count: 5,
  allowHalf: false,
  character: React$1.createElement(StarFill, null),
  defaultValue: 0,
  readOnly: false,
  allowClear: true
};
const Rate = (p) => {
  const props = mergeProps(defaultProps$g, p);
  const [value, setValue] = usePropsValue(props);
  const starList = Array(props.count).fill(null);
  function renderStar(v, half) {
    return React$1.createElement("div", {
      className: classNames(`${classPrefix$k}-star`, {
        [`${classPrefix$k}-star-active`]: value >= v,
        [`${classPrefix$k}-star-half`]: half,
        [`${classPrefix$k}-star-readonly`]: props.readOnly
      }),
      onClick: () => {
        if (props.readOnly)
          return;
        if (props.allowClear && value === v) {
          setValue(0);
        } else {
          setValue(v);
        }
      }
    }, props.character);
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$k
  }, starList.map((_, i) => React$1.createElement("div", {
    key: i,
    className: classNames(`${classPrefix$k}-box`)
  }, props.allowHalf && renderStar(i + 0.5, true), renderStar(i + 1, false)))));
};
var result = "";
const classPrefix$j = `adm-result`;
const iconRecord = {
  success: CheckCircleFill,
  error: CloseCircleFill,
  info: InformationCircleFill,
  waiting: ClockCircleFill,
  warning: ExclamationCircleFill
};
const Result = (props) => {
  const {
    status,
    title,
    description,
    icon
  } = props;
  if (!status)
    return null;
  const resultIcon = icon || React$1.createElement(iconRecord[status]);
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$j, `${classPrefix$j}-${status}`)
  }, React$1.createElement("div", {
    className: `${classPrefix$j}-icon`
  }, resultIcon), React$1.createElement("div", {
    className: `${classPrefix$j}-title`
  }, title), description ? React$1.createElement("div", {
    className: `${classPrefix$j}-description`
  }, description) : null));
};
var searchBar = "";
const classPrefix$i = `adm-search-bar`;
const defaultProps$f = {
  clearable: true,
  showCancelButton: false,
  defaultValue: "",
  clearOnCancel: true,
  icon: React$1.createElement(SearchOutline, null)
};
const SearchBar = forwardRef((p, ref) => {
  const {
    locale
  } = useConfig();
  const props = mergeProps(defaultProps$f, {
    cancelText: locale.common.cancel
  }, p);
  const [value, setValue] = usePropsValue(props);
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => {
      var _a;
      return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear();
    },
    focus: () => {
      var _a;
      return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;
      return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    },
    get nativeElement() {
      var _a, _b;
      return (_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.nativeElement) !== null && _b !== void 0 ? _b : null;
    }
  }));
  const renderCancelButton = () => {
    let isShowCancel = false;
    if (typeof props.showCancelButton === "function") {
      isShowCancel = props.showCancelButton(hasFocus, value);
    } else {
      isShowCancel = props.showCancelButton && hasFocus;
    }
    return isShowCancel && React$1.createElement("div", {
      className: `${classPrefix$i}-suffix`,
      onMouseDown: (e) => {
        e.preventDefault();
      },
      onTouchStart: (e) => {
        e.preventDefault();
      }
    }, React$1.createElement(Button, {
      fill: "none",
      className: `${classPrefix$i}-cancel-button`,
      onClick: () => {
        var _a, _b, _c;
        if (props.clearOnCancel) {
          (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.clear();
        }
        (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        (_c = props.onCancel) === null || _c === void 0 ? void 0 : _c.call(props);
      }
    }, props.cancelText));
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$i, {
      [`${classPrefix$i}-active`]: hasFocus
    })
  }, React$1.createElement("div", {
    className: `${classPrefix$i}-input-box`
  }, props.icon && React$1.createElement("div", {
    className: `${classPrefix$i}-input-box-icon`
  }, props.icon), React$1.createElement(Input, {
    ref: inputRef,
    className: classNames(`${classPrefix$i}-input`, {
      [`${classPrefix$i}-input-without-icon`]: !props.icon
    }),
    value,
    onChange: setValue,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    clearable: props.clearable,
    onFocus: (e) => {
      var _a;
      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onBlur: (e) => {
      var _a;
      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onClear: props.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: () => {
      var _a, _b;
      (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      (_b = props.onSearch) === null || _b === void 0 ? void 0 : _b.call(props, value);
    }
  })), renderCancelButton()));
});
var selector = "";
const CheckMark = memo(() => {
  return React$1.createElement("svg", {
    width: "17px",
    height: "13px",
    viewBox: "0 0 17 13",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React$1.createElement("g", {
    transform: "translate(-2832.000000, -1103.000000)",
    stroke: "#FFFFFF",
    strokeWidth: "3"
  }, React$1.createElement("g", {
    transform: "translate(2610.000000, 955.000000)"
  }, React$1.createElement("g", {
    transform: "translate(24.000000, 91.000000)"
  }, React$1.createElement("g", {
    transform: "translate(179.177408, 36.687816)"
  }, React$1.createElement("polyline", {
    points: "34.2767388 22 24.797043 31.4796958 21 27.6826527"
  })))))));
});
const classPrefix$h = `adm-selector`;
const defaultProps$e = {
  multiple: false,
  defaultValue: [],
  showCheckMark: true
};
const Selector = (p) => {
  const props = mergeProps(defaultProps$e, p);
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: (val) => {
      var _a;
      const extend = {
        get items() {
          return props.options.filter((option) => val.includes(option.value));
        }
      };
      (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, extend);
    }
  });
  const items = props.options.map((option) => {
    const active = (value || []).includes(option.value);
    const disabled = option.disabled || props.disabled;
    const itemCls = classNames(`${classPrefix$h}-item`, {
      [`${classPrefix$h}-item-active`]: active && !props.multiple,
      [`${classPrefix$h}-item-multiple-active`]: active && props.multiple,
      [`${classPrefix$h}-item-disabled`]: disabled
    });
    return React$1.createElement("div", {
      key: option.value,
      className: itemCls,
      onClick: () => {
        if (disabled) {
          return;
        }
        if (props.multiple) {
          const val = active ? value.filter((v) => v !== option.value) : [...value, option.value];
          setValue(val);
        } else {
          const val = active ? [] : [option.value];
          setValue(val);
        }
      }
    }, option.label, option.description && React$1.createElement("div", {
      className: `${classPrefix$h}-item-description`
    }, option.description), active && props.showCheckMark && React$1.createElement("div", {
      className: `${classPrefix$h}-check-mark-wrapper`
    }, React$1.createElement(CheckMark, null)));
  });
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$h
  }, !props.columns && React$1.createElement(Space, {
    wrap: true
  }, items), props.columns && React$1.createElement(Grid, {
    columns: props.columns,
    gap: convertPx(8)
  }, items)));
};
var sideBar = "";
const Corner = memo((props) => withNativeProps(props, React$1.createElement("svg", {
  viewBox: "0 0 30 30"
}, React$1.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, React$1.createElement("path", {
  d: "M30,0 C13.4314575,3.04359188e-15 -2.02906125e-15,13.4314575 0,30 L0,30 L0,0 Z",
  fill: "var(--adm-color-white)",
  transform: "translate(15.000000, 15.000000) scale(-1, -1) translate(-15.000000, -15.000000) "
})))));
const classPrefix$g = `adm-side-bar`;
const SideBarItem = () => {
  return null;
};
const SideBar = (props) => {
  var _a;
  let firstActiveKey = null;
  const items = [];
  traverseReactNode(props.children, (child, index2) => {
    if (!React$1.isValidElement(child))
      return;
    const key = child.key;
    if (typeof key !== "string")
      return;
    if (index2 === 0) {
      firstActiveKey = key;
    }
    items.push(child);
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: (v) => {
      var _a2;
      if (v === null)
        return;
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
    }
  });
  const lastItem = items[items.length - 1];
  const isLastItemActive = lastItem && lastItem.key === activeKey;
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$g
  }, React$1.createElement("div", {
    className: `${classPrefix$g}-items`
  }, items.map((item, index2) => {
    const active = item.key === activeKey;
    const isActiveNextSibling = items[index2 - 1] && items[index2 - 1].key === activeKey;
    const isActivePreviousSibling = items[index2 + 1] && items[index2 + 1].key === activeKey;
    return withNativeProps(item.props, React$1.createElement("div", {
      key: item.key,
      onClick: () => {
        const {
          key
        } = item;
        if (key === void 0 || key === null || item.props.disabled)
          return;
        setActiveKey(key.toString());
      },
      className: classNames(`${classPrefix$g}-item`, {
        [`${classPrefix$g}-item-active`]: active,
        [`${classPrefix$g}-item-disabled`]: item.props.disabled
      })
    }, React$1.createElement(React$1.Fragment, null, isActiveNextSibling && React$1.createElement(Corner, {
      className: `${classPrefix$g}-item-corner ${classPrefix$g}-item-corner-top`
    }), isActivePreviousSibling && React$1.createElement(Corner, {
      className: `${classPrefix$g}-item-corner ${classPrefix$g}-item-corner-bottom`
    })), React$1.createElement(Badge, {
      content: item.props.badge,
      className: `${classPrefix$g}-badge`
    }, React$1.createElement("div", {
      className: `${classPrefix$g}-item-title`
    }, active && React$1.createElement("div", {
      className: `${classPrefix$g}-item-highlight`
    }), item.props.title))));
  })), React$1.createElement("div", {
    className: classNames(`${classPrefix$g}-extra-space`, isLastItemActive && `${classPrefix$g}-item-active-next-sibling`)
  }, isLastItemActive && React$1.createElement(Corner, {
    className: `${classPrefix$g}-item-corner ${classPrefix$g}-item-corner-top`
  }))));
};
var index$4 = attachPropertiesToComponent(SideBar, {
  Item: SideBarItem
});
var slider = "";
const classPrefix$f = `adm-slider`;
const Ticks = ({
  points,
  max,
  min,
  upperBound,
  lowerBound
}) => {
  const range = max - min;
  const elements = points.map((point) => {
    const offset2 = `${Math.abs(point - min) / range * 100}%`;
    const isActived = point <= upperBound && point >= lowerBound;
    const style = {
      left: offset2
    };
    const pointClassName = classNames({
      [`${classPrefix$f}-tick`]: true,
      [`${classPrefix$f}-tick-active`]: isActived
    });
    return React$1.createElement("span", {
      className: pointClassName,
      style,
      key: point
    });
  });
  return React$1.createElement("div", {
    className: `${classPrefix$f}-ticks`
  }, elements);
};
const classPrefix$e = `adm-slider-mark`;
const Marks = ({
  marks,
  upperBound,
  lowerBound,
  max,
  min
}) => {
  const marksKeys = Object.keys(marks);
  const range = max - min;
  const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).filter((point) => point >= min && point <= max).map((point) => {
    const markPoint = marks[point];
    if (!markPoint && markPoint !== 0) {
      return null;
    }
    const isActive = point <= upperBound && point >= lowerBound;
    const markClassName = classNames({
      [`${classPrefix$e}-text`]: true,
      [`${classPrefix$e}-text-active`]: isActive
    });
    const style = {
      left: `${(point - min) / range * 100}%`
    };
    return React$1.createElement("span", {
      className: markClassName,
      style,
      key: point
    }, markPoint);
  });
  return React$1.createElement("div", {
    className: classPrefix$e
  }, elements);
};
const ThumbIcon = (props) => {
  return withNativeProps(props, React$1.createElement("svg", {
    viewBox: "0 0 20 20"
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("g", {
    transform: "translate(-604.000000, -656.000000)",
    fill: "#999999"
  }, React$1.createElement("g", {
    transform: "translate(592.000000, 644.000000)"
  }, React$1.createElement("g", {
    transform: "translate(12.000000, 12.000000)"
  }, React$1.createElement("polygon", {
    points: "0 3.33333333 2.22222222 3.33333333 2.22222222 17.7777778 0 17.7777778"
  }), React$1.createElement("polygon", {
    points: "17.7777778 3.33333333 20 3.33333333 20 17.7777778 17.7777778 17.7777778"
  }), React$1.createElement("path", {
    d: "M10.8888889,0 L9.11111111,0 C8.98888889,0 8.88888889,0.107142857 8.88888889,0.238095238 L8.88888889,19.7619048 C8.88888889,19.8928571 8.98888889,20 9.11111111,20 L10.8888889,20 C11.0111111,20 11.1111111,19.8928571 11.1111111,19.7619048 L11.1111111,0.238095238 C11.1111111,0.107142857 11.0111111,0 10.8888889,0 Z"
  })))))));
};
const classPrefix$d = `adm-slider`;
const Thumb = (props) => {
  const {
    value,
    min,
    max,
    disabled,
    onDrag,
    icon
  } = props;
  const prevValue = useRef(value);
  const currentPosition = () => {
    return {
      left: `${(value - min) / (max - min) * 100}%`,
      right: "auto"
    };
  };
  const bind = useDrag((state) => {
    var _a;
    if (disabled)
      return;
    if (state.first) {
      prevValue.current = value;
    }
    const x = state.xy[0] - state.initial[0];
    const sliderOffsetWith = (_a = props.trackRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    if (!sliderOffsetWith)
      return;
    const diff = x / Math.ceil(sliderOffsetWith) * (max - min);
    onDrag(prevValue.current + diff, state.first, state.last);
  }, {
    axis: "x",
    pointer: {
      touch: true
    }
  });
  return React$1.createElement("div", Object.assign({
    className: `${classPrefix$d}-thumb-container`,
    style: currentPosition()
  }, bind()), React$1.createElement("div", {
    className: `${classPrefix$d}-thumb`
  }, icon ? icon : React$1.createElement(ThumbIcon, {
    className: `${classPrefix$d}-thumb-icon`
  })));
};
const classPrefix$c = `adm-slider`;
const defaultProps$d = {
  min: 0,
  max: 100,
  step: 1,
  ticks: false,
  range: false,
  disabled: false
};
const Slider = (p) => {
  var _a;
  const props = mergeProps(defaultProps$d, p);
  const {
    min,
    max,
    disabled,
    marks,
    ticks,
    step,
    icon
  } = props;
  function sortValue(val) {
    return val.sort((a, b) => a - b);
  }
  function convertValue(value) {
    return props.range ? value : [props.min, value];
  }
  function reverseValue(value) {
    return props.range ? value : value[1];
  }
  function onAfterChange(value) {
    var _a2;
    (_a2 = props.onAfterChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, reverseValue(value));
  }
  const [rawValue, setRawValue] = usePropsValue({
    value: props.value,
    defaultValue: (_a = props.defaultValue) !== null && _a !== void 0 ? _a : props.range ? [min, min] : min,
    onChange: props.onChange
  });
  const sliderValue = sortValue(convertValue(rawValue));
  function setSliderValue(value) {
    const next = sortValue(value);
    const current = sliderValue;
    if (next[0] === current[0] && next[1] === current[1])
      return;
    setRawValue(reverseValue(next));
  }
  const trackRef = useRef(null);
  const fillSize = `${100 * (sliderValue[1] - sliderValue[0]) / (max - min)}%`;
  const fillStart = `${100 * (sliderValue[0] - min) / (max - min)}%`;
  const pointList = useMemo(() => {
    if (marks) {
      return Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
    } else {
      const points = [];
      for (let i = min; i <= max; i += step) {
        points.push(i);
      }
      return points;
    }
  }, [marks, ticks, step, min, max]);
  function getValueByPosition(position) {
    const newPosition = position < min ? min : position > max ? max : position;
    let value = min;
    if (pointList.length) {
      value = nearest(pointList, newPosition);
    } else {
      const lengthPerStep = 100 / ((max - min) / step);
      const steps2 = Math.round(newPosition / lengthPerStep);
      value = steps2 * lengthPerStep * (max - min) * 0.01 + min;
    }
    return value;
  }
  const dragLockRef = useRef(0);
  const onTrackClick = (event) => {
    if (dragLockRef.current > 0)
      return;
    event.stopPropagation();
    if (disabled)
      return;
    const track = trackRef.current;
    if (!track)
      return;
    const sliderOffsetLeft = track.getBoundingClientRect().left;
    const position = (event.clientX - sliderOffsetLeft) / Math.ceil(track.offsetWidth) * (max - min) + min;
    const targetValue = getValueByPosition(position);
    let nextSliderValue;
    if (props.range) {
      if (Math.abs(targetValue - sliderValue[0]) > Math.abs(targetValue - sliderValue[1])) {
        nextSliderValue = [sliderValue[0], targetValue];
      } else {
        nextSliderValue = [targetValue, sliderValue[1]];
      }
    } else {
      nextSliderValue = [props.min, targetValue];
    }
    setSliderValue(nextSliderValue);
    onAfterChange(nextSliderValue);
  };
  const valueBeforeDragRef = useRef();
  const renderThumb = (index2) => {
    return React$1.createElement(Thumb, {
      icon,
      key: index2,
      value: sliderValue[index2],
      min,
      max,
      disabled,
      trackRef,
      onDrag: (position, first, last) => {
        if (first) {
          dragLockRef.current += 1;
          valueBeforeDragRef.current = sliderValue;
        }
        const val = getValueByPosition(position);
        const valueBeforeDrag = valueBeforeDragRef.current;
        if (!valueBeforeDrag)
          return;
        const next = [...valueBeforeDrag];
        next[index2] = val;
        setSliderValue(next);
        if (last) {
          onAfterChange(next);
          window.setTimeout(() => {
            dragLockRef.current -= 1;
          }, 100);
        }
      }
    });
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$c, {
      [`${classPrefix$c}-disabled`]: disabled
    })
  }, React$1.createElement("div", {
    className: `${classPrefix$c}-track-container`,
    onClick: onTrackClick
  }, React$1.createElement("div", {
    className: `${classPrefix$c}-track`,
    onClick: onTrackClick,
    ref: trackRef
  }, React$1.createElement("div", {
    className: `${classPrefix$c}-fill`,
    style: {
      width: fillSize,
      left: fillStart
    }
  }), props.ticks && React$1.createElement(Ticks, {
    points: pointList,
    min,
    max,
    lowerBound: sliderValue[0],
    upperBound: sliderValue[1]
  }), props.range && renderThumb(0), renderThumb(1))), marks && React$1.createElement(Marks, {
    min,
    max,
    marks,
    lowerBound: sliderValue[0],
    upperBound: sliderValue[1]
  })));
};
var stepper = "";
const classPrefix$b = `adm-stepper`;
const defaultProps$c = {
  defaultValue: 0,
  step: 1,
  disabled: false,
  allowEmpty: false
};
const Stepper = (p) => {
  const props = mergeProps(defaultProps$c, p);
  const {
    disabled,
    step,
    max,
    min,
    inputReadOnly
  } = props;
  const [value, setValue] = usePropsValue(props);
  const [inputValue, setInputValue] = useState(() => convertValueToText(value, props.digits));
  function setValueWithCheck(v) {
    if (isNaN(v))
      return;
    let target = bound(v, props.min, props.max);
    if (props.digits !== void 0) {
      target = parseFloat(target.toFixed(props.digits));
    }
    setValue(target);
  }
  const [hasFocus, setHasFocus] = useState(false);
  useEffect(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.digits));
    }
  }, [hasFocus]);
  useEffect(() => {
    if (!hasFocus) {
      setInputValue(convertValueToText(value, props.digits));
    }
  }, [value, props.digits]);
  const handleInputChange = (v) => {
    setInputValue(v);
    const value2 = convertTextToValue(v);
    if (value2 === null) {
      if (props.allowEmpty) {
        setValue(null);
      } else {
        setValue(props.defaultValue);
      }
    } else {
      setValueWithCheck(value2);
    }
  };
  const handleMinus = () => {
    setValueWithCheck(Big(value !== null && value !== void 0 ? value : 0).minus(step).toNumber());
  };
  const handlePlus = () => {
    setValueWithCheck(Big(value !== null && value !== void 0 ? value : 0).add(step).toNumber());
  };
  const minusDisabled = () => {
    if (disabled)
      return true;
    if (value === null)
      return false;
    if (min !== void 0) {
      return value <= min;
    }
    return false;
  };
  const plusDisabled = () => {
    if (disabled)
      return true;
    if (value === null)
      return false;
    if (max !== void 0) {
      return value >= max;
    }
    return false;
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix$b, {
      [`${classPrefix$b}-active`]: hasFocus
    })
  }, React$1.createElement(Button, {
    className: `${classPrefix$b}-minus`,
    onClick: handleMinus,
    disabled: minusDisabled(),
    fill: "none",
    shape: "rectangular",
    color: "primary"
  }, React$1.createElement(MinusOutline, null)), React$1.createElement("div", {
    className: `${classPrefix$b}-middle`
  }, React$1.createElement(Input, {
    className: `${classPrefix$b}-input`,
    onFocus: (e) => {
      var _a;
      setHasFocus(true);
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    value: inputValue,
    onChange: (val) => {
      disabled || handleInputChange(val);
    },
    disabled,
    onBlur: (e) => {
      var _a;
      setHasFocus(false);
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    readOnly: inputReadOnly
  })), React$1.createElement(Button, {
    className: `${classPrefix$b}-plus`,
    onClick: handlePlus,
    disabled: plusDisabled(),
    fill: "none",
    shape: "rectangular",
    color: "primary"
  }, React$1.createElement(AddOutline, null))));
};
function convertValueToText(value, digits) {
  if (value === null)
    return "";
  if (digits !== void 0) {
    return value.toFixed(digits);
  } else {
    return value.toString();
  }
}
function convertTextToValue(text) {
  if (text === "")
    return null;
  return parseFloat(text);
}
var steps = "";
const classPrefix$a = `adm-step`;
const Step = (props) => {
  const {
    title,
    description,
    icon,
    status = "wait"
  } = props;
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(`${classPrefix$a}`, `${classPrefix$a}-status-${status}`)
  }, React$1.createElement("div", {
    className: `${classPrefix$a}-indicator`
  }, React$1.createElement("div", {
    className: `${classPrefix$a}-icon-container`
  }, icon)), React$1.createElement("div", {
    className: `${classPrefix$a}-content`
  }, React$1.createElement("div", {
    className: `${classPrefix$a}-title`
  }, title), !!description && React$1.createElement("div", {
    className: `${classPrefix$a}-description`
  }, description))));
};
const classPrefix$9 = `adm-steps`;
const stepClassPrefix = `adm-step`;
const defaultIcon = React$1.createElement("span", {
  className: `${stepClassPrefix}-icon-dot`
});
const defaultProps$b = {
  current: 0,
  direction: "horizontal"
};
const Steps = (p) => {
  const props = mergeProps(defaultProps$b, p);
  const {
    direction,
    current
  } = props;
  const classString = classNames(classPrefix$9, `${classPrefix$9}-${direction}`);
  return withNativeProps(props, React$1.createElement("div", {
    className: classString
  }, React$1.Children.map(props.children, (child, index2) => {
    var _a;
    if (!React$1.isValidElement(child)) {
      return child;
    }
    const props2 = child.props;
    let status = props2.status || "wait";
    if (index2 < current) {
      status = props2.status || "finish";
    } else if (index2 === current) {
      status = props2.status || "process";
    }
    const icon = (_a = props2.icon) !== null && _a !== void 0 ? _a : defaultIcon;
    return React$1.cloneElement(child, {
      status,
      icon
    });
  })));
};
var index$3 = attachPropertiesToComponent(Steps, {
  Step
});
var swipeAction = "";
const defaultProps$a = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: true,
  closeOnAction: true,
  stopPropagation: []
};
const SwipeAction = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$a, p);
  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  function getWidth(ref2) {
    const element = ref2.current;
    if (!element)
      return 0;
    return element.offsetWidth;
  }
  function getLeftWidth() {
    return getWidth(leftRef);
  }
  function getRightWidth() {
    return getWidth(rightRef);
  }
  const [{
    x
  }, api] = useSpring(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []);
  const draggingRef = useRef(false);
  const bind = useDrag((state) => {
    draggingRef.current = true;
    const [offsetX] = state.offset;
    if (state.last) {
      const leftWidth = getLeftWidth();
      const rightWidth = getRightWidth();
      let position = offsetX + state.velocity[0] * state.direction[0] * 50;
      if (offsetX > 0) {
        position = Math.max(0, position);
      } else if (offsetX < 0) {
        position = Math.min(0, position);
      } else {
        position = 0;
      }
      api.start({
        x: nearest([-rightWidth, 0, leftWidth], position)
      });
      window.setTimeout(() => {
        draggingRef.current = false;
      });
    } else {
      api.start({
        x: offsetX,
        immediate: true
      });
    }
  }, {
    from: () => [x.get(), 0],
    bounds: () => {
      const leftWidth = getLeftWidth();
      const rightWidth = getRightWidth();
      return {
        left: -rightWidth,
        right: leftWidth
      };
    },
    axis: "x",
    preventScroll: true,
    pointer: {
      touch: true
    }
  });
  function close() {
    api.start({
      x: 0
    });
  }
  useImperativeHandle(ref, () => ({
    show: (side = "right") => {
      if (side === "right") {
        api.start({
          x: -getRightWidth()
        });
      } else if (side === "left") {
        api.start({
          x: getLeftWidth()
        });
      }
    },
    close
  }));
  useEffect(() => {
    if (!props.closeOnTouchOutside)
      return;
    function handle(e) {
      if (x.get() === 0) {
        return;
      }
      const root2 = rootRef.current;
      if (root2 && !root2.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("touchstart", handle);
    };
  }, [props.closeOnTouchOutside]);
  function renderAction(action) {
    var _a, _b;
    const color = (_a = action.color) !== null && _a !== void 0 ? _a : "light";
    return React$1.createElement(Button, {
      key: action.key,
      className: "adm-swipe-action-action-button",
      style: {
        "--background-color": (_b = colorRecord$1[color]) !== null && _b !== void 0 ? _b : color
      },
      onClick: (e) => {
        var _a2, _b2;
        if (props.closeOnAction) {
          close();
        }
        (_a2 = action.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(action, e);
        (_b2 = props.onAction) === null || _b2 === void 0 ? void 0 : _b2.call(props, action, e);
      }
    }, action.text);
  }
  return withNativeProps(props, React$1.createElement("div", Object.assign({
    className: "adm-swipe-action"
  }, bind(), {
    ref: rootRef,
    onClickCapture: (e) => {
      if (draggingRef.current) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }), React$1.createElement(animated.div, {
    className: "adm-swipe-action-track",
    style: {
      x
    }
  }, withStopPropagation(props.stopPropagation, React$1.createElement("div", {
    className: "adm-swipe-action-actions adm-swipe-action-actions-left",
    ref: leftRef
  }, props.leftActions.map(renderAction))), React$1.createElement("div", {
    className: "adm-swipe-action-content",
    onClickCapture: (e) => {
      if (x.goal !== 0) {
        e.preventDefault();
        e.stopPropagation();
        api.start({
          x: 0
        });
      }
    }
  }, React$1.createElement(animated.div, {
    style: {
      pointerEvents: x.to((v) => v !== 0 && x.goal !== 0 ? "none" : "unset")
    }
  }, props.children)), withStopPropagation(props.stopPropagation, React$1.createElement("div", {
    className: "adm-swipe-action-actions adm-swipe-action-actions-right",
    ref: rightRef
  }, props.rightActions.map(renderAction))))));
});
const colorRecord$1 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
};
var swiper = "";
const SwiperItem = (props) => {
  return withNativeProps(props, React$1.createElement("div", {
    className: "adm-swiper-item",
    onClick: props.onClick
  }, props.children));
};
function useRefState(initialState) {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return [state, setState, ref];
}
const defaultProps$9 = {
  defaultIndex: 0,
  allowTouchMove: true,
  autoplay: false,
  autoplayInterval: 3e3,
  loop: false,
  direction: "horizontal",
  slideSize: 100,
  trackOffset: 0,
  stuckAtBoundary: true,
  rubberband: true
};
const Swiper = forwardRef(staged((p, ref) => {
  const props = mergeProps(defaultProps$9, p);
  const isVertical = props.direction === "vertical";
  const slideRatio = props.slideSize / 100;
  const offsetRatio = props.trackOffset / 100;
  const {
    validChildren,
    count
  } = useMemo(() => {
    let count2 = 0;
    const validChildren2 = React$1.Children.map(props.children, (child) => {
      if (!React$1.isValidElement(child))
        return null;
      if (child.type !== SwiperItem) {
        return null;
      }
      count2++;
      return child;
    });
    return {
      validChildren: validChildren2,
      count: count2
    };
  }, [props.children]);
  if (count === 0 || !validChildren) {
    return null;
  }
  return () => {
    let loop = props.loop;
    if (slideRatio * (count - 1) < 1) {
      loop = false;
    }
    const trackRef = useRef(null);
    function getSlidePixels() {
      const track = trackRef.current;
      if (!track)
        return 0;
      const trackPixels = isVertical ? track.offsetHeight : track.offsetWidth;
      return trackPixels * props.slideSize / 100;
    }
    const [current, setCurrent] = useState(props.defaultIndex);
    useUpdateEffect(() => {
      var _a;
      (_a = props.onIndexChange) === null || _a === void 0 ? void 0 : _a.call(props, current);
    }, [current]);
    const [dragging, setDragging, draggingRef] = useRefState(false);
    function boundIndex(current2) {
      let min = 0;
      let max = count - 1;
      if (props.stuckAtBoundary) {
        min += offsetRatio / slideRatio;
        max -= (1 - slideRatio - offsetRatio) / slideRatio;
      }
      return bound(current2, min, max);
    }
    const [{
      position
    }, api] = useSpring(() => ({
      position: boundIndex(current) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (draggingRef.current)
          return;
        if (!loop)
          return;
        const rawX = position.get();
        const totalWidth = 100 * count;
        const standardPosition = modulus(rawX, totalWidth);
        if (standardPosition === rawX)
          return;
        api.start({
          position: standardPosition,
          immediate: true
        });
      }
    }), [count]);
    const bind = useDrag((state) => {
      const slidePixels = getSlidePixels();
      if (!slidePixels)
        return;
      const paramIndex = isVertical ? 1 : 0;
      const offset2 = state.offset[paramIndex];
      const direction = state.direction[paramIndex];
      const velocity = state.velocity[paramIndex];
      setDragging(true);
      if (!state.last) {
        api.start({
          position: offset2 * 100 / slidePixels,
          immediate: true
        });
      } else {
        const minIndex = Math.floor(offset2 / slidePixels);
        const maxIndex = minIndex + 1;
        const index2 = Math.round((offset2 + velocity * 2e3 * direction) / slidePixels);
        swipeTo(bound(index2, minIndex, maxIndex));
        window.setTimeout(() => {
          setDragging(false);
        });
      }
    }, {
      transform: ([x, y2]) => [-x, -y2],
      from: () => {
        const slidePixels = getSlidePixels();
        return [position.get() / 100 * slidePixels, position.get() / 100 * slidePixels];
      },
      bounds: () => {
        if (loop)
          return {};
        const slidePixels = getSlidePixels();
        const lowerBound = boundIndex(0) * slidePixels;
        const upperBound = boundIndex(count - 1) * slidePixels;
        return isVertical ? {
          top: lowerBound,
          bottom: upperBound
        } : {
          left: lowerBound,
          right: upperBound
        };
      },
      rubberband: props.rubberband,
      axis: isVertical ? "y" : "x",
      preventScroll: !isVertical,
      pointer: {
        touch: true
      }
    });
    function swipeTo(index2, immediate = false) {
      const roundedIndex = Math.round(index2);
      const targetIndex = loop ? modulus(roundedIndex, count) : bound(roundedIndex, 0, count - 1);
      setCurrent(targetIndex);
      api.start({
        position: (loop ? roundedIndex : boundIndex(roundedIndex)) * 100,
        immediate
      });
    }
    function swipeNext() {
      swipeTo(Math.round(position.get() / 100) + 1);
    }
    function swipePrev() {
      swipeTo(Math.round(position.get() / 100) - 1);
    }
    useImperativeHandle(ref, () => ({
      swipeTo,
      swipeNext,
      swipePrev
    }));
    useIsomorphicLayoutEffect(() => {
      const maxIndex = validChildren.length - 1;
      if (current > maxIndex) {
        swipeTo(maxIndex, true);
      }
    });
    const {
      autoplay,
      autoplayInterval
    } = props;
    useEffect(() => {
      if (!autoplay || dragging)
        return;
      const interval = window.setInterval(() => {
        swipeNext();
      }, autoplayInterval);
      return () => {
        window.clearInterval(interval);
      };
    }, [autoplay, autoplayInterval, dragging]);
    function renderTrackInner() {
      if (loop) {
        return React$1.createElement("div", {
          className: "adm-swiper-track-inner"
        }, React$1.Children.map(validChildren, (child, index2) => {
          return React$1.createElement(animated.div, {
            className: "adm-swiper-slide",
            style: {
              [isVertical ? "y" : "x"]: position.to((position2) => {
                let finalPosition = -position2 + index2 * 100;
                const totalWidth = count * 100;
                const flagWidth = totalWidth / 2;
                finalPosition = modulus(finalPosition + flagWidth, totalWidth) - flagWidth;
                return `${finalPosition}%`;
              }),
              [isVertical ? "top" : "left"]: `-${index2 * 100}%`
            }
          }, child);
        }));
      } else {
        return React$1.createElement(animated.div, {
          className: "adm-swiper-track-inner",
          style: {
            [isVertical ? "y" : "x"]: position.to((position2) => `${-position2}%`)
          }
        }, React$1.Children.map(validChildren, (child) => {
          return React$1.createElement("div", {
            className: "adm-swiper-slide"
          }, child);
        }));
      }
    }
    const style = {
      "--slide-size": `${props.slideSize}%`,
      "--track-offset": `${props.trackOffset}%`
    };
    return withNativeProps(props, React$1.createElement("div", {
      className: classNames("adm-swiper", `adm-swiper-${props.direction}`),
      style
    }, React$1.createElement("div", Object.assign({
      ref: trackRef,
      className: classNames("adm-swiper-track", {
        "adm-swiper-track-allow-touch-move": props.allowTouchMove
      }),
      onClickCapture: (e) => {
        if (draggingRef.current) {
          e.stopPropagation();
        }
      }
    }, props.allowTouchMove ? bind() : {}), renderTrackInner()), props.indicator === void 0 ? React$1.createElement("div", {
      className: "adm-swiper-indicator"
    }, React$1.createElement(PageIndicator, Object.assign({}, props.indicatorProps, {
      total: count,
      current,
      direction: props.direction
    }))) : props.indicator(count, current)));
  };
}));
function modulus(value, division) {
  const remainder = value % division;
  return remainder < 0 ? remainder + division : remainder;
}
var index$2 = attachPropertiesToComponent(Swiper, {
  Item: SwiperItem
});
var _switch = "";
const SpinIcon = memo((props) => {
  return withNativeProps(props, React$1.createElement("svg", {
    width: "28px",
    height: "28px",
    viewBox: "0 0 28 28"
  }, React$1.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React$1.createElement("g", {
    transform: "translate(-137.000000, -840.000000)",
    fill: "#1576FE"
  }, React$1.createElement("g", {
    transform: "translate(80.000000, 823.000000)"
  }, React$1.createElement("g", {
    transform: "translate(53.000000, 13.000000)"
  }, React$1.createElement("path", {
    d: "M17.9996753,31.5 C10.5556724,31.5 4.5,25.4443275 4.5,18.0003247 C4.5,10.5563219 10.5556724,4.5 17.9996753,4.5 C18.5355492,4.5 18.9702974,4.93474816 18.9702974,5.47062208 C18.9702974,6.006496 18.5355492,6.44124416 17.9996753,6.44124416 C11.6261524,6.44124416 6.44124416,11.6267709 6.44124416,18.0002938 C6.44124416,24.3738167 11.6261524,29.5587249 17.9996753,29.5587249 C24.3731982,29.5587249 29.5587249,24.3738167 29.5587249,18.0002938 C29.5587249,14.7964616 28.2778291,11.8169616 25.9523687,9.61220279 C25.5637302,9.24317094 25.5473089,8.62893223 25.9157222,8.23967523 C26.2841356,7.84976878 26.8989928,7.83461537 27.2882498,8.20302872 C30.0042351,10.7787368 31.5,14.2580826 31.5,18.0002938 C31.5,25.4443275 25.4436781,31.5 17.9996753,31.5 Z"
  })))))));
});
const classPrefix$8 = `adm-switch`;
const defaultProps$8 = {
  defaultChecked: false
};
const Switch = (p) => {
  const props = mergeProps(defaultProps$8, p);
  const disabled = props.disabled || props.loading || false;
  const [changing, setChanging] = useState(false);
  const [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  });
  function onClick() {
    return __awaiter(this, void 0, void 0, function* () {
      if (disabled || props.loading || changing) {
        return;
      }
      const nextChecked = !checked;
      if (props.beforeChange) {
        setChanging(true);
        try {
          yield props.beforeChange(nextChecked);
          setChecked(nextChecked);
          setChanging(false);
        } catch (e) {
          setChanging(false);
          throw e;
        }
      } else {
        setChecked(nextChecked);
      }
    });
  }
  return withNativeProps(props, React$1.createElement("div", {
    onClick,
    className: classNames(classPrefix$8, {
      [`${classPrefix$8}-checked`]: checked,
      [`${classPrefix$8}-disabled`]: disabled || changing
    })
  }, React$1.createElement("div", {
    className: `${classPrefix$8}-checkbox`
  }, React$1.createElement("div", {
    className: `${classPrefix$8}-handle`
  }, (props.loading || changing) && React$1.createElement(SpinIcon, {
    className: `${classPrefix$8}-spin-icon`
  })), React$1.createElement("div", {
    className: `${classPrefix$8}-inner`
  }, checked ? props.checkedText : props.uncheckedText))));
};
var tabBar = "";
const TabBarItem = () => {
  return null;
};
const classPrefix$7 = `adm-tab-bar`;
const defaultProps$7 = {
  safeArea: false
};
const TabBar = (p) => {
  var _a;
  const props = mergeProps(defaultProps$7, p);
  let firstActiveKey = null;
  const items = [];
  traverseReactNode(props.children, (child, index2) => {
    if (!React$1.isValidElement(child))
      return;
    const key = child.key;
    if (typeof key !== "string")
      return;
    if (index2 === 0) {
      firstActiveKey = key;
    }
    items.push(child);
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: (_a = props.defaultActiveKey) !== null && _a !== void 0 ? _a : firstActiveKey,
    onChange: (v) => {
      var _a2;
      if (v === null)
        return;
      (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, v);
    }
  });
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$7
  }, React$1.createElement("div", {
    className: `${classPrefix$7}-wrap`
  }, items.map((item) => {
    const active = item.key === activeKey;
    function renderContent() {
      const iconElement = item.props.icon && React$1.createElement("div", {
        className: `${classPrefix$7}-item-icon`
      }, typeof item.props.icon === "function" ? item.props.icon(active) : item.props.icon);
      const titleElement = item.props.title && React$1.createElement("div", {
        className: `${classPrefix$7}-item-title`
      }, typeof item.props.title === "function" ? item.props.title(active) : item.props.title);
      if (iconElement) {
        return React$1.createElement(React$1.Fragment, null, React$1.createElement(Badge, {
          content: item.props.badge,
          className: `${classPrefix$7}-icon-badge`
        }, iconElement), titleElement);
      } else if (titleElement) {
        return React$1.createElement(Badge, {
          content: item.props.badge,
          className: `${classPrefix$7}-title-badge`
        }, titleElement);
      }
      return null;
    }
    return withNativeProps(item.props, React$1.createElement("div", {
      key: item.key,
      onClick: () => {
        const {
          key
        } = item;
        if (key === void 0 || key === null)
          return;
        setActiveKey(key.toString());
      },
      className: classNames(`${classPrefix$7}-item`, {
        [`${classPrefix$7}-item-active`]: active
      })
    }, renderContent()));
  })), props.safeArea && React$1.createElement(SafeArea, {
    position: "bottom"
  })));
};
var index$1 = attachPropertiesToComponent(TabBar, {
  Item: TabBarItem
});
var tag = "";
const classPrefix$6 = `adm-tag`;
const colorRecord = {
  default: "#666666",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
};
const defaultProps$6 = {
  color: "default",
  fill: "solid",
  round: false
};
const Tag = (p) => {
  var _a;
  const props = mergeProps(defaultProps$6, p);
  const color = (_a = colorRecord[props.color]) !== null && _a !== void 0 ? _a : props.color;
  const style = {
    "--border-color": color,
    "--text-color": props.fill === "outline" ? color : "#ffffff",
    "--background-color": props.fill === "outline" ? "transparent" : color
  };
  return withNativeProps(props, React$1.createElement("span", {
    style,
    onClick: props.onClick,
    className: classNames(classPrefix$6, {
      [`${classPrefix$6}-round`]: props.round
    })
  }, props.children));
};
var textArea = "";
const classPrefix$5 = "adm-text-area";
const defaultProps$5 = {
  rows: 2,
  showCount: false,
  autoSize: false,
  defaultValue: ""
};
const TextArea = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$5, p);
  const {
    autoSize,
    showCount,
    maxLength
  } = props;
  const [value, setValue] = usePropsValue(Object.assign(Object.assign({}, props), {
    value: props.value === null ? "" : props.value
  }));
  if (props.value === null)
    ;
  const nativeTextAreaRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue("");
    },
    focus: () => {
      var _a;
      (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;
      (_a = nativeTextAreaRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));
  useEffect(() => {
    if (!autoSize)
      return;
    const textArea2 = nativeTextAreaRef.current;
    if (!textArea2)
      return;
    textArea2.style.height = "auto";
    let height = textArea2.scrollHeight;
    if (typeof autoSize === "object") {
      const computedStyle = window.getComputedStyle(textArea2);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      if (autoSize.minRows) {
        height = Math.max(height, autoSize.minRows * lineHeight);
      }
      if (autoSize.maxRows) {
        height = Math.min(height, autoSize.maxRows * lineHeight);
      }
    }
    textArea2.style.height = `${height}px`;
  }, [value, autoSize]);
  const compositingRef = useRef(false);
  let count;
  const valueLength = [...value].length;
  if (typeof showCount === "function") {
    count = showCount(valueLength, maxLength);
  } else if (showCount) {
    count = React$1.createElement("div", {
      className: `${classPrefix$5}-count`
    }, maxLength === void 0 ? valueLength : valueLength + "/" + maxLength);
  }
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$5
  }, React$1.createElement("textarea", {
    ref: nativeTextAreaRef,
    className: `${classPrefix$5}-element`,
    rows: props.rows,
    value,
    placeholder: props.placeholder,
    onChange: (e) => {
      let v = e.target.value;
      if (maxLength && !compositingRef.current) {
        v = [...v].slice(0, maxLength).join("");
      }
      setValue(v);
    },
    id: props.id,
    onCompositionStart: (e) => {
      var _a;
      compositingRef.current = true;
      (_a = props.onCompositionStart) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    onCompositionEnd: (e) => {
      var _a;
      compositingRef.current = false;
      if (maxLength) {
        setValue([...value].slice(0, maxLength).join(""));
      }
      (_a = props.onCompositionEnd) === null || _a === void 0 ? void 0 : _a.call(props, e);
    },
    autoComplete: props.autoComplete,
    autoFocus: props.autoFocus,
    disabled: props.disabled,
    readOnly: props.readOnly,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onClick: props.onClick
  }), count));
});
TextArea.defaultProps = defaultProps$5;
var toast = "";
const classPrefix$4 = `adm-toast`;
const defaultProps$4 = {
  maskClickable: true,
  stopPropagation: ["click"]
};
const InternalToast = (p) => {
  const props = mergeProps(defaultProps$4, p);
  const {
    maskClickable,
    content,
    icon,
    position
  } = props;
  const iconElement = useMemo(() => {
    if (icon === null || icon === void 0)
      return null;
    switch (icon) {
      case "success":
        return React$1.createElement(CheckOutline, null);
      case "fail":
        return React$1.createElement(CloseOutline, null);
      case "loading":
        return React$1.createElement(SpinLoading, {
          color: "white",
          className: `${classPrefix$4}-loading`
        });
      default:
        return icon;
    }
  }, [icon]);
  const top = useMemo(() => {
    switch (position) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [position]);
  return React$1.createElement(Mask, {
    visible: props.visible,
    destroyOnClose: true,
    opacity: 0,
    disableBodyScroll: !maskClickable,
    getContainer: props.getContainer,
    afterClose: props.afterClose,
    style: Object.assign({
      pointerEvents: maskClickable ? "none" : "auto"
    }, props.maskStyle),
    className: classNames(`${classPrefix$4}-mask`, props.maskClassName),
    stopPropagation: props.stopPropagation
  }, React$1.createElement("div", {
    className: classNames(`${classPrefix$4}-wrap`)
  }, React$1.createElement("div", {
    style: {
      top
    },
    className: classNames(`${classPrefix$4}-main`, icon ? `${classPrefix$4}-main-icon` : `${classPrefix$4}-main-text`)
  }, iconElement && React$1.createElement("div", {
    className: `${classPrefix$4}-icon`
  }, iconElement), React$1.createElement(AutoCenter, null, content))));
};
const containers = [];
function unmount(container) {
  const unmountResult = ReactDOM.unmountComponentAtNode(container);
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}
const defaultProps$3 = {
  duration: 2e3,
  position: "center",
  maskClickable: true
};
function show(p) {
  const props = mergeProps(defaultProps$3, typeof p === "string" ? {
    content: p
  } : p);
  let timer = 0;
  const {
    getContainer = () => document.body
  } = props;
  const container = document.createElement("div");
  const bodyContainer = resolveContainer(getContainer);
  bodyContainer.appendChild(container);
  clear();
  containers.push(container);
  const TempToast = forwardRef((_, ref2) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      return () => {
        var _a;
        (_a = props.afterClose) === null || _a === void 0 ? void 0 : _a.call(props);
      };
    }, []);
    useEffect(() => {
      if (props.duration === 0) {
        return;
      }
      timer = window.setTimeout(() => {
        setVisible(false);
      }, props.duration);
      return () => {
        window.clearTimeout(timer);
      };
    }, []);
    useImperativeHandle(ref2, () => ({
      close: () => setVisible(false)
    }));
    return React$1.createElement(InternalToast, Object.assign({}, props, {
      getContainer: () => container,
      visible,
      afterClose: () => {
        unmount(container);
      }
    }));
  });
  const ref = createRef();
  ReactDOM.render(React$1.createElement(TempToast, {
    ref
  }), container);
  return {
    close: () => {
      var _a;
      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
    }
  };
}
function clear() {
  while (true) {
    const container = containers.pop();
    if (!container)
      break;
    unmount(container);
  }
}
function config(val) {
  if (val.duration !== void 0) {
    defaultProps$3.duration = val.duration;
  }
  if (val.position !== void 0) {
    defaultProps$3.position = val.position;
  }
  if (val.maskClickable !== void 0) {
    defaultProps$3.maskClickable = val.maskClickable;
  }
}
const Toast = {
  show,
  clear,
  config
};
var treeSelect = "";
function getTreeDeep(treeData, childrenName = "children") {
  const walker = (tree) => {
    let deep = 0;
    tree.forEach((item) => {
      if (item[childrenName]) {
        deep = Math.max(deep, walker(item[childrenName]) + 1);
      } else {
        deep = Math.max(deep, 1);
      }
    });
    return deep;
  };
  return walker(treeData);
}
const classPrefix$3 = `adm-tree-select`;
const defaultProps$2 = {
  options: [],
  fieldNames: {},
  defaultValue: []
};
const TreeSelect = (p) => {
  const props = mergeProps(defaultProps$2, p);
  const labelName = props.fieldNames.label || "label";
  const valueName = props.fieldNames.value || "value";
  const childrenName = props.fieldNames.children || "children";
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue
  });
  const [deep, optionsMap, optionsParentMap] = useMemo(() => {
    const deep2 = getTreeDeep(props.options, childrenName);
    const optionsMap2 = /* @__PURE__ */ new Map();
    const optionsParentMap2 = /* @__PURE__ */ new Map();
    function traverse(current, children) {
      children.forEach((item) => {
        optionsParentMap2.set(item[valueName], current);
        optionsMap2.set(item[valueName], item);
        if (item[childrenName]) {
          traverse(item, item[childrenName]);
        }
      });
    }
    traverse(void 0, props.options);
    return [deep2, optionsMap2, optionsParentMap2];
  }, [props.options]);
  const onItemSelect = (node) => {
    var _a;
    const parentNodes = [];
    let current = node;
    while (current) {
      parentNodes.push(current);
      const next = optionsParentMap.get(current[valueName]);
      current = next;
    }
    const values = parentNodes.reverse().map((i) => i[valueName]);
    setValue(values);
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, values, {
      options: parentNodes
    });
  };
  const renderItems = (columnOptions = [], index2) => {
    return columnOptions.map((item) => {
      const isActive = item[valueName] === value[index2];
      return React$1.createElement("div", {
        key: item[valueName],
        className: classNames(`${classPrefix$3}-item`, {
          [`${classPrefix$3}-item-active`]: isActive
        }),
        onClick: () => {
          if (!isActive) {
            onItemSelect(item);
          }
        }
      }, item[labelName]);
    });
  };
  const renderColumns = () => {
    var _a;
    const columns = [];
    for (let i = 0; i < deep; i++) {
      let width = `${100 / deep}%`;
      if (deep === 2 && i === 0) {
        width = `33.33%`;
      }
      if (deep === 2 && i === 1) {
        width = `66.67%`;
      }
      const column = React$1.createElement("div", {
        key: i,
        className: classNames(`${classPrefix$3}-column`),
        style: {
          width
        }
      }, renderItems(i === 0 ? props.options : (_a = optionsMap.get(value[i - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i));
      columns.push(column);
    }
    return columns;
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$3
  }, renderColumns()));
};
const classPrefix$2 = `adm-tree-select-multiple`;
const Multiple = (p) => {
  const props = mergeProps({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, p);
  useEffect(() => {
  }, []);
  const labelName = props.fieldNames.label || "label";
  const valueName = props.fieldNames.value || "value";
  const childrenName = props.fieldNames.children || "children";
  const [expandKeys, setExpandKeys] = usePropsValue({
    value: props.expandKeys,
    defaultValue: props.defaultExpandKeys
  });
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue
  });
  const getLeafKeys = (option) => {
    const keys2 = [];
    const walker = (op) => {
      var _a;
      if (!op) {
        return;
      }
      if ((_a = op[childrenName]) === null || _a === void 0 ? void 0 : _a.length) {
        op[childrenName].forEach((i) => walker(i));
      } else {
        keys2.push(op[valueName]);
      }
    };
    walker(option);
    return keys2;
  };
  const [deep, optionsMap, optionsParentMap] = useMemo(() => {
    const deep2 = getTreeDeep(props.options, childrenName);
    const optionsMap2 = /* @__PURE__ */ new Map();
    const optionsParentMap2 = /* @__PURE__ */ new Map();
    function traverse(current, children) {
      children.forEach((item) => {
        optionsParentMap2.set(item[valueName], current);
        optionsMap2.set(item[valueName], item);
        if (item[childrenName]) {
          traverse(item, item[childrenName]);
        }
      });
    }
    traverse(void 0, props.options);
    return [deep2, optionsMap2, optionsParentMap2];
  }, [props.options]);
  const allSelectedLeafKeys = useMemo(() => {
    let leafKeys = [];
    value.forEach((v) => {
      const option = optionsMap.get(v);
      leafKeys = leafKeys.concat(getLeafKeys(option));
    });
    return leafKeys;
  }, [value, optionsMap]);
  const dotMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    const walker = (key) => {
      const parentOption = optionsParentMap.get(key);
      if (!parentOption) {
        return;
      }
      map.set(parentOption[valueName], true);
      walker(parentOption[valueName]);
    };
    allSelectedLeafKeys.forEach((key) => {
      map.set(key, true);
      walker(key);
    });
    return map;
  }, [optionsParentMap, value]);
  const onChange = (targetKeys) => {
    var _a;
    let groupKeys = [...targetKeys];
    let unusedKeys = [];
    const walker = (keys2) => {
      keys2.forEach((key) => {
        var _a2;
        if (unusedKeys.includes(key)) {
          return;
        }
        const parent = optionsParentMap.get(key);
        if (!parent) {
          return;
        }
        const childrenKeys = ((_a2 = parent[childrenName]) === null || _a2 === void 0 ? void 0 : _a2.map((i) => i[valueName])) || [];
        if (childrenKeys.every((i) => groupKeys.includes(i))) {
          groupKeys.push(parent[valueName]);
          unusedKeys = unusedKeys.concat(childrenKeys);
        }
      });
    };
    for (let i = 0; i < deep; i++) {
      walker(groupKeys);
    }
    groupKeys = groupKeys.filter((i) => !unusedKeys.includes(i));
    const groupOptions = groupKeys.map((i) => optionsMap.get(i));
    setValue(groupKeys);
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, groupKeys, groupOptions);
  };
  const onItemSelect = (option) => {
    var _a;
    const parentNodes = [];
    let current = option;
    while (current) {
      parentNodes.unshift(current);
      const next = optionsParentMap.get(current[valueName]);
      current = next;
    }
    const keys2 = parentNodes.map((i) => i[valueName]);
    setExpandKeys(keys2);
    (_a = props.onExpand) === null || _a === void 0 ? void 0 : _a.call(props, keys2, parentNodes);
  };
  const renderSelectAllItem = (columnOptions, index2) => {
    var _a;
    const text = (_a = props.selectAllText) === null || _a === void 0 ? void 0 : _a[index2];
    if (!text) {
      return;
    }
    let currentLeafKeys = [];
    columnOptions.forEach((option) => {
      currentLeafKeys = currentLeafKeys.concat(getLeafKeys(option));
    });
    const allSelected = currentLeafKeys.every((i) => allSelectedLeafKeys.includes(i));
    return React$1.createElement("div", {
      onClick: () => {
        if (allSelected) {
          onChange(allSelectedLeafKeys.filter((i) => !currentLeafKeys.includes(i)));
        } else {
          onChange(allSelectedLeafKeys.concat(currentLeafKeys));
        }
      },
      className: `${classPrefix$2}-item`
    }, text);
  };
  const renderSelectAllLeafItem = (columnOptions, index2) => {
    var _a;
    const text = (_a = props.selectAllText) === null || _a === void 0 ? void 0 : _a[index2];
    if (!text) {
      return;
    }
    const currentLeafKeys = columnOptions.map((i) => i[valueName]);
    const allSelected = currentLeafKeys.every((i) => allSelectedLeafKeys.includes(i));
    const halfSelected = allSelected ? false : currentLeafKeys.some((i) => allSelectedLeafKeys.includes(i));
    return React$1.createElement("div", {
      onClick: () => {
        if (allSelected) {
          onChange(allSelectedLeafKeys.filter((i) => !currentLeafKeys.includes(i)));
        } else {
          onChange(allSelectedLeafKeys.concat(currentLeafKeys));
        }
      },
      className: classNames(`${classPrefix$2}-item`, `${classPrefix$2}-item-leaf`)
    }, React$1.createElement(Checkbox, {
      className: `${classPrefix$2}-item-checkbox`,
      checked: allSelected,
      indeterminate: halfSelected
    }), text);
  };
  const renderItem = (option) => {
    const isExpand = expandKeys.includes(option[valueName]);
    return React$1.createElement("div", {
      key: option[valueName],
      onClick: () => {
        if (!isExpand) {
          onItemSelect(option);
        }
      },
      className: classNames(`${classPrefix$2}-item`, {
        [`${classPrefix$2}-item-expand`]: isExpand
      })
    }, option[labelName], !!dotMap.get(option[valueName]) && React$1.createElement("div", {
      className: `${classPrefix$2}-dot`
    }));
  };
  const renderLeafItem = (option) => {
    const isSelected = allSelectedLeafKeys.includes(option[valueName]);
    return React$1.createElement("div", {
      key: option[valueName],
      onClick: () => {
        if (isSelected) {
          onChange(allSelectedLeafKeys.filter((val) => val !== option[valueName]));
        } else {
          onChange([...allSelectedLeafKeys, option[valueName]]);
        }
      },
      className: classNames(`${classPrefix$2}-item`, `${classPrefix$2}-item-leaf`)
    }, React$1.createElement(Checkbox, {
      className: `${classPrefix$2}-item-checkbox`,
      checked: isSelected
    }), option[labelName]);
  };
  const renderItems = (columnOptions = [], index2) => {
    if (columnOptions.length === 0) {
      return;
    }
    const isLeaf = deep === index2 + 1;
    if (isLeaf) {
      return React$1.createElement(React$1.Fragment, null, renderSelectAllLeafItem(columnOptions, index2), columnOptions.map((option) => {
        return renderLeafItem(option);
      }));
    }
    return React$1.createElement(React$1.Fragment, null, renderSelectAllItem(columnOptions, index2), columnOptions.map((option) => {
      return renderItem(option);
    }));
  };
  const renderColumns = () => {
    var _a;
    const columns = [];
    for (let i = 0; i < deep; i++) {
      let width = `${100 / deep}%`;
      if (deep === 2 && i === 0) {
        width = `33.33%`;
      }
      if (deep === 2 && i === 1) {
        width = `66.67%`;
      }
      const column = React$1.createElement("div", {
        key: i,
        className: classNames(`${classPrefix$2}-column`),
        style: {
          width
        }
      }, renderItems(i === 0 ? props.options : (_a = optionsMap.get(expandKeys[i - 1])) === null || _a === void 0 ? void 0 : _a[childrenName], i));
      columns.push(column);
    }
    return columns;
  };
  return withNativeProps(props, React$1.createElement("div", {
    className: classPrefix$2
  }, renderColumns()));
};
var index = attachPropertiesToComponent(TreeSelect, {
  Multiple
});
var virtualInput = "";
const classPrefix$1 = "adm-virtual-input";
const defaultProps$1 = {
  defaultValue: ""
};
const VirtualInput = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$1, p);
  const [value, setValue] = usePropsValue(props);
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);
  function scrollToEnd() {
    const root2 = rootRef.current;
    if (!root2)
      return;
    if (document.activeElement !== root2) {
      return;
    }
    const content = contentRef.current;
    if (!content)
      return;
    content.scrollLeft = content.clientWidth;
  }
  useIsomorphicLayoutEffect(() => {
    scrollToEnd();
  }, [value]);
  useEffect(() => {
    if (hasFocus) {
      scrollToEnd();
    }
  }, [hasFocus]);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;
      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }
  }));
  function onFocus() {
    var _a;
    setHasFocus(true);
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props);
  }
  function onBlur() {
    var _a;
    setHasFocus(false);
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
  }
  const keyboard = props.keyboard;
  const keyboardElement = keyboard && React$1.cloneElement(keyboard, {
    onInput: (v) => {
      var _a, _b;
      setValue(value + v);
      (_b = (_a = keyboard.props).onInput) === null || _b === void 0 ? void 0 : _b.call(_a, v);
    },
    onDelete: () => {
      var _a, _b;
      setValue(value.slice(0, -1));
      (_b = (_a = keyboard.props).onDelete) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    visible: hasFocus,
    onClose: () => {
      var _a, _b, _c;
      (_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      (_c = (_b = keyboard.props).onClose) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
  });
  return withNativeProps(props, React$1.createElement("div", {
    ref: rootRef,
    className: classNames(classPrefix$1, {
      [`${classPrefix$1}-disabled`]: props.disabled
    }),
    tabIndex: props.disabled ? void 0 : 0,
    onFocus,
    onBlur,
    onClick: props.onClick
  }, React$1.createElement("div", {
    className: `${classPrefix$1}-content`,
    ref: contentRef
  }, value, React$1.createElement("div", {
    className: `${classPrefix$1}-caret-container`
  }, hasFocus && React$1.createElement("div", {
    className: `${classPrefix$1}-caret`
  }))), props.clearable && !!value && hasFocus && React$1.createElement("div", {
    className: `${classPrefix$1}-clear`,
    onClick: (e) => {
      var _a;
      e.stopPropagation();
      setValue("");
      (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
    }
  }, React$1.createElement(CloseCircleFill, null)), !value && React$1.createElement("div", {
    className: `${classPrefix$1}-placeholder`
  }, props.placeholder), keyboardElement));
});
var waterMark = "";
const classPrefix = `adm-water-mark`;
const defaultProps = {
  fullPage: true
};
const WaterMark = (p) => {
  const props = mergeProps(defaultProps, p);
  const {
    zIndex = 2e3,
    gapX = 24,
    gapY = 48,
    width = 120,
    height = 64,
    rotate = -22,
    image: image2,
    imageWidth = 120,
    imageHeight = 64,
    content,
    fontStyle = "normal",
    fontWeight = "normal",
    fontColor = "rgba(0,0,0,.15)",
    fontSize = 14,
    fontFamily = "sans-serif"
  } = props;
  const [base64Url, setBase64Url] = useState("");
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ratio = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    const canvasWidth = `${(gapX + width) * ratio}px`;
    const canvasHeight = `${(gapY + height) * ratio}px`;
    const markWidth = width * ratio;
    const markHeight = height * ratio;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    if (ctx) {
      if (image2) {
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate(Math.PI / 180 * Number(rotate));
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = image2;
        img.onload = () => {
          ctx.drawImage(img, -imageWidth * ratio / 2, -imageHeight * ratio / 2, imageWidth * ratio, imageHeight * ratio);
          ctx.restore();
          setBase64Url(canvas.toDataURL());
        };
      } else if (content) {
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate(Math.PI / 180 * Number(rotate));
        const markSize = Number(fontSize) * ratio;
        ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
        ctx.fillStyle = fontColor;
        ctx.fillText(content, 0, 0);
        ctx.restore();
        setBase64Url(canvas.toDataURL());
      }
    } else {
      throw new Error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301Canvas");
    }
  }, [gapX, gapY, rotate, fontStyle, fontWeight, width, height, fontFamily, fontColor, image2, content, fontSize]);
  return withNativeProps(props, React$1.createElement("div", {
    className: classNames(classPrefix, {
      [`${classPrefix}-full-page`]: props.fullPage
    }),
    style: {
      zIndex,
      backgroundSize: `${gapX + width}px`,
      backgroundImage: `url('${base64Url}')`
    }
  }));
};
export { index$h as ActionSheet, AutoCenter, Avatar, Badge, Button, Calendar, index$g as CapsuleTabs, Card, index$f as CascadePicker, CascadePickerView, index$e as Cascader, CascaderView, CheckList, Checkbox, index$d as Collapse, ConfigProvider, index$c as DatePicker, DatePickerView, index$b as Dialog, Divider, DotLoading, index$a as Dropdown, Ellipsis, Empty, ErrorBlock, FloatingBubble, FloatingPanel, Form, Grid, Image$1 as Image, ImageUploader, ImageViewer, index$8 as IndexBar, InfiniteScroll, Input, index$7 as JumboTabs, List, DotLoading as Loading, Mask, index$6 as Modal, NavBar, NoticeBar, NumberKeyboard, PageIndicator, PasscodeInput, Picker, PickerView, Popover, Popup, ProgressBar, ProgressCircle, PullToRefresh, index$5 as Radio, Rate, Result, SafeArea, ScrollMask, SearchBar, Selector, index$4 as SideBar, Skeleton, Slider, Space, SpinLoading, Stepper, index$3 as Steps, SwipeAction, index$2 as Swiper, Switch, index$1 as TabBar, Tabs, Tag, TextArea, Toast, index as TreeSelect, VirtualInput, WaterMark, setDefaultConfig };
