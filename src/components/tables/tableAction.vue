<template>
  <div class="flex">
    <div >
      <SidebarComponent />
    </div>

    <div class="ml-auto main-contain">
      <div class="">
        <NavBarComponent />
      </div>
      <div class="p-6">
        <form>
          <!-- Expansion starts -->
          <div>
            <div class="flex items-center justify-between">
              <div class="w-1/2 relative">
                <div
                  class="border border-gray-300 rounded-lg p-4 cursor-pointer"
                  @click="expanded = !expanded"
                >
                  <div class="flex items-center justify-between">
                    <div class="font-medium">{{ $t("FILTERS.TITLE") }}</div>

                    <div>
                      <svg
                        class="h-6 w-6 text-gray-500"
                        :class="{ 'transform rotate-180': expanded }"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <transition name="slide">
                  <div
                    class="mt-4 w-max absolute top-12 z-[111] shadow-xl gap-6 bg-white border border-solid border-gray-300 px-3 pt-3 rounded"
                    v-if="expanded"
                  >
                    <!-- Add More Field Starts -->
                    <table>
                      <p>{{ $t("FILTERS.SUBTITLE") }}</p>
                      <tbody>
                        <tr
                          class="w-full flex items-center gap-4"
                          v-for="(input, k) in tableDynamicFields"
                          :key="k"
                        >
                          <td class="w-full">
                            <v-select
                              v-model="input.table_id"
                              label="text"
                              class="mt-0 sel-div w-[420px]"
                              :value="formValue.table_id"
                              :options="displayTableFieldOnSelect"
                              :reduce="
                                (table) => {
                                  return table;
                                }
                              "
                              :name="`${k}` + `. table`"
                              placeholder="Select table"
                              :id="`${k}` + `. table`"
                            ></v-select>
                          </td>
                          <td class="w-full">
                            <v-select
                              v-model="input.compairision_id"
                              label="label"
                              class="mt-0 sel-div w-[320px]"
                              :value="formValue.compairision_id"
                              :options="commpairisionArray"
                              :reduce="
                                (compairison) => {
                                  // nullCompairedWithField();
                                  return compairison;
                                }
                              "
                              placeholder="Select compaired"
                              :name="`${k}` + `. compaired`"
                              :id="`${k}` + `. compaired`"
                            ></v-select>
                          </td>
                          <td class="w-full">
                            <div>
                              <div
                                class=""
                                v-if="input.table_id.value === 'status'"
                              >
                                <v-select
                                  label="label"
                                  :options="statusTypeArray"
                                  :reduce="(statusType) => statusType"
                                  class="mt-0 sel-div"
                                  :name="`${k}` + `. statusType`"
                                  placeholder="Select statusType"
                                  :id="`${k}` + `. statusType`"
                                ></v-select>
                              </div>
                              <div
                                class=""
                                v-else-if="
                                  input.table_id.value === 'created_at'
                                "
                              >
                                <div class="mb-6">
                                  <label
                                    for="createdAt"
                                    class="
                                      block
                                      mb-2
                                      text-sm
                                      font-medium
                                      text-gray-900
                                      dark:text-gray-300
                                    "
                                    >{{ $t("Created At") }}</label
                                  >
                                  <!-- v-model="formValues.createdAt"
                v-validate="modelValidation.createdAt" -->
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
                                    type="date"
                                    aria-describedby="dobValidate"
                                    v-model="input.created_at"
                                    :name="`${k}` + `. example-datepicker`"
                                    :id="`${k}` + 'example-datepicker'"
                                  />
                                </div>
                              </div>
                              <div class="" v-else>
                                <div class="mb-6">
                                  <label
                                    for="groomFullName"
                                    class="
                                      block
                                      mb-2
                                      text-sm
                                      font-medium
                                      text-gray-900
                                      dark:text-gray-300
                                      mt-6
                                    "
                                  ></label>
                                  <input
                                    type="text"
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
                                    placeholder="Enter Compairedwith"
                                    v-model="input.compairedWith"
                                    :name="`${k}` + `. compairedWith`"
                                    :id="`${k}` + `. compairedWith`"
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td >
                            <div>
                              <button
                                type="button"
                                class="
                                  focus:outline-none
                                  text-white
                                  bg-red-700
                                  hover:bg-red-800
                                  focus:ring-4 focus:ring-red-300
                                  font-medium
                                  rounded-lg
                                  text-sm
                                  px-5
                                  py-2.5
                                  dark:bg-red-600
                                  dark:hover:bg-red-700
                                  dark:focus:ring-red-900
                                "
                                @click="remove(k)"
                                v-show="
                                  k || (!k && tableDynamicFields.length > 1)
                                "
                              >
                                Remove
                              </button>

                              <button
                                type="button"
                                class="
                                  focus:outline-none
                                  text-white
                                  bg-green-700
                                  hover:bg-green-800
                                  focus:ring-4 focus:ring-green-300
                                  font-medium
                                  rounded-lg
                                  text-sm
                                  px-5
                                  py-2.5
                                  dark:bg-green-600
                                  dark:hover:bg-green-700
                                  dark:focus:ring-green-800
                                "
                                @click="addMore(k)"
                                v-show="k == tableDynamicFields.length - 1"
                              >
                                Add
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Filters starts -->
                  </div>
                </transition>
              </div>

              <!-- Filters Ends -->
              <!-- selected table field show  starts -->

              <div class="mt-3">
                <button
                  type="button"
                  @click="onSave()"
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
                  "
                >
                  {{ $t("BUTTON.SAVE") }}
                </button>
              </div>
              <!-- Add More Field Ends -->
            </div>
          </div>
          <!-- Expansion ends -->
        </form>
        <div class="mt-6">
          <div class="flex items-center justify-end">
            <label
              for="table"
              class="block text-md font-medium text-gray-900 dark:text-gray-400"
              >{{ $t("SETTINGS.TITLE") }}</label
            >

            <div class="relative">
              <button
                type="button"
                @click="isOpen = !isOpen"
                class="flex items-center text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    :class="{ hidden: isOpen, 'inline-flex': !isOpen }"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L10 8.585L12.2929 6.29289C12.6534 5.93241 13.2206 5.90468 13.6129 6.2097L13.7071 6.29289C14.0676 6.65338 14.0953 7.22061 13.7903 7.6129L13.7071 7.70711L10.7071 10.7071C10.3166 11.0976 9.68342 11.0976 9.29289 10.7071L6.29289 7.70711C5.98786 7.31658 5.96013 6.74935 6.29289 6.29289Z"
                  />
                  <path
                    :class="{ hidden: !isOpen, 'inline-flex': isOpen }"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.7071 13.7071C14.0676 13.3466 14.0953 12.7794 13.7903 12.3871L13.7071 12.2929L10.7071 9.29289C10.3166 8.90237 9.68342 8.90237 9.29289 9.29289L6.29289 12.2929C5.96013 12.7493 5.98786 13.3166 6.29289 13.7071C6.65338 14.0676 7.22061 14.0953 7.6129 13.7903L7.70711 13.7071L10 11.4142L12.2929 13.7071C12.6534 14.0676 13.2206 14.0953 13.6129 13.7903L13.7071 13.7071Z"
                  />
                </svg>
              </button>
              <div
                v-show="isOpen"
                class="
                  absolute
                  mt-2
                  w-56
                  p-4
                  bg-white
                  rounded-md
                  shadow-xl
                  right-0
                  border
                  brder-gray-300
                  border-solid
                "
              >
                <router-link to="/configure-view" class="">
                  <span class="hover:text-blue-800">{{ $t("SETTINGS.CONFIGURATION") }}</span>
                
                </router-link>
                <!-- Displayed Fields -->
                 <p><span>{{ $t("SETTINGS.DISPLAYED_FIELD") }}</span> <span>{{ $t("SETTINGS.RESET") }}</span></p>
                <label
                  class="inline-flex items-center mt-3 ml-4"
                  :key="i"
                  v-for="(tableField, i) in displayTableFieldOnSelect"
                >
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-indigo-600"
                    :id="tableField.value"
                    v-model="tableField.selected"
                  />
                  <!-- @change="toggleSelected" -->
                  <span class="ml-2 text-gray-700">{{ tableField.text }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- Table Starts -->

        <!-- selected table field show  ends -->
      </div>
      <div class="p-6">
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                <input
                  type="checkbox"
                  v-model="selectAll"
                  class="
                    form-checkbox
                    h-5
                    w-5
                    text-indigo-600
                    transition
                    duration-150
                    ease-in-out
                  "
                />
                {{ $t("TABLE.CHECK_ALL") }}
              </th>
              <th
                class="
                  px-6
                  py-3
                  text-xs
                  font-medium
                  leading-4
                  tracking-wider
                  text-left text-gray-500
                  uppercase
                  border-b border-gray-200
                  bg-gray-50
                "
                :key="i"
                v-for="(selectedTableField, i) in displayTableFieldOnSelect"
              >
                <!-- selectedTableFields  working-->
                <!-- displayTableFieldOnSelect -->
                {{ selectedTableField.text }}
              </th>

              <th
                class="
                  px-6
                  py-3
                  text-xs
                  font-medium
                  leading-4
                  tracking-wider
                  text-left text-gray-500
                  uppercase
                  border-b border-gray-200
                  bg-gray-50
                "
              >
                {{ $t("TABLE.ACTION") }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr :key="i" v-for="(item, i) in getData">
              <td class="px-6 py-4 whitespace-no-wrap">
                <input
                  type="checkbox"
                  v-model="selectedItems"
                  :value="item"
                  class="
                    form-checkbox
                    h-5
                    w-5
                    text-indigo-600
                    transition
                    duration-150
                    ease-in-out
                  "
                />
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                :key="j"
                v-for="(selectedItemField, j) in displayTableFieldOnSelect"
              >
                <!-- selectedTableFields working-->
                <!-- displayTableFieldOnSelect -->
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium leading-5 text-gray-900">
                      {{ item[selectedItemField.value] }}
                    </div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium leading-5 text-gray-900">
                      <span class="text-blue-600/100">{{ $t("TABLE.EDIT") }}</span>
                      <span>{{ $t("TABLE.DELETE") }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <v-select
            label="text"
            class="mt-0 sel-div"
            :options="['10', '20', '50', '100']"
            placeholder="Select entries per page"
          ></v-select>
          <small>{{ $t("TABLE.ENTRIES") }} </small>
        </div>
      </div>
      <!-- Table Ends  -->
    </div>
  </div>
</template>
<script>
import NavBarComponent from "@/components/Nav";
import SidebarComponent from "@/components/SideBar";

export default {
  name: "TableActions",
  components: {
    NavBarComponent,
    SidebarComponent,
  },

  props: {
    items: Array,
    columns: Array,
  },
  data() {
    return {
      selected: false,
      isOpen: false,
      expanded: false,
      commpairisionArray: [
        { id: 1, label: this.$t("TABLE.IS")  },
        { id: 2, label: this.$t("TABLE.IS_NOT") },
        { id: 3, label: this.$t("TABLE.IS_LOWER_THAN")  },
        { id: 4, label: this.$t("TABLE.IS_LOWER_THAN_EQUAL") },
        { id: 5, label: this.$t("TABLE.IS_GREATER_THAN") },
        { id: 6, label: this.$t("TABLE.IS_GREATER_THAN_EQUAL") },
      ],
      statusTypeArray: [
        { id: 0, label: this.$t("TABLE.INACTIVE") },
        { id: 1, label: this.$t("TABLE.ACTIVE") },
      ],
      formValue: {
        table_id: null,
        compairision_id: null,
        statusType: "",
        created_at: "",
        selectedTableField: "",
      },
      selectedItems: [],
      selectAll: false,

      // dynamic addMore remove fields
      tableDynamicFields: [
        {
          table_id: "",
          compairision_id: "",
          statusType: "",
          created_at: "",
          compairedWith: "",
        },
      ],
    };
  },
  mounted() {
    // this.displayTableFieldOnSelect.map((field) => field.selected = true)
  },
  created() {
  },
  computed: {
    getData() {
      return this.items.map((obj) => ({
        ...obj,
        created_at: this.$moment(obj.created_at).format("DD-MM-YYYY HH:MM A"),
        status: obj.status === 1 ? this.$t("TABLE.ACTIVE")  : this.$t("TABLE.INACTIVE"),
      }));
    },
    displayTableFieldOnSelect() {
      let tableColumn = this.columns.filter((ele) => ele.value !== "Action");
      this.$store.dispatch("setTableCoulmnField", tableColumn);
      return tableColumn;
    },
    selectedTableFields() {
      console.log("this.displayTableFieldOnSelect.filter((field) => field.selected)", this.displayTableFieldOnSelect.filter((field) => field.selected))
      return this.displayTableFieldOnSelect.filter((field) => field.selected);
    },
  },
  watch: {
    selectAll(val) {
      if (val) {
        this.selectedItems = this.getData;
      } else {
        this.selectedItems = [];
      }
    },
    "tableField.selected"(selected) {
      return this.isOpen ? selected : false;
    },
  },
  methods: {
    // for table_id, compairision_id, status
    addMore() {
      this.tableDynamicFields.push({
        table_id: "",
        compairision_id: "",
        statusType: "",
        created_at: "",
        compairedWith: null,
      });
    },
    remove(index) {
      this.tableDynamicFields.splice(index, 1);
    },
    onSave() {
      console.log("items  ::::", this.items);
      console.log("tableDynamicFields", this.tableDynamicFields);
    },
  },
};
</script>

<style>
.main-contain {
  min-height: calc(100vh - 6rem);
  width: calc(100vw - 18.9rem);
}
</style>