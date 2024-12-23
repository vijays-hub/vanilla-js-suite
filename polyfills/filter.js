/**
 * filter - The filter() method creates a new array with all elements that pass the test
 * implemented by the provided function.
 *
 * Syntax: arr.filter(callback(element, index, array), thisArg)
 *
 * Example:
 * const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
 * const result = words.filter(word => word.length > 6);
 * console.log(result);
 *
 * Output: Array ["exuberant", "destruction", "present"]
 *
 * The following function is a polyfill for filter method.
 */

Array.prototype.myCustomFilter = function (callback, context) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (!Array.isArray(this)) {
    throw new TypeError(this + " is not an array");
  }

  const array = [];

  for (let i = 0; i < this.length; i++) {
    const res = callback.call(context, this[i], i, this);

    // Push the element to the new array if the result is true
    if (res) {
      array.push(this[i]);
    }
  }

  return array;
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const context = {
  condition: 5, // Filter elements greater than 5
};

const filteredNumbers = arr.myCustomFilter(function (
  currentValue,
  index,
  array
) {
  return currentValue > this.condition;
},
context);

console.log(filteredNumbers); // Output: [6, 7, 8, 9, 10]
