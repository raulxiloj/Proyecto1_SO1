import React, { useEffect, useState } from 'react'
import { memo_data } from '../../api/socket';
import { ChartRam } from './ChartRam';

export const MonitorScreen = () => {

    const [ram, setRam] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setRam(memo_data);
            //console.log(memo_data)
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-8">
                    <p className="text-center"><strong>Monitor de CPU</strong></p>
                </div>
            </div>
            <div className="row">
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
                                <td>{memo_data.total_memo}</td>
                            </tr>
                            <tr>
                                <td><strong>Memoria libre:</strong></td>
                                <td>{memo_data.free_memo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}