type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject | [] {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(a: PlainObject, b: PlainObject): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const [key, value] of Object.entries(a)) {
    const rValue = b[key];
    if (isArrayOrObject(value) && isArrayOrObject(rValue)) {
      if (!isEqual(value, rValue)) {
        return false;
      }
    } else if (value !== rValue) {
      return false;
    }
  }
  return true;
}
