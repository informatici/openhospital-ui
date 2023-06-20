/**
 * Pick random items in an Array
 * @param input Input array
 * @param nbItems Number of items to pick
 * @returns Returns a list of random items
 */
export function randomItems<T>(input: T[], nbItems: number): T[] {
  const shuffledArray = input.sort(() => 0.5 - Math.random());

  return shuffledArray.slice(0, nbItems);
}
