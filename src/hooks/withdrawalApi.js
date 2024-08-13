import { useMutation, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchWithdrawals = () => {
  return useQuery({
    queryKey: ['get_withdrawals'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/vendor/withdraw/list`)
      return res?.data?.data
    },
  })
}

export const useFetchSingleWithdrawal = (id) => {
  return useQuery({
    queryKey: ['single_withdrawal'],
    queryFn: async () => {
      const res = await API.get(`/superadmin/vendor/withdraw/${id}`)
      return res?.data?.data
    },
    enabled: !!id,
  })
}

export const useUpdateWithdrawal = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.patch(`/superadmin/transaction/vendor/${id}`)
    },
  })
}
