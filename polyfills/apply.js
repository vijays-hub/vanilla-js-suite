/**
 * apply - The apply method is used to call a function with a given this value and arguments provided as an array.
 *
 * Syntax - function.apply(thisArg, [argsArray])
 *
 * The following code shows a polyfill for the apply method.
 */
Function.prototype.myCustomApply = function (applyObj, params) {
  if (typeof this !== "function") {
    throw new TypeError(
      `${this} is not a function. myCustomApply can only be used with functions.`
    );
  }

  applyObj.tempFunction = this;
  const result = applyObj.tempFunction(...params);
  delete applyObj.tempFunction;
  return result;
};

const object1 = {
  property1: 42,
  property2: "Hello World",
  printObject: function (age, city) {
    console.log(
      `Property1 is ${this.property1}, Property2 is ${this.property2}, and age is ${age}. From ${city}`
    );
  },
};

const object2 = {
  property1: 84,
  property2: "Hello Universe",
};

console.log(object1.printObject.myCustomApply(object2, [25, "Bangalore?"]));
