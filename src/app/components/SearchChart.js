'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

Chart.register(...registerables);
Chart.register(ChartDataLabels); 

export default function ChartComponent({ fnChart }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fnChart) {
      try {
        const dataArray = fnChart.split('|').map(Number);
        if (dataArray.some(isNaN)) {
          throw new Error("유효하지 않은 데이터가 포함되어 있습니다.");
        }
        setChartData(dataArray.reverse());
        setError(null);
      } catch (err) {
        setError(err.message);
        setChartData(null);
      }
    }
  }, [fnChart]);

  useEffect(() => {
    let chartInstance = null;

    if (chartRef.current && chartData) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          // labels: ['업뎃시간', '2시간 전', '4시간 전', '6시간 전', '8시간 전'],
          labels: ['업뎃시간', '2시간 전', '4시간 전'],
          datasets: [{
            label: '시간별 데이터',
            data: chartData,
            borderColor: 'rgba(102, 102, 102, 0.4)',
            backgroundColor : 'var(--bb-color)',
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
              display: false
            },
            datalabels: {
              anchor: 'center',
              align: 'center',
              formatter: (value) => value,
              color: '#fff',
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
  }, [chartData]);

  if (error) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'var(--hover-color)',
        fontWeight: 'bold',
        fontSize: '2rem'
      }}>
        수련장 초기화 후<br />
        최신맵 사용한 시점부터<br />
        8시간뒤 정상작동합니다.
      </div>
    );
  }

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}