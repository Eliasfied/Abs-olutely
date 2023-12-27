import { ref } from "vue";
import axios from "axios";

export async function useTokenValidation(token) {
    try {
      console.log(token);
      const response = await axios.post("http://localhost:7070/validate", {
        token,
      });
      console.log(response.data);
      return response.data === "valid";
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
}
