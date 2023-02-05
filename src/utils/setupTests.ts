import server from '@app/mocks/server';

beforeAll(() => {
  server.listen();

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
