import React, { useEffect, useState } from 'react'
import { cpu_data, socket } from '../../api/socket'

export const HomeScreen = () => {

    const [processes, setProcesses] = useState([]);
    const [summary, setSummary] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setProcesses(cpu_data.processes) 
        }, 1000);
        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        if(cpu_data){
            setSummary({
                running: cpu_data.running,
                sleeping: cpu_data.sleeping,
                stopped: cpu_data.stopped,
                zombie: cpu_data.zombie,
                total: cpu_data.total
            })
        }
    },[processes]);

    const createRows = () => {
        if(processes){
            return (processes.map(process => (
            <tr key={process.pid}>
                <td>{process.pid}</td>
                <td>{process.name}</td>
                <td>{process.user}</td>
                <td>{process.state}</td>
                <td></td>
                <td>
                    <button className="btn btn-danger">
                        Kill
                    </button>
                </td>
            </tr>))
            )
        }
    }

    return (
        <div className="container mt-4">
            <h3>Procesos</h3>
            <hr/>
            <div className="d-flex justify-content-between mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">En ejecucion</h5>
                        <p className="card-text text-center"><span className="badge badge-success">{summary.running}</span></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Suspendidos</h5>
                        <p className="card-text text-center"><span className="badge badge-warning">{summary.sleeping}</span></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Detenidos</h5>
                        <p className="card-text text-center"><span className="badge badge-danger">{summary.stopped}</span></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Zombie</h5>
                        <p className="card-text text-center"><span className="badge badge-secondary">{summary.zombie}</span></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total</h5>
                        <p className="card-text text-center"><span className="badge badge-light">{summary.total}</span></p>
                    </div>
                </div>
            </div>
            <table className="table table-stripped text-center">
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>%Ram</th>
                        <th>Kill</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </div>
    )

}