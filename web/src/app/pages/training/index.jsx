import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSession } from "@Context";
import { Card } from "@Components";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { validateModule } from '@Services/company.service';
import { getAllTrainnings } from '@Services/trainning.service';
import { LOCAL_STORAGE_USER_IDENTIFICATION } from "@Context/session.context";

import "./style.scss";

export function TrainingModulesPage() {
    const getLoggedUserFromStorage = () => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_IDENTIFICATION));
    }

    const user = getLoggedUserFromStorage();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const getTrainningsByUserId = () => {
        return getAllTrainnings(user.role === 'COMPANY' ? { cnpj: user?.identifier } : { cpf: user?.identifier });
    }

    const validateTrainnningModule = (event) => {
        const moduleId = event?.target?.value;

        validateModule(moduleId, user.identifier).then(async data => {
            const { data: modulesResponse } = await getTrainningsByUserId();
            setModules(modulesResponse);
        });
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data: modulesResponse } = await getTrainningsByUserId();
                setModules(modulesResponse);

                setLoading(false);
            } catch (error) {
                history.replace("/");
            }
        })();
    }, []);

    return loading ? <h1>Carregando...</h1> : (
        <main id="profile-page">
            <h2 className="page-title">Selecione um dos módulos abaixo </h2>
            <div className="card-list">
                {modules.map((mod, index) => {
                    if (user?.role === 'COMPANY' || user?.role === 'ADMIN') {
                        return (
                            <Card key={index} title={mod.title} description={mod.description} href={`/treinamentos/${mod.id}`} icon={faAward} action={validateTrainnningModule} checked={mod.validated} inputActionValue={mod.id} additionalLabel='?Válido' />
                        );
                    } else if (user?.role === 'PERSON' || user?.role === 'ADMIN') {
                        return <Card key={index} additionalLabel='Válido' />;
                    }
                })}
            </div>
        </main>
    );
}
