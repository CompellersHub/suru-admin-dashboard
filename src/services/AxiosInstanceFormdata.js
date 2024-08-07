import axios from 'axios'

// *** API SETUP ***/

const APIFormData = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
APIFormData.interceptors.request.use((req) => {
  const token = sessionStorage.getItem('userToken')

  req.headers['Authorization'] = `${token}`
  req.headers['Content-type'] = 'multipart/form-data'
  req.headers['Accept'] = 'application/json'

  return req
})
export default APIFormData
