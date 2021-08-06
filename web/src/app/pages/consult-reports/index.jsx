import React, { useEffect, useState } from 'react';
import "./style.scss";
import { getReports } from '../../../services/report.service'
import CustomTable from "./Table";

export function ConsultReports() {

    const [reports, setReports] = useState([])

    useEffect(async () => {
        await getReports().then((data) => setReports(data.data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const childProps = { reports, setReports }
    return (
        <div id="consult-company-page">
            <main className="content">
                <h3 className="title">Consultar Denúncias</h3>
                <section className="form-section">
                    <div className='directory'>
                        {!!reports &&
                        reports.length > 0 &&
                        (
                            <CustomTable {...childProps} />
                        )
                        }
                        {/*no person found*/}
                        {(!reports) ||
                        (reports.length === 0 && (
                            <div className='no-file-found'>NENHUM REGISTRO ENCONTRADO </div>
                        ))}
                    </div>
                </section>
            </main>
        </div >
    );
}
