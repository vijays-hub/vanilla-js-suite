/**
 * forEach - The forEach() method executes a provided function once for each array element.
 *
 * Does not mutate the array on which it is called. Does not return a value.
 *
 * Syntax: arr.forEach(callback(currentValue, index, array),thisArg)
 *
 * The following code is a polyfill for forEach method.
 */

Array.prototype.customForEach = function (callback, context) {
  if (!Array.isArray(this)) {
    throw new TypeError(`${this} is not an array`);
  }

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  for (let i = 0; i < this.length; i++) {
    callback.call(context, this[i], i, this);
  }
};

const arr = [1, 2, 3, 4, 5];
const context = {
  value: 10,
};

arr.customForEach(function (currentValue, index, array) {
  console.log(currentValue * this.value); // Multiply each element by 10
}, context);
