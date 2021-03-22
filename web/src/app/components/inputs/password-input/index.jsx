import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

export function PasswordInput(props) {
    const inputProps = { ...props }
    delete inputProps.label
    delete inputProps.className
    delete inputProps.type

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div id="password-input-component" {...props}>
            <label className="input-label">{props.label}</label>
            <div className="input-wrapper">
                <input type={showPassword ? 'text' : 'password'} {...inputProps} />
                <FontAwesomeIcon
                    className="password-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? faEyeSlash : faEye} />
            </div>
        </div>
    )
}