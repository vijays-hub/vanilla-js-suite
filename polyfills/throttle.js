/**
 * Throttle function:
 * - Throttle the execution of a function to a fixed time interval.
 * - It will only execute the function at most once in a given time interval.
 *
 * The following function implements a throttle function that will prevent a function from being
 * called if it has been less than a certain amount of time since it was last called.
 */

// Version 1
// const throttle = function (fun, limit) {
//   let flag = true;
//   return function (...args) {
//     if (flag) {
//       fun.apply(this, args);
//       flag = false;
//       setTimeout(() => {
//         flag = true;
//       }, limit);
//     }
//   };
// };

// Version 2
const throttle = function (fun, limit) {
  let lastCalled = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCalled >= limit) {
      fun.apply(this, args);
      lastCalled = now;
    }
  };
};

const throttledFun = throttle(function (stuff) {
  console.log("Hello from throttled function");
}, 300);

throttledFun();
throttledFun();
throttledFun();
throttledFun();
throttledFun();
throttledFun();
throttledFun();
