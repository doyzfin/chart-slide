'use client';
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import adapter date-fns
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const SlidingChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    ChartJS.register(zoomPlugin);

    const chart = chartRef.current;
    const initialStartDate = data[data.length - 7].date;
    const initialEndDate = data[data.length - 1].date;

    if (chart) {
      chart.options.scales.x.min = initialStartDate;
      chart.options.scales.x.max = initialEndDate;
      chart.update();
    }
  }, [data]);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        min: new Date(data[0].date).getTime(),
        max: new Date(data[data.length - 1].date).getTime(),
        ticks: {
          source: 'auto',
          autoSkip: true,
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          rangeMin: {
            x: new Date(data[0].date).getTime(),
          },
          rangeMax: {
            x: new Date(data[data.length - 1].date).getTime(),
          },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
          rangeMin: {
            x: new Date(data[0].date).getTime(),
          },
          rangeMax: {
            x: new Date(data[data.length - 1].date).getTime(),
          },
        },
      },
    },
  };

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Data',
        data: data.map((d) => d.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line ref={chartRef} data={chartData} options={options} />;
};

export default SlidingChart;
