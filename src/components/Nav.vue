<template>
  <nav class="bg-white shadow-md py-1 z-50">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!--  Mobile menu button  -->
        <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <div
            class="dropdown inset-y-0 left-0 pr-2 sm:static sm:inset-auto sm:pr-0"
          >
            <!--  PROFILE_PIC_WHEN_USER_LOGGED_IN -->
            <div
              v-if="
                this.$store &&
                this.$store.state &&
                this.$store.state.currentUser
              "
              class="dropdown-menu ml-3 z-10"
            >
              <!-- MObile Profile dropdown -->
              <div class="py-2">
                <button
                  @click="onProfileButtonClick"
                  type="button"
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">{{ $t("NAVBAR.OPEN_USER_MENU") }}</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="getUserUrl()"
                    alt=""
                  />
                </button>
              </div>
              <ul
                v-if="show"
                id="targetShowHideDiv"
                class="origin-top-right absolute right-0 w-26 -left-8 right-0 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                tabindex="-1"
              >
                <li>
                  <router-link
                    to="/view-profile"
                    class="block lg:mr-4 lg:inline-block lg:mt-0 text-gray-900 hover:bg-yellow-500 hover:text-white w-full border-b border-gray-100"
                    custom
                    v-slot="{ navigate, isActive, isExactActive }"
                  >
                    <div
                      :class="{
                        'active-link': isActive,
                        'exact-active-link': isExactActive,
                      }"
                    >
                      <a
                        @click="navigate"
                        href="#"
                        class="block px-4 py-2 font-medium"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-0"
                        ><p>{{ $t("NAVBAR.VIEW_PROFILE") }}</p></a
                      >
                    </div>
                  </router-link>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-900 hover:bg-yellow-500 hover:text-white font-medium"
                    role="menuitem"
                    @click="onLogout"
                    tabindex="-1"
                    id="user-menu-item-2"
                    ><p>{{ $t("NAVBAR.SIGN_OUT") }}</p></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <button
            v-on:click="mobileNavbar"
            id="mobile-menu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">{{ $t("NAVBAR.OPEN_MAIN_MENU") }}</span>

            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Mobile Nutriguru_Logo right-0 -->
        <div
          class="absolute inset-y-0 left-0 flex-shrink-0 flex items-center w-20 sm:hidden"
        >
          <router-link
            class="text-slate-900 hover:text-yellow-500 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            to="/home"
          >
            <img
              class="w-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAWJ2ZZgTnpDWvk0-KczBTPsQHLQHnTBuJ7k9rSHDt7A&s"
              alt="Nutri-Guru Logo"
            />
          </router-link>
        </div>
        <!-- Mobile Nutriguru_Logo Router Link  -->
        <div
          class="flex-1 flex items-center justify-start lg:justify-between sm:items-stretch"
        >
          <div class="hidden sm:flex ml-6 md:ml-0 items-center">
            <div class="flex-shrink-0 flex items-center w-24">
              <router-link
                class="text-slate-900 hover:text-yellow-500 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                to="/home"
              >
                <img
                  class="w-auto"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAWJ2ZZgTnpDWvk0-KczBTPsQHLQHnTBuJ7k9rSHDt7A&s"
                  alt="Nutri-Guru Logo"
                />
              </router-link>
            </div>
          </div>

          <!-- Website View>>>> -->
          <div class="hidden sm:flex sm:ml-6 items-center">
            <div class="flex gap-2 lg:gap-5 items-center">
              <router-link
                active-class="active-link"
                exact-active-class="exact-active-link"
                class="text-slate-900 hover:text-yellow-500 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                to="/home"
                >{{ $t("NAVBAR.HOME") }}
              </router-link>
             
              <div
                class="dropdown absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0"
              >
                <!-- IsUserLogin -->

                <div v-if="!this.$store?.state?.currentUser">
                  <router-link
                    custom
                    v-slot="{ navigate, isActive, isExactActive }"
                    to="/login"
                    class="block lg:mr-4 lg:inline-block lg:mt-0"
                  >
                    <div
                      :class="{
                        'active-link': isActive,
                        'exact-active-link': isExactActive,
                      }"
                    >
                      <a
                        @click="navigate"
                        href="#"
                        :class="{
                          'active-link': isActive,
                          'exact-active-link': isExactActive,
                        }"
                        class="text-slate-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                        >{{ $t("NAVBAR.SIGN_IN") }}
                      </a>
                    </div>
                  </router-link>
                </div>
         
                <div v-else class="dropdown-menu ml-3 relative">
                  <!-- Desktop Profile dropdown -->
                  <div class="py-2">
                    <button
                      @click="onProfileButtonClick"
                      type="button"
                      class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span class="sr-only">{{
                        $t("NAVBAR.OPEN_USER_MENU")
                      }}</span>
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="getUserUrl()"
                        alt=""
                      />
                    </button>
                  </div>
                  <ul
                    v-if="show"
                    id="targetShowHideDiv"
                    class="origin-top-right absolute lg:w-28 xl:w-32 -left-20 lg:-left-16 xl:-left-24 2xl:left-0 2xl:right-16 shadow-lg bg-white focus:outline-none z-50 border border-gray-200"
                    role="menu"
                    aria-orientation="vertical"
                    tabindex="-1"
                  >
                    <li>
                      <router-link
                        custom
                        v-slot="{ navigate, isActive, isExactActive }"
                        to="/view-profile"
                        class="block lg:mr-4 lg:inline-block lg:mt-0 text-gray-900 hover:bg-yellow-500 hover:text-white w-full border-b border-gray-100"
                      >
                        <div
                          :class="{
                            'active-link': isActive,
                            'exact-active-link': isExactActive,
                          }"
                        >
                          <a
                            @click="navigate"
                            href="#"
                            class="block px-4 py-2 font-medium text-base"
                            role="menuitem"
                            tabindex="-1"
                            id="user-menu-item-0"
                            ><p>{{ $t("NAVBAR.VIEW_PROFILE") }}</p></a
                          >
                        </div>
                      </router-link>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 font-medium text-gray-900 hover:bg-yellow-500 hover:text-white text-base"
                        role="menuitem"
                        @click="onLogout"
                        tabindex="-1"
                        id="user-menu-item-2"
                        ><p>{{ $t("NAVBAR.SIGN_OUT") }}</p></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  Mobile menu, show/hide based on menu state. -->

    <div
      class="sm:hidden border-t border-gray-200"
      id="mobile-menu"
      v-if="ShowNav == true"
    >
      <div class="px-2 pt-2 pb-3 space-y-1" v-if="show" id="targetShowHideDiv">
        <!-- MOBILE_VIEW_HOME -->
        <router-link
          to="/home"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <div
            :class="{
              'active-link': isActive,
              'exact-active-link': isExactActive,
            }"
          >
            <a
              @click="navigate"
              href="#/home"
              :class="{
                'active-link': isActive,
                'exact-active-link': isExactActive,
              }"
              class="text-gray-500 block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-yellow-500 focus:bg-yellow-500"
              aria-current="page"
              >{{ $t("NAVBAR.HOME") }}</a
            >
          </div>
        </router-link>


        <!-- -----------------------------------------------------------
         ######## --MOBILE_VIEW_**FORMS**_WHEN USER LOGED_IN-- #########
        ------------------------------------------------------------- -->
        <div class="dropdown" v-if="this.$store?.state?.currentUser?.data">
          <a
            href="#"
            class="dropdown-menu py-2 px-3 lg:px-3 rounded-md relative inline-block"
          >
            <!-- forms Here -->
            <button
              @click="onFormClick"
              type="button"
              class="text-gray-500 hover:text-white inline-flex text-slate-900 hover:text-yellow-500 justify-center rounded-md text-base font-medium transition duration-200"
            >
            {{ "BUTTONS" }}
             
            </button>

          </a>
        </div>
        <!-- MOBILE_VIEW_CONTACT_US -->
        <!-- SIGHN_IN BUTTON -->

        <router-link
          v-if="!this.$store?.state?.currentUser?.data"
          to="/login"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <div
            :class="{
              'active-link': isActive,
              'exact-active-link': isExactActive,
            }"
          >
            <a
              @click="navigate"
              href="#/login"
              :class="{
                'active-link': isActive,
                'exact-active-link': isExactActive,
              }"
              class="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-yellow-500"
              >{{ $t("NAVBAR.SIGN_IN") }}</a
            >
          </div>
        </router-link>

      </div>
    </div>
  </nav>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Nav",
  components: {},
  data() {
    return {
      ShowNav: false,
      IsUserLogin: true,
      showProfileButton: false,
      show: ref(true),
      ShowForm: false,
    };
  },
  mounted() {
  },
  methods: {
    getUserUrl() {
      this.IsUserLogin = false;
      return this.$store.state.currentUser &&
        this.$store.state.currentUser.data &&
        this.$store.state.currentUser.data.user &&
        this.$store.state.currentUser.data.user.imageUrl
        ? this.$store.state.currentUser.data.user.imageUrl
        : "data:image/jpeg;base64,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";
    },
    // Here Rizwan
    onLogout() {
      this.$store.dispatch("purgeAuth");
      localStorage.removeItem("userToken");
      this.$router.push("/home");
    },
    mobileNavbar() {
      this.ShowNav = !this.ShowNav;
      console.log("this.ShowNav>>>On Click>>>>", this.ShowNav);
    },
    onFormClick() {
      this.ShowForm = !this.ShowForm;
      console.log("this.ShowForm>>>On Click>>>>", this.ShowForm);
    },
    onProfileButtonClick() {
      this.showProfileButton = !this.showProfileButton;
      console.log(
        "this.showProfileButton>>>On Click>>>>",
        this.showProfileButton
      );
      const targetDiv = document.getElementById("targetShowHideDiv");
      const btn = document.getElementById("user-menu-button");
      btn.onclick = function () {
        if (targetDiv.style.display !== "none") {
          targetDiv.style.display = "none";
          this.show = false;
        } else {
          targetDiv.style.display = "block";
          this.show = true;
        }
      };
    },
    onFormButtonClick() {
      const targetDiv = document.getElementById("formShowHideDiv");
      const btn = document.getElementById("form-button");
      btn.onclick = function () {
        if (targetDiv.style.display !== "none") {
          targetDiv.style.display = "none";
        } else {
          targetDiv.style.display = "block";
        }
      };
    },
  },
};
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
