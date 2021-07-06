import React from "react";
import {useSession} from "@Context";
import {Card} from "@Components";
import {
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const modules = [
    {
        title: "Denúncia 1",
        description: "Clique aqui para ver os detalhes sobre a denúncia 1",
        icon: faExclamationTriangle,
        href: "reports",
    }
];

export function CompanyReportsPage() {
    const {user} = useSession();
    return (
        <main id="company-reports-page">
            <h2 className="page-title">Selecione uma das denúncias abaixo</h2>
            <div className="card-list">
                <Card key={0} {...modules[0]} />
            </div>
        </main>
    );
}