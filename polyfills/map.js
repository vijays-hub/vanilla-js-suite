/**
 * Map - The map method creates a new array with the results of calling a provided function on
 * every element in the calling array.
 *
 * Syntax: arr.map(callback(currentValue, index, array), thisValue)
 *
 * Example:
 * var numbers = [1, 4, 9];
 * var roots = numbers.map(function(num) {
 *  return Math.sqrt(num);
 * });
 *
 * Output: roots is now [1, 2, 3]
 *
 * The following code implements the map method for browsers that do not support it.
 */
Array.prototype.customMap = function (callback, context) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError(this + " is not an array");
  }

  const array = [];

  for (let i = 0; i < this.length; i++) {
    const res = callback.call(context, this[i], i, this);
    array.push(res);
  }

  return array;
};

const arr = [1, 4, 9];
const context = {
  multiplier: 5,
  offset: 10,
};

const multiplied = arr.customMap(function (currentValue, index, array) {
  return currentValue * this.multiplier + this.offset;
}, context);

console.log(multiplied); // Output: [15, 30, 55]
