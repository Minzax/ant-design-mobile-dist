"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeDeep = getTreeDeep;

// 找到树的深度
function getTreeDeep(treeData, childrenName) {
  if (childrenName === void 0) {
    childrenName = 'children';
  }

  var walker = function walker(tree) {
    var deep = 0;
    tree.forEach(function (item) {
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