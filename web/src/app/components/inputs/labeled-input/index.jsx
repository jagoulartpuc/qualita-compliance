import React from 'react'
import './style.scss'

export function LabeledInput(props) {
    const inputProps = { ...props }
    delete inputProps.label
    delete inputProps.className

    return (
        <div id="basic-input-component" className={props.className}>
            <label className="input-label">{props.label}</label>
            <input {...inputProps} />
        </div>
    )
}