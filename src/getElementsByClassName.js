// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var nodeList = [];

  var childLoop = function(parent) {
    var children = parent.children;
    var length = children.length;
    var i = 0;
    var classList;

    for(; i < length; ++i) {

      if( children[i].classList.contains(className) ) {
        nodeList.push(children[i]);
      }

      if( children[i].children.length ) {
        childLoop(children[i]);
      }
    }
  };

  childLoop(document);

  return nodeList;
};
