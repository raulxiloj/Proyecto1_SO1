import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js'
import { cpu_usage } from '../../api/socket';

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

let initCPU = [0,0,0,0,0,0,0,0,0,0];

export const ChartCPU = () => {

    const [cpu, setCpu] = useState(initCPU);
    const [labels, setLabels] = useState(initLb);
    
    useEffect(() => {
        let interval = setInterval(() => {
            createChart();
            setLabels(previous => {
                previous.shift();
                previous.push((new Date()).toLocaleTimeString());
                return previous;
            });
            
            setCpu(previous => {
                previous.shift();
                previous[9] = cpu_usage;
                return previous;
            });
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    const createChart = () => {
        const ctx = document.getElementById('chartCPU');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '% CPU',
                    fill: false,
                    backgroundColor: '#3b42e5',
                    borderColor: '#3b42e5',
                    data: cpu
                }]
            },
            options:{
                animation: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Uso de CPU'
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
        <canvas id="chartCPU"></canvas>
    )
}
