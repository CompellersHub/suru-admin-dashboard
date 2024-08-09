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

export const useFetchSingleOrder = (id) => {
  return useQuery({
    queryKey: ['single_order'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/order/${id}`)
      return res?.data?.data
    },
  })
}

export const useConfirmOrder = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/product/${id}`)
    },
  })
}
