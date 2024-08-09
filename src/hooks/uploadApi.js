import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchUploadProducts = () => {
  return useMutation({
    mutationFn: () => {
      return API.get(`/items/product/?status=pending`)
    },
  })
}

export const useFetchSingleUploadProducts = (id) => {
  return useQuery({
    queryKey: ['single_upload_product'],
    queryFn: async () => {
      const res = await API.get(`/items/product/${id}`)
      return res?.data?.message
    },
  })
}

export const useUpdateUpload = () => {
  return useMutation({
    mutationFn: (id, query) => {
      return API.patch(`/superadmin/product/${query}/${id}`)
    },
  })
}
