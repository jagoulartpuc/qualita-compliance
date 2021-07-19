import React from 'react'

import './style.scss'

export function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer id="footer-component">
            <p className="footer-text">© {year} Qualitá  Compliance. Cnpj 19.765.660/0001-91. Todos os diretos reservados</p>
        </footer>
    )
}