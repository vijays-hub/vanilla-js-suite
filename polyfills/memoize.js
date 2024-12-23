/**
 * The memoize function is used to cache the result of a function call. If the function is called
 * with the same arguments, the cached result is returned instead of calling the function again.
 * Extremely useful for performance optimization.
 *
 * The following implementation is a simple memoize function that works with functions that take
 * two arguments.
 */

const memoize = function (fun) {
  let cache = {};
  return function (...args) {
    const cacheKey = JSON.stringify(args);

    if (!cache[cacheKey]) {
      cache[cacheKey] = fun.apply(this, args);
    }

    return cache[cacheKey];
  };
};

const expensiveFunction = (a, b) => {
  let output = 0;
  for (let i = 0; i < 10000000; i++) {
    output += i;
  }
  return output + a + b;
};

const myMemoizedFunction = memoize(expensiveFunction);

console.time();
console.log(myMemoizedFunction(1, 2)); // This will take some time
console.timeEnd();

console.log("***************");

console.time();
console.log(myMemoizedFunction(1, 2)); // This will return the cached result
console.timeEnd();

console.log("***************");

console.time();
console.log(myMemoizedFunction(3, 4)); // This will take some time
console.timeEnd();

console.log("***************");

console.time();
console.log(myMemoizedFunction(3, 4)); // This will return the cached result
console.timeEnd();
