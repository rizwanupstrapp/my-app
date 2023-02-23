<template>
  <div class="container m-auto h-screen flex items-center">
    <div
      class="w-full md:w-3/6 m-auto shadow-none md:shadow-2xl py-10 rounded-lg flex items-center justify-center items"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="text-center text-2xl font-extrabold text-gray-900">
            {{ $t("AUTH.FORGOT_PASSWORD") }}
          </h2>
        </div>
        <form class="mx-10 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />

          <div>
            <input
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="formValues.email"
              v-validate="modelValidation.email"
              id="email-address"
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

          <div class="space-y-6">
            <button
              v-if="showLoadingButton"
              type="button"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {{ $t("Please wait.....") }}
            </button>
            <button
              v-else
              @click="onSubmit"
              type="button"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 hover:shadow-lg"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {{ $t("BUTTON.SUBMIT") }}
            </button>

            <button
              type="button"
              class="w-full md:w-auto inline-block px-8 py-2 text-sm font-medium bg-yellow-500 rounded hover:bg-indigo-700 text-white active:bg-indigo-700 tracking-wide hover:shadow-lg"
            >
              <router-link to="/login" class="block lg:inline-block">
                <a href="#" class="font-medium">
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                    <svg
                      class="h-5 w-5 group-hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  {{ $t("BUTTON.BACK_TO_LOGIN") }}
                </a>
              </router-link>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "ForgotPassword",
  data() {
    return {
      formValues: {
        email: "",
        userType: 2,
      },
      modelValidation: {
        email: { required: true },
      },
      isFormSubmitted: false,
      showLoadingButton: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isFormSubmitted = true;
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          this.showLoadingButton = true;
          await AuthService.forgotPassword(this.formValues)
            .then((response) => {
              if (response) {
                this.$swal({
                  title: "Success !",
                  text: this.$t("AUTH.CHECK_MAIL"),
                  type: "success",
                  showCancelButton: true,
                  confirmButtonColor: "#1BC5BD",
                  cancelButtonColor: "#E4E6EF",
                  confirmButtonText: "Ok !",
                }).then(() => {
                  this.showLoadingButton = false;
                });

                this.$router.push("/e-mail-sent");
                this.$toast.success(this.$t("AUTH.CHECK_MAIL"));
              }
            })
            .catch((error) => {
              if (error.response.data) {
                this.$toast.error(error.response.data.message);
              } else {
                this.$toast.error(error.message);
              }
            });
        }
      });
    },
  },
};
</script>
