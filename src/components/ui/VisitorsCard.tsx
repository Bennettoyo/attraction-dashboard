import type { TodayVisitorsStats } from "@/api/stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import CountUp from "react-countup";

type VisitorsCardProps = {
  visitorData: TodayVisitorsStats;
  className?: string;
};

export default function VisitorsCard({
  visitorData,
  className,
}: VisitorsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          Total amount of visitors today compared to yesterdays total amount of
          visitors
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-6">
        <p className="leading-none font-semibold">
          Todays Visitors:{" "}
          <p>
            <CountUp
              className="text-4xl font-bold"
              start={visitorData.totalVisitors - 5} // small trick to animate from previous-ish
              end={visitorData.totalVisitors}
              duration={2}
            />
          </p>
        </p>
        <p className="leading-none font-semibold">
          Yesterdays Visitors:{" "}
          <p className="text-4xl font-bold">
            {visitorData.yesterdaysVisitors.toLocaleString()}
          </p>
        </p>
      </CardContent>
    </Card>
  );
}
