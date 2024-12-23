/**
 * reduce - The reduce() method applies a function against an accumulator and each element in
 * the array (from left to right) to reduce it to a single value.
 *
 * Syntax: arr.reduce(callback(accumulator, currentValue, index, array), initialValue)
 *
 * The following function is a polyfill for reduce method.
 */

Array.prototype.customReduce = function (callback, accumulator) {
  let result = accumulator;

  let startIndex = 0;
  if (accumulator === undefined) {
    result = this[0];
    // Since there is no initial value, we need to start from the next element, as the first element
    // is already used.
    startIndex = 1;
  }

  //   Loop through each item in the array, call the callback function and update the accumulator.
  for (let i = startIndex; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }

  return result;
};

const arr = [1, 2, 3, 4, 5];

const sum = arr.customReduce(function (accumulator, currentValue, index, array) {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 15
