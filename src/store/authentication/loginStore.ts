import { defineStore } from "pinia";
import { onAuthChange } from "@/services/fireBaseService";

export const loginStore = defineStore({
  id: "user",
  state: () => ({
    isLoggedIn: false as boolean,
    jwt: null as string | null,
    userId: null as string | null,
    displayName: null as string | null,
    email: null as string | null,
  }),
  actions: {
    login(jwt: string, userId: string, displayName: string, email: string) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId);
      this.jwt = jwt;
      this.email = email;
      this.userId = userId;
      this.displayName = displayName;
      this.isLoggedIn = true;
    },
    logout() {
      this.jwt = null;
      this.userId = null;
      this.isLoggedIn = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("userId");
    },
    getUserId() {
      if (this.userId) {
        return this.userId;
      } else { 
        const userIdStorage = localStorage.getItem("userId");
        return userIdStorage;
      }
    },
    async checkLoginStatus() {
      return new Promise((resolve) => {
        onAuthChange((user: any) => {
          if (user) {
            console.log("bin in user von checklogin");
            console.log(user);
            this.login(user.accessToken, user.uid, user.displayName, user.email);
            resolve(true);
          } else {
            this.logout();
            resolve(false);
          }
        });
      });
    },
  },
});
