import { defineStore } from "pinia";

import { useTokenValidation } from "../composables/UseTokenValidation";

export const loginStore = defineStore({
  id: "user",
  state: () => ({
    isLoggedIn: false,
    jwt: null,
  }),
  actions: {
    login(jwt) {
      this.jwt = jwt;
      this.isLoggedIn = true;
    },
    logout() {
      this.jwt = null;
      this.isLoggedIn = false;
      localStorage.removeItem("jwt");
    },
    async checkLoginStatus() {
      console.log("checkLoginStatus");
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        console.log("jwt", jwt);
        if (await useTokenValidation(jwt)) {
          this.login(jwt);
        } else {
          this.logout();
        }
      }
    },
  },
});
