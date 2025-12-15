export type TodayVisitorsStats = {
  totalVisitors: number;
  yesterdaysVisitors: number;
};

// starting mock values
let totalVisitors = 2075;
const yesterdaysVisitors = 4023;

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

export type AttractionStatus = "open" | "closed" | "delayed";

export type Attraction = {
  id: string;
  name: string;
  staffAssigned: number;
  revenue: number;
  capacity: number;
  queueLength: number;
  status: AttractionStatus;
  waitTime: number | null;
  lastUpdated: string;
  fastPass: boolean;
};

let attractionsData: Attraction[] = [
  {
    id: "1",
    name: "Dragon Coaster",
    status: "open",
    waitTime: 45,
    staffAssigned: 24,
    revenue: 3200.12,
    capacity: 250,
    queueLength: 31,
    fastPass: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Haunted Manor",
    status: "delayed",
    waitTime: null,
    staffAssigned: 27,
    revenue: 4241.51,
    capacity: 535,
    queueLength: 142,
    fastPass: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "3",
    name: "River Rapids",
    status: "closed",
    waitTime: null,
    staffAssigned: 64,
    revenue: 1253.51,
    capacity: 113,
    queueLength: 214,
    fastPass: false,
    lastUpdated: new Date().toISOString(),
  },
];

export async function fetchAttractions(): Promise<Attraction[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newData = attractionsData.map((attraction) => {
    // waitTime fluctuation for open rides
    const deltaWait = Math.floor(Math.random() * 15) - 5;
    const newWaitTime =
      attraction.waitTime === null
        ? Math.floor(Math.random() * 30) + 10
        : Math.max(5, (attraction.waitTime ?? 0) + deltaWait);

    // staff fluctuation
    const deltaStaff = Math.floor(Math.random() * 3) - 1;
    const newStaff = Math.max(1, attraction.staffAssigned + deltaStaff);

    // revenue fluctuation (only upward, £50–£500)
    const revenueIncrease = Math.floor(Math.random() * 451) + 50; // 50–500
    const newRevenue = attraction.revenue + revenueIncrease;

    // queueLength fluctuation
    const deltaQueue = Math.floor(Math.random() * 21) - 10; // -10 to +10
    const newQueueLength = Math.max(
      0,
      (attraction.queueLength ?? 0) + deltaQueue
    );

    return {
      ...attraction,
      waitTime: newWaitTime,
      staffAssigned: newStaff,
      revenue: newRevenue,
      queueLength: newQueueLength,
      lastUpdated: new Date().toISOString(),
    };
  });

  // save back to internal state
  attractionsData = newData;

  return newData;
}
