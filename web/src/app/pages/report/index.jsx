import React from 'react'
import { Footer, Header, Dropzone } from '@Components'

import './style.scss'
import { Switch, Select, MenuItem, FormControl, InputLabel, Divider } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns';
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export function ReportPage() {

    const [isAnonymus, setIsAnonymus] = useState(true)
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState(false)
    const [date, setDate] = useState(Date())
    const [attachments, setAttachments] = useState([])

    function NewReportForm() {
        return (
            <form className="report-form" action="">
                <FormControl className="form-item" >
                    <InputLabel>Categoria</InputLabel>
                    <Select required value={category} onChange={({ target }) => setCategory(target.value)}>
                        <MenuItem value={1}>
                            Categoria 1
                    </MenuItem>
                        <MenuItem value={2}>
                            Categoria 2
                    </MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="form-item" >
                    <InputLabel className="label">Urgência</InputLabel>
                    <Select value={urgency} onChange={({ target }) => setUrgency(target.value)}>
                        <MenuItem className="select-option" value={true}>
                            Sim
                    </MenuItem>
                        <MenuItem value={false}>
                            Não
                    </MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="form-item date-picker" >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            InputLabelProps={{ className: 'label' }}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Data da ocorrência"
                            value={date}
                            onChange={(value) => setDate(value)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
            </form>
        )
    }

    function onUpload(file) {
        attachments.push(file)
        setAttachments([...attachments])
    }

    function removeAttachment(index) {
        attachments.splice(index, 1)
        setAttachments([...attachments])
    }

    function AttachmentList() {
        return (
            <div className="attachment-list-wrapper">
                <h5 className="title">{attachments.length ? 'Anexos adicionados:' : 'Sem anexos'}</h5>
                <ul className="attachment-list">
                    {attachments.length && attachments.map((att, index) => {
                        return (
                            <li key={index} className="list-item">
                                <div className="attachment-name">
                                    <p>{att.name}</p>
                                    <FontAwesomeIcon className="remove-attachment-icon" onClick={() => removeAttachment(index)} icon={faTrash} />
                                </div>
                                {/* <LinearProgress className="progress" variant="determinate" value={100} /> */}
                                <Divider className="divider"/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )

    }

    return (
        <div id="report-page">
            <Header />
            <main className="content">
                <h3 className="title">Nova denúncia</h3>
                <div className="switch-wrapper">
                    <label className={isAnonymus ? "switch-label" : "switch-label -active"}>Com identificação</label>
                    <Switch color="primary" checked={isAnonymus} onChange={() => setIsAnonymus(!isAnonymus)} />
                    <label className={isAnonymus ? "switch-label -active" : "switch-label"}>Anônimo</label>
                </div>
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
    )
}