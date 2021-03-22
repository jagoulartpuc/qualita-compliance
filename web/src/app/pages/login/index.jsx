import React, { useState } from 'react'
import { Footer, Header, LabeledInput, Button, PasswordInput } from '@Components'
import { maskUtils } from '@Utils'

import './style.scss'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'

export function LoginPage() {

    const [cpf, setCpf] = useState("")
    const [maskedCpf, setMaskedCpf] = useState("")
    const [password, setPassword] = useState("")

    function onSubmit(event) {
        event.preventDefault()
    }

    function onChangecpf(value) {
        if (value.length > cpf.length) {
            setMaskedCpf(maskUtils.cpfMask(value))
        } else {
            setMaskedCpf(value)
        }

        setCpf(value)
    }

    return (
        <div id="login-page">
            <Header />
            <section className="presentation">
                <div className="presentation-text-wrapper">
                    <p className="presentation-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies neque sed diam efficitur, sit amet semper eros pulvinar. <br /><br />Suspendisse non lacus sed ante sagittis congue pulvinar a neque. Suspendisse tristique lectus ac arcu euismod tempor. Maecenas varius mi non orci lobortis dapibus. Curabitur varius turpis ac tempus cursus. Ut efficitur ultricies blandit. Maecenas rhoncus urna luctus, hendrerit tortor sit amet, pellentesque metus. Sed sit amet tristique diam. Etiam vestibulum odio non tellus laoreet, nec bibendum tortor dictum.
                </p>
                </div>
            </section>
            <main className="modules-and-login">
                <section className="section">
                    <div className="module-wrapper">
                        <h3 className="module-title">Treinamentos</h3>
                        <p className="module-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies neque sed diam efficitur, sit amet semper eros pulvinar. Suspendisse non lacus sed ante sagittis congue pulvinar a neque. Suspendisse tristique lectus ac arcu euismod tempor. Maecenas varius mi non orci lobortis dapibus. Curabitur varius turpis ac tempus cursus. Ut efficitur ultricies blandit. Maecenas rhoncus urna luctus, hendrerit tortor sit amet, pellentesque metus. Sed sit amet tristique diam. Etiam vestibulum odio non tellus laoreet, nec bibendum tortor dictum</p>
                    </div>
                    <div className="module-wrapper">
                        <h3 className="module-title">Canal de denúncias</h3>
                        <p className="module-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies neque sed diam efficitur, sit amet semper eros pulvinar. Suspendisse non lacus sed ante sagittis congue pulvinar a neque. Suspendisse tristique lectus ac arcu euismod tempor. Maecenas varius mi non orci lobortis dapibus. Curabitur varius turpis ac tempus cursus. </p>
                        <p className="report-link-wrapper">
                            Gostaria de fazer uma denúncia? <Link to={routes.REPORT_PAGE} className="report-link">Clique  aqui</Link>
                        </p>
                    </div>
                </section>
                <section className="section">
                    <form onSubmit={onSubmit} className="login-form">
                        <LabeledInput value={maskedCpf} onChange={({ target }) => onChangecpf(target.value)} maxLength={14} type="text" className="form-item" label="CPF" />
                        <PasswordInput onChange={({ target }) => setPassword(target.value)} className="form-item" label="SENHA" />
                        <a className="form-item forgot-password" href="">Esqueci minha senha</a>
                        <Button disabled={!cpf || !password} className="form-item">Entrar</Button>
                        <p className="talk-to-us-text form-item">Entre em contato conosco <a className="talk-to-us-link" href="">aqui</a></p>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}