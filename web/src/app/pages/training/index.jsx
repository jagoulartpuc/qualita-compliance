import { Card } from "@Components";
import { LOCAL_STORAGE_USER_IDENTIFICATION } from "@Context/session.context";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateModule } from '@Services/company.service';
import { getAllTrainnings } from '@Services/trainning.service';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import ConfirmationImage from '@Images/confirmation.jpeg';

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
        console.log(event.target);
        const moduleId = event.target.id;

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

    const actionElement = (module) => {
        return user?.role === 'COMPANY' && !module.validated ? (
            <span onClick={validateTrainnningModule} className='validate-module'>
                <strong id={module.id} >Validar Módulo</strong>
            </span>
        ) : (
           null
        );
    };

    return loading ? <h1>Carregando...</h1> : (
        <main id="profile-page">
            <h2 className="page-title">Selecione um dos módulos abaixo </h2>
            <div className="card-list">
                {modules.map((mod, index) => {
                    let actionHtmlElement = <img src={ConfirmationImage} className='confirmated-module' />;
                    let icons;

                    if (mod.validated) {
                        icons = (
                            <div className='card-icons'>
                                <FontAwesomeIcon className="card-icon" icon={faAward} size="2x" />
                                <br />
                                <img src={ConfirmationImage} className='confirmated-module' />
                            </div>
                        );
                    } else {
                        icons = <FontAwesomeIcon className="card-icon" icon={faAward} size="2x" />;
                    }

                    if (user?.role === 'COMPANY' || user?.role === 'ADMIN') {
                        actionHtmlElement = actionElement(mod);
                    }

                    return <Card key={index} title={mod.title} description={mod.description} href={`/treinamentos/${mod.id}`} icons={icons} actionElement={actionHtmlElement} />

                })}
            </div>
        </main>
    );
}
