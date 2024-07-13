import { app } from "../lib/axios.ts"
import { LoginUser } from "../types/requests/loginUser.ts";

export const login = async (loginUser: LoginUser) => {
  const response = await app.post('users/login', loginUser, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  });
  const {user, accessToken} = response.data;
  console.log(user) // remove

  localStorage.setItem('accessToken', accessToken);
}

export const refreshToken = async () => {
  const response = await app.get('users/refresh', {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  });
  const {user, accessToken} = response.data;
  console.log(user) // remove

  localStorage.setItem('accessToken', accessToken);
}

export const logout = async () => {
  await app.get('users/logout', {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  localStorage.removeItem('accessToken');
}