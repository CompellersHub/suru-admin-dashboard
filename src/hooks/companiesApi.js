import { useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchOrganization = () => {
  return useQuery({
    queryKey: ['get_organization'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/organisation/`)
      return res?.data?.data
    },
  })
}
export const useFetchSingleOrganization = (id) => {
  return useQuery({
    queryKey: ['single_organization'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/organisation/${id}`)
      return res?.data?.data
    },
    enabled: !!id,
  })
}
