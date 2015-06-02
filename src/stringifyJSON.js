// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  if( typeof obj === 'function' || obj === undefined ) {
    return undefined;
  }

  if( obj === null ) {
    return 'null';
  }

  if ( Object.prototype.toString.call(obj) === '[object String]' ) {
    return '"' + obj + '"';
  }

  if( Array.isArray(obj) ) {
    var lastI = obj.length - 1;
    var result = '[';

    obj.forEach(function(item,i) { 
      var val = stringifyJSON(item);
      result += (val) ? val : null;
      result += (i < lastI) ? ',' : '';
    });

    return result += ']';
  }

  if( obj.toString() === '[object Object]' ) {
    var keys = Object.keys(obj);
    var lastI = keys.length - 1;
    var result = '{';

    keys.forEach(function(k,i) {
      var val = stringifyJSON(obj[k]);

      if(!val) {
        return;
      }

      result += stringifyJSON(k) + ':';
      result += val;
      result += (i < lastI) ? ',' : '';
    });

    return result += '}';
  }

  // numbers and booleans
  return obj.toString();
};
