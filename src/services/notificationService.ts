import httpswithToken from "./httpsWithToken";

export const getAllNotifications = async (userid: string) => {
  return await httpswithToken.get("/api/notification/getAll?userId=" + userid);
}

export const acknowledgeNotification = async (notificationId: string) => {
  return await httpswithToken.post("/api/notification/acknowledge?notificationId=" + notificationId);
}