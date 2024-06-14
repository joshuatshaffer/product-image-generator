export function randomElement<T>(array: ArrayLike<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}
