import { expect } from 'chai';
import { set } from '.';

describe('set function', () => {
  const keypath = 'test';
  const value = 'value';
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by keypath to the object', () => {
    set(obj, keypath, value);
    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it('should return original object', () => {
    const res = set(obj, keypath, value);
    obj.test2 = 'other';
    expect(res).to.eq(obj);
  });

  it('should return original object if it is not an object', () => {
    const notAnObject = 'string';
    const res = set(notAnObject, keypath, value);
    expect(res).to.eq(notAnObject);
  });

  it('should throw an error if path is not a string', () => {
    const pathNotString = 42;
    // @ts-ignore
    const f = () => set(obj, pathNotString, value);
    expect(f).to.throw(Error);
  });
});
