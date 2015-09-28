// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(JSONString) {
  var currI = -1;
  var ch = ' ';

  var escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: 'b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
  };

  var error = function(message) {
    throw new SyntaxError(message);
  };

  var getNextChar = function(expected) {
    if ( expected && expected !== ch ) {
      error("Expected '" + expected + "' instead of '" + ch + "'");
    }

    ch = JSONString.charAt(++currI);
    return ch;
  };

  var number = function() {
    var number;
    var string = '';

    while ( ch === '-' || ch === 'e' || ch === 'E' || ch === '.' || (ch >= '0' && ch <= '9') ) {
      string += ch;
      getNextChar();
    }
    number = +string;
    if (isNaN(number)) {
      error("Bad number");
    } else {
      return number;
    }
  };

  var string = function() {
    var string = '';

    if (ch === '"') {
      while ( getNextChar() ) {
        if ( ch === '"' ) {
          getNextChar();
          return string;
        } else if ( ch === '\\' ) {
          getNextChar();
          if (typeof escapee[ch] === 'string') {
            string += escapee[ch];
          } else {
            break;
          }
        } else {
          string += ch;
        }
      }
    }
    error("Bad string");
  };

  var skipWhiteSpace = function() {
    while (ch && ch <= ' ') {
      getNextChar();
    }
  };

  var trueFalseNull = function() {
    switch (ch) {
      case 't':
        getNextChar('t');
        getNextChar('r');
        getNextChar('u');
        getNextChar('e');
        return true;
      case 'f':
        getNextChar('f');
        getNextChar('a');
        getNextChar('l');
        getNextChar('s');
        getNextChar('e');
        return false;
      case 'n':
        getNextChar('n');
        getNextChar('u');
        getNextChar('l');
        getNextChar('l');
        return null;
    }
    error("Unexpected '" + ch + "'");
  };

  var array = function() {
    var array = [];

    if (ch === '[') {
      getNextChar('[');
      skipWhiteSpace();
      if (ch === ']') {
        getNextChar(']');
        return [];
      }
      while(ch) {
        array.push(value());
        skipWhiteSpace();
        if (ch === ']') {
          getNextChar(']');
          return array;
        }
        getNextChar(',');
        skipWhiteSpace();
      }
    }
    error("Bad array");
  };

  var object = function() {
    var key;
    var object = {};

    if (ch === '{') {
      getNextChar('{');
      skipWhiteSpace();
      if (ch === '}') {
        getNextChar('}');
        // empty object
        return object;
      }
      while (ch) {
        key = string();
        skipWhiteSpace();
        getNextChar(':');
        object[key] = value();
        skipWhiteSpace();
        if (ch === '}') {
          getNextChar('}');
          return object;
        }
        getNextChar(',');
        skipWhiteSpace();
      }
    }
    error("Bad object");
  };

  var value = function() {
    skipWhiteSpace();

    if( ch === '{' ) {
      return object();
    }
    if ( ch === '[' ) {
      return array();
    }
    if ( ch === '"' ) {
      return string();
    }

    return ( (ch >= '0' && ch <= '9') || ch === '-' ) ? number() : trueFalseNull();
  };

  return value();
};