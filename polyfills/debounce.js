/**
 * debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often,
 * that it stalls the performance of the web page.
 *
 * The idea is that if there are frequent events that trigger a function, we can delay the execution
 * of the function until the events have stopped arriving.
 *
 * The following function implements a debounce function that will prevent a function from being
 * called if it has been less than a certain amount of time since it was last called.
 */

const debounce = function (fun, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fun.apply(this, args);
    }, delay);
  };
};

const debouncedFun = debounce(function (stuff) {
  console.log("Hello from debounced function");
}, 3000);

debouncedFun();
debouncedFun();
debouncedFun();
debouncedFun(); // Only this will be executed after 3 seconds
