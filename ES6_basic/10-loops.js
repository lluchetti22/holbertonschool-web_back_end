export default function appendToEachArrayValue(array, appendString) {
  for (const idx of array.keys()) {
    array[idx] = appendString + array[idx];
  }

  return array;
}
