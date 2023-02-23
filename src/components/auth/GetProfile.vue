<template>
  <div>
    <NavComponent />
    <div class="container m-auto">
      <div
        class="w-full md:w-3/4 xl:w-2/4 mx-auto my-4 md:my-8 lg:my-16 py-4 md:py-8 lg:py-12 shadow-none md:shadow-lg rounded-lg border-0 md:border border-gray-100"
      >
        <div class="w-full md:w-3/4 mx-auto">
          <div>
            <h2 class="text-center text-2xl font-extrabold text-gray-900">
              {{ $t("GET_PROFILE.UPDATE_PROFILE") }}
            </h2>

            <!-- Upload User Image -->

            <div class="flex flex-col my-8 gap-8 justify-center items-center">
              <div class="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                <img v-if="previewfile" :src="previewfile" />
              </div>
              <div>
                <input
                  class="hidden"
                  @change="uploadfile"
                  accept="/*"
                  type="file"
                  id="formFile"
                  ref="uploadImgInput"
                  aria-describedby="birthFormUpload"
                  v-validate="modelValidation.file"
                  name="file"
                />
                <button
                  class="group relative w-44 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                  @click="$refs.uploadImgInput.click()"
                >
                  {{
                    previewfile
                      ? $t("GET_PROFILE.CHANGE_IMAGE")
                      : $t("GET_PROFILE.UPLOAD_IMAGE")
                  }}
                </button>
              </div>
            </div>

            <div class="mb-4"></div>
          </div>

          <form class="mt-8 p-4 md:p-0 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm space-y-4">
              <!-- Full Name -->

              <div>
                <label
                  for="full-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("GET_PROFILE.FULL_NAME") }}</label
                >
                <input
                  id="full-name"
                  v-model="formValues.fullName"
                  name="fullName"
                  type="text"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Full name"
                  v-validate="modelValidation.fullName"
                  :class="{
                    'bg-red-50 border border-red-500 text-red-900':
                      isFormSubmitted && errors.has('fullName'),
                  }"
                />
                <div
                  v-if="isFormSubmitted && errors.has('fullName')"
                  class="text-xs text-red-700 mt-1"
                >
                  {{ errors.first("fullName") }}
                </div>
              </div>

              <!-- E-Mil Address -->

              <div>
                <label
                  for="email-address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("GET_PROFILE.EMAIL") }}</label
                >
                <input
                  type="email"
                  autocomplete="email"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email address"
                  id="email-address"
                  v-model="formValues.email"
                  v-validate="modelValidation.email"
                  name="email"
                  :class="{
                    'bg-red-50 border border-red-500 text-red-900':
                      isFormSubmitted && errors.has('email'),
                  }"
                />
                <div
                  v-if="isFormSubmitted && errors.has('email')"
                  class="text-xs text-red-700 mt-1"
                >
                  {{ errors.first("email") }}
                </div>
              </div>

              <!-- Phone Number -->
              <div>
                <label
                  for="phoneNumber"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("GET_PROFILE.PHONE_NUMBER") }}</label
                >
                <input
                  type="text"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Phone No."
                  id="phoneNumber"
                  v-model="formValues.phoneNumber"
                  v-validate="modelValidation.phoneNumber"
                  name="phoneNumber"
                  :class="{
                    'bg-red-50 border border-red-500 text-red-900':
                      isFormSubmitted && errors.has('phoneNumber'),
                  }"
                />
                <div
                  v-if="isFormSubmitted && errors.has('phoneNumber')"
                  class="text-xs text-red-700 mt-1"
                >
                  {{ errors.first("phoneNumber") }}
                </div>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row justify-center gap-3 items-center"
            >
              <!-- Update Button  -->
              <div>
                <button
                  @click="onSubmit"
                  type="button"
                  class="group relative w-44 flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:bg-indigo-700 bg-yellow-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                  </span>
                  {{ $t("BUTTON.UPDATE") }}
                </button>
              </div>

              <!-- Cancel Button  -->
              <div>
                <button
                  @click="$router.push('/view-profile')"
                  type="button"
                  class="group relative w-44 flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:bg-indigo-700 bg-yellow-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                  </span>
                  {{ $t("BUTTON.BACK") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from "@/components/Nav.vue";
import AuthService from "@/services/auth.service";

export default {
  name: "GetProfile",

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
    console.log("mounted called");
    this.getUserProfile();
  },
  methods: {
    uploadfile(input) {
      if (
        input.target.files[0].type == "image/png" ||
        input.target.files[0].type == "image/jpeg" ||
        input.target.files[0].type == "image/jpg" ||
        input.target.files[0].type == "application/pdf"
      ) {
        if (input.target.files[0].type == "application/pdf") {
          this.filePDF = true;
        }
        if (input.target.files && input.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewfile = e.target.result;
          };
          this.formValues.file = input.target.files[0];
          reader.readAsDataURL(input.target.files[0]);
        }
      }
    },
    removefile() {
      this.formValues.file = null;
      this.previewfile = null;
    },

    random() {
      this.$vs.notify({
        title: "File not allowed",
        text: "Only png, jpg & jpeg files are allowed",
        color: "danger",
        position: "top-right",
      });
    },
    updatedSuccesfull() {
      this.$vs.notify({
        title: "Success",
        text: this.$t("UPDATE_PROFILE.SUCCESS"),
        color: "success",
        position: "top-right",
      });
    },
    somthingWentWrong(message) {
      this.$vs.notify({
        title: "Restricted",
        text: message,
        color: "danger",
        position: "top-right",
      });
    },

    async getUserProfile() {
      try {
        const response = await AuthService.getProfile();
        console.log("response >>>", response);
        if (response) {
          this.formValues.fullName = response.data.name;
          this.formValues.email = response.data.email;
          this.formValues.phoneNumber = response.data.phoneNumber;
          console.log("response previewfile >>>", response.data.imageUrl);

          if (response.data.imageUrl) {
            this.previewfile = response.data.imageUrl;
            console.log("response previewfile >>>", this.previewfile);
          }
        }
      } catch (error) {
        this.$toast.error(error);
        console.log("Error>>>>", error);
      }
    },

    async onSubmit() {
      this.isFormSubmitted = true;
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          let bodyFormData = new FormData();
          bodyFormData.append("fullName", this.formValues.fullName);
          bodyFormData.append("email", this.formValues.email);
          bodyFormData.append("phoneNumber", this.formValues.phoneNumber);

          if (this.formValues.file) {
            bodyFormData.append("userImage", this.formValues.file);
          }

          try {
            const response = await AuthService.updateProfile(bodyFormData);
            if (response) {
              console.log("response: ", response);
              this.$store.dispatch("updateProfile", response);
              this.$toast.success("User Update Successfully");

              this.$router.push("/view-profile");
            }
          } catch (error) {
            console.log("error: ", error);
            if (error.response.data) {
              this.$toast.error(error.response.data.message);
            } else {
              this.$toast.error(error.message);
            }
          }
        }
      });
    },
  },
};
</script>
