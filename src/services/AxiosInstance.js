import axios from 'axios'

// *** API SETUP ***/

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem('userToken')
  req.headers['Authorization'] = `${token}`
  req.headers['Content-type'] = 'application/json'
  req.headers['Accept'] = 'application/json'
  return req
})

export default API
