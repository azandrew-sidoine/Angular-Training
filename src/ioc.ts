type InjectorType = Object & {
  get: <T>(key: string) => T;
  register: <T>(key: string, fn: (...args: any) => T, ...args: any) => void;
};

let injector!: InjectorType;

function createInjector() {
  const _object = new Object();
  let __map = new Map<string, { fn: (...args: any) => unknown; args: any[] }>();

  Object.defineProperty(_object, 'get', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (key: string) => {
      const factory = __map.has(key) ? __map.get(key) : undefined;
      if (typeof factory !== 'undefined') {
        return factory.fn(...(factory.args ?? []));
      }
      return undefined;
    },
  });

  Object.defineProperty(_object, 'register', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: <T>(key: string, fn: (...args: any) => T, ...args: any) => {
      __map = __map.set(key, {
        fn,
        args: [...args],
      });
    },
  });

  return _object as InjectorType;
}

export function getInjector() {
  if (typeof injector === 'undefined' || injector === null) {
    injector = createInjector();
  }
  return injector;
}
