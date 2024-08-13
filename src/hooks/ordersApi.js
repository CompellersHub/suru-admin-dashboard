import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ['get_orders'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/order/`)
      return res?.data
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
    enabled: !!id,
  })
}

export const useConfirmOrder = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/product/${id}`)
    },
  })
}
