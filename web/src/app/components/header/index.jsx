import React from 'react'
import Logo from '@Icons/logo.png'

import './style.scss'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'

export function Header() {

    return (
        <header id="header-component">
            <Link to={routes.HOME_PAGE} className="logo-name">
                <img className="logo" src={Logo} alt="Qualitá Compliance Logo" />
                {/* <h3 className="name">
                    Qualitá <br />
                    <span className="compliance-name">Compliance</span>
                </h3> */}
            </Link>
        </header>
    )
}