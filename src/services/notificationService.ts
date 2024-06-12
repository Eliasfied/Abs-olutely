import httpswithToken from "./httpsWithToken";

export const getAllNotifications = async (userid: string) => {
  return await httpswithToken.get("/api/notifications?userId=" + userid);
}

export const acknowledgeNotification = async (notificationId: string) => {
  return await httpswithToken.post("/api/notifications/acknowledge?notificationId=" + notificationId);
}