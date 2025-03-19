"use client";

import Image from "next/image";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Income: 4000,
    Expense: 2400,
  },
  {
    name: "Feb",
    Income: 3000,
    Expense: 1398,
  },
  {
    name: "Mar",
    Income: 2000,
    Expense: 9800,
  },
  {
    name: "Apr",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "May",
    Income: 1890,
    Expense: 4800,
  },
  {
    name: "Jun",
    Income: 4000,
    Expense: 2400,
  },
  {
    name: "Jul",
    Income: 3000,
    Expense: 1398,
  },
  {
    name: "Aug",
    Income: 2000,
    Expense: 9800,
  },
  {
    name: "Sep",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "Oct",
    Income: 1890,
    Expense: 4800,
  },
  {
    name: "Nov",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "Dec",
    Income: 1890,
    Expense: 4800,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="rgba(0, 0, 0, 0.1)" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#b1b5bb" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#b1b5bb" }} tickLine={false} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "5px", paddingBottom: "20px" }}
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#FFF066"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Expense"
            stroke="#8BCDF6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
