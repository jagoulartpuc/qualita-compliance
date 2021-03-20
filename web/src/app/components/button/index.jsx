import React from 'react'

import './style.scss'

export function Button({ children, onClick, className, disabled }) {

    return (
        <button disabled={disabled} className={className} onClick={onClick} id="button-component">
            {children}
        </button>
    )
}