import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
import APIFormData from '../services/AxiosInstanceFormdata'

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
    enabled: !!id,
  })
}

export const useApproveLogistic = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/logistic/${id}`)
    },
  })
}

export const useBulkUploadLogistics = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await APIFormData.post('/superadmin/logistic/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res?.data
    },
  })
}
