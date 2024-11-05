const { getUsers } = require('../backend/services/user.service');

jest.mock('../backend/database/models', () => ({
  models: {
    User: {
      findAll: jest.fn(),
    },
  },
}));

beforeAll(() => {
    global.console = {
      ...global.console,
      error: jest.fn(),
      log: jest.fn(),
    };
  });

describe('User Service Tests', () => {
  const mockUsers = [{ id: 1, username: 'Test User', email: 'test@example.com' }];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all users', async () => {
    require('../backend/database/models').models.User.findAll.mockResolvedValue(mockUsers);

    const users = await getUsers();

    expect(require('../backend/database/models').models.User.findAll).toHaveBeenCalled();
    expect(users).toEqual(mockUsers);
  });

  it('should throw an error if fetching users fails', async () => {
    require('../backend/database/models').models.User.findAll.mockRejectedValue(new Error('Database Error'));

    await expect(getUsers()).rejects.toThrow('Database Error');
  });
});
