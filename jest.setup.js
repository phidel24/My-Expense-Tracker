// jest.setup.js
beforeAll(() => {
    global.console = {
      ...global.console,
      error: jest.fn(),
      log: jest.fn(),
    };
  });
  