import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { settings as s } from '../Settings';

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();
    const user = JSON.parse(this.getUser());

    if (!accessToken) {
      return;
    }

    if (user) {
      this.setUser(user);
    }

    if (this.isValidToken(accessToken) && accessToken) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }

  loginWithEmailAndPassword = (email, password) =>
    new Promise((resolve, reject) => {
      fetch(`${s.baseUrl}${s.account.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.result.username) {
            this.setSession(response.result.token);
            this.setUser(response.result);
            debugger;
            resolve(response.result);
          } else {
            debugger;
            reject(response.result);
          }
        })
        .catch((error) => {
          debugger;
          reject(error);
        });
    });

  loginInWithToken = () =>
    new Promise((resolve, reject) => {
      const user = JSON.parse(this.getUser());
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });

  logout = () => {
    this.setSession(null);
    this.setUser(null);
  };

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('jwt_access_token', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  setUser = (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common.Authorization = `Bearer ${user}`;
    } else {
      localStorage.removeItem('user');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  getAccessToken = () => localStorage.getItem('jwt_access_token');

  getUser = () => localStorage.getItem('user');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  };

  isAuthenticated = () => !!this.getAccessToken();
}

const authService = new AuthService();

export default authService;
