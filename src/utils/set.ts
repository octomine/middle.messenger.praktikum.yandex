import { Indexed } from '../store';
import { merge } from './merge';

export function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (typeof object !== 'object') {
    return object;
  }

  const arr = path.split('.');
  const res = arr.reduceRight<Indexed>((prev, curr) => ({ [curr]: prev }), value as Indexed);

  return merge(object, res);
}
