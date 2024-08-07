import { useMutation } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const UseSignUp = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/signup`, data)
    },
  })
}

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/verify`, data)
    },
  })
}

export const useVerifyEmailResendOtp = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/resend-code`, data)
    },
  })
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/superadmin/login`, data)
    },
  })
}

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/forgotpassword`, data)
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.post(`/resetpassword`, data)
    },
  })
}

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.delete(`/logout`, data)
    },
  })
}
export const useDeleteAcc = () => {
  return useMutation({
    mutationFn: ({ data }) => {
      return API.delete(`/delete-account`, data)
    },
  })
}
