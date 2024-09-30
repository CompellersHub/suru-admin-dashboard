import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchUploadProducts = () => {
  return useQuery({
    queryKey: ['get_upload_products'],
    queryFn: async () => {
      const res = await API.get(`/items/product/?status=pending`)
      return res?.data?.baskets
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
    enabled: !!id,
  })
}

export const useUpdateUpload = () => {
  return useMutation({
    mutationFn: ({ id, query }) => {
      return API.patch(`/superadmin/product/${id}/${query}`)
    },
  })
}

export const useEditUploadProduct = () => {
  return useMutation({
    mutationFn: ({ id, ...data }) => {
      return API.patch(`/superadmin/product/${id}`, data)
    },
  })
}
