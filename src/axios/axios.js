import axios from 'axios';

const clientAxios = axios.create({
  baseURL: `https://medisalud-api.herokuapp.com/api`
  // baseURL: 'http://localhost:8080/api'
})

export default clientAxios;