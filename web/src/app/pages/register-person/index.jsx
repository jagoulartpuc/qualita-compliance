import { Button } from "@Components";
import { FormControl, Input, InputLabel, Switch } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import { routes } from "../../routes";
import { createPerson, readPersonByCpf, updatePerson } from '../../../services/index'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

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
  const [isNew, setIsNew] = useState(true)
  const history = useHistory();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },                                                                                                                                                             
    didClose: () => {
      history.push(routes.CONSULT_PERSON);
    }
  });

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
      var message = "";
      if (!!isNew) {
        await createPerson(data);
        message = "Funcionário registrado com sucesso!";
      } else {
        await updatePerson(data);
        message = 'Funcionário atualizado com sucesso!';
      }
      Toast.fire({
        icon: 'success',
        title: message
      });
    } catch (error) {
    }
  }

  useEffect(async () => {
    var arr = (window.location.pathname).split("/");
    var val = (arr[arr.length - 1]);
    console.log(arr.length)
    if (arr.length === 3) {
      await readPersonByCpf(val).then((data) => {
        console.log(data)
        setName(data.data.name)
        setCpf(data.data.cpf)
        setSchooling(data.data.schooling);
        setPhone(data.data.phone);
        setEmail(data.data.email);
        setProfession(data.data.profession);
        setOccupation(data.data.occupation);
        setBirthday(data.data.birthday);
        setCompanyCnpj(data.data.companyCnpj);
        setIsAdmin(data.data.isAdmin);
        setIsNew(false);
      })
    } else {
      setIsNew(true);
    }

  }, [])

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
                value={!!phone ? maskUtils.phoneMask(phone) : ""}
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
