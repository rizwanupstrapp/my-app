<template>
  <div v-if="countries.length">
    <!-- <div>
      <Search @update:search="updatedSearchText" />
    </div> -->

    <TableAction
      :moduleName="moduleName"
      :columns="columns"
      :items="countries"
    />
    <!-- :itemsPerPage="pagination.perPage" -->
    <Pagination :pagination.sync="pagination" />
  </div>
</template>

<script>
import TableAction from "@/components/tables/tableAction.vue";
import CountryService from "@/services/country.service";
import Pagination from "@/components/utils/Pagination.vue";
// import Search from "@/components/utils/Search.vue";

export default {
  name: "CountryList",
  components: {
    // Search,
    TableAction,
    Pagination,
  },
  data() {
    return {
      moduleName: "Country List",
      countries: [],
      searchTextQuery: "",
      pagination: {
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 15,
      },
      columns: [
        { text: "Country Phone Code", value: "country_phone_code" },
        { text: "Country Name", value: "country_name" },
        { text: "Status", value: "status" },
        { text: "Created At", value: "created_at" },
        { text: "Action", value: "Action" },
      ],
    };
  },
  mounted() {
    this.getCountriesList();
  },
  methods: {
    updatedSearchText(text) {
      this.searchTextQuery = text;
    },
    async getCountriesList() {
      try {
        await CountryService.getCountryList(
          this.pagination.currentPage,
          this.searchTextQuery
        ).then((response) => {
          this.countries = response.data.data;
          this.pagination.totalPages = response.data.last_page;
          this.pagination.currentPage = response.data.current_page;
        });
      } catch (error) {
        this.countries = [];
        this.totalPages = 1;
      }
    },
  },
  watch: {
    searchTextQuery() {
      this.getCountriesList(this.searchTextQuery);
    },
    pagination() {
      this.getCountriesList(this.pagination);
    },
  },
};
</script>