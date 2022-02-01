import React, { createContext, useState } from 'react';
import authToken from '../axios/token';
import clienteAxios from '../axios/axios';
import Swal from 'sweetalert2';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const res = await clienteAxios.post('/user/signin', { email, password });

      saveToken(res.data.token);

      obtainUser();
    } catch (err) {
      if (!err.response) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error de conexión',
          confirmButtonColor: '#0b5ed7'
        });
      }
      const errors = err.response.data;
      const msg = errors?.errors?.length ? errors.errors[0].msg : errors.err;
      setAuth(null);
      setLoading(false);
      setUser(null);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
        confirmButtonColor: '#0b5ed7'
      });
    }
  }

  const obtainUser = async () => {
    const userToken = await getToken();

    if (userToken) {
      authToken(userToken)
    };

    try {
      const res = await clienteAxios.get('/user/obtain-auth-user');

      setUser(res.data.user);
      setAuth(true);
      setLoading(false);
    } catch (err) {
      const errors = err.response.data;
      const msg = errors?.errors?.length ? errors.errors[0].msg : errors.err;
      setAuth(null);
      setLoading(false);
      setUser(null);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
        confirmButtonColor: '#0b5ed7'
      });
    }
  }

  const logoutUser = async () => {
    try {
      await clienteAxios.post('/user/logout');

      localStorage.removeItem('token');

      setUser(null);
      setAuth(null);
      setLoading(false);
    } catch (err) {
      const errors = err.response.data;
      const msg = errors?.errors?.length ? errors.errors[0].msg : errors.err;
      setAuth(null);
      setLoading(false);
      setUser(null);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
        confirmButtonColor: '#0b5ed7'
      });
    }
  }

  const getToken = () => {
    const token = localStorage.getItem('token');

    return token;
  }

  const saveToken = (token) => {
    localStorage.setItem('token', token);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        auth,
        loading,
        signIn,
        logoutUser,
        obtainUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;