import { WaterConsumption } from "@/types";
import { fetchWaterConsumption } from "@/api/waterService";

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

export const calculateTotalWaterConsumption = async (
  userId: string,
  selectedDate: Date,
): Promise<number> => {
  try {
    const waterConsumptionData = await fetchWaterConsumption(userId);
    const filteredData = filterWaterConsumptionByDate(
      waterConsumptionData,
      selectedDate,
    );

    let totalConsumption = 0;

    filteredData.forEach((water) => {
      if (water.unit === "l") {
        totalConsumption += water.amount;
      } else if (water.unit === "ml") {
        totalConsumption += water.amount / 1000;
      }
    });

    return totalConsumption;
  } catch (error) {
    console.error("Error calculating total water consumption:", error);
    return 0;
  }
};
