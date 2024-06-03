
export default function useNotificationActions() {
  const performNotificationAction = async (notification: any, router: any, shopStore: any, logStore: any) => {
    let response;
    switch (notification.type) {
      case "sharedWorkout":
        console.log("Shared Workout");
        // response = await getShoppingLists(logStore.userId);
        // shopStore.shoppingLists = response.data;
        // router.push(`/liveShoppinglist/${notification.data.shoppingListId}`);
        break;
    }
  };

  return {
    performNotificationAction,
  };
}