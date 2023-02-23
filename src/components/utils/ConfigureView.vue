<template>
  <div>
    <div>
      <div><SidebarComponent /></div>
     
    </div>
    <div class="main-contain ml-auto grid grid-cols-1 gap-1">
      <NavBarComponent />
      <div class="mt-10">
        <div class="container m-auto px-2 sm:px-6 lg:px-10">
          <h1>{{ $t("SETTINGS.CONFIGURATION") }}</h1>
          <div
            class="
              overflow-x-auto
              mx-4
              md:mx-6
              xl:mx-0
              shadow-lg
              sm:rounded-lg
              border-b border-gray-200
            "
          >
            <div class="grid grid-cols-2 gap-3">
              <h6>{{ $t("SETTINGS.TITLE") }}</h6>
              <div
                class="flex justify-between items-center"
                @click="toggleSearchActive = !toggleSearchActive"
              >
                <h2>{{ $t("SETTINGS.ENABLE_SEARCH") }}</h2>
                <div
                  class="
                    w-16
                    h-10
                    flex
                    items-center
                    bg-gray-300
                    rounded-full
                    p-1
                    duration-300
                    ease-in-out
                  "
                  :class="{ 'bg-green-400': toggleSearchActive }"
                >
                  <div
                    class="
                      bg-white
                      w-8
                      h-8
                      rounded-full
                      shadow-md
                      transform
                      duration-300
                      ease-in-out
                    "
                    :class="{ 'translate-x-6': toggleSearchActive }"
                  ></div>
                </div>
              </div>

              <div
                class="flex justify-between items-center"
                @click="toggleFiltersActive = !toggleFiltersActive"
              >
                <h2>{{ $t("SETTINGS.ENABLE_FILTERS") }}</h2>
                <div
                  class="
                    w-16
                    h-10
                    flex
                    items-center
                    bg-gray-300
                    rounded-full
                    p-1
                    duration-300
                    ease-in-out
                  "
                  :class="{ 'bg-green-400': toggleFiltersActive }"
                >
                  <div
                    class="
                      bg-white
                      w-8
                      h-8
                      rounded-full
                      shadow-md
                      transform
                      duration-300
                      ease-in-out
                    "
                    :class="{ 'translate-x-6': toggleFiltersActive }"
                  ></div>
                </div>
              </div>

              <div
                class="flex justify-between items-center"
                @click="toggleBulkActionsActive = !toggleBulkActionsActive"
              >
                <h2>{{ $t("SETTINGS.ENABLE_BULK") }}</h2>
                <div
                  class="
                    w-16
                    h-10
                    flex
                    items-center
                    bg-gray-300
                    rounded-full
                    p-1
                    duration-300
                    ease-in-out
                  "
                  :class="{ 'bg-green-400': toggleBulkActionsActive }"
                >
                  <div
                    class="
                      bg-white
                      w-8
                      h-8
                      rounded-full
                      shadow-md
                      transform
                      duration-300
                      ease-in-out
                    "
                    :class="{ 'translate-x-6': toggleBulkActionsActive }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                {{ $t("SETTINGS.ENTRIES") }}
                <v-select
                  label="text"
                  class="mt-0 sel-div"
                  :options="['10', '20', '50', '100']"
                  placeholder="Select entries per page"
                ></v-select>
                <small> {{ $t("SETTINGS.NOTES") }} </small>
              </div>
              <div>
                {{ $t("SETTINGS.DEFAULT_ATTRIBUT") }}
                <v-select
                  label="text"
                  class="mt-0 sel-div"
                  :options="getTableColumn"
                  placeholder="Select sort attribute"
                  :reduce="
                    (table) => {
                      return table;
                    }
                  "
                ></v-select>

                <v-select
                  label="text"
                  class="mt-0 sel-div"
                  :options="ascDsc"
                  placeholder="Select sort attribute"
                  :reduce="(table) => table.id"
                ></v-select>
              </div>
            </div>
            <div>
              <h6>{{ $t("SETTINGS.VIEW")  }}</h6>
              <div >
                <draggable
                  v-model="draggableColumn"
                 
                >
                <!-- :options="{ handle: '.handle' }" -->
                  <!-- <transition-group> -->
                    <div class="grid grid-cols-4 gap-3" :key="i" v-for="(column, i) in draggableColumn" @click="isOpen = true">
                      <!-- <div > -->
                        <input
                          class="                          
                            bg-gray-50
                            border border-gray-300
                            text-gray-900 text-sm
                            rounded-lg
                            focus:ring-blue-500 focus:border-blue-500
                            block
                            w-full
                            p-2.5
                            dark:bg-gray-700
                            dark:border-gray-600
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:focus:ring-blue-500
                            dark:focus:border-blue-500
                          "
                          type="text"
                          v-model="column.text"
                          @click="handleInputClick"
                        />
                      <!-- </div> -->
                    </div>
                  <!-- </transition-group> -->
                </draggable>
                <!-- v-model="formValues.gender" -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Model starts -->

      <div>
        <!-- This is the button that will open the modal popup -->

        <!-- This is the modal popup itself -->
        <div
          v-if="isOpen"
          class="
            fixed
            inset-0
            bg-gray-900 bg-opacity-50
            flex
            justify-center
            items-center
            z-10
          "
        >
          <div class="bg-white rounded-lg w-1/2 p-4">
            <div class="">
              <h5 class="float-left">{{ $t("SETTINGS.EDIT_LABEL") }}</h5>
              <button class="float-right" @click="isOpen = false">
                {{ $t("SETTINGS.CLOSE") }}
              </button>
            </div>
            <div class="mt-5">
              <h5 class="mt-5">{{ inputValue }}</h5>
              <h6> {{ $t("SETTINGS.LABEL") }}</h6>
              <input
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                  mt-5
                "
                type="text"
                v-model="inputValue"
              />
              <small> {{ $t("SETTINGS.OVERRIDE_VALUE") }}</small>
              <div
                class="flex justify-between items-center"
                @click="toggleSortOnField = !toggleSortOnField"
              >
                <h2>
                  {{ $t("SETTINGS.ENABLE_SORT") }}
                </h2>
                <div
                  class="
                    w-16
                    h-10
                    flex
                    items-center
                    bg-gray-300
                    rounded-full
                    p-1
                    duration-300
                    ease-in-out
                  "
                  :class="{ 'bg-green-400': toggleSortOnField }"
                >
                  <div
                    class="
                      bg-white
                      w-8
                      h-8
                      rounded-full
                      shadow-md
                      transform
                      duration-300
                      ease-in-out
                    "
                    :class="{ 'translate-x-6': toggleSortOnField }"
                  ></div>
                </div>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="
                    text-gray-900
                    bg-white
                    border border-gray-300
                    focus:outline-none
                    hover:bg-gray-100
                    focus:ring-4 focus:ring-gray-200
                    font-medium
                    rounded-lg
                    text-sm
                    px-5
                    py-2.5
                    mr-2
                    mb-2
                    dark:bg-gray-800
                    dark:text-white
                    dark:border-gray-600
                    dark:hover:bg-gray-700
                    dark:hover:border-gray-600
                    dark:focus:ring-gray-700
                  "
                  @click="isOpen = false"
                >
                  {{ $t("SETTINGS.CANCEL") }}
                </button>
                <button
                  type="button"
                  class="
                    text-white
                    bg-blue-700
                    hover:bg-blue-800
                    focus:ring-4 focus:ring-blue-300
                    font-medium
                    rounded-lg
                    text-sm
                    px-5
                    py-2.5
                    mr-2
                    mb-2
                    dark:bg-blue-600 dark:hover:bg-blue-700
                    focus:outline-none
                    dark:focus:ring-blue-800
                    float-right
                  "
                  @click="isOpen = false"
                >
                  {{ $t("SETTINGS.DONE") }}
                </button>
              </div>

              <!-- Your modal content goes here -->
              <!-- {{ getTableColumn }} -->
            </div>
          </div>
        </div>
      </div>

      <!--Model ends -->
    </div>
  </div>
</template>

<script>
import NavBarComponent from "@/components/Nav";
import SidebarComponent from "@/components/SideBar";
import draggable from "vuedraggable";

export default {
  name: "ConfigureViewComponent",
  components: {
    NavBarComponent,
    SidebarComponent,
    draggable,
  },
  props: {
  },
  computed: {
    getTableColumn() {
      return this.$store.state.tableColumn;
    },
  },
  watch: {
    draggableColumn(newItems, oldItems) {
      console.log("newItems",newItems)
      let obj = {}
      obj.newItems = newItems;
      obj.isDragAndDrop = true
      this.$store.dispatch("setTableCoulmnField", obj);
      console.log("oldItems",oldItems)
    }
  },
  data() {
    return {
      toggleSearchActive: false,
      toggleFiltersActive: false,
      toggleBulkActionsActive: false,
      toggleSortOnField: false,
      ascDsc: [
        { id: 1, text: "ASC" },
        { id: 2, text: "DESC" },
      ],
      isOpen: false,
      inputValue: "",
      draggableColumn:  this.$store.state.tableColumn
    };
  },
  mounted() {},
  methods: {
    getSelectedText(val) {
      console.log("val", val);
    },
    handleInputClick(event) {
      this.inputValue = event.target.value;
      console.log(this.inputValue);
    },
  },
};
</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  height: 0;
  overflow: hidden;
}

.main-contain {
  min-height: calc(100vh - 6rem);
  width: calc(100vw - 18.9rem);
}
</style>