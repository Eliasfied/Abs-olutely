import httpswithToken from "./httpsWithToken";

export const getAllNotifications = async (userid: string) => {
  return await httpswithToken.get("/notifications?userId=" + userid);
}

export const acknowledgeNotification = async (notificationId: string) => {
  return await httpswithToken.post("/notifications/acknowledge?notificationId=" + notificationId);
}