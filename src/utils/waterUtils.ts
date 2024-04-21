import { WaterConsumption } from "@/types";

export const filterWaterConsumptionByDate = (
  waterConsumptionData: WaterConsumption[],
  selectedDate: Date,
): WaterConsumption[] => {
  return waterConsumptionData.filter((water) => {
    const consumptionDate = new Date(water.consumed_at);
    return (
      consumptionDate.getFullYear() === selectedDate.getFullYear() &&
      consumptionDate.getMonth() === selectedDate.getMonth() &&
      consumptionDate.getDate() === selectedDate.getDate()
    );
  });
};
