"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { VaultProjection } from "@/features/vault/calculations";
import { formatCurrency } from "@/features/vault/calculations";

export function VaultProjectionChart({ trajectory }: { trajectory: VaultProjection["trajectory"] }) {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trajectory} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="vault-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--arc-via))" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(var(--arc-via))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tickFormatter={(m) => `M${m}`}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelFormatter={(m) => `Month ${m}`}
            formatter={(value: number) => [formatCurrency(value), "Projected balance"]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="hsl(var(--arc-via))"
            strokeWidth={2}
            fill="url(#vault-area-gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
