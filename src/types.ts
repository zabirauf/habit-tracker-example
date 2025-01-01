export type HabitData = {
  [year: number]: {
    [month: number]: {
      [day: number]: boolean;
    };
  };
};

export type MonthData = {
  [day: number]: boolean;
};

export type YearData = {
  [month: number]: MonthData;
}; 