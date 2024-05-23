
export default function useNotificationActions() {
  const performNotificationAction = async (notification: any, router: any, shopStore: any, logStore: any) => {
    let response;
    switch (notification.type) {
      case "sharedShoppingList":
        console.log("Shared shopping list");
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