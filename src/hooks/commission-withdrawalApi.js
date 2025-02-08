import { useQuery, useMutation } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useFetchCommissionWithdrwalRequests = () => {
  return useQuery({
    queryKey: ["get_commission_withdrawals"],
    queryFn: async () => {
      const res = await API.get(`/refferal/commission/admin/withdraw`);
      return res?.data?.data;
    },
  });
};

export const useFetchSingleCommissionWithdrawal = (id) => {
  return useQuery({
    queryKey: ["single_commission_withdrawal", id],
    queryFn: async () => {
      const res = await API.get(`/refferal/commission/withdraw/${id}`);
      return res?.data?.data;
    },
    enabled: !!id,
  });
};

export const useDeclineCommissionWithdrawal = () => {
  return useMutation({
    mutationFn: async ({ id, reason }) => {
      const res = await API.patch(
        `/refferal/commission/withdraw/admin/decline/${id}`,
        { reason }
      );
      return res?.data?.data;
    },
  });
};

export const useApproveCommissionWithdrawal = () => {
  return useMutation({
    mutationFn: async (id) => {
      const res = await API.patch(
        `/refferal/commission/withdraw/admin/approve/${id}`
      );
      return res?.data?.data;
    },
  });
};
