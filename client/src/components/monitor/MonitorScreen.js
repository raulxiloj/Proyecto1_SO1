import React, { useEffect, useState } from 'react'
import { memo_data, cpu_usage } from '../../api/socket';
import { ChartCPU } from './ChartCpu';
import { ChartRam } from './ChartRam';

export const MonitorScreen = () => {

    const [ram, setRam] = useState(null);
    const [cpu, setCPU] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setRam(memo_data);
            setCPU(cpu_usage);
            //console.log(memo_data)
            //console.log(cpu_data)
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-8">
                    <p className="text-center"><strong>Monitor de CPU</strong></p>
                    {
                        (cpu) ? 
                        <ChartCPU />
                        : ''
                    }
                </div>
                <div className="col-3 mt-5">
                    <table className="table table-stripped ">
                        <tbody>
                            <tr>
                                <td><strong>Porcentaje CPU:</strong></td>
                                <td>{(cpu) ?  cpu : ''}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-8">
                <p className="text-center"><strong>Monitor de RAM</strong></p>
                    {
                        (ram) ? 
                        <ChartRam />
                        : ''
                    }
                </div>
                <div className="col-3 mt-5">
                    <table className="table table-stripped ">
                        <tbody>
                            <tr>
                                <td><strong>Total memoria:</strong></td>
                                <td>{memo_data.total_memo}MB</td>
                            </tr>
                            <tr>
                                <td><strong>Memoria consumida</strong></td>
                                <td>{memo_data.total_memo - memo_data.free_memo}MB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}