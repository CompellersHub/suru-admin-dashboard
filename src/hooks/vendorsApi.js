import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchVendors = () => {
  return useMutation({
    mutationFn: () => {
      return API.get(`/superadmin/vendor`)
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
  })
}

export const useApproveVendor = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/vendor/${id}`)
    },
  })
}
