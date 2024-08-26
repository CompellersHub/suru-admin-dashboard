import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ['get_products'],
    queryFn: async () => {
      const res = await API.get(`/items/product/?status=accept`)
      return res?.data?.baskets
    },
  })
}

export const useFetchSingleProducts = (id) => {
  return useQuery({
    queryKey: ['single_product'],
    queryFn: async () => {
      const res = await API.get(`/items/product/${id}`)
      return res?.data?.message
    },
    enabled: !!id,
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.delete(`/superadmin/product/${id}`)
    },
  })
}

export const useEditProduct = () => {
  return useMutation({
    mutationFn: ({ id, ...data }) => {
      console.log(data, 'mutation')
      return API.patch(`/superadmin/product/${id}`, data)
    },
  })
}
