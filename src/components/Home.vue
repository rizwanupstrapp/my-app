<template>
  <div>

    <NavComponent />
    <SidebarComponent />

   
    <!-- <FooterComponent /> -->
  </div>
</template>

<script>
import NavComponent from "@/components/Nav.vue";
import SidebarComponent from "@/components/SideBar";
// import FooterComponent from "@/components/Footer.vue";

export default {
  name: "HomeComponent",

  components: {
    NavComponent,
    // FooterComponent,
    SidebarComponent
  },
  data() {
    return {
   
    };
  },

  mounted() {
    this.goToTop();
    // this.getAllAdvertisementList();
    console.log("After Mounted getAdvertisementRequest List : >>>>>>>>");
    // this.getAllE_MagazineList();
    console.log("After Mounted getAllE_MagazineList : >>>>>>>>");
  },
  watch: {
  },

  methods: {

  },
};
</script>
