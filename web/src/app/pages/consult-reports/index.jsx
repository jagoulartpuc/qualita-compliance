import React, { useEffect, useState } from 'react';
import "./style.scss";
import { getReports } from '../../../services/report.service'
import CustomTable from "./Table";
import {useHistory} from "react-router-dom";

export function ConsultReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect( () => {
        (async () => {
            try {
                setLoading(true);
                const {data: reportsResponse} = await getReports();
                setReports(reportsResponse);
                setLoading(false);
            } catch (error) {
                history.replace("/");
            }
        })();
    }, []);

    const childProps = { reports, setReports }
    return loading ? <h1>Carregando...</h1> : (
        <div id="consult-reports-page">
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
                            <div className='no-data-found'>NENHUM REGISTRO ENCONTRADO </div>
                        ))}
                    </div>
                </section>
            </main>
        </div >
    );
}
