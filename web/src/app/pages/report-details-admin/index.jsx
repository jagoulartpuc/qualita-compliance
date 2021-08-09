import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import { getReport, shareReport, answerCompanyReport, answerInformerReport } from "@Services";
import "./style.scss";
import GenericImage from '@Images/generic-image.jpeg';
import GenericPdfImage from '@Images/generic-pdf.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Toast } from "@Components";
import { fileUtils } from "../../utils";
import { routes } from "../../routes";
import { LOCAL_STORAGE_USER_IDENTIFICATION } from "../../../context";
import {DialogReportType} from "../../constants/DialogReportType";
import DialogReport from "./DialogReport";

function formatDates(dates) {
    return dates.reduce((acc, current) => {
        return [...acc, Intl.DateTimeFormat("pt-br").format(new Date(current))];
    }, []);
}

function ReportItem({ label, value }) {
    return (
        <p className="report-details-item">
            <strong>{label}: </strong>
            {value}
        </p>
    );
}

export default function ReportDetailsAdminPage({ match }) {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [cnpj, setCnpj] = useState("");
    const [message, setMessage] = useState("");
    const [dialogReportType, setDialogReportType] = useState(null);

    const { id } = match.params;
    const history = useHistory();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const { data: reportResponse } = await getReport(id);
                setReport(reportResponse);
                setLoading(false);
            } catch (error) {
                history.replace("/");
            }
        };
        fetchReport();
    }, []);

    const getAttachments = () => {
        return report?.attachments.map(attach => {
            const contentForDownload = `data:${attach.mimeType};base64,${attach.base64Adress}`;
            return (
                <div className='attachment'>
                    <span>{attach.name}</span>
                    <br />
                    <a download={attach.name} href={contentForDownload}>
                        <img className='attachment-icon' src={attach.mimeType === 'application/pdf' ? GenericPdfImage : GenericImage} />
                    </a>
                </div>
            );
        });
    }

    const getLoggedUserFromStorage = () => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_IDENTIFICATION));
    }

    const goBack = () => {
        const route = getLoggedUserFromStorage()?.role === 'ADMIN' ?
            routes.CONSULT_REPORTS : routes.COMPANY_REPORTS_PAGE;
        history.replace(route);
    }

    const onUpload = (file) => {
        attachments.push(file);
        setAttachments([...attachments]);
    }

    const removeAttachment = (index) => {
        attachments.splice(index, 1);
        setAttachments([...attachments]);
    }

    const getAttachmentsToSend = async () => {
        return (await Promise.all(attachments.map(async file => {
            return {
                name: file.name,
                base64Adress: await fileUtils.toBase64(file),
                mimeType: file.type
            }
        })));
    }

    const answerCompany = async () => {
        try {
            const att = await getAttachmentsToSend();
            await answerCompanyReport(id, att);
            Toast({
                icon: 'success',
                title: "Denúncia respondida com sucesso!",
                didClose: () => history.push(routes.COMPANY_REPORTS_PAGE)
            });
        } catch (error) {
            Toast({icon: 'error', title: error, didClose: () => ""});
        }
        handleClose();
    }
    const answerInformer = async () => {
        console.log(message);
        try {
            const answer = {
                message,
                attachments: await getAttachmentsToSend()
            };
            await answerInformerReport(id, answer);
            Toast({
                icon: 'success',
                title: "Denúncia respondida com sucesso!",
                didClose: () => history.push(routes.CONSULT_REPORTS)
            });
        } catch (error) {
            Toast({icon: 'error', title: error, didClose: () => ""});
        }
        handleClose();
    }

    const forwardReport = async () => {
        console.log(cnpj);
        try {
            const att = await getAttachmentsToSend();
            await shareReport(cnpj, id, att);
            Toast({
                icon: 'success',
                title: "Denúncia encaminhada com sucesso!",
                didClose: () => history.push(routes.CONSULT_REPORTS)
            });
        } catch (error) {
            Toast({icon: 'error', title: error, didClose: () => ""});
        }
        handleClose();
    }

    const handleClose = () => {
        setModalOpen(false);
        setAttachments([]);
        setCnpj("");
        setMessage("");
    };

    const handleOpen = (type) => {
        setDialogReportType(type);
        setModalOpen(true);
    }

    return loading || !report ? (
        <h1>Carregando...</h1>
    ) : (
        <div className="report-details-admin-page">
            <section className='content'>
                <main>
                    <div className='goback'>
                        <a onClick={goBack}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span>Voltar</span>
                        </a>
                    </div>
                    <div className='report-details-admin-content'>
                        <section>
                            <ReportItem label="Nº de protocolo" value={report?.trackingId} />
                            <ReportItem label="Autor" value={report?.author} />
                            <ReportItem label="CPF" value={report?.cpf} />
                            <ReportItem label="E-mail" value={report?.email} />
                            <ReportItem label="Telefone" value={report?.phone} />
                            <ReportItem label="Empresa" value={report?.companyName} />
                            <ReportItem label="Local" value={report?.local} />
                            <ReportItem label="Categoria" value={report?.category} />
                            <ReportItem label="Datas" value={formatDates(report?.dates)} />
                            <ReportItem label="Urgente" value={report?.urgent} />
                            <ReportItem label="De conhecimento do gestor" value={report?.isManagerKnowledge} />
                            <ReportItem label="Descrição do ocorrido" value={report?.description} />
                            <ReportItem label="Pessoas envolvidas" value={report?.reportDetails.envolvedPeople} />
                            <ReportItem label="Período" value={report?.reportDetails.period} />
                            <ReportItem label="Suspeitos" value={report?.reportDetails.suspects} />
                            <ReportItem label="Testemunhas" value={report?.reportDetails.witnesses} />
                            <ReportItem label="Status" value={report?.status} />
                        </section>
                    </div>
                </main>
                <aside className="report-details-admin-material">
                    <h3><strong>Anexos da denúncia</strong></h3>
                    {getAttachments()}
                </aside>
            </section>
            <div className="group-button">
                {
                    getLoggedUserFromStorage()?.role === 'ADMIN' ? (
                        <React.Fragment>
                            <Button onClick={() => handleOpen(DialogReportType.FORWARD_REPORT)}>Encaminhar&nbsp;<FontAwesomeIcon icon={faArrowRight} /></Button>
                            <Button onClick={() => handleOpen(DialogReportType.ANSWER_INFORMER)}>Responder Informante&nbsp;<FontAwesomeIcon icon={faArrowRight} /></Button>
                        </React.Fragment>
                    ) : <Button onClick={() => handleOpen(DialogReportType.ANSWER_COMPANY)}>Responder&nbsp;<FontAwesomeIcon icon={faArrowRight} /></Button>
                }
            </div>
            {modalOpen &&
                !!dialogReportType &&
                dialogReportType === DialogReportType.FORWARD_REPORT && (
                    <DialogReport
                        titleDialog={"Encaminhar denúncia"}
                        buttonTitleDialog={"Encaminhar"}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        onClickFunctionDialog={forwardReport}
                        handleClose={handleClose}
                        attachments={attachments}
                        onUpload={onUpload}
                        removeAttachment={removeAttachment}
                        cnpj={cnpj}
                        setCnpj={setCnpj}
                        dialogReportType={dialogReportType}
                    />
            ) || dialogReportType === DialogReportType.ANSWER_INFORMER && (
                <DialogReport
                    titleDialog={"Responder Informante"}
                    buttonTitleDialog={"Responder"}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    onClickFunctionDialog={answerInformer}
                    handleClose={handleClose}
                    attachments={attachments}
                    onUpload={onUpload}
                    removeAttachment={removeAttachment}
                    setMessage={setMessage}
                    dialogReportType={dialogReportType}
                />
            ) || dialogReportType === DialogReportType.ANSWER_COMPANY && (
                <DialogReport
                    titleDialog={"Responder"}
                    buttonTitleDialog={"Responder"}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    onClickFunctionDialog={answerCompany}
                    handleClose={handleClose}
                    attachments={attachments}
                    onUpload={onUpload}
                    removeAttachment={removeAttachment}
                    dialogReportType={dialogReportType}
                />
            )
            // <CustomDialog title={titleDialog}
            //               open={modalOpen}
            //               setOpen={setModalOpen}
            //               titleButton={buttonTitleDialog}
            //               onClick={() => onClickFunctionDialog}
            //               handleClose={handleClose}
            // >
            //     <FormControl id="form-item_input">
            //         {
            //             !!dialogReportType &&
            //             dialogReportType === DialogReportType.FORWARD_REPORT && (
            //                 <React.Fragment>
            //                     <InputLabel>CNPJ</InputLabel>
            //                     <Input
            //                         value={maskUtils.cnpjMask(cnpj)}
            //                         onBlur={()=>console.log(cnpj)}
            //                         onChange={(e) => setCnpj(e.target.value)}
            //                     />
            //                 </React.Fragment>
            //             ) || dialogReportType === DialogReportType.ANSWER_INFORMER && (
            //                 <React.Fragment>
            //                     <TextField
            //                         id="outlined-multiline-static"
            //                         label="Mensagem"
            //                         multiline
            //                         rows={4}
            //                         variant="outlined"
            //                         onChange={(e) => setMessage(e.target.value)}
            //                     />
            //                 </React.Fragment>
            //             )
            //         }
            //     </FormControl>
            //     <div id="report-details-admin-attachments-area">
            //         <Dropzone
            //             className="attachment-dropzone"
            //             onUpload={onUpload}
            //         />
            //         <div className="attachment-list-wrapper">
            //             <h5 className="title">
            //                 {attachments.length
            //                     ? "Anexos adicionados:"
            //                     : "Sem anexos"}
            //             </h5>
            //             <ul className="attachment-list">
            //                 {attachments.length > 0 &&
            //                 attachments.map((att, index) => {
            //                     return (
            //                         <li key={index} className="list-item">
            //                             <div className="attachment-name">
            //                                 <p>{att.name}</p>
            //                                 <FontAwesomeIcon
            //                                     className="remove-attachment-icon"
            //                                     onClick={() => removeAttachment(index)}
            //                                     icon={faTrash}
            //                                 />
            //                             </div>
            //                             {/* <LinearProgress className="progress" variant="determinate" value={100} /> */}
            //                             <Divider className="divider" />
            //                         </li>
            //                     );
            //                 })}
            //             </ul>
            //         </div>
            //     </div>
            // </CustomDialog>
            }
        </div>
    );
}
