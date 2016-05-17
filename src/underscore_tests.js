/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */


  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    var tempArr =[];
    if (n > array.length) {
      n = array.length;
    }
    if (n === undefined) {
      return array[0];
    }
    if (n === 0) {
      return [];
    }
    for (var i = 0; i < n; i++) {
       tempArr[i] = array[i];
    }
    return tempArr;
  };


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var tempArr =[];
    if (n > array.length) {
        return array;
    }
    if (n === undefined) {
      return array[array.length -1];
    }
    if (n === 0) {
      return [];
    }
    // so for [1,2,3] 2; need to assign array[1] to tempArr[0], and array[2] to tempArr[1]
    for (var i = 0; i < n; i++) {
      tempArr[i] = array[i + 1];
    }
    return tempArr;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result;
      for (var i = 0; i < array.length; i++) {
        if (target === array[i]) {
           return result = i;
        }else {
          result = -1;
        }
      }
      return result;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var resultArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        resultArray.push(collection[i]);
      }
    }
    return resultArray;
    };


  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var resultArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (!iterator(collection[i])) {
        resultArray.push(collection[i]);
      }
    }
    return resultArray;
  };

  // Produce a duplicate-free version of the array. QQQQQ
  _.uniq = function(array) {

      var resultArray = [];
      var n = 1;
      function isInArray(target) {
        for (var j = 0; j < n; j++) {
          if( resultArray.length > 0) {
            n = resultArray.length;
            }
          if (target === resultArray[j]) {
            return true;
          }
        }
        return false;
      }
      for (var i = 0; i < array.length; i++) {
        if (!isInArray(array[i]) ){
          resultArray.push(array[i]);
        }
      }
      return resultArray;

    };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    for (var i = 0; i < array.length; i++) {
      array[i] = iterator(array[i]);
    }
    return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages QQQQ
  _.pluck = function(array, propertyName) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(array[i][propertyName]);
    }
    return result;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === "string") {
      for (var i = 0; i < list.length; i++) {
        list[i][methodName](args);
      }
      return list;
    }
    for (var j = 0; j < list.length; j++) {
     methodName.call(list[j], args);
   }

   return list;
 };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
	var result = initialValue;
  if (initialValue === undefined) {
    result = 0;
  }
    for (var key in collection) {
     result =+ iterator(result, collection[key]);


    }
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var key in collection) {
      if (target === collection[key]) {
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = function () {
        if (collection[key]) {
          return true;
        }
        return false;
      }
    };
    for (var key in collection) {
      if (!iterator(collection[key])) {
        return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = function () {
        if (collection[key]) {
          return true;
        }
        return false;
      }
    };
    if (!iterator) {
      iterator = function () {}
    }
    for (var key in collection) {
      if(iterator(collection[key])) {
        return true;
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var result = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
          result[key] = arguments[i][key];

      }
    }
    return result;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var result = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (result[key] === undefined) {
          result[key] = arguments[i][key];
        }

      }
    }
    return result;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var ran = 0;
    var result;
    return function () {
      if (ran === 0) {
        result = func();
        ran = 1;
        return result;
      }else {
        return result;
      }


    }

  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  // going to use arguments, going to use closures
  _.memoize = function(func) {

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };



  // Shuffle an array.
  _.shuffle = function(array) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
