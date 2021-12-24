/**
 * 数组打乱
 * @param array 任意数组
 * @returns any[] 打乱后的数组
 */
export function shuffle(array) {
  var result = [].concat(array);

  for (var i = result.length; i > 0; i--) {
    var j = Math.floor(Math.random() * i);
    var _ref = [result[j], result[i - 1]];
    result[i - 1] = _ref[0];
    result[j] = _ref[1];
  }

  return result;
}