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

    if(!length) {
      return;
    }

    for(; i < length; ++i) {
      classList = [].slice.call(children[i].classList);

      if( classList.indexOf(className) !== -1 ) {
        nodeList.push(children[i]);
      }
      
      childLoop(children[i]);
    }
  };

  childLoop(document);

  return nodeList;
};
