import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js'
import { memo_data } from '../../api/socket';

let initLb = [(new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString(), 
    (new Date()).toLocaleTimeString()];

let initRam = [0,0,0,0,0,0,0,0,0,0];

export const ChartRam = () => {

    const [ram, setRam] = useState(initRam);
    const [labels, setLabels] = useState(initLb);
    
    useEffect(() => {
        let interval = setInterval(() => {
            createChart();
            setLabels(previous => {
                previous.shift();
                previous.push((new Date()).toLocaleTimeString());
                return previous;
            });
            setRam(previous => {
                previous.shift();
                previous[9] = memo_data.used_memo;
                return previous;
            });
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    const createChart = () => {
        const ctx = document.getElementById('chartRam');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '% Ram',
                    fill: false,
                    backgroundColor: '#fdad5c',
                    borderColor: '#fdad5c',
                    data: ram
                }]
            },
            options:{
                animation: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Uso de RAM'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                hover:{
                    mode: 'nearest',
                    intersect: true
                },
                scales:{
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    },
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            }
        })
    }

    return (
        <canvas id="chartRam"></canvas>
    )
}
