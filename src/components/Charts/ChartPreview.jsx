import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartPreview({ chartType, data, options }) {
  const chartData = useMemo(() => {
    const isArea = chartType === 'area';
    return {
      labels: data.labels,
      datasets: data.datasets.map(ds => ({
        ...ds,
        borderColor: ds.backgroundColor,
        borderWidth: options.lineStyle?.lineWidth || 2,
        tension: options.lineStyle?.tension || 0.4,
        pointRadius: options.lineStyle?.pointRadius || 4,
        fill: isArea,
        backgroundColor: isArea
          ? ds.backgroundColor + '80'
          : ds.backgroundColor,
        borderRadius: chartType === 'bar' || chartType === 'stackedBar' || chartType === 'horizontalBar'
          ? options.barStyle?.borderRadius || 4
          : 0,
      }))
    };
  }, [chartType, data, options]);

  const chartOptions = useMemo(() => {
    const isHorizontal = chartType === 'horizontalBar';
    const isStacked = chartType === 'stackedBar';
    const isPie = chartType === 'pie' || chartType === 'donut';

    const titleFont = {
      family: options.title?.font || options.fonts?.family || 'Open Sans',
      size: options.title?.size || 24,
      weight: options.title?.bold ? 'bold' : 'normal',
      style: options.title?.italic ? 'italic' : 'normal',
    };

    const axisFont = {
      family: options.fonts?.family || 'Open Sans',
      size: options.fonts?.axisSize || 12,
    };

    const base = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: !!options.title?.text,
          text: options.title?.text || '',
          font: titleFont,
          color: '#1f2937',
        },
        legend: {
          display: options.legend?.display !== false,
          position: options.legend?.position || 'top',
          labels: {
            font: { family: options.fonts?.family || 'Open Sans', size: options.fonts?.labelSize || 14 }
          }
        },
        tooltip: { enabled: true }
      }
    };

    if (!isPie) {
      base.scales = {
        x: {
          display: options.axes?.x?.display !== false,
          stacked: isStacked,
          grid: { display: options.axes?.x?.gridLines !== false },
          title: {
            display: !!options.axes?.x?.title,
            text: options.axes?.x?.title || '',
            font: axisFont
          },
          ticks: { font: axisFont }
        },
        y: {
          display: options.axes?.y?.display !== false,
          stacked: isStacked,
          grid: { display: options.axes?.y?.gridLines !== false },
          title: {
            display: !!options.axes?.y?.title,
            text: options.axes?.y?.title || '',
            font: axisFont
          },
          ticks: { font: axisFont }
        }
      };
      if (isHorizontal) {
        base.indexAxis = 'y';
      }
    } else {
      base.plugins.tooltip = { enabled: true };
      if (chartType === 'donut') {
        base.cutout = options.pieStyle?.cutout || '50%';
      }
      base.rotation = options.pieStyle?.rotation ? (options.pieStyle.rotation * Math.PI) / 180 : 0;
    }

    return base;
  }, [chartType, options]);

  const containerStyle = {
    backgroundColor: options.backgroundColor || '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    height: '100%',
    width: '100%',
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
      case 'horizontalBar':
      case 'stackedBar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
      case 'area':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'donut':
        return <Doughnut data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div id="chart-container" style={containerStyle}>
      {renderChart()}
    </div>
  );
}
