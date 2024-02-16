const base = import.meta.env.VITE_BASE_URL;

export const api = {
  base: base,
  login: `${base}/api/login`,
  signup: `${base}/superadmin/login`,
  verify_otp: `${base}/api/verify`,
  request_new_otp: `${base}/api/request`,
  get_product: `${base}/superadmin/`,
};
