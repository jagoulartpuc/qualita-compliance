import React from "react";
import { LOCAL_STORAGE_USER_IDENTIFICATION       } from "@Context";
import { Card } from "@Components";
import {
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useEffect } from "react";
import { getCompanyReports } from '@Services';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CompanyReportsPage() {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_IDENTIFICATION));
    const [companyReports, setCompanyReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data: responseData } = await getCompanyReports(user.identifier);

                setCompanyReports(responseData);
                setLoading(false);
            } catch (error) {
                history.replace("/");
            }
        })();
    }, []);


    return loading ?
        <h1>Carregando</h1>
        : (
            <main id="company-reports-page">
                <h2 className="page-title">Selecione uma das denúncias abaixo</h2>
                <div className="card-list">
                    {companyReports.map(comp => {
                        const description = (
                            <div className='report-details'>
                                <span>Protocolo: {comp.trackingId}</span><br />
                                <strong>Ver detalhes</strong>
                            </div>
                        );

                        const icons =  <FontAwesomeIcon className="card-icon" icon={faExclamationTriangle} size="2x" /> 
                        return <Card key={comp.trackingId} title={comp.category} description={description} icons={icons} href={`reports/${comp.trackingId}`} />;
                    })}
                </div>
            </main>
        );
}