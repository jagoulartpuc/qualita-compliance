import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_USER_IDENTIFICATION } from "@Context/session.context";
import { Button, Toast } from "@Components";
import './style.scss';
import { Input, InputLabel } from "@material-ui/core";
import { routes } from "../../routes";
import { changePasswordPerson, changePasswordCompany } from "../../../services/admin.service";

export function ChangePasswordPage() {
    const getLoggedUserFromStorage = () => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_IDENTIFICATION));
    }

    const user = getLoggedUserFromStorage();
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function submit(e) {
        e.preventDefault();
        try {
            if(user.role === 'COMPANY') {
                await changePasswordCompany(user.identifier, password);
            } else {
                await changePasswordPerson(user.identifier, password);
            }
            Toast({icon: 'success', title: "Senha atualizada com sucesso!", didClose: () => history.push(routes.HOME_PAGE)});
        } catch (error) {
            Toast({icon: 'error', title: error, didClose: () => ""});
        }
    }

    return (
        <div id="control-panel-page">
            <main className="content">
                <h3 className="title">Trocar senha</h3>
                <section className="form-section">
                    <form className="password-form" onSubmit={submit}>
                    <div className="div">
                        <InputLabel className="label">Nova Senha</InputLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button
                        type='submit'
                        className="report-submit-button"
                        style={{ margin: "16px 10px", fontWeight: 500 }}
                    >
                        Confirmar
                    </Button>
                    </form>
                </section>
            </main>
        </div >
    );
}
