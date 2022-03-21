import axios from "axios";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    browserBaseURL: process.env.NEXT_PUBLIC_BROWSER_URL,
    withCredentials: true
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';
instance.defaults.headers.patch['Content-Type'] = 'application/json';

const cookies = new Cookies();

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('access');
    if (token) {
      config.headers['Authorization'] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // if access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const res = await instance.post("auth/refresh/", {
          });

          const accessToken = res.data.access;
          cookies.set('access',  accessToken, { path: '/', maxAge: 60*10 })
          let decodedToken = jwt_decode(accessToken);
          cookies.set('access_id', decodedToken.id, { path: '/', maxAge: 60*60*24*30 });
          cookies.set('auth', true, { path: '/', maxAge: 60*60*24*30 });

          return instance(originalConfig);
        } catch (_error) {
            cookies.set('access',false, { path: '/', maxAge: 0 })
            cookies.set('auth',false, { path: '/', maxAge: 0 })
            cookies.set('access_id', false, { path: '/', maxAge: 0 });
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;