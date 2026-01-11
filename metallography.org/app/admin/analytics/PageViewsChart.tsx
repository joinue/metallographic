'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp } from 'lucide-react'

type Granularity = 'hour' | 'day' | 'week' | 'month'

interface PageViewsChartProps {
  data: Array<{ period: string; views: number }>
  granularity: Granularity
  onGranularityChange: (granularity: Granularity) => void
}

export default function PageViewsChart({ data, granularity, onGranularityChange }: PageViewsChartProps) {
  const formatXAxis = (tickItem: string) => {
    if (granularity === 'hour') {
      // Format as "HH:00"
      const date = new Date(tickItem)
      return date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false })
    } else if (granularity === 'day') {
      // Format as "Mon DD"
      const date = new Date(tickItem)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else if (granularity === 'week') {
      // Format as "Week of Mon DD"
      const date = new Date(tickItem)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      return `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    } else {
      // Format as "MMM YYYY"
      const date = new Date(tickItem)
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
  }

  const granularityOptions: Array<{ value: Granularity; label: string }> = [
    { value: 'hour', label: 'By Hour' },
    { value: 'day', label: 'By Day' },
    { value: 'week', label: 'By Week' },
    { value: 'month', label: 'By Month' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Page Views Over Time</h3>
        </div>
        <div className="flex items-center gap-2">
          {granularityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onGranularityChange(option.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                granularity === option.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="period" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={formatXAxis}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelFormatter={(label) => formatXAxis(label)}
              formatter={(value: number) => [value.toLocaleString(), 'Views']}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          <p>No data available for the selected time period</p>
        </div>
      )}
    </div>
  )
}

