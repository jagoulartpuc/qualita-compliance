import React from "react";
import { useSession } from "@Context";
import { Card } from "@Components";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { validateModule } from '@Services/company.service';
import { isValidated } from '@Services/trainning.service';


import "./style.scss";

const modules = [
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 1",
        description: "Conceitos/objetivos",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 2",
        description: "Pilares",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 3",
        description: "Diagnóstico",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 4",
        description: "Customizações",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 5",
        description: "Matriz de risco/responsabilidade",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 6",
        description: "Canal de denúncias",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 7",
        description: "Prognóstico",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        title: "Módulo 8",
        description: "Comunicação",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 9",
        description: "Treinamentos",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    },
    {
        id: '60e8a4b33bae1e7d13137182',
        title: "Módulo 10",
        description: "Teste/reteste",
        icon: faAward,
        href: "treinamentos/60e8a4b33bae1e7d13137182",
    }
];



export function TrainingModulesPage() {
    const { user } = useSession();
    const validateTrainnningModule = (event) => {
        const moduleId = event?.target?.value;
        validateModule(moduleId, user.identifier).then(data => console.log(data));
    };

    const isModuleValidated = (moduleId) => {
        isValidated(moduleId, user?.identifier);
    }

    return (
        <main id="profile-page">
            <h2 className="page-title">Selecione um dos módulos abaixo </h2>
            <div className="card-list">
                {modules.map((mod, index) => {
                    return (user?.role === 'COMPANY' || user?.role === 'ADMIN' && (
                        <Card key={index} {...mod} action={validateTrainnningModule} inputActionValue={mod.id} additionalLabel='?Válido' />
                    )) ||
                        (user?.role === 'PERSON' || user?.role === 'ADMIN' && <Card key={index} {...mod} additionalLabel='Válido' />);
                })}
            </div>
        </main>
    );
}
