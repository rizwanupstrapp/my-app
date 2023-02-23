import axios from "axios";
// import { getCookie } from "./cookie.service";
// import { TOKEN_KEY } from "@/config/constant";
import store from "@/store";

export default function setup() {
  
  console.log('setup() calling')
  axios.interceptors.request.use(
    function(config) {
      config.headers.common["Content-Type"] =
        "application/x-www-form-urlencoded";
      config.headers.common["Accept"] = "application/json";
      config.headers.common["Access-Control-Allow-Origin"] = "*";
      // console.log("localStorage.getItem('userToken')", localStorage.getItem("userToken"))
      if (localStorage.getItem("userToken")) {
        config.headers.common.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
      }
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    response => {
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    },
    error => {
      // console.log('server error', error.response.status)
      if (error && error.response.status) {
        switch (error.response.status) {
          case 403:
            store.dispatch("PURGE_AUTH");
            break;
        }
      }
      return Promise.reject(error.response.data);
    }
  );
}
