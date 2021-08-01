import { Button, Dropzone } from "@Components";
import DateFnsUtils from "@date-io/date-fns";
import {
  faChevronDown, faCopy, faPlus, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion, AccordionDetails,
  AccordionSummary, Chip, Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Switch, TextField
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { createReport } from "@Services";
import { fileUtils } from '@Utils';
import React, { useRef, useState } from "react";
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import { registerCompany } from '../../../services/index'


export function RegisterPerson() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [schooling, setSchooling] = useState("");
  const [profession, setProfession] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
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
        password: password,
        birthday: birthday,
        companyCnpj: companyCnpj,
        isAdmin: isAdmin
      }
      registerCompany(data);

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
              <InputLabel className="label">Senha</InputLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Aniversário</InputLabel>
              <Input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item">
              <InputLabel className="label">CNPJ EMPRESA</InputLabel>
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
