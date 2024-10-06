function checkClassExists(elements, className) {
  //   Check if classList exists and if it contains the class name being passed.
  return elements.some(
    (element) => element.classList && element.classList.contains(className)
  );
}

export { checkClassExists };
