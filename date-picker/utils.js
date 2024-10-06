function checkClassExists(elements, className) {
  console.log({ elements, className });

  /**
   * Each element in the elements array is a DOM element. We need to check if
   * this element has a classList property. If it does, we check if it contains
   * the className being passed. If it does, we return true. If it doesn't, we
   * return false.
   */

  return elements.some(
    (element) => element.classList && element.classList.contains(className)
  );
}

export { checkClassExists };
