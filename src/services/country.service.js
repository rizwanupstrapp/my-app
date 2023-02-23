import ApiService from "./api.service";

const CountryService = {

  async getCountryList(page = 1, search = null) {
    let url = `/country?page=${page}`;
    if (search) url += `&search=${search}`;
    // if (formType !== null) url += `&formType=${formType}`;
    return await ApiService.get(url);
  },

};

export default CountryService;
