import { isPlainObject } from '.';

export function queryStringify(data: unknown): string {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  const res = [];
  for (const [key, value] of Object.entries(data)) {
    if (isPlainObject(value)) {
      const obj = Object.keys(value).reduce(
        (prev, curr) => ({
          ...prev,
          [`${key}[${curr}]`]: value[curr],
        }),
        {},
      );
      res.push(queryStringify(obj));
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => res.push(`${key}[${index}]=${item}`));
    } else {
      res.push(`${key}=${value}`);
    }
  }

  return res.join('&');
}
