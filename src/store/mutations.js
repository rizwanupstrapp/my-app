// import { TOKEN_KEY } from "../config/constant";
// import FormService from "@/services/form.service";

const mutations = {
  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {
    // Get Data localStorage
    const userInfo =
      JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser;

    for (const property of Object.keys(payload)) {
      if (payload[property] !== null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property];

        // Update key in localStorage
        userInfo[property] = payload[property];
      }
    }
    // Store data in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },

  SET_AUTH(state, payload) {
    console.log("SET_AUTH payload for Current user", payload);
    state.isAuthenticated = true;
    state.currentUser = payload;
    // console.log("store  from the mutation.js >>>", state.currentUser)
  },

  SET_TABLE_COLUMN(state, payload) {
    //  console.log("store  from the mutation.js >>>", state.payload)
    if (payload.isDragAndDrop) {
      state.tableColumn = payload.newItems;
      state.isDragAndDrop = payload.isDragAndDrop;
    } else {
      state.tableColumn = payload;
    }
  },

  PURGE_AUTH(state) {
    // deleteCookie(TOKEN_KEY);
    state.isAuthenticated = false;
    state.currentUser = null;
    state.genderType = [];
    state.occupation = [];
  },

  SET_UPDATE_PROFILE(state, payload) {
    // console.log("state  in purge update profile", state)
    // deleteCookie(TOKEN_KEY);
    // state.isAuthenticated = false;
    console.log("update profile payload From mutation.js>>>", payload.data);

    // return

    state.currentUser.data.user = payload.data;
  },

  GET_GENDER(state) {
    state.genderType = [
      { key: 1, title: "Male" },
      { key: 2, title: "Female" },
    ];
  },
};

export default mutations;
