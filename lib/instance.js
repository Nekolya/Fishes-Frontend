import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    browserBaseURL: process.env.NEXT_PUBLIC_BROWSER_URL,
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';
instance.defaults.headers.patch['Content-Type'] = 'application/json';

export default instance;