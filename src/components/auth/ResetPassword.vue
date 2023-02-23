<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ $t("AUTH.RESET_PASSWORD") }}
        </h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="password"
              v-model="formValues.password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-validate="modelValidation.password"
              :class="{
                'bg-red-50 border border-red-500 text-red-900':
                  isFormSubmitted && errors.has('password'),
              }"
            />
            <div
              v-if="isFormSubmitted && errors.has('password')"
              class="text-xs text-red-700 mt-1"
            >
              {{ errors.first("password") }}
            </div>
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="password"
              v-model="formValues.confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="current-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              v-validate="modelValidation.confirmPassword"
              :class="{
                'bg-red-50 border border-red-500 text-red-900':
                  isFormSubmitted && errors.has('confirmPassword'),
              }"
            />
            <div
              v-if="isFormSubmitted && errors.has('confirmPassword')"
              class="text-xs text-red-700 mt-1"
            >
              {{ errors.first("confirmPassword") }}
            </div>
          </div>
        </div>

        <div>
          <button
            @click="onSubmit"
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
            {{ $t("BUTTON.SUBMIT") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "ResetPassword",
  data() {
    return {
      isFormSubmitted: false,
      formValues: {
        token: null,
        password: "",
        confirmPassword: "",
      },
      modelValidation: {
        password: { required: true },
        confirmPassword: { required: true },
      },
      resetPasswordToken: this.$route.params,
    };
  },
  mounted() {
    this.checkResetPasswordToken();
  },
  methods: {
    async checkResetPasswordToken() {
      await AuthService.checkResetPasswordToken(this.resetPasswordToken)
        .then(() => {})
        .catch((error) => {
          console.log("reset password catch block", error);
          this.$swal({
            title: "Warning !",
            text: this.$t("AUTH.TOKEN_EXPIRED"),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1BC5BD",
            cancelButtonColor: "#E4E6EF",
            confirmButtonText: "Ok !",
          }).then(() => {
            this.$router.push("/login");
          });
        });
    },
    onSubmit() {
      this.isFormSubmitted = true;
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          try {
            if (this.formValues.password !== this.formValues.confirmPassword) {
              this.$swal({
                title: "Warning !",
                text: this.$t("AUTH.PASSWORD_CONFIRM_NOT_MATCH"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1BC5BD",
                cancelButtonColor: "#E4E6EF",
                confirmButtonText: "Ok !",
              });
              return;
            }
            this.formValues.token = this.resetPasswordToken.token;
            await AuthService.resetPassword(this.formValues)
              .then((data) => {
                if (data) {
                  this.$swal({
                    title: "Successfully !",
                    text: this.$t("AUTH.SUCCESS_RESET_PW"),
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#1BC5BD",
                    cancelButtonColor: "#E4E6EF",
                    confirmButtonText: "Ok !",
                  }).then(() => {
                    this.$router.push("/login");
                  });
                  this.$toast.success(this.$t("AUTH.SUCCESS_RESET_PW"));
                  this.$router.push("/login");
                }
              })
              .catch((error) => {
                this.$toast.error(error);
              });
          } catch (error) {
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
