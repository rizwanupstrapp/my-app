import ApiService from "./api.service";

const CityService = {

  async getCityList(page = 1, search = null) {
    let url = `/city?page=${page}`;
    if (search) url += `&search=${search}`;
    // if (formType !== null) url += `&formType=${formType}`;
    return await ApiService.get(url);
  },


};

export default CityService;
