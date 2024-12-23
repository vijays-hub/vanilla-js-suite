/**
 * bind - The bind method in in JavaScript creates a new function with its this context permanently
 * set to the object provided, along with any optional arguments that are pre-specified. Unlike call
 * or apply, which execute the function immediately, bind does not invoke the function; instead,
 * it returns a new function that can be called later.
 *
 * Syntax - function.bind(thisArg, arg1, arg2, ...)
 *
 * The following code shows a polyfill for the bind method.
 */

Function.prototype.myCustomBind = function (bindObj, ...params) {
  if (typeof this !== "function") {
    throw new TypeError(
      `${this} is not a function. myCustomBind can only be used with functions.`
    );
  }

  const self = this;
  return function (...arguments) {
    self.apply(bindObj, [...params, ...arguments]);
  };
};

const object1 = {
  property1: 42,
  property2: "Hello World",
  printObject: function (age, city, country) {
    console.log(
      `Property1 is ${this.property1}, Property2 is ${this.property2}, and age is ${age}, from ${city}, ${country}`
    );
  },
};

const object2 = {
  property1: 84,
  property2: "Hello Universe",
};

const boundFunction = object1.printObject.myCustomBind(
  object2,
  25,
  "Bangalore?"
);
boundFunction("India");
