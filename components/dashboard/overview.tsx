"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 2400,
  },
  {
    name: "Feb",
    total: 1398,
  },
  {
    name: "Mar",
    total: 9800,
  },
  {
    name: "Apr",
    total: 3908,
  },
  {
    name: "Mei",
    total: 4800,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 4300,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Rp${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Tooltip
          cursor={{ fill: "transparent" }}
          formatter={(value: number) => [`Rp${value.toLocaleString("id-ID")}`, "Total"]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
