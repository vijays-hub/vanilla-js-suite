export default function generateWinningCombinations(size) {
  const GRID_SIZE = size;
  const combinations = [];

  /**
   * Horizontal Combinations.
   * For every row, loop through the columns and add
   * the combination to the combinations array.
   */
  for (let row = 0; row < GRID_SIZE; row++) {
    const combination = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      /**
       * The index of the box can be calculated by the formula:
       * (row * GRID_SIZE) + col.
       * Example:
       * For 3x3 grid:
       * 0 1 2
       * 3 4 5
       * 6 7 8
       *
       * For row 0, col 0: (0 * 3) + 0 = 0
       * For row 0, col 1: (0 * 3) + 1 = 1
       * For row 0, col 2: (0 * 3) + 2 = 2
       *
       * So, the indexes for the first row are 0, 1, 2.
       */
      combination.push(row * GRID_SIZE + col);
    }

    // Append the combination to the combinations array.
    combinations.push(combination);
  }

  // Vertical Combinations
  for (let col = 0; col < GRID_SIZE; col++) {
    const combination = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      /**
       * The index of the box can be calculated by the formula:
       * (row * GRID_SIZE) + col.
       * Example:
       * For 3x3 grid:
       * 0 1 2
       * 3 4 5
       * 6 7 8
       *
       * For row 0, col 0: (0 * 3) + 0 = 0
       * For row 1, col 0: (1 * 3) + 0 = 3
       * For row 2, col 0: (2 * 3) + 0 = 6
       *
       * So, the indexes for the first column are 0, 3, 6.
       */
      combination.push(row * GRID_SIZE + col);
    }

    // Append the combination to the combinations array.
    combinations.push(combination);
  }

  // Diagonal Combinations

  // Main Diagonal (Top Left to Bottom Right)
  const mainDiagonal = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    /**
     * The index of the box can be calculated by the formula:
     * (i * GRID_SIZE) + col.
     *
     * For the main diagonal, the row and column are the same.
     * So, the index can be calculated by (i * GRID_SIZE) + i.
     *
     * Example:
     * For 3x3 grid:
     * 0 1 2
     * 3 4 5
     * 6 7 8
     *
     * For the main diagonal:
     * Index 0: (0 * 3) + 0 = 0
     * Index 1: (1 * 3) + 1 = 4
     * Index 2: (2 * 3) + 2 = 8
     */
    mainDiagonal.push(i * GRID_SIZE + i);
  }

  // Append the main diagonal to the combinations array.
  combinations.push(mainDiagonal);

  // Anti Diagonal (Top Right to Bottom Left)
  const antiDiagonal = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    /**
     * For the anti diagonal, the row and column are the same.
     * So, the index can be calculated by (i * GRID_SIZE) + (GRID_SIZE - 1 - i).
     *
     * Example:
     * For 3x3 grid:
     * 0 1 2
     * 3 4 5
     * 6 7 8
     *
     * For the anti diagonal:
     * Index 1: (0 * 3) + (3 - 1 - 0) = 2
     * Index 2: (1 * 3) + (3 - 1 - 1) = 4
     * Index 3: (2 * 3) + (3 - 1 - 2) = 6
     */
    antiDiagonal.push(i * GRID_SIZE + (GRID_SIZE - 1 - i));
  }

  // Append the anti diagonal to the combinations array.
  combinations.push(antiDiagonal);

  // Return the generated combinations.
  return combinations;
}
