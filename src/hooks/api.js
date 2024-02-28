const base = import.meta.env.VITE_BASE_URL;

export const api = {
  base: base,
  signup: `${base}/api/signup`,
  signin: `${base}/superadmin/login`,
  verify_otp: `${base}/api/verify`,
  request_new_otp: `${base}/api/request`,
  get_product: `${base}/superadmin/`,
  get_vendors: `${base}/superadmin/vendor`,
  get_order: `${base}/superadmin/order`,
  get_uploads: `${base}/superadmin/`,
  get_withdrawal: `${base}/superadmin/withdraw`,
  confirm_withdrawal: `${base}/transaction/vendor`,
};
