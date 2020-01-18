/**
 * An auto-incrementing index for generating keys.
 *
 * @type {Number}
 */
let n: number;

/**
 * The global key generating function.
 *
 * @type {Function}
 */

let generate: () => string;

/**
 *
 * @param key { string }
 */
function create(key?: string): string {
  if (!key) {
    return generate();
  }

  if (typeof key === "string") {
    return key;
  }

  throw new Error(`Keys must be strings, but you passed: ${key}`);
}

/**
 * Set a different unique ID generating `function`.
 * @param func
 */
export function setGenerator(func: () => string): void {
  generate = func;
}

/**
 * Reset the key generating function to its initial state.
 */
export function resetGenerator(): void {
  n = 0;
  generate = () => `${n++}`;
}

/**
 * Set the initial state.
 */
resetGenerator();

export default {
  create,
  setGenerator,
  resetGenerator
};
