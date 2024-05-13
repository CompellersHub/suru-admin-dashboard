const base = import.meta.env.VITE_BASE_URL;
// signup: `${base}/api/signup`,

export const api = {
  base: base,
  signin: `${base}/superadmin/login`,
  verify_otp: `${base}/api/verify`,
  request_new_otp: `${base}/api/request`,
  get_product: `${base}/superadmin/`,
  get_vendors: `${base}/superadmin/vendor`,
  get_order: `${base}/superadmin/order`,
  get_uploads: `${base}/items/product`,
  get_withdrawal: `${base}/superadmin/withdraw`,
  confirm_withdrawal: `${base}/superadmin/transaction/vendor`,
};
