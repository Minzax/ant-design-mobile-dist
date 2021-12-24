export function createIconComponent(svg) {
  var Icon = function Icon() {
    return svg;
  };

  return Icon;
}