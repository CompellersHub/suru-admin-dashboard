import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchVendors = () => {
  return useQuery({
    queryKey: ['get_vendors'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/vendor/`)
      return res?.data?.data
    },
  })
}
export const useFetchSingleVendor = (id) => {
  return useQuery({
    queryKey: ['single_vendor'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/vendor/${id}`)
      return res?.data?.data
    },
    enabled: !!id,
  })
}

export const useApproveVendor = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/vendor/${id}`)
    },
  })
}

export const useDeleteVendor = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.delete(`/superadmin/vendor/${id}`)
    },
  })
}
