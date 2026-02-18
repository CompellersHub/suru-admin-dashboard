import { useMutation } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/superadmin/login`, data)
    },
  })
}

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.delete(`/logout`, data)
    },
  })
}
