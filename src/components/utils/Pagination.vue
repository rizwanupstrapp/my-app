<template>
  <div class="mt-3">
    <div v-if="getTotalPages > 1" class="flex justify-center lg:justify-end">
      <vs-pagination
        :per-page="getRecordsPerPages"
        :total-pages="getTotalPages"
        @change="paginateClickHandler"
      ></vs-pagination>
    </div>
  </div>
</template>

<script>
import VsPagination from "@vuesimple/vs-pagination";
export default {
  name: "Pagination",
  components: {
    VsPagination,
  },
  props: {
    pagination: Object,
  },
  mounted() {
    // console.log("pagination", this.pagination)
  },
  computed: {
    getRecordsPerPages() {
      return this.pagination.itemsPerPage;
    },

    getTotalPages() {
      return this.pagination.totalPages;
    },
  },

  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    paginateClickHandler(e) {
      this.currentPage = e;
    },
  },
  watch: {
    currentPage() {
      this.$emit("update:pagination", {
        ...this.pagination,
        currentPage: this.currentPage,
      });
    },
  },
};
</script>
