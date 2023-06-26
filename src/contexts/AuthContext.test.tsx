import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext, AuthContextType, AuthProvider } from './AuthContext';


const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => (store[key] = value.toString()),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('AuthContext', () => {
  it('should render children correctly', () => {
    const DummyComponent = () => <div>dummy</div>;
    const { container } = render(
      <AuthProvider>
        <DummyComponent />
      </AuthProvider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByText(/dummy/i)).toBeInTheDocument();
  })
});

it('should provide auth state and functions', () => {
  let authContextValue: AuthContextType | undefined;
  const DummyComponent = () => {
    const authContext = React.useContext(AuthContext);
    authContextValue = authContext;
    return <div>dummy</div>;
  };

  render(
    <AuthProvider>
      <DummyComponent />
    </AuthProvider>
  );
  expect(authContextValue).not.toBeUndefined();
  expect(authContextValue?.authState).toHaveProperty('token', '');
  expect(typeof authContextValue?.logout).toBe('function');
  expect(typeof authContextValue?.setAuthState).toBe('function');
  expect(typeof authContextValue?.isUserAuthenticated).toBe('function');
});


it('should update auth state on login and logout', async () => {
  const DummyComponent = () => {
    const { authState, setAuthState, logout } = React.useContext(AuthContext);

    const handleLogin = () => {
      setAuthState({ token: 'test-token' });
    };

    const handleLogout = () => {
      logout();
    };

    return (
      <>
        <div data-testid="token">{authState.token}</div>
        <button onClick={handleLogin} data-testid="login-btn">
          Login
        </button>
        <button onClick={handleLogout} data-testid="logout-btn">
          Logout
        </button>
      </>
    );
  };

  render(
    <AuthProvider>
      <DummyComponent />
    </AuthProvider>
  );

  const tokenDiv = screen.getByTestId('token');
  expect(tokenDiv).toHaveTextContent('');

  const loginBtn = screen.getByTestId('login-btn');
  const logoutBtn = screen.getByTestId('logout-btn');

  await act(async () => {
    userEvent.click(loginBtn);
  });

  expect(tokenDiv).toHaveTextContent('test-token');

  await act(async () => {
    userEvent.click(logoutBtn);
  });

  expect(tokenDiv).toHaveTextContent('');
})