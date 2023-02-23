import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import setup from "./interceptors";
import { API_URL } from "../config/constant";

const ApiService = {
  init() {
    setup();
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;

    // Vue.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
    Vue.axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    Vue.axios.defaults.headers.common['Access-Control-Allow-Headers'] = "*";
    Vue.axios.defaults.headers.common['Access-Control-Allow-Methods'] = "*";
    // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    // headers: {
    //   'Content-Type': 'application/json'
    // }},
    Vue.axios.defaults.headers.common['Content-Type'] = "application/json";

    // headers: { "Content-Type": "multipart/form-data" }

    let token = document.head.querySelector('meta[name="csrf-token"]');
    console.log("token ????????", token)
    if (token) {
      Vue.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
    } else {
      console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
      );
    }

  },
  get(path) {
    return axios.get(API_URL + path, {
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      // }
      headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL1YxL2xvZ2luIiwiaWF0IjoxNjc2MzU0NDAxLCJuYmYiOjE2NzYzNTQ0MDEsImp0aSI6InJ1NWhTd2dhREdBckIybGEiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.FZ7y9mfhHDIx9mfBghf_AgVEu8V5Z5ubdnQuHF5KHkU`
      }
    });
  },

  // get(path) {
  //   return Vue.axios.get(path);
  // },

  post(path, params) {
    return axios.post(API_URL + path, params, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      }
    })
    // return axios.post("http://192.168.1.19:3000/auth/login", params)
  },

  // post(path, params) {
  //   return Vue.axios.post(path, params);
  // },

  put(path, data) {
    return axios.put(API_URL + path, data);
  },

  patch(path, data) {
    return axios.patch(API_URL + path, data);
  },

  update(path, slug, params) {
    return axios.put(`${API_URL + path}/${slug}`, params);
  },

  delete(path) {
    return axios.delete(API_URL + path);
  }
};

export default ApiService;
