// @ts-nocheck
import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import type { DailyDataPoint, TimeRange } from '../hooks/useAdminData';

export type MetricType = 'dau' | 'puzzlesPlayed' | 'winRate' | 'newSignups' | 'totalUsers' | 'stickiness';

interface MetricChartProps {
    title: string;
    metricType: MetricType;
    data: DailyDataPoint[];
    timeRange: TimeRange;
    onTimeRangeChange: (range: TimeRange) => void;
    onClose: () => void;
    theme: 'light' | 'dark';
}

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '14days', label: 'Last 14 Days' },
    { value: '28days', label: 'Last 28 Days' },
    { value: 'all', label: 'All Time' },
];

const METRIC_CONFIG: Record<MetricType, {
    label: string;
    dataKey: keyof DailyDataPoint;
    colorDark: string;
    colorLight: string;
    chartType: 'bar' | 'line';
    suffix?: string;
}> = {
    dau: {
        label: 'Daily Active Users',
        dataKey: 'dau',
        colorDark: '#9eef80',
        colorLight: '#22c55e',
        chartType: 'line',
    },
    puzzlesPlayed: {
        label: 'Puzzles Played',
        dataKey: 'puzzlesPlayed',
        colorDark: '#6dd5ed',
        colorLight: '#0891b2',
        chartType: 'line',
    },
    winRate: {
        label: 'Win Rate',
        dataKey: 'winRate',
        colorDark: '#f9d423',
        colorLight: '#ca8a04',
        chartType: 'line',
        suffix: '%',
    },
    newSignups: {
        label: 'New Signups',
        dataKey: 'newSignups',
        colorDark: '#ff6b6b',
        colorLight: '#dc2626',
        chartType: 'bar',
    },
    totalUsers: {
        label: 'Total Users',
        dataKey: 'cumulativeUsers',
        colorDark: '#9eef80',
        colorLight: '#22c55e',
        chartType: 'line',
    },
    stickiness: {
        label: 'Stickiness (DAU/Users)',
        dataKey: 'stickiness',
        colorDark: '#c084fc',
        colorLight: '#9333ea',
        chartType: 'line',
        suffix: '%',
    },
};

export const MetricChart: React.FC<MetricChartProps> = ({
    title,
    metricType,
    data,
    timeRange,
    onTimeRangeChange,
    onClose,
    theme,
}) => {
    const config = METRIC_CONFIG[metricType];
    const isDark = theme === 'dark';
    const chartColor = isDark ? config.colorDark : config.colorLight;
    
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#f0f0f0' : '#331922';
    const tooltipBg = isDark ? '#1a1a2e' : '#fff';
    
    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="metric-chart-tooltip">
                    <p className="metric-chart-tooltip-label">{label}</p>
                    <p className="metric-chart-tooltip-value">
                        {payload[0].value}{config.suffix || ''}
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderChart = () => {
        const commonProps = {
            data,
            margin: { top: 20, right: 30, left: 20, bottom: 20 },
        };

        if (config.chartType === 'bar') {
            return (
                <BarChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis 
                        dataKey="displayDate" 
                        tick={{ fill: textColor, fontSize: 12 }}
                        tickLine={{ stroke: gridColor }}
                        axisLine={{ stroke: gridColor }}
                    />
                    <YAxis 
                        tick={{ fill: textColor, fontSize: 12 }}
                        tickLine={{ stroke: gridColor }}
                        axisLine={{ stroke: gridColor }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                        dataKey={config.dataKey} 
                        fill={chartColor} 
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            );
        }

        return (
            <LineChart {...commonProps}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                    dataKey="displayDate" 
                    tick={{ fill: textColor, fontSize: 12 }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                />
                <YAxis 
                    tick={{ fill: textColor, fontSize: 12 }}
                    tickLine={{ stroke: gridColor }}
                    axisLine={{ stroke: gridColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                    type="monotone" 
                    dataKey={config.dataKey} 
                    stroke={chartColor}
                    strokeWidth={3}
                    dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: chartColor }}
                />
            </LineChart>
        );
    };

    // Calculate summary stats
    const totalValue = data.reduce((sum, d) => sum + (d[config.dataKey] as number), 0);
    const avgValue = data.length > 0 ? Math.round(totalValue / data.length * 10) / 10 : 0;
    const maxValue = Math.max(...data.map(d => d[config.dataKey] as number));
    const latestValue = data.length > 0 ? data[data.length - 1][config.dataKey] : 0;

    return (
        <div className="metric-chart-modal-overlay" onClick={onClose}>
            <div className="metric-chart-modal" onClick={e => e.stopPropagation()}>
                <div className="metric-chart-header">
                    <h2>{title}</h2>
                    <button className="metric-chart-close" onClick={onClose}>×</button>
                </div>
                
                <div className="metric-chart-controls">
                    <select 
                        value={timeRange} 
                        onChange={e => onTimeRangeChange(e.target.value as TimeRange)}
                        className="metric-chart-time-select"
                    >
                        {TIME_RANGE_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="metric-chart-summary">
                    <div className="metric-chart-stat">
                        <span className="metric-chart-stat-value">{latestValue}{config.suffix || ''}</span>
                        <span className="metric-chart-stat-label">Latest</span>
                    </div>
                    <div className="metric-chart-stat">
                        <span className="metric-chart-stat-value">{avgValue}{config.suffix || ''}</span>
                        <span className="metric-chart-stat-label">Average</span>
                    </div>
                    <div className="metric-chart-stat">
                        <span className="metric-chart-stat-value">{maxValue}{config.suffix || ''}</span>
                        <span className="metric-chart-stat-label">Peak</span>
                    </div>
                    {config.chartType === 'bar' && (
                        <div className="metric-chart-stat">
                            <span className="metric-chart-stat-value">{totalValue}</span>
                            <span className="metric-chart-stat-label">Total</span>
                        </div>
                    )}
                </div>

                <div className="metric-chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

