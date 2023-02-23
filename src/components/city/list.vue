<template>
  <div v-if="cities.length">
    <TableAction
      :moduleName="moduleName"
      :columns="columns"
      :items="cities"
    />
    <Pagination :pagination.sync="pagination" />
  </div>
</template>

<script>
import TableAction from "@/components/tables/tableAction.vue";
import CityService from "@/services/city.service";
import Pagination from "@/components/utils/Pagination.vue";

export default {
  name: "CityList",
  components: {
    TableAction,
    Pagination
  },
  data() {
    return {
      moduleName: "Country List",
      cities: [],
      searchTextQuery: "",
      pagination: {
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 15,
      },
      columns: [{text: 'City Code', value: 'city_code'}, {text: 'City Name', value: 'city_name'}, {text: 'Status', value: 'status'}, {text: 'Created At', value: 'created_at'}, {text: 'Action', value: 'Action'}],
    };
  },
  mounted() {
    this.getCitiesList();
  },
  methods: {
    updatedSearchText(text) {
      this.searchTextQuery = text;
    },
    async getCitiesList() {
      try {
        // CityService.setHeader();
        // this.$loading(true);
        await CityService.getCityList(
          this.pagination.currentPage,
          this.searchTextQuery
        ).then((response) => {
          this.cities = response.data.data;
          this.pagination.totalPages = response.data.last_page;
          this.pagination.currentPage = response.data.current_page;
        });
      } catch (error) {
        this.cities = [];
        this.totalPages = 1;
      }
    },
  },
  watch: {
    searchTextQuery() {
      this.getCitiesList(this.searchTextQuery);
    },
    pagination() {
      this.getCitiesList(this.pagination);
    },
  },
};
</script>