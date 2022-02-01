import axios from 'axios';

const clientAxios = axios.create({
  baseURL: `${process.env.GATSBY_SERVER_URL}/api`
})

export default clientAxios;