<template>
  <div>
    <div class="container m-auto h-screen flex items-center">
      <div
        class="
          w-full
          md:w-3/6
          m-auto
          shadow-none
          md:shadow-2xl
          py-10
          rounded-lg
          flex
          items-center
          justify-center
          items
        "
      >
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="text-center text-2xl font-extrabold text-gray-900">
              {{ $t("AUTH.FORM.LOGIN") }}
            </h2>
          </div>
          <form class="mx-10 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="space-y-6">
              <div>
                <input
                  type="email"
                  autocomplete="email"
                  required
                  class="
                    appearance-none
                    rounded
                    relative
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    placeholder-gray-500
                    text-gray-900
                    rounded-t-md
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    focus:z-10
                    sm:text-sm
                  "
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
              <div>
                <input
                  id="password"
                  v-model="formValues.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="
                    appearance-none
                    rounded
                    relative
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    placeholder-gray-500
                    text-gray-900
                    rounded-b-md
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    focus:z-10
                    sm:text-sm
                  "
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

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="showPassword"
                  name="showPassword"
                  v-model="showPassword"
                  type="checkbox"
                  class="
                    h-4
                    w-4
                    text-indigo-600
                    focus:ring-indigo-500
                    border-gray-300
                    rounded
                  "
                />
                <label
                  for="showPassword"
                  class="ml-2 block text-sm text-gray-900"
                >
                  <p>{{ $t("AUTH.SHOW_PASSWORD") }}</p>
                </label>
              </div>

              <div class="text-sm">
                <router-link
                  to="/forgot-password"
                  class="
                    block
                    mt-4
                    lg:mr-4 lg:inline-block lg:mt-0
                    text-blue-200
                    hover:text-white
                  "
                >
                  <a
                    href="#"
                    class="font-medium text-yellow-500 hover:text-indigo-600"
                  >
                    <p>{{ $t("AUTH.FORM.FORGOT_PASSWORD") }}</p>
                  </a>
                </router-link>
              </div>
            </div>

            <div>
              <button
                @click="onSubmit"
                type="button"
                class="
                  group
                  relative
                  w-full
                  flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  hover:shadow-lg
                  bg-yellow-500
                  hover:bg-indigo-700
                  transition
                  duration-200
                "
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
                <span class="tracking-widest">{{ $t("AUTH.LOGIN") }}</span>
              </button>
            </div>
            <div>
              <div class="text-sm">
                <p>
                  {{ $t("AUTH.DONT_HAVE_ACCOUNT") }}
                  <router-link
                    to="/registration"
                    class="
                      block
                      mt-4
                      lg:mr-4 lg:inline-block lg:mt-0
                      text-blue-200
                      hover:text-white
                    "
                  >
                    <a
                      href="#"
                      class="font-medium text-yellow-500 hover:text-indigo-600"
                    >
                      {{ $t("AUTH.SIGN_UP") }}
                    </a>
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      showPassword: false,
      isFormSubmitted: false,
      formValues: {
        email: "",
        password: "",
      },
      modelValidation: {
        email: { required: true },
        password: { required: true },
      },
    };
  },
  methods: {
    login() {
      this.$router.push("/dashboard");
    },
    async onSubmit() {
      this.isFormSubmitted = true;

      this.$validator.validate().then(async (valid) => {
        if (valid) {
          await AuthService.login(this.formValues)
            .then((response) => {
              if (response && response.data && response.data && response.data.access_token) {
                localStorage.setItem(
                  "userToken",
                  response.data.access_token
                );
                this.$store.dispatch("setAuth", response.data.user);
              }
            
              this.$toast.success(this.$t("AUTH.SUCCESS_LOGIN"));
              this.$router.push("/country");
            })
            .catch((error) => {
              console.log("error while Login >>>>>", error);
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
