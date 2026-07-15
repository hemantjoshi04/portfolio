const MOCK_DELAY = 500;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    await delay(MOCK_DELAY);
    if (email === 'admin@abhilasha.com' && password === 'password123') {
      return {
        success: true,
        data: {
          user: {
            id: 'user_123',
            email: 'admin@abhilasha.com',
            name: 'Abhilasha',
            role: 'admin'
          },
          token: 'mock_jwt_token_123'
        },
        error: null
      };
    }
    return {
      success: false,
      data: null,
      error: 'Invalid credentials'
    };
  },

  logout: async () => {
    await delay(MOCK_DELAY);
    return {
      success: true,
      data: { success: true },
      error: null
    };
  },

  getSession: async () => {
    await delay(MOCK_DELAY);
    return {
      success: true,
      data: {
        user: {
          id: 'user_123',
          email: 'admin@abhilasha.com',
          name: 'Abhilasha',
          role: 'admin'
        }
      },
      error: null
    };
  }
};
