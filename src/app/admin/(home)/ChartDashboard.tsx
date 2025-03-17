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
import { useEffect, useState } from "react";
import instanceLocal from "@/app/api/instances";

const chartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "#fff",
  },
} satisfies ChartConfig;

function SalesChartDashboard() {
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await instanceLocal.get("carts/total-revenue");

        setRevenue(() => {
          const matchData = data.data.data.map(
            (d: { totalRevenue: number; monthYear: string }) => {
              return { month: d.monthYear, totalRevenue: d.totalRevenue };
            }
          );
          return matchData;
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {revenue.length && (
        <div>
          <Card className="rounded-xl border-none bg-sidebar-four text-sidebar-primary">
            <CardHeader>
              <CardTitle>Monthly Sales Chart</CardTitle>
              <CardDescription>2025</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={revenue}>
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
                  <Bar dataKey="totalRevenue" fill="#2196F3" radius={4} />
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
      )}
    </>
  );
}

export default SalesChartDashboard;
