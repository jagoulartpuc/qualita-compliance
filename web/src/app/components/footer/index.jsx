import React from 'react'

import './style.scss'

export function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer id="footer-component">
            <p className="footer-text">© {year} Qualitá  Compliance. Cnpj 53.725.188/0001-00. Todos os diretos reservados</p>
        </footer>
    )
}