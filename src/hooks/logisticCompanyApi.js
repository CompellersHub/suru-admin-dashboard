import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchLogisticsCompanies = () => {
  return useQuery({
    queryKey: ['get_logistics_companies'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/logistic`)
      return res?.data?.data
    },
  })
}

export const useCreateLogisticsCompany = () => {
  return useMutation({
    mutationFn: async (companyData) => {
      const res = await API.post('/superadmin/logistic', companyData)
      return res?.data
    },
  })
}

export const useResendLogisticsCredentials = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.post(`/superadmin/logistic/${id}/resend-credentials`)
    },
  })
}