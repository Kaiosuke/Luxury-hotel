"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", online: 12000, offline: 8000 },
  { month: "February", online: 15000, offline: 9500 },
  { month: "March", online: 18000, offline: 12000 },
  { month: "April", online: 20000, offline: 13000 },
  { month: "May", online: 22000, offline: 14000 },
  { month: "June", online: 25000, offline: 16000 },
];

const chartConfig = {
  online: {
    label: "Online Sales",
    color: "var(--chart-1)",
  },
  offline: {
    label: "Offline Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function SalesChartDashboard() {
  return (
    <div>
      <Card className="rounded-xl border-none bg-sidebar-four text-sidebar-primary">
        <CardHeader>
          <CardTitle>Monthly Sales Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="online" fill="var(--color-online)" radius={4} />
              <Bar dataKey="offline" fill="var(--color-offline)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 12% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total sales for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SalesChartDashboard;
