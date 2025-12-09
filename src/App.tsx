import SalesChart from "./components/SalesChart";
import CapacityCard from "./components/ui/CapacityCard";
import VisitorsCard from "./components/ui/VisitorsCard";
import {
  useCurrentCapacity,
  useTicketSales,
  useTodayVisitors,
} from "./hooks/useTodayVisitors";

function App() {
  const { data: visitorData } = useTodayVisitors();
  const { data: currenCapacityData } = useCurrentCapacity();
  const { data: ticketSales } = useTicketSales();

  return (
    <div className="p-5 bg-gray-200 min-h-screen">
      <div className="lg:w-3/4 mx-auto">
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome to your Dashboard!
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-600">
            The date is{" "}
            <span className="font-semibold text-indigo-600">
              27th of December, Sunday
            </span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 ">
          {visitorData && (
            <VisitorsCard className="flex-1" visitorData={visitorData} />
          )}
          {currenCapacityData && (
            <CapacityCard
              className="flex-1"
              currenCapacityData={currenCapacityData}
            />
          )}
        </div>
        {ticketSales && (
          <SalesChart ticketSales={ticketSales} className="mt-5" />
        )}
      </div>
    </div>
  );
}

export default App;
