import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL : `${process.env.REACT_APP_USER_URL}`
});

api.interceptors.request.use(async config => {
  if(config.url!=="/api/authenticate" && config.url!=="/api/newaccount"){
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  }
  return config;
});


class ApiService {
    constructor (apiurl){
        this.apiurl = apiurl;
    }
    post(url,objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return api.post(requestUrl,objeto,);
    }
    
    postFormData(url,objeto){
        const requestUrl = `${this.apiurl}${url}`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return api.post(requestUrl,objeto,config);
    }
    put(url,objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return api.put(requestUrl,objeto);
    }
    delete(url){
        const requestUrl = `${this.apiurl}${url}`;
        return api.delete(requestUrl);
    }
    get(url){
        const requestUrl = `${this.apiurl}${url}`;
        return api.get(requestUrl);
    }
}
export default ApiService