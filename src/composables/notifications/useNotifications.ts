import { ref } from 'vue';

// State
const hasUnreadNotifications = ref(false);

// Function to set the state
const setHasUnreadNotifications = (value: any) => {
  hasUnreadNotifications.value = value;
};

export default function useNotifications() {
  return {
    hasUnreadNotifications,
    setHasUnreadNotifications
  }
}