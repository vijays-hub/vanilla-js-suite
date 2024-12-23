/**
 * The Promise.all() method returns a single Promise that resolves when all of the promises
 * in the iterable argument have resolved or when the iterable argument contains no promises.
 * It rejects with the reason of the first promise that rejects.
 *
 * The following code implements the Promise.all() method for browsers that do not support it.
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "one");
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(
    () => {
      reject("Promise 2 rejected!");
    },
    2000,
    "two"
  );
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "three");
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, "four");
});

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];

    // Maintain a count of resolved promises
    let resolvedCount = 0;

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          results.push(res);
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

// Output: ["one", "three", "four"]
Promise.myAll([p1, p3, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// Output: Promise 2 rejected!
Promise.myAll([p1, p2, p3, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
