import { Button, Dropzone } from "@Components";
import DateFnsUtils from "@date-io/date-fns";
import { faChevronDown, faCopy, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion, AccordionDetails,
  AccordionSummary, Chip, Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Switch, TextField
} from "@material-ui/core";
import { KeyboardDatePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createReport } from "@Services";
import { fileUtils } from '@Utils';
import React, { useRef, useState } from "react";
import { maskUtils } from "../../utils/mask-utils";
import "./style.scss";
import {Toast} from "../../components";

function formatDate(date) {
  return Intl.DateTimeFormat("pt-br", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

const categories = [
  "Assédio moral",
  "Assédio sexual",
  "Comportamento disruptivo",
  "Corrupção / Suborno",
  "Destruição ou dano aos ativos",
  "Exercício ilegal da profissão",
  "Favorecimento ou conflito de interesse",
  "Fraude",
  "Fraude em pesquisa",
  "Pagamento ou recebimento impróprio",
  "Procedimento assistencial ou clínico antiético",
  "Procedimento operacional ou administrativo incorreto",
  "Relacionamento íntimo com subordinação direta",
  "Roubo ou furto",
  "Uso ou tráfico de substâncias proíbidas",
  "Vazamento ou uso indevido de informações",
  "Violação de leis anticorrupção",
  "Violação de leis ambientais",
  "Violação de leis trabalhistas",
];

const IdentificationInputs = ({ nameRef, cpfRef, phoneRef, emailRef }) => {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <FormControl className="form-item" style={{ marginTop: 0 }}>
        <InputLabel className="label">Nome</InputLabel>
        <Input inputRef={nameRef} />
      </FormControl>
      <FormControl className="form-item half">
        <InputLabel className="label">CPF</InputLabel>
        <Input
          inputRef={cpfRef}
          value={maskUtils.cpfMask(cpf)}
          onChange={(e) => setCpf(e.target.value)}
        />
      </FormControl>
      <FormControl className="form-item half">
        <InputLabel className="label">Celular</InputLabel>
        <Input
          inputRef={phoneRef}
          value={maskUtils.phoneMask(phone)}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      <FormControl className="form-item ">
        <InputLabel className="label">E-mail</InputLabel>
        <Input type="email" inputRef={emailRef} />
      </FormControl>
    </>
  );
};

export function ReportPage() {
  const [isIdentified, setIsIdentified] = useState(false);
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState(false);
  const [isManagerKnowledge, setIsManagerKnowledge] = useState(false);
  const [newDate, setNewDate] = useState(Date());
  const [dates, setDates] = useState([]);
  const envolvedRef = useRef(null);
  const suspectRef = useRef(null);
  const witnessRef = useRef(null);
  const descriptionRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [envolvedPeople, setEnvolvedPeople] = useState([]);
  const [suspects, setSuspects] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const periodRef = useRef(null);
  const localRef = useRef(null);
  const nameRef = useRef(null);
  const cpfRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const companyNameRef = useRef(null);
  const trackingIdRef = useRef(null);

  const handleCopy = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(trackingId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const addToList = (ref, list, updateFn) => {
    const { value } = ref.current;
    value && updateFn([...list, value]);
  };

  const removeFromList = (value, list, updateFn) => {
    updateFn(list.filter((name) => value !== name));
  };

  function onUpload(file) {
    attachments.push(file);
    setAttachments([...attachments]);
  }

  function removeAttachment(index) {
    attachments.splice(index, 1);
    setAttachments([...attachments]);
  }

  async function getAttachments() {
    return (await Promise.all(attachments.map(async file => {
      return {
        name: file.name,
        base64Adress: await fileUtils.toBase64(file),
        mimeType: file.type
      }
    })));
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const payload = {
        category,
        urgency,
        dates,
        description: descriptionRef.current.value,
        attachments: await getAttachments(),
        isManagerKnowledge,
        companyName: companyNameRef.current.value,
        local: localRef.current.value,
        reportDetails: {
          period: periodRef.current.value,
          envolvedPeople,
          suspects,
          witnesses,
        },
        user: isIdentified
          ? {
            name: nameRef.current.value,
            cpf: cpfRef.current.value.replace(/\D/g, ""),
            phone: phoneRef.current.value.replace(/\D/g, ""),
            email: emailRef.current.value,
          }
          : undefined,
      };
      const { data: response } = await createReport(payload);
      setTrackingId(response.trackingId);
    } catch (error) {
      console.error(error);
      console.log(error.response);
    }
  }

  return (
    <div id="report-page">
      <main className="content">
        {trackingId ? (
          <>
            <h3 className="title">Denúncia criada com sucesso</h3>
            <p className="success-text">
              Segue abaixo o número para verificar o andamento da denúncia,
              guarde-o para consultas futuras
            </p>
            <div className="tracking-field-wrapper">
              <input
                className="tracking-field"
                ref={trackingIdRef}
                value={trackingId}
                disabled
              />
              <button
                className="copy-button"
                onClick={handleCopy}
                type="button"
              >
                {isCopied ? "Copiado" : "Copiar"}
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <p className="success-text">
              Para consulta, acesse: www.qualitacompliance.com/denuncia/numero-da-denuncia
            </p>
          </>
        ) : (
          <>
            <h3 className="title">Nova denúncia</h3>
            <section className="form-section">
              <form className="report-form" onSubmit={submit}>
                <FormControl className="form-item half">
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    required
                    value={category}
                    onChange={({ target }) => setCategory(target.value)}
                  >
                    {categories.map((category, index) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="form-item half">
                  <InputLabel className="label">Urgente</InputLabel>
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
                <FormControl className="form-item">
                  <TextField label="Local" inputRef={localRef} />
                </FormControl>
                <FormControl className="form-item">
                  <TextField
                    label="Empresa denunciada"
                    inputRef={companyNameRef}
                  />
                </FormControl>
                <FormControl className="form-item half">
                  <InputLabel className="label">
                    É de conhecimento do gestor
                  </InputLabel>
                  <Select
                    value={isManagerKnowledge}
                    onChange={({ target }) =>
                      setIsManagerKnowledge(target.value)
                    }
                  >
                    <MenuItem className="select-option" value={true}>
                      Sim
                    </MenuItem>
                    <MenuItem value={false}>Não</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className="form-item date-picker half inline">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      InputLabelProps={{ className: "label" }}
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Data da ocorrência"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      value={newDate || undefined}
                      onChange={(date) => setNewDate(date)}
                    />
                  </MuiPickersUtilsProvider>
                  <IconButton
                    onClick={() => {
                      setDates([...dates, newDate]);
                      setNewDate(Date());
                    }}
                  >
                    <FontAwesomeIcon size="sm" icon={faPlus} />
                  </IconButton>
                </FormControl>
                {dates.length ? (
                  <div style={{ width: "100%" }}>
                    {dates.map((date, index) => (
                      <>
                        <Chip
                          className="email-chip"
                          clickable
                          label={formatDate(new Date(date))}
                          key={date}
                          onDelete={() => removeFromList(date, dates, setDates)}
                        />
                      </>
                    ))}
                  </div>
                ) : null}
                <FormControl className="form-item">
                  <TextField
                    label="Descrição do ocorrido"
                    multiline
                    inputRef={descriptionRef}
                    rowsMax="6"
                  />
                </FormControl>
                <div className="attachments-area">
                  <Dropzone
                    className="attachment-dropzone"
                    onUpload={onUpload}
                  />
                  <div className="attachment-list-wrapper">
                    <h5 className="title">
                      {attachments.length
                        ? "Anexos adicionados:"
                        : "Sem anexos"}
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
                </div>

                <Accordion className="accordion">
                  <AccordionSummary
                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                  >
                    <p className="accordion-summary-header">Detalhes</p>
                    <p className="accordion-summary-secondaryHeader">
                      Clique aqui para informar detalhes sobre a denúncia
                    </p>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-details">
                    <FormControl className="form-item">
                      <TextField
                        label="Período"
                        fullWidth
                        inputRef={periodRef}
                      />
                    </FormControl>
                    <FormControl className="form-item inline">
                      <TextField
                        label="Pessoas/Empresas envolvidas"
                        inputRef={envolvedRef}
                        style={{ flex: 1 }}
                      />
                      <IconButton
                        onClick={() =>
                          addToList(
                            envolvedRef,
                            envolvedPeople,
                            setEnvolvedPeople
                          )
                        }
                      >
                        <FontAwesomeIcon size="sm" icon={faPlus} />
                      </IconButton>
                    </FormControl>
                    {envolvedPeople.length ? (
                      <div style={{ width: "100%" }}>
                        {envolvedPeople.map((name, index) => (
                          <>
                            <Chip
                              className="email-chip"
                              clickable
                              label={name}
                              key={name}
                              onDelete={() =>
                                removeFromList(
                                  name,
                                  envolvedPeople,
                                  setEnvolvedPeople
                                )
                              }
                            />
                          </>
                        ))}
                      </div>
                    ) : null}
                    <FormControl className="form-item inline">
                      <TextField
                        label="Suspeitos envolvidos"
                        inputRef={suspectRef}
                        style={{ flex: 1 }}
                      />
                      <IconButton
                        onClick={() =>
                          addToList(suspectRef, suspects, setSuspects)
                        }
                      >
                        <FontAwesomeIcon size="sm" icon={faPlus} />
                      </IconButton>
                    </FormControl>
                    {suspects.length ? (
                      <div style={{ width: "100%" }}>
                        {suspects.map((name, index) => (
                          <>
                            <Chip
                              className="email-chip"
                              clickable
                              label={name}
                              key={name}
                              onDelete={() =>
                                removeFromList(name, suspects, setSuspects)
                              }
                            />
                          </>
                        ))}
                      </div>
                    ) : null}
                    <FormControl className="form-item inline">
                      <TextField
                        label="Testemunhas envolvidas"
                        inputRef={witnessRef}
                        style={{ flex: 1 }}
                      />
                      <IconButton
                        onClick={() =>
                          addToList(witnessRef, witnesses, setWitnesses)
                        }
                      >
                        <FontAwesomeIcon size="sm" icon={faPlus} />
                      </IconButton>
                    </FormControl>
                    {witnesses.length ? (
                      <div style={{ width: "100%" }}>
                        {witnesses.map((name, index) => (
                          <>
                            <Chip
                              className="email-chip"
                              clickable
                              label={name}
                              key={name}
                              onDelete={() =>
                                removeFromList(name, witnesses, setWitnesses)
                              }
                            />
                          </>
                        ))}
                      </div>
                    ) : null}
                  </AccordionDetails>
                </Accordion>

                <div className="switch-wrapper form-item">
                  <label
                    className={
                      isIdentified ? "switch-label" : "switch-label -active"
                    }
                  >
                    Anônimo
                  </label>
                  <Switch
                    color="primary"
                    checked={isIdentified}
                    onChange={() => setIsIdentified(!isIdentified)}
                  />
                  <label
                    className={
                      isIdentified ? "switch-label -active" : "switch-label"
                    }
                  >
                    Com identificação
                  </label>
                </div>
                {isIdentified && (
                  <IdentificationInputs
                    nameRef={nameRef}
                    phoneRef={phoneRef}
                    cpfRef={cpfRef}
                    emailRef={emailRef}
                  />
                )}
                <Button
                  className="report-submit-button"
                  style={{ margin: "16px 10px", fontWeight: 500 }}
                >
                  Enviar
                </Button>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
