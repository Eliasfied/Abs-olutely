export default function useNotificationActions() {
  const performNotificationAction = async (
    notification: any,
    router: any,
    store: any,
    logStore: any
  ) => {
    switch (notification.type) {
      case "sharedWorkout":
        console.log("Shared Workout");
        router.push("sharedItems");
        break;
    }
  };

  return {
    performNotificationAction,
  };
}
