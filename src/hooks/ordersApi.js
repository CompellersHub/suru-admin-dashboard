import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchOrders = () => {
  return useMutation({
    mutationFn: () => {
      //   return API.get(`/items/product/v2`)
      return API.get(`/superadmin/order`)
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
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.delete(`/superadmin/product/${id}`)
    },
  })
}
