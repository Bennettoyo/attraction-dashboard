import type { CapacityStats } from "@/api/stats";
import { Progress } from "../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "../ui/badge";

type CapacityStatus = "Low" | "Medium" | "High";

type CapacityCardProps = {
  className: string;
  currenCapacityData: CapacityStats;
};

export default function CapacityCard({
  className,
  currenCapacityData,
}: CapacityCardProps) {
  const percentage = currenCapacityData.capacityPercentage;
  const status = getStatusLabel(percentage);

  function getStatusLabel(percentage: number): CapacityStatus {
    if (percentage < 33) return "Low";
    if (percentage < 66) return "Medium";
    return "High";
  }

  function getStatusColor(percentage: number) {
    if (percentage < 33) return "bg-green-500 text-white";
    if (percentage < 66) return "bg-yellow-500 text-black";
    return "bg-red-500 text-white";
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Capacity Utilisation</CardTitle>
        <CardDescription>
          Total amount of capacity taken and left over
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="leading-none font-semibold">
          Total Capacity Percentage: {currenCapacityData.capacityPercentage}%
        </p>
        <Progress
          className="mt-3 h-4"
          value={currenCapacityData.capacityPercentage}
        />
        <Badge className={`mt-3 ${getStatusColor(percentage)}`}>{status}</Badge>
      </CardContent>
    </Card>
  );
}
