import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useFetchProducts = () => {
  return useMutation({
    mutationFn: () => {
      //   return API.get(`/items/product/v2`)
      return API.get(`/items/product/?status=accept`)
    },
  })
}

export const useFetchSingleProducts = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.get(`/items/product/${id}`)
    },
  })
}

// export const useFetchSingleProducts = (id) => {
//   return useQuery(['product', id], () => API.get(`/items/product/${id}`), {
//     enabled: !!id, // Only run this query if `id` is provided
//   })
// }

// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient()
//   return useMutation((id) => API.delete(`/superadmin/product/${id}`), {
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] }) // Updated to use an object
//     },
//   })
// }

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id) => {
      return API.delete(`/superadmin/product/${id}`)
    },
  })
}
