export default function cleanSet(set, startString) {
  if (typeof startString !== 'string' || !startString) {
    return '';
  }

  const result = [];

  set.forEach((value) => {
    if (typeof value === 'string' && value.startsWith(startString)) {
      result.push(value.slice(startString.length));
    }
  });

  return result.join('-');
}
