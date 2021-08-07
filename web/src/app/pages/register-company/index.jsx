import { Button, Toast } from "@Components";
import { Chip, FormControl, IconButton, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import { createCompany, readCompanyByCnpj, updateCompany } from '../../../services/index'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {routes} from "../../routes";
import { useHistory } from "react-router-dom";


export function RegisterCompany() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [adress, setAdress] = useState("");
  const [phones, setPhones] = useState([]);
  const [phone, setNewPhone] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");
  const [site, setSite] = useState("");
  const [persons, setPersons] = useState("");
  const [reports, setReports] = useState("");
  const [features, setFeatures] = useState("");
  const [isNew, setIsNew] = useState(true)
  const history = useHistory();

  const removeFromList = (value, list, updateFn) => {
    updateFn(list.filter((name) => value !== name));
  };

  async function submit(e) {
    e.preventDefault();
    try {
      let data = {
        name: name,
        cnpj: cnpj,
        phones: phones,
        email: email,
        adress: adress,
        site: site,
        owner: owner,
        business: business,
        password: password,
        persons: persons,
        reports: reports,
        features: features
      }
      var message = "";
      if (!!isNew) {
        await createCompany(data);
        message = "Empresa registrada com sucesso!";
      } else {
        await updateCompany(data);
        message = "Empresa atualizada com sucesso!";
      }
      Toast({icon: 'success', title: message, didClose: () => history.push(routes.CONSULT_COMPANY)});
    } catch (error) {
      Toast({icon: 'error', title: error, didClose: () => ""});
    }
  }

  useEffect(async () => {
    var arr = (window.location.pathname).split("/");
    var val = (arr[arr.length - 1]);
    console.log(arr.length)
    if (arr.length === 3) {
      await readCompanyByCnpj(val).then((data) => {
        console.log(data.data)
        setName(data.data.name)
        setCnpj(data.data.cnpj)
        setAdress(data.data.adress);
        setPhones(data.data.phones);
        setEmail(data.data.email);
        setOwner(data.data.owner);
        setBusiness(data.data.business);
        setSite(data.data.site);
        setPassword(data.data.password)
        setPersons(data.data.persons)
        setReports(data.data.reports)
        setFeatures(data.data.features)
        setIsNew(false);
      })
    } else {
      setIsNew(true);
    }

  }, [])

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
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setPhones([...phones, phone]);
                  setNewPhone('');
                }}
              >
                <FontAwesomeIcon size="sm" icon={faPlus} />
              </IconButton>
            </FormControl>
            {phones.length ? (
              <div style={{ width: "100%" }}>
                {phones.map((phone, index) => (
                  <>
                    <Chip
                      className="email-chip"
                      clickable
                      label={phone}
                      key={index}
                      onDelete={() => removeFromList(phone, phones, setPhones)}
                    />
                  </>
                ))}
              </div>
            ) : null}
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
