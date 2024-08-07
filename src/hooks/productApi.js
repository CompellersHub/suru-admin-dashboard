import { useMutation } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.delete(`/superadmin/product/${id}`)
    },
  })
}
