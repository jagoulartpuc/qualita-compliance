import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropzone, CustomDialog } from "@Components";
import {Divider, FormControl, Input, InputLabel, TextField} from "@material-ui/core";
import { maskUtils } from "../../utils";
import { DialogReportType } from "../../constants/DialogReportType";

export default function DialogReport(props) {
    const {
        titleDialog,
        buttonTitleDialog,
        modalOpen,
        setModalOpen,
        onClickFunctionDialog,
        handleClose,
        attachments,
        onUpload,
        removeAttachment,
        cnpj,
        setCnpj,
        setMessage,
        dialogReportType
    } = props;

    return (
        <CustomDialog title={titleDialog}
                      open={modalOpen}
                      setOpen={setModalOpen}
                      titleButton={buttonTitleDialog}
                      onClick={onClickFunctionDialog}
                      handleClose={handleClose}
        >
            <FormControl id="form-item_input">
                {
                    !!dialogReportType &&
                    dialogReportType === DialogReportType.FORWARD_REPORT && (
                        <React.Fragment>
                            <InputLabel>CNPJ</InputLabel>
                            <Input
                                value={maskUtils.cnpjMask(cnpj)}
                                onBlur={()=>console.log(cnpj)}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                        </React.Fragment>
                    ) || dialogReportType === DialogReportType.ANSWER_INFORMER && (
                        <React.Fragment>
                            <TextField
                                id="outlined-multiline-static"
                                label="Mensagem"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </React.Fragment>
                    )
                }
            </FormControl>
            <div id="report-details-admin-attachments-area">
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
                        {attachments.length > 0 &&
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
        </CustomDialog>
    );
}
