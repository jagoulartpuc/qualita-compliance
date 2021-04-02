import React from "react";
import { Footer, Header, Dropzone, Button } from "@Components";

import "./style.scss";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Divider,
  TextField,
  IconButton,
  Chip,
  Switch,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { useState, useRef } from "react";
import { maskUtils } from "../../utils/mask-utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const IdentificationInputs = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(Date());
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <FormControl className="form-item" style={{ marginTop: 0 }}>
        <InputLabel className="label">Nome</InputLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl className="form-item date-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            InputLabelProps={{ className: "label" }}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Data de nascimento"
            value={birthdate}
            onChange={(value) => setBirthdate(value)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
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
    </>
  );
};

export function ReportPage() {
  const [isIdentified, setIsIdentified] = useState(false);
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState(false);
  const [date, setDate] = useState(Date());
  const descriptionRef = useRef(null);
  const recipentEmailRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [recipentsEmails, setRecipientsEmails] = useState([]);

  const addRecipient = () => {
    const { value } = recipentEmailRef.current;
    value && setRecipientsEmails([...recipentsEmails, value]);
  };

  const removeRecipient = (value) => {
    console.log(recipentsEmails.filter((email) => value !== email));
    setRecipientsEmails(recipentsEmails.filter((email) => value !== email));
  };

  function NewReportForm() {
    return (
      <form className="report-form" action="">
        <FormControl className="form-item half">
          <InputLabel>Categoria</InputLabel>
          <Select
            required
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          >
            <MenuItem value={1}>Categoria 1</MenuItem>
            <MenuItem value={2}>Categoria 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-item half">
          <InputLabel className="label">Urgência</InputLabel>
          <Select
            value={urgency}
            onChange={({ target }) => setUrgency(target.value)}
          >
            <MenuItem className="select-option" value={true}>
              Sim
            </MenuItem>
            <MenuItem value={false}>Não</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-item date-picker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              InputLabelProps={{ className: "label" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data da ocorrência"
              value={date}
              onChange={(value) => setDate(value)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl className="form-item">
          <TextField
            label="Descrição do ocorrido"
            multiline
            inputRef={descriptionRef}
            rowsMax="6"
          />
        </FormControl>
        <FormControl className="form-item inline">
          <TextField
            label="E-mail do denunciado"
            inputRef={recipentEmailRef}
            type="email"
            style={{ flex: 1 }}
          />
          <IconButton onClick={addRecipient}>
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </FormControl>
        {recipentsEmails.length ? (
          <div>
            {recipentsEmails.map((email, index) => (
              <>
                <Chip
                  className="email-chip"
                  clickable
                  label={email}
                  key={email}
                  onDelete={() => removeRecipient(email)}
                />
              </>
            ))}
          </div>
        ) : null}
        <div className="switch-wrapper form-item">
          <label
            className={isIdentified ? "switch-label" : "switch-label -active"}
          >
            Anônimo
          </label>
          <Switch
            color="primary"
            checked={isIdentified}
            onChange={() => setIsIdentified(!isIdentified)}
          />
          <label
            className={isIdentified ? "switch-label -active" : "switch-label"}
          >
            Com identificação
          </label>
        </div>
        {isIdentified && <IdentificationInputs />}
        <Button
          className="report-submit-button"
          style={{ margin: "16px 10px", fontWeight: 500 }}
        >
          Cadastrar
        </Button>
      </form>
    );
  }

  function onUpload(file) {
    attachments.push(file);
    setAttachments([...attachments]);
  }

  function removeAttachment(index) {
    attachments.splice(index, 1);
    setAttachments([...attachments]);
  }

  function AttachmentList() {
    return (
      <div className="attachment-list-wrapper">
        <h5 className="title">
          {attachments.length ? "Anexos adicionados:" : "Sem anexos"}
        </h5>
        <ul className="attachment-list">
          {attachments.length &&
            attachments.map((att, index) => {
              return (
                <li key={index} className="list-item">
                  <div className="attachment-name">
                    <p>{att.name}</p>
                    <FontAwesomeIcon
                      className="remove-attachment-icon"
                      onClick={() => removeAttachment(index)}
                      icon={faTrash}
                    />
                  </div>
                  {/* <LinearProgress className="progress" variant="determinate" value={100} /> */}
                  <Divider className="divider" />
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  return (
    <div id="report-page">
      <Header />
      <main className="content">
        <h3 className="title">Nova denúncia</h3>
        <section className="form-section">
          <NewReportForm />
          <div className="attachments-area">
            <Dropzone className="attachment-dropzone" onUpload={onUpload} />
            <AttachmentList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
