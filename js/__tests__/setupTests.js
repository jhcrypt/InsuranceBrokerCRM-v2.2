import localStorageMock from '../__mocks__/localStorage';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});
