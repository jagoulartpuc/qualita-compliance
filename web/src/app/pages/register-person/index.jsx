import { Button } from "@Components";

import {
   FormControl , Input, InputLabel,  Switch,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import {createPerson} from '../../../services/index'


export function RegisterPerson() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [schooling, setSchooling] = useState("");
  const [profession, setProfession] = useState("");
  const [occupation, setOccupation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [companyCnpj, setCompanyCnpj] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  async function submit(e) {
    e.preventDefault();
    try {
      let data = {
        name: name,
        cpf: cpf,
        phone: phone,
        email: email,
        schooling: schooling,
        profession: profession,
        occupation: occupation,
        birthday: birthday,
        companyCnpj: companyCnpj,
        isAdmin: isAdmin
      }
      await createPerson(data);

    } catch (error) {
    }
  }

  return (
    <div id="report-page">
      <main className="content">
        <h3 className="title">Registrar Pessoas</h3>
        <section className="form-section">
          <form className="report-form" onSubmit={submit}>
            <FormControl className="form-item" style={{ marginTop: 0 }}>
              <InputLabel className="label">Nome</InputLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">CPF</InputLabel>
              <Input
                value={maskUtils.cpfMask(cpf)}
                onChange={(e) => setCpf(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Celular</InputLabel>
              <Input
                value={maskUtils.phoneMask(phone)}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item ">
              <InputLabel className="label">E-mail</InputLabel>
              <Input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Escolaridade</InputLabel>
              <Input
                value={schooling}
                onChange={(e) => setSchooling(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Profissão</InputLabel>
              <Input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item">
              <InputLabel className="label">Ocupação</InputLabel>
              <Input
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Data de Nascimento</InputLabel>
              <Input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item">
              <InputLabel className="label">CNPJ da Empresa</InputLabel>
              <Input
                value={maskUtils.cnpjMask(companyCnpj)}
                onChange={(e) => setCompanyCnpj(e.target.value)}
              />
            </FormControl>
            <div className="switch-wrapper form-item">
              <label
                className={
                  isAdmin ? "switch-label" : "switch-label -active"
                }
              >
                Usuário
              </label>
              <Switch
                color="primary"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label
                className={
                  isAdmin ? "switch-label -active" : "switch-label"
                }
              >
                Admin
              </label>
            </div>
            <Button
              type='submit'
              className="report-submit-button"
              style={{ margin: "16px 10px", fontWeight: 500 }}
            >
              Enviar
            </Button>
          </form>
        </section>
      </main>
    </div >
  );
}
