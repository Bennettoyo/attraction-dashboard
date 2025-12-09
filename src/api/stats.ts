export type TodayVisitorsStats = {
  totalVisitors: number;
  yesterdaysVisitors: number;
};

// starting mock values
let totalVisitors = 2075;
let yesterdaysVisitors = 4023;

export async function fetchTodayVisitors(): Promise<TodayVisitorsStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // BIG jump each refresh
  const newVisitors = Math.floor(Math.random() * 200) + 50; // +50 to +249
  totalVisitors += newVisitors;

  return {
    totalVisitors,
    yesterdaysVisitors,
  };
}

export type TicketSalesStats = {
  day: string;
  tickets: number;
}[];

let ticketSalesData: TicketSalesStats = [
  { day: "Mon", tickets: 2001 },
  { day: "Tue", tickets: 2052 },
  { day: "Wed", tickets: 1784 },
  { day: "Thu", tickets: 2494 },
  { day: "Fri", tickets: 2794 },
  { day: "Sat", tickets: 4023 },
  { day: "Sun", tickets: 2082 },
];

export async function fetchTicketSales(): Promise<TicketSalesStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Copy the existing array to avoid mutating accidentally
  const newData = [...ticketSalesData];

  // Update only the last day (Sunday)
  const lastIndex = newData.length - 1;
  const increment = Math.floor(Math.random() * 500) + 50; // +50 to +549
  newData[lastIndex] = {
    ...newData[lastIndex],
    tickets: newData[lastIndex].tickets + increment,
  };

  // Save back
  ticketSalesData = newData;

  return ticketSalesData;
}

export type CapacityStats = {
  currentVisitors: number;
  capacityPercentage: number;
};

let currentVisitors = 300;
const maxCapacity = 5000;

export async function fetchCapacityStats(): Promise<CapacityStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (currentVisitors < maxCapacity) {
    const increment = Math.floor(Math.random() * 300) + 50; // +50 to +349
    currentVisitors = Math.min(currentVisitors + increment, maxCapacity);
  }

  const capacityPercentage = Math.round((currentVisitors / maxCapacity) * 100);

  return {
    currentVisitors,
    capacityPercentage,
  };
}
