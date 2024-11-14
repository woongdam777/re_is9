import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and plugins
Chart.register(...registerables, ChartDataLabels);

const JobRankPieChart = ({ ranks }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const data = {
      labels: Object.keys(ranks),
      datasets: [{
        label: '직업별 인원 수',
        data: Object.values(ranks).map(({ count }) => count),
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
          '#FF9F40', // Orange
          '#8E44AD', // Dark Purple
          '#3498DB', // Bright Blue
          '#E74C3C', // Bright Red
          '#2ECC71', // Green
          '#F39C12', // Dark Yellow
          '#1ABC9C', // Cyan
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 10, // Increase hover effect size
      }],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 10,
              weight: 'bold',
            },
            color: '#333',
            padding: 15,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          bodyFont: { size: 14 },
          padding: 10,
          cornerRadius: 5,
        },
        datalabels: {
          anchor: 'center', // Position between middle and end of slices
          align: 'end',
          offset: 15, // Space between label and slice (adjusted for better visibility)
          formatter: (value) => {
            return `${value}`; // Show only value (you can add job name if needed)
          },
          font: {
            size: 12,
            weight: 'bold',
          },
          color: '#000', 
        },
      },
      layout: {
        padding: {
          top: 30,  
          bottom: 30, 
        },
      },
    };

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data,
      options,
    });

    return () => {
      myPieChart.destroy();
    };
  }, [ranks]);

  return (
    <div style={{width:'100%', height:'95%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default JobRankPieChart;