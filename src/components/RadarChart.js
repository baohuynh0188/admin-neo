import React from 'react'
import { Radar } from 'react-chartjs-2';

const RadarChart = (props) => {

    const data = {
        labels: props.username,
        datasets: [
            {
                label: props.label,
                data: props.rating,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    const options = {
        scale: {
            ticks: { beginAtZero: true },
        },
    };

    return (
        <div>
            <Radar data={data} options={options} />
        </div>
    )
}

export default RadarChart
