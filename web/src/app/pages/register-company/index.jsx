import { Button, Dropzone } from "@Components";
import {
 FormControl, Input, InputLabel
} from "@material-ui/core";

import React, { useState } from "react";
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import { createCompany } from '../../../services/index'


export function RegisterCompany() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [business, setBusiness] = useState("");
  const [site, setSite] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      let data = {
        name: name,
        cnpj: cnpj,
        phone: phone,
        email: email,
        adress: adress,
        site: site,
        owner: owner,
        business: business,
      }

      await createCompany(data);

    } catch (error) {}
  }

  return (
    <div id="report-page">
      <main className="content">
        <h3 className="title">Registrar Empresas</h3>
        <section className="form-section">
          <form className="report-form" onSubmit={submit}>
            <FormControl className="form-item" style={{ marginTop: 0 }}>
              <InputLabel className="label">Nome</InputLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">CNPJ</InputLabel>
              <Input
                value={maskUtils.cnpjMask(cnpj)}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Telefone</InputLabel>
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
              <InputLabel className="label">Endereço</InputLabel>
              <Input
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Dono</InputLabel>
              <Input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item">
              <InputLabel className="label">Ramo da Empresa</InputLabel>
              <Input
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
            </FormControl>
            <FormControl className="form-item half">
              <InputLabel className="label">Site</InputLabel>
              <Input
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </FormControl>
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
