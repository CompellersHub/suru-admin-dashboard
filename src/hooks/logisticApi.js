import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchLogistics = () => {
  return useQuery({
    queryKey: ['get_logistic'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/logistic`)
      return res?.data?.data
    },
  })
}
export const useFetchSingleLogistic = (id) => {
  return useQuery({
    queryKey: ['single_logistic'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/logistic/${id}`)
      return res?.data?.data
    },
  })
}

export const useApproveLogistic = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/logistic/${id}`)
    },
  })
}
