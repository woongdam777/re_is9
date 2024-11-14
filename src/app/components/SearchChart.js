'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

Chart.register(...registerables);
Chart.register(ChartDataLabels); 

export default function ChartComponent({ fnChart }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current && fnChart) {
      const ctx = chartRef.current.getContext('2d');
      const dataArray = fnChart.split('|').map(Number).reverse();

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['업뎃시간', '2시간 전', '4시간 전', '6시간 전', '8시간 전'],
          datasets: [{
            label: '시간별 데이터',
            data: dataArray,
            borderColor: 'rgb(245,118,178)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback(value) { return Math.round(value / 100) * 100; },
                stepSize: 100
              },
              suggestedMax(context) {
                const max = Math.max(...context.chart.data.datasets[0].data);
                return Math.ceil(max / 100) * 120;
              },
              suggestedMin(context) {
                const min = Math.min(...context.chart.data.datasets[0].data);
                return Math.floor(min / 100) * 80;
              }
            },
            y: {
              beginAtZero: true,
            }
          },
          plugins: {
            legend: {
              display: false // 범례 제거
            },
            datalabels: {
              anchor: 'center', // 중앙으로 이동
              align: 'center', // 중앙 정렬
              formatter: (value) => value, // 데이터 값을 표시
              color: '#fff', // 텍스트 색상
              font: {
                weight: 'bold',
                size: 12
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [fnChart]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}