import clienteAxios from './axios';

const authToken = token => {
  if (token) {
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete clienteAxios.defaults.headers.common['Authorization'];
  }
}

export default authToken;