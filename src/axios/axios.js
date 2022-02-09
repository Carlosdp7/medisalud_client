import axios from 'axios';

const clientAxios = axios.create({
  baseURL: `https://medisalud-api.herokuapp.com/api`
})

export default clientAxios;