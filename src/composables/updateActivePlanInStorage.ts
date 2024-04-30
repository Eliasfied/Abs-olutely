import activePlanStorage from "@/storage/activePlanStorage";
import activePlanIdStorage from "@/storage/activePlanIdStorage";

export const updateActivePlanInStorage = async (
  activePlanName: string,
  activePlanId: string
) => {
  await activePlanStorage.removeItem("activePlanName");
  await activePlanIdStorage.removeItem("activePlanId");
  await activePlanStorage.setItem("activePlanName", activePlanName);
  await activePlanIdStorage.setItem("activePlanId", activePlanId);
};
