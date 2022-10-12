import { Indexed } from '@store';

export function merge(a: Indexed, b: Indexed): Indexed {
  for (const p in b) {
    if (!b.hasOwnProperty(p)) {
      continue;
    }

    try {
      if ((b[p] as Indexed).constructor === Object) {
        b[p] = merge((a[p] as Indexed), (b[p] as Indexed));
      } else {
        a[p] = b[p];
      }
    } catch (e) {
      a[p] = b[p];
    }
  }
  return a;
}
