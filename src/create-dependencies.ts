import { getInjector } from './ioc';

const injector = getInjector();

// #region Enrégistrement des dépendances
injector.register('local', () => {
  return window.localStorage;
});

injector.register('session', () => {
  return window.sessionStorage;
});
// #endregion Enrégistrement des dépendances
