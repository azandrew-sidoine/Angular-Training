import { getInjector } from './ioc';
import { WebStorage } from './storage';

const injector = getInjector();

// #region Enrégistrement des dépendances
injector.register('local', () => {
  return window.localStorage;
});

injector.register('session', () => {
  return window.sessionStorage;
});

injector.register('Webstorage', (storage: Storage) => {
  return new WebStorage(storage);
}, injector.get('session'));
// #endregion Enrégistrement des dépendances
