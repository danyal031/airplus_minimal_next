export interface PassengersCapacityDataType {
  childCapacity: number;
  adultCapacity: number;
}

export const PassengersCapacityDefaultValue: PassengersCapacityDataType = {
  adultCapacity: 1,
  childCapacity: 0,
};
