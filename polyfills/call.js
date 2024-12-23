/**
 * call - Used to call a function with a given this value and arguments provided individually.
 *
 * Syntax: function.call(thisArg, arg1, arg2, ...)
 *
 * The following code shows a polyfill for the call method.
 */

Function.prototype.myCustomCall = function (callObj, ...params) {
  if (typeof this !== "function") {
    throw new TypeError(
      `${this} is not a function. myCustomCall can only be used with functions.`
    );
  }

  callObj.customFunction = this;
  const result = callObj.customFunction(...params);
  delete callObj.customFunction;
  return result;
};

const object1 = {
  property1: 42,
  property2: "Hello World",
  printObject: function (age) {
    console.log(
      `Property1 is ${this.property1}, Property2 is ${this.property2}, and age is ${age}`
    );
  },
};

const object2 = {
  property1: 84,
  property2: "Hello Universe",
};

console.log(object1.printObject.myCustomCall(object2, 25));
