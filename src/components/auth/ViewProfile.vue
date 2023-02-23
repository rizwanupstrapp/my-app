<template>
  <div>
    <NavComponent />

    <div class="container m-auto">
      <div
        class="w-full md:w-3/4 mx-auto flex items-center justify-center px-0 xl:px-18 my-16"
      >
        <!-- User Profile Details -->
        <div
          class="w-full lg:w-3/4 m-auto shadow-none md:shadow-lg p-4 md:p-6 xl:p-10 rounded-lg border-0 md:border border-gray-100"
        >
          <div>
            <!-- {{errors}} -->
            <div>
              <h1 class="text-center text-2xl font-extrabold text-gray-900">
                {{ $t("VIEW_PROFILE.VIEW_PROFILE") }}
              </h1>
            </div>

            <!-- USER_IMAGE -->

            <table class="flex justify-center my-8">
              <tbody>
                <tr class="flex flex-col justify-center items-center">
                  <td
                    class="rounded-full border border-gray-300 p-2 border-dashed"
                  >
                    <div
                      class="w-32 h-32 rounded-full bg-gray-200 overflow-hidden"
                    >
                      <div v-if="filePDF">
                        <pdf
                          :src="
                            previewfile != null
                              ? previewfile
                              : '../../../public/defaultImage.jpg'
                          "
                          class="rounded-lg w-52"
                        ></pdf>
                      </div>
                      <div v-else>
                        <img
                          :src="
                            previewfile != null
                              ? previewfile
                              : '../../../public/defultImage.jpg'
                          "
                          class="w-full"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="w-full xl:w-10/12 m-auto bg-yellow-50 rounded-2xl">
              <!-- USER_NAME -->
              <div
                class="grid grid-cols-3 border-b border-yellow-100 items-center"
              >
                <div
                  class="rounded-lg px-6 py-3 font-semibold text-gray-500 uppercase col-span-3 md:col-span-1"
                >
                  <p>{{ $t("VIEW_PROFILE.USER_NAME") }}</p>
                </div>
                <div
                  class="md:py-4 px-6 py-0 mb-4 md:mb-0 whitespace-no-wrap col-span-3 md:col-span-2"
                >
                  <div class="flex items-center">
                    <div class="font-semibold leading-5 text-gray-700">
                      <p>{{ formValues.fullName }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- E-MAIL -->

              <div
                class="grid grid-cols-3 border-b border-yellow-100 items-center"
              >
                <div
                  class="px-6 py-3 font-semibold text-gray-500 uppercase col-span-3 md:col-span-1"
                >
                  <p>{{ $t("VIEW_PROFILE.E_MAIL_ID") }}</p>
                </div>
                <div
                  class="md:py-4 px-6 py-0 mb-4 md:mb-0 whitespace-no-wrap col-span-3 md:col-span-2"
                >
                  <div class="font-semibold leading-5 text-gray-700">
                    <p class="overflow-auto">{{ formValues.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Phone Number -->

              <div class="grid grid-cols-3 items-center">
                <div
                  class="px-6 py-3 font-semibold text-gray-500 uppercase col-span-3 md:col-span-1"
                >
                  <p>{{ $t("VIEW_PROFILE.PHONE_NUMBER") }}</p>
                </div>
                <div
                  class="md:py-4 px-6 py-0 mb-4 md:mb-0 whitespace-no-wrap col-span-3 md:col-span-2"
                >
                  <div class="font-semibold leading-5 text-gray-700">
                    <p>{{ formValues.phoneNumber }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Update Button  -->
          <div class="my-8 flex justify-center">
            <div class="flex flex-col md:flex-row gap-4">
              <router-link to="/get-profile">
                <button
                  type="button"
                  class="group relative w-44 flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:bg-indigo-700 bg-yellow-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  {{ $t("VIEW_PROFILE.UPDATE_PROFILE") }}
                </button>
              </router-link>

              <div>
                <button
                  @click="$router.push('/')"
                  type="button"
                  class="group relative w-44 flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:bg-indigo-700 bg-yellow-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                  </span>
                  {{ $t("VIEW_PROFILE.BACK_TO_LIST") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from "@/components/Nav.vue";
import AuthService from "@/services/auth.service";

export default {
  name: "ViewProfile",

  components: {
    NavComponent,
  },

  data() {
    return {
      formValues: {
        file: null,
        fullName: "",
        email: "",
        phoneNumber: "",
      },
      modelValidation: {
        fullName: { required: true },
        email: { required: true },
        phoneNumber: {
          required: true,
          regex:
            /^(?:(?:\+|0{0,2})91(\s*[-. ]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
        },
      },
      isFormSubmitted: false,
      filePDF: false,
      previewfile: false,
    };
  },
  mounted() {
    this.viewId = this.$route.params.id || null;
    this.getUserProfile();
  },

  watch: {},
  methods: {
    async getUserProfile() {
      try {
        const response = await AuthService.getProfile();
        if (response) {
          this.formValues.fullName = response.data.name;
          this.formValues.email = response.data.email;
          this.formValues.phoneNumber = response.data.userdetails.mobile_no;

          if (response.data.imageUrl) {
            this.previewfile = response.data.imageUrl;
          }
        }
      } catch (error) {
        this.$toast.error(error);
        console.log("Error>>>>", error);
      }
    },
  },
};
</script>
