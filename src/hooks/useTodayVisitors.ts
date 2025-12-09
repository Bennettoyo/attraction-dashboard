import { useQuery } from "@tanstack/react-query";
import {
  fetchCapacityStats,
  fetchTicketSales,
  fetchTodayVisitors,
} from "../api/stats";

export function useTodayVisitors() {
  return useQuery({
    queryKey: ["stats", "today-visitors"],
    queryFn: fetchTodayVisitors,
    refetchInterval: 2000, // refresh every 2 seconds
  });
}

export function useCurrentCapacity() {
  return useQuery({
    queryKey: ["stats", "current-capacity"],
    queryFn: fetchCapacityStats,
    refetchInterval: 500, // refresh every 2 seconds
  });
}

export function useTicketSales() {
  return useQuery({
    queryKey: ["stats", "ticket-sales"],
    queryFn: fetchTicketSales, // fetch latest ticket sales
    refetchInterval: 500, // refresh every 5 seconds
  });
}
