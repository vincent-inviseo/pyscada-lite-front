/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-types
export function InputBoolean(): Function {
  return function (target: any, key: string): void {

    const getter = function (): any {
      // using Typescript reflection
      // @ts-ignore
      return this['__' + key];
    };

    const setter = function (next: any): any {
      // using Typescript reflection
      // @ts-ignore
      this['__' + key] =
        next !== null && next !== undefined && `${next}` !== 'false';
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
